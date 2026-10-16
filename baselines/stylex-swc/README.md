# StyleX, compiled by SWC

The StyleX baseline's apps, built by `@stylexswc/unplugin`, StyleX's Rust compiler, instead of the
Babel plugin. Only the build setup lives here:

| Path                   | What it is                                                         |
| ---------------------- | ------------------------------------------------------------------ |
| `packages/vite-config` | The StyleX baseline's Vite setup, with the SWC plugin in its place |
| `package.json`         | The StyleX baseline's catalog, so both install the same versions   |
| `bun.lock`             | This baseline's own lockfile                                       |

`apps/`, `packages/ui`, `packages/shell` and `tsconfig.json` are copied from `baselines/stylex` by
`bun scripts/sync-stylex-swc.ts` at the repository root, and ignored by git:

```bash
bun scripts/sync-stylex-swc.ts
(cd baselines/stylex-swc && bun install)
```

How the two StyleX builds differ, and why, is in the lab's `METHODOLOGY.md`.
