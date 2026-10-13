import * as stylex from "@stylexjs/stylex"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { fontSize, leading } from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  cardDescription: {
    marginTop: spacing["3"],
    fontSize: fontSize.sm,
    lineHeight: leading.relaxed,
  },
  link: {
    textDecorationLine: "underline",
    textUnderlineOffset: "4px",
    color: { default: null, ":hover": theme.primary },
  },
})

export function IndexInvesting() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dollar-Cost Averaging</CardTitle>
        <CardDescription>
          A strategy for building wealth over time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription sx={styles.cardDescription}>
          <a href="#" sx={styles.link}>
            Over time
          </a>
          , this smooths out the average cost of your investments. When prices
          drop, your fixed amount buys more shares. When prices rise, you buy
          fewer. The result is a lower average cost per share compared to
          lump-sum investing during volatile periods.
        </CardDescription>
      </CardContent>
    </Card>
  )
}
