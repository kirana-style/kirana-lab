import { css } from "@kirana-style/core"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { radius, theme } from "@workspace/ui/theme/semantic"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography"

const styles = {
  cardContent: css({
    display: "flex",
    flexDirection: "column",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  }),
  row: css({
    display: "flex",
    alignItems: "center",
    gap: spacing["2"],
    borderRadius: radius.md,
    paddingInline: spacing["2.5"],
    paddingBlock: spacing["2"],
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    boxShadow: `0 0 0 1px ${theme.border}`,
  }),
  text: css({
    fontWeight: fontWeight.medium,
  }),
  text2: css({
    marginLeft: "auto",
    color: theme.mutedForeground,
  }),
  button: css({
    marginLeft: "auto",
  }),
}

export function EnvironmentVariables() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Environment Variables</CardTitle>
        <CardDescription>Production · 8 variables</CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        {[
          { key: "DATABASE_URL", masked: true },
          { key: "NEXT_PUBLIC_API", masked: false },
          { key: "STRIPE_SECRET", masked: true },
        ].map((env) => (
          <div key={env.key} sx={styles.row}>
            <span sx={styles.text}>{env.key}</span>
            <span sx={styles.text2}>
              {env.masked ? "••••••••" : "https://api.example.com"}
            </span>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline">Edit</Button>
        <Button sx={styles.button}>Deploy</Button>
      </CardFooter>
    </Card>
  )
}
