import { css } from "@kirana-style/core"
import { SignupForm } from "@/blocks/signup-03/components/signup-form"
import { LayoutBottomIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"
import { fontWeight } from "@workspace/ui/tokens/typography"

const styles = {
  stack: css({
    display: "flex",
    minHeight: "100svh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing["6"],
    backgroundColor: theme.muted,
    padding: { base: spacing["6"], [breakpoint.md]: spacing["10"] },
  }),
  stack2: css({
    display: "flex",
    width: "100%",
    maxWidth: "24rem",
    flexDirection: "column",
    gap: spacing["6"],
  }),
  link: css({
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
    alignSelf: "center",
    fontWeight: fontWeight.medium,
  }),
  row: css({
    display: "flex",
    width: spacing["6"],
    height: spacing["6"],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    backgroundColor: theme.primary,
    color: theme.primaryForeground,
  }),
  icon: css({
    width: spacing["4"],
    height: spacing["4"],
  }),
}

export default function SignupPage() {
  return (
    <div sx={styles.stack}>
      <div sx={styles.stack2}>
        <a href="#" sx={styles.link}>
          <div sx={styles.row}>
            <Icon
              icon={LayoutBottomIcon}

              sx={styles.icon}
            />
          </div>
          Acme Inc.
        </a>
        <SignupForm />
      </div>
    </div>
  )
}
