/**
 * Tailwind box-shadow scale.
 *
 * Layer 1 (primitives). `defineConsts` values are inlined at build time and
 * emit no CSS, so the full Tailwind vocabulary costs nothing to carry here.
 * Only tokens that need to change per theme belong in `theme/semantic.stylex.ts`.
 */

import * as stylex from "@stylexjs/stylex"

export const shadow = stylex.defineConsts({
  "2xs": "0 1px rgb(0 0 0 / 0.05)",
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  none: "none",
})
