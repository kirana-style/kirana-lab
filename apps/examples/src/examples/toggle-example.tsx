import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "@/components/example"
import { Button } from "@workspace/ui/components/button"
import { Toggle } from "@workspace/ui/components/toggle"
import {
  BookmarkIcon,
  TextBoldIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"
import { peer } from "@workspace/ui/theme/markers"

const styles = {
  row: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing["2"],
  }),
  stack: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing["4"],
  }),
  row2: css({
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
  }),
  icon: css({
    // The Toggle carries the default marker. Base UI marks a pressed toggle
    // with `aria-pressed`; the original's `data-[state=on]` is Radix's name.
    fill: {
      [peer.within('[aria-pressed="true"]')]: theme.accentForeground,
    },
  }),
}

export default function ToggleExample() {
  return (
    <ExampleWrapper>
      <ToggleBasic />
      <ToggleOutline />
      <ToggleSizes />
      <ToggleWithButtonText />
      <ToggleWithButtonIcon />
      <ToggleWithButtonIconText />
      <ToggleDisabled />
      <ToggleWithIcon />
    </ExampleWrapper>
  )
}

function ToggleBasic() {
  return (
    <Example title="Basic">
      <div sx={styles.row}>
        <Toggle aria-label="Toggle bold" defaultPressed>
          <Icon icon={TextBoldIcon} />
        </Toggle>
        <Toggle aria-label="Toggle italic">
          <Icon icon={TextItalicIcon} />
        </Toggle>
        <Toggle aria-label="Toggle underline">
          <Icon icon={TextUnderlineIcon} />
        </Toggle>
      </div>
    </Example>
  )
}

function ToggleOutline() {
  return (
    <Example title="Outline">
      <div sx={styles.row}>
        <Toggle variant="outline" aria-label="Toggle italic">
          <Icon icon={TextItalicIcon} />
          Italic
        </Toggle>
        <Toggle variant="outline" aria-label="Toggle bold">
          <Icon icon={TextBoldIcon} />
          Bold
        </Toggle>
      </div>
    </Example>
  )
}

function ToggleSizes() {
  return (
    <Example title="Sizes">
      <div sx={styles.row}>
        <Toggle variant="outline" aria-label="Toggle small" size="sm">
          Small
        </Toggle>
        <Toggle variant="outline" aria-label="Toggle default" size="default">
          Default
        </Toggle>
        <Toggle variant="outline" aria-label="Toggle large" size="lg">
          Large
        </Toggle>
      </div>
    </Example>
  )
}

function ToggleWithButtonText() {
  return (
    <Example title="With Button Text">
      <div sx={styles.stack}>
        <div sx={styles.row2}>
          <Button size="sm" variant="outline">
            Button
          </Button>
          <Toggle variant="outline" aria-label="Toggle sm" size="sm">
            Toggle
          </Toggle>
        </div>
        <div sx={styles.row2}>
          <Button size="default" variant="outline">
            Button
          </Button>
          <Toggle variant="outline" aria-label="Toggle default" size="default">
            Toggle
          </Toggle>
        </div>
        <div sx={styles.row2}>
          <Button size="lg" variant="outline">
            Button
          </Button>
          <Toggle variant="outline" aria-label="Toggle lg" size="lg">
            Toggle
          </Toggle>
        </div>
      </div>
    </Example>
  )
}

function ToggleWithButtonIcon() {
  return (
    <Example title="With Button Icon">
      <div sx={styles.stack}>
        <div sx={styles.row2}>
          <Button variant="outline" size="icon-sm">
            <Icon icon={TextBoldIcon} />
          </Button>
          <Toggle variant="outline" aria-label="Toggle sm icon" size="sm">
            <Icon icon={TextBoldIcon} />
          </Toggle>
        </div>
        <div sx={styles.row2}>
          <Button variant="outline" size="icon">
            <Icon icon={TextItalicIcon} />
          </Button>
          <Toggle
            variant="outline"
            aria-label="Toggle default icon"
            size="default"
          >
            <Icon icon={TextItalicIcon} />
          </Toggle>
        </div>
        <div sx={styles.row2}>
          <Button variant="outline" size="icon-lg">
            <Icon icon={TextUnderlineIcon} />
          </Button>
          <Toggle variant="outline" aria-label="Toggle lg icon" size="lg">
            <Icon icon={TextUnderlineIcon} />
          </Toggle>
        </div>
      </div>
    </Example>
  )
}

function ToggleWithButtonIconText() {
  return (
    <Example title="With Button Icon + Text">
      <div sx={styles.stack}>
        <div sx={styles.row2}>
          <Button size="sm" variant="outline">
            <Icon
              icon={TextBoldIcon}

              data-icon="inline-start"
            />
            Button
          </Button>
          <Toggle variant="outline" aria-label="Toggle sm icon text" size="sm">
            <Icon icon={TextBoldIcon} />
            Toggle
          </Toggle>
        </div>
        <div sx={styles.row2}>
          <Button size="default" variant="outline">
            <Icon
              icon={TextItalicIcon}

              data-icon="inline-start"
            />
            Button
          </Button>
          <Toggle
            variant="outline"
            aria-label="Toggle default icon text"
            size="default"
          >
            <Icon icon={TextItalicIcon} />
            Toggle
          </Toggle>
        </div>
        <div sx={styles.row2}>
          <Button size="lg" variant="outline">
            <Icon
              icon={TextUnderlineIcon}

              data-icon="inline-start"
            />
            Button
          </Button>
          <Toggle variant="outline" aria-label="Toggle lg icon text" size="lg">
            <Icon icon={TextUnderlineIcon} />
            Toggle
          </Toggle>
        </div>
      </div>
    </Example>
  )
}

function ToggleDisabled() {
  return (
    <Example title="Disabled">
      <div sx={styles.row}>
        <Toggle aria-label="Toggle disabled" disabled>
          Disabled
        </Toggle>
        <Toggle variant="outline" aria-label="Toggle disabled outline" disabled>
          Disabled
        </Toggle>
      </div>
    </Example>
  )
}

function ToggleWithIcon() {
  return (
    <Example title="With Icon">
      <div sx={styles.row}>
        <Toggle aria-label="Toggle bookmark" defaultPressed sx={peer.anchor}>
          <Icon
            icon={BookmarkIcon}

            sx={styles.icon}
          />
        </Toggle>
        <Toggle
          variant="outline"
          aria-label="Toggle bookmark outline"
          sx={peer.anchor}
        >
          <Icon
            icon={BookmarkIcon}

            sx={styles.icon}
          />
          Bookmark
        </Toggle>
      </div>
    </Example>
  )
}
