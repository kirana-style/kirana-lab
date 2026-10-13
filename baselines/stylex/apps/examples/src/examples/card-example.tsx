import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import { Example, ExampleWrapper } from "@/components/example"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import { Add01Icon, TextCheckIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { alpha, radius, theme } from "@workspace/ui/theme/semantic.stylex"
import { ctx } from "@workspace/ui/theme/context.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  leading,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  cardSpacing4: { [ctx.cardSpacing]: spacing[4] },
  cardSpacing5: { [ctx.cardSpacing]: spacing[5] },
  cardSpacing6: { [ctx.cardSpacing]: spacing[6] },
  cardSpacing8: { [ctx.cardSpacing]: spacing[8] },
  card: {
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
    width: "100%",
    maxWidth: "24rem",
  },
  cardContent: {
    marginBottom: `calc(${ctx.cardSpacing} * -1)`,
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
  },
  box: {
    // `space-y-4` spaced the paragraphs; a column gap does the same.
    display: "flex",
    flexDirection: "column",
    gap: spacing["4"],
    maxHeight: spacing["48"],
    overflowY: "scroll",
    borderTopStyle: "solid",
    borderTopWidth: "1px",
    backgroundColor: alpha.muted50,
    paddingInline: ctx.cardSpacing,
    paddingBlock: spacing["4"],
    fontSize: fontSize.sm,
    lineHeight: leading.relaxed,
    borderTopColor: theme.border,
  },
  cardFooter: {
    justifyContent: "flex-end",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  },
  grid: {
    marginInline: "auto",
    display: "grid",
    width: "100%",
    maxWidth: "24rem",
    gap: spacing["4"],
  },
  toggleGroup: {
    justifyContent: "center",
  },
  grid2: {
    display: "grid",
    gap: spacing["2"],
    borderRadius: radius.lg,
    backgroundColor: alpha.muted50,
    padding: spacing["3"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing["2"],
  },
  text: {
    color: theme.mutedForeground,
  },
  text2: {
    fontWeight: fontWeight.medium,
  },
  row2: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    marginLeft: "auto",
    display: "inline-block",
    textUnderlineOffset: "4px",
    textDecorationLine: { default: null, ":hover": "underline" },
  },
  cardFooter2: {
    flexDirection: "column",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  },
  button: {
    width: "100%",
  },
  text3: {
    marginTop: spacing["4"],
    textAlign: "center",
  },
  link2: {
    textDecorationLine: "underline",
    textUnderlineOffset: "4px",
  },
  list: {
    marginTop: spacing["4"],
    display: "flex",
    listStyleType: "decimal",
    flexDirection: "column",
    gap: spacing["2"],
    paddingLeft: spacing["6"],
  },
  card2: {
    position: "relative",
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
    width: "100%",
    maxWidth: "24rem",
    paddingTop: "0px",
  },
  box2: {
    position: "absolute",
    inset: "0px",
    zIndex: 30,
    aspectRatio: "16 / 9",
    backgroundColor: theme.primary,
    opacity: "50%",
    mixBlendMode: "color",
  },
  image: {
    position: "relative",
    zIndex: 20,
    aspectRatio: "16 / 9",
    width: "100%",
    objectFit: "cover",
    filter: "brightness(60%) grayscale(100%)",
  },
  // `border-b` on a CardHeader is its `bordered` prop.
  cardFooter3: {
    borderTopStyle: "solid",
    borderTopWidth: "1px",
    borderTopColor: theme.border,
  },
})

const spacingOptions = [
  {
    sx: styles.cardSpacing4,
    label: "16px",
    value: "4",
  },
  {
    sx: styles.cardSpacing5,
    label: "20px",
    value: "5",
  },
  {
    sx: styles.cardSpacing6,
    label: "24px",
    value: "6",
  },
  {
    sx: styles.cardSpacing8,
    label: "32px",
    value: "8",
  },
]

