import { toast as manager } from "@workspace/ui/components/toast"

type Options = { description?: string }

/**
 * The slice of sonner's API the examples call, over the Base UI toast manager
 * this repo's Toaster already renders.
 */
export function toast(title: string, options: Options = {}) {
  return manager.add({ title, description: options.description })
}
