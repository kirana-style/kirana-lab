import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Slider } from "@workspace/ui/components/slider"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { easing } from "@workspace/ui/tokens/motion.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  cardContent: {
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  },
  stack: {
    display: "flex",
    height: spacing["32"],
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: radius.lg,
    borderStyle: "solid",
    borderWidth: "1px",
    backgroundColor: theme.muted,
    borderColor: theme.border,
  },
  box: {
    backgroundColor: theme.mutedForeground,
    transitionProperty: "all",
    transitionTimingFunction: easing.inOut,
    transitionDuration: "300ms",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: spacing["3"],
  },
  text: {
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.wider,
    color: theme.mutedForeground,
    textTransform: "uppercase",
  },
  slider: {
    flex: 1,
  },
  toggleGroup: {
    width: "100%",
  },
})

export function RollerShades() {
  const [position, setPosition] = React.useState([50])

  const preset =
    position[0] <= 10 ? "open" : position[0] >= 90 ? "closed" : "half"

  return (
    <Card>
      <CardHeader>
        <CardTitle>Living Room</CardTitle>
        <CardDescription>Roller Shades</CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <div sx={styles.stack}>
          <div sx={styles.box} style={{ height: `${position[0]}%` }} />
        </div>
        <div sx={styles.row}>
          <span sx={styles.text}>Open</span>
          <Slider
            value={position}
            onValueChange={(value) =>
              setPosition(Array.isArray(value) ? [...value] : [value])
            }
            max={100}
            sx={styles.slider}
          />
          <span sx={styles.text}>Close</span>
        </div>
      </CardContent>
      <CardFooter>
        <ToggleGroup
          value={[preset]}
          onValueChange={(value) => {
            const v = value[0]
            if (v === "open") setPosition([0])
            if (v === "half") setPosition([50])
            if (v === "closed") setPosition([100])
          }}
          variant="outline"
          spacing={1}
          sx={styles.toggleGroup}
        >
          <ToggleGroupItem value="open" sx={styles.slider}>
            Open
          </ToggleGroupItem>
          <ToggleGroupItem value="half" sx={styles.slider}>
            Half
          </ToggleGroupItem>
          <ToggleGroupItem value="closed" sx={styles.slider}>
            Closed
          </ToggleGroupItem>
        </ToggleGroup>
      </CardFooter>
    </Card>
  )
}
