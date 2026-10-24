/**
 * Browser conformance (KRN-TEST-006): compares computed styles — never screenshots — of the same
 * page served by two implementations.
 *
 *   bun conformance/compare.ts --actual http://localhost:3000 --expected http://localhost:3301 \
 *     [--label stylex] [--out conformance/output/stylex.json] \
 *     [--crawl | --paths /a,/b] [--shard 1/3] [--concurrency 4]
 *
 * With `--crawl` the routes come from the expected app itself: every same-origin link on its index
 * page, plus every iframe those pages embed (`/view/<name>`), so the list is never hand-kept.
 * `--shard i/n` compares every n-th route of the sorted list, for parallel CI jobs. Each route is
 * loaded once per implementation; widths and colour schemes are then switched in place.
 *
 * `--port-of <url>` names the implementation the actual one was ported from (the StyleX port, when
 * comparing Kirana with the Tailwind original). It is captured too, and a difference it shows with
 * the same value is counted as inherited, not unexpected: against the original, Kirana may differ
 * only where the port it was made from already did.
 *
 * `--original <url>` is the mirror, for comparing Kirana with the StyleX port: a difference where
 * Kirana matches the original is listed as `corrected` (the port was wrong) instead of failing.
 * A route with differences is captured a second time, and only differences seen both times count.
 *
 * `--expected-path <from>=<to>` is URL-pair mode, for two sites that serve the same page under
 * different paths: each route is loaded as it is from the actual site and with `<from>` replaced by
 * `<to>` from the expected one (and the arbiter), as kirana-ui compares its preview pages with
 * shadcn/ui's: `--expected-path /preview/react/base/=/preview/base/`. `--expected-differences
 * <file>` reads the reviewed exceptions from that project's own list instead of this one's.
 * `--trigger <state>=<selector>`, repeatable, names a state's trigger where both sites mark it
 * differently from these apps: React Aria's `DialogTrigger` renders no element, so its dialog opens
 * from the button inside (`--trigger 'dialog-open=[data-slot="example-content"] button'`).
 *
 * Elements are paired by tag and `data-slot` in DOM order, re-synchronising across elements only
 * one side renders. Every listed property is compared at 1400, 900 and 390 px in light and dark
 * colour schemes; `::before` and `::after` are compared when they render. Colours are normalised
 * through a `color-mix(in srgb, …)` probe and compared with a 2/255 tolerance; lengths with 0.5 px.
 * Differences listed in `expected-differences.json` are reported but do not fail the run.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { chromium } from "playwright"
import type { Browser, Locator, Page } from "playwright"

const PROPERTIES = [
  "display",
  "position",
  "box-sizing",
  "width",
  "height",
  "min-width",
  "min-height",
  "max-width",
  "max-height",
  "top",
  "right",
  "bottom",
  "left",
  "margin-top",
  "margin-right",
  "margin-bottom",
  "margin-left",
  "padding-top",
  "padding-right",
  "padding-bottom",
  "padding-left",
  "border-top-width",
  "border-right-width",
  "border-bottom-width",
  "border-left-width",
  "border-top-style",
  "border-right-style",
  "border-bottom-style",
  "border-left-style",
  "border-top-color",
  "border-right-color",
  "border-bottom-color",
  "border-left-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-bottom-right-radius",
  "border-bottom-left-radius",
  "outline-style",
  "outline-width",
  "outline-color",
  "outline-offset",
  "background-color",
  "background-image",
  "color",
  "opacity",
  "box-shadow",
  "filter",
  "backdrop-filter",
  "mix-blend-mode",
  "transform",
  // Motion, as declared. `animation-name` is deliberately absent: it is a hash that differs
  // between the builds by construction, and what it names is compared by `--motion`.
  "transition-property",
  "transition-duration",
  "transition-timing-function",
  "transition-delay",
  "animation-duration",
  "animation-timing-function",
  "animation-delay",
  "animation-iteration-count",
  "animation-direction",
  "animation-fill-mode",
  "translate",
  "scale",
  "rotate",
  "font-family",
  "font-size",
  "font-weight",
  "line-height",
  "letter-spacing",
  "text-align",
  "text-transform",
  "text-decoration-line",
  "text-decoration-color",
  "text-underline-offset",
  "text-wrap-mode",
  "text-wrap-style",
  "white-space",
  "text-overflow",
  "overflow-x",
  "overflow-y",
  "flex-direction",
  "flex-wrap",
  "flex-grow",
  "flex-shrink",
  "flex-basis",
  "align-items",
  "align-self",
  "justify-content",
  "justify-items",
  "row-gap",
  "column-gap",
  "grid-template-columns",
  "grid-template-rows",
  "grid-column-start",
  "grid-column-end",
  "grid-row-start",
  "grid-row-end",
  "order",
  "z-index",
  "cursor",
  "pointer-events",
  "user-select",
  "visibility",
  "aspect-ratio",
  "object-fit",
  "fill",
  "stroke",
  "stroke-width",
  "color-scheme",
  "list-style-type",
  "vertical-align",
]
const PSEUDO_PROPERTIES = [
  "content",
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "width",
  "height",
  "background-color",
  "border-top-width",
  "border-top-style",
  "border-top-color",
  "border-top-left-radius",
  "mix-blend-mode",
  "opacity",
]
const WIDTHS = [1400, 900, 390]
const SCHEMES = ["light", "dark"] as const

type Snapshot = {
  key: string
  props: Record<string, string>
  /** Where the element is drawn: the geometry behind a margin Chrome reports as `auto` or used. */
  box?: { x: number; width: number }
  before?: Record<string, string>
  after?: Record<string, string>
}
type Motion = {
  key: string
  kind: string
  property: string
  timing: string
  keyframes: string
}

