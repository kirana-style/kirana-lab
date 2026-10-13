import { css } from "@kirana-style/core"
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
import {
  ArrowRight01Icon,
  MoreHorizontalCircle01Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { alpha, theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  sidebarMenuAction: css({
    left: spacing["2"],
    backgroundColor: theme.sidebarAccent,
    color: theme.sidebarAccentForeground,
    // A collapsible trigger is marked `data-panel-open`, not `data-open`.
    rotate: { "[data-panel-open]": "90deg" },
  }),
  sidebarMenuButton: css({
    color: alpha.sidebarForeground70,
  }),
}

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
                  sx={styles.sidebarMenuAction}
                  showOnHover
                >
                  <Icon icon={ArrowRight01Icon} />
                </SidebarMenuAction>
                <SidebarMenuAction showOnHover>
                  <Icon icon={PlusSignIcon} />
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
            <SidebarMenuButton sx={styles.sidebarMenuButton}>
              <Icon icon={MoreHorizontalCircle01Icon} />
              <span>More</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
