import * as stylex from "@stylexjs/stylex"
import * as ResizablePrimitive from "react-resizable-panels"

import type { Sx } from "../lib/sx"
import { radius, theme } from "../theme/semantic.stylex"
import { spacing } from "../tokens/spacing.stylex"

const styles = stylex.create({
  group: {
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: {
      default: "row",
      '[aria-orientation="vertical"]': "column",
    },
  },

  handle: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.border,
    outlineStyle: "none",
    width: { default: "1px", '[aria-orientation="horizontal"]': "100%" },
    height: { default: null, '[aria-orientation="horizontal"]': "1px" },
    boxShadow: { default: null, ":focus-visible": `0 0 0 1px ${theme.ring}` },

    // A wider invisible strip so the 1px line is actually grabbable. The
    // library sets `aria-orientation` on the handle, so its axis follows the
    // group's direction with no prop.
    "::after": {
      content: "''",
      position: "absolute",
      top: 0,
      bottom: { default: 0, '[aria-orientation="horizontal"]': null },
      left: { default: "50%", '[aria-orientation="horizontal"]': 0 },
      width: { default: spacing[1], '[aria-orientation="horizontal"]': "100%" },
      height: { default: null, '[aria-orientation="horizontal"]': spacing[1] },
      translate: {
        default: "-50% 0",
        '[aria-orientation="horizontal"]': "0 -50%",
      },
    },
  },

  grip: {
    zIndex: 10,
    display: "flex",
    height: spacing[6],
    width: spacing[1],
    flexShrink: 0,
    borderRadius: radius.lg,
    backgroundColor: theme.border,
    // Was `[&[aria-orientation=horizontal]>div]:rotate-90` on the handle.
    rotate: {
      default: null,
      [stylex.when.ancestor('[aria-orientation="horizontal"]')]: "90deg",
    },
  },
})

function ResizablePanelGroup({
  sx,
  ...props
}: Omit<ResizablePrimitive.GroupProps, "className"> & { sx?: Sx }) {
  return (
    <ResizablePrimitive.Group
      data-slot="resizable-panel-group"
      {...props}
      {...stylex.props(styles.group, sx)}
    />
  )
}

function ResizablePanel({ ...props }: ResizablePrimitive.PanelProps) {
  return <ResizablePrimitive.Panel data-slot="resizable-panel" {...props} />
}

function ResizableHandle({
  withHandle,
  sx,
  ...props
}: Omit<ResizablePrimitive.SeparatorProps, "className"> & {
  withHandle?: boolean
  sx?: Sx
}) {
  return (
    <ResizablePrimitive.Separator
      data-slot="resizable-handle"
      {...props}
      {...stylex.props(stylex.defaultMarker(), styles.handle, sx)}
    >
      {withHandle && <div sx={styles.grip} />}
    </ResizablePrimitive.Separator>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
