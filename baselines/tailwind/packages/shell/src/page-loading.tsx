import { Spinner } from "@workspace/ui/components/spinner"

export function PageLoading() {
  return (
    <div className="flex min-h-80 items-center justify-center text-muted-foreground">
      <Spinner className="size-6" />
    </div>
  )
}
