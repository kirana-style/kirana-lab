import { css } from "@kirana-style/core"
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
import { AudioWave01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  empty: css({
    paddingTop: spacing["4"],
    paddingBottom: spacing["4"],
    paddingInlineStart: spacing["4"],
    paddingInlineEnd: spacing["4"],
  }),
}

export function EmptyExploreCatalog() {
  return (
    <Card>
      <CardContent>
        <Empty sx={styles.empty}>
          <EmptyMedia variant="icon">
            <Icon icon={AudioWave01Icon} />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Explore Catalog</EmptyTitle>
            <EmptyDescription>
              Check your ISRC codes, metadata, and visual assets before going
              live.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button>View Catalog</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
