/**
 * Layer 5 support: the finite prop vocabulary the primitives index into.
 *
 * Every entry here is a style StyleX compiled ahead of time, so a prop like
 * `p="4"` is a table lookup rather than a style object built during render.
 * That is what keeps the Panda-like prop API free of a runtime.
 *
 * The vocabulary is deliberately a subset of Tailwind's. Spacing props carry
 * the full scale because layout needs it; colour props are restricted to the
 * semantic palette, so no component can reach for a raw `red500` background
 * and quietly break dark mode.
 */

import * as stylex from "@stylexjs/stylex"

import { spacing } from "../tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
} from "../tokens/typography.stylex"
import { radius, theme } from "../theme/semantic.stylex"

const SPACE = [
  "0",
  "px",
  "0.5",
  "1",
  "1.5",
  "2",
  "2.5",
  "3",
  "3.5",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "14",
  "16",
  "20",
  "24",
  "28",
  "32",
  "36",
  "40",
  "44",
  "48",
  "52",
  "56",
  "60",
  "64",
  "72",
  "80",
  "96",
] as const

export type Space = (typeof SPACE)[number]

export const padding = stylex.create({
  "0": { padding: spacing[0] },
  px: { padding: spacing.px },
  "0.5": { padding: spacing["0.5"] },
  "1": { padding: spacing[1] },
  "1.5": { padding: spacing["1.5"] },
  "2": { padding: spacing[2] },
  "2.5": { padding: spacing["2.5"] },
  "3": { padding: spacing[3] },
  "3.5": { padding: spacing["3.5"] },
  "4": { padding: spacing[4] },
  "5": { padding: spacing[5] },
  "6": { padding: spacing[6] },
  "7": { padding: spacing[7] },
  "8": { padding: spacing[8] },
  "9": { padding: spacing[9] },
  "10": { padding: spacing[10] },
  "11": { padding: spacing[11] },
  "12": { padding: spacing[12] },
  "14": { padding: spacing[14] },
  "16": { padding: spacing[16] },
  "20": { padding: spacing[20] },
  "24": { padding: spacing[24] },
})

export const paddingInline = stylex.create({
  "0": { paddingInline: spacing[0] },
  px: { paddingInline: spacing.px },
  "0.5": { paddingInline: spacing["0.5"] },
  "1": { paddingInline: spacing[1] },
  "1.5": { paddingInline: spacing["1.5"] },
  "2": { paddingInline: spacing[2] },
  "2.5": { paddingInline: spacing["2.5"] },
  "3": { paddingInline: spacing[3] },
  "3.5": { paddingInline: spacing["3.5"] },
  "4": { paddingInline: spacing[4] },
  "5": { paddingInline: spacing[5] },
  "6": { paddingInline: spacing[6] },
  "8": { paddingInline: spacing[8] },
  "10": { paddingInline: spacing[10] },
  "12": { paddingInline: spacing[12] },
  "16": { paddingInline: spacing[16] },
})

export const paddingBlock = stylex.create({
  "0": { paddingBlock: spacing[0] },
  px: { paddingBlock: spacing.px },
  "0.5": { paddingBlock: spacing["0.5"] },
  "1": { paddingBlock: spacing[1] },
  "1.5": { paddingBlock: spacing["1.5"] },
  "2": { paddingBlock: spacing[2] },
  "2.5": { paddingBlock: spacing["2.5"] },
  "3": { paddingBlock: spacing[3] },
  "3.5": { paddingBlock: spacing["3.5"] },
  "4": { paddingBlock: spacing[4] },
  "5": { paddingBlock: spacing[5] },
  "6": { paddingBlock: spacing[6] },
  "8": { paddingBlock: spacing[8] },
  "10": { paddingBlock: spacing[10] },
  "12": { paddingBlock: spacing[12] },
  "16": { paddingBlock: spacing[16] },
})

export const gap = stylex.create({
  "0": { gap: spacing[0] },
  px: { gap: spacing.px },
  "0.5": { gap: spacing["0.5"] },
  "1": { gap: spacing[1] },
  "1.5": { gap: spacing["1.5"] },
  "2": { gap: spacing[2] },
  "2.5": { gap: spacing["2.5"] },
  "3": { gap: spacing[3] },
  "3.5": { gap: spacing["3.5"] },
  "4": { gap: spacing[4] },
  "5": { gap: spacing[5] },
  "6": { gap: spacing[6] },
  "8": { gap: spacing[8] },
  "10": { gap: spacing[10] },
  "12": { gap: spacing[12] },
  "16": { gap: spacing[16] },
})

