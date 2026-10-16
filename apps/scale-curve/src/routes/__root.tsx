import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
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
import { fontFamily } from "@workspace/ui/tokens/typography"

const styles = {
  body: css({
    // The theme's ground colour. The global stylesheet deliberately names no
    // tokens, so the document's own colours are applied here instead.
    backgroundColor: theme.background,
    color: theme.foreground,
    fontFamily: fontFamily.sans,
  }),
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "shadcn/ui on Kirana",
      },
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
    <main>
      <h1>404</h1>
      <p>The requested page could not be found.</p>
    </main>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <DirectionProvider direction="ltr">
      <ThemeProvider>
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
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
        <Scripts />
      </body>
    </html>
  )
}
