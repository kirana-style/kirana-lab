import * as stylex from "@stylexjs/stylex"
import type { Sx } from "@workspace/ui/lib/sx"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { fontSize, lineHeight } from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["6"],
  },
  cardHeader: {
    textAlign: "center",
  },
  cardTitle: {
    fontSize: fontSize.xl,
    lineHeight: lineHeight.xl,
  },
  field: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  },
  fieldDescription: {
    paddingInlineStart: spacing["6"],
    paddingInlineEnd: spacing["6"],
    textAlign: "center",
  },
})

export function SignupForm({
  sx,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  return (
    <div sx={[styles.stack, sx]} {...props}>
      <Card>
        <CardHeader sx={styles.cardHeader}>
          <CardTitle sx={styles.cardTitle}>Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input id="name" type="text" placeholder="John Doe" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <Field sx={styles.field}>
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" required />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription sx={styles.cardHeader}>
                  Already have an account? <a href="#">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription sx={styles.fieldDescription}>
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
