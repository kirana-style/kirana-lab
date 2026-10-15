/**
 * How many style rules and declarations a stylesheet holds (tier B). A rule is a block whose
 * prelude is a selector, wherever it sits (inside `@media`, `@layer` or nesting); an at-rule's own
 * block is not one. A declaration is a `property: value` inside a rule. Comments and strings are
 * skipped, so a `{` or `;` inside them counts for nothing.
 */
export type CssCount = { rules: number; declarations: number }

export function countCss(css: string): CssCount {
  let rules = 0
  let declarations = 0
  /** For each open block, whether it is a style rule. */
  const stack: boolean[] = []
  let prelude = ""
  /** Whether the current declaration has seen a `:` and some value. */
  let inDeclaration = false
  let i = 0

  const endDeclaration = () => {
    if (inDeclaration && stack.at(-1)) declarations++
    inDeclaration = false
    prelude = ""
  }

  while (i < css.length) {
    const char = css[i]!
    if (char === "/" && css[i + 1] === "*") {
      const end = css.indexOf("*/", i + 2)
      i = end < 0 ? css.length : end + 2
      continue
    }
    if (char === '"' || char === "'") {
      let j = i + 1
      while (j < css.length && css[j] !== char) j += css[j] === "\\" ? 2 : 1
      prelude += css.slice(i, j + 1)
      i = j + 1
      continue
    }
    if (char === "{") {
      const rule = !prelude.trim().startsWith("@")
      if (rule) rules++
      stack.push(rule)
      prelude = ""
      inDeclaration = false
    } else if (char === "}") {
      endDeclaration()
      stack.pop()
    } else if (char === ";") {
      endDeclaration()
    } else {
      prelude += char
      if (char === ":" && stack.at(-1)) inDeclaration = true
    }
    i++
  }
  return { rules, declarations }
}
