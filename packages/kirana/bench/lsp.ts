/**
 * E-06 / KRN-DX-011 — the language server's latency budgets, on this repository.
 *
 *   bun bench/lsp.ts [--hovers 300] [--edits 60] [--seed 1]
 *
 * The budgets (doc 12): hover p95 ≤ 50 ms, diagnostics refreshed ≤ 200 ms after an edit, and server
 * memory ≤ 300 MB after indexing all three apps. This replays an editing session against the release
 * `kirana` binary, speaking LSP over stdio exactly as an editor does:
 *
 * 1. `initialize` with the web app's configuration and the repository as the root, so the server
 *    indexes `packages/ui`, `packages/shell` and all three apps — the session E-06 describes;
 * 2. hovers at every `css(`, `sx=` and property key of the UI components, in a seeded random order,
 *    timed from request to response;
 * 3. edits: a component's text changes (a property value, then back), timed from `didChange` to the
 *    `publishDiagnostics` for that document;
 * 4. the server's resident memory (`/proc/<pid>/status`) after indexing and at the end.
 *
 * The release binary is built first if it is missing. Results are printed and appended to
 * `bench/results.md` under the date, so a regression is a diff.
 */
import { spawn, spawnSync } from "node:child_process"
import {
  appendFileSync,
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"

import { resolveConfig } from "../npm/compiler/src/config.ts"
import { rustEnvironment } from "../scripts/rust.ts"

const args = process.argv.slice(2)
const option = (name: string, fallback: number) => {
  const index = args.indexOf(`--${name}`)
  return index < 0 ? fallback : Number(args[index + 1] ?? fallback)
}
const hovers = option("hovers", 300)
const edits = option("edits", 60)
let seed = option("seed", 1)
const random = () => {
  seed = (seed * 1103515245 + 12345) % 2 ** 31
  return seed / 2 ** 31
}

const kirana = path.resolve(import.meta.dirname, "..")
const repo = path.resolve(kirana, "../..")
const binary = path.join(kirana, "target/release/kirana")
if (!existsSync(binary)) {
  const build = spawnSync("cargo", ["build", "--release", "-p", "kirana_cli"], {
    cwd: kirana,
    stdio: "inherit",
    env: rustEnvironment(),
  })
  if (build.status !== 0) process.exit(build.status ?? 1)
}

const { json } = await resolveConfig(path.join(repo, "apps/web"))
const config = JSON.parse(json) as Record<string, unknown>
config.root = repo
const server = spawn(binary, ["--config-json", JSON.stringify(config), "lsp"], {
  cwd: repo,
  stdio: ["pipe", "pipe", "inherit"],
})

// Framing (LSP base protocol): Content-Length headers over stdio.
let buffer = Buffer.alloc(0)
let nextId = 1
const pending = new Map<number, (result: unknown) => void>()
const waiters: Array<
  (message: { method: string; params: { uri: string } }) => boolean
> = []
server.stdout.on("data", (chunk: Buffer) => {
  buffer = Buffer.concat([buffer, chunk])
  for (;;) {
    const header = buffer.indexOf("\r\n\r\n")
    if (header < 0) return
    const length = Number(
      /Content-Length: (\d+)/.exec(buffer.subarray(0, header).toString())![1]
    )
    if (buffer.length < header + 4 + length) return
    const message = JSON.parse(
      buffer.subarray(header + 4, header + 4 + length).toString()
    )
    buffer = buffer.subarray(header + 4 + length)
    if (message.id !== undefined && pending.has(message.id)) {
      pending.get(message.id)!(message.result)
      pending.delete(message.id)
    } else if (message.method) {
      const index = waiters.findIndex((wait) => wait(message))
      if (index >= 0) waiters.splice(index, 1)
    }
  }
})
const send = (message: object) => {
  const body = JSON.stringify({ jsonrpc: "2.0", ...message })
  server.stdin.write(
    `Content-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`
  )
}
const request = (method: string, params: unknown) =>
  new Promise<unknown>((resolve) => {
    const id = nextId++
    pending.set(id, resolve)
    send({ id, method, params })
  })
const published = (uri: string) =>
  new Promise<void>((resolve) =>
    waiters.push((message) => {
      if (
        message.method !== "textDocument/publishDiagnostics" ||
        message.params.uri !== uri
      )
        return false
      resolve()
      return true
    })
  )
const memory = () => {
  const status = readFileSync(`/proc/${server.pid}/status`, "utf8")
  return Number(/VmRSS:\s+(\d+)/.exec(status)![1]) / 1024
}

const sources: string[] = []
const walk = (directory: string) => {
  for (const name of readdirSync(directory)) {
    const file = path.join(directory, name)
    if (statSync(file).isDirectory()) walk(file)
    else if (/\.tsx?$/.test(name)) sources.push(file)
  }
}
walk(path.join(repo, "packages/ui/src/components"))

const started = performance.now()
await request("initialize", {
  capabilities: {},
  rootUri: pathToFileURL(repo).href,
})
send({ method: "initialized", params: {} })
// The server indexes after the handshake; its first answer comes once that is done.
await request("workspace/symbol", { query: "" })
const indexing = performance.now() - started
const indexedMemory = memory()

/** `line`/`character` (UTF-16) of a string index. */
const position = (text: string, index: number) => {
  const before = text.slice(0, index).split("\n")
  return { line: before.length - 1, character: before.at(-1)!.length }
}

// Every hover target in the components.
const targets: Array<{
  uri: string
  position: { line: number; character: number }
}> = []
for (const file of sources) {
  const text = readFileSync(file, "utf8")
  const uri = pathToFileURL(file).href
  send({
    method: "textDocument/didOpen",
    params: {
      textDocument: { uri, languageId: "typescriptreact", version: 1, text },
    },
  })
  await published(uri)
  for (const match of text.matchAll(/css\(|sx=|\b[a-z][A-Za-z]+(?=: )/g))
    targets.push({ uri, position: position(text, match.index! + 1) })
}

const hoverTimes: number[] = []
for (let index = 0; index < hovers; index++) {
  const target = targets[Math.floor(random() * targets.length)]!
  const at = performance.now()
  await request("textDocument/hover", {
    textDocument: { uri: target.uri },
    position: target.position,
  })
  hoverTimes.push(performance.now() - at)
}

const editTimes: number[] = []
const editable = sources.filter((file) =>
  readFileSync(file, "utf8").includes('"1rem"')
)
for (let index = 0; index < edits; index++) {
  const file = editable[Math.floor(random() * editable.length)]!
  const uri = pathToFileURL(file).href
  const original = readFileSync(file, "utf8")
  const text =
    index % 2 === 0 ? original.replace('"1rem"', '"1.25rem"') : original
  const at = performance.now()
  const done = published(uri)
  send({
    method: "textDocument/didChange",
    params: {
      textDocument: { uri, version: index + 2 },
      contentChanges: [{ text }],
    },
  })
  await done
  editTimes.push(performance.now() - at)
}
const finalMemory = memory()

await request("shutdown", null)
send({ method: "exit" })

const percentile = (values: number[], p: number) => {
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[
    Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))
  ]!
}
const ms = (value: number) => `${value.toFixed(1)} ms`
const result = {
  files: sources.length,
  targets: targets.length,
  indexing: ms(indexing),
  hoverP50: ms(percentile(hoverTimes, 50)),
  hoverP95: ms(percentile(hoverTimes, 95)),
  diagnosticsP50: ms(percentile(editTimes, 50)),
  diagnosticsP95: ms(percentile(editTimes, 95)),
  memoryIndexed: `${indexedMemory.toFixed(0)} MB`,
  memoryEnd: `${finalMemory.toFixed(0)} MB`,
}
console.table(result)
const budgets = [
  percentile(hoverTimes, 95) <= 50,
  percentile(editTimes, 95) <= 200,
  Math.max(indexedMemory, finalMemory) <= 300,
]
appendFileSync(
  path.join(import.meta.dirname, "results.md"),
  `\n## E-06 language server (${new Date().toISOString().slice(0, 10)})\n\n` +
    `${sources.length} component files open, ${hovers} hovers over ${targets.length} targets, ${edits} edits; ` +
    `indexing ${result.indexing}. Hover p50 ${result.hoverP50}, p95 ${result.hoverP95} (budget 50 ms); ` +
    `diagnostics after an edit p50 ${result.diagnosticsP50}, p95 ${result.diagnosticsP95} (budget 200 ms); ` +
    `memory ${result.memoryIndexed} indexed, ${result.memoryEnd} at the end (budget 300 MB). ` +
    `${budgets.every(Boolean) ? "All budgets met." : "Budgets missed: see above."}\n`
)
process.exit(budgets.every(Boolean) ? 0 : 1)
