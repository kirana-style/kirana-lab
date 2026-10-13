import * as stylex from "@stylexjs/stylex"
import { AppSidebar } from "@/blocks/sidebar-09/components/app-sidebar"
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
import { alpha, radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { sidebarCtx } from "@workspace/ui/theme/context.stylex"

const styles = stylex.create({
  // Was an inline `--sidebar-width` style; the width is a typed variable here.
  sidebarProvider: {
    [sidebarCtx.width]: "350px",
  },
  header: {
    position: "sticky",
    top: "0px",
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    gap: spacing["2"],
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    backgroundColor: theme.background,
    padding: spacing["4"],
    borderBottomColor: theme.border,
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
    padding: spacing["4"],
  },
  box: {
    aspectRatio: "16 / 9",
    height: spacing["12"],
    width: "100%",
    borderRadius: radius.lg,
    backgroundColor: alpha.muted50,
  },
})

export default function Page() {
  return (
    <SidebarProvider sx={styles.sidebarProvider}>
      <AppSidebar />
      <SidebarInset>
        <header sx={styles.header}>
          <SidebarTrigger sx={styles.sidebarTrigger} />
          <Separator orientation="vertical" sx={styles.separator} />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem sx={styles.breadcrumbItem}>
                <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator sx={styles.breadcrumbItem} />
              <BreadcrumbItem>
                <BreadcrumbPage>Inbox</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div sx={styles.stack}>
          {Array.from({ length: 24 }).map((_, index) => (
            <div key={index} sx={styles.box} />
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
