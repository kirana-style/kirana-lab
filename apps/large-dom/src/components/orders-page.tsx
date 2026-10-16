import * as React from "react"
import { css } from "@kirana-style/core"
import { MoreHorizontalIcon } from "@hugeicons/core-free-icons"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  NativeSelect,
  NativeSelectOption,
} from "@workspace/ui/components/native-select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { Icon } from "@workspace/ui/primitives"
import { VisuallyHidden } from "@workspace/ui/primitives/visually-hidden"
import { theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography"

import { ThemeToggle } from "@/components/theme-toggle"
import { LABELS, OWNERS, STATUSES, orders } from "@/data/orders"
import type { Status } from "@/data/orders"

const VARIANT = {
  paid: "secondary",
  pending: "outline",
  overdue: "destructive",
  draft: "ghost",
} as const

const styles = {
  page: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing[4],
    padding: spacing[6],
  }),
  toolbar: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing[3],
  }),
  title: css({
    marginInlineEnd: "auto",
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.semibold,
  }),
  filters: css({ display: "flex", gap: spacing[1] }),
  id: css({ fontFamily: fontFamily.mono, color: theme.mutedForeground }),
  amount: css({ textAlign: "end", fontVariantNumeric: "tabular-nums" }),
  actions: css({
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: spacing[2],
  }),
}

/** The large-dom corpus: `rows` orders, a status filter, and the row's controls. */
export function OrdersPage({ rows }: { rows: number }) {
  const all = React.useMemo(() => orders(rows), [rows])
  const [status, setStatus] = React.useState<Status | "all">("all")
  const shown =
    status === "all" ? all : all.filter((order) => order.status === status)

  return (
    <main sx={styles.page}>
      <header sx={styles.toolbar}>
        <h1 sx={styles.title}>Orders</h1>
        <div sx={styles.filters} role="group" aria-label="Status">
          {(["all", ...STATUSES] as const).map((value) => (
            <Button
              key={value}
              size="sm"
              variant={status === value ? "secondary" : "ghost"}
              aria-pressed={status === value}
              onClick={() => setStatus(value)}
            >
              {value === "all" ? "All" : LABELS[value]}
            </Button>
          ))}
        </div>
        <ThemeToggle />
      </header>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead sx={styles.amount}>Amount</TableHead>
            <TableHead>
              <VisuallyHidden>Actions</VisuallyHidden>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shown.map((order) => (
            <TableRow key={order.id}>
              <TableCell sx={styles.id}>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>
                <Badge variant={VARIANT[order.status]}>
                  {LABELS[order.status]}
                </Badge>
              </TableCell>
              <TableCell>{order.due}</TableCell>
              <TableCell>
                <NativeSelect
                  size="sm"
                  defaultValue={order.owner}
                  aria-label={`Owner of ${order.id}`}
                >
                  {OWNERS.map((owner) => (
                    <NativeSelectOption key={owner} value={owner}>
                      {owner}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </TableCell>
              <TableCell sx={styles.amount}>{order.amount}</TableCell>
              <TableCell>
                <div sx={styles.actions}>
                  {order.status === "pending" ? (
                    <Button size="xs" variant="outline">
                      Approve
                    </Button>
                  ) : null}
                  <Button
                    size="icon-xs"
                    variant="ghost"
                    aria-label={`More for ${order.id}`}
                  >
                    <Icon icon={MoreHorizontalIcon} strokeWidth={2} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
