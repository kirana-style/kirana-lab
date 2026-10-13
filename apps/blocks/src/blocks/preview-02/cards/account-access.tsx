import { css } from "@kirana-style/core"
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
import {
  AlertCircleIcon,
  ArrowRight01Icon,
  SquareLock02Icon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
} from "@workspace/ui/tokens/typography"

const styles = {
  row: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  link: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.wider,
    color: { base: theme.mutedForeground, ":hover": theme.foreground },
    textTransform: "uppercase",
  }),
  cardFooter: css({
    flexDirection: "column",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  }),
  button: css({
    width: "100%",
  }),
  icon: css({
    color: theme.destructive,
  }),
  itemDescription: css({
    overflowX: "hidden",
    overflowY: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
  }),
  icon2: css({
    width: spacing["4"],
    height: spacing["4"],
  }),
}

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
            <div sx={styles.row}>
              <FieldLabel htmlFor="current-password">
                Current Password
              </FieldLabel>
              <a href="#" sx={styles.link}>
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
      <CardFooter sx={styles.cardFooter}>
        <Button sx={styles.button}>
          <Icon icon={SquareLock02Icon} />
          Update Security
        </Button>
        <Item variant="muted" render={<a href="#" />}>
          <ItemMedia variant="icon">
            <Icon
              icon={AlertCircleIcon}

              sx={styles.icon}
            />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Danger Zone</ItemTitle>
            <ItemDescription sx={styles.itemDescription}>
              Archive account and remove catalog
            </ItemDescription>
          </ItemContent>
          <Icon
            icon={ArrowRight01Icon}

            sx={styles.icon2}
          />
        </Item>
      </CardFooter>
    </Card>
  )
}
