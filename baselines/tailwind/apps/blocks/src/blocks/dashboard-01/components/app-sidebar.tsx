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
import { HugeiconsIcon } from "@hugeicons/react"
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
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={DashboardSquare01Icon}
        />
      ),
    },
    {
      title: "Lifecycle",
      url: "#",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={Menu01Icon}
        />
      ),
    },
    {
      title: "Analytics",
      url: "#",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={ChartHistogramIcon}
        />
      ),
    },
    {
      title: "Projects",
      url: "#",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={Folder01Icon}
        />
      ),
    },
    {
      title: "Team",
      url: "#",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={UserGroupIcon}
        />
      ),
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={Camera01Icon}
        />
      ),
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
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={File01Icon}
        />
      ),
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
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={File01Icon}
        />
      ),
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
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={Settings05Icon}
        />
      ),
    },
    {
      title: "Get Help",
      url: "#",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={HelpCircleIcon}
        />
      ),
    },
    {
      title: "Search",
      url: "#",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={SearchIcon}
        />
      ),
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={Database01Icon}
        />
      ),
    },
    {
      name: "Reports",
      url: "#",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={Analytics01Icon}
        />
      ),
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={File01Icon}
        />
      ),
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
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="#" />}
            >
              <HugeiconsIcon
                strokeWidth={2}

                icon={CommandIcon}

                className="size-5!"
              />
              <span className="text-base font-semibold">Acme Inc.</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
