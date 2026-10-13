import { css } from "@kirana-style/core"
import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Item, ItemContent } from "@workspace/ui/components/item"
import { Separator } from "@workspace/ui/components/separator"
import { theme } from "@workspace/ui/theme/semantic"
import { color } from "@workspace/ui/tokens/colors"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography"

const styles = {
  cardTitle: css({
    fontSize: fontSize["5xl"],
    lineHeight: lineHeight["5xl"],
    fontVariantNumeric: "tabular-nums",
  }),
  text: css({
    width: spacing["2"],
    height: spacing["2"],
    borderRadius: "calc(infinity * 1px)",
    backgroundColor: color.yellow500,
  }),
  cardContent: css({
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  }),
  item: css({
    flexDirection: "column",
    alignItems: "stretch",
  }),
  itemContent: css({
    rowGap: spacing["3"],
    columnGap: spacing["3"],
  }),
  row: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  text2: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  text3: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  }),
  text4: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
}

export function ClaimableBalance() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Claimable Balance</CardDescription>
        <CardTitle sx={styles.cardTitle}>$0.00</CardTitle>
        <Badge variant="outline">
          <span sx={styles.text} />
          Pending Setup
        </Badge>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <Item variant="muted" sx={styles.item}>
          <ItemContent sx={styles.itemContent}>
            <div sx={styles.row}>
              <span sx={styles.text2}>Net Royalties</span>
              <span sx={styles.text3}>$0.00</span>
            </div>
            <div sx={styles.row}>
              <span sx={styles.text2}>Processing Fee</span>
              <span sx={styles.text3}>-$0.00</span>
            </div>
            <Separator />
            <div sx={styles.row}>
              <span sx={styles.text2}>Total Ready to Claim</span>
              <span sx={styles.text4}>$0.00 USD</span>
            </div>
          </ItemContent>
        </Item>
      </CardContent>
      <CardFooter>
        <CardDescription>
          Once your bank is connected, balances over $10.00 are automatically
          eligible for monthly distribution on the 15th of each month.
        </CardDescription>
      </CardFooter>
    </Card>
  )
}
