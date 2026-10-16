import type * as React from "react"
import { createFileRoute } from "@tanstack/react-router"
import { css } from "@kirana-style/core"

import { spacing } from "@workspace/ui/tokens/spacing"

import { ThemeToggle } from "@/components/theme-toggle"

/** Every component `scripts/scale-curve.ts` wrote, in order; none until it has run. */
const modules = import.meta.glob<{ default: React.ComponentType }>(
  "../generated/C*.tsx",
  { eager: true }
)
const components = Object.keys(modules)
  .sort()
  .map((key) => modules[key]!.default)

const styles = {
  page: css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(14rem, 1fr))",
    gap: spacing[4],
    padding: spacing[6],
  }),
}

export const Route = createFileRoute("/")({ component: App })

function App() {
  return (
    <main sx={styles.page}>
      <ThemeToggle />
      {components.map((Component, index) => (
        <Component key={index} />
      ))}
    </main>
  )
}
