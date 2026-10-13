/**
 * Responsive conditions. `breakpoint.md` is Tailwind's `md:` prefix.
 *
 * Layer 1 (primitives). `defineConsts` values are inlined at build time and
 * emit no CSS, so the full Tailwind vocabulary costs nothing to carry here.
 * Only tokens that need to change per theme belong in `theme/semantic.stylex.ts`.
 */

import * as stylex from "@stylexjs/stylex"

export const breakpoint = stylex.defineConsts({
  sm: "@media (min-width: 40rem)",
  md: "@media (min-width: 48rem)",
  lg: "@media (min-width: 64rem)",
  xl: "@media (min-width: 80rem)",
  "2xl": "@media (min-width: 96rem)",
  /** Not in Tailwind's defaults; shadcn's own site adds it at 1600px. */
  "3xl": "@media (min-width: 100rem)",
})

/** Raw widths, for `maxWidth`/`width` rather than as a condition. */
export const screen = stylex.defineConsts({
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "96rem",
  "3xl": "100rem",
})
