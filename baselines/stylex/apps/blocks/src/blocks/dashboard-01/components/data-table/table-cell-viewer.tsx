import * as stylex from "@stylexjs/stylex"
import { ChartUpIcon } from "@hugeicons/core-free-icons"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@workspace/ui/hooks/use-mobile"
import { Button } from "@workspace/ui/components/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@workspace/ui/components/chart"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
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
import { Separator } from "@workspace/ui/components/separator"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

import type { DocumentRow } from "./schema"
import { chartConfig, chartData } from "./table-cell-viewer-data"

const styles = stylex.create({
  trigger: {
    width: "fit-content",
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
    textAlign: "left",
    color: theme.foreground,
  },
  header: {
    rowGap: spacing["1"],
    columnGap: spacing["1"],
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["4"],
    overflowY: "auto",
    paddingInline: spacing["4"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
  summary: {
    display: "grid",
    gap: spacing["2"],
  },
  trend: {
    display: "flex",
    gap: spacing["2"],
    lineHeight: 1,
    fontWeight: fontWeight.medium,
  },
  trendIcon: {
    width: spacing["4"],
    height: spacing["4"],
  },
  muted: {
    color: theme.mutedForeground,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["4"],
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["3"],
  },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: spacing["4"],
  },
  selectTrigger: {
    width: "100%",
  },
})

/**
 * A row's header, which opens the section in a drawer: a chart of its visitors
 * above an edit form. The drawer slides up on mobile and in from the right
 * otherwise, and drops the chart on mobile.
 */
export function TableCellViewer({ item }: { item: DocumentRow }) {
  const isMobile = useIsMobile()
  return (
    <Drawer swipeDirection={isMobile ? "down" : "right"}>
      <DrawerTrigger render={<Button variant="link" sx={styles.trigger} />}>
        {item.header}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader sx={styles.header}>
          <DrawerTitle>{item.header}</DrawerTitle>
          <DrawerDescription>
            Showing total visitors for the last 6 months
          </DrawerDescription>
        </DrawerHeader>
        <div sx={styles.body}>
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div sx={styles.summary}>
                <div sx={styles.trend}>
                  Trending up by 5.2% this month{" "}
                  <Icon
                    icon={ChartUpIcon}

                    sx={styles.trendIcon}
                  />
                </div>
                <div sx={styles.muted}>
                  Showing total visitors for the last 6 months. This is just
                  some random text to test the layout. It spans multiple lines
                  and should wrap around.
                </div>
              </div>
              <Separator />
            </>
          )}
          <form sx={styles.form}>
            <div sx={styles.field}>
              <Label htmlFor="header">Header</Label>
              <Input id="header" defaultValue={item.header} />
            </div>
            <div sx={styles.fieldRow}>
              <div sx={styles.field}>
                <Label htmlFor="type">Type</Label>
                <Select
                  defaultValue={item.type}
                  items={[
                    { label: "Table of Contents", value: "Table of Contents" },
                    { label: "Executive Summary", value: "Executive Summary" },
                    {
                      label: "Technical Approach",
                      value: "Technical Approach",
                    },
                    { label: "Design", value: "Design" },
                    { label: "Capabilities", value: "Capabilities" },
                    { label: "Focus Documents", value: "Focus Documents" },
                    { label: "Narrative", value: "Narrative" },
                    { label: "Cover Page", value: "Cover Page" },
                  ]}
                >
                  <SelectTrigger id="type" sx={styles.selectTrigger}>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Table of Contents">
                        Table of Contents
                      </SelectItem>
                      <SelectItem value="Executive Summary">
                        Executive Summary
                      </SelectItem>
                      <SelectItem value="Technical Approach">
                        Technical Approach
                      </SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Capabilities">Capabilities</SelectItem>
                      <SelectItem value="Focus Documents">
                        Focus Documents
                      </SelectItem>
                      <SelectItem value="Narrative">Narrative</SelectItem>
                      <SelectItem value="Cover Page">Cover Page</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div sx={styles.field}>
                <Label htmlFor="status">Status</Label>
                <Select
                  defaultValue={item.status}
                  items={[
                    { label: "Done", value: "Done" },
                    { label: "In Progress", value: "In Progress" },
                    { label: "Not Started", value: "Not Started" },
                  ]}
                >
                  <SelectTrigger id="status" sx={styles.selectTrigger}>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Done">Done</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Not Started">Not Started</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div sx={styles.fieldRow}>
              <div sx={styles.field}>
                <Label htmlFor="target">Target</Label>
                <Input id="target" defaultValue={item.target} />
              </div>
              <div sx={styles.field}>
                <Label htmlFor="limit">Limit</Label>
                <Input id="limit" defaultValue={item.limit} />
              </div>
            </div>
            <div sx={styles.field}>
              <Label htmlFor="reviewer">Reviewer</Label>
              <Select
                defaultValue={item.reviewer}
                items={[
                  { label: "Eddie Lake", value: "Eddie Lake" },
                  { label: "Jamik Tashpulatov", value: "Jamik Tashpulatov" },
                  { label: "Emily Whalen", value: "Emily Whalen" },
                ]}
              >
                <SelectTrigger id="reviewer" sx={styles.selectTrigger}>
                  <SelectValue placeholder="Select a reviewer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                    <SelectItem value="Jamik Tashpulatov">
                      Jamik Tashpulatov
                    </SelectItem>
                    <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose render={<Button variant="outline" />}>Done</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
