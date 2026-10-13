import { css } from "@kirana-style/core"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@workspace/ui/components/sidebar"
import {
  CheckmarkBadgeIcon,
  CreditCardIcon,
  LogoutIcon,
  NotificationIcon,
  SparklesIcon,
  UnfoldMoreIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
} from "@workspace/ui/tokens/typography"
import { sidebarMarker } from "@workspace/ui/theme/markers"

const styles = {
  sidebarMenuButton: css({
    // `md:h-8 md:p-0` over the large size, whose own values are restated: an sx
    // value replaces the whole property, breakpoints and conditions included.
    height: {
      base: spacing["12"],
      [sidebarMarker.within('[data-collapsible="icon"]')]: spacing["8"],
      [breakpoint.md]: {
        base: spacing["8"],
        [sidebarMarker.within('[data-collapsible="icon"]')]: spacing["8"],
      },
    },
    padding: {
      base: spacing["2"],
      [sidebarMarker.within('[data-collapsible="icon"]')]: 0,
      [breakpoint.md]: {
        base: 0,
        [sidebarMarker.within('[data-collapsible="icon"]')]: 0,
      },
    },
    // The open menu's own fill; the button keeps its hover, active and open
    // states, which merge in beside it.
    backgroundColor: {
      "[data-popup-open]": theme.sidebarAccent,
    },
    color: {
      "[data-popup-open]": theme.sidebarAccentForeground,
    },
  }),
  avatar: css({
    height: spacing["8"],
    width: spacing["8"],
    borderStartStartRadius: radius.lg,
    borderStartEndRadius: radius.lg,
    borderEndStartRadius: radius.lg,
    borderEndEndRadius: radius.lg,
  }),
  avatarFallback: css({
    borderStartStartRadius: radius.lg,
    borderStartEndRadius: radius.lg,
    borderEndStartRadius: radius.lg,
    borderEndEndRadius: radius.lg,
  }),
  grid: css({
    display: "grid",
    flex: 1,
    textAlign: "left",
    fontSize: fontSize.sm,
    lineHeight: leading.tight,
  }),
  text: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
  }),
  text2: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  icon: css({
    marginLeft: "auto",
    width: spacing["4"],
    height: spacing["4"],
  }),
  dropdownMenuContent: css({
    minWidth: spacing["56"],
    borderStartStartRadius: radius.lg,
    borderStartEndRadius: radius.lg,
    borderEndStartRadius: radius.lg,
    borderEndEndRadius: radius.lg,
  }),
  dropdownMenuLabel: css({
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
    fontWeight: fontWeight.normal,
  }),
  row: css({
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
    paddingInline: spacing["1"],
    paddingBlock: spacing["1.5"],
    textAlign: "left",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
}

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton size="lg" sx={styles.sidebarMenuButton} />
            }
          >
            <Avatar sx={styles.avatar}>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback sx={styles.avatarFallback}>CN</AvatarFallback>
            </Avatar>
            <div sx={styles.grid}>
              <span sx={styles.text}>{user.name}</span>
              <span sx={styles.text2}>{user.email}</span>
            </div>
            <Icon
              icon={UnfoldMoreIcon}

              sx={styles.icon}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            sx={styles.dropdownMenuContent}
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {/* Base UI throws unless a menu label sits inside a group. */}
            <DropdownMenuGroup>
              <DropdownMenuLabel sx={styles.dropdownMenuLabel}>
                <div sx={styles.row}>
                  <Avatar sx={styles.avatar}>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback sx={styles.avatarFallback}>
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <div sx={styles.grid}>
                    <span sx={styles.text}>{user.name}</span>
                    <span sx={styles.text2}>{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Icon icon={SparklesIcon} />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Icon icon={CheckmarkBadgeIcon} />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon icon={CreditCardIcon} />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon icon={NotificationIcon} />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icon icon={LogoutIcon} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
