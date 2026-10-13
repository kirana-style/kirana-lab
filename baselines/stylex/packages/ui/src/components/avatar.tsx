import * as stylex from "@stylexjs/stylex"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"

import type { Sx } from "../lib/sx"
import { ctx } from "../theme/context.stylex"
import { avatarGroupMarker, avatarMarker } from "../theme/markers.stylex"
import { radius, surface, theme } from "../theme/semantic.stylex"
import { spacing } from "../tokens/spacing.stylex"
import { fontSize, lineHeight } from "../tokens/typography.stylex"

/** Avatars inside a group overlap and gain a ring cut out of the background. */
/** Was `group-has-data-[size=…]/avatar-group`: the group reads its children. */

const GROUP_HAS_SM = ':has([data-slot="avatar"][data-size="sm"])'
const GROUP_HAS_LG = ':has([data-slot="avatar"][data-size="lg"])'

const styles = stylex.create({
  root: {
    position: "relative",
    display: "flex",
    flexShrink: 0,
    borderRadius: radius.full,
    userSelect: "none",
    width: {
      default: spacing[8],
      '[data-size="sm"]': spacing[6],
      '[data-size="lg"]': spacing[10],
    },
    height: {
      default: spacing[8],
      '[data-size="sm"]': spacing[6],
      '[data-size="lg"]': spacing[10],
    },
    // A hairline over the image, blended so it reads on any artwork.
    "::after": {
      content: "''",
      position: "absolute",
      inset: 0,
      borderRadius: radius.full,
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: theme.border,
      mixBlendMode: surface.imageRingBlend,
    },
    // Was `*:data-[slot=avatar]:ring-2` plus `-space-x-2` on the group, both of
    // which styled children from the parent. Inverted: the avatar decides how it
    // behaves once it finds itself in a group.
    boxShadow: {
      default: null,
      [stylex.when.ancestor('[data-slot="avatar-group"]', avatarGroupMarker)]:
        `0 0 0 2px ${theme.background}`,
    },
    // `-space-x-2` pulls each child over the next, so the last child, which may
    // be the count, keeps its full width.
    marginInlineEnd: {
      default: null,
      [stylex.when.ancestor('[data-slot="avatar-group"]', avatarGroupMarker)]: {
        default: `calc(${spacing[2]} * -1)`,
        ":last-child": 0,
      },
    },
  },

  image: {
    aspectRatio: "1 / 1",
    width: "100%",
    height: "100%",
    borderRadius: radius.full,
    objectFit: "cover",
  },

  fallback: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: theme.muted,
    color: theme.mutedForeground,
    fontSize: {
      default: fontSize.sm,
      [stylex.when.ancestor('[data-size="sm"]', avatarMarker)]: fontSize.xs,
    },
    lineHeight: {
      default: lineHeight.sm,
      [stylex.when.ancestor('[data-size="sm"]', avatarMarker)]: lineHeight.xs,
    },
  },

  badge: {
    position: "absolute",
    insetInlineEnd: 0,
    bottom: 0,
    zIndex: 10,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: theme.primary,
    color: theme.primaryForeground,
    boxShadow: `0 0 0 2px ${theme.background}`,
    userSelect: "none",
    width: {
      default: spacing["2.5"],
      [stylex.when.ancestor('[data-size="sm"]', avatarMarker)]: spacing[2],
      [stylex.when.ancestor('[data-size="lg"]', avatarMarker)]: spacing[3],
    },
    height: {
      default: spacing["2.5"],
      [stylex.when.ancestor('[data-size="sm"]', avatarMarker)]: spacing[2],
      [stylex.when.ancestor('[data-size="lg"]', avatarMarker)]: spacing[3],
    },
    // At the smallest size the badge is a dot with no room for a glyph. Setting
    // the icon size to zero is how a parent hides an icon now that
    // `[&>svg]:hidden` has no equivalent.
    [ctx.iconSize]: {
      default: spacing[2],
      [stylex.when.ancestor('[data-size="sm"]', avatarMarker)]: "0px",
    },
  },

  group: {
    display: "flex",
  },

  // Sized to match the avatars in its group: `group-has-data-[size=lg]`.
  groupCount: {
    position: "relative",
    display: "flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.full,
    backgroundColor: theme.muted,
    color: theme.mutedForeground,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    boxShadow: `0 0 0 2px ${theme.background}`,
    width: {
      default: spacing[8],
      [stylex.when.ancestor(GROUP_HAS_SM, avatarGroupMarker)]: spacing[6],
      [stylex.when.ancestor(GROUP_HAS_LG, avatarGroupMarker)]: spacing[10],
    },
    height: {
      default: spacing[8],
      [stylex.when.ancestor(GROUP_HAS_SM, avatarGroupMarker)]: spacing[6],
      [stylex.when.ancestor(GROUP_HAS_LG, avatarGroupMarker)]: spacing[10],
    },
    [ctx.iconSize]: {
      default: "1rem",
      [stylex.when.ancestor(GROUP_HAS_SM, avatarGroupMarker)]: "0.75rem",
      [stylex.when.ancestor(GROUP_HAS_LG, avatarGroupMarker)]: "1.25rem",
    },
  },
})

function Avatar({
  sx,
  size = "default",
  ...props
}: Omit<AvatarPrimitive.Root.Props, "className"> & {
  size?: "default" | "sm" | "lg"
  sx?: Sx
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      {...props}
      {...stylex.props(avatarMarker, styles.root, sx)}
    />
  )
}

function AvatarImage({
  sx,
  ...props
}: Omit<AvatarPrimitive.Image.Props, "className"> & { sx?: Sx }) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      {...props}
      {...stylex.props(styles.image, sx)}
    />
  )
}

function AvatarFallback({
  sx,
  ...props
}: Omit<AvatarPrimitive.Fallback.Props, "className"> & { sx?: Sx }) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      {...props}
      {...stylex.props(styles.fallback, sx)}
    />
  )
}

function AvatarBadge({
  sx,
  ...props
}: Omit<React.ComponentProps<"span">, "className"> & { sx?: Sx }) {
  return <span data-slot="avatar-badge" {...props} sx={[styles.badge, sx]} />
}

function AvatarGroup({
  sx,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  return (
    <div
      data-slot="avatar-group"
      {...props}
      sx={[avatarGroupMarker, styles.group, sx]}
    />
  )
}

function AvatarGroupCount({
  sx,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  return (
    <div
      data-slot="avatar-group-count"
      {...props}
      sx={[styles.groupCount, sx]}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}