export default function CardExample() {
  return (
    <ExampleWrapper>
      <CardDefault />
      <CardSmall />
      <CardContentEdgeToEdge />
      <CardCustomSpacing />
      <CardHeaderWithBorder />
      <CardFooterWithBorder />
      <CardHeaderWithBorderSmall />
      <CardFooterWithBorderSmall />
      <CardWithImage />
      <CardWithImageSmall />
      <CardLogin />
      <CardMeetingNotes />
    </ExampleWrapper>
  )
}

function CardContentEdgeToEdge() {
  return (
    <Example title="Content Edge to Edge">
      <Card sx={styles.card}>
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
          <CardDescription>
            Review the terms before accepting the agreement.
          </CardDescription>
        </CardHeader>
        <CardContent sx={styles.cardContent}>
          <div sx={styles.box}>
            <p>
              These terms govern your use of the workspace, including access to
              shared documents, project files, and collaboration tools.
            </p>
            <p>
              You are responsible for the content you upload and for ensuring
              that your team has the appropriate permissions to view or edit it.
            </p>
            <p>
              We may update features or limits as the service evolves. When
              those changes materially affect your workflow, we will notify your
              workspace administrators.
            </p>
            <p>
              By continuing, you agree to keep your account credentials secure
              and to follow your organization&apos;s acceptable use policies.
            </p>
          </div>
        </CardContent>
        <CardFooter sx={styles.cardFooter}>
          <Button variant="outline">Decline</Button>
          <Button>Accept</Button>
        </CardFooter>
      </Card>
    </Example>
  )
}

