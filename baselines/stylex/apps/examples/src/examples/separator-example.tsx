import * as stylex from "@stylexjs/stylex"
import { Example, ExampleWrapper } from "@/components/example"
import { Separator } from "@workspace/ui/components/separator"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["4"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
  stack2: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["1"],
  },
  text: {
    lineHeight: 1,
    fontWeight: fontWeight.medium,
  },
  text2: {
    color: theme.mutedForeground,
  },
  row: {
    display: "flex",
    height: spacing["5"],
    alignItems: "center",
    gap: spacing["4"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
  row2: {
    display: "flex",
    alignItems: "center",
    gap: { default: spacing["2"], [breakpoint.md]: spacing["4"] },
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
  text3: {
    fontWeight: fontWeight.medium,
  },
  text4: {
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  },
  stack3: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["2"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
  dl: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
})

export default function SeparatorExample() {
  return (
    <ExampleWrapper>
      <SeparatorHorizontal />
      <SeparatorVertical />
      <SeparatorVerticalMenu />
      <SeparatorInList />
    </ExampleWrapper>
  )
}

function SeparatorHorizontal() {
  return (
    <Example title="Horizontal">
      <div sx={styles.stack}>
        <div sx={styles.stack2}>
          <div sx={styles.text}>shadcn/ui</div>
          <div sx={styles.text2}>The Foundation for your Design System</div>
        </div>
        <Separator />
        <div>
          A set of beautifully designed components that you can customize,
          extend, and build on.
        </div>
      </div>
    </Example>
  )
}

function SeparatorVertical() {
  return (
    <Example title="Vertical">
      <div sx={styles.row}>
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </Example>
  )
}

function SeparatorVerticalMenu() {
  return (
    <Example title="Vertical Menu">
      <div sx={styles.row2}>
        <div sx={styles.stack2}>
          <span sx={styles.text3}>Settings</span>
          <span sx={styles.text4}>Manage preferences</span>
        </div>
        <Separator orientation="vertical" />
        <div sx={styles.stack2}>
          <span sx={styles.text3}>Account</span>
          <span sx={styles.text4}>Profile & security</span>
        </div>
        <Separator orientation="vertical" />
        <div sx={styles.stack2}>
          <span sx={styles.text3}>Help</span>
          <span sx={styles.text4}>Support & docs</span>
        </div>
      </div>
    </Example>
  )
}

function SeparatorInList() {
  return (
    <Example title="In List">
      <div sx={styles.stack3}>
        <dl sx={styles.dl}>
          <dt>Item 1</dt>
          <dd sx={styles.text2}>Value 1</dd>
        </dl>
        <Separator />
        <dl sx={styles.dl}>
          <dt>Item 2</dt>
          <dd sx={styles.text2}>Value 2</dd>
        </dl>
        <Separator />
        <dl sx={styles.dl}>
          <dt>Item 3</dt>
          <dd sx={styles.text2}>Value 3</dd>
        </dl>
      </div>
    </Example>
  )
}
