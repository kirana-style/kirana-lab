import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { DayPicker, getDefaultClassNames } from "react-day-picker"
import type { DayButton, Locale } from "react-day-picker"
import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"

import type { Sx } from "../lib/sx"
import { mergeSx } from "../lib/sx"
import { button, buttonRing } from "../recipes/button"
import { Button } from "./button"
import { Icon } from "../primitives/icon"
import { calendarCtx, ctx } from "../theme/context.stylex"
import {
  calendarDayMarker,
  cardMarker,
  popoverContentMarker,
} from "../theme/markers.stylex"
import { alpha, radius, theme } from "../theme/semantic.stylex"
import { breakpoint } from "../tokens/breakpoints.stylex"
import { ring } from "../tokens/ring.stylex"
import { spacing } from "../tokens/spacing.stylex"
import { fontSize, fontWeight, lineHeight } from "../tokens/typography.stylex"

/**
 * react-day-picker is configured with a map of *class name strings*, not style
 * objects, so every style here is turned into a class with
 * `stylex.props(...).className`. The styles themselves are ordinary StyleX.
 *
 * A day cell carries a marker so the button inside it can react to the cell's
 * state — the `group/day` relationship in the original. Cell size and corner
 * radius stay variables because the whole grid has to agree on them.
 */
/** Selected ranges round only at the ends of a week row. */
/** Inside a card or popover the calendar drops its own background. */

