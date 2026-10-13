import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "@/components/example"
import { Button } from "@workspace/ui/components/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import { Kbd, KbdGroup } from "@workspace/ui/components/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  DashedLineCircleIcon,
  FloppyDiskIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  row: css({
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
  }),
  tooltipContent: css({
    paddingRight: spacing["1.5"],
  }),
}

export default function KbdExample() {
  return (
    <ExampleWrapper>
      <KbdBasic />
      <KbdModifierKeys />
      <KbdGroupExample />
      <KbdArrowKeys />
      <KbdWithIcons />
      <KbdWithIconsAndText />
      <KbdInInputGroup />
      <KbdInTooltip />
      <KbdWithSamp />
    </ExampleWrapper>
  )
}

function KbdBasic() {
  return (
    <Example title="Basic">
      <div sx={styles.row}>
        <Kbd>Ctrl</Kbd>
        <Kbd>⌘K</Kbd>
        <Kbd>Ctrl + B</Kbd>
      </div>
    </Example>
  )
}

function KbdModifierKeys() {
  return (
    <Example title="Modifier Keys">
      <div sx={styles.row}>
        <Kbd>⌘</Kbd>
        <Kbd>C</Kbd>
      </div>
    </Example>
  )
}

function KbdGroupExample() {
  return (
    <Example title="KbdGroup">
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>Shift</Kbd>
        <Kbd>P</Kbd>
      </KbdGroup>
    </Example>
  )
}

function KbdArrowKeys() {
  return (
    <Example title="Arrow Keys">
      <div sx={styles.row}>
        <Kbd>↑</Kbd>
        <Kbd>↓</Kbd>
        <Kbd>←</Kbd>
        <Kbd>→</Kbd>
      </div>
    </Example>
  )
}

function KbdWithIcons() {
  return (
    <Example title="With Icons">
      <KbdGroup>
        <Kbd>
          <Icon icon={DashedLineCircleIcon} />
        </Kbd>
        <Kbd>
          <Icon icon={ArrowLeft01Icon} />
        </Kbd>
        <Kbd>
          <Icon icon={ArrowRight01Icon} />
        </Kbd>
      </KbdGroup>
    </Example>
  )
}

function KbdWithIconsAndText() {
  return (
    <Example title="With Icons and Text">
      <KbdGroup>
        <Kbd>
          <Icon icon={ArrowLeft01Icon} />
          Left
        </Kbd>
        <Kbd>
          <Icon icon={DashedLineCircleIcon} />
          Voice Enabled
        </Kbd>
      </KbdGroup>
    </Example>
  )
}

function KbdInInputGroup() {
  return (
    <Example title="InputGroup">
      <InputGroup>
        <InputGroupInput />
        <InputGroupAddon>
          <Kbd>Space</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </Example>
  )
}

function KbdInTooltip() {
  return (
    <Example title="Tooltip">
      <Tooltip>
        <TooltipTrigger render={<Button size="icon-sm" variant="outline" />}>
          <Icon icon={FloppyDiskIcon} />
        </TooltipTrigger>
        <TooltipContent sx={styles.tooltipContent}>
          <div sx={styles.row}>
            Save Changes <Kbd>S</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>
    </Example>
  )
}

function KbdWithSamp() {
  return (
    <Example title="With samp">
      <Kbd>
        <samp>File</samp>
      </Kbd>
    </Example>
  )
}
