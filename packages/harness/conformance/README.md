# Browser conformance

Kirana is proven by comparing what the browser actually renders, not by looking at screenshots. The
same three apps exist in three implementations, and the StyleX one is built by two compilers:

| Implementation    | Where                                                             |
| ----------------- | ----------------------------------------------------------------- |
| Kirana            | `apps/web`, `apps/blocks`, `apps/examples`                        |
| StyleX port       | `baselines/stylex`: the code Kirana was ported from               |
| StyleX port, SWC  | `baselines/stylex-swc`: the same code, compiled by the SWC plugin |
| Tailwind original | `baselines/tailwind`: the shadcn/ui source it copies              |

The harness opens every page of an app in all implementations in Chrome and diffs **computed styles**.

## What is compared

- **Elements:** every element with a `data-slot` attribute, portals included. Elements are paired by
  tag, slot and order (`button[data-slot="button"]#3` is the third such button on the page).
- **Properties:** about 90 computed properties per element — box (display, position, size, margin,
  padding, borders, radii), colour (text, background, border, outline, shadows, filters), type (family,
  size, weight, line height, wrapping, decoration), flex and grid, transforms, cursor and pointer events,
  SVG fill and stroke — plus `content`, geometry and colour of `::before` and `::after`. The list is
  `PROPERTIES` and `PSEUDO_PROPERTIES` in `compare.ts`.
- **Settings:** each page at 1400, 900 and 390 px wide, in light and dark. The page loads once; the
  width and `prefers-color-scheme` then change in place.
- **Tolerance:** colours are converted to one space through a `color-mix(in srgb, …)` probe and may
  differ by 2/255 per channel; lengths by 0.5 px. A few differences are harmless by rule (a border
  colour where the border width is 0, Tailwind's empty shadow slots, `flex-start` against `start`,
  sub-pixel line boxes, and an inline margin on an element drawn at the same x and width in both
  builds: Chrome reports an `auto` margin as `0px` until the element is restyled after layout, then
  as its used value). Animations are stopped before reading: finite ones at their end, endless ones
  (a spinner) at their first frame.
- **Interactive states** (`--states`): a fresh page per state, then the trigger is clicked, hovered or
  focused the way a person would — dialog, sheet, drawer, popover, tooltip, hover card, dropdown and a
  highlighted row, context menu, menubar, navigation menu, select, combobox, accordion, tabs,
  collapsible, sidebar toggle, a hovered button, a focused input — and every slot is compared again.
  Each route is loaded once first to see which triggers it has; a state whose trigger neither build has
  is skipped, and a trigger only one build has is a difference.
- **Motion** (`--motion`): the `@keyframes` behind each element's `animation-name`, with the
  animation's duration, easing, delay, iteration count, direction and fill. This is the one thing
  the settled comparison cannot reach — `animation-name` is a hash that differs between the builds
  by construction, so it is skipped there, and every keyframes body goes with it. Sampling a
  property every frame was the other option and it is worse: frame timing under load makes two runs
  of the _same_ build disagree, while a keyframes body is the whole curve and identical every time.
  The run reports how many animations it compared, because a pass that found none and reported no
  differences is not a pass.
- **Page health:** a different HTTP status or more uncaught page errors than the baseline is a
  difference too.

A **difference** is one (route, element, property, width, scheme) whose values do not match. The report
numbers are counts of those. A page is read once the number of `data-slot` elements has held still for
half a second. A route that shows differences or corrections is compared a second time, and only those
seen both times count, so a page that settled late under load neither fails the run nor hides a bug as a
correction.

## Pass criteria

Three comparisons per app:

| Comparison                  | Arbiter                              | Fails on                                                                                                                                              |
| --------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kirana against StyleX port  | the Tailwind original (`--original`) | any difference, except where Kirana matches the Tailwind original: then the StyleX port was wrong, and the difference is listed as `corrected`        |
| Kirana against the original | the StyleX port (`--port-of`)        | any difference the StyleX port does not share: a difference both have with the same value is `inherited` from the port, a decision made there already |
| SWC against Babel           | none                                 | any difference: the two compile the same sources, so a difference is the compiler's                                                                   |

So the gate is: **Kirana renders exactly like the StyleX port, except where it renders like the
Tailwind original instead.** The same arbiters apply to interactive states. `expected-differences.json` can still list an exception by element,
property and optional route pattern (a regular expression), with a reason; it is empty today.

## What to prepare

1. The prerequisites in the root README: Bun, then `bun install` here and in each baseline.
2. Chrome for the harness: `bunx playwright install chromium`, or an installed
   Google Chrome with `KIRANA_CHROME_CHANNEL=chrome`.
