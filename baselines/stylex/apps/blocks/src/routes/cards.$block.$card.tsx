import * as React from "react"
import { createFileRoute, notFound } from "@tanstack/react-router"

import { PageLoading } from "@workspace/shell/page-loading"
import { PreviewFrame } from "@workspace/shell/preview-frame"

import { CARD_COMPONENTS } from "@/registry"

export const Route = createFileRoute("/cards/$block/$card")({
  loader: ({ params }) => {
    if (!CARD_COMPONENTS.has(`${params.block}/${params.card}`)) throw notFound()
  },
  component: CardPage,
})

function CardPage() {
  const { block, card } = Route.useParams()
  // Created once in the registry; looked up here, not constructed.
  const component = CARD_COMPONENTS.get(`${block}/${card}`)
  if (!component) return null
  return (
    <PreviewFrame>
      <React.Suspense fallback={<PageLoading />}>
        {React.createElement(component)}
      </React.Suspense>
    </PreviewFrame>
  )
}
