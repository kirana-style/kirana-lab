import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { SidebarLeftIcon } from "@hugeicons/core-free-icons"

import { useIsMobile } from "../hooks/use-mobile"
import type { Sx } from "../lib/sx"
import { mergeSx } from "../lib/sx"
import type { VariantProps } from "../recipes/recipe"
import { recipe } from "../recipes/recipe"
import { Button } from "./button"
import { Input } from "./input"
import { Separator } from "./separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./sheet"
import { Skeleton } from "./skeleton"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"
import { Icon } from "../primitives/icon"
import { VisuallyHidden, visuallyHidden } from "../primitives/visually-hidden"
import { ctx, sidebarCtx } from "../theme/context.stylex"
import {
  menuActionMarker,
  menuButtonMarker,
  menuItemMarker,
  sidebarMarker,
} from "../theme/markers.stylex"
import { alpha, radius, surface, theme } from "../theme/semantic.stylex"
import { breakpoint } from "../tokens/breakpoints.stylex"
import { duration } from "../tokens/motion.stylex"
import { shadow } from "../tokens/shadows.stylex"
import { spacing } from "../tokens/spacing.stylex"
import { fontSize, fontWeight, lineHeight } from "../tokens/typography.stylex"

const SIDEBAR_COOKIE_NAME = "sidebar_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

/**
 * The sidebar root carries one marker that plays both Tailwind roles at once: it
 * was `group peer` there, read by descendants *and* by the main content beside
 * it. `when.ancestor` covers the first, `when.siblingBefore` the second, and the
 * single marker scopes them both.
 */
/** `peer-data-[variant=inset]`: the main content reacts to the sidebar's variant. */

/** Rows read the button beside them, which is what `peer/menu-button` did. */
/**
 * `group-has-data-[sidebar=menu-action]/menu-item:pe-8` asked whether the row
 * containing this button also contains an action. Asked from the button itself it
 * is simply "is there an action after me", which is a sibling query.
 */

