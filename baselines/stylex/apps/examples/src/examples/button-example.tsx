import * as stylex from "@stylexjs/stylex"
import { Example, ExampleWrapper } from "@/components/example"
import { Button, buttonVariants } from "@workspace/ui/components/button"
import { buttonLabel, buttonRing } from "@workspace/ui/recipes/button"
import {
  ArrowRight02Icon,
  CircleArrowLeft02Icon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  exampleWrapper: {
    // Restates the wrapper's two columns from `md`: an sx value replaces the
    // whole property, breakpoints included.
    gridTemplateColumns: {
      default: null,
      "@media (min-width: 48rem) and (max-width: 63.999rem)":
        "repeat(2, minmax(0, 1fr))",
      [breakpoint.lg]: "repeat(1, minmax(0, 1fr))",
    },
  },
  row: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing["2"],
  },
  row2: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing["4"],
  },
  row3: {
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
  },
})

export default function ButtonExample() {
  return (
    <ExampleWrapper sx={styles.exampleWrapper}>
      <ButtonVariantsAndSizes />
      <ButtonIconRight />
      <ButtonIconLeft />
      <ButtonIconOnly />
      <ButtonInvalidStates />
      <ButtonExamples />
    </ExampleWrapper>
  )
}

function ButtonVariantsAndSizes() {
  return (
    <Example title="Variants & Sizes">
      <div sx={styles.row}>
        <Button size="xs">Default</Button>
        <Button size="xs" variant="secondary">
          Secondary
        </Button>
        <Button size="xs" variant="outline">
          Outline
        </Button>
        <Button size="xs" variant="ghost">
          Ghost
        </Button>
        <Button size="xs" variant="destructive">
          Destructive
        </Button>
        <Button size="xs" variant="link">
          Link
        </Button>
      </div>
      <div sx={styles.row}>
        <Button size="sm">Default</Button>
        <Button size="sm" variant="secondary">
          Secondary
        </Button>
        <Button size="sm" variant="outline">
          Outline
        </Button>
        <Button size="sm" variant="ghost">
          Ghost
        </Button>
        <Button size="sm" variant="destructive">
          Destructive
        </Button>
        <Button size="sm" variant="link">
          Link
        </Button>
      </div>
      <div sx={styles.row}>
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
      <div sx={styles.row}>
        <Button size="lg">Default</Button>
        <Button size="lg" variant="secondary">
          Secondary
        </Button>
        <Button size="lg" variant="outline">
          Outline
        </Button>
        <Button size="lg" variant="ghost">
          Ghost
        </Button>
        <Button size="lg" variant="destructive">
          Destructive
        </Button>
        <Button size="lg" variant="link">
          Link
        </Button>
      </div>
    </Example>
  )
}

