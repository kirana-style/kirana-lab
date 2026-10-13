import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "@/components/example"
import { Badge } from "@workspace/ui/components/badge"
import { Spinner } from "@workspace/ui/components/spinner"
import {
  ArrowRight02Icon,
  ArrowUpRightIcon,
  CheckmarkBadge02Icon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { color } from "@workspace/ui/tokens/colors"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  exampleWrapper: css({
    // `lg:grid-cols-1`: one column from `lg`, over the wrapper's two from `md`.
    gridTemplateColumns: { [breakpoint.lg]: "repeat(1, minmax(0, 1fr))" },
  }),
  row: css({
    display: "flex",
    flexWrap: "wrap",
    gap: spacing["2"],
  }),
  example: css({
    maxWidth: "fit-content",
  }),
  badge: css({
    backgroundColor: color.blue600,
    color: color.blue50,
  }),
  badge2: css({
    backgroundColor: color.green600,
    color: color.green50,
  }),
  badge3: css({
    backgroundColor: color.sky600,
    color: color.sky50,
  }),
  badge4: css({
    backgroundColor: color.purple600,
    color: color.purple50,
  }),
  badge5: css({
    backgroundColor: `light-dark(${color.blue50}, ${color.blue950})`,
    color: `light-dark(${color.blue700}, ${color.blue300})`,
  }),
  badge6: css({
    backgroundColor: `light-dark(${color.green50}, ${color.green950})`,
    color: `light-dark(${color.green700}, ${color.green300})`,
  }),
  badge7: css({
    backgroundColor: `light-dark(${color.sky50}, ${color.sky950})`,
    color: `light-dark(${color.sky700}, ${color.sky300})`,
  }),
  badge8: css({
    backgroundColor: `light-dark(${color.purple50}, ${color.purple950})`,
    color: `light-dark(${color.purple700}, ${color.purple300})`,
  }),
  badge9: css({
    backgroundColor: `light-dark(${color.red50}, ${color.red950})`,
    color: `light-dark(${color.red700}, ${color.red300})`,
  }),
}

export default function BadgeExample() {
  return (
    <ExampleWrapper sx={styles.exampleWrapper}>
      <BadgeVariants />
      <BadgeWithIconLeft />
      <BadgeWithIconRight />
      <BadgeWithSpinner />
      <BadgeAsLink />
      <BadgeLongText />
      <BadgeCustomColors />
    </ExampleWrapper>
  )
}

function BadgeVariants() {
  return (
    <Example title="Variants">
      <div sx={styles.row}>
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </div>
    </Example>
  )
}

function BadgeWithIconLeft() {
  return (
    <Example title="Icon Left" sx={styles.example}>
      <div sx={styles.row}>
        <Badge>
          <Icon
            icon={CheckmarkBadge02Icon}

            data-icon="inline-start"
          />
          Default
        </Badge>
        <Badge variant="secondary">
          <Icon
            icon={CheckmarkBadge02Icon}

            data-icon="inline-start"
          />
          Secondary
        </Badge>
        <Badge variant="destructive">
          <Icon
            icon={CheckmarkBadge02Icon}

            data-icon="inline-start"
          />
          Destructive
        </Badge>
        <Badge variant="outline">
          <Icon
            icon={CheckmarkBadge02Icon}

            data-icon="inline-start"
          />
          Outline
        </Badge>
        <Badge variant="ghost">
          <Icon
            icon={CheckmarkBadge02Icon}

            data-icon="inline-start"
          />
          Ghost
        </Badge>
        <Badge variant="link">
          <Icon
            icon={CheckmarkBadge02Icon}

            data-icon="inline-start"
          />
          Link
        </Badge>
      </div>
    </Example>
  )
}

function BadgeWithIconRight() {
  return (
    <Example title="Icon Right" sx={styles.example}>
      <div sx={styles.row}>
        <Badge>
          Default
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Badge>
        <Badge variant="secondary">
          Secondary
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Badge>
        <Badge variant="destructive">
          Destructive
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Badge>
        <Badge variant="outline">
          Outline
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Badge>
        <Badge variant="ghost">
          Ghost
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Badge>
        <Badge variant="link">
          Link
          <Icon
            icon={ArrowRight02Icon}

            data-icon="inline-end"
          />
        </Badge>
      </div>
    </Example>
  )
}

function BadgeWithSpinner() {
  return (
    <Example title="With Spinner" sx={styles.example}>
      <div sx={styles.row}>
        <Badge>
          <Spinner data-icon="inline-start" />
          Default
        </Badge>
        <Badge variant="secondary">
          <Spinner data-icon="inline-start" />
          Secondary
        </Badge>
        <Badge variant="destructive">
          <Spinner data-icon="inline-start" />
          Destructive
        </Badge>
        <Badge variant="outline">
          <Spinner data-icon="inline-start" />
          Outline
        </Badge>
        <Badge variant="ghost">
          <Spinner data-icon="inline-start" />
          Ghost
        </Badge>
        <Badge variant="link">
          <Spinner data-icon="inline-start" />
          Link
        </Badge>
      </div>
    </Example>
  )
}

function BadgeAsLink() {
  return (
    <Example title="asChild">
      <div sx={styles.row}>
        <Badge
          render={
            <a href="#">
              Link{" "}
              <Icon
                icon={ArrowUpRightIcon}

                data-icon="inline-end"
              />
            </a>
          }
        />
        <Badge
          variant="secondary"
          render={
            <a href="#">
              Link{" "}
              <Icon
                icon={ArrowUpRightIcon}

                data-icon="inline-end"
              />
            </a>
          }
        />
        <Badge
          variant="destructive"
          render={
            <a href="#">
              Link{" "}
              <Icon
                icon={ArrowUpRightIcon}

                data-icon="inline-end"
              />
            </a>
          }
        />
        <Badge
          variant="ghost"
          render={
            <a href="#">
              Link{" "}
              <Icon
                icon={ArrowRight02Icon}

                data-icon="inline-end"
              />
            </a>
          }
        />
      </div>
    </Example>
  )
}

function BadgeLongText() {
  return (
    <Example title="Long Text">
      <div sx={styles.row}>
        <Badge variant="secondary">
          A badge with a lot of text to see how it wraps
        </Badge>
      </div>
    </Example>
  )
}

function BadgeCustomColors() {
  return (
    <Example title="Custom Colors" sx={styles.example}>
      <div sx={styles.row}>
        <Badge sx={styles.badge}>Blue</Badge>
        <Badge sx={styles.badge2}>Green</Badge>
        <Badge sx={styles.badge3}>Sky</Badge>
        <Badge sx={styles.badge4}>Purple</Badge>
        <Badge sx={styles.badge5}>Blue</Badge>
        <Badge sx={styles.badge6}>Green</Badge>
        <Badge sx={styles.badge7}>Sky</Badge>
        <Badge sx={styles.badge8}>Purple</Badge>
        <Badge sx={styles.badge9}>Red</Badge>
      </div>
    </Example>
  )
}
