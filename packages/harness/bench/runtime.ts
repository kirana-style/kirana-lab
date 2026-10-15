/**
 * E-07 / KRN-PERF-006 — what the stylesheet costs the browser, not the build.
 *
 *   bun bench/runtime.ts [--app web] [--route /] [--serve]
 *                        [--rounds 5] [--throttle 4,6] [--elements 6000]
 *
 * Build size and build time say nothing about the work a page does at runtime. A stylesheet of
 * atoms asks the browser to match more selectors per element than a stylesheet of composed classes;
 * `:where()` and relation selectors ask for more still. This measures whether that shows up where a
 * person would feel it.
 *
 * The same route is opened in the Kirana, StyleX and Tailwind builds — the same markup, by
 * construction, because conformance proves it — and each one is:
 *
 * 1. loaded, then grown until the page holds at least `--elements` elements, by cloning the main
 *    content. Every build is cloned the same way, so the DOMs stay comparable;
 * 2. measured through the DevTools protocol, which reports the recalculation time the renderer
 *    itself spent, rather than anything this script times from outside;
 * 3. driven through two kinds of invalidation, reported separately because they are not the same
 *    question: a colour-scheme switch on the root, which re-resolves every token and every
 *    `light-dark()` on the page, and a hover, which touches one element and whatever declares a
 *    relation to it. Lumping them together lets the heavier one hide the other.
 *
 * The CPU is throttled (4× and 6×) because a fast desktop hides exactly the differences this is
 * looking for. Rounds are interleaved across builds so that a machine that warms up or throttles
 * does it to all three.
 */
import { spawn } from "node:child_process"
import type { ChildProcess } from "node:child_process"
import { appendFileSync, existsSync } from "node:fs"
import path from "node:path"

import { chromium } from "playwright"
import type { CDPSession, Page } from "playwright"

const args = process.argv.slice(2)
const option = (name: string, fallback: string) => {
  const index = args.indexOf(`--${name}`)
  return index < 0 ? fallback : (args[index + 1] ?? fallback)
}

const app = option("app", "web")
const route = option("route", "/")
const rounds = Number(option("rounds", "5"))
const elements = Number(option("elements", "6000"))
const throttles = option("throttle", "4,6").split(",").map(Number)
const repository = path.resolve(
  new URL("..", import.meta.url).pathname,
  "../.."
)

/**
 * Extra builds to measure beside the three, as `--also label=/path/to/app`.
 *
 * A hypothesis about why one build is slower is only answered by measuring both in the *same*
 * interleaved run: absolute times move with whatever else the machine is doing, so two runs cannot
 * be compared, only the ratios within one. Point this at a copy of an app with one thing changed.
 */
const extra = args
  .map((argument, index) =>
    argument === "--also" ? args[index + 1] : undefined
  )
  .filter((value): value is string => value !== undefined)
  .map((value, index) => {
    const split = value.indexOf("=")
    if (split < 0) {
      console.error(
        `--also wants label=directory, got ${JSON.stringify(value)}`
      )
      process.exit(2)
    }
    return [
      value.slice(0, split),
      {
        url: `http://localhost:${3404 + index}`,
        directory: path.resolve(repository, value.slice(split + 1)),
      },
    ] as const
  })

const builds = {
  kirana: {
    url: "http://localhost:3401",
    directory: path.join(repository, "apps", app),
  },
  stylex: {
    url: "http://localhost:3402",
    directory: path.join(
      path.resolve(repository, process.env.STYLEX_DIR ?? "baselines/stylex"),
      "apps",
      app
    ),
  },
  tailwind: {
    url: "http://localhost:3403",
    directory: path.join(
      path.resolve(
        repository,
        process.env.TAILWIND_DIR ?? "baselines/tailwind"
      ),
      "apps",
      app
    ),
  },
  ...Object.fromEntries(extra),
} as Record<string, { url: string; directory: string }>

type Name = string

function stop(servers: ChildProcess[]) {
  for (const server of servers) {
    try {
      process.kill(-server.pid!, "SIGTERM")
    } catch {
      server.kill()
    }
  }
}

