import * as stylex from "@stylexjs/stylex"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"

const styles = stylex.create({
  tableHead: {
    textAlign: "right",
  },
  tableCell: {
    textAlign: "right",
    fontVariantNumeric: "tabular-nums",
  },
  button: {
    marginLeft: "auto",
  },
})

const INVOICE_ITEMS = [
  { item: "Design System License", qty: 1, unitPrice: 499 },
  { item: "Priority Support", qty: 12, unitPrice: 99 },
  { item: "Custom Components", qty: 3, unitPrice: 250 },
] as const

const subtotal = INVOICE_ITEMS.reduce(
  (sum, row) => sum + row.qty * row.unitPrice,
  0
)
const tax = 0
const totalDue = subtotal + tax

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value)
}

export function Invoice() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice #INV-2847</CardTitle>
        <CardDescription>Due March 30, 2026</CardDescription>
        <CardAction>
          <Badge variant="secondary">Pending</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead sx={styles.tableHead}>Qty</TableHead>
              <TableHead sx={styles.tableHead}>Rate</TableHead>
              <TableHead sx={styles.tableHead}>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {INVOICE_ITEMS.map((row) => (
              <TableRow key={row.item}>
                <TableCell>{row.item}</TableCell>
                <TableCell sx={styles.tableCell}>{row.qty}</TableCell>
                <TableCell sx={styles.tableCell}>
                  {formatCurrency(row.unitPrice)}
                </TableCell>
                <TableCell sx={styles.tableCell}>
                  {formatCurrency(row.qty * row.unitPrice)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} sx={styles.tableHead}>
                Subtotal
              </TableCell>
              <TableCell sx={styles.tableCell}>
                {formatCurrency(subtotal)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} sx={styles.tableHead}>
                Tax
              </TableCell>
              <TableCell sx={styles.tableCell}>$0.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} sx={styles.tableHead}>
                Total Due
              </TableCell>
              <TableCell sx={styles.tableCell}>
                {formatCurrency(totalDue)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Download PDF
        </Button>
        <Button size="sm" sx={styles.button}>
          Pay Now
        </Button>
      </CardFooter>
    </Card>
  )
}
