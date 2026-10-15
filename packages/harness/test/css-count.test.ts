import { describe, expect, it } from "vite-plus/test"

import { countCss } from "../src/css-count.ts"

describe("countCss", () => {
  it("counts style rules and their declarations", () => {
    expect(countCss(".a{color:red;margin:0}.b{padding:1px}")).toEqual({
      rules: 2,
      declarations: 3,
    })
  })

  it("counts rules inside at-rules, not the at-rules themselves", () => {
    expect(
      countCss(
        "@layer base{.a{color:red}}@media (min-width:40rem){.b{display:grid;gap:1rem}}"
      )
    ).toEqual({ rules: 2, declarations: 3 })
  })

  it("counts nested rules", () => {
    expect(countCss(".a{color:red;&:hover{color:blue}}")).toEqual({
      rules: 2,
      declarations: 2,
    })
  })

  it("skips comments and strings", () => {
    expect(countCss('/* .x{a:b} */.a{content:"{;}";color:red}')).toEqual({
      rules: 1,
      declarations: 2,
    })
  })

  it("ignores top-level at-rule statements", () => {
    expect(countCss("@layer reset,base;@import url(x.css);.a{b:c}")).toEqual({
      rules: 1,
      declarations: 1,
    })
  })
})
