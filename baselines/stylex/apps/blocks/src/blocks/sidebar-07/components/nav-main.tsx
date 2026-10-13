import * as stylex from "@stylexjs/stylex"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@workspace/ui/components/sidebar"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { easing } from "@workspace/ui/tokens/motion.stylex"

const styles = stylex.create({
  icon: {
    marginLeft: "auto",
    transitionProperty: "transform, translate, scale, rotate",
    transitionTimingFunction: easing.inOut,
    transitionDuration: "200ms",
    // The Collapsible carries the default marker; `data-open` is Base UI's.
    rotate: { default: null, [stylex.when.ancestor("[data-open]")]: "90deg" },
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
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            defaultOpen={item.isActive}
            render={<SidebarMenuItem sx={stylex.defaultMarker()} />}
          >
            <CollapsibleTrigger
              render={<SidebarMenuButton tooltip={item.title} />}
            >
              {item.icon}
              <span>{item.title}</span>
              <Icon
                icon={ArrowRight01Icon}

                sx={styles.icon}
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton render={<a href={subItem.url} />}>
                      <span>{subItem.title}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
