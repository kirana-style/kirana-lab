/**
 * Checks that the three implementations install the same dependencies, by comparing what their
 * lockfiles resolved rather than what their manifests ask for (fairness rule 1).
 *
 * - A shared dependency (`versions.json`) resolved to different versions is an error.
 * - A package all three install, resolved to different versions underneath them, is listed: the
 *   build tools they share (Vite, React) can pull different copies through the styling tool, and
 *   the report names those so a size difference is not read as the styling's alone.
 *
 *   bun scripts/fairness.ts           # the summary
 *   bun scripts/fairness.ts --json    # every difference, as JSON for the report
 */
import { readFileSync } from "node:fs"
import path from "node:path"

import { WORKSPACES, versions } from "./workspaces.ts"
import type { Target } from "./workspaces.ts"

/** Every package a `bun.lock` resolves, with each version it resolves to. */
export function resolved(lockfile: string): Map<string, Set<string>> {
  const text = readFileSync(lockfile, "utf8")
  const out = new Map<string, Set<string>>()
  // Package entries read `"<key>": ["<name>@<version>", …`; the key may be a nested path.
  for (const match of text.matchAll(
    /^\s{4}"[^"]+": \["((?:@[^@"/]+\/)?[^@"]+)@([^"]+)"/gm
  )) {
    const [, name, version] = match
    if (!name || !version || version.startsWith("workspace:")) continue
    if (!out.has(name)) out.set(name, new Set())
    out.get(name)!.add(version)
  }
  return out
}

export function compare() {
  const locks = Object.fromEntries(
    Object.entries(WORKSPACES).map(([target, root]) => [
      target,
      resolved(path.join(root, "bun.lock")),
    ])
  ) as Record<Target, Map<string, Set<string>>>
  const { shared } = versions()
  const errors: string[] = []
  const transitive: { name: string; versions: Record<Target, string[]> }[] = []

  const targets = Object.keys(WORKSPACES) as Target[]
  const names = new Set(targets.flatMap((target) => [...locks[target].keys()]))
  for (const name of [...names].sort()) {
    const by = Object.fromEntries(
      targets.map((target) => [
        target,
        [...(locks[target].get(name) ?? [])].sort(),
      ])
    ) as Record<Target, string[]>
    const present = targets.filter((target) => by[target].length > 0)
    if (name in shared) {
      for (const target of present)
        if (!by[target].includes(shared[name]!))
          errors.push(
            `${name}: ${target} resolves ${by[target].join(", ")}, versions.json says ${shared[name]}`
          )
      continue
    }
    if (present.length < targets.length) continue
    const keys = new Set(present.map((target) => by[target].join(",")))
    if (keys.size > 1) transitive.push({ name, versions: by })
  }
  return { errors, transitive }
}

if (import.meta.main) {
  const { errors, transitive } = compare()
  if (process.argv.includes("--json")) {
    console.log(JSON.stringify({ errors, transitive }, null, 2))
  } else {
    for (const item of transitive)
      console.log(
        `differs: ${item.name} ${Object.entries(item.versions)
          .map(([target, list]) => `${target} ${list.join("/")}`)
          .join(" · ")}`
      )
    console.log(
      `fairness: ${errors.length} shared dependencies out of step, ${transitive.length} packages all three install at different versions`
    )
  }
  if (errors.length > 0) {
    console.error(errors.join("\n"))
    process.exit(1)
  }
}
