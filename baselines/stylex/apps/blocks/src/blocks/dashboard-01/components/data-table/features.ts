import {
  columnVisibilityFeature,
  createColumnHelper,
  createPaginatedRowModel,
  rowPaginationFeature,
  rowSelectionFeature,
  tableFeatures,
} from "@tanstack/react-table"
import type { ReactTable, Row } from "@tanstack/react-table"

import type { DocumentRow } from "./schema"

/**
 * The TanStack Table features this table uses, and nothing else.
 *
 * v9 registers features explicitly, so the bundle only carries what is listed.
 * Rows are reordered by dragging rather than sorted, and nothing filters them,
 * so sorting and filtering are left out.
 */
export const features = tableFeatures({
  rowSelectionFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
})

export type DocumentTable = ReactTable<typeof features, DocumentRow>
export type DocumentTableRow = Row<typeof features, DocumentRow>

export const columnHelper = createColumnHelper<typeof features, DocumentRow>()
