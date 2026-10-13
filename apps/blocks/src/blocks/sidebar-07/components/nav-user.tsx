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
import { theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
} from "@workspace/ui/tokens/typography"

const styles = {
  sidebarMenuButton: css({
    // The open menu's own fill; the button keeps its hover, active and open
    // states, which merge in beside it.
    backgroundColor: {
      '[aria-expanded="true"]': theme.muted,
    },
    color: {
      '[aria-expanded="true"]': theme.sidebarAccentForeground,
    },
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
    width: "fit-content",
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
            <Avatar>
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>CN</AvatarFallback>
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
            <DropdownMenuGroup>
              <DropdownMenuLabel sx={styles.dropdownMenuLabel}>
                <div sx={styles.row}>
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>CN</AvatarFallback>
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