type Difference = {
  route: string
  width: number
  scheme: string
  element: string
  property: string
  actual: string
  expected: string
}

/**
 * Interactive states compared with `--states` (all of them, or a comma-separated list): each opens an
 * overlay, highlights a row or moves focus the way a person would, then every `[data-slot]` —
 * portals included — is compared again. Motion is reduced and the page settles before reading.
 */
type State = {
  /** The element acted on: this selector's first match, or the `nth` one. */
  trigger: string
  nth?: number
  act: (trigger: Locator, page: Page) => Promise<unknown>
}
const hover: State["act"] = (trigger) => trigger.hover()
const click: State["act"] = (trigger) => trigger.click()
const slot = (name: string) => `[data-slot="${name}"]`
const STATES: Record<string, State> = {
  "button-hovered": { trigger: slot("button"), act: hover },
  "input-focused": {
    trigger: slot("input-group-control"),
    act: (trigger) => trigger.focus(),
  },
  "tooltip-open": { trigger: slot("tooltip-trigger"), act: hover },
  "hover-card-open": { trigger: slot("hover-card-trigger"), act: hover },
  "dropdown-open": { trigger: slot("dropdown-menu-trigger"), act: click },
  "dropdown-row-highlighted": {
    trigger: slot("dropdown-menu-trigger"),
    act: async (trigger, page) => {
      await trigger.click()
      await page.waitForTimeout(300)
      await page.keyboard.press("ArrowDown")
    },
  },
  "context-menu-open": {
    trigger: slot("context-menu-trigger"),
    act: (trigger) => trigger.click({ button: "right" }),
  },
  "popover-open": { trigger: slot("popover-trigger"), act: click },
  "dialog-open": { trigger: slot("dialog-trigger"), act: click },
  "alert-dialog-open": { trigger: slot("alert-dialog-trigger"), act: click },
  "sheet-open": { trigger: slot("sheet-trigger"), act: click },
  "drawer-open": { trigger: slot("drawer-trigger"), act: click },
  "accordion-toggled": {
    trigger: slot("accordion-trigger"),
    nth: 1,
    act: click,
  },
  "tab-switched": { trigger: slot("tabs-trigger"), nth: 1, act: click },
  "collapsible-open": { trigger: slot("collapsible-trigger"), act: click },
  "menubar-open": { trigger: slot("menubar-trigger"), act: click },
  "navigation-menu-open": {
    trigger: slot("navigation-menu-trigger"),
    act: hover,
  },
  "select-open": { trigger: slot("select-trigger"), act: click },
  "combobox-open": { trigger: slot("combobox-trigger"), act: click },
  "sidebar-toggled": { trigger: slot("sidebar-trigger"), act: click },
}

function argument(name: string, fallback?: string): string {
  const index = process.argv.indexOf(`--${name}`)
  const value = index >= 0 ? process.argv[index + 1] : fallback
  if (value === undefined) throw new Error(`missing --${name}`)
  return value
}

async function snapshot(page: Page): Promise<Snapshot[]> {
  return page.evaluate(
    ({ properties, pseudoProperties }) => {
      // Finite animations jump to their end state; endless ones (a spinner) to their first frame,
      // so both implementations are read at the same moment.
      for (const animation of document.getAnimations()) {
        if (animation.effect?.getComputedTiming().iterations === Infinity) {
          animation.pause()
          animation.currentTime = 0
        } else {
          animation.finish()
        }
      }
      const probe = document.createElement("div")
      probe.style.display = "none"
      document.body.append(probe)
      const colour = (value: string) =>
        value.replace(
          /(?:rgba?|hsla?|oklch|oklab|lab|lch|color|light-dark)\((?:[^()]|\([^()]*\))*\)|transparent|currentcolor/gi,
          (match) => {
            probe.style.color = ""
            probe.style.color = `color-mix(in srgb, ${match} 100%, transparent)`
            return getComputedStyle(probe).color
          }
        )
      const read = (style: CSSStyleDeclaration, list: string[]) =>
        Object.fromEntries(
          list.map((property) => [
            property,
            colour(style.getPropertyValue(property)),
          ])
        )
      const counts = new Map<string, number>()
      return [...document.querySelectorAll<HTMLElement>("[data-slot]")].map(
        (element) => {
          const base = `${element.tagName.toLowerCase()}[data-slot="${element.dataset.slot}"]`
          const count = (counts.get(base) ?? 0) + 1
          counts.set(base, count)
          const before = getComputedStyle(element, "::before")
          const after = getComputedStyle(element, "::after")
          const rect = element.getBoundingClientRect()
          return {
            key: `${base}#${count}`,
            props: read(getComputedStyle(element), properties),
            box: { x: rect.x, width: rect.width },
            before:
              before.content !== "none"
                ? read(before, pseudoProperties)
                : undefined,
            after:
              after.content !== "none"
                ? read(after, pseudoProperties)
                : undefined,
          }
        }
      )
    },
    { properties: PROPERTIES, pseudoProperties: PSEUDO_PROPERTIES }
  )
}

