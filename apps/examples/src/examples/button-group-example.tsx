import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "@/components/example"
import { Button } from "@workspace/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupText,
} from "@workspace/ui/components/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Field, FieldGroup } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import { Label } from "@workspace/ui/components/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip"
import {
  AlertCircleIcon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowLeft02Icon,
  ArrowRight01Icon,
  ArrowRight02Icon,
  AudioWave01Icon,
  Copy01Icon,
  Delete02Icon,
  FlipHorizontalIcon,
  FlipVerticalIcon,
  MinusSignIcon,
  Notification02Icon,
  PlusSignIcon,
  Rotate01Icon,
  Search01Icon,
  Share03Icon,
  Tick02Icon,
  UserRemove01Icon,
  VolumeOffIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  stack: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing["4"],
  }),
  dropdownMenuContent: css({
    width: "12.5rem",
  }),
  inputGroupAddon: css({
    color: theme.mutedForeground,
  }),
  fieldGroup: css({
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    rowGap: spacing["4"],
    columnGap: spacing["4"],
  }),
  field: css({
    gridColumnStart: "span 2",
    gridColumnEnd: "span 2",
  }),
  button: css({
    width: spacing["12"],
  }),
  row: css({
    display: "flex",
    gap: spacing["6"],
  }),
  buttonGroup: css({
    height: "fit-content",
  }),
}

export default function ButtonGroupExample() {
  return (
    <ExampleWrapper>
      <ButtonGroupBasic />
      <ButtonGroupWithInput />
      <ButtonGroupWithText />
      <ButtonGroupWithDropdown />
      <ButtonGroupWithSelect />
      <ButtonGroupWithIcons />
      <ButtonGroupWithInputGroup />
      <ButtonGroupWithFields />
      <ButtonGroupWithLike />
      <ButtonGroupWithSelectAndInput />
      <ButtonGroupNested />
      <ButtonGroupPagination />
      <ButtonGroupPaginationSplit />
      <ButtonGroupNavigation />
      <ButtonGroupTextAlignment />
      <ButtonGroupVertical />
      <ButtonGroupVerticalNested />
    </ExampleWrapper>
  )
}

function ButtonGroupBasic() {
  return (
    <Example title="Basic">
      <div sx={styles.stack}>
        <ButtonGroup>
          <Button variant="outline">Button</Button>
          <Button variant="outline">Another Button</Button>
        </ButtonGroup>
      </div>
    </Example>
  )
}

function ButtonGroupWithInput() {
  return (
    <Example title="With Input">
      <div sx={styles.stack}>
        <ButtonGroup>
          <Button variant="outline">Button</Button>
          <Input placeholder="Type something here..." />
        </ButtonGroup>
        <ButtonGroup>
          <Input placeholder="Type something here..." />
          <Button variant="outline">Button</Button>
        </ButtonGroup>
      </div>
    </Example>
  )
}

function ButtonGroupWithText() {
  return (
    <Example title="With Text">
      <div sx={styles.stack}>
        <ButtonGroup>
          <ButtonGroupText>Text</ButtonGroupText>
          <Button variant="outline">Another Button</Button>
        </ButtonGroup>
        <ButtonGroup>
          <ButtonGroupText render={<label htmlFor="input-text" />}>
            GPU Size
          </ButtonGroupText>
          <Input id="input-text" placeholder="Type something here..." />
        </ButtonGroup>
      </div>
    </Example>
  )
}

function ButtonGroupWithDropdown() {
  return (
    <Example title="With Dropdown">
      <div sx={styles.stack}>
        <ButtonGroup>
          <Button variant="outline">Update</Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" size="icon" />}
            >
              <Icon icon={ArrowDown01Icon} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Disable</DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                Uninstall
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">Follow</Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" size="icon" />}
            >
              <Icon icon={ArrowDown01Icon} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sx={styles.dropdownMenuContent}>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Icon icon={VolumeOffIcon} />
                  Mute Conversation
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon icon={Tick02Icon} />
                  Mark as Read
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon icon={AlertCircleIcon} />
                  Report Conversation
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon icon={UserRemove01Icon} />
                  Block User
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon icon={Share03Icon} />
                  Share Conversation
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon icon={Copy01Icon} />
                  Copy Conversation
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem variant="destructive">
                  <Icon icon={Delete02Icon} />
                  Delete Conversation
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </div>
    </Example>
  )
}

