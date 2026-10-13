import { css } from "@kirana-style/core"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { PlusSignIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic"

const styles = {
  card: css({
    position: "relative",
    width: "100%",
    maxWidth: "28rem",
    overflowX: "hidden",
    overflowY: "hidden",
    paddingTop: "0px",
  }),
  box: css({
    position: "absolute",
    inset: "0px",
    zIndex: 30,
    aspectRatio: "16 / 9",
    backgroundColor: theme.primary,
    opacity: "50%",
    mixBlendMode: "color",
  }),
  image: css({
    position: "relative",
    zIndex: 20,
    aspectRatio: "16 / 9",
    width: "100%",
    objectFit: "cover",
    filter: "brightness(60%) grayscale(100%)",
  }),
  badge: css({
    marginLeft: "auto",
  }),
}

export function ObservabilityCard() {
  return (
    <Card sx={styles.card}>
      <div sx={styles.box} />
      <img
        src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Photo by mymind on Unsplash"
        title="Photo by mymind on Unsplash"
        sx={styles.image}
      />
      <CardHeader>
        <CardTitle>Observability Plus is replacing Monitoring</CardTitle>
        <CardDescription>
          Switch to the improved way to explore your data, with natural
          language. Monitoring will no longer be available on the Pro plan in
          November, 2025
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>
          Create Query{" "}
          <Icon
            icon={PlusSignIcon}

            data-icon="inline-end"
          />
        </Button>
        <Badge variant="secondary" sx={styles.badge}>
          Warning
        </Badge>
      </CardFooter>
    </Card>
  )
}