/**
 * What each element's motion is, as data the two builds can be held to.
 *
 * The static comparison already reads `transition-*` and `animation-duration` and the rest — they
 * are computed values like any other. The one thing it cannot compare is what an animation
 * animates: `animation-name` is a hashed name that differs between the builds by construction, so
 * the comparison has to skip it, and with it goes every `@keyframes` body in the stylesheet.
 *
 * This reads the name back to its keyframes and compares those. Sampling a property every frame was
 * the other option and it is the wrong one: frame timing under CI load makes two runs of the *same*
 * build disagree, while a keyframes body is the whole curve and is identical every time.
 */
async function motion(page: Page): Promise<Motion[]> {
  return page.evaluate(() => {
    const probe = document.createElement("div")
    probe.style.display = "none"
    document.body.append(probe)
    const colour = (value: string) =>
      value.replace(
        /(?:rgba?|hsla?|oklch|oklab|lab|lch|color|light-dark)\((?:[^()]|\([^()]*\))*\)|transparent|currentcolor/gi,
        (match) => {
          probe.style.color = ""
          probe.style.color = `color-mix(in srgb, ${match} 100%, transparent)`
          return getComputedStyle(probe).color
        }
      )

    // Every `@keyframes` in the document, by name, as normalised text.
    const bodies = new Map<string, string>()
    const walk = (rules: CSSRuleList) => {
      for (const rule of rules) {
        if (rule instanceof CSSKeyframesRule) {
          bodies.set(
            rule.name,
            [...rule.cssRules]
              .map((frame) => {
                const step = frame as CSSKeyframeRule
                return `${step.keyText}{${colour(step.style.cssText)}}`
              })
              .join("")
          )
        } else if ((rule as CSSGroupingRule).cssRules) {
          walk((rule as CSSGroupingRule).cssRules)
        }
      }
    }
    for (const sheet of document.styleSheets) {
      try {
        walk(sheet.cssRules)
      } catch {
        // A stylesheet from another origin cannot be read; neither build has one.
      }
    }

    const counts = new Map<string, number>()
    const out: Motion[] = []
    for (const element of document.querySelectorAll<HTMLElement>(
      "[data-slot]"
    )) {
      const base = `${element.tagName.toLowerCase()}[data-slot="${element.dataset.slot}"]`
      const count = (counts.get(base) ?? 0) + 1
      counts.set(base, count)
      const style = getComputedStyle(element)
      // `animation-*` are comma-separated lists, and the values themselves contain commas
      // (`cubic-bezier(0.4, 0, 0.6, 1)`), so the split has to respect parentheses.
      const parts = (value: string) => {
        const list: string[] = []
        let depth = 0
        let current = ""
        for (const character of value) {
          if (character === "(") depth++
          if (character === ")") depth--
          if (character === "," && depth === 0) {
            list.push(current.trim())
            current = ""
          } else current += character
        }
        list.push(current.trim())
        return list
      }
      const names = parts(style.animationName).filter(
        (name) => name && name !== "none"
      )
      names.forEach((name, index) => {
        const at = (property: string) =>
          parts(style.getPropertyValue(property))[index] ?? ""
        out.push({
          key: `${base}#${count}`,
          kind: "animation",
          property: String(index),
          timing: [
            at("animation-duration"),
            at("animation-timing-function"),
            at("animation-delay"),
            at("animation-iteration-count"),
            at("animation-direction"),
            at("animation-fill-mode"),
          ].join(" "),
          // The name differs between builds by design; what it names must not.
          keyframes: bodies.get(name) ?? "(no keyframes)",
        })
      })
    }
    probe.remove()
    return out.sort((a, b) =>
      `${a.key}${a.property}`.localeCompare(`${b.key}${b.property}`)
    )
  })
}

/**
 * Compares motion, pairing by element, kind and property.
 *
 * A transition only exists while it runs, so the caller drives a state first; an animation is there
 * from the start. Either way one side having motion the other does not is the difference worth
 * finding — a `transition-property` that lost its value in a merge shows up here and nowhere else.
 */
