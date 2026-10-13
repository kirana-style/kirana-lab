import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "@/components/example"
import { AspectRatio } from "@workspace/ui/components/aspect-ratio"
import { radius, surface, theme } from "@workspace/ui/theme/semantic"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"

const styles = {
  exampleWrapper: css({
    // `max-w-4xl 2xl:max-w-4xl`: also over the wrapper's own `2xl` width.
    maxWidth: { base: "56rem", [breakpoint["2xl"]]: "56rem" },
  }),
  example: css({
    alignItems: "center",
    justifyContent: "center",
  }),
  aspectRatio: css({
    borderStartStartRadius: radius.lg,
    borderStartEndRadius: radius.lg,
    borderEndStartRadius: radius.lg,
    borderEndEndRadius: radius.lg,
    backgroundColor: theme.muted,
  }),
  image: css({
    position: "absolute",
    inset: "0px",
    height: "100%",
    width: "100%",
    borderRadius: radius.lg,
    objectFit: "cover",
    // `dark:brightness-20` dims the photo in dark mode only.
    filter: `brightness(${surface.imageBrightness}) grayscale(100%)`,
  }),
  example2: css({
    alignItems: "flex-start",
  }),
}

export default function AspectRatioExample() {
  return (
    <ExampleWrapper sx={styles.exampleWrapper}>
      <AspectRatio16x9 />
      <AspectRatio21x9 />
      <AspectRatio1x1 />
      <AspectRatio9x16 />
    </ExampleWrapper>
  )
}

function AspectRatio16x9() {
  return (
    <Example title="16:9" sx={styles.example}>
      <AspectRatio ratio={16 / 9} sx={styles.aspectRatio}>
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"

          sx={styles.image}
        />
      </AspectRatio>
    </Example>
  )
}

function AspectRatio1x1() {
  return (
    <Example title="1:1" sx={styles.example2}>
      <AspectRatio ratio={1 / 1} sx={styles.aspectRatio}>
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"

          sx={styles.image}
        />
      </AspectRatio>
    </Example>
  )
}

function AspectRatio9x16() {
  return (
    <Example title="9:16" sx={styles.example}>
      <AspectRatio ratio={9 / 16} sx={styles.aspectRatio}>
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"

          sx={styles.image}
        />
      </AspectRatio>
    </Example>
  )
}

function AspectRatio21x9() {
  return (
    <Example title="21:9" sx={styles.example}>
      <AspectRatio ratio={21 / 9} sx={styles.aspectRatio}>
        <img
          src="https://avatar.vercel.sh/shadcn1"
          alt="Photo"

          sx={styles.image}
        />
      </AspectRatio>
    </Example>
  )
}
