/**
 * Fills `baselines/stylex-swc` with the StyleX baseline's apps and packages, so the two StyleX
 * targets build the same sources and differ only in the compiler: `packages/vite-config`, the
 * manifest and the lockfile are the SWC baseline's own and stay as they are.
 *
 *   bun scripts/sync-stylex-swc.ts
 *
 * The copies are replaced whole each time and ignored by git. Run it before installing the SWC
 * baseline, and again after changing the StyleX baseline.
 */
import { cpSync, rmSync } from "node:fs"
import path from "node:path"

import { WORKSPACES } from "./workspaces.ts"

/** What the SWC baseline takes from the StyleX one. */
export const COPIED = [
  "apps",
  "packages/ui",
  "packages/shell",
  "tsconfig.json",
] as const

/** Installed, built or generated per checkout, never copied. */
const SKIPPED = new Set(["node_modules", "dist", ".tanstack", ".output"])

const from = WORKSPACES.stylex
const to = WORKSPACES["stylex-swc"]

for (const entry of COPIED) {
  rmSync(path.join(to, entry), { recursive: true, force: true })
  cpSync(path.join(from, entry), path.join(to, entry), {
    recursive: true,
    filter: (source) =>
      !SKIPPED.has(path.basename(source)) && !source.endsWith(".tsbuildinfo"),
  })
}
console.log(`stylex-swc: copied ${COPIED.join(", ")} from baselines/stylex`)
