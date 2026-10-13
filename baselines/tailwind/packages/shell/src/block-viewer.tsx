import * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ComputerIcon,
  LinkSquare02Icon,
  SmartPhone01Icon,
  Tablet01Icon,
} from "@hugeicons/core-free-icons"

import { Button } from "@workspace/ui/components/button"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"

import { useThemeMode } from "./theme-mode"

const WIDTHS = [
  { value: "100%", icon: ComputerIcon, label: "Desktop" },
  { value: "768px", icon: Tablet01Icon, label: "Tablet" },
  { value: "390px", icon: SmartPhone01Icon, label: "Mobile" },
] as const

/**
 * A full-page block shown inside the app. The block renders in an iframe on its
 * own bare `/view/<name>` route, so its sidebar never nests inside ours and its
 * breakpoints answer to the frame's width, as they would on a real page.
 */
export function BlockViewer({
  name,
  title,
  description,
}: {
  name: string
  title: string
  description?: string
}) {
  const [width, setWidth] = React.useState<string>("100%")
  const [mode] = useThemeMode()
  const src = `/view/${name}?theme=${mode}`

  return (
    <div className="flex min-w-0 flex-col gap-4 p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h1 className="font-heading text-xl font-medium">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <ToggleGroup
          spacing={0}
          variant="outline"
          size="sm"
          value={[width]}
          onValueChange={(value) => {
            if (value[0]) setWidth(value[0])
          }}
          aria-label="Preview width"
        >
          {WIDTHS.map(({ value, icon, label }) => (
            <ToggleGroupItem key={value} value={value} title={label}>
              <HugeiconsIcon icon={icon} strokeWidth={2} />
              <span className="sr-only">{label}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Button
          variant="outline"
          size="sm"
          render={<a href={src} target="_blank" rel="noreferrer" />}
          nativeButton={false}
        >
          <HugeiconsIcon
            icon={LinkSquare02Icon}
            strokeWidth={2}
            data-icon="inline-start"
          />
          Open
        </Button>
      </div>
      <div className="flex justify-center rounded-xl bg-muted p-2 dark:bg-background">
        <iframe
          key={mode}
          src={src}
          title={title}
          className="h-[800px] max-w-full rounded-lg border bg-background"
          style={{ width }}
        />
      </div>
    </div>
  )
}
