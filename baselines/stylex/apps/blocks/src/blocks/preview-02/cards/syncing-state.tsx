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
import { Spinner } from "@workspace/ui/components/spinner"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  cardContent: {
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
  },
  empty: {
    paddingTop: spacing["4"],
    paddingBottom: spacing["4"],
    paddingInlineStart: spacing["4"],
    paddingInlineEnd: spacing["4"],
  },
})

export function SyncingState() {
  return (
    <Card>
      <CardContent sx={styles.cardContent}>
        <Empty sx={styles.empty}>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Spinner />
            </EmptyMedia>
            <EmptyTitle>Syncing your accounts</EmptyTitle>
            <EmptyDescription>
              We&apos;re pulling in your latest transactions. This usually takes
              a few seconds.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline">Cancel</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
