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
import { Add01Icon } from "@hugeicons/core-free-icons"
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

export function EmptyDistributeTrack() {
  return (
    <Card>
      <CardContent>
        <Empty sx={styles.empty}>
          <EmptyMedia variant="icon">
            <Icon icon={Add01Icon} />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Distribute Track</EmptyTitle>
            <EmptyDescription>
              Upload your first master to start reaching listeners on Spotify,
              Apple Music, and more.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button>Create Release</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
