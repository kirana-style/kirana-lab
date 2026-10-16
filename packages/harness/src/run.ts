/**
 * One benchmark session, as METHODOLOGY.md describes it, on one machine:
 *
 * 1. the builds (tiers A and B): every app of every implementation, cold, interleaved, after the
 *    warm-up rounds, with every round's numbers kept;
 * 2. conformance per app (fairness rule 8): the builds just made are compared element by element,
 *    and an app that does not pass is flagged in the result and the report;
 * 3. the browser (tier C) on one app, at each CPU throttling rate;
 * 4. the large-dom corpus: its app built once for its sizes (tier B), checked by conformance, and
 *    driven at each size in the browser (`bench/large-dom.ts`);
 * 5. the scale-curve corpus: generated components at each size, built cold (`src/scale-curve.ts`);
 * 6. `results.json` with every raw sample and the comparisons, and `report.md` from it.
 *
 *   bun src/run.ts [--rounds 10] [--warmup 1] [--runtime-rounds 20] [--throttle 4,6]
 *                  [--apps web,blocks,examples] [--runtime-app web]
 *                  [--large-dom-sizes 1000,5000] [--large-dom-throttle 4] [--no-large-dom]
 *                  [--scale-curve-sizes 100,1000,10000] [--no-scale-curve | --only-scale-curve]
 *                  [--no-conformance] [--no-runtime] [--out <folder>]
 *
 * CI runs the scale-curve corpus as a job of its own (`--only-scale-curve`), beside the rest
 * (`--no-scale-curve`), and joins the two files with `src/merge.ts`: StyleX's Babel build of
 * 10,000 components alone takes most of an hour, and one runner would not finish both in time.
 *
 * The folder defaults to `results/<kirana version>/<date>` at the repository root.
 */
import { spawnSync } from "node:child_process"
import { appendFileSync, mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"

import { BUILD_METRICS, measureBuilds } from "../bench/slice.ts"
import type { BuildMetric } from "../bench/slice.ts"
import { measureLargeDom } from "../bench/large-dom.ts"
import type { LargeDomSamples } from "../bench/large-dom.ts"
import { measureRuntime } from "../bench/runtime.ts"
import type { RuntimeSamples } from "../bench/runtime.ts"
import { SIZES, measureScaleCurve } from "./scale-curve.ts"
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
const runtimeApp = option("runtime-app", "web")
// 10,000 and 25,000 rows take too long for a hosted runner's session; name them here to measure them.
const largeDomSizes = option("large-dom-sizes", "1000,5000")
  .split(",")
  .map(Number)
const largeDomThrottle = Number(option("large-dom-throttle", "4"))
// Only the scale curve, for its own CI job: none of the three-way, browser or large-dom work.
const onlyScale = flag("only-scale-curve")
const largeDom = !onlyScale && !flag("no-large-dom")
const scaleCurve = onlyScale || !flag("no-scale-curve")
const scaleCurveSizes = option("scale-curve-sizes", SIZES.join(","))
  .split(",")
  .map(Number)
const apps = onlyScale ? [] : option("apps", "web,blocks,examples").split(",")
const runtime = !onlyScale && !flag("no-runtime")

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
const cells: Cell[] = []
if (apps.length > 0) {
  console.error(
    `builds: ${apps.join(", ")}, ${warmup} warm-up and ${rounds} rounds`
  )
  const builds = measureBuilds({
    labels: TARGETS.map((target) => [target, roots[target]] as const),
    apps,
    rounds,
    warmup,
  })

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
if (runtime) {
  console.error(
    `runtime: ${runtimeApp}, ${runtimeRounds} runs at ${throttles.join("×, ")}×`
  )
  const browser = await measureRuntime({
    app: runtimeApp,
    rounds: runtimeRounds,
    throttles,
    serve: true,
  })
  chrome = browser.chrome
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
        scenario: `CPU throttled ${rate}×, about ${browser.elements.kirana} elements`,
        metric,
        unit: units[metric],
        labels: [`throttle-${rate}`],
        samples: Object.fromEntries(
          TARGETS.map((target) => [
            target,
            browser.samples[rate]![target]![metric],
          ])
        ) as Record<Target, number[]>,
      })
    }
  }
}

