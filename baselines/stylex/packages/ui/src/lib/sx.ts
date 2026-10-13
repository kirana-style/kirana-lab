/**
 * Style-prop plumbing. Replaces the old `cn` re-export.
 *
 * Under Tailwind, every component took `className?: string` and merged it with
 * `cn`, which had to understand Tailwind's utility families to resolve
 * conflicts. StyleX removes that problem at the root: styles merge by CSS
 * property, last one wins, so a caller's override is unambiguous.
 *
 * Components therefore take `sx` instead of `className`, and so do elements.
 * The same name does two jobs:
 *
 * - On a lowercase element, `sx` is StyleX's own JSX shorthand (`sxPropName:
 *   "sx"` in `@workspace/vite-config`). The compiler rewrites
 *   `<div sx={[a, b]} />` to `<div {...stylex.props([a, b])} />` in place, so
 *   its position among the other props still decides what overrides what.
 * - On a component, `sx` is a plain React prop. The compiler only rewrites
 *   lowercase elements, so the component receives the styles and passes them on.
 *
 * Put the caller's `sx` last, so it overrides the component's defaults:
 *
 *   <div sx={[styles.base, variantStyles[variant], sx]} />
 */

import type * as stylex from "@stylexjs/stylex"

/**
 * A style value accepted by any component's `sx` prop.
 *
 * Arrays are allowed so a wrapper can compose its own styles with the ones its
 * caller passed, which is how the parts of a component forward styling without
 * losing either side. Use `mergeSx` for that rather than an array literal.
 *
 * `CompiledStyles` sits alongside `StyleXStyles` because the stricter public
 * type rejects a namespace that uses `null` as a conditional default — a shape
 * `stylex.create` produces constantly, wherever a style only applies in one
 * state.
 */
export type Sx = stylex.StyleXArray<
  stylex.StyleXStyles | stylex.CompiledStyles | false | null | undefined
>

/** Adds `sx` to a component's props, replacing `className`. */
export type WithSx<P> = Omit<P, "className"> & { sx?: Sx }

/**
 * Props for a component that forwards to a DOM element, minus the escape
 * hatches the design system owns.
 */
export type StyleProps = { sx?: Sx }

/**
 * Combines several `sx` values into one.
 *
 * Equivalent to the array `[...values]`, which `sx` accepts directly on both
 * elements and components. Kept for call sites that read better as a call,
 * such as `cloneElement` props built outside JSX.
 */
export function mergeSx(...values: Sx[]): Sx {
  return values
}

/**
 * Types StyleX's `sx` shorthand on every DOM and SVG element. The compiler
 * removes the prop before React sees it.
 */
declare module "react" {
  // oxlint-disable-next-line no-unused-vars -- `T` must match React's declaration.
  interface HTMLAttributes<T> {
    sx?: Sx
  }
  // oxlint-disable-next-line no-unused-vars -- `T` must match React's declaration.
  interface SVGAttributes<T> {
    sx?: Sx
  }
}
