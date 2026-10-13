import { css } from "@kirana-style/core"
import { AppSidebar } from "@/blocks/sidebar-10/components/app-sidebar"
import { NavActions } from "@/blocks/sidebar-10/components/nav-actions"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@workspace/ui/components/breadcrumb"
import { Separator } from "@workspace/ui/components/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"
import { alpha, radius } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  header: css({
    display: "flex",
    height: spacing["14"],
    flexShrink: 0,
    alignItems: "center",
    gap: spacing["2"],
  }),
  row: css({
    display: "flex",
    flex: 1,
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
  breadcrumbPage: css({
    overflowX: "hidden",
    overflowY: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
  }),
  box: css({
    marginLeft: "auto",
    paddingInline: spacing["3"],
  }),
  stack: css({
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacing["4"],
    paddingInline: spacing["4"],
    paddingBlock: spacing["10"],
  }),
  box2: css({
    marginInline: "auto",
    height: spacing["24"],
    width: "100%",
    maxWidth: "48rem",
    borderRadius: radius.xl,
    backgroundColor: alpha.muted50,
  }),
  box3: css({
    marginInline: "auto",
    height: "100%",
    width: "100%",
    maxWidth: "48rem",
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
                <BreadcrumbItem>
                  <BreadcrumbPage sx={styles.breadcrumbPage}>
                    Project Management & Task Tracking
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div sx={styles.box}>
            <NavActions />
          </div>
        </header>
        <div sx={styles.stack}>
          <div sx={styles.box2} />
          <div sx={styles.box3} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
