import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon } from "@hugeicons/core-free-icons"

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@workspace/ui/components/item"

import { filterNav, flattenNav } from "./nav"
import type { NavGroup } from "./nav"

export function SearchPage({
  groups,
  query,
  onQueryChange,
}: {
  groups: NavGroup[]
  query: string
  onQueryChange: (query: string) => void
}) {
  const results = filterNav(groups, query)
  const count = flattenNav(results).length

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4 sm:p-6 lg:p-12">
      <InputGroup>
        <InputGroupInput
          autoFocus
          placeholder="Search by name…"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
        <InputGroupAddon>
          <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
        </InputGroupAddon>
      </InputGroup>
      <p className="text-sm text-muted-foreground">
        {count} {count === 1 ? "result" : "results"}
      </p>
      {count === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>Nothing matches “{query}”</EmptyTitle>
            <EmptyDescription>
              Try a shorter or different word.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        results.map((group) => (
          <section key={group.label} className="flex flex-col gap-2">
            <h2 className="text-xs font-medium text-muted-foreground">
              {group.label}
            </h2>
            <ItemGroup>
              {flattenNav([group]).map((item) => (
                <Item
                  key={item.href}
                  variant="outline"
                  size="sm"
                  render={<Link to={item.href} />}
                >
                  <ItemContent>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemDescription>
                      {item.description ?? item.href}
                    </ItemDescription>
                  </ItemContent>
                </Item>
              ))}
            </ItemGroup>
          </section>
        ))
      )}
    </div>
  )
}
