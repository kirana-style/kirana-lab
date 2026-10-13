import * as stylex from "@stylexjs/stylex"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

import type { Sx } from "../lib/sx"
import { overlayStyles } from "../recipes/overlay"
import { ctx } from "../theme/context.stylex"
import { tooltipContentMarker } from "../theme/markers.stylex"
import { radius, theme } from "../theme/semantic.stylex"
import { duration } from "../tokens/motion.stylex"
import { spacing } from "../tokens/spacing.stylex"
import { fontSize, lineHeight } from "../tokens/typography.stylex"
import { zIndex } from "../tokens/z-index.stylex"

/** A tooltip containing a keyboard shortcut tightens its trailing padding. */

const styles = stylex.create({
  positioner: { isolation: "isolate", zIndex: zIndex.popover },
  content: {
    // `animate-in` without a duration class: tw-animate-css's 150ms default.
    transitionDuration: duration[150],
    zIndex: zIndex.popover,
    display: "inline-flex",
    width: "fit-content",
    maxWidth: "20rem",
    alignItems: "center",
    gap: spacing["1.5"],
    borderRadius: radius.md,
    // Inverted against the page, which is why Kbd flips its colours in here.
    backgroundColor: theme.foreground,
    color: theme.background,
    paddingInline: spacing[3],
    paddingInlineEnd: {
      default: spacing[3],
      ':has([data-slot="kbd"])': spacing["1.5"],
    },
    paddingBlock: spacing["1.5"],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    [ctx.iconSize]: "0.875rem",
  },
  arrow: {
    zIndex: zIndex.popover,
    width: spacing["2.5"],
    height: spacing["2.5"],
    rotate: "45deg",
    borderRadius: "2px",
    backgroundColor: theme.foreground,
    fill: theme.foreground,

    top: {
      default: null,
      '[data-side="bottom"]': spacing[1],
      '[data-side="left"]': "50%",
      '[data-side="right"]': "50%",
      '[data-side="inline-start"]': "50%",
      '[data-side="inline-end"]': "50%",
    },
    bottom: {
      default: null,
      '[data-side="top"]': `calc(${spacing["2.5"]} * -1)`,
    },
    insetInlineStart: {
      default: null,
      '[data-side="inline-end"]': `calc(${spacing[1]} * -1)`,
    },
    insetInlineEnd: {
      default: null,
      '[data-side="inline-start"]': `calc(${spacing[1]} * -1)`,
    },
    left: { default: null, '[data-side="right"]': `calc(${spacing[1]} * -1)` },
    right: { default: null, '[data-side="left"]': `calc(${spacing[1]} * -1)` },
    translate: {
      default: "0 calc(-50% - 2px)",
      '[data-side="left"]': "0 -50%",
      '[data-side="right"]': "0 -50%",
      '[data-side="inline-start"]': "0 -50%",
      '[data-side="inline-end"]': "0 -50%",
    },
  },
})

function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  sx,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: Omit<TooltipPrimitive.Popup.Props, "className"> &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & { sx?: Sx }) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        {...stylex.props(styles.positioner)}
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          {...props}
          {...stylex.props(
            tooltipContentMarker,
            overlayStyles.popup,
            styles.content,
            sx
          )}
        >
          {children}
          <TooltipPrimitive.Arrow {...stylex.props(styles.arrow)} />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
