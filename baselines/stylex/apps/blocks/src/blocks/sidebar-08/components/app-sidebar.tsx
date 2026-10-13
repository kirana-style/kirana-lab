import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import { NavMain } from "@/blocks/sidebar-08/components/nav-main"
import { NavProjects } from "@/blocks/sidebar-08/components/nav-projects"
import { NavSecondary } from "@/blocks/sidebar-08/components/nav-secondary"
import { NavUser } from "@/blocks/sidebar-08/components/nav-user"
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
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  row: {
    display: "flex",
    aspectRatio: "1 / 1",
    width: spacing["8"],
    height: spacing["8"],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    backgroundColor: theme.sidebarPrimary,
    color: theme.sidebarPrimaryForeground,
  },
  icon: {
    width: spacing["4"],
    height: spacing["4"],
  },
  grid: {
    display: "grid",
    flex: 1,
    textAlign: "left",
    fontSize: fontSize.sm,
    lineHeight: leading.tight,
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
  },
  text2: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  },
  navSecondary: {
    marginTop: "auto",
  },
})

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
      icon: <Icon icon={ComputerTerminalIcon} />,
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
      icon: <Icon icon={RoboticIcon} />,
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
      icon: <Icon icon={BookOpen02Icon} />,
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
      icon: <Icon icon={Settings05Icon} />,
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
      icon: <Icon icon={ChartRingIcon} />,
    },
    {
      title: "Feedback",
      url: "#",
      icon: <Icon icon={SentIcon} />,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: <Icon icon={CropIcon} />,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: <Icon icon={PieChartIcon} />,
    },
    {
      name: "Travel",
      url: "#",
      icon: <Icon icon={MapsIcon} />,
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#" />}>
              <div sx={styles.row}>
                <Icon
                  icon={CommandIcon}

                  sx={styles.icon}
                />
              </div>
              <div sx={styles.grid}>
                <span sx={styles.text}>Acme Inc</span>
                <span sx={styles.text2}>Enterprise</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} sx={styles.navSecondary} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
