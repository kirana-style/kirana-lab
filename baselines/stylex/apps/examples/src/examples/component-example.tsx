import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import { Example, ExampleWrapper } from "@/components/example"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@workspace/ui/components/combobox"
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
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Textarea } from "@workspace/ui/components/textarea"
import {
  BluetoothIcon,
  CodeIcon,
  ComputerIcon,
  CreditCardIcon,
  DownloadIcon,
  EyeIcon,
  File01Icon,
  FileIcon,
  FloppyDiskIcon,
  FolderIcon,
  FolderOpenIcon,
  HelpCircleIcon,
  KeyboardIcon,
  LanguageCircleIcon,
  LayoutIcon,
  LogoutIcon,
  MailIcon,
  MoonIcon,
  MoreHorizontalCircle01Icon,
  MoreVerticalCircle01Icon,
  NotificationIcon,
  PaintBoardIcon,
  PlusSignIcon,
  SearchIcon,
  SettingsIcon,
  ShieldIcon,
  SunIcon,
  UserIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  example: {
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "relative",
    width: "100%",
    maxWidth: "24rem",
    overflowX: "hidden",
    overflowY: "hidden",
    paddingTop: "0px",
  },
  box: {
    position: "absolute",
    inset: "0px",
    zIndex: 30,
    aspectRatio: "16 / 9",
    backgroundColor: theme.primary,
    opacity: "50%",
    mixBlendMode: "color",
  },
  image: {
    position: "relative",
    zIndex: 20,
    aspectRatio: "16 / 9",
    width: "100%",
    objectFit: "cover",
    filter: "brightness(60%) grayscale(100%)",
  },
  badge: {
    marginLeft: "auto",
  },
  card2: {
    width: "100%",
    maxWidth: "28rem",
  },
  text: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
    borderColor: theme.border,
  },
  dropdownMenuContent: {
    width: spacing["56"],
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: spacing["4"],
  },
})

export function ComponentExample() {
  return (
    <ExampleWrapper>
      <CardExample />
      <FormExample />
    </ExampleWrapper>
  )
}

function CardExample() {
  return (
    <Example title="Card" sx={styles.example}>
      <Card sx={styles.card}>
        <div sx={styles.box} />
        <img
          src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Photo by mymind on Unsplash"
          title="Photo by mymind on Unsplash"
          sx={styles.image}
        />
        <CardHeader>
          <CardTitle>Observability Plus is replacing Monitoring</CardTitle>
          <CardDescription>
            Switch to the improved way to explore your data, with natural
            language. Monitoring will no longer be available on the Pro plan in
            November, 2025
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <AlertDialog>
            <AlertDialogTrigger render={<Button />}>
              <Icon
                icon={PlusSignIcon}

                data-icon="inline-start"
              />
              Show Dialog
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia>
                  <Icon icon={BluetoothIcon} />
                </AlertDialogMedia>
                <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
                <AlertDialogDescription>
                  Do you want to allow the USB accessory to connect to this
                  device?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
                <AlertDialogAction>Allow</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Badge variant="secondary" sx={styles.badge}>
            Warning
          </Badge>
        </CardFooter>
      </Card>
    </Example>
  )
}

const frameworks = [
  "Next.js",
  "SvelteKit",
  "Nuxt.js",
  "Remix",
  "Astro",
] as const

const roleItems = [
  { label: "Developer", value: "developer" },
  { label: "Designer", value: "designer" },
  { label: "Manager", value: "manager" },
  { label: "Other", value: "other" },
]

