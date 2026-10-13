import * as stylex from "@stylexjs/stylex"
import { useState } from "react"
import { toast } from "@/lib/toast"

import { Example, ExampleWrapper } from "@/components/example"
import { Button } from "@workspace/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupText,
} from "@workspace/ui/components/button-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"
import { Kbd, KbdGroup } from "@workspace/ui/components/kbd"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { Spinner } from "@workspace/ui/components/spinner"
import { Textarea } from "@workspace/ui/components/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import {
  AlertCircleIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CodeIcon,
  CopyIcon,
  DeleteIcon,
  LinkSquare02Icon,
  MailIcon,
  RecordIcon,
  RefreshIcon,
  SearchIcon,
  SparklesIcon,
  StarIcon,
  Tick02Icon,
  ViewOffIcon,
  VoiceIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { color } from "@workspace/ui/tokens/colors.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import { fontFamily, fontWeight } from "@workspace/ui/tokens/typography.stylex"
import { animation } from "@workspace/ui/theme/animations.stylex"

const styles = stylex.create({
  exampleWrapper: {
    minWidth: "0px",
  },
  icon: {
    color: theme.mutedForeground,
  },
  icon2: {
    // `animate-pulse`. The keyframes are the shared ones Skeleton uses.
    animationName: animation.pulse,
    animationDuration: "2s",
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
    animationIterationCount: "infinite",
    color: color.red500,
  },
  inputGroup: {
    height: "auto",
  },
  icon3: {
    marginLeft: "auto",
    color: theme.mutedForeground,
  },
  inputGroupButton: {
    borderStartStartRadius: "calc(infinity * 1px)",
    borderStartEndRadius: "calc(infinity * 1px)",
    borderEndStartRadius: "calc(infinity * 1px)",
    borderEndEndRadius: "calc(infinity * 1px)",
  },
  inputGroupButton2: {
    color: theme.mutedForeground,
    fontVariantNumeric: "tabular-nums",
  },
  dropdownMenuContent: {
    minWidth: spacing["16"],
  },
  inputGroupAddon: {
    paddingLeft: spacing["1"],
    color: theme.mutedForeground,
  },
  row: {
    display: "flex",
    width: spacing["4"],
    height: spacing["4"],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "calc(infinity * 1px)",
    backgroundColor: `light-dark(${color.green500}, ${color.green800})`,
  },
  icon4: {
    width: spacing["3"],
    height: spacing["3"],
    color: color.white,
  },
  fieldDescription: {
    color: color.green700,
  },
  fieldGroup: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  },
  card: {
    width: "100%",
  },
  inputGroupTextarea: {
    minHeight: "100px",
  },
  cardFooter: {
    justifyContent: "flex-end",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  },
  inputGroupButton3: {
    marginLeft: "auto",
    borderStartStartRadius: "calc(infinity * 1px)",
    borderStartEndRadius: "calc(infinity * 1px)",
    borderEndStartRadius: "calc(infinity * 1px)",
    borderEndEndRadius: "calc(infinity * 1px)",
  },
  text: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
    borderColor: theme.border,
  },
  inputGroupTextarea2: {
    minHeight: "120px",
  },
  inputGroupButton4: {
    marginLeft: "auto",
  },
  inputGroupTextarea3: {
    minHeight: "300px",
    paddingTop: spacing["3"],
    paddingBottom: spacing["3"],
  },
  inputGroupAddon2: {
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    borderBottomColor: theme.border,
  },
  inputGroupText: {
    fontFamily: fontFamily.mono,
    fontWeight: fontWeight.medium,
  },
  inputGroupAddon3: {
    borderTopStyle: "solid",
    borderTopWidth: "1px",
    borderTopColor: theme.border,
  },
})

export default function InputGroupExample() {
  const [country, setCountry] = useState("+1")

  return (
    <ExampleWrapper sx={styles.exampleWrapper}>
      <InputGroupBasic />
      <InputGroupWithAddons />
      <InputGroupWithButtons />
      <InputGroupWithTooltip country={country} setCountry={setCountry} />
      <InputGroupWithKbd />
      <InputGroupInCard />
      <InputGroupTextareaExamples />
    </ExampleWrapper>
  )
}

