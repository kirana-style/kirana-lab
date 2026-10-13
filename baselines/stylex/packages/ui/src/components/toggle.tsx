import * as stylex from "@stylexjs/stylex"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"

import type { Sx } from "../lib/sx"
import type { VariantProps } from "../recipes/recipe"
import { toggle } from "../recipes/toggle"

type ToggleProps = Omit<TogglePrimitive.Props, "className"> &
  VariantProps<typeof toggle> & { sx?: Sx }

function Toggle({ sx, variant, size, ...props }: ToggleProps) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      {...props}
      {...stylex.props(...toggle({ variant, size }), sx)}
    />
  )
}

export { Toggle, toggle as toggleVariants }
export type { ToggleProps }
