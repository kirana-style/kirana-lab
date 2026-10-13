/**
 * Layer 3: shared keyframes, replacing `tw-animate-css`.
 *
 * `stylex.keyframes` has to be used in the file that declares it, so the
 * generated animation names are re-exported through `defineVars` — the
 * documented way to share keyframes across modules.
 *
 * Only looping animations live here. The enter/exit motion that shadcn drove
 * with `animate-in` / `animate-out` utilities is handled by plain transitions
 * against Base UI's own `data-starting-style` and `data-ending-style`
 * attributes, which is both simpler and interruptible mid-flight.
 */

import * as stylex from "@stylexjs/stylex"

const spin = stylex.keyframes({
  to: { transform: "rotate(360deg)" },
})

const pulse = stylex.keyframes({
  "50%": { opacity: 0.5 },
})

const caretBlink = stylex.keyframes({
  "0%, 70%, 100%": { opacity: 1 },
  "20%, 50%": { opacity: 0 },
})

const shimmer = stylex.keyframes({
  from: { backgroundPositionX: "100%" },
  to: { backgroundPositionX: "0%" },
})

export const animation = stylex.defineVars({
  spin,
  pulse,
  caretBlink,
  shimmer,
})
