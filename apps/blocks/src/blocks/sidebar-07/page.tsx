import { css } from "@kirana-style/core"
import { AppSidebar } from "@/blocks/sidebar-07/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"
import { Separator } from "@workspace/ui/components/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"
import { alpha, radius } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { duration } from "@workspace/ui/tokens/motion"
import { spacing } from "@workspace/ui/tokens/spacing"
import { peer } from "@workspace/ui/theme/markers"

const styles = {
  header: css({
    display: "flex",
    // The SidebarProvider carries the default marker.
    height: {
      base: spacing["16"],
      [peer.within(':has([data-collapsible="icon"])')]: spacing["12"],
    },
    flexShrink: 0,
    alignItems: "center",
    gap: spacing["2"],
    transitionProperty: "width,height",
    transitionTimingFunction: "linear",
    transitionDuration: duration["150"],
  }),
  row: css({
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
    paddingInline: spacing["4"],
  }),
  sidebarTrigger: css({
    marginLeft: `calc(${spacing["1"]} * -1)`,
  }),
  separator: css({
    marginRight: spacing["2"],
    // `data-vertical:h-4 data-vertical:self-auto`: the Separator's own
    // condition, so these replace its entries rather than sit beside them.
    height: { '[data-orientation="vertical"]': spacing["4"] },
    alignSelf: { '[data-orientation="vertical"]': "auto" },
  }),
  breadcrumbItem: css({
    display: { base: "none", [breakpoint.md]: "block" },
  }),
  stack: css({
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacing["4"],
    paddingTop: "0px",
    paddingBottom: spacing["4"],
    paddingInlineStart: spacing["4"],
    paddingInlineEnd: spacing["4"],
  }),
  grid: css({
    display: "grid",
    gridAutoRows: "min-content",
    gap: spacing["4"],
    gridTemplateColumns: {
      [breakpoint.md]: "repeat(3, minmax(0, 1fr))",
    },
  }),
  box: css({
    aspectRatio: "16 / 9",
    borderRadius: radius.xl,
    backgroundColor: alpha.muted50,
  }),
  box2: css({
    minHeight: { base: "100vh", [breakpoint.md]: "min-content" },
    flex: 1,
    borderRadius: radius.xl,
    backgroundColor: alpha.muted50,
  }),
}

export default function Page() {
  return (
    <SidebarProvider sx={peer.anchor}>
      <AppSidebar />
      <SidebarInset>
        <header sx={styles.header}>
          <div sx={styles.row}>
            <SidebarTrigger sx={styles.sidebarTrigger} />
            <Separator orientation="vertical" sx={styles.separator} />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem sx={styles.breadcrumbItem}>
                  <BreadcrumbLink href="#">
                    Build Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator sx={styles.breadcrumbItem} />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div sx={styles.stack}>
          <div sx={styles.grid}>
            <div sx={styles.box} />
            <div sx={styles.box} />
            <div sx={styles.box} />
          </div>
          <div sx={styles.box2} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
