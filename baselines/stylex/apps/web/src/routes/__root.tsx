import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import * as stylex from "@stylexjs/stylex"

import appCss from "@workspace/ui/globals.css?url"
import { DirectionProvider } from "@workspace/ui/components/direction"
import { Toaster } from "@workspace/ui/components/toast"
import { TooltipProvider } from "@workspace/ui/components/tooltip"
import {
  ThemeProvider,
  themeStyles,
  useTheme,
} from "@workspace/ui/theme/theme-provider"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { fontFamily } from "@workspace/ui/tokens/typography.stylex"

import { DevStyleX } from "@/components/dev-stylex"

const styles = stylex.create({
  body: {
    // The theme's ground colour. The global stylesheet deliberately names no
    // tokens, so the document's own colours are applied here instead.
    backgroundColor: theme.background,
    color: theme.foreground,
    fontFamily: fontFamily.sans,
  },
})

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
        title: "shadcn/ui on StyleX",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      // Dev-only: the StyleX plugin serves its aggregated CSS from this path.
      // In production the same CSS is appended to the built stylesheet above.
      ...(import.meta.env.DEV
        ? [{ rel: "stylesheet", href: "/virtual:stylex.css" }]
        : []),
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
        <DevStyleX />
        <Scripts />
      </body>
    </html>
  )
}
