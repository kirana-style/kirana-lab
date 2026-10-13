# Benchmarks

Two benchmarks, measuring two different things, both advisory under the claims policy in
[14-benchmark-methodology](../../../products/kirana/14-benchmark-methodology.md).

| Script                       | Question                                          |
| ---------------------------- | ------------------------------------------------- |
| `bun run bench` (`slice.ts`) | What does the build cost, and what does it ship?  |
| `bun run bench:runtime`      | What does the stylesheet cost the browser? (E-07) |

Results are kept in [`results.md`](results.md).

## The build benchmark

```bash
bun run kirana:bench kirana=$PWD stylex=$PWD/baselines/stylex tailwind=$PWD/baselines/tailwind \
  --apps web,blocks,examples --rounds 5
```

Builds each app from each checkout, interleaved, and reports build time, CSS and JavaScript size raw
and gzipped. It refuses an app that is missing from any checkout, so a corpus is never compared
against a smaller one (fairness rule 9).

## The runtime benchmark (E-07, KRN-PERF-006)

```bash
bun run kirana:bench:runtime -- --serve --rounds 5 --throttle 4,6
```

Build size says nothing about the work a page does when someone uses it. A stylesheet of atoms asks
the browser to match more selectors per element than one of composed classes, and `:where()` and
relation selectors ask for more again. This measures whether that shows up.

**What it does.** Opens the same route in the Kirana, StyleX and Tailwind builds — the same markup,
because conformance proves it — and for each:

1. grows the page by cloning its main content until it holds at least `--elements` elements (6,000 by
   default), so all three end up within a few elements of each other;
2. learns how _that build_ switches colour scheme, by clicking the control every build has
   (`aria-label="Colour scheme"`) and recording what changed on the root element. Toggling one
   hard-coded class would invalidate the Kirana build and do nothing to the others, which is the
   trap this avoids;
3. replays that switch ten times and hovers an interactive element ten times, reading
   `RecalcStyleDuration`, `RecalcStyleCount` and `LayoutDuration` from the DevTools protocol — the
   renderer's own numbers, not anything timed from outside;
4. samples frame times across forty animation frames of the same switch, and reports p95.

The CPU is throttled (4× and 6×) because a desktop hides exactly the differences being looked for,
and rounds are interleaved across the three builds so that a machine that warms up does it to all of
them.

**What to prepare.** The same three builds as conformance (`conformance/README.md`), and Chrome —
`KIRANA_CHROME_CHANNEL=chrome` for an installed one, or `bunx playwright install chromium`.

**How to read it.** KRN-PERF-006 asks that Kirana's style recalculation and frame times are _not
worse_ than the StyleX port's. Treat a difference under about 10 % as noise on a shared machine:
the two produce one class per declaration and match a similar number of selectors per element, so
they should land close. A large gap in either direction is a finding worth chasing.

| Option       | Default | What it does                                                  |
| ------------ | ------- | ------------------------------------------------------------- |
| `--app`      | `web`   | Which app to open                                             |
| `--route`    | `/`     | Which route; it must carry the toggle                         |
| `--serve`    | off     | Start and stop the three preview servers                      |
| `--rounds`   | `5`     | Interleaved rounds per build                                  |
| `--throttle` | `4,6`   | CPU throttling rates                                          |
| `--elements` | `6000`  | Grow the page to at least this many nodes                     |
| `--also`     | —       | `label=path/to/app`: another build, measured beside the three |

**Investigating a difference.** Absolute times move with whatever else the machine is doing, so two
runs cannot be compared — only the ratios within one run. To test _why_ a build is slower, build the
variant into a copy of the app and pass it with `--also`, so both are measured in the same
interleaved rounds:

```bash
cp -r apps/web /tmp/web-variant        # change one thing in /tmp/web-variant/dist
bun run kirana:bench:runtime -- --serve --also variant=/tmp/web-variant
```
