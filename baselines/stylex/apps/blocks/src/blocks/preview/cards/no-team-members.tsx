import * as stylex from "@stylexjs/stylex"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  empty: {
    height: spacing["56"],
    // `border` sets widths only; the Empty keeps its dashed style.
    borderTopWidth: "1px",
    borderBottomWidth: "1px",
    borderInlineStartWidth: "1px",
    borderInlineEndWidth: "1px",
    borderTopColor: theme.border,
    borderBottomColor: theme.border,
    borderInlineStartColor: theme.border,
    borderInlineEndColor: theme.border,
  },
  avatarGroup: {
    filter: "grayscale(100%)",
  },
})

export function NoTeamMembers() {
  return (
    <Card>
      <CardContent>
        <Empty sx={styles.empty}>
          <EmptyHeader>
            <EmptyMedia>
              <AvatarGroup sx={styles.avatarGroup}>
                <Avatar size="lg">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage
                    src="https://github.com/maxleiter.png"
                    alt="@maxleiter"
                  />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </AvatarGroup>
            </EmptyMedia>
            <EmptyTitle>No Team Members</EmptyTitle>
            <EmptyDescription>
              Invite your team to collaborate on this project.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="sm">Invite Members</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
