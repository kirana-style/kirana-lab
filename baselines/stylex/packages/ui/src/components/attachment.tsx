import * as stylex from "@stylexjs/stylex"

import type { Sx } from "../lib/sx"
import type { VariantProps } from "../recipes/recipe"
import { recipe } from "../recipes/recipe"
import { ctx } from "../theme/context.stylex"
import { alpha, radius, surface, theme } from "../theme/semantic.stylex"
import { duration, easing } from "../tokens/motion.stylex"
import { ring } from "../tokens/ring.stylex"
import { spacing } from "../tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
} from "../tokens/typography.stylex"

/**
 * A file attachment chip: a thumbnail or icon, a name, some metadata and an
 * optional action.
 *
 * The file this replaced was a usage demo importing `@/components/ui/attachment`,
 * a component that did not exist in this repository. This is that component,
 * written against the API the demo implied.
 */

const styles = stylex.create({
  group: { display: "flex", flexWrap: "wrap", gap: spacing[2] },

  base: {
    position: "relative",
    display: "flex",
    minWidth: 0,
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: surface.control,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    [ctx.iconSize]: "1rem",
    transitionProperty: "opacity, border-color",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
  },
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["2.5"],
    paddingInline: spacing["2.5"],
    paddingBlock: spacing[2],
  },
  /** Stacked: the thumbnail sits above the name, as a small card. */
  vertical: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: spacing[2],
    width: spacing[32],
    overflow: "hidden",
    padding: 0,
    paddingBottom: spacing[2],
  },

  /** While a file is uploading the chip reads as provisional. */
  uploading: { opacity: 0.7 },
  error: { borderColor: surface.borderInvalid, color: theme.destructive },

  mediaBase: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    color: theme.mutedForeground,
  },
  mediaDefault: {
    width: spacing[8],
    height: spacing[8],
    borderRadius: radius.md,
    backgroundColor: theme.muted,
  },
  /** A real thumbnail, cropped to fill whatever space the chip gives it. */
  mediaImage: {
    width: "100%",
    aspectRatio: "4 / 3",
    overflow: "hidden",
    backgroundColor: theme.muted,
  },
  image: { width: "100%", height: "100%", objectFit: "cover" },

  content: {
    display: "flex",
    minWidth: 0,
    flex: 1,
    flexDirection: "column",
    gap: spacing["0.5"],
    paddingInline: { default: 0, ":first-child": spacing["2.5"] },
  },
  title: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: leading.snug,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  description: {
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  actions: {
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    gap: spacing[1],
  },
  action: {
    display: "inline-flex",
    width: spacing[6],
    height: spacing[6],
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    color: theme.mutedForeground,
    outlineStyle: "none",
    [ctx.iconSize]: "0.875rem",
    backgroundColor: { default: null, ":hover": surface.hover },
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 ${ring.width} ${alpha.ring50}`,
    },
  },
  actionColor: {
    color: { default: theme.mutedForeground, ":hover": theme.foreground },
  },
})

const attachment = recipe({
  base: styles.base,
  variants: {
    orientation: { horizontal: styles.horizontal, vertical: styles.vertical },
    state: {
      idle: styles.base,
      uploading: styles.uploading,
      error: styles.error,
    },
  },
  defaults: { orientation: "horizontal", state: "idle" },
})

const attachmentMedia = recipe({
  base: styles.mediaBase,
  variants: {
    variant: { default: styles.mediaDefault, image: styles.mediaImage },
  },
  defaults: { variant: "default" },
})

type El<T extends keyof React.JSX.IntrinsicElements = "div"> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }

function AttachmentGroup({ sx, ...props }: El) {
  return (
    <div
      role="list"
      data-slot="attachment-group"
      {...props}
      sx={[styles.group, sx]}
    />
  )
}

function Attachment({
  sx,
  orientation,
  state,
  ...props
}: El & VariantProps<typeof attachment>) {
  return (
    <div
      data-slot="attachment"
      data-orientation={orientation ?? "horizontal"}
      data-state={state ?? "idle"}
      {...props}
      sx={[...attachment({ orientation, state }), sx]}
    />
  )
}

function AttachmentMedia({
  sx,
  variant,
  ...props
}: El & VariantProps<typeof attachmentMedia>) {
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant ?? "default"}
      {...props}
      sx={[...attachmentMedia({ variant }), sx]}
    />
  )
}

/** The thumbnail inside an `AttachmentMedia variant="image"`. */
function AttachmentImage({ sx, ...props }: El<"img">) {
  return <img data-slot="attachment-image" {...props} sx={[styles.image, sx]} />
}

function AttachmentContent({ sx, ...props }: El) {
  return (
    <div data-slot="attachment-content" {...props} sx={[styles.content, sx]} />
  )
}

function AttachmentTitle({ sx, ...props }: El) {
  return <div data-slot="attachment-title" {...props} sx={[styles.title, sx]} />
}

function AttachmentDescription({ sx, ...props }: El<"p">) {
  return (
    <p
      data-slot="attachment-description"
      {...props}
      sx={[styles.description, sx]}
    />
  )
}

function AttachmentActions({ sx, ...props }: El) {
  return (
    <div data-slot="attachment-actions" {...props} sx={[styles.actions, sx]} />
  )
}

function AttachmentAction({ sx, type = "button", ...props }: El<"button">) {
  return (
    <button
      type={type}
      data-slot="attachment-action"
      {...props}
      sx={[styles.action, styles.actionColor, sx]}
    />
  )
}

export {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentImage,
  AttachmentMedia,
  AttachmentTitle,
  attachment as attachmentVariants,
}
