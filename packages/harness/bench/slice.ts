/**
 * Advisory benchmark of the ported apps (E-01 size, E-02 build time), reported under the claims
 * policy in METHODOLOGY.md: hosted CI numbers are advisory.
 *
 *   bun bench/slice.ts <label>=<app directory> [<label>=<app directory> …] [--rounds 3]
 *   bun bench/slice.ts <label>=<repository> […] --apps web,blocks,examples [--rounds 3]
 *
 * Only apps every implementation has may be measured: `apps/docs` exists in this repository and on
 * neither baseline branch, so it is excluded from the corpus and the script refuses to measure it.
 *
 * Directories are resolved from `packages/harness`. With `--apps`, each label names a repository
 * checkout and every listed app under its `apps/` is measured, followed by a corpus total. Each app
 * directory must already have its dependencies installed.
 * Every build runs `vite build` `--rounds` times, interleaved with the others; the median wall time,
 * the client CSS and the client JavaScript (raw and gzip -9, each file gzipped on its own, as a
 * browser receives them) are printed as Markdown and appended to $GITHUB_STEP_SUMMARY when it is set.
 */
import { spawnSync } from "node:child_process"
import { appendFileSync, existsSync, readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { gzipSync } from "node:zlib"

const args = process.argv.slice(2)
const value = (name: string) => {
  const index = args.indexOf(`--${name}`)
  return index >= 0 ? args[index + 1] : undefined
}
const rounds = Number(value("rounds") ?? 3)
const apps = value("apps")?.split(",")
const labels = args
  .filter(
    (arg, index) => arg.includes("=") && !args[index - 1]?.startsWith("--")
  )
  .map((arg) => arg.split("=", 2) as [string, string])

type Measure = { build: number; css: Size; js: Size }
type Size = { raw: number; gzip: number }

const median = (values: number[]) =>
  [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)]!

/** Raw and gzip bytes of every client asset with the extension, anywhere under `dist/client`. */
function size(directory: string, extension: string): Size {
  const files = readdirSync(path.join(directory, "dist/client"), {
    recursive: true,
    withFileTypes: true,
  })
    .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
    .map((entry) => readFileSync(path.join(entry.parentPath, entry.name)))
  return {
    raw: files.reduce((sum, file) => sum + file.length, 0),
    gzip: files.reduce(
      (sum, file) => sum + gzipSync(file, { level: 9 }).length,
      0
    ),
  }
}

/** Builds every directory `rounds` times, interleaved, and measures the last build. */
function measure(targets: [string, string][]): Map<string, Measure> {
  const times = new Map<string, number[]>(targets.map(([label]) => [label, []]))
  for (let round = 0; round < rounds; round++) {
    for (const [label, directory] of targets) {
      const started = performance.now()
      const result = spawnSync(
        "bunx",
        ["vite", "build", "--logLevel", "silent"],
        { cwd: directory, stdio: "inherit" }
      )
      if (result.status !== 0)
        throw new Error(`${label}: build failed in ${directory}`)
      times.get(label)!.push(performance.now() - started)
    }
  }
  return new Map(
    targets.map(([label, directory]) => [
      label,
      {
        build: median(times.get(label)!),
        css: size(directory, ".css"),
        js: size(directory, ".js"),
      },
    ])
  )
}

const kB = (bytes: number) => `${(bytes / 1000).toFixed(1)} kB`
const MEDALS = ["🥇", "🥈", "🥉"]

/**
 * A Markdown table with each column ranked: the lowest build time or size gets 🥇, then 🥈 and 🥉 (job
 * summaries cannot colour cells). Ties share a medal.
 */
function table(title: string, results: Map<string, Measure>): string {
  const entries = [...results]
  const columns: [string, (m: Measure) => number, (v: number) => string][] = [
    ["Build", (m) => m.build, (v) => `${(v / 1000).toFixed(2)} s`],
    ["CSS", (m) => m.css.raw, kB],
    ["CSS gzip", (m) => m.css.gzip, kB],
    ["JS", (m) => m.js.raw, kB],
    ["JS gzip", (m) => m.js.gzip, kB],
    ["CSS + JS gzip", (m) => m.css.gzip + m.js.gzip, kB],
  ]
  const cells = columns.map(([, metric, format]) => {
    const shown = entries.map(([, result]) => format(metric(result)))
    const ranking = [
      ...new Set(entries.map(([, result]) => metric(result))),
    ].sort((a, b) => a - b)
    return entries.map(([, result], index) => {
      const medal = MEDALS[ranking.indexOf(metric(result))]
      return medal ? `${medal} ${shown[index]}` : shown[index]!
    })
  })
  const rows = entries.map(
    ([label], row) =>
      `| ${label} | ${cells.map((column) => column[row]).join(" | ")} |`
  )
  return [
    `### ${title} (advisory, ${rounds} rounds, median)`,
    "",
    `| Implementation | ${columns.map(([name]) => name).join(" | ")} |`,
    `| --- | ${columns.map(() => "---").join(" | ")} |`,
    ...rows,
    "",
  ].join("\n")
}

const tables: string[] = []
if (apps) {
  const total = new Map<string, Measure>(
    labels.map(([label]) => [
      label,
      { build: 0, css: { raw: 0, gzip: 0 }, js: { raw: 0, gzip: 0 } },
    ])
  )
  // An app only one implementation has would compare a corpus against a smaller
  // one. `apps/docs` is the case in point: it exists here and on neither
  // baseline branch, so it stays out of the corpus, and this fails rather than
  // quietly reporting an unfair total.
  for (const app of apps) {
    const missing = labels
      .filter(([, root]) => !existsSync(path.join(root, "apps", app)))
      .map(([label]) => label)
    if (missing.length > 0) {
      throw new Error(
        `apps/${app} is missing from: ${missing.join(", ")}. ` +
          `Every implementation must have the app, or the comparison is not like for like.`
      )
    }
    const results = measure(
      labels.map(([label, root]) => [label, path.join(root, "apps", app)])
    )
    tables.push(table(`apps/${app}`, results))
    for (const [label, result] of results) {
      const sum = total.get(label)!
      sum.build += result.build
      for (const kind of ["css", "js"] as const) {
        sum[kind].raw += result[kind].raw
        sum[kind].gzip += result[kind].gzip
      }
    }
  }
  tables.push(table(`Corpus total (${apps.join(" + ")})`, total))
} else {
  tables.push(table("Slice benchmark", measure(labels)))
}
const text = tables.join("\n")
console.log(text)
if (process.env.GITHUB_STEP_SUMMARY)
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${text}\n`)
