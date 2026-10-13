import * as stylex from "@stylexjs/stylex"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar"
import { MoreHorizontalCircle01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  sidebarMenuButton: {
    // The menu button's own states are restated alongside the open menu's muted fill:
    // an sx value replaces the whole property.
    backgroundColor: {
      default: null,
      ":hover": theme.sidebarAccent,
      ":active": theme.sidebarAccent,
      '[aria-expanded="true"]': theme.muted,
      "[data-open]": theme.sidebarAccent,
      "[data-active]": theme.sidebarAccent,
    },
    color: {
      default: null,
      ":hover": theme.sidebarAccentForeground,
      ":active": theme.sidebarAccentForeground,
      '[aria-expanded="true"]': theme.sidebarAccentForeground,
      "[data-active]": theme.sidebarAccentForeground,
    },
  },
  icon: {
    marginLeft: "auto",
  },
  dropdownMenuContent: {
    minWidth: spacing["56"],
    borderStartStartRadius: radius.lg,
    borderStartEndRadius: radius.lg,
    borderEndStartRadius: radius.lg,
    borderEndEndRadius: radius.lg,
  },
})

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const { isMobile } = useSidebar()
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <DropdownMenu key={item.title}>
            <SidebarMenuItem>
              <DropdownMenuTrigger
                render={<SidebarMenuButton sx={styles.sidebarMenuButton} />}
              >
                {item.title}{" "}
                <Icon
                  icon={MoreHorizontalCircle01Icon}

                  sx={styles.icon}
                />
              </DropdownMenuTrigger>
              {item.items?.length ? (
                <DropdownMenuContent
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                  sx={styles.dropdownMenuContent}
                >
                  {item.items.map((child) => (
                    <DropdownMenuItem
                      key={child.title}
                      render={<a href={child.url} />}
                    >
                      {child.title}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              ) : null}
            </SidebarMenuItem>
          </DropdownMenu>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
