import { css } from "@kirana-style/core"
import * as React from "react"

import { Badge } from "@workspace/ui/components/badge"
import { Calendar } from "@workspace/ui/components/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@workspace/ui/components/item"
import { calendarCtx } from "@workspace/ui/theme/context"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  cardContent: css({
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  }),
  item: css({
    justifyContent: "center",
  }),
  calendar: css({
    width: "100%",
    // On the calendar itself, so both sizes replace its own default.
    [calendarCtx.cellSize]: {
      base: spacing["8"],
      [breakpoint.md]: spacing["10"],
    },
  }),
  itemGroup: css({
    width: "100%",
  }),
}

export function UpcomingPayments() {
  const [date, setDate] = React.useState<Date | undefined>(() => new Date())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Payments</CardTitle>
        <CardDescription>
          Select a date to view scheduled payments.
        </CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <Item variant="outline" sx={styles.item}>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            sx={styles.calendar}
          />
        </Item>
        <ItemGroup sx={styles.itemGroup}>
          <Item variant="muted">
            <ItemContent>
              <ItemTitle>Netflix Subscription</ItemTitle>
              <ItemDescription>Apr 15, 2024</ItemDescription>
            </ItemContent>
            <Badge variant="secondary">$19.99</Badge>
          </Item>
          <Item variant="muted">
            <ItemContent>
              <ItemTitle>Rent Payment</ItemTitle>
              <ItemDescription>Apr 1, 2024</ItemDescription>
            </ItemContent>
            <Badge variant="secondary">$2,400.00</Badge>
          </Item>
          <Item variant="muted">
            <ItemContent>
              <ItemTitle>Auto Insurance</ItemTitle>
              <ItemDescription>Apr 22, 2024</ItemDescription>
            </ItemContent>
            <Badge variant="secondary">$186.00</Badge>
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
