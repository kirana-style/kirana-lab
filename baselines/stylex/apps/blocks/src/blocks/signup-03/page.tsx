import * as stylex from "@stylexjs/stylex"
import { SignupForm } from "@/blocks/signup-03/components/signup-form"
import { LayoutBottomIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { fontWeight } from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  stack: {
    display: "flex",
    minHeight: "100svh",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing["6"],
    backgroundColor: theme.muted,
    padding: { default: spacing["6"], [breakpoint.md]: spacing["10"] },
  },
  stack2: {
    display: "flex",
    width: "100%",
    maxWidth: "24rem",
    flexDirection: "column",
    gap: spacing["6"],
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
    alignSelf: "center",
    fontWeight: fontWeight.medium,
  },
  row: {
    display: "flex",
    width: spacing["6"],
    height: spacing["6"],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    backgroundColor: theme.primary,
    color: theme.primaryForeground,
  },
  icon: {
    width: spacing["4"],
    height: spacing["4"],
  },
})

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
