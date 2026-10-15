/**
 * `report.md` from `results.json`: what a reader sees of a run. It states the machine and the
 * versions first, then where Kirana is behind, then every table, then how to read them. A number
 * appears here only as `results.json` has it, and a difference is called one only when its
 * confidence interval excludes 1.0; there are no medals.
 */
import type { Comparison, Results, Row, Target } from "./results.ts"

/** Every measure a report shows, in order, with how it reads. Lower is better for all of them. */
/**
 * `judged: false` marks a count shown for what it is, with no verdict: an atomic stylesheet always
 * holds more, smaller rules than one of composed classes, and what that costs is already measured
 * by the sizes and the browser times.
 */
export const MEASURES: Record<
  string,
  { label: string; tier: "A" | "B" | "C"; judged?: false }
> = {
  build: { label: "Build, cold", tier: "A" },
  cssRaw: { label: "CSS", tier: "B" },
  cssGzip: { label: "CSS, gzip", tier: "B" },
  cssBrotli: { label: "CSS, brotli", tier: "B" },
  jsRaw: { label: "JavaScript", tier: "B" },
  jsGzip: { label: "JavaScript, gzip", tier: "B" },
  totalGzip: { label: "CSS + JavaScript, gzip", tier: "B" },
  rules: { label: "Style rules", tier: "B", judged: false },
  declarations: { label: "Declarations", tier: "B", judged: false },
  scheme: { label: "Colour-scheme switch, style recalc", tier: "C" },
  schemeRecalcs: { label: "Colour-scheme switch, recalcs", tier: "C" },
  hover: { label: "Hover, style recalc", tier: "C" },
  hoverRecalcs: { label: "Hover, recalcs", tier: "C" },
  layout: { label: "Layout", tier: "C" },
  framesP95: { label: "Frame time, p95", tier: "C" },
}

const NAMES: Record<Target, string> = {
  kirana: "Kirana",
  stylex: "StyleX",
  tailwind: "Tailwind CSS",
}

export function formatValue(value: number, unit: string): string {
  if (!Number.isFinite(value)) return "–"
  if (unit === "bytes") return `${(value / 1000).toFixed(1)} kB`
  if (unit === "ms")
    return value >= 1000
      ? `${(value / 1000).toFixed(2)} s`
      : `${value.toFixed(1)} ms`
  return value.toFixed(0)
}

/** A cell: the median, and the range when the samples vary. */
function cell(row: Row | undefined): string {
  if (!row) return "–"
  const value = formatValue(row.median, row.unit)
  return row.min === row.max
    ? value
    : `${value} <sub>${formatValue(row.min, row.unit)}–${formatValue(row.max, row.unit)}</sub>`
}

export function formatRatio(comparison: Comparison | undefined): string {
  if (!comparison) return "–"
  const { ratio, low, high, verdict } = comparison
  if (MEASURES[comparison.metric]?.judged === false)
    return `${ratio.toFixed(2)}× not judged`
  const shown = `${ratio.toFixed(2)}×`
  const interval =
    low === high ? "" : ` <sub>${low.toFixed(2)}–${high.toFixed(2)}</sub>`
  const word =
    verdict === "lower"
      ? "lower"
      : verdict === "higher"
        ? "**higher**"
        : "no clear difference"
  return `${shown}${interval} ${word}`
}

const key = (corpus: string, scenario: string, metric: string) =>
  `${corpus}|${scenario}|${metric}`

function table(results: Results, corpus: string, scenario: string): string[] {
  const rows = new Map<string, Row>(
    results.rows.map((row) => [
      `${key(row.corpus, row.scenario, row.metric)}|${row.target}`,
      row,
    ])
  )
  const comparisons = new Map<string, Comparison>(
    results.comparisons.map((comparison) => [
      `${key(comparison.corpus, comparison.scenario, comparison.metric)}|${comparison.against}`,
      comparison,
    ])
  )
  const metrics = Object.keys(MEASURES).filter((metric) =>
    rows.has(`${key(corpus, scenario, metric)}|kirana`)
  )
  if (metrics.length === 0) return []
  return [
    "| Measure | Kirana | StyleX | Tailwind CSS | Kirana ÷ StyleX | Kirana ÷ Tailwind |",
    "| --- | --- | --- | --- | --- | --- |",
    ...metrics.map((metric) => {
      const at = (target: Target) =>
        rows.get(`${key(corpus, scenario, metric)}|${target}`)
      const versus = (against: string) =>
        comparisons.get(`${key(corpus, scenario, metric)}|${against}`)
      return `| ${MEASURES[metric]!.label} | ${cell(at("kirana"))} | ${cell(at("stylex"))} | ${cell(at("tailwind"))} | ${formatRatio(versus("stylex"))} | ${formatRatio(versus("tailwind"))} |`
    }),
    "",
  ]
}

const corpusName = (corpus: string) =>
  corpus.endsWith("/total") ? "All apps" : `\`apps/${corpus.split("/")[1]}\``

