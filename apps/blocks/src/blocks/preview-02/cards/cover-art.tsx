import { css } from "@kirana-style/core"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@workspace/ui/components/card"
import { Item } from "@workspace/ui/components/item"
import { Label } from "@workspace/ui/components/label"
import { Image01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic"
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
    rowGap: spacing["3"],
    columnGap: spacing["3"],
  }),
  label: css({
    textAlign: "center",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.normal,
    letterSpacing: letterSpacing.wider,
    color: theme.mutedForeground,
    textTransform: "uppercase",
  }),
  item: css({
    aspectRatio: "1 / 1",
  }),
  label2: css({
    display: "flex",
    width: "100%",
    height: "100%",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
  }),
  icon: css({
    width: spacing["10"],
    height: spacing["10"],
    color: `color-mix(in oklab, ${theme.mutedForeground} 50%, transparent)`,
  }),
  input: css({
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
    borderColor: theme.border,
  }),
  cardFooter: css({
    flexDirection: "column",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  }),
  button: css({
    width: "100%",
  }),
  label3: css({
    cursor: "pointer",
  }),
  cardDescription: css({
    textAlign: "center",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
}

export function CoverArt() {
  return (
    <Card>
      <CardContent sx={styles.cardContent}>
        <Label htmlFor="cover-art" sx={styles.label}>
          Cover Art
        </Label>
        <Item sx={styles.item} variant="outline">
          <label htmlFor="cover-art" sx={styles.label2}>
            <Icon
              icon={Image01Icon}

              sx={styles.icon}
            />
          </label>
        </Item>
        <input
          id="cover-art"
          type="file"
          accept="image/jpeg,image/png"
          sx={styles.input}
        />
      </CardContent>
      <CardFooter sx={styles.cardFooter}>
        <Button
          variant="secondary"
          sx={styles.button}
          render={<label htmlFor="cover-art" sx={styles.label3} />}
          nativeButton={false}
        >
          Upload Artwork
        </Button>
        <CardDescription sx={styles.cardDescription}>
          Minimum 3000 × 3000px
          <br />
          JPEG or PNG only
        </CardDescription>
      </CardFooter>
    </Card>
  )
}
