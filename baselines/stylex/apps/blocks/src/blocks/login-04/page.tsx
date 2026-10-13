import * as stylex from "@stylexjs/stylex"
import { LoginForm } from "@/blocks/login-04/components/login-form"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  stack: {
    display: "flex",
    minHeight: "100svh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.muted,
    padding: { default: spacing["6"], [breakpoint.md]: spacing["10"] },
  },
  box: {
    width: "100%",
    maxWidth: { default: "24rem", [breakpoint.md]: "56rem" },
  },
})

export default function LoginPage() {
  return (
    <div sx={styles.stack}>
      <div sx={styles.box}>
        <LoginForm />
      </div>
    </div>
  )
}