const styles = stylex.create({
  wrapper: {
    display: "flex",
    minHeight: "100svh",
    width: "100%",
    backgroundColor: {
      default: null,
      ':has([data-variant="inset"])': theme.sidebar,
    },
  },

  /** `collapsible="none"`: a plain static column. */
  static: {
    display: "flex",
    height: "100%",
    width: sidebarCtx.width,
    flexDirection: "column",
    backgroundColor: theme.sidebar,
    color: theme.sidebarForeground,
  },

  mobile: {
    width: sidebarCtx.width,
    [sidebarCtx.width]: sidebarCtx.widthMobile,
    backgroundColor: theme.sidebar,
    padding: 0,
    color: theme.sidebarForeground,
  },

  root: {
    display: { default: "none", [breakpoint.md]: "block" },
    color: theme.sidebarForeground,
  },

  /** Holds the space the fixed sidebar occupies, so content is never underneath. */
  gap: {
    position: "relative",
    width: sidebarCtx.width,
    backgroundColor: "transparent",
    transitionProperty: "width",
    transitionDuration: duration[200],
    transitionTimingFunction: "linear",
    // Was `group-data-[side=right]:rotate-180`, read from the sidebar root.
    rotate: {
      default: null,
      [stylex.when.ancestor('[data-side="right"]', sidebarMarker)]: "180deg",
    },
  },
  gapOffcanvas: { width: 0 },
  gapIcon: { width: sidebarCtx.widthIcon },
  /** Floating and inset variants are inset by their own padding. */
  gapIconPadded: { width: `calc(${sidebarCtx.widthIcon} + ${spacing[4]})` },

  container: {
    position: "fixed",
    insetBlock: 0,
    zIndex: 10,
    display: { default: "none", [breakpoint.md]: "flex" },
    height: "100svh",
    width: sidebarCtx.width,
    transitionProperty: "left, right, width",
    transitionDuration: duration[200],
    transitionTimingFunction: "linear",
    left: { default: null, '[data-side="left"]': 0 },
    right: { default: null, '[data-side="right"]': 0 },
  },
  /** Offcanvas slides the whole panel out past the edge it is pinned to. */
  containerOffcanvasLeft: { left: `calc(${sidebarCtx.width} * -1)` },
  containerOffcanvasRight: { right: `calc(${sidebarCtx.width} * -1)` },
  containerPadded: { padding: spacing[2] },
  containerIconPadded: {
    width: `calc(${sidebarCtx.widthIcon} + ${spacing[4]} + 2px)`,
  },
  containerIcon: { width: sidebarCtx.widthIcon },
  containerBorderedLeft: {
    borderInlineEndWidth: "1px",
    borderInlineEndStyle: "solid",
    borderColor: theme.sidebarBorder,
  },
  containerBorderedRight: {
    borderInlineStartWidth: "1px",
    borderInlineStartStyle: "solid",
    borderColor: theme.sidebarBorder,
  },

  inner: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
    backgroundColor: theme.sidebar,
  },
  innerFloating: {
    borderRadius: radius.lg,
    boxShadow: `0 0 0 1px ${theme.sidebarBorder}, ${shadow.sm}`,
  },

  rail: {
    position: "absolute",
    insetBlock: 0,
    zIndex: 20,
    display: { default: "none", [breakpoint.sm]: "flex" },
    width: spacing[4],
    transitionProperty: "all",
    transitionTimingFunction: "linear",
    // Centred on the edge it straddles, in either writing direction.
    translate: "-50% 0",
    insetInlineEnd: {
      default: null,
      [stylex.when.ancestor('[data-side="left"]', sidebarMarker)]:
        `calc(${spacing[4]} * -1)`,
      [stylex.when.ancestor(
        '[data-side="left"][data-collapsible="offcanvas"]',
        sidebarMarker
      )]: null,
    },
    insetInlineStart: {
      default: null,
      [stylex.when.ancestor('[data-side="right"]', sidebarMarker)]: 0,
    },
    // Which way the cursor says the panel will move.
    cursor: {
      default: null,
      [stylex.when.ancestor('[data-side="left"]', sidebarMarker)]: "w-resize",
      [stylex.when.ancestor('[data-side="right"]', sidebarMarker)]: "e-resize",
      [stylex.when.ancestor('[data-state="collapsed"]', sidebarMarker)]: {
        default: null,
        [stylex.when.ancestor('[data-side="left"]', sidebarMarker)]: "e-resize",
        [stylex.when.ancestor('[data-side="right"]', sidebarMarker)]:
          "w-resize",
      },
    },
    "::after": {
      content: "''",
      position: "absolute",
      insetBlock: 0,
      // An offcanvas sidebar's rail sits outside it, so the line moves to the
      // far edge, where the panel's border is.
      insetInlineStart: {
        default: "50%",
        [stylex.when.ancestor('[data-collapsible="offcanvas"]', sidebarMarker)]:
          "100%",
      },
      width: "2px",
      // `hover:after:bg-sidebar-border`: the edge line that shows the rail is
      // there. Compiles to `:hover::after`.
      backgroundColor: { default: null, ":hover": theme.sidebarBorder },
    },
    backgroundColor: {
      default: null,
      [stylex.when.ancestor('[data-collapsible="offcanvas"]', sidebarMarker)]: {
        default: null,
        ":hover": theme.sidebar,
      },
    },
  },
  railOffcanvas: { translate: "0 0" },

  inset: {
    position: "relative",
    display: "flex",
    width: "100%",
    flex: 1,
    flexDirection: "column",
    backgroundColor: theme.background,
    // Only at `md` and up, and only when the sidebar says it is the inset variant.
    margin: {
      default: null,
      [breakpoint.md]: {
        default: null,
        [stylex.when.siblingBefore('[data-variant="inset"]', sidebarMarker)]:
          spacing[2],
      },
    },
    marginInlineStart: {
      default: null,
      [breakpoint.md]: {
        default: null,
        [stylex.when.siblingBefore('[data-variant="inset"]', sidebarMarker)]: 0,
        [stylex.when.siblingBefore(
          '[data-variant="inset"][data-state="collapsed"]',
          sidebarMarker
        )]: spacing[2],
      },
    },
    borderRadius: {
      default: null,
      [breakpoint.md]: {
        default: null,
        [stylex.when.siblingBefore('[data-variant="inset"]', sidebarMarker)]:
          radius.xl,
      },
    },
    boxShadow: {
      default: null,
      [breakpoint.md]: {
        default: null,
        [stylex.when.siblingBefore('[data-variant="inset"]', sidebarMarker)]:
          shadow.sm,
      },
    },
  },

  input: {
    height: spacing[8],
    width: "100%",
    // `bg-background` over Input's `dark:bg-input/30`, which still won in dark.
    backgroundColor: surface.outlineBackground,
    boxShadow: "none",
  },
  band: {
    display: "flex",
    flexDirection: "column",
    gap: spacing[2],
    padding: spacing[2],
  },
  separator: {
    marginInline: spacing[2],
    width: "auto",
    backgroundColor: theme.sidebarBorder,
  },

  content: {
    display: "flex",
    minHeight: 0,
    flex: 1,
    flexDirection: "column",
    gap: 0,
    overflow: {
      default: "auto",
      [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]:
        "hidden",
    },
    // Was the `no-scrollbar` utility from the ejected Tailwind layer.
    scrollbarWidth: "none",
    "::-webkit-scrollbar": { display: "none" },
  },

  group: {
    position: "relative",
    display: "flex",
    width: "100%",
    minWidth: 0,
    flexDirection: "column",
    padding: spacing[2],
  },
  groupLabel: {
    display: "flex",
    height: spacing[8],
    flexShrink: 0,
    alignItems: "center",
    borderRadius: radius.md,
    paddingInline: spacing[2],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    color: alpha.sidebarForeground70,
    outlineStyle: "none",
    transitionProperty: "margin, opacity",
    transitionDuration: duration[200],
    transitionTimingFunction: "linear",
    [ctx.iconSize]: "1rem",
    // Collapsed to icons, the label slides up out of view rather than reflowing.
    marginTop: {
      default: 0,
      [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]:
        `calc(${spacing[8]} * -1)`,
    },
    opacity: {
      default: 1,
      [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]: 0,
    },
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 2px ${theme.sidebarRing}`,
    },
  },
  groupAction: {
    position: "absolute",
    insetInlineEnd: spacing[3],
    top: spacing["3.5"],
    display: {
      default: "flex",
      [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]:
        "none",
    },
    aspectRatio: "1 / 1",
    width: spacing[5],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    padding: 0,
    color: theme.sidebarForeground,
    outlineStyle: "none",
    transitionProperty: "transform",
    [ctx.iconSize]: "1rem",
    backgroundColor: { default: null, ":hover": theme.sidebarAccent },
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 2px ${theme.sidebarRing}`,
    },
    // Widens the touch target, but only where there is no pointer.
    "::after": {
      content: "''",
      position: "absolute",
      inset: `calc(${spacing[2]} * -1)`,
    },
  },
  groupContent: {
    width: "100%",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },

  menu: {
    display: "flex",
    width: "100%",
    minWidth: 0,
    flexDirection: "column",
    gap: 0,
  },
  menuItem: { position: "relative" },

  buttonBase: {
    display: "flex",
    /**
     * Collapsed to icons the button becomes a square. The condition lives here,
     * on the namespace that owns `width`, rather than in a separate style
     * applied afterwards: a second namespace re-declaring `width` would replace
     * this one outright, taking the `100%` with it.
     */
    width: {
      default: "100%",
      [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]:
        spacing[8],
    },
    alignItems: "center",
    gap: spacing[2],
    overflow: "hidden",
    borderRadius: radius.md,
    padding: spacing[2],
    textAlign: "start",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    outlineStyle: "none",
    transitionProperty: "width, height, padding",
    [ctx.iconSize]: "1rem",
    // Room for an action button sitting after this one in the row.
    paddingInlineEnd: {
      default: spacing[2],
      [stylex.when.siblingAfter(
        '[data-sidebar="menu-action"]',
        menuActionMarker
      )]: spacing[8],
    },
    backgroundColor: {
      default: null,
      ":hover": theme.sidebarAccent,
      ":active": theme.sidebarAccent,
      "[data-open]": theme.sidebarAccent,
      "[data-active]": theme.sidebarAccent,
    },
    color: {
      default: null,
      ":hover": theme.sidebarAccentForeground,
      ":active": theme.sidebarAccentForeground,
      "[data-active]": theme.sidebarAccentForeground,
    },
    fontWeight: { default: null, "[data-active]": fontWeight.medium },
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 2px ${theme.sidebarRing}`,
    },
    pointerEvents: {
      default: null,
      ":disabled": "none",
      '[aria-disabled="true"]': "none",
    },
    opacity: { default: null, ":disabled": 0.5, '[aria-disabled="true"]': 0.5 },
  },
  buttonDefault: {},
  buttonOutline: {
    backgroundColor: {
      default: theme.background,
      ":hover": theme.sidebarAccent,
    },
    boxShadow: {
      default: `0 0 0 1px ${theme.sidebarBorder}`,
      ":hover": `0 0 0 1px ${theme.sidebarAccent}`,
      ":focus-visible": `0 0 0 2px ${theme.sidebarRing}`,
    },
  },
  /**
   * Each size owns the whole of `height`, collapsed case included. The original
   * wrote that case once with `size-8!`; here it is repeated per size, because
   * a shared style declaring `height` again would wipe the size out.
   */
  buttonSizeDefault: { height: spacing[8], fontSize: fontSize.sm },
  buttonSizeSm: {
    height: {
      default: spacing[7],
      [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]:
        spacing[8],
    },
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  },
  buttonSizeLg: {
    height: {
      default: spacing[12],
      [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]:
        spacing[8],
    },
    fontSize: fontSize.sm,
    /** `group-data-[collapsible=icon]:p-0!`: the tall button loses its padding. */
    padding: {
      default: spacing[2],
      [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]: 0,
    },
  },

  /** Was `[&>span:last-child]:truncate`. */
  menuLabel: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  action: {
    position: "absolute",
    insetInlineEnd: spacing[1],
    display: {
      default: "flex",
      [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]:
        "none",
    },
    aspectRatio: "1 / 1",
    width: spacing[5],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    padding: 0,
    outlineStyle: "none",
    transitionProperty: "transform",
    [ctx.iconSize]: "1rem",
    // Lines up with whichever button size it sits beside.
    top: {
      default: spacing["1.5"],
      [stylex.when.siblingBefore('[data-size="sm"]', menuButtonMarker)]:
        spacing[1],
      [stylex.when.siblingBefore('[data-size="lg"]', menuButtonMarker)]:
        spacing["2.5"],
    },
    color: {
      default: theme.sidebarForeground,
      ":hover": theme.sidebarAccentForeground,
      [stylex.when.siblingBefore(":hover", menuButtonMarker)]:
        theme.sidebarAccentForeground,
    },
    backgroundColor: { default: null, ":hover": theme.sidebarAccent },
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 2px ${theme.sidebarRing}`,
    },
    // A larger touch target on small screens; `md:after:hidden` drops it where
    // a pointer is precise and it would overlap the neighbouring rows.
    "::after": {
      content: "''",
      position: "absolute",
      inset: `calc(${spacing[2]} * -1)`,
      display: { default: null, [breakpoint.md]: "none" },
    },
  },
  /** Hidden until the row is hovered or focused, on pointer devices only. */
  actionOnHover: {
    // Only the hover-revealed action follows an active button's colour; the
    // colour is restated whole because this merges after `action`.
    color: {
      default: theme.sidebarForeground,
      ":hover": theme.sidebarAccentForeground,
      [stylex.when.siblingBefore(":hover", menuButtonMarker)]:
        theme.sidebarAccentForeground,
      [stylex.when.siblingBefore("[data-active]", menuButtonMarker)]:
        theme.sidebarAccentForeground,
    },
    // `md:opacity-0` loses to the hover, focus and expanded variants in
    // Tailwind, but a bare `@media` key would beat them here. Nested, so the
    // reveal conditions are evaluated inside the breakpoint.
    opacity: {
      default: null,
      [breakpoint.md]: {
        default: 0,
        [stylex.when.ancestor(":hover", menuItemMarker)]: 1,
        [stylex.when.ancestor(":focus-within", menuItemMarker)]: 1,
        '[aria-expanded="true"]': 1,
      },
    },
  },

  badge: {
    pointerEvents: "none",
    position: "absolute",
    insetInlineEnd: spacing[1],
    display: {
      default: "flex",
      [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]:
        "none",
    },
    height: spacing[5],
    minWidth: spacing[5],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    paddingInline: spacing[1],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
    userSelect: "none",
    top: {
      default: spacing["1.5"],
      [stylex.when.siblingBefore('[data-size="sm"]', menuButtonMarker)]:
        spacing[1],
      [stylex.when.siblingBefore('[data-size="lg"]', menuButtonMarker)]:
        spacing["2.5"],
    },
    color: {
      default: theme.sidebarForeground,
      [stylex.when.siblingBefore(":hover", menuButtonMarker)]:
        theme.sidebarAccentForeground,
      [stylex.when.siblingBefore("[data-active]", menuButtonMarker)]:
        theme.sidebarAccentForeground,
    },
  },

  skeletonRow: {
    display: "flex",
    height: spacing[8],
    alignItems: "center",
    gap: spacing[2],
    borderRadius: radius.md,
    paddingInline: spacing[2],
  },
  skeletonIcon: {
    width: spacing[4],
    height: spacing[4],
    borderRadius: radius.md,
  },
  skeletonText: { height: spacing[4], flex: 1 },
  skeletonWidth: (value: string) => ({ maxWidth: value }),

  sub: {
    marginInline: spacing["3.5"],
    display: {
      default: "flex",
      [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]:
        "none",
    },
    minWidth: 0,
    flexDirection: "column",
    gap: spacing[1],
    borderInlineStartWidth: "1px",
    borderInlineStartStyle: "solid",
    borderColor: theme.sidebarBorder,
    paddingInline: spacing["2.5"],
    paddingBlock: spacing["0.5"],
    // Sits the list flush against the border line, in either direction.
    translate: "1px 0",
  },
  subItem: { position: "relative" },
  subButton: {
    display: {
      default: "flex",
      [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]:
        "none",
    },
    height: spacing[7],
    minWidth: 0,
    alignItems: "center",
    gap: spacing[2],
    overflow: "hidden",
    borderRadius: radius.md,
    paddingInline: spacing[2],
    color: theme.sidebarForeground,
    outlineStyle: "none",
    translate: "-1px 0",
    [ctx.iconSize]: "1rem",
    fontSize: { default: fontSize.sm, '[data-size="sm"]': fontSize.xs },
    lineHeight: {
      default: lineHeight.sm,
      '[data-size="sm"]': lineHeight.xs,
    },
    backgroundColor: {
      default: null,
      ":hover": theme.sidebarAccent,
      ":active": theme.sidebarAccent,
      "[data-active]": theme.sidebarAccent,
    },
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 2px ${theme.sidebarRing}`,
    },
    pointerEvents: {
      default: null,
      ":disabled": "none",
      '[aria-disabled="true"]': "none",
    },
    opacity: { default: null, ":disabled": 0.5, '[aria-disabled="true"]': 0.5 },
  },
  subButtonColor: {
    color: {
      default: theme.sidebarForeground,
      ":hover": theme.sidebarAccentForeground,
      ":active": theme.sidebarAccentForeground,
      "[data-active]": theme.sidebarAccentForeground,
    },
  },
})

const sidebarMenuButton = recipe({
  base: styles.buttonBase,
  variants: {
    variant: { default: styles.buttonDefault, outline: styles.buttonOutline },
    size: {
      default: styles.buttonSizeDefault,
      sm: styles.buttonSizeSm,
      lg: styles.buttonSizeLg,
    },
  },
  defaults: { variant: "default", size: "default" },
})

type SidebarContextValue = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }

  return context
}

type El<T extends keyof React.JSX.IntrinsicElements = "div"> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  sx,
  children,
  ...props
}: El & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // Internal state, used unless the caller controls `open` from outside.
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const open = openProp ?? uncontrolledOpen
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        setUncontrolledOpen(openState)
      }

      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  const toggleSidebar = React.useCallback(() => {
    return isMobile
      ? setOpenMobile((current) => !current)
      : setOpen((current) => !current)
  }, [isMobile, setOpen, setOpenMobile])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar])

  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<SidebarContextValue>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <SidebarContext value={contextValue}>
      <div data-slot="sidebar-wrapper" {...props} sx={[styles.wrapper, sx]}>
        {children}
      </div>
    </SidebarContext>
  )
}

function Sidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  sx,
  innerSx,
  children,
  dir,
  ...props
}: El & {
  /** Styles the inner panel that holds the sidebar's content. */
  innerSx?: Sx
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar()
  const padded = variant === "floating" || variant === "inset"

  if (collapsible === "none") {
    return (
      <div data-slot="sidebar" {...props} sx={[styles.static, sx]}>
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          dir={dir}
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          side={side}
          showCloseButton={false}
          sx={styles.mobile}
        >
          <SheetHeader sx={visuallyHidden}>
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div sx={[styles.inner, innerSx]}>{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
      sx={[sidebarMarker, styles.root]}
    >
      {/* Reserves the space the fixed panel occupies. */}
      <div
        data-slot="sidebar-gap"
        sx={[
          styles.gap,
          state === "collapsed" &&
            collapsible === "offcanvas" &&
            styles.gapOffcanvas,
          state === "collapsed" &&
            collapsible === "icon" &&
            (padded ? styles.gapIconPadded : styles.gapIcon),
        ]}
      />
      <div
        data-slot="sidebar-container"
        data-side={side}
        {...props}
        sx={[
          styles.container,
          state === "collapsed" &&
            collapsible === "offcanvas" &&
            (side === "left"
              ? styles.containerOffcanvasLeft
              : styles.containerOffcanvasRight),
          padded && styles.containerPadded,
          state === "collapsed" &&
            collapsible === "icon" &&
            (padded ? styles.containerIconPadded : styles.containerIcon),
          !padded &&
            (side === "left"
              ? styles.containerBorderedLeft
              : styles.containerBorderedRight),
          sx,
        ]}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          sx={[
            styles.inner,
            variant === "floating" && styles.innerFloating,
            innerSx,
          ]}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function SidebarTrigger({
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <Icon icon={SidebarLeftIcon} strokeWidth={2} />
      <VisuallyHidden>Toggle Sidebar</VisuallyHidden>
    </Button>
  )
}

function SidebarRail({ sx, ...props }: El<"button">) {
  const { toggleSidebar, state } = useSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      {...props}
      sx={[styles.rail, state === "collapsed" && styles.railOffcanvas, sx]}
    />
  )
}

function SidebarInset({ sx, ...props }: El<"main">) {
  return <main data-slot="sidebar-inset" {...props} sx={[styles.inset, sx]} />
}

function SidebarInput({ sx, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      {...props}
      sx={mergeSx(styles.input, sx)}
    />
  )
}

function SidebarHeader({ sx, ...props }: El) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      {...props}
      sx={[styles.band, sx]}
    />
  )
}

function SidebarFooter({ sx, ...props }: El) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      {...props}
      sx={[styles.band, sx]}
    />
  )
}

function SidebarSeparator({
  sx,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      {...props}
      sx={mergeSx(styles.separator, sx)}
    />
  )
}

function SidebarContent({ sx, ...props }: El) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      {...props}
      sx={[styles.content, sx]}
    />
  )
}

function SidebarGroup({ sx, ...props }: El) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      {...props}
      sx={[styles.group, sx]}
    />
  )
}

function SidebarGroupLabel({
  sx,
  render,
  ...props
}: Omit<useRender.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(stylex.props(styles.groupLabel, sx), props),
    render,
    state: { slot: "sidebar-group-label", sidebar: "group-label" },
  })
}

function SidebarGroupAction({
  sx,
  render,
  ...props
}: Omit<useRender.ComponentProps<"button">, "className"> & { sx?: Sx }) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(stylex.props(styles.groupAction, sx), props),
    render,
    state: { slot: "sidebar-group-action", sidebar: "group-action" },
  })
}

function SidebarGroupContent({ sx, ...props }: El) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      {...props}
      sx={[styles.groupContent, sx]}
    />
  )
}

function SidebarMenu({ sx, ...props }: El<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      {...props}
      sx={[styles.menu, sx]}
    />
  )
}

function SidebarMenuItem({ sx, ...props }: El<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      {...props}
      sx={[menuItemMarker, styles.menuItem, sx]}
    />
  )
}

/** The label inside a menu button, which truncates rather than wrapping. */
function SidebarMenuLabel({ sx, ...props }: El<"span">) {
  return (
    <span
      data-slot="sidebar-menu-label"
      {...props}
      sx={[styles.menuLabel, sx]}
    />
  )
}

function SidebarMenuButton({
  render,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  sx,
  ...props
}: Omit<useRender.ComponentProps<"button">, "className"> &
  VariantProps<typeof sidebarMenuButton> & {
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
    sx?: Sx
  }) {
  const { isMobile, state } = useSidebar()
  const button = useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      stylex.props(
        menuButtonMarker,
        ...sidebarMenuButton({ variant, size }),
        sx
      ),
      props
    ),
    render: !tooltip ? render : <TooltipTrigger render={render} />,
    state: {
      slot: "sidebar-menu-button",
      sidebar: "menu-button",
      size,
      active: isActive,
    },
  })

  if (!tooltip) {
    return button
  }

  const tooltipProps =
    typeof tooltip === "string" ? { children: tooltip } : tooltip

  return (
    <Tooltip>
      {button}
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltipProps}
      />
    </Tooltip>
  )
}

function SidebarMenuAction({
  sx,
  render,
  showOnHover = false,
  ...props
}: Omit<useRender.ComponentProps<"button">, "className"> & {
  showOnHover?: boolean
  sx?: Sx
}) {
  return useRender({
    defaultTagName: "button",
    props: mergeProps<"button">(
      stylex.props(
        menuActionMarker,
        styles.action,
        showOnHover && styles.actionOnHover,
        sx
      ),
      props
    ),
    render,
    state: { slot: "sidebar-menu-action", sidebar: "menu-action" },
  })
}

function SidebarMenuBadge({ sx, ...props }: El) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      {...props}
      sx={[styles.badge, sx]}
    />
  )
}

function SidebarMenuSkeleton({
  sx,
  showIcon = false,
  ...props
}: El & { showIcon?: boolean }) {
  // Varies the placeholder width so a list of them does not look like a grid.
  const [width] = React.useState(
    () => `${Math.floor(Math.random() * 40) + 50}%`
  )

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      {...props}
      sx={[styles.skeletonRow, sx]}
    >
      {showIcon && (
        <Skeleton data-sidebar="menu-skeleton-icon" sx={styles.skeletonIcon} />
      )}
      <Skeleton
        data-sidebar="menu-skeleton-text"
        sx={mergeSx(styles.skeletonText, styles.skeletonWidth(width))}
      />
    </div>
  )
}

function SidebarMenuSub({ sx, ...props }: El<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      {...props}
      sx={[styles.sub, sx]}
    />
  )
}

function SidebarMenuSubItem({ sx, ...props }: El<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      {...props}
      sx={[styles.subItem, sx]}
    />
  )
}

function SidebarMenuSubButton({
  render,
  size = "md",
  isActive = false,
  sx,
  ...props
}: Omit<useRender.ComponentProps<"a">, "className"> & {
  size?: "sm" | "md"
  isActive?: boolean
  sx?: Sx
}) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      stylex.props(styles.subButton, styles.subButtonColor, sx),
      props
    ),
    render,
    state: {
      slot: "sidebar-menu-sub-button",
      sidebar: "menu-sub-button",
      size,
      active: isActive,
    },
  })
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuLabel,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}