function FormExample() {
  const [notifications, setNotifications] = React.useState({
    email: true,
    sms: false,
    push: true,
  })
  const [themeMode, setTheme] = React.useState("light")

  return (
    <Example title="Form">
      <Card sx={styles.card2}>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Please fill in your details below</CardDescription>
          <CardAction>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="ghost" size="icon" />}
              >
                <Icon icon={MoreVerticalCircle01Icon} />
                <span sx={styles.text}>More options</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sx={styles.dropdownMenuContent}>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>File</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Icon icon={FileIcon} />
                    New File
                    <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon icon={FolderIcon} />
                    New Folder
                    <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Icon icon={FolderOpenIcon} />
                      Open Recent
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Recent Projects</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Icon icon={CodeIcon} />
                            Project Alpha
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Icon icon={CodeIcon} />
                            Project Beta
                          </DropdownMenuItem>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <Icon icon={MoreHorizontalCircle01Icon} />
                              More Projects
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuItem>
                                  <Icon icon={CodeIcon} />
                                  Project Gamma
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Icon icon={CodeIcon} />
                                  Project Delta
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Icon icon={SearchIcon} />
                            Browse...
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Icon icon={FloppyDiskIcon} />
                    Save
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon icon={DownloadIcon} />
                    Export
                    <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>View</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem
                    checked={notifications.email}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        email: checked === true,
                      })
                    }
                  >
                    <Icon icon={EyeIcon} />
                    Show Sidebar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={notifications.sms}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        sms: checked === true,
                      })
                    }
                  >
                    <Icon icon={LayoutIcon} />
                    Show Status Bar
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Icon icon={PaintBoardIcon} />
                      Theme
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                          <DropdownMenuRadioGroup
                            value={themeMode}
                            onValueChange={setTheme}
                          >
                            <DropdownMenuRadioItem value="light">
                              <Icon icon={SunIcon} />
                              Light
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="dark">
                              <Icon icon={MoonIcon} />
                              Dark
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="system">
                              <Icon icon={ComputerIcon} />
                              System
                            </DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Icon icon={UserIcon} />
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon icon={CreditCardIcon} />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Icon icon={SettingsIcon} />
                      Settings
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Icon icon={KeyboardIcon} />
                            Keyboard Shortcuts
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Icon icon={LanguageCircleIcon} />
                            Language
                          </DropdownMenuItem>
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                              <Icon icon={NotificationIcon} />
                              Notifications
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuGroup>
                                  <DropdownMenuLabel>
                                    Notification Types
                                  </DropdownMenuLabel>
                                  <DropdownMenuCheckboxItem
                                    checked={notifications.push}
                                    onCheckedChange={(checked) =>
                                      setNotifications({
                                        ...notifications,
                                        push: checked === true,
                                      })
                                    }
                                  >
                                    <Icon icon={NotificationIcon} />
                                    Push Notifications
                                  </DropdownMenuCheckboxItem>
                                  <DropdownMenuCheckboxItem
                                    checked={notifications.email}
                                    onCheckedChange={(checked) =>
                                      setNotifications({
                                        ...notifications,
                                        email: checked === true,
                                      })
                                    }
                                  >
                                    <Icon icon={MailIcon} />
                                    Email Notifications
                                  </DropdownMenuCheckboxItem>
                                </DropdownMenuGroup>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <Icon icon={ShieldIcon} />
                            Privacy & Security
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
                    Help & Support
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Icon icon={File01Icon} />
                    Documentation
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem variant="destructive">
                    <Icon icon={LogoutIcon} />
                    Sign Out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <div sx={styles.grid}>
                <Field>
                  <FieldLabel htmlFor="small-form-name">Name</FieldLabel>
                  <Input
                    id="small-form-name"
                    placeholder="Enter your name"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="small-form-role">Role</FieldLabel>
                  <Select items={roleItems} defaultValue={null}>
                    <SelectTrigger id="small-form-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {roleItems.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="small-form-framework">
                  Framework
                </FieldLabel>
                <Combobox items={frameworks}>
                  <ComboboxInput
                    id="small-form-framework"
                    placeholder="Select a framework"
                    required
                  />
                  <ComboboxContent>
                    <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item) => (
                        <ComboboxItem key={item} value={item}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </Field>
              <Field>
                <FieldLabel htmlFor="small-form-comments">Comments</FieldLabel>
                <Textarea
                  id="small-form-comments"
                  placeholder="Add any additional comments"
                />
              </Field>
              <Field orientation="horizontal">
                <Button type="submit">Submit</Button>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </Example>
  )
}
