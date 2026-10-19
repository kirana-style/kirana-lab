import { describe, expect, it } from "vite-plus/test"

import { DENSE_SINCE, hasDenseNames, variant } from "../src/targets.ts"

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
