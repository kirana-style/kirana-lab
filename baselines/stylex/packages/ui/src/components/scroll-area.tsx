import * as stylex from "@stylexjs/stylex"
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"

import type { Sx } from "../lib/sx"
import { alpha, radius, theme } from "../theme/semantic.stylex"
import { duration, easing } from "../tokens/motion.stylex"
import { ring } from "../tokens/ring.stylex"
import { spacing } from "../tokens/spacing.stylex"

const styles = stylex.create({
  root: { position: "relative" },
  viewport: {
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
    outlineStyle: "none",
    transitionProperty: "color, box-shadow",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 ${ring.width} ${alpha.ring50}`,
    },
  },
  scrollbar: {
    display: "flex",
    touchAction: "none",
    padding: "1px",
    userSelect: "none",
    transitionProperty: "background-color, border-color",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    borderColor: "transparent",
    borderStyle: "solid",

    height: {
      default: null,
      '[data-orientation="horizontal"]': spacing["2.5"],
      '[data-orientation="vertical"]': "100%",
    },
    width: { default: null, '[data-orientation="vertical"]': spacing["2.5"] },
    flexDirection: {
      default: null,
      '[data-orientation="horizontal"]': "column",
    },
    borderTopWidth: {
      default: 0,
      '[data-orientation="horizontal"]': "1px",
    },
    borderInlineStartWidth: {
      default: 0,
      '[data-orientation="vertical"]': "1px",
    },
  },
  thumb: {
    position: "relative",
    flex: 1,
    borderRadius: radius.full,
    backgroundColor: theme.border,
  },
})

function ScrollArea({
  sx,
  children,
  ...props
}: Omit<ScrollAreaPrimitive.Root.Props, "className"> & { sx?: Sx }) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      {...props}
      {...stylex.props(styles.root, sx)}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        {...stylex.props(styles.viewport)}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  sx,
  orientation = "vertical",
  ...props
}: Omit<ScrollAreaPrimitive.Scrollbar.Props, "className"> & { sx?: Sx }) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      data-orientation={orientation}
      orientation={orientation}
      {...props}
      {...stylex.props(styles.scrollbar, sx)}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        {...stylex.props(styles.thumb)}
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, ScrollBar }
