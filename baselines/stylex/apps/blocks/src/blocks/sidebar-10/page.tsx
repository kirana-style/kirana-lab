import * as stylex from "@stylexjs/stylex"
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
import { alpha, radius } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  header: {
    display: "flex",
    height: spacing["14"],
    flexShrink: 0,
    alignItems: "center",
    gap: spacing["2"],
  },
  row: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    gap: spacing["2"],
    paddingInline: spacing["3"],
  },
  separator: {
    // Always a vertical rule, so the size needs no orientation condition.
    marginRight: spacing["2"],
    height: spacing["4"],
    alignSelf: "auto",
  },
  breadcrumbPage: {
    overflowX: "hidden",
    overflowY: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
  },
  box: {
    marginLeft: "auto",
    paddingInline: spacing["3"],
  },
  stack: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacing["4"],
    paddingInline: spacing["4"],
    paddingBlock: spacing["10"],
  },
  box2: {
    marginInline: "auto",
    height: spacing["24"],
    width: "100%",
    maxWidth: "48rem",
    borderRadius: radius.xl,
    backgroundColor: alpha.muted50,
  },
  box3: {
    marginInline: "auto",
    height: "100%",
    width: "100%",
    maxWidth: "48rem",
    borderRadius: radius.xl,
    backgroundColor: alpha.muted50,
  },
})

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
