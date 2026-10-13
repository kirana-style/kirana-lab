import { css } from "@kirana-style/core"
import * as React from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@workspace/ui/components/combobox"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { PlusSignIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { spacing } from "@workspace/ui/tokens/spacing"
import { fontSize, lineHeight } from "@workspace/ui/tokens/typography"

const styles = {
  card: css({
    width: "100%",
    maxWidth: "24rem",
  }),
  // `border-b` on a CardHeader is its `bordered` prop.
  cardTitle: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  avatar: css({
    width: spacing["4"],
    height: spacing["4"],
  }),
  avatar2: css({
    width: spacing["5"],
    height: spacing["5"],
  }),
}

// Users available for assignment.
const users = [
  "shadcn",
  "maxleiter",
  "evilrabbit",
  "pranathip",
  "jorgezreik",
  "shuding",
  "rauchg",
]

export function AssignIssue() {
  const anchor = useComboboxAnchor()
  return (
    <Card sx={styles.card} size="sm">
      <CardHeader bordered>
        <CardTitle sx={styles.cardTitle}>Assign Issue</CardTitle>
        <CardDescription sx={styles.cardTitle}>
          Select users to assign to this issue.
        </CardDescription>
        <CardAction>
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="outline" size="icon-xs" />}
            >
              <Icon icon={PlusSignIcon} />
            </TooltipTrigger>
            <TooltipContent>Add user</TooltipContent>
          </Tooltip>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Combobox
          multiple
          autoHighlight
          items={users}
          defaultValue={[users[0]]}
        >
          <ComboboxChips ref={anchor}>
            <ComboboxValue>
              {(values) => (
                <React.Fragment>
                  {values.map((username: string) => (
                    <ComboboxChip key={username}>
                      <Avatar sx={styles.avatar}>
                        <AvatarImage
                          src={`https://github.com/${username}.png`}
                          alt={username}
                        />
                        <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {username}
                    </ComboboxChip>
                  ))}
                  <ComboboxChipsInput
                    placeholder={
                      values.length > 0 ? undefined : "Select a item..."
                    }
                  />
                </React.Fragment>
              )}
            </ComboboxValue>
          </ComboboxChips>
          <ComboboxContent anchor={anchor}>
            <ComboboxEmpty>No users found.</ComboboxEmpty>
            <ComboboxList>
              {(username: string) => (
                <ComboboxItem key={username} value={username}>
                  <Avatar sx={styles.avatar2}>
                    <AvatarImage
                      src={`https://github.com/${username}.png`}
                      alt={username}
                    />
                    <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {username}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </CardContent>
    </Card>
  )
}
