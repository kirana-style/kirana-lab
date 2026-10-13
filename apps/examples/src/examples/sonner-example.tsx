import { css } from "@kirana-style/core"
import { toast } from "@/lib/toast"

import { Example, ExampleWrapper } from "@/components/example"
import { Button } from "@workspace/ui/components/button"

const styles = {
  example: css({
    alignItems: "center",
    justifyContent: "center",
  }),
  button: css({
    width: "fit-content",
  }),
}

export default function SonnerExample() {
  return (
    <ExampleWrapper>
      <SonnerBasic />
      <SonnerWithDescription />
    </ExampleWrapper>
  )
}

function SonnerBasic() {
  return (
    <Example title="Basic" sx={styles.example}>
      <Button
        onClick={() => toast("Event has been created")}
        variant="outline"
        sx={styles.button}
      >
        Show Toast
      </Button>
    </Example>
  )
}

function SonnerWithDescription() {
  return (
    <Example title="With Description" sx={styles.example}>
      <Button
        onClick={() =>
          toast("Event has been created", {
            description: "Monday, January 3rd at 6:00pm",
          })
        }
        variant="outline"
        sx={styles.button}
      >
        Show Toast
      </Button>
    </Example>
  )
}
