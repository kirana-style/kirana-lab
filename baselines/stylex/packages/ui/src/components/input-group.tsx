import * as stylex from "@stylexjs/stylex"

import type { Sx } from "../lib/sx"
import { mergeSx } from "../lib/sx"
import type { VariantProps } from "../recipes/recipe"
import { groupedItem } from "../recipes/button-group"
import { recipe } from "../recipes/recipe"
import { Button } from "./button"
import { Input } from "./input"
import { Textarea } from "./textarea"
import { ctx } from "../theme/context.stylex"
import {
  comboboxContentMarker,
  inputGroupMarker,
} from "../theme/markers.stylex"
import { alpha, radius, surface, theme } from "../theme/semantic.stylex"
import { duration, easing } from "../tokens/motion.stylex"
import { ring } from "../tokens/ring.stylex"
import { spacing } from "../tokens/spacing.stylex"
import { fontSize, fontWeight, lineHeight } from "../tokens/typography.stylex"

/** Inside a combobox popup the group must not draw its own focus ring. */

/** `rounded-[calc(var(--radius)-Npx)]`, for the controls tucked inside a group. */
const TIGHT_3 = `calc(${radius.base} - 3px)`

const styles = stylex.create({
  root: {
    position: "relative",
    display: "flex",
    width: "100%",
    minWidth: 0,
    alignItems: "center",
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderStyle: "solid",
    outlineStyle: "none",
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,

    // Height and axis follow what the group actually contains: a textarea or a
    // stacked addon makes it grow, anything else keeps it one row tall.
    height: {
      default: spacing[8],
      ':has(> [data-align="block-end"])': "auto",
      ':has(> [data-align="block-start"])': "auto",
      ":has(> textarea)": "auto",
    },
    flexDirection: {
      default: "row",
      ':has(> [data-align="block-end"])': "column",
      ':has(> [data-align="block-start"])': "column",
    },

    // Padding handed down to the control. A stacked addon pads the far side of
    // the input, which is where the group's own edge now is: an addon above
    // (`block-start`) adds room below the text, and one below adds room above.
    [ctx.controlPaddingBlockStart]: {
      default: spacing[1],
      ':has(> [data-align="block-end"])': spacing[3],
    },
    [ctx.controlPaddingBlockEnd]: {
      default: spacing[1],
      ':has(> [data-align="block-start"])': spacing[3],
    },
    [ctx.controlPaddingInlineStart]: {
      default: spacing["2.5"],
      ':has(> [data-align="inline-start"])': spacing["1.5"],
    },
    [ctx.controlPaddingInlineEnd]: {
      default: spacing["2.5"],
      ':has(> [data-align="inline-end"])': spacing["1.5"],
    },

    backgroundColor: {
      default: surface.control,
      ":has(:disabled)": surface.controlDisabled,
    },
    opacity: { default: null, ":has(:disabled)": 0.5 },
    borderColor: {
      default: theme.input,
      ':has([data-slot="input-group-control"]:focus-visible)': theme.ring,
      // Full strength in both modes: only the ring softens in dark.
      ':has([data-slot][aria-invalid="true"])': theme.destructive,
      [stylex.when.ancestor("[data-slot]", comboboxContentMarker)]: {
        default: theme.input,
        ":focus-within": "inherit",
      },
    },
    boxShadow: {
      default: null,
      ':has([data-slot="input-group-control"]:focus-visible)': `0 0 0 ${ring.width} ${alpha.ring50}`,
      ':has([data-slot][aria-invalid="true"])': `0 0 0 ${ring.width} ${surface.ringInvalid}`,
      [stylex.when.ancestor("[data-slot]", comboboxContentMarker)]: "none",
    },
  },

  addonBase: {
    display: "flex",
    height: "auto",
    cursor: "text",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[2],
    paddingBlock: spacing["1.5"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
    userSelect: "none",
    [ctx.iconSize]: "1rem",
    opacity: {
      default: null,
      [stylex.when.ancestor('[data-disabled="true"]', inputGroupMarker)]: 0.5,
    },
  },
  inlineStart: {
    order: -1,
    paddingInlineStart: spacing[2],
    // Pulls a nested button or key back so its own padding does not double up.
    marginInlineStart: {
      default: null,
      ":has(> button)": "-0.3rem",
      ":has(> kbd)": "-0.15rem",
    },
  },
  inlineEnd: {
    order: 1,
    paddingInlineEnd: spacing[2],
    marginInlineEnd: {
      default: null,
      ":has(> button)": "-0.3rem",
      ":has(> kbd)": "-0.15rem",
    },
  },
  blockStart: {
    order: -1,
    width: "100%",
    justifyContent: "flex-start",
    paddingInline: spacing["2.5"],
    paddingTop: spacing[2],
  },
  blockEnd: {
    order: 1,
    width: "100%",
    justifyContent: "flex-start",
    paddingInline: spacing["2.5"],
    paddingBottom: spacing[2],
  },

  buttonBase: {
    display: "flex",
    alignItems: "center",
    gap: spacing[2],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    boxShadow: "none",
  },
  buttonXs: {
    height: spacing[6],
    gap: spacing[1],
    borderRadius: TIGHT_3,
    // Longhands: the Button's size sets start and end padding separately, and a
    // shorthand never beats a longhand.
    paddingInlineStart: spacing["1.5"],
    paddingInlineEnd: spacing["1.5"],
    [ctx.iconSize]: "0.875rem",
  },
  buttonSm: {},
  buttonIconXs: {
    width: spacing[6],
    height: spacing[6],
    borderRadius: TIGHT_3,
    // Longhands, not `padding: 0`: Button sets `paddingInline` plus
    // conditional `paddingInlineStart`/`End`, and a shorthand never beats a
    // longhand in StyleX, whatever order the styles are merged in.
    paddingTop: 0,
    paddingBottom: 0,
    paddingInlineStart: 0,
    paddingInlineEnd: 0,
  },
  buttonIconSm: {
    width: spacing[8],
    height: spacing[8],
    paddingTop: 0,
    paddingBottom: 0,
    paddingInlineStart: 0,
    paddingInlineEnd: 0,
  },

  text: {
    display: "flex",
    alignItems: "center",
    gap: spacing[2],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
    [ctx.iconSize]: "1rem",
  },

  /**
   * The control inside a group gives up its own chrome — the group draws the
   * border, background and focus ring for the whole assembly.
   */
  control: {
    flex: 1,
    // Longhands, not `borderRadius` / `borderWidth`: the control is an Input,
    // which joins up with a ButtonGroup through longhand corners and edges, and
    // a longhand always beats a shorthand. Inside a group the InputGroup is the
    // grouped item, never the input within it.
    borderStartStartRadius: 0,
    borderStartEndRadius: 0,
    borderEndStartRadius: 0,
    borderEndEndRadius: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderInlineStartWidth: 0,
    borderInlineEndWidth: 0,
    paddingTop: ctx.controlPaddingBlockStart,
    paddingBottom: ctx.controlPaddingBlockEnd,
    paddingInlineStart: ctx.controlPaddingInlineStart,
    paddingInlineEnd: ctx.controlPaddingInlineEnd,
    backgroundColor: { default: "transparent", ":disabled": "transparent" },
    boxShadow: { default: "none", ":focus-visible": "none" },
  },
  // Longhands, to beat the control's own `paddingTop` / `paddingBottom`. A
  // textarea keeps its padding whatever addons surround it.
  controlTextarea: {
    resize: "none",
    paddingTop: spacing[2],
    paddingBottom: spacing[2],
  },
})

const inputGroupAddon = recipe({
  base: styles.addonBase,
  variants: {
    align: {
      "inline-start": styles.inlineStart,
      "inline-end": styles.inlineEnd,
      "block-start": styles.blockStart,
      "block-end": styles.blockEnd,
    },
  },
  defaults: { align: "inline-start" },
})

const inputGroupButton = recipe({
  base: styles.buttonBase,
  variants: {
    size: {
      xs: styles.buttonXs,
      sm: styles.buttonSm,
      "icon-xs": styles.buttonIconXs,
      "icon-sm": styles.buttonIconSm,
    },
  },
  defaults: { size: "xs" },
})

type El<T extends keyof React.JSX.IntrinsicElements = "div"> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }

