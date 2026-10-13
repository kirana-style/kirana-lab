import * as stylex from "@stylexjs/stylex"
import { SidebarLeft } from "@/blocks/sidebar-15/components/sidebar-left"
import { SidebarRight } from "@/blocks/sidebar-15/components/sidebar-right"
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
import { alpha, radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  header: {
    position: "sticky",
    top: "0px",
    display: "flex",
    height: spacing["14"],
    flexShrink: 0,
    alignItems: "center",
    gap: spacing["2"],
    backgroundColor: theme.background,
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
  },
  breadcrumbPage: {
    overflowX: "hidden",
    overflowY: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
  },
  stack: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacing["4"],
    padding: spacing["4"],
  },
  box: {
    marginInline: "auto",
    height: spacing["24"],
    width: "100%",
    maxWidth: "48rem",
    borderRadius: radius.xl,
    backgroundColor: alpha.muted50,
  },
  box2: {
    marginInline: "auto",
    height: "100vh",
    width: "100%",
    maxWidth: "48rem",
    borderRadius: radius.xl,
    backgroundColor: alpha.muted50,
  },
})

export default function Page() {
  return (
    <SidebarProvider>
      <SidebarLeft />
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
        </header>
        <div sx={styles.stack}>
          <div sx={styles.box} />
          <div sx={styles.box2} />
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  )
}
