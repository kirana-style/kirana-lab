import { css } from "@kirana-style/core"
import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@workspace/ui/components/card"
import { Separator } from "@workspace/ui/components/separator"
import { radius, theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
} from "@workspace/ui/tokens/typography"

const styles = {
  cardContent: css({
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  }),
  box: css({
    position: "relative",
    overflow: "hidden",
    borderRadius: radius.lg,
  }),
  image: css({
    aspectRatio: "1 / 1",
    width: "100%",
    objectFit: "cover",
  }),
  badge: css({
    position: "absolute",
    top: spacing["3"],
    right: spacing["3"],
  }),
  stack: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing["1"],
  }),
  cardDescription: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    letterSpacing: letterSpacing.wider,
    textTransform: "uppercase",
  }),
  cardFooter: css({
    flexDirection: "column",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  }),
  grid: css({
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: spacing["4"],
  }),
  stack2: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing["0.5"],
  }),
  text: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    letterSpacing: letterSpacing.wider,
    color: theme.mutedForeground,
    textTransform: "uppercase",
  }),
  text2: css({
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  }),
  text3: css({
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 1,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    letterSpacing: letterSpacing.wider,
    color: theme.mutedForeground,
    textTransform: "uppercase",
  }),
}

export function AlbumCard() {
  return (
    <Card>
      <CardContent sx={styles.cardContent}>
        <div sx={styles.box}>
          <img
            src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&h=800&fit=crop"
            alt="Synthetic Horizons EP cover art"
            sx={styles.image}
          />
          <Badge sx={styles.badge}>$26,033.79</Badge>
        </div>
        <div sx={styles.stack}>
          <CardTitle>Synthetic Horizons EP</CardTitle>
          <CardDescription sx={styles.cardDescription}>
            Released Aug 14, 2023
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter sx={styles.cardFooter}>
        <Separator />
        <div sx={styles.grid}>
          <div sx={styles.stack2}>
            <span sx={styles.text}>Tracks</span>
            <span sx={styles.text2}>6 Tracks</span>
          </div>
          <div sx={styles.stack2}>
            <span sx={styles.text3}>Cumulative Streams</span>
            <span sx={styles.text2}>6,198,524</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
