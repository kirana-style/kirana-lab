import { createFileRoute } from "@tanstack/react-router"

import { OrdersPage } from "@/components/orders-page"
import { rowsFrom } from "@/data/orders"

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    rows: rowsFrom(search.rows),
  }),
  component: App,
})

function App() {
  const { rows } = Route.useSearch()
  return <OrdersPage rows={rows} />
}
