import * as stylex from "@stylexjs/stylex"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar"
import {
  Delete02Icon,
  FolderIcon,
  MoreHorizontalCircle01Icon,
  Share03Icon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { sidebarMarker } from "@workspace/ui/theme/markers.stylex"

const styles = stylex.create({
  sidebarGroup: {
    // The group's own `flex` is restated: an sx value replaces the property.
    display: {
      default: "flex",
      [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]:
        "none",
    },
  },
  sidebarMenuAction: {
    // The action's hover fill is restated beside the open menu's.
    backgroundColor: {
      default: null,
      ":hover": theme.sidebarAccent,
      '[aria-expanded="true"]': theme.muted,
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
  dropdownMenuContent: {
    width: spacing["48"],
  },
  icon: {
    color: theme.mutedForeground,
  },
})

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: React.ReactNode
  }[]
}) {
  const { isMobile } = useSidebar()
  return (
    <SidebarGroup sx={styles.sidebarGroup}>
      <SidebarGroupLabel>Projects</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton render={<a href={item.url} />}>
              {item.icon}
              <span>{item.name}</span>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuAction
                    showOnHover
                    sx={styles.sidebarMenuAction}
                  />
                }
              >
                <Icon icon={MoreHorizontalCircle01Icon} />
                <span sx={styles.text}>More</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                sx={styles.dropdownMenuContent}
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Icon
                    icon={FolderIcon}

                    sx={styles.icon}
                  />
                  <span>View Project</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon
                    icon={Share03Icon}

                    sx={styles.icon}
                  />
                  <span>Share Project</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Icon
                    icon={Delete02Icon}

                    sx={styles.icon}
                  />
                  <span>Delete Project</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton>
            <Icon icon={MoreHorizontalCircle01Icon} />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
