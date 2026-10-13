import * as stylex from "@stylexjs/stylex"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"

import type { Sx } from "../lib/sx"
import { fieldLabelMarker } from "../theme/markers.stylex"
import { alpha, radius, surface, theme } from "../theme/semantic.stylex"
import { ring } from "../tokens/ring.stylex"
import { spacing } from "../tokens/spacing.stylex"

const styles = stylex.create({
  group: { display: "grid", width: "100%", gap: spacing[2] },

  item: {
    position: "relative",
    display: "flex",
    aspectRatio: "1 / 1",
    width: spacing[4],
    height: spacing[4],
    flexShrink: 0,
    borderRadius: radius.full,
    borderWidth: "1px",
    borderStyle: "solid",
    outlineStyle: "none",

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
      '[aria-invalid="true"][aria-checked="true"]':
        surface.borderInvalidChecked,
    },
    color: { default: null, "[data-checked]": theme.primaryForeground },
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 ${ring.width} ${alpha.ring50}`,
      '[aria-invalid="true"]': `0 0 0 ${ring.width} ${surface.ringInvalid}`,
      [stylex.when.ancestor(":focus-within", fieldLabelMarker)]: "none",
    },
    cursor: { default: null, ":disabled": "not-allowed" },
    opacity: { default: null, ":disabled": 0.5 },
  },

  indicator: {
    display: "flex",
    width: spacing[4],
    height: spacing[4],
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    position: "absolute",
    insetInlineStart: "50%",
    top: "50%",
    width: spacing[2],
    height: spacing[2],
    // `-translate-x-1/2` flips direction in RTL, which logical properties do not
    // cover, so the inline axis is handled explicitly.
    translate: "-50% -50%",
    borderRadius: radius.full,
    backgroundColor: theme.primaryForeground,
  },
})

function RadioGroup({
  sx,
  ...props
}: Omit<RadioGroupPrimitive.Props, "className"> & { sx?: Sx }) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      {...props}
      {...stylex.props(styles.group, sx)}
    />
  )
}

function RadioGroupItem({
  sx,
  ...props
}: Omit<RadioPrimitive.Root.Props, "className"> & { sx?: Sx }) {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      {...props}
      {...stylex.props(stylex.defaultMarker(), styles.item, sx)}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-group-indicator"
        {...stylex.props(styles.indicator)}
      >
        <span sx={styles.dot} />
      </RadioPrimitive.Indicator>
    </RadioPrimitive.Root>
  )
}

export { RadioGroup, RadioGroupItem }
