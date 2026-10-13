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
import { HugeiconsIcon } from "@hugeicons/react"
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

export function SidebarNav() {
  return (
    <div className="grid grid-cols-2 items-start gap-6">
      <Card className="overflow-hidden py-0">
        <SidebarProvider className="min-h-0">
          <Sidebar collapsible="none" className="w-full bg-transparent">
            <SidebarContent className="gap-0">
              <SidebarGroup className="pb-1">
                <SidebarGroupLabel>Overview</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={DashboardSquare01Icon}
                        />
                        Dashboard
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={ArrowDataTransferHorizontalIcon}
                        />
                        Transactions
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={AnalyticsUpIcon}
                        />
                        Investments
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={BankIcon}
                        />
                        Accounts
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={PieChartIcon}
                        />
                        Spending
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator className="w-auto!" />
              <SidebarGroup className="pt-1">
                <SidebarGroupLabel>Planning</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={Target02Icon}
                        />
                        Goals
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={Wallet01Icon}
                        />
                        Budget
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={ChartBarLineIcon}
                        />
                        Reports
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={File02Icon}
                        />
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
      <Card className="overflow-hidden py-0">
        <SidebarProvider className="min-h-0">
          <Sidebar collapsible="none" className="w-full bg-transparent">
            <SidebarContent className="gap-0">
              <SidebarGroup className="pb-1">
                <SidebarGroupLabel>Account</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={UserIcon}
                        />
                        Profile
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton isActive>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={CreditCardIcon}
                        />
                        Billing
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={Notification03Icon}
                        />
                        Notifications
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={ShieldIcon}
                        />
                        Security
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={PaintBoardIcon}
                        />
                        Appearance
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarSeparator className="w-auto!" />
              <SidebarGroup className="pt-1">
                <SidebarGroupLabel>Support</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={HelpCircleIcon}
                        />
                        Help Center
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={Message01Icon}
                        />
                        Contact Us
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={BookOpen02Icon}
                        />
                        Documentation
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <HugeiconsIcon
                          strokeWidth={2}

                          icon={ActivityIcon}
                        />
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
