import * as stylex from "@stylexjs/stylex"

import type { Sx } from "../lib/sx"
import { fieldMarker } from "../theme/markers.stylex"
import { spacing } from "../tokens/spacing.stylex"
import { fontSize, fontWeight } from "../tokens/typography.stylex"

const styles = stylex.create({
  root: {
    display: "flex",
    alignItems: "center",
    gap: spacing[2],
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: 1,
    userSelect: "none",
  },
  // Was `group-data-[disabled=true]:` on the surrounding Field, and
  // `peer-disabled:` on the control this label is paired with. The first is an
  // ancestor relationship, the second a sibling one, and each marker scopes
  // which element is being observed.
  context: {
    pointerEvents: {
      default: null,
      [stylex.when.ancestor('[data-disabled="true"]', fieldMarker)]: "none",
    },
    cursor: {
      default: null,
      [stylex.when.siblingBefore(":disabled")]: "not-allowed",
    },
    opacity: {
      default: null,
      [stylex.when.ancestor('[data-disabled="true"]', fieldMarker)]: 0.5,
      [stylex.when.siblingBefore(":disabled")]: 0.5,
    },
  },
})

function Label({
  sx,
  ...props
}: Omit<React.ComponentProps<"label">, "className"> & { sx?: Sx }) {
  return (
    <label
      data-slot="label"
      {...props}
      sx={[styles.root, styles.context, sx]}
    />
  )
}

export { Label }
