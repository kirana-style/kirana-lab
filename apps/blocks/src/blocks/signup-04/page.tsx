import { css } from "@kirana-style/core"
import { SignupForm } from "@/blocks/signup-04/components/signup-form"
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

export default function SignupPage() {
  return (
    <div sx={styles.stack}>
      <div sx={styles.box}>
        <SignupForm />
      </div>
    </div>
  )
}