function compareMotion(
  actual: Motion[],
  expected: Motion[],
  route: string,
  state: string
): Difference[] {
  const differences: Difference[] = []
  const key = (entry: Motion) => `${entry.key}|${entry.kind}|${entry.property}`
  const expectedByKey = new Map(expected.map((entry) => [key(entry), entry]))
  const actualByKey = new Map(actual.map((entry) => [key(entry), entry]))
  const shared = { route, width: WIDTHS[0]!, scheme: SCHEMES[0]! }
  for (const entry of actual) {
    const other = expectedByKey.get(key(entry))
    if (!other) {
      differences.push({
        ...shared,
        element: `${entry.key} ${state}`,
        property: `motion:${entry.property}`,
        actual: entry.timing,
        expected: "(no animation)",
      })
      continue
    }
    for (const field of ["timing", "keyframes"] as const) {
      if (entry[field] !== other[field]) {
        differences.push({
          ...shared,
          element: `${entry.key} ${state}`,
          property: `motion:${entry.property}:${field}`,
          actual: entry[field],
          expected: other[field],
        })
      }
    }
  }
  for (const entry of expected) {
    if (!actualByKey.has(key(entry))) {
      differences.push({
        ...shared,
        element: `${entry.key} ${state}`,
        property: `motion:${entry.property}`,
        actual: "(no animation)",
        expected: entry.timing,
      })
    }
  }
  return differences
}

function numbers(value: string): number[] {
  return [...value.matchAll(/-?\d*\.?\d+(?:e-?\d+)?/g)].map((match) =>
    Number(match[0])
  )
}

/** Equal within 2/255 per colour channel and 0.5 px per length. */
function same(actual: string, expected: string): boolean {
  if (actual === expected) return true
  const skeleton = (value: string) =>
    value.replace(/-?\d*\.?\d+(?:e-?\d+)?/g, "#")
  if (skeleton(actual) !== skeleton(expected)) return false
  const a = numbers(actual)
  const b = numbers(expected)
  const isColour = /rgb|color\(/.test(actual)
  return a.every(
    (value, index) =>
      Math.abs(value - b[index]!) <= (isColour && value > 1 ? 2 : 0.5) + 1e-6
  )
}

const ZERO_SHADOW =
  /(?:rgba?\([^)]*\)|color\([^)]*\))\s+0px 0px 0px 0px(?:,\s*)?/g

/**
 * The harmless differences `docs/workflows.md` documents for this repository, as rules: a colour
 * that draws nothing, Tailwind's empty shadow slots, equivalent keywords, sub-pixel line boxes.
 */
function harmless(
  property: string,
  left: Record<string, string>,
  right: Record<string, string>
): boolean {
  const side = property.match(/^border-(top|right|bottom|left)-color$/)?.[1]
  if (side)
    return (
      left[`border-${side}-width`] === "0px" &&
      right[`border-${side}-width`] === "0px"
    )
  if (property === "outline-color")
    return left["outline-style"] === "none" && right["outline-style"] === "none"
  if (property === "text-decoration-color") {
    return (
      left["text-decoration-line"] === "none" &&
      right["text-decoration-line"] === "none"
    )
  }
  if (property === "color-scheme") return true
  if (property === "box-shadow") {
    const clean = (value: string) =>
      value.replace(ZERO_SHADOW, "").replace(/,\s*$/, "").trim() || "none"
    return same(clean(left[property]!), clean(right[property]!))
  }
  const equivalent = (value: string) =>
    ({ "flex-start": "start", "flex-end": "end", normal: "0px" })[value] ??
    value
  if (equivalent(left[property]!) === equivalent(right[property]!)) return true
  if (property === "height" || property === "grid-template-rows") {
    const a = numbers(left[property]!)
    const b = numbers(right[property]!)
    return (
      a.length === b.length &&
      a.every((value, index) => Math.abs(value - b[index]!) < 1)
    )
  }
  return false
}

function compare(
  actual: Snapshot[],
  expected: Snapshot[],
  width: number,
  scheme: string,
  route = "/"
): Difference[] {
  const differences: Difference[] = []
  const expectedByKey = new Map(expected.map((entry) => [entry.key, entry]))
  for (const entry of actual) {
    const other = expectedByKey.get(entry.key)
    if (!other) {
      differences.push({
        route,
        width,
        scheme,
        element: entry.key,
        property: "(element)",
        actual: "present",
        expected: "missing",
      })
      continue
    }
    for (const [group, left, right] of [
      ["", entry.props, other.props],
      ["::before ", entry.before, other.before],
      ["::after ", entry.after, other.after],
    ] as const) {
      if (!left && !right) continue
      if (!left || !right) {
        differences.push({
          route,
          width,
          scheme,
          element: entry.key,
          property: `${group}(pseudo)`,
          actual: left ? "rendered" : "none",
          expected: right ? "rendered" : "none",
        })
        continue
      }
      for (const property of Object.keys(left)) {
        // An `auto` inline margin reads as its used value once the element is restyled after
        // layout, and as `0px` before: where the element is drawn in the same place, it is the same.
        const inlineMargin =
          property === "margin-left" || property === "margin-right"
        const drawnAlike =
          group === "" &&
          entry.box !== undefined &&
          other.box !== undefined &&
          Math.abs(entry.box.x - other.box.x) < 0.5 &&
          Math.abs(entry.box.width - other.box.width) < 0.5
        if (
          !same(left[property]!, right[property]!) &&
          !harmless(property, left, right) &&
          !(inlineMargin && drawnAlike)
        ) {
          differences.push({
            route,
            width,
            scheme,
            element: entry.key,
            property: `${group}${property}`,
            actual: left[property]!,
            expected: right[property]!,
          })
        }
      }
    }
  }
  for (const entry of expected) {
    if (!actual.some((candidate) => candidate.key === entry.key)) {
      differences.push({
        route,
        width,
        scheme,
        element: entry.key,
        property: "(element)",
        actual: "missing",
        expected: "present",
      })
    }
  }
  return differences
}

