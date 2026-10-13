import * as stylex from "@stylexjs/stylex"
import { SignupForm } from "@/blocks/signup-04/components/signup-form"
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

export default function SignupPage() {
  return (
    <div sx={styles.stack}>
      <div sx={styles.box}>
        <SignupForm />
      </div>
    </div>
  )
}
