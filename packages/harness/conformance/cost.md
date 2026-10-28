# What conformance costs, and how to pay less

Notes from porting kirana-ui's form controls (shadcn/ui's G1 group, 13 components) on 2026-10-28,
where conformance against shadcn/ui's own site took most of the wall-clock time and, with
upstream's dev server, most of the machine. Measured on a Ryzen 9 9900X (12 cores), 31 GiB, WSL2,
Chrome 154.

## Where the time went

One kirana-ui run compares each `-example` page on two bases in eight styles: 16 routes per page.
Each route is captured at rest (one load, then 3 widths × 2 schemes) and once per state it can reach
(a fresh load per state). Both sites are loaded every time.

| Measured                                                                   | Result                                             |
| -------------------------------------------------------------------------- | -------------------------------------------------- |
| One G1b run, 8 pages = 128 routes, rest and states                         | about 25 to 40 min                                 |
| Upstream's `next dev --turbopack` (shadcn/ui `apps/v4`) while it runs      | about 4 GB resident, CPU at about 80 % on 12 cores |
| Upstream page loads served over the session                                | 3,948, each 100 to 500 ms on the server alone      |
| kirana-ui's side alone (production build on its Worker), per route at rest | about 1.5 s at concurrency 4                       |
| kirana-ui's side alone, per route, states                                  | about 2.4 s                                        |

So for 128 routes, kirana-ui's own side is about 8 to 9 minutes; the rest of the run, and nearly all
of the memory, is upstream's dev server: unminified development bundles, Turbopack compiling on
demand, React's development runtime in every page, all of it four pages at a time.

The second cost was the method, not the tool: every fix was checked by a full run (all eight
pages, every style, both passes), when a fix touches one property of one page.

## The upstream side never changes

Upstream is pinned (`upstream/shadcn.json` records the commit, `481d523` here). Its computed styles
at a width, a scheme and a state are therefore the same on every run. Capturing them again is pure
waste: they can be captured once and read back.

`compare.ts` now takes `--expected-cache <dir>` (branch `feat/expected-cache` in this repository):

- every capture of the expected site (rest, the states it can reach, each state) is written to
  `<dir>` the first time and read back after; the actual site is always captured;
- a capture is keyed by its URL, the harness's own source and the browser's version, so a change
  to what is read, or a Chrome that lays text out differently, never reuses an old capture; a
  state's capture by its trigger too, since a pass may name another trigger for the same state;
- name the directory after the pin (`…/upstream-481d523`); a new pin is a new directory.

Measured against kirana-ui's own production build standing in for the expected site (4 routes),
where both sides are already cheap, a warm cache cuts a rest run from 7.4 s to 6.0 s and a states
run from 11.8 s to 9.8 s. Against upstream the saving is the point: once its pages are cached,
upstream's dev server does not need to run at all, which removes the 4 GB and most of the CPU, and
the run costs about what kirana-ui's side costs (8 to 9 minutes for 128 routes, minutes for one
page). The cache for those 4 routes is 17 MB of JSON (the full property list for every element at
every width and scheme); the whole slice would be a few hundred MB, kept outside the repository.

What it does not change: the first capture of a page still needs upstream served, once per pin.

## Serve upstream built, not in development

The first capture of a page still needs upstream served. Built once per pin with `next build` and
served with `next start`, instead of `next dev`, measured on the same machine (shadcn/ui `apps/v4`,
Next.js 16.4, Node 24):

| Measured               | `next dev --turbopack`            | `next build` + `next start`           |
| ---------------------- | --------------------------------- | ------------------------------------- |
| Getting ready          | 0.25 s, then compiles on demand   | 2 min 17 s once per pin, 14.6 GB peak |
| Resident while serving | about 4 GB                        | 407 MB                                |
| A page                 | 100 to 500 ms on the server alone | 3 to 40 ms (0.4 s for the very first) |

The build is the one heavy moment: 14.6 GB at its peak and about five cores for two minutes, so run
it when nothing else needs the machine, and keep its output (`.next`) for as long as the pin holds.
The styles are the same either way (the same Tailwind build of the same CSS), and a production page
is what users see. Serve it from a clone of upstream at the pin, never the checkout a project reads
its sources from.

