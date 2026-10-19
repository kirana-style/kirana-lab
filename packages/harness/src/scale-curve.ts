/**
 * The scale-curve corpus (METHODOLOGY.md, KRN-BENCH-002): for each size, `scripts/scale-curve.ts`
 * writes that many components for every implementation, and each one's `apps/scale-curve` is built
 * cold, interleaved, as the three-way apps are. Conformance compares every size's page, every
 * component on it, so a size or build-time result at 10,000 components compares like with like.
 *
 * It reports a curve: every metric at every size, so the cost of a component is read from how a
 * measure grows, never from one point.
 */
import { spawnSync } from "node:child_process"
import path from "node:path"

import { SIZES, generate } from "../../../scripts/scale-curve.ts"
import { BUILD_METRICS, measureBuilds } from "../bench/slice.ts"
import type { BuildMetric } from "../bench/slice.ts"
import type { Cell, Target } from "./results.ts"

export { SIZES }

export type Outcome = "passed" | "failed" | "not run"

export type ScaleCurve = {
  cells: Cell[]
  /** Conformance at each size, keyed `scale-curve/<size>`. */
  conformance: Record<string, Outcome>
}

export function measureScaleCurve({
  roots,
  targets,
  sizes = [...SIZES],
  rounds,
  warmup,
  conformance = true,
}: {
  roots: Partial<Record<Target, string>>
  /** The targets to build, in the order a round builds them. */
  targets: readonly Target[]
  sizes?: number[]
  rounds: number
  warmup: number
  conformance?: boolean
}): ScaleCurve {
  const cells: Cell[] = []
  const checked: Record<string, Outcome> = {}
  for (const size of [...sizes].sort((a, b) => a - b)) {
    generate(size)
    console.error(`scale-curve: ${size} components`)
    const builds = measureBuilds({
      labels: targets.map((target) => [target, roots[target]!] as const),
      apps: ["scale-curve"],
      rounds,
      warmup,
    })
    for (const metric of Object.keys(BUILD_METRICS) as BuildMetric[])
      cells.push({
        tier: metric === "build" ? "A" : "B",
        corpus: `scale-curve/${size}`,
        scenario: "build",
        metric,
        unit: BUILD_METRICS[metric],
        labels: metric === "build" ? ["cold"] : ["minified"],
        samples: Object.fromEntries(
          targets.map((target) => [
            target,
            builds["scale-curve"]![target]![metric],
          ])
        ),
      })
    // The last round's builds of this size are still in place: every element of every component.
    if (!conformance) {
      checked[`scale-curve/${size}`] = "not run"
      continue
    }
    console.error(`conformance: scale-curve at ${size} components`)
    const result = spawnSync(
      process.execPath,
      [
        path.join(import.meta.dirname, "../conformance/run.ts"),
        "--app",
        "scale-curve",
        "--serve",
        ...(targets.includes("kirana-dense") ? ["--dense"] : []),
      ],
      { stdio: "inherit" }
    )
    checked[`scale-curve/${size}`] = result.status === 0 ? "passed" : "failed"
  }
  return { cells, conformance: checked }
}
