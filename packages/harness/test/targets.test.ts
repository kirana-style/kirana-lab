import { describe, expect, it } from "vite-plus/test"

import {
  DENSE_SINCE,
  hasDenseNames,
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

  it("measures the previous release in no step of its own", () => {
    // Only the three apps' builds add it, once it is prepared: the scale-curve job never prepares it.
    expect(sessionTargets("0.3.5", { dense: true })).toEqual([
      "kirana",
      "kirana-dense",
      "stylex",
      "stylex-swc",
      "tailwind",
    ])
    expect(sessionTargets("0.3.5", { dense: false })).not.toContain(
      "kirana-dense"
    )
    expect(sessionTargets("0.2.2", { dense: true })).not.toContain(
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

  it("builds kirana-dense into its own folder, every other target as it is", () => {
    expect(variant("kirana-dense")).toEqual({
      env: { KIRANA_LAB_NAMES: "dense" },
      dist: "dist-dense",
    })
    expect(variant("kirana")).toEqual({ env: {}, dist: "dist" })
    expect(variant("a label on the command line")).toEqual({
      env: {},
      dist: "dist",
    })
  })
})
