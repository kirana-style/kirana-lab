import * as stylex from "@stylexjs/stylex"
import * as React from "react"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { es } from "react-day-picker/locale"

import { Example, ExampleWrapper } from "@/components/example"
import { Button } from "@workspace/ui/components/button"
import { Calendar, CalendarDayButton } from "@workspace/ui/components/calendar"
import { Card, CardContent, CardFooter } from "@workspace/ui/components/card"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import {
  ArrowDownIcon,
  CalendarIcon,
  Clock03Icon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { mergeSx } from "@workspace/ui/lib/sx"
import { calendarCtx } from "@workspace/ui/theme/context.stylex"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { fontWeight } from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  // Booked days stay at full opacity and strike through their date.
  bookedDay: { opacity: 1 },
  bookedButton: { textDecorationLine: "line-through" },
  card: {
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
    width: "fit-content",
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
  },
  cardContent: {
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
  },
  button: {
    // `px-2.5` replaced the button's plain padding; its icon-side padding
    // outranked it in Tailwind and still applies.
    paddingInlineStart: {
      default: spacing["2.5"],
      ':has([data-icon="inline-start"])': spacing["2"],
    },
    paddingInlineEnd: {
      default: spacing["2.5"],
      ':has([data-icon="inline-end"])': spacing["2"],
    },
    fontWeight: fontWeight.normal,
  },
  popoverContent: {
    width: "auto",
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
  },
  example: {
    gridColumn: { default: null, [breakpoint.lg]: "1 / -1" },
  },
  example2: {
    paddingTop: spacing["12"],
    paddingBottom: spacing["12"],
    paddingInlineStart: spacing["12"],
    paddingInlineEnd: spacing["12"],
  },
  card2: {
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
    width: "fit-content",
  },
  cardFooter: {
    borderTopStyle: "solid",
    borderTopWidth: "1px",
    backgroundColor: theme.card,
    borderTopColor: theme.border,
  },
  inputGroupInput: {
    appearance: "none",
    "::-webkit-calendar-picker-indicator": {
      appearance: "none",
      display: "none",
    },
  },
  icon: {
    color: theme.mutedForeground,
  },
  calendar: {
    // The narrow size sits on the parent and the wide one here: StyleX emits a
    // custom property's plain value outside the cascade layers, where it would
    // beat a breakpoint written beside it.
    [calendarCtx.cellSize]: { default: null, [breakpoint.md]: spacing["12"] },
  },
  cellSizeBase: {
    [calendarCtx.cellSize]: spacing["10"],
  },
  card3: {
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
    width: "fit-content",
    maxWidth: "300px",
  },
  calendar2: {
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
    [calendarCtx.cellSize]: "2.375rem",
  },
  cardFooter2: {
    display: "flex",
    flexWrap: "wrap",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
    borderTopStyle: "solid",
    borderTopWidth: "1px",
    borderTopColor: theme.border,
  },
  button2: {
    flex: 1,
  },
  field: {
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
    width: spacing["72"],
  },
  button3: {
    justifyContent: "flex-start",
    // `px-2.5` replaced the button's plain padding; its icon-side padding
    // outranked it in Tailwind and still applies.
    paddingInlineStart: {
      default: spacing["2.5"],
      ':has([data-icon="inline-start"])': spacing["2"],
    },
    paddingInlineEnd: {
      default: spacing["2.5"],
      ':has([data-icon="inline-end"])': spacing["2"],
    },
    fontWeight: fontWeight.normal,
  },
  icon2: {
    marginLeft: "auto",
  },
  row: {
    display: "flex",
    gap: spacing["2"],
    borderTopStyle: "solid",
    borderTopWidth: "1px",
    padding: spacing["2"],
    borderTopColor: theme.border,
  },
  button4: {
    width: "100%",
  },
  example3: {
    justifyContent: "center",
  },
})

