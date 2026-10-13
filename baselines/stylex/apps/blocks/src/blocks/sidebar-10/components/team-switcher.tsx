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
} from "@workspace/ui/components/sidebar"
import { ArrowDown01Icon, PlusSignIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  sidebarMenuButton: {
    width: "fit-content",
    paddingInlineStart: spacing["1.5"],
    paddingInlineEnd: spacing["1.5"],
  },
  row: {
    display: "flex",
    aspectRatio: "1 / 1",
    width: spacing["5"],
    height: spacing["5"],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    backgroundColor: theme.sidebarPrimary,
    color: theme.sidebarPrimaryForeground,
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
  },
  icon: {
    opacity: "50%",
  },
  dropdownMenuContent: {
    width: spacing["64"],
    borderStartStartRadius: radius.lg,
    borderStartEndRadius: radius.lg,
    borderEndStartRadius: radius.lg,
    borderEndEndRadius: radius.lg,
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
    borderRadius: "0.125rem",
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
    backgroundColor: theme.background,
    borderColor: theme.border,
  },
  icon2: {
    width: spacing["4"],
    height: spacing["4"],
  },
  text2: {
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
  const [activeTeam, setActiveTeam] = React.useState(teams[0])
  if (!activeTeam) {
    return null
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<SidebarMenuButton sx={styles.sidebarMenuButton} />}
          >
            <div sx={styles.row}>{activeTeam.logo}</div>
            <span sx={styles.text}>{activeTeam.name}</span>
            <Icon
              icon={ArrowDown01Icon}

              sx={styles.icon}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            sx={styles.dropdownMenuContent}
            align="start"
            side="bottom"
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
                <div sx={styles.text2}>Add team</div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
