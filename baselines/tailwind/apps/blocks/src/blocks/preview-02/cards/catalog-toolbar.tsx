import { Button } from "@workspace/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Search01Icon } from "@hugeicons/core-free-icons"

export function CatalogToolbar() {
  return (
    <div className="flex items-center gap-3">
      <InputGroup className="flex-1">
        <InputGroupAddon>
          <HugeiconsIcon
            strokeWidth={2}

            icon={Search01Icon}
          />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search releases or catalog..." />
      </InputGroup>
      <Button>
        <HugeiconsIcon
          strokeWidth={2}

          icon={Add01Icon}
        />
        Upload New Release
      </Button>
      <ToggleGroup defaultValue={["releases"]} variant="outline">
        <ToggleGroupItem value="all-tracks">All Tracks</ToggleGroupItem>
        <ToggleGroupItem value="releases">Releases</ToggleGroupItem>
        <ToggleGroupItem value="top-earners">Top Earners</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
