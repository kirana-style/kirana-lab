import { describe, expect, it } from "vite-plus/test"

import {
  compareMedians,
  generator,
  median,
  quantile,
  summarize,
} from "../src/stats.ts"

describe("summarize", () => {
  it("gives the median, p95, range and standard deviation", () => {
    const summary = summarize([5, 1, 4, 2, 3])
    expect(summary).toMatchObject({ n: 5, median: 3, min: 1, max: 5 })
    expect(summary.p95).toBeCloseTo(4.8)
    expect(summary.stdev).toBeCloseTo(Math.sqrt(2.5))
  })

  it("averages the two middle values of an even count", () => {
    expect(median([1, 2, 3, 10])).toBe(2.5)
  })

  it("interpolates quantiles between neighbours", () => {
    expect(quantile([0, 10], 0.25)).toBe(2.5)
    expect(quantile([], 0.5)).toBeNaN()
  })

  it("reports no spread for one sample", () => {
    expect(summarize([7])).toMatchObject({ median: 7, stdev: 0 })
  })
})

describe("generator", () => {
  it("repeats the same sequence for the same seed", () => {
    const a = generator(42)
    const b = generator(42)
    expect([a(), a(), a()]).toEqual([b(), b(), b()])
    expect(generator(43)()).not.toBe(generator(42)())
  })
})

describe("compareMedians", () => {
  const fast = [100, 102, 98, 101, 99, 103, 97, 100, 101, 99]
  const slow = fast.map((value) => value * 2.5)

  it("calls a clear difference, with an interval that excludes 1", () => {
    const result = compareMedians(fast, slow)
    expect(result.ratio).toBeCloseTo(0.4)
    expect(result.high).toBeLessThan(1)
    expect(result.verdict).toBe("lower")
    expect(compareMedians(slow, fast).verdict).toBe("higher")
  })

  it("calls no difference when the intervals overlap 1", () => {
    const noisy = [90, 110, 95, 105, 100, 92, 108, 98, 102, 101]
    const other = [101, 93, 107, 99, 96, 104, 100, 91, 109, 100]
    expect(compareMedians(noisy, other).verdict).toBe("no clear difference")
  })

  it("is exact for deterministic measures, like sizes", () => {
    const result = compareMedians([800, 800], [1000, 1000])
    expect(result).toEqual({
      ratio: 0.8,
      low: 0.8,
      high: 0.8,
      verdict: "lower",
    })
    expect(compareMedians([5, 5], [5, 5]).verdict).toBe("no clear difference")
  })

  it("gives the same interval for the same samples", () => {
    expect(compareMedians(fast, slow)).toEqual(compareMedians(fast, slow))
  })
})
