/**
 * Tier D (METHODOLOGY.md, KRN-BENCH-001): what Kirana's language server costs while editing, and how
 * long `kirana-style check` takes. Only Kirana has a language server of its own, so this measures it
 * alone, against its budgets (KRN-DX-011) rather than against another tool.
 *
 *   bun bench/editor.ts [--rounds 10] [--warmup 1] [--hovers 300] [--edits 60] [--json out.json]
 *
 * `measureEditor` does the same from another script (`src/run.ts`).
 *
 * Each round is one editing session against the published `kirana-style lsp`, over stdio, as an
 * editor speaks to it:
 *
 * 1. `initialize` with the three apps as the workspace folders, then the time until the server
 *    answers its first request, which it does once it has indexed them, and its resident memory;
 * 2. every UI component and the three apps' pages opened, then `hovers` hovers at `css(`, `sx=` and
 *    property keys, in a seeded order, each timed from request to response;
 * 3. `edits` edits: a component's `"1rem"` changed and changed back, each timed from `didChange` to
 *    the diagnostics the server publishes for that document;
 * 4. its memory at the end.
 *
 * A round's numbers are its p50 and p95, so a cell holds one value per round, and the rounds give
 * the median and its range as every other tier does. `kirana-style check` over the web app and the
 * UI package is timed once per round, cold.
 */
import { spawn, spawnSync } from "node:child_process"
import type { ChildProcess } from "node:child_process"
import { readFileSync, readdirSync, writeFileSync } from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"

const ROOT = path.resolve(import.meta.dirname, "../../..")
const COMMAND = path.join(ROOT, "node_modules/.bin/kirana-style")
const APPS = ["web", "blocks", "examples"].map((app) =>
  path.join(ROOT, "apps", app)
)

/** The language server's budgets (KRN-DX-011): hover p95, diagnostics after an edit, memory. */
export const BUDGETS = {
  hoverP95: 50,
  diagnosticsP95: 200,
  memoryEnd: 300_000_000,
} as const

export type EditorSamples = {
  /** Milliseconds from `initialize` to the first answer, the workspace indexed. */
  indexing: number[]
  hoverP50: number[]
  hoverP95: number[]
  diagnosticsP50: number[]
  diagnosticsP95: number[]
  /** Bytes of resident memory, after indexing and at the end of the session. */
  memoryIndexed: number[]
  memoryEnd: number[]
  /** Milliseconds of one cold `kirana-style check`. */
  check: number[]
}

export type EditorResults = {
  files: number
  targets: number
  hovers: number
  edits: number
  samples: EditorSamples
}

const percentile = (values: number[], p: number) => {
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[
    Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))
  ]!
}

/** The files a session opens: every UI component, and each app's pages and components. */
function sources(): string[] {
  const out: string[] = []
  const walk = (directory: string) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name)
      if (entry.isDirectory()) walk(file)
      else if (entry.name.endsWith(".tsx")) out.push(file)
    }
  }
  walk(path.join(ROOT, "packages/ui/src/components"))
  for (const app of APPS) walk(path.join(app, "src"))
  return out.sort()
}

/** A language-server client over stdio: requests, and the diagnostics a document is waiting for. */
function client(server: ChildProcess) {
  let buffer = Buffer.alloc(0)
  let nextId = 1
  const pending = new Map<number, () => void>()
  const waiting = new Map<string, () => void>()
  server.stdout!.on("data", (chunk: Buffer) => {
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
      ) as { id?: number; method?: string; params?: { uri: string } }
      buffer = buffer.subarray(header + 4 + length)
      if (message.id !== undefined && pending.has(message.id)) {
        pending.get(message.id)!()
        pending.delete(message.id)
      } else if (message.method === "textDocument/publishDiagnostics") {
        const uri = message.params!.uri
        waiting.get(uri)?.()
        waiting.delete(uri)
      }
    }
  })
  const send = (message: object) => {
    const body = JSON.stringify({ jsonrpc: "2.0", ...message })
    server.stdin!.write(
      `Content-Length: ${Buffer.byteLength(body)}\r\n\r\n${body}`
    )
  }
  return {
    send,
    request: (method: string, params: unknown) =>
      new Promise<void>((resolve) => {
        const id = nextId++
        pending.set(id, resolve)
        send({ id, method, params })
      }),
    /** The diagnostics for `uri`; after `timeout` milliseconds, `false` instead. */
    published: (uri: string, timeout = 10_000) =>
      new Promise<boolean>((resolve) => {
        const timer = setTimeout(() => {
          waiting.delete(uri)
          resolve(false)
        }, timeout)
        waiting.set(uri, () => {
          clearTimeout(timer)
          resolve(true)
        })
      }),
  }
}

const resident = (pid: number) =>
  Number(
    /VmRSS:\s+(\d+)/.exec(readFileSync(`/proc/${pid}/status`, "utf8"))![1]
  ) * 1024

/** `line` and `character` (UTF-16) of a string index. */
const position = (text: string, index: number) => {
  const before = text.slice(0, index).split("\n")
  return { line: before.length - 1, character: before.at(-1)!.length }
}

