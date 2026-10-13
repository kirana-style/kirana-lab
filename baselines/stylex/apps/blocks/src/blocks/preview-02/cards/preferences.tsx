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
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@workspace/ui/components/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Switch } from "@workspace/ui/components/switch"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  button: {
    backgroundColor: theme.muted,
  },
  selectTrigger: {
    width: "100%",
  },
  fieldSeparator: {
    marginTop: `calc(${spacing["4"]} * -1)`,
    marginBottom: `calc(${spacing["4"]} * -1)`,
  },
  button2: {
    marginLeft: "auto",
  },
})

const CURRENCIES = [
  { label: "USD — United States Dollar", value: "usd" },
  { label: "EUR — Euro", value: "eur" },
  { label: "GBP — British Pound", value: "gbp" },
  { label: "JPY — Japanese Yen", value: "jpy" },
]

export function Preferences() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription>
          Manage your account settings and notifications.
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
            <FieldLabel htmlFor="default-currency">Default Currency</FieldLabel>
            <Select items={CURRENCIES} defaultValue="usd">
              <SelectTrigger id="default-currency" sx={styles.selectTrigger}>
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
          <FieldSeparator sx={styles.fieldSeparator} />
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor="public-statistics">
                Public Statistics
              </FieldLabel>
              <FieldDescription>
                Allow others to see your total stream count and listening
                activity
              </FieldDescription>
            </FieldContent>
            <Switch id="public-statistics" defaultChecked />
          </Field>
          <FieldSeparator sx={styles.fieldSeparator} />
          <Field orientation="horizontal">
            <FieldContent>
              <FieldLabel htmlFor="email-notifications">
                Email Notifications
              </FieldLabel>
              <FieldDescription>
                Monthly royalty reports and distribution updates
              </FieldDescription>
            </FieldContent>
            <Switch id="email-notifications" defaultChecked />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Reset</Button>
        <Button sx={styles.button2}>Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}
