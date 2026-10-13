import * as stylex from "@stylexjs/stylex"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  empty: {
    height: spacing["48"],
  },
})

export function AnomalyAlert() {
  return (
    <Card>
      <CardContent>
        <Empty sx={styles.empty}>
          <EmptyHeader>
            <EmptyTitle>Get alerted for anomalies</EmptyTitle>
            <EmptyDescription>
              Automatically monitor your projects for anomalies and get
              notified.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button>Upgrade to Observability Plus</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
