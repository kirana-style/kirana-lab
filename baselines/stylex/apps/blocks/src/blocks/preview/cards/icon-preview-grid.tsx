import * as stylex from "@stylexjs/stylex"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
  AlertCircleIcon,
  ArrowDown01Icon,
  ArrowLeft02Icon,
  ArrowRight01Icon,
  ArrowRight02Icon,
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
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(8, minmax(0, 1fr))",
    placeItems: "center",
    gap: spacing["4"],
  },
  row: {
    [ctx.iconSize]: spacing["4"],
    display: "flex",
    width: spacing["8"],
    height: spacing["8"],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    boxShadow: `0 0 0 1px ${theme.border}`,
  },
})

const PREVIEW_ICONS = [
  { icon: Copy01Icon },
  { icon: AlertCircleIcon },
  { icon: Delete02Icon },
  { icon: Share03Icon },
  { icon: ShoppingBag01Icon },
  { icon: MoreHorizontalCircle01Icon },
  { icon: Loading03Icon },
  { icon: PlusSignIcon },
  { icon: MinusSignIcon },
  { icon: ArrowLeft02Icon },
  { icon: ArrowRight02Icon },
  { icon: Tick02Icon },
  { icon: ArrowDown01Icon },
  { icon: ArrowRight01Icon },
  { icon: Search01Icon },
  { icon: Settings01Icon },
]

export function IconPreviewGrid() {
  return (
    <Card>
      <CardContent>
        <div sx={styles.grid}>
          {PREVIEW_ICONS.map((icon, index) => (
            <div key={index} sx={styles.row}>
              <Icon icon={icon.icon} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
