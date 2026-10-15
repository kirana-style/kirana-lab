/**
 * Pins the Kirana corpus to one published Kirana release: `kirana-style` and every
 * `@kirana-style/*` entry in the root catalog take the version, and `bun install` then resolves it from npm. CI runs this with
 * the version a release just published, so a benchmark always names the exact Kirana it measured.
 *
 *   bun scripts/use-kirana.ts 0.2.1
 *   bun scripts/use-kirana.ts latest     # whatever npm's `latest` tag points at
 */
import { execFileSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

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

const file = path.join(ROOT, "package.json")
const manifest = JSON.parse(readFileSync(file, "utf8")) as {
  workspaces: { catalog: Record<string, string> }
}
for (const name of Object.keys(manifest.workspaces.catalog))
  if (name.startsWith("@kirana-style/") || name === "kirana-style")
    manifest.workspaces.catalog[name] = version
writeFileSync(file, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`kirana: ${version}; run \`bun install\` to resolve it`)
