# Methodology

How this lab measures Kirana against StyleX and Tailwind CSS, and what a number has to have before
anyone may quote it. Every rule here is written so that a reader can check it against a run's
`results.json`, including the numbers that do not favour Kirana.

## The corpus

One application set, written three times: a demo page (`apps/web`), sixty-odd shadcn/ui blocks
(`apps/blocks`) and a page per component (`apps/examples`).

| Implementation       | Where                  | Styling                                                 |
| -------------------- | ---------------------- | ------------------------------------------------------- |
| Kirana               | the repository root    | `@kirana-style/*` from npm, at the pinned release       |
| Kirana (dense names) | the repository root    | the same, built with `names: "dense"` into `dist-dense` |
| StyleX               | `baselines/stylex`     | `@stylexjs/stylex` with `@stylexjs/unplugin` (Babel)    |
| StyleX (SWC)         | `baselines/stylex-swc` | the StyleX sources, compiled by `@stylexswc/unplugin`   |
| Tailwind CSS         | `baselines/tailwind`   | `tailwindcss` 4 with `@tailwindcss/vite`                |

The markup is the same in all of them; the conformance harness proves it by comparing the computed
styles of every element, on every route, at three widths, in both colour schemes.

### large-dom: one big page

A second corpus asks what the styling costs on a page far larger than the demos: an ERP order table
(`apps/large-dom`), written once per implementation with its own components (a status badge, text
cells, a select, an icon button, and an Approve button on pending orders only). Its rows come from a
seeded generator (`src/data/orders.ts`, the same file in every implementation), so a page of
5,000 rows is the same page in every build and every run.

- **Sizes.** `?rows=` picks 1,000, 5,000, 10,000 or 25,000. A session measures **1,000 and 5,000**:
  on a hosted runner 10,000 rows take minutes per round and 25,000 take minutes to load, which
  would make a session longer than GitHub allows. `--large-dom-sizes` runs them by hand.
- **Each round** filters the table to Overdue and back to All, each timed from the click to the
  next frame with the renderer's recalculation and layout time; scrolls through it one step a
  frame, for the p95 frame time; moves the pointer across rows; and reads the heap after a garbage
  collection. Each build's page is loaded once per size, and the rounds interleave the builds.
- **Size of the page.** The HTML the server sent and the bytes of its `class` attributes, where
  an atomic stylesheet's cost moves to, beside the app's CSS and JavaScript.
- **Conformance** compares the table at 40 rows, the same rules as the other apps: its rows differ
  only in their data.

### scale-curve: the same components, more of them

A third corpus asks how the cost grows. `scripts/scale-curve.ts` writes 100, 1,000 and 10,000
components into each implementation's `apps/scale-curve` (git-ignored, written before each size
is built), and each size is built cold for the same rounds as the demos. The report shows every
measure at every size, a curve, never one point.

- **The components.** Each is a card: a root, a title and a button. One seeded sequence decides what
  each one uses, so the first 100 are the same at every size and the shares do not change with it:
  tokens, a font size with its line height and a recipe in every one, a hover state in half, a
  breakpoint in three in ten, a relation in one in four and a runtime value in three in twenty.
- **Each in its own idiom.** Kirana with `css()`, `recipe()` and `relation()`; StyleX with
  `stylex.create()`, a variant map, a dynamic style and `stylex.when.ancestor` with a marker;
  Tailwind CSS with utilities, `cva`, an inline style and a named group. StyleX (SWC) builds the
  StyleX sources.
- **Tailwind is told where they are.** Tailwind does not scan git-ignored files, so its app's
  stylesheet adds `@source "./generated"` to the shared one: its documented way to name them.
- **Conformance** compares every size's page, every component on it, right after that size's builds:
  a size or build-time result at 10,000 components compares like with like.
- **Its own job in CI.** StyleX's Babel build of 10,000 components takes minutes each round, so the
  curve runs beside the session on a runner of its own. Its four implementations are compared on
  that one machine, which the report names; `src/merge.ts` joins the two files.

### The editor (tier D)

Only Kirana has a language server of its own, so tier D measures it alone, against its budgets
(hover p95 ≤ 50 ms, diagnostics ≤ 200 ms after an edit, memory ≤ 300 MB), not against another
tool. Each round is one editing session against the published `kirana-style lsp`, over stdio as
an editor speaks to it (`bench/editor.ts`): the three apps as workspace folders, every UI component
and page opened, 300 hovers at style positions in a seeded order, and 60 edits of a value and back,
each timed to the diagnostics that follow. A round records its p50 and p95, and the server's
resident memory after indexing and at the end. `kirana-style check` over the web app and the UI
package is timed cold in the same rounds. A missed budget is listed first in "Where Kirana is
behind".

### StyleX, compiled two ways

StyleX has two compilers: its own Babel plugin, and the Rust compiler built on SWC
(`@stylexswc/unplugin`), which is faster. Both are measured, so a comparison with StyleX never
depends on which one a reader would pick.

