import * as stylex from "@stylexjs/stylex"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
  ArrowUpRightIcon,
  Delete02Icon,
  LinkIcon,
  MoreHorizontalCircle01Icon,
  StarOffIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { alpha, radius, theme } from "@workspace/ui/theme/semantic.stylex"
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
    width: spacing["56"],
    borderStartStartRadius: radius.lg,
    borderStartEndRadius: radius.lg,
    borderEndStartRadius: radius.lg,
    borderEndEndRadius: radius.lg,
  },
  icon: {
    color: theme.mutedForeground,
  },
  sidebarMenuButton: {
    color: alpha.sidebarForeground70,
  },
})

export function NavFavorites({
  favorites,
}: {
  favorites: {
    name: string
    url: string
    emoji: string
  }[]
}) {
  const { isMobile } = useSidebar()
  return (
    <SidebarGroup sx={styles.sidebarGroup}>
      <SidebarGroupLabel>Favorites</SidebarGroupLabel>
      <SidebarMenu>
        {favorites.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton render={<a href={item.url} title={item.name} />}>
              <span>{item.emoji}</span>
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
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Icon
                      icon={StarOffIcon}

                      sx={styles.icon}
                    />
                    <span>Remove from Favorites</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Icon
                      icon={LinkIcon}

                      sx={styles.icon}
                    />
                    <span>Copy Link</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon
                      icon={ArrowUpRightIcon}

                      sx={styles.icon}
                    />
                    <span>Open in New Tab</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Icon
                      icon={Delete02Icon}

                      sx={styles.icon}
                    />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton sx={styles.sidebarMenuButton}>
            <Icon icon={MoreHorizontalCircle01Icon} />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
