import * as React from "react"

import type { NavGroup } from "@workspace/shell/nav"

type Module = Record<string, unknown>

const modules = import.meta.glob<Module>("./examples/*.tsx")

export type ExampleEntry = {
  name: string
  slug: string
  title: string
  /**
   * A full-page example with its own sidebar. It renders bare on
   * `/view/<slug>` and is shown through an iframe, so its sidebar never nests
   * inside the app's.
   */
  frame?: boolean
}

export const EXAMPLES: ExampleEntry[] = [
  {
    name: "accordion-example",
    title: "Accordion",
    slug: "accordion",
  },
  {
    name: "alert-example",
    title: "Alert",
    slug: "alert",
  },
  {
    name: "alert-dialog-example",
    title: "Alert Dialog",
    slug: "alert-dialog",
  },
  {
    name: "aspect-ratio-example",
    title: "Aspect Ratio",
    slug: "aspect-ratio",
  },
  {
    name: "avatar-example",
    title: "Avatar",
    slug: "avatar",
  },
  {
    name: "badge-example",
    title: "Badge",
    slug: "badge",
  },
  {
    name: "breadcrumb-example",
    title: "Breadcrumb",
    slug: "breadcrumb",
  },
  {
    name: "button-example",
    title: "Button",
    slug: "button",
  },
  {
    name: "button-group-example",
    title: "Button Group",
    slug: "button-group",
  },
  {
    name: "calendar-example",
    title: "Calendar",
    slug: "calendar",
  },
  {
    name: "card-example",
    title: "Card",
    slug: "card",
  },
  {
    name: "carousel-example",
    title: "Carousel",
    slug: "carousel",
  },
  {
    name: "chart-example",
    title: "Chart",
    slug: "chart",
  },
  {
    name: "checkbox-example",
    title: "Checkbox",
    slug: "checkbox",
  },
  {
    name: "collapsible-example",
    title: "Collapsible",
    slug: "collapsible",
  },
  {
    name: "combobox-example",
    title: "Combobox",
    slug: "combobox",
  },
  {
    name: "command-example",
    title: "Command",
    slug: "command",
  },
  {
    name: "context-menu-example",
    title: "Context Menu",
    slug: "context-menu",
  },
  {
    name: "dialog-example",
    title: "Dialog",
    slug: "dialog",
  },
  {
    name: "drawer-example",
    title: "Drawer",
    slug: "drawer",
  },
  {
    name: "dropdown-menu-example",
    title: "Dropdown Menu",
    slug: "dropdown-menu",
  },
  {
    name: "empty-example",
    title: "Empty",
    slug: "empty",
  },
  {
    name: "field-example",
    title: "Field",
    slug: "field",
  },
  {
    name: "hover-card-example",
    title: "Hover Card",
    slug: "hover-card",
  },
  {
    name: "input-example",
    title: "Input",
    slug: "input",
  },
  {
    name: "input-group-example",
    title: "Input Group",
    slug: "input-group",
  },
  {
    name: "input-otp-example",
    title: "Input OTP",
    slug: "input-otp",
  },
  {
    name: "item-example",
    title: "Item",
    slug: "item",
  },
  {
    name: "kbd-example",
    title: "Kbd",
    slug: "kbd",
  },
  {
    name: "label-example",
    title: "Label",
    slug: "label",
  },
  {
    name: "menubar-example",
    title: "Menubar",
    slug: "menubar",
  },
  {
    name: "native-select-example",
    title: "Native Select",
    slug: "native-select",
  },
  {
    name: "navigation-menu-example",
    title: "Navigation Menu",
    slug: "navigation-menu",
  },
  {
    name: "pagination-example",
    title: "Pagination",
    slug: "pagination",
  },
  {
    name: "popover-example",
    title: "Popover",
    slug: "popover",
  },
  {
    name: "progress-example",
    title: "Progress",
    slug: "progress",
  },
  {
    name: "radio-group-example",
    title: "Radio Group",
    slug: "radio-group",
  },
  {
    name: "resizable-example",
    title: "Resizable",
    slug: "resizable",
  },
  {
    name: "scroll-area-example",
    title: "Scroll Area",
    slug: "scroll-area",
  },
  {
    name: "select-example",
    title: "Select",
    slug: "select",
  },
  {
    name: "separator-example",
    title: "Separator",
    slug: "separator",
  },
  {
    name: "sheet-example",
    title: "Sheet",
    slug: "sheet",
  },
  {
    name: "sidebar-example",
    title: "Sidebar",
    slug: "sidebar",
    frame: true,
  },
  {
    name: "sidebar-icon-example",
    title: "Sidebar (Icon)",
    slug: "sidebar-icon",
    frame: true,
  },
  {
    name: "sidebar-inset-example",
    title: "Sidebar (Inset)",
    slug: "sidebar-inset",
    frame: true,
  },
  {
    name: "sidebar-floating-example",
    title: "Sidebar (Floating)",
    slug: "sidebar-floating",
    frame: true,
  },
  {
    name: "skeleton-example",
    title: "Skeleton",
    slug: "skeleton",
  },
  {
    name: "slider-example",
    title: "Slider",
    slug: "slider",
  },
  {
    name: "sonner-example",
    title: "Sonner",
    slug: "sonner",
  },
  {
    name: "spinner-example",
    title: "Spinner",
    slug: "spinner",
  },
  {
    name: "switch-example",
    title: "Switch",
    slug: "switch",
  },
  {
    name: "table-example",
    title: "Table",
    slug: "table",
  },
  {
    name: "tabs-example",
    title: "Tabs",
    slug: "tabs",
  },
  {
    name: "textarea-example",
    title: "Textarea",
    slug: "textarea",
  },
  {
    name: "toggle-example",
    title: "Toggle",
    slug: "toggle",
  },
  {
    name: "toggle-group-example",
    title: "Toggle Group",
    slug: "toggle-group",
  },
  {
    name: "tooltip-example",
    title: "Tooltip",
    slug: "tooltip",
  },
  {
    name: "demo",
    title: "Demo",
    slug: "demo",
  },
  {
    name: "component-example",
    title: "Example",
    slug: "component",
  },
]

