import { createFileRoute } from "@tanstack/react-router"

import { IndexPage } from "@workspace/shell/index-page"

import { NAV } from "@/registry"

export const Route = createFileRoute("/")({ component: Home })

function Home() {
  return (
    <IndexPage
      title="Examples"
      description="Every shadcn/ui component, in the variants and states the registry demonstrates."
      groups={NAV}
    />
  )
}
