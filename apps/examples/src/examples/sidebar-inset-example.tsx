import { css } from "@kirana-style/core"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@workspace/ui/components/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"
import {
  ArrowRight01Icon,
  ChartIcon,
  ChartRingIcon,
  File01Icon,
  Home01Icon,
  SentIcon,
  Settings05Icon,
  ShoppingBag01Icon,
  ShoppingCart01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { alpha, radius, theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  sidebarMenuAction: css({
    // A collapsible trigger is marked `data-panel-open`, not `data-open`.
    rotate: { "[data-panel-open]": "90deg" },
  }),
  text: css({
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderWidth: 0,
    borderColor: theme.border,
  }),
  sidebarGroup: css({
    marginTop: "auto",
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

export default function SidebarInsetExample() {
  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "#",
        icon: <Icon icon={Home01Icon} />,
        isActive: true,
        items: [
          {
            title: "Overview",
            url: "#",
          },
          {
            title: "Analytics",
            url: "#",
          },
        ],
      },
      {
        title: "Analytics",
        url: "#",
        icon: <Icon icon={ChartIcon} />,
        items: [
          {
            title: "Reports",
            url: "#",
          },
          {
            title: "Metrics",
            url: "#",
          },
        ],
      },
      {
        title: "Orders",
        url: "#",
        icon: <Icon icon={ShoppingBag01Icon} />,
        items: [
          {
            title: "All Orders",
            url: "#",
          },
          {
            title: "Pending",
            url: "#",
          },
          {
            title: "Completed",
            url: "#",
          },
        ],
      },
      {
        title: "Products",
        url: "#",
        icon: <Icon icon={ShoppingCart01Icon} />,
        items: [
          {
            title: "All Products",
            url: "#",
          },
          {
            title: "Categories",
            url: "#",
          },
        ],
      },
      {
        title: "Invoices",
        url: "#",
        icon: <Icon icon={File01Icon} />,
      },
      {
        title: "Customers",
        url: "#",
        icon: <Icon icon={UserIcon} />,
      },
      {
        title: "Settings",
        url: "#",
        icon: <Icon icon={Settings05Icon} />,
      },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: <Icon icon={ChartRingIcon} />,
      },
      {
        title: "Feedback",
        url: "#",
        icon: <Icon icon={SentIcon} />,
      },
    ],
  }

  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={item.isActive}
                  render={<SidebarMenuItem />}
                >
                  <SidebarMenuButton
                    render={<a href={item.url} />}
                    isActive={item.isActive}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger
                        render={
                          <SidebarMenuAction sx={styles.sidebarMenuAction} />
                        }
                      >
                        <Icon icon={ArrowRight01Icon} />
                        <span sx={styles.text}>Toggle</span>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                render={<a href={subItem.url} />}
                              >
                                {subItem.title}
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup sx={styles.sidebarGroup}>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.navSecondary.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton render={<a href={item.url} />} size="sm">
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
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
