import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import {
  Alert02Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  MultiplicationSignCircleIcon,
} from "@hugeicons/core-free-icons"

import type { Sx } from "../lib/sx"
import { mergeSx } from "../lib/sx"
import { Button } from "./button"
import { Spinner } from "./spinner"
import { Icon } from "../primitives/icon"
import { ctx, toastCtx } from "../theme/context.stylex"
import { alpha, radius, theme } from "../theme/semantic.stylex"
import { breakpoint } from "../tokens/breakpoints.stylex"
import { duration, easing } from "../tokens/motion.stylex"
import { ring } from "../tokens/ring.stylex"
import { shadow } from "../tokens/shadows.stylex"
import { spacing } from "../tokens/spacing.stylex"
import { fontSize, fontWeight, lineHeight } from "../tokens/typography.stylex"

/**
 * Toasts stack by transforming each entry against its index, so the transform has
 * to stay one composite string — `translate` and `scale` as separate properties
 * cannot interleave the way this formula needs.
 */
const SWIPE_X = "var(--toast-swipe-movement-x)"
const SWIPE_Y = "var(--toast-swipe-movement-y)"
const INDEX = "var(--toast-index)"
/** Toasts further back in the stack shrink by a tenth each. */
const SCALE = `calc(max(0, 1 - (${INDEX} * 0.1)))`

const STACKED = `translateX(${SWIPE_X}) translateY(calc(${SWIPE_Y} - (${INDEX} * ${toastCtx.peek}) - (${toastCtx.shrink} * ${toastCtx.height}))) scale(${toastCtx.scale})`
const EXPANDED = `translateX(${SWIPE_X}) translateY(${toastCtx.offsetY})`

const styles = stylex.create({
  viewport: {
    pointerEvents: "none",
    position: "fixed",
    insetInline: { default: spacing[4], [breakpoint.sm]: null },
    bottom: spacing[4],
    zIndex: 50,
    marginInline: { default: "auto", [breakpoint.sm]: 0 },
    width: { default: "auto", [breakpoint.sm]: "100%" },
    maxWidth: "24rem",
    outlineStyle: "none",
    insetInlineStart: { default: null, [breakpoint.sm]: "auto" },
    insetInlineEnd: { default: null, [breakpoint.sm]: spacing[4] },
  },

  root: {
    pointerEvents: "auto",
    position: "absolute",
    insetInlineEnd: 0,
    bottom: 0,
    // Later toasts sit behind earlier ones.
    zIndex: `calc(1000 - ${INDEX})`,
    width: "100%",
    transformOrigin: "bottom",
    borderRadius: radius["2xl"],
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    backgroundColor: theme.popover,
    color: theme.popoverForeground,
    boxShadow: shadow.lg,
    willChange: "transform",
    outlineStyle: "none",
    userSelect: "none",

    // The stack's own variables, resolved per toast from its index. They are
    // assigned here rather than as `defineVars` defaults because every formula
    // reads a variable Base UI sets on this element; on `:root` they would be
    // invalid, and an invalid custom property takes the whole transform with it.
    [toastCtx.offsetY]: `calc(var(--toast-offset-y) * -1 + calc(${INDEX} * ${toastCtx.gap} * -1) + ${SWIPE_Y})`,
    [toastCtx.height]: "var(--toast-frontmost-height, var(--toast-height))",
    [toastCtx.scale]: SCALE,
    [toastCtx.shrink]: `calc(1 - ${SCALE})`,

    transitionProperty: "transform, opacity, height",
    transitionDuration: duration[500],
    transitionTimingFunction: easing.emphasized,

    // Bridges the visual gap between stacked toasts so a pointer crossing it
    // does not count as leaving the stack.
    "::after": {
      content: "''",
      position: "absolute",
      insetInlineStart: 0,
      top: "100%",
      height: `calc(${toastCtx.gap} + 1px)`,
      width: "100%",
    },

    height: {
      default: toastCtx.height,
      "[data-expanded]": "var(--toast-height)",
    },
    opacity: { default: 1, "[data-limited]": 0 },
    transform: {
      default: STACKED,
      "[data-expanded]": EXPANDED,
      // Enters from below, and leaves in whichever direction it was swiped.
      "[data-starting-style]": "translateY(150%)",
      "[data-ending-style]": {
        default: "translateY(150%)",
        '[data-swipe-direction="down"]': `translateY(calc(${SWIPE_Y} + 150%))`,
        '[data-swipe-direction="up"]': `translateY(calc(${SWIPE_Y} - 150%))`,
        '[data-swipe-direction="left"]': `translateX(calc(${SWIPE_X} - 150%)) translateY(${toastCtx.offsetY})`,
        '[data-swipe-direction="right"]': `translateX(calc(${SWIPE_X} + 150%)) translateY(${toastCtx.offsetY})`,
      },
    },
  },
  focusRing: {
    borderColor: { default: theme.border, ":focus-visible": theme.ring },
    boxShadow: {
      default: shadow.lg,
      ":focus-visible": `${shadow.lg}, 0 0 0 ${ring.width} ${alpha.ring50}`,
    },
  },

  content: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    gap: spacing[3],
    overflow: "hidden",
    padding: spacing[4],
    transitionProperty: "opacity",
    transitionDuration: duration[300],
    transitionTimingFunction: easing.emphasized,
    opacity: { default: 1, "[data-behind]": 0, "[data-expanded]": 1 },
  },
  body: {
    display: "flex",
    minWidth: 0,
    flex: 1,
    flexDirection: "column",
    gap: spacing[1],
  },
  title: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  },
  description: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  },
  action: { flexShrink: 0 },
  close: {
    position: "relative",
    flexShrink: 0,
    color: { default: theme.mutedForeground, ":hover": theme.foreground },
    "::after": {
      content: "''",
      position: "absolute",
      inset: `calc(${spacing[2]} * -1)`,
    },
  },
  icon: { flexShrink: 0, [ctx.iconSize]: "1rem" },
  iconError: { color: theme.destructive },
})

