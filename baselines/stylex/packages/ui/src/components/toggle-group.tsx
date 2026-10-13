import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"

import type { Sx } from "../lib/sx"
import type { VariantProps } from "../recipes/recipe"
import { toggle } from "../recipes/toggle"
import { radius } from "../theme/semantic.stylex"
import { spacing } from "../tokens/spacing.stylex"

type ToggleVariants = VariantProps<typeof toggle>

const ToggleGroupContext = React.createContext<
  ToggleVariants & {
    spacing?: 0 | 1 | 2
    orientation?: "horizontal" | "vertical"
  }
>({
  size: "default",
  variant: "default",
  spacing: 2,
  orientation: "horizontal",
})

const CLAMPED_MD_10 = `min(${radius.md}, 10px)`

const styles = stylex.create({
  group: {
    display: "flex",
    width: "fit-content",
    alignItems: "center",
    borderRadius: { default: radius.lg, '[data-size="sm"]': CLAMPED_MD_10 },
    // The original passed the gap through an inline `--gap` custom property and
    // read it back with `gap-[--spacing(var(--gap))]`. Three discrete values do
    // not need a variable.
    gap: {
      default: spacing[2],
      '[data-spacing="1"]': spacing[1],
      '[data-spacing="0"]': spacing[0],
    },
    flexDirection: {
      default: "row",
      '[data-orientation="vertical"]': "column",
    },
  },
  groupVertical: { alignItems: "stretch" },

  item: {
    flexShrink: 0,
    // Raising the focused item keeps its ring above the neighbour it overlaps.
    zIndex: { default: null, ":focus": 10, ":focus-visible": 10 },
  },

  /**
   * `spacing={0}`: the items butt together into one segmented control. Chosen
   * from the group context rather than written as `default: null` conditions
   * on every item, because a null default would erase the toggle recipe's own
   * padding and radius in the spaced case.
   */
  joined: {
    borderRadius: 0,
    paddingInlineEnd: {
      default: spacing[2],
      ':has([data-icon="inline-end"])': spacing["1.5"],
    },
    paddingInlineStart: {
      default: spacing[2],
      ':has([data-icon="inline-start"])': spacing["1.5"],
    },
  },
  /** Only the outer corners stay round, and neighbours share one border line. */
  joinedHorizontal: {
    borderStartStartRadius: { default: 0, ":first-child": radius.lg },
    borderEndStartRadius: { default: 0, ":first-child": radius.lg },
    borderStartEndRadius: { default: 0, ":last-child": radius.lg },
    borderEndEndRadius: { default: 0, ":last-child": radius.lg },
  },
  joinedVertical: {
    borderStartStartRadius: { default: 0, ":first-child": radius.lg },
    borderStartEndRadius: { default: 0, ":first-child": radius.lg },
    borderEndStartRadius: { default: 0, ":last-child": radius.lg },
    borderEndEndRadius: { default: 0, ":last-child": radius.lg },
  },
  joinedOutlineHorizontal: {
    borderInlineStartWidth: { default: 0, ":first-child": "1px" },
  },
  joinedOutlineVertical: {
    borderTopWidth: { default: 0, ":first-child": "1px" },
  },
})

function ToggleGroup({
  sx,
  variant,
  size,
  spacing: gap = 2,
  orientation = "horizontal",
  children,
  ...props
}: Omit<ToggleGroupPrimitive.Props, "className"> &
  ToggleVariants & {
    /**
     * The gap between items, on the spacing scale. `0` joins them into a single
     * segmented control.
     */
    spacing?: 0 | 1 | 2
    orientation?: "horizontal" | "vertical"
    sx?: Sx
  }) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={gap}
      data-orientation={orientation}
      // Base UI needs it too, or arrow keys move horizontally in a column.
      orientation={orientation}
      {...props}
      {...stylex.props(
        styles.group,
        orientation === "vertical" && styles.groupVertical,
        sx
      )}
    >
      <ToggleGroupContext value={{ variant, size, spacing: gap, orientation }}>
        {children}
      </ToggleGroupContext>
    </ToggleGroupPrimitive>
  )
}

function ToggleGroupItem({
  sx,
  children,
  variant = "default",
  size = "default",
  ...props
}: Omit<TogglePrimitive.Props, "className"> & ToggleVariants & { sx?: Sx }) {
  const context = React.useContext(ToggleGroupContext)
  const resolvedVariant = context.variant ?? variant
  const resolvedSize = context.size ?? size
  const joined = context.spacing === 0
  const vertical = context.orientation === "vertical"

  return (
    <TogglePrimitive
      data-slot="toggle-group-item"
      data-variant={resolvedVariant}
      data-size={resolvedSize}
      data-spacing={context.spacing}
      {...props}
      {...stylex.props(
        ...toggle({ variant: resolvedVariant, size: resolvedSize }),
        styles.item,
        joined && styles.joined,
        joined && (vertical ? styles.joinedVertical : styles.joinedHorizontal),
        joined &&
          resolvedVariant === "outline" &&
          (vertical
            ? styles.joinedOutlineVertical
            : styles.joinedOutlineHorizontal),
        sx
      )}
    >
      {children}
    </TogglePrimitive>
  )
}

export { ToggleGroup, ToggleGroupItem }
