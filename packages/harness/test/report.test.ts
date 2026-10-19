import { describe, expect, it } from "vite-plus/test"

import {
  formatRatio,
  formatValue,
  ratioParts,
  renderReport,
} from "../src/report.ts"
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
    expect(formatValue(19_424_500, "bytes")).toBe("19.42 MB")
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

  it("gives three places when two would show a real difference as 1.00", () => {
    expect(
      formatRatio({
        ratio: 1.003,
        low: 1.002,
        high: 1.004,
        verdict: "higher",
        tier: "B",
        corpus: "",
        scenario: "",
        metric: "jsGzip",
        unit: "bytes",
        against: "tailwind",
      })
    ).toBe("1.003× <sub>1.002–1.004</sub> **higher**")
    expect(ratioParts({ ratio: 1.04, low: 1.001, high: 1.08 })).toEqual([
      "1.040",
      "1.001",
      "1.080",
    ])
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

  it("sets the editor's measures against their budgets, and lists a missed one first", () => {
    const editor = tabulate([
      {
        tier: "D",
        corpus: "editor",
        scenario: "the three apps, 318 files open",
        metric: "hoverP95",
        unit: "ms",
        labels: [],
        samples: { kirana: [12.1, 12.9, 12.4] },
      },
      {
        tier: "D",
        corpus: "editor",
        scenario: "the three apps, 318 files open",
        metric: "diagnosticsP95",
        unit: "ms",
        labels: [],
        samples: { kirana: [240, 250, 245] },
      },
    ])
    const report = renderReport({
      meta: { ...meta, rounds: { ...meta.rounds, editor: 3 } },
      ...editor,
    })
    expect(report).toContain("## In the editor")
    expect(report).toContain("the three apps, 318 files open")
    expect(report).toMatch(/\| Hover, p95 \| 12\.4 ms .*\| ≤ 50\.0 ms \|/)
    expect(report).toContain("≤ 200.0 ms **missed**")
    expect(report).toContain(
      "- **Diagnostics after an edit, p95**, in the editor: 245.0 ms, over its 200.0 ms budget."
    )
    expect(report.indexOf("over its")).toBeLessThan(
      report.indexOf("## Build and output")
    )
    expect(report).toContain("3 editing sessions")
    expect(report).toContain(
      "Against the other tools, no measure has Kirana higher with confidence."
    )
    // Not a build: the editor's rows stay out of "Build and output".
    expect(report).not.toContain("### `apps/undefined`")
  })

  it("names the large-dom corpus by its size, and says how it was driven", () => {
    const large = tabulate([
      {
        tier: "B",
        corpus: "large-dom/5000",
        scenario: "build",
        metric: "classBytes",
        unit: "bytes",
        labels: ["rendered"],
        samples: { kirana: [2_255_994], stylex: [1_776_591] },
      },
      {
        tier: "C",
        corpus: "large-dom/5000",
        scenario: "CPU throttled 4×, about 112608 elements",
        metric: "filter",
        unit: "ms",
        labels: ["throttle-4"],
        samples: { kirana: [1600, 1610, 1590], stylex: [1100, 1140, 1120] },
      },
    ])
    const report = renderReport({
      meta: { ...meta, rounds: { ...meta.rounds, largeDom: 3 } },
      ...large,
    })
    expect(report).toContain("### `large-dom`, 5,000 rows")
    expect(report).toContain(
      "### `large-dom`, 5,000 rows, CPU throttled 4×, about 112608 elements"
    )
    expect(report).toMatch(
      /\*\*Filter, to the next frame\*\*, `large-dom`, 5,000 rows, CPU throttled 4×/
    )
    expect(report).toContain("3 rounds at each large-dom size")
    expect(report).toContain("- **large-dom** is an order table")
    expect(renderReport(results())).not.toContain("large-dom")
  })

  it("leaves out a target the run did not measure", () => {
    const report = renderReport(results())
    expect(report).toContain(
      "| Measure | Kirana | StyleX | Tailwind CSS | Kirana ÷ StyleX | Kirana ÷ Tailwind CSS |"
    )
    expect(report).not.toContain("SWC")
  })

  it("shows dense names as dense ÷ hashed, and never as Kirana behind", () => {
    const report = renderReport({
      meta,
      ...tabulate([
        {
          tier: "B",
          corpus: "three-way/total",
          scenario: "build",
          metric: "cssGzip",
          unit: "bytes",
          labels: ["minified"],
          samples: {
            kirana: [64_000, 64_000, 64_000],
            "kirana-dense": [51_200, 51_200, 51_200],
            stylex: [62_800, 62_800, 62_800],
          },
        },
        {
          tier: "B",
          corpus: "large-dom/1000",
          scenario: "build",
          metric: "classBytes",
          unit: "bytes",
          labels: ["rendered"],
          samples: {
            kirana: [2_260_000],
            "kirana-dense": [1_582_000],
            stylex: [1_780_000],
          },
        },
      ]),
    })
    expect(report).toContain("# Kirana 0.2.0, measured against StyleX\n")
    expect(report).toContain("## Dense names")
    expect(report).toContain("| All apps | CSS, gzip | 0.80× |")
    expect(report).toContain(
      "| `large-dom`, 1,000 rows | `class` attributes | 0.70× |"
    )
    // Hashed Kirana is higher than its dense build, which is no loss of Kirana's.
    const behind = report.slice(
      report.indexOf("## Where Kirana is behind"),
      report.indexOf("## Dense names")
    )
    expect(behind).not.toContain("dense")
    expect(behind).toContain("StyleX")
    expect(report).toContain("- **Kirana (dense names)** is the Kirana corpus")
    expect(report).toContain(
      "| Measure | Kirana | Kirana (dense names) | StyleX | Kirana ÷ StyleX |"
    )
    expect(report).not.toContain("Kirana ÷ Kirana")
    expect(renderReport(results())).not.toContain("Dense names")
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
