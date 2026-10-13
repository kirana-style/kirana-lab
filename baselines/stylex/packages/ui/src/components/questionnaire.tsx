import * as stylex from "@stylexjs/stylex"
import { Questionnaire as QuestionnairePrimitive } from "@shadcn/react/questionnaire"
import { Tick02Icon } from "@hugeicons/core-free-icons"

import type { Sx } from "../lib/sx"
import { button, buttonRing } from "../recipes/button"
import { controlStyles } from "../recipes/control"
import type { Button } from "./button"
import { Icon } from "../primitives/icon"
import { questionnaireOptionMarker } from "../theme/markers.stylex"
import { alpha, radius, surface, theme } from "../theme/semantic.stylex"
import { breakpoint } from "../tokens/breakpoints.stylex"
import { duration, easing } from "../tokens/motion.stylex"
import { ring } from "../tokens/ring.stylex"
import { spacing } from "../tokens/spacing.stylex"
import {
  fontFamily,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
} from "../tokens/typography.stylex"

/** The choice's parts read its state from the choice itself. */

/** Nudges the indicator onto the text's optical baseline. */
const BASELINE_NUDGE = "0.1125rem"

const styles = stylex.create({
  root: {
    display: "flex",
    width: "100%",
    minWidth: 0,
    flexDirection: "column",
    gap: spacing[4],
  },
  progress: {
    minHeight: "1lh",
    width: "fit-content",
    minWidth: "14ch",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
    fontVariantNumeric: "tabular-nums",
  },
  item: {
    display: "flex",
    width: "100%",
    minWidth: 0,
    flexDirection: "column",
  },
  title: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.base,
    lineHeight: leading.snug,
    fontWeight: fontWeight.medium,
    textWrap: "pretty",
    // Only spaced away from the choices when no description follows it.
    marginBottom: {
      default: spacing[4],
      ':has(~ [data-slot="questionnaire-description"])': 0,
    },
  },
  description: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    textWrap: "pretty",
    color: theme.mutedForeground,
  },
  choices: {
    display: "flex",
    width: "100%",
    minWidth: 0,
    flexDirection: "column",
    gap: spacing[2],
  },

  choice: {
    position: "relative",
    display: "flex",
    minHeight: spacing[11],
    cursor: "pointer",
    alignItems: "flex-start",
    gap: spacing["2.5"],
    borderRadius: radius.lg,
    borderWidth: "1px",
    borderStyle: "solid",
    paddingInline: spacing[3],
    paddingBlock: spacing["2.5"],
    textAlign: "start",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    outlineStyle: "none",
    userSelect: "none",
    transitionProperty: "color, background-color, border-color, box-shadow",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,

    backgroundColor: {
      default: surface.choice,
      ":hover": alpha.muted50,
      "[data-checked]": theme.muted,
    },
    borderColor: {
      default: theme.input,
      ":has(> input:focus-visible)": theme.ring,
      "[data-invalid]": surface.borderInvalid,
      "[data-checked]": alpha.primary40,
    },
    boxShadow: {
      default: null,
      ":has(> input:focus-visible)": `0 0 0 ${ring.width} ${alpha.ring50}`,
    },
    pointerEvents: { default: null, "[data-disabled]": "none" },
    opacity: { default: null, "[data-disabled]": 0.5 },
  },
  /** The real control, covering the card so the whole card is the hit target. */
  choiceInput: {
    position: "absolute",
    inset: 0,
    zIndex: 10,
    width: "100%",
    height: "100%",
    cursor: "pointer",
    opacity: 0,
  },
  indicator: {
    pointerEvents: "none",
    position: "relative",
    display: "flex",
    width: spacing[4],
    height: spacing[4],
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: "1px",
    borderStyle: "solid",
    // A radio is round, a checkbox is a rounded square.
    borderRadius: {
      default: "4px",
      [stylex.when.ancestor('[data-type="radio"]', questionnaireOptionMarker)]:
        "calc(infinity * 1px)",
    },
    translate: {
      default: `0 ${BASELINE_NUDGE}`,
      [stylex.when.ancestor(
        ':has([data-slot="questionnaire-choice-description"])',
        questionnaireOptionMarker
      )]: `0 ${spacing["0.5"]}`,
    },
    backgroundColor: {
      default: surface.control,
      [stylex.when.ancestor("[data-checked]", questionnaireOptionMarker)]:
        theme.primary,
    },
    borderColor: {
      default: theme.input,
      [stylex.when.ancestor("[data-checked]", questionnaireOptionMarker)]:
        theme.primary,
    },
    color: {
      default: null,
      [stylex.when.ancestor("[data-checked]", questionnaireOptionMarker)]:
        theme.primaryForeground,
    },
  },
  /** The filled dot, for a radio. */
  indicatorDot: {
    width: spacing[2],
    height: spacing[2],
    borderRadius: "calc(infinity * 1px)",
    backgroundColor: theme.primaryForeground,
    display: {
      default: "none",
      [stylex.when.ancestor("[data-checked]", questionnaireOptionMarker)]:
        "block",
      [stylex.when.ancestor(
        '[data-type="checkbox"]',
        questionnaireOptionMarker
      )]: "none",
    },
  },
  /** The tick, for a checkbox. */
  indicatorCheck: {
    display: {
      default: "none",
      [stylex.when.ancestor("[data-checked]", questionnaireOptionMarker)]:
        "block",
      [stylex.when.ancestor('[data-type="radio"]', questionnaireOptionMarker)]:
        "none",
    },
  },

  choiceLabel: {
    display: "flex",
    minWidth: 0,
    flex: 1,
    flexDirection: "column",
    gap: spacing["0.5"],
    lineHeight: leading.snug,
  },
  choiceDescription: { color: theme.mutedForeground },
  choiceShortcut: {
    pointerEvents: "none",
    marginInlineStart: "auto",
    width: spacing[5],
    height: spacing[5],
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.input,
    backgroundColor: theme.background,
    fontFamily: fontFamily.mono,
    fontSize: "0.625rem",
    lineHeight: 1,
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
    // Only shown when the choice actually declares one.
    display: {
      default: "none",
      [stylex.when.ancestor("[data-shortcut]", questionnaireOptionMarker)]:
        "inline-flex",
    },
    translate: {
      default: `0 ${BASELINE_NUDGE}`,
      [stylex.when.ancestor(
        ':has([data-slot="questionnaire-choice-description"])',
        questionnaireOptionMarker
      )]: `0 ${spacing["0.5"]}`,
    },
  },

  inputWrapper: { position: "relative", width: "100%", minWidth: 0 },
  input: {
    height: spacing[8],
    // Taller on touch, where 44px is the minimum comfortable target.
    minHeight: { default: spacing[11], [breakpoint.sm]: 0 },
    paddingInline: spacing["2.5"],
    paddingBlock: spacing[1],
    fontSize: { default: fontSize.base, [breakpoint.md]: fontSize.sm },
    lineHeight: { default: lineHeight.base, [breakpoint.md]: lineHeight.sm },
    "::selection": {
      backgroundColor: theme.primary,
      color: theme.primaryForeground,
    },
    pointerEvents: { default: null, ":disabled": "none" },
  },

  error: {
    marginTop: spacing[2],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.destructive,
  },

  actions: {
    display: "grid",
    minHeight: { default: spacing[11], [breakpoint.sm]: spacing[8] },
    width: "100%",
    gridTemplateColumns: "minmax(0, 1fr) auto auto",
    alignItems: "center",
    gap: spacing[2],
  },
  leading: {
    gridColumnStart: 1,
    gridRowStart: 1,
    minHeight: { default: spacing[11], [breakpoint.sm]: 0 },
    justifySelf: "start",
  },
  trailing: {
    minHeight: { default: spacing[11], [breakpoint.sm]: 0 },
    justifySelf: "end",
  },
})

