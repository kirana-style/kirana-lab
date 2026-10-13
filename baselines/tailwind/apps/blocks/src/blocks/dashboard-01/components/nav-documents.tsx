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
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Delete02Icon,
  Folder01Icon,
  MoreHorizontalCircle01Icon,
  Share01Icon,
} from "@hugeicons/core-free-icons"

export function NavDocuments({
  items,
}: {
  items: {
    name: string
    url: string
    icon: React.ReactNode
  }[]
}) {
  const { isMobile } = useSidebar()
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Documents</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
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
                className="w-24"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <HugeiconsIcon
                    strokeWidth={2}

                    icon={Folder01Icon}
                  />
                  <span>Open</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HugeiconsIcon
                    strokeWidth={2}

                    icon={Share01Icon}
                  />
                  <span>Share</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <HugeiconsIcon
                    strokeWidth={2}

                    icon={Delete02Icon}
                  />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <HugeiconsIcon
              strokeWidth={2}

              icon={MoreHorizontalCircle01Icon}

              className="text-sidebar-foreground/70"
            />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
