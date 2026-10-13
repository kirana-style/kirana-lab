import * as React from "react"
import { createFileRoute } from "@tanstack/react-router"

import { PageLoading } from "@workspace/shell/page-loading"

import { getBlock } from "@/registry"

export const Route = createFileRoute("/preview-02")({ component: BlockPage })

const Block = getBlock("preview-02")!

function BlockPage() {
  return (
    <React.Suspense fallback={<PageLoading />}>
      <Block />
    </React.Suspense>
  )
}
