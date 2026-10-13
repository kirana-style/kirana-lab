import * as stylex from "@stylexjs/stylex"
import { Example, ExampleWrapper } from "@/components/example"
import { Field, FieldLabel } from "@workspace/ui/components/field"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@workspace/ui/components/pagination"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing["4"],
  },
  field: {
    width: "fit-content",
  },
  selectTrigger: {
    width: spacing["20"],
  },
  pagination: {
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
    width: "auto",
  },
})

export default function PaginationExample() {
  return (
    <ExampleWrapper>
      <PaginationBasic />
      <PaginationSimple />
      <PaginationIconsOnly />
    </ExampleWrapper>
  )
}

function PaginationBasic() {
  return (
    <Example title="Basic">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Example>
  )
}

function PaginationSimple() {
  return (
    <Example title="Simple">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">4</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">5</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Example>
  )
}

function PaginationIconsOnly() {
  return (
    <Example title="With Select">
      <div sx={styles.row}>
        <Field orientation="horizontal" sx={styles.field}>
          <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
          <Select defaultValue="25">
            <SelectTrigger sx={styles.selectTrigger} id="select-rows-per-page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent align="start">
              <SelectGroup>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Pagination sx={styles.pagination}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Example>
  )
}
