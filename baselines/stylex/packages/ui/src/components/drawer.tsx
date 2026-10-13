import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"

import type { Sx } from "../lib/sx"
import { drawerCtx } from "../theme/context.stylex"
import { drawerPopupMarker } from "../theme/markers.stylex"
import { radius, theme } from "../theme/semantic.stylex"
import { blur } from "../tokens/blur.stylex"
import { breakpoint } from "../tokens/breakpoints.stylex"
import { duration, easing } from "../tokens/motion.stylex"
import { spacing } from "../tokens/spacing.stylex"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from "../tokens/typography.stylex"
import { zIndex } from "../tokens/z-index.stylex"

/**
 * The swipe handle and the content both dim while a drawer opens on top of them,
 * and come back if the user starts dragging that nested drawer away again.
 */

/** Live gesture values Base UI writes onto the popup. */
const SWIPE_X = "var(--drawer-swipe-movement-x)"
const SWIPE_Y = "var(--drawer-swipe-movement-y)"
const SNAP_OFFSET = "var(--drawer-snap-point-offset, 0px)"
const INSET = "var(--drawer-inset, 0px)"
/** A swipe that is released fast closes faster, proportionally. */
const FLICK = "calc(var(--drawer-swipe-strength) * 400ms)"

/**
 * The stack geometry, composed here rather than in `context.stylex.ts`.
 *
 * Every formula reads a variable Base UI writes onto the popup, so it has to be
 * assigned on the popup: a `defineVars` default is substituted on `:root`, where
 * those variables do not exist, and the result is an invalid custom property
 * that silently takes the whole `transform` with it.
 */
/** How much each nested drawer shrinks the one behind it. */
const STACK_STEP = "0.05"
/** Swipe progress, clamped so an over-drag cannot invert the stack. */
const PROGRESS = "clamp(0, var(--drawer-swipe-progress), 1)"
const SCALE_BASE = `max(0, calc(1 - (var(--nested-drawers) * ${STACK_STEP})))`
const SCALE = `clamp(0, calc(${SCALE_BASE} + (${STACK_STEP} * ${PROGRESS})), 1)`

