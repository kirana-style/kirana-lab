import * as stylex from "@stylexjs/stylex"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  cardContent: {
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: spacing["3"],
  },
  skeleton: {
    width: spacing["10"],
    height: spacing["10"],
    borderStartStartRadius: "calc(infinity * 1px)",
    borderStartEndRadius: "calc(infinity * 1px)",
    borderEndStartRadius: "calc(infinity * 1px)",
    borderEndEndRadius: "calc(infinity * 1px)",
  },
  stack: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacing["2"],
  },
  skeleton2: {
    height: spacing["4"],
    width: "calc(3 / 4 * 100%)",
  },
  skeleton3: {
    height: spacing["3"],
    width: "calc(1 / 2 * 100%)",
  },
  stack2: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["2"],
  },
  skeleton4: {
    height: spacing["3"],
    width: "100%",
  },
  skeleton5: {
    height: spacing["3"],
    width: "calc(4 / 5 * 100%)",
  },
  row2: {
    display: "flex",
    gap: spacing["2"],
  },
  skeleton6: {
    height: spacing["8"],
    width: spacing["20"],
  },
})

export function SkeletonLoading() {
  return (
    <Card>
      <CardContent sx={styles.cardContent}>
        <div sx={styles.row}>
          <Skeleton sx={styles.skeleton} />
          <div sx={styles.stack}>
            <Skeleton sx={styles.skeleton2} />
            <Skeleton sx={styles.skeleton3} />
          </div>
        </div>
        <div sx={styles.stack2}>
          <Skeleton sx={styles.skeleton4} />
          <Skeleton sx={styles.skeleton4} />
          <Skeleton sx={styles.skeleton5} />
        </div>
        <div sx={styles.row2}>
          <Skeleton sx={styles.skeleton6} />
          <Skeleton sx={styles.skeleton6} />
        </div>
      </CardContent>
    </Card>
  )
}
