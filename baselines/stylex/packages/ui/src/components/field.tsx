import { useMemo } from "react"
import * as stylex from "@stylexjs/stylex"

import type { Sx } from "../lib/sx"
import { mergeSx } from "../lib/sx"
import type { VariantProps } from "../recipes/recipe"
import { recipe } from "../recipes/recipe"
import { Label } from "./label"
import { Separator } from "./separator"
import { fieldLabelMarker, fieldMarker } from "../theme/markers.stylex"
import { alpha, radius, surface, theme } from "../theme/semantic.stylex"
import { fieldGroupQuery } from "../tokens/container.stylex"
import { ring } from "../tokens/ring.stylex"
import { spacing } from "../tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
} from "../tokens/typography.stylex"

/** A label that wraps a whole Field, which turns it into a selectable card. */
const CARD = ':has(> [data-slot="field"])'

/** A field holding a FieldContent block aligns to the top of it. */
/** Was `group-has-data-horizontal/field`. */

const styles = stylex.create({
  set: {
    display: "flex",
    flexDirection: "column",
    gap: {
      default: spacing[4],
      ':has(> [data-slot="checkbox-group"])': spacing[3],
      ':has(> [data-slot="radio-group"])': spacing[3],
    },
  },

  legend: {
    marginBottom: spacing["1.5"],
    fontWeight: fontWeight.medium,
    fontSize: {
      default: fontSize.base,
      '[data-variant="label"]': fontSize.sm,
    },
    lineHeight: {
      default: lineHeight.base,
      '[data-variant="label"]': lineHeight.sm,
    },
  },

  group: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    // A group used as a checkbox list is tighter. A group directly inside
    // another is tighter still; that is a child rule, in globals.css.
    gap: { default: spacing[5], '[data-slot="checkbox-group"]': spacing[3] },
    // Declared so the `responsive` orientation below can query it. This is the
    // named container from `@container/field-group`.
    containerType: "inline-size",
    containerName: "field-group",
  },

  fieldBase: {
    display: "flex",
    width: "100%",
    gap: spacing[2],
    color: { default: null, '[data-invalid="true"]': theme.destructive },
  },
  vertical: { flexDirection: "column" },
  horizontal: {
    flexDirection: "row",
    alignItems: {
      default: "center",
      ':has(> [data-slot="field-content"])': "flex-start",
    },
  },
  /**
   * Stacks on a narrow container and lays out in a row once there is room. The
   * query names `field-group`, so it tracks the width of its FieldGroup rather
   * than the viewport — which is what `@md/field-group:` meant.
   */
  responsive: {
    flexDirection: { default: "column", [fieldGroupQuery.md]: "row" },
    alignItems: {
      default: null,
      [fieldGroupQuery.md]: {
        default: "center",
        ':has(> [data-slot="field-content"])': "flex-start",
      },
    },
  },

  content: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacing["0.5"],
    lineHeight: leading.snug,
  },

  label: {
    display: "flex",
    gap: spacing[2],
    lineHeight: leading.snug,
    opacity: {
      default: null,
      [stylex.when.ancestor('[data-disabled="true"]', fieldMarker)]: 0.5,
    },
    // A label wrapping a whole Field is a selectable card, like a radio tile.
    // Was `has-[>[data-slot=field]]:` on every property below; the same test,
    // so no prop is needed to opt in.
    width: { default: "fit-content", [CARD]: "100%" },
    flexDirection: { default: null, [CARD]: "column" },
    borderRadius: { default: null, [CARD]: radius.lg },
    borderWidth: { default: null, [CARD]: "1px" },
    borderStyle: { default: null, [CARD]: "solid" },
    borderColor: {
      default: null,
      [CARD]: {
        default: theme.border,
        ":has(:focus-visible)": theme.ring,
        ":has([data-checked])": surface.checkedSoftBorder,
      },
    },
    backgroundColor: {
      default: null,
      [CARD]: {
        default: null,
        // Hover only applies while nothing inside is disabled.
        ":hover": alpha.muted50,
        ":has(:disabled)": null,
        ":has([data-disabled])": null,
        ":has([data-checked])": surface.checkedSoft,
      },
    },
    boxShadow: {
      default: null,
      [CARD]: {
        default: null,
        ":has(:focus-visible)": `0 0 0 ${ring.width} ${alpha.ring50}`,
      },
    },
  },

  title: {
    display: "flex",
    width: "fit-content",
    alignItems: "center",
    gap: spacing[2],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    opacity: {
      default: null,
      [stylex.when.ancestor('[data-disabled="true"]', fieldMarker)]: 0.5,
    },
  },

  description: {
    textAlign: "start",
    fontSize: fontSize.sm,
    lineHeight: leading.normal,
    fontWeight: fontWeight.normal,
    color: theme.mutedForeground,
    // Was `group-has-data-horizontal/field:text-balance`. `data-horizontal` is
    // shadcn's variant for `[data-orientation="horizontal"]`, and `group-has`
    // asks whether the field *contains* one — a slider, say. A horizontal field
    // is not its own descendant, so a checkbox or switch row wraps normally.
    textWrap: {
      default: null,
      [stylex.when.ancestor(
        ':has([data-orientation="horizontal"])',
        fieldMarker
      )]: "balance",
    },
    // Links written straight into the description; see "Inline content" in
    // globals.css.
    "--inline-link-hover": theme.primary,
    // Was `last:mt-0 nth-last-2:-mt-1`, tightening a description that sits
    // directly above the control rather than at the end of the field, and
    // `[[data-variant=legend]+&]:-mt-1.5`, pulling one up under a legend. The
    // legend carries the default marker; its rule wins in every position.
    marginTop: {
      default: null,
      [stylex.when.siblingBefore('[data-variant="legend"]')]:
        `calc(${spacing["1.5"]} * -1)`,
      ":nth-last-child(2)": {
        default: `calc(${spacing[1]} * -1)`,
        [stylex.when.siblingBefore('[data-variant="legend"]')]:
          `calc(${spacing["1.5"]} * -1)`,
      },
      ":last-child": {
        default: 0,
        [stylex.when.siblingBefore('[data-variant="legend"]')]:
          `calc(${spacing["1.5"]} * -1)`,
      },
    },
  },

  separator: {
    position: "relative",
    marginBlock: `calc(${spacing[2]} * -1)`,
    height: spacing[5],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
  separatorLine: { position: "absolute", inset: 0, top: "50%" },
  separatorContent: {
    position: "relative",
    marginInline: "auto",
    display: "block",
    width: "fit-content",
    backgroundColor: theme.background,
    paddingInline: spacing[2],
    color: theme.mutedForeground,
  },

  error: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.normal,
    color: theme.destructive,
  },
  errorList: {
    marginInlineStart: spacing[4],
    display: "flex",
    listStyleType: "disc",
    flexDirection: "column",
    gap: spacing[1],
  },
})

