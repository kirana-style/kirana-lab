import { describe, expect, it } from "vite-plus/test"

import {
  DENSE_BY_DEFAULT,
  DENSE_SINCE,
  denseByDefault,
  hasDenseNames,
  namingIn,
  namingOf,
  previousRelease,
  sessionTargets,
  variant,
} from "../src/targets.ts"

describe("targets", () => {
  it("knows which releases have dense names", () => {
    expect(DENSE_SINCE).toBe("0.2.3")
    expect(hasDenseNames("0.2.3")).toBe(true)
    expect(hasDenseNames("0.2.10")).toBe(true)
    expect(hasDenseNames("0.3.0")).toBe(true)
    expect(hasDenseNames("1.0.0")).toBe(true)
    expect(hasDenseNames("0.2.2")).toBe(false)
    expect(hasDenseNames("0.1.9")).toBe(false)
    expect(hasDenseNames("0.2.3-beta.1")).toBe(false)
    expect(hasDenseNames("0.2.4-beta.1")).toBe(true)
  })

  it("knows which releases write dense names by default", () => {
    expect(DENSE_BY_DEFAULT).toBe("0.4.0")
    expect(denseByDefault("0.4.0")).toBe(true)
    expect(denseByDefault("0.4.2")).toBe(true)
    expect(denseByDefault("1.0.0")).toBe(true)
    expect(denseByDefault("0.3.10")).toBe(false)
    expect(denseByDefault("0.4.0-beta.1")).toBe(false)
    expect(denseByDefault("0.4.1-beta.1")).toBe(true)
  })

  it("measures the naming a release does not use by default, never the same build twice", () => {
    expect(namingOf("0.4.2")).toBe("kirana-hashed")
    expect(namingOf("0.3.5")).toBe("kirana-dense")
    expect(namingOf("0.2.2")).toBeUndefined()
    expect(namingIn(["kirana", "kirana-hashed", "stylex"])).toBe(
      "kirana-hashed"
    )
    expect(namingIn(["kirana", "stylex"])).toBeUndefined()
  })

  it("measures the previous release in no step of its own", () => {
    // Only the three apps' builds add it, once it is prepared: the scale-curve job never prepares it.
    expect(sessionTargets("0.3.5", { naming: true })).toEqual([
      "kirana",
      "kirana-dense",
      "stylex",
      "stylex-swc",
      "tailwind",
    ])
    expect(sessionTargets("0.4.2", { naming: true })).toEqual([
      "kirana",
      "kirana-hashed",
      "stylex",
      "stylex-swc",
      "tailwind",
    ])
    expect(sessionTargets("0.4.2", { naming: false })).toEqual([
      "kirana",
      "stylex",
      "stylex-swc",
      "tailwind",
    ])
    expect(sessionTargets("0.2.2", { naming: true })).not.toContain(
      "kirana-dense"
    )
  })

  it("finds the release before the measured one, pre-releases left out", () => {
    const published = [
      "0.2.3",
      "0.3.0-beta.1",
      "0.3.0",
      "0.3.4",
      "0.3.5",
      "0.3.10",
    ]
    expect(previousRelease("0.3.5", published)).toBe("0.3.4")
    expect(previousRelease("0.3.10", published)).toBe("0.3.5")
    expect(previousRelease("0.3.0", published)).toBe("0.2.3")
    // A pre-release is measured against the last release before its version.
    expect(previousRelease("0.3.6-beta.1", published)).toBe("0.3.5")
    expect(previousRelease("0.2.3", published)).toBeUndefined()
  })

  it("builds each naming into its own folder, every other target as it is", () => {
    expect(variant("kirana-dense")).toEqual({
      env: { KIRANA_LAB_NAMES: "dense" },
      dist: "dist-dense",
    })
    expect(variant("kirana-hashed")).toEqual({
      env: { KIRANA_LAB_NAMES: "hashed" },
      dist: "dist-hashed",
    })
    expect(variant("kirana")).toEqual({ env: {}, dist: "dist" })
    expect(variant("a label on the command line")).toEqual({
      env: {},
      dist: "dist",
    })
  })
})