3. The baselines are in `baselines/`: the StyleX, StyleX (SWC) and Tailwind builds of the same
   apps. Elsewhere, point `STYLEX_DIR`, `STYLEX_SWC_DIR` and `TAILWIND_DIR` at other checkouts
   (paths relative to this repository's root).
4. Every implementation built: `vp run build`.

Rebuild whichever side changed before comparing: `vite preview` serves `dist/` as it is.

## Running it

From the repository root. `--serve` starts the four `vite preview` servers for the app, compares, and
stops them; stop `bun dev` first if it holds one of the ports.

```bash
bun run conformance --app web --serve             # the demo page
bun run conformance --app web --serve --states    # the demo's interactive states
bun run conformance --app examples --serve --motion  # animations and their keyframes
bun run conformance --app blocks --serve          # every route of apps/blocks
bun run conformance --app examples --serve        # every route of apps/examples
bun run conformance --app examples --serve --states  # states on every examples route
bun run conformance --app examples --serve --states --paths /dialog,/menubar,/select
```

| Option            | Effect                                                                                 |
| ----------------- | -------------------------------------------------------------------------------------- |
| `--app <name>`    | `web` (default), `blocks` or `examples`                                                |
| `--serve`         | start and stop the preview servers; without it, serve them yourself on the ports below |
| `--states [a,b]`  | compare interactive states instead of pages at rest (all, or the named ones)           |
| `--paths /a,/b`   | compare only these routes instead of crawling                                          |
| `--shard i/n`     | compare every n-th route of the sorted list (CI runs blocks and examples as 3 shards)  |
| `--concurrency n` | routes compared at once (default 4)                                                    |

| App        | Kirana | StyleX | Tailwind | StyleX (SWC) |
| ---------- | ------ | ------ | -------- | ------------ |
| `web`      | 3000   | 3301   | 3302     | 3303         |
| `blocks`   | 3001   | 3311   | 3312     | 3313         |
| `examples` | 3002   | 3321   | 3322     | 3323         |

`KIRANA_URL`, `STYLEX_URL`, `STYLEX_SWC_URL` and `TAILWIND_URL` override the ports. Routes are not hand-kept:
`blocks` and `examples` crawl every same-origin link on the index page, plus every iframe those pages
embed (`/view/<name>`); `web` is its one page.

Without `--serve`, start each server yourself, for example `cd apps/blocks && bunx vite preview --port
3001 --strictPort`, and the same in each baseline checkout.

A full local run takes about 10 s for `web`, 4 minutes for `examples` (64 routes) and 6 minutes for
`blocks` (124 routes) on a 12-core machine.

## Two different sites (URL-pair mode)

`compare.ts` also compares two sites that serve the same page under different paths, as kirana-ui
compares its preview pages with shadcn/ui's. Each route is loaded as it is from `--actual` and with
`--expected-path`'s first half replaced by its second from `--expected`:

```bash
bun conformance/compare.ts --actual http://localhost:8787 --expected http://localhost:4000 \
  --label upstream --expected-path "/preview/react/=/preview/" \
  --expected-differences path/to/expected-differences.json \
  --paths "/preview/react/base/button-example?preset=b0" [--states]
```

| Option                          | Effect                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------- |
| `--expected-path <from>=<to>`   | the expected site's path for each route (and the arbiter's)                                       |
| `--expected-differences <file>` | the reviewed exceptions from that project's list instead of this one's                            |
| `--trigger <state>=<selector>`  | a state's trigger where both sites mark it differently from these apps; repeatable                |
| `--group <selector>`            | pair elements within each match, keyed by its title (its first child's text), not across the page |

React Aria's `DialogTrigger` renders no element, so a dialog there opens from the button inside it:
`--trigger 'dialog-open=[data-slot="example-content"] button'`. An exception may name `*` as its
property, for an element one site renders in another's place.

Pages built of titled examples, as upstream's are, compare best with `--group '[data-slot="example"]'`:
each element is keyed by its example's title (`Basic › button[data-slot="button"]#2`), so an example
one site leaves out is reported once, under its title, instead of shifting every pair after it. An
exception then names an element by its key within the group, or a whole group by its title
(`"With Avatar › "`). A state neither site reaches is skipped without a report: check that the
states you expect ran.

## Reading the result

The console prints one line per comparison and the most frequent unexpected differences:

```text
stylex: 64 route(s), 0 differences, 0 unexpected, 30 where the actual build matches the original instead
tailwind: 64 route(s), 0 differences, 0 unexpected, 5523 inherited from the port
```

The full report is `packages/harness/conformance/output/<app>-<label>[-states][-<shard>].json`:

| Field        | Holds                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `routes`     | the routes compared                                                                                                             |
| `total`      | differences that count (after `corrected` and `inherited` are set aside)                                                        |
| `unexpected` | each counted difference not in `expected-differences.json`: route, width, scheme, element, property, actual and expected values |
| `corrected`  | differences where Kirana matches the Tailwind original (StyleX comparison)                                                      |
| `inherited`  | how many differences the StyleX port shares (Tailwind comparison)                                                               |

The exit code is 1 when anything is unexpected. To investigate one, open the route in both builds at
the listed width and scheme and read the property from DevTools, or run
`bun conformance/compare.ts --actual http://localhost:3002 --expected http://localhost:3321 --label stylex --paths /calendar`
from `packages/harness` to repeat just that route. `kirana-style trace <file>:<line> <property>` shows which of
the component's entries wins and why.

## In CI

The `conformance` job (and `baselines`, which only feeds it) is in `.github/workflows/ci.yml` but
disabled with `if: false`: comparing every route in a browser is slow on hosted runners. Remove both
`if: false` lines to run it on every push again. It is a matrix of seven jobs: `web`, `blocks` 1/3–3/3
and `examples` 1/3–3/3. Each checks out the baselines as worktrees, downloads the builds, installs
Chromium and runs `bun run conformance --app <app> --serve --shard <i/n>`, then the same with
`--states`, and uploads its reports as the `conformance-<app>[-<shard>]` artifact.

The same commands run anywhere with the preparation above, so any other pipeline can call them.

## Files

| File                        | Role                                                            |
| --------------------------- | --------------------------------------------------------------- |
| `run.ts`                    | one app: ports, `--serve`, both comparisons with their arbiters |
| `compare.ts`                | one comparison: crawl, capture, diff, report                    |
| `expected-differences.json` | reviewed exceptions, by comparison label                        |
| `output/`                   | reports (git-ignored)                                           |
