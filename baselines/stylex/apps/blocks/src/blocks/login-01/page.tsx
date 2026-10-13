import * as stylex from "@stylexjs/stylex"
import { LoginForm } from "@/blocks/login-01/components/login-form"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  row: {
    display: "flex",
    minHeight: "100svh",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: { default: spacing["6"], [breakpoint.md]: spacing["10"] },
  },
  box: {
    width: "100%",
    maxWidth: "24rem",
  },
})

export default function Page() {
  return (
    <div sx={styles.row}>
      <div sx={styles.box}>
        <LoginForm />
      </div>
    </div>
  )
}
