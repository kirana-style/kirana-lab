import * as stylex from "@stylexjs/stylex"
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@workspace/ui/components/hover-card"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { fontWeight } from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  example: {
    gridColumnStart: "span 2",
    gridColumnEnd: "span 2",
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing["2"],
  },
  button: {
    textTransform: "capitalize",
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["1.5"],
  },
  heading: {
    fontWeight: fontWeight.medium,
  },
  button2: {
    width: "fit-content",
  },
})

export default function HoverCardExample() {
  return (
    <ExampleWrapper>
      <HoverCardSides />
      <HoverCardInDialog />
    </ExampleWrapper>
  )
}

const HOVER_CARD_SIDES = [
  "inline-start",
  "left",
  "top",
  "bottom",
  "right",
  "inline-end",
] as const

function HoverCardSides() {
  return (
    <Example title="Sides" containerSx={styles.example}>
      <div sx={styles.row}>
        {HOVER_CARD_SIDES.map((side) => (
          <HoverCard key={side}>
            <HoverCardTrigger
              delay={100}
              closeDelay={100}
              render={<Button variant="outline" sx={styles.button} />}
            >
              {side.replace("-", " ")}
            </HoverCardTrigger>
            <HoverCardContent side={side}>
              <div sx={styles.stack}>
                <h4 sx={styles.heading}>Hover Card</h4>
                <p>
                  This hover card appears on the {side.replace("-", " ")} side
                  of the trigger.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </Example>
  )
}

function HoverCardInDialog() {
  return (
    <Example title="In Dialog">
      <Dialog>
        <DialogTrigger render={<Button variant="outline" />}>
          Open Dialog
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hover Card Example</DialogTitle>
            <DialogDescription>
              Hover over the button below to see the hover card.
            </DialogDescription>
          </DialogHeader>
          <HoverCard>
            <HoverCardTrigger
              delay={100}
              closeDelay={100}
              render={<Button variant="outline" sx={styles.button2} />}
            >
              Hover me
            </HoverCardTrigger>
            <HoverCardContent>
              <div sx={styles.stack}>
                <h4 sx={styles.heading}>Hover Card</h4>
                <p>
                  This hover card appears inside a dialog. Hover over the button
                  to see it.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </DialogContent>
      </Dialog>
    </Example>
  )
}
