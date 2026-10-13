import * as stylex from "@stylexjs/stylex"
import { Link } from "@tanstack/react-router"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

import { flattenNav } from "./nav"
import type { NavGroup } from "./nav"
import { radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { duration, easing } from "@workspace/ui/tokens/motion.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  stack: {
    marginInline: "auto",
    display: "flex",
    width: "100%",
    maxWidth: "64rem",
    flexDirection: "column",
    gap: spacing["10"],
    padding: {
      default: spacing["4"],
      "@media (min-width: 40rem) and (max-width: 63.999rem)": spacing["6"],
      [breakpoint.lg]: spacing["12"],
    },
  },
  stack2: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["2"],
  },
  heading: {
    fontFamily: '"Oxanium Variable", sans-serif',
    fontSize: fontSize["3xl"],
    lineHeight: lineHeight["3xl"],
    fontWeight: fontWeight.medium,
  },
  paragraph: {
    color: theme.mutedForeground,
  },
  stack3: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["3"],
  },
  heading2: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
  },
  grid: {
    display: "grid",
    gap: spacing["3"],
    gridTemplateColumns: {
      default: null,
      "@media (min-width: 40rem) and (max-width: 63.999rem)":
        "repeat(2, minmax(0, 1fr))",
      [breakpoint.lg]: "repeat(3, minmax(0, 1fr))",
    },
  },
  link: {
    borderRadius: radius.xl,
  },
  card: {
    height: "100%",
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke",
    transitionTimingFunction: easing.inOut,
    transitionDuration: duration["150"],
    // The card's own fill is restated: an sx value replaces it whole.
    backgroundColor: { default: theme.card, ":hover": theme.muted },
  },
})

export function IndexPage({
  title,
  description,
  groups,
}: {
  title: string
  description: string
  groups: NavGroup[]
}) {
  return (
    <div sx={styles.stack}>
      <div sx={styles.stack2}>
        <h1 sx={styles.heading}>{title}</h1>
        <p sx={styles.paragraph}>{description}</p>
      </div>
      {groups.map((group) => (
        <section key={group.label} sx={styles.stack3}>
          <h2 sx={styles.heading2}>{group.label}</h2>
          <div sx={styles.grid}>
            {flattenNav([group]).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                {...stylex.props(styles.link)}
              >
                <Card size="sm" sx={styles.card}>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>
                      {item.description ?? item.href}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
