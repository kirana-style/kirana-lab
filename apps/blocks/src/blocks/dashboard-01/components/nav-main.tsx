import { css } from "@kirana-style/core"
import { Button } from "@workspace/ui/components/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import { Mail01Icon, PlusSignCircleIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"
import { sidebarMarker } from "@workspace/ui/theme/markers"

const styles = {
  sidebarGroupContent: css({
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  }),
  sidebarMenuItem: css({
    display: "flex",
    alignItems: "center",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  }),
  sidebarMenuButton: css({
    minWidth: spacing["8"],
    backgroundColor: {
      base: theme.primary,
      ":hover": theme.primary,
      ":active": `color-mix(in oklab, ${theme.primary} 90%, transparent)`,
      "@supports (color: color-mix(in lab, red, red))": {
        base: theme.primary,
        ":hover": `color-mix(in oklab, ${theme.primary} 90%, transparent)`,
        ":active": `color-mix(in oklab, ${theme.primary} 90%, transparent)`,
      },
    },
    color: {
      base: theme.primaryForeground,
      ":hover": theme.primaryForeground,
      ":active": theme.primaryForeground,
    },
    transitionDuration: "200ms",
    transitionTimingFunction: "linear",
  }),
  button: css({
    width: spacing["8"],
    height: spacing["8"],
    // Fades out when the sidebar collapses to icons; the button's own disabled
    // opacity is restated.
    opacity: {
      ":disabled": 0.5,
      [sidebarMarker.within('[data-collapsible="icon"]')]: 0,
    },
  }),
  text: css({
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
    borderColor: theme.border,
  }),
}

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent sx={styles.sidebarGroupContent}>
        <SidebarMenu>
          <SidebarMenuItem sx={styles.sidebarMenuItem}>
            <SidebarMenuButton
              tooltip="Quick Create"
              sx={styles.sidebarMenuButton}
            >
              <Icon icon={PlusSignCircleIcon} />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <Button size="icon" sx={styles.button} variant="outline">
              <Icon icon={Mail01Icon} />
              <span sx={styles.text}>Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
