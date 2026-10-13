import { css } from "@kirana-style/core"
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
import { radius, theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"
import { fontSize, lineHeight } from "@workspace/ui/tokens/typography"

const styles = {
  cardContent: css({
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  }),
  grid: css({
    display: "grid",
    gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    gap: spacing["1.5"],
  }),
  box: css({
    borderRadius: radius.md,
    padding: spacing["1.5"],
    textAlign: "center",
    boxShadow: `0 0 0 1px ${theme.border}`,
  }),
  text: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  box2: css({
    position: "relative",
    marginTop: spacing["1"],
    height: spacing["16"],
    overflow: "hidden",
    borderRadius: radius.sm,
    backgroundColor: theme.muted,
  }),
  box3: css({
    position: "absolute",
    insetInline: "0px",
    bottom: "0px",
    borderRadius: radius.sm,
    backgroundColor: theme.chart3,
  }),
  button: css({
    width: "100%",
  }),
}

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