function InputGroupBasic() {
  return (
    <Example title="Basic">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="input-default-01">
            Default (No Input Group)
          </FieldLabel>
          <Input placeholder="Placeholder" id="input-default-01" />
        </Field>
        <Field>
          <FieldLabel htmlFor="input-group-02">Input Group</FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-group-02" placeholder="Placeholder" />
          </InputGroup>
        </Field>
        <Field data-disabled="true">
          <FieldLabel htmlFor="input-disabled-03">Disabled</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="input-disabled-03"
              placeholder="This field is disabled"
              disabled
            />
          </InputGroup>
        </Field>
        <Field data-invalid="true">
          <FieldLabel htmlFor="input-invalid-04">Invalid</FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="input-invalid-04"
              placeholder="This field is invalid"
              aria-invalid="true"
            />
          </InputGroup>
        </Field>
      </FieldGroup>
    </Example>
  )
}

function InputGroupWithAddons() {
  return (
    <Example title="With Addons">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="input-icon-left-05">
            Addon (inline-start)
          </FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-icon-left-05" />
            <InputGroupAddon>
              <Icon
                icon={SearchIcon}

                sx={styles.icon}
              />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-icon-right-07">
            Addon (inline-end)
          </FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-icon-right-07" />
            <InputGroupAddon align="inline-end">
              <Icon icon={ViewOffIcon} />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-icon-both-09">
            Addon (inline-start and inline-end)
          </FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-icon-both-09" />
            <InputGroupAddon>
              <Icon
                icon={VoiceIcon}

                sx={styles.icon}
              />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Icon
                icon={RecordIcon}

                sx={styles.icon2}
              />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-addon-20">Addon (block-start)</FieldLabel>
          <InputGroup sx={styles.inputGroup}>
            <InputGroupInput id="input-addon-20" />
            <InputGroupAddon align="block-start">
              <InputGroupText>First Name</InputGroupText>
              <Icon
                icon={AlertCircleIcon}

                sx={styles.icon3}
              />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-addon-21">Addon (block-end)</FieldLabel>
          <InputGroup sx={styles.inputGroup}>
            <InputGroupInput id="input-addon-21" />
            <InputGroupAddon align="block-end">
              <InputGroupText>20/240 characters</InputGroupText>
              <Icon
                icon={AlertCircleIcon}

                sx={styles.icon3}
              />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-icon-both-10">Multiple Icons</FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-icon-both-10" />
            <InputGroupAddon align="inline-end">
              <Icon icon={StarIcon} />
              <InputGroupButton
                size="icon-xs"
                onClick={() => toast("Copied to clipboard")}
              >
                <Icon icon={CopyIcon} />
              </InputGroupButton>
            </InputGroupAddon>
            <InputGroupAddon>
              <Icon
                icon={RecordIcon}

                sx={styles.icon2}
              />
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-description-10">Description</FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-description-10" />
            <InputGroupAddon align="inline-end">
              <Icon icon={AlertCircleIcon} />
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>
            This is a description of the input group.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-label-10">Label</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <FieldLabel htmlFor="input-label-10">Label</FieldLabel>
            </InputGroupAddon>
            <InputGroupInput id="input-label-10" />
          </InputGroup>
          <InputGroup>
            <InputGroupInput id="input-optional-12" aria-label="Optional" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>(optional)</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>
    </Example>
  )
}

function InputGroupWithButtons() {
  return (
    <Example title="With Buttons">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="input-button-13">Button</FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-button-13" />
            <InputGroupAddon>
              <InputGroupButton>Default</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput id="input-button-14" />
            <InputGroupAddon>
              <InputGroupButton variant="outline">Outline</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput id="input-button-15" />
            <InputGroupAddon>
              <InputGroupButton variant="secondary">Secondary</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput id="input-button-16" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton variant="secondary">Button</InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput id="input-button-17" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs">
                <Icon icon={CopyIcon} />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput id="input-button-18" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton variant="secondary" size="icon-xs">
                <Icon icon={DeleteIcon} />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>
    </Example>
  )
}

