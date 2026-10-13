import * as React from "react"
import { createFileRoute, notFound } from "@tanstack/react-router"

import { PageLoading } from "@workspace/shell/page-loading"

import { getExample } from "@/registry"

type ThemeMode = "system" | "light" | "dark"

export const Route = createFileRoute("/view/$slug")({
  validateSearch: (search: Record<string, unknown>): { theme?: ThemeMode } =>
    search.theme === "light" ||
    search.theme === "dark" ||
    search.theme === "system"
      ? { theme: search.theme }
      : {},
  loader: ({ params }) => {
    if (!getExample(params.slug)?.entry.frame) throw notFound()
  },
  component: ViewPage,
})

/** A full-page example on its own, with no app shell around it. */
function ViewPage() {
  const { slug } = Route.useParams()
  const example = getExample(slug)
  if (!example) return null
  const { Component } = example
  return (
    <React.Suspense fallback={<PageLoading />}>
      <Component />
    </React.Suspense>
  )
}
