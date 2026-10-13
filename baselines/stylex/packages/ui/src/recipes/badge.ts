/**
 * The Badge recipe.
 *
 * `[a]:hover:bg-primary/80` in the original applied a hover style only when the
 * badge rendered as a link. That selector targets the element's own tag name,
 * which StyleX cannot express, so the hover styles apply whenever the badge is
 * interactive — which is the case the variant existed for. A non-interactive
 * badge never receives hover in practice.
 */

import * as stylex from "@stylexjs/stylex"

import { recipe } from "../recipes/recipe"
import { ctx } from "../theme/context.stylex"
import { alpha, radius, surface, theme } from "../theme/semantic.stylex"
import { duration, easing } from "../tokens/motion.stylex"
import { ring } from "../tokens/ring.stylex"
import { spacing } from "../tokens/spacing.stylex"
import { fontSize, fontWeight, lineHeight } from "../tokens/typography.stylex"

const styles = stylex.create({
  base: {
    display: "inline-flex",
    height: spacing[5],
    width: "fit-content",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[1],
    overflow: "hidden",
    borderRadius: radius["4xl"],
    borderWidth: "1px",
    borderStyle: "solid",
    paddingInline: spacing[2],
    paddingInlineEnd: {
      default: spacing[2],
      ':has([data-icon="inline-end"])': spacing["1.5"],
    },
    paddingInlineStart: {
      default: spacing[2],
      ':has([data-icon="inline-start"])': spacing["1.5"],
    },
    paddingBlock: spacing["0.5"],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    whiteSpace: "nowrap",
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    // Was `[&>svg]:size-3!`. The `!` existed to beat the button's icon rule
    // when a badge sat inside one; an explicit token needs no such fight.
    [ctx.iconSize]: "0.75rem",
  },
  ring: {
    borderColor: {
      default: "transparent",
      ":focus-visible": theme.ring,
      '[aria-invalid="true"]': surface.borderInvalid,
    },
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 ${ring.width} ${alpha.ring50}`,
      '[aria-invalid="true"]': `0 0 0 ${ring.width} ${surface.ringInvalid}`,
    },
  },

  default: {
    backgroundColor: { default: theme.primary, ":hover": alpha.primary80 },
    color: theme.primaryForeground,
  },
  secondary: {
    backgroundColor: { default: theme.secondary, ":hover": alpha.secondary80 },
    color: theme.secondaryForeground,
  },
  destructive: {
    backgroundColor: {
      default: surface.destructiveSoft,
      ":hover": surface.destructiveSoftHover,
    },
    color: theme.destructive,
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 ${ring.width} ${surface.ringInvalid}`,
    },
  },
  outline: {
    borderColor: {
      default: theme.border,
      ":focus-visible": theme.ring,
      '[aria-invalid="true"]': surface.borderInvalid,
    },
    color: { default: theme.foreground, ":hover": theme.mutedForeground },
    backgroundColor: { default: null, ":hover": theme.muted },
  },
  ghost: {
    backgroundColor: { default: null, ":hover": surface.hover },
    color: { default: null, ":hover": theme.mutedForeground },
  },
  link: {
    color: theme.primary,
    textUnderlineOffset: "4px",
    textDecorationLine: { default: "none", ":hover": "underline" },
  },
})

export const badge = recipe({
  base: styles.base,
  variants: {
    variant: {
      default: styles.default,
      secondary: styles.secondary,
      destructive: styles.destructive,
      outline: styles.outline,
      ghost: styles.ghost,
      link: styles.link,
    },
  },
  defaults: { variant: "default" },
})

export const badgeRing = styles.ring
