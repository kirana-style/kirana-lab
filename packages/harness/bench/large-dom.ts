/**
 * The large-dom corpus (METHODOLOGY.md, KRN-BENCH-002): an ERP order table of 1,000 to 10,000 rows,
 * in every implementation, measured through the interactions a person has with one.
 *
 *   bun bench/large-dom.ts [--sizes 1000,5000,10000] [--rounds 20] [--throttle 4] [--serve]
 *                          [--json out.json]
 *
 * `measureLargeDom` does the same from another script (`src/run.ts`).
 *
 * The three-way corpus grows one page by cloning it; this one is built at its size, so every row
 * is a real row of each implementation's components: a status badge, text cells, a select, an
 * icon button, and an Approve button on pending orders only. For each size, each build's page is
 * opened once and then driven in interleaved rounds (one round of each build before the next of
 * any), each round:
 *
 * 1. **filter**: the Overdue filter, which re-renders the table to about a quarter of its rows,
 *    then **restore**: back to All, which renders every row again. Each is timed in the page from
 *    the click to the frame after it, with the renderer's style-recalculation and layout time read
 *    through the DevTools protocol;
 * 2. **scroll**: the window scrolled through the table, one step a frame, and the p95 frame time;
 * 3. **hover**: the pointer moved across rows, each row's hover style applied in turn, and the
 *    recalculation time it cost;
 * 4. the JavaScript heap afterwards.
 *
 * The page's size is measured once per build: elements, the HTML the server sent, and the bytes
 * of its `class` attributes, which is where an atomic stylesheet's cost moves to.
 *
 * The CPU is throttled while a round runs, as in the three-way runs. 25,000 rows, the corpus's
 * largest size, takes minutes to load on a hosted runner, so it runs only when `--sizes` names it.
 */
import { spawn } from "node:child_process"
import type { ChildProcess } from "node:child_process"
import { existsSync, writeFileSync } from "node:fs"
import path from "node:path"

import { chromium } from "playwright"
import type { Browser, CDPSession, Page } from "playwright"

import { VARIANTS } from "../src/targets.ts"

const repository = path.resolve(import.meta.dirname, "../../..")

/** The sizes a session measures by default; 25,000 is opt-in (see above). */
export const SIZES = [1000, 5000, 10000]

const BUILDS = {
  kirana: { port: 3003, directory: "apps/large-dom" },
  // The Kirana app built with dense class names, beside the hashed build (`src/targets.ts`).
  "kirana-dense": {
    port: 3013,
    directory: "apps/large-dom",
    ...VARIANTS["kirana-dense"]!,
  },
  stylex: { port: 3331, directory: "baselines/stylex/apps/large-dom" },
  "stylex-swc": {
    port: 3333,
    directory: "baselines/stylex-swc/apps/large-dom",
  },
  tailwind: { port: 3332, directory: "baselines/tailwind/apps/large-dom" },
} as const
type Build = keyof typeof BUILDS
const variantOf = (build: Build) =>
  BUILDS[build] as { dist?: string; env?: Record<string, string> }

export type LargeDomSamples = {
  /** The Overdue filter: click to the next frame. */
  filter: number[]
  filterRecalc: number[]
  filterLayout: number[]
  /** Back to All: every row rendered again. */
  restore: number[]
  restoreRecalc: number[]
  restoreLayout: number[]
  /** Each round's p95 frame time while scrolling through the table. */
  scrollP95: number[]
  scrollRecalc: number[]
  /** The pointer across rows. */
  hoverRecalc: number[]
  /** Bytes the JavaScript heap holds after the round, collected first. */
  heap: number[]
}

export type LargeDomSize = {
  /** Elements, HTML bytes and `class` attribute bytes, per build. */
  elements: Record<string, number>
  html: Record<string, number>
  classBytes: Record<string, number>
  samples: Record<string, LargeDomSamples>
}

export type LargeDomResults = {
  chrome: string
  throttle: number
  /** rows → the size's measures. */
  sizes: Record<number, LargeDomSize>
}

