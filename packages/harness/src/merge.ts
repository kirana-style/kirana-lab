/**
 * Joins a CI session's parts into one `results.json` and `report.md`: the measuring session
 * (`run.ts --no-scale-curve --no-conformance`) and the jobs that ran on runners of their own, the
 * scale curve (`--only-scale-curve`), the previous release (`--only-previous`) and conformance
 * (`--only-conformance`), each named in its file (`meta.part`).
 *
 *   bun src/merge.ts <session>/results.json <part>/results.json … --out <folder>
 *
 * Every comparison stays within its part: each compared its implementations on one machine, and a
 * part's machine is recorded beside the session's (`meta.scaleCurve`, `meta.previous.machine`), so
 * no number from one machine is ever set against one from another. Conformance measures nothing:
 * its outcome per app replaces the session's "not run".
 */
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

import { renderReport } from "./report.ts"
import type { Meta, Results } from "./results.ts"

/** The corpora a part measured on its own runner, by the part that measures them. */
const PARTS = { scaleCurve: "scale-curve/", previous: "previous/" } as const
type Part = NonNullable<Meta["part"]>

/** Which part a file is, as `run.ts` wrote it. */
function partOf(results: Results): Part {
  if (results.meta.part) return results.meta.part
  throw new Error(
    "a part must be the scale curve, the previous release or conformance (run.ts --only-…)"
  )
}

const machineOf = (meta: Meta) => ({
  hardware: meta.hardware,
  ...(meta.runner ? { runner: meta.runner } : {}),
  ...(meta.run ? { run: meta.run } : {}),
})

export function merge(session: Results, ...parts: Results[]): Results {
  const owned = (corpus: string) =>
    Object.values(PARTS).some((prefix) => corpus.startsWith(prefix))
  let merged: Results = {
    meta: session.meta,
    rows: session.rows.filter((row) => !owned(row.corpus)),
    comparisons: session.comparisons.filter((entry) => !owned(entry.corpus)),
  }
  for (const part of parts) {
    if (part.meta.kirana !== session.meta.kirana)
      throw new Error(
        `the parts measured different releases: ${session.meta.kirana} and ${part.meta.kirana}`
      )
    const kind = partOf(part)
    const ours = (corpus: string) =>
      kind !== "conformance" && corpus.startsWith(PARTS[kind])
    const meta: Meta =
      kind === "conformance"
        ? {
            ...merged.meta,
            conformance: {
              ...merged.meta.conformance,
              ...part.meta.conformance,
            },
          }
        : kind === "scaleCurve"
          ? {
              ...merged.meta,
              rounds: {
                ...merged.meta.rounds,
                scaleCurve: part.meta.rounds.scaleCurve!,
              },
              // The curve's conformance, one entry per size (`scale-curve/<size>`).
              conformance: {
                ...merged.meta.conformance,
                ...Object.fromEntries(
                  Object.entries(part.meta.conformance).filter(([corpus]) =>
                    corpus.startsWith("scale-curve")
                  )
                ),
              },
              scaleCurve: machineOf(part.meta),
            }
          : {
              ...merged.meta,
              previous: {
                ...part.meta.previous!,
                machine: machineOf(part.meta),
              },
            }
    merged = {
      meta,
      rows: [...merged.rows, ...part.rows.filter((row) => ours(row.corpus))],
      comparisons: [
        ...merged.comparisons,
        ...part.comparisons.filter((entry) => ours(entry.corpus)),
      ],
    }
  }
  return merged
}

if (import.meta.main) {
  const args = process.argv.slice(2)
  const at = args.indexOf("--out")
  const out = at < 0 ? undefined : args[at + 1]
  const [sessionFile, ...partFiles] = args.filter(
    (arg, index) => !arg.startsWith("--") && args[index - 1] !== "--out"
  )
  if (!sessionFile || partFiles.length === 0 || !out) {
    console.error(
      "usage: bun src/merge.ts <session>/results.json <part>/results.json … --out <folder>"
    )
    process.exit(2)
  }
  const read = (file: string) =>
    JSON.parse(readFileSync(file, "utf8")) as Results
  const results = merge(read(sessionFile), ...partFiles.map(read))
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
