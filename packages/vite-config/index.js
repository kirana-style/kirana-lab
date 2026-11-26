// @ts-check
/**
 * The Vite setup every app in this repo shares: TanStack Start, React, the
 * TanStack devtools, and Kirana compiled by `@kirana-style/vite`.
 *
 * Plain ESM rather than TypeScript, so Vite's config loader can import it from
 * the workspace without transpiling a dependency.
 */
import kirana from "@kirana-style/vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import { defineConfig } from "vite"

/**
 * The harness's `kirana-dense` and `kirana-hashed` targets build these same apps with the naming
 * the Kirana release does not use by default, into `dist-dense` or `dist-hashed`, so that build
 * sits beside the default one (packages/harness/src/targets.ts).
 */
const asked = process.env.KIRANA_LAB_NAMES || undefined
if (asked !== undefined && asked !== "dense" && asked !== "hashed")
  throw new Error(`KIRANA_LAB_NAMES is "dense" or "hashed", not ${asked}`)
const names = /** @type {"dense" | "hashed" | undefined} */ (asked)

/**
 * @returns {import("vite").UserConfigFnObject}
 */
export function defineAppConfig() {
  return defineConfig(() => ({
    resolve: { tsconfigPaths: true },
    plugins: [
      // Console piping is off: it sends client logs to the terminal and server
      // logs back to the browser console, so one `console.error` echoes between
      // the two and multiplies until the tab is closed. Everything else the
      // devtools do is kept.
      devtools({ consolePiping: { enabled: false } }),
      // Ahead of the framework plugins, so modules reach them already compiled.
      // Layers, targets and diagnostics come from each app's kirana.config.ts.
      kirana(names ? { names } : {}),
      tanstackStart({ router: { quoteStyle: "double", semicolons: false } }),
      viteReact(),
    ],
    build: {
      cssMinify: true,
      minify: true,
      ...(names ? { outDir: `dist-${names}` } : {}),
    },
  }))
}
