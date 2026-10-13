import * as stylex from "@stylexjs/stylex"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@workspace/ui/components/input-group"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
} from "@workspace/ui/components/item"
import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"
import { Progress } from "@workspace/ui/components/progress"
import { ctx } from "@workspace/ui/theme/context.stylex"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: ctx.gap,
  },
  itemGroup: {
    rowGap: spacing["3"],
    columnGap: spacing["3"],
  },
  item: {
    flexDirection: "column",
    alignItems: "stretch",
  },
  itemDescription: {
    fontFamily: '"Oxanium Variable", sans-serif',
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.wider,
    color: theme.mutedForeground,
    textTransform: "uppercase",
  },
  text: {
    fontSize: fontSize["3xl"],
    lineHeight: lineHeight["3xl"],
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  },
  text2: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  },
  text3: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  },
  cardDescription: {
    textAlign: "center",
  },
  cardContent: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    rowGap: spacing["3"],
    columnGap: spacing["3"],
  },
  fieldGroup: {
    flex: 1,
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["2"],
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text4: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  },
  cardFooter: {
    flexDirection: "column",
    rowGap: spacing["3"],
    columnGap: spacing["3"],
  },
  button: {
    width: "100%",
  },
})

export function SavingsTargets() {
  return (
    <div sx={styles.grid}>
      <Card>
        <CardHeader>
          <CardTitle>Savings Targets</CardTitle>
          <CardDescription>Active milestones for 2024</CardDescription>
          <CardAction>
            <Button variant="outline" size="sm">
              New Goal
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ItemGroup sx={styles.itemGroup}>
            <Item variant="muted" sx={styles.item}>
              <ItemContent sx={styles.itemGroup}>
                <ItemDescription sx={styles.itemDescription}>
                  Retirement
                </ItemDescription>
                <span sx={styles.text}>$420,000</span>
                <Progress value={65} />
              </ItemContent>
              <ItemFooter>
                <span sx={styles.text2}>65% achieved</span>
                <span sx={styles.text3}>$273,000</span>
              </ItemFooter>
            </Item>
            <Item variant="muted" sx={styles.item}>
              <ItemContent sx={styles.itemGroup}>
                <ItemDescription sx={styles.itemDescription}>
                  Real Estate
                </ItemDescription>
                <span sx={styles.text}>$85,000</span>
                <Progress value={32} />
              </ItemContent>
              <ItemFooter>
                <span sx={styles.text2}>32% achieved</span>
                <span sx={styles.text3}>$27,200</span>
              </ItemFooter>
            </Item>
          </ItemGroup>
        </CardContent>
        <CardFooter>
          <CardDescription sx={styles.cardDescription}>
            You have not met your targets for this year.
          </CardDescription>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Buy Investment</CardTitle>
        </CardHeader>
        <CardContent sx={styles.cardContent}>
          <FieldGroup sx={styles.fieldGroup}>
            <Field>
              <FieldLabel htmlFor="invest-amount">Amount to Invest</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>$</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput id="invest-amount" defaultValue="1,000.00" />
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="invest-type">Order Type</FieldLabel>
              <NativeSelect id="invest-type" defaultValue="market">
                <NativeSelectOption value="market">
                  Market Order
                </NativeSelectOption>
                <NativeSelectOption value="limit">
                  Limit Order
                </NativeSelectOption>
                <NativeSelectOption value="stop">Stop Order</NativeSelectOption>
              </NativeSelect>
              <FieldDescription>
                Market orders execute at the current price.
              </FieldDescription>
            </Field>
            <div sx={styles.stack}>
              <div sx={styles.row}>
                <span sx={styles.text2}>Estimated Shares</span>
                <span sx={styles.text4}>1.95</span>
              </div>
              <div sx={styles.row}>
                <span sx={styles.text2}>Buying Power</span>
                <span sx={styles.text4}>$12,450.00</span>
              </div>
            </div>
          </FieldGroup>
        </CardContent>
        <CardFooter sx={styles.cardFooter}>
          <Button sx={styles.button}>Review Order</Button>
          <CardDescription sx={styles.cardDescription}>
            Trades are typically executed within minutes during market hours.
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  )
}
