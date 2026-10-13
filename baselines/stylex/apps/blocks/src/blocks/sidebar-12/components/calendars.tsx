import * as stylex from "@stylexjs/stylex"
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
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { duration, easing } from "@workspace/ui/tokens/motion.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { fontSize, lineHeight } from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  sidebarGroupLabel: {
    width: "100%",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: {
      default: theme.sidebarForeground,
      ":hover": theme.sidebarAccentForeground,
    },
    backgroundColor: { default: null, ":hover": theme.sidebarAccent },
  },
  icon: {
    marginLeft: "auto",
    transitionProperty: "transform, translate, scale, rotate",
    transitionTimingFunction: easing.inOut,
    transitionDuration: duration["150"],
    // The Collapsible carries the default marker; `data-open` is Base UI's.
    rotate: { default: null, [stylex.when.ancestor("[data-open]")]: "90deg" },
  },
  row: {
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
      default: theme.sidebarBorder,
      '[data-active="true"]': theme.sidebarPrimary,
    },
    color: theme.sidebarPrimaryForeground,
    backgroundColor: {
      default: null,
      '[data-active="true"]': theme.sidebarPrimary,
    },
  },
  icon2: {
    // The item box carries the default marker (`group/calendar-item`).
    display: {
      default: "none",
      [stylex.when.ancestor('[data-active="true"]')]: "block",
    },
    width: spacing["3"],
    height: spacing["3"],
  },
  sidebarSeparator: {
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
  },
})

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
            <Collapsible defaultOpen={index === 0} sx={stylex.defaultMarker()}>
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
                            sx={[stylex.defaultMarker(), styles.row]}
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
