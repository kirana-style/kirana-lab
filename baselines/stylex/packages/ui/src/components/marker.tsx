import * as stylex from "@stylexjs/stylex"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import type { Sx } from "../lib/sx"
import type { VariantProps } from "../recipes/recipe"
import { recipe } from "../recipes/recipe"
import { ctx } from "../theme/context.stylex"
import { markerRowMarker } from "../theme/markers.stylex"
import { theme } from "../theme/semantic.stylex"
import { spacing } from "../tokens/spacing.stylex"
import { fontSize, lineHeight } from "../tokens/typography.stylex"

/**
 * A Marker is an annotation row — a label, optionally with rules running out to
 * either side of it.
 *
 * The original styled inline links with `[a]:underline [a]:hover:text-foreground`.
 * StyleX has no descendant selectors, so links inside the content use the `Link`
 * primitive instead.
 */

const styles = stylex.create({
  base: {
    position: "relative",
    display: "flex",
    minHeight: spacing[4],
    width: "100%",
    alignItems: "center",
    gap: spacing[2],
    textAlign: "left",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
    [ctx.iconSize]: "1rem",
  },
  default: {},
  /** Rules on both sides, so the label reads as a divider with text in it. */
  separator: {
    "::before": {
      content: "''",
      marginInlineEnd: spacing[1],
      height: "1px",
      minWidth: 0,
      flex: 1,
      backgroundColor: theme.border,
    },
    "::after": {
      content: "''",
      marginInlineStart: spacing[1],
      height: "1px",
      minWidth: 0,
      flex: 1,
      backgroundColor: theme.border,
    },
  },
  border: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.border,
    paddingBottom: spacing[2],
  },

  icon: {
    width: spacing[4],
    height: spacing[4],
    flexShrink: 0,
    [ctx.iconSize]: "1rem",
  },
  content: {
    minWidth: 0,
    overflowWrap: "break-word",
    flex: {
      default: null,
      [stylex.when.ancestor('[data-variant="separator"]', markerRowMarker)]:
        "none",
    },
    textAlign: {
      default: null,
      [stylex.when.ancestor('[data-variant="separator"]', markerRowMarker)]:
        "center",
    },
  },
})

const marker = recipe({
  base: styles.base,
  variants: {
    variant: {
      default: styles.default,
      separator: styles.separator,
      border: styles.border,
    },
  },
  defaults: { variant: "default" },
})

function Marker({
  sx,
  variant = "default",
  render,
  ...props
}: Omit<useRender.ComponentProps<"div">, "className"> &
  VariantProps<typeof marker> & { sx?: Sx }) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      stylex.props(markerRowMarker, ...marker({ variant }), sx),
      props
    ),
    render,
    state: { slot: "marker", variant },
  })
}

type El<T extends keyof React.JSX.IntrinsicElements = "span"> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }

function MarkerIcon({ sx, ...props }: El) {
  return (
    <span
      data-slot="marker-icon"
      aria-hidden="true"
      {...props}
      sx={[styles.icon, sx]}
    />
  )
}

function MarkerContent({ sx, ...props }: El) {
  return (
    <span data-slot="marker-content" {...props} sx={[styles.content, sx]} />
  )
}

export { Marker, MarkerIcon, MarkerContent, marker as markerVariants }
