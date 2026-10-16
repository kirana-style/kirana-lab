# Kirana lab

Where Kirana's benchmarks and conformance checks run. One set of applications is written three
times, with [Kirana](https://kirana.style), StyleX and Tailwind CSS. This repository builds each,
the StyleX one with both of StyleX's compilers, checks that they render the same, and measures
what each costs to build, ship and run.

Every number Kirana publishes comes from a run here, and [METHODOLOGY.md](METHODOLOGY.md) says what
a number must have before it can be quoted.

## Layout

| Path                                  | What it is                                                                        |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| `apps/`                               | The Kirana implementation: `web`, `blocks` and `examples`                         |
| `packages/ui`, `shell`, `vite-config` | Their components and shared Vite setup                                            |
| `baselines/stylex`                    | The same apps with StyleX, a workspace of its own with its own lockfile           |
| `baselines/stylex-swc`                | The StyleX apps compiled by SWC: its own Vite setup and lockfile, the apps copied |
| `baselines/tailwind`                  | The same apps with Tailwind CSS, likewise                                         |
| `packages/harness`                    | The build and runtime benchmarks, and the conformance harness                     |
| `versions.json`                       | Every dependency the implementations share, at one exact version                  |
| `scripts/`                            | Pin a Kirana release, keep the shared versions in step, compare the lockfiles     |

Kirana comes from npm, at the release in the root `package.json`'s catalog; the lab never builds it
from source, so it measures what users install.

## Running it

[Bun](https://bun.sh) and Node.js 22.18 or later; `vp` comes with `bun install`.

```bash
bun install                                       # the Kirana corpus
(cd baselines/stylex && bun install)
bun run sync-stylex-swc                           # the StyleX apps, copied for SWC
(cd baselines/stylex-swc && bun install)
(cd baselines/tailwind && bun install)

vp run build                                      # every implementation, every app
vp run check                                      # lint, types, shared versions, lockfiles
vp run test                                       # the harness's statistics and report

bun run bench                                     # a whole session: results/<version>/<date>/
```

To measure another Kirana release: `bun run use-kirana 0.2.1` (or `latest`), then `bun install`.

When a shared dependency moves, change it in `versions.json`, then `bun run versions` and
`bun install` in every workspace. `bun run fairness` lists anything the lockfiles still resolve
differently. After changing the StyleX baseline, `bun run sync-stylex-swc` copies it again.

`bun run bench` builds every app cold for 10 interleaved rounds, checks conformance, measures the
browser, and writes `results.json` (every raw sample) and `report.md`. The harness's own guides:
[benchmarks](packages/harness/bench/README.md) and
[conformance](packages/harness/conformance/README.md).

## Results

Every session in CI is published as a [release](https://github.com/kirana-style/kirana-lab/releases)
of this repository, `bench-<kirana version>-<date>-<run>`, carrying `results.json` and `report.md`.
A session runs when Kirana publishes a release, every Monday against npm's `latest`, and by hand
(Actions, then `bench`, then Run workflow). A release marked as a pre-release did not pass
conformance: its numbers are kept for the record and never quoted.

## License

MIT.
