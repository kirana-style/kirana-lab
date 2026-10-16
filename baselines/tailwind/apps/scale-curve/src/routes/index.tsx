import type * as React from "react"
import { createFileRoute } from "@tanstack/react-router"

import { ThemeToggle } from "@/components/theme-toggle"

/** Every component `scripts/scale-curve.ts` wrote, in order; none until it has run. */
const modules = import.meta.glob<{ default: React.ComponentType }>(
  "../generated/C*.tsx",
  { eager: true }
)
const components = Object.keys(modules)
  .sort()
  .map((key) => modules[key]!.default)

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <main className="grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-4 p-6">
      <ThemeToggle />
      {components.map((Component, index) => (
        <Component key={index} />
      ))}
    </main>
  )
}