type ButtonVariants = Pick<
  React.ComponentProps<typeof Button>,
  "size" | "variant"
>

function Questionnaire({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof QuestionnairePrimitive.Root>,
  "className"
> & { sx?: Sx }) {
  return (
    <QuestionnairePrimitive.Root
      data-slot="questionnaire"
      {...props}
      {...stylex.props(styles.root, sx)}
    />
  )
}

function QuestionnaireProgress({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof QuestionnairePrimitive.Progress>,
  "className"
> & { sx?: Sx }) {
  return (
    <QuestionnairePrimitive.Progress
      data-slot="questionnaire-progress"
      {...props}
      {...stylex.props(styles.progress, sx)}
    />
  )
}

function QuestionnaireItem({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof QuestionnairePrimitive.Item>,
  "className"
> & { sx?: Sx }) {
  return (
    <QuestionnairePrimitive.Item
      data-slot="questionnaire-item"
      {...props}
      {...stylex.props(styles.item, sx)}
    />
  )
}

function QuestionnaireTitle({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof QuestionnairePrimitive.Title>,
  "className"
> & { sx?: Sx }) {
  return (
    <QuestionnairePrimitive.Title
      data-slot="questionnaire-title"
      {...props}
      {...stylex.props(styles.title, sx)}
    />
  )
}

function QuestionnaireDescription({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof QuestionnairePrimitive.Description>,
  "className"
> & { sx?: Sx }) {
  return (
    <QuestionnairePrimitive.Description
      data-slot="questionnaire-description"
      {...props}
      {...stylex.props(styles.description, sx)}
    />
  )
}

function QuestionnaireChoices({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof QuestionnairePrimitive.Choices>,
  "className"
> & { sx?: Sx }) {
  return (
    <QuestionnairePrimitive.Choices
      data-slot="questionnaire-choices"
      {...props}
      {...stylex.props(styles.choices, sx)}
    />
  )
}

function QuestionnaireChoice({
  children,
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof QuestionnairePrimitive.Choice>,
  "className"
> & { sx?: Sx }) {
  return (
    <QuestionnairePrimitive.Choice
      data-slot="questionnaire-choice"
      {...props}
      {...stylex.props(questionnaireOptionMarker, styles.choice, sx)}
    >
      <QuestionnairePrimitive.ChoiceInput
        data-slot="questionnaire-choice-input"
        {...stylex.props(styles.choiceInput)}
      />
      <span
        aria-hidden="true"
        data-slot="questionnaire-choice-indicator"
        sx={styles.indicator}
      >
        <span
          data-slot="questionnaire-choice-indicator-dot"
          sx={styles.indicatorDot}
        />
        <Icon
          icon={Tick02Icon}
          strokeWidth={2}
          size="0.875rem"
          data-slot="questionnaire-choice-indicator-check"
          sx={styles.indicatorCheck}
        />
      </span>
      <QuestionnairePrimitive.ChoiceLabel
        data-slot="questionnaire-choice-label"
        {...stylex.props(styles.choiceLabel)}
      >
        {children}
      </QuestionnairePrimitive.ChoiceLabel>
      <QuestionnairePrimitive.ChoiceShortcut
        data-slot="questionnaire-choice-shortcut"
        {...stylex.props(styles.choiceShortcut)}
      />
    </QuestionnairePrimitive.Choice>
  )
}

function QuestionnaireChoiceDescription({
  sx,
  ...props
}: Omit<React.ComponentProps<"span">, "className"> & { sx?: Sx }) {
  return (
    <span
      data-slot="questionnaire-choice-description"
      {...props}
      sx={[styles.choiceDescription, sx]}
    />
  )
}

function QuestionnaireInput({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof QuestionnairePrimitive.Input>,
  "className"
> & { sx?: Sx }) {
  return (
    <div data-slot="questionnaire-input-wrapper" sx={styles.inputWrapper}>
      <QuestionnairePrimitive.Input
        data-slot="questionnaire-input"
        {...props}
        {...stylex.props(
          controlStyles.field,
          controlStyles.placeholder,
          styles.input,
          sx
        )}
      />
    </div>
  )
}

function QuestionnaireError({
  sx,
  ...props
}: Omit<
  React.ComponentProps<typeof QuestionnairePrimitive.Error>,
  "className"
> & { sx?: Sx }) {
  return (
    <QuestionnairePrimitive.Error
      data-slot="questionnaire-error"
      {...props}
      {...stylex.props(styles.error, sx)}
    />
  )
}

function QuestionnaireActions({
  sx,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  return (
    <div
      data-slot="questionnaire-actions"
      {...props}
      sx={[styles.actions, sx]}
    />
  )
}

function QuestionnairePrevious({
  children,
  sx,
  size = "default",
  variant = "outline",
  ...props
}: Omit<
  React.ComponentProps<typeof QuestionnairePrimitive.Previous>,
  "className"
> &
  ButtonVariants & { sx?: Sx }) {
  return (
    <QuestionnairePrimitive.Previous
      data-slot="questionnaire-previous"
      data-size={size}
      data-variant={variant}
      {...props}
      {...stylex.props(
        buttonRing,
        ...button({ size, variant }),
        styles.leading,
        sx
      )}
    >
      {children ?? "Previous"}
    </QuestionnairePrimitive.Previous>
  )
}

function QuestionnaireSkip({
  children,
  sx,
  size = "default",
  variant = "ghost",
  ...props
}: Omit<React.ComponentProps<typeof QuestionnairePrimitive.Skip>, "className"> &
  ButtonVariants & { sx?: Sx }) {
  return (
    <QuestionnairePrimitive.Skip
      data-slot="questionnaire-skip"
      data-size={size}
      data-variant={variant}
      {...props}
      {...stylex.props(
        buttonRing,
        ...button({ size, variant }),
        styles.trailing,
        sx
      )}
    >
      {children ?? "Skip"}
    </QuestionnairePrimitive.Skip>
  )
}

function QuestionnaireNext({
  children,
  sx,
  size = "default",
  variant = "default",
  ...props
}: Omit<React.ComponentProps<typeof QuestionnairePrimitive.Next>, "className"> &
  ButtonVariants & { sx?: Sx }) {
  return (
    <QuestionnairePrimitive.Next
      data-slot="questionnaire-next"
      data-size={size}
      data-variant={variant}
      {...props}
      {...stylex.props(
        buttonRing,
        ...button({ size, variant }),
        styles.trailing,
        sx
      )}
    >
      {children ?? "Next"}
    </QuestionnairePrimitive.Next>
  )
}

function QuestionnaireSubmit({
  children,
  sx,
  size = "default",
  variant = "default",
  ...props
}: Omit<
  React.ComponentProps<typeof QuestionnairePrimitive.Submit>,
  "className"
> &
  ButtonVariants & { sx?: Sx }) {
  return (
    <QuestionnairePrimitive.Submit
      data-slot="questionnaire-submit"
      data-size={size}
      data-variant={variant}
      {...props}
      {...stylex.props(
        buttonRing,
        ...button({ size, variant }),
        styles.trailing,
        sx
      )}
    >
      {children ?? "Submit"}
    </QuestionnairePrimitive.Submit>
  )
}

export {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
}
