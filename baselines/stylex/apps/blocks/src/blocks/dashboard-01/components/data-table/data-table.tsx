import * as stylex from "@stylexjs/stylex"
import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import type { DragEndEvent, UniqueIdentifier } from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { useTable } from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { Tabs, TabsContent } from "@workspace/ui/components/tabs"
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

import { columns } from "./columns"
import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"
import { DraggableRow } from "./draggable-row"
import { features } from "./features"
import type { DocumentRow } from "./schema"

const styles = stylex.create({
  tabs: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    rowGap: spacing["6"],
    columnGap: spacing["6"],
  },
  outline: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
    overflowX: "auto",
    overflowY: "auto",
    paddingInline: { default: spacing["4"], [breakpoint.lg]: spacing["6"] },
  },
  frame: {
    overflow: "hidden",
    borderRadius: radius.lg,
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: theme.border,
  },
  header: {
    position: "sticky",
    top: "0px",
    zIndex: 10,
    backgroundColor: theme.muted,
  },
  empty: {
    height: spacing["24"],
    textAlign: "center",
  },
  placeholderTab: {
    display: "flex",
    flexDirection: "column",
    paddingInline: { default: spacing["4"], [breakpoint.lg]: spacing["6"] },
  },
  placeholder: {
    aspectRatio: "16 / 9",
    width: "100%",
    flex: 1,
    borderRadius: radius.lg,
    borderStyle: "dashed",
    borderWidth: "1px",
    borderColor: theme.border,
  },
})

/**
 * The document sections, as a table whose rows can be selected, hidden by
 * column, paged, and reordered by dragging.
 *
 * The table owns its selection, visibility, and pagination state; only the row
 * order lives in React, because dragging rewrites the data itself.
 */
export function DataTable({ data: initialData }: { data: DocumentRow[] }) {
  const [data, setData] = React.useState(() => initialData)
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )
  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data.map(({ id }) => id),
    [data]
  )
  const table = useTable({
    features,
    columns,
    data,
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    initialState: { pagination: { pageIndex: 0, pageSize: 10 } },
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((rows) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(rows, oldIndex, newIndex)
      })
    }
  }

  const rows = table.getRowModel().rows

  return (
    <Tabs defaultValue="outline" sx={styles.tabs}>
      <DataTableToolbar table={table} />
      <TabsContent value="outline" sx={styles.outline}>
        <div sx={styles.frame}>
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader sx={styles.header}>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <table.FlexRender header={header} />
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {rows.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} sx={styles.empty}>
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <DataTablePagination table={table} />
      </TabsContent>
      <TabsContent value="past-performance" sx={styles.placeholderTab}>
        <div sx={styles.placeholder} />
      </TabsContent>
      <TabsContent value="key-personnel" sx={styles.placeholderTab}>
        <div sx={styles.placeholder} />
      </TabsContent>
      <TabsContent value="focus-documents" sx={styles.placeholderTab}>
        <div sx={styles.placeholder} />
      </TabsContent>
    </Tabs>
  )
}