function InputGroupWithTooltip({
  country,
  setCountry,
}: {
  country: string
  setCountry: (value: string) => void
}) {
  return (
    <Example title="With Tooltip, Dropdown, Popover">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="input-tooltip-20">Tooltip</FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-tooltip-20" />
            <InputGroupAddon align="inline-end">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <InputGroupButton
                      sx={styles.inputGroupButton}
                      size="icon-xs"
                    />
                  }
                >
                  <Icon icon={AlertCircleIcon} />
                </TooltipTrigger>
                <TooltipContent>This is content in a tooltip.</TooltipContent>
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>
            This is a description of the input group.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-dropdown-21">Dropdown</FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-dropdown-21" />
            <InputGroupAddon>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<InputGroupButton sx={styles.inputGroupButton2} />}
                >
                  {country} <Icon icon={ArrowDownIcon} />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  sx={styles.dropdownMenuContent}
                  sideOffset={10}
                  alignOffset={-8}
                >
                  <DropdownMenuItem onClick={() => setCountry("+1")}>
                    +1
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCountry("+44")}>
                    +44
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCountry("+46")}>
                    +46
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>
            This is a description of the input group.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-secure-19">Popover</FieldLabel>
          <InputGroup>
            <Popover>
              <PopoverTrigger render={<InputGroupAddon />} nativeButton={false}>
                <InputGroupButton variant="secondary" size="icon-xs">
                  <Icon icon={AlertCircleIcon} />
                </InputGroupButton>
              </PopoverTrigger>
              <PopoverContent align="start">
                <PopoverHeader>
                  <PopoverTitle>Your connection is not secure.</PopoverTitle>
                  <PopoverDescription>
                    You should not enter any sensitive information on this site.
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>
            <InputGroupAddon sx={styles.inputGroupAddon}>
              https://
            </InputGroupAddon>
            <InputGroupInput id="input-secure-19" />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-xs"
                onClick={() => toast("Added to favorites")}
              >
                <Icon icon={StarIcon} />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>
            This is a description of the input group.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="url">Button Group</FieldLabel>
          <ButtonGroup>
            <ButtonGroupText>https://</ButtonGroupText>
            <InputGroup>
              <InputGroupInput id="url" />
              <InputGroupAddon align="inline-end">
                <Icon icon={AlertCircleIcon} />
              </InputGroupAddon>
            </InputGroup>
            <ButtonGroupText>.com</ButtonGroupText>
          </ButtonGroup>
          <FieldDescription>
            This is a description of the input group.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </Example>
  )
}

function InputGroupWithKbd() {
  return (
    <Example title="With Kbd">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="input-kbd-22">Input Group with Kbd</FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-kbd-22" />
            <InputGroupAddon>
              <Kbd>⌘K</Kbd>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput id="input-kbd-23" />
            <InputGroupAddon align="inline-end">
              <Kbd>⌘K</Kbd>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput
              id="input-search-apps-24"
              placeholder="Search for Apps..."
            />
            <InputGroupAddon align="inline-end">Ask AI</InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Kbd>Tab</Kbd>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupInput
              id="input-search-type-25"
              placeholder="Type to search..."
            />
            <InputGroupAddon align="inline-start">
              <Icon icon={SparklesIcon} />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>C</Kbd>
              </KbdGroup>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="input-username-26">Username</FieldLabel>
          <InputGroup>
            <InputGroupInput id="input-username-26" defaultValue="shadcn" />
            <InputGroupAddon align="inline-end">
              <div sx={styles.row}>
                <Icon
                  icon={Tick02Icon}

                  sx={styles.icon4}
                />
              </div>
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription sx={styles.fieldDescription}>
            This username is available.
          </FieldDescription>
        </Field>
        <InputGroup>
          <InputGroupInput
            id="input-search-docs-27"
            placeholder="Search documentation..."
          />
          <InputGroupAddon>
            <Icon icon={SearchIcon} />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
        </InputGroup>
        <InputGroup data-disabled="true">
          <InputGroupInput
            id="input-search-disabled-28"
            placeholder="Search documentation..."
            disabled
          />
          <InputGroupAddon>
            <Icon icon={SearchIcon} />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">Disabled</InputGroupAddon>
        </InputGroup>
        <FieldGroup sx={styles.fieldGroup}>
          <Field>
            <FieldLabel htmlFor="input-group-11">First Name</FieldLabel>
            <InputGroup>
              <InputGroupInput id="input-group-11" placeholder="First Name" />
              <InputGroupAddon align="inline-end">
                <Icon icon={AlertCircleIcon} />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="input-group-12">Last Name</FieldLabel>
            <InputGroup>
              <InputGroupInput id="input-group-12" placeholder="Last Name" />
              <InputGroupAddon align="inline-end">
                <Icon icon={AlertCircleIcon} />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
        <Field data-disabled="true">
          <FieldLabel htmlFor="input-group-29">
            Loading (&quot;data-disabled=&quot;true&quot;)
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              id="input-group-29"
              disabled
              defaultValue="shadcn"
            />
            <InputGroupAddon align="inline-end">
              <Spinner />
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>
            This is a description of the input group.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </Example>
  )
}

