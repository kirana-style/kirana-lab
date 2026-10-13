import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar"
import { PlusSignIcon, UnfoldMoreIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  sidebarMenuButton: {
    // The menu button's own states are restated alongside the open menu:
    // an sx value replaces the whole property.
    backgroundColor: {
      default: null,
      ":hover": theme.sidebarAccent,
      ":active": theme.sidebarAccent,
      "[data-popup-open]": theme.sidebarAccent,
      "[data-open]": theme.sidebarAccent,
      "[data-active]": theme.sidebarAccent,
    },
    color: {
      default: null,
      ":hover": theme.sidebarAccentForeground,
      ":active": theme.sidebarAccentForeground,
      "[data-popup-open]": theme.sidebarAccentForeground,
      "[data-active]": theme.sidebarAccentForeground,
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
  },
  dropdownMenuContent: {
    width: "fit-content",
  },
  dropdownMenuLabel: {
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  },
  dropdownMenuItem: {
    rowGap: spacing["2"],
    columnGap: spacing["2"],
    paddingTop: spacing["2"],
    paddingBottom: spacing["2"],
    paddingInlineStart: spacing["2"],
    paddingInlineEnd: spacing["2"],
  },
  row2: {
    display: "flex",
    width: spacing["6"],
    height: spacing["6"],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: theme.border,
  },
  row3: {
    display: "flex",
    width: spacing["6"],
    height: spacing["6"],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    borderStyle: "solid",
    borderWidth: "1px",
    backgroundColor: "transparent",
    borderColor: theme.border,
  },
  icon2: {
    width: spacing["4"],
    height: spacing["4"],
  },
  text3: {
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
  },
})

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ReactNode
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])
  if (!activeTeam) {
    return null
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton size="lg" sx={styles.sidebarMenuButton} />
            }
          >
            <div sx={styles.row}>{activeTeam.logo}</div>
            <div sx={styles.grid}>
              <span sx={styles.text}>{activeTeam.name}</span>
              <span sx={styles.text2}>{activeTeam.plan}</span>
            </div>
            <Icon
              icon={UnfoldMoreIcon}

              sx={styles.icon}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            sx={styles.dropdownMenuContent}
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel sx={styles.dropdownMenuLabel}>
                Teams
              </DropdownMenuLabel>
              {teams.map((team, index) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => setActiveTeam(team)}
                  sx={styles.dropdownMenuItem}
                >
                  <div sx={styles.row2}>{team.logo}</div>
                  {team.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem sx={styles.dropdownMenuItem}>
                <div sx={styles.row3}>
                  <Icon
                    icon={PlusSignIcon}

                    sx={styles.icon2}
                  />
                </div>
                <div sx={styles.text3}>Add team</div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
