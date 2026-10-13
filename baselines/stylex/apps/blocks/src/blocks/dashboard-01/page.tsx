import * as stylex from "@stylexjs/stylex"
import { AppSidebar } from "@/blocks/dashboard-01/components/app-sidebar"
import { ChartAreaInteractive } from "@/blocks/dashboard-01/components/chart-area-interactive"
import { DataTable } from "@/blocks/dashboard-01/components/data-table/data-table"
import { SectionCards } from "@/blocks/dashboard-01/components/section-cards"
import { SiteHeader } from "@/blocks/dashboard-01/components/site-header"
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/sidebar"

import data from "./data.json"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { sidebarCtx } from "@workspace/ui/theme/context.stylex"

const styles = stylex.create({
  // Was an inline `--sidebar-width` / `--header-height` style; the width is a typed variable here.
  sidebarProvider: {
    [sidebarCtx.width]: "18rem",
    "--header-height": "3rem",
  },
  stack: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  stack2: {
    containerType: "inline-size",
    containerName: "main",
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacing["2"],
  },
  stack3: {
    display: "flex",
    flexDirection: "column",
    gap: { default: spacing["4"], [breakpoint.md]: spacing["6"] },
    paddingBlock: { default: spacing["4"], [breakpoint.md]: spacing["6"] },
  },
  box: {
    paddingInline: { default: spacing["4"], [breakpoint.lg]: spacing["6"] },
  },
})

export default function Page() {
  return (
    <SidebarProvider sx={styles.sidebarProvider}>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div sx={styles.stack}>
          <div sx={styles.stack2}>
            <div sx={styles.stack3}>
              <SectionCards />
              <div sx={styles.box}>
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
