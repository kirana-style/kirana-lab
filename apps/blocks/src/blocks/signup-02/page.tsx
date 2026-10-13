import { css } from "@kirana-style/core"
import { SignupForm } from "@/blocks/signup-02/components/signup-form"
import { LayoutBottomIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, surface, theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"
import { fontWeight } from "@workspace/ui/tokens/typography"

const styles = {
  grid: css({
    display: "grid",
    minHeight: "100svh",
    gridTemplateColumns: {
      [breakpoint.lg]: "repeat(2, minmax(0, 1fr))",
    },
  }),
  stack: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing["4"],
    padding: { base: spacing["6"], [breakpoint.md]: spacing["10"] },
  }),
  row: css({
    display: "flex",
    justifyContent: { base: "center", [breakpoint.md]: "flex-start" },
    gap: spacing["2"],
  }),
  link: css({
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
    fontWeight: fontWeight.medium,
  }),
  row2: css({
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
  row3: css({
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }),
  box: css({
    width: "100%",
    maxWidth: "20rem",
  }),
  box2: css({
    position: "relative",
    display: { base: "none", [breakpoint.lg]: "block" },
    backgroundColor: theme.muted,
  }),
  image: css({
    position: "absolute",
    inset: "0px",
    height: "100%",
    width: "100%",
    objectFit: "cover",
    // `dark:brightness-[0.2] dark:grayscale`: the cover photo recedes in dark.
    filter: surface.imageDim,
  }),
}

export default function SignupPage() {
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
            <SignupForm />
          </div>
        </div>
      </div>
      <div sx={styles.box2}>
        <img src="/placeholder.svg" alt="Image" sx={styles.image} />
      </div>
    </div>
  )
}
