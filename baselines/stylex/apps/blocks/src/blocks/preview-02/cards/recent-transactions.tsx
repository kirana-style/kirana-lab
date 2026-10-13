import * as stylex from "@stylexjs/stylex"
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@workspace/ui/components/table"
import {
  Car01Icon,
  CoffeeIcon,
  MoreVerticalCircle01Icon,
  ShoppingCart01Icon,
  Tv01Icon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { color } from "@workspace/ui/tokens/colors.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  tableCell: {
    width: spacing["10"],
  },
  row: {
    display: "flex",
    width: spacing["10"],
    height: spacing["10"],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    backgroundColor: theme.muted,
  },
  icon: {
    width: spacing["4"],
    height: spacing["4"],
    flexShrink: 0,
  },
  stack: {
    display: "flex",
    flexDirection: "column",
  },
  text: {
    fontWeight: fontWeight.medium,
  },
  text2: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  },
  tableCell2: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  },
  tableCell3: {
    textAlign: "right",
  },
  text3: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  },
  tableCell4: {
    width: spacing["8"],
  },
  text4: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
    color: color.emerald500,
    fontVariantNumeric: "tabular-nums",
  },
})

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest account activity.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell sx={styles.tableCell}>
                <div sx={styles.row}>
                  <Icon
                    sx={styles.icon}

                    icon={CoffeeIcon}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div sx={styles.stack}>
                  <span sx={styles.text}>Blue Bottle Coffee</span>
                  <span sx={styles.text2}>Food & Drink</span>
                </div>
              </TableCell>
              <TableCell sx={styles.tableCell2}>Today, 10:24 AM</TableCell>
              <TableCell sx={styles.tableCell3}>
                <span sx={styles.text3}>-$6.50</span>
              </TableCell>
              <TableCell sx={styles.tableCell4}>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="ghost" size="icon-sm" />}
                  >
                    <Icon icon={MoreVerticalCircle01Icon} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Add note</DropdownMenuItem>
                    <DropdownMenuItem>Categorize</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Dispute</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={styles.tableCell}>
                <div sx={styles.row}>
                  <Icon
                    sx={styles.icon}

                    icon={ShoppingCart01Icon}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div sx={styles.stack}>
                  <span sx={styles.text}>Whole Foods Market</span>
                  <span sx={styles.text2}>Groceries</span>
                </div>
              </TableCell>
              <TableCell sx={styles.tableCell2}>Yesterday</TableCell>
              <TableCell sx={styles.tableCell3}>
                <span sx={styles.text3}>-$142.30</span>
              </TableCell>
              <TableCell sx={styles.tableCell4}>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="ghost" size="icon-sm" />}
                  >
                    <Icon icon={MoreVerticalCircle01Icon} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Add note</DropdownMenuItem>
                    <DropdownMenuItem>Categorize</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Dispute</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={styles.tableCell}>
                <div sx={styles.row}>
                  <Icon
                    sx={styles.icon}

                    icon={Wallet01Icon}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div sx={styles.stack}>
                  <span sx={styles.text}>Stripe Payout</span>
                  <span sx={styles.text2}>Income</span>
                </div>
              </TableCell>
              <TableCell sx={styles.tableCell2}>Oct 12</TableCell>
              <TableCell sx={styles.tableCell3}>
                <span sx={styles.text4}>+$4,200.00</span>
              </TableCell>
              <TableCell sx={styles.tableCell4}>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="ghost" size="icon-sm" />}
                  >
                    <Icon icon={MoreVerticalCircle01Icon} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Add note</DropdownMenuItem>
                    <DropdownMenuItem>Categorize</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Dispute</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={styles.tableCell}>
                <div sx={styles.row}>
                  <Icon
                    sx={styles.icon}

                    icon={Car01Icon}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div sx={styles.stack}>
                  <span sx={styles.text}>Uber Technologies</span>
                  <span sx={styles.text2}>Transport</span>
                </div>
              </TableCell>
              <TableCell sx={styles.tableCell2}>Oct 11</TableCell>
              <TableCell sx={styles.tableCell3}>
                <span sx={styles.text3}>-$24.10</span>
              </TableCell>
              <TableCell sx={styles.tableCell4}>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="ghost" size="icon-sm" />}
                  >
                    <Icon icon={MoreVerticalCircle01Icon} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Add note</DropdownMenuItem>
                    <DropdownMenuItem>Categorize</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Dispute</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={styles.tableCell}>
                <div sx={styles.row}>
                  <Icon
                    sx={styles.icon}

                    icon={Tv01Icon}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div sx={styles.stack}>
                  <span sx={styles.text}>Netflix Subscription</span>
                  <span sx={styles.text2}>Entertainment</span>
                </div>
              </TableCell>
              <TableCell sx={styles.tableCell2}>Oct 10</TableCell>
              <TableCell sx={styles.tableCell3}>
                <span sx={styles.text3}>-$19.99</span>
              </TableCell>
              <TableCell sx={styles.tableCell4}>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="ghost" size="icon-sm" />}
                  >
                    <Icon icon={MoreVerticalCircle01Icon} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Add note</DropdownMenuItem>
                    <DropdownMenuItem>Categorize</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Dispute</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
