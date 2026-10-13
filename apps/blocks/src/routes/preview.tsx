import * as React from "react"
import { createFileRoute } from "@tanstack/react-router"

import { PageLoading } from "@workspace/shell/page-loading"

import { getBlock } from "@/registry"

export const Route = createFileRoute("/preview")({ component: BlockPage })

const Block = getBlock("preview")!

function BlockPage() {
  return (
    <React.Suspense fallback={<PageLoading />}>
      <Block />
    </React.Suspense>
  )
}
