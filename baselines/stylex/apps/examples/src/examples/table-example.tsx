import * as stylex from "@stylexjs/stylex"
import { Example, ExampleWrapper } from "@/components/example"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { MoreHorizontalCircle01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { color } from "@workspace/ui/tokens/colors.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  tableHead: {
    width: "100px",
  },
  tableHead2: {
    textAlign: "right",
  },
  tableCell: {
    fontWeight: fontWeight.medium,
  },
  text: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "calc(infinity * 1px)",
    backgroundColor: `color-mix(in oklab, ${color.green500} 10%, transparent)`,
    paddingInline: spacing["2"],
    paddingBlock: spacing["1"],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    color: `light-dark(${color.green700}, ${color.green400})`,
  },
  text2: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "calc(infinity * 1px)",
    backgroundColor: `color-mix(in oklab, ${color.blue500} 10%, transparent)`,
    paddingInline: spacing["2"],
    paddingBlock: spacing["1"],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    color: `light-dark(${color.blue700}, ${color.blue400})`,
  },
  text3: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "calc(infinity * 1px)",
    backgroundColor: `color-mix(in oklab, ${color.yellow500} 10%, transparent)`,
    paddingInline: spacing["2"],
    paddingBlock: spacing["1"],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    color: `light-dark(${color.yellow700}, ${color.yellow400})`,
  },
  text4: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: "calc(infinity * 1px)",
    backgroundColor: `color-mix(in oklab, ${color.gray500} 10%, transparent)`,
    paddingInline: spacing["2"],
    paddingBlock: spacing["1"],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    color: `light-dark(${color.gray700}, ${color.gray400})`,
  },
  button: {
    width: spacing["8"],
    height: spacing["8"],
  },
  text5: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
    borderColor: theme.border,
  },
  selectTrigger: {
    width: spacing["40"],
  },
  input: {
    height: spacing["8"],
    width: spacing["20"],
  },
})

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export default function TableExample() {
  return (
    <ExampleWrapper>
      <TableBasic />
      <TableWithFooter />
      <TableSimple />
      <TableWithBadges />
      <TableWithActions />
      <TableWithSelect />
      <TableWithInput />
    </ExampleWrapper>
  )
}

function TableBasic() {
  return (
    <Example title="Basic">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead sx={styles.tableHead}>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead sx={styles.tableHead2}>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.slice(0, 3).map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell sx={styles.tableCell}>{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell sx={styles.tableHead2}>
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Example>
  )
}

function TableWithFooter() {
  return (
    <Example title="With Footer">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead sx={styles.tableHead}>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead sx={styles.tableHead2}>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.slice(0, 3).map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell sx={styles.tableCell}>{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell sx={styles.tableHead2}>
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell sx={styles.tableHead2}>$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Example>
  )
}

function TableSimple() {
  return (
    <Example title="Simple">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead sx={styles.tableHead2}>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell sx={styles.tableCell}>Sarah Chen</TableCell>
            <TableCell>sarah.chen@acme.com</TableCell>
            <TableCell sx={styles.tableHead2}>Admin</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.tableCell}>Marc Rodriguez</TableCell>
            <TableCell>marcus.rodriguez@acme.com</TableCell>
            <TableCell sx={styles.tableHead2}>User</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.tableCell}>Emily Watson</TableCell>
            <TableCell>emily.watson@acme.com</TableCell>
            <TableCell sx={styles.tableHead2}>User</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Example>
  )
}

function TableWithBadges() {
  return (
    <Example title="With Badges">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Status</TableHead>
            <TableHead sx={styles.tableHead2}>Priority</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell sx={styles.tableCell}>Design homepage</TableCell>
            <TableCell>
              <span sx={styles.text}>Completed</span>
            </TableCell>
            <TableCell sx={styles.tableHead2}>
              <span sx={styles.text2}>High</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.tableCell}>Implement API</TableCell>
            <TableCell>
              <span sx={styles.text3}>In Progress</span>
            </TableCell>
            <TableCell sx={styles.tableHead2}>
              <span sx={styles.text4}>Medium</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.tableCell}>Write tests</TableCell>
            <TableCell>
              <span sx={styles.text4}>Pending</span>
            </TableCell>
            <TableCell sx={styles.tableHead2}>
              <span sx={styles.text4}>Low</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Example>
  )
}

function TableWithActions() {
  return (
    <Example title="With Actions">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead sx={styles.tableHead2}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell sx={styles.tableCell}>Wireless Mouse</TableCell>
            <TableCell>$29.99</TableCell>
            <TableCell sx={styles.tableHead2}>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" sx={styles.button} />
                  }
                >
                  <Icon icon={MoreHorizontalCircle01Icon} />
                  <span sx={styles.text5}>Open menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.tableCell}>Mechanical Keyboard</TableCell>
            <TableCell>$129.99</TableCell>
            <TableCell sx={styles.tableHead2}>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" sx={styles.button} />
                  }
                >
                  <Icon icon={MoreHorizontalCircle01Icon} />
                  <span sx={styles.text5}>Open menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.tableCell}>USB-C Hub</TableCell>
            <TableCell>$49.99</TableCell>
            <TableCell sx={styles.tableHead2}>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="ghost" size="icon" sx={styles.button} />
                  }
                >
                  <Icon icon={MoreHorizontalCircle01Icon} />
                  <span sx={styles.text5}>Open menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Example>
  )
}

const people = [
  { value: "sarah", label: "Sarah Chen" },
  { value: "marcus", label: "Marc Rodriguez" },
  { value: "emily", label: "Emily Watson" },
  { value: "david", label: "David Kim" },
]

const tasks = [
  {
    task: "Design homepage",
    assignee: "sarah",
    status: "In Progress",
  },
  {
    task: "Implement API",
    assignee: "marcus",
    status: "Pending",
  },
  {
    task: "Write tests",
    assignee: "emily",
    status: "Not Started",
  },
]

function TableWithSelect() {
  return (
    <Example title="With Select">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((item) => (
            <TableRow key={item.task}>
              <TableCell sx={styles.tableCell}>{item.task}</TableCell>
              <TableCell>
                <Select
                  items={people}
                  defaultValue={people.find(
                    (person) => person.value === item.assignee
                  )}
                  itemToStringValue={(option) => {
                    return option.value
                  }}
                >
                  <SelectTrigger sx={styles.selectTrigger} size="sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {people.map((person) => (
                        <SelectItem key={person.value} value={person}>
                          {person.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Example>
  )
}

function TableWithInput() {
  return (
    <Example title="With Input">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell sx={styles.tableCell}>Wireless Mouse</TableCell>
            <TableCell>
              <Input type="number" defaultValue="1" sx={styles.input} min="0" />
            </TableCell>
            <TableCell>$29.99</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.tableCell}>Mechanical Keyboard</TableCell>
            <TableCell>
              <Input type="number" defaultValue="2" sx={styles.input} min="0" />
            </TableCell>
            <TableCell>$129.99</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={styles.tableCell}>USB-C Hub</TableCell>
            <TableCell>
              <Input type="number" defaultValue="1" sx={styles.input} min="0" />
            </TableCell>
            <TableCell>$49.99</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Example>
  )
}
