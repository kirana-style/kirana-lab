import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import { Example, ExampleWrapper } from "@/components/example"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@workspace/ui/components/navigation-menu"
import { AlertCircleIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  exampleWrapper: {
    // Restates the wrapper's two columns from `md`: an sx value replaces the
    // whole property, breakpoints included.
    gridTemplateColumns: {
      default: null,
      "@media (min-width: 48rem) and (max-width: 63.999rem)":
        "repeat(2, minmax(0, 1fr))",
      [breakpoint.lg]: "repeat(1, minmax(0, 1fr))",
    },
  },
  list: {
    width: spacing["96"],
  },
  list2: {
    display: "grid",
    width: {
      default: "400px",
      "@media (min-width: 48rem) and (max-width: 63.999rem)": "500px",
      [breakpoint.lg]: "600px",
    },
    gap: spacing["2"],
    gridTemplateColumns: {
      default: null,
      [breakpoint.md]: "repeat(2, minmax(0, 1fr))",
    },
  },
  list3: {
    display: "grid",
    width: "200px",
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing["2"],
  },
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["1"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
  text: {
    lineHeight: 1,
    fontWeight: fontWeight.medium,
  },
  text2: {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2,
    color: theme.mutedForeground,
  },
})

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export default function NavigationMenuExample() {
  return (
    <ExampleWrapper sx={styles.exampleWrapper}>
      <NavigationMenuBasic />
    </ExampleWrapper>
  )
}

function NavigationMenuBasic() {
  return (
    <Example title="Basic">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul sx={styles.list}>
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built with Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul sx={styles.list2}>
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul sx={styles.list3}>
                <li>
                  <NavigationMenuLink render={<a href="#" sx={styles.link} />}>
                    <Icon icon={AlertCircleIcon} />
                    Backlog
                  </NavigationMenuLink>
                  <NavigationMenuLink render={<a href="#" sx={styles.link} />}>
                    <Icon icon={AlertCircleIcon} />
                    To Do
                  </NavigationMenuLink>
                  <NavigationMenuLink render={<a href="#" sx={styles.link} />}>
                    <Icon icon={AlertCircleIcon} />
                    Done
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              render={<a href="/docs" />}
              sx={navigationMenuTriggerStyle}
            >
              Documentation
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </Example>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink render={<a href={href} />}>
        <div sx={styles.stack}>
          <div sx={styles.text}>{title}</div>
          <div sx={styles.text2}>{children}</div>
        </div>
      </NavigationMenuLink>
    </li>
  )
}
