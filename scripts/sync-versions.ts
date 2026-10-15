/**
 * Writes `versions.json`'s shared versions into the three workspaces: each workspace's catalog gets
 * the exact version, and every app and package that depends on one of them asks for `catalog:`.
 * The three lockfiles then resolve the same versions, so a difference in what the builds ship comes
 * from the styling (fairness rule 1).
 *
 *   bun scripts/sync-versions.ts           # write
 *   bun scripts/sync-versions.ts --check   # fail when a manifest differs from versions.json
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"

import { WORKSPACES, versions } from "./workspaces.ts"

type Manifest = {
  workspaces?:
    | string[]
    | { packages: string[]; catalog?: Record<string, string> }
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

const check = process.argv.includes("--check")
const { shared } = versions()
const stale: string[] = []

const read = (file: string) =>
  JSON.parse(readFileSync(file, "utf8")) as Manifest

function save(file: string, before: string, manifest: Manifest) {
  const after = `${JSON.stringify(manifest, null, 2)}\n`
  if (after === before) return
  if (check) stale.push(path.relative(WORKSPACES.kirana, file))
  else writeFileSync(file, after)
}

/** Every manifest a workspace's globs name (`apps/*`, `packages/*`). */
function members(root: string, globs: string[]): string[] {
  return globs
    .flatMap((glob) => {
      const folder = path.join(root, glob.replace(/\/\*$/, ""))
      if (!glob.endsWith("/*")) return [path.join(root, glob, "package.json")]
      if (!existsSync(folder)) return []
      return readdirSync(folder, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map((entry) => path.join(folder, entry.name, "package.json"))
    })
    .filter((file) => existsSync(file))
}

for (const root of Object.values(WORKSPACES)) {
  const file = path.join(root, "package.json")
  const before = readFileSync(file, "utf8")
  const manifest = read(file)
  const workspaces = Array.isArray(manifest.workspaces)
    ? { packages: manifest.workspaces }
    : (manifest.workspaces ?? { packages: [] })
  const catalog = { ...workspaces.catalog }
  const used = new Set<string>()

  for (const member of [file, ...members(root, workspaces.packages)]) {
    const own = member === file
    const text = own ? before : readFileSync(member, "utf8")
    const entry = own ? manifest : read(member)
    for (const field of ["dependencies", "devDependencies"] as const) {
      for (const name of Object.keys(entry[field] ?? {})) {
        if (!(name in shared)) continue
        entry[field]![name] = "catalog:"
        used.add(name)
      }
    }
    if (!own) save(member, text, entry)
  }

  for (const name of used) catalog[name] = shared[name]!
  manifest.workspaces = {
    ...workspaces,
    catalog: Object.fromEntries(
      Object.entries(catalog).sort(([a], [b]) => a.localeCompare(b))
    ),
  }
  save(file, before, manifest)
}

if (stale.length > 0) {
  console.error(
    `versions: out of step with versions.json, run \`bun scripts/sync-versions.ts\`:\n  ${stale.join("\n  ")}`
  )
  process.exit(1)
}
console.log(
  check
    ? "versions: every workspace matches versions.json"
    : "versions: written"
)
