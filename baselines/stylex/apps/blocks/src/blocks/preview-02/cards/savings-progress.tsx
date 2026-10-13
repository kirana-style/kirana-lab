import * as stylex from "@stylexjs/stylex"
import { Label, Pie, PieChart } from "recharts"

import { Card, CardContent, CardFooter } from "@workspace/ui/components/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart"
import type { ChartConfig } from "@workspace/ui/components/chart"
import { Separator } from "@workspace/ui/components/separator"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  chartContainer: {
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
    aspectRatio: "1 / 1",
    maxHeight: "220px",
  },
  tspan: {
    fill: theme.foreground,
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.bold,
  },
  tspan2: {
    fill: theme.mutedForeground,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  },
  cardFooter: {
    flexDirection: "column",
    rowGap: "0px",
    columnGap: "0px",
  },
  row: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBlock: spacing["3"],
  },
  text: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  },
  text2: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
  },
  text3: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  },
})

const chartData = [
  { name: "saved", value: 24000, fill: "var(--color-saved)" },
  { name: "remaining", value: 6000, fill: "var(--color-remaining)" },
]

const chartConfig = {
  saved: {
    label: "Saved",
    color: theme.chart2,
  },
  remaining: {
    label: "Remaining",
    color: theme.chart1,
  },
} satisfies ChartConfig

export function SavingsProgress() {
  return (
    <Card>
      <CardContent>
        <ChartContainer config={chartConfig} sx={styles.chartContainer}>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={95}
              strokeWidth={0}
              startAngle={90}
              endAngle={-270}
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
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 12}
                          sx={styles.tspan}
                        >
                          $24,000
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 12}
                          sx={styles.tspan2}
                        >
                          80% of $30,000
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter sx={styles.cardFooter}>
        <div sx={styles.row}>
          <span sx={styles.text}>Projected Finish</span>
          <span sx={styles.text2}>October 2024</span>
        </div>
        <Separator />
        <div sx={styles.row}>
          <span sx={styles.text}>Monthly Average</span>
          <span sx={styles.text3}>$1,250</span>
        </div>
        <Separator />
        <div sx={styles.row}>
          <span sx={styles.text}>Top Contributor</span>
          <span sx={styles.text2}>Auto-Transfer</span>
        </div>
      </CardFooter>
    </Card>
  )
}
