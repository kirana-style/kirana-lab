import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@workspace/ui/components/sidebar"
import {
  Globe02Icon,
  HomeIcon,
  KeyboardIcon,
  LinkIcon,
  Menu09Icon,
  MessageIcon,
  NotificationIcon,
  PaintBoardIcon,
  RecordIcon,
  SettingsIcon,
  ShieldIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { alpha, radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { duration } from "@workspace/ui/tokens/motion.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { mergeSx } from "@workspace/ui/lib/sx"

const styles = stylex.create({
  dialogContent: {
    overflowX: "hidden",
    overflowY: "hidden",
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
    maxHeight: { default: null, [breakpoint.md]: "500px" },
    // The dialog's own narrow-screen width is restated.
    maxWidth: {
      default: "calc(100% - 2rem)",
      "@media (min-width: 48rem) and (max-width: 63.999rem)": "700px",
      [breakpoint.lg]: "800px",
    },
  },
  dialogTitle: {
    position: "absolute",
    width: "1px",
    height: "1px",
    paddingTop: 0,
    paddingBottom: 0,
    paddingInlineStart: 0,
    paddingInlineEnd: 0,
    marginTop: "-1px",
    marginBottom: "-1px",
    marginInlineStart: "-1px",
    marginInlineEnd: "-1px",
    overflowX: "hidden",
    overflowY: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderInlineStartWidth: 0,
    borderInlineEndWidth: 0,
    borderTopColor: theme.border,
    borderBottomColor: theme.border,
    borderInlineStartColor: theme.border,
    borderInlineEndColor: theme.border,
  },
  sidebarProvider: {
    alignItems: "flex-start",
  },
  sidebar: {
    display: { default: "none", [breakpoint.md]: "flex" },
  },
  main: {
    display: "flex",
    height: "480px",
    flex: 1,
    flexDirection: "column",
    overflow: "hidden",
  },
  header: {
    display: "flex",
    // The SidebarProvider carries the default marker.
    height: {
      default: spacing["16"],
      [stylex.when.ancestor(':has([data-collapsible="icon"])')]: spacing["12"],
    },
    flexShrink: 0,
    alignItems: "center",
    gap: spacing["2"],
    transitionProperty: "width,height",
    transitionTimingFunction: "linear",
    transitionDuration: duration["150"],
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
    paddingInline: spacing["4"],
  },
  breadcrumbItem: {
    display: { default: "none", [breakpoint.md]: "block" },
  },
  stack: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacing["4"],
    overflowY: "auto",
    paddingTop: "0px",
    paddingBottom: spacing["4"],
    paddingInlineStart: spacing["4"],
    paddingInlineEnd: spacing["4"],
  },
  box: {
    aspectRatio: "16 / 9",
    maxWidth: "48rem",
    borderRadius: radius.xl,
    backgroundColor: alpha.muted50,
  },
})

const data = {
  nav: [
    {
      name: "Notifications",
      icon: <Icon icon={NotificationIcon} />,
    },
    {
      name: "Navigation",
      icon: <Icon icon={Menu09Icon} />,
    },
    {
      name: "Home",
      icon: <Icon icon={HomeIcon} />,
    },
    {
      name: "Appearance",
      icon: <Icon icon={PaintBoardIcon} />,
    },
    {
      name: "Messages & media",
      icon: <Icon icon={MessageIcon} />,
    },
    {
      name: "Language & region",
      icon: <Icon icon={Globe02Icon} />,
    },
    {
      name: "Accessibility",
      icon: <Icon icon={KeyboardIcon} />,
    },
    {
      name: "Mark as read",
      icon: <Icon icon={Tick02Icon} />,
    },
    {
      name: "Audio & video",
      icon: <Icon icon={RecordIcon} />,
    },
    {
      name: "Connected accounts",
      icon: <Icon icon={LinkIcon} />,
    },
    {
      name: "Privacy & visibility",
      icon: <Icon icon={ShieldIcon} />,
    },
    {
      name: "Advanced",
      icon: <Icon icon={SettingsIcon} />,
    },
  ],
}

export function SettingsDialog() {
  const [open, setOpen] = React.useState(true)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" />}>Open Dialog</DialogTrigger>
      <DialogContent sx={styles.dialogContent}>
        <DialogTitle sx={styles.dialogTitle}>Settings</DialogTitle>
        <DialogDescription sx={styles.dialogTitle}>
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider
          sx={mergeSx(stylex.defaultMarker(), styles.sidebarProvider)}
        >
          <Sidebar collapsible="none" sx={styles.sidebar}>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          isActive={item.name === "Messages & media"}
                          render={<a href="#" />}
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main sx={styles.main}>
            <header sx={styles.header}>
              <div sx={styles.row}>
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem sx={styles.breadcrumbItem}>
                      <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator sx={styles.breadcrumbItem} />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Messages & media</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div sx={styles.stack}>
              {Array.from({
                length: 10,
              }).map((_, i) => (
                <div key={i} sx={styles.box} />
              ))}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
