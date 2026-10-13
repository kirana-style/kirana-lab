import { css } from "@kirana-style/core"
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
import { theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  sidebar: css({
    position: "sticky",
    top: "0px",
    display: { base: "none", [breakpoint.lg]: "flex" },
    height: "100svh",
    borderLeftStyle: "solid",
    borderLeftWidth: "1px",
    borderLeftColor: theme.border,
  }),
  sidebarHeader: css({
    height: spacing["16"],
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    borderTopColor: theme.sidebarBorder,
    borderBottomColor: theme.sidebarBorder,
    borderInlineStartColor: theme.sidebarBorder,
    borderInlineEndColor: theme.sidebarBorder,
  }),
  sidebarSeparator: css({
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
  }),
}

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
