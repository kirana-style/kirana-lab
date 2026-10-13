import { css } from "@kirana-style/core"
import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChartIcon,
  Copy01Icon,
  Delete02Icon,
  DeleteIcon,
  File01Icon,
  LayoutBottomIcon,
  LinkIcon,
  MoreHorizontalCircle01Icon,
  NotificationIcon,
  RedoIcon,
  Settings05Icon,
  StarIcon,
  UndoIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography"

const styles = {
  row: css({
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  text: css({
    display: { base: "none", [breakpoint.md]: "inline-block" },
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
  }),
  button: css({
    height: spacing["7"],
    width: spacing["7"],
  }),
  button2: css({
    height: spacing["7"],
    width: spacing["7"],
    // The open popover's fill; the ghost button keeps its own hover fill.
    backgroundColor: { "[data-popup-open]": theme.accent },
  }),
  popoverContent: css({
    width: spacing["56"],
    overflowX: "hidden",
    overflowY: "hidden",
    borderStartStartRadius: radius.lg,
    borderStartEndRadius: radius.lg,
    borderEndStartRadius: radius.lg,
    borderEndEndRadius: radius.lg,
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
  }),
  sidebar: css({
    backgroundColor: "transparent",
    // Outside a SidebarProvider the original's width variable is unset, so the
    // sidebar stretches to the popover instead of its 16rem default.
    width: "auto",
  }),
  sidebarGroup: css({
    borderBottomStyle: { base: "solid", ":last-child": "none" },
    borderBottomWidth: "1px",
    borderBottomColor: theme.border,
  }),
  sidebarGroupContent: css({
    rowGap: "0px",
    columnGap: "0px",
  }),
}

const data = [
  [
    {
      label: "Customize Page",
      icon: <Icon icon={Settings05Icon} />,
    },
    {
      label: "Turn into wiki",
      icon: <Icon icon={File01Icon} />,
    },
  ],
  [
    {
      label: "Copy Link",
      icon: <Icon icon={LinkIcon} />,
    },
    {
      label: "Duplicate",
      icon: <Icon icon={Copy01Icon} />,
    },
    {
      label: "Move to",
      icon: <Icon icon={RedoIcon} />,
    },
    {
      label: "Move to Trash",
      icon: <Icon icon={Delete02Icon} />,
    },
  ],
  [
    {
      label: "Undo",
      icon: <Icon icon={UndoIcon} />,
    },
    {
      label: "View analytics",
      icon: <Icon icon={ChartIcon} />,
    },
    {
      label: "Version History",
      icon: <Icon icon={LayoutBottomIcon} />,
    },
    {
      label: "Show delete pages",
      icon: <Icon icon={DeleteIcon} />,
    },
    {
      label: "Notifications",
      icon: <Icon icon={NotificationIcon} />,
    },
  ],
  [
    {
      label: "Import",
      icon: <Icon icon={ArrowUpIcon} />,
    },
    {
      label: "Export",
      icon: <Icon icon={ArrowDownIcon} />,
    },
  ],
]
export function NavActions() {
  // Opens once the page has hydrated, as the original effect did, without a
  // synchronous state update inside an effect.
  const [isOpen, setIsOpen] = React.useState(false)
  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setIsOpen(true))
    return () => cancelAnimationFrame(frame)
  }, [])
  return (
    <div sx={styles.row}>
      <div sx={styles.text}>Edit Oct 08</div>
      <Button variant="ghost" size="icon" sx={styles.button}>
        <Icon icon={StarIcon} />
      </Button>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger
          render={<Button variant="ghost" size="icon" sx={styles.button2} />}
        >
          <Icon icon={MoreHorizontalCircle01Icon} />
        </PopoverTrigger>
        <PopoverContent sx={styles.popoverContent} align="end">
          <Sidebar collapsible="none" sx={styles.sidebar}>
            <SidebarContent>
              {data.map((group, index) => (
                <SidebarGroup key={index} sx={styles.sidebarGroup}>
                  <SidebarGroupContent sx={styles.sidebarGroupContent}>
                    <SidebarMenu>
                      {group.map((item, itemIndex) => (
                        <SidebarMenuItem key={itemIndex}>
                          <SidebarMenuButton>
                            {item.icon} <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>
  )
}
