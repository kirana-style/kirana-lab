import { css } from "@kirana-style/core"
import { Bar, BarChart } from "recharts"

import { Button } from "@workspace/ui/components/button"
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
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@workspace/ui/components/item"
import { useDesignSystemSearchParams } from "@/lib/design-system"
import { Cancel01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography"

const styles = {
  button: css({
    backgroundColor: theme.muted,
  }),
  chartContainer: css({
    display: { base: "none", [breakpoint.md]: "block" },
    height: spacing["8"],
    width: spacing["24"],
  }),
  text: css({
    display: { base: "none", [breakpoint.md]: "block" },
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
}

const HOLDINGS = [
  {
    name: "Vanguard VIG",
    shares: "450 Shares",
    amount: "$1,842.10",
    data: [
      { q: "Q1", value: 380 },
      { q: "Q2", value: 420 },
      { q: "Q3", value: 390 },
      { q: "Q4", value: 652 },
    ],
  },
  {
    name: "S&P 500 VOO",
    shares: "112 Shares",
    amount: "$928.40",
    data: [
      { q: "Q1", value: 180 },
      { q: "Q2", value: 210 },
      { q: "Q3", value: 320 },
      { q: "Q4", value: 218 },
    ],
  },
  {
    name: "Apple AAPL",
    shares: "85 Shares",
    amount: "$340.00",
    data: [
      { q: "Q1", value: 60 },
      { q: "Q2", value: 70 },
      { q: "Q3", value: 120 },
      { q: "Q4", value: 90 },
    ],
  },
  {
    name: "Realty Income",
    shares: "320 Shares",
    amount: "$1,139.50",
    data: [
      { q: "Q1", value: 240 },
      { q: "Q2", value: 260 },
      { q: "Q3", value: 280 },
      { q: "Q4", value: 360 },
    ],
  },
]

const miniChartConfig = {
  value: {
    label: "Dividend",
    color: theme.chart2,
  },
} satisfies ChartConfig

export function DividendIncome() {
  const [params] = useDesignSystemSearchParams()
  const isRounded = !["lyra", "sera"].includes(params.style)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Q2 Dividend Income</CardTitle>
        <CardDescription>
          Quarterly dividend payouts across your portfolio holdings.
        </CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon-sm" sx={styles.button}>
            <Icon icon={Cancel01Icon} />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {HOLDINGS.map((holding) => (
            <Item key={holding.name} variant="muted">
              <ItemContent>
                <ItemTitle>{holding.name}</ItemTitle>
                <ItemDescription>{holding.shares}</ItemDescription>
              </ItemContent>
              <ChartContainer
                config={miniChartConfig}
                sx={styles.chartContainer}
              >
                <BarChart
                  data={holding.data}
                  margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                >
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="value"
                    fill="var(--color-value)"
                    radius={isRounded ? [3, 3, 0, 0] : 0}
                  />
                </BarChart>
              </ChartContainer>
              <span sx={styles.text}>{holding.amount}</span>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