export default function CalendarExample() {
  return (
    <ExampleWrapper>
      <CalendarSingle />
      <CalendarMultiple />
      <CalendarWeekNumbers />
      <CalendarBookedDates />
      <CalendarRange />
      <CalendarRangeMultipleMonths />
      <CalendarWithTime />
      <CalendarWithPresets />
      <CalendarCustomDays />
      <DatePickerSimple />
      <DataPickerWithDropdowns />
      <DatePickerWithRange />
      <CalendarInCard />
      <CalendarInPopover />
    </ExampleWrapper>
  )
}

function CalendarInCard() {
  return (
    <Example title="In Card">
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Calendar mode="single" />
        </CardContent>
      </Card>
    </Example>
  )
}

function CalendarInPopover() {
  return (
    <Example title="In Popover">
      <Popover>
        <PopoverTrigger
          render={<Button variant="outline" sx={styles.button} />}
        >
          <Icon
            icon={CalendarIcon}

            data-icon="inline-start"
          />
          Open Calendar
        </PopoverTrigger>
        <PopoverContent sx={styles.popoverContent} align="start">
          <Calendar mode="single" />
        </PopoverContent>
      </Popover>
    </Example>
  )
}

function CalendarSingle() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  )
  return (
    <Example title="Single">
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            captionLayout="dropdown"
          />
        </CardContent>
      </Card>
    </Example>
  )
}

function CalendarMultiple() {
  return (
    <Example title="Multiple">
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Calendar mode="multiple" />
        </CardContent>
      </Card>
    </Example>
  )
}

function CalendarRange() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  })

  return (
    <Example title="Range" containerSx={styles.example} sx={styles.example2}>
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
          />
        </CardContent>
      </Card>
    </Example>
  )
}

function CalendarRangeMultipleMonths() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 3, 12),
    to: addDays(new Date(new Date().getFullYear(), 3, 12), 60),
  })

  return (
    <Example
      title="Range Multiple Months"
      containerSx={styles.example}
      sx={styles.example2}
    >
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Calendar
            mode="range"
            defaultMonth={range?.from}
            selected={range}
            onSelect={setRange}
            numberOfMonths={3}
            locale={es}
            fixedWeeks
          />
        </CardContent>
      </Card>
    </Example>
  )
}

function CalendarBookedDates() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 3)
  )
  const bookedDates = Array.from(
    { length: 15 },
    (_, i) => new Date(new Date().getFullYear(), 1, 12 + i)
  )

  return (
    <Example title="Booked Dates">
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Calendar
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={setDate}
            disabled={bookedDates}
            modifiers={{
              booked: bookedDates,
            }}
            modifiersSx={{
              booked: { day: styles.bookedDay, button: styles.bookedButton },
            }}
          />
        </CardContent>
      </Card>
    </Example>
  )
}

function CalendarWithTime() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 12)
  )

  return (
    <Example title="With Time">
      <Card size="sm" sx={styles.card2}>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            sx={styles.cardContent}
          />
        </CardContent>
        <CardFooter sx={styles.cardFooter}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="time-from">Start Time</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="time-from"
                  type="time"
                  step="1"
                  defaultValue="10:30:00"
                  sx={styles.inputGroupInput}
                />
                <InputGroupAddon>
                  <Icon
                    icon={Clock03Icon}

                    sx={styles.icon}
                  />
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="time-to">End Time</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="time-to"
                  type="time"
                  step="1"
                  defaultValue="12:30:00"
                  sx={styles.inputGroupInput}
                />
                <InputGroupAddon>
                  <Icon
                    icon={Clock03Icon}

                    sx={styles.icon}
                  />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>
        </CardFooter>
      </Card>
    </Example>
  )
}

