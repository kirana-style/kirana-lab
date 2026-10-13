import { cn } from "@workspace/ui/lib/utils"
import { HugeiconsIcon } from "@hugeicons/react"
import { Loading03Icon } from "@hugeicons/core-free-icons"

// HugeiconsIcon narrows strokeWidth to `number`, while React.ComponentProps<"svg">
// widens it to `string | number` — and the spread below would carry that wider
// type past the literal set here.
type SpinnerProps = Omit<React.ComponentProps<"svg">, "strokeWidth"> & {
  strokeWidth?: number
}

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <HugeiconsIcon
      icon={Loading03Icon}
      strokeWidth={2}
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
