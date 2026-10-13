import {
  HeadContent,
  Scripts,
  createRootRoute,
  useRouterState,
} from "@tanstack/react-router"
import { css } from "@kirana-style/core"

import kiranaCss from "@kirana-style/core/stylesheet.css?url"
import appCss from "@workspace/ui/globals.css?url"
import { DirectionProvider } from "@workspace/ui/components/direction"
import { Toaster } from "@workspace/ui/components/toast"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
import {
  ThemeProvider,
  themeStyles,
  useTheme,
} from "@workspace/ui/theme/theme-provider"
import { theme } from "@workspace/ui/theme/semantic"
import type { ThemeMode } from "@workspace/ui/theme/themes"
import {
  fontFamily,
  fontSize,
  lineHeight,
} from "@workspace/ui/tokens/typography"
import { AppShell } from "@workspace/shell/app-shell"

import { NAV } from "@/registry"

const styles = {
  body: css({
    backgroundColor: theme.background,
    color: theme.foreground,
    fontFamily: fontFamily.sans,
  }),
  notFound: css({ padding: "3rem" }),
  notFoundTitle: css({
    fontFamily: fontFamily.heading,
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
  }),
  notFoundText: css({ color: theme.mutedForeground }),
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Blocks · shadcn/ui on Kirana" },
    ],
    links: [
      // First, so its `@layer reset, base, kirana` statement fixes the layer
      // order before globals.css opens the reset and base layers.
      { rel: "stylesheet", href: kiranaCss },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})

function NotFound() {
  return (
    <main sx={styles.notFound}>
      <h1 sx={styles.notFoundTitle}>Not found</h1>
      <p sx={styles.notFoundText}>Nothing lives at this address.</p>
    </main>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const location = useRouterState({ select: (state) => state.location })
  // The block viewer's iframe says which scheme to start in.
  const viewTheme = (location.search as { theme?: ThemeMode }).theme

  return (
    <DirectionProvider direction="ltr">
      <ThemeProvider defaultMode={viewTheme ?? "system"}>
        <ThemedDocument>{children}</ThemedDocument>
      </ThemeProvider>
    </DirectionProvider>
  )
}

function ThemedDocument({ children }: { children: React.ReactNode }) {
  const { mode } = useTheme()

  // `color-scheme` goes on the root element, not the body: the root decides the
  // page's scrollbars and canvas, and an iframe whose root scheme differs from
  // the frame element's gets an opaque light backdrop behind the page.
  return (
    <html lang="en" sx={themeStyles(mode)}>
      <head>
        <HeadContent />
      </head>
      <body sx={styles.body}>
        <TooltipProvider>
          <Frame>{children}</Frame>
        </TooltipProvider>
        <Toaster />
        <Scripts />
      </body>
    </html>
  )
}

/** `/view/<block>` is a full-page block on its own, loaded into the viewer's iframe. */
function Frame({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  if (pathname.startsWith("/view/")) return children
  return (
    <AppShell appName="Blocks" groups={NAV}>
      {children}
    </AppShell>
  )
}
