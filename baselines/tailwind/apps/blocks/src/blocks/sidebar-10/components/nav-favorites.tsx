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
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowUpRightIcon,
  Delete02Icon,
  LinkIcon,
  MoreHorizontalCircle01Icon,
  StarOffIcon,
} from "@hugeicons/core-free-icons"

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
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
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
                    className="aria-expanded:bg-muted"
                  />
                }
              >
                <HugeiconsIcon
                  strokeWidth={2}

                  icon={MoreHorizontalCircle01Icon}
                />
                <span className="sr-only">More</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <HugeiconsIcon
                      strokeWidth={2}

                      icon={StarOffIcon}

                      className="text-muted-foreground"
                    />
                    <span>Remove from Favorites</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <HugeiconsIcon
                      strokeWidth={2}

                      icon={LinkIcon}

                      className="text-muted-foreground"
                    />
                    <span>Copy Link</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HugeiconsIcon
                      strokeWidth={2}

                      icon={ArrowUpRightIcon}

                      className="text-muted-foreground"
                    />
                    <span>Open in New Tab</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <HugeiconsIcon
                      strokeWidth={2}

                      icon={Delete02Icon}

                      className="text-muted-foreground"
                    />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <HugeiconsIcon
              strokeWidth={2}

              icon={MoreHorizontalCircle01Icon}
            />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