export type LargeDomOptions = {
  sizes?: number[]
  rounds?: number
  throttle?: number
  serve?: boolean
  /** Also measure `kirana-dense`. */
  dense?: boolean
}

const url = (build: Build, rows: number) =>
  `http://localhost:${BUILDS[build].port}/?rows=${rows}`

function stop(servers: ChildProcess[]) {
  for (const server of servers) {
    try {
      process.kill(-server.pid!, "SIGTERM")
    } catch {
      server.kill()
    }
  }
}

async function serve(builds: readonly Build[]): Promise<ChildProcess[]> {
  const servers: ChildProcess[] = []
  for (const name of builds) {
    const build = BUILDS[name]
    const directory = path.join(repository, build.directory)
    const { dist = "dist", env } = variantOf(name)
    if (!existsSync(path.join(directory, dist)))
      throw new Error(
        `${name}: no build in ${directory}/${dist}; build it first`
      )
    servers.push(
      spawn(
        "bunx",
        ["vite", "preview", "--port", String(build.port), "--strictPort"],
        {
          cwd: directory,
          env: { ...process.env, ...env },
          stdio: "ignore",
          detached: true,
        }
      )
    )
  }
  for (const build of builds) {
    const deadline = Date.now() + 60_000
    while (
      !(await fetch(url(build, 1)).then(
        (response) => response.ok,
        () => false
      ))
    ) {
      if (Date.now() > deadline) {
        stop(servers)
        throw new Error(`${build} did not start within a minute`)
      }
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }
  return servers
}

/** The renderer's cumulative counters, so a difference is what one interaction cost. */
async function counters(session: CDPSession) {
  const { metrics } = await session.send("Performance.getMetrics")
  const read = (name: string) =>
    metrics.find((metric) => metric.name === name)?.value ?? 0
  return {
    recalc: read("RecalcStyleDuration") * 1000,
    layout: read("LayoutDuration") * 1000,
    heap: read("JSHeapUsedSize"),
  }
}

const p95 = (list: number[]) => {
  const sorted = [...list].sort((a, b) => a - b)
  return (
    sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))] ?? 0
  )
}

type Open = { page: Page; session: CDPSession }

/** One build's page at one size, loaded and hydrated: its filter answers clicks. */
async function open(
  browser: Browser,
  build: Build,
  rows: number
): Promise<Open> {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } })
  page.setDefaultTimeout(900_000)
  await page.goto(url(build, rows), { waitUntil: "load", timeout: 900_000 })
  await page.waitForFunction(() => {
    const button = document.querySelector("[aria-pressed]")
    return (
      button !== null &&
      Object.keys(button).some((key) => key.startsWith("__reactProps"))
    )
  })
  const session = await page.context().newCDPSession(page)
  await session.send("Performance.enable")
  return { page, session }
}

/** Clicks a filter in the page and waits for the frame after it renders: milliseconds. */
const press = (page: Page, label: string) =>
  page.evaluate(async (name) => {
    const button = [
      ...document.querySelectorAll<HTMLButtonElement>("[aria-pressed]"),
    ].find((element) => element.textContent === name)!
    const start = performance.now()
    button.click()
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => setTimeout(resolve, 0))
    )
    return performance.now() - start
  }, label)

