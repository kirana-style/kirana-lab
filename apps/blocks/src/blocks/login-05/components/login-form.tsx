import { css } from "@kirana-style/core"
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
import { LayoutBottomIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography"
import { ctx } from "@workspace/ui/theme/context"

const styles = {
  // An inline brand logo cannot read the button's icon size by itself.
  brandIcon: css({
    width: ctx.iconSize,
    height: ctx.iconSize,
    flexShrink: 0,
    pointerEvents: "none",
  }),
  stack: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing["6"],
  }),
  stack2: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: spacing["2"],
    textAlign: "center",
  }),
  link: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: spacing["2"],
    fontWeight: fontWeight.medium,
  }),
  row: css({
    display: "flex",
    width: spacing["8"],
    height: spacing["8"],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
  }),
  icon: css({
    width: spacing["6"],
    height: spacing["6"],
  }),
  text: css({
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
    borderColor: theme.border,
  }),
  heading: css({
    fontSize: fontSize.xl,
    lineHeight: lineHeight.xl,
    fontWeight: fontWeight.bold,
  }),
  field: css({
    display: "grid",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
    gridTemplateColumns: {
      [breakpoint.sm]: "repeat(2, minmax(0, 1fr))",
    },
  }),
  fieldDescription: css({
    paddingInlineStart: spacing["6"],
    paddingInlineEnd: spacing["6"],
    textAlign: "center",
  }),
}

export function LoginForm({
  sx,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  return (
    <div sx={[styles.stack, sx]} {...props}>
      <form>
        <FieldGroup>
          <div sx={styles.stack2}>
            <a href="#" sx={styles.link}>
              <div sx={styles.row}>
                <Icon
                  icon={LayoutBottomIcon}

                  sx={styles.icon}
                />
              </div>
              <span sx={styles.text}>Acme Inc.</span>
            </a>
            <h1 sx={styles.heading}>Welcome to Acme Inc.</h1>
            <FieldDescription>
              Don&apos;t have an account? <a href="#">Sign up</a>
            </FieldDescription>
          </div>
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
            <Button type="submit">Login</Button>
          </Field>
          <FieldSeparator>Or</FieldSeparator>
          <Field sx={styles.field}>
            <Button variant="outline" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                sx={styles.brandIcon}
              >
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  fill="currentColor"
                />
              </svg>
              Continue with Apple
            </Button>
            <Button variant="outline" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                sx={styles.brandIcon}
              >
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue with Google
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription sx={styles.fieldDescription}>
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
