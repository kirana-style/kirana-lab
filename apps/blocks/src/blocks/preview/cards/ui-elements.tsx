import { css } from "@kirana-style/core"
import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { ButtonGroup } from "@workspace/ui/components/button-group"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Checkbox } from "@workspace/ui/components/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Field, FieldGroup } from "@workspace/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@workspace/ui/components/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@workspace/ui/components/item"
import {
  RadioGroup,
  RadioGroupItem,
} from "@workspace/ui/components/radio-group"
import { Slider } from "@workspace/ui/components/slider"
import { Switch } from "@workspace/ui/components/switch"
import { Textarea } from "@workspace/ui/components/textarea"
import { ArrowUp01Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  card: css({
    width: "100%",
  }),
  cardContent: css({
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["6"],
    columnGap: spacing["6"],
  }),
  stack: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing["4"],
  }),
  row: css({
    display: "flex",
    flexWrap: "wrap",
    gap: spacing["2"],
  }),
  itemDescription: css({
    textWrap: "pretty",
    // The description's own line clamp is restated below `xl`.
    display: {
      base: "-webkit-box",
      "@media (min-width: 80rem) and (max-width: 95.999rem)": "none",
      [breakpoint["2xl"]]: "block",
    },
  }),
  itemActions: css({
    display: { base: "none", [breakpoint.md]: "flex" },
  }),
  slider: css({
    flex: 1,
  }),
  textarea: css({
    resize: "none",
  }),
  row2: css({
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
  }),
  row3: css({
    display: "flex",
    gap: spacing["2"],
  }),
  radioGroup: css({
    marginLeft: "auto",
    display: "flex",
    width: "fit-content",
    rowGap: spacing["3"],
    columnGap: spacing["3"],
  }),
  row4: css({
    display: "flex",
    gap: spacing["3"],
  }),
  row5: css({
    display: "flex",
    alignItems: "center",
    gap: spacing["4"],
  }),
  text: css({
    display: { base: "none", [breakpoint.md]: "flex" },
  }),
  text2: css({
    display: { base: "flex", [breakpoint.md]: "none" },
  }),
  text3: css({
    display: "none",
  }),
  dropdownMenuContent: css({
    width: "fit-content",
  }),
  switch: css({
    marginLeft: "auto",
  }),
}

export function UIElements() {
  const [sliderValue, setSliderValue] = React.useState<number[]>([500])
  const handleSliderValueChange = React.useCallback(
    (value: number | readonly number[]) => {
      if (typeof value === "number") {
        setSliderValue([value])
      } else {
        setSliderValue([...value])
      }
    },
    []
  )

  return (
    <Card sx={styles.card}>
      <CardContent sx={styles.cardContent}>
        <div sx={styles.stack}>
          <div sx={styles.row}>
            <Button>Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <Item variant="outline">
            <ItemContent>
              <ItemTitle>Two-factor authentication</ItemTitle>
              <ItemDescription sx={styles.itemDescription}>
                Verify via email or phone number.
              </ItemDescription>
            </ItemContent>
            <ItemActions sx={styles.itemActions}>
              <Button size="sm" variant="secondary">
                Enable
              </Button>
            </ItemActions>
          </Item>
        </div>
        <Slider
          value={sliderValue}
          onValueChange={handleSliderValueChange}
          max={1000}
          min={0}
          step={10}
          sx={styles.slider}
          aria-label="Slider"
        />
        <FieldGroup>
          <Field>
            <InputGroup>
              <InputGroupInput placeholder="Name" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>
                  <Icon icon={Search01Icon} />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field sx={styles.slider}>
            <Textarea placeholder="Message" sx={styles.textarea} />
          </Field>
        </FieldGroup>
        <div sx={styles.row2}>
          <div sx={styles.row3}>
            <Badge>Badge</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <RadioGroup defaultValue="apple" sx={styles.radioGroup}>
            <RadioGroupItem value="apple" />
            <RadioGroupItem value="banana" />
          </RadioGroup>
          <div sx={styles.row4}>
            <Checkbox defaultChecked />
            <Checkbox />
          </div>
        </div>
        <div sx={styles.row5}>
          <AlertDialog>
            <AlertDialogTrigger render={<Button variant="outline" />}>
              <span sx={styles.text}>Alert Dialog</span>
              <span sx={styles.text2}>Dialog</span>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogTitle>Allow accessory to connect?</AlertDialogTitle>
                <AlertDialogDescription>
                  Do you want to allow the USB accessory to connect to this
                  device and your data?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
                <AlertDialogAction>Allow</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <ButtonGroup>
            <Button variant="outline">
              <span>Button Group</span>
              <span sx={styles.text3}>Group</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" size="icon" />}
              >
                <Icon icon={ArrowUp01Icon} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                side="top"
                sx={styles.dropdownMenuContent}
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Mute Conversation</DropdownMenuItem>
                  <DropdownMenuItem>Mark as Read</DropdownMenuItem>
                  <DropdownMenuItem>Block User</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Conversation</DropdownMenuLabel>
                  <DropdownMenuItem>Share Conversation</DropdownMenuItem>
                  <DropdownMenuItem>Copy Conversation</DropdownMenuItem>
                  <DropdownMenuItem>Report Conversation</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem variant="destructive">
                    Delete Conversation
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
          <Switch defaultChecked sx={styles.switch} />
        </div>
      </CardContent>
    </Card>
  )
}
