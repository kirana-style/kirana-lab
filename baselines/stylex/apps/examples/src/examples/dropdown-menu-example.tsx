import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import { Example, ExampleWrapper } from "@/components/example"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  ActivityIcon,
  AddCircleIcon,
  Archive02Icon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
  BankIcon,
  CheckmarkBadgeIcon,
  ClipboardIcon,
  CopyIcon,
  CreditCardIcon,
  DeleteIcon,
  EditIcon,
  HelpCircleIcon,
  LayoutIcon,
  LayoutLeftIcon,
  LogoutIcon,
  MailIcon,
  MessageIcon,
  NotificationIcon,
  ScissorIcon,
  SettingsIcon,
  ShareIcon,
  UnfoldMoreIcon,
  UserGroupIcon,
  UserIcon,
  WalletIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  button: {
    width: "fit-content",
  },
  example: {
    gridColumnStart: "span 2",
    gridColumnEnd: "span 2",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing["2"],
  },
  button2: {
    width: "fit-content",
    textTransform: "capitalize",
  },
  dropdownMenuContent: {
    minWidth: spacing["40"],
  },
  dropdownMenuContent2: {
    minWidth: spacing["56"],
  },
  row2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing["4"],
  },
  button3: {
    height: spacing["12"],
    justifyContent: "flex-start",
    paddingInlineStart: spacing["2"],
    paddingInlineEnd: spacing["2"],
    maxWidth: { default: null, [breakpoint.md]: "200px" },
  },
  avatarFallback: {
    borderStartStartRadius: radius.lg,
    borderStartEndRadius: radius.lg,
    borderEndStartRadius: radius.lg,
    borderEndEndRadius: radius.lg,
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
    fontWeight: fontWeight.semibold,
  },
  text2: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  },
  icon: {
    marginLeft: "auto",
    color: theme.mutedForeground,
  },
  dropdownMenuContent3: {
    width: "var(--anchor-width)",
    minWidth: spacing["56"],
  },
  button4: {
    borderStartStartRadius: "calc(infinity * 1px)",
    borderStartEndRadius: "calc(infinity * 1px)",
    borderEndStartRadius: "calc(infinity * 1px)",
    borderEndEndRadius: "calc(infinity * 1px)",
  },
  dropdownMenuContent4: {
    width: spacing["44"],
  },
  dropdownMenuContent5: {
    width: spacing["56"],
  },
})

export default function DropdownMenuExample() {
  return (
    <ExampleWrapper>
      <DropdownMenuBasic />
      <DropdownMenuComplex />
      <DropdownMenuSides />
      <DropdownMenuWithIcons />
      <DropdownMenuWithShortcuts />
      <DropdownMenuWithSubmenu />
      <DropdownMenuWithCheckboxes />
      <DropdownMenuWithCheckboxesIcons />
      <DropdownMenuWithRadio />
      <DropdownMenuWithRadioIcons />
      <DropdownMenuWithDestructive />
      <DropdownMenuWithAvatar />
      <DropdownMenuInDialog />
      <DropdownMenuWithInset />
    </ExampleWrapper>
  )
}

function DropdownMenuBasic() {
  return (
    <Example title="Basic">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" sx={styles.button} />}
        >
          Open
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>
  )
}

function DropdownMenuSides() {
  return (
    <Example title="Sides" containerSx={styles.example}>
      <div sx={styles.row}>
        {(
          [
            "inline-start",
            "left",
            "top",
            "bottom",
            "right",
            "inline-end",
          ] as const
        ).map((side) => (
          <DropdownMenu key={side}>
            <DropdownMenuTrigger
              render={<Button variant="outline" sx={styles.button2} />}
            >
              {side.replace("-", " ")}
            </DropdownMenuTrigger>
            <DropdownMenuContent side={side}>
              <DropdownMenuGroup>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
    </Example>
  )
}

function DropdownMenuWithIcons() {
  return (
    <Example title="With Icons">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" sx={styles.button} />}
        >
          Open
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Icon icon={UserIcon} />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon icon={CreditCardIcon} />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon icon={SettingsIcon} />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Icon icon={LogoutIcon} />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>
  )
}

function DropdownMenuWithShortcuts() {
  return (
    <Example title="With Shortcuts">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" sx={styles.button} />}
        >
          Open
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Keyboard shortcuts
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>
  )
}

function DropdownMenuWithSubmenu() {
  return (
    <Example title="With Submenu">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" sx={styles.button} />}
        >
          Open
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Message</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>More...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              New Team
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>
  )
}

function DropdownMenuWithCheckboxes() {
  const [showStatusBar, setShowStatusBar] = React.useState(true)
  const [showActivityBar, setShowActivityBar] = React.useState(false)
  const [showPanel, setShowPanel] = React.useState(false)

  return (
    <Example title="With Checkboxes">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" sx={styles.button} />}
        >
          Checkboxes
        </DropdownMenuTrigger>
        <DropdownMenuContent sx={styles.dropdownMenuContent}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              <Icon icon={LayoutIcon} />
              Status Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
              disabled
            >
              <Icon icon={ActivityIcon} />
              Activity Bar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              <Icon icon={LayoutLeftIcon} />
              Panel
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>
  )
}

function DropdownMenuWithRadio() {
  const [position, setPosition] = React.useState("bottom")

  return (
    <Example title="With Radio Group">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" sx={styles.button} />}
        >
          Radio Group
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value="top">
                <Icon icon={ArrowUp01Icon} />
                Top
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">
                <Icon icon={ArrowDown01Icon} />
                Bottom
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right" disabled>
                <Icon icon={ArrowRight01Icon} />
                Right
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>
  )
}

function DropdownMenuWithCheckboxesIcons() {
  const [notifications, setNotifications] = React.useState({
    email: true,
    sms: false,
    push: true,
  })

  return (
    <Example title="Checkboxes with Icons">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" sx={styles.button} />}
        >
          Notifications
        </DropdownMenuTrigger>
        <DropdownMenuContent sx={styles.dropdownMenuContent2}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Notification Preferences</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={notifications.email}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, email: checked === true })
              }
            >
              <Icon icon={MailIcon} />
              Email notifications
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={notifications.sms}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, sms: checked === true })
              }
            >
              <Icon icon={MessageIcon} />
              SMS notifications
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={notifications.push}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, push: checked === true })
              }
            >
              <Icon icon={NotificationIcon} />
              Push notifications
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>
  )
}

