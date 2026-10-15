# Methodology

How this lab measures Kirana against StyleX and Tailwind CSS, and what a number has to have before
anyone may quote it. Every rule here is written so that a reader can check it against a run's
`results.json`, including the numbers that do not favour Kirana.

## The corpus

One application set, written three times: a demo page (`apps/web`), sixty-odd shadcn/ui blocks
(`apps/blocks`) and a page per component (`apps/examples`).

| Implementation | Where                | Styling                                           |
| -------------- | -------------------- | ------------------------------------------------- |
| Kirana         | the repository root  | `@kirana-style/*` from npm, at the pinned release |
| StyleX         | `baselines/stylex`   | `@stylexjs/stylex` with `@stylexjs/unplugin`      |
| Tailwind CSS   | `baselines/tailwind` | `tailwindcss` 4 with `@tailwindcss/vite`          |

The markup is the same in all three; the conformance harness proves it by comparing the computed
styles of every element, on every route, at three widths, in both colour schemes.

## Tiers

| Tier            | What it measures                                                                           |
| --------------- | ------------------------------------------------------------------------------------------ |
| **A, build**    | Wall time of each app's `vite build`, cold.                                                |
| **B, artifact** | What the build ships: CSS and JavaScript, raw and compressed; rule and declaration counts. |
| **C, runtime**  | What the stylesheet costs the browser: style recalculation, layout and frame times.        |
| **D, editor**   | The language server's latency. Not measured yet.                                           |

## Fairness rules

1. **Same inputs.** Every dependency the three share is at one exact version (`versions.json`), and
   `scripts/fairness.ts` compares what the three lockfiles actually resolved. Anything they cannot
   share is listed with its reason.
2. **Published versions.** Every implementation is measured as users install it: StyleX, Tailwind
   and Kirana from npm, at versions recorded in the result. Kirana is never measured from source.
3. **Recommended configuration.** Each uses its documented production setup, minified.
4. **Direct builds.** Each app's own `vite build`, never through a task cache.
5. **Cold builds labelled.** Caches are removed before a cold build.
6. **One machine, one session.** The three are measured on the same machine in the same run, and
   numbers from different runs are never compared.
7. **Feature parity.** Where one cannot express what the others do, the result says so.
8. **Correctness first.** An implementation's numbers count only if its conformance run passed.
9. **Only shared applications.** An app that exists for one implementation and not the others is
   not measured.

## Statistics

- **Rounds.** At least 10 rounds per build after a warm-up, and at least 20 per runtime scenario.
- **Interleaving.** Kirana, StyleX and Tailwind take turns within a round, so a machine that warms up
  or slows down does it to all three.
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
