import * as stylex from "@stylexjs/stylex"
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu"
import { ArrowDown01Icon } from "@hugeicons/core-free-icons"

import type { Sx } from "../lib/sx"
import { Icon } from "../primitives/icon"
import { ctx } from "../theme/context.stylex"
import { navigationMenuItemMarker } from "../theme/markers.stylex"
import { alpha, radius, theme } from "../theme/semantic.stylex"
import { duration, easing } from "../tokens/motion.stylex"
import { ring } from "../tokens/ring.stylex"
import { shadow } from "../tokens/shadows.stylex"
import { spacing } from "../tokens/spacing.stylex"
import { fontSize, fontWeight, lineHeight } from "../tokens/typography.stylex"
import { zIndex } from "../tokens/z-index.stylex"

/**
 * The trigger's chevron flips while its menu is open. Reading that from the
 * trigger is what `group-data-popup-open/navigation-menu-trigger:` did.
 */

/** The slow, settled curve Base UI's navigation menu morphs along. */
const MORPH = "350ms"

const styles = stylex.create({
  root: {
    position: "relative",
    display: "flex",
    maxWidth: "max-content",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    display: "flex",
    flex: 1,
    listStyleType: "none",
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
  },
  item: { position: "relative" },

  trigger: {
    display: "inline-flex",
    height: spacing[9],
    width: "max-content",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    paddingInline: spacing["2.5"],
    paddingBlock: spacing["1.5"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    outlineStyle: "none",
    transitionProperty: "color, background-color, box-shadow",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    backgroundColor: {
      default: null,
      ":hover": theme.muted,
      ":focus": theme.muted,
      "[data-popup-open]": alpha.muted50,
      "[data-open]": alpha.muted50,
    },
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 ${ring.width} ${alpha.ring50}`,
    },
    pointerEvents: { default: null, ":disabled": "none" },
    opacity: { default: null, ":disabled": 0.5 },
  },
  chevron: {
    position: "relative",
    top: "1px",
    marginInlineStart: spacing[1],
    width: spacing[3],
    height: spacing[3],
    transitionProperty: "rotate",
    transitionDuration: duration[300],
    rotate: {
      default: "0deg",
      [stylex.when.ancestor("[data-popup-open]", navigationMenuItemMarker)]:
        "180deg",
    },
  },

  content: {
    height: "100%",
    width: "auto",
    padding: spacing[1],
    transitionProperty: "opacity, translate",
    transitionDuration: MORPH,
    transitionTimingFunction: easing.emphasized,
    opacity: {
      default: 1,
      "[data-starting-style]": 0,
      "[data-ending-style]": 0,
    },
    // Panels slide in from whichever side the previously open panel was on, so
    // moving along the bar reads as one continuous surface.
    translate: {
      default: "0",
      "[data-starting-style]": {
        default: "0",
        '[data-activation-direction="left"]': "-50% 0",
        '[data-activation-direction="right"]': "50% 0",
      },
      "[data-ending-style]": {
        default: "0",
        '[data-activation-direction="left"]': "50% 0",
        '[data-activation-direction="right"]': "-50% 0",
      },
    },
  },

  positioner: {
    isolation: "isolate",
    zIndex: zIndex.popover,
    height: "var(--positioner-height)",
    width: "var(--positioner-width)",
    maxWidth: "var(--available-width)",
    transitionProperty: "top, left, right, bottom",
    transitionDuration: MORPH,
    transitionTimingFunction: easing.emphasized,
  },
  popup: {
    position: "relative",
    height: "var(--popup-height)",
    width: "var(--popup-width)",
    transformOrigin: "var(--transform-origin)",
    borderRadius: radius.lg,
    backgroundColor: theme.popover,
    color: theme.popoverForeground,
    boxShadow: `0 0 0 1px ${alpha.foreground10}, ${shadow.sm}`,
    outlineStyle: "none",
    transitionProperty: "opacity, scale, width, height",
    transitionDuration: MORPH,
    transitionTimingFunction: easing.emphasized,
    opacity: {
      default: 1,
      "[data-starting-style]": 0,
      "[data-ending-style]": 0,
    },
    scale: {
      default: 1,
      "[data-starting-style]": 0.9,
      "[data-ending-style]": 0.9,
    },
  },
  viewport: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },

  link: {
    display: "flex",
    alignItems: "center",
    gap: spacing[2],
    borderRadius: radius.lg,
    padding: spacing[2],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    outlineStyle: "none",
    transitionProperty: "color, background-color, box-shadow",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    [ctx.iconSize]: "1rem",
    backgroundColor: {
      default: null,
      ":hover": theme.muted,
      ":focus": theme.muted,
      "[data-active]": alpha.muted50,
    },
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 ${ring.width} ${alpha.ring50}`,
    },
  },

  indicator: {
    top: "100%",
    zIndex: 1,
    display: "flex",
    height: spacing["1.5"],
    alignItems: "flex-end",
    justifyContent: "center",
    overflow: "hidden",
    transitionProperty: "opacity",
    transitionDuration: duration[150],
    opacity: { default: 1, '[data-state="hidden"]': 0 },
  },
  arrow: {
    position: "relative",
    top: "60%",
    width: spacing[2],
    height: spacing[2],
    rotate: "45deg",
    borderStartStartRadius: radius.sm,
    backgroundColor: theme.border,
    boxShadow: shadow.md,
  },
})

