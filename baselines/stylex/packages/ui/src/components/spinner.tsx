import * as stylex from "@stylexjs/stylex"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"

import type { Sx } from "../lib/sx"
import { animation } from "../theme/animations.stylex"
import { ctx } from "../theme/context.stylex"
import { duration, easing } from "../tokens/motion.stylex"

const styles = stylex.create({
  root: {
    // Takes its size from whichever control contains it, like any other icon.
    width: ctx.iconSize,
    height: ctx.iconSize,
    flexShrink: 0,
    animationName: animation.spin,
    animationDuration: duration[1000],
    animationIterationCount: "infinite",
    animationTimingFunction: easing.linear,
  },
})

// HugeiconsIcon narrows strokeWidth to `number`, while React.ComponentProps<"svg">
// widens it to `string | number` — and the spread below would carry that wider
// type past the literal set here.
type SpinnerProps = Omit<
  React.ComponentProps<"svg">,
  "strokeWidth" | "className"
> & {
  strokeWidth?: number
  sx?: Sx
}

function Spinner({ sx, ...props }: SpinnerProps) {
  return (
    <HugeiconsIcon
      icon={Loading03Icon}
      strokeWidth={2}
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      {...props}
      {...stylex.props(styles.root, sx)}
    />
  )
}

export { Spinner }
