/**
 * Static checks for mistakes StyleX compiles without complaint.
 *
 * Each rule here exists because the bug it catches shipped once, rendered
 * slightly wrong, and was only found by comparing against the Tailwind original.
 * Run with `bun run check:stylex`; it is part of `bun run check`.
 *
 * 1. Markers. A marker read by `stylex.when.*` but never spread onto an element
 *    makes every condition that reads it a silent no-op. A marker spread but
 *    never read, or never used at all, is a relationship the catalogue claims
 *    exists and does not.
 *
 * 2. Variable defaults. A `defineVars` default is substituted on `:root`. If it
 *    reads a variable a library sets on some element further down, with no
 *    fallback, it is invalid there — and an invalid custom property silently
 *    takes every value composed from it along.
 *
 * 3. Marker direction. `when.descendant(sel, m)` compiles to
 *    `:has(.m<sel>)`: the selector and the marker describe the *same* element,
 *    the descendant. The sibling queries work the same way. Putting the marker on
 *    the container instead, which reads naturally, compiles and never matches.
 *    This shipped 36 times before it was caught. For "do I contain X" use a
 *    plain `":has(X)"` key; for "does my ancestor contain X" use
 *    `when.ancestor(":has(X)", m)`. The same goes for
 *    `when.ancestor('[data-slot="card-content"]', cardMarker)` when the marker
 *    sits on the card: a calendar never dropped its background inside one.
 *
 * 4. Breakpoint precedence. In Tailwind, `group-*`, `peer-*`, `hover:` and
 *    `:has` variants carry more specificity than a bare `md:` utility, so they
 *    win at every width. StyleX ranks `@media` and `@container` above
 *    relational and pseudo-class conditions, so the same keys side by side
 *    flip the outcome. The drawer header lost its centring on desktop this way,
 *    and the sidebar's menu action never appeared on hover. Nest the other
 *    conditions inside the breakpoint instead.
 *
 * 5. Custom-property defaults. With `useCSSLayers`, StyleX wraps every priority
 *    group in a cascade layer except the lowest, which holds plain custom
 *    property assignments and `:has()` / `when.*` conditions. Those stay
 *    unlayered, and unlayered rules beat layered ones whatever their
 *    specificity. So `[ctx.x]: { default: a, '[data-size="sm"]': b }` never
 *    applies `b`: the attribute, pseudo-class and `@media` conditions are
 *    layered. Every small Card kept the default spacing this way. Pick the
 *    style in JavaScript, or set the plain value on an ancestor and write the
 *    conditional one with `default: null`.
 *
 * 6. `sx` without the import. On a lowercase element, `sx` is compiled into
 *    `stylex.props(...)`, but the Vite plugin only compiles files whose source
 *    imports `@stylexjs/stylex`. In a file that doesn't, `sx` reaches React as
 *    an unknown attribute and the element renders unstyled, with no type
 *    error. Import `@stylexjs/stylex` or spread `stylex.props` instead.
 */

import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"

const ROOT = join(import.meta.dir, "..")
const SOURCES = [
  "packages/ui/src",
  "packages/shell/src",
  "apps/web/src",
  "apps/blocks/src",
  "apps/examples/src",
]

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return walk(path)
    return /\.(ts|tsx)$/.test(name) ? [path] : []
  })
}

const files = SOURCES.flatMap((dir) => walk(join(ROOT, dir))).map((path) => ({
  path: relative(ROOT, path),
  text: readFileSync(path, "utf8"),
}))

const problems: string[] = []

// --- 1. Markers -------------------------------------------------------------

const markerFile = files.find((f) => f.path.endsWith("theme/markers.stylex.ts"))
if (!markerFile) throw new Error("theme/markers.stylex.ts not found")

const markers = [
  ...markerFile.text.matchAll(/export const (\w+) = stylex\.defineMarker\(\)/g),
].map((m) => m[1] as string)

/** Removes `when.*(…)` calls and import lists, leaving only real applications. */
function stripReadsAndImports(text: string) {
  return text
    .replace(/when\.\w+\((?:[^()]|\([^()]*\))*\)/g, "")
    .replace(/import\s*(?:type\s*)?\{[^}]*\}\s*from\s*"[^"]*"/g, "")
}

