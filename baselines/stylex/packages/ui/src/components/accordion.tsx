import * as stylex from "@stylexjs/stylex"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons"

import type { Sx } from "../lib/sx"
import { Icon } from "../primitives/icon"
import { accordionItemMarker } from "../theme/markers.stylex"
import { alpha, radius, theme } from "../theme/semantic.stylex"
import { duration, easing } from "../tokens/motion.stylex"
import { ring } from "../tokens/ring.stylex"
import { spacing } from "../tokens/spacing.stylex"
import { fontSize, fontWeight, lineHeight } from "../tokens/typography.stylex"

/**
 * The open/close motion, as keyframes rather than a transition.
 *
 * Base UI publishes the measured height as `--accordion-panel-height`, but it
 * puts `data-starting-style` on the panel itself, not on the inner box that
 * carries the height — so a transition has nothing to move between. The original
 * had the same problem and solved it the same way, with `animate-accordion-down`
 * from `tw-animate-css`: 200ms, `ease-out`.
 */
const accordionDown = stylex.keyframes({
  from: { height: 0 },
  to: { height: "var(--accordion-panel-height, auto)" },
})

const accordionUp = stylex.keyframes({
  from: { height: "var(--accordion-panel-height, auto)" },
  to: { height: 0 },
})

const styles = stylex.create({
  root: { display: "flex", width: "100%", flexDirection: "column" },

  item: {
    // Was `not-last:border-b`: every row but the last draws a divider.
    borderBottomWidth: { default: "1px", ":last-child": 0 },
    borderBottomStyle: "solid",
    borderBottomColor: theme.border,
  },

  header: { display: "flex" },
  trigger: {
    position: "relative",
    display: "flex",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderStyle: "solid",
    paddingBlock: spacing["2.5"],
    textAlign: "left",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    outlineStyle: "none",
    transitionProperty: "color, border-color, box-shadow",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    textDecorationLine: { default: "none", ":hover": "underline" },
    borderColor: { default: "transparent", ":focus-visible": theme.ring },
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 ${ring.width} ${alpha.ring50}`,
    },
    pointerEvents: { default: null, '[aria-disabled="true"]': "none" },
    opacity: { default: null, '[aria-disabled="true"]': 0.5 },
  },
  /**
   * Two chevrons, one shown per state. Was a pair of
   * `group-aria-expanded/accordion-trigger:` rules reading the trigger from the
   * icon; now the trigger is the marked ancestor and each icon reads it.
   */
  chevron: {
    marginInlineStart: "auto",
    flexShrink: 0,
    pointerEvents: "none",
    color: theme.mutedForeground,
  },
  chevronCollapsed: {
    display: {
      default: "inline",
      [stylex.when.ancestor('[aria-expanded="true"]', accordionItemMarker)]:
        "none",
    },
  },
  chevronExpanded: {
    display: {
      default: "none",
      [stylex.when.ancestor('[aria-expanded="true"]', accordionItemMarker)]:
        "inline",
    },
  },

  panel: {
    // Read by the link rule in globals.css.
    "--inline-link-hover": theme.foreground,
    overflow: "hidden",
    fontSize: fontSize.sm,
    animationName: {
      default: null,
      "[data-open]": accordionDown,
      "[data-closed]": accordionUp,
    },
    animationDuration: duration[200],
    animationTimingFunction: easing.cssOut,
  },
  /** The inner box holds the measured height the keyframes animate towards. */
  panelInner: {
    height: "var(--accordion-panel-height)",
    paddingTop: 0,
    paddingBottom: spacing["2.5"],
  },
})

function Accordion({
  sx,
  ...props
}: Omit<AccordionPrimitive.Root.Props, "className"> & { sx?: Sx }) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      {...props}
      {...stylex.props(styles.root, sx)}
    />
  )
}

function AccordionItem({
  sx,
  ...props
}: Omit<AccordionPrimitive.Item.Props, "className"> & { sx?: Sx }) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      {...props}
      {...stylex.props(styles.item, sx)}
    />
  )
}

function AccordionTrigger({
  sx,
  children,
  ...props
}: Omit<AccordionPrimitive.Trigger.Props, "className"> & { sx?: Sx }) {
  return (
    <AccordionPrimitive.Header {...stylex.props(styles.header)}>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        {...props}
        {...stylex.props(accordionItemMarker, styles.trigger, sx)}
      >
        {children}
        <Icon
          icon={ArrowDown01Icon}
          data-slot="accordion-trigger-icon"
          sx={[styles.chevron, styles.chevronCollapsed]}
        />
        <Icon
          icon={ArrowUp01Icon}
          data-slot="accordion-trigger-icon"
          sx={[styles.chevron, styles.chevronExpanded]}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  sx,
  children,
  ...props
}: Omit<AccordionPrimitive.Panel.Props, "className"> & { sx?: Sx }) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      {...props}
      {...stylex.props(styles.panel)}
    >
      <div sx={[styles.panelInner, sx]}>{children}</div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
