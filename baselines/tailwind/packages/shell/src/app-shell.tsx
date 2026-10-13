import * as React from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"

import { Separator } from "@workspace/ui/components/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"

import { flattenNav } from "./nav"
import type { NavGroup, NavItem } from "./nav"
import { SearchCommand } from "./search-command"
import { ThemeToggle } from "./theme-toggle"

export function AppShell({
  appName,
  groups,
  children,
}: {
  appName: string
  groups: NavGroup[]
  children: React.ReactNode
}) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const current = flattenNav(groups).find((item) => item.href === pathname)

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" render={<Link to="/" />}>
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary font-heading text-primary-foreground">
                  {appName.slice(0, 1)}
                </span>
                <span className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">{appName}</span>
                  <span className="text-xs text-muted-foreground">
                    shadcn/ui
                  </span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {groups.map((group) => (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) =>
                    item.items ? (
                      <NavCollapsible
                        key={item.title}
                        item={item}
                        pathname={pathname}
                      />
                    ) : (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          isActive={item.href === pathname}
                          render={<Link to={item.href} />}
                        >
                          {item.title}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="min-w-0">
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger />
          <Separator
            orientation="vertical"
            className="mx-1 data-vertical:h-4 data-vertical:self-auto"
          />
          <span className="truncate text-sm font-medium">
            {current?.title ?? (pathname === "/search" ? "Search" : appName)}
          </span>
          <div className="ms-auto flex items-center gap-2">
            <SearchCommand groups={groups} />
            <ThemeToggle />
          </div>
        </header>
        <div className="min-w-0 flex-1">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

/** A parent item: closed by default, open while one of its children is the current page. */
function NavCollapsible({
  item,
  pathname,
}: {
  item: NavItem
  pathname: string
}) {
  const children = item.items ?? []
  const containsCurrent = children.some((child) => child.href === pathname)

  return (
    <Collapsible defaultOpen={containsCurrent} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger render={<SidebarMenuButton />}>
          <span>{item.title}</span>
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            strokeWidth={2}
            className="ms-auto transition-transform duration-200 group-data-open/collapsible:rotate-90"
          />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {children.map((child) => (
              <SidebarMenuSubItem key={child.href}>
                <SidebarMenuSubButton
                  isActive={child.href === pathname}
                  render={<Link to={child.href} />}
                >
                  <span>{child.title}</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}
