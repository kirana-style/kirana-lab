/**
 * Joins the two halves of a CI session into one `results.json` and `report.md`: the session itself
 * (`run.ts --no-scale-curve`) and the scale curve, measured by a job of its own on another runner
 * (`run.ts --only-scale-curve`).
 *
 *   bun src/merge.ts <session>/results.json <scale-curve>/results.json --out <folder>
 *
 * Every comparison stays within its half: each half compared the four implementations on one
 * machine, and the scale curve's machine is recorded beside the session's (`meta.scaleCurve`), so
 * no number from one machine is ever set against one from the other.
 */
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

import { renderReport } from "./report.ts"
import type { Results } from "./results.ts"

export function merge(session: Results, curve: Results): Results {
  if (session.meta.kirana !== curve.meta.kirana)
    throw new Error(
      `the halves measured different releases: ${session.meta.kirana} and ${curve.meta.kirana}`
    )
  const ours = (corpus: string) => corpus.startsWith("scale-curve/")
  return {
    meta: {
      ...session.meta,
      rounds: {
        ...session.meta.rounds,
        ...(curve.meta.rounds.scaleCurve === undefined
          ? {}
          : { scaleCurve: curve.meta.rounds.scaleCurve }),
      },
      conformance: {
        ...session.meta.conformance,
        ...(curve.meta.conformance["scale-curve"] === undefined
          ? {}
          : { "scale-curve": curve.meta.conformance["scale-curve"] }),
      },
      scaleCurve: {
        hardware: curve.meta.hardware,
        ...(curve.meta.runner ? { runner: curve.meta.runner } : {}),
        ...(curve.meta.run ? { run: curve.meta.run } : {}),
      },
    },
    rows: [
      ...session.rows.filter((row) => !ours(row.corpus)),
      ...curve.rows.filter((row) => ours(row.corpus)),
    ],
    comparisons: [
      ...session.comparisons.filter((entry) => !ours(entry.corpus)),
      ...curve.comparisons.filter((entry) => ours(entry.corpus)),
    ],
  }
}

if (import.meta.main) {
  const args = process.argv.slice(2)
  const at = args.indexOf("--out")
  const out = at < 0 ? undefined : args[at + 1]
  const [sessionFile, curveFile] = args.filter(
    (arg, index) => !arg.startsWith("--") && args[index - 1] !== "--out"
  )
  if (!sessionFile || !curveFile || !out) {
    console.error(
      "usage: bun src/merge.ts <session>/results.json <scale-curve>/results.json --out <folder>"
    )
    process.exit(2)
  }
  const read = (file: string) =>
    JSON.parse(readFileSync(file, "utf8")) as Results
  const results = merge(read(sessionFile), read(curveFile))
  const report = renderReport(results)
  mkdirSync(out, { recursive: true })
  writeFileSync(
    path.join(out, "results.json"),
    `${JSON.stringify(results, null, 2)}\n`
  )
  writeFileSync(path.join(out, "report.md"), report)
  if (process.env.GITHUB_STEP_SUMMARY)
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, report)
  console.error(`written: ${out}/results.json and report.md`)
}
