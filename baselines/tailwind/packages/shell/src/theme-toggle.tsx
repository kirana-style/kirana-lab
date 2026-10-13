import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import { HugeiconsIcon } from "@hugeicons/react"
import { ComputerIcon, Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons"

import type { ThemeMode } from "./theme-mode"
import { useApplyThemeMode, useThemeMode } from "./theme-mode"

const MODES: { value: ThemeMode; icon: typeof Sun03Icon; label: string }[] = [
  { value: "system", icon: ComputerIcon, label: "Follow system" },
  { value: "light", icon: Sun03Icon, label: "Light" },
  { value: "dark", icon: Moon02Icon, label: "Dark" },
]

/**
 * Added so this original can be compared against the StyleX port side by side.
 *
 * Dark mode here is the `@custom-variant dark (&:is(.dark *))` rule from
 * `globals.css`, so "dark" means a `dark` class on `<html>` and "system" means
 * following `prefers-color-scheme` by watching it.
 */
export function ThemeToggle() {
  const [mode, setMode] = useThemeMode()
  useApplyThemeMode(mode)

  return (
    <ToggleGroup
      spacing={0}
      variant="outline"
      size="sm"
      value={[mode]}
      onValueChange={(value) => {
        const next = value[0] as ThemeMode | undefined
        if (next) setMode(next)
      }}
      aria-label="Colour scheme"
    >
      {MODES.map(({ value, icon, label }) => (
        <ToggleGroupItem key={value} value={value}>
          <HugeiconsIcon icon={icon} strokeWidth={2} />
          <span className="sr-only">{label}</span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
