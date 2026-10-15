/**
 * The three implementations the lab compares, each a Bun workspace of its own with its own
 * lockfile: the Kirana corpus at the repository root, and the StyleX and Tailwind baselines.
 */
import { readFileSync } from "node:fs"
import path from "node:path"

export const ROOT = path.resolve(import.meta.dirname, "..")

export const WORKSPACES = {
  kirana: ROOT,
  stylex: path.join(ROOT, "baselines/stylex"),
  tailwind: path.join(ROOT, "baselines/tailwind"),
} as const

export type Target = keyof typeof WORKSPACES

export type Versions = {
  shared: Record<string, string>
  differences: Record<string, Record<string, string>>
}

export const versions = (): Versions =>
  JSON.parse(readFileSync(path.join(ROOT, "versions.json"), "utf8")) as Versions
