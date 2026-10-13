import * as stylex from "@stylexjs/stylex"
import { Example, ExampleWrapper } from "@/components/example"
import { Button } from "@workspace/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import { Kbd } from "@workspace/ui/components/kbd"
import {
  ArrowUpRight01Icon,
  DashedLineCircleIcon,
  Folder01Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { alpha, theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  row: {
    display: "flex",
    gap: spacing["2"],
  },
  button: {
    color: theme.mutedForeground,
  },
  empty: {
    backgroundColor: theme.muted,
  },
  // `border` on an Empty keeps its dashed style; only the width is added.
  empty2: {
    borderTopWidth: "1px",
    borderBottomWidth: "1px",
    borderInlineStartWidth: "1px",
    borderInlineEndWidth: "1px",
    borderTopColor: theme.border,
    borderBottomColor: theme.border,
    borderInlineStartColor: theme.border,
    borderInlineEndColor: theme.border,
  },
  inputGroup: {
    width: "calc(3 / 4 * 100%)",
  },
  empty3: {
    backgroundColor: alpha.muted50,
  },
})

export default function EmptyExample() {
  return (
    <ExampleWrapper>
      <EmptyBasic />
      <EmptyWithMutedBackground />
      <EmptyWithBorder />
      <EmptyWithIcon />
      <EmptyWithMutedBackgroundAlt />
      <EmptyInCard />
    </ExampleWrapper>
  )
}

function EmptyBasic() {
  return (
    <Example title="Basic">
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No projects yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any projects yet. Get started by creating
            your first project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div sx={styles.row}>
            <Button render={<a href="#" />} nativeButton={false}>
              Create project
            </Button>
            <Button variant="outline">Import project</Button>
          </div>
          <Button
            variant="link"
            render={<a href="#" />}
            sx={styles.button}
            nativeButton={false}
          >
            Learn more <Icon icon={ArrowUpRight01Icon} />
          </Button>
        </EmptyContent>
      </Empty>
    </Example>
  )
}

function EmptyWithMutedBackground() {
  return (
    <Example title="With Muted Background">
      <Empty sx={styles.empty}>
        <EmptyHeader>
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyDescription>
            No results found for your search. Try adjusting your search terms.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Try again</Button>
          <Button
            variant="link"
            render={<a href="#" />}
            sx={styles.button}
            nativeButton={false}
          >
            Learn more <Icon icon={ArrowUpRight01Icon} />
          </Button>
        </EmptyContent>
      </Empty>
    </Example>
  )
}

function EmptyWithBorder() {
  return (
    <Example title="With Border">
      <Empty sx={styles.empty2}>
        <EmptyHeader>
          <EmptyTitle>404 - Not Found</EmptyTitle>
          <EmptyDescription>
            The page you&apos;re looking for doesn&apos;t exist. Try searching
            for what you need below.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <InputGroup sx={styles.inputGroup}>
            <InputGroupInput placeholder="Try searching for pages..." />
            <InputGroupAddon>
              <Icon icon={DashedLineCircleIcon} />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Kbd>/</Kbd>
            </InputGroupAddon>
          </InputGroup>
          <EmptyDescription>
            Need help? <a href="#">Contact support</a>
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </Example>
  )
}

function EmptyWithIcon() {
  return (
    <Example title="With Icon">
      <Empty sx={styles.empty2}>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icon icon={Folder01Icon} />
          </EmptyMedia>
          <EmptyTitle>Nothing to see here</EmptyTitle>
          <EmptyDescription>
            No posts have been created yet. Get started by{" "}
            <a href="#">creating your first post</a>.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline">
            <Icon
              icon={PlusSignIcon}

              data-icon="inline-start"
            />
            New Post
          </Button>
        </EmptyContent>
      </Empty>
    </Example>
  )
}

function EmptyWithMutedBackgroundAlt() {
  return (
    <Example title="With Muted Background Alt">
      <Empty sx={styles.empty3}>
        <EmptyHeader>
          <EmptyTitle>404 - Not Found</EmptyTitle>
          <EmptyDescription>
            The page you&apos;re looking for doesn&apos;t exist. Try searching
            for what you need below.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <InputGroup sx={styles.inputGroup}>
            <InputGroupInput placeholder="Try searching for pages..." />
            <InputGroupAddon>
              <Icon icon={DashedLineCircleIcon} />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Kbd>/</Kbd>
            </InputGroupAddon>
          </InputGroup>
          <EmptyDescription>
            Need help? <a href="#">Contact support</a>
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </Example>
  )
}

function EmptyInCard() {
  return (
    <Example title="In Card">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Icon icon={Folder01Icon} />
          </EmptyMedia>
          <EmptyTitle>No projects yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any projects yet. Get started by creating
            your first project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div sx={styles.row}>
            <Button render={<a href="#" />} nativeButton={false}>
              Create project
            </Button>
            <Button variant="outline">Import project</Button>
          </div>
          <Button
            variant="link"
            render={<a href="#" />}
            sx={styles.button}
            nativeButton={false}
          >
            Learn more <Icon icon={ArrowUpRight01Icon} />
          </Button>
        </EmptyContent>
      </Empty>
    </Example>
  )
}
