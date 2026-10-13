import * as stylex from "@stylexjs/stylex"

import type { Sx } from "../lib/sx"
import { ctx } from "../theme/context.stylex"
import { cardMarker } from "../theme/markers.stylex"
import { alpha, radius, theme } from "../theme/semantic.stylex"
import { spacing } from "../tokens/spacing.stylex"
import {
  fontFamily,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
} from "../tokens/typography.stylex"

/** A footer sits flush to the bottom edge, so the card drops its own bottom pad. */

const styles = stylex.create({
  root: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: radius.xl,
    backgroundColor: theme.card,
    color: theme.cardForeground,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    boxShadow: `0 0 0 1px ${alpha.foreground10}`,

    gap: ctx.cardSpacing,
    paddingBlock: ctx.cardSpacing,
    paddingBottom: {
      default: ctx.cardSpacing,
      ':has([data-slot="card-footer"])': 0,
    },
    // Was `has-[>img:first-child]:pt-0`: a card led by an image is edge to edge.
    paddingTop: { default: ctx.cardSpacing, ":has(> img:first-child)": 0 },
  },

  // The inner rhythm, handed down to every part of the card. Was the
  // `--card-spacing` custom property, now a typed contextual variable.
  //
  // Picked by the `size` prop rather than written as
  // `{ default: 4, '[data-size="sm"]': 3 }`: StyleX emits a custom property's
  // plain value outside the cascade layers, so it would beat the layered
  // attribute condition and a small card would keep the default spacing.
  sizeDefault: { [ctx.cardSpacing]: spacing[4] },
  sizeSm: { [ctx.cardSpacing]: spacing[3] },

  header: {
    display: "grid",
    gridAutoRows: "min-content",
    alignItems: "start",
    gap: spacing[1],
    borderStartStartRadius: radius.xl,
    borderStartEndRadius: radius.xl,
    paddingInline: ctx.cardSpacing,
    gridTemplateColumns: {
      default: null,
      ':has([data-slot="card-action"])': "1fr auto",
    },
    gridTemplateRows: {
      default: null,
      ':has([data-slot="card-description"])': "auto auto",
    },
  },
  /**
   * Was `[.border-b]:pb-(--card-spacing)`, which fired when a caller happened to
   * add a `border-b` class. Class names are hashed now, so the intent became an
   * explicit prop.
   */
  headerBordered: {
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.border,
    paddingBottom: ctx.cardSpacing,
  },

  title: {
    fontFamily: fontFamily.heading,
    fontSize: {
      default: fontSize.base,
      [stylex.when.ancestor('[data-size="sm"]', cardMarker)]: fontSize.sm,
    },
    lineHeight: leading.snug,
    fontWeight: fontWeight.medium,
  },
  description: { fontSize: fontSize.sm, color: theme.mutedForeground },
  action: {
    gridColumnStart: 2,
    // `row-span-2 row-start-1`: longhands, because `gridRow: "span 2"` leaves
    // the end at `auto` once the start is set, and the action spans one row.
    gridRowStart: 1,
    gridRowEnd: "span 2",
    alignSelf: "start",
    justifySelf: "end",
  },
  content: { paddingInline: ctx.cardSpacing },
  footer: {
    display: "flex",
    alignItems: "center",
    borderEndStartRadius: radius.xl,
    borderEndEndRadius: radius.xl,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: theme.border,
    backgroundColor: alpha.muted50,
    padding: ctx.cardSpacing,
  },
  /**
   * Was `*:[img:first-child]:rounded-t-xl`, styling whichever image happened to
   * be first. An image that should follow the card's corners uses this instead.
   */
  image: {
    width: "100%",
    borderStartStartRadius: { default: null, ":first-child": radius.xl },
    borderStartEndRadius: { default: null, ":first-child": radius.xl },
    borderEndStartRadius: { default: null, ":last-child": radius.xl },
    borderEndEndRadius: { default: null, ":last-child": radius.xl },
  },
})

type El<T extends keyof React.JSX.IntrinsicElements = "div"> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }

function Card({
  sx,
  size = "default",
  ...props
}: El & { size?: "default" | "sm" }) {
  return (
    <div
      data-slot="card"
      data-size={size}
      {...props}
      sx={[
        cardMarker,
        styles.root,
        size === "sm" ? styles.sizeSm : styles.sizeDefault,
        sx,
      ]}
    />
  )
}

function CardHeader({
  sx,
  bordered,
  ...props
}: El & {
  /** Draws a divider beneath the header and pads it away from the content. */
  bordered?: boolean
}) {
  return (
    <div
      data-slot="card-header"
      {...props}
      sx={[styles.header, bordered && styles.headerBordered, sx]}
    />
  )
}

function CardTitle({ sx, ...props }: El) {
  return <div data-slot="card-title" {...props} sx={[styles.title, sx]} />
}

function CardDescription({ sx, ...props }: El) {
  return (
    <div
      data-slot="card-description"
      {...props}
      sx={[styles.description, sx]}
    />
  )
}

function CardAction({ sx, ...props }: El) {
  return <div data-slot="card-action" {...props} sx={[styles.action, sx]} />
}

function CardContent({ sx, ...props }: El) {
  return <div data-slot="card-content" {...props} sx={[styles.content, sx]} />
}

function CardFooter({ sx, ...props }: El) {
  return <div data-slot="card-footer" {...props} sx={[styles.footer, sx]} />
}

/** A full-bleed image that rounds whichever card edge it touches. */
function CardImage({ sx, ...props }: El<"img">) {
  return <img data-slot="card-image" {...props} sx={[styles.image, sx]} />
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  CardImage,
}
