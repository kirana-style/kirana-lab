import { css } from "@kirana-style/core"
import * as React from "react"

import { Calendar } from "@workspace/ui/components/calendar"
import {
  SidebarGroup,
  SidebarGroupContent,
} from "@workspace/ui/components/sidebar"
import { calendarCtx } from "@workspace/ui/theme/context"

const styles = {
  sidebarGroup: css({
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
  }),
  calendar: css({
    backgroundColor: "transparent",
    [calendarCtx.cellSize]: "2.1rem",
  }),
}

export function DatePicker() {
  const [date, setDate] = React.useState<Date | undefined>(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 12)
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
