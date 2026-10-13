import * as stylex from "@stylexjs/stylex"
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
import { Add01Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  row: {
    display: "flex",
    alignItems: "center",
    gap: spacing["3"],
  },
  inputGroup: {
    flex: 1,
  },
})

export function CatalogToolbar() {
  return (
    <div sx={styles.row}>
      <InputGroup sx={styles.inputGroup}>
        <InputGroupAddon>
          <Icon icon={Search01Icon} />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search releases or catalog..." />
      </InputGroup>
      <Button>
        <Icon icon={Add01Icon} />
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
