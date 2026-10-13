import { toast as manager } from "@workspace/ui/components/toast"

type Options = { description?: string }

/**
 * The slice of sonner's API the blocks call, over the Base UI toast manager
 * this repo's Toaster already renders.
 */
export const toast = Object.assign(
  (title: string, options: Options = {}) =>
    manager.add({ title, description: options.description }),
  {
    promise: <T>(
      promise: Promise<T>,
      messages: { loading: string; success: string; error: string }
    ) =>
      manager.promise(promise, {
        loading: { title: messages.loading },
        success: { title: messages.success },
        error: { title: messages.error },
      }),
  }
)
