import * as stylex from "@stylexjs/stylex"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import type { Sx } from "../lib/sx"
import { mergeSx } from "../lib/sx"
import type { VariantProps } from "../recipes/recipe"
import { buttonGroup, groupedItem } from "../recipes/button-group"
import { Separator } from "./separator"
import { ctx } from "../theme/context.stylex"
import { buttonGroupMarker } from "../theme/markers.stylex"
import { radius, theme } from "../theme/semantic.stylex"
import { spacing } from "../tokens/spacing.stylex"
import { fontSize, fontWeight, lineHeight } from "../tokens/typography.stylex"

const styles = stylex.create({
  text: {
    display: "flex",
    alignItems: "center",
    gap: spacing[2],
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.muted,
    paddingInline: spacing["2.5"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    [ctx.iconSize]: "1rem",
  },
  separator: {
    position: "relative",
    alignSelf: "stretch",
    backgroundColor: theme.input,
    marginInline: { default: null, '[data-orientation="horizontal"]': "1px" },
    width: { default: null, '[data-orientation="horizontal"]': "auto" },
    marginBlock: { default: null, '[data-orientation="vertical"]': "1px" },
    height: { default: null, '[data-orientation="vertical"]': "auto" },
  },
})

function ButtonGroup({
  sx,
  orientation,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> &
  VariantProps<typeof buttonGroup> & { sx?: Sx }) {
  return (
    <div
      role="group"
      data-slot="button-group"
      // Only when given, as in the original. The recipe still defaults to
      // horizontal, but an unset attribute keeps a Field's
      // `:has([data-orientation="horizontal"])` balance rule from firing.
      data-orientation={orientation}
      {...props}
      sx={[buttonGroupMarker, ...buttonGroup({ orientation }), sx]}
    />
  )
}

function ButtonGroupText({
  sx,
  render,
  ...props
}: Omit<useRender.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(stylex.props(styles.text, groupedItem, sx), props),
    render,
    state: { slot: "button-group-text" },
  })
}

function ButtonGroupSeparator({
  sx,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      {...props}
      sx={mergeSx(styles.separator, sx)}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroup as buttonGroupVariants,
}
