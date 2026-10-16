/**
 * The scale-curve corpus (METHODOLOGY.md, KRN-BENCH-002): `count` generated components for each
 * implementation, written into its `apps/scale-curve/src/generated/` (git-ignored).
 *
 *   bun scripts/scale-curve.ts 1000
 *
 * Every component is a card: a root, a title and a button. What each one uses comes from one seeded
 * sequence, so the first 100 components are the same at every size and the distribution does not
 * change with it. Of the components, about
 *
 * - every one: spacing, radius and colour tokens, a font size with its line height, and a button
 *   from a recipe (two tones, two sizes);
 * - half: a hover state on the root;
 * - three in ten: a breakpoint;
 * - one in four: a relation (the title reads the root's hover);
 * - three in twenty: a runtime value (the root's width, bridged).
 *
 * Each implementation writes them its own way, from its own tokens: Kirana with `css()`, `recipe()`
 * and `relation()`; StyleX with `stylex.create()`, a variant map and `stylex.when.ancestor` with a
 * marker; Tailwind CSS with utilities, `cva` and a named group. StyleX (SWC) builds the StyleX
 * sources, so they are written to both StyleX checkouts.
 */
import { mkdirSync, rmSync, writeFileSync } from "node:fs"
import path from "node:path"

const ROOT = path.resolve(import.meta.dirname, "..")

/** The sizes the corpus measures. */
export const SIZES = [100, 1000, 10000] as const

type Spec = {
  name: string
  grid: boolean
  gap: 1 | 2 | 3 | 4
  padding: 2 | 3 | 4 | 6
  radius: "sm" | "md" | "lg" | "xl"
  background: "card" | "secondary" | "accent"
  hover: boolean
  breakpoint: boolean
  text: "sm" | "base" | "lg"
  weight: "medium" | "semibold"
  muted: boolean
  relation: boolean
  dynamic: number | null
  tone: "solid" | "outline"
  size: "sm" | "md"
}

