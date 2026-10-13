import * as stylex from "@stylexjs/stylex"
import { Example, ExampleWrapper } from "@/components/example"
import { Button } from "@workspace/ui/components/button"
import { Kbd } from "@workspace/ui/components/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import { AlertCircleIcon, FloppyDiskIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  button: {
    width: "fit-content",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: spacing["2"],
  },
  button2: {
    width: "fit-content",
    textTransform: "capitalize",
  },
  text: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
    borderColor: theme.border,
  },
  text2: {
    display: "inline-block",
    width: "fit-content",
  },
  link: {
    width: "fit-content",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.primary,
    textUnderlineOffset: "4px",
    textDecorationLine: { default: null, ":hover": "underline" },
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["1"],
  },
  paragraph: {
    fontWeight: fontWeight.semibold,
  },
  paragraph2: {
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    opacity: "80%",
  },
})

export default function TooltipExample() {
  return (
    <ExampleWrapper>
      <TooltipBasic />
      <TooltipSides />
      <TooltipWithIcon />
      <TooltipLongContent />
      <TooltipDisabled />
      <TooltipWithKeyboard />
      <TooltipOnLink />
      <TooltipFormatted />
    </ExampleWrapper>
  )
}

function TooltipBasic() {
  return (
    <Example title="Basic">
      <Tooltip>
        <TooltipTrigger
          render={<Button variant="outline" sx={styles.button} />}
        >
          Show Tooltip
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </Example>
  )
}

function TooltipSides() {
  return (
    <Example title="Sides">
      <div sx={styles.row}>
        {(
          [
            "inline-start",
            "left",
            "top",
            "bottom",
            "right",
            "inline-end",
          ] as const
        ).map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger
              render={<Button variant="outline" sx={styles.button2} />}
            >
              {side.replace("-", " ")}
            </TooltipTrigger>
            <TooltipContent side={side}>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </Example>
  )
}

function TooltipWithIcon() {
  return (
    <Example title="With Icon">
      <Tooltip>
        <TooltipTrigger render={<Button variant="ghost" size="icon" />}>
          <Icon icon={AlertCircleIcon} />
          <span sx={styles.text}>Info</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Additional information</p>
        </TooltipContent>
      </Tooltip>
    </Example>
  )
}

function TooltipLongContent() {
  return (
    <Example title="Long Content">
      <Tooltip>
        <TooltipTrigger
          render={<Button variant="outline" sx={styles.button} />}
        >
          Show Tooltip
        </TooltipTrigger>
        <TooltipContent>
          To learn more about how this works, check out the docs. If you have
          any questions, please reach out to us.
        </TooltipContent>
      </Tooltip>
    </Example>
  )
}

function TooltipDisabled() {
  return (
    <Example title="Disabled">
      <Tooltip>
        <TooltipTrigger render={<span sx={styles.text2} />}>
          <Button variant="outline" disabled>
            Disabled
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This feature is currently unavailable</p>
        </TooltipContent>
      </Tooltip>
    </Example>
  )
}

function TooltipWithKeyboard() {
  return (
    <Example title="With Keyboard Shortcut">
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="icon-sm" />}>
          <Icon icon={FloppyDiskIcon} />
        </TooltipTrigger>
        <TooltipContent>
          Save Changes <Kbd>S</Kbd>
        </TooltipContent>
      </Tooltip>
    </Example>
  )
}

function TooltipOnLink() {
  return (
    <Example title="On Link">
      <Tooltip>
        <TooltipTrigger
          render={
            <a href="#" sx={styles.link} onClick={(e) => e.preventDefault()} />
          }
        >
          Learn more
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to read the documentation</p>
        </TooltipContent>
      </Tooltip>
    </Example>
  )
}

function TooltipFormatted() {
  return (
    <Example title="Formatted Content">
      <Tooltip>
        <TooltipTrigger
          render={<Button variant="outline" sx={styles.button} />}
        >
          Status
        </TooltipTrigger>
        <TooltipContent>
          <div sx={styles.stack}>
            <p sx={styles.paragraph}>Active</p>
            <p sx={styles.paragraph2}>Last updated 2 hours ago</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </Example>
  )
}
