import { createFileRoute } from "@tanstack/react-router"

import { IndexPage } from "@workspace/shell/index-page"

import { NAV } from "@/registry"

export const Route = createFileRoute("/")({ component: Home })

function Home() {
  return (
    <IndexPage
      title="Blocks"
      description="shadcn/ui's building blocks: a dashboard, sidebars, login and signup pages, and the two preview canvases card by card."
      groups={NAV}
    />
  )
}