const styles = stylex.create({
  root: {
    backgroundColor: {
      default: theme.background,
      [stylex.when.ancestor('[data-slot="card"]', cardMarker)]: "transparent",
      [stylex.when.ancestor("[data-slot]", popoverContentMarker)]:
        "transparent",
    },
    padding: spacing[2],
    [calendarCtx.cellSize]: spacing[7],
    [calendarCtx.cellRadius]: radius.md,
  },
  rootWidth: { width: "fit-content" },
  months: {
    position: "relative",
    display: "flex",
    flexDirection: { default: "column", [breakpoint.md]: "row" },
    gap: spacing[4],
  },
  month: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    gap: spacing[4],
  },
  nav: {
    position: "absolute",
    insetInline: 0,
    top: 0,
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing[1],
  },
  navButton: {
    width: calendarCtx.cellSize,
    height: calendarCtx.cellSize,
    // Longhands, not `padding: 0`: Button sets `paddingInline` plus
    // conditional `paddingInlineStart`/`End`, and a shorthand never beats a
    // longhand in StyleX, whatever order the styles are merged in.
    paddingTop: 0,
    paddingBottom: 0,
    paddingInlineStart: 0,
    paddingInlineEnd: 0,
    userSelect: "none",
    opacity: { default: null, '[aria-disabled="true"]': 0.5 },
  },
  monthCaption: {
    display: "flex",
    height: calendarCtx.cellSize,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // Keeps the label clear of the two nav buttons sitting over it.
    paddingInline: calendarCtx.cellSize,
  },
  dropdowns: {
    display: "flex",
    height: calendarCtx.cellSize,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing["1.5"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  },
  dropdownRoot: { position: "relative", borderRadius: calendarCtx.cellRadius },
  /** The real select, invisible over the styled label. */
  dropdown: {
    position: "absolute",
    inset: 0,
    backgroundColor: theme.popover,
    opacity: 0,
  },
  captionLabel: {
    fontWeight: fontWeight.medium,
    userSelect: "none",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
  captionLabelDropdown: {
    display: "flex",
    alignItems: "center",
    gap: spacing[1],
    borderRadius: calendarCtx.cellRadius,
    [ctx.iconSize]: "0.875rem",
  },
  /** The dropdown caret: the label's text keeps its colour, the caret mutes. */
  caret: { color: theme.mutedForeground },
  monthGrid: { width: "100%", borderCollapse: "collapse" },
  weekdays: { display: "flex" },
  weekday: {
    flex: 1,
    borderRadius: calendarCtx.cellRadius,
    fontSize: "0.8rem",
    fontWeight: fontWeight.normal,
    color: theme.mutedForeground,
    userSelect: "none",
  },
  week: { marginTop: spacing[2], display: "flex", width: "100%" },
  weekNumberHeader: { width: calendarCtx.cellSize, userSelect: "none" },
  weekNumber: {
    fontSize: "0.8rem",
    color: theme.mutedForeground,
    userSelect: "none",
  },
  weekNumberCell: {
    display: "flex",
    width: calendarCtx.cellSize,
    height: calendarCtx.cellSize,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },

  day: {
    position: "relative",
    aspectRatio: "1 / 1",
    height: "100%",
    width: "100%",
    borderRadius: calendarCtx.cellRadius,
    padding: 0,
    textAlign: "center",
    userSelect: "none",
  },
  /** A range's ends round outward and bleed into the neighbouring cell. */
  rangeStart: {
    position: "relative",
    isolation: "isolate",
    zIndex: 0,
    borderStartStartRadius: calendarCtx.cellRadius,
    borderEndStartRadius: calendarCtx.cellRadius,
    backgroundColor: theme.muted,
    "::after": {
      content: "''",
      position: "absolute",
      insetBlock: 0,
      insetInlineEnd: 0,
      width: spacing[4],
      backgroundColor: theme.muted,
    },
  },
  rangeMiddle: { borderRadius: 0 },
  rangeEnd: {
    position: "relative",
    isolation: "isolate",
    zIndex: 0,
    borderStartEndRadius: calendarCtx.cellRadius,
    borderEndEndRadius: calendarCtx.cellRadius,
    backgroundColor: theme.muted,
    "::after": {
      content: "''",
      position: "absolute",
      insetBlock: 0,
      insetInlineStart: 0,
      width: spacing[4],
      backgroundColor: theme.muted,
    },
  },
  today: {
    borderRadius: {
      default: calendarCtx.cellRadius,
      '[data-selected="true"]': 0,
    },
    backgroundColor: theme.muted,
    color: theme.foreground,
  },
  outside: { color: theme.mutedForeground },
  disabled: { color: theme.mutedForeground, opacity: 0.5 },
  hidden: { visibility: "hidden" },

  dayButton: {
    position: "relative",
    isolation: "isolate",
    zIndex: 10,
    display: "flex",
    aspectRatio: "1 / 1",
    width: "100%",
    height: "auto",
    minWidth: calendarCtx.cellSize,
    flexDirection: "column",
    gap: spacing[1],
    borderWidth: 0,
    lineHeight: 1,
    fontWeight: fontWeight.normal,

    // The focus ring is owned by the cell, which is what knows it has focus.
    borderColor: {
      default: null,
      [stylex.when.ancestor('[data-focused="true"]', calendarDayMarker)]:
        theme.ring,
    },
    boxShadow: {
      default: null,
      [stylex.when.ancestor('[data-focused="true"]', calendarDayMarker)]:
        `0 0 0 ${ring.width} ${alpha.ring50}`,
    },

    backgroundColor: {
      default: null,
      '[data-selected-single="true"]': theme.primary,
      '[data-range-start="true"]': theme.primary,
      '[data-range-end="true"]': theme.primary,
      '[data-range-middle="true"]': theme.muted,
    },
    color: {
      default: null,
      '[data-selected-single="true"]': theme.primaryForeground,
      '[data-range-start="true"]': theme.primaryForeground,
      '[data-range-end="true"]': theme.primaryForeground,
      '[data-range-middle="true"]': theme.foreground,
    },
    /**
     * `default` restates the Button's own `rounded-lg`. A `null` here would not
     * mean "leave the Button's radius alone": this namespace owns
     * `borderRadius` once merged after the recipe, and `null` removes it, which
     * squared every day in the grid.
     */
    borderRadius: {
      default: radius.lg,
      '[data-range-middle="true"]': 0,
      '[data-range-start="true"]': calendarCtx.cellRadius,
      '[data-range-end="true"]': calendarCtx.cellRadius,
    },
    // Rounds the outer edges of a selected run where a week row starts or ends.
    // Repeated inside `[data-range-middle]`: StyleX ranks that attribute on the
    // `borderRadius` shorthand above these longhand ancestor queries.
    borderStartStartRadius: {
      default: null,
      [stylex.when.ancestor(
        ':first-child[data-selected="true"]',
        calendarDayMarker
      )]: calendarCtx.cellRadius,
      '[data-range-middle="true"]': {
        default: 0,
        [stylex.when.ancestor(
          ':first-child[data-selected="true"]',
          calendarDayMarker
        )]: calendarCtx.cellRadius,
      },
    },
    borderEndStartRadius: {
      default: null,
      [stylex.when.ancestor(
        ':first-child[data-selected="true"]',
        calendarDayMarker
      )]: calendarCtx.cellRadius,
      '[data-range-middle="true"]': {
        default: 0,
        [stylex.when.ancestor(
          ':first-child[data-selected="true"]',
          calendarDayMarker
        )]: calendarCtx.cellRadius,
      },
    },
    borderStartEndRadius: {
      default: null,
      [stylex.when.ancestor(
        ':last-child[data-selected="true"]',
        calendarDayMarker
      )]: calendarCtx.cellRadius,
      '[data-range-middle="true"]': {
        default: 0,
        [stylex.when.ancestor(
          ':last-child[data-selected="true"]',
          calendarDayMarker
        )]: calendarCtx.cellRadius,
      },
    },
    borderEndEndRadius: {
      default: null,
      [stylex.when.ancestor(
        ':last-child[data-selected="true"]',
        calendarDayMarker
      )]: calendarCtx.cellRadius,
      '[data-range-middle="true"]': {
        default: 0,
        [stylex.when.ancestor(
          ':last-child[data-selected="true"]',
          calendarDayMarker
        )]: calendarCtx.cellRadius,
      },
    },
  },
})

/**
 * Turns a set of StyleX styles into the class string react-day-picker wants.
 *
 * Safe here because every style in this file is static: `stylex.props` only also
 * returns a `style` object for dynamic styles, and there are none.
 */
function cls(...values: Sx[]) {
  return stylex.props(values).className ?? ""
}

/** The styles `modifiersSx` names for whichever modifiers a day carries. */
function modifierStyles(
  modifiersSx: Record<string, { day?: Sx; button?: Sx }> | undefined,
  modifiers: Record<string, boolean>,
  part: "day" | "button"
): Sx[] {
  if (!modifiersSx) return []
  return Object.entries(modifiersSx)
    .filter(([name]) => modifiers[name])
    .map(([, value]) => value[part] ?? null)
}

function Calendar({
  sx,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  modifiersSx,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
  sx?: Sx
  /**
   * Styles for days carrying a modifier, keyed by its name: the cell as `day`,
   * its button as `button`. Replaces `modifiersClassNames`, whose class strings
   * would race the calendar's own styles in stylesheet order.
   */
  modifiersSx?: Record<string, { day?: Sx; button?: Sx }>
}) {
  const defaults = getDefaultClassNames()
  const navButtonClass = cls(
    buttonRing,
    ...button({ variant: buttonVariant }),
    styles.navButton
  )

  const dayPickerProps = {
    showOutsideDays,
    // One class string for the root, so a caller's width replaces `fit-content`
    // instead of racing it in stylesheet order.
    className: cls(styles.root, styles.rootWidth, sx),
    captionLayout,
    locale,
    formatters: {
      formatMonthDropdown: (date: Date) =>
        date.toLocaleString(locale?.code, { month: "short" }),
      ...formatters,
    },
    classNames: {
      root: defaults.root,
      months: `${cls(styles.months)} ${defaults.months}`,
      month: `${cls(styles.month)} ${defaults.month}`,
      nav: `${cls(styles.nav)} ${defaults.nav}`,
      button_previous: `${navButtonClass} ${defaults.button_previous}`,
      button_next: `${navButtonClass} ${defaults.button_next}`,
      month_caption: `${cls(styles.monthCaption)} ${defaults.month_caption}`,
      dropdowns: `${cls(styles.dropdowns)} ${defaults.dropdowns}`,
      dropdown_root: `${cls(styles.dropdownRoot)} ${defaults.dropdown_root}`,
      dropdown: `${cls(styles.dropdown)} ${defaults.dropdown}`,
      caption_label: `${cls(
        styles.captionLabel,
        captionLayout !== "label" && styles.captionLabelDropdown
      )} ${defaults.caption_label}`,
      month_grid: `${cls(styles.monthGrid)} ${defaults.month_grid}`,
      weekdays: `${cls(styles.weekdays)} ${defaults.weekdays}`,
      weekday: `${cls(styles.weekday)} ${defaults.weekday}`,
      week: `${cls(styles.week)} ${defaults.week}`,
      week_number_header: `${cls(styles.weekNumberHeader)} ${defaults.week_number_header}`,
      week_number: `${cls(styles.weekNumber)} ${defaults.week_number}`,
      // The day cell's own styles are merged in the Day component below, where
      // the modifiers are known. As separate class strings they would all set
      // `borderRadius`, and which one won would depend on stylesheet order.
      ...classNames,
    },
    components: {
      Root: ({ className, rootRef, ...rootProps }) => (
        <div
          data-slot="calendar"
          ref={rootRef}
          className={className}
          {...rootProps}
        />
      ),
      Chevron: ({ orientation }) => {
        // Left and right chevrons mirror with writing direction; the dropdown
        // caret always points down.
        if (orientation === "left") {
          return <Icon icon={ArrowLeft01Icon} size="1rem" />
        }

        if (orientation === "right") {
          return <Icon icon={ArrowRight01Icon} size="1rem" />
        }

        return <Icon icon={ArrowDown01Icon} sx={styles.caret} />
      },
      Day: ({ day: _day, modifiers, className, ...dayProps }) => (
        <td
          {...dayProps}
          className={`${className ?? ""} ${cls(
            // The marker is what lets each day button read its own cell's state.
            calendarDayMarker,
            styles.day,
            modifiers.today && styles.today,
            modifiers.outside && styles.outside,
            modifiers.disabled && styles.disabled,
            modifiers.hidden && styles.hidden,
            modifiers.range_start && styles.rangeStart,
            modifiers.range_middle && styles.rangeMiddle,
            modifiers.range_end && styles.rangeEnd,
            ...modifierStyles(modifiersSx, modifiers, "day")
          )}`}
        />
      ),
      DayButton: (dayProps) => (
        <CalendarDayButton
          locale={locale}
          {...dayProps}
          sx={mergeSx(
            ...modifierStyles(modifiersSx, dayProps.modifiers, "button")
          )}
        />
      ),
      WeekNumber: ({ children, ...weekProps }) => (
        <td {...weekProps}>
          <div sx={styles.weekNumberCell}>{children}</div>
        </td>
      ),
      ...components,
    },
    ...props,
  } as React.ComponentProps<typeof DayPicker>

  return <DayPicker {...dayPickerProps} />
}

function CalendarDayButton({
  sx,
  day,
  modifiers,
  locale,
  ...props
}: Omit<React.ComponentProps<typeof DayButton>, "className"> & {
  locale?: Partial<Locale>
  sx?: Sx
}) {
  const ref = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      {...props}
      sx={mergeSx(styles.dayButton, sx)}
    />
  )
}

export { Calendar, CalendarDayButton }
