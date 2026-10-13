import { Card, CardContent } from "@workspace/ui/components/card"
import { HugeiconsIcon } from "@hugeicons/react"
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
        <div className="grid grid-cols-8 place-items-center gap-4">
          {PREVIEW_ICONS.map((icon, index) => (
            <div
              key={index}
              className="flex size-8 items-center justify-center rounded-md ring ring-border *:[svg]:size-4"
            >
              <HugeiconsIcon
                strokeWidth={2}

                icon={icon.icon}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
