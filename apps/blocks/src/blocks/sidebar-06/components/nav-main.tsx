import { css } from "@kirana-style/core"
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
import { radius, theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  sidebarMenuButton: css({
    // The open menu's own fill; the button keeps its hover, active and open
    // states, which merge in beside it.
    backgroundColor: {
      '[aria-expanded="true"]': theme.muted,
    },
    color: {
      '[aria-expanded="true"]': theme.sidebarAccentForeground,
    },
  }),
  icon: css({
    marginLeft: "auto",
  }),
  dropdownMenuContent: css({
    minWidth: spacing["56"],
    borderStartStartRadius: radius.lg,
    borderStartEndRadius: radius.lg,
    borderEndStartRadius: radius.lg,
    borderEndEndRadius: radius.lg,
  }),
}

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
