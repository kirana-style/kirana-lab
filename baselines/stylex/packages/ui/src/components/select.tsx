import * as stylex from "@stylexjs/stylex"
import { Select as SelectPrimitive } from "@base-ui/react/select"
import {
  ArrowDown01Icon,
  ArrowUp01Icon,
  Tick02Icon,
  UnfoldMoreIcon,
} from "@hugeicons/core-free-icons"

import type { Sx } from "../lib/sx"
import { groupedItem } from "../recipes/button-group"
import { menuItem, menuStyles } from "../recipes/menu"
import { overlayStyles } from "../recipes/overlay"
import { Icon } from "../primitives/icon"
import { ctx, menuCtx } from "../theme/context.stylex"
import { alpha, radius, surface, theme } from "../theme/semantic.stylex"
import { duration, easing } from "../tokens/motion.stylex"
import { ring } from "../tokens/ring.stylex"
import { spacing } from "../tokens/spacing.stylex"
import { fontSize, lineHeight } from "../tokens/typography.stylex"

const CLAMPED_MD_10 = `min(${radius.md}, 10px)`

const styles = stylex.create({
  group: { scrollMarginBlock: spacing[1], padding: spacing[1] },
  value: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    gap: spacing["1.5"],
    textAlign: "start",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  trigger: {
    display: "flex",
    width: "fit-content",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing["1.5"],
    borderWidth: "1px",
    borderStyle: "solid",
    paddingBlock: spacing[2],
    paddingInlineStart: spacing["2.5"],
    paddingInlineEnd: spacing[2],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    whiteSpace: "nowrap",
    outlineStyle: "none",
    userSelect: "none",
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    [ctx.iconSize]: "1rem",

    height: { default: spacing[8], '[data-size="sm"]': spacing[7] },
    borderRadius: { default: radius.lg, '[data-size="sm"]': CLAMPED_MD_10 },
    backgroundColor: {
      default: surface.control,
      ":hover": surface.controlHover,
    },
    borderColor: {
      default: theme.input,
      ":focus-visible": theme.ring,
      '[aria-invalid="true"]': surface.borderInvalid,
    },
    boxShadow: {
      default: null,
      ":focus-visible": `0 0 0 ${ring.width} ${alpha.ring50}`,
      '[aria-invalid="true"]': `0 0 0 ${ring.width} ${surface.ringInvalid}`,
    },
    // Was `data-placeholder:text-muted-foreground`.
    color: { default: null, "[data-placeholder]": theme.mutedForeground },
    cursor: { default: null, ":disabled": "not-allowed" },
    opacity: { default: null, ":disabled": 0.5 },
  },
  triggerIcon: { pointerEvents: "none", color: theme.mutedForeground },

  content: { minWidth: spacing[36], padding: 0 },
  label: {
    paddingInline: spacing["1.5"],
    paddingBlock: spacing[1],
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  },
  item: { width: "100%" },
  itemText: {
    display: "flex",
    flex: 1,
    flexShrink: 0,
    gap: spacing[2],
    whiteSpace: "nowrap",
  },
  indicator: {
    pointerEvents: "none",
    position: "absolute",
    insetInlineEnd: spacing[2],
    display: "flex",
    width: spacing[4],
    height: spacing[4],
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    pointerEvents: "none",
    marginInline: `calc(${spacing[1]} * -1)`,
    marginBlock: spacing[1],
    height: "1px",
    backgroundColor: menuCtx.separator,
  },
  scrollArrow: {
    zIndex: 10,
    display: "flex",
    width: "100%",
    cursor: "default",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.popover,
    paddingBlock: spacing[1],
    [ctx.iconSize]: "1rem",
  },
  scrollUp: { top: 0 },
  scrollDown: { bottom: 0 },
})

const Select = SelectPrimitive.Root

function SelectGroup({
  sx,
  ...props
}: Omit<SelectPrimitive.Group.Props, "className"> & { sx?: Sx }) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      {...props}
      {...stylex.props(styles.group, sx)}
    />
  )
}

function SelectValue({
  sx,
  ...props
}: Omit<SelectPrimitive.Value.Props, "className"> & { sx?: Sx }) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      {...props}
      {...stylex.props(styles.value, sx)}
    />
  )
}

function SelectTrigger({
  sx,
  size = "default",
  children,
  ...props
}: Omit<SelectPrimitive.Trigger.Props, "className"> & {
  size?: "sm" | "default"
  sx?: Sx
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      {...props}
      {...stylex.props(styles.trigger, groupedItem, sx)}
    >
      {children}
      <SelectPrimitive.Icon
        render={
          <Icon icon={UnfoldMoreIcon} strokeWidth={2} sx={styles.triggerIcon} />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  sx,
  children,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: Omit<SelectPrimitive.Popup.Props, "className"> &
  Pick<
    SelectPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset" | "alignItemWithTrigger"
  > & { sx?: Sx }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        {...stylex.props(menuStyles.positioner)}
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          {...props}
          {...stylex.props(
            // When the popup aligns its selected item over the trigger it is
            // already positioned on top of it, so sliding in would look wrong.
            alignItemWithTrigger ? overlayStyles.modal : overlayStyles.popup,
            menuStyles.content,
            menuStyles.glass,
            menuStyles.anchored,
            styles.content,
            sx
          )}
        >
          <SelectScrollUpButton />
          <SelectPrimitive.List>{children}</SelectPrimitive.List>
          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  sx,
  ...props
}: Omit<SelectPrimitive.GroupLabel.Props, "className"> & { sx?: Sx }) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      {...props}
      {...stylex.props(styles.label, sx)}
    />
  )
}

function SelectItem({
  sx,
  children,
  ...props
}: Omit<SelectPrimitive.Item.Props, "className"> & { sx?: Sx }) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      {...props}
      {...stylex.props(
        ...menuItem({ variant: "default" }),
        menuStyles.itemCheckable,
        styles.item,
        sx
      )}
    >
      <SelectPrimitive.ItemText {...stylex.props(styles.itemText)}>
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator render={<span sx={styles.indicator} />}>
        <Icon icon={Tick02Icon} strokeWidth={2} />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  sx,
  ...props
}: Omit<SelectPrimitive.Separator.Props, "className"> & { sx?: Sx }) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      {...props}
      {...stylex.props(styles.separator, sx)}
    />
  )
}

function SelectScrollUpButton({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof SelectPrimitive.ScrollUpArrow>,
  "className"
> & { sx?: Sx }) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="select-scroll-up-button"
      {...props}
      {...stylex.props(styles.scrollArrow, styles.scrollUp, sx)}
    >
      <Icon icon={ArrowUp01Icon} strokeWidth={2} />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof SelectPrimitive.ScrollDownArrow>,
  "className"
> & { sx?: Sx }) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="select-scroll-down-button"
      {...props}
      {...stylex.props(styles.scrollArrow, styles.scrollDown, sx)}
    >
      <Icon icon={ArrowDown01Icon} strokeWidth={2} />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
