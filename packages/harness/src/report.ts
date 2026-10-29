/**
 * `report.md` from `results.json`: what a reader sees of a run. It states the machine and the
 * versions first, then where Kirana is behind, then every table, then how to read them. A number
 * appears here only as `results.json` has it, and a difference is called one only when its
 * confidence interval excludes 1.0; there are no medals.
 */
import { BUDGETS } from "../bench/editor.ts"
import { OTHERS, TARGETS } from "./results.ts"
import type { Comparison, Results, Row, Target, Tier } from "./results.ts"

/** Every measure a report shows, in order, with how it reads. Lower is better for all of them. */
/**
 * `judged: false` marks a count shown for what it is, with no verdict: an atomic stylesheet always
 * holds more, smaller rules than one of composed classes, and what that costs is already measured
 * by the sizes and the browser times.
 */
export const MEASURES: Record<
  string,
  { label: string; tier: Tier; judged?: false }
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
  html: { label: "HTML", tier: "B" },
  classBytes: { label: "`class` attributes", tier: "B" },
  filter: { label: "Filter, to the next frame", tier: "C" },
  filterRecalc: { label: "Filter, style recalc", tier: "C" },
  filterLayout: { label: "Filter, layout", tier: "C" },
  restore: { label: "Every row again, to the next frame", tier: "C" },
  restoreRecalc: { label: "Every row again, style recalc", tier: "C" },
  restoreLayout: { label: "Every row again, layout", tier: "C" },
  scrollP95: { label: "Scroll, frame time p95", tier: "C" },
  scrollRecalc: { label: "Scroll, style recalc", tier: "C" },
  hoverRecalc: { label: "Hover across rows, style recalc", tier: "C" },
  heap: { label: "JavaScript heap", tier: "C" },
  indexing: { label: "Indexing the workspace", tier: "D" },
  hoverP50: { label: "Hover, p50", tier: "D" },
  hoverP95: { label: "Hover, p95", tier: "D" },
  diagnosticsP50: { label: "Diagnostics after an edit, p50", tier: "D" },
  diagnosticsP95: { label: "Diagnostics after an edit, p95", tier: "D" },
  memoryIndexed: { label: "Memory, indexed", tier: "D" },
  memoryEnd: { label: "Memory, at the end", tier: "D" },
  check: { label: "kirana-style check", tier: "D" },
}

/** The editor's measures, against the language server's budgets: each a row with its verdict. */
function editorTable(results: Results): { lines: string[]; missed: string[] } {
  const rows = results.rows.filter((row) => row.tier === "D")
  const missed: string[] = []
  const lines = rows.map((row) => {
    const budget = BUDGETS[row.metric as keyof typeof BUDGETS]
    const over = budget !== undefined && row.median > budget
    if (over)
      missed.push(
        `- **${MEASURES[row.metric]?.label ?? row.metric}**, in the editor: ${formatValue(row.median, row.unit)}, over its ${formatValue(budget, row.unit)} budget.`
      )
    return `| ${MEASURES[row.metric]?.label ?? row.metric} | ${cell(row)} | ${budget === undefined ? "–" : `≤ ${formatValue(budget, row.unit)}${over ? " **missed**" : ""}`} |`
  })
  return {
    lines:
      rows.length === 0
        ? []
        : [
            "## In the editor",
            "",
            `Kirana's own language server, ${rows[0]!.scenario}, against its budgets; no other tool here has one. Each cell is the median of the sessions.`,
            "",
            "| Measure | Kirana | Budget |",
            "| --- | --- | --- |",
            ...lines,
            "",
          ],
    missed,
  }
}

const NAMES: Record<Target, string> = {
  kirana: "Kirana",
  "kirana-dense": "Kirana (dense names)",
  "kirana-previous": "Kirana (previous release)",
  stylex: "StyleX",
  "stylex-swc": "StyleX (SWC)",
  tailwind: "Tailwind CSS",
}

