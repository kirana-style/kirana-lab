/**
 * The rows of the large-dom corpus (METHODOLOGY.md, KRN-BENCH-002): an ERP order list. The same
 * file in every implementation, so each renders the same rows; seeded, so a page of 25,000 rows is
 * the same page in every build and every run, with no clock and no `Math.random`.
 */
export type Status = "paid" | "pending" | "overdue" | "draft"

export type Order = {
  id: string
  customer: string
  owner: string
  amount: string
  due: string
  status: Status
}

/** The row counts the corpus measures; `?rows=` picks one. */
export const SIZES = [1000, 5000, 10000, 25000] as const

export const STATUSES: readonly Status[] = [
  "paid",
  "pending",
  "overdue",
  "draft",
]

export const LABELS: Record<Status, string> = {
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
  draft: "Draft",
}

export const OWNERS = ["Ayu", "Bima", "Citra", "Dewi"] as const

const CUSTOMERS = [
  "Arunika Trading",
  "Banyu Logistics",
  "Cendana Foods",
  "Dharma Textiles",
  "Elang Motors",
  "Flamboyan Retail",
  "Garuda Paper",
  "Halim Pharmacy",
  "Indah Ceramics",
  "Jati Furniture",
]

/** mulberry32: a small seeded generator, so every build draws the same numbers. */
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

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

/** `count` orders, the same ones for the same count. */
export function orders(count: number): Order[] {
  const next = generator(20261016)
  const pick = <T>(list: readonly T[]) =>
    list[Math.floor(next() * list.length)]!
  return Array.from({ length: count }, (_, index) => {
    const day = 1 + Math.floor(next() * 28)
    const month = 1 + Math.floor(next() * 12)
    return {
      id: `SO-${String(index + 1).padStart(5, "0")}`,
      customer: pick(CUSTOMERS),
      owner: pick(OWNERS),
      amount: money.format(Math.round(next() * 5_000_000) / 100),
      due: `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
      status: pick(STATUSES),
    }
  })
}

/** The row count a search string asks for: one of `SIZES`, else the smallest. */
export function rowsFrom(value: unknown): number {
  const asked = Number(value)
  return (
    SIZES.find((size) => size === asked) ??
    (asked > 0 && asked < SIZES[0] ? asked : SIZES[0])
  )
}
