import * as stylex from "@stylexjs/stylex"
import {
  CheckmarkCircle01Icon,
  Loading03Icon,
  MoreVerticalCircle01Icon,
} from "@hugeicons/core-free-icons"
import { toast } from "@/lib/toast"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Icon } from "@workspace/ui/primitives/icon"
import { VisuallyHidden } from "@workspace/ui/primitives/visually-hidden"
import { alpha, surface, theme } from "@workspace/ui/theme/semantic.stylex"
import { color } from "@workspace/ui/tokens/colors.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

import { DragHandle } from "./drag-handle"
import { columnHelper } from "./features"
import type { DocumentRow } from "./schema"
import { TableCellViewer } from "./table-cell-viewer"

const styles = stylex.create({
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  type: {
    width: spacing["32"],
  },
  badge: {
    paddingInlineStart: spacing["1.5"],
    paddingInlineEnd: spacing["1.5"],
    color: theme.mutedForeground,
  },
  doneIcon: {
    fill: `light-dark(${color.green500}, ${color.green400})`,
  },
  numberHeader: {
    width: "100%",
    textAlign: "right",
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
  input: {
    height: spacing["8"],
    width: spacing["16"],
    textAlign: "right",
    boxShadow: "none",
    // An inline cell editor: no border or fill at rest, the field's look on
    // hover and focus. The focus border colour is the input's own, restated.
    borderColor: { default: "transparent", ":focus-visible": theme.ring },
    backgroundColor: {
      default: "transparent",
      ":hover": alpha.input30,
      ":focus-visible": `light-dark(${theme.background}, ${alpha.input30})`,
    },
  },
  reviewerTrigger: {
    width: "9.5rem",
  },
  // Was `**:data-[slot=select-value]:block truncate` on the trigger.
  reviewerValue: {
    display: "block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  actionsTrigger: {
    display: "flex",
    width: spacing["8"],
    height: spacing["8"],
    color: theme.mutedForeground,
    // The ghost button's fills are restated beside the open menu's.
    backgroundColor: {
      default: null,
      ":hover": surface.hover,
      '[aria-expanded="true"]': surface.hover,
      "[data-popup-open]": theme.muted,
    },
  },
  actionsMenu: {
    width: spacing["32"],
  },
})

/** Saves an inline edit; the toast stands in for a request. */
function saveCell(item: DocumentRow) {
  toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
    loading: `Saving ${item.header}`,
    success: "Done",
    error: "Error",
  })
}

function NumberCell({
  item,
  field,
  label,
}: {
  item: DocumentRow
  field: "target" | "limit"
  label: string
}) {
  const id = `${item.id}-${field}`
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        saveCell(item)
      }}
    >
      <Label htmlFor={id} sx={styles.srOnlyLabel}>
        {label}
      </Label>
      <Input sx={styles.input} defaultValue={item[field]} id={id} />
    </form>
  )
}

function ReviewerCell({ item }: { item: DocumentRow }) {
  if (item.reviewer !== "Assign reviewer") {
    return item.reviewer
  }
  const id = `${item.id}-reviewer`
  return (
    <>
      <Label htmlFor={id} sx={styles.srOnlyLabel}>
        Reviewer
      </Label>
      <Select
        items={[
          { label: "Eddie Lake", value: "Eddie Lake" },
          { label: "Jamik Tashpulatov", value: "Jamik Tashpulatov" },
        ]}
      >
        <SelectTrigger sx={styles.reviewerTrigger} size="sm" id={id}>
          <SelectValue
            placeholder="Assign reviewer"
            sx={styles.reviewerValue}
          />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectGroup>
            <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
            <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}

function RowActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" sx={styles.actionsTrigger} size="icon" />
        }
      >
        <Icon icon={MoreVerticalCircle01Icon} />
        <VisuallyHidden>Open menu</VisuallyHidden>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sx={styles.actionsMenu}>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Make a copy</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/**
 * The columns, in display order.
 *
 * `columnHelper.columns` keeps each accessor's value type. Only accessor columns
 * appear in the Columns menu, and only if they can be hidden.
 */
export const columns = columnHelper.columns([
  columnHelper.display({
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  }),
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <div sx={styles.center}>
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          // v9's `getIsSomePageRowsSelected` is true when all are selected too.
          indeterminate={
            table.getIsSomePageRowsSelected() &&
            !table.getIsAllPageRowsSelected()
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div sx={styles.center}>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableHiding: false,
  }),
  columnHelper.accessor("header", {
    header: "Header",
    cell: ({ row }) => <TableCellViewer item={row.original} />,
    enableHiding: false,
  }),
  columnHelper.accessor("type", {
    header: "Section Type",
    cell: ({ row }) => (
      <div sx={styles.type}>
        <Badge variant="outline" sx={styles.badge}>
          {row.original.type}
        </Badge>
      </div>
    ),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" sx={styles.badge}>
        {row.original.status === "Done" ? (
          <Icon icon={CheckmarkCircle01Icon} sx={styles.doneIcon} />
        ) : (
          <Icon icon={Loading03Icon} />
        )}
        {row.original.status}
      </Badge>
    ),
  }),
  columnHelper.accessor("target", {
    header: () => <div sx={styles.numberHeader}>Target</div>,
    cell: ({ row }) => (
      <NumberCell item={row.original} field="target" label="Target" />
    ),
  }),
  columnHelper.accessor("limit", {
    header: () => <div sx={styles.numberHeader}>Limit</div>,
    cell: ({ row }) => (
      <NumberCell item={row.original} field="limit" label="Limit" />
    ),
  }),
  columnHelper.accessor("reviewer", {
    header: "Reviewer",
    cell: ({ row }) => <ReviewerCell item={row.original} />,
  }),
  columnHelper.display({
    id: "actions",
    cell: () => <RowActions />,
  }),
])
