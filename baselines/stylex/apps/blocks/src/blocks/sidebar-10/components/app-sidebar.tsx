import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import { NavFavorites } from "@/blocks/sidebar-10/components/nav-favorites"
import { NavMain } from "@/blocks/sidebar-10/components/nav-main"
import { NavSecondary } from "@/blocks/sidebar-10/components/nav-secondary"
import { NavWorkspaces } from "@/blocks/sidebar-10/components/nav-workspaces"
import { TeamSwitcher } from "@/blocks/sidebar-10/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@workspace/ui/components/sidebar"
import {
  AudioWave01Icon,
  CalendarIcon,
  CommandIcon,
  CubeIcon,
  Delete02Icon,
  HomeIcon,
  InboxIcon,
  MessageQuestionIcon,
  SearchIcon,
  Settings05Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"

const styles = stylex.create({
  navSecondary: {
    marginTop: "auto",
  },
})

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: <Icon icon={CommandIcon} />,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: <Icon icon={AudioWave01Icon} />,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: <Icon icon={CommandIcon} />,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: <Icon icon={SearchIcon} />,
    },
    {
      title: "Ask AI",
      url: "#",
      icon: <Icon icon={SparklesIcon} />,
    },
    {
      title: "Home",
      url: "#",
      icon: <Icon icon={HomeIcon} />,
      isActive: true,
    },
    {
      title: "Inbox",
      url: "#",
      icon: <Icon icon={InboxIcon} />,
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: <Icon icon={CalendarIcon} />,
    },
    {
      title: "Settings",
      url: "#",
      icon: <Icon icon={Settings05Icon} />,
    },
    {
      title: "Templates",
      url: "#",
      icon: <Icon icon={CubeIcon} />,
    },
    {
      title: "Trash",
      url: "#",
      icon: <Icon icon={Delete02Icon} />,
    },
    {
      title: "Help",
      url: "#",
      icon: <Icon icon={MessageQuestionIcon} />,
    },
  ],
  favorites: [
    {
      name: "Project Management & Task Tracking",
      url: "#",
      emoji: "📊",
    },
    {
      name: "Family Recipe Collection & Meal Planning",
      url: "#",
      emoji: "🍳",
    },
    {
      name: "Fitness Tracker & Workout Routines",
      url: "#",
      emoji: "💪",
    },
    {
      name: "Book Notes & Reading List",
      url: "#",
      emoji: "📚",
    },
    {
      name: "Sustainable Gardening Tips & Plant Care",
      url: "#",
      emoji: "🌱",
    },
    {
      name: "Language Learning Progress & Resources",
      url: "#",
      emoji: "🗣️",
    },
    {
      name: "Home Renovation Ideas & Budget Tracker",
      url: "#",
      emoji: "🏠",
    },
    {
      name: "Personal Finance & Investment Portfolio",
      url: "#",
      emoji: "💰",
    },
    {
      name: "Movie & TV Show Watchlist with Reviews",
      url: "#",
      emoji: "🎬",
    },
    {
      name: "Daily Habit Tracker & Goal Setting",
      url: "#",
      emoji: "✅",
    },
  ],
  workspaces: [
    {
      name: "Personal Life Management",
      emoji: "🏠",
      pages: [
        {
          name: "Daily Journal & Reflection",
          url: "#",
          emoji: "📔",
        },
        {
          name: "Health & Wellness Tracker",
          url: "#",
          emoji: "🍏",
        },
        {
          name: "Personal Growth & Learning Goals",
          url: "#",
          emoji: "🌟",
        },
      ],
    },
    {
      name: "Professional Development",
      emoji: "💼",
      pages: [
        {
          name: "Career Objectives & Milestones",
          url: "#",
          emoji: "🎯",
        },
        {
          name: "Skill Acquisition & Training Log",
          url: "#",
          emoji: "🧠",
        },
        {
          name: "Networking Contacts & Events",
          url: "#",
          emoji: "🤝",
        },
      ],
    },
    {
      name: "Creative Projects",
      emoji: "🎨",
      pages: [
        {
          name: "Writing Ideas & Story Outlines",
          url: "#",
          emoji: "✍️",
        },
        {
          name: "Art & Design Portfolio",
          url: "#",
          emoji: "🖼️",
        },
        {
          name: "Music Composition & Practice Log",
          url: "#",
          emoji: "🎵",
        },
      ],
    },
    {
      name: "Home Management",
      emoji: "🏡",
      pages: [
        {
          name: "Household Budget & Expense Tracking",
          url: "#",
          emoji: "💰",
        },
        {
          name: "Home Maintenance Schedule & Tasks",
          url: "#",
          emoji: "🔧",
        },
        {
          name: "Family Calendar & Event Planning",
          url: "#",
          emoji: "📅",
        },
      ],
    },
    {
      name: "Travel & Adventure",
      emoji: "🧳",
      pages: [
        {
          name: "Trip Planning & Itineraries",
          url: "#",
          emoji: "🗺️",
        },
        {
          name: "Travel Bucket List & Inspiration",
          url: "#",
          emoji: "🌎",
        },
        {
          name: "Travel Journal & Photo Gallery",
          url: "#",
          emoji: "📸",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.favorites} />
        <NavWorkspaces workspaces={data.workspaces} />
        <NavSecondary items={data.navSecondary} sx={styles.navSecondary} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
