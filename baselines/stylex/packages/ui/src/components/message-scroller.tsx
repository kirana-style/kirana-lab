import * as stylex from "@stylexjs/stylex"
import {
  MessageScroller as MessageScrollerPrimitive,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
} from "@shadcn/react/message-scroller"
import { ArrowDown01Icon } from "@hugeicons/core-free-icons"

import type { Sx } from "../lib/sx"
import { mergeSx } from "../lib/sx"
import { scrollFadeStyles } from "../recipes/scroll-fade"
import { Button } from "./button"
import { Icon } from "../primitives/icon"
import { VisuallyHidden } from "../primitives/visually-hidden"
import { theme } from "../theme/semantic.stylex"
import { duration, easing } from "../tokens/motion.stylex"
import { spacing } from "../tokens/spacing.stylex"

const styles = stylex.create({
  root: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%",
    minHeight: 0,
    flexDirection: "column",
    overflow: "hidden",
  },

  viewport: {
    width: "100%",
    height: "100%",
    minHeight: 0,
    minWidth: 0,
    overflowY: "auto",
    overscrollBehavior: "contain",
    contain: "content",
    scrollbarWidth: "thin",
    scrollbarGutter: "stable",
    // The scrollbar would flicker while the view is animating itself to the end.
    scrollbarColor: {
      default: null,
      "[data-autoscrolling]": "transparent transparent",
    },
    // Hidden until the first scroll position is resolved, so the list never
    // appears at the top and then jumps to the bottom.
    visibility: { default: null, "[data-pending-scroll]": "hidden" },
  },

  content: {
    display: "flex",
    height: "max-content",
    minHeight: "100%",
    flexDirection: "column",
    gap: spacing[6],
  },

  item: {
    minWidth: 0,
    flexShrink: 0,
    // Lets the browser skip laying out messages that are far off screen.
    contentVisibility: "auto",
    containIntrinsicSize: "auto 10rem",
  },

  button: {
    position: "absolute",
    insetInlineStart: "50%",
    borderColor: theme.border,
    backgroundColor: { default: theme.background, ":hover": theme.muted },
    color: { default: theme.foreground, ":hover": theme.foreground },
    transitionProperty: "translate, scale, opacity",

    // Slides away into the edge it points at, rather than just fading.
    translate: {
      default: "-50% 0",
      '[data-active="false"]': {
        default: "-50% 0",
        '[data-direction="end"]': "-50% 100%",
        '[data-direction="start"]': "-50% -100%",
      },
    },
    scale: { default: 1, '[data-active="false"]': 0.95 },
    opacity: { default: 1, '[data-active="false"]': 0 },
    pointerEvents: { default: null, '[data-active="false"]': "none" },
    // Leaving takes longer than arriving, on a sharper curve.
    transitionDuration: {
      default: duration[200],
      '[data-active="false"]': duration[450],
    },
    transitionTimingFunction: {
      default: easing.emphasized,
      '[data-active="false"]': "cubic-bezier(0.7, 0, 0.84, 0)",
    },

    bottom: { default: null, '[data-direction="end"]': spacing[4] },
    top: { default: null, '[data-direction="start"]': spacing[4] },
  },
  /** The same chevron, pointed the other way. */
  iconUp: { rotate: "180deg" },
})

function MessageScrollerProvider(
  props: React.ComponentProps<typeof MessageScrollerPrimitive.Provider>
) {
  return <MessageScrollerPrimitive.Provider {...props} />
}

function MessageScroller({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof MessageScrollerPrimitive.Root>,
  "className"
> & { sx?: Sx }) {
  return (
    <MessageScrollerPrimitive.Root
      data-slot="message-scroller"
      {...props}
      {...stylex.props(styles.root, sx)}
    />
  )
}

function MessageScrollerViewport({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof MessageScrollerPrimitive.Viewport>,
  "className"
> & { sx?: Sx }) {
  return (
    <MessageScrollerPrimitive.Viewport
      data-slot="message-scroller-viewport"
      {...props}
      {...stylex.props(styles.viewport, scrollFadeStyles.bottom, sx)}
    />
  )
}

function MessageScrollerContent({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof MessageScrollerPrimitive.Content>,
  "className"
> & { sx?: Sx }) {
  return (
    <MessageScrollerPrimitive.Content
      data-slot="message-scroller-content"
      {...props}
      {...stylex.props(styles.content, sx)}
    />
  )
}

function MessageScrollerItem({
  sx,
  scrollAnchor = false,
  ...props
}: Omit<
  React.ComponentProps<typeof MessageScrollerPrimitive.Item>,
  "className"
> & { sx?: Sx }) {
  return (
    <MessageScrollerPrimitive.Item
      data-slot="message-scroller-item"
      scrollAnchor={scrollAnchor}
      {...props}
      {...stylex.props(styles.item, sx)}
    />
  )
}

function MessageScrollerButton({
  direction = "end",
  sx,
  children,
  render,
  variant = "secondary",
  size = "icon-sm",
  ...props
}: Omit<
  React.ComponentProps<typeof MessageScrollerPrimitive.Button>,
  "className"
> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size"> & { sx?: Sx }) {
  return (
    <MessageScrollerPrimitive.Button
      data-slot="message-scroller-button"
      data-direction={direction}
      data-variant={variant}
      data-size={size}
      direction={direction}
      render={
        render ?? (
          <Button
            variant={variant}
            size={size}
            sx={mergeSx(styles.button, sx)}
          />
        )
      }
      {...props}
    >
      {children ?? (
        <>
          <Icon
            icon={ArrowDown01Icon}
            sx={direction === "start" ? styles.iconUp : null}
          />
          <VisuallyHidden>
            {direction === "end" ? "Scroll to end" : "Scroll to start"}
          </VisuallyHidden>
        </>
      )}
    </MessageScrollerPrimitive.Button>
  )
}

export {
  MessageScrollerProvider,
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
  useMessageScroller,
  useMessageScrollerScrollable,
  useMessageScrollerVisibility,
}
