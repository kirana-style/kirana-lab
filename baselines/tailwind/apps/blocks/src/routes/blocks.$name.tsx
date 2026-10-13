import { createFileRoute, notFound } from "@tanstack/react-router"

import { BlockViewer } from "@workspace/shell/block-viewer"

import { getBlockMeta } from "@/registry"

export const Route = createFileRoute("/blocks/$name")({
  loader: ({ params }) => {
    if (!getBlockMeta(params.name)) throw notFound()
  },
  component: BlockPage,
})

function BlockPage() {
  const { name } = Route.useParams()
  const block = getBlockMeta(name)!
  return (
    <BlockViewer
      key={name}
      name={name}
      title={block.title}
      description={block.description}
    />
  )
}
