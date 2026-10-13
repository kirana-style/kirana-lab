import { css } from "@kirana-style/core"
import * as React from "react"

import { Example, ExampleWrapper } from "@/components/example"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BookmarkIcon,
  FavouriteIcon,
  StarIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  TradeUpIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography"
import { mergeSx } from "@workspace/ui/lib/sx"
import { peer } from "@workspace/ui/theme/markers"

const styles = {
  stack: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing["4"],
  }),
  toggleGroupItem: css({
    // The outline weight's fill is restated with the pressed state cleared: an
    // sx value replaces the whole property.
    backgroundColor: {
      base: "transparent",
      ":hover": theme.muted,
      '[aria-pressed="true"]': "transparent",
    },
  }),
  // The item carries the default marker; a pressed item fills its icon instead.
  pressedIcon: css({
    fill: {
      [peer.within('[aria-pressed="true"]')]: theme.foreground,
    },
    stroke: {
      [peer.within('[aria-pressed="true"]')]: theme.foreground,
    },
  }),
  row: css({
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
  }),
  input: css({
    flex: 1,
  }),
  selectTrigger: css({
    width: spacing["32"],
  }),
  toggleGroupItem2: css({
    display: "flex",
    width: spacing["16"],
    height: spacing["16"],
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderStartStartRadius: radius.xl,
    borderStartEndRadius: radius.xl,
    borderEndStartRadius: radius.xl,
    borderEndEndRadius: radius.xl,
  }),
  text: css({
    fontSize: fontSize["2xl"],
    lineHeight: 1,
    fontWeight: fontWeight.light,
  }),
  text2: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  text3: css({
    fontSize: fontSize["2xl"],
    lineHeight: 1,
    fontWeight: fontWeight.normal,
  }),
  text4: css({
    fontSize: fontSize["2xl"],
    lineHeight: 1,
    fontWeight: fontWeight.medium,
  }),
  text5: css({
    fontSize: fontSize["2xl"],
    lineHeight: 1,
    fontWeight: fontWeight.bold,
  }),
  code: css({
    borderRadius: radius.md,
    backgroundColor: theme.muted,
    paddingInline: spacing["1"],
    paddingBlock: spacing["0.5"],
    fontFamily: fontFamily.mono,
  }),
}

export default function ToggleGroupExample() {
  return (
    <ExampleWrapper>
      <ToggleGroupBasic />
      <ToggleGroupOutline />
      <ToggleGroupOutlineWithIcons />
      <ToggleGroupSizes />
      <ToggleGroupSpacing />
      <ToggleGroupWithIcons />
      <ToggleGroupFilter />
      <ToggleGroupDateRange />
      <ToggleGroupSort />
      <ToggleGroupWithInputAndSelect />
      <ToggleGroupVertical />
      <ToggleGroupVerticalOutline />
      <ToggleGroupVerticalOutlineWithIcons />
      <ToggleGroupVerticalWithSpacing />
      <ToggleGroupFontWeightSelector />
    </ExampleWrapper>
  )
}

