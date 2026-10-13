/** The registry's full-page blocks, as listed in its `_registry.ts`. */
export type BlockMeta = {
  name: string
  title: string
  description: string
  category: "dashboard" | "sidebar" | "login" | "signup"
}

export const BLOCK_META: BlockMeta[] = [
  {
    name: "login-01",
    title: "Login 01",
    description: "A simple login form.",
    category: "login",
  },
  {
    name: "login-02",
    title: "Login 02",
    description: "A two column login page with a cover image.",
    category: "login",
  },
  {
    name: "login-03",
    title: "Login 03",
    description: "A login page with a muted background color.",
    category: "login",
  },
  {
    name: "login-04",
    title: "Login 04",
    description: "A login page with form and image.",
    category: "login",
  },
  {
    name: "login-05",
    title: "Login 05",
    description: "A simple email-only login page.",
    category: "login",
  },
  {
    name: "signup-01",
    title: "Signup 01",
    description: "A simple signup form.",
    category: "signup",
  },
  {
    name: "signup-02",
    title: "Signup 02",
    description: "A two column signup page with a cover image.",
    category: "signup",
  },
  {
    name: "signup-03",
    title: "Signup 03",
    description: "A signup page with a muted background color.",
    category: "signup",
  },
  {
    name: "signup-04",
    title: "Signup 04",
    description: "A signup page with form and image.",
    category: "signup",
  },
  {
    name: "signup-05",
    title: "Signup 05",
    description: "A simple signup form with social providers.",
    category: "signup",
  },
  {
    name: "dashboard-01",
    title: "Dashboard 01",
    description: "A dashboard with sidebar, charts and data table.",
    category: "dashboard",
  },
  {
    name: "sidebar-01",
    title: "Sidebar 01",
    description: "A simple sidebar with navigation grouped by section.",
    category: "sidebar",
  },
  {
    name: "sidebar-02",
    title: "Sidebar 02",
    description: "A sidebar with collapsible sections.",
    category: "sidebar",
  },
  {
    name: "sidebar-03",
    title: "Sidebar 03",
    description: "A sidebar with submenus.",
    category: "sidebar",
  },
  {
    name: "sidebar-04",
    title: "Sidebar 04",
    description: "A floating sidebar with submenus.",
    category: "sidebar",
  },
  {
    name: "sidebar-05",
    title: "Sidebar 05",
    description: "A sidebar with collapsible submenus.",
    category: "sidebar",
  },
  {
    name: "sidebar-06",
    title: "Sidebar 06",
    description: "A sidebar with submenus as dropdowns.",
    category: "sidebar",
  },
  {
    name: "sidebar-07",
    title: "Sidebar 07",
    description: "A sidebar that collapses to icons.",
    category: "sidebar",
  },
  {
    name: "sidebar-08",
    title: "Sidebar 08",
    description: "An inset sidebar with secondary navigation.",
    category: "sidebar",
  },
  {
    name: "sidebar-09",
    title: "Sidebar 09",
    description: "Collapsible nested sidebars.",
    category: "sidebar",
  },
  {
    name: "sidebar-10",
    title: "Sidebar 10",
    description: "A sidebar in a popover.",
    category: "sidebar",
  },
  {
    name: "sidebar-11",
    title: "Sidebar 11",
    description: "A sidebar with a collapsible file tree.",
    category: "sidebar",
  },
  {
    name: "sidebar-12",
    title: "Sidebar 12",
    description: "A sidebar with a calendar.",
    category: "sidebar",
  },
  {
    name: "sidebar-13",
    title: "Sidebar 13",
    description: "A sidebar in a dialog.",
    category: "sidebar",
  },
  {
    name: "sidebar-14",
    title: "Sidebar 14",
    description: "A sidebar on the right.",
    category: "sidebar",
  },
  {
    name: "sidebar-15",
    title: "Sidebar 15",
    description: "A left and right sidebar.",
    category: "sidebar",
  },
  {
    name: "sidebar-16",
    title: "Sidebar 16",
    description: "A sidebar with a sticky site header.",
    category: "sidebar",
  },
]

/** shadcn's own featured list, from its blocks page. */
export const FEATURED = [
  "dashboard-01",
  "sidebar-07",
  "sidebar-03",
  "login-03",
  "login-04",
]
