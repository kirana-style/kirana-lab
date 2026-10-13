import * as stylex from "@stylexjs/stylex"
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
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
import {
  AlertCircleIcon,
  ArrowDown01Icon,
  ArrowLeft02Icon,
  ArrowRight01Icon,
  ArrowRight02Icon,
  ArrowUp01Icon,
  Copy01Icon,
  Delete02Icon,
  Loading03Icon,
  MinusSignIcon,
  MoreHorizontalCircle01Icon,
  PlusSignIcon,
  Search01Icon,
  Settings01Icon,
  Share03Icon,
  ShoppingBag01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { ctx } from "@workspace/ui/theme/context.stylex"
import { radius, surface, theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { fontFamily } from "@workspace/ui/tokens/typography.stylex"

/**
 * The palette swatches. The names are shown as written; the colours come from the
 * semantic tokens, because StyleX hashes the custom-property names.
 */
const SWATCHES: Record<string, string> = {
  "--background": theme.background,
  "--foreground": theme.foreground,
  "--primary": theme.primary,
  "--secondary": theme.secondary,
  "--muted": theme.muted,
  "--accent": theme.accent,
  "--border": theme.border,
  "--chart-1": theme.chart1,
  "--chart-2": theme.chart2,
  "--chart-3": theme.chart3,
  "--chart-4": theme.chart4,
  "--chart-5": theme.chart5,
}

const styles = stylex.create({
  swatchColor: (color: string) => ({ backgroundColor: color }),
  stack: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `light-dark(${theme.muted}, ${theme.background})`,
    padding: {
      default: spacing["4"],
      "@media (min-width: 40rem) and (max-width: 63.999rem)": spacing["6"],
      [breakpoint.lg]: spacing["12"],
    },
  },
  grid: {
    display: "grid",
    maxWidth: "48rem",
    gap: spacing["4"],
    gridTemplateColumns: {
      default: null,
      [breakpoint.sm]: "repeat(2, minmax(0, 1fr))",
    },
  },
  stack2: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["4"],
  },
  cardDescription: {
    overflowX: "hidden",
    overflowY: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
    gap: spacing["3"],
  },
  stack3: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing["2"],
  },
  box: {
    position: "relative",
    aspectRatio: "1 / 1",
    width: "100%",
    borderRadius: radius.lg,
    "::after": {
      position: "absolute",
      borderRadius: radius.lg,
      content: "''",
      inset: "0px",
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: theme.border,
      mixBlendMode: surface.imageRingBlend,
    },
  },
  text: {
    display: { default: "none", [breakpoint.md]: "block" },
    maxWidth: spacing["14"],
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: fontFamily.mono,
    fontSize: "0.60rem",
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(8, minmax(0, 1fr))",
    placeItems: "center",
    gap: spacing["4"],
  },
  card: {
    [ctx.iconSize]: spacing["4"],
    display: "flex",
    width: spacing["8"],
    height: spacing["8"],
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
    // `shadow-none` clears only the drop shadow; the card keeps its ring.
  },
  card2: {
    width: "100%",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["6"],
    columnGap: spacing["6"],
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    gap: spacing["2"],
  },
  itemDescription: {
    textWrap: "pretty",
    // The description's own line clamp is restated below `xl`.
    display: {
      default: "-webkit-box",
      "@media (min-width: 80rem) and (max-width: 95.999rem)": "none",
      [breakpoint["2xl"]]: "block",
    },
  },
  itemActions: {
    display: { default: "none", [breakpoint.md]: "flex" },
  },
  slider: {
    flex: 1,
  },
  textarea: {
    resize: "none",
  },
  row2: {
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
  },
  row3: {
    display: "flex",
    gap: spacing["2"],
  },
  radioGroup: {
    marginLeft: "auto",
    display: "flex",
    width: "fit-content",
    rowGap: spacing["3"],
    columnGap: spacing["3"],
  },
  row4: {
    display: "flex",
    gap: spacing["3"],
  },
  row5: {
    display: "flex",
    alignItems: "center",
    gap: spacing["4"],
  },
  text2: {
    display: { default: "none", [breakpoint.md]: "block" },
  },
  text3: {
    display: { default: "block", [breakpoint.md]: "none" },
  },
  dropdownMenuContent: {
    width: "fit-content",
  },
  switch: {
    marginLeft: "auto",
  },
})

export function Demo() {
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
    <div sx={styles.stack}>
      <div sx={styles.grid}>
        <div sx={styles.stack2}>
          <Card>
            <CardHeader>
              <CardTitle>Style Overview</CardTitle>
              <CardDescription sx={styles.cardDescription}>
                Designers love packing quirky glyphs into test phrases. This is
                a preview of the typography styles.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div sx={styles.grid2}>
                {[
                  "--background",
                  "--foreground",
                  "--primary",
                  "--secondary",
                  "--muted",
                  "--accent",
                  "--border",
                  "--chart-1",
                  "--chart-2",
                  "--chart-3",
                  "--chart-4",
                  "--chart-5",
                ].map((variant) => (
                  <div key={variant} sx={styles.stack3}>
                    <div
                      sx={[styles.box, styles.swatchColor(SWATCHES[variant]!)]}
                    />
                    <div sx={styles.text}>{variant}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div sx={styles.grid3}>
                <Card sx={styles.card}>
                  <Icon icon={Copy01Icon} />
                </Card>
                <Card sx={styles.card}>
                  <Icon icon={AlertCircleIcon} />
                </Card>
                <Card sx={styles.card}>
                  <Icon icon={Delete02Icon} />
                </Card>
                <Card sx={styles.card}>
                  <Icon icon={Share03Icon} />
                </Card>
                <Card sx={styles.card}>
                  <Icon icon={ShoppingBag01Icon} />
                </Card>
                <Card sx={styles.card}>
                  <Icon icon={MoreHorizontalCircle01Icon} />
                </Card>
                <Card sx={styles.card}>
                  <Icon icon={Loading03Icon} />
                </Card>
                <Card sx={styles.card}>
                  <Icon icon={PlusSignIcon} />
                </Card>
                <Card sx={styles.card}>
                  <Icon icon={MinusSignIcon} />
                </Card>
                <Card sx={styles.card}>
                  <Icon icon={ArrowLeft02Icon} />
                </Card>
                <Card sx={styles.card}>
                  <Icon icon={ArrowRight02Icon} />
                </Card>
                <Card sx={styles.card}>
                  <Icon icon={Tick02Icon} />
                </Card>
                <Card sx={styles.card}>
                  <Icon icon={ArrowDown01Icon} />
                </Card>
                <Card sx={styles.card}>
                  <Icon icon={ArrowRight01Icon} />
                </Card>
                <Card sx={styles.card}>
                  <Icon icon={Search01Icon} />
                </Card>
                <Card sx={styles.card}>
                  <Icon icon={Settings01Icon} />
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
        <div sx={styles.stack2}>
          <Card sx={styles.card2}>
            <CardContent sx={styles.cardContent}>
              <div sx={styles.stack2}>
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
                    <span sx={styles.text2}>Alert Dialog</span>
                    <span sx={styles.text3}>Dialog</span>
                  </AlertDialogTrigger>
                  <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Allow accessory to connect?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Do you want to allow the USB accessory to connect to
                        this device and your data?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Don&apos;t allow</AlertDialogCancel>
                      <AlertDialogAction>Allow</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <ButtonGroup>
                  <Button variant="outline">Button Group</Button>
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
        </div>
      </div>
    </div>
  )
}
