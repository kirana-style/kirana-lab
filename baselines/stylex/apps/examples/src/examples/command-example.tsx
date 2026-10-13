import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import { Example, ExampleWrapper } from "@/components/example"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@workspace/ui/components/command"
import {
  CalculatorIcon,
  CalendarIcon,
  ClipboardIcon,
  CodeIcon,
  CopyIcon,
  CreditCardIcon,
  DeleteIcon,
  File02Icon,
  FolderAddIcon,
  FolderIcon,
  GridIcon,
  HelpCircleIcon,
  HomeIcon,
  ImageIcon,
  InboxIcon,
  Menu05Icon,
  NotificationIcon,
  PlusSignIcon,
  ScissorIcon,
  SettingsIcon,
  SmileIcon,
  UserIcon,
  ZoomInAreaIcon,
  ZoomOutAreaIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  card: {
    width: "100%",
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
  },
  cardContent: {
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["4"],
  },
  button: {
    width: "fit-content",
  },
})

export default function CommandExample() {
  return (
    <ExampleWrapper>
      <CommandInline />
      <CommandBasic />
      <CommandWithShortcuts />
      <CommandWithGroups />
      <CommandManyItems />
    </ExampleWrapper>
  )
}

function CommandInline() {
  return (
    <Example title="Inline">
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Icon icon={CalendarIcon} />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Icon icon={SmileIcon} />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <Icon icon={CalculatorIcon} />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <Icon icon={UserIcon} />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Icon icon={CreditCardIcon} />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Icon icon={SettingsIcon} />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CardContent>
      </Card>
    </Example>
  )
}

function CommandBasic() {
  const [open, setOpen] = React.useState(false)

  return (
    <Example title="Basic">
      <div sx={styles.stack}>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          sx={styles.button}
        >
          Open Menu
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search Emoji</CommandItem>
                <CommandItem>Calculator</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </Example>
  )
}

function CommandWithShortcuts() {
  const [open, setOpen] = React.useState(false)

  return (
    <Example title="With Shortcuts">
      <div sx={styles.stack}>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          sx={styles.button}
        >
          Open Menu
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Settings">
                <CommandItem>
                  <Icon icon={UserIcon} />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Icon icon={CreditCardIcon} />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Icon icon={SettingsIcon} />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </Example>
  )
}

function CommandWithGroups() {
  const [open, setOpen] = React.useState(false)

  return (
    <Example title="With Groups">
      <div sx={styles.stack}>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          sx={styles.button}
        >
          Open Menu
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <Icon icon={CalendarIcon} />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Icon icon={SmileIcon} />
                  <span>Search Emoji</span>
                </CommandItem>
                <CommandItem>
                  <Icon icon={CalculatorIcon} />
                  <span>Calculator</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>
                  <Icon icon={UserIcon} />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Icon icon={CreditCardIcon} />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Icon icon={SettingsIcon} />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </Example>
  )
}

function CommandManyItems() {
  const [open, setOpen] = React.useState(false)

  return (
    <Example title="Many Groups & Items">
      <div sx={styles.stack}>
        <Button
          onClick={() => setOpen(true)}
          variant="outline"
          sx={styles.button}
        >
          Open Menu
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Navigation">
                <CommandItem>
                  <Icon icon={HomeIcon} />
                  <span>Home</span>
                  <CommandShortcut>⌘H</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Icon icon={InboxIcon} />
                  <span>Inbox</span>
                  <CommandShortcut>⌘I</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Icon icon={File02Icon} />
                  <span>Documents</span>
                  <CommandShortcut>⌘D</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Icon icon={FolderIcon} />
                  <span>Folders</span>
                  <CommandShortcut>⌘F</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem>
                  <Icon icon={PlusSignIcon} />
                  <span>New File</span>
                  <CommandShortcut>⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Icon icon={FolderAddIcon} />
                  <span>New Folder</span>
                  <CommandShortcut>⇧⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Icon icon={CopyIcon} />
                  <span>Copy</span>
                  <CommandShortcut>⌘C</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Icon icon={ScissorIcon} />
                  <span>Cut</span>
                  <CommandShortcut>⌘X</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Icon icon={ClipboardIcon} />
                  <span>Paste</span>
                  <CommandShortcut>⌘V</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Icon icon={DeleteIcon} />
                  <span>Delete</span>
                  <CommandShortcut>⌫</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="View">
                <CommandItem>
                  <Icon icon={GridIcon} />
                  <span>Grid View</span>
                </CommandItem>
                <CommandItem>
                  <Icon icon={Menu05Icon} />
                  <span>List View</span>
                </CommandItem>
                <CommandItem>
                  <Icon icon={ZoomInAreaIcon} />
                  <span>Zoom In</span>
                  <CommandShortcut>⌘+</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Icon icon={ZoomOutAreaIcon} />
                  <span>Zoom Out</span>
                  <CommandShortcut>⌘-</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Account">
                <CommandItem>
                  <Icon icon={UserIcon} />
                  <span>Profile</span>
                  <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Icon icon={CreditCardIcon} />
                  <span>Billing</span>
                  <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Icon icon={SettingsIcon} />
                  <span>Settings</span>
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <Icon icon={NotificationIcon} />
                  <span>Notifications</span>
                </CommandItem>
                <CommandItem>
                  <Icon icon={HelpCircleIcon} />
                  <span>Help & Support</span>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Tools">
                <CommandItem>
                  <Icon icon={CalculatorIcon} />
                  <span>Calculator</span>
                </CommandItem>
                <CommandItem>
                  <Icon icon={CalendarIcon} />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Icon icon={ImageIcon} />
                  <span>Image Editor</span>
                </CommandItem>
                <CommandItem>
                  <Icon icon={CodeIcon} />
                  <span>Code Editor</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </Example>
  )
}