function ButtonIconRight() {
  return (
    <Example title="Icon Right">
      <div sx={styles.row}>
        <Button size="xs">
          Default{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
        <Button size="xs" variant="secondary">
          Secondary{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
        <Button size="xs" variant="outline">
          Outline{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
        <Button size="xs" variant="ghost">
          Ghost{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
        <Button size="xs" variant="destructive">
          Destructive{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
        <Button size="xs" variant="link">
          Link{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
      </div>
      <div sx={styles.row}>
        <Button size="sm">
          Default
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
        <Button size="sm" variant="secondary">
          Secondary{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
        <Button size="sm" variant="outline">
          Outline <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="sm" variant="ghost">
          Ghost{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
        <Button size="sm" variant="destructive">
          Destructive{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
        <Button size="sm" variant="link">
          Link{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
      </div>
      <div sx={styles.row}>
        <Button>
          Default{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
        <Button variant="secondary">
          Secondary{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
        <Button variant="outline">
          Outline{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
        <Button variant="ghost">
          Ghost{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
        <Button variant="destructive">
          Destructive{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
        <Button variant="link">
          Link{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
      </div>
      <div sx={styles.row}>
        <Button size="lg">
          Default{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
        <Button size="lg" variant="secondary">
          Secondary{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
        <Button size="lg" variant="outline">
          Outline{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
        <Button size="lg" variant="ghost">
          Ghost{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
        <Button size="lg" variant="destructive">
          Destructive{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
        <Button size="lg" variant="link">
          Link{" "}
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Button>
      </div>
    </Example>
  )
}

function ButtonIconLeft() {
  return (
    <Example title="Icon Left">
      <div sx={styles.row}>
        <Button size="xs">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Default
        </Button>
        <Button size="xs" variant="secondary">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Secondary
        </Button>
        <Button size="xs" variant="outline">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Outline
        </Button>
        <Button size="xs" variant="ghost">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Ghost
        </Button>
        <Button size="xs" variant="destructive">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Destructive
        </Button>
        <Button size="xs" variant="link">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Link
        </Button>
      </div>
      <div sx={styles.row}>
        <Button size="sm">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Default
        </Button>
        <Button size="sm" variant="secondary">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Secondary
        </Button>
        <Button size="sm" variant="outline">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Outline
        </Button>
        <Button size="sm" variant="ghost">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Ghost
        </Button>
        <Button size="sm" variant="destructive">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Destructive
        </Button>
        <Button size="sm" variant="link">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Link
        </Button>
      </div>
      <div sx={styles.row}>
        <Button>
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Default
        </Button>
        <Button variant="secondary">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Secondary
        </Button>
        <Button variant="outline">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Outline
        </Button>
        <Button variant="ghost">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Ghost
        </Button>
        <Button variant="destructive">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Destructive
        </Button>
        <Button variant="link">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Link
        </Button>
      </div>
      <div sx={styles.row}>
        <Button size="lg">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Default
        </Button>
        <Button size="lg" variant="secondary">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Secondary
        </Button>
        <Button size="lg" variant="outline">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Outline
        </Button>
        <Button size="lg" variant="ghost">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Ghost
        </Button>
        <Button size="lg" variant="destructive">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Destructive
        </Button>
        <Button size="lg" variant="link">
          <Icon
            icon={CircleArrowLeft02Icon}

            data-icon="inline-start"
          />{" "}
          Link
        </Button>
      </div>
    </Example>
  )
}

function ButtonIconOnly() {
  return (
    <Example title="Icon Only">
      <div sx={styles.row}>
        <Button size="icon-xs">
          <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="icon-xs" variant="secondary">
          <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="icon-xs" variant="outline">
          <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="icon-xs" variant="ghost">
          <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="icon-xs" variant="destructive">
          <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="icon-xs" variant="link">
          <Icon icon={ArrowRight02Icon} />
        </Button>
      </div>
      <div sx={styles.row}>
        <Button size="icon-sm">
          <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="icon-sm" variant="secondary">
          <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="icon-sm" variant="outline">
          <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="icon-sm" variant="ghost">
          <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="icon-sm" variant="destructive">
          <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="icon-sm" variant="link">
          <Icon icon={ArrowRight02Icon} />
        </Button>
      </div>
      <div sx={styles.row}>
        <Button size="icon">
          <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="icon" variant="secondary">
          <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="icon" variant="outline">
          <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="icon" variant="ghost">
          <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="icon" variant="destructive">
          <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="icon" variant="link">
          <Icon icon={ArrowRight02Icon} />
        </Button>
      </div>
      <div sx={styles.row}>
        <Button size="icon-lg">
          <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="icon-lg" variant="secondary">
          <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="icon-lg" variant="outline">
          <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="icon-lg" variant="ghost">
          <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="icon-lg" variant="destructive">
          <Icon icon={ArrowRight02Icon} />
        </Button>
        <Button size="icon-lg" variant="link">
          <Icon icon={ArrowRight02Icon} />
        </Button>
      </div>
    </Example>
  )
}

function ButtonExamples() {
  return (
    <Example title="Examples">
      <div sx={styles.row2}>
        <div sx={styles.row3}>
          <Button variant="outline">Cancel</Button>
          <Button>
            Submit{" "}
            <Icon
              icon={ArrowRight02Icon}

              data-icon="inline-end"
            />
          </Button>
        </div>
        <div sx={styles.row3}>
          <Button variant="destructive">Delete</Button>
          <Button size="icon">
            <Icon
              icon={ArrowRight02Icon}

              data-icon="inline-end"
            />
          </Button>
        </div>
        <a href="#" sx={[buttonRing, ...buttonVariants()]}>
          <span sx={buttonLabel}>Link</span>
        </a>
      </div>
    </Example>
  )
}

function ButtonInvalidStates() {
  return (
    <Example title="Invalid States">
      <div sx={styles.row}>
        <Button size="xs" aria-invalid="true">
          Default
        </Button>
        <Button size="xs" variant="secondary" aria-invalid="true">
          Secondary
        </Button>
        <Button size="xs" variant="outline" aria-invalid="true">
          Outline
        </Button>
        <Button size="xs" variant="ghost" aria-invalid="true">
          Ghost
        </Button>
        <Button size="xs" variant="destructive" aria-invalid="true">
          Destructive
        </Button>
        <Button size="xs" variant="link" aria-invalid="true">
          Link
        </Button>
      </div>
      <div sx={styles.row}>
        <Button size="sm" aria-invalid="true">
          Default
        </Button>
        <Button size="sm" variant="secondary" aria-invalid="true">
          Secondary
        </Button>
        <Button size="sm" variant="outline" aria-invalid="true">
          Outline
        </Button>
        <Button size="sm" variant="ghost" aria-invalid="true">
          Ghost
        </Button>
        <Button size="sm" variant="destructive" aria-invalid="true">
          Destructive
        </Button>
        <Button size="sm" variant="link" aria-invalid="true">
          Link
        </Button>
      </div>
      <div sx={styles.row}>
        <Button aria-invalid="true">Default</Button>
        <Button variant="secondary" aria-invalid="true">
          Secondary
        </Button>
        <Button variant="outline" aria-invalid="true">
          Outline
        </Button>
        <Button variant="ghost" aria-invalid="true">
          Ghost
        </Button>
        <Button variant="destructive" aria-invalid="true">
          Destructive
        </Button>
        <Button variant="link" aria-invalid="true">
          Link
        </Button>
      </div>
      <div sx={styles.row}>
        <Button size="lg" aria-invalid="true">
          Default
        </Button>
        <Button size="lg" variant="secondary" aria-invalid="true">
          Secondary
        </Button>
        <Button size="lg" variant="outline" aria-invalid="true">
          Outline
        </Button>
        <Button size="lg" variant="ghost" aria-invalid="true">
          Ghost
        </Button>
        <Button size="lg" variant="destructive" aria-invalid="true">
          Destructive
        </Button>
        <Button size="lg" variant="link" aria-invalid="true">
          Link
        </Button>
      </div>
    </Example>
  )
}
