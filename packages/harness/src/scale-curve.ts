/**
 * The scale-curve corpus (METHODOLOGY.md, KRN-BENCH-002): for each size, `scripts/scale-curve.ts`
 * writes that many components for every implementation, and each one's `apps/scale-curve` is built
 * cold, interleaved, as the three-way apps are. Conformance compares the smallest size's pages.
 *
 * It reports a curve: every metric at every size, so the cost of a component is read from how a
 * measure grows, never from one point.
 */
import { spawnSync } from "node:child_process"
import path from "node:path"

import { SIZES, generate } from "../../../scripts/scale-curve.ts"
import { BUILD_METRICS, measureBuilds } from "../bench/slice.ts"
import type { BuildMetric } from "../bench/slice.ts"
import { TARGETS } from "./results.ts"
import type { Cell, Target } from "./results.ts"

export { SIZES }

export type ScaleCurve = {
  cells: Cell[]
  conformance: "passed" | "failed" | "not run"
}

export function measureScaleCurve({
  roots,
  sizes = [...SIZES],
  rounds,
  warmup,
  conformance = true,
}: {
  roots: Record<Target, string>
  sizes?: number[]
  rounds: number
  warmup: number
  conformance?: boolean
}): ScaleCurve {
  const cells: Cell[] = []
  let checked: ScaleCurve["conformance"] = "not run"
  for (const size of [...sizes].sort((a, b) => a - b)) {
    generate(size)
    console.error(`scale-curve: ${size} components`)
    const builds = measureBuilds({
      labels: TARGETS.map((target) => [target, roots[target]] as const),
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
          TARGETS.map((target) => [
            target,
            builds["scale-curve"]![target]![metric],
          ])
        ) as Record<Target, number[]>,
      })
    // The smallest size's builds are what conformance compares: every element of every component.
    if (conformance && checked === "not run") {
      console.error(`conformance: scale-curve at ${size} components`)
      const result = spawnSync(
        process.execPath,
        [
          path.join(import.meta.dirname, "../conformance/run.ts"),
          "--app",
          "scale-curve",
          "--serve",
        ],
        { stdio: "inherit" }
      )
      checked = result.status === 0 ? "passed" : "failed"
    }
  }
  return { cells, conformance: checked }
}
