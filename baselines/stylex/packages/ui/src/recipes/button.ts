/**
 * The Button recipe: six weights × nine sizes, the densest variant set in the
 * design system.
 *
 * Notes on what changed from the Tailwind original:
 *
 *   - `[&_svg:not([class*='size-'])]:size-4` is gone. Each size declares
 *     `ctx.iconSize` and the `Icon` primitive reads it. Same result, and it no
 *     longer depends on inspecting a child's class attribute — impossible once
 *     class names are hashed.
 *   - `in-data-[slot=button-group]:rounded-lg` became `when.ancestor` scoped to
 *     the button-group marker.
 *   - `has-data-[icon=inline-end]:pe-2` became a plain `":has(…)"` key. It
 *     was first ported as `when.descendant` with the marker on the button,
 *     which never matches: that API wants the marker on the descendant.
 *   - Every `dark:` utility resolved into a `surface.*` token, because those
 *     were structural differences rather than palette swaps.
 */

import * as stylex from "@stylexjs/stylex"

import { recipe } from "../recipes/recipe"
import { ctx } from "../theme/context.stylex"
import { buttonGroupMarker } from "../theme/markers.stylex"
import { alpha, radius, surface, theme } from "../theme/semantic.stylex"
import { duration, easing } from "../tokens/motion.stylex"
import { ring } from "../tokens/ring.stylex"
import { spacing } from "../tokens/spacing.stylex"
import { fontSize, fontWeight, lineHeight } from "../tokens/typography.stylex"

/** `rounded-[min(var(--radius-md),10px)]` and its 12px sibling. */
const CLAMPED_MD_10 = `min(${radius.md}, 10px)`
const CLAMPED_MD_12 = `min(${radius.md}, 12px)`

/** A button inside a ButtonGroup squares off to its neighbours. */

