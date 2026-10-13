/**
 * The registered custom property behind the scroll-fade mask.
 *
 * `stylex.types.lengthPercentage` emits a real `@property` rule with
 * `syntax: "<length-percentage>"`, which is what makes the value animatable — an
 * unregistered custom property cannot be interpolated, so the fade would snap
 * rather than grow. This replaces the hand-written `@property --scroll-fade-b`
 * from the ejected Tailwind layer.
 */

import * as stylex from "@stylexjs/stylex"

export const scrollFadeVars = stylex.defineVars({
  /** How far the fade currently reaches in from the trailing edge. */
  size: stylex.types.lengthPercentage("0px"),
})
