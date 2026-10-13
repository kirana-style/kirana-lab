import * as stylex from "@stylexjs/stylex"
import { Separator as SeparatorPrimitive } from "@base-ui/react/separator"

import type { Sx } from "../lib/sx"
import { theme } from "../theme/semantic.stylex"

const styles = stylex.create({
  root: {
    flexShrink: 0,
    backgroundColor: theme.border,
  },
  // Was `data-horizontal:` / `data-vertical:`, two of the nine custom variants
  // the old Tailwind layer defined. StyleX reads the attribute directly.
  orientation: {
    height: { default: null, '[data-orientation="horizontal"]': "1px" },
    width: {
      default: null,
      '[data-orientation="horizontal"]': "100%",
      '[data-orientation="vertical"]': "1px",
    },
    alignSelf: { default: null, '[data-orientation="vertical"]': "stretch" },
  },
})

function Separator({
  sx,
  orientation = "horizontal",
  ...props
}: Omit<SeparatorPrimitive.Props, "className"> & { sx?: Sx }) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      {...props}
      {...stylex.props(styles.root, styles.orientation, sx)}
    />
  )
}

export { Separator }
