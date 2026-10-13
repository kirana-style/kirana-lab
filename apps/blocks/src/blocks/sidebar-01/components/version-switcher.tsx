import { css } from "@kirana-style/core"
import * as React from "react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import {
  LayoutBottomIcon,
  Tick02Icon,
  UnfoldMoreIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"
import { fontWeight } from "@workspace/ui/tokens/typography"

const styles = {
  sidebarMenuButton: css({
    // The open menu's own fill; the button keeps its hover, active and open
    // states, which merge in beside it.
    backgroundColor: {
      "[data-popup-open]": theme.sidebarAccent,
    },
    color: {
      "[data-popup-open]": theme.sidebarAccentForeground,
    },
  }),
  row: css({
    display: "flex",
    aspectRatio: "1 / 1",
    width: spacing["8"],
    height: spacing["8"],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    backgroundColor: theme.sidebarPrimary,
    color: theme.sidebarPrimaryForeground,
  }),
  icon: css({
    width: spacing["4"],
    height: spacing["4"],
  }),
  stack: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing["0.5"],
    lineHeight: 1,
  }),
  text: css({
    fontWeight: fontWeight.medium,
  }),
  icon2: css({
    marginLeft: "auto",
  }),
}

export function VersionSwitcher({
  versions,
  defaultVersion,
}: {
  versions: string[]
  defaultVersion: string
}) {
  const [selectedVersion, setSelectedVersion] = React.useState(defaultVersion)
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton size="lg" sx={styles.sidebarMenuButton} />
            }
          >
            <div sx={styles.row}>
              <Icon
                icon={LayoutBottomIcon}

                sx={styles.icon}
              />
            </div>
            <div sx={styles.stack}>
              <span sx={styles.text}>Documentation</span>
              <span>v{selectedVersion}</span>
            </div>
            <Icon
              icon={UnfoldMoreIcon}

              sx={styles.icon2}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {versions.map((version) => (
              <DropdownMenuItem
                key={version}
                onSelect={() => setSelectedVersion(version)}
              >
                v{version}{" "}
                {version === selectedVersion && (
                  <Icon
                    icon={Tick02Icon}

                    sx={styles.icon2}
                  />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
