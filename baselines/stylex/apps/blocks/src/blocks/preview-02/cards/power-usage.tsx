import * as stylex from "@stylexjs/stylex"
import { Bar, BarChart, XAxis } from "recharts"

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
import { Progress } from "@workspace/ui/components/progress"
import { Separator } from "@workspace/ui/components/separator"
import { useDesignSystemSearchParams } from "@/lib/design-system"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  cardContent: {
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  },
  chartContainer: {
    height: "140px",
    width: "100%",
  },
  xAxis: {
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: spacing["4"],
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["0.5"],
  },
  text: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  },
  text2: {
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  },
  text3: {
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.semibold,
    color: theme.chart1,
    fontVariantNumeric: "tabular-nums",
  },
  cardFooter: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: spacing["1"],
    columnGap: spacing["1"],
  },
  row: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: spacing["2"],
  },
  progress: {
    flex: 1,
  },
  text4: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  },
})

const chartData = [
  { hour: "6a", usage: 1.2 },
  { hour: "8a", usage: 2.8 },
  { hour: "10a", usage: 3.1 },
  { hour: "12p", usage: 2.4 },
  { hour: "2p", usage: 3.4 },
  { hour: "4p", usage: 2.9 },
  { hour: "6p", usage: 3.8 },
  { hour: "8p", usage: 3.2 },
]

const chartConfig = {
  usage: {
    label: "Usage (kW)",
    color: theme.chart2,
  },
} satisfies ChartConfig

export function PowerUsage() {
  const [params] = useDesignSystemSearchParams()
  const isRounded = !["lyra", "sera"].includes(params.style)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Power Usage</CardTitle>
        <CardDescription>Whole Home</CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <ChartContainer config={chartConfig} sx={styles.chartContainer}>
          <BarChart
            data={chartData}
            margin={{ left: 0, right: 0, top: 4, bottom: 0 }}
          >
            <XAxis
              dataKey="hour"
              tickLine={false}
              tickMargin={6}
              axisLine={false}
              {...stylex.props(styles.xAxis)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="usage"
              fill="var(--color-usage)"
              radius={isRounded ? [4, 4, 0, 0] : 0}
            />
          </BarChart>
        </ChartContainer>
        <Separator />
        <div sx={styles.grid}>
          <div sx={styles.stack}>
            <span sx={styles.text}>Currently Using</span>
            <span sx={styles.text2}>3.4 kW</span>
          </div>
          <div sx={styles.stack}>
            <span sx={styles.text}>Solar Gen</span>
            <span sx={styles.text3}>+1.2 kW</span>
          </div>
        </div>
      </CardContent>
      <CardFooter sx={styles.cardFooter}>
        <span sx={styles.text}>Battery Level</span>
        <div sx={styles.row}>
          <Progress value={85} sx={styles.progress} />
          <span sx={styles.text4}>85%</span>
        </div>
      </CardFooter>
    </Card>
  )
}
