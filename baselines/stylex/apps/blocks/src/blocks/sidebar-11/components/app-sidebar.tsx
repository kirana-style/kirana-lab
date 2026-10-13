import * as stylex from "@stylexjs/stylex"
import * as React from "react"

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
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarRail,
} from "@workspace/ui/components/sidebar"
import {
  ArrowRight01Icon,
  FileIcon,
  FolderIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { duration, easing } from "@workspace/ui/tokens/motion.stylex"
import { menuButtonMarker } from "@workspace/ui/theme/markers.stylex"

const styles = stylex.create({
  icon: {
    transitionProperty: "transform, translate, scale, rotate",
    transitionTimingFunction: easing.inOut,
    transitionDuration: duration["150"],
    // Was `[&[data-open]>button>svg:first-child]:rotate-90` on the Collapsible.
    // The trigger button is marked `data-panel-open` and carries its marker.
    rotate: {
      default: null,
      [stylex.when.ancestor("[data-panel-open]", menuButtonMarker)]: "90deg",
    },
  },
})

// This is sample data.
const data = {
  changes: [
    {
      file: "README.md",
      state: "M",
    },
    {
      file: "api/hello/route.ts",
      state: "U",
    },
    {
      file: "app/layout.tsx",
      state: "M",
    },
  ],
  tree: [
    [
      "app",
      [
        "api",
        ["hello", ["route.ts"]],
        "page.tsx",
        "layout.tsx",
        ["blog", ["page.tsx"]],
      ],
    ],
    [
      "components",
      ["ui", "button.tsx", "card.tsx"],
      "header.tsx",
      "footer.tsx",
    ],
    ["lib", ["util.ts"]],
    ["public", "favicon.ico", "vercel.svg"],
    ".eslintrc.json",
    ".gitignore",
    "next.config.js",
    "tailwind.config.js",
    "package.json",
    "README.md",
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Changes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.changes.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton>
                    <Icon icon={FileIcon} />
                    {item.file}
                  </SidebarMenuButton>
                  <SidebarMenuBadge>{item.state}</SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Files</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.tree.map((item, index) => (
                <Tree key={index} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
type TreeItem = string | TreeItem[]
function Tree({ item }: { item: TreeItem }) {
  const [name, ...items] = Array.isArray(item) ? item : [item]
  if (!items.length) {
    return (
      <SidebarMenuButton isActive={name === "button.tsx"}>
        <Icon icon={FileIcon} />
        {name}
      </SidebarMenuButton>
    )
  }
  return (
    <SidebarMenuItem>
      <Collapsible defaultOpen={name === "components" || name === "ui"}>
        <SidebarMenuButton render={<CollapsibleTrigger />}>
          <Icon
            icon={ArrowRight01Icon}

            sx={styles.icon}
          />
          <Icon icon={FolderIcon} />
          {name}
        </SidebarMenuButton>
        <CollapsibleContent>
          <SidebarMenuSub>
            {items.map((subItem, index) => (
              <Tree key={index} item={subItem} />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}
