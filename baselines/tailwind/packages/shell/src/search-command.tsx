import * as React from "react"
import { useNavigate } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon } from "@hugeicons/core-free-icons"

import { Button } from "@workspace/ui/components/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@workspace/ui/components/command"
import { Kbd } from "@workspace/ui/components/kbd"

import { flattenNav } from "./nav"
import type { NavGroup } from "./nav"

export function SearchCommand({ groups }: { groups: NavGroup[] }) {
  const [open, setOpen] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="w-40 justify-between pe-[3px] text-muted-foreground sm:w-56"
        onClick={() => setOpen(true)}
      >
        <span className="flex items-center gap-2">
          <HugeiconsIcon icon={Search01Icon} strokeWidth={2} />
          Search
        </span>
        <Kbd>⌘K</Kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput placeholder="Search…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {flattenNav([group]).map((item) => (
                  <CommandItem
                    key={item.href}
                    value={[item.title, ...(item.keywords ?? [])].join(" ")}
                    onSelect={() => {
                      setOpen(false)
                      void navigate({ to: item.href })
                    }}
                  >
                    {item.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
