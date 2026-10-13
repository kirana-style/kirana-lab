import { css } from "@kirana-style/core"
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { radius } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  skeleton: css({
    height: spacing["5"],
    width: spacing["32"],
  }),
  skeleton2: css({
    height: spacing["4"],
    width: spacing["48"],
  }),
  cardContent: css({
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  }),
  skeleton3: css({
    height: spacing["32"],
    width: "100%",
    borderStartStartRadius: radius.lg,
    borderStartEndRadius: radius.lg,
    borderEndStartRadius: radius.lg,
    borderEndEndRadius: radius.lg,
  }),
  stack: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing["2"],
  }),
  skeleton4: css({
    height: spacing["4"],
    width: "100%",
  }),
  skeleton5: css({
    height: spacing["4"],
    width: "calc(3 / 4 * 100%)",
  }),
  skeleton6: css({
    height: spacing["4"],
    width: "calc(1 / 2 * 100%)",
  }),
  row: css({
    display: "flex",
    gap: spacing["2"],
  }),
  skeleton7: css({
    height: spacing["9"],
    flex: 1,
    borderStartStartRadius: radius.md,
    borderStartEndRadius: radius.md,
    borderEndStartRadius: radius.md,
    borderEndEndRadius: radius.md,
  }),
}

export function LoadingCard() {
  return (
    <Card>
      <CardHeader>
        <Skeleton sx={styles.skeleton} />
        <Skeleton sx={styles.skeleton2} />
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <Skeleton sx={styles.skeleton3} />
        <div sx={styles.stack}>
          <Skeleton sx={styles.skeleton4} />
          <Skeleton sx={styles.skeleton5} />
          <Skeleton sx={styles.skeleton6} />
        </div>
        <div sx={styles.row}>
          <Skeleton sx={styles.skeleton7} />
          <Skeleton sx={styles.skeleton7} />
        </div>
      </CardContent>
    </Card>
  )
}
