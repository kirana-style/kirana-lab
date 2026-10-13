/**
 * Type scale. Font families match the two variable fonts this app loads.
 *
 * Layer 1 (primitives). `defineConsts` values are inlined at build time and
 * emit no CSS, so the full Tailwind vocabulary costs nothing to carry here.
 * Only tokens that need to change per theme belong in `theme/semantic.stylex.ts`.
 */

import * as stylex from "@stylexjs/stylex"

export const fontFamily = stylex.defineConsts({
  // The same stacks as the original's `--font-sans` / `--font-heading`, so glyphs
  // the web font lacks (emoji) fall back to the same font.
  sans: '"Inter Variable", sans-serif',
  heading: '"Oxanium Variable", sans-serif',
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
})

export const fontSize = stylex.defineConsts({
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem",
})

/**
 * Line heights paired with each `fontSize` step, as unitless ratios so they scale
 * with the text the way Tailwind's `--text-*--line-height` do.
 *
 * Each ratio is stored **rounded up** at five decimals, not written as
 * `calc(1.25 / 0.875)`. The CSS minifier folds any such expression to five
 * decimals and rounds down: `1.42857` × 14px is 19.99998px, and Chrome lays text
 * out in 1/64px steps, so every small line became 19.984px. Across a long page
 * that drifted into a visible 1px shift against the Tailwind original, which
 * escapes the minifier by keeping the `calc` inside a custom property. Rounding
 * up lands every paired size on a whole pixel. The comment on each line keeps
 * Tailwind's original ratio.
 */
export const lineHeight = stylex.defineConsts({
  xs: "1.33334", // 1 / 0.75
  sm: "1.42858", // 1.25 / 0.875
  base: "1.5", // 1.5 / 1
  lg: "1.55556", // 1.75 / 1.125
  xl: "1.4", // 1.75 / 1.25
  "2xl": "1.33334", // 2 / 1.5
  "3xl": "1.2", // 2.25 / 1.875
  "4xl": "1.11112", // 2.5 / 2.25
  "5xl": "1",
  "6xl": "1",
  "7xl": "1",
  "8xl": "1",
  "9xl": "1",
})

export const fontWeight = stylex.defineConsts({
  thin: "100",
  extralight: "200",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900",
})

export const letterSpacing = stylex.defineConsts({
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
})

/** Standalone leading values, for when they are not tied to a font size. */
export const leading = stylex.defineConsts({
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2",
})
