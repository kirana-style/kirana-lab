import * as stylex from "@stylexjs/stylex"
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { radius } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  skeleton: {
    height: spacing["5"],
    width: spacing["32"],
  },
  skeleton2: {
    height: spacing["4"],
    width: spacing["48"],
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  },
  skeleton3: {
    height: spacing["32"],
    width: "100%",
    borderStartStartRadius: radius.lg,
    borderStartEndRadius: radius.lg,
    borderEndStartRadius: radius.lg,
    borderEndEndRadius: radius.lg,
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["2"],
  },
  skeleton4: {
    height: spacing["4"],
    width: "100%",
  },
  skeleton5: {
    height: spacing["4"],
    width: "calc(3 / 4 * 100%)",
  },
  skeleton6: {
    height: spacing["4"],
    width: "calc(1 / 2 * 100%)",
  },
  row: {
    display: "flex",
    gap: spacing["2"],
  },
  skeleton7: {
    height: spacing["9"],
    flex: 1,
    borderStartStartRadius: radius.md,
    borderStartEndRadius: radius.md,
    borderEndStartRadius: radius.md,
    borderEndEndRadius: radius.md,
  },
})

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
