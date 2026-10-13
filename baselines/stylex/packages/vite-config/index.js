// @ts-check
/**
 * The Vite setup every app in this repo shares: TanStack Start, React, the
 * TanStack devtools, and StyleX compiled by `@stylexjs/unplugin`.
 *
 * Plain ESM rather than TypeScript, so Vite's config loader can import it from
 * the workspace without transpiling a dependency.
 */
import stylex from "@stylexjs/unplugin"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"

/** The monorepo root, two levels above this package. */
const rootDir = path.resolve(
  fileURLToPath(new URL(".", import.meta.url)),
  "../.."
)

/**
 * The browser floor. `light-dark()` is the newest feature the design system
 * relies on (Chrome 123, Safari 17.5, Firefox 120); at these targets
 * lightningcss emits it, `oklch()` and `color-mix()` exactly as written instead
 * of polyfilling them.
 */
const targets = {
  chrome: 123 << 16,
  safari: (17 << 16) | (5 << 8),
  firefox: 120 << 16,
}

/**
 * @returns {import("vite").UserConfigFnObject}
 */
export function defineAppConfig() {
  return defineConfig(({ command }) => ({
    resolve: { tsconfigPaths: true },
    plugins: [
      devtools(),
      // Ahead of the framework plugins, to preserve Fast Refresh.
      stylex.vite({
        // The hand-written reset sits below StyleX in dev and production alike
        // (facebook/stylex#1415). The prefix namespaces StyleX's own layers as
        // `stylex.priority1…`, so they never collide with another layer name.
        useCSSLayers: { before: ["reset", "base"], prefix: "stylex" },
        // StyleX's JSX shorthand, `<div sx={styles.row} />`. It only rewrites
        // lowercase host elements, so components keep their own `sx` prop.
        sxPropName: "sx",
        // Readable debug class names while developing, none in shipped HTML.
        dev: command === "serve",
        // Variable names hash from the resolved file path. Anchoring at the
        // monorepo root gives a token the same name whichever package's
        // compilation reaches it first.
        unstable_moduleResolution: { type: "commonJS", rootDir },
        lightningcssOptions: { minify: command === "build", targets },
      }),
      tanstackStart({ router: { quoteStyle: "double", semicolons: false } }),
      viteReact(),
    ],
    build: { cssMinify: true, minify: true },
  }))
}
