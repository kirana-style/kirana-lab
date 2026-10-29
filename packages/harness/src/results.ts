/**
 * The shape of `results.json`: everything a run measured, with every raw sample, and the
 * comparisons computed from them. The report and Kirana's site read this file; nothing else is the
 * source of a published number.
 */
import { compareMedians, summarize } from "./stats.ts"
import type { Ratio, Summary } from "./stats.ts"

/**
 * StyleX twice: compiled by its Babel plugin, and by the Rust (SWC) compiler. Kirana three times:
 * as published, with dense class names (`src/targets.ts`), measured from the release that has
 * them, and at the release before (`kirana-previous`), in the builds only.
 */
export const TARGETS = [
  "kirana",
  "kirana-dense",
  "kirana-previous",
  "stylex",
  "stylex-swc",
  "tailwind",
] as const
export type Target = (typeof TARGETS)[number]

/** Every target Kirana is compared with. */
export const OTHERS = TARGETS.filter(
  (target): target is Exclude<Target, "kirana"> => target !== "kirana"
)

export type Tier = "A" | "B" | "C" | "D"

/** What `scripts/sync-previous.ts` prepared: the previous release, or why it is left out. */
export type Previous = { kirana: string; skipped?: string }

export type Meta = {
  /** ISO date and time the run started. */
  date: string
  /** The lab commit the corpus was built from. */
  corpusCommit: string
  /** The Kirana release measured, from npm. */
  kirana: string
  /** Every other tool version that decides the outcome. */
  targets: Record<string, string>
  hardware: { cpu: string; cores: number; ramGb: number; os: string }
  runtime: { node: string; bun: string; chrome?: string }
  /** The runner image, on CI; absent on a developer machine. */
  runner?: string
  /** The CI run that produced the file. */
  run?: string
  /**
   * `largeDom`: the rounds at each size of the large-dom corpus; `scaleCurve`: the cold builds at
   * each size of the scale curve. Each only when the run measured it.
   */
  rounds: {
    build: number
    runtime: number
    warmup: number
    largeDom?: number
    scaleCurve?: number
    /** Editing sessions against the language server, and `kirana-style check` runs. */
    editor?: number
  }
  /** The machine the scale curve ran on, when a job of its own measured it (`src/merge.ts`). */
  scaleCurve?: Pick<Meta, "hardware" | "runner" | "run">
  /**
   * The release before `kirana`, built beside it (`kirana-previous`), or why it was not: a release
   * that cannot build today's corpus, or none before it (`scripts/sync-previous.ts`).
   */
  previous?: Previous
  /** Conformance per app, run before the numbers are trusted (fairness rule 8). */
  conformance: Record<string, "passed" | "failed" | "not run">
}

/** One cell: an implementation's samples of one metric, in one scenario, on one corpus. */
export type Row = Summary & {
  tier: Tier
  /**
   * `three-way/web`, …, or `three-way/total` for the sum of the apps; `large-dom` for that app's
   * build, and `large-dom/<rows>` for its page at one size.
   */
  corpus: string
  target: Target
  scenario: string
  metric: string
  unit: string
  samples: number[]
  labels: string[]
}

/** Kirana against one other implementation on one cell. */
export type Comparison = Ratio & {
  tier: Tier
  corpus: string
  scenario: string
  metric: string
  unit: string
  against: Exclude<Target, "kirana">
}

export type Results = { meta: Meta; rows: Row[]; comparisons: Comparison[] }

/** A target without samples, or absent, was not measured: it gets no row and no comparison. */
export type Cell = Omit<Row, keyof Summary | "samples" | "target"> & {
  samples: Partial<Record<Target, number[]>>
}

/** Rows and comparisons from measured cells, every target's samples side by side. */
export function tabulate(cells: readonly Cell[]): {
  rows: Row[]
  comparisons: Comparison[]
} {
  const rows: Row[] = []
  const comparisons: Comparison[] = []
  for (const { samples, ...cell } of cells) {
    for (const target of TARGETS) {
      const list = samples[target] ?? []
      if (list.length === 0) continue
      rows.push({ ...cell, target, samples: list, ...summarize(list) })
    }
    const kirana = samples.kirana ?? []
    if (kirana.length === 0) continue
    for (const against of OTHERS) {
      const other = samples[against] ?? []
      if (other.length === 0) continue
      const ratio = compareMedians(kirana, other)
      // No ratio to state (`compareMedians`): the rows still show both medians.
      if (!ratio) continue
      const { tier, corpus, scenario, metric, unit } = cell
      comparisons.push({
        tier,
        corpus,
        scenario,
        metric,
        unit,
        against,
        ...ratio,
      })
    }
  }
  return { rows, comparisons }
}
