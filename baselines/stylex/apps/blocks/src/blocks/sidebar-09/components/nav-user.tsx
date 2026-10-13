import * as stylex from "@stylexjs/stylex"
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
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"
import { sidebarMarker } from "@workspace/ui/theme/markers.stylex"

const styles = stylex.create({
  sidebarMenuButton: {
    // `md:h-8 md:p-0` over the large size, whose own values are restated: an sx
    // value replaces the whole property, breakpoints and conditions included.
    height: {
      default: spacing["12"],
      [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]:
        spacing["8"],
      [breakpoint.md]: {
        default: spacing["8"],
        [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]:
          spacing["8"],
      },
    },
    padding: {
      default: spacing["2"],
      [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]: 0,
      [breakpoint.md]: {
        default: 0,
        [stylex.when.ancestor('[data-collapsible="icon"]', sidebarMarker)]: 0,
      },
    },
    // The menu button's own states are restated alongside the open menu:
    // an sx value replaces the whole property.
    backgroundColor: {
      default: null,
      ":hover": theme.sidebarAccent,
      ":active": theme.sidebarAccent,
      "[data-popup-open]": theme.sidebarAccent,
      "[data-open]": theme.sidebarAccent,
      "[data-active]": theme.sidebarAccent,
    },
    color: {
      default: null,
      ":hover": theme.sidebarAccentForeground,
      ":active": theme.sidebarAccentForeground,
      "[data-popup-open]": theme.sidebarAccentForeground,
      "[data-active]": theme.sidebarAccentForeground,
    },
  },
  avatar: {
    height: spacing["8"],
    width: spacing["8"],
    borderStartStartRadius: radius.lg,
    borderStartEndRadius: radius.lg,
    borderEndStartRadius: radius.lg,
    borderEndEndRadius: radius.lg,
  },
  avatarFallback: {
    borderStartStartRadius: radius.lg,
    borderStartEndRadius: radius.lg,
    borderEndStartRadius: radius.lg,
    borderEndEndRadius: radius.lg,
  },
  grid: {
    display: "grid",
    flex: 1,
    textAlign: "left",
    fontSize: fontSize.sm,
    lineHeight: leading.tight,
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontWeight: fontWeight.medium,
  },
  text2: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  },
  icon: {
    marginLeft: "auto",
    width: spacing["4"],
    height: spacing["4"],
  },
  dropdownMenuContent: {
    minWidth: spacing["56"],
    borderStartStartRadius: radius.lg,
    borderStartEndRadius: radius.lg,
    borderEndStartRadius: radius.lg,
    borderEndEndRadius: radius.lg,
  },
  dropdownMenuLabel: {
    paddingTop: "0px",
    paddingBottom: "0px",
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
    fontWeight: fontWeight.normal,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
    paddingInline: spacing["1"],
    paddingBlock: spacing["1.5"],
    textAlign: "left",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
})

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