const toast = ToastPrimitive.createToastManager()

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />
}

function ToastViewport({
  sx,
  ...props
}: Omit<ToastPrimitive.Viewport.Props, "className"> & { sx?: Sx }) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      {...props}
      {...stylex.props(styles.viewport, sx)}
    />
  )
}

function Toast({
  sx,
  ...props
}: Omit<ToastPrimitive.Root.Props, "className"> & { sx?: Sx }) {
  return (
    <ToastPrimitive.Root
      data-slot="toast"
      {...props}
      {...stylex.props(styles.root, styles.focusRing, sx)}
    />
  )
}

function ToastContent({
  sx,
  ...props
}: Omit<ToastPrimitive.Content.Props, "className"> & { sx?: Sx }) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      {...props}
      {...stylex.props(styles.content, sx)}
    />
  )
}

function ToastTitle({
  sx,
  ...props
}: Omit<ToastPrimitive.Title.Props, "className"> & { sx?: Sx }) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      {...props}
      {...stylex.props(styles.title, sx)}
    />
  )
}

function ToastDescription({
  sx,
  ...props
}: Omit<ToastPrimitive.Description.Props, "className"> & { sx?: Sx }) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      {...props}
      {...stylex.props(styles.description, sx)}
    />
  )
}

/**
 * Hands this part's styles to the element it renders as, instead of spreading
 * them on the Base UI part.
 *
 * Base UI merges a part's `className` with its `render` element's by
 * concatenating the strings. Two sets of StyleX atomic classes setting the same
 * property then fight in the cascade, and StyleX's last-wins merge never runs:
 * the close button came out with the Button's colour and position instead of its
 * own. Passing `sx` through lets the Button merge them properly.
 */
function withSx(render: unknown, style: Sx) {
  if (!React.isValidElement<{ sx?: Sx }>(render)) return render as never
  return React.cloneElement(render, { sx: mergeSx(render.props.sx, style) })
}

function ToastAction({
  sx,
  render = <Button variant="outline" size="sm" />,
  ...props
}: Omit<ToastPrimitive.Action.Props, "className"> & { sx?: Sx }) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      render={withSx(render, mergeSx(styles.action, sx))}
      {...props}
    />
  )
}

function ToastClose({
  sx,
  children,
  render = <Button variant="ghost" size="icon-sm" />,
  ...props
}: Omit<ToastPrimitive.Close.Props, "className"> & { sx?: Sx }) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="Close toast"
      render={withSx(render, mergeSx(styles.close, sx))}
      {...props}
    >
      {children ?? <Icon icon={Cancel01Icon} strokeWidth={2} />}
    </ToastPrimitive.Close>
  )
}

const TOAST_ICONS = {
  success: CheckmarkCircle02Icon,
  info: InformationCircleIcon,
  warning: Alert02Icon,
  error: MultiplicationSignCircleIcon,
} as const

function ToastIcon({ type }: { type: string | undefined }) {
  if (type === "loading") {
    return (
      <span data-slot="toast-icon" sx={styles.icon}>
        <Spinner />
      </span>
    )
  }

  const icon = TOAST_ICONS[type as keyof typeof TOAST_ICONS]
  if (!icon) {
    return null
  }

  return (
    <span
      data-slot="toast-icon"
      sx={[styles.icon, type === "error" && styles.iconError]}
    >
      <Icon icon={icon} strokeWidth={2} />
    </span>
  )
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager()

  return toasts.map((toastItem) => (
    <Toast key={toastItem.id} toast={toastItem}>
      <ToastContent>
        <ToastIcon type={toastItem.type} />
        <div sx={styles.body}>
          <ToastTitle />
          <ToastDescription />
        </div>
        <ToastAction />
        <ToastClose />
      </ToastContent>
    </Toast>
  ))
}

function Toaster({
  children,
  toastManager = toast,
  ...props
}: ToastPrimitive.Provider.Props) {
  return (
    <ToastProvider toastManager={toastManager} {...props}>
      {children}
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  )
}

const createToastManager = ToastPrimitive.createToastManager
const useToastManager = ToastPrimitive.useToastManager

export {
  Toaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  toast,
  useToastManager,
}
