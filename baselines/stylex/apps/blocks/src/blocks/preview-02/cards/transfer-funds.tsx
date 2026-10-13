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
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@workspace/ui/components/input-group"
import { Item, ItemContent } from "@workspace/ui/components/item"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Separator } from "@workspace/ui/components/separator"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  button: {
    backgroundColor: theme.muted,
  },
  selectTrigger: {
    width: "100%",
  },
  item: {
    flexDirection: "column",
    alignItems: "stretch",
  },
  itemContent: {
    rowGap: spacing["3"],
    columnGap: spacing["3"],
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  },
  text2: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  },
  text3: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  },
  text4: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  },
})

const FROM_ACCOUNTS = [
  { label: "Main Checking (··8402) — $12,450.00", value: "checking" },
  { label: "Business (··7731) — $8,920.00", value: "business" },
]

const TO_ACCOUNTS = [
  { label: "High Yield Savings (··1192) — $42,100.00", value: "savings" },
  { label: "Investment (··3349) — $18,200.00", value: "investment" },
]

export function TransferFunds() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transfer Funds</CardTitle>
        <CardDescription>
          Move money between your connected accounts.
        </CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" sx={styles.button}>
            <Icon icon={Cancel01Icon} />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="transfer-amount">
              Amount to Transfer
            </FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>$</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput id="transfer-amount" defaultValue="1,200.00" />
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="from-account">From Account</FieldLabel>
            <Select items={FROM_ACCOUNTS} defaultValue="checking">
              <SelectTrigger id="from-account" sx={styles.selectTrigger}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {FROM_ACCOUNTS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="to-account">To Account</FieldLabel>
            <Select items={TO_ACCOUNTS} defaultValue="savings">
              <SelectTrigger id="to-account" sx={styles.selectTrigger}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {TO_ACCOUNTS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Item variant="muted" sx={styles.item}>
            <ItemContent sx={styles.itemContent}>
              <div sx={styles.row}>
                <span sx={styles.text}>Estimated arrival</span>
                <span sx={styles.text2}>Today, Apr 14</span>
              </div>
              <Separator />
              <div sx={styles.row}>
                <span sx={styles.text}>Transaction fee</span>
                <span sx={styles.text3}>$0.00</span>
              </div>
              <Separator />
              <div sx={styles.row}>
                <span sx={styles.text2}>Total amount</span>
                <span sx={styles.text4}>$1,200.00</span>
              </div>
            </ItemContent>
          </Item>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button sx={styles.selectTrigger}>Confirm Transfer</Button>
      </CardFooter>
    </Card>
  )
}
