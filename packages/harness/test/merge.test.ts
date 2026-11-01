import { describe, expect, it } from "vite-plus/test"

import { merge } from "../src/merge.ts"
import { renderReport } from "../src/report.ts"
import { tabulate } from "../src/results.ts"
import type { Meta, Results } from "../src/results.ts"

const meta: Meta = {
  date: "2026-10-16T00:00:00.000Z",
  corpusCommit: "abcdef1234567",
  kirana: "0.2.2",
  targets: {},
  hardware: { cpu: "Session CPU", cores: 4, ramGb: 16, os: "Linux" },
  runtime: { node: "24.0.0", bun: "1.4.3" },
  runner: "ubuntu-26.04",
  rounds: { build: 3, runtime: 0, warmup: 1 },
  conformance: { web: "passed" },
}

const build = (corpus: string, kirana: number[], stylex: number[]) =>
  tabulate([
    {
      tier: "A",
      corpus,
      scenario: "build",
      metric: "build",
      unit: "ms",
      labels: ["cold"],
      samples: { kirana, stylex },
    },
    {
      tier: "B",
      corpus,
      scenario: "build",
      metric: "totalGzip",
      unit: "bytes",
      labels: ["minified"],
      samples: { kirana: [1000, 1000, 1000], stylex: [900, 900, 900] },
    },
  ])

const session: Results = {
  meta,
  ...build("three-way/web", [1000, 1010, 990], [3000, 3030, 2970]),
}

const curve: Results = {
  meta: {
    ...meta,
    hardware: { cpu: "Curve CPU", cores: 4, ramGb: 16, os: "Linux" },
    runner: "ubuntu-26.04 2",
    rounds: { build: 0, runtime: 0, warmup: 1, scaleCurve: 3 },
    part: "scaleCurve",
    conformance: {
      "scale-curve/100": "passed",
      "scale-curve/1000": "passed",
    },
  },
  rows: [
    ...build("scale-curve/100", [200, 210, 190], [800, 810, 790]).rows,
    ...build("scale-curve/1000", [900, 910, 890], [7000, 7010, 6990]).rows,
  ],
  comparisons: [
    ...build("scale-curve/100", [200, 210, 190], [800, 810, 790]).comparisons,
    ...build("scale-curve/1000", [900, 910, 890], [7000, 7010, 6990])
      .comparisons,
  ],
}

/** The previous release, built beside this one on a third runner (`run.ts --only-previous`). */
const previousPart: Results = {
  meta: {
    ...meta,
    hardware: { cpu: "Previous CPU", cores: 4, ramGb: 16, os: "Linux" },
    runner: "ubuntu-26.04 3",
    conformance: {},
    previous: { kirana: "0.2.1" },
    part: "previous",
  },
  ...tabulate([
    {
      tier: "A",
      corpus: "previous/total",
      scenario: "build",
      metric: "build",
      unit: "ms",
      labels: ["cold"],
      samples: {
        kirana: [1000, 1010, 990],
        "kirana-previous": [1100, 1110, 1090],
      },
    },
  ]),
}

describe("merge", () => {
  it("keeps each half's own corpora, and records the curve's machine beside the session's", () => {
    const merged = merge(session, curve)
    expect(new Set(merged.rows.map((row) => row.corpus))).toEqual(
      new Set(["three-way/web", "scale-curve/100", "scale-curve/1000"])
    )
    expect(merged.meta.hardware.cpu).toBe("Session CPU")
    expect(merged.meta.scaleCurve?.hardware.cpu).toBe("Curve CPU")
    expect(merged.meta.rounds.scaleCurve).toBe(3)
    expect(merged.meta.conformance).toEqual({
      web: "passed",
      "scale-curve/100": "passed",
      "scale-curve/1000": "passed",
    })
  })

  it("takes the previous release's builds from its own part, with its machine", () => {
    const merged = merge(session, curve, previousPart)
    expect(new Set(merged.rows.map((row) => row.corpus))).toEqual(
      new Set([
        "three-way/web",
        "scale-curve/100",
        "scale-curve/1000",
        "previous/total",
      ])
    )
    expect(merged.meta.previous).toEqual({
      kirana: "0.2.1",
      machine: {
        hardware: { cpu: "Previous CPU", cores: 4, ramGb: 16, os: "Linux" },
        runner: "ubuntu-26.04 3",
      },
    })
    expect(merged.meta.scaleCurve?.hardware.cpu).toBe("Curve CPU")
    const report = renderReport(merged)
    expect(report).toContain("Kirana 0.2.2 over Kirana 0.2.1")
    expect(report).toContain("on their own runner (Previous CPU, 4 cores)")
    // A part that is neither is refused.
    expect(() => merge(session, session)).toThrow("a part must be")
  })

  it("takes conformance from its own part, over the session's not run", () => {
    const measuring: Results = {
      ...session,
      meta: {
        ...meta,
        conformance: { web: "not run", "large-dom": "not run" },
        editorFailed:
          "the language server did not answer workspace/symbol within 120 s",
      },
    }
    const checked: Results = {
      meta: {
        ...meta,
        hardware: { cpu: "Conformance CPU", cores: 4, ramGb: 16, os: "Linux" },
        conformance: { web: "passed", "large-dom": "failed" },
        part: "conformance",
      },
      rows: [],
      comparisons: [],
    }
    const merged = merge(measuring, curve, checked)
    expect(merged.meta.conformance).toEqual({
      web: "passed",
      "large-dom": "failed",
      "scale-curve/100": "passed",
      "scale-curve/1000": "passed",
    })
    // It measured nothing: the session's rows and machine stand.
    expect(merged.rows).toHaveLength(session.rows.length + curve.rows.length)
    expect(merged.meta.hardware.cpu).toBe("Session CPU")
    // An editor that stopped answering is said, not left out.
    expect(renderReport(merged)).toContain(
      "Kirana's own language server was not measured: the language server did not answer workspace/symbol within 120 s."
    )
  })

  it("refuses halves that measured different releases", () => {
    expect(() =>
      merge(session, { ...curve, meta: { ...curve.meta, kirana: "0.2.1" } })
    ).toThrow("different releases")
  })

  it("reports the curve at every size, on its own machine", () => {
    const report = renderReport(merge(session, curve))
    expect(report).toContain("## Scale curve")
    expect(report).toContain("on its own runner (Curve CPU, 4 cores)")
    expect(report).toContain("| | 100 | 1,000 |")
    expect(report).toContain("| Kirana ÷ StyleX | 0.25×")
    expect(report).toContain("### `scale-curve`, 1,000 components")
    expect(report).toContain("3 cold builds at each scale-curve size")
    // The curve's sizes are not repeated under the session's own tables.
    expect(report.indexOf("### `scale-curve`, 100 components")).toBeGreaterThan(
      report.indexOf("## Scale curve")
    )
    expect(renderReport(session)).not.toContain("Scale curve")
    // Without a runner, both halves ran on one machine: nothing to tell apart.
    const local = { ...curve, meta: { ...curve.meta, runner: undefined } }
    expect(renderReport(merge(session, local))).not.toContain("its own runner")
  })
})