function ToggleGroupBasic() {
  return (
    <Example title="Basic">
      <ToggleGroup multiple spacing={1}>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Icon icon={TextBoldIcon} />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Icon icon={TextItalicIcon} />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Icon icon={TextUnderlineIcon} />
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupOutline() {
  return (
    <Example title="Outline">
      <ToggleGroup variant="outline" defaultValue={["all"]}>
        <ToggleGroupItem value="all" aria-label="Toggle all">
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="missed" aria-label="Toggle missed">
          Missed
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupOutlineWithIcons() {
  return (
    <Example title="Outline With Icons">
      <ToggleGroup variant="outline" multiple size="sm">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Icon icon={TextBoldIcon} />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Icon icon={TextItalicIcon} />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Icon icon={TextUnderlineIcon} />
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupSizes() {
  return (
    <Example title="Sizes">
      <div sx={styles.stack}>
        <ToggleGroup size="sm" defaultValue={["top"]} variant="outline">
          <ToggleGroupItem value="top" aria-label="Toggle top">
            Top
          </ToggleGroupItem>
          <ToggleGroupItem value="bottom" aria-label="Toggle bottom">
            Bottom
          </ToggleGroupItem>
          <ToggleGroupItem value="left" aria-label="Toggle left">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Toggle right">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup defaultValue={["top"]} variant="outline">
          <ToggleGroupItem value="top" aria-label="Toggle top">
            Top
          </ToggleGroupItem>
          <ToggleGroupItem value="bottom" aria-label="Toggle bottom">
            Bottom
          </ToggleGroupItem>
          <ToggleGroupItem value="left" aria-label="Toggle left">
            Left
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Toggle right">
            Right
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </Example>
  )
}

function ToggleGroupSpacing() {
  return (
    <Example title="With Spacing">
      <ToggleGroup size="sm" defaultValue={["top"]} spacing={2}>
        <ToggleGroupItem value="top" aria-label="Toggle top">
          Top
        </ToggleGroupItem>
        <ToggleGroupItem value="bottom" aria-label="Toggle bottom">
          Bottom
        </ToggleGroupItem>
        <ToggleGroupItem value="left" aria-label="Toggle left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Toggle right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupWithIcons() {
  return (
    <Example title="With Icons">
      <ToggleGroup multiple variant="outline" spacing={2} size="sm">
        <ToggleGroupItem
          value="star"
          aria-label="Toggle star"
          sx={mergeSx(peer.anchor, styles.toggleGroupItem)}
        >
          <Icon icon={StarIcon} sx={styles.pressedIcon} />
          Star
        </ToggleGroupItem>
        <ToggleGroupItem
          value="heart"
          aria-label="Toggle heart"
          sx={mergeSx(peer.anchor, styles.toggleGroupItem)}
        >
          <Icon icon={FavouriteIcon} sx={styles.pressedIcon} />
          Heart
        </ToggleGroupItem>
        <ToggleGroupItem
          value="bookmark"
          aria-label="Toggle bookmark"
          sx={mergeSx(peer.anchor, styles.toggleGroupItem)}
        >
          <Icon icon={BookmarkIcon} sx={styles.pressedIcon} />
          Bookmark
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupFilter() {
  return (
    <Example title="Filter">
      <ToggleGroup defaultValue={["all"]} variant="outline" size="sm">
        <ToggleGroupItem value="all" aria-label="All">
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="active" aria-label="Active">
          Active
        </ToggleGroupItem>
        <ToggleGroupItem value="completed" aria-label="Completed">
          Completed
        </ToggleGroupItem>
        <ToggleGroupItem value="archived" aria-label="Archived">
          Archived
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupDateRange() {
  return (
    <Example title="Date Range">
      <ToggleGroup
        defaultValue={["today"]}
        variant="outline"
        size="sm"
        spacing={2}
      >
        <ToggleGroupItem value="today" aria-label="Today">
          Today
        </ToggleGroupItem>
        <ToggleGroupItem value="week" aria-label="This Week">
          This Week
        </ToggleGroupItem>
        <ToggleGroupItem value="month" aria-label="This Month">
          This Month
        </ToggleGroupItem>
        <ToggleGroupItem value="year" aria-label="This Year">
          This Year
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupSort() {
  return (
    <Example title="Sort">
      <ToggleGroup defaultValue={["newest"]} variant="outline" size="sm">
        <ToggleGroupItem value="newest" aria-label="Newest">
          <Icon icon={ArrowDownIcon} />
          Newest
        </ToggleGroupItem>
        <ToggleGroupItem value="oldest" aria-label="Oldest">
          <Icon icon={ArrowUpIcon} />
          Oldest
        </ToggleGroupItem>
        <ToggleGroupItem value="popular" aria-label="Popular">
          <Icon icon={TradeUpIcon} />
          Popular
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupWithInputAndSelect() {
  const items = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Archived", value: "archived" },
  ]
  return (
    <Example title="With Input and Select">
      <div sx={styles.row}>
        <Input type="search" placeholder="Search..." sx={styles.input} />
        <Select items={items} defaultValue={items[0]}>
          <SelectTrigger sx={styles.selectTrigger}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <ToggleGroup defaultValue={["grid"]} variant="outline">
          <ToggleGroupItem value="grid" aria-label="Grid view">
            Grid
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="List view">
            List
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </Example>
  )
}

function ToggleGroupVertical() {
  return (
    <Example title="Vertical">
      <ToggleGroup multiple orientation="vertical" spacing={1}>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Icon icon={TextBoldIcon} />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Icon icon={TextItalicIcon} />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Icon icon={TextUnderlineIcon} />
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupVerticalOutline() {
  return (
    <Example title="Vertical Outline">
      <ToggleGroup
        variant="outline"
        defaultValue={["all"]}
        orientation="vertical"
        size="sm"
      >
        <ToggleGroupItem value="all" aria-label="Toggle all">
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="active" aria-label="Toggle active">
          Active
        </ToggleGroupItem>
        <ToggleGroupItem value="completed" aria-label="Toggle completed">
          Completed
        </ToggleGroupItem>
        <ToggleGroupItem value="archived" aria-label="Toggle archived">
          Archived
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupVerticalOutlineWithIcons() {
  return (
    <Example title="Vertical Outline With Icons">
      <ToggleGroup variant="outline" multiple orientation="vertical" size="sm">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Icon icon={TextBoldIcon} />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Icon icon={TextItalicIcon} />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Icon icon={TextUnderlineIcon} />
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}

function ToggleGroupFontWeightSelector() {
  const [selectedWeight, setFontWeight] = React.useState("normal")
  return (
    <Example title="Font Weight Selector">
      <Field>
        <FieldLabel>Font Weight</FieldLabel>
        <ToggleGroup
          value={[selectedWeight]}
          onValueChange={(value) => setFontWeight(value[0])}
          variant="outline"
          spacing={2}
          size="lg"
        >
          <ToggleGroupItem
            value="light"
            aria-label="Light"
            sx={styles.toggleGroupItem2}
          >
            <span sx={styles.text}>Aa</span>
            <span sx={styles.text2}>Light</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="normal"
            aria-label="Normal"
            sx={styles.toggleGroupItem2}
          >
            <span sx={styles.text3}>Aa</span>
            <span sx={styles.text2}>Normal</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="medium"
            aria-label="Medium"
            sx={styles.toggleGroupItem2}
          >
            <span sx={styles.text4}>Aa</span>
            <span sx={styles.text2}>Medium</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="bold"
            aria-label="Bold"
            sx={styles.toggleGroupItem2}
          >
            <span sx={styles.text5}>Aa</span>
            <span sx={styles.text2}>Bold</span>
          </ToggleGroupItem>
        </ToggleGroup>
        <FieldDescription>
          Use <code sx={styles.code}>font-{selectedWeight}</code> to set the
          font weight.
        </FieldDescription>
      </Field>
    </Example>
  )
}

function ToggleGroupVerticalWithSpacing() {
  return (
    <Example title="Vertical With Spacing">
      <ToggleGroup
        size="sm"
        defaultValue={["top"]}
        orientation="vertical"
        spacing={1}
      >
        <ToggleGroupItem value="top" aria-label="Toggle top">
          Top
        </ToggleGroupItem>
        <ToggleGroupItem value="bottom" aria-label="Toggle bottom">
          Bottom
        </ToggleGroupItem>
        <ToggleGroupItem value="left" aria-label="Toggle left">
          Left
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Toggle right">
          Right
        </ToggleGroupItem>
      </ToggleGroup>
    </Example>
  )
}
