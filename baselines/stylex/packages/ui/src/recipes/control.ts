/**
 * Shared chrome for text-entry controls: input, textarea, native select, and
 * the triggers that are meant to read as fields.
 *
 * This is one namespace rather than a set of mixins because of how StyleX
 * merges. Styles combine per property, last one wins — so a later style that
 * sets `borderColor` replaces the earlier `borderColor` *including* its
 * conditions, not just the matching ones. Anything that layers conditional
 * values onto the same property therefore has to be declared together.
 *
 * Components compose this with their own box metrics (height, padding, font
 * size), which touch different properties and so merge cleanly.
 */

import * as stylex from "@stylexjs/stylex"

import { alpha, radius, surface, theme } from "../theme/semantic.stylex"
import { duration, easing } from "../tokens/motion.stylex"
import { ring } from "../tokens/ring.stylex"

export const controlStyles = stylex.create({
  /**
   * The resting field: bordered, transparent in light mode and a translucent
   * fill in dark, with a focus ring that validation state overrides.
   */
  field: {
    width: "100%",
    minWidth: 0,
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderStyle: "solid",
    outlineStyle: "none",
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,

    backgroundColor: {
      default: surface.control,
      ":disabled": surface.controlDisabled,
    },
    borderColor: {
      default: theme.input,
      ":focus-visible": theme.ring,
      // Validation is declared last so it outranks focus: an invalid field
      // stays visibly invalid while it has focus.
      '[aria-invalid="true"]': surface.borderInvalid,
    },
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 ${ring.width} ${alpha.ring50}`,
      '[aria-invalid="true"]': `0 0 0 ${ring.width} ${surface.ringInvalid}`,
    },
    cursor: { default: null, ":disabled": "not-allowed" },
    opacity: { default: null, ":disabled": 0.5 },
  },

  /** Placeholder text, a top-level pseudo-element key. */
  placeholder: {
    "::placeholder": { color: theme.mutedForeground },
  },
})