export const NAV: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Demo", href: "/demo" },
      { title: "All components", href: "/component" },
    ],
  },
  {
    label: "Components",
    items: [
      {
        title: "Accordion",
        href: "/accordion",
        keywords: ["accordion-example"],
      },
      { title: "Alert", href: "/alert", keywords: ["alert-example"] },
      {
        title: "Alert Dialog",
        href: "/alert-dialog",
        keywords: ["alert-dialog-example"],
      },
      {
        title: "Aspect Ratio",
        href: "/aspect-ratio",
        keywords: ["aspect-ratio-example"],
      },
      { title: "Avatar", href: "/avatar", keywords: ["avatar-example"] },
      { title: "Badge", href: "/badge", keywords: ["badge-example"] },
      {
        title: "Breadcrumb",
        href: "/breadcrumb",
        keywords: ["breadcrumb-example"],
      },
      { title: "Button", href: "/button", keywords: ["button-example"] },
      {
        title: "Button Group",
        href: "/button-group",
        keywords: ["button-group-example"],
      },
      { title: "Calendar", href: "/calendar", keywords: ["calendar-example"] },
      { title: "Card", href: "/card", keywords: ["card-example"] },
      { title: "Carousel", href: "/carousel", keywords: ["carousel-example"] },
      { title: "Chart", href: "/chart", keywords: ["chart-example"] },
      { title: "Checkbox", href: "/checkbox", keywords: ["checkbox-example"] },
      {
        title: "Collapsible",
        href: "/collapsible",
        keywords: ["collapsible-example"],
      },
      { title: "Combobox", href: "/combobox", keywords: ["combobox-example"] },
      { title: "Command", href: "/command", keywords: ["command-example"] },
      {
        title: "Context Menu",
        href: "/context-menu",
        keywords: ["context-menu-example"],
      },
      { title: "Dialog", href: "/dialog", keywords: ["dialog-example"] },
      { title: "Drawer", href: "/drawer", keywords: ["drawer-example"] },
      {
        title: "Dropdown Menu",
        href: "/dropdown-menu",
        keywords: ["dropdown-menu-example"],
      },
      { title: "Empty", href: "/empty", keywords: ["empty-example"] },
      { title: "Field", href: "/field", keywords: ["field-example"] },
      {
        title: "Hover Card",
        href: "/hover-card",
        keywords: ["hover-card-example"],
      },
      { title: "Input", href: "/input", keywords: ["input-example"] },
      {
        title: "Input Group",
        href: "/input-group",
        keywords: ["input-group-example"],
      },
      {
        title: "Input OTP",
        href: "/input-otp",
        keywords: ["input-otp-example"],
      },
      { title: "Item", href: "/item", keywords: ["item-example"] },
      { title: "Kbd", href: "/kbd", keywords: ["kbd-example"] },
      { title: "Label", href: "/label", keywords: ["label-example"] },
      { title: "Menubar", href: "/menubar", keywords: ["menubar-example"] },
      {
        title: "Native Select",
        href: "/native-select",
        keywords: ["native-select-example"],
      },
      {
        title: "Navigation Menu",
        href: "/navigation-menu",
        keywords: ["navigation-menu-example"],
      },
      {
        title: "Pagination",
        href: "/pagination",
        keywords: ["pagination-example"],
      },
      { title: "Popover", href: "/popover", keywords: ["popover-example"] },
      { title: "Progress", href: "/progress", keywords: ["progress-example"] },
      {
        title: "Radio Group",
        href: "/radio-group",
        keywords: ["radio-group-example"],
      },
      {
        title: "Resizable",
        href: "/resizable",
        keywords: ["resizable-example"],
      },
      {
        title: "Scroll Area",
        href: "/scroll-area",
        keywords: ["scroll-area-example"],
      },
      { title: "Select", href: "/select", keywords: ["select-example"] },
      {
        title: "Separator",
        href: "/separator",
        keywords: ["separator-example"],
      },
      { title: "Sheet", href: "/sheet", keywords: ["sheet-example"] },
      { title: "Sidebar", href: "/sidebar", keywords: ["sidebar-example"] },
      {
        title: "Sidebar (Icon)",
        href: "/sidebar-icon",
        keywords: ["sidebar-icon-example"],
      },
      {
        title: "Sidebar (Inset)",
        href: "/sidebar-inset",
        keywords: ["sidebar-inset-example"],
      },
      {
        title: "Sidebar (Floating)",
        href: "/sidebar-floating",
        keywords: ["sidebar-floating-example"],
      },
      { title: "Skeleton", href: "/skeleton", keywords: ["skeleton-example"] },
      { title: "Slider", href: "/slider", keywords: ["slider-example"] },
      { title: "Sonner", href: "/sonner", keywords: ["sonner-example"] },
      { title: "Spinner", href: "/spinner", keywords: ["spinner-example"] },
      { title: "Switch", href: "/switch", keywords: ["switch-example"] },
      { title: "Table", href: "/table", keywords: ["table-example"] },
      { title: "Tabs", href: "/tabs", keywords: ["tabs-example"] },
      { title: "Textarea", href: "/textarea", keywords: ["textarea-example"] },
      { title: "Toggle", href: "/toggle", keywords: ["toggle-example"] },
      {
        title: "Toggle Group",
        href: "/toggle-group",
        keywords: ["toggle-group-example"],
      },
      { title: "Tooltip", href: "/tooltip", keywords: ["tooltip-example"] },
    ],
  },
]

/** The default export, or the first exported component for the few files that use a named one. */
function pickComponent(mod: Module) {
  const candidate =
    mod.default ??
    Object.values(mod).find((value) => typeof value === "function")
  return candidate as React.ComponentType
}

const cache = new Map<string, React.LazyExoticComponent<React.ComponentType>>()

export function getExample(slug: string) {
  const entry = EXAMPLES.find((e) => e.slug === slug)
  const load = entry && modules[`./examples/${entry.name}.tsx`]
  if (!entry || !load) return null
  if (!cache.has(slug))
    cache.set(
      slug,
      React.lazy(() => load().then((mod) => ({ default: pickComponent(mod) })))
    )
  return { entry, Component: cache.get(slug)! }
}
