import * as stylex from "@stylexjs/stylex"
import * as React from "react"
import { Link, useRouterState } from "@tanstack/react-router"
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
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { duration, easing } from "@workspace/ui/tokens/motion.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  text: {
    display: "flex",
    width: spacing["8"],
    height: spacing["8"],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    backgroundColor: theme.primary,
    fontFamily: '"Oxanium Variable", sans-serif',
    color: theme.primaryForeground,
  },
  text2: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["0.5"],
    lineHeight: 1,
  },
  text3: {
    fontWeight: fontWeight.medium,
  },
  text4: {
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  },
  chevron: {
    marginInlineStart: "auto",
    transitionProperty: "rotate",
    transitionDuration: duration["200"],
    transitionTimingFunction: easing.inOut,
    // The Collapsible carries the default marker; `data-open` is Base UI's.
    rotate: { default: null, [stylex.when.ancestor("[data-open]")]: "90deg" },
  },
  sidebarInset: {
    minWidth: "0px",
  },
  header: {
    position: "sticky",
    top: "0px",
    zIndex: 10,
    display: "flex",
    height: spacing["14"],
    flexShrink: 0,
    alignItems: "center",
    gap: spacing["2"],
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    backgroundColor: theme.background,
    paddingInline: spacing["4"],
    borderBottomColor: theme.border,
  },
  separator: {
    marginInlineStart: spacing["1"],
    marginInlineEnd: spacing["1"],
    // Always vertical here, so the short, centred rule needs no condition.
    height: spacing["4"],
    alignSelf: "auto",
  },
  text5: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  },
  row: {
    marginInlineStart: "auto",
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
  },
  box: {
    minWidth: "0px",
    flex: 1,
  },
})

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
                <span sx={styles.text}>{appName.slice(0, 1)}</span>
                <span sx={styles.text2}>
                  <span sx={styles.text3}>{appName}</span>
                  <span sx={styles.text4}>shadcn/ui</span>
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
      <SidebarInset sx={styles.sidebarInset}>
        <header sx={styles.header}>
          <SidebarTrigger />
          <Separator orientation="vertical" sx={styles.separator} />
          <span sx={styles.text5}>
            {current?.title ?? (pathname === "/search" ? "Search" : appName)}
          </span>
          <div sx={styles.row}>
            <SearchCommand groups={groups} />
            <ThemeToggle />
          </div>
        </header>
        <div sx={styles.box}>{children}</div>
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
    <Collapsible defaultOpen={containsCurrent} sx={stylex.defaultMarker()}>
      <SidebarMenuItem>
        <CollapsibleTrigger render={<SidebarMenuButton />}>
          <span>{item.title}</span>
          <Icon icon={ArrowRight01Icon} sx={styles.chevron} />
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
