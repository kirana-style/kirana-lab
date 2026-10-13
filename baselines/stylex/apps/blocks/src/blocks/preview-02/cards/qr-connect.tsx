import * as stylex from "@stylexjs/stylex"
import QRCode from "react-qr-code"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { color } from "@workspace/ui/tokens/colors.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  cardContent: {
    display: "flex",
    justifyContent: "center",
    paddingTop: spacing["6"],
  },
  box: {
    borderRadius: radius.xl,
    borderStyle: "solid",
    borderWidth: "1px",
    backgroundColor: color.white,
    padding: spacing["4"],
    borderColor: theme.border,
  },
  cardHeader: {
    textAlign: "center",
  },
  button: {
    width: "100%",
  },
})

export function QrConnect() {
  return (
    <Card>
      <CardContent sx={styles.cardContent}>
        <div sx={styles.box}>
          <QRCode
            value="https://ledger.app/connect/jd-4829"
            size={160}
            level="M"
          />
        </div>
      </CardContent>
      <CardHeader sx={styles.cardHeader}>
        <CardTitle>Scan to connect your mobile device</CardTitle>
        <CardDescription>
          Open the Ledger mobile app and scan this code to link your device.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="secondary" sx={styles.button}>
          Got it
        </Button>
      </CardFooter>
    </Card>
  )
}
