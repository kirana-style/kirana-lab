import * as stylex from "@stylexjs/stylex"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"

import type { Sx } from "../lib/sx"
import { radius, theme } from "../theme/semantic.stylex"
import { duration, easing } from "../tokens/motion.stylex"
import { spacing } from "../tokens/spacing.stylex"
import { fontSize, fontWeight, lineHeight } from "../tokens/typography.stylex"

const styles = stylex.create({
  root: { display: "flex", flexWrap: "wrap", gap: spacing[3] },
  track: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: spacing[1],
    width: "100%",
    overflowX: "hidden",
    borderRadius: radius.full,
    backgroundColor: theme.muted,
  },
  indicator: {
    height: "100%",
    backgroundColor: theme.primary,
    transitionProperty: "inline-size, transform",
    transitionDuration: duration[300],
    transitionTimingFunction: easing.inOut,
  },
  label: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  },
  value: {
    marginInlineStart: "auto",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
    fontVariantNumeric: "tabular-nums",
  },
})

function Progress({
  sx,
  indicatorSx,
  children,
  value,
  ...props
}: Omit<ProgressPrimitive.Root.Props, "className"> & {
  sx?: Sx
  /** Styles the filled bar, which Progress renders for you. */
  indicatorSx?: Sx
}) {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      {...props}
      {...stylex.props(styles.root, sx)}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator sx={indicatorSx} />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  )
}

function ProgressTrack({
  sx,
  ...props
}: Omit<ProgressPrimitive.Track.Props, "className"> & { sx?: Sx }) {
  return (
    <ProgressPrimitive.Track
      data-slot="progress-track"
      {...props}
      {...stylex.props(styles.track, sx)}
    />
  )
}

function ProgressIndicator({
  sx,
  ...props
}: Omit<ProgressPrimitive.Indicator.Props, "className"> & { sx?: Sx }) {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      {...props}
      {...stylex.props(styles.indicator, sx)}
    />
  )
}

function ProgressLabel({
  sx,
  ...props
}: Omit<ProgressPrimitive.Label.Props, "className"> & { sx?: Sx }) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      {...props}
      {...stylex.props(styles.label, sx)}
    />
  )
}

function ProgressValue({
  sx,
  ...props
}: Omit<ProgressPrimitive.Value.Props, "className"> & { sx?: Sx }) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      {...props}
      {...stylex.props(styles.value, sx)}
    />
  )
}

export {
  Progress,
  ProgressTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressValue,
}
