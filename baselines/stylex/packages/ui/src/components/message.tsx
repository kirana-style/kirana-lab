import * as stylex from "@stylexjs/stylex"

import type { Sx } from "../lib/sx"
import { messageMarker } from "../theme/markers.stylex"
import { theme } from "../theme/semantic.stylex"
import { spacing } from "../tokens/spacing.stylex"
import { fontSize, fontWeight, lineHeight } from "../tokens/typography.stylex"

/**
 * A message row: avatar on one side, content on the other, optional header and
 * footer bands.
 *
 * `align="end"` reverses the row for the current user's own messages. Parts read
 * that from the row's marker rather than being styled by it.
 */
/** A footer band lifts the avatar so it still lines up with the bubble. */
/** A ghost bubble has no padding, so the bands align flush with it. */

const styles = stylex.create({
  group: {
    display: "flex",
    minWidth: 0,
    flexDirection: "column",
    gap: spacing[2],
  },

  root: {
    position: "relative",
    display: "flex",
    width: "100%",
    minWidth: 0,
    gap: spacing[2],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    flexDirection: { default: "row", '[data-align="end"]': "row-reverse" },
  },

  avatar: {
    display: "flex",
    width: "fit-content",
    minWidth: spacing[8],
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    overflow: "hidden",
    borderRadius: "calc(infinity * 1px)",
    backgroundColor: theme.muted,
    translate: {
      default: null,
      [stylex.when.ancestor(
        ':has([data-slot="message-footer"])',
        messageMarker
      )]: `0 calc(${spacing[8]} * -1)`,
    },
  },

  content: {
    display: "flex",
    width: "100%",
    minWidth: 0,
    flexDirection: "column",
    gap: spacing["2.5"],
    overflowWrap: "break-word",
    alignItems: {
      default: null,
      [stylex.when.ancestor('[data-align="end"]', messageMarker)]: "flex-end",
    },
  },

  band: {
    display: "flex",
    maxWidth: "100%",
    minWidth: 0,
    alignItems: "center",
    paddingInline: {
      default: spacing[3],
      [stylex.when.ancestor(':has([data-variant="ghost"])', messageMarker)]: 0,
    },
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
  },
  footer: {
    justifyContent: {
      default: null,
      [stylex.when.ancestor('[data-align="end"]', messageMarker)]: "flex-end",
    },
  },
})

type El = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }

function MessageGroup({ sx, ...props }: El) {
  return <div data-slot="message-group" {...props} sx={[styles.group, sx]} />
}

function Message({
  sx,
  align = "start",
  ...props
}: El & { align?: "start" | "end" }) {
  return (
    <div
      data-slot="message"
      data-align={align}
      {...props}
      sx={[messageMarker, styles.root, sx]}
    />
  )
}

function MessageAvatar({ sx, ...props }: El) {
  return <div data-slot="message-avatar" {...props} sx={[styles.avatar, sx]} />
}

function MessageContent({ sx, ...props }: El) {
  return (
    <div data-slot="message-content" {...props} sx={[styles.content, sx]} />
  )
}

function MessageHeader({ sx, ...props }: El) {
  return <div data-slot="message-header" {...props} sx={[styles.band, sx]} />
}

function MessageFooter({ sx, ...props }: El) {
  return (
    <div
      data-slot="message-footer"
      {...props}
      sx={[styles.band, styles.footer, sx]}
    />
  )
}

export {
  MessageGroup,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
}
