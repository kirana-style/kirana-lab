import * as stylex from "@stylexjs/stylex"
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
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { sidebarMarker } from "@workspace/ui/theme/markers.stylex"

const styles = stylex.create({
  sidebarGroupContent: {
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  },
  sidebarMenuItem: {
    display: "flex",
    alignItems: "center",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  },
  sidebarMenuButton: {
    minWidth: spacing["8"],
    backgroundColor: {
      default: theme.primary,
      ":hover": theme.primary,
      ":active": `color-mix(in oklab, ${theme.primary} 90%, transparent)`,
      "@supports (color: color-mix(in lab, red, red))": {
        default: theme.primary,
        ":hover": `color-mix(in oklab, ${theme.primary} 90%, transparent)`,
        ":active": `color-mix(in oklab, ${theme.primary} 90%, transparent)`,
      },
    },
    color: {
      default: theme.primaryForeground,
      ":hover": theme.primaryForeground,
      ":active": theme.primaryForeground,
    },
    transitionDuration: "200ms",
    transitionTimingFunction: "linear",
  },
  button: {
    width: spacing["8"],
    height: spacing["8"],
    // Fades out when the sidebar collapses to icons; the button's own disabled
    // opacity is restated.
    opacity: {
      default: null,
      ":disabled": 0.5,
      [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]: 0,
    },
  },
  text: {
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
  },
})

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
