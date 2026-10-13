import * as React from "react"

import { NavMain } from "@/blocks/sidebar-07/components/nav-main"
import { NavProjects } from "@/blocks/sidebar-07/components/nav-projects"
import { NavUser } from "@/blocks/sidebar-07/components/nav-user"
import { TeamSwitcher } from "@/blocks/sidebar-07/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@workspace/ui/components/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AudioWave01Icon,
  BookOpen02Icon,
  CommandIcon,
  ComputerTerminalIcon,
  CropIcon,
  LayoutBottomIcon,
  MapsIcon,
  PieChartIcon,
  RoboticIcon,
  Settings05Icon,
} from "@hugeicons/core-free-icons"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={LayoutBottomIcon}
        />
      ),
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={AudioWave01Icon}
        />
      ),
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={CommandIcon}
        />
      ),
      plan: "Free",
    },
  ],
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
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