const styles = stylex.create({
  overlay: {
    // iOS Safari cannot hold a fixed backdrop still while the page rubber-bands,
    // so there it is positioned against the page instead of the viewport.
    position: {
      default: "fixed",
      "@supports (-webkit-touch-callout: none)": "absolute",
    },
    inset: 0,
    zIndex: zIndex.overlay,
    minHeight: "100dvh",
    backgroundColor: "rgb(0 0 0 / 0.1)",
    userSelect: "none",
    transitionProperty: "opacity",
    transitionTimingFunction: easing.decelerate,
    // Nested in the properties rather than written as top-level at-rules, which
    // StyleX treats as an antipattern.
    backdropFilter: {
      default: null,
      "@supports (backdrop-filter: blur(1px))": `blur(${blur.xs})`,
    },

    // Fades out in step with the drag, and never below the floor a snap-point
    // drawer sets so the content behind stays dimmed at rest.
    opacity: {
      default: `max(var(--drawer-overlay-min-opacity, 0), calc(1 - var(--drawer-swipe-progress)))`,
      "[data-starting-style]": 0,
      "[data-ending-style]": 0,
    },
    // No plain default: it would sit outside the cascade layers and beat the
    // condition. The `var()` above falls back to 0 instead.
    "--drawer-overlay-min-opacity": {
      default: null,
      "[data-snap-points]": "0.5",
    },
    pointerEvents: { default: null, "[data-ending-style]": "none" },
    transitionDuration: {
      default: duration[450],
      "[data-swiping]": duration[0],
      "[data-ending-style]": FLICK,
    },
  },

  viewport: {
    pointerEvents: { default: "none", '[data-modal="true"]': "auto" },
    position: "fixed",
    inset: 0,
    zIndex: zIndex.overlay,
    userSelect: "none",
  },

  popup: {
    pointerEvents: "auto",
    position: "fixed",
    zIndex: zIndex.popover,
    margin: INSET,
    display: "flex",
    flexDirection: { default: "column", '[data-swipe-axis="x"]': "row" },
    minHeight: 0,
    backgroundColor: theme.popover,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.popoverForeground,
    willChange: "transform",
    outlineStyle: "none",
    userSelect: "none",
    // Lets `height: auto` participate in the height transition.
    interpolateSize: "allow-keywords",

    height: {
      default: drawerCtx.contentHeight,
      '[data-swipe-axis="y"][data-nested-drawer-open]': drawerCtx.stackHeight,
    },
    maxHeight: drawerCtx.contentMaxHeight,
    width: drawerCtx.contentWidth,

    /**
     * Size per axis.
     *
     * Every `default` here is `null` on purpose. A conditional custom property
     * and its own `default` are emitted as two classes in different StyleX
     * layers, and for a plain attribute condition the `default` lands in the
     * later one — so it wins, and the condition never takes effect. Leaving the
     * default to the `defineVars` declaration instead puts it on `:root`, where
     * it is merely inherited and any element-level condition beats it.
     *
     * Where a value has to apply unconditionally *and* be overridden, both
     * branches are attribute conditions, so ordinary specificity decides: the
     * two-attribute compound below wins over the one-attribute rule.
     */
    [drawerCtx.contentWidth]: {
      default: null,
      '[data-swipe-axis="x"]': {
        default: "75%",
        [breakpoint.sm]: "24rem",
      },
    },
    [drawerCtx.contentMaxHeight]: {
      default: null,
      '[data-swipe-axis="y"]': "calc(100dvh - 6rem)",
    },
    [drawerCtx.contentHeight]: {
      default: null,
      '[data-swipe-axis="x"]': "var(--drawer-height, auto)",
      '[data-swipe-axis="y"]': "var(--drawer-height, auto)",
      '[data-swipe-axis="y"][data-snap-points]': "100dvh",
    },

    insetInline: { default: null, '[data-swipe-axis="y"]': 0 },
    insetBlock: { default: null, '[data-swipe-axis="x"]': 0 },
    bottom: { default: null, '[data-swipe-direction="down"]': 0 },
    top: { default: null, '[data-swipe-direction="up"]': 0 },
    insetInlineStart: { default: null, '[data-swipe-direction="left"]': 0 },
    insetInlineEnd: { default: null, '[data-swipe-direction="right"]': 0 },
    transformOrigin: {
      default: null,
      '[data-swipe-direction="down"]': "bottom",
      '[data-swipe-direction="up"]': "top",
      '[data-swipe-direction="left"]': "left",
      '[data-swipe-direction="right"]': "right",
    },

    // Only the edge the drawer slides from stays square.
    borderStartStartRadius: {
      default: 0,
      '[data-swipe-direction="down"]': radius.xl,
      '[data-swipe-direction="right"]': radius.xl,
    },
    borderStartEndRadius: {
      default: 0,
      '[data-swipe-direction="down"]': radius.xl,
      '[data-swipe-direction="left"]': radius.xl,
    },
    borderEndStartRadius: {
      default: 0,
      '[data-swipe-direction="up"]': radius.xl,
      '[data-swipe-direction="right"]': radius.xl,
    },
    borderEndEndRadius: {
      default: 0,
      '[data-swipe-direction="up"]': radius.xl,
      '[data-swipe-direction="left"]': radius.xl,
    },
    borderTopWidth: { default: 0, '[data-swipe-direction="down"]': "1px" },
    borderBottomWidth: { default: 0, '[data-swipe-direction="up"]': "1px" },
    borderInlineStartWidth: {
      default: 0,
      '[data-swipe-direction="right"]': "1px",
    },
    borderInlineEndWidth: {
      default: 0,
      '[data-swipe-direction="left"]': "1px",
    },
    borderColor: theme.border,
    borderStyle: "solid",

    // A drawer with another open on top of it recedes slightly.
    overflow: { default: null, "[data-nested-drawer-open]": "hidden" },
    filter: { default: null, "[data-nested-drawer-open]": "brightness(0.95)" },

    [drawerCtx.stackHeight]:
      "var(--drawer-frontmost-height, var(--drawer-height, 0px))",
    [drawerCtx.stackScale]: SCALE,
    [drawerCtx.stackShrink]: `calc(1 - ${SCALE})`,
    [drawerCtx.stackPeekOffset]: `max(0px, calc((var(--nested-drawers) - ${PROGRESS}) * ${drawerCtx.peek}))`,

    // Where the drawer sits when closed, per direction.
    [drawerCtx.closedTransform]: {
      default: null,
      '[data-swipe-direction="down"]': `translate3d(0, calc(100% + ${INSET} + 2px), 0)`,
      '[data-swipe-direction="up"]': `translate3d(0, calc(-100% - ${INSET} - 2px), 0)`,
      '[data-swipe-direction="left"]': `translate3d(calc(-100% - ${INSET} - 2px), 0, 0)`,
      '[data-swipe-direction="right"]': `translate3d(calc(100% + ${INSET} + 2px), 0, 0)`,
    },
    // Live position: the drag, plus the stack offsets for drawers behind it.
    [drawerCtx.translateY]: {
      default: null,
      '[data-swipe-direction="down"]': `calc(${SNAP_OFFSET} + ${SWIPE_Y} - ${drawerCtx.stackPeekOffset} - (${drawerCtx.stackShrink} * ${drawerCtx.stackHeight}))`,
      '[data-swipe-direction="up"]': `calc(${SNAP_OFFSET} + ${SWIPE_Y} + ${drawerCtx.stackPeekOffset} + (${drawerCtx.stackShrink} * ${drawerCtx.stackHeight}))`,
    },
    [drawerCtx.translateX]: {
      default: null,
      '[data-swipe-direction="left"]': `calc(${SWIPE_X} + ${drawerCtx.stackPeekOffset} + (${drawerCtx.stackShrink} * 100%))`,
      '[data-swipe-direction="right"]': `calc(${SWIPE_X} - ${drawerCtx.stackPeekOffset} - (${drawerCtx.stackShrink} * 100%))`,
    },

    transform: {
      default: `translate3d(${drawerCtx.translateX}, ${drawerCtx.translateY}, 0) scale(${drawerCtx.stackScale})`,
      "[data-starting-style]": drawerCtx.closedTransform,
      "[data-ending-style]": drawerCtx.closedTransform,
    },
    // Not quite 1: keeps the element composited through the exit transition.
    opacity: { default: null, "[data-ending-style]": 0.9999 },
    transitionProperty: "transform, height, opacity, filter",
    transitionTimingFunction: easing.emphasized,
    transitionDuration: {
      default: duration[450],
      "[data-swiping]": duration[0],
      "[data-nested-drawer-swiping]": duration[0],
      "[data-ending-style]": FLICK,
    },

    // Solid bleed past the leading edge, so an elastic over-drag shows no seam.
    "::after": {
      content: "''",
      pointerEvents: "none",
      position: "absolute",
      backgroundColor: theme.popover,
    },
  },
  /**
   * The bleed's own geometry, which depends on the swipe axis. It extends past
   * the edge the drawer is attached to — above a top drawer, left of a left one —
   * so it stays off-screen at rest and only fills the gap an over-drag opens.
   */
  popupBleedY: {
    "::after": {
      insetInline: 0,
      height: drawerCtx.bleed,
      top: { default: null, '[data-swipe-direction="down"]': "100%" },
      bottom: { default: null, '[data-swipe-direction="up"]': "100%" },
    },
  },
  popupBleedX: {
    "::after": {
      insetBlock: 0,
      width: drawerCtx.bleed,
      insetInlineStart: {
        default: null,
        '[data-swipe-direction="right"]': "100%",
      },
      insetInlineEnd: {
        default: null,
        '[data-swipe-direction="left"]': "100%",
      },
    },
  },

  content: {
    display: "flex",
    minHeight: 0,
    flex: 1,
    flexDirection: "column",
    overflow: "hidden",
    overscrollBehavior: "contain",
    borderRadius: "inherit",
    userSelect: {
      default: "text",
      [stylex.when.ancestor("[data-swiping]", drawerPopupMarker)]: "none",
    },
    transitionProperty: "opacity",
    transitionDuration: duration[300],
    transitionTimingFunction: easing.overshoot,
    opacity: {
      default: 1,
      [stylex.when.ancestor("[data-nested-drawer-open]", drawerPopupMarker)]: 0,
      [stylex.when.ancestor("[data-nested-drawer-swiping]", drawerPopupMarker)]:
        1,
    },
  },

  handle: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    flexShrink: 0,
    cursor: { default: "grab", ":active": "grabbing" },
    transitionProperty: "opacity",
    transitionDuration: duration[200],
    opacity: {
      default: 1,
      [stylex.when.ancestor("[data-nested-drawer-open]", drawerPopupMarker)]: 0,
      [stylex.when.ancestor("[data-nested-drawer-swiping]", drawerPopupMarker)]:
        1,
    },

    height: {
      default: null,
      [stylex.when.ancestor('[data-swipe-axis="x"]', drawerPopupMarker)]:
        "100%",
      [stylex.when.ancestor('[data-swipe-axis="y"]', drawerPopupMarker)]:
        spacing[3],
    },
    width: {
      default: null,
      [stylex.when.ancestor('[data-swipe-axis="x"]', drawerPopupMarker)]:
        spacing[3],
      [stylex.when.ancestor('[data-swipe-axis="y"]', drawerPopupMarker)]:
        "100%",
    },
    alignItems: {
      default: null,
      [stylex.when.ancestor('[data-swipe-axis="x"]', drawerPopupMarker)]:
        "center",
      [stylex.when.ancestor(
        '[data-swipe-direction="down"]',
        drawerPopupMarker
      )]: "flex-end",
      [stylex.when.ancestor('[data-swipe-direction="up"]', drawerPopupMarker)]:
        "flex-start",
    },
    justifyContent: {
      default: null,
      [stylex.when.ancestor('[data-swipe-axis="y"]', drawerPopupMarker)]:
        "center",
      [stylex.when.ancestor(
        '[data-swipe-direction="left"]',
        drawerPopupMarker
      )]: "flex-start",
      [stylex.when.ancestor(
        '[data-swipe-direction="right"]',
        drawerPopupMarker
      )]: "flex-end",
    },
    // Dragging up or left means the handle belongs on the far edge.
    order: {
      default: null,
      [stylex.when.ancestor(
        '[data-swipe-direction="left"]',
        drawerPopupMarker
      )]: 1,
      [stylex.when.ancestor('[data-swipe-direction="up"]', drawerPopupMarker)]:
        1,
    },

    "::after": {
      content: "''",
      display: "block",
      flexShrink: 0,
      borderRadius: radius.full,
      backgroundColor: theme.muted,
    },
  },
  handleBarY: { "::after": { height: spacing[1], width: spacing[24] } },
  handleBarX: { "::after": { height: spacing[24], width: spacing[1] } },

  header: {
    display: "flex",
    flexShrink: 0,
    flexDirection: "column",
    gap: spacing["0.5"],
    padding: spacing[4],
    paddingBottom: 0,
    /**
     * `group-data-[swipe-axis=y]/drawer-popup:text-center md:text-start`.
     *
     * In Tailwind the group variant out-specifies the bare `md:` utility, so a
     * bottom or top drawer stays centred at every width and `md:text-start`
     * only reaches side drawers. StyleX ranks `@media` above `when.*`, so the
     * same two keys side by side would flip that. Nesting states it outright.
     */
    textAlign: {
      default: null,
      [stylex.when.ancestor('[data-swipe-axis="y"]', drawerPopupMarker)]:
        "center",
      [breakpoint.md]: {
        default: "start",
        [stylex.when.ancestor('[data-swipe-axis="y"]', drawerPopupMarker)]:
          "center",
      },
    },
  },
  footer: {
    marginTop: "auto",
    display: "flex",
    flexShrink: 0,
    flexDirection: "column",
    gap: spacing[2],
    padding: spacing[4],
    paddingTop: 0,
  },
  title: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.medium,
    color: theme.foreground,
  },
  description: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    textWrap: "balance",
    color: theme.mutedForeground,
  },
})

