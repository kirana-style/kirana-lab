/**
 * Fills `baselines/kirana-previous` with the Kirana corpus at the release before the one the root
 * pins, from npm, so a session builds this release and the last one side by side, on one machine
 * in the same rounds (METHODOLOGY.md, "Kirana against its previous release"):
 *
 *   bun scripts/sync-previous.ts
 *
 * Run it after `use-kirana` and the root's `bun install`. The copy takes the three apps, the
 * packages they use, the root manifest and its lockfile, so every dependency the corpus shares
 * resolves as the root's does and only Kirana differs. It is replaced whole each time and ignored by
 * git. `previous.json` in it says which release it holds, or why it holds none: no earlier release,
 * or one that cannot install or build today's corpus (a corpus that uses an API added since). Then
 * the session goes on without it, and the report says why.
 */
import { execFileSync, spawnSync } from "node:child_process"
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import path from "node:path"

import { PREVIOUS, previousRelease } from "../packages/harness/src/targets.ts"
import type { Previous } from "../packages/harness/src/results.ts"
import { pinKirana, pinnedKirana } from "./kirana-release.ts"
import { ROOT } from "./workspaces.ts"

/** The apps a session builds against the previous release: the three-way corpus. */
const APPS = ["web", "blocks", "examples"] as const

/** What the copy takes from the corpus. */
const COPIED = [
  ...APPS.map((app) => `apps/${app}`),
  "packages/ui",
  "packages/shell",
  "packages/vite-config",
  "package.json",
  "bun.lock",
  "tsconfig.json",
  ".npmrc",
] as const

/** Installed, built or generated per checkout, never copied. */
const SKIPPED = new Set([
  "node_modules",
  "dist",
  "dist-dense",
  ".tanstack",
  ".output",
  ".vinxi",
  ".wrangler",
])

const to = path.join(ROOT, PREVIOUS)
const measured = pinnedKirana(path.join(ROOT, "package.json"))

/** Writes what the copy holds, and says it. */
function record(previous: Previous): void {
  mkdirSync(to, { recursive: true })
  writeFileSync(
    path.join(to, "previous.json"),
    `${JSON.stringify(previous, null, 2)}\n`
  )
  console.log(
    previous.skipped === undefined
      ? `kirana-previous: Kirana ${previous.kirana}, beside ${measured}`
      : `kirana-previous: not measured, ${previous.skipped}`
  )
}

/** The last line a failed command wrote, for the reason it is left out. */
const lastLine = (output: string) =>
  output.trim().split("\n").at(-1)?.trim() ?? "no output"

rmSync(to, { recursive: true, force: true })
let published: string[] = []
try {
  published = JSON.parse(
    execFileSync("npm", ["view", "@kirana-style/core", "versions", "--json"], {
      encoding: "utf8",
    })
  ) as string[]
} catch (error) {
  record({
    kirana: "unknown",
    skipped: `npm did not list the releases (${String(error)})`,
  })
  process.exit(0)
}
const version = previousRelease(measured, published)
if (version === undefined) {
  record({ kirana: "none", skipped: `no release came before ${measured}` })
  process.exit(0)
}

for (const entry of COPIED)
  cpSync(path.join(ROOT, entry), path.join(to, entry), {
    recursive: true,
    filter: (source) =>
      !SKIPPED.has(path.basename(source)) && !source.endsWith(".tsbuildinfo"),
  })
// The copy is no git checkout, so the hooks the root installs on `prepare` have nowhere to go.
const manifest = path.join(to, "package.json")
const parsed = JSON.parse(readFileSync(manifest, "utf8")) as {
  scripts?: Record<string, string>
}
delete parsed.scripts?.prepare
writeFileSync(manifest, `${JSON.stringify(parsed, null, 2)}\n`)
pinKirana(manifest, version)

const install = spawnSync("bun", ["install"], { cwd: to, encoding: "utf8" })
if (install.status !== 0) {
  record({
    kirana: version,
    skipped: `it did not install (${lastLine(install.stderr || install.stdout)})`,
  })
  process.exit(0)
}
// Each app once: a release that cannot build today's corpus is left out, not measured half.
for (const app of APPS) {
  const build = spawnSync("bun", ["run", "build"], {
    cwd: path.join(to, "apps", app),
    encoding: "utf8",
  })
  if (build.status !== 0) {
    record({
      kirana: version,
      skipped: `\`apps/${app}\` does not build with it (${lastLine(build.stderr || build.stdout)})`,
    })
    process.exit(0)
  }
}
record({ kirana: version })
