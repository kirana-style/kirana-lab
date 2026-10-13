import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import { Calendars } from "@/blocks/sidebar-15/components/calendars"
import { DatePicker } from "@/blocks/sidebar-15/components/date-picker"
import { NavUser } from "@/blocks/sidebar-15/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@workspace/ui/components/sidebar"
import { PlusSignIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  sidebar: {
    position: "sticky",
    top: "0px",
    display: { default: "none", [breakpoint.lg]: "flex" },
    height: "100svh",
    borderLeftStyle: "solid",
    borderLeftWidth: "1px",
    borderLeftColor: theme.border,
  },
  sidebarHeader: {
    height: spacing["16"],
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    borderTopColor: theme.sidebarBorder,
    borderBottomColor: theme.sidebarBorder,
    borderInlineStartColor: theme.sidebarBorder,
    borderInlineEndColor: theme.sidebarBorder,
  },
  sidebarSeparator: {
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
  },
})

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  calendars: [
    {
      name: "My Calendars",
      items: ["Personal", "Work", "Family"],
    },
    {
      name: "Favorites",
      items: ["Holidays", "Birthdays"],
    },
    {
      name: "Other",
      items: ["Travel", "Reminders", "Deadlines"],
    },
  ],
}

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="none" sx={styles.sidebar} {...props}>
      <SidebarHeader sx={styles.sidebarHeader}>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator sx={styles.sidebarSeparator} />
        <Calendars calendars={data.calendars} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Icon icon={PlusSignIcon} />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
