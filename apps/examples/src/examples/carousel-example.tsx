import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "@/components/example"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel"
import { breakpoint } from "@workspace/ui/tokens/breakpoints"
import { spacing } from "@workspace/ui/tokens/spacing"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography"

const styles = {
  exampleWrapper: css({
    // `lg:grid-cols-1`: one column from `lg`, over the wrapper's two from `md`.
    gridTemplateColumns: { [breakpoint.lg]: "repeat(1, minmax(0, 1fr))" },
  }),
  carousel: css({
    // No width class, so the Example card does not stretch it: the original
    // skipped any child whose class contained "w-", `max-w-*` included.
    width: "auto",
    marginInlineStart: "auto",
    marginInlineEnd: "auto",
    maxWidth: { base: "20rem", [breakpoint.sm]: "24rem" },
  }),
  box: css({
    padding: spacing["1"],
  }),
  cardContent: css({
    display: "flex",
    aspectRatio: "1 / 1",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: spacing["6"],
    paddingBottom: spacing["6"],
    paddingInlineStart: spacing["6"],
    paddingInlineEnd: spacing["6"],
  }),
  text: css({
    fontSize: fontSize["4xl"],
    lineHeight: lineHeight["4xl"],
    fontWeight: fontWeight.semibold,
  }),
  carouselPrevious: css({
    display: { base: "none", [breakpoint.sm]: "inline-flex" },
  }),
  carouselItem: css({
    // The item's own `100%` is restated: an sx value replaces the whole property.
    flexBasis: {
      base: "100%",
      "@media (min-width: 40rem) and (max-width: 63.999rem)":
        "calc(1 / 2 * 100%)",
      [breakpoint.lg]: "calc(1 / 3 * 100%)",
    },
  }),
  text2: css({
    fontSize: fontSize["3xl"],
    lineHeight: lineHeight["3xl"],
    fontWeight: fontWeight.semibold,
  }),
  carouselContent: css({
    marginLeft: `calc(${spacing["1"]} * -1)`,
  }),
  carouselItem2: css({
    paddingLeft: spacing["1"],
    flexBasis: { base: "100%", [breakpoint.md]: "calc(1 / 2 * 100%)" },
  }),
  text3: css({
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.semibold,
  }),
}

export default function CarouselExample() {
  return (
    <ExampleWrapper sx={styles.exampleWrapper}>
      <CarouselBasic />
      <CarouselMultiple />
      <CarouselWithGap />
    </ExampleWrapper>
  )
}

function CarouselBasic() {
  return (
    <Example title="Basic">
      <Carousel sx={styles.carousel}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div sx={styles.box}>
                <Card>
                  <CardContent sx={styles.cardContent}>
                    <span sx={styles.text}>{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious sx={styles.carouselPrevious} />
        <CarouselNext sx={styles.carouselPrevious} />
      </Carousel>
    </Example>
  )
}

function CarouselMultiple() {
  return (
    <Example title="Multiple">
      <Carousel
        sx={styles.carousel}
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} sx={styles.carouselItem}>
              <div sx={styles.box}>
                <Card>
                  <CardContent sx={styles.cardContent}>
                    <span sx={styles.text2}>{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious sx={styles.carouselPrevious} />
        <CarouselNext sx={styles.carouselPrevious} />
      </Carousel>
    </Example>
  )
}

function CarouselWithGap() {
  return (
    <Example title="With Gap">
      <Carousel sx={styles.carousel}>
        <CarouselContent sx={styles.carouselContent}>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} sx={styles.carouselItem2}>
              <div sx={styles.box}>
                <Card>
                  <CardContent sx={styles.cardContent}>
                    <span sx={styles.text3}>{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious sx={styles.carouselPrevious} />
        <CarouselNext sx={styles.carouselPrevious} />
      </Carousel>
    </Example>
  )
}
