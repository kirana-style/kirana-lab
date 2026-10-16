# Methodology

How this lab measures Kirana against StyleX and Tailwind CSS, and what a number has to have before
anyone may quote it. Every rule here is written so that a reader can check it against a run's
`results.json`, including the numbers that do not favour Kirana.

## The corpus

One application set, written three times: a demo page (`apps/web`), sixty-odd shadcn/ui blocks
(`apps/blocks`) and a page per component (`apps/examples`).

| Implementation | Where                  | Styling                                               |
| -------------- | ---------------------- | ----------------------------------------------------- |
| Kirana         | the repository root    | `@kirana-style/*` from npm, at the pinned release     |
| StyleX         | `baselines/stylex`     | `@stylexjs/stylex` with `@stylexjs/unplugin` (Babel)  |
| StyleX (SWC)   | `baselines/stylex-swc` | the StyleX sources, compiled by `@stylexswc/unplugin` |
| Tailwind CSS   | `baselines/tailwind`   | `tailwindcss` 4 with `@tailwindcss/vite`              |

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

## Tiers

| Tier            | What it measures                                                                           |
| --------------- | ------------------------------------------------------------------------------------------ |
| **A, build**    | Wall time of each app's `vite build`, cold.                                                |
| **B, artifact** | What the build ships: CSS and JavaScript, raw and compressed; rule and declaration counts. |
| **C, runtime**  | What the stylesheet costs the browser: style recalculation, layout and frame times.        |
| **D, editor**   | The language server's latency. Not measured yet.                                           |

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
  10,000 resamples). A difference is reported as one only when the interval excludes 1.0; otherwise
  it is "no clear difference".
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
