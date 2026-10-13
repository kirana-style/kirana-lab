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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Textarea } from "@workspace/ui/components/textarea"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  grid: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: spacing["3"],
  }),
  selectTrigger: css({
    width: "100%",
  }),
  textarea: css({
    minHeight: spacing["24"],
    resize: "none",
  }),
  field: css({
    justifyContent: "flex-end",
  }),
}

export function ReportBug() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Report Bug</CardTitle>
        <CardDescription>Help us fix issues faster.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="bug-title">Title</FieldLabel>
            <Input
              id="bug-title"
              placeholder="Brief description of the issue"
            />
          </Field>
          <div sx={styles.grid}>
            <Field>
              <FieldLabel htmlFor="bug-severity">Severity</FieldLabel>
              <Select
                items={[
                  { label: "Critical", value: "critical" },
                  { label: "High", value: "high" },
                  { label: "Medium", value: "medium" },
                  { label: "Low", value: "low" },
                ]}
                defaultValue="medium"
              >
                <SelectTrigger id="bug-severity" sx={styles.selectTrigger}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor="bug-component">Component</FieldLabel>
              <Select
                items={[
                  { label: "Dashboard", value: "dashboard" },
                  { label: "Auth", value: "auth" },
                  { label: "API", value: "api" },
                  { label: "Billing", value: "billing" },
                ]}
                defaultValue="dashboard"
              >
                <SelectTrigger id="bug-component" sx={styles.selectTrigger}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="dashboard">Dashboard</SelectItem>
                    <SelectItem value="auth">Auth</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="bug-steps">Steps to reproduce</FieldLabel>
            <Textarea
              id="bug-steps"
              placeholder="1. Go to&#10;2. Click on&#10;3. Observe..."
              sx={styles.textarea}
            />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" sx={styles.field}>
          <Button variant="outline">Attach File</Button>
          <Button>Submit Bug</Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
