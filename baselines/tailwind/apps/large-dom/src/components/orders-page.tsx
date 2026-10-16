import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
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

import { ThemeToggle } from "@/components/theme-toggle"
import { LABELS, OWNERS, STATUSES, orders } from "@/data/orders"
import type { Status } from "@/data/orders"

const VARIANT = {
  paid: "secondary",
  pending: "outline",
  overdue: "destructive",
  draft: "ghost",
} as const

/** The large-dom corpus: `rows` orders, a status filter, and the row's controls. */
export function OrdersPage({ rows }: { rows: number }) {
  const all = React.useMemo(() => orders(rows), [rows])
  const [status, setStatus] = React.useState<Status | "all">("all")
  const shown =
    status === "all" ? all : all.filter((order) => order.status === status)

  return (
    <main className="flex flex-col gap-4 p-6">
      <header className="flex flex-wrap items-center gap-3">
        <h1 className="me-auto text-lg font-semibold">Orders</h1>
        <div className="flex gap-1" role="group" aria-label="Status">
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
            <TableHead className="text-end tabular-nums">Amount</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {shown.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono text-muted-foreground">
                {order.id}
              </TableCell>
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
              <TableCell className="text-end tabular-nums">
                {order.amount}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
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
                    <HugeiconsIcon icon={MoreHorizontalIcon} strokeWidth={2} />
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
