import { css } from "@kirana-style/core"
import * as React from "react"

import { Button } from "@workspace/ui/components/button"
import { Card, CardContent, CardFooter } from "@workspace/ui/components/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import { Textarea } from "@workspace/ui/components/textarea"
import { FONTS, useDesignSystemSearchParams } from "@/lib/design-system"
import { theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontFamily,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
} from "@workspace/ui/tokens/typography"

const styles = {
  cardContent: css({
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  }),
  text: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
    textTransform: "uppercase",
  }),
  paragraph: css({
    fontFamily: fontFamily.heading,
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.medium,
  }),
  paragraph2: css({
    fontSize: fontSize.sm,
    lineHeight: leading.relaxed,
    color: theme.mutedForeground,
  }),
  button: css({
    width: "100%",
  }),
  grid: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: spacing["3"],
  }),
  textarea: css({
    minHeight: spacing["24"],
    resize: "none",
  }),
}

export function TypographySpecimen() {
  const [params] = useDesignSystemSearchParams()

  const currentFont = React.useMemo(
    () => FONTS.find((font) => font.value === params.font),
    [params.font]
  )

  const currentFontHeading = React.useMemo(
    () => FONTS.find((font) => font.value === params.fontHeading),
    [params.fontHeading]
  )
  const headingLabel =
    currentFontHeading?.name && currentFontHeading.name !== currentFont?.name
      ? currentFontHeading.name
      : "Inherit"
  const bodyLabel = currentFont?.name ?? "Default"

  return (
    <Card>
      <CardContent sx={styles.cardContent}>
        <div sx={styles.text}>
          {headingLabel} - {bodyLabel}
        </div>
        <p sx={styles.paragraph}>Designing with rhythm and hierarchy.</p>
        <p sx={styles.paragraph2}>
          A strong body style keeps long-form content readable and balances the
          visual weight of headings.
        </p>
        <p sx={styles.paragraph2}>
          Thoughtful spacing and cadence help paragraphs scan quickly without
          feeling dense.
        </p>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger
            render={<Button variant="outline" sx={styles.button} />}
          >
            Share Feedback
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Feedback</DialogTitle>
              <DialogDescription>
                Let us know how we can improve your experience.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <div sx={styles.grid}>
                <Field>
                  <FieldLabel htmlFor="feedback-name">Name</FieldLabel>
                  <Input id="feedback-name" placeholder="Your name" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="feedback-email">Email</FieldLabel>
                  <Input
                    id="feedback-email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </Field>
              </div>
              <Field>
                <FieldLabel htmlFor="feedback-category">Category</FieldLabel>
                <Select
                  items={[
                    { label: "General", value: "general" },
                    { label: "Bug Report", value: "bug" },
                    { label: "Feature Request", value: "feature" },
                    { label: "Improvement", value: "improvement" },
                  ]}
                  defaultValue="general"
                >
                  <SelectTrigger id="feedback-category" sx={styles.button}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="bug">Bug Report</SelectItem>
                      <SelectItem value="feature">Feature Request</SelectItem>
                      <SelectItem value="improvement">Improvement</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="feedback-message">Message</FieldLabel>
                <Textarea
                  id="feedback-message"
                  placeholder="Tell us what's on your mind..."
                  sx={styles.textarea}
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>
                Cancel
              </DialogClose>
              <Button>Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}
