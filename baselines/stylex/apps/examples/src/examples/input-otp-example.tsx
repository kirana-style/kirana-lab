import * as stylex from "@stylexjs/stylex"
import * as React from "react"
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import { Example, ExampleWrapper } from "@/components/example"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@workspace/ui/components/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@workspace/ui/components/input-otp"
import { RefreshIcon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { duration, easing } from "@workspace/ui/tokens/motion.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  card: {
    // No width class, so the Example card does not stretch it: the original
    // skipped any child whose class contained "w-", `max-w-*` included.
    width: "auto",
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
    maxWidth: "28rem",
  },
  text: {
    fontWeight: fontWeight.medium,
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  largeSlot: {
    height: spacing["12"],
    width: spacing["11"],
    fontSize: fontSize.xl,
    lineHeight: lineHeight.xl,
  },
  cardFooter: {
    flexDirection: "column",
    rowGap: spacing["2"],
    columnGap: spacing["2"],
  },
  button: {
    width: "100%",
  },
  text2: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  },
  link: {
    textDecorationLine: "underline",
    textUnderlineOffset: "4px",
    transitionProperty:
      "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke",
    transitionTimingFunction: easing.inOut,
    transitionDuration: duration["150"],
    color: { default: null, ":hover": theme.primary },
  },
})

export default function InputOTPExample() {
  return (
    <ExampleWrapper>
      <InputOTPForm />
      <InputOTPSimple />
      <InputOTPPattern />
      <InputOTPWithSeparator />
      <InputOTPAlphanumeric />
      <InputOTPDisabled />
      <InputOTPFourDigits />
      <InputOTPInvalid />
    </ExampleWrapper>
  )
}

function InputOTPSimple() {
  return (
    <Example title="Simple">
      <Field>
        <FieldLabel htmlFor="simple">Simple</FieldLabel>
        <InputOTP id="simple" maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </Example>
  )
}

function InputOTPPattern() {
  return (
    <Example title="Digits Only">
      <Field>
        <FieldLabel htmlFor="digits-only">Digits Only</FieldLabel>
        <InputOTP id="digits-only" maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </Example>
  )
}

function InputOTPWithSeparator() {
  const [value, setValue] = React.useState("123456")

  return (
    <Example title="With Separator">
      <Field>
        <FieldLabel htmlFor="with-separator">With Separator</FieldLabel>
        <InputOTP
          id="with-separator"
          maxLength={6}
          value={value}
          onChange={setValue}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </Example>
  )
}

function InputOTPAlphanumeric() {
  return (
    <Example title="Alphanumeric">
      <Field>
        <FieldLabel htmlFor="alphanumeric">Alphanumeric</FieldLabel>
        <FieldDescription>Accepts both letters and numbers.</FieldDescription>
        <InputOTP
          id="alphanumeric"
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </Example>
  )
}

function InputOTPDisabled() {
  return (
    <Example title="Disabled">
      <Field>
        <FieldLabel htmlFor="disabled">Disabled</FieldLabel>
        <InputOTP id="disabled" maxLength={6} disabled value="123456">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </Example>
  )
}

function InputOTPFourDigits() {
  return (
    <Example title="4 Digits">
      <Field>
        <FieldLabel htmlFor="four-digits">4 Digits</FieldLabel>
        <FieldDescription>Common pattern for PIN codes.</FieldDescription>
        <InputOTP id="four-digits" maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </Field>
    </Example>
  )
}

function InputOTPInvalid() {
  const [value, setValue] = React.useState("000000")

  return (
    <Example title="Invalid State">
      <Field>
        <FieldLabel htmlFor="invalid">Invalid State</FieldLabel>
        <FieldDescription>
          Example showing the invalid error state.
        </FieldDescription>
        <InputOTP id="invalid" maxLength={6} value={value} onChange={setValue}>
          <InputOTPGroup>
            <InputOTPSlot index={0} aria-invalid />
            <InputOTPSlot index={1} aria-invalid />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} aria-invalid />
            <InputOTPSlot index={3} aria-invalid />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} aria-invalid />
            <InputOTPSlot index={5} aria-invalid />
          </InputOTPGroup>
        </InputOTP>
        <FieldError errors={[{ message: "Invalid code. Please try again." }]} />
      </Field>
    </Example>
  )
}

function InputOTPForm() {
  return (
    <Example title="Form">
      <Card sx={styles.card}>
        <CardHeader>
          <CardTitle>Verify your login</CardTitle>
          <CardDescription>
            Enter the verification code we sent to your email address:{" "}
            <span sx={styles.text}>m@example.com</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Field>
              <div sx={styles.row}>
                <FieldLabel htmlFor="otp-verification">
                  Verification code
                </FieldLabel>
                <Button variant="outline" size="xs">
                  <Icon
                    icon={RefreshIcon}

                    data-icon="inline-start"
                  />
                  Resend Code
                </Button>
              </div>
              <InputOTP maxLength={6} id="otp-verification" required>
                <InputOTPGroup>
                  <InputOTPSlot index={0} sx={styles.largeSlot} />
                  <InputOTPSlot index={1} sx={styles.largeSlot} />
                  <InputOTPSlot index={2} sx={styles.largeSlot} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} sx={styles.largeSlot} />
                  <InputOTPSlot index={4} sx={styles.largeSlot} />
                  <InputOTPSlot index={5} sx={styles.largeSlot} />
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription>
                <a href="#">I no longer have access to this email address.</a>
              </FieldDescription>
            </Field>
          </form>
        </CardContent>
        <CardFooter sx={styles.cardFooter}>
          <Button type="submit" sx={styles.button}>
            Verify
          </Button>
          <div sx={styles.text2}>
            Having trouble signing in?{" "}
            <a href="#" sx={styles.link}>
              Contact support
            </a>
          </div>
        </CardFooter>
      </Card>
    </Example>
  )
}