/** A difference without its values, to match it across two captures. */
function identity(difference: Difference): string {
  return [
    difference.route,
    difference.width,
    difference.scheme,
    difference.element,
    difference.property,
  ].join("\u0000")
}

/**
 * Settles a page: network idle, then until the number of `[data-slot]` elements holds still for half
 * a second (lazy routes and hydration add them late, most of all under load), then a pause for fonts
 * and effects.
 */
async function settle(page: Page, pause = 300) {
  await page.waitForLoadState("networkidle").catch(() => {})
  const count = () =>
    page.evaluate(() => document.querySelectorAll("[data-slot]").length)
  let previous = -1
  let steady = 0
  for (let tries = 0; tries < 20 && steady < 2; tries++) {
    const current = await count()
    steady = current === previous ? steady + 1 : 0
    previous = current
    await page.waitForTimeout(250)
  }
  await page.waitForTimeout(pause)
}

/** A route as compared: path and query, without the viewer's `theme` parameter. */
function routeOf(href: string, origin: string): string | undefined {
  const url = new URL(href, origin)
  if (url.origin !== new URL(origin).origin) return undefined
  if (/\.[a-z0-9]+$/i.test(url.pathname)) return undefined
  url.searchParams.delete("theme")
  return url.pathname + url.search
}

async function pool<T>(
  items: T[],
  concurrency: number,
  work: (item: T) => Promise<void>
) {
  let next = 0
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, async () => {
      while (next < items.length) await work(items[next++]!)
    })
  )
}

/** Every same-origin link on the index page, plus the iframes those pages embed. */
async function crawl(
  browser: Browser,
  origin: string,
  concurrency: number
): Promise<string[]> {
  const page = await browser.newPage()
  await page.goto(new URL("/", origin).href, { waitUntil: "networkidle" })
  const links = await page.$$eval("a[href]", (anchors) =>
    anchors.map((anchor) => anchor.getAttribute("href")!)
  )
  await page.close()
  const routes = new Set(["/"])
  for (const href of links) {
    const route = routeOf(href, origin)
    if (route) routes.add(route)
  }
  await pool([...routes], concurrency, async (route) => {
    const inner = await browser.newPage({
      viewport: { width: WIDTHS[0]!, height: 900 },
    })
    await inner.goto(new URL(route, origin).href, { waitUntil: "networkidle" })
    await settle(inner, 300)
    const frames = await inner.$$eval("iframe[src]", (list) =>
      list.map((frame) => frame.getAttribute("src")!)
    )
    await inner.close()
    for (const src of frames) {
      const frame = routeOf(src, origin)
      if (frame) routes.add(frame)
    }
  })
  return [...routes].sort()
}

/**
 * A page after one interaction, from a fresh load, read in every colour scheme: the scheme switches in
 * place, so the overlay or menu the action opened stays open.
 */
async function captureState(
  browser: Browser,
  url: string,
  state: State
): Promise<Map<string, Snapshot[]>> {
  const page = await browser.newPage({
    viewport: { width: WIDTHS[0]!, height: 900 },
    colorScheme: SCHEMES[0],
    reducedMotion: "reduce",
  })
  try {
    await page.goto(url, { waitUntil: "networkidle" })
    await settle(page)
    await state.act(page.locator(state.trigger).nth(state.nth ?? 0), page)
    await page.waitForTimeout(400)
    const snapshots = new Map<string, Snapshot[]>()
    for (const scheme of SCHEMES) {
      await page.emulateMedia({ colorScheme: scheme })
      // As at rest: an app whose theme follows the scheme from JavaScript (a `.dark` class set by a
      // media listener) has not repainted yet, and one build caught mid-switch reads as the other
      // scheme on every element.
      await page.waitForTimeout(350)
      snapshots.set(scheme, await snapshot(page))
    }
    return snapshots
  } finally {
    await page.close()
  }
}

/**
 * Motion on one page: what animates at rest, and what a hover starts.
 *
 * `reducedMotion` is deliberately *not* set here — the static comparison reduces motion so that
 * both builds settle identically, and this one needs the animations the page actually declares.
 */
