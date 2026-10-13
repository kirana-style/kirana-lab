import { css } from "@kirana-style/core"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { FlexRender } from "@tanstack/react-table"

import { TableCell, TableRow } from "@workspace/ui/components/table"
import { spacing } from "@workspace/ui/tokens/spacing"

import type { DocumentTableRow } from "./features"

const styles = {
  row: css({
    position: "relative",
    zIndex: { base: 0, '[data-dragging="true"]': 10 },
    opacity: { '[data-dragging="true"]': "80%" },
  }),
  // Was `**:data-[slot=table-cell]:first:w-8` on the body: the drag-handle column.
  cell: css({
    width: { ":first-child": spacing["8"] },
  }),
}

/** A body row that moves with the pointer while it is dragged. */
export function DraggableRow({ row }: { row: DocumentTableRow }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      sx={styles.row}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} sx={styles.cell}>
          <FlexRender cell={cell} />
        </TableCell>
      ))}
    </TableRow>
  )
}
