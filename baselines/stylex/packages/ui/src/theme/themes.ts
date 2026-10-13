/**
 * Layer 2: the per-mode overrides that `light-dark()` cannot express.
 *
 * Every colour token in `semantic.stylex.ts` is written as
 * `light-dark(<light>, <dark>)`, the recipe the StyleX docs recommend. The mode
 * is then just the element's `color-scheme`: `light dark` follows the OS with no
 * JavaScript, and `light` or `dark` pins it. ThemeProvider sets that property on
 * `<html>`, so there is no palette to swap and nothing to re-declare below it.
 *
 * `light-dark()` only accepts colours. The three surface tokens that are not
 * colours — a blend mode, a brightness factor, a filter — still need a theme per
 * mode, and that is all this file holds.
 *
 * `createTheme` must live in an ordinary module, never a `.stylex.ts` file —
 * those may only export variable definitions.
 */

import * as stylex from "@stylexjs/stylex"

import { surface } from "./semantic.stylex"

const DARK = "@media (prefers-color-scheme: dark)"

/** Follows the operating system. Applied by default. */
const systemModeTheme = stylex.createTheme(surface, {
  imageRingBlend: { default: "darken", [DARK]: "lighten" },
  imageBrightness: { default: "1", [DARK]: "0.2" },
  imageDim: { default: "none", [DARK]: "brightness(0.2) grayscale(1)" },
})

/** Pins the light values regardless of the OS setting. */
const lightModeTheme = stylex.createTheme(surface, {
  imageRingBlend: "darken",
  imageBrightness: "1",
  imageDim: "none",
})

/** Pins the dark values regardless of the OS setting. */
const darkModeTheme = stylex.createTheme(surface, {
  imageRingBlend: "lighten",
  imageBrightness: "0.2",
  imageDim: "brightness(0.2) grayscale(1)",
})

/** The non-colour theme each mode needs. */
export const modeThemes = {
  system: systemModeTheme,
  light: lightModeTheme,
  dark: darkModeTheme,
} as const

export type ThemeMode = keyof typeof modeThemes
