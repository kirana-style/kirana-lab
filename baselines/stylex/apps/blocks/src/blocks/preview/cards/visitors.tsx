import * as stylex from "@stylexjs/stylex"
import { Area, AreaChart, XAxis } from "recharts"

import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart"
import type { ChartConfig } from "@workspace/ui/components/chart"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { theme } from "@workspace/ui/theme/semantic.stylex"

const styles = stylex.create({
  card: {
    paddingBottom: "0px",
  },
  cardContent: {
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
  },
  chartContainer: {
    height: spacing["48"],
    width: "100%",
  },
})

const areaChartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const areaChartConfig = {
  desktop: {
    label: "Desktop",
    color: theme.chart1,
  },
} satisfies ChartConfig

const latestVisitors = areaChartData[areaChartData.length - 1]?.desktop ?? 0
const previousVisitors =
  areaChartData[areaChartData.length - 2]?.desktop ?? latestVisitors
const trendPercent =
  previousVisitors === 0
    ? 0
    : Math.round(((latestVisitors - previousVisitors) / previousVisitors) * 100)
const trendPrefix = trendPercent > 0 ? "+" : ""

export function Visitors() {
  return (
    <Card sx={styles.card}>
      <CardHeader>
        <CardTitle>Visitors</CardTitle>
        <CardDescription>Last 6 months </CardDescription>
        <CardAction>
          <Badge variant={trendPercent >= 0 ? "secondary" : "destructive"}>
            {trendPrefix}
            {trendPercent}% vs last month
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <ChartContainer config={areaChartConfig} sx={styles.chartContainer}>
          <AreaChart
            accessibilityLayer
            data={areaChartData}
            margin={{ left: 0, right: 0, top: 6, bottom: 0 }}
          >
            <XAxis
              dataKey="month"
              tickLine={false}
              hide
              axisLine={false}
              tickMargin={6}
              tickFormatter={(value) => String(value).slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="var(--color-desktop)"
              fillOpacity={0.15}
              stroke="var(--color-desktop)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
