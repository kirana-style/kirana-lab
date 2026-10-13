import * as stylex from "@stylexjs/stylex"
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"

import type { Sx } from "../lib/sx"
import { overlayStyles } from "../recipes/overlay"
import { Button } from "./button"
import { ctx } from "../theme/context.stylex"
import { alertDialogContentMarker } from "../theme/markers.stylex"
import { alpha, radius, theme } from "../theme/semantic.stylex"
import { blur } from "../tokens/blur.stylex"
import { breakpoint } from "../tokens/breakpoints.stylex"
import { spacing } from "../tokens/spacing.stylex"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from "../tokens/typography.stylex"
import { zIndex } from "../tokens/z-index.stylex"

/**
 * The `default` size relaxes into a left-aligned layout on wider screens, while
 * `sm` stays centred. Both conditions have to be read from the content element,
 * which is what the marker is for.
 */

/**
 * The `default`-size dialog, read from the content element. `when.*` has to be
 * called inline inside `stylex.create`, so this is a plain string the compiler
 * inlines rather than a hoisted selector.
 */
const WIDE_DEFAULT = '[data-size="default"]'

const styles = stylex.create({
  overlay: {
    position: "fixed",
    inset: 0,
    isolation: "isolate",
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
    insetInlineStart: "50%",
    top: "50%",
    zIndex: zIndex.popover,
    display: "grid",
    width: "100%",
    translate: "-50% -50%",
    gap: spacing[4],
    borderRadius: radius.xl,
    backgroundColor: theme.popover,
    padding: spacing[4],
    color: theme.popoverForeground,
    boxShadow: `0 0 0 1px ${alpha.foreground10}`,
    outlineStyle: "none",
    maxWidth: {
      default: "20rem",
      [breakpoint.sm]: { default: "20rem", '[data-size="default"]': "24rem" },
    },
  },

  /**
   * Centred by default, which is how a compact confirmation reads best.
   *
   * The `default` size relaxes into a left-aligned layout once there is width for
   * it. Every condition for a given property is declared together: styles merge
   * per property, so splitting these across two namespaces would let the second
   * one drop the centring along with the conditions it meant to add.
   */
  header: {
    display: "grid",
    gap: spacing["1.5"],
    gridTemplateRows: {
      default: "auto 1fr",
      ':has([data-slot="alert-dialog-media"])': {
        default: "auto auto 1fr",
        [stylex.when.ancestor(WIDE_DEFAULT, alertDialogContentMarker)]: {
          default: "auto auto 1fr",
          [breakpoint.sm]: "auto 1fr",
        },
      },
    },
    columnGap: {
      default: null,
      ':has([data-slot="alert-dialog-media"])': spacing[4],
    },
    placeItems: {
      default: "center",
      [stylex.when.ancestor(WIDE_DEFAULT, alertDialogContentMarker)]: {
        default: "center",
        [breakpoint.sm]: "start",
      },
    },
    textAlign: {
      default: "center",
      [stylex.when.ancestor(WIDE_DEFAULT, alertDialogContentMarker)]: {
        default: "center",
        [breakpoint.sm]: "start",
      },
    },
  },

  footer: {
    marginInline: `calc(${spacing[4]} * -1)`,
    marginBottom: `calc(${spacing[4]} * -1)`,
    display: {
      default: "flex",
      [stylex.when.ancestor('[data-size="sm"]', alertDialogContentMarker)]:
        "grid",
    },
    gridTemplateColumns: {
      default: null,
      [stylex.when.ancestor('[data-size="sm"]', alertDialogContentMarker)]:
        "repeat(2, minmax(0, 1fr))",
    },
    flexDirection: { default: "column-reverse", [breakpoint.sm]: "row" },
    justifyContent: { default: null, [breakpoint.sm]: "flex-end" },
    gap: spacing[2],
    borderEndStartRadius: radius.xl,
    borderEndEndRadius: radius.xl,
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: theme.border,
    backgroundColor: alpha.muted50,
    padding: spacing[4],
  },

  media: {
    marginBottom: spacing[2],
    display: "inline-flex",
    width: spacing[10],
    height: spacing[10],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    backgroundColor: theme.muted,
    [ctx.iconSize]: "1.5rem",
    gridRow: {
      default: null,
      [breakpoint.sm]: {
        default: null,
        [stylex.when.ancestor(
          '[data-size="default"]',
          alertDialogContentMarker
        )]: "span 2",
      },
    },
  },

  title: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.medium,
  },
  description: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    textWrap: { default: "balance", [breakpoint.md]: "pretty" },
    color: theme.mutedForeground,
  },
})

function AlertDialog({ ...props }: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({ ...props }: AlertDialogPrimitive.Trigger.Props) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({ ...props }: AlertDialogPrimitive.Portal.Props) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  sx,
  ...props
}: Omit<AlertDialogPrimitive.Backdrop.Props, "className"> & { sx?: Sx }) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      {...props}
      {...stylex.props(overlayStyles.backdrop, styles.overlay, sx)}
    />
  )
}

function AlertDialogContent({
  sx,
  size = "default",
  ...props
}: Omit<AlertDialogPrimitive.Popup.Props, "className"> & {
  size?: "default" | "sm"
  sx?: Sx
}) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        data-size={size}
        {...props}
        {...stylex.props(
          alertDialogContentMarker,
          overlayStyles.modal,
          styles.content,
          sx
        )}
      />
    </AlertDialogPortal>
  )
}

type El = Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }

function AlertDialogHeader({ sx, ...props }: El) {
  return (
    <div data-slot="alert-dialog-header" {...props} sx={[styles.header, sx]} />
  )
}

function AlertDialogFooter({ sx, ...props }: El) {
  return (
    <div data-slot="alert-dialog-footer" {...props} sx={[styles.footer, sx]} />
  )
}

function AlertDialogMedia({ sx, ...props }: El) {
  return (
    <div data-slot="alert-dialog-media" {...props} sx={[styles.media, sx]} />
  )
}

function AlertDialogTitle({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.Title>,
  "className"
> & { sx?: Sx }) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      {...props}
      {...stylex.props(styles.title, sx)}
    />
  )
}

function AlertDialogDescription({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.Description>,
  "className"
> & { sx?: Sx }) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      {...props}
      {...stylex.props(styles.description, sx)}
    />
  )
}

function AlertDialogAction({ ...props }: React.ComponentProps<typeof Button>) {
  return <Button data-slot="alert-dialog-action" {...props} />
}

function AlertDialogCancel({
  variant = "outline",
  size = "default",
  ...props
}: Omit<AlertDialogPrimitive.Close.Props, "className"> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
