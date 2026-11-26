/**
 * What sets a target's builds apart beyond its checkout: the environment its `vite build` and
 * `vite preview` run with, and the folder the build is written to.
 *
 * Kirana names its classes two ways (Kirana's D-084), and a session measures the one its release
 * does not use by default beside `kirana`, as published: `kirana-dense` (`names: "dense"`) for a
 * release where dense names are opt-in, `kirana-hashed` (`names: "hashed"`) from the release that
 * made them the default. Both are the Kirana corpus itself, the same apps and sources, so any
 * difference from `kirana` is the naming's. `packages/vite-config` reads `KIRANA_LAB_NAMES` and
 * writes that build to `dist-dense` or `dist-hashed`, beside the default one, so the two interleave
 * like any other pair of targets.
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
  "kirana-hashed": { env: { KIRANA_LAB_NAMES: "hashed" }, dist: "dist-hashed" },
}

/** The target that builds Kirana with the naming its release does not use by default. */
export type Naming = "kirana-dense" | "kirana-hashed"

/** A target's variant; a label that names no target (slice.ts on the command line) is plain. */
export const variant = (label: string): Variant =>
  VARIANTS[label as Target] ?? PLAIN

/** The first Kirana release with `names: "dense"`. */
export const DENSE_SINCE = "0.2.3"

/** The first Kirana release whose production builds write dense names unless told otherwise. */
export const DENSE_BY_DEFAULT = "0.4.0"

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

/** Whether `version`'s production builds write dense names by default. */
export function denseByDefault(version: string): boolean {
  const order = compare(version, DENSE_BY_DEFAULT)
  return order === 0 ? !version.includes("-") : order > 0
}

/**
 * The naming `version` does not use by default, as the target that builds it: `kirana-hashed` once
 * dense names are the default, `kirana-dense` while they are opt-in, and none before they existed.
 * Measuring `kirana-dense` beside a release that already writes dense names would compare a build
 * with itself.
 */
export function namingOf(version: string): Naming | undefined {
  if (denseByDefault(version)) return "kirana-hashed"
  return hasDenseNames(version) ? "kirana-dense" : undefined
}

/**
 * The targets every step of a session measures, in the order a round builds them: each one less
 * `kirana-previous`, which only the three apps' builds take, and only when it was prepared (the
 * scale-curve job never prepares it), and with the release's other naming (`namingOf`) alone of
 * `kirana-dense` and `kirana-hashed`, or neither when `naming` is turned off.
 */
export function sessionTargets(
  version: string,
  { naming }: { naming: boolean }
): Target[] {
  const other = naming ? namingOf(version) : undefined
  return TARGETS.filter(
    (target) =>
      target !== "kirana-previous" &&
      ((target !== "kirana-dense" && target !== "kirana-hashed") ||
        target === other)
  )
}

/** The naming target among `targets`, if a session measures one. */
export const namingIn = (targets: readonly Target[]): Naming | undefined =>
  targets.find(
    (target): target is Naming =>
      target === "kirana-dense" || target === "kirana-hashed"
  )

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
