import * as stylex from "@stylexjs/stylex"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { SidebarInput } from "@workspace/ui/components/sidebar"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { fontSize, lineHeight } from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  card: {
    rowGap: spacing["2"],
    columnGap: spacing["2"],
    paddingTop: spacing["4"],
    paddingBottom: spacing["4"],
    // `shadow-none` clears only the drop shadow; the card keeps its ring.
  },
  cardHeader: {
    paddingInlineStart: spacing["4"],
    paddingInlineEnd: spacing["4"],
  },
  cardTitle: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
  grid: {
    display: "grid",
    gap: spacing["2.5"],
  },
  button: {
    width: "100%",
    backgroundColor: theme.sidebarPrimary,
    color: theme.sidebarPrimaryForeground,
    // `shadow-none` clears only the drop shadow; the card keeps its ring.
  },
})

export function SidebarOptInForm() {
  return (
    <Card sx={styles.card}>
      <CardHeader sx={styles.cardHeader}>
        <CardTitle sx={styles.cardTitle}>Subscribe to our newsletter</CardTitle>
        <CardDescription>
          Opt-in to receive updates and news about the sidebar.
        </CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardHeader}>
        <form>
          <div sx={styles.grid}>
            <SidebarInput type="email" placeholder="Email" />
            <Button sx={styles.button}>Subscribe</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
