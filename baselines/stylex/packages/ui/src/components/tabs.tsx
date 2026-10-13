import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"

import type { Sx } from "../lib/sx"
import type { VariantProps } from "../recipes/recipe"
import { recipe } from "../recipes/recipe"
import { ctx } from "../theme/context.stylex"
import { tabsListMarker, tabsMarker } from "../theme/markers.stylex"
import { alpha, radius, surface, theme } from "../theme/semantic.stylex"
import { duration, easing } from "../tokens/motion.stylex"
import { ring } from "../tokens/ring.stylex"
import { shadow } from "../tokens/shadows.stylex"
import { spacing } from "../tokens/spacing.stylex"
import { fontSize, fontWeight, lineHeight } from "../tokens/typography.stylex"

/** The `line` list draws an underline instead of a filled pill. */

const styles = stylex.create({
  root: {
    display: "flex",
    gap: spacing[2],
    flexDirection: {
      default: "row",
      '[data-orientation="horizontal"]': "column",
    },
  },

  listBase: {
    display: "inline-flex",
    width: "fit-content",
    alignItems: "center",
    justifyContent: "center",
    padding: "3px",
    color: theme.mutedForeground,
    borderRadius: { default: radius.lg, '[data-variant="line"]': 0 },
    height: {
      default: null,
      [stylex.when.ancestor('[data-orientation="horizontal"]', tabsMarker)]:
        spacing[8],
      [stylex.when.ancestor('[data-orientation="vertical"]', tabsMarker)]:
        "fit-content",
    },
    flexDirection: {
      default: null,
      [stylex.when.ancestor('[data-orientation="vertical"]', tabsMarker)]:
        "column",
    },
  },
  listDefault: { backgroundColor: theme.muted },
  listLine: { gap: spacing[1], backgroundColor: "transparent" },

  trigger: {
    position: "relative",
    display: "inline-flex",
    height: "calc(100% - 1px)",
    flex: 1,
    alignItems: "center",
    justifyContent: {
      default: "center",
      [stylex.when.ancestor('[data-orientation="vertical"]', tabsMarker)]:
        "flex-start",
    },
    gap: spacing["1.5"],
    borderRadius: radius.md,
    borderWidth: "1px",
    borderStyle: "solid",
    paddingInline: spacing["1.5"],
    paddingInlineEnd: {
      default: spacing["1.5"],
      ':has([data-icon="inline-end"])': spacing[1],
    },
    paddingInlineStart: {
      default: spacing["1.5"],
      ':has([data-icon="inline-start"])': spacing[1],
    },
    paddingBlock: spacing["0.5"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    whiteSpace: "nowrap",
    outlineStyle: "none",
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    [ctx.iconSize]: "1rem",

    width: {
      default: null,
      [stylex.when.ancestor('[data-orientation="vertical"]', tabsMarker)]:
        "100%",
    },

    color: {
      default: surface.inactiveForeground,
      ":hover": theme.foreground,
      "[data-active]": theme.foreground,
    },
    // The line variant clears the active pill. Nested inside `[data-active]`,
    // because StyleX ranks the attribute above the ancestor query beside it.
    backgroundColor: {
      default: null,
      "[data-active]": {
        default: surface.activeSurface,
        [stylex.when.ancestor('[data-variant="line"]', tabsListMarker)]:
          "transparent",
      },
    },
    borderColor: {
      default: "transparent",
      ":focus-visible": theme.ring,
      "[data-active]": {
        default: surface.activeBorder,
        [stylex.when.ancestor('[data-variant="line"]', tabsListMarker)]:
          "transparent",
      },
    },
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 ${ring.width} ${alpha.ring50}`,
    },
    pointerEvents: {
      default: null,
      ":disabled": "none",
      '[aria-disabled="true"]': "none",
    },
    opacity: { default: null, ":disabled": 0.5, '[aria-disabled="true"]': 0.5 },

    // The underline for the `line` variant. Sits outside the trigger box so it
    // tracks the list edge rather than the pill.
    "::after": {
      content: "''",
      position: "absolute",
      backgroundColor: theme.foreground,
      opacity: 0,
      transitionProperty: "opacity",
      transitionDuration: duration[150],
    },
  },
  triggerVerticalIndicator: {
    "::after": {
      insetBlock: 0,
      insetInlineEnd: `calc(${spacing[1]} * -1)`,
      width: "2px",
    },
  },
  triggerHorizontalIndicator: {
    "::after": { insetInline: 0, bottom: "-5px", height: "2px" },
  },
  triggerLineActive: { "::after": { opacity: 1 } },
  triggerDefaultActive: {
    boxShadow: {
      default: null,
      "[data-active]": shadow.sm,
      ":focus-visible": `0 0 0 ${ring.width} ${alpha.ring50}`,
    },
  },

  content: {
    flex: 1,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    outlineStyle: "none",
  },
})

const tabsList = recipe({
  base: styles.listBase,
  variants: {
    variant: { default: styles.listDefault, line: styles.listLine },
  },
  defaults: { variant: "default" },
})

function Tabs({
  sx,
  orientation = "horizontal",
  ...props
}: Omit<TabsPrimitive.Root.Props, "className"> & { sx?: Sx }) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      // Base UI needs it too, or arrow keys and each tab's state stay horizontal.
      orientation={orientation}
      {...props}
      {...stylex.props(tabsMarker, styles.root, sx)}
    />
  )
}

/** The list's variant, which decides how its active trigger is drawn. */
const TabsListVariantContext = React.createContext<"default" | "line">(
  "default"
)

function TabsList({
  sx,
  variant,
  children,
  ...props
}: Omit<TabsPrimitive.List.Props, "className"> &
  VariantProps<typeof tabsList> & { sx?: Sx }) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant ?? "default"}
      {...props}
      {...stylex.props(tabsListMarker, ...tabsList({ variant }), sx)}
    >
      <TabsListVariantContext value={variant ?? "default"}>
        {children}
      </TabsListVariantContext>
    </TabsPrimitive.List>
  )
}

function TabsTrigger({
  sx,
  ...props
}: Omit<TabsPrimitive.Tab.Props, "className"> & { sx?: Sx }) {
  const variant = React.useContext(TabsListVariantContext)
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      {...props}
      // Base UI hands the tab's state to a className function, so the active
      // indicator and its edge follow the real state rather than an attribute
      // query inside a pseudo-element, which StyleX cannot condition.
      className={(state) =>
        stylex.props(
          styles.trigger,
          state.orientation === "vertical"
            ? styles.triggerVerticalIndicator
            : styles.triggerHorizontalIndicator,
          variant === "line"
            ? state.active && styles.triggerLineActive
            : styles.triggerDefaultActive,
          sx
        ).className ?? ""
      }
    />
  )
}

function TabsContent({
  sx,
  ...props
}: Omit<TabsPrimitive.Panel.Props, "className"> & { sx?: Sx }) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      {...props}
      {...stylex.props(styles.content, sx)}
    />
  )
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsList as tabsListVariants,
}
