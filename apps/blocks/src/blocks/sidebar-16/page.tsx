import { css } from "@kirana-style/core"
import { AppSidebar } from "@/blocks/sidebar-16/components/app-sidebar"
import { SiteHeader } from "@/blocks/sidebar-16/components/site-header"
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar"
import { alpha, radius } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  box: css({
    "--header-height": `calc(${spacing["14"]})`,
  }),
  sidebarProvider: css({
    display: "flex",
    flexDirection: "column",
  }),
  row: css({
    display: "flex",
    flex: 1,
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
  box2: css({
    aspectRatio: "16 / 9",
    borderRadius: radius.xl,
    backgroundColor: alpha.muted50,
  }),
  box3: css({
    minHeight: { base: "100vh", [breakpoint.md]: "min-content" },
    flex: 1,
    borderRadius: radius.xl,
    backgroundColor: alpha.muted50,
  }),
}

export const iframeHeight = "800px"

export const description = "A sidebar with a header and a search form."

export default function Page() {
  return (
    <div sx={styles.box}>
      <SidebarProvider sx={styles.sidebarProvider}>
        <SiteHeader />
        <div sx={styles.row}>
          <AppSidebar />
          <SidebarInset>
            <div sx={styles.stack}>
              <div sx={styles.grid}>
                <div sx={styles.box2} />
                <div sx={styles.box2} />
                <div sx={styles.box2} />
              </div>
              <div sx={styles.box3} />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
