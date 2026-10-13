import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "@/components/example"
import { Button } from "@workspace/ui/components/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import { spacing } from "@workspace/ui/tokens/spacing"
import { leading } from "@workspace/ui/tokens/typography"

const styles = {
  row: css({
    display: "flex",
    flexWrap: "wrap",
    gap: spacing["2"],
  }),
  button: css({
    textTransform: "capitalize",
  }),
  drawerContent: css({
    maxHeight: {
      '[data-swipe-direction="down"]': "50vh",
      '[data-swipe-direction="up"]': "50vh",
    },
  }),
  box: css({
    scrollbarWidth: "none",
    overflowY: "auto",
    paddingInline: spacing["4"],
  }),
  paragraph: css({
    marginBottom: spacing["4"],
    lineHeight: leading.normal,
  }),
}

export default function DrawerExample() {
  return (
    <ExampleWrapper>
      <DrawerScrollableContent />
      <DrawerWithSides />
    </ExampleWrapper>
  )
}

const DRAWER_SIDES = ["top", "right", "bottom", "left"] as const

/**
 * The registry's drawer is built on vaul, which names the edge a drawer is
 * attached to. This repo's is Base UI's, which names the direction you swipe to
 * dismiss it — the same thing from the other end.
 */
const SWIPE_DIRECTION = {
  top: "up",
  right: "right",
  bottom: "down",
  left: "left",
} as const

function DrawerWithSides() {
  return (
    <Example title="Sides">
      <div sx={styles.row}>
        {DRAWER_SIDES.map((side) => (
          <Drawer key={side} swipeDirection={SWIPE_DIRECTION[side]}>
            <DrawerTrigger
              render={<Button variant="outline" sx={styles.button} />}
            >
              {side}
            </DrawerTrigger>
            <DrawerContent sx={styles.drawerContent}>
              <DrawerHeader>
                <DrawerTitle>Move Goal</DrawerTitle>
                <DrawerDescription>
                  Set your daily activity goal.
                </DrawerDescription>
              </DrawerHeader>
              <div sx={styles.box}>
                {Array.from({ length: 10 }).map((_, index) => (
                  <p key={index} sx={styles.paragraph}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                ))}
              </div>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose render={<Button variant="outline" />}>
                  Cancel
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </Example>
  )
}

function DrawerScrollableContent() {
  return (
    <Example title="Scrollable Content">
      <Drawer swipeDirection="right">
        <DrawerTrigger render={<Button variant="outline" />}>
          Scrollable Content
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div sx={styles.box}>
            {Array.from({ length: 10 }).map((_, index) => (
              <p key={index} sx={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            ))}
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose render={<Button variant="outline" />}>
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Example>
  )
}