for (const marker of markers) {
  let read = false
  let applied = false
  for (const file of files) {
    if (file === markerFile) continue
    const readPattern = new RegExp(
      String.raw`when\.\w+\((?:[^()]|\([^()]*\))*\b${marker}\b(?:[^()]|\([^()]*\))*\)`
    )
    if (readPattern.test(file.text)) read = true
    if (
      new RegExp(String.raw`\b${marker}\b`).test(
        stripReadsAndImports(file.text)
      )
    )
      applied = true
  }
  if (read && !applied)
    problems.push(
      `${marker}: read by stylex.when.* but never applied to an element, so every condition reading it is a no-op`
    )
  else if (applied && !read)
    problems.push(
      `${marker}: applied but never read by stylex.when.*; remove it`
    )
  else if (!applied && !read)
    problems.push(`${marker}: declared but never used; remove it`)
}

// --- 2. Variable defaults ---------------------------------------------------

for (const file of files.filter((f) => f.path.endsWith(".stylex.ts"))) {
  for (const group of file.text.matchAll(
    /export const (\w+) = stylex\.defineVars\(\{([\s\S]*?)\n\}\)/g
  )) {
    const [, name, body] = group as unknown as [string, string, string]
    for (const use of body.matchAll(/var\((--[\w-]+)\s*\)/g)) {
      const line = file.text
        .slice(0, (group.index ?? 0) + (use.index ?? 0))
        .split("\n").length
      problems.push(
        `${file.path}:${line} ${name}: default reads ${use[1]} with no fallback. ` +
          `It resolves on :root, where that variable does not exist. Give it a fallback, ` +
          `or assign the formula on the element that owns the variable.`
      )
    }
  }
}

// --- 3. Marker direction ----------------------------------------------------

/** Every `data-slot` each marker is spread onto, read from the JSX. */
const slotsByMarker = new Map<string, Set<string>>()
for (const file of files) {
  for (const tag of file.text.matchAll(/<[A-Za-z][\w.]*\s[^<>]*?(?:\/>|>)/gs)) {
    const slot = /data-slot="([\w-]+)"/.exec(tag[0])?.[1]
    if (!slot) continue
    for (const marker of markers)
      if (new RegExp(String.raw`\b${marker}\b`).test(tag[0]))
        (
          slotsByMarker.get(marker) ??
          slotsByMarker.set(marker, new Set()).get(marker)!
        ).add(slot)
  }
}

