import { css } from "@kirana-style/core"
import * as React from "react"

import { Card, CardContent } from "@workspace/ui/components/card"
import { STYLES, FONTS, useDesignSystemSearchParams } from "@/lib/design-system"
import { radius, surface, theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography"

/**
 * The palette swatches. The names are shown as written; the colours come from the
 * semantic tokens, because Kirana hashes the custom-property names.
 */
const SWATCHES: Record<string, string> = {
  "--background": theme.background,
  "--foreground": theme.foreground,
  "--primary": theme.primary,
  "--secondary": theme.secondary,
  "--muted": theme.muted,
  "--accent": theme.accent,
  "--border": theme.border,
  "--chart-1": theme.chart1,
  "--chart-2": theme.chart2,
  "--chart-3": theme.chart3,
  "--chart-4": theme.chart4,
  "--chart-5": theme.chart5,
}

const styles = {
  swatchColor: (color: string) => css({ backgroundColor: color }),
  cardContent: css({
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["6"],
    columnGap: spacing["6"],
  }),
  stack: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing["1"],
  }),
  text: css({
    fontFamily: fontFamily.heading,
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.medium,
  }),
  text2: css({
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    color: theme.mutedForeground,
  }),
  grid: css({
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
    gap: spacing["3"],
  }),
  stack2: css({
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing["2"],
  }),
  box: css({
    position: "relative",
    aspectRatio: "1 / 1",
    width: "100%",
    borderRadius: radius.lg,
    "::after": {
      position: "absolute",
      borderRadius: radius.lg,
      content: "''",
      inset: "0px",
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: theme.border,
      mixBlendMode: surface.imageRingBlend,
    },
  }),
  text3: css({
    display: { base: "none", [breakpoint.md]: "block" },
    maxWidth: spacing["14"],
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: fontFamily.mono,
    fontSize: "0.60rem",
  }),
}

export function StyleOverview() {
  const [params] = useDesignSystemSearchParams()

  const currentFont = React.useMemo(
    () => FONTS.find((font) => font.value === params.font),
    [params.font]
  )

  const currentFontHeading = React.useMemo(
    () => FONTS.find((font) => font.value === params.fontHeading),
    [params.fontHeading]
  )

  const currentStyle = React.useMemo(
    () => STYLES.find((style) => style.name === params.style),
    [params.style]
  )

  return (
    <Card>
      <CardContent sx={styles.cardContent}>
        <div sx={styles.stack}>
          <div sx={styles.text}>
            {currentStyle?.title} -{" "}
            {currentFontHeading?.name &&
            currentFontHeading.name !== currentFont?.name
              ? currentFontHeading.name
              : currentFont?.name}
          </div>
          <div sx={styles.text2}>
            Designers love packing quirky glyphs into test phrases. This is a
            preview of the typography styles.
          </div>
        </div>
        <div sx={styles.grid}>
          {[
            "--background",
            "--foreground",
            "--primary",
            "--secondary",
            "--muted",
            "--accent",
            "--border",
            "--chart-1",
            "--chart-2",
            "--chart-3",
            "--chart-4",
            "--chart-5",
          ].map((variant) => (
            <div key={variant} sx={styles.stack2}>
              <div sx={[styles.box, styles.swatchColor(SWATCHES[variant]!)]} />
              <div sx={styles.text3}>{variant}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
