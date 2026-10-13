import { css } from "@kirana-style/core"
import { LoginForm } from "@/blocks/login-05/components/login-form"
import { theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  stack: css({
    display: "flex",
    minHeight: "100svh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing["6"],
    backgroundColor: theme.background,
    padding: { base: spacing["6"], [breakpoint.md]: spacing["10"] },
  }),
  box: css({
    width: "100%",
    maxWidth: "24rem",
  }),
}

export default function LoginPage() {
  return (
    <div sx={styles.stack}>
      <div sx={styles.box}>
        <LoginForm />
      </div>
    </div>
  )
}
