import * as stylex from "@stylexjs/stylex"
import { SearchForm } from "@/blocks/sidebar-16/components/search-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"
import { Button } from "@workspace/ui/components/button"
import { Separator } from "@workspace/ui/components/separator"
import { useSidebar } from "@workspace/ui/components/sidebar"
import { SidebarLeftIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  header: {
    position: "sticky",
    top: "0px",
    zIndex: 50,
    display: "flex",
    width: "100%",
    alignItems: "center",
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    backgroundColor: theme.background,
    borderBottomColor: theme.border,
  },
  row: {
    display: "flex",
    height: "var(--header-height)",
    width: "100%",
    alignItems: "center",
    gap: spacing["2"],
    paddingInline: spacing["4"],
  },
  button: {
    height: spacing["8"],
    width: spacing["8"],
  },
  separator: {
    // Always a vertical rule, so the size needs no orientation condition.
    marginRight: spacing["2"],
    height: spacing["4"],
    alignSelf: "auto",
  },
  breadcrumb: {
    display: { default: "none", [breakpoint.sm]: "block" },
  },
  searchForm: {
    width: { default: "100%", [breakpoint.sm]: "auto" },
    marginLeft: { default: null, [breakpoint.sm]: "auto" },
  },
})

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header sx={styles.header}>
      <div sx={styles.row}>
        <Button
          sx={styles.button}
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <Icon icon={SidebarLeftIcon} />
        </Button>
        <Separator orientation="vertical" sx={styles.separator} />
        <Breadcrumb sx={styles.breadcrumb}>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Data Fetching</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <SearchForm {...stylex.props(styles.searchForm)} />
      </div>
    </header>
  )
}
