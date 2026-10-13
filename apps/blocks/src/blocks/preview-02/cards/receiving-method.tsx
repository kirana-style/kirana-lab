import { css } from "@kirana-style/core"
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
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  button: css({
    backgroundColor: theme.muted,
  }),
  radioGroup: css({
    display: "grid",
    gridTemplateColumns: {
      base: "repeat(1, minmax(0, 1fr))",
      [breakpoint.md]: "repeat(2, minmax(0, 1fr))",
    },
    alignItems: "flex-start",
    rowGap: spacing["3"],
    columnGap: spacing["3"],
  }),
  field: css({
    paddingBottom: spacing["2.5"],
  }),
  fieldDescription: css({
    overflowX: "hidden",
    overflowY: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
  }),
  button2: css({
    width: "100%",
  }),
}

export function ReceivingMethod() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Payout Preferences</CardDescription>
        <CardTitle>Receiving Method</CardTitle>
        <CardAction>
          <Button variant="ghost" size="icon-sm" sx={styles.button}>
            <Icon icon={Cancel01Icon} />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="account-holder">
              Account Holder Name
            </FieldLabel>
            <Input
              id="account-holder"
              defaultValue="Synthetic Horizons Music LLC"
            />
          </Field>
          <FieldSet>
            <FieldLegend variant="label">Receiving Method</FieldLegend>
            <RadioGroup defaultValue="bank" sx={styles.radioGroup}>
              <FieldLabel htmlFor="method-bank">
                <Field orientation="horizontal" sx={styles.field}>
                  <RadioGroupItem value="bank" id="method-bank" />
                  <FieldContent>
                    <FieldTitle>Bank Transfer</FieldTitle>
                    <FieldDescription>SWIFT / IBAN</FieldDescription>
                  </FieldContent>
                </Field>
              </FieldLabel>
              <FieldLabel htmlFor="method-paypal">
                <Field orientation="horizontal" sx={styles.field}>
                  <RadioGroupItem value="paypal" id="method-paypal" />
                  <FieldContent>
                    <FieldTitle>PayPal</FieldTitle>
                    <FieldDescription sx={styles.fieldDescription}>
                      Instant Payout
                    </FieldDescription>
                  </FieldContent>
                </Field>
              </FieldLabel>
            </RadioGroup>
          </FieldSet>
          <Field>
            <FieldLabel htmlFor="iban">IBAN / Account Number</FieldLabel>
            <Input id="iban" placeholder="DE89 3704 0044 ...." />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button sx={styles.button2} disabled>
          Save Payout Settings
        </Button>
      </CardFooter>
    </Card>
  )
}
