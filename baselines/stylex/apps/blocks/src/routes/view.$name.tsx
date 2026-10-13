import * as React from "react"
import { createFileRoute, notFound } from "@tanstack/react-router"

import { PageLoading } from "@workspace/shell/page-loading"

import { VIEW_COMPONENTS } from "@/registry"

type ThemeMode = "system" | "light" | "dark"

export const Route = createFileRoute("/view/$name")({
  validateSearch: (search: Record<string, unknown>): { theme?: ThemeMode } =>
    search.theme === "light" ||
    search.theme === "dark" ||
    search.theme === "system"
      ? { theme: search.theme }
      : {},
  loader: ({ params }) => {
    if (!VIEW_COMPONENTS.has(params.name)) throw notFound()
  },
  component: ViewPage,
})

/** A full-page block on its own, with no app shell around it. */
function ViewPage() {
  const { name } = Route.useParams()
  const component = VIEW_COMPONENTS.get(name)
  if (!component) return null
  return (
    <React.Suspense fallback={<PageLoading />}>
      {React.createElement(component)}
    </React.Suspense>
  )
}
