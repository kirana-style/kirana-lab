import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "@/components/example"
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card"
import { Skeleton } from "@workspace/ui/components/skeleton"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  row: css({
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: spacing["4"],
  }),
  skeleton: css({
    width: spacing["10"],
    height: spacing["10"],
    flexShrink: 0,
    borderStartStartRadius: "calc(infinity * 1px)",
    borderStartEndRadius: "calc(infinity * 1px)",
    borderEndStartRadius: "calc(infinity * 1px)",
    borderEndEndRadius: "calc(infinity * 1px)",
  }),
  grid: css({
    display: "grid",
    gap: spacing["2"],
  }),
  skeleton2: css({
    height: spacing["4"],
    width: "150px",
  }),
  skeleton3: css({
    height: spacing["4"],
    width: "100px",
  }),
  card: css({
    width: "100%",
  }),
  skeleton4: css({
    height: spacing["4"],
    width: "calc(2 / 3 * 100%)",
  }),
  skeleton5: css({
    height: spacing["4"],
    width: "calc(1 / 2 * 100%)",
  }),
  skeleton6: css({
    aspectRatio: "1 / 1",
    width: "100%",
  }),
  stack: css({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: spacing["2"],
  }),
  skeleton7: css({
    height: spacing["4"],
    width: "100%",
  }),
  skeleton8: css({
    height: spacing["4"],
    width: "calc(3 / 4 * 100%)",
  }),
  stack2: css({
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: spacing["7"],
  }),
  stack3: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing["3"],
  }),
  skeleton9: css({
    height: spacing["4"],
    width: spacing["20"],
  }),
  skeleton10: css({
    height: spacing["10"],
    width: "100%",
  }),
  skeleton11: css({
    height: spacing["4"],
    width: spacing["24"],
  }),
  skeleton12: css({
    height: spacing["9"],
    width: spacing["24"],
  }),
  row2: css({
    display: "flex",
    gap: spacing["4"],
  }),
  skeleton13: css({
    height: spacing["4"],
    flex: 1,
  }),
}

export default function SkeletonExample() {
  return (
    <ExampleWrapper>
      <SkeletonAvatar />
      <SkeletonCard />
      <SkeletonText />
      <SkeletonForm />
      <SkeletonTable />
    </ExampleWrapper>
  )
}

function SkeletonAvatar() {
  return (
    <Example title="Avatar">
      <div sx={styles.row}>
        <Skeleton sx={styles.skeleton} />
        <div sx={styles.grid}>
          <Skeleton sx={styles.skeleton2} />
          <Skeleton sx={styles.skeleton3} />
        </div>
      </div>
    </Example>
  )
}

function SkeletonCard() {
  return (
    <Example title="Card">
      <Card sx={styles.card}>
        <CardHeader>
          <Skeleton sx={styles.skeleton4} />
          <Skeleton sx={styles.skeleton5} />
        </CardHeader>
        <CardContent>
          <Skeleton sx={styles.skeleton6} />
        </CardContent>
      </Card>
    </Example>
  )
}

function SkeletonText() {
  return (
    <Example title="Text">
      <div sx={styles.stack}>
        <Skeleton sx={styles.skeleton7} />
        <Skeleton sx={styles.skeleton7} />
        <Skeleton sx={styles.skeleton8} />
      </div>
    </Example>
  )
}

function SkeletonForm() {
  return (
    <Example title="Form">
      <div sx={styles.stack2}>
        <div sx={styles.stack3}>
          <Skeleton sx={styles.skeleton9} />
          <Skeleton sx={styles.skeleton10} />
        </div>
        <div sx={styles.stack3}>
          <Skeleton sx={styles.skeleton11} />
          <Skeleton sx={styles.skeleton10} />
        </div>
        <Skeleton sx={styles.skeleton12} />
      </div>
    </Example>
  )
}

function SkeletonTable() {
  return (
    <Example title="Table">
      <div sx={styles.stack}>
        <div sx={styles.row2}>
          <Skeleton sx={styles.skeleton13} />
          <Skeleton sx={styles.skeleton11} />
          <Skeleton sx={styles.skeleton9} />
        </div>
        <div sx={styles.row2}>
          <Skeleton sx={styles.skeleton13} />
          <Skeleton sx={styles.skeleton11} />
          <Skeleton sx={styles.skeleton9} />
        </div>
        <div sx={styles.row2}>
          <Skeleton sx={styles.skeleton13} />
          <Skeleton sx={styles.skeleton11} />
          <Skeleton sx={styles.skeleton9} />
        </div>
      </div>
    </Example>
  )
}