/** "A, B and C". */
const list = (names: string[]) =>
  names.length < 2
    ? names.join("")
    : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`

export function formatValue(value: number, unit: string): string {
  if (!Number.isFinite(value)) return "–"
  if (unit === "bytes")
    return value >= 1_000_000
      ? `${(value / 1_000_000).toFixed(2)} MB`
      : `${(value / 1000).toFixed(1)} kB`
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

/**
 * A ratio and its interval as text, to two places, or three when two would show one of them as
 * 1.00: a real difference of 0.4 % must not read as "1.00× higher".
 */
export function ratioParts({
  ratio,
  low,
  high,
}: Pick<Comparison, "ratio" | "low" | "high">): [string, string, string] {
  const values = [ratio, low, high]
  const places = values.some((value) => value.toFixed(2) === "1.00") ? 3 : 2
  return values.map((value) => value.toFixed(places)) as [
    string,
    string,
    string,
  ]
}

export function formatRatio(comparison: Comparison | undefined): string {
  if (!comparison) return "–"
  const { low, high, verdict } = comparison
  const [ratio, lowText, highText] = ratioParts(comparison)
  if (MEASURES[comparison.metric]?.judged === false)
    return `${ratio}× not judged`
  const shown = `${ratio}×`
  const interval = low === high ? "" : ` <sub>${lowText}–${highText}</sub>`
  const word =
    verdict === "lower"
      ? "lower"
      : verdict === "higher"
        ? "**higher**"
        : "no clear difference"
  return `${shown}${interval} ${word}`
}

/**
 * What dense names change, as dense ÷ hashed: every size the build and the large-dom page measure,
 * on the corpus totals and each large-dom size, so the effect reads at a glance.
 */
function denseSection(results: Results): string[] {
  const versus = results.comparisons.filter(
    (comparison) =>
      comparison.against === "kirana-dense" &&
      comparison.scenario === "build" &&
      (comparison.corpus.endsWith("/total") ||
        comparison.corpus.startsWith("large-dom") ||
        comparison.corpus.startsWith("scale-curve/")) &&
      MEASURES[comparison.metric]?.judged !== false &&
      comparison.metric !== "build"
  )
  if (versus.length === 0) return []
  return [
    "## Dense names",
    "",
    'Kirana built with `names: "dense"` over Kirana as published: below 1 is smaller with dense names.',
    "",
    "| Corpus | Measure | Dense ÷ hashed |",
    "| --- | --- | --- |",
    ...versus.map((comparison) => {
      const inverse = {
        ratio: 1 / comparison.ratio,
        low: 1 / comparison.high,
        high: 1 / comparison.low,
      }
      const [ratio, low, high] = ratioParts(inverse)
      return `| ${corpusName(comparison.corpus)} | ${MEASURES[comparison.metric]?.label ?? comparison.metric} | ${ratio}×${inverse.low === inverse.high ? "" : ` <sub>${low}–${high}</sub>`} |`
    }),
    "",
  ]
}

const key = (corpus: string, scenario: string, metric: string) =>
  `${corpus}|${scenario}|${metric}`

/**
 * This release against the one before it, both built from the same sources in the same rounds:
 * build time and output on each app and on all of them, this release's median over the previous
 * one's. Two releases are compared here only, never across two sessions (fairness rule 6): a
 * session on another runner moves every tool's numbers, as much as a release would.
 */
function previousSection(results: Results): string[] {
  const { meta } = results
  const previous = meta.previous
  if (!previous) return []
  const title = ["## Against the previous release", ""]
  if (previous.skipped !== undefined)
    return [
      ...title,
      `Kirana ${previous.kirana}, the release before, was not measured: ${previous.skipped}.`,
      "",
    ]
  const metrics = Object.keys(MEASURES)
  const versus = results.comparisons
    .filter(
      (comparison) =>
        comparison.against === "kirana-previous" &&
        comparison.scenario === "build" &&
        comparison.corpus.startsWith("three-way/") &&
        MEASURES[comparison.metric]?.judged !== false
    )
    .sort(
      (a, b) =>
        Number(b.corpus.endsWith("/total")) -
          Number(a.corpus.endsWith("/total")) ||
        a.corpus.localeCompare(b.corpus) ||
        metrics.indexOf(a.metric) - metrics.indexOf(b.metric)
    )
  if (versus.length === 0) return []
  const rows = new Map<string, Row>(
    results.rows.map((row) => [
      `${key(row.corpus, row.scenario, row.metric)}|${row.target}`,
      row,
    ])
  )
  const at = (comparison: Comparison, target: Target) =>
    rows.get(
      `${key(comparison.corpus, comparison.scenario, comparison.metric)}|${target}`
    )
  const label = (comparison: Comparison) =>
    MEASURES[comparison.metric]?.label ?? comparison.metric
  const higher = versus.filter((comparison) => comparison.verdict === "higher")
  return [
    ...title,
    `Kirana ${meta.kirana} over Kirana ${previous.kirana}, the release before it, installed from npm and built from the same sources in the same rounds: below 1 is lower for ${meta.kirana}.`,
    "",
    ...(higher.length === 0
      ? [`No measure is higher than in ${previous.kirana} with confidence.`]
      : [
          `Higher than in ${previous.kirana} with confidence:`,
          "",
          ...higher.map((comparison) => {
            const [ratio, low, high] = ratioParts(comparison)
            return `- **${label(comparison)}**, ${corpusName(comparison.corpus)}: ${ratio}× (${low}–${high}).`
          }),
        ]),
    "",
    `| Corpus | Measure | Kirana ${previous.kirana} | Kirana ${meta.kirana} | ${meta.kirana} ÷ ${previous.kirana} |`,
    "| --- | --- | --- | --- | --- |",
    ...versus.map(
      (comparison) =>
        `| ${corpusName(comparison.corpus)} | ${label(comparison)} | ${cell(at(comparison, "kirana-previous"))} | ${cell(at(comparison, "kirana"))} | ${formatRatio(comparison)} |`
    ),
    "",
  ]
}

function table(
  results: Results,
  corpus: string,
  scenario: string,
  shown: readonly Target[]
): string[] {
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
  // The dense build's ratio reads the other way round, so it is in its own section.
  const others = shown.filter(
    (target) => target !== "kirana" && target !== "kirana-dense"
  )
  return [
    `| Measure | ${shown.map((target) => NAMES[target]).join(" | ")} | ${others.map((target) => `Kirana ÷ ${NAMES[target]}`).join(" | ")} |`,
    `| --- |${" --- |".repeat(shown.length + others.length)}`,
    ...metrics.map((metric) => {
      const at = (target: Target) =>
        rows.get(`${key(corpus, scenario, metric)}|${target}`)
      const versus = (against: string) =>
        comparisons.get(`${key(corpus, scenario, metric)}|${against}`)
      return `| ${MEASURES[metric]!.label} | ${shown.map((target) => cell(at(target))).join(" | ")} | ${others.map((target) => formatRatio(versus(target))).join(" | ")} |`
    }),
    "",
  ]
}

const corpusName = (corpus: string) => {
  if (corpus.endsWith("/total")) return "All apps"
  const [name, part] = corpus.split("/")
  if (name === "scale-curve")
    return `\`scale-curve\`, ${Number(part).toLocaleString("en-US")} components`
  if (name === "large-dom")
    return part
      ? `\`large-dom\`, ${Number(part).toLocaleString("en-US")} rows`
      : "`apps/large-dom`"
  return `\`apps/${part}\``
}