With upstream built, a kirana-ui run on its third group (9 pages, 144 routes, rest and states):

| Run                                            | Wall clock  | Per route and pass |
| ---------------------------------------------- | ----------- | ------------------ |
| Upstream not yet captured                      | 12 min 48 s | 2.7 s              |
| Upstream from the cache, the same 9 pages      | 11 min 43 s | 2.4 s              |
| Upstream from the cache, 4 of them (64 routes) | 2 min 57 s  | 1.4 s              |

So once upstream is built, its side is cheap either way, and the cache saves less than the server
did: about a tenth on the same pages. What remains is kirana-ui's own side and the fixed waits per
capture (below). The cache for those 9 pages is 516 MB in 440 files.

## Run less, in tiers

The same check, scoped to what a change can reach:

1. **While fixing one thing**: one page, the style it concerns, rest only:
   `vp run conformance -- --pages toggle-example --styles nova,sera --rest`. Seconds with a warm cache.
2. **When a component is done**: its page, every style, rest and states.
3. **Before the pull request**: every page the branch touches (`vp run conformance:pr`, which
   already finds them from the changed files), every style, once.

And read a run grouped by page, element and property (what was done by hand in this session):
hundreds of differences are usually a handful of causes repeated across styles and widths.

## The alternatives that were suggested

Two other approaches were proposed for this cost: static comparison of the compiled CSS (Tailwind's
against Kirana's, as declarations under their conditions), and Vitest with JSDOM reading
`getComputedStyle`. Checked against what conformance actually found while porting G1:

| Found by conformance in G1                                                            | Static CSS comparison | JSDOM | Browser |
| ------------------------------------------------------------------------------------- | --------------------- | ----- | ------- |
| A chosen choice card's edge in Mira, Luma and Rhea (one condition outranking another) | no                    | no    | yes     |
| A small size's radius reaching every style (an attribute outranking a style axis)     | no                    | no    | yes     |
| FieldLabel's line height inherited by everything inside a card                        | no                    | no    | yes     |
| A wrapper's `w-fit` beating the field's `*:w-full` (layout)                           | no                    | no    | yes     |
| An icon button keeping the Button's logical padding under a physical `p-0`            | partly                | no    | yes     |
| Kbd drawn in Tailwind's font stack instead of the design's font                       | yes                   | no    | yes     |
| An upstream rule that is commented out in its stylesheet (Sera's addon)               | yes                   | no    | yes     |
| Popup placement and thumb alignment from newer Base UI and React Aria                 | no                    | no    | yes     |
| Upstream's own bugs (React Aria's selected toggle never filled)                       | no                    | no    | yes     |

- **JSDOM** implements neither layout nor the cascade the components rely on (`light-dark()`,
  `color-mix()`, `:has()`, container queries, cascade layers). Its `getComputedStyle` would agree
  with a wrong page; it would have caught none of the above.
- **Static CSS comparison** catches a wrong value or a missing rule, which is cheap and worth having,
  but most of what went wrong was which of two right rules wins, what an element inherits, and where
  layout puts it: the cascade and layout, which only a browser computes. Kirana's compiler already
  reports some of that statically (`ambiguous-precedence`), and kirana-ui's builder checks that
  flattening keeps every winner; neither saw these.

So the browser stays the source of truth; what changes is how often each side is loaded.

## Bun's webview

`Bun.WebView` works on Bun 1.4.3 under WSL2 with a display (`DISPLAY=:0`): both the default backend
and `backend: "chrome"` start in 0.3 to 0.5 s and read computed styles (it drives headless Chrome,
`HeadlessChrome/154`). The earlier note that it hangs no longer holds here. It is the same engine
Playwright drives, so it would not make a page cheaper to render; it could replace Playwright for
one-off screenshots and reads without the dependency, but not to speed up conformance.

## Next

- Merge `--expected-cache`. kirana-ui's `scripts/conformance.ts` already passes it when the harness
  has it, under a directory named for the manifest's commit.
- The fixed waits per capture (`settle`, 350 ms per width or scheme, 400 ms after a state) are most
  of the remaining time on a fast site. They exist for sites that repaint their theme from
  JavaScript; a site whose scheme is pure CSS could skip most of them. Worth measuring before
  changing.
