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
  CreditCardIcon,
  Logout01Icon,
  MoreVerticalCircle01Icon,
  Notification03Icon,
  UserCircle02Icon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { radius, theme } from "@workspace/ui/theme/semantic"
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
  avatar: css({
    width: spacing["8"],
    height: spacing["8"],
    borderStartStartRadius: radius.lg,
    borderStartEndRadius: radius.lg,
    borderEndStartRadius: radius.lg,
    borderEndEndRadius: radius.lg,
    filter: "grayscale(100%)",
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
    color: `color-mix(in oklab, ${theme.foreground} 70%, transparent)`,
  }),
  icon: css({
    marginLeft: "auto",
    width: spacing["4"],
    height: spacing["4"],
  }),
  dropdownMenuContent: css({
    minWidth: spacing["56"],
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
  avatar2: css({
    width: spacing["8"],
    height: spacing["8"],
  }),
  text3: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
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
              icon={MoreVerticalCircle01Icon}

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
                  <Avatar sx={styles.avatar2}>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback sx={styles.avatarFallback}>
                      CN
                    </AvatarFallback>
                  </Avatar>
                  <div sx={styles.grid}>
                    <span sx={styles.text}>{user.name}</span>
                    <span sx={styles.text3}>{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Icon icon={UserCircle02Icon} />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon icon={CreditCardIcon} />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon icon={Notification03Icon} />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icon icon={Logout01Icon} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
