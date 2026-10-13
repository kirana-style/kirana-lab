/**
 * The StyleX plugin's dev-only virtual modules.
 *
 * These exist only while the dev server is running, so TypeScript has to be told
 * about them. The import that uses this is guarded by `import.meta.env.DEV`.
 */
declare module "virtual:stylex:runtime" {
  const runtime: unknown
  export default runtime
}

declare module "virtual:stylex:css-only" {
  const cssOnly: unknown
  export default cssOnly
}
