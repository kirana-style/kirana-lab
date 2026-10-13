import { css } from "@kirana-style/core"
import { AppSidebar } from "@/blocks/sidebar-03/components/app-sidebar"
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
import { alpha, radius, theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  header: css({
    display: "flex",
    height: spacing["16"],
    flexShrink: 0,
    alignItems: "center",
    gap: spacing["2"],
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    borderBottomColor: theme.border,
  }),
  row: css({
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
    paddingInline: spacing["3"],
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
    padding: spacing["4"],
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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header sx={styles.header}>
          <div sx={styles.row}>
            <SidebarTrigger />
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