export const bg = stylex.create({
  transparent: { backgroundColor: "transparent" },
  background: { backgroundColor: theme.background },
  foreground: { backgroundColor: theme.foreground },
  card: { backgroundColor: theme.card },
  popover: { backgroundColor: theme.popover },
  primary: { backgroundColor: theme.primary },
  secondary: { backgroundColor: theme.secondary },
  muted: { backgroundColor: theme.muted },
  accent: { backgroundColor: theme.accent },
  destructive: { backgroundColor: theme.destructive },
  sidebar: { backgroundColor: theme.sidebar },
})

export const fg = stylex.create({
  inherit: { color: "inherit" },
  foreground: { color: theme.foreground },
  background: { color: theme.background },
  cardForeground: { color: theme.cardForeground },
  popoverForeground: { color: theme.popoverForeground },
  primary: { color: theme.primary },
  primaryForeground: { color: theme.primaryForeground },
  secondaryForeground: { color: theme.secondaryForeground },
  mutedForeground: { color: theme.mutedForeground },
  accentForeground: { color: theme.accentForeground },
  destructive: { color: theme.destructive },
  sidebarForeground: { color: theme.sidebarForeground },
})

export const rounded = stylex.create({
  none: { borderRadius: 0 },
  sm: { borderRadius: radius.sm },
  md: { borderRadius: radius.md },
  lg: { borderRadius: radius.lg },
  xl: { borderRadius: radius.xl },
  "2xl": { borderRadius: radius["2xl"] },
  "3xl": { borderRadius: radius["3xl"] },
  full: { borderRadius: radius.full },
})

export const size = stylex.create({
  xs: { fontSize: fontSize.xs, lineHeight: lineHeight.xs },
  sm: { fontSize: fontSize.sm, lineHeight: lineHeight.sm },
  base: { fontSize: fontSize.base, lineHeight: lineHeight.base },
  lg: { fontSize: fontSize.lg, lineHeight: lineHeight.lg },
  xl: { fontSize: fontSize.xl, lineHeight: lineHeight.xl },
  "2xl": { fontSize: fontSize["2xl"], lineHeight: lineHeight["2xl"] },
  "3xl": { fontSize: fontSize["3xl"], lineHeight: lineHeight["3xl"] },
  "4xl": { fontSize: fontSize["4xl"], lineHeight: lineHeight["4xl"] },
})

export const weight = stylex.create({
  light: { fontWeight: fontWeight.light },
  normal: { fontWeight: fontWeight.normal },
  medium: { fontWeight: fontWeight.medium },
  semibold: { fontWeight: fontWeight.semibold },
  bold: { fontWeight: fontWeight.bold },
})

export const lead = stylex.create({
  tight: { lineHeight: leading.tight },
  snug: { lineHeight: leading.snug },
  normal: { lineHeight: leading.normal },
  relaxed: { lineHeight: leading.relaxed },
})

export const align = stylex.create({
  start: { alignItems: "flex-start" },
  center: { alignItems: "center" },
  end: { alignItems: "flex-end" },
  stretch: { alignItems: "stretch" },
  baseline: { alignItems: "baseline" },
})

export const justify = stylex.create({
  start: { justifyContent: "flex-start" },
  center: { justifyContent: "center" },
  end: { justifyContent: "flex-end" },
  between: { justifyContent: "space-between" },
  around: { justifyContent: "space-around" },
})

export const wrap = stylex.create({
  wrap: { flexWrap: "wrap" },
  nowrap: { flexWrap: "nowrap" },
  reverse: { flexWrap: "wrap-reverse" },
})

export const direction = stylex.create({
  row: { flexDirection: "row" },
  column: { flexDirection: "column" },
  rowReverse: { flexDirection: "row-reverse" },
  columnReverse: { flexDirection: "column-reverse" },
})

export const columns = stylex.create({
  "1": { gridTemplateColumns: "repeat(1, minmax(0, 1fr))" },
  "2": { gridTemplateColumns: "repeat(2, minmax(0, 1fr))" },
  "3": { gridTemplateColumns: "repeat(3, minmax(0, 1fr))" },
  "4": { gridTemplateColumns: "repeat(4, minmax(0, 1fr))" },
  "5": { gridTemplateColumns: "repeat(5, minmax(0, 1fr))" },
  "6": { gridTemplateColumns: "repeat(6, minmax(0, 1fr))" },
  "8": { gridTemplateColumns: "repeat(8, minmax(0, 1fr))" },
  "12": { gridTemplateColumns: "repeat(12, minmax(0, 1fr))" },
})
