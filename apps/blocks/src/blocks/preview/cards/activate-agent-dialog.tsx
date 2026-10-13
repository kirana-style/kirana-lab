import { css } from "@kirana-style/core"
import { Alert, AlertDescription } from "@workspace/ui/components/alert"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item"
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"
import { fontWeight, leading } from "@workspace/ui/tokens/typography"

const styles = {
  badge: css({
    backgroundColor: theme.chart1,
    color: theme.chart5,
  }),
  cardContent: css({
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  }),
  // `gap-0` only replaced the group's plain gap in Tailwind; its size-driven
  // gaps outrank it and still apply, so a group of xs items keeps 8px.
  itemGroup: css({
    gap: {
      base: 0,
      ':has([data-size="sm"])': {
        base: spacing["2.5"],
        ':has([data-size="xs"])': spacing["2"],
      },
      ':has([data-size="xs"])': spacing["2"],
    },
  }),
  item: css({
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
  }),
  itemMedia: css({
    alignSelf: "flex-start",
  }),
  icon: css({
    width: spacing["5"],
    height: spacing["5"],
    fill: theme.primary,
    color: theme.primaryForeground,
  }),
  strong: css({ fontWeight: fontWeight.medium, color: theme.foreground }),
  itemTitle: css({
    display: "inline",
    lineHeight: leading.relaxed,
    fontWeight: fontWeight.normal,
    color: theme.mutedForeground,
  }),
  cardFooter: css({
    justifyContent: "flex-end",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  }),
}

// Agent feature descriptions.
const agentFeatures = [
  {
    id: "code-reviews",
    content: (
      <>
        <strong sx={styles.strong}>Code reviews</strong> with full codebase
        context to catch <strong sx={styles.strong}>hard-to-find</strong> bugs.
      </>
    ),
  },
  {
    id: "code-suggestions",
    content: (
      <>
        <strong sx={styles.strong}>Code suggestions</strong> validated in
        sandboxes before you merge.
      </>
    ),
  },
  {
    id: "root-cause",
    content: (
      <>
        <strong sx={styles.strong}>Root-cause analysis</strong> for production
        issues with deployment context.{" "}
        <Badge variant="secondary" sx={styles.badge}>
          Requires Observability Plus
        </Badge>
      </>
    ),
  },
]

export function ActivateAgentDialog() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ship faster & safer with Vercel Agent</CardTitle>
        <CardDescription>
          Your use is subject to Vercel&apos;s{" "}
          <a href="#">Public Beta Agreement</a> and{" "}
          <a href="#">AI Product Terms</a>.
        </CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <ItemGroup sx={styles.itemGroup}>
          {agentFeatures.map((feature) => (
            <Item key={feature.id} size="xs" sx={styles.item}>
              <ItemMedia variant="icon" sx={styles.itemMedia}>
                <Icon
                  icon={CheckmarkCircle02Icon}

                  sx={styles.icon}
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle sx={styles.itemTitle}>{feature.content}</ItemTitle>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
        <Alert>
          <AlertDescription>
            Pro teams get $100 in Vercel Agent trial credit for 2 weeks after
            activation.
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter sx={styles.cardFooter}>
        <Button variant="outline">Cancel</Button>
        <Button>Enable with $100 credits</Button>
      </CardFooter>
    </Card>
  )
}
