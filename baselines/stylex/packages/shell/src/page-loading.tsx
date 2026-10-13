import * as stylex from "@stylexjs/stylex"
import { Spinner } from "@workspace/ui/components/spinner"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  row: {
    display: "flex",
    minHeight: spacing["80"],
    alignItems: "center",
    justifyContent: "center",
    color: theme.mutedForeground,
  },
  spinner: {
    width: spacing["6"],
    height: spacing["6"],
  },
})

export function PageLoading() {
  return (
    <div sx={styles.row}>
      <Spinner sx={styles.spinner} />
    </div>
  )
}
