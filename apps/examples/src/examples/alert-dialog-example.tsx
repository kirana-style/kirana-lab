import { css } from "@kirana-style/core"
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
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { BluetoothIcon, Delete02Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { alpha, theme } from "@workspace/ui/theme/semantic"

const styles = {
  example: css({
    alignItems: "center",
  }),
  alertDialogMedia: css({
    backgroundColor: `light-dark(${alpha.destructive10}, ${alpha.destructive20})`,
    color: theme.destructive,
  }),
}

export default function AlertDialogExample() {
  return (
    <ExampleWrapper>
      <AlertDialogBasic />
      <AlertDialogSmall />
      <AlertDialogWithMedia />
      <AlertDialogSmallWithMedia />
      <AlertDialogDestructive />
      <AlertDialogInDialog />
    </ExampleWrapper>
  )
}

function AlertDialogBasic() {
  return (
    <Example title="Basic" sx={styles.example}>
      <AlertDialog>
        <AlertDialogTrigger
          render={<Button variant="outline">Default</Button>}
        />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Example>
  )
}

function AlertDialogSmall() {
  return (
    <Example title="Small" sx={styles.example}>
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="outline">Small</Button>} />
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to allow the USB accessory to connect to this device?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
            <AlertDialogAction>Allow</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Example>
  )
}

function AlertDialogWithMedia() {
  return (
    <Example title="With Media" sx={styles.example}>
      <AlertDialog>
        <AlertDialogTrigger
          render={<Button variant="outline">Default (Media)</Button>}
        />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia>
              <Icon icon={BluetoothIcon} />
            </AlertDialogMedia>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your account and remove your data
              from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Example>
  )
}

function AlertDialogSmallWithMedia() {
  return (
    <Example title="Small With Media" sx={styles.example}>
      <AlertDialog>
        <AlertDialogTrigger
          render={<Button variant="outline">Small (Media)</Button>}
        />

        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia>
              <Icon icon={BluetoothIcon} />
            </AlertDialogMedia>
            <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
            <AlertDialogDescription>
              Do you want to allow the USB accessory to connect to this device?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
            <AlertDialogAction>Allow</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Example>
  )
}

function AlertDialogDestructive() {
  return (
    <Example title="Destructive" sx={styles.example}>
      <AlertDialog>
        <AlertDialogTrigger
          render={<Button variant="destructive">Delete Chat</Button>}
        />
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia sx={styles.alertDialogMedia}>
              <Icon icon={Delete02Icon} />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete chat?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this chat conversation. View{" "}
              <a href="#">Settings</a> delete any memories saved during this
              chat.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="ghost">Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Example>
  )
}

function AlertDialogInDialog() {
  return (
    <Example title="In Dialog" sx={styles.example}>
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Open Dialog
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alert Dialog Example</DialogTitle>
            <DialogDescription>
              Click the button below to open an alert dialog.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <AlertDialog>
              <AlertDialogTrigger render={<Button />}>
                Open Alert Dialog
              </AlertDialogTrigger>
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Example>
  )
}
