import * as stylex from "@stylexjs/stylex"
import { Input as InputPrimitive } from "@base-ui/react/input"

import type { Sx } from "../lib/sx"
import { groupedFill, groupedItem } from "../recipes/button-group"
import { controlStyles } from "../recipes/control"
import { theme } from "../theme/semantic.stylex"
import { breakpoint } from "../tokens/breakpoints.stylex"
import { spacing } from "../tokens/spacing.stylex"
import { fontSize, fontWeight, lineHeight } from "../tokens/typography.stylex"

const styles = stylex.create({
  root: {
    height: spacing[8],
    paddingInline: spacing["2.5"],
    paddingBlock: spacing[1],
    // Was `text-base md:text-sm`: larger on touch to stop iOS zooming the page.
    fontSize: { default: fontSize.base, [breakpoint.md]: fontSize.sm },
    lineHeight: { default: lineHeight.base, [breakpoint.md]: lineHeight.sm },
    pointerEvents: { default: null, ":disabled": "none" },
  },
  // `file:` utilities, as a real pseudo-element.
  file: {
    "::file-selector-button": {
      display: "inline-flex",
      height: spacing[6],
      borderWidth: 0,
      backgroundColor: "transparent",
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      fontWeight: fontWeight.medium,
      color: theme.foreground,
    },
  },
})

function Input({
  sx,
  type,
  ...props
}: Omit<React.ComponentProps<"input">, "className"> & { sx?: Sx }) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      {...props}
      {...stylex.props(
        controlStyles.field,
        controlStyles.placeholder,
        styles.root,
        styles.file,
        // An input inside a ButtonGroup joins up and takes the spare width.
        groupedItem,
        groupedFill,
        sx
      )}
    />
  )
}

export { Input }
