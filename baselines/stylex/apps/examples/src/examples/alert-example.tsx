import * as stylex from "@stylexjs/stylex"
import { Example, ExampleWrapper } from "@/components/example"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@workspace/ui/components/alert"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { AlertCircleIcon } from "@hugeicons/core-free-icons"
import { breakpoint } from "@workspace/ui/tokens/breakpoints.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"

const styles = stylex.create({
  exampleWrapper: {
    // Restates the wrapper's two columns from `md`: an sx value replaces the
    // whole property, breakpoints included.
    gridTemplateColumns: {
      default: null,
      "@media (min-width: 48rem) and (max-width: 63.999rem)":
        "repeat(2, minmax(0, 1fr))",
      [breakpoint.lg]: "repeat(1, minmax(0, 1fr))",
    },
  },
  stack: {
    marginInline: "auto",
    display: "flex",
    width: "100%",
    maxWidth: "32rem",
    flexDirection: "column",
    gap: spacing["4"],
  },
  list: {
    listStylePosition: "inside",
    listStyleType: "disc",
  },
})

export default function AlertExample() {
  return (
    <ExampleWrapper sx={styles.exampleWrapper}>
      <AlertExample1 />
      <AlertExample2 />
      <AlertExample3 />
      <AlertExample4 />
    </ExampleWrapper>
  )
}

function AlertExample1() {
  return (
    <Example title="Basic">
      <div sx={styles.stack}>
        <Alert>
          <AlertTitle>Success! Your changes have been saved.</AlertTitle>
        </Alert>
        <Alert>
          <AlertTitle>Success! Your changes have been saved.</AlertTitle>
          <AlertDescription>
            This is an alert with title and description.
          </AlertDescription>
        </Alert>
        <Alert>
          <AlertDescription>
            This one has a description only. No title. No icon.
          </AlertDescription>
        </Alert>
      </div>
    </Example>
  )
}

function AlertExample2() {
  return (
    <Example title="With Icons">
      <div sx={styles.stack}>
        <Alert>
          <AlertIcon icon={AlertCircleIcon} />
          <AlertTitle>
            Let&apos;s try one with icon, title and a <a href="#">link</a>.
          </AlertTitle>
        </Alert>
        <Alert>
          <AlertIcon icon={AlertCircleIcon} />
          <AlertDescription>
            This one has an icon and a description only. No title.{" "}
            <a href="#">But it has a link</a> and a <a href="#">second link</a>.
          </AlertDescription>
        </Alert>

        <Alert>
          <AlertIcon icon={AlertCircleIcon} />
          <AlertTitle>Success! Your changes have been saved</AlertTitle>
          <AlertDescription>
            This is an alert with icon, title and description.
          </AlertDescription>
        </Alert>
        <Alert>
          <AlertIcon icon={AlertCircleIcon} />
          <AlertTitle>
            This is a very long alert title that demonstrates how the component
            handles extended text content and potentially wraps across multiple
            lines
          </AlertTitle>
        </Alert>
        <Alert>
          <AlertIcon icon={AlertCircleIcon} />
          <AlertDescription>
            This is a very long alert description that demonstrates how the
            component handles extended text content and potentially wraps across
            multiple lines
          </AlertDescription>
        </Alert>
        <Alert>
          <AlertIcon icon={AlertCircleIcon} />
          <AlertTitle>
            This is an extremely long alert title that spans multiple lines to
            demonstrate how the component handles very lengthy headings while
            maintaining readability and proper text wrapping behavior
          </AlertTitle>
          <AlertDescription>
            This is an equally long description that contains detailed
            information about the alert. It shows how the component can
            accommodate extensive content while preserving proper spacing,
            alignment, and readability across different screen sizes and
            viewport widths. This helps ensure the user experience remains
            consistent regardless of the content length.
          </AlertDescription>
        </Alert>
      </div>
    </Example>
  )
}

function AlertExample3() {
  return (
    <Example title="Destructive">
      <div sx={styles.stack}>
        <Alert variant="destructive">
          <AlertIcon icon={AlertCircleIcon} />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>
            Your session has expired. Please log in again.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertIcon icon={AlertCircleIcon} />
          <AlertTitle>Unable to process your payment.</AlertTitle>
          <AlertDescription>
            <p>
              Please verify your <a href="#">billing information</a> and try
              again.
            </p>
            <ul sx={styles.list}>
              <li>Check your card details</li>
              <li>Ensure sufficient funds</li>
              <li>Verify billing address</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </Example>
  )
}

function AlertExample4() {
  return (
    <Example title="With Actions">
      <div sx={styles.stack}>
        <Alert>
          <AlertIcon icon={AlertCircleIcon} />
          <AlertTitle>The selected emails have been marked as spam.</AlertTitle>
          <AlertAction>
            <Button size="xs">Undo</Button>
          </AlertAction>
        </Alert>
        <Alert>
          <AlertIcon icon={AlertCircleIcon} />
          <AlertTitle>The selected emails have been marked as spam.</AlertTitle>
          <AlertDescription>
            This is a very long alert title that demonstrates how the component
            handles extended text content.
          </AlertDescription>
          <AlertAction>
            <Badge variant="secondary">Badge</Badge>
          </AlertAction>
        </Alert>
      </div>
    </Example>
  )
}
