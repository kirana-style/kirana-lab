/**
 * Layer 5: the Icon primitive.
 *
 * This exists to replace the single most repeated Tailwind pattern in the old
 * components, `[&_svg:not([class*='size-'])]:size-4`, which appeared 25 times.
 * That selector reached into whatever `<svg>` happened to be nested inside a
 * control and sized it, while sniffing the child's literal `class` attribute to
 * let callers opt out. Neither half survives StyleX: there are no descendant
 * selectors, and class names are hashed so `[class*='size-']` can never match.
 *
 * The replacement inverts the relationship. A control declares how large its
 * icons should be by setting `ctx.iconSize`, and the icon reads it:
 *
 *   // in the button recipe
 *   { [ctx.iconSize]: "0.875rem" }
 *
 * An explicit `size` prop still wins, which is the opt-out the `:not()` was for.
 */

import * as stylex from "@stylexjs/stylex"
import { HugeiconsIcon } from "@hugeicons/react"

import type { Sx } from "../lib/sx"
import { ctx } from "../theme/context.stylex"

const styles = stylex.create({
  root: {
    // Inherits whatever the nearest control declared, falling back to 1rem.
    width: ctx.iconSize,
    height: ctx.iconSize,
    flexShrink: 0,
    // Icons are decoration inside controls; the control owns the interaction.
    pointerEvents: "none",
  },
  explicit: (value: string) => ({ width: value, height: value }),
})

export type IconProps = Omit<
  React.ComponentProps<typeof HugeiconsIcon>,
  "className" | "size" | "width" | "height"
> & {
  /** Overrides the size the surrounding control asked for. */
  size?: string
  sx?: Sx
}

/**
 * `strokeWidth` defaults to 2, not Hugeicons' own 1.5. Every icon in the
 * original codebase passed 2 explicitly, and shadcn's upstream components are
 * drawn with lucide, whose default stroke is also 2. A port that forgets the
 * prop would otherwise render visibly thinner glyphs than its neighbours.
 */
export function Icon({ size, sx, strokeWidth = 2, ...props }: IconProps) {
  return (
    <HugeiconsIcon
      aria-hidden
      strokeWidth={strokeWidth}
      {...props}
      {...stylex.props(styles.root, size != null && styles.explicit(size), sx)}
    />
  )
}
