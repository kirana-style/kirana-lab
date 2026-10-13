import * as stylex from "@stylexjs/stylex"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart"
import type { ChartConfig } from "@workspace/ui/components/chart"
import { useDesignSystemSearchParams } from "@/lib/design-system"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  cardTitle: {
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
  },
  cardDescription: {
    overflowX: "hidden",
    overflowY: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    fontSize: fontSize.sm,
    lineHeight: leading.snug,
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
    paddingTop: "0px",
  },
  chartContainer: {
    maxHeight: "180px",
    width: "100%",
  },
  // Was `divide-x divide-border/60` on the grid.
  divided: {
    borderInlineEndWidth: "1px",
    borderInlineEndStyle: "solid",
    borderInlineEndColor: `color-mix(in oklab, ${theme.border} 60%, transparent)`,
  },
  grid: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  },
  box: {
    paddingInline: spacing["2"],
    textAlign: "center",
  },
  text: {
    fontSize: "0.65rem",
    color: theme.mutedForeground,
    textTransform: "uppercase",
  },
  text2: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  },
  button: {
    width: "100%",
  },
})

const barChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const barChartConfig = {
  desktop: {
    label: "Desktop",
    color: theme.chart1,
  },
  mobile: {
    label: "Mobile",
    color: theme.chart2,
  },
} satisfies ChartConfig

const desktopTotal = barChartData.reduce((sum, item) => sum + item.desktop, 0)
const mobileTotal = barChartData.reduce((sum, item) => sum + item.mobile, 0)
const desktopDelta = Math.round(
  ((desktopTotal - mobileTotal) / mobileTotal) * 100
)
const desktopDeltaPrefix = desktopDelta > 0 ? "+" : ""

export function BarChartCard() {
  const [params] = useDesignSystemSearchParams()
  const isRounded = !["lyra", "sera"].includes(params.style)

  return (
    <Card>
      <CardHeader>
        <CardTitle sx={styles.cardTitle}>Traffic channels</CardTitle>
        <CardDescription sx={styles.cardDescription}>
          Monthly desktop and mobile traffic for the last six months—compare
          volume and mix across platforms and devices at a glance.
        </CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <ChartContainer config={barChartConfig} sx={styles.chartContainer}>
          <BarChart
            accessibilityLayer
            data={barChartData}
            margin={{ left: 0, right: 0, top: 8, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tickFormatter={(value) => String(value).slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="desktop"
              fill="var(--color-desktop)"
              radius={isRounded ? [6, 6, 0, 0] : 0}
            />
            <Bar
              dataKey="mobile"
              fill="var(--color-mobile)"
              radius={isRounded ? [6, 6, 0, 0] : 0}
            />
          </BarChart>
        </ChartContainer>
        <div sx={styles.grid}>
          <div sx={[styles.box, styles.divided]}>
            <div sx={styles.text}>Desktop</div>
            <div sx={styles.text2}>{desktopTotal.toLocaleString()}</div>
          </div>
          <div sx={[styles.box, styles.divided]}>
            <div sx={styles.text}>Mobile</div>
            <div sx={styles.text2}>{mobileTotal.toLocaleString()}</div>
          </div>
          <div sx={styles.box}>
            <div sx={styles.text}>Mix Delta</div>
            <div sx={styles.text2}>
              {desktopDeltaPrefix}
              {desktopDelta}%
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button sx={styles.button}>View report</Button>
      </CardFooter>
    </Card>
  )
}
