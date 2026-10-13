import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import { Example, ExampleWrapper } from "@/components/example"
import { Label } from "@workspace/ui/components/label"
import { Slider } from "@workspace/ui/components/slider"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { fontSize, lineHeight } from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  row: {
    display: "flex",
    alignItems: "center",
    gap: spacing["6"],
  },
  slider: {
    height: spacing["40"],
  },
  grid: {
    display: "grid",
    width: "100%",
    gap: spacing["3"],
  },
  row2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing["2"],
  },
  text: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  },
})

export default function SliderExample() {
  return (
    <ExampleWrapper>
      <SliderBasic />
      <SliderRange />
      <SliderMultiple />
      <SliderVertical />
      <SliderControlled />
      <SliderDisabled />
    </ExampleWrapper>
  )
}

function SliderBasic() {
  return (
    <Example title="Basic">
      <Slider defaultValue={50} max={100} step={1} />
    </Example>
  )
}

function SliderRange() {
  return (
    <Example title="Range">
      <Slider defaultValue={[25, 50]} max={100} step={5} />
    </Example>
  )
}

function SliderMultiple() {
  return (
    <Example title="Multiple Thumbs">
      <Slider defaultValue={[10, 20, 70]} max={100} step={10} />
    </Example>
  )
}

function SliderVertical() {
  return (
    <Example title="Vertical">
      <div sx={styles.row}>
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          orientation="vertical"
          sx={styles.slider}
        />
        <Slider
          defaultValue={[25]}
          max={100}
          step={1}
          orientation="vertical"
          sx={styles.slider}
        />
      </div>
    </Example>
  )
}

function SliderControlled() {
  const [value, setValue] = React.useState([0.3, 0.7])

  return (
    <Example title="Controlled">
      <div sx={styles.grid}>
        <div sx={styles.row2}>
          <Label htmlFor="slider-demo-temperature">Temperature</Label>
          <span sx={styles.text}>{value.join(", ")}</span>
        </div>
        <Slider
          id="slider-demo-temperature"
          value={value}
          onValueChange={(next) => setValue(next as number[])}
          min={0}
          max={1}
          step={0.1}
        />
      </div>
    </Example>
  )
}

function SliderDisabled() {
  return (
    <Example title="Disabled">
      <Slider defaultValue={[50]} max={100} step={1} disabled />
    </Example>
  )
}