const field = recipe({
  base: styles.fieldBase,
  variants: {
    orientation: {
      vertical: styles.vertical,
      horizontal: styles.horizontal,
      responsive: styles.responsive,
    },
  },
  defaults: { orientation: "vertical" },
})

type El<T extends keyof React.JSX.IntrinsicElements = "div"> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }

function FieldSet({ sx, ...props }: El<"fieldset">) {
  return <fieldset data-slot="field-set" {...props} sx={[styles.set, sx]} />
}

function FieldLegend({
  sx,
  variant = "legend",
  ...props
}: El<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      {...props}
      sx={[stylex.defaultMarker(), styles.legend, sx]}
    />
  )
}

function FieldGroup({ sx, ...props }: El) {
  return <div data-slot="field-group" {...props} sx={[styles.group, sx]} />
}

function Field({
  sx,
  orientation = "vertical",
  ...props
}: El & VariantProps<typeof field>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      {...props}
      sx={[fieldMarker, ...field({ orientation }), sx]}
    />
  )
}

function FieldContent({ sx, ...props }: El) {
  return <div data-slot="field-content" {...props} sx={[styles.content, sx]} />
}

function FieldLabel({ sx, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      {...props}
      sx={mergeSx(fieldLabelMarker, styles.label, sx)}
    />
  )
}

function FieldTitle({ sx, ...props }: El) {
  return <div data-slot="field-title" {...props} sx={[styles.title, sx]} />
}

function FieldDescription({ sx, ...props }: El<"p">) {
  return (
    <p data-slot="field-description" {...props} sx={[styles.description, sx]} />
  )
}

function FieldSeparator({
  children,
  sx,
  contentSx,
  ...props
}: El & {
  children?: React.ReactNode
  /** Styles the label box that interrupts the line, e.g. its fill on a card. */
  contentSx?: Sx
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      {...props}
      sx={[styles.separator, sx]}
    >
      <Separator sx={styles.separatorLine} />
      {children && (
        <span
          data-slot="field-separator-content"
          sx={[styles.separatorContent, contentSx]}
        >
          {children}
        </span>
      )}
    </div>
  )
}

function FieldError({
  sx,
  children,
  errors,
  ...props
}: El & { errors?: Array<{ message?: string } | undefined> }) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors.length === 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul sx={styles.errorList}>
        {uniqueErrors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      {...props}
      sx={[styles.error, sx]}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
  field as fieldVariants,
}
