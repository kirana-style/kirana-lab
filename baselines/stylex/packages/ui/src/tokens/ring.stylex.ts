/**
 * Focus and validation ring geometry, Tailwind's `ring-3`.
 *
 * This lives in a `.stylex.ts` file rather than as a plain exported `const`
 * because StyleX resolves imported values at compile time, and it can only
 * follow imports into variable-definition files. A normal module exporting
 * `const RING_WIDTH = "3px"` fails with "Could not resolve the path to the
 * imported file" the moment another module uses it inside `stylex.create`.
 *
 * Being a `defineConsts` value, it is inlined and emits no CSS.
 */

import * as stylex from "@stylexjs/stylex"

export const ring = stylex.defineConsts({
  width: "3px",
})
