import * as stylex from "@stylexjs/stylex"
import { Separator } from "@workspace/ui/components/separator"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { duration } from "@workspace/ui/tokens/motion.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  header: {
    display: "flex",
    height: "var(--header-height)",
    flexShrink: 0,
    alignItems: "center",
    gap: spacing["2"],
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    transitionProperty: "width,height",
    transitionTimingFunction: "linear",
    transitionDuration: duration["150"],
    borderBottomColor: theme.border,
  },
  row: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: { default: spacing["1"], [breakpoint.lg]: spacing["2"] },
    paddingInline: { default: spacing["4"], [breakpoint.lg]: spacing["6"] },
  },
  sidebarTrigger: {
    marginLeft: `calc(${spacing["1"]} * -1)`,
  },
  separator: {
    // Always a vertical rule, so the size needs no orientation condition.
    marginInlineStart: spacing["2"],
    marginInlineEnd: spacing["2"],
    height: spacing["4"],
    alignSelf: "auto",
  },
  heading: {
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.medium,
  },
})

export function SiteHeader() {
  return (
    <header sx={styles.header}>
      <div sx={styles.row}>
        <SidebarTrigger sx={styles.sidebarTrigger} />
        <Separator orientation="vertical" sx={styles.separator} />
        <h1 sx={styles.heading}>Documents</h1>
      </div>
    </header>
  )
}
