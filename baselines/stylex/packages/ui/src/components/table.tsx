import * as stylex from "@stylexjs/stylex"

import type { Sx } from "../lib/sx"
import { alpha, theme } from "../theme/semantic.stylex"
import { duration, easing } from "../tokens/motion.stylex"
import { spacing } from "../tokens/spacing.stylex"
import { fontSize, fontWeight, lineHeight } from "../tokens/typography.stylex"

const styles = stylex.create({
  container: { position: "relative", width: "100%", overflowX: "auto" },
  table: {
    width: "100%",
    captionSide: "bottom",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },

  // Tailwind reached into rows with `[&_tr]:border-b`. StyleX has no descendant
  // selectors, so each section states the border its own rows should draw and
  // TableRow reads nothing from its parent.
  header: {},
  body: {},
  footer: {
    borderTopWidth: "1px",
    borderTopColor: theme.border,
    backgroundColor: alpha.muted50,
    fontWeight: fontWeight.medium,
  },

  row: {
    // Was `[&_tr:last-child]:border-0` on the body and `[&>tr]:last:border-b-0`
    // on the footer. Both sections carry the default marker, and the last row
    // of either drops its rule.
    borderBottomWidth: {
      default: "1px",
      [stylex.when.ancestor('[data-slot="table-body"]')]: {
        default: "1px",
        ":last-child": 0,
      },
      [stylex.when.ancestor('[data-slot="table-footer"]')]: {
        default: "1px",
        ":last-child": 0,
      },
    },
    borderBottomColor: theme.border,
    transitionProperty: "background-color",
    transitionDuration: duration[150],
    transitionTimingFunction: easing.inOut,
    backgroundColor: {
      default: null,
      ":hover": alpha.muted50,
      // Was `has-aria-expanded:`, a descendant query.
      ':has([aria-expanded="true"])': alpha.muted50,
      '[data-state="selected"]': theme.muted,
    },
  },

  head: {
    height: spacing[10],
    paddingInline: spacing[2],
    textAlign: "start",
    verticalAlign: "middle",
    fontWeight: fontWeight.medium,
    whiteSpace: "nowrap",
    color: theme.foreground,
    // Was `[&:has([role=checkbox])]:pe-0`: a checkbox cell needs no trailing gap.
    paddingInlineEnd: {
      default: spacing[2],
      ':has([role="checkbox"])': 0,
    },
  },
  cell: {
    padding: spacing[2],
    verticalAlign: "middle",
    whiteSpace: "nowrap",
    paddingInlineEnd: {
      default: spacing[2],
      ':has([role="checkbox"])': 0,
    },
  },
  caption: {
    marginTop: spacing[4],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  },
})

type El<T extends keyof React.JSX.IntrinsicElements> = Omit<
  React.ComponentProps<T>,
  "className"
> & { sx?: Sx }

function Table({ sx, ...props }: El<"table">) {
  return (
    <div data-slot="table-container" sx={styles.container}>
      <table data-slot="table" {...props} sx={[styles.table, sx]} />
    </div>
  )
}

function TableHeader({ sx, ...props }: El<"thead">) {
  return <thead data-slot="table-header" {...props} sx={[styles.header, sx]} />
}

function TableBody({ sx, ...props }: El<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      {...props}
      sx={[stylex.defaultMarker(), styles.body, sx]}
    />
  )
}

function TableFooter({ sx, ...props }: El<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      {...props}
      sx={[stylex.defaultMarker(), styles.footer, sx]}
    />
  )
}

function TableRow({ sx, ...props }: El<"tr">) {
  return <tr data-slot="table-row" {...props} sx={[styles.row, sx]} />
}

function TableHead({ sx, ...props }: El<"th">) {
  return <th data-slot="table-head" {...props} sx={[styles.head, sx]} />
}

function TableCell({ sx, ...props }: El<"td">) {
  return <td data-slot="table-cell" {...props} sx={[styles.cell, sx]} />
}

function TableCaption({ sx, ...props }: El<"caption">) {
  return (
    <caption data-slot="table-caption" {...props} sx={[styles.caption, sx]} />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
