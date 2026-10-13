import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@workspace/ui/components/item"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  AlertCircleIcon,
  ArrowRight01Icon,
  SquareLock02Icon,
} from "@hugeicons/core-free-icons"

export function AccountAccess() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Access</CardTitle>
        <CardDescription>
          Update your credentials or re-authenticate.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="email-address">Email Address</FieldLabel>
            <Input
              id="email-address"
              type="email"
              defaultValue="artist@studio.inc"
            />
          </Field>
          <Field>
            <div className="flex items-center justify-between">
              <FieldLabel htmlFor="current-password">
                Current Password
              </FieldLabel>
              <a
                href="#"
                className="text-xs font-medium tracking-wider text-muted-foreground uppercase hover:text-foreground"
              >
                Forgot?
              </a>
            </div>
            <Input
              id="current-password"
              type="password"
              defaultValue="password123"
            />
          </Field>
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <Button className="w-full">
          <HugeiconsIcon
            strokeWidth={2}

            icon={SquareLock02Icon}
          />
          Update Security
        </Button>
        <Item variant="muted" render={<a href="#" />}>
          <ItemMedia variant="icon">
            <HugeiconsIcon
              strokeWidth={2}

              icon={AlertCircleIcon}

              className="text-destructive"
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Danger Zone</ItemTitle>
            <ItemDescription className="line-clamp-1">
              Archive account and remove catalog
            </ItemDescription>
          </ItemContent>
          <HugeiconsIcon
            strokeWidth={2}

            icon={ArrowRight01Icon}

            className="size-4"
          />
        </Item>
      </CardFooter>
    </Card>
  )
}