/** mulberry32, seeded per component: component `index` is the same at every size. */
function generator(seed: number) {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = state
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function spec(index: number): Spec {
  const next = generator(Math.imul(index + 1, 2654435761) ^ 20261016)
  const pick = <T>(list: readonly T[]) =>
    list[Math.floor(next() * list.length)]!
  const chance = (p: number) => next() < p
  return {
    name: `C${String(index + 1).padStart(5, "0")}`,
    grid: chance(0.5),
    gap: pick([1, 2, 3, 4] as const),
    padding: pick([2, 3, 4, 6] as const),
    radius: pick(["sm", "md", "lg", "xl"] as const),
    background: pick(["card", "secondary", "accent"] as const),
    hover: chance(0.5),
    breakpoint: chance(0.3),
    text: pick(["sm", "base", "lg"] as const),
    weight: pick(["medium", "semibold"] as const),
    muted: chance(0.4),
    relation: chance(0.25),
    dynamic: chance(0.15) ? 40 + Math.floor(next() * 61) : null,
    tone: pick(["solid", "outline"] as const),
    size: pick(["sm", "md"] as const),
  }
}

/** The hover background: a different surface from the resting one. */
const hoverOf = (spec: Spec) =>
  spec.background === "accent" ? "secondary" : "accent"

const camel = (token: string) =>
  token.replace(/-(\w)/g, (_, letter: string) => letter.toUpperCase())

function kirana(spec: Spec): string {
  const root = [
    `display: "${spec.grid ? "grid" : "flex"}"`,
    ...(spec.grid ? [] : [`flexDirection: "column"`]),
    `gap: spacing[${spec.gap}]`,
    spec.breakpoint
      ? `padding: { base: spacing[${spec.padding}], [breakpoint.md]: spacing[8] }`
      : `padding: spacing[${spec.padding}]`,
    `borderRadius: radius.${spec.radius}`,
    `borderWidth: "1px"`,
    `borderStyle: "solid"`,
    `borderColor: theme.border`,
    spec.hover
      ? `backgroundColor: { base: theme.${spec.background}, ":hover": theme.${hoverOf(spec)} }`
      : `backgroundColor: theme.${spec.background}`,
  ]
  const color = spec.muted ? "theme.mutedForeground" : "theme.foreground"
  const title = [
    `fontSize: fontSize.${spec.text}`,
    `lineHeight: lineHeight.${spec.text}`,
    `fontWeight: fontWeight.${spec.weight}`,
    spec.relation
      ? `color: { base: ${color}, [card.within(":hover")]: theme.primary }`
      : `color: ${color}`,
  ]
  return `import { css, recipe${spec.relation ? ", relation" : ""} } from "@kirana-style/core"

import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { radius, theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"
import { fontSize, fontWeight, lineHeight } from "@workspace/ui/tokens/typography"
${spec.relation ? `\nconst card = relation("${spec.name.toLowerCase()}")\n` : ""}
const styles = {
  root: css({ ${root.join(", ")} }),
  title: css({ ${title.join(", ")} }),
}

const button = recipe({
  base: css({ display: "inline-flex", alignItems: "center", justifySelf: "start", alignSelf: "flex-start", borderRadius: radius.md, borderWidth: "1px", borderStyle: "solid", fontWeight: fontWeight.medium }),
  variants: {
    tone: {
      solid: css({ borderColor: "transparent", backgroundColor: theme.primary, color: theme.primaryForeground }),
      outline: css({ borderColor: theme.border, backgroundColor: "transparent", color: theme.foreground }),
    },
    size: {
      sm: css({ height: spacing[8], paddingInline: spacing[3], fontSize: fontSize.xs, lineHeight: lineHeight.xs }),
      md: css({ height: spacing[9], paddingInline: spacing[4], fontSize: fontSize.sm, lineHeight: lineHeight.sm }),
    },
  },
})

export default function ${spec.name}(${spec.dynamic === null ? "" : `{ width = ${spec.dynamic} }: { width?: number }`}) {
  return (
    <div data-slot="scale-card" sx={[${spec.relation ? "card.anchor, " : ""}styles.root${spec.dynamic === null ? "" : ", css({ inlineSize: `${width}%` })"}]}>
      <span data-slot="scale-title" sx={styles.title}>${spec.name}</span>
      <button type="button" data-slot="scale-button" sx={button({ tone: "${spec.tone}", size: "${spec.size}" })}>Open</button>
    </div>
  )
}
`
}

function stylex(spec: Spec): string {
  const root = [
    `display: "${spec.grid ? "grid" : "flex"}"`,
    ...(spec.grid ? [] : [`flexDirection: "column"`]),
    `gap: spacing[${spec.gap}]`,
    spec.breakpoint
      ? `padding: { default: spacing[${spec.padding}], [breakpoint.md]: spacing[8] }`
      : `padding: spacing[${spec.padding}]`,
    `borderRadius: radius.${spec.radius}`,
    `borderWidth: "1px"`,
    `borderStyle: "solid"`,
    `borderColor: theme.border`,
    spec.hover
      ? `backgroundColor: { default: theme.${spec.background}, ":hover": theme.${hoverOf(spec)} }`
      : `backgroundColor: theme.${spec.background}`,
  ]
  const color = spec.muted ? "theme.mutedForeground" : "theme.foreground"
  const marker = `${camel(spec.name.toLowerCase())}Marker`
  const title = [
    `fontSize: fontSize.${spec.text}`,
    `lineHeight: lineHeight.${spec.text}`,
    `fontWeight: fontWeight.${spec.weight}`,
    spec.relation
      ? `color: { default: ${color}, [stylex.when.ancestor(":hover", ${marker})]: theme.primary }`
      : `color: ${color}`,
  ]
  return `import * as stylex from "@stylexjs/stylex"

import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { fontSize, fontWeight, lineHeight } from "@workspace/ui/tokens/typography.stylex"
${spec.relation ? `import { ${marker} } from "./markers.stylex"\n` : ""}
const styles = stylex.create({
  root: { ${root.join(", ")} },
  title: { ${title.join(", ")} },
  width: (inlineSize: string) => ({ inlineSize }),
})

const button = stylex.create({
  base: { display: "inline-flex", alignItems: "center", justifySelf: "start", alignSelf: "flex-start", borderRadius: radius.md, borderWidth: "1px", borderStyle: "solid", fontWeight: fontWeight.medium },
  solid: { borderColor: "transparent", backgroundColor: theme.primary, color: theme.primaryForeground },
  outline: { borderColor: theme.border, backgroundColor: "transparent", color: theme.foreground },
  sm: { height: spacing[8], paddingInline: spacing[3], fontSize: fontSize.xs, lineHeight: lineHeight.xs },
  md: { height: spacing[9], paddingInline: spacing[4], fontSize: fontSize.sm, lineHeight: lineHeight.sm },
})

export default function ${spec.name}(${spec.dynamic === null ? "" : `{ width = ${spec.dynamic} }: { width?: number }`}) {
  return (
    <div data-slot="scale-card" sx={[${spec.relation ? `${marker}, ` : ""}styles.root${spec.dynamic === null ? "" : ", styles.width(`${width}%`)"}]}>
      <span data-slot="scale-title" sx={styles.title}>${spec.name}</span>
      <button type="button" data-slot="scale-button" sx={[button.base, button.${spec.tone}, button.${spec.size}]}>Open</button>
    </div>
  )
}
`
}

const TW_RADIUS = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
}
const TW_TEXT = { sm: "text-sm", base: "text-base", lg: "text-lg" }

