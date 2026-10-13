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
import { HugeiconsIcon } from "@hugeicons/react"
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

const data = {
  nav: [
    {
      name: "Notifications",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={NotificationIcon}
        />
      ),
    },
    {
      name: "Navigation",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={Menu09Icon}
        />
      ),
    },
    {
      name: "Home",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={HomeIcon}
        />
      ),
    },
    {
      name: "Appearance",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={PaintBoardIcon}
        />
      ),
    },
    {
      name: "Messages & media",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={MessageIcon}
        />
      ),
    },
    {
      name: "Language & region",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={Globe02Icon}
        />
      ),
    },
    {
      name: "Accessibility",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={KeyboardIcon}
        />
      ),
    },
    {
      name: "Mark as read",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={Tick02Icon}
        />
      ),
    },
    {
      name: "Audio & video",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={RecordIcon}
        />
      ),
    },
    {
      name: "Connected accounts",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={LinkIcon}
        />
      ),
    },
    {
      name: "Privacy & visibility",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={ShieldIcon}
        />
      ),
    },
    {
      name: "Advanced",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={SettingsIcon}
        />
      ),
    },
  ],
}

export function SettingsDialog() {
  const [open, setOpen] = React.useState(true)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" />}>Open Dialog</DialogTrigger>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
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
          <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Messages & media</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
              {Array.from({
                length: 10,
              }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-video max-w-3xl rounded-xl bg-muted/50"
                />
              ))}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
