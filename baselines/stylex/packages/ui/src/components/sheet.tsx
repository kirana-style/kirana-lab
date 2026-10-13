import * as stylex from "@stylexjs/stylex"
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

import type { Sx } from "../lib/sx"
import { overlayStyles } from "../recipes/overlay"
import { Button } from "./button"
import { Icon } from "../primitives/icon"
import { VisuallyHidden } from "../primitives/visually-hidden"
import { theme } from "../theme/semantic.stylex"
import { duration, easing } from "../tokens/motion.stylex"
import { blur } from "../tokens/blur.stylex"
import { breakpoint } from "../tokens/breakpoints.stylex"
import { shadow } from "../tokens/shadows.stylex"
import { spacing } from "../tokens/spacing.stylex"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from "../tokens/typography.stylex"
import { zIndex } from "../tokens/z-index.stylex"

const styles = stylex.create({
  overlay: {
    // `transition-opacity duration-150`: a plain transition, so Tailwind's
    // default curve rather than the popup keyframes' `ease`.
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    position: "fixed",
    inset: 0,
    zIndex: zIndex.overlay,
    backgroundColor: "rgb(0 0 0 / 0.1)",
    // Only blurs where the browser can do it cheaply. Nested in the property
    // rather than written as a top-level at-rule, which StyleX treats as an
    // antipattern.
    backdropFilter: {
      default: null,
      "@supports (backdrop-filter: blur(1px))": `blur(${blur.xs})`,
    },
  },

  content: {
    position: "fixed",
    zIndex: zIndex.popover,
    display: "flex",
    flexDirection: "column",
    gap: spacing[4],
    backgroundColor: theme.popover,
    backgroundClip: "padding-box",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.popoverForeground,
    boxShadow: shadow.lg,

    // Which edge the panel is pinned to. Four sides, one declaration each.
    insetInline: {
      default: null,
      '[data-side="top"]': 0,
      '[data-side="bottom"]': 0,
    },
    insetBlock: {
      default: null,
      '[data-side="left"]': 0,
      '[data-side="right"]': 0,
    },
    top: { default: null, '[data-side="top"]': 0 },
    bottom: { default: null, '[data-side="bottom"]': 0 },
    left: { default: null, '[data-side="left"]': 0 },
    right: { default: null, '[data-side="right"]': 0 },
    height: {
      default: null,
      '[data-side="top"]': "auto",
      '[data-side="bottom"]': "auto",
      '[data-side="left"]': "100%",
      '[data-side="right"]': "100%",
    },
    width: {
      default: null,
      '[data-side="left"]': "75%",
      '[data-side="right"]': "75%",
    },
    maxWidth: {
      default: null,
      [breakpoint.sm]: {
        default: null,
        '[data-side="left"]': "24rem",
        '[data-side="right"]': "24rem",
      },
    },
    borderTopWidth: { default: 0, '[data-side="bottom"]': "1px" },
    borderBottomWidth: { default: 0, '[data-side="top"]': "1px" },
    borderInlineStartWidth: { default: 0, '[data-side="right"]': "1px" },
    borderInlineEndWidth: { default: 0, '[data-side="left"]': "1px" },
    borderColor: theme.border,
    borderStyle: "solid",
  },

  close: { position: "absolute", insetInlineEnd: spacing[3], top: spacing[3] },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["0.5"],
    padding: spacing[4],
  },
  footer: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    gap: spacing[2],
    padding: spacing[4],
  },
  title: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.medium,
    color: theme.foreground,
  },
  description: { fontSize: fontSize.sm, color: theme.mutedForeground },
})

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetOverlay({
  sx,
  ...props
}: Omit<SheetPrimitive.Backdrop.Props, "className"> & { sx?: Sx }) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      {...props}
      {...stylex.props(overlayStyles.backdrop, styles.overlay, sx)}
    />
  )
}

function SheetContent({
  sx,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: Omit<SheetPrimitive.Popup.Props, "className"> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
  sx?: Sx
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        {...props}
        {...stylex.props(overlayStyles.panel, styles.content, sx)}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={<Button variant="ghost" size="icon-sm" sx={styles.close} />}
          >
            <Icon icon={Cancel01Icon} strokeWidth={2} />
            <VisuallyHidden>Close</VisuallyHidden>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  )
}

type El = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }

function SheetHeader({ sx, ...props }: El) {
  return <div data-slot="sheet-header" {...props} sx={[styles.header, sx]} />
}

function SheetFooter({ sx, ...props }: El) {
  return <div data-slot="sheet-footer" {...props} sx={[styles.footer, sx]} />
}

function SheetTitle({
  sx,
  ...props
}: Omit<SheetPrimitive.Title.Props, "className"> & { sx?: Sx }) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      {...props}
      {...stylex.props(styles.title, sx)}
    />
  )
}

function SheetDescription({
  sx,
  ...props
}: Omit<SheetPrimitive.Description.Props, "className"> & { sx?: Sx }) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      {...props}
      {...stylex.props(styles.description, sx)}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
