import * as stylex from "@stylexjs/stylex"
import { LoginForm } from "@/blocks/login-02/components/login-form"
import { LayoutBottomIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, surface, theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { fontWeight } from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  grid: {
    display: "grid",
    minHeight: "100svh",
    gridTemplateColumns: {
      default: null,
      [breakpoint.lg]: "repeat(2, minmax(0, 1fr))",
    },
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["4"],
    padding: { default: spacing["6"], [breakpoint.md]: spacing["10"] },
  },
  row: {
    display: "flex",
    justifyContent: { default: "center", [breakpoint.md]: "flex-start" },
    gap: spacing["2"],
  },
  link: {
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
    fontWeight: fontWeight.medium,
  },
  row2: {
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
  row3: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: "100%",
    maxWidth: "20rem",
  },
  box2: {
    position: "relative",
    display: { default: "none", [breakpoint.lg]: "block" },
    backgroundColor: theme.muted,
  },
  image: {
    position: "absolute",
    inset: "0px",
    height: "100%",
    width: "100%",
    objectFit: "cover",
    // `dark:brightness-[0.2] dark:grayscale`: the cover photo recedes in dark.
    filter: surface.imageDim,
  },
})

export default function LoginPage() {
  return (
    <div sx={styles.grid}>
      <div sx={styles.stack}>
        <div sx={styles.row}>
          <a href="#" sx={styles.link}>
            <div sx={styles.row2}>
              <Icon
                icon={LayoutBottomIcon}

                sx={styles.icon}
              />
            </div>
            Acme Inc.
          </a>
        </div>
        <div sx={styles.row3}>
          <div sx={styles.box}>
            <LoginForm />
          </div>
        </div>
      </div>
      <div sx={styles.box2}>
        <img src="/placeholder.svg" alt="Image" sx={styles.image} />
      </div>
    </div>
  )
}