async function captureMotion(
  browser: Browser,
  url: string
): Promise<{ rest: Motion[]; hover: Motion[] }> {
  const page = await browser.newPage({
    viewport: { width: WIDTHS[0]!, height: 900 },
    colorScheme: SCHEMES[0],
  })
  try {
    await page.goto(url, { waitUntil: "networkidle" })
    await settle(page)
    const rest = await motion(page)
    // Hovering brings out animations a state declares — a spinner inside a pressed button, an
    // overlay's entrance. Both builds carry the same markup, so it is the same element in both.
    const target = page.locator("button, a, [role='button']").first()
    await target.hover({ force: true, timeout: 5000 }).catch(() => {})
    const hovered = await motion(page)
    return { rest, hover: hovered }
  } finally {
    await page.close()
  }
}

/** The states whose trigger a page has, from one load. */
async function reachable(
  browser: Browser,
  url: string,
  states: [string, State][]
): Promise<Set<string>> {
  const page = await browser.newPage({
    viewport: { width: WIDTHS[0]!, height: 900 },
  })
  try {
    await page.goto(url, { waitUntil: "networkidle" })
    await settle(page)
    const found = new Set<string>()
    for (const [name, state] of states)
      if ((await page.locator(state.trigger).count()) > (state.nth ?? 0))
        found.add(name)
    return found
  } finally {
    await page.close()
  }
}

/**
 * One implementation's snapshots of a route at every width and scheme. The page loads once; the
 * viewport and `prefers-color-scheme` then change in place. Uncaught page errors are recorded.
 */
async function capture(browser: Browser, url: string) {
  const page = await browser.newPage({
    viewport: { width: WIDTHS[0]!, height: 900 },
    colorScheme: SCHEMES[0],
    reducedMotion: "reduce",
  })
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  const response = await page.goto(url, { waitUntil: "networkidle" })
  await settle(page)
  const snapshots = new Map<string, Snapshot[]>()
  for (const scheme of SCHEMES) {
    await page.emulateMedia({ colorScheme: scheme })
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 })
      await page.waitForTimeout(350)
      snapshots.set(`${scheme} ${width}`, await snapshot(page))
    }
  }
  await page.close()
  return { status: response?.status() ?? 0, errors, snapshots }
}

/**
 * Whether a third implementation agrees with the actual one on a difference: the same element
 * state, or the same value. With `--port-of` that difference is inherited; with `--original` the
 * actual build is the accurate one and the baseline is wrong.
 */
function sharedWithPort(
  difference: Difference,
  port: Map<string, Snapshot>
): boolean {
  const entry = port.get(difference.element)
  if (difference.property === "(element)")
    return (entry !== undefined) === (difference.actual === "present")
  if (!entry) return false
  const [, pseudo, property] =
    difference.property.match(/^(?:(::before|::after) )?(.*)$/) ?? []
  const values =
    pseudo === "::before"
      ? entry.before
      : pseudo === "::after"
        ? entry.after
        : entry.props
  if (property === "(pseudo)")
    return (values !== undefined) === (difference.actual === "rendered")
  const value = values?.[property!]
  return value !== undefined && same(value, difference.actual)
}

