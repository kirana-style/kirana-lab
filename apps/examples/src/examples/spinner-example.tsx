import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "@/components/example"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import { Field, FieldLabel } from "@workspace/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import { Spinner } from "@workspace/ui/components/spinner"
import { ArrowRight02Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  row: css({
    display: "flex",
    alignItems: "center",
    gap: spacing["6"],
  }),
  spinner: css({
    width: spacing["6"],
    height: spacing["6"],
  }),
  row2: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing["4"],
  }),
  text: css({
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
  }),
  example: css({
    alignItems: "center",
    justifyContent: "center",
  }),
  row3: css({
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing["4"],
  }),
  example2: css({
    gridColumn: { [breakpoint.lg]: "1 / -1" },
  }),
  empty: css({
    minHeight: "300px",
  }),
  row4: css({
    display: "flex",
    gap: spacing["2"],
  }),
  button: css({
    color: theme.mutedForeground,
  }),
}

export default function SpinnerExample() {
  return (
    <ExampleWrapper>
      <SpinnerBasic />
      <SpinnerInButtons />
      <SpinnerInBadges />
      <SpinnerInInputGroup />
      <SpinnerInEmpty />
    </ExampleWrapper>
  )
}

function SpinnerBasic() {
  return (
    <Example title="Basic">
      <div sx={styles.row}>
        <Spinner />
        <Spinner sx={styles.spinner} />
      </div>
    </Example>
  )
}

function SpinnerInButtons() {
  return (
    <Example title="In Buttons">
      <div sx={styles.row2}>
        <Button>
          <Spinner data-icon="inline-start" /> Submit
        </Button>
        <Button disabled>
          <Spinner data-icon="inline-start" /> Disabled
        </Button>
        <Button variant="outline" disabled>
          <Spinner data-icon="inline-start" /> Outline
        </Button>
        <Button variant="outline" size="icon" disabled>
          <Spinner data-icon="inline-start" />
          <span sx={styles.text}>Loading...</span>
        </Button>
      </div>
    </Example>
  )
}

function SpinnerInBadges() {
  return (
    <Example title="In Badges" sx={styles.example}>
      <div sx={styles.row3}>
        <Badge>
          <Spinner data-icon="inline-start" />
          Badge
        </Badge>
        <Badge variant="secondary">
          <Spinner data-icon="inline-start" />
          Badge
        </Badge>
        <Badge variant="destructive">
          <Spinner data-icon="inline-start" />
          Badge
        </Badge>
        <Badge variant="outline">
          <Spinner data-icon="inline-start" />
          Badge
        </Badge>
      </div>
    </Example>
  )
}

function SpinnerInInputGroup() {
  return (
    <Example title="In Input Group">
      <Field>
        <FieldLabel htmlFor="input-group-spinner">Input Group</FieldLabel>
        <InputGroup>
          <InputGroupInput id="input-group-spinner" />
          <InputGroupAddon>
            <Spinner />
          </InputGroupAddon>
        </InputGroup>
      </Field>
    </Example>
  )
}

function SpinnerInEmpty() {
  return (
    <Example title="In Empty State" containerSx={styles.example2}>
      <Empty sx={styles.empty}>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Spinner />
          </EmptyMedia>
          <EmptyTitle>No projects yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any projects yet. Get started by creating
            your first project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div sx={styles.row4}>
            <Button render={<a href="#" />} nativeButton={false}>
              Create project
            </Button>
            <Button variant="outline">Import project</Button>
          </div>
          <Button
            variant="link"
            render={<a href="#" />}
            nativeButton={false}
            sx={styles.button}
          >
            Learn more <Icon icon={ArrowRight02Icon} />
          </Button>
        </EmptyContent>
      </Empty>
    </Example>
  )
}
