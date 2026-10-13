import {
  HeadContent,
  Scripts,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router"

import appCss from "@workspace/ui/globals.css?url"
import { DirectionProvider } from "@workspace/ui/components/direction"
import { Toaster } from "@workspace/ui/components/toast"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
import { AppShell } from "@workspace/shell/app-shell"
import { useApplyThemeMode } from "@workspace/shell/theme-mode"
import type { ThemeMode } from "@workspace/shell/theme-mode"

import { NAV } from "@/registry"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Blocks · shadcn/ui" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  notFoundComponent: () => (
    <main className="p-12">
      <h1 className="font-heading text-2xl">Not found</h1>
      <p className="text-muted-foreground">Nothing lives at this address.</p>
    </main>
  ),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <DirectionProvider direction="ltr">
          <TooltipProvider>
            <Frame>{children}</Frame>
          </TooltipProvider>
          <Toaster />
        </DirectionProvider>
        <Scripts />
      </body>
    </html>
  )
}

/**
 * `/view/<block>` is a full-page block on its own, loaded into the viewer's
 * iframe: no app shell, and the colour scheme the viewer passed in `?theme=`.
 */
function Frame({ children }: { children: React.ReactNode }) {
  const location = useRouterState({ select: (state) => state.location })
  if (location.pathname.startsWith("/view/")) {
    const theme = (location.search as { theme?: ThemeMode }).theme
    return <BareView theme={theme ?? "system"}>{children}</BareView>
  }
  return (
    <AppShell appName="Blocks" groups={NAV}>
      {children}
    </AppShell>
  )
}

function BareView({
  theme,
  children,
}: {
  theme: ThemeMode
  children: React.ReactNode
}) {
  useApplyThemeMode(theme)
  return children
}
