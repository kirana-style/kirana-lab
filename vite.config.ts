import { defineConfig } from "vite-plus"

/** The lab's own sources: the Kirana corpus, the harness and the scripts. */
const SOURCES = [
  "**/*.{ts,tsx,mts,cts,js,jsx,mjs,cjs,json,jsonc,md,css,yml,yaml}",
  "!**/node_modules/**",
  "!**/dist/**",
  "!**/coverage/**",
  "!**/.tanstack/**",
  "!baselines/**",
  "!results/**",
]

/** One implementation's three apps, each built by its own `build` script (`vite build`). */
const buildAll = (root: string) =>
  `for app in web blocks examples; do bun run --cwd ${root}/apps/$app build || exit 1; done`

export default defineConfig({
  // `vp run <name>`. The builds are what the benchmark measures, so they are never cached here:
  // a cache hit would hide a build that no longer works.
  run: {
    tasks: {
      "build:kirana": { command: buildAll("."), cache: false },
      "build:stylex": { command: buildAll("baselines/stylex"), cache: false },
      "build:stylex-swc": {
        command: buildAll("baselines/stylex-swc"),
        cache: false,
      },
      "build:tailwind": {
        command: buildAll("baselines/tailwind"),
        cache: false,
      },
      build: {
        command: "echo Every implementation built.",
        dependsOn: [
          "build:kirana",
          "build:stylex",
          "build:stylex-swc",
          "build:tailwind",
        ],
        cache: false,
      },
      // The harness's own tests: the statistics, the CSS counts and the report.
      test: {
        command: "bun run --cwd packages/harness test",
        cache: { input: SOURCES, output: [] },
      },
      // Format, lint and types, then the workspaces' shared versions.
      check: {
        command:
          "vp check && bun scripts/sync-versions.ts --check && bun scripts/fairness.ts",
        cache: {
          input: [
            ...SOURCES,
            "baselines/*/package.json",
            "baselines/*/*/*/package.json",
            "baselines/*/bun.lock",
          ],
          output: [],
        },
      },
    },
  },
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    endOfLine: "lf",
    semi: false,
    singleQuote: false,
    tabWidth: 2,
    trailingComma: "es5",
    printWidth: 80,
    sortPackageJson: false,
    ignorePatterns: [
      "**/dist/**",
      "**/coverage/**",
      "**/.tanstack/**",
      "**/routeTree.gen.ts",
      "bun.lock",
      ".agents/**",
      ".claude/**",
      // The baselines are the originals the corpus is compared with: kept as they were written.
      "baselines/**",
      "results/**",
    ],
  },
  lint: {
    plugins: ["import", "typescript", "unicorn", "react", "oxc"],
    jsPlugins: [
      { name: "kirana", specifier: "@kirana-style/eslint-plugin" },
      { name: "vite-plus", specifier: "vite-plus/oxlint-plugin" },
    ],
    categories: { correctness: "error" },
    env: { builtin: true, es2020: true, browser: true },
    ignorePatterns: [
      "**/dist/**",
      "**/coverage/**",
      "**/.tanstack/**",
      "**/routeTree.gen.ts",
      "**/vite.config.*.timestamp-*.*",
      "baselines/**",
      "results/**",
    ],
    rules: {
      "kirana/diagnostics": "error",
      "kirana/sx-last": "error",
      "kirana/no-conflicting-props": "error",
      "kirana/override-keeps-conditions": "error",
      "kirana/no-classname-on-sx": "error",
      "kirana/no-unused": "error",
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "import/no-duplicates": "error",
      "unicorn/prefer-node-protocol": "error",
      "typescript/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "vite-plus/prefer-vite-plus-imports": "error",
      // The same type-aware rules kirana turns off, for the same patterns: `String(value)` on a
      // value the compiler bridges, chart keys built from a union, and the one `new Function` the
      // runtime benchmark uses to replay a colour-scheme switch inside the page.
      "typescript/unbound-method": "off",
      "typescript/no-base-to-string": "off",
      "typescript/restrict-template-expressions": "off",
      "typescript/no-implied-eval": "off",
    },
    overrides: [
      {
        // The corpus is kept identical to the baselines it is compared with, so it is not
        // rewritten to satisfy a rule the originals were never held to.
        files: ["apps/**", "packages/ui/**", "packages/shell/**"],
        rules: { "typescript/no-floating-promises": "off" },
      },
    ],
    options: { typeAware: true, typeCheck: true },
  },
})
