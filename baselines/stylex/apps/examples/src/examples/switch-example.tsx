import * as stylex from "@stylexjs/stylex"
import { Example, ExampleWrapper } from "@/components/example"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@workspace/ui/components/field"
import { Label } from "@workspace/ui/components/label"
import { Switch } from "@workspace/ui/components/switch"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  row: {
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["12"],
  },
})

export default function SwitchExample() {
  return (
    <ExampleWrapper>
      <SwitchBasic />
      <SwitchWithDescription />
      <SwitchWithLabel />
      <SwitchDisabled />
      <SwitchSizes />
    </ExampleWrapper>
  )
}

function SwitchBasic() {
  return (
    <Example title="Basic">
      <Field orientation="horizontal">
        <Switch id="switch-basic" />
        <FieldLabel htmlFor="switch-basic">Airplane Mode</FieldLabel>
      </Field>
    </Example>
  )
}

function SwitchWithLabel() {
  return (
    <Example title="With Label">
      <div sx={styles.row}>
        <Switch id="switch-bluetooth" defaultChecked />
        <Label htmlFor="switch-bluetooth">Bluetooth</Label>
      </div>
    </Example>
  )
}

function SwitchWithDescription() {
  return (
    <Example title="With Description">
      <FieldLabel htmlFor="switch-focus-mode">
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Share across devices</FieldTitle>
            <FieldDescription>
              Focus is shared across devices, and turns off when you leave the
              app.
            </FieldDescription>
          </FieldContent>
          <Switch id="switch-focus-mode" />
        </Field>
      </FieldLabel>
    </Example>
  )
}

function SwitchDisabled() {
  return (
    <Example title="Disabled">
      <div sx={styles.stack}>
        <div sx={styles.row}>
          <Switch id="switch-disabled-unchecked" disabled />
          <Label htmlFor="switch-disabled-unchecked">
            Disabled (Unchecked)
          </Label>
        </div>
        <div sx={styles.row}>
          <Switch id="switch-disabled-checked" defaultChecked disabled />
          <Label htmlFor="switch-disabled-checked">Disabled (Checked)</Label>
        </div>
      </div>
    </Example>
  )
}

function SwitchSizes() {
  return (
    <Example title="Sizes">
      <div sx={styles.stack}>
        <div sx={styles.row}>
          <Switch id="switch-size-sm" size="sm" />
          <Label htmlFor="switch-size-sm">Small</Label>
        </div>
        <div sx={styles.row}>
          <Switch id="switch-size-default" size="default" />
          <Label htmlFor="switch-size-default">Default</Label>
        </div>
      </div>
    </Example>
  )
}
