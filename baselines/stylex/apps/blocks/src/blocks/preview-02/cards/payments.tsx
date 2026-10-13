import * as stylex from "@stylexjs/stylex"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item"
import {
  ArrowRight01Icon,
  Calendar03Icon,
  MoreHorizontalCircle01Icon,
  RepeatIcon,
  Settings01Icon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  cardHeader: {
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["3"],
    columnGap: spacing["3"],
  },
  text: {
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
  icon: {
    width: spacing["4"],
    height: spacing["4"],
    flexShrink: 0,
    color: theme.mutedForeground,
  },
})

export function Payments() {
  return (
    <Card>
      <CardHeader sx={styles.cardHeader}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button size="icon-sm" variant="ghost" />}
                >
                  <Icon icon={MoreHorizontalCircle01Icon} />
                  <span sx={styles.text}>Account options</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Statements</DropdownMenuItem>
                    <DropdownMenuItem>Documents</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Payments</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          <Item variant="muted" render={<a href="#" />}>
            <ItemMedia variant="icon">
              <Icon icon={Settings01Icon} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Change transfer limit</ItemTitle>
              <ItemDescription>
                Adjust how much you can send from your balance.
              </ItemDescription>
            </ItemContent>
            <Icon
              icon={ArrowRight01Icon}

              sx={styles.icon}
            />
          </Item>
          <Item variant="muted" render={<a href="#" />}>
            <ItemMedia variant="icon">
              <Icon icon={Calendar03Icon} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Scheduled transfers</ItemTitle>
              <ItemDescription>
                Set up a transfer to send at a later date.
              </ItemDescription>
            </ItemContent>
            <Icon
              icon={ArrowRight01Icon}

              sx={styles.icon}
            />
          </Item>
          <Item variant="muted" render={<a href="#" />}>
            <ItemMedia variant="icon">
              <Icon icon={RepeatIcon} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Direct Debits</ItemTitle>
              <ItemDescription>
                Set up and manage regular payments.
              </ItemDescription>
            </ItemContent>
            <Icon
              icon={ArrowRight01Icon}

              sx={styles.icon}
            />
          </Item>
          <Item variant="muted" render={<a href="#" />}>
            <ItemMedia variant="icon">
              <Icon icon={RepeatIcon} />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Recurring card payments</ItemTitle>
              <ItemDescription>
                Manage your repeated card transactions.
              </ItemDescription>
            </ItemContent>
            <Icon
              icon={ArrowRight01Icon}

              sx={styles.icon}
            />
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
