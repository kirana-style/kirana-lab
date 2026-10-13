import * as React from "react"

import { NavMain } from "@/blocks/sidebar-16/components/nav-main"
import { NavProjects } from "@/blocks/sidebar-16/components/nav-projects"
import { NavSecondary } from "@/blocks/sidebar-16/components/nav-secondary"
import { NavUser } from "@/blocks/sidebar-16/components/nav-user"
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
  BookOpen02Icon,
  ChartRingIcon,
  CommandIcon,
  ComputerTerminalIcon,
  CropIcon,
  MapsIcon,
  PieChartIcon,
  RoboticIcon,
  SentIcon,
  Settings05Icon,
} from "@hugeicons/core-free-icons"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={ComputerTerminalIcon}
        />
      ),
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={RoboticIcon}
        />
      ),
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={BookOpen02Icon}
        />
      ),
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={Settings05Icon}
        />
      ),
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={ChartRingIcon}
        />
      ),
    },
    {
      title: "Feedback",
      url: "#",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={SentIcon}
        />
      ),
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={CropIcon}
        />
      ),
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={PieChartIcon}
        />
      ),
    },
    {
      name: "Travel",
      url: "#",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={MapsIcon}
        />
      ),
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <HugeiconsIcon
                  strokeWidth={2}

                  icon={CommandIcon}

                  className="size-4"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Acme Inc</span>
                <span className="truncate text-xs">Enterprise</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
