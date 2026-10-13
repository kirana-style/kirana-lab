import * as stylex from "@stylexjs/stylex"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"

import type { Sx } from "../lib/sx"
import { mergeSx } from "../lib/sx"
import type { VariantProps } from "../recipes/recipe"
import { recipe } from "../recipes/recipe"
import { Separator } from "./separator"
import { ctx } from "../theme/context.stylex"
import { dropdownMenuContentMarker, itemMarker } from "../theme/markers.stylex"
import { alpha, radius, theme } from "../theme/semantic.stylex"
import { duration, easing } from "../tokens/motion.stylex"
import { ring } from "../tokens/ring.stylex"
import { spacing } from "../tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
} from "../tokens/typography.stylex"

/** An item carrying a description aligns its media to the top instead of centre. */
/** Inside a dropdown the menu already supplies the padding. */
/** The group tightens its own spacing when it holds compact items. */

const styles = stylex.create({
  group: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: {
      default: spacing[4],
      ':has([data-size="sm"])': spacing["2.5"],
      ':has([data-size="xs"])': spacing[2],
    },
  },
  separator: { marginBlock: spacing[2] },

  base: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    alignItems: "center",
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderStyle: "solid",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    outlineStyle: "none",
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: duration[100],
    transitionTimingFunction: easing.inOut,
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 ${ring.width} ${alpha.ring50}`,
    },
  },
  /** Was `[a]:hover:bg-muted` — applied when the item is interactive. */
  interactive: { backgroundColor: { default: null, ":hover": theme.muted } },

  default: {
    borderColor: { default: "transparent", ":focus-visible": theme.ring },
  },
  outline: {
    borderColor: { default: theme.border, ":focus-visible": theme.ring },
  },
  muted: {
    borderColor: { default: "transparent", ":focus-visible": theme.ring },
    backgroundColor: alpha.muted50,
  },

  defaultSize: {
    gap: spacing["2.5"],
    paddingInline: spacing[3],
    paddingBlock: spacing["2.5"],
  },
  sm: {
    gap: spacing["2.5"],
    paddingInline: spacing[3],
    paddingBlock: spacing["2.5"],
  },
  xs: {
    gap: spacing[2],
    paddingInline: {
      default: spacing["2.5"],
      [stylex.when.ancestor("[data-slot]", dropdownMenuContentMarker)]: 0,
    },
    paddingBlock: {
      default: spacing[2],
      [stylex.when.ancestor("[data-slot]", dropdownMenuContentMarker)]: 0,
    },
  },

  mediaBase: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[2],
    translate: {
      default: null,
      [stylex.when.ancestor(
        ':has([data-slot="item-description"])',
        itemMarker
      )]: `0 ${spacing["0.5"]}`,
    },
    alignSelf: {
      default: null,
      [stylex.when.ancestor(
        ':has([data-slot="item-description"])',
        itemMarker
      )]: "flex-start",
    },
  },
  mediaDefault: { backgroundColor: "transparent" },
  mediaIcon: { [ctx.iconSize]: "1rem" },
  mediaImage: {
    overflow: "hidden",
    borderRadius: radius.sm,
    width: {
      default: spacing[10],
      [stylex.when.ancestor('[data-size="sm"]', itemMarker)]: spacing[8],
      [stylex.when.ancestor('[data-size="xs"]', itemMarker)]: spacing[6],
    },
    height: {
      default: spacing[10],
      [stylex.when.ancestor('[data-size="sm"]', itemMarker)]: spacing[8],
      [stylex.when.ancestor('[data-size="xs"]', itemMarker)]: spacing[6],
    },
  },
  /** Was `[&_img]:size-full [&_img]:object-cover`, now its own element. */
  image: { width: "100%", height: "100%", objectFit: "cover" },

  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: {
      default: spacing[1],
      [stylex.when.ancestor('[data-size="xs"]', itemMarker)]: 0,
    },
  },
  /** A second content column sits beside the first rather than sharing its growth. */
  contentTrailing: { flex: "none" },

  title: {
    display: "flex",
    width: "fit-content",
    alignItems: "center",
    gap: spacing[2],
    fontSize: fontSize.sm,
    lineHeight: leading.snug,
    fontWeight: fontWeight.medium,
    textUnderlineOffset: "4px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  description: {
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textAlign: "start",
    fontSize: {
      default: fontSize.sm,
      [stylex.when.ancestor('[data-size="xs"]', itemMarker)]: fontSize.xs,
    },
    lineHeight: leading.normal,
    fontWeight: fontWeight.normal,
    color: theme.mutedForeground,
    // Links written straight into the description; see globals.css.
    "--inline-link-hover": theme.primary,
  },
  actions: { display: "flex", alignItems: "center", gap: spacing[2] },
  band: {
    display: "flex",
    flexBasis: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing[2],
  },
})

const item = recipe({
  base: styles.base,
  variants: {
    variant: {
      default: styles.default,
      outline: styles.outline,
      muted: styles.muted,
    },
    size: { default: styles.defaultSize, sm: styles.sm, xs: styles.xs },
  },
  defaults: { variant: "default", size: "default" },
})

const itemMedia = recipe({
  base: styles.mediaBase,
  variants: {
    variant: {
      default: styles.mediaDefault,
      icon: styles.mediaIcon,
      image: styles.mediaImage,
    },
  },
  defaults: { variant: "default" },
})

type El<T extends keyof React.JSX.IntrinsicElements = "div"> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }

function ItemGroup({ sx, ...props }: El) {
  return (
    <div
      role="list"
      data-slot="item-group"
      {...props}
      sx={[styles.group, sx]}
    />
  )
}

function ItemSeparator({
  sx,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      {...props}
      sx={mergeSx(styles.separator, sx)}
    />
  )
}

function Item({
  sx,
  variant,
  size,
  interactive,
  render,
  ...props
}: Omit<useRender.ComponentProps<"div">, "className"> &
  VariantProps<typeof item> & {
    /** Adds the hover affordance the original gave only to anchors. */
    interactive?: boolean
    sx?: Sx
  }) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(
      stylex.props(
        itemMarker,
        ...item({ variant, size }),
        interactive && styles.interactive,
        sx
      ),
      props
    ),
    render,
    state: { slot: "item", variant, size },
  })
}

function ItemMedia({
  sx,
  variant,
  ...props
}: El & VariantProps<typeof itemMedia>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      {...props}
      sx={[...itemMedia({ variant }), sx]}
    />
  )
}

/** The image inside an `ItemMedia variant="image"`. */
function ItemImage({ sx, ...props }: El<"img">) {
  return <img data-slot="item-image" {...props} sx={[styles.image, sx]} />
}

function ItemContent({
  sx,
  trailing,
  ...props
}: El & {
  /** A second content column, sized to its contents instead of growing. */
  trailing?: boolean
}) {
  return (
    <div
      data-slot="item-content"
      {...props}
      sx={[styles.content, trailing && styles.contentTrailing, sx]}
    />
  )
}

function ItemTitle({ sx, ...props }: El) {
  return <div data-slot="item-title" {...props} sx={[styles.title, sx]} />
}

function ItemDescription({ sx, ...props }: El<"p">) {
  return (
    <p data-slot="item-description" {...props} sx={[styles.description, sx]} />
  )
}

function ItemActions({ sx, ...props }: El) {
  return <div data-slot="item-actions" {...props} sx={[styles.actions, sx]} />
}

function ItemHeader({ sx, ...props }: El) {
  return <div data-slot="item-header" {...props} sx={[styles.band, sx]} />
}

function ItemFooter({ sx, ...props }: El) {
  return <div data-slot="item-footer" {...props} sx={[styles.band, sx]} />
}

export {
  Item,
  ItemMedia,
  ItemImage,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}
