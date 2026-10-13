import { z } from "zod"

/** One section of the proposal document the table lists. */
export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
})

export type DocumentRow = z.infer<typeof schema>
