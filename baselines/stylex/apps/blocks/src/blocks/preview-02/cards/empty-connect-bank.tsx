import * as stylex from "@stylexjs/stylex"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import { CreditCardIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  empty: {
    paddingTop: spacing["4"],
    paddingBottom: spacing["4"],
    paddingInlineStart: spacing["4"],
    paddingInlineEnd: spacing["4"],
  },
})

export function EmptyConnectBank() {
  return (
    <Card>
      <CardContent>
        <Empty sx={styles.empty}>
          <EmptyMedia variant="icon">
            <Icon icon={CreditCardIcon} />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Connect Bank</EmptyTitle>
            <EmptyDescription>
              Link your payout method to receive monthly royalty distributions
              automatically.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button>Set Up Payouts</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
