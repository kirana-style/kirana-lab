import { css, props as styleProps } from "@kirana-style/core"
import { Bar, BarChart, XAxis } from "recharts"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart"
import type { ChartConfig } from "@workspace/ui/components/chart"
import { spacing } from "@workspace/ui/tokens/spacing"
import { fontSize, lineHeight } from "@workspace/ui/tokens/typography"
import { theme } from "@workspace/ui/theme/semantic"

const styles = {
  grid: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: spacing["3"],
  }),
  cardTitle: css({
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontVariantNumeric: "tabular-nums",
  }),
  cardDescription: css({
    fontVariantNumeric: "tabular-nums",
  }),
  card: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }),
  cardContent: css({
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  }),
  stack: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing["1"],
  }),
  cardTitle2: css({
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
  }),
  button: css({
    marginTop: spacing["3"],
    width: "100%",
  }),
  card2: css({
    gridColumnStart: "span 2",
    gridColumnEnd: "span 2",
  }),
  cardContent2: css({
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  }),
  row: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  chartContainer: css({
    height: spacing["20"],
    width: "100%",
  }),
  xAxis: css({
    fontSize: "10px",
  }),
}

const activityData = [
  { month: "Jan", amount: 40 },
  { month: "Feb", amount: 55 },
  { month: "Mar", amount: 35 },
  { month: "Apr", amount: 60 },
  { month: "May", amount: 45 },
  { month: "Jun", amount: 50 },
  { month: "Jul", amount: 65 },
  { month: "Aug", amount: 40 },
  { month: "Sep", amount: 55 },
  { month: "Oct", amount: 70 },
  { month: "Nov", amount: 45 },
  { month: "Dec", amount: 80 },
]

const chartConfig = {
  amount: {
    label: "Activity",
    color: theme.chart2,
  },
} satisfies ChartConfig

export function CardOverview() {
  return (
    <div sx={styles.grid}>
      <Card>
        <CardContent>
          <CardDescription>Card Balance</CardDescription>
          <CardTitle sx={styles.cardTitle}>US$12.94</CardTitle>
          <CardDescription sx={styles.cardDescription}>
            US$11,337.06 Available
          </CardDescription>
        </CardContent>
      </Card>
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <div sx={styles.stack}>
            <CardDescription>Payment Due</CardDescription>
            <CardTitle sx={styles.cardTitle2}>1 Apr</CardTitle>
          </div>
          <Button variant="outline" size="sm" sx={styles.button}>
            Pay Early
          </Button>
        </CardContent>
      </Card>
      <Card sx={styles.card2}>
        <CardContent sx={styles.cardContent2}>
          <div sx={styles.row}>
            <CardDescription>Yearly Activity</CardDescription>
            <Badge variant="secondary">+US$0.25 Daily Cash</Badge>
          </div>
          <ChartContainer config={chartConfig} sx={styles.chartContainer}>
            <BarChart
              data={activityData}
              margin={{ top: 4, right: 0, bottom: 0, left: 0 }}
            >
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={4}
                axisLine={false}
                tickFormatter={(v) => String(v).slice(0, 1)}
                {...styleProps(styles.xAxis)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="amount"
                fill="var(--color-amount)"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
