# Kirana lab

Where Kirana's benchmarks and conformance checks run. One set of applications is written three
times, with [Kirana](https://kirana.style), StyleX and Tailwind CSS, and this repository builds all
three, checks that they render the same, and measures what each costs to build, ship and run.

Every number Kirana publishes comes from a run here, and [METHODOLOGY.md](METHODOLOGY.md) says what
a number must have before it can be quoted.

## Layout

| Path                                  | What it is                                                                          |
| ------------------------------------- | ----------------------------------------------------------------------------------- |
| `apps/`                               | The Kirana implementation: `web`, `blocks` and `examples`                           |
| `packages/ui`, `shell`, `vite-config` | Their components and shared Vite setup                                              |
| `baselines/stylex`                    | The same apps with StyleX, a workspace of its own with its own lockfile             |
| `baselines/tailwind`                  | The same apps with Tailwind CSS, likewise                                           |
| `packages/harness`                    | The build and runtime benchmarks, and the conformance harness                       |
| `versions.json`                       | Every dependency the three share, at one exact version                              |
| `scripts/`                            | Pin a Kirana release, keep the shared versions in step, compare the three lockfiles |

Kirana comes from npm, at the release in the root `package.json`'s catalog; the lab never builds it
from source, so it measures what users install.

## Running it

[Bun](https://bun.sh) and Node.js 22.18 or later; `vp` comes with `bun install`.

```bash
bun install                                       # the Kirana corpus
(cd baselines/stylex && bun install)
(cd baselines/tailwind && bun install)

vp run build                                      # all three implementations, every app
vp run check                                      # lint, types, shared versions, lockfiles

bun run bench kirana=$PWD stylex=$PWD/baselines/stylex tailwind=$PWD/baselines/tailwind \
  --apps web,blocks,examples --rounds 10
bun run bench:runtime --serve --rounds 20 --throttle 4,6
bun run conformance --app web --serve
```

To measure another Kirana release: `bun run use-kirana 0.2.1` (or `latest`), then `bun install`.

When a shared dependency moves, change it in `versions.json`, then `bun run versions` and
`bun install` in all three workspaces. `bun run fairness` lists anything the three lockfiles still
resolve differently.

The harness's own guides: [benchmarks](packages/harness/bench/README.md) and
[conformance](packages/harness/conformance/README.md).

## License

MIT.
