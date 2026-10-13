import * as React from "react"
import { css } from "@kirana-style/core"
import {
  AlertCircleIcon,
  ArrowDown01Icon,
  ArrowLeft02Icon,
  ArrowRight01Icon,
  ArrowRight02Icon,
  ArrowUp01Icon,
  Bookmark01Icon,
  Calendar03Icon,
  Copy01Icon,
  Delete02Icon,
  Folder01Icon,
  Home01Icon,
  Loading03Icon,
  Mail01Icon,
  MinusSignIcon,
  MoreHorizontalCircle01Icon,
  Notification03Icon,
  PencilEdit02Icon,
  PlusSignIcon,
  Search01Icon,
  Settings01Icon,
  Share03Icon,
  ShoppingBag01Icon,
  SidebarLeft01Icon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"
import { Button } from "@workspace/ui/components/button"
import { mergeSx } from "@workspace/ui/lib/sx"
import { buttonLabel } from "@workspace/ui/recipes/button"
import { ButtonGroup } from "@workspace/ui/components/button-group"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@workspace/ui/components/command"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@workspace/ui/components/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Field, FieldGroup } from "@workspace/ui/components/field"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@workspace/ui/components/hover-card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@workspace/ui/components/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item"
import { Kbd } from "@workspace/ui/components/kbd"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@workspace/ui/components/pagination"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { Progress } from "@workspace/ui/components/progress"
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group"
import { ScrollArea } from "@workspace/ui/components/scroll-area"
import { Separator } from "@workspace/ui/components/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@workspace/ui/components/sidebar"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import { Slider } from "@workspace/ui/components/slider"
import { Spinner } from "@workspace/ui/components/spinner"
import { Switch } from "@workspace/ui/components/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"
import { Textarea } from "@workspace/ui/components/textarea"
import { toast } from "@workspace/ui/components/toast"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { Flex, Icon, Stack, Text } from "@workspace/ui/primitives"
import { sidebarCtx } from "@workspace/ui/theme/context"
import { radius, surface, theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography"

import { ThemeToggle } from "@/components/theme-toggle"

/* -------------------------------------------------------------------------- */
/*  Data. Every repeated block in this page is a map over one of these.        */
/* -------------------------------------------------------------------------- */

/**
 * The palette swatches.
 *
 * The Tailwind version mapped over the raw custom-property names
 * (`"--background"`, `"--primary"`, …) and injected each with `bg-(--color)`.
 * Kirana hashes its variable names, so there is nothing stable to write by hand —
 * the list pairs a label with the token itself instead, which also means a
 * renamed or deleted token is now a type error rather than a blank square.
 */
const SWATCHES = [
  ["background", theme.background],
  ["foreground", theme.foreground],
  ["primary", theme.primary],
  ["secondary", theme.secondary],
  ["muted", theme.muted],
  ["accent", theme.accent],
  ["border", theme.border],
  ["chart-1", theme.chart1],
  ["chart-2", theme.chart2],
  ["chart-3", theme.chart3],
  ["chart-4", theme.chart4],
  ["chart-5", theme.chart5],
] as const

const ICONS = [
  { icon: Copy01Icon, name: "Copy" },
  { icon: AlertCircleIcon, name: "Exclamation Circle" },
  { icon: Delete02Icon, name: "Trash" },
  { icon: Share03Icon, name: "Share" },
  { icon: ShoppingBag01Icon, name: "Shopping Bag" },
  { icon: MoreHorizontalCircle01Icon, name: "Dots" },
  { icon: Loading03Icon, name: "Loader" },
  { icon: PlusSignIcon, name: "Plus" },
  { icon: MinusSignIcon, name: "Minus" },
  { icon: ArrowLeft02Icon, name: "Arrow Left" },
  { icon: ArrowRight02Icon, name: "Arrow Right" },
  { icon: Tick02Icon, name: "Check" },
  { icon: ArrowDown01Icon, name: "Chevron Down" },
  { icon: ArrowRight01Icon, name: "Chevron Right" },
  { icon: Search01Icon, name: "Search" },
  { icon: Settings01Icon, name: "Settings" },
]

const TABS = [
  {
    value: "overview",
    label: "Overview",
    body: "Traffic is up 12% this week.",
  },
  {
    value: "activity",
    label: "Activity",
    body: "Six deployments since Monday.",
  },
  {
    value: "settings",
    label: "Settings",
    body: "Two members can edit billing.",
  },
]

const FAQ = [
  {
    value: "tokens",
    question: "Where do colours come from?",
    answer:
      "Every colour is a semantic token. Nothing in a component names a palette step directly.",
  },
  {
    value: "variants",
    question: "How are variants defined?",
    answer:
      "One table per component, keyed by variant name, resolved once at render.",
  },
  {
    value: "dark",
    question: "How does dark mode work?",
    answer:
      "The same tokens take different values. No component branches on the theme.",
  },
]

const TEXT_STYLES = [
  { value: "bold", icon: TextBoldIcon, label: "Bold" },
  { value: "italic", icon: TextItalicIcon, label: "Italic" },
  { value: "underline", icon: TextUnderlineIcon, label: "Underline" },
]

const COMMANDS = [
  {
    heading: "Suggestions",
    items: [
      { icon: Calendar03Icon, label: "Schedule a review", shortcut: "⌘S" },
      { icon: Mail01Icon, label: "Send an invitation", shortcut: "⌘I" },
      { icon: Bookmark01Icon, label: "Save for later", shortcut: "⌘B" },
    ],
  },
  {
    heading: "Workspace",
    items: [
      { icon: Settings01Icon, label: "Open settings", shortcut: "⌘," },
      { icon: SidebarLeft01Icon, label: "Toggle sidebar", shortcut: "⌘." },
    ],
  },
]

const CONTEXT_ACTIONS = [
  { icon: PencilEdit02Icon, label: "Rename", shortcut: "⌘E" },
  { icon: Copy01Icon, label: "Duplicate", shortcut: "⌘D" },
  { icon: Share03Icon, label: "Share", shortcut: "⌘U" },
]

const TEAM = [
  { name: "Ada Lovelace", role: "Owner" },
  { name: "Grace Hopper", role: "Maintainer" },
  { name: "Alan Turing", role: "Reviewer" },
  { name: "Katherine Johnson", role: "Reviewer" },
  { name: "Edsger Dijkstra", role: "Viewer" },
  { name: "Barbara Liskov", role: "Viewer" },
]

const NAV = [
  { icon: Home01Icon, label: "Overview", badge: null, active: true },
  { icon: Folder01Icon, label: "Projects", badge: "12", active: false },
  { icon: Notification03Icon, label: "Inbox", badge: "3", active: false },
  { icon: Settings01Icon, label: "Settings", badge: null, active: false },
]

const PAGES = [1, 2, 3]

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
}

/* -------------------------------------------------------------------------- */

const styles = {
  pretty: css({ textWrap: "pretty" }),
  page: css({
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: spacing[4],
    // The page sits on the muted surface in light mode and the plain background
    // in dark, which under Tailwind was a `dark:` override. It is a token now.
    backgroundColor: surface.page,
    /**
     * `p-4 sm:p-6 lg:p-12`.
     *
     * The middle step is a closed range, kept from the StyleX port, where every
     * `@media` rule had the same priority. Kirana's ladder orders width queries
     * by range (a larger `min-width` wins), so `[breakpoint.sm]` would also
     * work.
     */
    padding: {
      base: spacing[4],
      "@media (min-width: 40rem) and (max-width: 63.999rem)": spacing[6],
      [breakpoint.lg]: spacing[12],
    },
  }),
  /**
   * The toggle sits above the grid, flush with its trailing edge.
   *
   * This is a plain flex row, not the grid below: reusing `shell` here would
   * bring its `display: grid` along with the width, which is exactly the kind of
   * quiet breakage that comes from borrowing a namespace for one property.
   */
  headerRow: css({
    display: "flex",
    width: "100%",
    maxWidth: "48rem",
    justifyContent: "flex-end",
  }),
  shell: css({
    display: "grid",
    width: "100%",
    maxWidth: "48rem",
    gap: spacing[4],
    gridTemplateColumns: {
      base: "minmax(0, 1fr)",
      [breakpoint.sm]: "repeat(2, minmax(0, 1fr))",
    },
  }),
  column: css({ display: "flex", flexDirection: "column", gap: spacing[4] }),

  swatchGrid: css({
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
    gap: spacing[3],
  }),
  swatch: css({
    position: "relative",
    aspectRatio: "1 / 1",
    width: "100%",
    borderRadius: radius.lg,
    // A blended hairline, so a swatch the same colour as the card still reads.
    "::after": {
      content: "''",
      position: "absolute",
      inset: 0,
      borderRadius: radius.lg,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: theme.border,
      mixBlendMode: surface.imageRingBlend,
    },
  }),
  swatchColor: (value: string) => css({ backgroundColor: value }),
  swatchLabel: css({
    display: { base: "none", [breakpoint.md]: "block" },
    maxWidth: "3.5rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: fontFamily.mono,
    fontSize: "0.6rem",
  }),

  iconGrid: css({
    display: "grid",
    gridTemplateColumns: "repeat(8, minmax(0, 1fr))",
    placeItems: "center",
    gap: spacing[4],
  }),
  iconTile: css({
    display: "flex",
    width: spacing[8],
    height: spacing[8],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    // `ring ring-border`: a hairline in the border colour, replacing the ring
    // Card draws in `foreground/10`.
    boxShadow: `0 0 0 1px ${theme.border}`,
    // Card sets `paddingTop`/`paddingBottom` itself, so the override names the
    // same longhands and replaces them.
    paddingTop: 0,
    paddingBottom: 0,
    paddingInline: 0,
  }),

  /** `CardContent` laid out as a column. The two gaps the cards use. */
  body: css({ display: "flex", flexDirection: "column", gap: spacing[4] }),
  bodyWide: css({ display: "flex", flexDirection: "column", gap: spacing[6] }),

  fitWidth: css({ width: "fit-content" }),
  pushEnd: css({ marginInlineStart: "auto" }),
  /** The radios sit in a row at the end of the line, sized to their contents. */
  radioRow: css({
    marginInlineStart: "auto",
    display: "flex",
    width: "fit-content",
    gap: spacing[3],
  }),
  noResize: css({ resize: "none" }),
  clamp2: css({
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  }),
  wideInline: css({ display: { base: "none", [breakpoint.md]: "block" } }),
  narrowOnly: css({ display: { base: "block", [breakpoint.md]: "none" } }),

  tabPanel: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),

  menuWidth: css({ width: "fit-content" }),
  contextMenuWidth: css({ width: "11rem" }),

  /** The right-click target: a dashed well with a hint in it. */
  contextZone: css({
    display: "flex",
    height: spacing[20],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderStyle: "dashed",
    borderColor: theme.border,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),

  /** The calendar brings its own padding, so the popover gives up its own. */
  datePopover: css({ width: "auto", paddingBlock: 0, paddingInline: 0 }),

  hoverCardBody: css({ display: "flex", gap: spacing["2.5"] }),
  hoverCardName: css({ fontWeight: fontWeight.medium }),
  hoverCardText: css({ color: theme.mutedForeground }),

  /**
   * The shell, boxed. `SidebarProvider` is built for a whole page, so the two
   * things that make it page-sized are overridden here: its `100svh` minimum,
   * and the width it hands down. The width is a context variable, so a card can
   * reassign it for its subtree exactly the way the original set
   * `--sidebar-width` inline.
   */
  sidebarBox: css({
    minHeight: 0,
    overflow: "hidden",
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    [sidebarCtx.width]: "10rem",
  }),
  sidebarHeight: css({ height: spacing[56] }),
  sidebarInset: css({
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacing[1],
    backgroundColor: theme.background,
    padding: spacing[3],
  }),
  sidebarInsetTitle: css({ fontWeight: fontWeight.medium }),

  scrollBox: css({
    height: spacing[40],
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
  }),
  scrollInner: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing[2],
    padding: spacing[2],
  }),
}