function tailwind(spec: Spec): string {
  const group = `group/${spec.name.toLowerCase()}`
  const root = [
    ...(spec.relation ? [group] : []),
    spec.grid ? "grid" : "flex flex-col",
    `gap-${spec.gap}`,
    `p-${spec.padding}`,
    ...(spec.breakpoint ? ["md:p-8"] : []),
    TW_RADIUS[spec.radius],
    "border border-border",
    `bg-${spec.background}`,
    ...(spec.hover ? [`hover:bg-${hoverOf(spec)}`] : []),
  ]
  const title = [
    TW_TEXT[spec.text],
    `font-${spec.weight}`,
    spec.muted ? "text-muted-foreground" : "text-foreground",
    ...(spec.relation
      ? [`group-hover/${spec.name.toLowerCase()}:text-primary`]
      : []),
  ]
  return `import { cva } from "class-variance-authority"

const button = cva(
  "inline-flex items-center justify-self-start self-start rounded-md border font-medium",
  {
    variants: {
      tone: {
        solid: "border-transparent bg-primary text-primary-foreground",
        outline: "border-border bg-transparent text-foreground",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-9 px-4 text-sm",
      },
    },
  }
)

export default function ${spec.name}(${spec.dynamic === null ? "" : `{ width = ${spec.dynamic} }: { width?: number }`}) {
  return (
    <div data-slot="scale-card" className="${root.join(" ")}"${spec.dynamic === null ? "" : " style={{ inlineSize: `${width}%` }}"}>
      <span data-slot="scale-title" className="${title.join(" ")}">${spec.name}</span>
      <button type="button" data-slot="scale-button" className={button({ tone: "${spec.tone}", size: "${spec.size}" })}>Open</button>
    </div>
  )
}
`
}

/** Writes `count` components for every implementation, replacing what was there. */
export function generate(count: number) {
  const specs = Array.from({ length: count }, (_, index) => spec(index))
  const targets: [string, (spec: Spec) => string, boolean][] = [
    ["apps/scale-curve", kirana, false],
    ["baselines/stylex/apps/scale-curve", stylex, true],
    ["baselines/stylex-swc/apps/scale-curve", stylex, true],
    ["baselines/tailwind/apps/scale-curve", tailwind, false],
  ]
  for (const [app, write, markers] of targets) {
    const out = path.join(ROOT, app, "src/generated")
    rmSync(out, { recursive: true, force: true })
    mkdirSync(out, { recursive: true })
    for (const item of specs)
      writeFileSync(path.join(out, `${item.name}.tsx`), write(item))
    if (markers)
      writeFileSync(
        path.join(out, "markers.stylex.ts"),
        `import * as stylex from "@stylexjs/stylex"\n\n` +
          specs
            .filter((item) => item.relation)
            .map(
              (item) =>
                `export const ${camel(item.name.toLowerCase())}Marker = stylex.defineMarker()\n`
            )
            .join("")
      )
  }
  return specs
}

if (import.meta.main) {
  const count = Number(process.argv[2])
  if (!Number.isInteger(count) || count < 1) {
    console.error("usage: bun scripts/scale-curve.ts <components>")
    process.exit(2)
  }
  const specs = generate(count)
  const share = (test: (item: Spec) => boolean) =>
    `${Math.round((specs.filter(test).length / count) * 100)} %`
  console.log(
    `scale-curve: ${count} components; hover ${share((item) => item.hover)}, breakpoint ${share((item) => item.breakpoint)}, relation ${share((item) => item.relation)}, runtime value ${share((item) => item.dynamic !== null)}`
  )
}
