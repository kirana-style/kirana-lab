import * as stylex from "@stylexjs/stylex"
import { Card } from "@workspace/ui/components/card"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@workspace/ui/components/sidebar"
import {
  ActivityIcon,
  AnalyticsUpIcon,
  ArrowDataTransferHorizontalIcon,
  BankIcon,
  BookOpen02Icon,
  ChartBarLineIcon,
  CreditCardIcon,
  DashboardSquare01Icon,
  File02Icon,
  HelpCircleIcon,
  Message01Icon,
  Notification03Icon,
  PaintBoardIcon,
  PieChartIcon,
  ShieldIcon,
  Target02Icon,
  UserIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    alignItems: "flex-start",
    gap: spacing["6"],
  },
  card: {
    overflowX: "hidden",
    overflowY: "hidden",
    paddingTop: "0px",
    paddingBottom: "0px",
  },
  sidebarProvider: {
    minHeight: "0px",
  },
  sidebar: {
    width: "100%",
    backgroundColor: "transparent",
  },
  sidebarContent: {
    rowGap: "0px",
    columnGap: "0px",
  },
  sidebarGroup: {
    paddingBottom: spacing["1"],
  },
  sidebarSeparator: {
    width: "auto",
  },
  sidebarGroup2: {
    paddingTop: spacing["1"],
  },
})

export function SidebarNav() {
  return (
    <div sx={styles.grid}>
      <Card sx={styles.card}>
        <SidebarProvider sx={styles.sidebarProvider}>
          <Sidebar collapsible="none" sx={styles.sidebar}>
            <SidebarContent sx={styles.sidebarContent}>
              <SidebarGroup sx={styles.sidebarGroup}>
                <SidebarGroupLabel>Overview</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>
                        <Icon icon={DashboardSquare01Icon} />
                        Dashboard
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Icon icon={ArrowDataTransferHorizontalIcon} />
                        Transactions
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Icon icon={AnalyticsUpIcon} />
                        Investments
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Icon icon={BankIcon} />
                        Accounts
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Icon icon={PieChartIcon} />
                        Spending
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator sx={styles.sidebarSeparator} />
              <SidebarGroup sx={styles.sidebarGroup2}>
                <SidebarGroupLabel>Planning</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Icon icon={Target02Icon} />
                        Goals
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Icon icon={Wallet01Icon} />
                        Budget
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Icon icon={ChartBarLineIcon} />
                        Reports
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Icon icon={File02Icon} />
                        Documents
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      </Card>
      <Card sx={styles.card}>
        <SidebarProvider sx={styles.sidebarProvider}>
          <Sidebar collapsible="none" sx={styles.sidebar}>
            <SidebarContent sx={styles.sidebarContent}>
              <SidebarGroup sx={styles.sidebarGroup}>
                <SidebarGroupLabel>Account</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Icon icon={UserIcon} />
                        Profile
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>
                        <Icon icon={CreditCardIcon} />
                        Billing
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Icon icon={Notification03Icon} />
                        Notifications
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Icon icon={ShieldIcon} />
                        Security
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Icon icon={PaintBoardIcon} />
                        Appearance
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator sx={styles.sidebarSeparator} />
              <SidebarGroup sx={styles.sidebarGroup2}>
                <SidebarGroupLabel>Support</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Icon icon={HelpCircleIcon} />
                        Help Center
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Icon icon={Message01Icon} />
                        Contact Us
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Icon icon={BookOpen02Icon} />
                        Documentation
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <Icon icon={ActivityIcon} />
                        Status
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      </Card>
    </div>
  )
}
