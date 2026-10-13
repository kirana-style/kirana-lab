import * as stylex from "@stylexjs/stylex"
import * as React from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  XAxis,
} from "recharts"

import { Example, ExampleWrapper } from "@/components/example"
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
import { ChartUpIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  card: {
    width: "100%",
  },
  row: {
    display: "flex",
    width: "100%",
    alignItems: "flex-start",
    gap: spacing["2"],
  },
  grid: {
    display: "grid",
    gap: spacing["2"],
  },
  row2: {
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
    lineHeight: 1,
    fontWeight: fontWeight.medium,
  },
  icon: {
    width: spacing["4"],
    height: spacing["4"],
  },
  row3: {
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
    lineHeight: 1,
    color: theme.mutedForeground,
  },
  cardFooter: {
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  },
  row4: {
    display: "flex",
    gap: spacing["2"],
    lineHeight: 1,
    fontWeight: fontWeight.medium,
  },
  text: {
    lineHeight: 1,
    color: theme.mutedForeground,
  },
  cardHeader: {
    alignItems: "center",
    paddingBottom: "0px",
  },
  cardContent: {
    flex: 1,
    paddingBottom: "0px",
  },
  chartContainer: {
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
    aspectRatio: "1 / 1",
    maxHeight: "250px",
  },
  tspan: {
    fill: theme.foreground,
    fontSize: fontSize["3xl"],
    lineHeight: lineHeight["3xl"],
    fontWeight: fontWeight.bold,
  },
  tspan2: {
    fill: theme.mutedForeground,
  },
  cardFooter2: {
    flexDirection: "column",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  },
  cardHeader2: {
    alignItems: "center",
    paddingBottom: spacing["4"],
  },
  cardContent2: {
    paddingBottom: "0px",
  },
  chartContainer2: {
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
    aspectRatio: "1 / 1",
    maxHeight: "210px",
  },
  polarGrid: {
    fill: {
      default: null,
      ":first-child": theme.muted,
      ":last-child": theme.background,
    },
  },
  tspan3: {
    fill: theme.foreground,
    fontSize: fontSize["4xl"],
    lineHeight: lineHeight["4xl"],
    fontWeight: fontWeight.bold,
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

export default function ChartExample() {
  return (
    <ExampleWrapper>
      <ChartAreaExample />
      <ChartBarExample />
      <ChartLineExample />
      <ChartPieExample />
      <ChartRadialExample />
      <ChartRadarExample />
    </ExampleWrapper>
  )
}

function ChartAreaExample() {
  return (
    <Example title="Area Chart">
      <Card sx={styles.card}>
        <CardHeader>
          <CardTitle>Area Chart</CardTitle>
          <CardDescription>
            Showing total visitors for the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={areaChartConfig}>
            <AreaChart
              accessibilityLayer
              data={areaChartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div sx={styles.row}>
            <div sx={styles.grid}>
              <div sx={styles.row2}>
                Trending up by 5.2% this month{" "}
                <Icon
                  icon={ChartUpIcon}

                  sx={styles.icon}
                />
              </div>
              <div sx={styles.row3}>January - June 2024</div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Example>
  )
}

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

function ChartBarExample() {
  return (
    <Example title="Bar Chart">
      <Card sx={styles.card}>
        <CardHeader>
          <CardTitle>Bar Chart - Multiple</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barChartConfig}>
            <BarChart accessibilityLayer data={barChartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter sx={styles.cardFooter}>
          <div sx={styles.row4}>
            Trending up by 5.2% this month{" "}
            <Icon
              icon={ChartUpIcon}

              sx={styles.icon}
            />
          </div>
          <div sx={styles.text}>
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </Example>
  )
}

const lineChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const lineChartConfig = {
  desktop: {
    label: "Desktop",
    color: theme.chart1,
  },
  mobile: {
    label: "Mobile",
    color: theme.chart2,
  },
} satisfies ChartConfig

function ChartLineExample() {
  return (
    <Example title="Line Chart">
      <Card sx={styles.card}>
        <CardHeader>
          <CardTitle>Line Chart - Multiple</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={lineChartConfig}>
            <LineChart
              accessibilityLayer
              data={lineChartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="desktop"
                type="monotone"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="mobile"
                type="monotone"
                stroke="var(--color-mobile)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div sx={styles.row}>
            <div sx={styles.grid}>
              <div sx={styles.row2}>
                Trending up by 5.2% this month{" "}
                <Icon
                  icon={ChartUpIcon}

                  sx={styles.icon}
                />
              </div>
              <div sx={styles.row3}>
                Showing total visitors for the last 6 months
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Example>
  )
}

const pieChartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
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
  other: {
    label: "Other",
    color: theme.chart5,
  },
} satisfies ChartConfig

function ChartPieExample() {
  const totalVisitors = React.useMemo(() => {
    return pieChartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  return (
    <Example title="Pie Chart">
      <Card sx={styles.card}>
        <CardHeader sx={styles.cardHeader}>
          <CardTitle>Pie Chart - Donut with Text</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
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
                innerRadius={60}
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
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            sx={styles.tspan}
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
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
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter sx={styles.cardFooter2}>
          <div sx={styles.row2}>
            Trending up by 5.2% this month{" "}
            <Icon
              icon={ChartUpIcon}

              sx={styles.icon}
            />
          </div>
          <div sx={styles.text}>
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </Example>
  )
}

const radarChartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const radarChartConfig = {
  desktop: {
    label: "Desktop",
    color: theme.chart1,
  },
  mobile: {
    label: "Mobile",
    color: theme.chart2,
  },
} satisfies ChartConfig

function ChartRadarExample() {
  return (
    <Example title="Radar Chart">
      <Card sx={styles.card}>
        <CardHeader sx={styles.cardHeader2}>
          <CardTitle>Radar Chart - Multiple</CardTitle>
          <CardDescription>
            Showing total visitors for the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent sx={styles.cardContent2}>
          <ChartContainer config={radarChartConfig} sx={styles.chartContainer}>
            <RadarChart data={radarChartData}>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <PolarAngleAxis dataKey="month" />
              <PolarGrid />
              <Radar
                dataKey="desktop"
                fill="var(--color-desktop)"
                fillOpacity={0.6}
              />
              <Radar dataKey="mobile" fill="var(--color-mobile)" />
            </RadarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter sx={styles.cardFooter2}>
          <div sx={styles.row2}>
            Trending up by 5.2% this month{" "}
            <Icon
              icon={ChartUpIcon}

              sx={styles.icon}
            />
          </div>
          <div sx={styles.row3}>January - June 2024</div>
        </CardFooter>
      </Card>
    </Example>
  )
}

const radialChartData = [
  { browser: "safari", visitors: 1260, fill: "var(--color-safari)" },
]

const radialChartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: theme.chart2,
  },
} satisfies ChartConfig

function ChartRadialExample() {
  return (
    <Example title="Radial Chart">
      <Card sx={styles.card}>
        <CardHeader>
          <CardTitle>Radial Chart - Shape</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent sx={styles.cardContent}>
          <ChartContainer
            config={radialChartConfig}
            sx={styles.chartContainer2}
          >
            <RadialBarChart
              data={radialChartData}
              endAngle={100}
              innerRadius={64}
              outerRadius={94}
            >
              <PolarGrid
                gridType="circle"
                radialLines={false}
                stroke="none"
                {...stylex.props(styles.polarGrid)}
                polarRadius={[86, 74]}
              />
              <RadialBar dataKey="visitors" background />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                            y={viewBox.cy}
                            sx={styles.tspan3}
                          >
                            {radialChartData[0].visitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            sx={styles.tspan2}
                          >
                            Visitors
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter sx={styles.cardFooter2}>
          <div sx={styles.row2}>
            Trending up by 5.2% this month{" "}
            <Icon
              icon={ChartUpIcon}

              sx={styles.icon}
            />
          </div>
          <div sx={styles.text}>
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </Example>
  )
}