function InputGroup({ sx, ...props }: El) {
  return (
    <div
      data-slot="input-group"
      role="group"
      {...props}
      sx={[inputGroupMarker, groupedItem, styles.root, sx]}
    />
  )
}

function InputGroupAddon({
  sx,
  align = "inline-start",
  ...props
}: El & VariantProps<typeof inputGroupAddon>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("button")) {
          return
        }
        event.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
      sx={[stylex.defaultMarker(), ...inputGroupAddon({ align }), sx]}
    />
  )
}

function InputGroupButton({
  sx,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  VariantProps<typeof inputGroupButton> & {
    type?: "button" | "submit" | "reset"
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      {...props}
      sx={mergeSx(...inputGroupButton({ size }), sx)}
    />
  )
}

function InputGroupText({ sx, ...props }: El<"span">) {
  return <span data-slot="input-group-text" {...props} sx={[styles.text, sx]} />
}

function InputGroupInput({ sx, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="input-group-control"
      {...props}
      sx={mergeSx(styles.control, sx)}
    />
  )
}

function InputGroupTextarea({
  sx,
  ...props
}: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      data-slot="input-group-control"
      {...props}
      sx={mergeSx(styles.control, styles.controlTextarea, sx)}
    />
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
  inputGroupAddon as inputGroupAddonVariants,
  inputGroupButton as inputGroupButtonVariants,
}
