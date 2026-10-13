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
      <div className="flex flex-wrap gap-2">
        {DRAWER_SIDES.map((side) => (
          <Drawer key={side} swipeDirection={SWIPE_DIRECTION[side]}>
            <DrawerTrigger
              render={<Button variant="outline" className="capitalize" />}
            >
              {side}
            </DrawerTrigger>
            <DrawerContent className="data-[swipe-direction=down]:max-h-[50vh] data-[swipe-direction=up]:max-h-[50vh]">
              <DrawerHeader>
                <DrawerTitle>Move Goal</DrawerTitle>
                <DrawerDescription>
                  Set your daily activity goal.
                </DrawerDescription>
              </DrawerHeader>
              <div className="no-scrollbar overflow-y-auto px-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <p key={index} className="mb-4 leading-normal">
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
          <div className="no-scrollbar overflow-y-auto px-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <p key={index} className="mb-4 leading-normal">
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
