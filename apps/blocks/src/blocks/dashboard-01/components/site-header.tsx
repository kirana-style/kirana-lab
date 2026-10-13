import { css } from "@kirana-style/core"
import { Separator } from "@workspace/ui/components/separator"
import { SidebarTrigger } from "@workspace/ui/components/sidebar"
import { theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { duration } from "@workspace/ui/tokens/motion"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography"

const styles = {
  header: css({
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
  }),
  row: css({
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: { base: spacing["1"], [breakpoint.lg]: spacing["2"] },
    paddingInline: { base: spacing["4"], [breakpoint.lg]: spacing["6"] },
  }),
  sidebarTrigger: css({
    marginLeft: `calc(${spacing["1"]} * -1)`,
  }),
  separator: css({
    marginInlineStart: spacing["2"],
    marginInlineEnd: spacing["2"],
    // `data-vertical:h-4 data-vertical:self-auto`: the Separator's own
    // condition, so these replace its entries rather than sit beside them.
    height: { '[data-orientation="vertical"]': spacing["4"] },
    alignSelf: { '[data-orientation="vertical"]': "auto" },
  }),
  heading: css({
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.medium,
  }),
}

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
