import { css } from "@kirana-style/core"
import * as React from "react"

import { NavDocuments } from "@/blocks/dashboard-01/components/nav-documents"
import { NavMain } from "@/blocks/dashboard-01/components/nav-main"
import { NavSecondary } from "@/blocks/dashboard-01/components/nav-secondary"
import { NavUser } from "@/blocks/dashboard-01/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import {
  Analytics01Icon,
  Camera01Icon,
  ChartHistogramIcon,
  CommandIcon,
  DashboardSquare01Icon,
  Database01Icon,
  File01Icon,
  Folder01Icon,
  HelpCircleIcon,
  Menu01Icon,
  SearchIcon,
  Settings05Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography"

const styles = {
  sidebarMenuButton: css({
    // `data-[slot=sidebar-menu-button]:p-1.5!`: always true of this button.
    paddingTop: spacing["1.5"],
    paddingBottom: spacing["1.5"],
    paddingInlineStart: spacing["1.5"],
    paddingInlineEnd: spacing["1.5"],
  }),
  icon: css({
    width: spacing["5"],
    height: spacing["5"],
  }),
  text: css({
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.semibold,
  }),
  navSecondary: css({
    marginTop: "auto",
  }),
}

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: <Icon icon={DashboardSquare01Icon} />,
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: <Icon icon={Menu01Icon} />,
    },
    {
      title: "Analytics",
      url: "#",
      icon: <Icon icon={ChartHistogramIcon} />,
    },
    {
      title: "Projects",
      url: "#",
      icon: <Icon icon={Folder01Icon} />,
    },
    {
      title: "Team",
      url: "#",
      icon: <Icon icon={UserGroupIcon} />,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: <Icon icon={Camera01Icon} />,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: <Icon icon={File01Icon} />,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: <Icon icon={File01Icon} />,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <Icon icon={Settings05Icon} />,
    },
    {
      title: "Get Help",
      url: "#",
      icon: <Icon icon={HelpCircleIcon} />,
    },
    {
      title: "Search",
      url: "#",
      icon: <Icon icon={SearchIcon} />,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: <Icon icon={Database01Icon} />,
    },
    {
      name: "Reports",
      url: "#",
      icon: <Icon icon={Analytics01Icon} />,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: <Icon icon={File01Icon} />,
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              sx={styles.sidebarMenuButton}
              render={<a href="#" />}
            >
              <Icon
                icon={CommandIcon}

                sx={styles.icon}
              />
              <span sx={styles.text}>Acme Inc.</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} sx={styles.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
