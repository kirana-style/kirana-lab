import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "@/components/example"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  button: css({
    width: "fit-content",
  }),
  stack: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing["2"],
  }),
  row: css({
    display: "flex",
    flexWrap: "wrap",
    gap: spacing["2"],
  }),
  button2: css({
    width: "fit-content",
    textTransform: "capitalize",
  }),
  popoverContent: css({
    width: spacing["40"],
  }),
  popoverContent2: css({
    width: spacing["64"],
  }),
  fieldGroup: css({
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  }),
  fieldLabel: css({
    width: "calc(1 / 2 * 100%)",
  }),
  row2: css({
    display: "flex",
    gap: spacing["6"],
  }),
}

export default function PopoverExample() {
  return (
    <ExampleWrapper>
      <PopoverBasic />
      <PopoverSides />
      <PopoverWithForm />
      <PopoverAlignments />
      <PopoverInDialog />
    </ExampleWrapper>
  )
}

function PopoverBasic() {
  return (
    <Example title="Basic">
      <Popover>
        <PopoverTrigger
          render={<Button variant="outline" sx={styles.button} />}
        >
          Open Popover
        </PopoverTrigger>
        <PopoverContent align="start">
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>
              Set the dimensions for the layer.
            </PopoverDescription>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
    </Example>
  )
}

function PopoverSides() {
  return (
    <Example title="Sides">
      <div sx={styles.stack}>
        <div sx={styles.row}>
          {(["inline-start", "left", "top"] as const).map((side) => (
            <Popover key={side}>
              <PopoverTrigger
                render={<Button variant="outline" sx={styles.button2} />}
              >
                {side.replace("-", " ")}
              </PopoverTrigger>
              <PopoverContent side={side} sx={styles.popoverContent}>
                <p>Popover on {side.replace("-", " ")}</p>
              </PopoverContent>
            </Popover>
          ))}
        </div>
        <div sx={styles.row}>
          {(["bottom", "right", "inline-end"] as const).map((side) => (
            <Popover key={side}>
              <PopoverTrigger
                render={<Button variant="outline" sx={styles.button2} />}
              >
                {side.replace("-", " ")}
              </PopoverTrigger>
              <PopoverContent side={side} sx={styles.popoverContent}>
                <p>Popover on {side.replace("-", " ")}</p>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </div>
    </Example>
  )
}

function PopoverWithForm() {
  return (
    <Example title="With Form">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          Open Popover
        </PopoverTrigger>
        <PopoverContent sx={styles.popoverContent2} align="start">
          <PopoverHeader>
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>
              Set the dimensions for the layer.
            </PopoverDescription>
          </PopoverHeader>
          <FieldGroup sx={styles.fieldGroup}>
            <Field orientation="horizontal">
              <FieldLabel htmlFor="width" sx={styles.fieldLabel}>
                Width
              </FieldLabel>
              <Input id="width" defaultValue="100%" />
            </Field>
            <Field orientation="horizontal">
              <FieldLabel htmlFor="height" sx={styles.fieldLabel}>
                Height
              </FieldLabel>
              <Input id="height" defaultValue="25px" />
            </Field>
          </FieldGroup>
        </PopoverContent>
      </Popover>
    </Example>
  )
}

function PopoverAlignments() {
  return (
    <Example title="Alignments">
      <div sx={styles.row2}>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" size="sm" />}>
            Start
          </PopoverTrigger>
          <PopoverContent align="start" sx={styles.popoverContent}>
            Aligned to start
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" size="sm" />}>
            Center
          </PopoverTrigger>
          <PopoverContent align="center" sx={styles.popoverContent}>
            Aligned to center
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger render={<Button variant="outline" size="sm" />}>
            End
          </PopoverTrigger>
          <PopoverContent align="end" sx={styles.popoverContent}>
            Aligned to end
          </PopoverContent>
        </Popover>
      </div>
    </Example>
  )
}

function PopoverInDialog() {
  return (
    <Example title="In Dialog">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Open Dialog
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Popover Example</DialogTitle>
            <DialogDescription>
              Click the button below to see the popover.
            </DialogDescription>
          </DialogHeader>
          <Popover>
            <PopoverTrigger
              render={<Button variant="outline" sx={styles.button} />}
            >
              Open Popover
            </PopoverTrigger>
            <PopoverContent align="start">
              <PopoverHeader>
                <PopoverTitle>Popover in Dialog</PopoverTitle>
                <PopoverDescription>
                  This popover appears inside a dialog. Click the button to open
                  it.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </DialogContent>
      </Dialog>
    </Example>
  )
}
