/**
 * Tailwind's blur scale, for `filter` and `backdrop-filter`.
 *
 * Layer 1 (primitives). `defineConsts` values are inlined at build time and
 * emit no CSS. These are lengths, so wrap them: `blur(${blur.xs})`.
 *
 * `backdrop-blur-xs` is 4px, not 2px. Every overlay was ported at 2px before
 * this file existed, which is why the scale lives here instead of in each
 * component's head.
 */

import * as stylex from "@stylexjs/stylex"

export const blur = stylex.defineConsts({
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  "2xl": "40px",
  "3xl": "64px",
})