function InputGroupInCard() {
  return (
    <Example title="In Card">
      <Card sx={styles.card}>
        <CardHeader>
          <CardTitle>Card with Input Group</CardTitle>
          <CardDescription>This is a card with an input group.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email-input">Email Address</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="email-input"
                  type="email"
                  placeholder="you@example.com"
                />
                <InputGroupAddon align="inline-end">
                  <Icon icon={MailIcon} />
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="website-input">Website URL</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>https://</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput id="website-input" placeholder="example.com" />
                <InputGroupAddon align="inline-end">
                  <Icon icon={LinkSquare02Icon} />
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="feedback-textarea">
                Feedback & Comments
              </FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  id="feedback-textarea"
                  placeholder="Share your thoughts..."
                  sx={styles.inputGroupTextarea}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupText>0/500 characters</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter sx={styles.cardFooter}>
          <Button variant="outline">Cancel</Button>
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </Example>
  )
}

function InputGroupTextareaExamples() {
  return (
    <Example title="Textarea">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="textarea-header-footer-12">
            Default Textarea (No Input Group)
          </FieldLabel>
          <Textarea
            id="textarea-header-footer-12"
            placeholder="Enter your text here..."
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="textarea-header-footer-13">
            Input Group
          </FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              id="textarea-header-footer-13"
              placeholder="Enter your text here..."
            />
          </InputGroup>
          <FieldDescription>
            This is a description of the input group.
          </FieldDescription>
        </Field>
        <Field data-invalid="true">
          <FieldLabel htmlFor="textarea-header-footer-14">Invalid</FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              id="textarea-header-footer-14"
              placeholder="Enter your text here..."
              aria-invalid="true"
            />
          </InputGroup>
          <FieldDescription>
            This is a description of the input group.
          </FieldDescription>
        </Field>
        <Field data-disabled="true">
          <FieldLabel htmlFor="textarea-header-footer-15">Disabled</FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              id="textarea-header-footer-15"
              placeholder="Enter your text here..."
              disabled
            />
          </InputGroup>
          <FieldDescription>
            This is a description of the input group.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="prompt-31">Addon (block-start)</FieldLabel>
          <InputGroup>
            <InputGroupTextarea id="prompt-31" />
            <InputGroupAddon align="block-start">
              <InputGroupText>Ask, Search or Chat...</InputGroupText>
              <Icon
                icon={AlertCircleIcon}

                sx={styles.icon3}
              />
            </InputGroupAddon>
          </InputGroup>
          <FieldDescription>
            This is a description of the input group.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="textarea-header-footer-30">
            Addon (block-end)
          </FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              id="textarea-header-footer-30"
              placeholder="Enter your text here..."
            />
            <InputGroupAddon align="block-end">
              <InputGroupText>0/280 characters</InputGroupText>
              <InputGroupButton
                variant="default"
                size="icon-xs"
                sx={styles.inputGroupButton3}
              >
                <Icon icon={ArrowUpIcon} />
                <span sx={styles.text}>Send</span>
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="textarea-comment-31">Addon (Buttons)</FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              id="textarea-comment-31"
              placeholder="Share your thoughts..."
              sx={styles.inputGroupTextarea2}
            />
            <InputGroupAddon align="block-end">
              <InputGroupButton
                variant="ghost"
                sx={styles.inputGroupButton4}
                size="sm"
              >
                Cancel
              </InputGroupButton>
              <InputGroupButton variant="default" size="sm">
                Post Comment
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="textarea-code-32">Code Editor</FieldLabel>
          <InputGroup>
            <InputGroupTextarea
              id="textarea-code-32"
              placeholder="console.log('Hello, world!');"
              sx={styles.inputGroupTextarea3}
            />
            <InputGroupAddon align="block-start" sx={styles.inputGroupAddon2}>
              <InputGroupText sx={styles.inputGroupText}>
                <Icon icon={CodeIcon} />
                script.js
              </InputGroupText>
              <InputGroupButton size="icon-xs" sx={styles.inputGroupButton4}>
                <Icon icon={RefreshIcon} />
              </InputGroupButton>
              <InputGroupButton size="icon-xs" variant="ghost">
                <Icon icon={CopyIcon} />
              </InputGroupButton>
            </InputGroupAddon>
            <InputGroupAddon align="block-end" sx={styles.inputGroupAddon3}>
              <InputGroupText>Line 1, Column 1</InputGroupText>
              <InputGroupText sx={styles.inputGroupButton4}>
                JavaScript
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Field>
      </FieldGroup>
    </Example>
  )
}