/** The curve: each measure's median at every size, per implementation, and Kirana's ratio beneath. */
function curve(
  results: Results,
  sizes: number[],
  shown: readonly Target[]
): string[] {
  const median = (size: number, metric: string, target: Target) =>
    results.rows.find(
      (row) =>
        row.corpus === `scale-curve/${size}` &&
        row.metric === metric &&
        row.target === target
    )?.median
  const ratio = (size: number, metric: string, against: Target) =>
    results.comparisons.find(
      (entry) =>
        entry.corpus === `scale-curve/${size}` &&
        entry.metric === metric &&
        entry.against === against
    )
  const head = sizes.map((size) => size.toLocaleString("en-US"))
  return (["build", "totalGzip"] as const).flatMap((metric) => {
    const unit = metric === "build" ? "ms" : "bytes"
    return [
      `**${MEASURES[metric]!.label}**`,
      "",
      `| | ${head.join(" | ")} |`,
      `| --- | ${head.map(() => "---").join(" | ")} |`,
      ...shown.map(
        (target) =>
          `| ${NAMES[target]} | ${sizes.map((size) => formatValue(median(size, metric, target) ?? Number.NaN, unit)).join(" | ")} |`
      ),
      ...shown
        .filter((target) => target !== "kirana")
        .map(
          (against) =>
            `| Kirana ÷ ${NAMES[against]} | ${sizes.map((size) => formatRatio(ratio(size, metric, against))).join(" | ")} |`
        ),
      "",
    ]
  })
}

