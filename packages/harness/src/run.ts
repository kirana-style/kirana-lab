/**
 * One benchmark session, as METHODOLOGY.md describes it, on one machine:
 *
 * 1. the builds (tiers A and B): every app of every implementation, cold, interleaved, after the
 *    warm-up rounds, with every round's numbers kept;
 * 2. conformance per app (fairness rule 8): the builds just made are compared element by element,
 *    and an app that does not pass is flagged in the result and the report;
 * 3. the browser (tier C) on one app, at each CPU throttling rate;
 * 4. `results.json` with every raw sample and the comparisons, and `report.md` from it.
 *
 *   bun src/run.ts [--rounds 10] [--warmup 1] [--runtime-rounds 20] [--throttle 4,6]
 *                  [--apps web,blocks,examples] [--runtime-app web]
 *                  [--no-conformance] [--no-runtime] [--out <folder>]
 *
 * The folder defaults to `results/<kirana version>/<date>` at the repository root.
 */
import { spawnSync } from "node:child_process"
import { appendFileSync, mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"

import { BUILD_METRICS, measureBuilds } from "../bench/slice.ts"
import type { BuildMetric } from "../bench/slice.ts"
import { measureRuntime } from "../bench/runtime.ts"
import type { RuntimeSamples } from "../bench/runtime.ts"
import { ROOT, corpusCommit, machine, versions } from "./meta.ts"
import { renderReport } from "./report.ts"
import { TARGETS, tabulate } from "./results.ts"
import type { Cell, Meta, Results, Target } from "./results.ts"

const args = process.argv.slice(2)
const option = (name: string, fallback: string) => {
  const index = args.indexOf(`--${name}`)
  return index < 0 ? fallback : (args[index + 1] ?? fallback)
}
const flag = (name: string) => args.includes(`--${name}`)

const rounds = Number(option("rounds", "10"))
const warmup = Number(option("warmup", "1"))
const runtimeRounds = Number(option("runtime-rounds", "20"))
const throttles = option("throttle", "4,6").split(",").map(Number)
const apps = option("apps", "web,blocks,examples").split(",")
const runtimeApp = option("runtime-app", "web")

const started = new Date()
const { kirana, targets } = versions()
const { hardware, runner, run } = machine()
const out = path.resolve(
  ROOT,
  option(
    "out",
    path.join("results", kirana, started.toISOString().slice(0, 10))
  )
)

const roots: Record<Target, string> = {
  kirana: ROOT,
  stylex: path.join(ROOT, "baselines/stylex"),
  "stylex-swc": path.join(ROOT, "baselines/stylex-swc"),
  tailwind: path.join(ROOT, "baselines/tailwind"),
}

// 1. Builds.
console.error(
  `builds: ${apps.join(", ")}, ${warmup} warm-up and ${rounds} rounds`
)
const builds = measureBuilds({
  labels: TARGETS.map((target) => [target, roots[target]] as const),
  apps,
  rounds,
  warmup,
})

const cells: Cell[] = []
for (const metric of Object.keys(BUILD_METRICS) as BuildMetric[]) {
  const unit = BUILD_METRICS[metric]
  const tier = metric === "build" ? "A" : "B"
  for (const app of apps) {
    cells.push({
      tier,
      corpus: `three-way/${app}`,
      scenario: "build",
      metric,
      unit,
      labels: metric === "build" ? ["cold"] : ["minified"],
      samples: Object.fromEntries(
        TARGETS.map((target) => [target, builds[app]![target]![metric]])
      ) as Record<Target, number[]>,
    })
  }
  // The corpus total: each round's sum over the apps, so it keeps one sample per round.
  cells.push({
    tier,
    corpus: "three-way/total",
    scenario: "build",
    metric,
    unit,
    labels: metric === "build" ? ["cold"] : ["minified"],
    samples: Object.fromEntries(
      TARGETS.map((target) => [
        target,
        Array.from({ length: rounds }, (_, round) =>
          apps.reduce(
            (sum, app) => sum + builds[app]![target]![metric][round]!,
            0
          )
        ),
      ])
    ) as Record<Target, number[]>,
  })
}

// 2. Conformance on the builds just made.
const conformance: Meta["conformance"] = Object.fromEntries(
  apps.map((app) => [app, "not run" as const])
)
if (!flag("no-conformance")) {
  for (const app of apps) {
    console.error(`conformance: ${app}`)
    const result = spawnSync(
      process.execPath,
      [
        path.join(import.meta.dirname, "../conformance/run.ts"),
        "--app",
        app,
        "--serve",
      ],
      { stdio: "inherit" }
    )
    conformance[app] = result.status === 0 ? "passed" : "failed"
  }
}

// 3. The browser.
let chrome: string | undefined
if (!flag("no-runtime")) {
  console.error(
    `runtime: ${runtimeApp}, ${runtimeRounds} runs at ${throttles.join("×, ")}×`
  )
  const runtime = await measureRuntime({
    app: runtimeApp,
    rounds: runtimeRounds,
    throttles,
    serve: true,
  })
  chrome = runtime.chrome
  const units: Record<keyof RuntimeSamples, string> = {
    scheme: "ms",
    schemeRecalcs: "count",
    hover: "ms",
    hoverRecalcs: "count",
    layout: "ms",
    framesP95: "ms",
  }
  for (const rate of throttles) {
    for (const metric of Object.keys(units) as (keyof RuntimeSamples)[]) {
      cells.push({
        tier: "C",
        corpus: `three-way/${runtimeApp}`,
        scenario: `CPU throttled ${rate}×, about ${runtime.elements.kirana} elements`,
        metric,
        unit: units[metric],
        labels: [`throttle-${rate}`],
        samples: Object.fromEntries(
          TARGETS.map((target) => [
            target,
            runtime.samples[rate]![target]![metric],
          ])
        ) as Record<Target, number[]>,
      })
    }
  }
}

// 4. The files.
const results: Results = {
  meta: {
    date: started.toISOString(),
    corpusCommit: corpusCommit(),
    kirana,
    targets,
    hardware,
    runtime: {
      node: process.versions.node,
      bun: process.versions.bun ?? "unknown",
      ...(chrome ? { chrome } : {}),
    },
    ...(runner ? { runner } : {}),
    ...(run ? { run } : {}),
    rounds: {
      build: rounds,
      runtime: flag("no-runtime") ? 0 : runtimeRounds,
      warmup,
    },
    conformance,
  },
  ...tabulate(cells),
}
const report = renderReport(results)
mkdirSync(out, { recursive: true })
writeFileSync(
  path.join(out, "results.json"),
  `${JSON.stringify(results, null, 2)}\n`
)
writeFileSync(path.join(out, "report.md"), report)
if (process.env.GITHUB_STEP_SUMMARY)
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, report)
console.error(`written: ${path.relative(ROOT, out)}/results.json and report.md`)
