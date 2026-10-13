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
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowRight01Icon,
  Calendar03Icon,
  MoreHorizontalCircle01Icon,
  RepeatIcon,
  Settings01Icon,
} from "@hugeicons/core-free-icons"

export function Payments() {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-3">
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
                  <HugeiconsIcon
                    strokeWidth={2}

                    icon={MoreHorizontalCircle01Icon}
                  />
                  <span className="sr-only">Account options</span>
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
              <HugeiconsIcon
                strokeWidth={2}

                icon={Settings01Icon}
              />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Change transfer limit</ItemTitle>
              <ItemDescription>
                Adjust how much you can send from your balance.
              </ItemDescription>
            </ItemContent>
            <HugeiconsIcon
              strokeWidth={2}

              icon={ArrowRight01Icon}

              className="size-4 shrink-0 text-muted-foreground"
            />
          </Item>
          <Item variant="muted" render={<a href="#" />}>
            <ItemMedia variant="icon">
              <HugeiconsIcon
                strokeWidth={2}

                icon={Calendar03Icon}
              />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Scheduled transfers</ItemTitle>
              <ItemDescription>
                Set up a transfer to send at a later date.
              </ItemDescription>
            </ItemContent>
            <HugeiconsIcon
              strokeWidth={2}

              icon={ArrowRight01Icon}

              className="size-4 shrink-0 text-muted-foreground"
            />
          </Item>
          <Item variant="muted" render={<a href="#" />}>
            <ItemMedia variant="icon">
              <HugeiconsIcon
                strokeWidth={2}

                icon={RepeatIcon}
              />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Direct Debits</ItemTitle>
              <ItemDescription>
                Set up and manage regular payments.
              </ItemDescription>
            </ItemContent>
            <HugeiconsIcon
              strokeWidth={2}

              icon={ArrowRight01Icon}

              className="size-4 shrink-0 text-muted-foreground"
            />
          </Item>
          <Item variant="muted" render={<a href="#" />}>
            <ItemMedia variant="icon">
              <HugeiconsIcon
                strokeWidth={2}

                icon={RepeatIcon}
              />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Recurring card payments</ItemTitle>
              <ItemDescription>
                Manage your repeated card transactions.
              </ItemDescription>
            </ItemContent>
            <HugeiconsIcon
              strokeWidth={2}

              icon={ArrowRight01Icon}

              className="size-4 shrink-0 text-muted-foreground"
            />
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
