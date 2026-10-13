import { createFileRoute, useNavigate } from "@tanstack/react-router"

import { SearchPage } from "@workspace/shell/search-page"

import { NAV } from "@/registry"

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q : "",
  }),
  component: Search,
})

function Search() {
  const { q } = Route.useSearch()
  const navigate = useNavigate({ from: "/search" })
  return (
    <SearchPage
      groups={NAV}
      query={q}
      onQueryChange={(query) =>
        void navigate({ search: { q: query }, replace: true })
      }
    />
  )
}