- **Same sources.** `baselines/stylex-swc` holds only its Vite setup, manifest and lockfile;
  `scripts/sync-stylex-swc.ts` copies the apps and packages from `baselines/stylex` before it
  installs, so the two cannot drift apart.
- **Same options.** The Babel baseline's `useCSSLayers`, `sxPropName`, `dev` and
  `unstable_moduleResolution`, the last three under the SWC plugin's `rsOptions`.
- **Where the rules go.** Under TanStack Start nothing links the stylesheet the SWC plugin writes on
  its own, so it uses its documented `useCssPlaceholder` mode: the rules go where the shared
  `globals.css` has an `@stylex;` marker. The marker is added by a small Vite plugin in the SWC
  setup, so the file itself stays the Babel baseline's.
- **Minification.** The Babel plugin minifies its rules with Lightning CSS; the SWC plugin minifies
  the rules it injects with esbuild, its optional dependency, after Vite has minified the rest.
- **Conformance.** The SWC build is compared with the Babel build, with no exceptions: both compile
  the same sources, so any difference is the compiler's.

### Kirana, with two ways of naming

Kirana 0.2.3 added dense class names (`names: "dense"`): a production build replaces the hashes in
its class names with short codes assigned from the whole build. It is opt-in, so the lab measures
Kirana both ways, from the release that has it (`packages/harness/src/targets.ts`).

- **Same apps, same sources.** `kirana-dense` is the repository root built a second time with
  `KIRANA_LAB_NAMES=dense`. `packages/vite-config` reads it, passes `names: "dense"` and writes the
  build to `dist-dense`, so the two builds sit side by side and interleave like any two targets.
- **Conformance.** The dense build is compared with the hashed one, with no exceptions: both compile
  the same sources, so any difference is the renaming's.
- **How it reads.** The tables show its medians beside the others, and its ratios have a section of
  their own, dense ÷ hashed, so they never count as Kirana being behind.

## Tiers

| Tier            | What it measures                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------- |
| **A, build**    | Wall time of each app's `vite build`, cold.                                                           |
| **B, artifact** | What the build ships: CSS and JavaScript, raw and compressed; rule and declaration counts.            |
| **C, runtime**  | What the stylesheet costs the browser: style recalculation, layout and frame times.                   |
| **D, editor**   | Kirana's language server: indexing, hover and diagnostics latency, memory; `kirana-style check` time. |

## Fairness rules

1. **Same inputs.** Every dependency the implementations share is at one exact version
   (`versions.json`), and `scripts/fairness.ts` compares what their lockfiles actually resolved. Anything they cannot
   share is listed with its reason.
2. **Published versions.** Every implementation is measured as users install it: StyleX, Tailwind
   and Kirana from npm, at versions recorded in the result. Kirana is never measured from source.
3. **Recommended configuration.** Each uses its documented production setup, minified.
4. **Direct builds.** Each app's own `vite build`, never through a task cache.
5. **Cold builds labelled.** Caches are removed before a cold build.
6. **One machine, one session.** All of them are measured on the same machine in the same run, and
   numbers from different runs are never compared.
7. **Feature parity.** Where one cannot express what the others do, the result says so.
8. **Correctness first.** An implementation's numbers count only if its conformance run passed.
9. **Only shared applications.** An app that exists for one implementation and not the others is
   not measured.

## Statistics

- **Rounds.** At least 10 rounds per build after a warm-up, and at least 20 per runtime scenario.
- **Interleaving.** The implementations take turns within a round, so a machine that warms up or
  slows down does it to all of them.
- **Summary.** Median, p95, minimum, maximum and standard deviation, with every raw sample kept.
- **Comparison.** The ratio of medians with a bootstrapped 95 % confidence interval (fixed seed,
  10,000 resamples). The bootstrap is unpaired: each side's rounds are resampled on their own, the
  ratio of the two resampled medians is taken, and the interval is the 2.5th to 97.5th percentile
  of those ratios. A size is the same in every round, so its interval is the ratio itself, and the
  report shows it without one. A difference is reported as one only when the interval excludes 1.0; otherwise
  it is "no clear difference".
- **Nothing to divide by.** A measure that is often 0, such as style recalculation while scrolling,
  can have a median of 0, or an interval a 0 leaves unbounded. Such a cell states no ratio: its
  medians are shown, and the comparison is left out rather than written as infinity.
- **Outliers.** Never removed silently: an exclusion is listed with its reason.

## The machine

Runs use GitHub-hosted runners, which are shared and noisy: about 16 % from one run to the next is
normal there. Interleaving and the confidence intervals are what make a single run's comparison
meaningful anyway. A dedicated machine will replace them when the project can pay for one.

## Claims

A number may be quoted only when:

1. its `results.json`, the corpus commit, the command and the machine are published with it;
2. it compares medians with confidence intervals from one machine and one session;
3. conformance passed for every implementation it compares;
4. the results that do not favour Kirana, from the same run, are published beside it;
5. numbers other projects report about themselves are labelled as theirs and never mixed in.
