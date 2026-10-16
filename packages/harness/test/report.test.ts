import { describe, expect, it } from "vite-plus/test"

import { formatRatio, formatValue, renderReport } from "../src/report.ts"
import { tabulate } from "../src/results.ts"
import type { Meta, Results } from "../src/results.ts"

const meta: Meta = {
  date: "2026-10-16T00:00:00.000Z",
  corpusCommit: "abcdef1234567",
  kirana: "0.2.0",
  targets: { "@stylexjs/stylex": "0.19.1", tailwindcss: "4.3.3" },
  hardware: { cpu: "Test CPU", cores: 4, ramGb: 16, os: "Linux" },
  runtime: { node: "24.0.0", bun: "1.4.3" },
  rounds: { build: 3, runtime: 0, warmup: 1 },
  conformance: { web: "passed" },
}

function results(conformance: Meta["conformance"] = meta.conformance): Results {
  return {
    meta: { ...meta, conformance },
    ...tabulate([
      {
        tier: "A",
        corpus: "three-way/web",
        scenario: "build",
        metric: "build",
        unit: "ms",
        labels: ["cold"],
        samples: {
          kirana: [1000, 1010, 990],
          stylex: [3000, 3030, 2970],
          tailwind: [1500, 1510, 1490],
        },
      },
      {
        tier: "B",
        corpus: "three-way/web",
        scenario: "build",
        metric: "cssRaw",
        unit: "bytes",
        labels: ["minified"],
        samples: {
          kirana: [72_400, 72_400, 72_400],
          stylex: [65_400, 65_400, 65_400],
          tailwind: [184_200, 184_200, 184_200],
        },
      },
    ]),
  }
}

describe("formatting", () => {
  it("formats sizes, times and counts", () => {
    expect(formatValue(72_400, "bytes")).toBe("72.4 kB")
    expect(formatValue(1410, "ms")).toBe("1.41 s")
    expect(formatValue(14.04, "ms")).toBe("14.0 ms")
    expect(formatValue(11, "count")).toBe("11")
    expect(formatValue(Number.NaN, "ms")).toBe("–")
  })

  it("shows the interval only when it is not a point", () => {
    expect(
      formatRatio({
        ratio: 0.33,
        low: 0.32,
        high: 0.34,
        verdict: "lower",
        tier: "A",
        corpus: "",
        scenario: "",
        metric: "",
        unit: "",
        against: "stylex",
      })
    ).toBe("0.33× <sub>0.32–0.34</sub> lower")
    expect(formatRatio(undefined)).toBe("–")
  })
})

describe("renderReport", () => {
  it("states the machine and versions, then where Kirana is behind", () => {
    const report = renderReport(results())
    expect(report).toContain(
      "# Kirana 0.2.0, measured against StyleX and Tailwind CSS"
    )
    expect(report).toContain("Test CPU, 4 cores, 16 GB, Linux")
    expect(report).toContain("`@stylexjs/stylex` 0.19.1")
    expect(report.indexOf("## Where Kirana is behind")).toBeLessThan(
      report.indexOf("## Build and output")
    )
    expect(report).toMatch(/\*\*CSS\*\*, `apps\/web`: 1\.11× StyleX/)
  })

  it("shows counts without a verdict, and keeps them out of where Kirana is behind", () => {
    const counted = results()
    const judged = renderReport({
      ...counted,
      ...tabulate([
        {
          tier: "B",
          corpus: "three-way/total",
          scenario: "build",
          metric: "rules",
          unit: "count",
          labels: [],
          samples: { kirana: [1189], stylex: [1059], tailwind: [724] },
        },
      ]),
    })
    expect(judged).toContain("not judged")
    expect(judged).toContain("In this run, no measure has Kirana higher")
  })

  it("says when the numbers come from a developer's machine", () => {
    expect(renderReport(results())).toContain("a developer's, not a CI runner")
    expect(
      renderReport({ ...results(), meta: { ...meta, runner: "ubuntu24 1" } })
    ).toContain("shared CI runner")
  })

  it("gives StyleX (SWC) its own columns when the run measured it", () => {
    const four = tabulate([
      {
        tier: "A",
        corpus: "three-way/web",
        scenario: "build",
        metric: "build",
        unit: "ms",
        labels: ["cold"],
        samples: {
          kirana: [1000, 1010, 990],
          stylex: [3000, 3030, 2970],
          "stylex-swc": [2000, 2020, 1980],
          tailwind: [1500, 1510, 1490],
        },
      },
    ])
    const report = renderReport({ meta, ...four })
    expect(report).toContain(
      "# Kirana 0.2.0, measured against StyleX, StyleX (SWC) and Tailwind CSS"
    )
    expect(report).toContain(
      "| Measure | Kirana | StyleX | StyleX (SWC) | Tailwind CSS | Kirana ÷ StyleX | Kirana ÷ StyleX (SWC) | Kirana ÷ Tailwind CSS |"
    )
    expect(report).toContain(
      "| --- | --- | --- | --- | --- | --- | --- | --- |"
    )
    expect(report).toContain("`@stylexswc/unplugin`, the Rust compiler")
    expect(four.comparisons.map((comparison) => comparison.against)).toEqual([
      "stylex",
      "stylex-swc",
      "tailwind",
    ])
  })

  it("leaves out a target the run did not measure", () => {
    const report = renderReport(results())
    expect(report).toContain(
      "| Measure | Kirana | StyleX | Tailwind CSS | Kirana ÷ StyleX | Kirana ÷ Tailwind CSS |"
    )
    expect(report).not.toContain("SWC")
  })

  it("has no medals", () => {
    expect(renderReport(results())).not.toMatch(/🥇|🥈|🥉/)
  })

  it("warns that numbers are not to be quoted when conformance did not pass", () => {
    expect(renderReport(results({ web: "failed" }))).toContain(
      "must not be quoted"
    )
    expect(renderReport(results())).not.toContain("must not be quoted")
  })
})
