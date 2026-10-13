import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
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
import {
  ArrowRight01Icon,
  BookOpen02Icon,
  ComputerTerminalIcon,
  CropIcon,
  MapsIcon,
  PieChartIcon,
  RoboticIcon,
  Settings05Icon,
  UnfoldMoreIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { sidebarMarker } from "@workspace/ui/theme/markers.stylex"
import { alpha, radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { duration, easing } from "@workspace/ui/tokens/motion.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  // A raw svg does not read the button's icon size, so it states the size itself.
  logo: { width: spacing["4"], height: spacing["4"], flexShrink: 0 },
  sidebarMenuButton: {
    // The button's own states are restated alongside the open one: an sx value
    // replaces the whole property.
    backgroundColor: {
      default: null,
      ":hover": theme.sidebarAccent,
      ":active": theme.sidebarAccent,
      "[data-active]": theme.sidebarAccent,
      "[data-popup-open]": theme.sidebarAccent,
    },
    color: {
      default: null,
      ":hover": theme.sidebarAccentForeground,
      ":active": theme.sidebarAccentForeground,
      "[data-active]": theme.sidebarAccentForeground,
      "[data-popup-open]": theme.sidebarAccentForeground,
    },
  },
  button: {
    width: spacing["8"],
    height: spacing["8"],
  },
  grid: {
    display: "grid",
    flex: 1,
    textAlign: "left",
    fontSize: fontSize.sm,
    lineHeight: leading.tight,
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
  },
  text2: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  },
  icon: {
    marginLeft: "auto",
    // The Collapsible carries the default marker.
    rotate: { default: null, [stylex.when.ancestor("[data-open]")]: "90deg" },
    transitionProperty: "transform, translate, scale, rotate",
    transitionTimingFunction: easing.inOut,
    transitionDuration: "100ms",
  },
  sidebarGroup: {
    // The group's own `flex` is restated: an sx value replaces the property.
    display: {
      default: "flex",
      [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]:
        "none",
    },
  },
  avatarFallback: {
    borderStartStartRadius: radius.lg,
    borderStartEndRadius: radius.lg,
    borderEndStartRadius: radius.lg,
    borderEndEndRadius: radius.lg,
  },
  header: {
    display: "flex",
    // The SidebarProvider wrapper carries the default marker.
    height: {
      default: spacing["16"],
      [stylex.when.ancestor(':has([data-collapsible="icon"])')]: spacing["12"],
    },
    flexShrink: 0,
    alignItems: "center",
    gap: spacing["2"],
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    transitionProperty: "width,height",
    transitionTimingFunction: "linear",
    transitionDuration: duration["150"],
    borderBottomColor: theme.border,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
    paddingInline: spacing["4"],
  },
  sidebarTrigger: {
    marginLeft: `calc(${spacing["1"]} * -1)`,
  },
  stack: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacing["4"],
    paddingTop: "0px",
    paddingBottom: spacing["4"],
    paddingInlineStart: spacing["4"],
    paddingInlineEnd: spacing["4"],
  },
  grid2: {
    display: "grid",
    gridAutoRows: "min-content",
    gap: spacing["4"],
    gridTemplateColumns: {
      default: null,
      [breakpoint.md]: "repeat(3, minmax(0, 1fr))",
    },
  },
  box: {
    aspectRatio: "16 / 9",
    borderRadius: radius.xl,
    backgroundColor: alpha.muted50,
  },
  box2: {
    minHeight: { default: "100vh", [breakpoint.md]: "min-content" },
    flex: 1,
    borderRadius: radius.xl,
    backgroundColor: alpha.muted50,
  },
})

export default function SidebarIconExample() {
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Playground",
        url: "#",
        icon: <Icon icon={ComputerTerminalIcon} />,
        isActive: true,
        items: [
          {
            title: "History",
            url: "#",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Models",
        url: "#",
        icon: <Icon icon={RoboticIcon} />,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: <Icon icon={BookOpen02Icon} />,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: <Icon icon={Settings05Icon} />,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: <Icon icon={CropIcon} />,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: <Icon icon={PieChartIcon} />,
      },
      {
        name: "Travel",
        url: "#",
        icon: <Icon icon={MapsIcon} />,
      },
    ],
  }

  const [activeTeam, setActiveTeam] = React.useState(data.teams[0])

  return (
    <SidebarProvider sx={stylex.defaultMarker()}>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <SidebarMenuButton
                      size="lg"
                      sx={styles.sidebarMenuButton}
                    />
                  }
                >
                  <Button
                    size="icon-sm"
                    render={<span />}
                    nativeButton={false}
                    sx={styles.button}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                      sx={styles.logo}
                    >
                      <rect width="256" height="256" fill="none"></rect>
                      <line
                        x1="208"
                        y1="128"
                        x2="128"
                        y2="208"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                      ></line>
                      <line
                        x1="192"
                        y1="40"
                        x2="40"
                        y2="192"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                      ></line>
                    </svg>
                  </Button>
                  <div sx={styles.grid}>
                    <span sx={styles.text}>{activeTeam.name}</span>
                    <span sx={styles.text2}>{activeTeam.plan}</span>
                  </div>
                  <Icon icon={UnfoldMoreIcon} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Teams</DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuGroup>
                    {data.teams.map((team) => (
                      <DropdownMenuItem
                        key={team.name}
                        onClick={() => setActiveTeam(team)}
                      >
                        {team.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={item.isActive}
                  sx={stylex.defaultMarker()}
                >
                  <SidebarMenuItem>
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
                            <SidebarMenuSubButton
                              render={<a href={subItem.url} />}
                            >
                              {subItem.title}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup sx={styles.sidebarGroup}>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
              {data.projects.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton render={<a href={item.url} />}>
                    {item.icon}
                    {item.name}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <SidebarMenuButton
                      size="lg"
                      sx={styles.sidebarMenuButton}
                    />
                  }
                >
                  <Avatar>
                    <AvatarImage src={data.user.avatar} alt={data.user.name} />
                    <AvatarFallback sx={styles.avatarFallback}>
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <div sx={styles.grid}>
                    <span sx={styles.text}>{data.user.name}</span>
                    <span sx={styles.text2}>{data.user.email}</span>
                  </div>
                  <Icon icon={UnfoldMoreIcon} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>
                      <Item size="xs">
                        <ItemMedia>
                          <Avatar>
                            <AvatarImage
                              src={data.user.avatar}
                              alt={data.user.name}
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle>{data.user.name}</ItemTitle>
                          <ItemDescription> {data.user.email}</ItemDescription>
                        </ItemContent>
                      </Item>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Account</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header sx={styles.header}>
          <div sx={styles.row}>
            <SidebarTrigger sx={styles.sidebarTrigger} />
          </div>
        </header>
        <div sx={styles.stack}>
          <div sx={styles.grid2}>
            <div sx={styles.box} />
            <div sx={styles.box} />
            <div sx={styles.box} />
          </div>
          <div sx={styles.box2} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