// 4. The large-dom corpus, after the three-way runs so it never shares a round with them.
if (largeDom) {
  // One build for the app's sizes: its build time is not part of this corpus.
  const built = measureBuilds({
    labels: TARGETS.map((target) => [target, roots[target]] as const),
    apps: ["large-dom"],
    rounds: 1,
    warmup: 0,
  })
  for (const metric of Object.keys(BUILD_METRICS) as BuildMetric[]) {
    if (metric === "build") continue
    cells.push({
      tier: "B",
      corpus: "large-dom",
      scenario: "build",
      metric,
      unit: BUILD_METRICS[metric],
      labels: ["minified"],
      samples: Object.fromEntries(
        TARGETS.map((target) => [target, built["large-dom"]![target]![metric]])
      ) as Record<Target, number[]>,
    })
  }
  if (!flag("no-conformance")) {
    console.error("conformance: large-dom")
    const result = spawnSync(
      process.execPath,
      [
        path.join(import.meta.dirname, "../conformance/run.ts"),
        "--app",
        "large-dom",
        "--serve",
      ],
      { stdio: "inherit" }
    )
    conformance["large-dom"] = result.status === 0 ? "passed" : "failed"
  } else conformance["large-dom"] = "not run"
  console.error(
    `large-dom: ${largeDomSizes.join(", ")} rows, ${runtimeRounds} rounds at ${largeDomThrottle}×`
  )
  const measured = await measureLargeDom({
    sizes: largeDomSizes,
    rounds: runtimeRounds,
    throttle: largeDomThrottle,
    serve: true,
  })
  chrome ??= measured.chrome
  const units: Record<keyof LargeDomSamples, string> = {
    filter: "ms",
    filterRecalc: "ms",
    filterLayout: "ms",
    restore: "ms",
    restoreRecalc: "ms",
    restoreLayout: "ms",
    scrollP95: "ms",
    scrollRecalc: "ms",
    hoverRecalc: "ms",
    heap: "bytes",
  }
  for (const rows of largeDomSizes) {
    const size = measured.sizes[rows]!
    for (const metric of ["html", "classBytes"] as const)
      cells.push({
        tier: "B",
        corpus: `large-dom/${rows}`,
        scenario: "build",
        metric,
        unit: "bytes",
        labels: ["rendered"],
        samples: Object.fromEntries(
          TARGETS.map((target) => [target, [size[metric][target]!]])
        ) as Record<Target, number[]>,
      })
    for (const metric of Object.keys(units) as (keyof LargeDomSamples)[])
      cells.push({
        tier: "C",
        corpus: `large-dom/${rows}`,
        scenario: `CPU throttled ${largeDomThrottle}×, about ${size.elements.kirana} elements`,
        metric,
        unit: units[metric],
        labels: [`throttle-${largeDomThrottle}`],
        samples: Object.fromEntries(
          TARGETS.map((target) => [target, size.samples[target]![metric]])
        ) as Record<Target, number[]>,
      })
  }
}

// 5. The scale curve.
if (scaleCurve) {
  const curve = measureScaleCurve({
    roots,
    sizes: scaleCurveSizes,
    rounds,
    warmup,
    conformance: !flag("no-conformance"),
  })
  cells.push(...curve.cells)
  conformance["scale-curve"] = curve.conformance
}

// 6. The files.
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
      runtime: runtime ? runtimeRounds : 0,
      warmup,
      ...(largeDom ? { largeDom: runtimeRounds } : {}),
      ...(scaleCurve ? { scaleCurve: rounds } : {}),
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
