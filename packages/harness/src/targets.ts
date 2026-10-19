/**
 * What sets a target's builds apart beyond its checkout: the environment its `vite build` and
 * `vite preview` run with, and the folder the build is written to.
 *
 * `kirana-dense` is the Kirana corpus itself built with dense class names (`names: "dense"`,
 * Kirana's D-084): the same apps and sources, so any difference from `kirana` is the naming's.
 * `packages/vite-config` reads `KIRANA_LAB_NAMES` and writes that build to `dist-dense`, beside the
 * hashed one, so the two interleave like any other pair of targets.
 */
import type { Target } from "./results.ts"

export type Variant = { env: Record<string, string>; dist: string }

const PLAIN: Variant = { env: {}, dist: "dist" }

export const VARIANTS: Partial<Record<Target, Variant>> = {
  "kirana-dense": { env: { KIRANA_LAB_NAMES: "dense" }, dist: "dist-dense" },
}

/** A target's variant; a label that names no target (slice.ts on the command line) is plain. */
export const variant = (label: string): Variant =>
  VARIANTS[label as Target] ?? PLAIN

/** The first Kirana release with `names: "dense"`. */
export const DENSE_SINCE = "0.2.3"

/** Whether `version` (`major.minor.patch`, perhaps with a pre-release) has dense names. */
export function hasDenseNames(version: string): boolean {
  const parse = (text: string) =>
    text.split("-")[0]!.split(".").map(Number) as [number, number, number]
  const [a, b] = [parse(version), parse(DENSE_SINCE)]
  for (let index = 0; index < 3; index++)
    if (a[index] !== b[index]) return a[index]! > b[index]!
  // A pre-release of the first version came before it.
  return !version.includes("-")
}
