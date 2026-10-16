/**
 * What a result has to say about where it came from: the corpus commit, every version that
 * decides the outcome, read from what is installed rather than from what the manifests ask for,
 * and the machine.
 */
import { execFileSync } from "node:child_process"
import { existsSync, readFileSync, realpathSync } from "node:fs"
import os from "node:os"
import path from "node:path"

export const ROOT = path.resolve(import.meta.dirname, "../../..")

/**
 * The version of a package as an app sees it: the nearest `node_modules/<name>` from the app up.
 * Bun installs a workspace's dependencies beside the package that asks for them, so a lookup from
 * the root alone would miss them.
 */
export function installed(from: string, name: string): string | undefined {
  for (let directory = from; ; directory = path.dirname(directory)) {
    const file = path.join(directory, "node_modules", name, "package.json")
    if (existsSync(file))
      return (JSON.parse(readFileSync(file, "utf8")) as { version: string })
        .version
    if (directory === path.dirname(directory)) return undefined
  }
}

/**
 * The version of a package another one depends on, as that package resolves it. Bun's isolated
 * installs keep a dependency of a dependency beside it, out of the app's reach.
 */
export function installedUnder(
  from: string,
  parent: string,
  name: string
): string | undefined {
  for (let directory = from; ; directory = path.dirname(directory)) {
    const found = path.join(directory, "node_modules", parent)
    if (existsSync(found)) return installed(realpathSync(found), name)
    if (directory === path.dirname(directory)) return undefined
  }
}

export function corpusCommit(): string {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: ROOT,
      encoding: "utf8",
    }).trim()
  } catch {
    return "unknown"
  }
}

export function versions(): {
  kirana: string
  targets: Record<string, string>
} {
  // Each tool as the `web` app of its implementation resolves it, which is what its build uses.
  const kirana = path.join(ROOT, "apps/web")
  const stylex = path.join(ROOT, "baselines/stylex/apps/web")
  const tailwind = path.join(ROOT, "baselines/tailwind/apps/web")
  const viteConfig = path.join(ROOT, "baselines/stylex/packages/vite-config")
  const swcConfig = path.join(ROOT, "baselines/stylex-swc/packages/vite-config")
  const found: Record<string, string | undefined> = {
    "@kirana-style/vite": installed(
      path.join(ROOT, "packages/vite-config"),
      "@kirana-style/vite"
    ),
    "@stylexjs/stylex": installed(stylex, "@stylexjs/stylex"),
    "@stylexjs/unplugin": installed(viteConfig, "@stylexjs/unplugin"),
    "@stylexswc/unplugin": installed(swcConfig, "@stylexswc/unplugin"),
    "@stylexswc/rs-compiler": installedUnder(
      swcConfig,
      "@stylexswc/unplugin",
      "@stylexswc/rs-compiler"
    ),
    tailwindcss: installed(tailwind, "tailwindcss"),
    "@tailwindcss/vite": installed(tailwind, "@tailwindcss/vite"),
    vite: installed(kirana, "vite"),
    react: installed(kirana, "react"),
  }
  return {
    kirana: installed(kirana, "@kirana-style/core") ?? "unknown",
    targets: Object.fromEntries(
      Object.entries(found).filter(
        (entry): entry is [string, string] => entry[1] !== undefined
      )
    ),
  }
}

export function machine() {
  const cpus = os.cpus()
  return {
    hardware: {
      cpu: cpus[0]?.model.trim() ?? "unknown",
      cores: cpus.length,
      ramGb: Math.round(os.totalmem() / 1024 ** 3),
      os: `${os.type()} ${os.release()}`,
    },
    // GitHub's runner images name themselves in these.
    runner: process.env.ImageOS
      ? `${process.env.ImageOS} ${process.env.ImageVersion ?? ""}`.trim()
      : undefined,
    run:
      process.env.GITHUB_SERVER_URL &&
      process.env.GITHUB_REPOSITORY &&
      process.env.GITHUB_RUN_ID
        ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
        : undefined,
  }
}
