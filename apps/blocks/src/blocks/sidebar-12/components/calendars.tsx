import { css } from "@kirana-style/core"
import * as React from "react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@workspace/ui/components/sidebar"
import { ArrowRight01Icon, Tick02Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic"
import { duration, easing } from "@workspace/ui/tokens/motion"
import { spacing } from "@workspace/ui/tokens/spacing"
import { fontSize, lineHeight } from "@workspace/ui/tokens/typography"
import { peer } from "@workspace/ui/theme/markers"

const styles = {
  sidebarGroupLabel: css({
    width: "100%",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: {
      base: theme.sidebarForeground,
      ":hover": theme.sidebarAccentForeground,
    },
    backgroundColor: { ":hover": theme.sidebarAccent },
  }),
  icon: css({
    marginLeft: "auto",
    transitionProperty: "transform, translate, scale, rotate",
    transitionTimingFunction: easing.inOut,
    transitionDuration: duration["150"],
    // The Collapsible carries the default marker; `data-open` is Base UI's.
    rotate: { [peer.within("[data-open]")]: "90deg" },
  }),
  row: css({
    display: "flex",
    aspectRatio: "1 / 1",
    width: spacing["4"],
    height: spacing["4"],
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.sm,
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: {
      base: theme.sidebarBorder,
      '[data-active="true"]': theme.sidebarPrimary,
    },
    color: theme.sidebarPrimaryForeground,
    backgroundColor: {
      '[data-active="true"]': theme.sidebarPrimary,
    },
  }),
  icon2: css({
    // The item box carries the default marker (`group/calendar-item`).
    display: {
      base: "none",
      [peer.within('[data-active="true"]')]: "block",
    },
    width: spacing["3"],
    height: spacing["3"],
  }),
  sidebarSeparator: css({
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
  }),
}

export function Calendars({
  calendars,
}: {
  calendars: {
    name: string
    items: string[]
  }[]
}) {
  return (
    <>
      {calendars.map((calendar, index) => (
        <React.Fragment key={calendar.name}>
          <SidebarGroup key={calendar.name}>
            <Collapsible defaultOpen={index === 0} sx={peer.anchor}>
              <SidebarGroupLabel
                sx={styles.sidebarGroupLabel}
                render={<CollapsibleTrigger />}
              >
                {calendar.name}{" "}
                <Icon
                  icon={ArrowRight01Icon}

                  sx={styles.icon}
                />
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {calendar.items.map((item, itemIndex) => (
                      <SidebarMenuItem key={item}>
                        <SidebarMenuButton>
                          <div
                            data-active={itemIndex < 2}
                            sx={[peer.anchor, styles.row]}
                          >
                            <Icon
                              icon={Tick02Icon}

                              sx={styles.icon2}
                            />
                          </div>
                          {item}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
          <SidebarSeparator sx={styles.sidebarSeparator} />
        </React.Fragment>
      ))}
    </>
  )
}
