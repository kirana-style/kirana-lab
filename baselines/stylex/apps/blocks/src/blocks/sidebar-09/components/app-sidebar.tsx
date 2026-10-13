import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import { NavUser } from "@/blocks/sidebar-09/components/nav-user"
import { Label } from "@workspace/ui/components/label"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar"
import { Switch } from "@workspace/ui/components/switch"
import {
  ArchiveIcon,
  CommandIcon,
  Delete02Icon,
  FileIcon,
  InboxIcon,
  SentIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"
import { sidebarMarker } from "@workspace/ui/theme/markers.stylex"
import { sidebarCtx } from "@workspace/ui/theme/context.stylex"

const styles = stylex.create({
  sidebar: {
    overflowX: "hidden",
    overflowY: "hidden",
  },
  // Was `*:data-[sidebar=sidebar]:flex-row`: the two sidebars sit side by side.
  sidebarInner: { flexDirection: "row" },
  sidebar2: {
    width: `calc(${sidebarCtx.widthIcon} + 1px)`,
    borderRightStyle: "solid",
    borderRightWidth: "1px",
    borderRightColor: theme.border,
  },
  sidebarMenuButton: {
    // `md:h-8 md:p-0` over the large size, whose own values are restated.
    height: {
      default: spacing["12"],
      [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]:
        spacing["8"],
      [breakpoint.md]: {
        default: spacing["8"],
        [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]:
          spacing["8"],
      },
    },
    padding: {
      default: spacing["2"],
      [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]: 0,
      [breakpoint.md]: {
        default: 0,
        [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]: 0,
      },
    },
  },
  row: {
    display: "flex",
    aspectRatio: "1 / 1",
    width: spacing["8"],
    height: spacing["8"],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    backgroundColor: theme.sidebarPrimary,
    color: theme.sidebarPrimaryForeground,
  },
  icon: {
    width: spacing["4"],
    height: spacing["4"],
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
  sidebarGroupContent: {
    paddingInlineStart: { default: spacing["1.5"], [breakpoint.md]: "0px" },
    paddingInlineEnd: { default: spacing["1.5"], [breakpoint.md]: "0px" },
  },
  sidebarMenuButton2: {
    paddingInlineStart: {
      default: spacing["2.5"],
      [breakpoint.md]: spacing["2"],
    },
    paddingInlineEnd: {
      default: spacing["2.5"],
      [breakpoint.md]: spacing["2"],
    },
  },
  sidebar3: {
    display: { default: "none", [breakpoint.md]: "flex" },
    flex: 1,
  },
  sidebarHeader: {
    rowGap: spacing["3.5"],
    columnGap: spacing["3.5"],
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    paddingTop: spacing["4"],
    paddingBottom: spacing["4"],
    paddingInlineStart: spacing["4"],
    paddingInlineEnd: spacing["4"],
    borderBottomColor: theme.border,
  },
  row2: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text3: {
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.medium,
    color: theme.foreground,
  },
  label: {
    display: "flex",
    alignItems: "center",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
  switch: {
    boxShadow: "none",
  },
  sidebarGroup: {
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
  },
  link: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: spacing["2"],
    borderBottomStyle: { default: "solid", ":last-child": "solid" },
    borderBottomWidth: { default: "1px", ":last-child": "0px" },
    padding: spacing["4"],
    fontSize: fontSize.sm,
    lineHeight: leading.tight,
    whiteSpace: "nowrap",
    backgroundColor: { default: null, ":hover": theme.sidebarAccent },
    color: { default: null, ":hover": theme.sidebarAccentForeground },
    borderBottomColor: theme.border,
  },
  row3: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: spacing["2"],
  },
  text4: {
    marginLeft: "auto",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  },
  text5: {
    fontWeight: fontWeight.medium,
  },
  text6: {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    width: "260px",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    whiteSpace: "break-spaces",
  },
})

// This is sample data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Inbox",
      url: "#",
      icon: <Icon icon={InboxIcon} />,
      isActive: true,
    },
    {
      title: "Drafts",
      url: "#",
      icon: <Icon icon={FileIcon} />,
      isActive: false,
    },
    {
      title: "Sent",
      url: "#",
      icon: <Icon icon={SentIcon} />,
      isActive: false,
    },
    {
      title: "Junk",
      url: "#",
      icon: <Icon icon={ArchiveIcon} />,
      isActive: false,
    },
    {
      title: "Trash",
      url: "#",
      icon: <Icon icon={Delete02Icon} />,
      isActive: false,
    },
  ],
  mails: [
    {
      name: "William Smith",
      email: "williamsmith@example.com",
      subject: "Meeting Tomorrow",
      date: "09:34 AM",
      teaser:
        "Hi team, just a reminder about our meeting tomorrow at 10 AM.\nPlease come prepared with your project updates.",
    },
    {
      name: "Alice Smith",
      email: "alicesmith@example.com",
      subject: "Re: Project Update",
      date: "Yesterday",
      teaser:
        "Thanks for the update. The progress looks great so far.\nLet's schedule a call to discuss the next steps.",
    },
    {
      name: "Bob Johnson",
      email: "bobjohnson@example.com",
      subject: "Weekend Plans",
      date: "2 days ago",
      teaser:
        "Hey everyone! I'm thinking of organizing a team outing this weekend.\nWould you be interested in a hiking trip or a beach day?",
    },
    {
      name: "Emily Davis",
      email: "emilydavis@example.com",
      subject: "Re: Question about Budget",
      date: "2 days ago",
      teaser:
        "I've reviewed the budget numbers you sent over.\nCan we set up a quick call to discuss some potential adjustments?",
    },
    {
      name: "Michael Wilson",
      email: "michaelwilson@example.com",
      subject: "Important Announcement",
      date: "1 week ago",
      teaser:
        "Please join us for an all-hands meeting this Friday at 3 PM.\nWe have some exciting news to share about the company's future.",
    },
    {
      name: "Sarah Brown",
      email: "sarahbrown@example.com",
      subject: "Re: Feedback on Proposal",
      date: "1 week ago",
      teaser:
        "Thank you for sending over the proposal. I've reviewed it and have some thoughts.\nCould we schedule a meeting to discuss my feedback in detail?",
    },
    {
      name: "David Lee",
      email: "davidlee@example.com",
      subject: "New Project Idea",
      date: "1 week ago",
      teaser:
        "I've been brainstorming and came up with an interesting project concept.\nDo you have time this week to discuss its potential impact and feasibility?",
    },
    {
      name: "Olivia Wilson",
      email: "oliviawilson@example.com",
      subject: "Vacation Plans",
      date: "1 week ago",
      teaser:
        "Just a heads up that I'll be taking a two-week vacation next month.\nI'll make sure all my projects are up to date before I leave.",
    },
    {
      name: "James Martin",
      email: "jamesmartin@example.com",
      subject: "Re: Conference Registration",
      date: "1 week ago",
      teaser:
        "I've completed the registration for the upcoming tech conference.\nLet me know if you need any additional information from my end.",
    },
    {
      name: "Sophia White",
      email: "sophiawhite@example.com",
      subject: "Team Dinner",
      date: "1 week ago",
      teaser:
        "To celebrate our recent project success, I'd like to organize a team dinner.\nAre you available next Friday evening? Please let me know your preferences.",
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0])
  const [mails, setMails] = React.useState(data.mails)
  const { setOpen } = useSidebar()
  return (
    <Sidebar
      collapsible="icon"
      sx={styles.sidebar}
      innerSx={styles.sidebarInner}
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar collapsible="none" sx={styles.sidebar2}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                sx={styles.sidebarMenuButton}
                render={<a href="#" />}
              >
                <div sx={styles.row}>
                  <Icon
                    icon={CommandIcon}

                    sx={styles.icon}
                  />
                </div>
                <div sx={styles.grid}>
                  <span sx={styles.text}>Acme Inc</span>
                  <span sx={styles.text2}>Enterprise</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent sx={styles.sidebarGroupContent}>
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item)
                        const mail = data.mails.sort(() => Math.random() - 0.5)
                        setMails(
                          mail.slice(
                            0,
                            Math.max(5, Math.floor(Math.random() * 10) + 1)
                          )
                        )
                        setOpen(true)
                      }}
                      isActive={activeItem?.title === item.title}
                      sx={styles.sidebarMenuButton2}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" sx={styles.sidebar3}>
        <SidebarHeader sx={styles.sidebarHeader}>
          <div sx={styles.row2}>
            <div sx={styles.text3}>{activeItem?.title}</div>
            <Label sx={styles.label}>
              <span>Unreads</span>
              <Switch sx={styles.switch} />
            </Label>
          </div>
          <SidebarInput placeholder="Type to search..." />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup sx={styles.sidebarGroup}>
            <SidebarGroupContent>
              {mails.map((mail) => (
                <a href="#" key={mail.email} sx={styles.link}>
                  <div sx={styles.row3}>
                    <span>{mail.name}</span>{" "}
                    <span sx={styles.text4}>{mail.date}</span>
                  </div>
                  <span sx={styles.text5}>{mail.subject}</span>
                  <span sx={styles.text6}>{mail.teaser}</span>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