type DrawerContextValue = {
  hasSnapPoints: boolean
  modal: DrawerPrimitive.Root.Props["modal"]
  showSwipeHandle: boolean
  swipeDirection: NonNullable<DrawerPrimitive.Root.Props["swipeDirection"]>
}

const DrawerContext = React.createContext<DrawerContextValue | null>(null)

function useDrawer() {
  const context = React.useContext(DrawerContext)

  if (!context) {
    throw new Error("useDrawer must be used within a Drawer.")
  }

  return context
}

function Drawer({
  modal = true,
  showSwipeHandle = false,
  snapPoints,
  swipeDirection = "down",
  ...props
}: DrawerPrimitive.Root.Props & { showSwipeHandle?: boolean }) {
  const hasSnapPoints = snapPoints != null && snapPoints.length > 0
  const contextValue = React.useMemo(
    () => ({ hasSnapPoints, modal, showSwipeHandle, swipeDirection }),
    [hasSnapPoints, modal, showSwipeHandle, swipeDirection]
  )

  return (
    <DrawerContext value={contextValue}>
      <DrawerPrimitive.Root
        data-slot="drawer"
        modal={modal}
        snapPoints={snapPoints}
        swipeDirection={swipeDirection}
        {...props}
      />
    </DrawerContext>
  )
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  sx,
  ...props
}: Omit<DrawerPrimitive.Backdrop.Props, "className"> & { sx?: Sx }) {
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      {...props}
      {...stylex.props(styles.overlay, sx)}
    />
  )
}

