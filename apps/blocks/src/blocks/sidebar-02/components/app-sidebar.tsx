import { css } from "@kirana-style/core"
import * as React from "react"

import { SearchForm } from "@/blocks/sidebar-02/components/search-form"
import { VersionSwitcher } from "@/blocks/sidebar-02/components/version-switcher"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@workspace/ui/components/sidebar"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic"
import { duration, easing } from "@workspace/ui/tokens/motion"
import { fontSize, lineHeight } from "@workspace/ui/tokens/typography"
import { peer } from "@workspace/ui/theme/markers"

const styles = {
  sidebarContent: css({
    rowGap: "0px",
    columnGap: "0px",
  }),
  sidebarGroupLabel: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: {
      base: theme.sidebarForeground,
      ":hover": theme.sidebarAccentForeground,
    },
    backgroundColor: { ":hover": theme.sidebarAccent },
  }),
  icon: css({
    marginLeft: "auto",
    transitionProperty: "transform, translate, scale, rotate",
    transitionTimingFunction: easing.inOut,
    transitionDuration: duration["150"],
    // The Collapsible carries the default marker; `data-open` is Base UI's.
    rotate: { [peer.within("[data-open]")]: "90deg" },
  }),
}

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Installation",
          url: "#",
        },
        {
          title: "Project Structure",
          url: "#",
        },
      ],
    },
    {
      title: "Build Your Application",
      url: "#",
      items: [
        {
          title: "Routing",
          url: "#",
        },
        {
          title: "Data Fetching",
          url: "#",
          isActive: true,
        },
        {
          title: "Rendering",
          url: "#",
        },
        {
          title: "Caching",
          url: "#",
        },
        {
          title: "Styling",
          url: "#",
        },
        {
          title: "Optimizing",
          url: "#",
        },
        {
          title: "Configuring",
          url: "#",
        },
        {
          title: "Testing",
          url: "#",
        },
        {
          title: "Authentication",
          url: "#",
        },
        {
          title: "Deploying",
          url: "#",
        },
        {
          title: "Upgrading",
          url: "#",
        },
        {
          title: "Examples",
          url: "#",
        },
      ],
    },
    {
      title: "API Reference",
      url: "#",
      items: [
        {
          title: "Components",
          url: "#",
        },
        {
          title: "File Conventions",
          url: "#",
        },
        {
          title: "Functions",
          url: "#",
        },
        {
          title: "next.config.js Options",
          url: "#",
        },
        {
          title: "CLI",
          url: "#",
        },
        {
          title: "Edge Runtime",
          url: "#",
        },
      ],
    },
    {
      title: "Architecture",
      url: "#",
      items: [
        {
          title: "Accessibility",
          url: "#",
        },
        {
          title: "Fast Refresh",
          url: "#",
        },
        {
          title: "Next.js Compiler",
          url: "#",
        },
        {
          title: "Supported Browsers",
          url: "#",
        },
        {
          title: "Turbopack",
          url: "#",
        },
      ],
    },
    {
      title: "Community",
      url: "#",
      items: [
        {
          title: "Contribution Guide",
          url: "#",
        },
      ],
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent sx={styles.sidebarContent}>
        {/* We create a collapsible SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            sx={peer.anchor}
          >
            <SidebarGroup>
              <SidebarGroupLabel
                sx={styles.sidebarGroupLabel}
                render={<CollapsibleTrigger />}
              >
                {item.title}{" "}
                <Icon
                  icon={ArrowRight01Icon}

                  sx={styles.icon}
                />
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((child) => (
                      <SidebarMenuItem key={child.title}>
                        <SidebarMenuButton
                          isActive={child.isActive}
                          render={<a href={child.url} />}
                        >
                          {child.title}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
