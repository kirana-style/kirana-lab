import { css } from "@kirana-style/core"

import type { Sx } from "@workspace/ui/lib/sx"
import { radius, surface, theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography"

const styles = {
  page: css({
    width: "100%",
    // `bg-muted dark:bg-background`, which is exactly what `surface.page` is.
    backgroundColor: surface.page,
  }),
  wrapper: css({
    marginInline: "auto",
    display: "grid",
    minHeight: "100vh",
    width: "100%",
    maxWidth: { base: "64rem", [breakpoint["2xl"]]: "72rem" },
    minWidth: 0,
    alignContent: "center",
    alignItems: "flex-start",
    // `gap-8 sm:gap-12 md:gap-8`. The middle value is a closed range, so each
    // range reads on its own.
    gap: {
      base: spacing[8],
      "@media (min-width: 40rem) and (max-width: 47.999rem)": spacing[12],
      [breakpoint.md]: spacing[8],
    },
    paddingTop: {
      base: spacing[2],
      "@media (min-width: 40rem) and (max-width: 63.999rem)": spacing[6],
      [breakpoint.lg]: spacing[12],
    },
    paddingBottom: {
      base: spacing[4],
      "@media (min-width: 40rem) and (max-width: 63.999rem)": spacing[6],
      [breakpoint.lg]: spacing[12],
    },
    paddingInline: {
      base: spacing[4],
      "@media (min-width: 40rem) and (max-width: 63.999rem)": spacing[6],
      [breakpoint.lg]: spacing[12],
    },
    gridTemplateColumns: {
      [breakpoint.md]: "repeat(2, minmax(0, 1fr))",
    },
  }),
  example: css({
    marginInline: "auto",
    display: "flex",
    width: "100%",
    maxWidth: { base: "32rem", [breakpoint.lg]: "none" },
    minWidth: 0,
    flexDirection: "column",
    gap: spacing[1],
    alignSelf: "stretch",
  }),
  title: css({
    paddingInline: spacing["1.5"],
    paddingBlock: spacing[2],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
  }),
  /**
   * The card an example renders into.
   *
   * The original also gave every child `div` without a width class `w-full`
   * (`*:[div:not([class*='w-'])]:w-full`). Class names are hashed, so "without a
   * width class" cannot be a selector: the rule lives in `example.css`, in the
   * base layer below every Kirana rule, and any width a child sets outranks it.
   */
  content: css({
    display: "flex",
    minWidth: 0,
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: spacing[6],
    borderRadius: radius.xl,
    backgroundColor: theme.card,
    padding: spacing[12],
    color: theme.foreground,
  }),
}

type DivProps = Omit<React.ComponentProps<"div">, "className">

function ExampleWrapper({ sx, ...props }: DivProps & { sx?: Sx }) {
  return (
    <div sx={styles.page}>
      <div data-slot="example-wrapper" {...props} sx={[styles.wrapper, sx]} />
    </div>
  )
}

function Example({
  title,
  children,
  sx,
  containerSx,
  ...props
}: DivProps & {
  title?: string
  /** Styles the card the example renders into. */
  sx?: Sx
  /** Styles the column holding the title and the card. */
  containerSx?: Sx
}) {
  return (
    <div data-slot="example" {...props} sx={[styles.example, containerSx]}>
      {title && <div sx={styles.title}>{title}</div>}
      <div data-slot="example-content" sx={[styles.content, sx]}>
        {children}
      </div>
    </div>
  )
}

export { ExampleWrapper, Example }
