import { css } from "@kirana-style/core"
import * as React from "react"

import { Example, ExampleWrapper } from "@/components/example"
import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area"
import { Separator } from "@workspace/ui/components/separator"
import { radius, theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography"

const styles = {
  scrollArea: css({
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
    height: spacing["72"],
    width: spacing["48"],
    borderStartStartRadius: radius.md,
    borderStartEndRadius: radius.md,
    borderEndStartRadius: radius.md,
    borderEndEndRadius: radius.md,
    borderTopStyle: "solid",
    borderBottomStyle: "solid",
    borderInlineStartStyle: "solid",
    borderInlineEndStyle: "solid",
    borderTopWidth: "1px",
    borderBottomWidth: "1px",
    borderInlineStartWidth: "1px",
    borderInlineEndWidth: "1px",
    borderTopColor: theme.border,
    borderBottomColor: theme.border,
    borderInlineStartColor: theme.border,
    borderInlineEndColor: theme.border,
  }),
  box: css({
    padding: spacing["4"],
  }),
  heading: css({
    marginBottom: spacing["4"],
    fontSize: fontSize.sm,
    lineHeight: 1,
    fontWeight: fontWeight.medium,
  }),
  text: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  separator: css({
    marginTop: spacing["2"],
    marginBottom: spacing["2"],
  }),
  scrollArea2: css({
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
    width: "100%",
    maxWidth: spacing["96"],
    borderStartStartRadius: radius.md,
    borderStartEndRadius: radius.md,
    borderEndStartRadius: radius.md,
    borderEndEndRadius: radius.md,
    borderTopStyle: "solid",
    borderBottomStyle: "solid",
    borderInlineStartStyle: "solid",
    borderInlineEndStyle: "solid",
    borderTopWidth: "1px",
    borderBottomWidth: "1px",
    borderInlineStartWidth: "1px",
    borderInlineEndWidth: "1px",
    paddingTop: spacing["4"],
    paddingBottom: spacing["4"],
    paddingInlineStart: spacing["4"],
    paddingInlineEnd: spacing["4"],
    borderTopColor: theme.border,
    borderBottomColor: theme.border,
    borderInlineStartColor: theme.border,
    borderInlineEndColor: theme.border,
  }),
  row: css({
    display: "flex",
    gap: spacing["4"],
  }),
  figure: css({
    flexShrink: 0,
  }),
  box2: css({
    overflow: "hidden",
    borderRadius: radius.md,
  }),
  image: css({
    aspectRatio: "3/4",
    height: "fit-content",
    width: "fit-content",
    objectFit: "cover",
  }),
  figcaption: css({
    paddingTop: spacing["2"],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  text2: css({
    fontWeight: fontWeight.semibold,
    color: theme.foreground,
  }),
}

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

const works = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyav",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
] as const

export default function ScrollAreaExample() {
  return (
    <ExampleWrapper>
      <ScrollAreaVertical />
      <ScrollAreaHorizontal />
    </ExampleWrapper>
  )
}

function ScrollAreaVertical() {
  return (
    <Example title="Vertical">
      <ScrollArea sx={styles.scrollArea}>
        <div sx={styles.box}>
          <h4 sx={styles.heading}>Tags</h4>
          {tags.map((tag) => (
            <React.Fragment key={tag}>
              <div sx={styles.text}>{tag}</div>
              <Separator sx={styles.separator} />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </Example>
  )
}

function ScrollAreaHorizontal() {
  return (
    <Example title="Horizontal">
      <ScrollArea sx={styles.scrollArea2}>
        <div sx={styles.row}>
          {works.map((artwork) => (
            <figure key={artwork.artist} sx={styles.figure}>
              <div sx={styles.box2}>
                <img
                  src={artwork.art}
                  alt={`Photo by ${artwork.artist}`}
                  sx={styles.image}
                  width={300}
                  height={400}
                />
              </div>
              <figcaption sx={styles.figcaption}>
                Photo by <span sx={styles.text2}>{artwork.artist}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Example>
  )
}
