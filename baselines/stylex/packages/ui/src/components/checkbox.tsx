import * as stylex from "@stylexjs/stylex"
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { Tick02Icon } from "@hugeicons/core-free-icons"

import type { Sx } from "../lib/sx"
import { Icon } from "../primitives/icon"
import { ctx } from "../theme/context.stylex"
import { fieldLabelMarker, fieldMarker } from "../theme/markers.stylex"
import { alpha, surface, theme } from "../theme/semantic.stylex"
import { duration, easing } from "../tokens/motion.stylex"
import { ring } from "../tokens/ring.stylex"
import { spacing } from "../tokens/spacing.stylex"

/** The surrounding Field is disabled, so every control inside it dims. */
/**
 * Focus lives on the wrapping FieldLabel rather than the box itself, so the box
 * must not draw its own ring — the label already drew one.
 */

const styles = stylex.create({
  root: {
    position: "relative",
    display: "flex",
    width: spacing[4],
    height: spacing[4],
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    borderWidth: "1px",
    borderStyle: "solid",
    outlineStyle: "none",
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    [ctx.iconSize]: "0.875rem",

    // Was `after:-inset-x-3 after:-inset-y-2`: enlarges the hit area well past
    // the 16px box without changing layout.
    "::after": {
      content: "''",
      position: "absolute",
      insetInline: `calc(${spacing[3]} * -1)`,
      insetBlock: `calc(${spacing[2]} * -1)`,
    },

    backgroundColor: {
      default: surface.control,
      "[data-checked]": theme.primary,
    },
    borderColor: {
      default: theme.input,
      ":focus-visible": theme.ring,
      "[data-checked]": theme.primary,
      '[aria-invalid="true"]': surface.borderInvalid,
      // An invalid *and* checked box keeps the primary edge, so the tick still
      // reads as a tick rather than as an error.
      '[aria-invalid="true"][aria-checked="true"]': theme.primary,
    },
    color: { default: null, "[data-checked]": theme.primaryForeground },
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 ${ring.width} ${alpha.ring50}`,
      '[aria-invalid="true"]': `0 0 0 ${ring.width} ${surface.ringInvalid}`,
      [stylex.when.ancestor(":focus-within", fieldLabelMarker)]: "none",
    },
    cursor: { default: null, ":disabled": "not-allowed" },
    opacity: {
      default: null,
      ":disabled": 0.5,
      [stylex.when.ancestor(":has(:disabled)", fieldMarker)]: 0.5,
    },
  },

  indicator: {
    display: "grid",
    placeContent: "center",
    color: "currentColor",
  },
})

function Checkbox({
  sx,
  ...props
}: Omit<CheckboxPrimitive.Root.Props, "className"> & { sx?: Sx }) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      {...props}
      {...stylex.props(stylex.defaultMarker(), styles.root, sx)}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        {...stylex.props(styles.indicator)}
      >
        <Icon icon={Tick02Icon} strokeWidth={2} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
