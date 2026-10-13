import * as stylex from "@stylexjs/stylex"
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
import { calendarCtx } from "@workspace/ui/theme/context.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  cardContent: {
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  },
  item: {
    justifyContent: "center",
    [calendarCtx.cellSize]: spacing["8"],
  },
  calendar: {
    width: "100%",
    // The narrow size sits on the parent and the wide one here: StyleX emits a
    // custom property's plain value outside the cascade layers, where it would
    // beat a breakpoint written beside it.
    [calendarCtx.cellSize]: { default: null, [breakpoint.md]: spacing["10"] },
  },
  itemGroup: {
    width: "100%",
  },
})

export function UpcomingPayments() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

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
