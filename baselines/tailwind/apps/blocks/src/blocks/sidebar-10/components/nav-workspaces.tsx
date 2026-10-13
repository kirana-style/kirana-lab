import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@workspace/ui/components/sidebar"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  MoreHorizontalCircle01Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons"

export function NavWorkspaces({
  workspaces,
}: {
  workspaces: {
    name: string
    emoji: React.ReactNode
    pages: {
      name: string
      emoji: React.ReactNode
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {workspaces.map((workspace) => (
            <Collapsible key={workspace.name}>
              <SidebarMenuItem>
                <SidebarMenuButton render={<a href="#" />}>
                  <span>{workspace.emoji}</span>
                  <span>{workspace.name}</span>
                </SidebarMenuButton>
                <SidebarMenuAction
                  render={<CollapsibleTrigger />}
                  className="left-2 bg-sidebar-accent text-sidebar-accent-foreground data-panel-open:rotate-90"
                  showOnHover
                >
                  <HugeiconsIcon
                    strokeWidth={2}

                    icon={ArrowRight01Icon}
                  />
                </SidebarMenuAction>
                <SidebarMenuAction showOnHover>
                  <HugeiconsIcon
                    strokeWidth={2}

                    icon={PlusSignIcon}
                  />
                </SidebarMenuAction>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {workspace.pages.map((page) => (
                      <SidebarMenuSubItem key={page.name}>
                        <SidebarMenuSubButton render={<a href="#" />}>
                          <span>{page.emoji}</span>
                          <span>{page.name}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
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
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
