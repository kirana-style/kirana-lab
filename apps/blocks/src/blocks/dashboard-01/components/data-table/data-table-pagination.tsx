import { css } from "@kirana-style/core"
import {
  ArrowLeft01Icon,
  ArrowLeftDoubleIcon,
  ArrowRight01Icon,
  ArrowRightDoubleIcon,
} from "@hugeicons/core-free-icons"

import { Button } from "@workspace/ui/components/button"
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
import { theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography"

import type { DocumentTable } from "./features"

const styles = {
  root: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: spacing["4"],
  }),
  selection: css({
    display: { base: "none", [breakpoint.lg]: "flex" },
    flex: 1,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  controls: css({
    display: "flex",
    width: { base: "100%", [breakpoint.lg]: "fit-content" },
    alignItems: "center",
    gap: spacing["8"],
  }),
  pageSize: css({
    display: { base: "none", [breakpoint.lg]: "flex" },
    alignItems: "center",
    gap: spacing["2"],
  }),
  pageSizeLabel: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  }),
  pageSizeTrigger: css({
    width: spacing["20"],
  }),
  pageCount: css({
    display: "flex",
    width: "fit-content",
    alignItems: "center",
    justifyContent: "center",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  }),
  pager: css({
    marginLeft: { base: "auto", [breakpoint.lg]: "0px" },
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
  }),
  pageButton: css({
    width: spacing["8"],
    height: spacing["8"],
  }),
  // The first and last page buttons only appear on wide screens.
  wideOnly: css({
    display: { base: "none", [breakpoint.lg]: "flex" },
  }),
  // The first page button uses the default size, so it drops that padding.
  // Longhands, because the button recipe sets them and a shorthand would lose.
  unpadded: css({
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
  }),
}

const PAGE_SIZES = [10, 20, 30, 40, 50]

/** The selection count, the page size picker, and the page buttons. */
export function DataTablePagination({ table }: { table: DocumentTable }) {
  const { pageIndex, pageSize } = table.state.pagination
  return (
    <div sx={styles.root}>
      <div sx={styles.selection}>
        {table.getSelectedRowModel().rows.length} of {table.getRowCount()}{" "}
        row(s) selected.
      </div>
      <div sx={styles.controls}>
        <div sx={styles.pageSize}>
          <Label htmlFor="rows-per-page" sx={styles.pageSizeLabel}>
            Rows per page
          </Label>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
            items={PAGE_SIZES.map((size) => ({
              label: `${size}`,
              value: `${size}`,
            }))}
          >
            <SelectTrigger
              size="sm"
              sx={styles.pageSizeTrigger}
              id="rows-per-page"
            >
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              <SelectGroup>
                {PAGE_SIZES.map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div sx={styles.pageCount}>
          Page {pageIndex + 1} of {table.getPageCount()}
        </div>
        <div sx={styles.pager}>
          <Button
            variant="outline"
            sx={[styles.pageButton, styles.wideOnly, styles.unpadded]}
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <VisuallyHidden>Go to first page</VisuallyHidden>
            <Icon icon={ArrowLeftDoubleIcon} />
          </Button>
          <Button
            variant="outline"
            sx={styles.pageButton}
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <VisuallyHidden>Go to previous page</VisuallyHidden>
            <Icon icon={ArrowLeft01Icon} />
          </Button>
          <Button
            variant="outline"
            sx={styles.pageButton}
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <VisuallyHidden>Go to next page</VisuallyHidden>
            <Icon icon={ArrowRight01Icon} />
          </Button>
          <Button
            variant="outline"
            sx={[styles.pageButton, styles.wideOnly]}
            size="icon"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <VisuallyHidden>Go to last page</VisuallyHidden>
            <Icon icon={ArrowRightDoubleIcon} />
          </Button>
        </div>
      </div>
    </div>
  )
}