export function renderReport(results: Results): string {
  const { meta } = results
  const failed = Object.entries(meta.conformance).filter(
    ([, state]) => state !== "passed"
  )
  // A loss on the corpus total is listed once; an app's own loss only when the total has none.
  // Against its own dense build, Kirana "higher" means dense names did better: not a loss. Its
  // previous release is no other tool: what changed since is in its own section.
  const judged = results.comparisons.filter(
    (comparison) =>
      comparison.verdict === "higher" &&
      comparison.against !== "kirana-dense" &&
      comparison.against !== "kirana-previous" &&
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
  const curveSizes = [
    ...new Set(
      results.rows
        .map((row) => /^scale-curve\/(\d+)$/.exec(row.corpus)?.[1])
        .filter((size): size is string => size !== undefined)
        .map(Number)
    ),
  ].sort((a, b) => a - b)
  const corpora = [
    ...new Set(
      results.rows
        .filter(
          (row) =>
            (row.tier === "A" || row.tier === "B") &&
            !row.corpus.startsWith("scale-curve/")
        )
        .map((row) => row.corpus)
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
  // The implementations this run measured, in their usual order. The previous release has its own
  // section, so the tables compare the tools.
  const measured = new Set(results.rows.map((row) => row.target))
  const shown = TARGETS.filter(
    (target) => measured.has(target) && target !== "kirana-previous"
  )
  const against = list(
    OTHERS.filter(
      (target) =>
        measured.has(target) &&
        target !== "kirana-dense" &&
        target !== "kirana-previous"
    ).map((target) => NAMES[target])
  )
  const targets = Object.entries(meta.targets)
    .map(([name, version]) => `\`${name}\` ${version}`)
    .join(", ")

  const editor = editorTable(results)
  const lines = [
    `# Kirana ${meta.kirana}, measured against ${against}`,
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
    `| Rounds | ${meta.rounds.build} cold builds per app after ${meta.rounds.warmup} warm-up; ${meta.rounds.runtime} runtime runs${meta.rounds.largeDom ? `; ${meta.rounds.largeDom} rounds at each large-dom size` : ""}${meta.rounds.scaleCurve ? `; ${meta.rounds.scaleCurve} cold builds at each scale-curve size` : ""}${meta.rounds.editor ? `; ${meta.rounds.editor} editing sessions` : ""} |`,
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
    ...editor.missed,
    ...(editor.missed.length > 0 ? [""] : []),
    ...(behind.length === 0
      ? [
          editor.missed.length > 0
            ? "Against the other tools, no measure has Kirana higher with confidence."
            : "In this run, no measure has Kirana higher with confidence.",
          "",
        ]
      : [
          ...behind.map((comparison) => {
            const [ratio, low, high] = ratioParts(comparison)
            return (
              `- **${MEASURES[comparison.metric]?.label ?? comparison.metric}**, ${corpusName(comparison.corpus)}${comparison.scenario === "build" ? "" : `, ${comparison.scenario}`}: ` +
              `${ratio}× ${NAMES[comparison.against]} (${low}–${high}).`
            )
          }),
          "",
        ]),
    ...denseSection(results),
    ...previousSection(results),
    "## Build and output",
    "",
    ...corpora.flatMap((corpus) => [
      `### ${corpusName(corpus)}`,
      "",
      ...table(results, corpus, "build", shown),
    ]),
    ...(runtime.length > 0 ? ["## In the browser", ""] : []),
    ...runtime.flatMap((entry) => {
      const [corpus, scenario] = entry.split("|") as [string, string]
      return [
        `### ${corpusName(corpus)}, ${scenario}`,
        "",
        ...table(results, corpus, scenario, shown),
      ]
    }),
    ...(curveSizes.length > 0
      ? [
          "## Scale curve",
          "",
          `The same generated components at ${list(curveSizes.map((size) => size.toLocaleString("en-US")))} components, each size built cold${meta.scaleCurve?.runner ? ` on its own runner (${meta.scaleCurve.hardware.cpu}, ${meta.scaleCurve.hardware.cores} cores), beside the rest of the session: compare within this section, never with the tables above` : ""}.`,
          "",
          ...curve(results, curveSizes, shown),
          ...curveSizes.flatMap((size) => [
            `### ${corpusName(`scale-curve/${size}`)}`,
            "",
            ...table(results, `scale-curve/${size}`, "build", shown),
          ]),
        ]
      : []),
    ...editor.lines,
    "## Method",
    "",
    `- **Builds** are each app's own \`vite build\`, cold (its \`dist\` and Vite cache removed first), interleaved so a round builds ${list(shown.map((target) => NAMES[target]))} in turn.`,
    ...(measured.has("kirana-dense")
      ? [
          '- **Kirana (dense names)** is the Kirana corpus built with `names: "dense"`: the same apps and sources, into its own folder, with conformance comparing it to the hashed build. Its ratios are in **Dense names**, as dense ÷ hashed.',
        ]
      : []),
    ...(measured.has("kirana-previous") && meta.previous
      ? [
          `- **Kirana (previous release)** is the Kirana corpus copied with Kirana ${meta.previous.kirana} from npm in its place (\`scripts/sync-previous.ts\`): the same sources, and every other dependency at the version the corpus resolves. It joins the three apps' builds, without conformance, and its ratios are in **Against the previous release**, as ${meta.kirana} ÷ ${meta.previous.kirana}.`,
        ]
      : []),
    ...(measured.has("stylex-swc")
      ? [
          "- **StyleX (SWC)** builds the StyleX sources with `@stylexswc/unplugin`, the Rust compiler, in place of the Babel plugin; conformance compares it with the Babel build.",
        ]
      : []),
    "- **Sizes** are every client asset of the type, each compressed on its own as a browser receives it: gzip at level 9, brotli at quality 11.",
    "- **In the browser**, the page is grown to the same number of elements in each build, the CPU is throttled, and the renderer's own counters are read through the DevTools protocol.",
    ...(meta.rounds.editor
      ? [
          "- **In the editor**, each session starts the published `kirana-style lsp` on the three apps, opens every UI component and page, hovers style positions in a seeded order and edits a value and back, timing each answer and the diagnostics after each edit; memory is the server's resident set. `kirana-style check` runs cold over the web app and the UI package.",
        ]
      : []),
    ...(meta.rounds.scaleCurve
      ? [
          "- **scale-curve** writes the same components for every implementation from one seeded sequence (`scripts/scale-curve.ts`): tokens, a font size with its line height and a recipe in each, a hover state in half, a breakpoint in three in ten, a relation in one in four and a runtime value in three in twenty, each implementation in its own idiom. Conformance compares every size's page, every component on it.",
        ]
      : []),
    ...(meta.rounds.largeDom
      ? [
          "- **large-dom** is an order table built at each size from each implementation's own components, with the same seeded rows. Each round filters it to Overdue and back to All (each timed from the click to the next frame), scrolls through it, and moves the pointer across rows; the heap is read after a garbage collection. Its HTML and `class` bytes are the page as the server sent it.",
        ]
      : []),
    meta.runner
      ? "- **The machine** is a shared CI runner, and GitHub may give another run a different processor (this run's is under Machine above), so absolute times move from run to run; compare the ratios within this run, never numbers from two runs."
      : "- **The machine** is a developer's, not a CI runner: these numbers are for checking the lab, not for quoting.",
    "- **Style rules and declarations** are shown without a verdict: an atomic stylesheet always has more, smaller rules, and what that costs is measured by the sizes and the browser times.",
    "- The rules a quoted number has to meet are in METHODOLOGY.md, and every raw sample is in `results.json` beside this file.",
    "",
  ]
  return lines.join("\n")
}
