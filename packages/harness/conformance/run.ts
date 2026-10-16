/**
 * Runs the conformance comparisons for one app: the Kirana build against the StyleX port and against
 * the Tailwind original, and the StyleX port compiled by SWC against the same port compiled by Babel
 * (packages/harness/conformance/README.md).
 *
 *   bun conformance/run.ts [--app web|blocks|examples|large-dom|scale-curve] [--serve] [--shard 1/3] [--states] [--motion]
 *
 * Every app has fixed ports; `KIRANA_URL`, `STYLEX_URL`, `STYLEX_SWC_URL` and `TAILWIND_URL`
 * override them:
 *
 *   app       Kirana  StyleX  Tailwind  StyleX (SWC)
 *   web       3000    3301    3302      3303
 *   blocks    3001    3311    3312      3313
 *   examples  3002    3321    3322      3323
 *   large-dom 3003    3331    3332      3333
 *   scale-curve 3004  3341    3342      3343
 *
 * `--serve` starts `vite preview` for the four builds first and stops them at the end. The baseline
 * checkouts are `STYLEX_DIR`, `STYLEX_SWC_DIR` and `TAILWIND_DIR`, by default `baselines/stylex`,
 * `baselines/stylex-swc` and `baselines/tailwind` in this repository; every build must already
 * exist (`dist/`).
 *
 * `web` compares its one page, large-dom its table at 40 rows, and scale-curve the components
 * `scripts/scale-curve.ts` last wrote; `blocks` and `examples` crawl every
 * route unless `--paths` names some.
 * `--states` compares interactive states on those routes instead of pages at rest.
 * The StyleX comparison treats a difference where Kirana matches the Tailwind original as a
 * correction, and the Tailwind comparison treats one the StyleX port shares as inherited. The SWC
 * comparison has no arbiter: both compile the same sources, so any difference is the compiler's.
 */
import { spawn, spawnSync } from "node:child_process"
import type { ChildProcess } from "node:child_process"
import { existsSync } from "node:fs"
import path from "node:path"

const APPS = {
  web: 0,
  blocks: 1,
  examples: 2,
  "large-dom": 3,
  "scale-curve": 4,
} as const

/**
 * The page each app compares when no `--paths` is given: `web` and scale-curve have one page,
 * and large-dom is compared at a few rows, since its rows differ only in data; `blocks` and
 * `examples` crawl.
 */
const PAGES: Partial<Record<App, string>> = {
  web: "/",
  "large-dom": "/?rows=40",
  "scale-curve": "/",
}
type App = keyof typeof APPS

const args = process.argv.slice(2)
const option = (name: string) => {
  const index = args.indexOf(`--${name}`)
  return index < 0 ? undefined : args[index + 1]
}
const app = (option("app") ?? "web") as App
if (!(app in APPS)) {
  console.error(`--app must be one of ${Object.keys(APPS).join(", ")}`)
  process.exit(2)
}
const offset = APPS[app]
const repository = path.resolve(import.meta.dirname, "../../..")
const builds = {
  kirana: {
    url: process.env.KIRANA_URL ?? `http://localhost:${3000 + offset}`,
    directory: path.join(repository, "apps", app),
  },
  stylex: {
    url: process.env.STYLEX_URL ?? `http://localhost:${3301 + 10 * offset}`,
    directory: path.join(
      path.resolve(repository, process.env.STYLEX_DIR ?? "baselines/stylex"),
      "apps",
      app
    ),
  },
  "stylex-swc": {
    url: process.env.STYLEX_SWC_URL ?? `http://localhost:${3303 + 10 * offset}`,
    directory: path.join(
      path.resolve(
        repository,
        process.env.STYLEX_SWC_DIR ?? "baselines/stylex-swc"
      ),
      "apps",
      app
    ),
  },
  tailwind: {
    url: process.env.TAILWIND_URL ?? `http://localhost:${3302 + 10 * offset}`,
    directory: path.join(
      path.resolve(
        repository,
        process.env.TAILWIND_DIR ?? "baselines/tailwind"
      ),
      "apps",
      app
    ),
  },
}

// Options this script consumes; everything else goes to compare.ts.
const own = new Set(["--app", "--serve"])
const passed = args.filter(
  (arg, index) => !own.has(arg) && args[index - 1] !== "--app"
)

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
        `${name}: no build in ${build.directory}/dist — build it first (see conformance/README.md)`
      )
      process.exit(2)
    }
    const port = new URL(build.url).port
    servers.push(
      // Its own process group, so stopping it stops the Vite process `bunx` starts too.
      spawn("bunx", ["vite", "preview", "--port", port, "--strictPort"], {
        cwd: build.directory,
        stdio: "ignore",
        detached: true,
      })
    )
  }
  for (const build of Object.values(builds)) {
    const deadline = Date.now() + 60_000
    while (
      !(await fetch(build.url).then(
        (response) => response.ok,
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

const servers = args.includes("--serve") ? await serve() : []
let failed = false
for (const [label, actual, expected, arbiter] of [
  [
    "stylex",
    builds.kirana.url,
    builds.stylex.url,
    ["--original", builds.tailwind.url],
  ],
  [
    "tailwind",
    builds.kirana.url,
    builds.tailwind.url,
    ["--port-of", builds.stylex.url],
  ],
  ["stylex-swc", builds["stylex-swc"].url, builds.stylex.url, []],
] as const) {
  const shard = option("shard")?.replace("/", "-of-")
  const suffix = args.includes("--states") ? "-states" : ""
  const result = spawnSync(
    process.execPath,
    [
      path.join(import.meta.dirname, "compare.ts"),
      "--actual",
      actual,
      "--expected",
      expected,
      "--label",
      label,
      "--out",
      path.join(
        import.meta.dirname,
        "output",
        `${app}-${label}${suffix}${shard ? `-${shard}` : ""}.json`
      ),
      ...(args.includes("--paths")
        ? []
        : PAGES[app]
          ? ["--paths", PAGES[app]]
          : ["--crawl"]),
      ...arbiter,
      ...passed,
    ],
    { stdio: "inherit" }
  )
  failed ||= result.status !== 0
  // States compare against the StyleX port only.
  if (args.includes("--states")) break
}
stop(servers)
process.exitCode = failed ? 1 : 0
