import * as stylex from "@stylexjs/stylex"
import type { Sx } from "@workspace/ui/lib/sx"
import { Button } from "@workspace/ui/components/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { surface, theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"
import { ctx } from "@workspace/ui/theme/context.stylex"

const styles = stylex.create({
  // An inline brand logo cannot read the button's icon size by itself.
  brandIcon: {
    width: ctx.iconSize,
    height: ctx.iconSize,
    flexShrink: 0,
    pointerEvents: "none",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["6"],
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: spacing["1"],
    textAlign: "center",
  },
  heading: {
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.bold,
  },
  paragraph: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    textWrap: "balance",
    color: theme.mutedForeground,
  },
  // `bg-background` over the input's `dark:bg-input/30`, which still won in
  // dark mode; the disabled fill is restated too.
  input: {
    backgroundColor: {
      default: surface.outlineBackground,
      ":disabled": surface.controlDisabled,
    },
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
}: Omit<React.ComponentProps<"form">, "className"> & { sx?: Sx }) {
  return (
    <form sx={[styles.form, sx]} {...props}>
      <FieldGroup>
        <div sx={styles.stack}>
          <h1 sx={styles.heading}>Create your account</h1>
          <p sx={styles.paragraph}>
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            required
            sx={styles.input}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            sx={styles.input}
          />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" type="password" required sx={styles.input} />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            required
            sx={styles.input}
          />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <Button variant="outline" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              sx={styles.brandIcon}
            >
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Sign up with GitHub
          </Button>
          <FieldDescription sx={styles.fieldDescription}>
            Already have an account? <a href="#">Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
