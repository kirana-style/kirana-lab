import * as stylex from "@stylexjs/stylex"
import { AppSidebar } from "@/blocks/sidebar-08/components/app-sidebar"
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
import { alpha, radius } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  header: {
    display: "flex",
    height: spacing["16"],
    flexShrink: 0,
    alignItems: "center",
    gap: spacing["2"],
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
    paddingInline: spacing["4"],
  },
  sidebarTrigger: {
    marginLeft: `calc(${spacing["1"]} * -1)`,
  },
  separator: {
    // Always a vertical rule, so the size needs no orientation condition.
    marginRight: spacing["2"],
    height: spacing["4"],
    alignSelf: "auto",
  },
  breadcrumbItem: {
    display: { default: "none", [breakpoint.md]: "block" },
  },
  stack: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacing["4"],
    paddingTop: "0px",
    paddingBottom: spacing["4"],
    paddingInlineStart: spacing["4"],
    paddingInlineEnd: spacing["4"],
  },
  grid: {
    display: "grid",
    gridAutoRows: "min-content",
    gap: spacing["4"],
    gridTemplateColumns: {
      default: null,
      [breakpoint.md]: "repeat(3, minmax(0, 1fr))",
    },
  },
  box: {
    aspectRatio: "16 / 9",
    borderRadius: radius.xl,
    backgroundColor: alpha.muted50,
  },
  box2: {
    minHeight: { default: "100vh", [breakpoint.md]: "min-content" },
    flex: 1,
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