const currencyItems = [
  { label: "$", value: "$" },
  { label: "€", value: "€" },
  { label: "£", value: "£" },
]

function ButtonGroupWithSelect() {
  return (
    <Example title="With Select">
      <Field>
        <Label htmlFor="amount">Amount</Label>
        <ButtonGroup>
          <Select items={currencyItems} defaultValue={currencyItems[0]}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {currencyItems.map((item) => (
                  <SelectItem key={item.value} value={item}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input placeholder="Enter amount to send" />
          <Button variant="outline">
            <Icon icon={ArrowRight01Icon} />
          </Button>
        </ButtonGroup>
      </Field>
    </Example>
  )
}

function ButtonGroupWithIcons() {
  return (
    <Example title="With Icons">
      <div sx={styles.stack}>
        <ButtonGroup>
          <Button variant="outline">
            <Icon icon={FlipHorizontalIcon} />
          </Button>
          <Button variant="outline">
            <Icon icon={FlipVerticalIcon} />
          </Button>
          <Button variant="outline">
            <Icon icon={Rotate01Icon} />
          </Button>
        </ButtonGroup>
      </div>
    </Example>
  )
}

function ButtonGroupWithInputGroup() {
  return (
    <Example title="With Input Group">
      <div sx={styles.stack}>
        <InputGroup>
          <InputGroupInput placeholder="Type to search..." />
          <InputGroupAddon align="inline-start" sx={styles.inputGroupAddon}>
            <Icon icon={Search01Icon} />
          </InputGroupAddon>
        </InputGroup>
      </div>
    </Example>
  )
}

function ButtonGroupWithFields() {
  return (
    <Example title="With Fields">
      <FieldGroup sx={styles.fieldGroup}>
        <Field sx={styles.field}>
          <Label htmlFor="width">Width</Label>
          <ButtonGroup>
            <InputGroup>
              <InputGroupInput id="width" />
              <InputGroupAddon sx={styles.inputGroupAddon}>W</InputGroupAddon>
              <InputGroupAddon align="inline-end" sx={styles.inputGroupAddon}>
                px
              </InputGroupAddon>
            </InputGroup>
            <Button variant="outline" size="icon">
              <Icon icon={MinusSignIcon} />
            </Button>
            <Button variant="outline" size="icon">
              <Icon icon={PlusSignIcon} />
            </Button>
          </ButtonGroup>
        </Field>
      </FieldGroup>
    </Example>
  )
}

function ButtonGroupWithLike() {
  return (
    <Example title="With Like">
      <ButtonGroup>
        <Button variant="outline">
          <Icon
            icon={Notification02Icon}

            data-icon="inline-start"
          />{" "}
          Like
        </Button>
        <Button
          variant="outline"
          size="icon"
          sx={styles.button}
          render={<span />}
          nativeButton={false}
        >
          1.2K
        </Button>
      </ButtonGroup>
    </Example>
  )
}

const durationItems = [
  { label: "Hours", value: "hours" },
  { label: "Days", value: "days" },
  { label: "Weeks", value: "weeks" },
]

function ButtonGroupWithSelectAndInput() {
  return (
    <Example title="With Select and Input">
      <ButtonGroup>
        <Select items={durationItems} defaultValue={durationItems[0]}>
          <SelectTrigger id="duration">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              {durationItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input />
      </ButtonGroup>
    </Example>
  )
}

function ButtonGroupNested() {
  return (
    <Example title="Nested">
      <ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="icon">
            <Icon icon={PlusSignIcon} />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <InputGroup>
            <InputGroupInput placeholder="Send a message..." />
            <Tooltip>
              <TooltipTrigger render={<InputGroupAddon align="inline-end" />}>
                <Icon icon={AudioWave01Icon} />
              </TooltipTrigger>
              <TooltipContent>Voice Mode</TooltipContent>
            </Tooltip>
          </InputGroup>
        </ButtonGroup>
      </ButtonGroup>
    </Example>
  )
}

function ButtonGroupPagination() {
  return (
    <Example title="Pagination">
      <ButtonGroup>
        <Button variant="outline" size="sm">
          <Icon
            icon={ArrowLeft02Icon}

            data-icon="inline-start"
          />
          Previous
        </Button>
        <Button variant="outline" size="sm">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          4
        </Button>
        <Button variant="outline" size="sm">
          5
        </Button>
        <Button variant="outline" size="sm">
          Next
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
      </ButtonGroup>
    </Example>
  )
}

function ButtonGroupPaginationSplit() {
  return (
    <Example title="Pagination Split">
      <ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            4
          </Button>
          <Button variant="outline" size="sm">
            5
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="icon-xs">
            <Icon icon={ArrowLeft01Icon} />
          </Button>
          <Button variant="outline" size="icon-xs">
            <Icon icon={ArrowRight01Icon} />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </Example>
  )
}

function ButtonGroupNavigation() {
  return (
    <Example title="Navigation">
      <ButtonGroup>
        <ButtonGroup>
          <Button variant="outline">
            <Icon icon={ArrowLeft01Icon} />
          </Button>
          <Button variant="outline">
            <Icon icon={ArrowRight01Icon} />
          </Button>
        </ButtonGroup>
        <ButtonGroup aria-label="Single navigation button">
          <Button variant="outline" size="icon">
            <Icon icon={ArrowLeft01Icon} />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </Example>
  )
}

function ButtonGroupTextAlignment() {
  return (
    <Example title="Text Alignment">
      <Field>
        <Label id="alignment-label">Text Alignment</Label>
        <ButtonGroup aria-labelledby="alignment-label">
          <Button variant="outline" size="sm">
            Left
          </Button>
          <Button variant="outline" size="sm">
            Center
          </Button>
          <Button variant="outline" size="sm">
            Right
          </Button>
          <Button variant="outline" size="sm">
            Justify
          </Button>
        </ButtonGroup>
      </Field>
    </Example>
  )
}

function ButtonGroupVertical() {
  return (
    <Example title="Vertical">
      <div sx={styles.row}>
        <ButtonGroup
          orientation="vertical"
          aria-label="Media controls"
          sx={styles.buttonGroup}
        >
          <Button variant="outline" size="icon">
            <Icon icon={PlusSignIcon} />
          </Button>
          <Button variant="outline" size="icon">
            <Icon icon={MinusSignIcon} />
          </Button>
        </ButtonGroup>
      </div>
    </Example>
  )
}

function ButtonGroupVerticalNested() {
  return (
    <Example title="Vertical Nested">
      <ButtonGroup orientation="vertical" aria-label="Design tools palette">
        <ButtonGroup orientation="vertical">
          <Button variant="outline" size="icon">
            <Icon icon={Search01Icon} />
          </Button>
          <Button variant="outline" size="icon">
            <Icon icon={Copy01Icon} />
          </Button>
          <Button variant="outline" size="icon">
            <Icon icon={Share03Icon} />
          </Button>
        </ButtonGroup>
        <ButtonGroup orientation="vertical">
          <Button variant="outline" size="icon">
            <Icon icon={FlipHorizontalIcon} />
          </Button>
          <Button variant="outline" size="icon">
            <Icon icon={FlipVerticalIcon} />
          </Button>
          <Button variant="outline" size="icon">
            <Icon icon={Rotate01Icon} />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="outline" size="icon">
            <Icon icon={Delete02Icon} />
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </Example>
  )
}