function NavigationMenu({
  align = "start",
  sx,
  children,
  ...props
}: Omit<NavigationMenuPrimitive.Root.Props, "className"> &
  Pick<NavigationMenuPrimitive.Positioner.Props, "align"> & { sx?: Sx }) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      {...props}
      {...stylex.props(styles.root, sx)}
    >
      {children}
      <NavigationMenuPositioner align={align} />
    </NavigationMenuPrimitive.Root>
  )
}

function NavigationMenuList({
  sx,
  ...props
}: Omit<
  React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.List>,
  "className"
> & { sx?: Sx }) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      {...props}
      {...stylex.props(styles.list, sx)}
    />
  )
}

function NavigationMenuItem({
  sx,
  ...props
}: Omit<
  React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Item>,
  "className"
> & { sx?: Sx }) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      {...props}
      {...stylex.props(styles.item, sx)}
    />
  )
}

function NavigationMenuTrigger({
  sx,
  children,
  ...props
}: Omit<NavigationMenuPrimitive.Trigger.Props, "className"> & { sx?: Sx }) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      {...props}
      {...stylex.props(navigationMenuItemMarker, styles.trigger, sx)}
    >
      {children}
      <Icon icon={ArrowDown01Icon} sx={styles.chevron} />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  sx,
  ...props
}: Omit<NavigationMenuPrimitive.Content.Props, "className"> & { sx?: Sx }) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      {...props}
      {...stylex.props(styles.content, sx)}
    />
  )
}

function NavigationMenuPositioner({
  sx,
  side = "bottom",
  sideOffset = 8,
  align = "start",
  alignOffset = 0,
  ...props
}: Omit<NavigationMenuPrimitive.Positioner.Props, "className"> & { sx?: Sx }) {
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        {...props}
        {...stylex.props(styles.positioner, sx)}
      >
        <NavigationMenuPrimitive.Popup {...stylex.props(styles.popup)}>
          <NavigationMenuPrimitive.Viewport
            {...stylex.props(styles.viewport)}
          />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  )
}

function NavigationMenuLink({
  sx,
  ...props
}: Omit<NavigationMenuPrimitive.Link.Props, "className"> & { sx?: Sx }) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      {...props}
      {...stylex.props(styles.link, sx)}
    />
  )
}

function NavigationMenuIndicator({
  sx,
  ...props
}: Omit<
  React.ComponentPropsWithRef<typeof NavigationMenuPrimitive.Icon>,
  "className"
> & { sx?: Sx }) {
  return (
    <NavigationMenuPrimitive.Icon
      data-slot="navigation-menu-indicator"
      {...props}
      {...stylex.props(styles.indicator, sx)}
    >
      <div sx={styles.arrow} />
    </NavigationMenuPrimitive.Icon>
  )
}

/**
 * The trigger's look, for a plain link that sits in the bar beside triggers:
 * `<NavigationMenuLink sx={navigationMenuTriggerStyle} />`. The original's
 * `navigationMenuTriggerStyle()` class string.
 */
const navigationMenuTriggerStyle = styles.trigger

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuPositioner,
  navigationMenuTriggerStyle,
}
