import { useEffect } from "react"

/**
 * TanStack Start has no `index.html`, so the StyleX Vite plugin's
 * `transformIndexHtml` hook never fires and its dev CSS is never injected.
 *
 * In dev the plugin serves the aggregated stylesheet from `/virtual:stylex.css`
 * (see the `links` entry in `__root.tsx`) and exposes `virtual:stylex:runtime`,
 * a module that refetches that CSS on hot updates. Importing the runtime here
 * gives us style HMR; in production the module does not exist, so the import
 * stays behind a dev guard and the CSS ships inside the built stylesheet.
 */
export function DevStyleX() {
  useEffect(() => {
    if (import.meta.env.DEV) {
      import(/* @vite-ignore */ "virtual:stylex:runtime").catch(() => {})
    }
  }, [])

  return null
}
