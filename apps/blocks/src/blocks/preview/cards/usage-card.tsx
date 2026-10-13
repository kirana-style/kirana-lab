import { css } from "@kirana-style/core"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item"
import { theme } from "@workspace/ui/theme/semantic"
import { easing } from "@workspace/ui/tokens/motion"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography"

const styles = {
  svg: css({
    rotate: "calc(90deg * -1)",
  }),
  circle: css({
    opacity: "20%",
  }),
  circle2: css({
    transitionProperty: "all",
    transitionTimingFunction: easing.inOut,
    transitionDuration: "300ms",
  }),
  card: css({
    width: "100%",
    maxWidth: "24rem",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  }),
  cardTitle: css({
    paddingInlineStart: spacing["1"],
    paddingInlineEnd: spacing["1"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
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
    // Was `group-hover/item-group:bg-transparent`: the group is always hovered
    // when the row is, so the row simply never takes the link hover fill.
    backgroundColor: { ":hover": "transparent" },
  }),
  itemMedia: css({
    color: theme.primary,
  }),
  itemContent: css({
    display: "inline-block",
    overflowX: "hidden",
    overflowY: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  itemTitle: css({
    display: "inline",
  }),
  text: css({
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
    fontVariantNumeric: "tabular-nums",
  }),
}

// Usage items with percentage and value.
const items = [
  {
    name: "Edge Requests",
    value: "$1.83K",
    percentage: 67.34,
  },
  {
    name: "Fast Data Transfer",
    percentage: 52.18,
    value: "$952.51",
  },
  {
    name: "Monitoring data points",
    percentage: 89.42,
    value: "$901.20",
  },
  {
    name: "Web Analytics Events",
    percentage: 45.67,
    value: "$603.71",
  },
  {
    name: "ISR Writes",
    percentage: 26.23,
    value: "524.52K / 2M",
  },
  {
    name: "Function Duration",
    percentage: 5.11,
    value: "5.11 GB Hrs / 1K GB Hrs",
  },
]

// Circular gauge SVG component for displaying a percentage.
function CircularGauge({ percentage }: { percentage: number }) {
  const normalizedPercentage = Math.min(Math.max(percentage, 0), 100)
  const circumference = 2 * Math.PI * 42.5
  const strokePercent = (normalizedPercentage / 100) * circumference

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="16"
      width="16"
      strokeWidth="2"
      viewBox="0 0 100 100"
      sx={styles.svg}
    >
      <circle
        cx="50"
        cy="50"
        r="42.5"
        strokeWidth="12"
        strokeDashoffset="0"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={styles.circle}
        stroke="currentColor"
        style={{
          strokeDasharray: `${circumference} ${circumference}`,
        }}
      />
      <circle
        cx="50"
        cy="50"
        r="42.5"
        strokeWidth="12"
        strokeDashoffset="0"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        sx={styles.circle2}
        style={{
          strokeDasharray: `${strokePercent} ${circumference}`,
        }}
      />
    </svg>
  )
}

export function UsageCard() {
  return (
    <Card sx={styles.card}>
      <CardHeader>
        <CardTitle sx={styles.cardTitle}>5 days remaining in cycle</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup sx={styles.itemGroup}>
          {items.map((item) => (
            <Item
              key={item.name}
              size="xs"
              sx={styles.item}
              render={<a href="#" />}
            >
              <ItemMedia variant="icon" sx={styles.itemMedia}>
                <CircularGauge percentage={item.percentage} />
              </ItemMedia>
              <ItemContent sx={styles.itemContent}>
                <ItemTitle sx={styles.itemTitle}>{item.name}</ItemTitle>
              </ItemContent>
              <ItemActions>
                <span sx={styles.text}>{item.value}</span>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
