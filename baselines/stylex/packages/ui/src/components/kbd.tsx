import * as stylex from "@stylexjs/stylex"

import type { Sx } from "../lib/sx"
import { ctx } from "../theme/context.stylex"
import { tooltipContentMarker } from "../theme/markers.stylex"
import { alpha, radius, theme } from "../theme/semantic.stylex"
import { spacing } from "../tokens/spacing.stylex"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from "../tokens/typography.stylex"

const styles = stylex.create({
  root: {
    pointerEvents: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[1],
    height: spacing[5],
    width: "fit-content",
    minWidth: spacing[5],
    paddingInline: spacing[1],
    // Tucked into an InputGroup addon, the key cap follows the group's inner
    // radius. Was `[&>kbd]:rounded-[calc(var(--radius)-5px)]` on the addon,
    // which carries the default marker.
    borderRadius: {
      default: radius.sm,
      [stylex.when.ancestor('[data-slot="input-group-addon"]')]:
        `calc(${radius.base} - 5px)`,
    },
    fontFamily: fontFamily.sans,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    userSelect: "none",
    [ctx.iconSize]: "0.75rem",

    // Was `in-data-[slot=tooltip-content]:`, an ancestor variant. Inside a
    // tooltip the colours invert, because the tooltip itself is inverted.
    backgroundColor: {
      default: theme.muted,
      [stylex.when.ancestor("[data-slot]", tooltipContentMarker)]:
        alpha.background20,
    },
    color: {
      default: theme.mutedForeground,
      [stylex.when.ancestor("[data-slot]", tooltipContentMarker)]:
        theme.background,
    },
  },
  group: {
    display: "inline-flex",
    alignItems: "center",
    gap: spacing[1],
  },
})

function Kbd({
  sx,
  ...props
}: Omit<React.ComponentProps<"kbd">, "className"> & { sx?: Sx }) {
  return <kbd data-slot="kbd" {...props} sx={[styles.root, sx]} />
}

function KbdGroup({
  sx,
  ...props
}: Omit<React.ComponentProps<"kbd">, "className"> & { sx?: Sx }) {
  return <kbd data-slot="kbd-group" {...props} sx={[styles.group, sx]} />
}

export { Kbd, KbdGroup }
