import { css } from "@kirana-style/core"
import { Bar, BarChart } from "recharts"

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
import { ChartContainer } from "@workspace/ui/components/chart"
import type { ChartConfig } from "@workspace/ui/components/chart"
import { theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography"

const styles = {
  cardContent: css({
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["3"],
    columnGap: spacing["3"],
  }),
  chartContainer: css({
    height: spacing["32"],
    width: "100%",
  }),
  grid: css({
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: spacing["2"],
  }),
  text: css({
    textAlign: "center",
  }),
  text2: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  }),
  text3: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  button: css({
    marginLeft: "auto",
  }),
}

const sleepChartData = [
  { hour: "10pm", deep: 0, light: 30, rem: 0 },
  { hour: "11pm", deep: 20, light: 10, rem: 0 },
  { hour: "12am", deep: 40, light: 0, rem: 10 },
  { hour: "1am", deep: 30, light: 5, rem: 15 },
  { hour: "2am", deep: 10, light: 20, rem: 30 },
  { hour: "3am", deep: 25, light: 10, rem: 20 },
  { hour: "4am", deep: 15, light: 25, rem: 10 },
  { hour: "5am", deep: 5, light: 35, rem: 15 },
  { hour: "6am", deep: 0, light: 20, rem: 25 },
]

const sleepChartConfig = {
  deep: {
    label: "Deep",
    color: theme.chart1,
  },
  light: {
    label: "Light",
    color: theme.chart2,
  },
  rem: {
    label: "REM",
    color: theme.chart3,
  },
} satisfies ChartConfig

export function SleepReport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sleep Report</CardTitle>
        <CardDescription>Last night · 7h 24m</CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <ChartContainer config={sleepChartConfig} sx={styles.chartContainer}>
          <BarChart
            accessibilityLayer
            data={sleepChartData}
            margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
            barSize={16}
          >
            <Bar
              dataKey="deep"
              stackId="a"
              fill="var(--color-deep)"
              radius={0}
            />
            <Bar
              dataKey="light"
              stackId="a"
              fill="var(--color-light)"
              radius={0}
            />
            <Bar
              dataKey="rem"
              stackId="a"
              fill="var(--color-rem)"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
        <div sx={styles.grid}>
          {[
            { label: "Deep", value: "2h 10m" },
            { label: "Light", value: "3h 48m" },
            { label: "REM", value: "1h 26m" },
            { label: "Score", value: "84" },
          ].map((s) => (
            <div key={s.label} sx={styles.text}>
              <div sx={styles.text2}>{s.value}</div>
              <div sx={styles.text3}>{s.label}</div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Badge variant="outline">Good</Badge>
        <Button variant="outline" size="sm" sx={styles.button}>
          Details
        </Button>
      </CardFooter>
    </Card>
  )
}