export async function main() {
  const actualUrl = argument("actual")
  const expectedUrl = argument("expected")
  const [pathFrom, pathTo] = process.argv.includes("--expected-path")
    ? argument("expected-path").split("=")
    : []
  /** A route's URL on one of the sites: the expected one and the arbiter take URL-pair mode's path. */
  const at = (url: string, route: string) =>
    new URL(
      url === actualUrl || pathFrom === undefined
        ? route
        : route.replace(pathFrom, pathTo ?? ""),
      url
    ).href
  const label = argument("label", "baseline")
  const out = argument(
    "out",
    path.join(import.meta.dirname, "output", `${label}.json`)
  )
  const concurrency = Number(argument("concurrency", "4"))
  const portUrl = process.argv.includes("--port-of")
    ? argument("port-of")
    : undefined
  const originalUrl = process.argv.includes("--original")
    ? argument("original")
    : undefined
  let inherited = 0
  const corrected: Difference[] = []

  /** One route compared once: differences, and those the port shares or the original confirms. */
  async function compareRoute(route: string) {
    const [actual, expected] = await Promise.all([
      capture(browser, at(actualUrl, route)),
      capture(browser, at(expectedUrl, route)),
    ])
    // The arbiter is loaded only for a route that differs.
    const arbiter = portUrl ?? originalUrl
    const differs =
      actual.status !== expected.status ||
      actual.errors.length > expected.errors.length ||
      [...actual.snapshots].some(
        ([key, snapshots]) =>
          compare(snapshots, expected.snapshots.get(key)!, 0, "").length > 0
      )
    const third =
      arbiter && differs
        ? await capture(browser, at(arbiter, route))
        : undefined
    const result = {
      differences: [] as Difference[],
      inherited: 0,
      corrected: [] as Difference[],
    }
    const sort = (difference: Difference, agrees: boolean) => {
      if (agrees && portUrl) result.inherited++
      else if (agrees) result.corrected.push(difference)
      else result.differences.push(difference)
    }
    if (
      actual.status !== expected.status ||
      actual.errors.length > expected.errors.length
    ) {
      sort(
        {
          route,
          width: 0,
          scheme: "-",
          element: "(page)",
          property: "(load)",
          actual: [actual.status, ...actual.errors].join(" | "),
          expected: [expected.status, ...expected.errors].join(" | "),
        },
        third !== undefined &&
          third.status === actual.status &&
          third.errors.length >= actual.errors.length
      )
    }
    for (const scheme of SCHEMES) {
      for (const width of WIDTHS) {
        const key = `${scheme} ${width}`
        const others =
          third &&
          new Map(third.snapshots.get(key)!.map((entry) => [entry.key, entry]))
        for (const difference of compare(
          actual.snapshots.get(key)!,
          expected.snapshots.get(key)!,
          width,
          scheme,
          route
        ))
          sort(
            difference,
            others !== undefined && sharedWithPort(difference, others)
          )
      }
    }
    return result
  }
  const expectedList: {
    element: string
    /** One property, or `*` for every property of that element. */
    property: string
    reason: string
    /** A regular expression the route must match; every route when absent. */
    route?: string
  }[] =
    JSON.parse(
      readFileSync(
        process.argv.includes("--expected-differences")
          ? path.resolve(argument("expected-differences"))
          : path.join(import.meta.dirname, "expected-differences.json"),
        "utf8"
      )
    )[label] ?? []
  // Playwright's bundled Chromium by default; KIRANA_CHROME_CHANNEL=chrome uses an installed Chrome.
  const browser = await chromium.launch({
    channel: process.env.KIRANA_CHROME_CHANNEL || undefined,
  })
  for (const [index, flag] of process.argv.entries()) {
    if (flag !== "--trigger") continue
    const given = process.argv[index + 1] ?? ""
    const name = given.slice(0, given.indexOf("="))
    if (!STATES[name]) throw new Error(`--trigger: no state named ${name}`)
    STATES[name] = { ...STATES[name], trigger: given.slice(name.length + 1) }
  }
  const flag = process.argv.indexOf("--states")
  const requested = flag < 0 ? undefined : (process.argv[flag + 1] ?? "all")
  const given = new URL(actualUrl)
  let routes = process.argv.includes("--crawl")
    ? await crawl(browser, expectedUrl, concurrency)
    : process.argv.includes("--paths")
      ? argument("paths").split(",")
      : [given.pathname + given.search]
  if (process.argv.includes("--shard")) {
    const [index, count] = argument("shard").split("/").map(Number)
    routes = routes.filter((_, position) => position % count! === index! - 1)
  }
  const all: Difference[] = []
  // How many animations and transitions the motion pass actually compared: a pass that found none
  // and reported no differences is not a pass, and the number is how you tell them apart.
  let motions = 0
  type RouteResult = {
    differences: Difference[]
    inherited: number
    corrected: Difference[]
  }
  /**
   * Compares a route and records the result. Timing under load can move a layout, or leave part of
   * a page unrendered, for one reading: a difference or a correction counts only when a second
   * comparison of the route shows it again.
   */
  const confirmed = async (
    route: string,
    run: (route: string) => Promise<RouteResult>
  ) => {
    let result = await run(route)
    if (result.differences.length || result.corrected.length) {
      const again = await run(route)
      const seen = new Set(again.differences.map(identity))
      const reseen = new Set(again.corrected.map(identity))
      result = {
        ...again,
        differences: result.differences.filter((difference) =>
          seen.has(identity(difference))
        ),
        corrected: result.corrected.filter((difference) =>
          reseen.has(identity(difference))
        ),
      }
    }
    all.push(...result.differences)
    inherited += result.inherited
    corrected.push(...result.corrected)
  }
  if (process.argv.includes("--motion")) {
    // Motion is its own pass: it needs animations left running, which every other comparison stops.
    await pool(routes, concurrency, async (route) => {
      const [actual, expected] = await Promise.all(
        [actualUrl, expectedUrl].map((url) =>
          captureMotion(browser, at(url, route)).catch(() => undefined)
        )
      )
      if (!actual || !expected) {
        all.push({
          route,
          width: WIDTHS[0]!,
          scheme: SCHEMES[0]!,
          element: "(page)",
          property: "(motion)",
          actual: actual ? "read" : "failed",
          expected: expected ? "read" : "failed",
        })
        return
      }
      motions += actual.rest.length + actual.hover.length
      const differences = [
        ...compareMotion(actual.rest, expected.rest, route, "at rest"),
        ...compareMotion(actual.hover, expected.hover, route, "hovered"),
      ]
      if (differences.length === 0) return
      // The same arbitration the static comparison uses: a difference where this build agrees with
      // the third one is the port's mistake, not this build's.
      const arbiter = portUrl ?? originalUrl
      const third = arbiter
        ? await captureMotion(browser, at(arbiter, route)).catch(
            () => undefined
          )
        : undefined
      const byKey = new Map(
        [...(third?.rest ?? []), ...(third?.hover ?? [])].map((entry) => [
          `${entry.key}|${entry.kind}|${entry.property}`,
          entry,
        ])
      )
      for (const difference of differences) {
        const [key, field] = [
          difference.element.replace(/ (at rest|hovered)$/, ""),
          difference.property.split(":").at(-1)!,
        ]
        const other = byKey.get(
          `${key}|animation|${difference.property.split(":")[1]}`
        )
        const agrees =
          other !== undefined &&
          (field === "timing" || field === "keyframes") &&
          other[field] === difference.actual
        if (agrees) {
          if (portUrl) inherited++
          else corrected.push(difference)
        } else all.push(difference)
      }
    })
  } else if (requested !== undefined) {
    const states = Object.entries(STATES).filter(
      ([name]) =>
        requested === "all" ||
        requested.startsWith("--") ||
        requested.split(",").includes(name)
    )
    // States are compared at the widest width, each from a fresh page. A state whose trigger a page
    // does not have is skipped there; a trigger only one build has is a difference.
    // Which states each route can reach, from one load per build; then every (route, state) pair is
    // compared on its own, so the pool is never held by one route with many states.
    const tasks: [string, string, State][] = []
    await pool(routes, concurrency, async (route) => {
      const [left, right] = (await Promise.all(
        [actualUrl, expectedUrl].map((url) =>
          reachable(browser, at(url, route), states)
        )
      )) as [Set<string>, Set<string>]
      for (const [name, state] of states) {
        if (left.has(name) && right.has(name)) tasks.push([route, name, state])
        else if (left.has(name) || right.has(name))
          all.push({
            route,
            width: WIDTHS[0]!,
            scheme: name,
            element: "(page)",
            property: "(state)",
            actual: left.has(name) ? "trigger present" : "trigger missing",
            expected: right.has(name) ? "trigger present" : "trigger missing",
          })
      }
    })
    const compareState = async (route: string, name: string, state: State) => {
      const result = {
        differences: [] as Difference[],
        inherited: 0,
        corrected: [] as Difference[],
      }
      const [actual, expected] = await Promise.all(
        [actualUrl, expectedUrl].map((url) =>
          captureState(browser, at(url, route), state).catch(() => undefined)
        )
      )
      if (!actual || !expected) {
        // The action failed (the trigger was hidden or covered) on one side or both.
        if (actual || expected)
          result.differences.push({
            route,
            width: WIDTHS[0]!,
            scheme: name,
            element: "(page)",
            property: "(state)",
            actual: actual ? "reached" : "action failed",
            expected: expected ? "reached" : "action failed",
          })
        return result
      }
      const differences = SCHEMES.flatMap((scheme) =>
        compare(
          actual.get(scheme)!,
          expected.get(scheme)!,
          WIDTHS[0]!,
          `${scheme} ${name}`,
          route
        )
      )
      const arbiter = portUrl ?? originalUrl
      const third =
        arbiter && differences.length
          ? await captureState(browser, at(arbiter, route), state).catch(
              () => undefined
            )
          : undefined
      for (const difference of differences) {
        const scheme = difference.scheme.split(" ")[0]!
        const others =
          third &&
          new Map(third.get(scheme)!.map((entry) => [entry.key, entry]))
        if (others && sharedWithPort(difference, others)) {
          if (portUrl) result.inherited++
          else result.corrected.push(difference)
        } else result.differences.push(difference)
      }
      return result
    }
    await pool(tasks, concurrency, ([route, name, state]) =>
      confirmed(route, () => compareState(route, name, state))
    )
  } else {
    let done = 0
    await pool(routes, concurrency, async (route) => {
      await confirmed(route, compareRoute)
      done++
      if (routes.length > 1)
        console.log(`  [${done}/${routes.length}] ${route}`)
    })
  }
  await browser.close()
  const matches = (difference: Difference) =>
    expectedList.some(
      (item) =>
        difference.element.startsWith(item.element) &&
        (item.property === "*" || difference.property === item.property) &&
        (item.route === undefined ||
          new RegExp(item.route).test(difference.route))
    )
  const unexpected = all.filter((difference) => !matches(difference))
  mkdirSync(path.dirname(out), { recursive: true })
  writeFileSync(
    out,
    JSON.stringify(
      {
        actual: actualUrl,
        expected: expectedUrl,
        routes,
        total: all.length,
        inherited,
        corrected,
        unexpected,
      },
      null,
      2
    )
  )
  const summary = new Map<string, number>()
  for (const difference of unexpected) {
    const where = routes.length > 1 ? `${difference.route} ` : ""
    const key = `${where}${difference.element.replace(/#\d+$/, "")} ${difference.property}`
    summary.set(key, (summary.get(key) ?? 0) + 1)
  }
  console.log(
    `${label}: ${routes.length} route(s), ${all.length} differences, ${unexpected.length} unexpected${process.argv.includes("--motion") ? `, ${motions} animation(s) and transition(s) compared` : ""}${portUrl ? `, ${inherited} inherited from the port` : ""}${originalUrl ? `, ${corrected.length} where the actual build matches the original instead` : ""} (${out})`
  )
  for (const [key, count] of [...summary]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 60))
    console.log(`  ${count}× ${key}`)
  process.exitCode = unexpected.length ? 1 : 0
}

if (import.meta.main) await main()
