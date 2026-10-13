import * as stylex from "@stylexjs/stylex"
import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@workspace/ui/hooks/use-mobile"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

import { chartData } from "./chart-area-interactive-data"

const styles = stylex.create({
  card: {
    containerType: "inline-size",
    containerName: "card",
  },
  text: {
    display: { default: "none", "@container card (width >= 540px)": "block" },
  },
  text2: {
    display: { default: null, "@container card (width >= 540px)": "none" },
  },
  toggleGroup: {
    display: { default: "none", "@container card (width >= 767px)": "flex" },
  },
  toggleGroupItem: {
    paddingInlineStart: spacing["4"],
    paddingInlineEnd: spacing["4"],
  },
  selectTrigger: {
    display: { default: "flex", "@container card (width >= 767px)": "none" },
    width: spacing["40"],
  },
  // Was `**:data-[slot=select-value]:block truncate` on the trigger.
  selectValue: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  selectContent: {
    borderStartStartRadius: radius.xl,
    borderStartEndRadius: radius.xl,
    borderEndStartRadius: radius.xl,
    borderEndEndRadius: radius.xl,
  },
  selectItem: {
    borderStartStartRadius: radius.lg,
    borderStartEndRadius: radius.lg,
    borderEndStartRadius: radius.lg,
    borderEndEndRadius: radius.lg,
  },
  cardContent: {
    paddingInlineStart: {
      default: spacing["2"],
      [breakpoint.sm]: spacing["6"],
    },
    paddingInlineEnd: { default: spacing["2"], [breakpoint.sm]: spacing["6"] },
    paddingTop: { default: spacing["4"], [breakpoint.sm]: spacing["6"] },
  },
  chartContainer: {
    aspectRatio: "auto",
    height: "250px",
    width: "100%",
  },
})

export const description = "An interactive area chart"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: theme.primary,
  },
  mobile: {
    label: "Mobile",
    color: theme.primary,
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  // Narrows to seven days when the viewport becomes mobile. Adjusted while
  // rendering rather than in an effect, which would render twice.
  const [wasMobile, setWasMobile] = React.useState(isMobile)
  if (isMobile !== wasMobile) {
    setWasMobile(isMobile)
    if (isMobile) setTimeRange("7d")
  }

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card sx={styles.card}>
      <CardHeader>
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span sx={styles.text}>Total for the last 3 months</span>
          <span sx={styles.text2}>Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            multiple={false}
            value={timeRange ? [timeRange] : []}
            onValueChange={(value) => {
              setTimeRange(value[0] ?? "90d")
            }}
            variant="outline"
            sx={styles.toggleGroup}
          >
            <ToggleGroupItem value="90d" sx={styles.toggleGroupItem}>
              Last 3 months
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" sx={styles.toggleGroupItem}>
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" sx={styles.toggleGroupItem}>
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>
          <Select
            value={timeRange}
            onValueChange={(value) => {
              if (value !== null) {
                setTimeRange(value)
              }
            }}
          >
            <SelectTrigger
              sx={styles.selectTrigger}
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue
                placeholder="Last 3 months"
                sx={styles.selectValue}
              />
            </SelectTrigger>
            <SelectContent sx={styles.selectContent}>
              <SelectItem value="90d" sx={styles.selectItem}>
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" sx={styles.selectItem}>
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" sx={styles.selectItem}>
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <ChartContainer config={chartConfig} sx={styles.chartContainer}>
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(String(value)).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
