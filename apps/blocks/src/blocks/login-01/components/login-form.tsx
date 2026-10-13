import { css } from "@kirana-style/core"
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
import { spacing } from "@workspace/ui/tokens/spacing"
import { fontSize, lineHeight } from "@workspace/ui/tokens/typography"

const styles = {
  stack: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing["6"],
  }),
  row: css({
    display: "flex",
    alignItems: "center",
  }),
  link: css({
    marginLeft: "auto",
    display: "inline-block",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    textUnderlineOffset: "4px",
    textDecorationLine: { ":hover": "underline" },
  }),
  fieldDescription: css({
    textAlign: "center",
  }),
}

export function LoginForm({
  sx,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  return (
    <div sx={[styles.stack, sx]} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
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
                <div sx={styles.row}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a href="#" sx={styles.link}>
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription sx={styles.fieldDescription}>
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
