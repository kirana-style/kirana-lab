import * as React from "react"

import { ThemeToggle } from "@/components/theme-toggle"

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
import { HugeiconsIcon } from "@hugeicons/react"
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

/* -------------------------------------------------------------------------- */
/*  Data. Every repeated block in this page is a map over one of these.        */
/* -------------------------------------------------------------------------- */

const SWATCHES = [
  "--background",
  "--foreground",
  "--primary",
  "--secondary",
  "--muted",
  "--accent",
  "--border",
  "--chart-1",
  "--chart-2",
  "--chart-3",
  "--chart-4",
  "--chart-5",
]

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

export function Demo() {
  const [sliderValue, setSliderValue] = React.useState<number[]>([500])
  const handleSliderValueChange = React.useCallback(
    (value: number | readonly number[]) => {
      if (typeof value === "number") {
        setSliderValue([value])
      } else {
        setSliderValue([...value])
      }
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
    <div className="flex min-h-screen w-full flex-col items-center gap-4 bg-muted p-4 sm:p-6 lg:p-12 dark:bg-background">
      <div className="flex w-full max-w-3xl justify-end">
        <ThemeToggle />
      </div>

      <div className="grid w-full max-w-3xl gap-4 sm:grid-cols-2">
        {/* ---------------------------------------------------------- */}
        {/* Left column                                                 */}
        {/* ---------------------------------------------------------- */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Style Overview</CardTitle>
              <CardDescription className="line-clamp-2">
                Designers love packing quirky glyphs into test phrases. This is
                a preview of the typography styles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-3">
                {SWATCHES.map((variant) => (
                  <div
                    key={variant}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className="relative aspect-square w-full rounded-lg bg-(--color) after:absolute after:inset-0 after:rounded-lg after:border after:border-border after:mix-blend-darken dark:after:mix-blend-lighten"
                      style={
                        {
                          "--color": `var(${variant})`,
                        } as React.CSSProperties
                      }
                    />
                    <div className="hidden max-w-14 truncate font-mono text-[0.60rem] md:block">
                      {variant.replace("--", "")}
                    </div>
                  </div>
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
              <div className="grid grid-cols-8 place-items-center gap-4">
                {ICONS.map(({ icon, name }) => (
                  <Tooltip key={name}>
                    <TooltipTrigger
                      render={
                        <Card className="flex size-8 items-center justify-center rounded-md p-0 ring ring-border *:[svg]:size-4" />
                      }
                    >
                      <HugeiconsIcon icon={icon} strokeWidth={2} />
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
            <CardContent className="flex flex-col gap-4">
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
                  <TabsContent
                    key={value}
                    value={value}
                    className="text-sm text-muted-foreground"
                  >
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
            <CardContent className="flex flex-col gap-4">
              <Accordion defaultValue={["tokens"]}>
                {FAQ.map(({ value, question, answer }) => (
                  <AccordionItem key={value} value={value}>
                    <AccordionTrigger>{question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Collapsible className="flex flex-col gap-2">
                <CollapsibleTrigger
                  render={
                    <Button variant="outline" size="sm" className="w-fit" />
                  }
                >
                  Recent activity
                  <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} />
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-col gap-2">
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
              <SidebarProvider
                className="min-h-0 overflow-hidden rounded-lg border"
                style={{ "--sidebar-width": "10rem" } as React.CSSProperties}
              >
                <Sidebar collapsible="none" className="h-56">
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
                                <HugeiconsIcon icon={icon} strokeWidth={2} />
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
                          <HugeiconsIcon
                            icon={Settings01Icon}
                            strokeWidth={2}
                          />
                          Preferences
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarFooter>
                </Sidebar>
                <div className="flex flex-1 flex-col gap-1 bg-background p-3">
                  <p className="font-medium">Overview</p>
                  <p className="text-muted-foreground">
                    Menu buttons, badges and group labels all read their colours
                    from the sidebar token set.
                  </p>
                </div>
              </SidebarProvider>
            </CardContent>
          </Card>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Right column                                                */}
        {/* ---------------------------------------------------------- */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Controls</CardTitle>
              <CardDescription>
                The things a form is made of, in every variant.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  <Button>Button</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
                <Item variant="outline">
                  <ItemContent>
                    <ItemTitle>Two-factor authentication</ItemTitle>
                    <ItemDescription className="text-pretty">
                      Verify via email or phone number.
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions className="flex">
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
              </div>

              <Slider
                value={sliderValue}
                onValueChange={handleSliderValueChange}
                max={1000}
                min={0}
                step={10}
                className="flex-1"
                aria-label="Slider"
              />

              <FieldGroup>
                <Field>
                  <InputGroup>
                    <InputGroupInput placeholder="Name" />
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>
                        <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
                <Field className="flex-1">
                  <Textarea placeholder="Message" className="resize-none" />
                </Field>
              </FieldGroup>

              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <Badge>Badge</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
                <RadioGroup
                  defaultValue="apple"
                  className="ms-auto flex w-fit gap-3"
                >
                  <RadioGroupItem value="apple" />
                  <RadioGroupItem value="banana" />
                </RadioGroup>
                <div className="flex gap-3">
                  <Checkbox defaultChecked />
                  <Checkbox />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>
                Things that happen when you press them.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
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

              <div className="flex items-center gap-4">
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
                      <HugeiconsIcon icon={icon} strokeWidth={2} />
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
                <Switch defaultChecked className="ms-auto" />
              </div>

              <div className="flex items-center gap-4">
                <AlertDialog>
                  <AlertDialogTrigger render={<Button variant="outline" />}>
                    <span className="hidden [text-box:trim-both_cap_alphabetic] md:block">
                      Alert Dialog
                    </span>
                    <span className="block [text-box:trim-both_cap_alphabetic] md:hidden">
                      Dialog
                    </span>
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
                      <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      side="top"
                      className="w-fit"
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
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Overlays</CardTitle>
              <CardDescription>
                Everything that opens on top of the page.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
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
                    <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} />
                    {date ? date.toLocaleDateString() : "Pick a date"}
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
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
                  <HoverCardContent className="flex gap-2.5">
                    <Avatar>
                      <AvatarFallback>AL</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                      <p className="font-medium">Ada Lovelace</p>
                      <p className="text-muted-foreground">
                        Wrote the first program, 1843.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>

              <ContextMenu>
                <ContextMenuTrigger
                  render={
                    <div className="flex h-20 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground" />
                  }
                >
                  Right-click anywhere here
                </ContextMenuTrigger>
                <ContextMenuContent className="w-44">
                  {CONTEXT_ACTIONS.map(({ icon, label, shortcut }) => (
                    <ContextMenuItem key={label}>
                      <HugeiconsIcon icon={icon} strokeWidth={2} />
                      {label}
                      <ContextMenuShortcut>{shortcut}</ContextMenuShortcut>
                    </ContextMenuItem>
                  ))}
                  <ContextMenuSeparator />
                  <ContextMenuItem variant="destructive">
                    <HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
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
                              <HugeiconsIcon icon={icon} strokeWidth={2} />
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
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
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
                          <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <DialogFooter>
                      <Button size="sm">Send invite</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <ScrollArea className="h-40 rounded-lg border">
                <div className="flex flex-col gap-2 p-2">
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
