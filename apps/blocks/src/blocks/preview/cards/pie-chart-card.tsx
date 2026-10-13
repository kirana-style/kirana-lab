import { css } from "@kirana-style/core"
import { Label, Pie, PieChart } from "recharts"

import { Badge } from "@workspace/ui/components/badge"
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
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart"
import type { ChartConfig } from "@workspace/ui/components/chart"
import { Progress } from "@workspace/ui/components/progress"
import { theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography"

const styles = {
  cardHeader: css({
    paddingBottom: "0px",
  }),
  cardContent: css({
    paddingTop: "0px",
  }),
  chartContainer: css({
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
    aspectRatio: "1 / 1",
    maxHeight: "190px",
  }),
  tspan: css({
    fill: theme.foreground,
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.bold,
  }),
  tspan2: css({
    fill: theme.mutedForeground,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  cardFooter: css({
    flexDirection: "column",
    alignItems: "stretch",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  }),
  row: css({
    display: "flex",
    alignItems: "center",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  text: css({
    fontWeight: fontWeight.medium,
  }),
  text2: css({
    marginLeft: "auto",
    color: theme.mutedForeground,
    fontVariantNumeric: "tabular-nums",
  }),
  progressIndicator: css({ backgroundColor: theme.chart3 }),
}

const pieChartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
]

const pieChartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: theme.chart1,
  },
  safari: {
    label: "Safari",
    color: theme.chart2,
  },
  firefox: {
    label: "Firefox",
    color: theme.chart3,
  },
  edge: {
    label: "Edge",
    color: theme.chart4,
  },
} satisfies ChartConfig

export function PieChartCard() {
  const totalVisitors = pieChartData.reduce(
    (sum, item) => sum + item.visitors,
    0
  )
  const topBrowser = pieChartData.reduce((max, item) =>
    item.visitors > max.visitors ? item : max
  )
  const topBrowserShare = Math.round(
    (topBrowser.visitors / totalVisitors) * 100
  )
  const topBrowserLabel =
    pieChartConfig[topBrowser.browser as keyof typeof pieChartConfig]?.label ??
    "Top"

  return (
    <Card>
      <CardHeader sx={styles.cardHeader}>
        <CardTitle>Browser Share</CardTitle>
        <CardDescription>January - June 2026</CardDescription>
        <CardAction>
          <Badge variant="outline">{topBrowserLabel}</Badge>
        </CardAction>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <ChartContainer config={pieChartConfig} sx={styles.chartContainer}>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={pieChartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={50}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="red"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy - 16}
                          sx={styles.tspan}
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          sx={styles.tspan2}
                        >
                          Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              wrapperStyle={{ transform: "translateY(0.5rem)" }}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter sx={styles.cardFooter}>
        <div sx={styles.row}>
          <span sx={styles.text}>{topBrowserLabel}</span>
          <span sx={styles.text2}>{topBrowserShare}%</span>
        </div>
        <Progress
          value={topBrowserShare}
          indicatorSx={styles.progressIndicator}
        />
      </CardFooter>
    </Card>
  )
}
