import { css } from "@kirana-style/core"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  grid: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: spacing["3"],
  }),
  cardFooter: css({
    flexDirection: "column",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  }),
  button: css({
    width: "100%",
  }),
}

export function NewMilestone() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Set a new milestone</CardTitle>
        <CardDescription>
          Define your financial target and we&apos;ll help you pace your
          savings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="goal-name">Goal Name</FieldLabel>
            <Input
              id="goal-name"
              placeholder="e.g. New Car, Home Downpayment"
            />
          </Field>
          <div sx={styles.grid}>
            <Field>
              <FieldLabel htmlFor="target-amount">Target Amount</FieldLabel>
              <Input id="target-amount" defaultValue="$15,000" />
            </Field>
            <Field>
              <FieldLabel htmlFor="target-date">Target Date</FieldLabel>
              <Input id="target-date" defaultValue="Dec 2025" />
            </Field>
          </div>
        </FieldGroup>
      </CardContent>
      <CardFooter sx={styles.cardFooter}>
        <Button sx={styles.button}>Create Goal</Button>
        <Button variant="outline" sx={styles.button}>
          Cancel
        </Button>
      </CardFooter>
    </Card>
  )
}