export function renderReport(results: Results): string {
  const { meta } = results
  const failed = Object.entries(meta.conformance).filter(
    ([, state]) => state !== "passed"
  )
  // A loss on the corpus total is listed once; an app's own loss only when the total has none.
  const judged = results.comparisons.filter(
    (comparison) =>
      comparison.verdict === "higher" &&
      MEASURES[comparison.metric]?.judged !== false
  )
  const totalBehind = new Set(
    judged
      .filter((comparison) => comparison.corpus.endsWith("/total"))
      .map((comparison) => `${comparison.metric}|${comparison.against}`)
  )
  const behind = judged.filter(
    (comparison) =>
      comparison.corpus.endsWith("/total") ||
      !totalBehind.has(`${comparison.metric}|${comparison.against}`)
  )
  const corpora = [
    ...new Set(
      results.rows.filter((row) => row.tier !== "C").map((row) => row.corpus)
    ),
  ].sort((a, b) =>
    a.endsWith("/total") ? -1 : b.endsWith("/total") ? 1 : a.localeCompare(b)
  )
  const runtime = [
    ...new Set(
      results.rows
        .filter((row) => row.tier === "C")
        .map((row) => `${row.corpus}|${row.scenario}`)
    ),
  ]
  const targets = Object.entries(meta.targets)
    .map(([name, version]) => `\`${name}\` ${version}`)
    .join(", ")

  const lines = [
    `# Kirana ${meta.kirana}, measured against StyleX and Tailwind CSS`,
    "",
    ...(failed.length > 0
      ? [
          `> [!CAUTION]`,
          `> Conformance has not passed for ${failed.map(([app, state]) => `\`${app}\` (${state})`).join(", ")}. ` +
            "Those builds are not shown to render the same, so their numbers below are for tracking only and must not be quoted (METHODOLOGY.md, rule 8).",
          "",
        ]
      : []),
    "| | |",
    "| --- | --- |",
    `| Date | ${meta.date.slice(0, 10)} |`,
    `| Kirana | ${meta.kirana}, from npm |`,
    `| Versions | ${targets} |`,
    `| Machine | ${meta.runner ? `${meta.runner}: ` : ""}${meta.hardware.cpu}, ${meta.hardware.cores} cores, ${meta.hardware.ramGb} GB, ${meta.hardware.os} |`,
    `| Tools | Node.js ${meta.runtime.node}, Bun ${meta.runtime.bun}${meta.runtime.chrome ? `, Chrome ${meta.runtime.chrome}` : ""} |`,
    `| Rounds | ${meta.rounds.build} cold builds per app after ${meta.rounds.warmup} warm-up; ${meta.rounds.runtime} runtime runs |`,
    `| Corpus | commit \`${meta.corpusCommit.slice(0, 7)}\` |`,
    `| Conformance | ${Object.entries(meta.conformance)
      .map(([app, state]) => `\`${app}\` ${state}`)
      .join(" · ")} |`,
    ...(meta.run ? [`| Run | ${meta.run} |`] : []),
    "",
    "Each cell is the median of every round, with the lowest and highest beneath it when they differ. " +
      "**Kirana ÷ StyleX** is Kirana's median over StyleX's: below 1 is lower for Kirana. " +
      "The small range beside it is the 95 % confidence interval, and a difference is called one only when that interval excludes 1. " +
      "Lower is better for every measure.",
    "",
    "## Where Kirana is behind",
    "",
    ...(behind.length === 0
      ? ["In this run, no measure has Kirana higher with confidence.", ""]
      : [
          ...behind.map(
            (comparison) =>
              `- **${MEASURES[comparison.metric]?.label ?? comparison.metric}**, ${corpusName(comparison.corpus)}${comparison.scenario === "build" ? "" : `, ${comparison.scenario}`}: ` +
              `${comparison.ratio.toFixed(2)}× ${NAMES[comparison.against]} (${comparison.low.toFixed(2)}–${comparison.high.toFixed(2)}).`
          ),
          "",
        ]),
    "## Build and output",
    "",
    ...corpora.flatMap((corpus) => [
      `### ${corpusName(corpus)}`,
      "",
      ...table(results, corpus, "build"),
    ]),
    ...(runtime.length > 0 ? ["## In the browser", ""] : []),
    ...runtime.flatMap((entry) => {
      const [corpus, scenario] = entry.split("|") as [string, string]
      return [
        `### ${corpusName(corpus)}, ${scenario}`,
        "",
        ...table(results, corpus, scenario),
      ]
    }),
    "## Method",
    "",
    "- **Builds** are each app's own `vite build`, cold (its `dist` and Vite cache removed first), interleaved so a round builds Kirana, StyleX and Tailwind CSS in turn.",
    "- **Sizes** are every client asset of the type, each compressed on its own as a browser receives it: gzip at level 9, brotli at quality 11.",
    "- **In the browser**, the page is grown to the same number of elements in each build, the CPU is throttled, and the renderer's own counters are read through the DevTools protocol.",
    meta.runner
      ? "- **The machine** is a shared CI runner, so absolute times move from run to run; compare the ratios within this run, never numbers from two runs."
      : "- **The machine** is a developer's, not a CI runner: these numbers are for checking the lab, not for quoting.",
    "- **Style rules and declarations** are shown without a verdict: an atomic stylesheet always has more, smaller rules, and what that costs is measured by the sizes and the browser times.",
    "- The rules a quoted number has to meet are in METHODOLOGY.md, and every raw sample is in `results.json` beside this file.",
    "",
  ]
  return lines.join("\n")
}
