/**
 * Pins the Kirana corpus to one published Kirana release: `kirana-style` and every
 * `@kirana-style/*` entry in the root catalog take the version, and `bun install` then resolves it from npm. CI runs this with
 * the version a release just published, so a benchmark always names the exact Kirana it measured.
 *
 *   bun scripts/use-kirana.ts 0.2.1
 *   bun scripts/use-kirana.ts latest     # whatever npm's `latest` tag points at
 */
import { execFileSync } from "node:child_process"
import path from "node:path"

import { pinKirana } from "./kirana-release.ts"
import { ROOT } from "./workspaces.ts"

const [asked] = process.argv.slice(2)
if (!asked) {
  console.error("usage: bun scripts/use-kirana.ts <version | latest>")
  process.exit(2)
}

const version =
  asked === "latest"
    ? execFileSync("npm", ["view", "@kirana-style/core", "version"], {
        encoding: "utf8",
      }).trim()
    : asked
if (!/^\d+\.\d+\.\d+(?:-[\w.]+)?$/.test(version)) {
  console.error(`use-kirana: not a version: ${version}`)
  process.exit(2)
}

pinKirana(path.join(ROOT, "package.json"), version)
console.log(`kirana: ${version}; run \`bun install\` to resolve it`)
