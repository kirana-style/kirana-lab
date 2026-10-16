// @ts-check
/**
 * The StyleX baseline's Vite setup with one change: StyleX is compiled by
 * `@stylexswc/unplugin`, the Rust (SWC) compiler, instead of the Babel plugin.
 * The apps, the components and every other plugin are the StyleX baseline's own.
 *
 * Plain ESM rather than TypeScript, so Vite's config loader can import it from
 * the workspace without transpiling a dependency.
 */
import stylex from "@stylexswc/unplugin/vite"
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
 * The stylesheet every app imports. Under TanStack Start the plugin's own
 * `stylex.css` is linked by nothing, so the rules go where this stylesheet's
 * `@stylex;` marker is (`useCssPlaceholder`). The marker is added here rather
 * than written into the file, which is shared with the Babel baseline.
 */
const GLOBALS = "/ui/src/styles/globals.css"

/** @type {import("vite").Plugin} */
const marker = {
  name: "stylex-swc-marker",
  enforce: "pre",
  transform(code, id) {
    // The bare module only: a query (`?url`, `?inline`) asks for something else.
    if (id.endsWith(GLOBALS)) return { code: `${code}\n@stylex;\n`, map: null }
  },
}

/**
 * @returns {import("vite").UserConfigFnObject}
 */
export function defineAppConfig() {
  return defineConfig(({ command }) => ({
    resolve: { tsconfigPaths: true },
    plugins: [
      devtools(),
      marker,
      // Ahead of the framework plugins, to preserve Fast Refresh.
      // The server build ships no stylesheet, so it warns that no marker was
      // found; the client build is the one that carries the rules.
      stylex({
        useCssPlaceholder: true,
        // The Babel baseline's options; the compiler's own sit under `rsOptions`.
        useCSSLayers: { before: ["reset", "base"], prefix: "stylex" },
        rsOptions: {
          sxPropName: "sx",
          dev: command === "serve",
          unstable_moduleResolution: { type: "commonJS", rootDir },
        },
      }),
      tanstackStart({ router: { quoteStyle: "double", semicolons: false } }),
      viteReact(),
    ],
    build: { cssMinify: true, minify: true },
  }))
}