async function round(
  { page, session }: Open,
  rate: number,
  into: LargeDomSamples
) {
  await page.bringToFront()
  await session.send("Emulation.setCPUThrottlingRate", { rate })
  try {
    let before = await counters(session)
    into.filter.push(await press(page, "Overdue"))
    let after = await counters(session)
    into.filterRecalc.push(after.recalc - before.recalc)
    into.filterLayout.push(after.layout - before.layout)

    before = after
    into.restore.push(await press(page, "All"))
    after = await counters(session)
    into.restoreRecalc.push(after.recalc - before.recalc)
    into.restoreLayout.push(after.layout - before.layout)

    before = after
    const frames = await page.evaluate(async () => {
      const samples: number[] = []
      let last = performance.now()
      await new Promise<void>((resolve) => {
        let ticks = 0
        const step = () => {
          const now = performance.now()
          samples.push(now - last)
          last = now
          window.scrollBy(0, 600)
          if (++ticks < 40) requestAnimationFrame(step)
          else resolve()
        }
        requestAnimationFrame(step)
      })
      window.scrollTo(0, 0)
      return samples.slice(1)
    })
    into.scrollP95.push(p95(frames))
    after = await counters(session)
    into.scrollRecalc.push(after.recalc - before.recalc)

    // Across the rows in view, one row a step, then off the table.
    before = await counters(session)
    const boxes = await page.evaluate(() =>
      [...document.querySelectorAll("tbody tr")].slice(0, 15).map((row) => {
        const box = row.getBoundingClientRect()
        return [box.x + box.width / 2, box.y + box.height / 2] as const
      })
    )
    for (const [x, y] of boxes) await page.mouse.move(x, y)
    await page.mouse.move(0, 0)
    await page.evaluate(() => new Promise(requestAnimationFrame))
    after = await counters(session)
    into.hoverRecalc.push(after.recalc - before.recalc)
    // What the page holds, not what the collector has not reached yet.
    await session.send("HeapProfiler.collectGarbage")
    into.heap.push((await counters(session)).heap)
  } finally {
    await session.send("Emulation.setCPUThrottlingRate", { rate: 1 })
  }
}

const empty = (): LargeDomSamples => ({
  filter: [],
  filterRecalc: [],
  filterLayout: [],
  restore: [],
  restoreRecalc: [],
  restoreLayout: [],
  scrollP95: [],
  scrollRecalc: [],
  hoverRecalc: [],
  heap: [],
})

export async function measureLargeDom({
  sizes = SIZES,
  rounds = 20,
  throttle = 4,
  serve: start = false,
  dense = false,
}: LargeDomOptions = {}): Promise<LargeDomResults> {
  const builds = (Object.keys(BUILDS) as Build[]).filter(
    (build) => dense || build !== "kirana-dense"
  )
  const servers = start ? await serve(builds) : []
  const browser = await chromium.launch({
    channel: process.env.KIRANA_CHROME_CHANNEL ?? "chrome",
  })
  const results: LargeDomResults = {
    chrome: browser.version(),
    throttle,
    sizes: {},
  }
  try {
    for (const rows of sizes) {
      const size: LargeDomSize = {
        elements: {},
        html: {},
        classBytes: {},
        samples: Object.fromEntries(builds.map((build) => [build, empty()])),
      }
      results.sizes[rows] = size
      const pages = {} as Record<Build, Open>
      for (const build of builds) {
        size.html[build] = (
          await (await fetch(url(build, rows))).arrayBuffer()
        ).byteLength
        pages[build] = await open(browser, build, rows)
        const counted = await pages[build].page.evaluate(() => ({
          elements: document.querySelectorAll("*").length,
          classBytes: [...document.querySelectorAll("[class]")].reduce(
            (sum, element) => sum + element.getAttribute("class")!.length,
            0
          ),
        }))
        size.elements[build] = counted.elements
        size.classBytes[build] = counted.classBytes
      }
      console.error(
        `large-dom ${rows} rows: ${builds.map((build) => `${build} ${size.elements[build]} elements`).join(", ")}`
      )
      for (let index = 0; index < rounds; index++)
        for (const build of builds)
          await round(pages[build], throttle, size.samples[build]!)
      for (const build of builds) await pages[build].page.close()
    }
    return results
  } finally {
    await browser.close()
    stop(servers)
  }
}

if (import.meta.main) {
  const args = process.argv.slice(2)
  const option = (name: string, fallback: string) => {
    const index = args.indexOf(`--${name}`)
    return index < 0 ? fallback : (args[index + 1] ?? fallback)
  }
  const results = await measureLargeDom({
    sizes: option("sizes", SIZES.join(",")).split(",").map(Number),
    rounds: Number(option("rounds", "20")),
    throttle: Number(option("throttle", "4")),
    serve: args.includes("--serve"),
    dense: args.includes("--dense"),
  })
  const out = option("json", "")
  const text = `${JSON.stringify(results, null, 2)}\n`
  if (out) writeFileSync(out, text)
  else console.log(text)
}
