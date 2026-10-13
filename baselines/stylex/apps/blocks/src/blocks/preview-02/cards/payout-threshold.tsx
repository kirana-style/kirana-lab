import * as stylex from "@stylexjs/stylex"
import * as React from "react"

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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Slider } from "@workspace/ui/components/slider"
import { Textarea } from "@workspace/ui/components/textarea"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic.stylex"
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
  row: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  text: {
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  },
  row2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textarea: {
    minHeight: "100px",
  },
})

const CURRENCIES = [
  { label: "USD — United States Dollar", value: "usd" },
  { label: "EUR — Euro", value: "eur" },
  { label: "GBP — British Pound", value: "gbp" },
  { label: "JPY — Japanese Yen", value: "jpy" },
]

export function PayoutThreshold() {
  const [amount, setAmount] = React.useState([2500])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout Threshold</CardTitle>
        <CardDescription>
          Set the minimum balance required before a payout is triggered.
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
            <FieldLabel htmlFor="preferred-currency">
              Preferred Currency
            </FieldLabel>
            <Select items={CURRENCIES} defaultValue="usd">
              <SelectTrigger id="preferred-currency" sx={styles.selectTrigger}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CURRENCIES.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <div sx={styles.row}>
              <FieldLabel htmlFor="min-payout">
                Minimum Payout Amount
              </FieldLabel>
              <span sx={styles.text}>${amount[0].toFixed(2)}</span>
            </div>
            <Slider
              id="min-payout"
              value={amount}
              onValueChange={(value) =>
                setAmount(Array.isArray(value) ? [...value] : [value])
              }
              min={50}
              max={10000}
              step={50}
            />
            <div sx={styles.row2}>
              <FieldDescription>$50 (MIN)</FieldDescription>
              <FieldDescription>$10,000 (MAX)</FieldDescription>
            </div>
          </Field>
          <Field>
            <FieldLabel htmlFor="payout-notes">Notes</FieldLabel>
            <Textarea
              id="payout-notes"
              placeholder="Add any notes for this payout configuration..."
              sx={styles.textarea}
            />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button sx={styles.selectTrigger}>Save Threshold</Button>
      </CardFooter>
    </Card>
  )
}
