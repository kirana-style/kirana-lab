import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "@/components/example"
import { Button } from "@workspace/ui/components/button"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet"
import { spacing } from "@workspace/ui/tokens/spacing"
import { leading } from "@workspace/ui/tokens/typography"

const styles = {
  box: css({
    paddingInline: spacing["4"],
  }),
  row: css({
    display: "flex",
    flexWrap: "wrap",
    gap: spacing["2"],
  }),
  button: css({
    textTransform: "capitalize",
  }),
  sheetContent: css({
    maxHeight: {
      '[data-side="bottom"]': "50vh",
      '[data-side="top"]': "50vh",
    },
  }),
  box2: css({
    scrollbarWidth: "none",
    overflowY: "auto",
    paddingInline: spacing["4"],
  }),
  paragraph: css({
    marginBottom: spacing["4"],
    lineHeight: leading.normal,
  }),
}

export default function SheetExample() {
  return (
    <ExampleWrapper>
      <SheetWithForm />
      <SheetNoCloseButton />
      <SheetWithSides />
    </ExampleWrapper>
  )
}

function SheetWithForm() {
  return (
    <Example title="With Form">
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </SheetDescription>
          </SheetHeader>
          <div sx={styles.box}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="sheet-demo-name">Name</FieldLabel>
                <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
              </Field>
              <Field>
                <FieldLabel htmlFor="sheet-demo-username">Username</FieldLabel>
                <Input id="sheet-demo-username" defaultValue="@peduarte" />
              </Field>
            </FieldGroup>
          </div>
          <SheetFooter>
            <Button type="submit">Save changes</Button>
            <SheetClose render={<Button variant="outline" />}>Close</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </Example>
  )
}

function SheetNoCloseButton() {
  return (
    <Example title="No Close Button">
      <Sheet>
        <SheetTrigger render={<Button variant="outline" />}>
          No Close Button
        </SheetTrigger>
        <SheetContent showCloseButton={false}>
          <SheetHeader>
            <SheetTitle>No Close Button</SheetTitle>
            <SheetDescription>
              This sheet doesn&apos;t have a close button in the top-right
              corner. You can only close it using the button below.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </Example>
  )
}

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const

function SheetWithSides() {
  return (
    <Example title="Sides">
      <div sx={styles.row}>
        {SHEET_SIDES.map((side) => (
          <Sheet key={side}>
            <SheetTrigger
              render={<Button variant="outline" sx={styles.button} />}
            >
              {side}
            </SheetTrigger>
            <SheetContent side={side} sx={styles.sheetContent}>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </SheetDescription>
              </SheetHeader>
              <div sx={styles.box2}>
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
              <SheetFooter>
                <Button type="submit">Save changes</Button>
                <SheetClose render={<Button variant="outline" />}>
                  Cancel
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </Example>
  )
}
