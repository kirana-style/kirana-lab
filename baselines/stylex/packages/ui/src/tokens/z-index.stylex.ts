/**
 * Stacking order.
 *
 * Layer 1 (primitives). `defineConsts` values are inlined at build time and
 * emit no CSS, so the full Tailwind vocabulary costs nothing to carry here.
 * Only tokens that need to change per theme belong in `theme/semantic.stylex.ts`.
 */

import * as stylex from "@stylexjs/stylex"

export const zIndex = stylex.defineConsts({
  base: "0",
  raised: "10",
  sticky: "20",
  header: "30",
  /** Same layer as `popover`, as shadcn's `z-50`; DOM order stacks them. */
  overlay: "50",
  popover: "50",
  toast: "60",
})
