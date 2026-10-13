import { css } from "@kirana-style/core"
import { SettingsDialog } from "@/blocks/sidebar-13/components/settings-dialog"

const styles = {
  row: css({
    display: "flex",
    height: "100svh",
    alignItems: "center",
    justifyContent: "center",
  }),
}

export default function Page() {
  return (
    <div sx={styles.row}>
      <SettingsDialog />
    </div>
  )
}
