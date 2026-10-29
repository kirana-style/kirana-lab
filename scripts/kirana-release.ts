/**
 * Which Kirana release a corpus installs: its root catalog names `kirana-style` and every
 * `@kirana-style/*` package at one version (`use-kirana.ts`, `sync-previous.ts`).
 */
import { readFileSync, writeFileSync } from "node:fs"

type Manifest = { workspaces: { catalog: Record<string, string> } }

/** Pins every Kirana package of the catalog in `file` (a root `package.json`) to `version`. */
export function pinKirana(file: string, version: string): void {
  const manifest = JSON.parse(readFileSync(file, "utf8")) as Manifest
  for (const name of Object.keys(manifest.workspaces.catalog))
    if (name.startsWith("@kirana-style/") || name === "kirana-style")
      manifest.workspaces.catalog[name] = version
  writeFileSync(file, `${JSON.stringify(manifest, null, 2)}\n`)
}

/** The Kirana release the catalog in `file` pins. */
export function pinnedKirana(file: string): string {
  const manifest = JSON.parse(readFileSync(file, "utf8")) as Manifest
  return manifest.workspaces.catalog["@kirana-style/core"]!
}
