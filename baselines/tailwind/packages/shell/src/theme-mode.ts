import * as React from "react"

export type ThemeMode = "system" | "light" | "dark"

let mode: ThemeMode = "system"
const listeners = new Set<() => void>()

/**
 * The colour scheme the header toggle picked, shared with anything else that
 * needs it — the block viewer hands it to its iframe.
 */
export function useThemeMode() {
  const current = React.useSyncExternalStore(
    (listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    () => mode,
    () => "system" as const
  )
  const setMode = React.useCallback((next: ThemeMode) => {
    mode = next
    for (const listener of listeners) listener()
  }, [])
  return [current, setMode] as const
}

/**
 * Applies a mode the way `globals.css` expects: a `dark` class on `<html>`,
 * following `prefers-color-scheme` while the mode is `system`.
 */
export function useApplyThemeMode(current: ThemeMode) {
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)")
    const apply = () => {
      const dark = current === "dark" || (current === "system" && query.matches)
      document.documentElement.classList.toggle("dark", dark)
    }
    apply()
    query.addEventListener("change", apply)
    return () => query.removeEventListener("change", apply)
  }, [current])
}
