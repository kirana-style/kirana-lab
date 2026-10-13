/**
 * ButtonGroup, and the shared styles its children use to join up.
 *
 * This is the component the migration had to restructure rather than translate.
 * The Tailwind original drove everything from the parent:
 *
 *   *:data-slot:rounded-e-none
 *   [&>[data-slot]:not(:has(~[data-slot]))]:rounded-e-lg!
 *   [&>[data-slot]~[data-slot]]:rounded-s-none
 *   [&>[data-slot]~[data-slot]]:border-s-0
 *   [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit
 *
 * None of that survives: there are no child combinators in StyleX, and
 * `[class*='w-']` cannot work once class names are hashed.
 *
 * So the relationship is inverted. The group carries a marker, and each child
 * applies `groupedItem`, which uses its own `:first-child` / `:last-child`
 * position to decide which corners to keep. The result needs no `!important` —
 * the old rule needed one purely to out-specify the sibling selector above it.
 */

import * as stylex from "@stylexjs/stylex"

import { recipe } from "./recipe"
import { buttonGroupMarker } from "../theme/markers.stylex"
import { radius } from "../theme/semantic.stylex"
import { spacing } from "../tokens/spacing.stylex"

/**
 * The last real control in the group — "no `data-slot` sibling after me".
 *
 * Not `:last-child`: Base UI appends focus-guard `<span>`s inside the group while
 * a menu is open, so a dropdown trigger stops being the last child and its
 * rounded outer edge vanishes the moment you click it. Every control the group
 * styles carries `data-slot` and the guards do not, so this ignores them. It is
 * also what the Tailwind original matched on.
 */
const LAST_CONTROL = ":not(:has(~ [data-slot]))"

const styles = stylex.create({
  base: {
    display: "flex",
    width: "fit-content",
    alignItems: "stretch",
    // Was `has-[>[data-slot=button-group]]:gap-2`: nested groups stay separated.
    gap: {
      default: 0,
      ':has(> [data-slot="button-group"])': spacing[2],
    },
  },
  horizontal: { flexDirection: "row" },
  vertical: { flexDirection: "column" },

  /**
   * Applied by each child of a group. Only the outer corners of the strip stay
   * round, and every child but the first drops its leading edge so neighbours
   * share one border line.
   *
   * Which corners count as "outer" depends on the axis: in a row the first child
   * owns both start corners, in a column it owns both top corners. A row is
   * anything not marked vertical: like the original, a default ButtonGroup
   * writes no `data-orientation` at all.
   */
  item: {
    borderStartStartRadius: {
      default: null,
      [stylex.when.ancestor(
        ':not([data-orientation="vertical"])',
        buttonGroupMarker
      )]: { default: 0, ":first-child": radius.lg },
      [stylex.when.ancestor(
        '[data-orientation="vertical"]',
        buttonGroupMarker
      )]: { default: 0, ":first-child": radius.lg },
    },
    borderStartEndRadius: {
      default: null,
      [stylex.when.ancestor(
        ':not([data-orientation="vertical"])',
        buttonGroupMarker
      )]: { default: 0, [LAST_CONTROL]: radius.lg },
      [stylex.when.ancestor(
        '[data-orientation="vertical"]',
        buttonGroupMarker
      )]: { default: 0, ":first-child": radius.lg },
    },
    borderEndStartRadius: {
      default: null,
      [stylex.when.ancestor(
        ':not([data-orientation="vertical"])',
        buttonGroupMarker
      )]: { default: 0, ":first-child": radius.lg },
      [stylex.when.ancestor(
        '[data-orientation="vertical"]',
        buttonGroupMarker
      )]: { default: 0, [LAST_CONTROL]: radius.lg },
    },
    borderEndEndRadius: {
      default: null,
      [stylex.when.ancestor(
        ':not([data-orientation="vertical"])',
        buttonGroupMarker
      )]: { default: 0, [LAST_CONTROL]: radius.lg },
      [stylex.when.ancestor(
        '[data-orientation="vertical"]',
        buttonGroupMarker
      )]: { default: 0, [LAST_CONTROL]: radius.lg },
    },
    borderInlineStartWidth: {
      default: null,
      [stylex.when.ancestor(
        ':not([data-orientation="vertical"])',
        buttonGroupMarker
      )]: { default: 0, ":first-child": "1px" },
    },
    borderTopWidth: {
      default: null,
      [stylex.when.ancestor(
        '[data-orientation="vertical"]',
        buttonGroupMarker
      )]: { default: 0, ":first-child": "1px" },
    },

    // A focused child lifts above its neighbours so its ring is not clipped.
    // Only inside a group. `groupedItem` is applied to every Button and Input,
    // so an unconditional rule would lift every focused control in the app.
    position: {
      default: null,
      [stylex.when.ancestor('[data-slot="button-group"]', buttonGroupMarker)]: {
        default: null,
        ":focus-visible": "relative",
      },
    },
    zIndex: {
      default: null,
      [stylex.when.ancestor('[data-slot="button-group"]', buttonGroupMarker)]: {
        default: null,
        ":focus-visible": 10,
      },
    },
  },

  /** For a child that should absorb the group's spare width, such as an input. */
  fill: {
    // `flex-1` is `1 1 0%`: with a zero basis the input stops claiming its full
    // width up front, so a fit-content group sizes to its other children.
    flexGrow: {
      default: null,
      [stylex.when.ancestor(
        ':not([data-orientation="vertical"])',
        buttonGroupMarker
      )]: 1,
    },
    flexBasis: {
      default: null,
      [stylex.when.ancestor(
        ':not([data-orientation="vertical"])',
        buttonGroupMarker
      )]: "0%",
    },
  },
})

export const buttonGroup = recipe({
  base: styles.base,
  variants: {
    orientation: { horizontal: styles.horizontal, vertical: styles.vertical },
  },
  defaults: { orientation: "horizontal" },
})

export const groupedItem = styles.item
export const groupedFill = styles.fill
