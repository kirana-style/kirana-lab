import * as stylex from "@stylexjs/stylex"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Field, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Separator } from "@workspace/ui/components/separator"
import { Copy01Icon, PlusSignIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  cardContent: {
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["3"],
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
  },
  input: {
    flex: 1,
  },
  selectTrigger: {
    width: spacing["24"],
  },
  button: {
    width: "100%",
  },
})

export function InviteTeam() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite Team</CardTitle>
        <CardDescription>Add members to your workspace</CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <div sx={styles.stack}>
          {[
            { email: "alex@example.com", role: "Editor" },
            { email: "sam@example.com", role: "Viewer" },
          ].map((invite) => (
            <div key={invite.email} sx={styles.row}>
              <Input defaultValue={invite.email} sx={styles.input} />
              <Select
                items={[
                  { label: "Admin", value: "admin" },
                  { label: "Editor", value: "editor" },
                  { label: "Viewer", value: "viewer" },
                ]}
                defaultValue={invite.role.toLowerCase()}
              >
                <SelectTrigger sx={styles.selectTrigger}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false} align="end">
                  <SelectGroup>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <Button variant="outline">
          <Icon
            icon={PlusSignIcon}

            data-icon="inline-start"
          />
          Add another
        </Button>
        <Separator />
        <Field>
          <FieldLabel htmlFor="invite-link">Or share invite link</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="invite-link"
              defaultValue="https://app.co/invite/x8f2k"
              readOnly
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs" aria-label="Copy link">
                <Icon icon={Copy01Icon} />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </CardContent>
      <CardFooter>
        <Button sx={styles.button}>Send Invites</Button>
      </CardFooter>
    </Card>
  )
}
