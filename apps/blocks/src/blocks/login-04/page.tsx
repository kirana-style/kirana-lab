import { css } from "@kirana-style/core"
import { LoginForm } from "@/blocks/login-04/components/login-form"
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
    backgroundColor: theme.muted,
    padding: { base: spacing["6"], [breakpoint.md]: spacing["10"] },
  }),
  box: css({
    width: "100%",
    maxWidth: { base: "24rem", [breakpoint.md]: "56rem" },
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
