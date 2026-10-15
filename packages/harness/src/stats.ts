/**
 * The statistics every comparison in a report uses (METHODOLOGY.md, "Statistics"):
 *
 * - a cell is summarised by its median, p95, minimum, maximum and standard deviation, with every
 *   raw sample kept beside it;
 * - two implementations are compared by the ratio of their medians, Kirana's over the other's,
 *   with a 95 % confidence interval from a bootstrap: resample each side with replacement, take the
 *   ratio of the resampled medians, and read the 2.5th and 97.5th percentiles of 10,000 of them;
 * - a difference is called one only when that interval excludes 1.0.
 *
 * The bootstrap's generator is seeded, so the same samples always give the same interval.
 */

export type Summary = {
  n: number
  median: number
  p95: number
  min: number
  max: number
  stdev: number
}

/** The `q` quantile of sorted values, interpolating between neighbours (R's type 7). */
export function quantile(sorted: readonly number[], q: number): number {
  if (sorted.length === 0) return Number.NaN
  const position = (sorted.length - 1) * q
  const below = Math.floor(position)
  const above = Math.ceil(position)
  return sorted[below]! + (sorted[above]! - sorted[below]!) * (position - below)
}

const ascending = (values: readonly number[]) =>
  [...values].sort((a, b) => a - b)

export const median = (values: readonly number[]) =>
  quantile(ascending(values), 0.5)

export function summarize(samples: readonly number[]): Summary {
  const sorted = ascending(samples)
  const n = sorted.length
  const mean = sorted.reduce((sum, value) => sum + value, 0) / n
  const variance =
    n > 1
      ? sorted.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (n - 1)
      : 0
  return {
    n,
    median: quantile(sorted, 0.5),
    p95: quantile(sorted, 0.95),
    min: sorted[0] ?? Number.NaN,
    max: sorted.at(-1) ?? Number.NaN,
    stdev: Math.sqrt(variance),
  }
}

/** A small, fast, seeded generator (mulberry32): the same seed gives the same sequence. */
export function generator(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export type Verdict = "lower" | "higher" | "no clear difference"

export type Ratio = {
  /** Kirana's median over the other's: below 1 is lower for Kirana. */
  ratio: number
  low: number
  high: number
  verdict: Verdict
}

/**
 * The ratio of `kirana`'s median to `other`'s, with its bootstrapped 95 % interval. Lower is lower
 * for Kirana: a ratio of 0.4 is Kirana at 40 % of the other.
 */
export function compareMedians(
  kirana: readonly number[],
  other: readonly number[],
  { resamples = 10_000, seed = 1 } = {}
): Ratio {
  const ratio = median(kirana) / median(other)
  const random = generator(seed)
  const pick = (values: readonly number[]) => {
    const resampled = Array.from(
      { length: values.length },
      () => values[Math.floor(random() * values.length)]!
    )
    return median(resampled)
  }
  const ratios = Array.from(
    { length: resamples },
    () => pick(kirana) / pick(other)
  )
  const sorted = ascending(ratios)
  const low = quantile(sorted, 0.025)
  const high = quantile(sorted, 0.975)
  const verdict: Verdict =
    high < 1 ? "lower" : low > 1 ? "higher" : "no clear difference"
  return { ratio, low, high, verdict }
}
