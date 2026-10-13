/** A single block card, centred on the page background at its natural width. */
export function PreviewFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full w-full justify-center bg-muted p-4 sm:p-6 lg:p-12 dark:bg-background">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
