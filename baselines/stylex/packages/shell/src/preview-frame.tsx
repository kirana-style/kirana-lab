import * as stylex from "@stylexjs/stylex"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  row: {
    display: "flex",
    minHeight: "100%",
    width: "100%",
    justifyContent: "center",
    backgroundColor: `light-dark(${theme.muted}, ${theme.background})`,
    padding: {
      default: spacing["4"],
      "@media (min-width: 40rem) and (max-width: 63.999rem)": spacing["6"],
      [breakpoint.lg]: spacing["12"],
    },
  },
  box: {
    width: "100%",
    maxWidth: "24rem",
  },
})
/** A single block card, centred on the page background at its natural width. */
export function PreviewFrame({ children }: { children: React.ReactNode }) {
  return (
    <div sx={styles.row}>
      <div sx={styles.box}>{children}</div>
    </div>
  )
}
