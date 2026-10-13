import * as React from "react"

import type { NavGroup, NavItem } from "@workspace/shell/nav"

import { BLOCK_META, FEATURED } from "@/blocks-meta"
import type { BlockMeta } from "@/blocks-meta"

type Module = Record<string, unknown>

const blockModules = import.meta.glob<Module>("./blocks/*/index.tsx")
const cardModules = import.meta.glob<Module>("./blocks/*/cards/*.tsx")
const pageModules = import.meta.glob<Module>("./blocks/*/page.tsx")

export const BLOCKS = [
  { name: "preview", title: "Preview" },
  { name: "preview-02", title: "Preview 02" },
]

function titleFromFile(file: string) {
  return file
    .replace(/^.*\/|\.tsx$/g, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export const CARDS = Object.keys(cardModules)
  .map((file) => {
    const [, block, card] =
      file.match(/^\.\/blocks\/([^/]+)\/cards\/([^/]+)\.tsx$/) ?? []
    return { file, block: block!, card: card!, title: titleFromFile(file) }
  })
  .sort((a, b) => a.title.localeCompare(b.title))

function blockItem(block: BlockMeta): NavItem {
  return {
    title: block.title,
    href: `/blocks/${block.name}`,
    description: block.description,
    keywords: [block.name, block.category],
  }
}

const byName = new Map(BLOCK_META.map((block) => [block.name, block]))
const inCategory = (category: BlockMeta["category"]) =>
  BLOCK_META.filter((block) => block.category === category).map(blockItem)

export const NAV: NavGroup[] = [
  {
    label: "Featured",
    items: FEATURED.map((name) => blockItem(byName.get(name)!)),
  },
  { label: "Sidebar", items: inCategory("sidebar") },
  { label: "Login", items: inCategory("login") },
  { label: "Signup", items: inCategory("signup") },
  {
    label: "Previews",
    items: BLOCKS.map((b) => ({
      title: b.title,
      href: `/${b.name}`,
      items: [
        { title: "Whole block", href: `/${b.name}`, keywords: [b.name] },
        ...CARDS.filter((c) => c.block === b.name).map((c) => ({
          title: c.title,
          href: `/cards/${c.block}/${c.card}`,
          keywords: [c.card, b.name],
        })),
      ],
    })),
  },
]

export function getBlockMeta(name: string) {
  return byName.get(name)
}

function pickComponent(mod: Module) {
  const candidate =
    mod.default ??
    Object.values(mod).find((value) => typeof value === "function")
  return candidate as React.ComponentType
}

const cache = new Map<string, React.LazyExoticComponent<React.ComponentType>>()

function lazyFrom(key: string, load: (() => Promise<Module>) | undefined) {
  if (!load) return null
  if (!cache.has(key))
    cache.set(
      key,
      React.lazy(() => load().then((mod) => ({ default: pickComponent(mod) })))
    )
  return cache.get(key)!
}

export function getBlock(name: string) {
  return lazyFrom(`block:${name}`, blockModules[`./blocks/${name}/index.tsx`])
}

/** Every card's lazy component, created once so no route creates one while rendering. */
export const CARD_COMPONENTS = new Map(
  CARDS.map((c) => [
    `${c.block}/${c.card}`,
    lazyFrom(`card:${c.block}/${c.card}`, cardModules[c.file])!,
  ])
)

/** Every full-page block's lazy component, for the bare `/view` route. */
export const VIEW_COMPONENTS = new Map(
  BLOCK_META.map((block) => [
    block.name,
    lazyFrom(
      `view:${block.name}`,
      pageModules[`./blocks/${block.name}/page.tsx`]
    )!,
  ])
)
