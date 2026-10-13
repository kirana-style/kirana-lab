import { css } from "@kirana-style/core"
import { SignupForm } from "@/blocks/signup-01/components/signup-form"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  row: css({
    display: "flex",
    minHeight: "100svh",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: { base: spacing["6"], [breakpoint.md]: spacing["10"] },
  }),
  box: css({
    width: "100%",
    maxWidth: "24rem",
  }),
}

export default function Page() {
  return (
    <div sx={styles.row}>
      <div sx={styles.box}>
        <SignupForm />
      </div>
    </div>
  )
}
