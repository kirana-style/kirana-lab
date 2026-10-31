/**
 * What sets a target's builds apart beyond its checkout: the environment its `vite build` and
 * `vite preview` run with, and the folder the build is written to.
 *
 * `kirana-dense` is the Kirana corpus itself built with dense class names (`names: "dense"`,
 * Kirana's D-084): the same apps and sources, so any difference from `kirana` is the naming's.
 * `packages/vite-config` reads `KIRANA_LAB_NAMES` and writes that build to `dist-dense`, beside the
 * hashed one, so the two interleave like any other pair of targets.
 *
 * `kirana-previous` is the corpus copied into `PREVIOUS` with the release before the measured one
 * (`scripts/sync-previous.ts`): a plain build, from its own checkout.
 */
import { TARGETS } from "./results.ts"
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

/** `major.minor.patch` of a version, its pre-release left out. */
const parts = (version: string) =>
  version.split("-")[0]!.split(".").map(Number) as [number, number, number]

/** Below 0 when `a`'s `major.minor.patch` is lower than `b`'s, 0 when they are the same. */
const compare = (a: string, b: string) => {
  const [x, y] = [parts(a), parts(b)]
  for (let index = 0; index < 3; index++)
    if (x[index] !== y[index]) return x[index]! - y[index]!
  return 0
}

/** Whether `version` (`major.minor.patch`, perhaps with a pre-release) has dense names. */
export function hasDenseNames(version: string): boolean {
  const order = compare(version, DENSE_SINCE)
  // A pre-release of the first version came before it.
  return order === 0 ? !version.includes("-") : order > 0
}

/**
 * The targets every step of a session measures, in the order a round builds them: each one less
 * `kirana-previous`, which only the three apps' builds take, and only when it was prepared (the
 * scale-curve job never prepares it), and less `kirana-dense` for a release without dense names or
 * when it is turned off.
 */
export function sessionTargets(
  version: string,
  { dense }: { dense: boolean }
): Target[] {
  return TARGETS.filter(
    (target) =>
      target !== "kirana-previous" &&
      (target !== "kirana-dense" || (dense && hasDenseNames(version)))
  )
}

/** Where `scripts/sync-previous.ts` puts the corpus with the previous release, from the root. */
export const PREVIOUS = "baselines/kirana-previous"

/**
 * The release before `version` among `published` (npm's versions of `@kirana-style/core`): the
 * newest one lower than it, pre-releases left out, or none for the first release. A session builds
 * it beside `version`, so a release is compared with the one before on one machine, in one session
 * (fairness rule 6), never with a number from the session that measured it.
 */
export function previousRelease(
  version: string,
  published: readonly string[]
): string | undefined {
  return published
    .filter((candidate) => !candidate.includes("-"))
    .filter((candidate) => compare(candidate, version) < 0)
    .sort(compare)
    .at(-1)
}
