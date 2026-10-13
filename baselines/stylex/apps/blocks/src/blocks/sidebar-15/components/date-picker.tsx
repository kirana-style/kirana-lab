import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import { Calendar } from "@workspace/ui/components/calendar"
import {
  SidebarGroup,
  SidebarGroupContent,
} from "@workspace/ui/components/sidebar"
import { calendarCtx } from "@workspace/ui/theme/context.stylex"

const styles = stylex.create({
  sidebarGroup: {
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
  },
  calendar: {
    backgroundColor: "transparent",
    [calendarCtx.cellSize]: "2.1rem",
  },
})

export function DatePicker() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  )
  return (
    <SidebarGroup sx={styles.sidebarGroup}>
      <SidebarGroupContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          captionLayout="dropdown"
          sx={styles.calendar}
        />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
