import * as stylex from "@stylexjs/stylex"

import type { Sx } from "../lib/sx"
import { controlStyles } from "../recipes/control"
import { breakpoint } from "../tokens/breakpoints.stylex"
import { spacing } from "../tokens/spacing.stylex"
import { fontSize, lineHeight } from "../tokens/typography.stylex"

const styles = stylex.create({
  root: {
    display: "flex",
    // `field-sizing-content`: grows with its content instead of scrolling.
    fieldSizing: "content",
    minHeight: spacing[16],
    paddingInline: spacing["2.5"],
    paddingBlock: spacing[2],
    fontSize: { default: fontSize.base, [breakpoint.md]: fontSize.sm },
    lineHeight: { default: lineHeight.base, [breakpoint.md]: lineHeight.sm },
  },
})

function Textarea({
  sx,
  ...props
}: Omit<React.ComponentProps<"textarea">, "className"> & { sx?: Sx }) {
  return (
    <textarea
      data-slot="textarea"
      {...props}
      sx={[controlStyles.field, controlStyles.placeholder, styles.root, sx]}
    />
  )
}

export { Textarea }