for (const file of files) {
  for (const use of file.text.matchAll(
    /when\.(ancestor|descendant|siblingBefore|siblingAfter|anySibling)\(\s*(["'])((?:(?!\2).)*)\2\s*,\s*(\w+)/gs
  )) {
    const [, fn, , selector, marker] = use as unknown as [
      string,
      string,
      string,
      string,
      string,
    ]
    // An ancestor query's selector describes the ancestor itself unless it is a
    // `:has()`, which is about the ancestor's contents and needs no check.
    const slot = (
      fn === "ancestor" ? /^\[data-slot="([\w-]+)"\]/ : /data-slot="([\w-]+)"/
    ).exec(selector)?.[1]
    if (!slot) continue
    const carriers = slotsByMarker.get(marker)
    if (carriers?.has(slot)) continue
    // A marker only ever applied through a helper leaves no JSX to read.
    if (fn === "ancestor" && !carriers) continue
    const line = file.text.slice(0, use.index).split("\n").length
    problems.push(
      `${file.path}:${line} when.${fn}('${selector}', ${marker}) can never match: ` +
        `${marker} is not on the "${slot}" element${carriers?.size ? ` (it is on ${[...carriers].join(", ")})` : ""}. ` +
        `The marker belongs on the element the selector describes. For "do I contain it" use ":has(...)".`
    )
  }
}

// --- 4. Breakpoint precedence ------------------------------------------------

const BREAKPOINT_KEY =
  /^\s*\[(?:breakpoint|screen|fieldGroupQuery|cardHeaderQuery|container\w*)\.[\w"[\]]+\]\s*:|^\s*["']@(?:media|container)/
const LOSING_KEY = /^\s*\[stylex\.when\.|^\s*["']:(?!:)/

for (const file of files) {
  const lines = file.text.split("\n")
  for (let i = 0; i < lines.length; i++) {
    const open = /^(\s*)\S.*:\s*\{\s*$/.exec(lines[i] as string)
    if (!open) continue
    const childIndent = (open[1] as string).length + 2
    let depth = 1
    let sawBreakpoint = false
    let sawLosing = false
    for (let j = i + 1; j < lines.length && depth > 0; j++) {
      const line = lines[j] as string
      const indent = line.length - line.trimStart().length
      if (depth === 1 && indent === childIndent) {
        // A breakpoint whose value is a nested block is the correct form.
        if (BREAKPOINT_KEY.test(line) && !/\{\s*$/.test(line))
          sawBreakpoint = true
        if (LOSING_KEY.test(line)) sawLosing = true
      }
      depth +=
        (line.match(/\{/g)?.length ?? 0) - (line.match(/\}/g)?.length ?? 0)
    }
    // A namespace (`root: {`) also has children at this indent; only flag values
    // that have a `default` key, which every conditional property value must.
    const body = lines.slice(i + 1, i + 40).join("\n")
    const hasDefault = new RegExp(
      String.raw`^\s{${childIndent}}default:`,
      "m"
    ).test(body)
    if (sawBreakpoint && sawLosing && hasDefault)
      problems.push(
        `${file.path}:${i + 1} mixes a breakpoint with a relational or pseudo-class condition on one property. ` +
          `StyleX lets the breakpoint win; Tailwind let the variant win. Nest the variant inside the breakpoint.`
      )
  }
}

// --- 5. Custom-property defaults --------------------------------------------

/** A custom property key: a `defineVars` member or a raw `--name`. */
const VAR_KEY = /^(\s*)(?:\[\w*[cC]tx\.\w+\]|["']--[\w-]+["'])\s*:\s*\{\s*$/
/** A condition StyleX layers: attribute, pseudo-class other than `:has`, at-rule. */
const LAYERED_KEY =
  /^\s*(?:["']\[|["']:(?!has\()|["']@|\[(?:breakpoint|screen|fieldGroupQuery|cardHeaderQuery|container\w*)\.)/

for (const file of files) {
  const lines = file.text.split("\n")
  for (let i = 0; i < lines.length; i++) {
    const inline =
      /^\s*(?:\[\w*[cC]tx\.\w+\]|["']--[\w-]+["'])\s*:\s*\{(.*)\}\s*,?\s*$/.exec(
        lines[i] as string
      )
    if (inline) {
      const entries = (inline[1] as string).split(/,(?![^([]*[)\]])/)
      const plain = entries.some((e) => /^\s*default:\s*(?!null\b)\S/.test(e))
      if (plain && entries.some((e) => LAYERED_KEY.test(e)))
        problems.push(
          `${file.path}:${i + 1} sets a custom property with a plain default beside a layered condition. ` +
            `StyleX leaves the default outside the cascade layers, so it always wins. ` +
            `Choose the style in JavaScript, or put the plain value on an ancestor and use \`default: null\` here.`
        )
      continue
    }
    const open = VAR_KEY.exec(lines[i] as string)
    if (!open) continue
    const childIndent = (open[1] as string).length + 2
    let plainDefault = false
    let layered = false
    for (let j = i + 1; j < lines.length; j++) {
      const line = lines[j] as string
      const indent = line.length - line.trimStart().length
      if (line.trim() && indent < childIndent) break
      if (indent !== childIndent) continue
      if (/^\s*default:\s*(?!null\b)\S/.test(line)) plainDefault = true
      if (LAYERED_KEY.test(line)) layered = true
    }
    if (plainDefault && layered)
      problems.push(
        `${file.path}:${i + 1} sets a custom property with a plain default beside a layered condition. ` +
          `StyleX leaves the default outside the cascade layers, so it always wins. ` +
          `Choose the style in JavaScript, or put the plain value on an ancestor and use \`default: null\` here.`
      )
  }
}

// --- 6. sx without the import ---------------------------------------------

const STYLEX_IMPORT = /from\s*["']@stylexjs\/stylex["']/
for (const file of files) {
  if (!file.path.endsWith(".tsx") || STYLEX_IMPORT.test(file.text)) continue
  for (const match of file.text.matchAll(/\ssx=\{/g)) {
    // The nearest `<` before the prop opens the tag it belongs to.
    const before = file.text.slice(0, match.index)
    const tag = /^<([A-Za-z][\w.]*)/.exec(before.slice(before.lastIndexOf("<")))
    if (!tag || !/^[a-z]/.test(tag[1] as string)) continue
    problems.push(
      `${file.path}:${before.split("\n").length} uses \`sx\` on an element but never imports @stylexjs/stylex, ` +
        `so the Vite plugin skips the file and the prop is never compiled.`
    )
    break
  }
}

// ---------------------------------------------------------------------------

if (problems.length) {
  console.error(`check-stylex: ${problems.length} problem(s)\n`)
  for (const p of problems) console.error(`  - ${p}`)
  process.exit(1)
}
console.log(
  `check-stylex: ${markers.length} markers and all defineVars defaults are sound`
)
