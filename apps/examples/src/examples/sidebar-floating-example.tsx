import { css } from "@kirana-style/core"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Field } from "@workspace/ui/components/field"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@workspace/ui/components/item"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"
import { MoreHorizontalCircle01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { alpha, radius, theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"
import { fontSize, lineHeight } from "@workspace/ui/tokens/typography"

const styles = {
  sidebarProvider: css({
    backgroundColor: theme.background,
  }),
  item: css({
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
  }),
  itemTitle: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  sidebarMenuButton: css({
    // The open menu's own fill; the button keeps its hover, active and open
    // states, which merge in beside it.
    backgroundColor: {
      "[data-popup-open]": theme.sidebarAccent,
    },
    color: {
      "[data-popup-open]": theme.sidebarAccentForeground,
    },
  }),
  icon: css({
    marginLeft: "auto",
  }),
  card: css({
    marginInlineStart: `calc(${spacing["2"]} * -1)`,
    marginInlineEnd: `calc(${spacing["2"]} * -1)`,
  }),
  button: css({
    width: "100%",
    backgroundColor: theme.sidebarPrimary,
    color: theme.sidebarPrimaryForeground,
  }),
  header: css({
    display: "flex",
    height: spacing["16"],
    flexShrink: 0,
    alignItems: "center",
    gap: spacing["2"],
    borderBottomStyle: "solid",
    borderBottomWidth: "1px",
    paddingInline: spacing["4"],
    borderBottomColor: theme.border,
  }),
  sidebarTrigger: css({
    marginLeft: `calc(${spacing["1"]} * -1)`,
  }),
  stack: css({
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: spacing["4"],
    padding: spacing["4"],
  }),
  grid: css({
    display: "grid",
    gridAutoRows: "min-content",
    gap: spacing["4"],
    gridTemplateColumns: {
      [breakpoint.md]: "repeat(3, minmax(0, 1fr))",
    },
  }),
  box: css({
    aspectRatio: "16 / 9",
    borderRadius: radius.xl,
    backgroundColor: alpha.muted50,
  }),
  box2: css({
    minHeight: { base: "100vh", [breakpoint.md]: "min-content" },
    flex: 1,
    borderRadius: radius.xl,
    backgroundColor: alpha.muted50,
  }),
}

export default function SidebarFloatingExample() {
  const data = {
    navMain: [
      {
        title: "Getting Started",
        url: "#",
        items: [
          {
            title: "Installation",
            url: "#",
          },
          {
            title: "Project Structure",
            url: "#",
          },
        ],
      },
      {
        title: "Build Your Application",
        url: "#",
        items: [
          {
            title: "Routing",
            url: "#",
          },
          {
            title: "Data Fetching",
            url: "#",
            isActive: true,
          },
          {
            title: "Rendering",
            url: "#",
          },
          {
            title: "Caching",
            url: "#",
          },
          {
            title: "Styling",
            url: "#",
          },
          {
            title: "Optimizing",
            url: "#",
          },
          {
            title: "Configuring",
            url: "#",
          },
          {
            title: "Testing",
            url: "#",
          },
          {
            title: "Authentication",
            url: "#",
          },
          {
            title: "Deploying",
            url: "#",
          },
          {
            title: "Upgrading",
            url: "#",
          },
          {
            title: "Examples",
            url: "#",
          },
        ],
      },
      {
        title: "API Reference",
        url: "#",
        items: [
          {
            title: "Components",
            url: "#",
          },
          {
            title: "File Conventions",
            url: "#",
          },
          {
            title: "Functions",
            url: "#",
          },
          {
            title: "next.config.js Options",
            url: "#",
          },
          {
            title: "CLI",
            url: "#",
          },
          {
            title: "Edge Runtime",
            url: "#",
          },
        ],
      },
      {
        title: "Architecture",
        url: "#",
        items: [
          {
            title: "Accessibility",
            url: "#",
          },
          {
            title: "Fast Refresh",
            url: "#",
          },
          {
            title: "Next.js Compiler",
            url: "#",
          },
          {
            title: "Supported Browsers",
            url: "#",
          },
          {
            title: "Turbopack",
            url: "#",
          },
        ],
      },
    ],
  }

  return (
    <SidebarProvider sx={styles.sidebarProvider}>
      <Sidebar variant="floating">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" render={<a href="#" />}>
                <Item sx={styles.item} size="xs">
                  <ItemContent>
                    <ItemTitle sx={styles.itemTitle}>Documentation</ItemTitle>
                    <ItemDescription>v1.0.0</ItemDescription>
                  </ItemContent>
                </Item>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <DropdownMenu key={item.title}>
                  <SidebarMenuItem>
                    <DropdownMenuTrigger
                      render={
                        <SidebarMenuButton sx={styles.sidebarMenuButton} />
                      }
                    >
                      {item.title}{" "}
                      <Icon
                        icon={MoreHorizontalCircle01Icon}

                        sx={styles.icon}
                      />
                    </DropdownMenuTrigger>
                    {item.items?.length ? (
                      <DropdownMenuContent side="right" align="start">
                        <DropdownMenuGroup>
                          {item.items.map((subItem) => (
                            <DropdownMenuItem
                              render={<a href={subItem.url} />}
                              key={subItem.title}
                            >
                              {subItem.title}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    ) : null}
                  </SidebarMenuItem>
                </DropdownMenu>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarGroup>
            <Card size="sm" sx={styles.card}>
              <CardHeader>
                <CardTitle sx={styles.itemTitle}>
                  Subscribe to our newsletter
                </CardTitle>
                <CardDescription>
                  Opt-in to receive updates and news about the sidebar.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <Field>
                    <SidebarInput type="email" placeholder="Email" />
                    <Button sx={styles.button} size="sm">
                      Subscribe
                    </Button>
                  </Field>
                </form>
              </CardContent>
            </Card>
          </SidebarGroup>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header sx={styles.header}>
          <SidebarTrigger sx={styles.sidebarTrigger} />
        </header>
        <div sx={styles.stack}>
          <div sx={styles.grid}>
            <div sx={styles.box} />
            <div sx={styles.box} />
            <div sx={styles.box} />
          </div>
          <div sx={styles.box2} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
