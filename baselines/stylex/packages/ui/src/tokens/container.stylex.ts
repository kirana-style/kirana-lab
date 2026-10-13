/**
 * Container query conditions, Tailwind's `@container` sizes.
 *
 * Each value names the container explicitly, because StyleX needs the full
 * at-rule as a single static string. `container.md("field-group")` is not
 * possible in a const, so the named containers this design system uses get
 * their own entries.
 *
 * Layer 1 (primitives). `defineConsts` values are inlined at build time and
 * emit no CSS, so the full Tailwind vocabulary costs nothing to carry here.
 */

import * as stylex from "@stylexjs/stylex"

/** Unnamed container queries, matching the nearest container ancestor. */
export const container = stylex.defineConsts({
  xs: "@container (min-width: 20rem)",
  sm: "@container (min-width: 24rem)",
  md: "@container (min-width: 28rem)",
  lg: "@container (min-width: 32rem)",
  xl: "@container (min-width: 36rem)",
  "2xl": "@container (min-width: 42rem)",
})

/** Named containers declared by `Field`/`FieldGroup` and `CardHeader`. */
export const containerName = stylex.defineConsts({
  fieldGroup: "field-group",
  cardHeader: "card-header",
})

export const fieldGroupQuery = stylex.defineConsts({
  md: "@container field-group (min-width: 28rem)",
})

export const cardHeaderQuery = stylex.defineConsts({
  sm: "@container card-header (min-width: 24rem)",
})
