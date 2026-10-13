import { css } from "@kirana-style/core"
import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { ChartDownIcon, ChartUpIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { alpha, theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography"
import { shadow } from "@workspace/ui/tokens/shadows"

const styles = {
  grid: css({
    display: "grid",
    gridTemplateColumns: {
      base: "repeat(1, minmax(0, 1fr))",
      "@container main (width >= 36rem)": "repeat(2, minmax(0, 1fr))",
      "@container main (width >= 64rem)": "repeat(4, minmax(0, 1fr))",
    },
    gap: spacing["4"],
    paddingInline: { base: spacing["4"], [breakpoint.lg]: spacing["6"] },
  }),
  // Was `*:data-[slot=card]:bg-linear-to-t from-primary/5 to-card shadow-xs` on
  // the grid. The card's ring comes first, as Tailwind emits it.
  card: css({
    containerType: "inline-size",
    containerName: "card",
    backgroundImage: `linear-gradient(to top in oklab, ${alpha.primary5}, ${theme.card})`,
    boxShadow: `0 0 0 1px ${alpha.foreground10}, ${shadow.xs}`,
  }),
  cardTitle: css({
    fontSize: {
      base: fontSize["2xl"],
      "@container card (width >= 250px)": fontSize["3xl"],
    },
    lineHeight: {
      base: lineHeight["2xl"],
      "@container card (width >= 250px)": lineHeight["3xl"],
    },
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
  cardFooter: css({
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: spacing["1.5"],
    columnGap: spacing["1.5"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  row: css({
    overflow: "hidden",
    display: "flex",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    gap: spacing["2"],
    fontWeight: fontWeight.medium,
  }),
  icon: css({
    width: spacing["4"],
    height: spacing["4"],
  }),
  text: css({
    color: theme.mutedForeground,
  }),
}

export function SectionCards() {
  return (
    <div sx={styles.grid}>
      <Card sx={styles.card}>
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle sx={styles.cardTitle}>$1,250.00</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Icon icon={ChartUpIcon} />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter sx={styles.cardFooter}>
          <div sx={styles.row}>
            Trending up this month{" "}
            <Icon
              icon={ChartUpIcon}

              sx={styles.icon}
            />
          </div>
          <div sx={styles.text}>Visitors for the last 6 months</div>
        </CardFooter>
      </Card>
      <Card sx={styles.card}>
        <CardHeader>
          <CardDescription>New Customers</CardDescription>
          <CardTitle sx={styles.cardTitle}>1,234</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Icon icon={ChartDownIcon} />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter sx={styles.cardFooter}>
          <div sx={styles.row}>
            Down 20% this period{" "}
            <Icon
              icon={ChartDownIcon}

              sx={styles.icon}
            />
          </div>
          <div sx={styles.text}>Acquisition needs attention</div>
        </CardFooter>
      </Card>
      <Card sx={styles.card}>
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle sx={styles.cardTitle}>45,678</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Icon icon={ChartUpIcon} />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter sx={styles.cardFooter}>
          <div sx={styles.row}>
            Strong user retention{" "}
            <Icon
              icon={ChartUpIcon}

              sx={styles.icon}
            />
          </div>
          <div sx={styles.text}>Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card sx={styles.card}>
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle sx={styles.cardTitle}>4.5%</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <Icon icon={ChartUpIcon} />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter sx={styles.cardFooter}>
          <div sx={styles.row}>
            Steady performance increase{" "}
            <Icon
              icon={ChartUpIcon}

              sx={styles.icon}
            />
          </div>
          <div sx={styles.text}>Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  )
}
