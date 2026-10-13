import * as stylex from "@stylexjs/stylex"
import { SettingsDialog } from "@/blocks/sidebar-13/components/settings-dialog"

const styles = stylex.create({
  row: {
    display: "flex",
    height: "100svh",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default function Page() {
  return (
    <div sx={styles.row}>
      <SettingsDialog />
    </div>
  )
}
