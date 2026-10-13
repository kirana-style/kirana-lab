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
import { HugeiconsIcon } from "@hugeicons/react"
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

const data = [
  [
    {
      label: "Customize Page",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={Settings05Icon}
        />
      ),
    },
    {
      label: "Turn into wiki",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={File01Icon}
        />
      ),
    },
  ],
  [
    {
      label: "Copy Link",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={LinkIcon}
        />
      ),
    },
    {
      label: "Duplicate",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={Copy01Icon}
        />
      ),
    },
    {
      label: "Move to",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={RedoIcon}
        />
      ),
    },
    {
      label: "Move to Trash",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={Delete02Icon}
        />
      ),
    },
  ],
  [
    {
      label: "Undo",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={UndoIcon}
        />
      ),
    },
    {
      label: "View analytics",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={ChartIcon}
        />
      ),
    },
    {
      label: "Version History",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={LayoutBottomIcon}
        />
      ),
    },
    {
      label: "Show delete pages",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={DeleteIcon}
        />
      ),
    },
    {
      label: "Notifications",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={NotificationIcon}
        />
      ),
    },
  ],
  [
    {
      label: "Import",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={ArrowUpIcon}
        />
      ),
    },
    {
      label: "Export",
      icon: (
        <HugeiconsIcon
          strokeWidth={2}

          icon={ArrowDownIcon}
        />
      ),
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
    <div className="flex items-center gap-2 text-sm">
      <div className="hidden font-medium text-muted-foreground md:inline-block">
        Edit Oct 08
      </div>
      <Button variant="ghost" size="icon" className="h-7 w-7">
        <HugeiconsIcon
          strokeWidth={2}

          icon={StarIcon}
        />
      </Button>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 data-popup-open:bg-accent"
            />
          }
        >
          <HugeiconsIcon
            strokeWidth={2}

            icon={MoreHorizontalCircle01Icon}
          />
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0"
          align="end"
        >
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent>
              {data.map((group, index) => (
                <SidebarGroup key={index} className="border-b last:border-none">
                  <SidebarGroupContent className="gap-0">
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