async function serve(): Promise<ChildProcess[]> {
  const servers: ChildProcess[] = []
  for (const [name, build] of Object.entries(builds)) {
    if (!existsSync(path.join(build.directory, "dist"))) {
      console.error(
        `${name}: no build in ${build.directory}/dist — build it first`
      )
      process.exit(2)
    }
    servers.push(
      spawn(
        "bunx",
        ["vite", "preview", "--port", new URL(build.url).port, "--strictPort"],
        {
          cwd: build.directory,
          stdio: "ignore",
          detached: true,
        }
      )
    )
  }
  for (const build of Object.values(builds)) {
    const deadline = Date.now() + 60_000
    while (
      !(await fetch(build.url).then(
        (r) => r.ok,
        () => false
      ))
    ) {
      if (Date.now() > deadline) {
        console.error(`${build.url} did not start within a minute`)
        stop(servers)
        process.exit(2)
      }
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }
  return servers
}

/** Cumulative renderer counters, so a difference is the work one operation caused. */
async function metrics(session: CDPSession) {
  const { metrics: list } = await session.send("Performance.getMetrics")
  const read = (name: string) =>
    list.find((metric) => metric.name === name)?.value ?? 0
  return {
    recalcDuration: read("RecalcStyleDuration") * 1000,
    recalcCount: read("RecalcStyleCount"),
    layoutDuration: read("LayoutDuration") * 1000,
  }
}

/** Grows the page by cloning its main content until it holds `target` elements. */
async function grow(page: Page, target: number): Promise<number> {
  return page.evaluate((wanted) => {
    const count = () => document.querySelectorAll("*").length
    const host =
      document.querySelector("main") ??
      document.querySelector("[data-slot='sidebar-inset']") ??
      document.body
    const seed = host.cloneNode(true) as HTMLElement
    let guard = 0
    while (count() < wanted && guard++ < 200) {
      host.append(seed.cloneNode(true))
    }
    return count()
  }, target)
}

type Sample = {
  /** Switching colour scheme: every token and every `light-dark()` on the page re-resolves. */
  scheme: number
  schemeRecalcs: number
  /** A hover: one element, and whatever declares a relation to it. */
  state: number
  stateRecalcs: number
  layout: number
  frames: number[]
}

/** What switching to dark mode does to the root element, in this build's own terms. */
type ModeSwitch = { light: Root; dark: Root }
type Root = {
  className: string
  scheme: string
  attributes: [string, string][]
}

const readRoot = (page: Page) =>
  page.evaluate(() => {
    const root = document.documentElement
    return {
      className: root.className,
      scheme: root.style.colorScheme,
      attributes: [...root.attributes]
        .filter((attribute) => attribute.name.startsWith("data-"))
        .map(
          (attribute) => [attribute.name, attribute.value] as [string, string]
        ),
    }
  })

/**
 * Drives the page's own colour-scheme control and records what it changed.
 *
 * Each build switches modes its own way — a marker class, a data attribute, `color-scheme` — so the
 * benchmark cannot toggle one thing and call it fair. It clicks the control every build has, reads
 * the difference, and replays exactly that.
 */
async function learnModeSwitch(page: Page): Promise<ModeSwitch> {
  const group = page.locator('[aria-label="Colour scheme"]')
  const light = await readRoot(page)
  const items = group.locator("button, [role='radio'], [role='button']")
  const count = await items.count()
  for (let index = 0; index < count; index++) {
    await items
      .nth(index)
      .click({ force: true, timeout: 5000 })
      .catch(() => {})
    await page.waitForTimeout(80)
    const now = await readRoot(page)
    if (now.className !== light.className || now.scheme !== light.scheme) {
      return { light, dark: now }
    }
  }
  throw new Error(
    "the colour-scheme control changed nothing on the root element"
  )
}

/** Applies one of the two recorded roots, in the page. */
const APPLY = (root: Root) => {
  const element = document.documentElement
  element.className = root.className
  element.style.colorScheme = root.scheme
  for (const [name, value] of root.attributes) element.setAttribute(name, value)
}

/**
 * One measurement pass: three invalidations, then frame times across a burst.
 *
 * The operations are chosen for what they invalidate. A colour-scheme switch touches every element
 * that reads a token; a class on one subtree touches that subtree; a hover touches one element and
 * whatever declares a relation to it.
 */
async function measure(
  page: Page,
  session: CDPSession,
  modes: ModeSwitch
): Promise<Sample> {
  const start = await metrics(session)
  await page.evaluate(
    ({ roots, apply }) => {
      const run = new Function("root", `(${apply})(root)`) as (
        root: unknown
      ) => void
      for (let i = 0; i < 10; i++) {
        run(i % 2 ? roots.dark : roots.light)
        void document.documentElement.offsetHeight
      }
    },
    { roots: modes, apply: APPLY.toString() }
  )
  const switched = await metrics(session)

  const target = page.locator("button, a, [data-slot]").first()
  for (let i = 0; i < 10; i++) {
    await target.hover({ force: true, timeout: 5000 }).catch(() => {})
    await page.mouse.move(0, 0)
  }
  const hovered = await metrics(session)

  // Frame times across a burst of the same work, sampled in the page.
  const frames = await page.evaluate(
    async ({ roots, apply }) => {
      const run = new Function("root", `(${apply})(root)`) as (
        root: unknown
      ) => void
      const samples: number[] = []
      let last = performance.now()
      await new Promise<void>((resolve) => {
        let ticks = 0
        const step = () => {
          const now = performance.now()
          samples.push(now - last)
          last = now
          run(ticks % 2 ? roots.dark : roots.light)
          if (++ticks < 40) requestAnimationFrame(step)
          else resolve()
        }
        requestAnimationFrame(step)
      })
      return samples.slice(1)
    },
    { roots: modes, apply: APPLY.toString() }
  )

  return {
    scheme: switched.recalcDuration - start.recalcDuration,
    schemeRecalcs: switched.recalcCount - start.recalcCount,
    state: hovered.recalcDuration - switched.recalcDuration,
    stateRecalcs: hovered.recalcCount - switched.recalcCount,
    layout: hovered.layoutDuration - start.layoutDuration,
    frames,
  }
}

const quantile = (list: number[], q: number) => {
  const sorted = [...list].sort((a, b) => a - b)
  return sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * q))] ?? 0
}
const median = (list: number[]) => quantile(list, 0.5)

