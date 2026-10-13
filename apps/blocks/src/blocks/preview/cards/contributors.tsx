import { css } from "@kirana-style/core"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { spacing } from "@workspace/ui/tokens/spacing"
import { fontSize, lineHeight } from "@workspace/ui/tokens/typography"

const styles = {
  card: css({
    maxWidth: "24rem",
  }),
  row: css({
    display: "flex",
    flexWrap: "wrap",
    gap: spacing["2"],
  }),
  avatar: css({
    filter: "grayscale(100%)",
  }),
  link: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    textDecorationLine: "underline",
    textUnderlineOffset: "4px",
  }),
}

// GitHub usernames displayed as contributor avatars.
const usernames = [
  "shadcn",
  "vercel",
  "nextjs",
  "tailwindlabs",
  "typescript-lang",
  "eslint",
  "prettier",
  "babel",
  "webpack",
  "rollup",
  "parcel",
  "vite",
  "react",
  "vue",
  "angular",
  "solid",
]

export function Contributors() {
  return (
    <Card sx={styles.card}>
      <CardHeader>
        <CardTitle>
          Contributors <Badge variant="secondary">312</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div sx={styles.row}>
          {usernames.map((username) => (
            <Avatar key={username} sx={styles.avatar}>
              <AvatarImage
                src={`https://github.com/${username}.png`}
                alt={username}
              />
              <AvatarFallback>{username.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <a href="#" sx={styles.link}>
          + 810 contributors
        </a>
      </CardFooter>
    </Card>
  )
}
