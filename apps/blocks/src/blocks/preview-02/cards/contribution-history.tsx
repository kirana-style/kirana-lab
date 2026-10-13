import { css } from "@kirana-style/core"
import { Bar, BarChart, XAxis } from "recharts"

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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart"
import type { ChartConfig } from "@workspace/ui/components/chart"
import {
  Item,
  ItemContent,
  ItemDescription,
} from "@workspace/ui/components/item"
import { useDesignSystemSearchParams } from "@/lib/design-system"
import { theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
} from "@workspace/ui/tokens/typography"

const styles = {
  chartContainer: css({
    height: "200px",
    width: "100%",
  }),
  chartTooltipContent: css({
    minWidth: spacing["40"],
  }),
  grid: css({
    display: "grid",
    width: "100%",
    gridTemplateColumns: {
      base: "repeat(1, minmax(0, 1fr))",
      [breakpoint.md]: "repeat(2, minmax(0, 1fr))",
    },
    gap: spacing["3"],
  }),
  item: css({
    flexDirection: "column",
    alignItems: "stretch",
  }),
  itemContent: css({
    rowGap: spacing["1"],
    columnGap: spacing["1"],
  }),
  itemDescription: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.wider,
    color: theme.mutedForeground,
    textTransform: "uppercase",
  }),
  text: css({
    fontFamily: fontFamily.heading,
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.semibold,
  }),
  text2: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  button: css({
    width: "100%",
  }),
}

const chartData = [
  { month: "Dec", amount: 800 },
  { month: "Jan", amount: 1100 },
  { month: "Feb", amount: 900 },
  { month: "Mar", amount: 1300 },
  { month: "Apr", amount: 750 },
  { month: "May", amount: 1400 },
]

const chartConfig = {
  amount: {
    label: "Contribution",
    color: theme.chart2,
  },
} satisfies ChartConfig

export function ContributionHistory() {
  const [params] = useDesignSystemSearchParams()
  const isRounded = !["lyra", "sera"].includes(params.style)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contribution History</CardTitle>
        <CardDescription>Last 6 months of activity</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} sx={styles.chartContainer}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 0, right: 0, top: 8, bottom: 0 }}
          >
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  sx={styles.chartTooltipContent}
                />
              }
            />
            <Bar
              dataKey="amount"
              fill="var(--color-amount)"
              radius={isRounded ? [6, 6, 0, 0] : 0}
              maxBarSize={40}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardContent>
        <div sx={styles.grid}>
          <Item variant="muted" sx={styles.item}>
            <ItemContent sx={styles.itemContent}>
              <ItemDescription sx={styles.itemDescription}>
                Upcoming
              </ItemDescription>
              <span sx={styles.text}>May 25, 2024</span>
              <span sx={styles.text2}>$1,000 scheduled</span>
            </ItemContent>
          </Item>
          <Item variant="muted" sx={styles.item}>
            <ItemContent sx={styles.itemContent}>
              <ItemDescription sx={styles.itemDescription}>
                Auto-Save Plan
              </ItemDescription>
              <span sx={styles.text}>Accelerated</span>
              <span sx={styles.text2}>Recurring weekly</span>
            </ItemContent>
          </Item>
        </div>
      </CardContent>
      <CardFooter>
        <Button sx={styles.button}>View Full Report</Button>
      </CardFooter>
    </Card>
  )
}