const servers = args.includes("--serve") ? await serve() : []
const browser = await chromium.launch({
  channel: process.env.KIRANA_CHROME_CHANNEL ?? "chrome",
})
const results: Record<number, Record<Name, Sample[]>> = {}
const domSize: Record<Name, number> = {}

try {
  for (const rate of throttles) {
    results[rate] = Object.fromEntries(
      Object.keys(builds).map((name) => [name, []])
    )
    for (let round = 0; round < rounds; round++) {
      // Interleaved: one round of each build before the next round of any.
      for (const name of Object.keys(builds) as Name[]) {
        const page = await browser.newPage({
          viewport: { width: 1400, height: 900 },
        })
        const session = await page.context().newCDPSession(page)
        await session.send("Performance.enable")
        await page.goto(`${builds[name]!.url}${route}`, {
          waitUntil: "networkidle",
        })
        const modes = await learnModeSwitch(page)
        domSize[name] = await grow(page, elements)
        await session.send("Emulation.setCPUThrottlingRate", { rate })
        await page.waitForTimeout(300)
        results[rate]![name]!.push(await measure(page, session, modes))
        await session.send("Emulation.setCPUThrottlingRate", { rate: 1 })
        await page.close()
      }
    }
  }
} finally {
  await browser.close()
  stop(servers)
}

const MEDALS = ["🥇", "🥈", "🥉"]

/**
 * The same shape `slice.ts` prints: a Markdown table per section with every column ranked, so a job
 * summary reads the same way whichever benchmark produced it. Lowest wins; ties share a medal.
 */
function table(title: string, samples: Record<Name, Sample[]>): string {
  const entries = Object.keys(builds) as Name[]
  const columns: [
    string,
    (list: Sample[]) => number,
    (value: number) => string,
  ][] = [
    [
      "Colour scheme",
      (list) => median(list.map((s) => s.scheme)),
      (v) => `${v.toFixed(1)} ms`,
    ],
    [
      "Recalcs",
      (list) => median(list.map((s) => s.schemeRecalcs)),
      (v) => v.toFixed(0),
    ],
    [
      "Hover",
      (list) => median(list.map((s) => s.state)),
      (v) => `${v.toFixed(1)} ms`,
    ],
    [
      "Recalcs ",
      (list) => median(list.map((s) => s.stateRecalcs)),
      (v) => v.toFixed(0),
    ],
    [
      "Layout",
      (list) => median(list.map((s) => s.layout)),
      (v) => `${v.toFixed(1)} ms`,
    ],
    [
      "Frame p95",
      (list) =>
        quantile(
          list.flatMap((s) => s.frames),
          0.95
        ),
      (v) => `${v.toFixed(1)} ms`,
    ],
  ]
  const cells = columns.map(([, metric, format]) => {
    const values = entries.map((name) => metric(samples[name] ?? []))
    const shown = values.map(format)
    const ranking = [...new Set(values)].sort((a, b) => a - b)
    return values.map((value, index) => {
      const medal = MEDALS[ranking.indexOf(value)]
      return medal ? `${medal} ${shown[index]}` : shown[index]!
    })
  })
  return [
    `### ${title} (advisory, ${rounds} rounds, median)`,
    "",
    `| Implementation | ${columns.map(([name]) => name.trim()).join(" | ")} |`,
    `| --- | ${columns.map(() => "---").join(" | ")} |`,
    ...entries.map(
      (name, row) =>
        `| ${name} | ${cells.map((column) => column[row]).join(" | ")} |`
    ),
    "",
  ].join("\n")
}

const sections = [
  `Runtime on \`${app}${route}\`, grown to about ${domSize.kirana} elements ` +
    `(${(Object.keys(builds) as Name[]).map((n) => `${n} ${domSize[n]}`).join(", ")}).`,
  "",
  ...throttles.map((rate) => table(`CPU throttling ${rate}×`, results[rate]!)),
]
const text = sections.join("\n")
console.log(text)
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${text}\n`)
}
