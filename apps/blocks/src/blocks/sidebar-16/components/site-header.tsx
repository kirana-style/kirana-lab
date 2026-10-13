import { css } from "@kirana-style/core"
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
import { theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  header: css({
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
  }),
  row: css({
    display: "flex",
    height: "var(--header-height)",
    width: "100%",
    alignItems: "center",
    gap: spacing["2"],
    paddingInline: spacing["4"],
  }),
  button: css({
    height: spacing["8"],
    width: spacing["8"],
  }),
  separator: css({
    marginRight: spacing["2"],
    // `data-vertical:h-4 data-vertical:self-auto`: the Separator's own
    // condition, so these replace its entries rather than sit beside them.
    height: { '[data-orientation="vertical"]': spacing["4"] },
    alignSelf: { '[data-orientation="vertical"]': "auto" },
  }),
  breadcrumb: css({
    display: { base: "none", [breakpoint.sm]: "block" },
  }),
  searchForm: css({
    width: { base: "100%", [breakpoint.sm]: "auto" },
    marginLeft: { [breakpoint.sm]: "auto" },
  }),
}

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
        <SearchForm sx={[styles.searchForm]} />
      </div>
    </header>
  )
}