function DrawerSwipeHandle({
  sx,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  const { swipeDirection } = useDrawer()
  const axis = swipeDirection === "down" || swipeDirection === "up" ? "y" : "x"

  return (
    <div
      data-slot="drawer-swipe-handle"
      aria-hidden="true"
      {...props}
      sx={[
        styles.handle,
        axis === "y" ? styles.handleBarY : styles.handleBarX,
        sx,
      ]}
    />
  )
}

function DrawerContent({
  sx,
  children,
  ...props
}: Omit<DrawerPrimitive.Popup.Props, "className"> & { sx?: Sx }) {
  const { hasSnapPoints, modal, showSwipeHandle, swipeDirection } = useDrawer()
  const swipeAxis =
    swipeDirection === "down" || swipeDirection === "up" ? "y" : "x"

  return (
    <DrawerPortal data-slot="drawer-portal">
      {modal === true && (
        <DrawerOverlay data-snap-points={hasSnapPoints ? "" : undefined} />
      )}
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        data-modal={modal}
        {...stylex.props(styles.viewport)}
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-popup"
          data-swipe-axis={swipeAxis}
          data-snap-points={hasSnapPoints ? "" : undefined}
          {...props}
          {...stylex.props(
            drawerPopupMarker,
            styles.popup,
            swipeAxis === "y" ? styles.popupBleedY : styles.popupBleedX,
            sx
          )}
        >
          {showSwipeHandle && <DrawerSwipeHandle />}
          <DrawerPrimitive.Content
            data-slot="drawer-content"
            {...stylex.props(styles.content)}
          >
            {children}
          </DrawerPrimitive.Content>
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPortal>
  )
}

type El = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }

function DrawerHeader({ sx, ...props }: El) {
  return <div data-slot="drawer-header" {...props} sx={[styles.header, sx]} />
}

function DrawerFooter({ sx, ...props }: El) {
  return <div data-slot="drawer-footer" {...props} sx={[styles.footer, sx]} />
}

function DrawerTitle({
  sx,
  ...props
}: Omit<DrawerPrimitive.Title.Props, "className"> & { sx?: Sx }) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      {...props}
      {...stylex.props(styles.title, sx)}
    />
  )
}

function DrawerDescription({
  sx,
  ...props
}: Omit<DrawerPrimitive.Description.Props, "className"> & { sx?: Sx }) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      {...props}
      {...stylex.props(styles.description, sx)}
    />
  )
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerSwipeHandle,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
