import * as stylex from "@stylexjs/stylex"
import { useSortable } from "@dnd-kit/sortable"
import { DragDropVerticalIcon } from "@hugeicons/core-free-icons"

import { Button } from "@workspace/ui/components/button"
import { Icon } from "@workspace/ui/primitives/icon"
import { VisuallyHidden } from "@workspace/ui/primitives/visually-hidden"
import { surface, theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  button: {
    width: spacing["7"],
    height: spacing["7"],
    color: theme.mutedForeground,
    // The drag handle never fills on hover; the ghost button's open state stays.
    backgroundColor: {
      default: null,
      ":hover": "transparent",
      '[aria-expanded="true"]': surface.hover,
    },
  },
  icon: {
    width: spacing["3"],
    height: spacing["3"],
    color: theme.mutedForeground,
  },
})

/** The grip a row is dragged by. Its row's `useSortable` shares the same id. */
export function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({ id })
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      sx={styles.button}
    >
      <Icon icon={DragDropVerticalIcon} sx={styles.icon} />
      <VisuallyHidden>Drag to reorder</VisuallyHidden>
    </Button>
  )
}