function CalendarCustomDays() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 11, 8),
    to: addDays(new Date(new Date().getFullYear(), 11, 8), 10),
  })

  return (
    <Example title="Custom Days">
      <Card sx={styles.card}>
        <CardContent sx={mergeSx(styles.cardContent, styles.cellSizeBase)}>
          <Calendar
            mode="range"
            defaultMonth={range?.from}
            selected={range}
            onSelect={setRange}
            numberOfMonths={1}
            captionLayout="dropdown"
            sx={styles.calendar}
            formatters={{
              formatMonthDropdown: (date) => {
                return date.toLocaleString("default", { month: "long" })
              },
            }}
            components={{
              DayButton: ({ children, modifiers, day, ...props }) => {
                const isWeekend =
                  day.date.getDay() === 0 || day.date.getDay() === 6

                return (
                  <CalendarDayButton day={day} modifiers={modifiers} {...props}>
                    {children}
                    {!modifiers.outside && (
                      <span>{isWeekend ? "$120" : "$100"}</span>
                    )}
                  </CalendarDayButton>
                )
              },
            }}
          />
        </CardContent>
      </Card>
    </Example>
  )
}

function CalendarWithPresets() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 12)
  )
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  )

  return (
    <Example title="With Presets">
      <Card sx={styles.card3} size="sm">
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            fixedWeeks
            sx={styles.calendar2}
          />
        </CardContent>
        <CardFooter sx={styles.cardFooter2}>
          {[
            { label: "Today", value: 0 },
            { label: "Tomorrow", value: 1 },
            { label: "In 3 days", value: 3 },
            { label: "In a week", value: 7 },
            { label: "In 2 weeks", value: 14 },
          ].map((preset) => (
            <Button
              key={preset.value}
              variant="outline"
              size="sm"
              sx={styles.button2}
              onClick={() => {
                const newDate = addDays(new Date(), preset.value)
                setDate(newDate)
                setCurrentMonth(
                  new Date(newDate.getFullYear(), newDate.getMonth(), 1)
                )
              }}
            >
              {preset.label}
            </Button>
          ))}
        </CardFooter>
      </Card>
    </Example>
  )
}

function DatePickerSimple() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Example title="Date Picker Simple">
      <Field sx={styles.field}>
        <FieldLabel htmlFor="date-picker-simple">Date</FieldLabel>
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                id="date-picker-simple"
                sx={styles.button3}
              />
            }
          >
            <Icon
              icon={CalendarIcon}

              data-icon="inline-start"
            />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </PopoverTrigger>
          <PopoverContent sx={styles.popoverContent} align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
      </Field>
    </Example>
  )
}

function DatePickerWithRange() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  })

  return (
    <Example title="Date Picker Range">
      <Field sx={styles.field}>
        <FieldLabel htmlFor="date-picker-range">Date Picker Range</FieldLabel>
        <Popover>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                id="date-picker-range"
                sx={styles.button3}
              />
            }
          >
            <Icon
              icon={CalendarIcon}

              data-icon="inline-start"
            />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </PopoverTrigger>
          <PopoverContent sx={styles.popoverContent} align="start">
            <Calendar
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </Field>
    </Example>
  )
}

function DataPickerWithDropdowns() {
  const [date, setDate] = React.useState<Date>()
  const [open, setOpen] = React.useState(false)

  return (
    <Example title="Date Picker with Dropdowns">
      <Field sx={styles.field}>
        <Popover open={open} onOpenChange={setOpen}>
          <FieldLabel htmlFor="date-picker-with-dropdowns-desktop">
            Date
          </FieldLabel>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                id="date-picker-with-dropdowns-desktop"
                sx={styles.button3}
              />
            }
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            <Icon
              icon={ArrowDownIcon}

              data-icon="inline-start"
              sx={styles.icon2}
            />
          </PopoverTrigger>
          <PopoverContent sx={styles.popoverContent} align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              captionLayout="dropdown"
            />
            <div sx={styles.row}>
              <Button
                variant="outline"
                size="sm"
                sx={styles.button4}
                onClick={() => setOpen(false)}
              >
                Done
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </Field>
    </Example>
  )
}

function CalendarWeekNumbers() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(new Date().getFullYear(), 1, 3)
  )

  return (
    <Example title="Week Numbers" sx={styles.example3}>
      <Card sx={styles.card}>
        <CardContent sx={styles.cardContent}>
          <Calendar
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={setDate}
            showWeekNumber
          />
        </CardContent>
      </Card>
    </Example>
  )
}