const styles = stylex.create({
  /**
   * The label inside a button, trimmed to its capital letters.
   *
   * A flex container centres the text's line box, but the capitals are not at
   * that box's centre. With Inter they sit up to 2px high once Chrome snaps the
   * baseline to a whole pixel, and how far depends on the button's sub-pixel
   * position on the page, so two identical buttons can look different.
   * `text-box` trims the box to cap height and baseline, so the capitals are
   * what gets centred. It needs an element: a bare text node has no box to trim,
   * which is why `Button` wraps its text. Browsers without `text-box` keep the
   * untrimmed rendering.
   */
  label: { textBox: "trim-both cap alphabetic" },

  base: {
    display: "inline-flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: "1px",
    borderStyle: "solid",
    backgroundClip: "padding-box",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    whiteSpace: "nowrap",
    outlineStyle: "none",
    userSelect: "none",
    transitionProperty:
      "color, background-color, border-color, box-shadow, translate",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    [ctx.iconSize]: "1rem",

    // `active:not-aria-[haspopup]:translate-y-px`: a plain button depresses on
    // press, but one that opens a menu does not, since the menu is the feedback.
    translate: {
      default: null,
      ":active": "0 1px",
      "[aria-haspopup]:active": null,
    },
    pointerEvents: { default: null, ":disabled": "none" },
    opacity: { default: null, ":disabled": 0.5 },
  },

  // Focus and validation rings. Kept in one namespace per property so the
  // conditions cannot be clobbered by a variant that also sets them.
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

  // ── weights ──────────────────────────────────────────────────────────────
  default: {
    backgroundColor: { default: theme.primary, ":hover": alpha.primary80 },
    color: theme.primaryForeground,
  },
  outline: {
    borderColor: {
      default: surface.outlineBorder,
      ":focus-visible": theme.ring,
      '[aria-invalid="true"]': surface.borderInvalid,
    },
    backgroundColor: {
      default: surface.outlineBackground,
      ":hover": surface.outlineHover,
      // Hover still wins while open, as `dark:hover:bg-input/50` out-specifies
      // `aria-expanded:` in the original. An attribute key outranks `:hover`
      // in StyleX, so the hover is nested inside it.
      '[aria-expanded="true"]': {
        default: surface.outlineExpanded,
        ":hover": surface.outlineHover,
      },
    },
    color: {
      default: null,
      ":hover": theme.foreground,
      '[aria-expanded="true"]': theme.foreground,
    },
  },
  secondary: {
    backgroundColor: {
      default: theme.secondary,
      // Was a raw `color-mix` in the class string: nudges the surface toward
      // the text colour rather than fading it, so it reads the same in both modes.
      ":hover": `color-mix(in oklch, ${theme.secondary}, ${theme.foreground} 5%)`,
      '[aria-expanded="true"]': theme.secondary,
    },
    color: theme.secondaryForeground,
  },
  ghost: {
    backgroundColor: {
      default: null,
      ":hover": surface.hover,
      '[aria-expanded="true"]': surface.hover,
    },
    color: {
      default: null,
      ":hover": theme.foreground,
      '[aria-expanded="true"]': theme.foreground,
    },
  },
  destructive: {
    backgroundColor: {
      default: surface.destructiveSoft,
      ":hover": surface.destructiveSoftHover,
    },
    color: theme.destructive,
    borderColor: {
      default: "transparent",
      ":focus-visible": alpha.destructive40,
      '[aria-invalid="true"]': surface.borderInvalid,
    },
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 ${ring.width} ${surface.ringInvalid}`,
      '[aria-invalid="true"]': `0 0 0 ${ring.width} ${surface.ringInvalid}`,
    },
  },
  link: {
    color: theme.primary,
    textUnderlineOffset: "4px",
    textDecorationLine: { default: "none", ":hover": "underline" },
  },

  // ── sizes ────────────────────────────────────────────────────────────────
  defaultSize: {
    height: spacing[8],
    gap: spacing["1.5"],
    borderRadius: {
      default: radius.lg,
      [stylex.when.ancestor('[data-slot="button-group"]', buttonGroupMarker)]:
        radius.lg,
    },
    paddingInline: spacing["2.5"],
    paddingInlineEnd: {
      default: spacing["2.5"],
      ':has([data-icon="inline-end"])': spacing[2],
    },
    paddingInlineStart: {
      default: spacing["2.5"],
      ':has([data-icon="inline-start"])': spacing[2],
    },
  },
  xs: {
    height: spacing[6],
    gap: spacing[1],
    borderRadius: {
      default: CLAMPED_MD_10,
      [stylex.when.ancestor('[data-slot="button-group"]', buttonGroupMarker)]:
        radius.lg,
    },
    paddingInline: spacing[2],
    paddingInlineEnd: {
      default: spacing[2],
      ':has([data-icon="inline-end"])': spacing["1.5"],
    },
    paddingInlineStart: {
      default: spacing[2],
      ':has([data-icon="inline-start"])': spacing["1.5"],
    },
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    [ctx.iconSize]: "0.75rem",
  },
  sm: {
    height: spacing[7],
    gap: spacing[1],
    borderRadius: {
      default: CLAMPED_MD_12,
      [stylex.when.ancestor('[data-slot="button-group"]', buttonGroupMarker)]:
        radius.lg,
    },
    paddingInline: spacing["2.5"],
    paddingInlineEnd: {
      default: spacing["2.5"],
      ':has([data-icon="inline-end"])': spacing["1.5"],
    },
    paddingInlineStart: {
      default: spacing["2.5"],
      ':has([data-icon="inline-start"])': spacing["1.5"],
    },
    fontSize: "0.8rem",
    // `text-[0.8rem]` made `cn` delete the base's `text-sm`, line-height and
    // all, so the original inherits its parent's: restated, as Toggle does.
    // Without it, text that is not a trimmed label sat half a pixel high.
    lineHeight: "inherit",
    [ctx.iconSize]: "0.875rem",
  },
  lg: {
    height: spacing[9],
    gap: spacing["1.5"],
    borderRadius: {
      default: radius.lg,
      [stylex.when.ancestor('[data-slot="button-group"]', buttonGroupMarker)]:
        radius.lg,
    },
    paddingInline: spacing["2.5"],
    paddingInlineEnd: {
      default: spacing["2.5"],
      ':has([data-icon="inline-end"])': spacing[2],
    },
    paddingInlineStart: {
      default: spacing["2.5"],
      ':has([data-icon="inline-start"])': spacing[2],
    },
  },
  icon: {
    width: spacing[8],
    height: spacing[8],
    borderRadius: radius.lg,
  },
  iconXs: {
    width: spacing[6],
    height: spacing[6],
    borderRadius: {
      default: CLAMPED_MD_10,
      [stylex.when.ancestor('[data-slot="button-group"]', buttonGroupMarker)]:
        radius.lg,
    },
    [ctx.iconSize]: "0.75rem",
  },
  iconSm: {
    width: spacing[7],
    height: spacing[7],
    borderRadius: {
      default: CLAMPED_MD_12,
      [stylex.when.ancestor('[data-slot="button-group"]', buttonGroupMarker)]:
        radius.lg,
    },
    // Unlike `sm`, the original `icon-sm` has no icon-size rule: its icon stays
    // at the base 1rem.
    [ctx.iconSize]: "1rem",
  },
  iconLg: {
    width: spacing[9],
    height: spacing[9],
    borderRadius: radius.lg,
  },
})

export const button = recipe({
  base: styles.base,
  variants: {
    variant: {
      default: styles.default,
      outline: styles.outline,
      secondary: styles.secondary,
      ghost: styles.ghost,
      destructive: styles.destructive,
      link: styles.link,
    },
    size: {
      default: styles.defaultSize,
      xs: styles.xs,
      sm: styles.sm,
      lg: styles.lg,
      icon: styles.icon,
      "icon-xs": styles.iconXs,
      "icon-sm": styles.iconSm,
      "icon-lg": styles.iconLg,
    },
  },
  defaults: { variant: "default", size: "default" },
})

/**
 * The ring has to be applied before the weight variant, so a weight that
 * redefines `borderColor` or `boxShadow` (outline, destructive) wins.
 */
export const buttonRing = styles.ring

/** For text passed to a Button as an element rather than a string. */
export const buttonLabel = styles.label
