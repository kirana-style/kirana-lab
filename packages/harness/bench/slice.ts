/**
 * Tiers A and B: what each implementation's build costs, and what it ships.
 *
 *   bun bench/slice.ts kirana=<repository> stylex=<repository> tailwind=<repository> \
 *     --apps web,blocks,examples [--rounds 10] [--warmup 1] [--json out.json]
 *
 * Each label names a repository checkout, and every listed app under its `apps/` is measured.
 * Only apps every implementation has may be measured (fairness rule 9): the script fails when one
 * is missing, rather than comparing a corpus against a smaller one.
 *
 * Every build is cold: the app's `dist` and its Vite cache are removed first. Builds are
 * interleaved, so one round builds each implementation's app in turn before the next round, and
 * a machine that warms up or slows down does it to all of them. Warm-up rounds are run and
 * discarded. Every round's numbers are kept: the build's wall time, and, for every client asset
 * of the type, the CSS and JavaScript raw, gzip -9 and brotli 11 (each file compressed on its own,
 * as a browser receives it), and the stylesheet's rule and declaration counts.
 */
import { spawnSync } from "node:child_process"
import {
  existsSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import path from "node:path"
import { brotliCompressSync, constants, gzipSync } from "node:zlib"

import { countCss } from "../src/css-count.ts"

export const BUILD_METRICS = {
  build: "ms",
  cssRaw: "bytes",
  cssGzip: "bytes",
  cssBrotli: "bytes",
  jsRaw: "bytes",
  jsGzip: "bytes",
  totalGzip: "bytes",
  rules: "count",
  declarations: "count",
} as const

export type BuildMetric = keyof typeof BUILD_METRICS

/** Every round's value of every metric, for one implementation's app. */
export type BuildSamples = Record<BuildMetric, number[]>

/** app → label → samples. */
export type BuildResults = Record<string, Record<string, BuildSamples>>

/** Every client asset of the extension, anywhere under `dist/client`. */
function assets(directory: string, extension: string): Buffer[] {
  return readdirSync(path.join(directory, "dist/client"), {
    recursive: true,
    withFileTypes: true,
  })
    .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
    .map((entry) => readFileSync(path.join(entry.parentPath, entry.name)))
}

const sum = (files: Buffer[], size: (file: Buffer) => number) =>
  files.reduce((total, file) => total + size(file), 0)
const gzip = (file: Buffer) => gzipSync(file, { level: 9 }).length
const brotli = (file: Buffer) =>
  brotliCompressSync(file, {
    params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
  }).length

/** One cold build of an app, and what it shipped. */
function buildOnce(label: string, directory: string) {
  rmSync(path.join(directory, "dist"), { recursive: true, force: true })
  rmSync(path.join(directory, "node_modules/.vite"), {
    recursive: true,
    force: true,
  })
  const started = performance.now()
  // `--silent` keeps Bun from echoing the script, so the log names each build instead.
  const result = spawnSync(
    "bun",
    ["run", "--silent", "build", "--logLevel", "silent"],
    { cwd: directory, stdio: ["ignore", "ignore", "inherit"] }
  )
  const build = performance.now() - started
  if (result.status !== 0)
    throw new Error(`${label}: the build failed in ${directory}`)
  const css = assets(directory, ".css")
  const js = assets(directory, ".js")
  const counts = css
    .map((file) => countCss(file.toString("utf8")))
    .reduce(
      (total, count) => ({
        rules: total.rules + count.rules,
        declarations: total.declarations + count.declarations,
      }),
      { rules: 0, declarations: 0 }
    )
  const cssGzip = sum(css, gzip)
  const jsGzip = sum(js, gzip)
  return {
    build,
    cssRaw: sum(css, (file) => file.length),
    cssGzip,
    cssBrotli: sum(css, brotli),
    jsRaw: sum(js, (file) => file.length),
    jsGzip,
    totalGzip: cssGzip + jsGzip,
    ...counts,
  }
}

const empty = (): BuildSamples =>
  Object.fromEntries(
    Object.keys(BUILD_METRICS).map((metric) => [metric, []])
  ) as unknown as BuildSamples

export function measureBuilds({
  labels,
  apps,
  rounds,
  warmup = 1,
  log = console.error,
}: {
  labels: readonly (readonly [string, string])[]
  apps: readonly string[]
  rounds: number
  warmup?: number
  log?: (line: string) => void
}): BuildResults {
  for (const app of apps) {
    const missing = labels
      .filter(([, root]) => !existsSync(path.join(root, "apps", app)))
      .map(([label]) => label)
    if (missing.length > 0)
      throw new Error(
        `apps/${app} is missing from: ${missing.join(", ")}. ` +
          "Every implementation must have the app, or the comparison is not like for like."
      )
  }
  const results: BuildResults = Object.fromEntries(
    apps.map((app) => [
      app,
      Object.fromEntries(labels.map(([label]) => [label, empty()])),
    ])
  )
  for (let round = -warmup; round < rounds; round++) {
    log(
      round < 0
        ? `warm-up ${round + warmup + 1}`
        : `round ${round + 1} of ${rounds}`
    )
    for (const app of apps) {
      for (const [label, root] of labels) {
        const measured = buildOnce(label, path.join(root, "apps", app))
        log(`  ${label} ${app}: ${(measured.build / 1000).toFixed(2)} s`)
        if (round < 0) continue
        for (const [metric, value] of Object.entries(measured))
          results[app]![label]![metric as BuildMetric].push(value)
      }
    }
  }
  return results
}

if (import.meta.main) {
  const args = process.argv.slice(2)
  const value = (name: string) => {
    const index = args.indexOf(`--${name}`)
    return index >= 0 ? args[index + 1] : undefined
  }
  const labels = args
    .filter(
      (arg, index) => arg.includes("=") && !args[index - 1]?.startsWith("--")
    )
    .map((arg) => arg.split("=", 2) as [string, string])
  const results = measureBuilds({
    labels,
    apps: (value("apps") ?? "web,blocks,examples").split(","),
    rounds: Number(value("rounds") ?? 10),
    warmup: Number(value("warmup") ?? 1),
  })
  const out = value("json")
  if (out) writeFileSync(out, `${JSON.stringify(results, null, 2)}\n`)
  else console.log(JSON.stringify(results, null, 2))
}