/** One editing session; its p50s, p95s and memory. */
async function session(files: string[], hovers: number, edits: number) {
  // The same seed every round: every round replays the same session.
  let seed = 1
  const random = () => {
    seed = (seed * 1103515245 + 12345) % 2 ** 31
    return seed / 2 ** 31
  }
  const server = spawn(COMMAND, ["lsp"], {
    cwd: APPS[0],
    stdio: ["pipe", "pipe", "ignore"],
  })
  const lsp = client(server)
  const started = performance.now()
  await lsp.request("initialize", {
    capabilities: { workspace: { workspaceFolders: true } },
    rootUri: pathToFileURL(APPS[0]!).href,
    workspaceFolders: APPS.map((app) => ({
      uri: pathToFileURL(app).href,
      name: path.basename(app),
    })),
  })
  lsp.send({ method: "initialized", params: {} })
  // The server indexes after the handshake; its first answer comes once that is done.
  await lsp.request("workspace/symbol", { query: "" })
  const indexing = performance.now() - started
  const memoryIndexed = resident(server.pid!)

  const targets: { uri: string; at: ReturnType<typeof position> }[] = []
  for (const file of files) {
    const text = readFileSync(file, "utf8")
    const uri = pathToFileURL(file).href
    // A file the server has nothing to say about may publish nothing; opening does not wait long.
    const opened = lsp.published(uri, 2000)
    lsp.send({
      method: "textDocument/didOpen",
      params: {
        textDocument: { uri, languageId: "typescriptreact", version: 1, text },
      },
    })
    await opened
    for (const match of text.matchAll(/css\(|sx=|\b[a-z][A-Za-z]+(?=: )/g))
      targets.push({ uri, at: position(text, match.index + 1) })
  }

  const hoverTimes: number[] = []
  for (let index = 0; index < hovers; index++) {
    const target = targets[Math.floor(random() * targets.length)]!
    const at = performance.now()
    await lsp.request("textDocument/hover", {
      textDocument: { uri: target.uri },
      position: target.at,
    })
    hoverTimes.push(performance.now() - at)
  }

  const editable = files.filter((file) =>
    readFileSync(file, "utf8").includes('"1rem"')
  )
  const versions = new Map<string, number>()
  const editTimes: number[] = []
  for (let index = 0; index < edits; index++) {
    const file = editable[Math.floor(random() * editable.length)]!
    const uri = pathToFileURL(file).href
    const original = readFileSync(file, "utf8")
    const version = (versions.get(uri) ?? 1) + 1
    versions.set(uri, version)
    const text =
      version % 2 === 0 ? original.replace('"1rem"', '"1.25rem"') : original
    const done = lsp.published(uri)
    const at = performance.now()
    lsp.send({
      method: "textDocument/didChange",
      params: { textDocument: { uri, version }, contentChanges: [{ text }] },
    })
    if (!(await done))
      throw new Error(`no diagnostics within 10 s of editing ${file}`)
    editTimes.push(performance.now() - at)
  }
  const memoryEnd = resident(server.pid!)
  await lsp.request("shutdown", null)
  lsp.send({ method: "exit" })
  await new Promise((resolve) => server.once("exit", resolve))
  return {
    targets: targets.length,
    indexing,
    hoverP50: percentile(hoverTimes, 50),
    hoverP95: percentile(hoverTimes, 95),
    diagnosticsP50: percentile(editTimes, 50),
    diagnosticsP95: percentile(editTimes, 95),
    memoryIndexed,
    memoryEnd,
  }
}

/** One cold `kirana-style check` of the web app and the UI package. */
function check(): number {
  const started = performance.now()
  // Diagnostics make the exit code 1, as they should; the time is what is measured here.
  spawnSync(COMMAND, ["check", "src", "../../packages/ui/src"], {
    cwd: APPS[0],
    stdio: "ignore",
  })
  return performance.now() - started
}

export async function measureEditor({
  rounds = 10,
  warmup = 1,
  hovers = 300,
  edits = 60,
  log = console.error,
}: {
  rounds?: number
  warmup?: number
  hovers?: number
  edits?: number
  log?: (line: string) => void
} = {}): Promise<EditorResults> {
  const files = sources()
  const samples: EditorSamples = {
    indexing: [],
    hoverP50: [],
    hoverP95: [],
    diagnosticsP50: [],
    diagnosticsP95: [],
    memoryIndexed: [],
    memoryEnd: [],
    check: [],
  }
  let targets = 0
  for (let round = -warmup; round < rounds; round++) {
    const result = await session(files, hovers, edits)
    const checked = check()
    targets = result.targets
    log(
      `  editor ${round < 0 ? "warm-up" : `round ${round + 1}`}: hover p95 ${result.hoverP95.toFixed(1)} ms, diagnostics p95 ${result.diagnosticsP95.toFixed(1)} ms, check ${(checked / 1000).toFixed(2)} s`
    )
    if (round < 0) continue
    for (const key of Object.keys(result) as (keyof typeof result)[])
      if (key !== "targets") samples[key].push(result[key])
    samples.check.push(checked)
  }
  return { files: files.length, targets, hovers, edits, samples }
}

if (import.meta.main) {
  const args = process.argv.slice(2)
  const option = (name: string, fallback: string) => {
    const index = args.indexOf(`--${name}`)
    return index < 0 ? fallback : (args[index + 1] ?? fallback)
  }
  const results = await measureEditor({
    rounds: Number(option("rounds", "10")),
    warmup: Number(option("warmup", "1")),
    hovers: Number(option("hovers", "300")),
    edits: Number(option("edits", "60")),
  })
  const out = option("json", "")
  const text = `${JSON.stringify(results, null, 2)}\n`
  if (out) writeFileSync(out, text)
  else console.log(text)
}
