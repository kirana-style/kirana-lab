import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { fontSize, lineHeight } from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  cardContent: {
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    gap: spacing["1.5"],
  },
  box: {
    borderRadius: radius.md,
    padding: spacing["1.5"],
    textAlign: "center",
    boxShadow: `0 0 0 1px ${theme.border}`,
  },
  text: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  },
  box2: {
    position: "relative",
    marginTop: spacing["1"],
    height: spacing["16"],
    overflow: "hidden",
    borderRadius: radius.sm,
    backgroundColor: theme.muted,
  },
  box3: {
    position: "absolute",
    insetInline: "0px",
    bottom: "0px",
    borderRadius: radius.sm,
    backgroundColor: theme.chart3,
  },
  button: {
    width: "100%",
  },
})

const FITNESS_WEEKLY_LOAD = [
  { day: "M", load: 84 },
  { day: "T", load: 52 },
  { day: "W", load: 73 },
  { day: "T", load: 66 },
  { day: "F", load: 91 },
  { day: "S", load: 48 },
  { day: "S", load: 61 },
]

export function WeeklyFitnessSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Fitness Summary</CardTitle>
        <CardDescription>Calories and workout load by day</CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <div sx={styles.grid}>
          {FITNESS_WEEKLY_LOAD.map((day, index) => (
            <div key={`${day.day}-${index}`} sx={styles.box}>
              <div sx={styles.text}>{day.day}</div>
              <div sx={styles.box2}>
                <div
                  sx={styles.box3}
                  style={
                    {
                      height: `${day.load}%`,
                    } as React.CSSProperties
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button sx={styles.button}>View details</Button>
      </CardFooter>
    </Card>
  )
}
