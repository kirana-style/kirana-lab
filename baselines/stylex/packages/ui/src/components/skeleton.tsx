import * as stylex from "@stylexjs/stylex"

import type { Sx } from "../lib/sx"
import { animation } from "../theme/animations.stylex"
import { radius, theme } from "../theme/semantic.stylex"
import { duration, easing } from "../tokens/motion.stylex"

const styles = stylex.create({
  root: {
    borderRadius: radius.md,
    backgroundColor: theme.muted,
    animationName: animation.pulse,
    animationDuration: duration[1000],
    animationIterationCount: "infinite",
    animationTimingFunction: easing.inOut,
  },
})

function Skeleton({
  sx,
  ...props
}: Omit<React.ComponentProps<"div">, "className"> & { sx?: Sx }) {
  return <div data-slot="skeleton" {...props} sx={[styles.root, sx]} />
}

export { Skeleton }