function CardCustomSpacing() {
  const [cardSpacing, setSpacing] = React.useState("4")
  const selectedSpacing = spacingOptions.find(
    (option) => option.value === cardSpacing
  )

  return (
    <Example title="Custom Spacing">
      <div sx={styles.grid}>
        <ToggleGroup
          value={[cardSpacing]}
          onValueChange={(value) => {
            if (value[0]) {
              setSpacing(value[0])
            }
          }}
          variant="outline"
          size="sm"
          sx={styles.toggleGroup}
        >
          {spacingOptions.map((option) => (
            <ToggleGroupItem key={option.value} value={option.value}>
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Card sx={selectedSpacing?.sx}>
          <CardHeader>
            <CardTitle>Release Health</CardTitle>
            <CardDescription>
              Track readiness across launch signals.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div sx={styles.grid2}>
              <div sx={styles.row}>
                <span sx={styles.text}>Checks passed</span>
                <span sx={styles.text2}>24 / 26</span>
              </div>
              <div sx={styles.row}>
                <span sx={styles.text}>Open blockers</span>
                <span sx={styles.text2}>2</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Example>
  )
}

function CardLogin() {
  return (
    <Example title="Login">
      <Card sx={styles.card}>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div sx={styles.row2}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a href="#" sx={styles.link}>
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter sx={styles.cardFooter2}>
          <Button type="submit" sx={styles.button}>
            Login
          </Button>
          <Button variant="outline" sx={styles.button}>
            Login with Google
          </Button>
          <div sx={styles.text3}>
            Don&apos;t have an account?{" "}
            <a href="#" sx={styles.link2}>
              Sign up
            </a>
          </div>
        </CardFooter>
      </Card>
    </Example>
  )
}

function CardMeetingNotes() {
  return (
    <Example title="Meeting Notes">
      <Card sx={styles.card}>
        <CardHeader>
          <CardTitle>Meeting Notes</CardTitle>
          <CardDescription>
            Transcript from the meeting with the client.
          </CardDescription>
          <CardAction>
            <Button variant="outline" size="sm">
              <Icon
                icon={TextCheckIcon}

                data-icon="inline-start"
              />
              Transcribe
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>
            Client requested dashboard redesign with focus on mobile
            responsiveness.
          </p>
          <ol sx={styles.list}>
            <li>New analytics widgets for daily/weekly metrics</li>
            <li>Simplified navigation menu</li>
            <li>Dark mode support</li>
            <li>Timeline: 6 weeks</li>
            <li>Follow-up meeting scheduled for next Tuesday</li>
          </ol>
        </CardContent>
        <CardFooter>
          <AvatarGroup>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/maxleiter.png"
                alt="@maxleiter"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+8</AvatarGroupCount>
          </AvatarGroup>
        </CardFooter>
      </Card>
    </Example>
  )
}

function CardWithImage() {
  return (
    <Example title="With Image">
      <Card size="default" sx={styles.card2}>
        <div sx={styles.box2} />
        <img
          src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Photo by mymind on Unsplash"
          title="Photo by mymind on Unsplash"
          sx={styles.image}
        />
        <CardHeader>
          <CardTitle>Beautiful Landscape</CardTitle>
          <CardDescription>
            A stunning view that captures the essence of natural beauty.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button sx={styles.button}>
            <Icon
              icon={Add01Icon}

              data-icon="inline-start"
            />
            Button
          </Button>
        </CardFooter>
      </Card>
    </Example>
  )
}

function CardWithImageSmall() {
  return (
    <Example title="With Image (Small)">
      <Card size="sm" sx={styles.card2}>
        <div sx={styles.box2} />
        <img
          src="https://images.unsplash.com/photo-1604076850742-4c7221f3101b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Photo by mymind on Unsplash"
          title="Photo by mymind on Unsplash"
          sx={styles.image}
        />
        <CardHeader>
          <CardTitle>Beautiful Landscape</CardTitle>
          <CardDescription>
            A stunning view that captures the essence of natural beauty.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button size="sm" sx={styles.button}>
            <Icon
              icon={Add01Icon}

              data-icon="inline-start"
            />
            Button
          </Button>
        </CardFooter>
      </Card>
    </Example>
  )
}

function CardHeaderWithBorder() {
  return (
    <Example title="Header with Border">
      <Card sx={styles.card}>
        <CardHeader bordered>
          <CardTitle>Header with Border</CardTitle>
          <CardDescription>
            This is a card with a header that has a bottom border.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            The header has a border-b class applied, creating a visual
            separation between the header and content sections.
          </p>
        </CardContent>
      </Card>
    </Example>
  )
}

function CardFooterWithBorder() {
  return (
    <Example title="Footer with Border">
      <Card sx={styles.card}>
        <CardContent>
          <p>
            The footer has a border-t class applied, creating a visual
            separation between the content and footer sections.
          </p>
        </CardContent>
        <CardFooter sx={styles.cardFooter3}>
          <Button variant="outline" sx={styles.button}>
            Footer with Border
          </Button>
        </CardFooter>
      </Card>
    </Example>
  )
}

function CardDefault() {
  return (
    <Example title="Default Size">
      <Card size="default" sx={styles.card}>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>
            This card uses the default size variant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            The card component supports a size prop that defaults to
            &quot;default&quot; for standard spacing and sizing.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" sx={styles.button}>
            Action
          </Button>
        </CardFooter>
      </Card>
    </Example>
  )
}

function CardSmall() {
  return (
    <Example title="Small Size">
      <Card size="sm" sx={styles.card}>
        <CardHeader>
          <CardTitle>Small Card</CardTitle>
          <CardDescription>
            This card uses the small size variant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            The card component supports a size prop that can be set to
            &quot;sm&quot; for a more compact appearance.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" sx={styles.button}>
            Action
          </Button>
        </CardFooter>
      </Card>
    </Example>
  )
}

function CardHeaderWithBorderSmall() {
  return (
    <Example title="Header with Border (Small)">
      <Card size="sm" sx={styles.card}>
        <CardHeader bordered>
          <CardTitle>Header with Border</CardTitle>
          <CardDescription>
            This is a small card with a header that has a bottom border.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            The header has a border-b class applied, creating a visual
            separation between the header and content sections.
          </p>
        </CardContent>
      </Card>
    </Example>
  )
}

function CardFooterWithBorderSmall() {
  return (
    <Example title="Footer with Border (Small)">
      <Card size="sm" sx={styles.card}>
        <CardContent>
          <p>
            The footer has a border-t class applied, creating a visual
            separation between the content and footer sections.
          </p>
        </CardContent>
        <CardFooter sx={styles.cardFooter3}>
          <Button variant="outline" size="sm" sx={styles.button}>
            Footer with Border
          </Button>
        </CardFooter>
      </Card>
    </Example>
  )
}
