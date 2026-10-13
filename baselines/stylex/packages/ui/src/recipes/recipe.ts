/**
 * Layer 4: recipes. The replacement for `class-variance-authority`.
 *
 * A recipe maps variant props onto styles that StyleX already compiled. It
 * selects from lookup tables — it never builds a style object, so nothing is
 * computed at render time and unused variants are dead code the bundler drops.
 *
 *   const styles = stylex.create({
 *     base: { ... },
 *     primary: { ... },
 *     sm: { ... },
 *   })
 *
 *   export const button = recipe({
 *     base: styles.base,
 *     variants: {
 *       variant: { primary: styles.primary, ghost: styles.ghost },
 *       size: { sm: styles.sm, md: styles.md },
 *     },
 *     defaults: { variant: "primary", size: "md" },
 *   })
 *
 *   <button {...stylex.props(...button({ variant, size }), sx)} />
 *
 * Boolean variants work by keying on `"true"` / `"false"`. Compound variants
 * are intentionally absent: StyleX merges by property with last-one-wins, so
 * appending a conditional style (`isActive && styles.active`) covers the cases
 * cva needed `compoundVariants` for, without a second resolution pass.
 */

import type * as stylex from "@stylexjs/stylex"

/**
 * `CompiledStyles` rather than `StyleXStyles`: this is the shape `stylex.create`
 * returns, and it is what `stylex.props` consumes. `StyleXStyles` is the looser
 * type meant for a component's public style prop, and it rejects namespaces that
 * use `null` inside a conditional value.
 */
type Style = stylex.CompiledStyles

/** A map of variant name → option name → style. */
export type VariantMap = {
  readonly [group: string]: { readonly [option: string]: Style }
}

/** The props a recipe accepts: one optional key per variant group. */
export type RecipeProps<V extends VariantMap> = {
  readonly [G in keyof V]?: keyof V[G]
}

export type RecipeConfig<V extends VariantMap> = {
  /** Always applied, before any variant. */
  readonly base?: Style
  readonly variants: V
  /** Used for any group the caller leaves undefined. */
  readonly defaults?: RecipeProps<V>
}

export type Recipe<V extends VariantMap> = {
  (props?: RecipeProps<V>): Style[]
  /** The underlying tables, for components that need one group in isolation. */
  readonly variants: V
  readonly defaults: RecipeProps<V>
}

export function recipe<const V extends VariantMap>(
  config: RecipeConfig<V>
): Recipe<V> {
  const { base, variants, defaults = {} as RecipeProps<V> } = config
  const groups = Object.keys(variants) as (keyof V)[]

  function resolve(props: RecipeProps<V> = {}): Style[] {
    const styles: Style[] = base ? [base] : []

    for (const group of groups) {
      const option = props[group] ?? defaults[group]
      if (option == null) continue
      const style = variants[group]![option as string]
      if (style) styles.push(style)
    }

    return styles
  }

  return Object.assign(resolve, { variants, defaults })
}

/** The variant props of a recipe, for composing into a component's props. */
export type VariantProps<R extends Recipe<VariantMap>> = RecipeProps<
  R["variants"]
>
