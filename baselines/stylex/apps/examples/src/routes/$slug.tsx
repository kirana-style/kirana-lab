import * as React from "react"
import { createFileRoute, notFound } from "@tanstack/react-router"

import { BlockViewer } from "@workspace/shell/block-viewer"
import { PageLoading } from "@workspace/shell/page-loading"

import { getExample } from "@/registry"

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    if (!getExample(params.slug)) throw notFound()
  },
  component: ExamplePage,
})

function ExamplePage() {
  const { slug } = Route.useParams()
  const example = getExample(slug)
  if (!example) return null
  // A full-page example brings its own sidebar; frame it so it doesn't nest
  // inside the app's.
  if (example.entry.frame)
    return <BlockViewer key={slug} name={slug} title={example.entry.title} />
  const { Component } = example
  return (
    <React.Suspense fallback={<PageLoading />}>
      <Component />
    </React.Suspense>
  )
}