export function Demo() {
  const [sliderValue, setSliderValue] = React.useState<number[]>([500])
  const handleSliderValueChange = React.useCallback(
    (value: number | readonly number[]) => {
      setSliderValue(typeof value === "number" ? [value] : [...value])
    },
    []
  )

  const [page, setPage] = React.useState(2)
  const [commandOpen, setCommandOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  // The spinner simulation: a job that runs for a moment, reports progress,
  // and finishes with a toast.
  const [progress, setProgress] = React.useState<number | null>(null)
  const running = progress !== null
  const runJob = React.useCallback(() => {
    setProgress(0)
    let value = 0
    const timer = setInterval(() => {
      value += 20
      if (value >= 100) {
        clearInterval(timer)
        setProgress(null)
        toast.add({
          title: "Export finished",
          description: "248 rows written to export.csv",
        })
      } else {
        setProgress(value)
      }
    }, 320)
  }, [])

  return (
    <div sx={styles.page}>
      <div sx={styles.headerRow}>
        <ThemeToggle />
      </div>

      <div sx={styles.shell}>
        {/* ---------------------------------------------------------- */}
        {/* Left column                                                 */}
        {/* ---------------------------------------------------------- */}
        <div sx={styles.column}>
          <Card>
            <CardHeader>
              <CardTitle>Style Overview</CardTitle>
              <CardDescription sx={styles.clamp2}>
                Designers love packing quirky glyphs into test phrases. This is
                a preview of the typography styles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div sx={styles.swatchGrid}>
                {SWATCHES.map(([label, value]) => (
                  <Stack key={label} align="center" gap="2">
                    <div sx={[styles.swatch, styles.swatchColor(value)]} />
                    <div sx={styles.swatchLabel}>{label}</div>
                  </Stack>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Icons</CardTitle>
              <CardDescription>
                Every tile is a tooltip trigger. Hover one for its name.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div sx={styles.iconGrid}>
                {ICONS.map(({ icon, name }) => (
                  <Tooltip key={name}>
                    <TooltipTrigger render={<Card sx={styles.iconTile} />}>
                      <Icon icon={icon} strokeWidth={2} />
                    </TooltipTrigger>
                    <TooltipContent>{name}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Navigation</CardTitle>
              <CardDescription>
                Where you are, where you can go, and what you are looking at.
              </CardDescription>
            </CardHeader>
            <CardContent sx={styles.body}>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbEllipsis />
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Components</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Navigation</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              <Separator />

              <Tabs defaultValue="overview">
                <TabsList>
                  {TABS.map(({ value, label }) => (
                    <TabsTrigger key={value} value={value}>
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {TABS.map(({ value, body }) => (
                  <TabsContent key={value} value={value} sx={styles.tabPanel}>
                    {body}
                  </TabsContent>
                ))}
              </Tabs>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    />
                  </PaginationItem>
                  {PAGES.map((n) => (
                    <PaginationItem key={n}>
                      <PaginationLink
                        href="#"
                        isActive={n === page}
                        onClick={() => setPage(n)}
                      >
                        {n}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() => setPage((p) => Math.min(3, p + 1))}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disclosure</CardTitle>
              <CardDescription>
                Content that opens and closes in place.
              </CardDescription>
            </CardHeader>
            <CardContent sx={styles.body}>
              <Accordion defaultValue={["tokens"]}>
                {FAQ.map(({ value, question, answer }) => (
                  <AccordionItem key={value} value={value}>
                    <AccordionTrigger>{question}</AccordionTrigger>
                    <AccordionContent sx={styles.hoverCardText}>
                      {answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Collapsible render={<Stack gap="2" />}>
                <CollapsibleTrigger
                  render={
                    <Button variant="outline" size="sm" sx={styles.fitWidth} />
                  }
                >
                  Recent activity
                  <Icon icon={ArrowDown01Icon} strokeWidth={2} />
                </CollapsibleTrigger>
                <CollapsibleContent render={<Stack gap="2" />}>
                  {TEAM.slice(0, 2).map(({ name, role }) => (
                    <Item key={name} variant="outline" size="sm">
                      <ItemMedia>
                        <Avatar>
                          <AvatarFallback>{initials(name)}</AvatarFallback>
                        </Avatar>
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>{name}</ItemTitle>
                        <ItemDescription>{role}</ItemDescription>
                      </ItemContent>
                    </Item>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sidebar</CardTitle>
              <CardDescription>
                The app shell, shrunk to fit inside a card.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SidebarProvider sx={styles.sidebarBox}>
                <Sidebar collapsible="none" sx={styles.sidebarHeight}>
                  <SidebarHeader>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <Avatar>
                            <AvatarFallback>AC</AvatarFallback>
                          </Avatar>
                          Acme Inc.
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarHeader>
                  <SidebarContent>
                    <SidebarGroup>
                      <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {NAV.map(({ icon, label, badge, active }) => (
                            <SidebarMenuItem key={label}>
                              <SidebarMenuButton isActive={active}>
                                <Icon icon={icon} strokeWidth={2} />
                                {label}
                              </SidebarMenuButton>
                              {badge ? (
                                <SidebarMenuBadge>{badge}</SidebarMenuBadge>
                              ) : null}
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </SidebarContent>
                  <SidebarFooter>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton>
                          <Icon icon={Settings01Icon} strokeWidth={2} />
                          Preferences
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarFooter>
                </Sidebar>
                <div sx={styles.sidebarInset}>
                  <Text sx={styles.sidebarInsetTitle}>Overview</Text>
                  <Text sx={styles.hoverCardText}>
                    Menu buttons, badges and group labels all read their colours
                    from the sidebar token set.
                  </Text>
                </div>
              </SidebarProvider>
            </CardContent>
          </Card>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Right column                                                */}
        {/* ---------------------------------------------------------- */}
        <div sx={styles.column}>
          <Card>
            <CardHeader>
              <CardTitle>Controls</CardTitle>
              <CardDescription>
                The things a form is made of, in every variant.
              </CardDescription>
            </CardHeader>
            <CardContent sx={styles.bodyWide}>
              <Stack gap="4">
                <Flex gap="2" wrap="wrap">
                  <Button>Button</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </Flex>
                <Item variant="outline">
                  <ItemContent>
                    <ItemTitle>Two-factor authentication</ItemTitle>
                    <ItemDescription sx={styles.pretty}>
                      Verify via email or phone number.
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() =>
                        toast.add({
                          title: "Two-factor enabled",
                          description: "We sent a confirmation to your inbox.",
                        })
                      }
                    >
                      Enable
                    </Button>
                  </ItemActions>
                </Item>
              </Stack>

              <Slider
                value={sliderValue}
                onValueChange={handleSliderValueChange}
                max={1000}
                min={0}
                step={10}
                aria-label="Slider"
              />

              <FieldGroup>
                <Field>
                  <InputGroup>
                    <InputGroupInput placeholder="Name" />
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>
                        <Icon icon={Search01Icon} strokeWidth={2} />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
                <Field>
                  <Textarea placeholder="Message" sx={styles.noResize} />
                </Field>
              </FieldGroup>

              <Flex align="center" gap="2">
                <Flex gap="2">
                  <Badge>Badge</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                </Flex>
                <RadioGroup defaultValue="apple" sx={styles.radioRow}>
                  <RadioGroupItem value="apple" />
                  <RadioGroupItem value="banana" />
                </RadioGroup>
                <Flex gap="3">
                  <Checkbox defaultChecked />
                  <Checkbox />
                </Flex>
              </Flex>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>
                Things that happen when you press them.
              </CardDescription>
            </CardHeader>
            <CardContent sx={styles.body}>
              <Item variant="outline">
                <ItemContent>
                  <ItemTitle>Export report</ItemTitle>
                  <ItemDescription>
                    {running
                      ? `Working… ${progress}%`
                      : "Writes the current view to CSV."}
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button size="sm" disabled={running} onClick={runJob}>
                    {running ? <Spinner /> : null}
                    {running ? "Exporting" : "Export"}
                  </Button>
                </ItemActions>
              </Item>

              <Progress value={progress ?? 0} />

              <Flex align="center" gap="4">
                <ToggleGroup
                  variant="outline"
                  size="sm"
                  spacing={0}
                  defaultValue={["bold"]}
                  aria-label="Text style"
                >
                  {TEXT_STYLES.map(({ value, icon, label }) => (
                    <ToggleGroupItem
                      key={value}
                      value={value}
                      aria-label={label}
                    >
                      <Icon icon={icon} strokeWidth={2} />
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                <Switch defaultChecked sx={styles.pushEnd} />
              </Flex>

              <Flex align="center" gap="4">
                <AlertDialog>
                  <AlertDialogTrigger render={<Button variant="outline" />}>
                    <Text sx={mergeSx(buttonLabel, styles.wideInline)}>
                      Alert Dialog
                    </Text>
                    <Text sx={mergeSx(buttonLabel, styles.narrowOnly)}>
                      Dialog
                    </Text>
                  </AlertDialogTrigger>
                  <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Allow accessory to connect?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Do you want to allow the USB accessory to connect to
                        this device and your data?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
                      <AlertDialogAction>Allow</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <ButtonGroup>
                  <Button variant="outline">Button Group</Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={<Button variant="outline" size="icon" />}
                    >
                      <Icon icon={ArrowUp01Icon} strokeWidth={2} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      side="top"
                      submenu
                      sx={styles.menuWidth}
                    >
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Mute Conversation</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                        <DropdownMenuItem>Block User</DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem variant="destructive">
                          Delete Conversation
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </ButtonGroup>
              </Flex>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Overlays</CardTitle>
              <CardDescription>
                Everything that opens on top of the page.
              </CardDescription>
            </CardHeader>
            <CardContent sx={styles.body}>
              <Flex align="center" gap="2" wrap="wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCommandOpen(true)}
                >
                  Command
                  <Kbd>⌘K</Kbd>
                </Button>

                <Popover>
                  <PopoverTrigger
                    render={<Button variant="outline" size="sm" />}
                  >
                    <Icon icon={Calendar03Icon} strokeWidth={2} />
                    {date ? date.toLocaleDateString() : "Pick a date"}
                  </PopoverTrigger>
                  <PopoverContent sx={styles.datePopover}>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                    />
                  </PopoverContent>
                </Popover>

                <HoverCard>
                  <HoverCardTrigger
                    render={<Button variant="ghost" size="sm" />}
                  >
                    @ada
                  </HoverCardTrigger>
                  <HoverCardContent sx={styles.hoverCardBody}>
                    <Avatar>
                      <AvatarFallback>AL</AvatarFallback>
                    </Avatar>
                    <Stack gap="0.5">
                      <Text sx={styles.hoverCardName}>Ada Lovelace</Text>
                      <Text sx={styles.hoverCardText}>
                        Wrote the first program, 1843.
                      </Text>
                    </Stack>
                  </HoverCardContent>
                </HoverCard>
              </Flex>

              <ContextMenu>
                <ContextMenuTrigger render={<div sx={styles.contextZone} />}>
                  Right-click anywhere here
                </ContextMenuTrigger>
                <ContextMenuContent sx={styles.contextMenuWidth}>
                  {CONTEXT_ACTIONS.map(({ icon, label, shortcut }) => (
                    <ContextMenuItem key={label}>
                      <Icon icon={icon} strokeWidth={2} />
                      {label}
                      <ContextMenuShortcut>{shortcut}</ContextMenuShortcut>
                    </ContextMenuItem>
                  ))}
                  <ContextMenuSeparator />
                  <ContextMenuItem variant="destructive">
                    <Icon icon={Delete02Icon} strokeWidth={2} />
                    Delete
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>

              <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
                <Command>
                  <CommandInput placeholder="Type a command or search…" />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {COMMANDS.map(({ heading, items }, index) => (
                      <React.Fragment key={heading}>
                        {index > 0 ? <CommandSeparator /> : null}
                        <CommandGroup heading={heading}>
                          {items.map(({ icon, label, shortcut }) => (
                            <CommandItem key={label}>
                              <Icon icon={icon} strokeWidth={2} />
                              {label}
                              <CommandShortcut>{shortcut}</CommandShortcut>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </React.Fragment>
                    ))}
                  </CommandList>
                </Command>
              </CommandDialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Panels</CardTitle>
              <CardDescription>
                Surfaces that slide in, and one that scrolls.
              </CardDescription>
            </CardHeader>
            <CardContent sx={styles.body}>
              <Flex gap="2" wrap="wrap">
                <Sheet>
                  <SheetTrigger render={<Button variant="outline" size="sm" />}>
                    Sheet
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit profile</SheetTitle>
                      <SheetDescription>
                        Changes are saved when you close this panel.
                      </SheetDescription>
                    </SheetHeader>
                    <SheetFooter>
                      <Button size="sm">Save</Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>

                <Drawer>
                  <DrawerTrigger
                    render={<Button variant="outline" size="sm" />}
                  >
                    Drawer
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Move to folder</DrawerTitle>
                      <DrawerDescription>
                        Drag down to dismiss this panel.
                      </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                      <Button size="sm">Move</Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>

                <Dialog>
                  <DialogTrigger
                    render={<Button variant="outline" size="sm" />}
                  >
                    Dialog
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Invite a teammate</DialogTitle>
                      <DialogDescription>
                        They will get an email with a join link.
                      </DialogDescription>
                    </DialogHeader>
                    <InputGroup>
                      <InputGroupInput placeholder="name@company.com" />
                      <InputGroupAddon align="inline-end">
                        <InputGroupText>
                          <Icon icon={Mail01Icon} strokeWidth={2} />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <DialogFooter>
                      <Button size="sm">Send invite</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </Flex>

              <ScrollArea sx={styles.scrollBox}>
                <div sx={styles.scrollInner}>
                  {TEAM.map(({ name, role }) => (
                    <Item key={name} size="sm">
                      <ItemMedia>
                        <Avatar>
                          <AvatarFallback>{initials(name)}</AvatarFallback>
                        </Avatar>
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>{name}</ItemTitle>
                        <ItemDescription>{role}</ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        <Badge variant="outline">{role}</Badge>
                      </ItemActions>
                    </Item>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
