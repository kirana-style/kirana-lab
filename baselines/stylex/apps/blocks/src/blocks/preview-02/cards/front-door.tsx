import * as stylex from "@stylexjs/stylex"
import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { SquareLock02Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { fontSize, lineHeight } from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  row: {
    display: "flex",
    alignItems: "center",
    gap: spacing["1.5"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  },
  icon: {
    width: spacing["4"],
    height: spacing["4"],
  },
  row2: {
    position: "relative",
    display: "flex",
    aspectRatio: "16 / 9",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: radius.lg,
    backgroundColor: theme.muted,
    backgroundImage: `repeating-linear-gradient(45deg,transparent,transparent 10px,${theme.border} 10px,${theme.border} 11px)`,
  },
  badge: {
    position: "absolute",
    top: spacing["2"],
    right: spacing["2"],
  },
})

export function FrontDoor() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Front Door</CardTitle>
        <CardDescription>Smart Lock Pro</CardDescription>
        <CardAction>
          <div sx={styles.row}>
            Locked
            <Icon
              icon={SquareLock02Icon}

              sx={styles.icon}
            />
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div sx={styles.row2}>
          <Badge variant="destructive" sx={styles.badge}>
            Live
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
