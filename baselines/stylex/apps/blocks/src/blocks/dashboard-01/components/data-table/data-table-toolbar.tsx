import * as stylex from "@stylexjs/stylex"
import {
  Add01Icon,
  ArrowDown01Icon,
  LeftToRightListBulletIcon,
} from "@hugeicons/core-free-icons"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Label } from "@workspace/ui/components/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { TabsList, TabsTrigger } from "@workspace/ui/components/tabs"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

import type { DocumentTable } from "./features"

const styles = stylex.create({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: { default: spacing["4"], [breakpoint.lg]: spacing["6"] },
  },
  srOnlyLabel: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
  // The select stands in for the tabs until the main column is wide enough.
  viewSelect: {
    display: { default: "flex", "@container main (width >= 56rem)": "none" },
    width: "fit-content",
  },
  tabsList: {
    display: { default: "none", "@container main (width >= 56rem)": "flex" },
  },
  // Was `**:data-[slot=badge]:size-5 rounded-full bg-muted-foreground/30 px-1`.
  tabBadge: {
    width: spacing["5"],
    height: spacing["5"],
    borderRadius: radius.full,
    backgroundColor: `color-mix(in oklab, ${theme.mutedForeground} 30%, transparent)`,
    paddingInlineStart: spacing["1"],
    paddingInlineEnd: spacing["1"],
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
  },
  columnsMenu: {
    width: spacing["32"],
  },
  columnItem: {
    textTransform: "capitalize",
  },
  addLabel: {
    display: { default: "none", [breakpoint.lg]: "inline" },
  },
})

const VIEWS = [
  { label: "Outline", value: "outline" },
  { label: "Past Performance", value: "past-performance" },
  { label: "Key Personnel", value: "key-personnel" },
  { label: "Focus Documents", value: "focus-documents" },
]

/** The view switcher, the Columns menu, and the Add Section button. */
export function DataTableToolbar({ table }: { table: DocumentTable }) {
  return (
    <div sx={styles.root}>
      <Label htmlFor="view-selector" sx={styles.srOnlyLabel}>
        View
      </Label>
      <Select defaultValue="outline" items={VIEWS}>
        <SelectTrigger sx={styles.viewSelect} size="sm" id="view-selector">
          <SelectValue placeholder="Select a view" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {VIEWS.map((view) => (
              <SelectItem key={view.value} value={view.value}>
                {view.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <TabsList sx={styles.tabsList}>
        <TabsTrigger value="outline">Outline</TabsTrigger>
        <TabsTrigger value="past-performance">
          Past Performance{" "}
          <Badge variant="secondary" sx={styles.tabBadge}>
            3
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="key-personnel">
          Key Personnel{" "}
          <Badge variant="secondary" sx={styles.tabBadge}>
            2
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
      </TabsList>
      <div sx={styles.actions}>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
            <Icon icon={LeftToRightListBulletIcon} data-icon="inline-start" />
            Columns
            <Icon icon={ArrowDown01Icon} data-icon="inline-end" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sx={styles.columnsMenu}>
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide()
              )
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  sx={styles.columnItem}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" size="sm">
          <Icon icon={Add01Icon} />
          <span sx={styles.addLabel}>Add Section</span>
        </Button>
      </div>
    </div>
  )
}
