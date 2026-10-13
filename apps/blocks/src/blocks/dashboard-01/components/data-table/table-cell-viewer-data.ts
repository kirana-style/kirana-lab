import type { ChartConfig } from "@workspace/ui/components/chart"
import { theme } from "@workspace/ui/theme/semantic"

/** Visitors for the last six months, shown in a row's drawer. */
export const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

export const chartConfig = {
  desktop: {
    label: "Desktop",
    color: theme.primary,
  },
  mobile: {
    label: "Mobile",
    color: theme.primary,
  },
} satisfies ChartConfig
