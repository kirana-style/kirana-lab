import * as stylex from "@stylexjs/stylex"
import { AppSidebar } from "@/blocks/sidebar-14/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"
import { alpha, radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  header: {
    display: "flex",
    height: spacing["16"],
    flexShrink: 0,
    alignItems: "center",
    gap: spacing["2"],
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    paddingInline: spacing["4"],
    borderBottomColor: theme.border,
  },
  breadcrumbItem: {
    display: { default: "none", [breakpoint.md]: "block" },
  },
  sidebarTrigger: {
    marginRight: `calc(${spacing["1"]} * -1)`,
    marginLeft: "auto",
    rotate: "180deg",
  },
  stack: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacing["4"],
    padding: spacing["4"],
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
      <SidebarInset>
        <header sx={styles.header}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem sx={styles.breadcrumbItem}>
                <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator sx={styles.breadcrumbItem} />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <SidebarTrigger sx={styles.sidebarTrigger} />
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
      <AppSidebar side="right" />
    </SidebarProvider>
  )
}