function DropdownMenuWithRadioIcons() {
  const [paymentMethod, setPaymentMethod] = React.useState("card")

  return (
    <Example title="Radio with Icons">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" sx={styles.button} />}
        >
          Payment Method
        </DropdownMenuTrigger>
        <DropdownMenuContent sx={styles.dropdownMenuContent2}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Select Payment Method</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
            >
              <DropdownMenuRadioItem value="card">
                <Icon icon={CreditCardIcon} />
                Credit Card
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="paypal">
                <Icon icon={WalletIcon} />
                PayPal
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bank">
                <Icon icon={BankIcon} />
                Bank Transfer
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>
  )
}

function DropdownMenuWithDestructive() {
  return (
    <Example title="With Destructive Items">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" sx={styles.button} />}
        >
          Actions
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Icon icon={EditIcon} />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon icon={ShareIcon} />
            Share
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Icon icon={Archive02Icon} />
            Archive
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            <Icon icon={DeleteIcon} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>
  )
}

function DropdownMenuWithAvatar() {
  const menuContent = (
    <>
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Icon icon={CheckmarkBadgeIcon} />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon icon={CreditCardIcon} />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon icon={NotificationIcon} />
          Notifications
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Icon icon={LogoutIcon} />
        Sign Out
      </DropdownMenuItem>
    </>
  )

  return (
    <Example title="With Avatar">
      <div sx={styles.row2}>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="outline" sx={styles.button3} />}
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
              <AvatarFallback sx={styles.avatarFallback}>CN</AvatarFallback>
            </Avatar>
            <div sx={styles.grid}>
              <span sx={styles.text}>shadcn</span>
              <span sx={styles.text2}>shadcn@example.com</span>
            </div>
            <Icon
              icon={UnfoldMoreIcon}

              sx={styles.icon}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent sx={styles.dropdownMenuContent3}>
            {menuContent}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="ghost" size="icon" sx={styles.button4} />}
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top">
            {menuContent}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Example>
  )
}

function DropdownMenuInDialog() {
  return (
    <Example title="In Dialog">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Open Dialog
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dropdown Menu Example</DialogTitle>
            <DialogDescription>
              Click the button below to see the dropdown menu.
            </DialogDescription>
          </DialogHeader>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" sx={styles.button} />}
            >
              Open Menu
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Icon icon={CopyIcon} />
                Copy
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon icon={ScissorIcon} />
                Cut
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon icon={ClipboardIcon} />
                Paste
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Save Page...</DropdownMenuItem>
                    <DropdownMenuItem>Create Shortcut...</DropdownMenuItem>
                    <DropdownMenuItem>Name Window...</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Developer Tools</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Icon icon={DeleteIcon} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DialogContent>
      </Dialog>
    </Example>
  )
}

function DropdownMenuWithInset() {
  const [showBookmarks, setShowBookmarks] = React.useState(true)
  const [showUrls, setShowUrls] = React.useState(false)
  const [themeMode, setTheme] = React.useState("system")

  return (
    <Example title="With Inset">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" sx={styles.button} />}
        >
          Open
        </DropdownMenuTrigger>
        <DropdownMenuContent sx={styles.dropdownMenuContent4}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Icon icon={CopyIcon} />
              Copy
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon icon={ScissorIcon} />
              Cut
            </DropdownMenuItem>
            <DropdownMenuItem inset>Paste</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel inset>Appearance</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              inset
              checked={showBookmarks}
              onCheckedChange={setShowBookmarks}
            >
              Bookmarks
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              inset
              checked={showUrls}
              onCheckedChange={setShowUrls}
            >
              Full URLs
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel inset>Theme</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={themeMode} onValueChange={setTheme}>
              <DropdownMenuRadioItem inset value="light">
                Light
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem inset value="dark">
                Dark
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem inset value="system">
                System
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger inset>More Options</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem>Save Page...</DropdownMenuItem>
                  <DropdownMenuItem>Create Shortcut...</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>
  )
}

function DropdownMenuComplex() {
  const [showSidebar, setShowSidebar] = React.useState(true)
  const [showStatusBar, setShowStatusBar] = React.useState(false)

  return (
    <Example title="Complex">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="outline" sx={styles.button} />}
        >
          Complex Menu
        </DropdownMenuTrigger>
        <DropdownMenuContent sx={styles.dropdownMenuContent5}>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>
              <Icon icon={UserIcon} />
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon icon={CreditCardIcon} />
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon icon={SettingsIcon} />
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={showSidebar}
              onCheckedChange={setShowSidebar}
            >
              <Icon icon={LayoutLeftIcon} />
              Sidebar
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              <Icon icon={LayoutIcon} />
              Status Bar
            </DropdownMenuCheckboxItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Icon icon={UserGroupIcon} />
                Invite Users
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Icon icon={MailIcon} />
                      Email
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Icon icon={MessageIcon} />
                      Message
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Icon icon={AddCircleIcon} />
                      More...
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Icon icon={HelpCircleIcon} />
              Support
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <Icon icon={LogoutIcon} />
              Sign Out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Example>
  )
}
