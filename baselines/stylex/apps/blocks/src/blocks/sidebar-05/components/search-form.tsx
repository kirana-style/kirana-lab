import * as stylex from "@stylexjs/stylex"
import { Label } from "@workspace/ui/components/label"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarInput,
} from "@workspace/ui/components/sidebar"
import { SearchIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  sidebarGroup: {
    paddingTop: "0px",
    paddingBottom: "0px",
  },
  sidebarGroupContent: {
    position: "relative",
  },
  label: {
    position: "absolute",
    width: "1px",
    height: "1px",
    paddingTop: 0,
    paddingBottom: 0,
    paddingInlineStart: 0,
    paddingInlineEnd: 0,
    marginTop: "-1px",
    marginBottom: "-1px",
    marginInlineStart: "-1px",
    marginInlineEnd: "-1px",
    overflowX: "hidden",
    overflowY: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderInlineStartWidth: 0,
    borderInlineEndWidth: 0,
    borderTopColor: theme.border,
    borderBottomColor: theme.border,
    borderInlineStartColor: theme.border,
    borderInlineEndColor: theme.border,
  },
  sidebarInput: {
    paddingLeft: spacing["8"],
  },
  icon: {
    pointerEvents: "none",
    position: "absolute",
    top: "calc(1 / 2 * 100%)",
    left: spacing["2"],
    width: spacing["4"],
    height: spacing["4"],
    translate: "0 calc(calc(1 / 2 * 100%) * -1)",
    opacity: "50%",
    userSelect: "none",
  },
})

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props}>
      <SidebarGroup sx={styles.sidebarGroup}>
        <SidebarGroupContent sx={styles.sidebarGroupContent}>
          <Label htmlFor="search" sx={styles.label}>
            Search
          </Label>
          <SidebarInput
            id="search"
            placeholder="Search the docs..."
            sx={styles.sidebarInput}
          />
          <Icon
            icon={SearchIcon}

            sx={styles.icon}
          />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  )
}
