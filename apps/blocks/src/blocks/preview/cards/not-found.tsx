import { css } from "@kirana-style/core"
import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@workspace/ui/components/input-group"
import { Kbd } from "@workspace/ui/components/kbd"
import { Search01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@workspace/ui/primitives/icon"
import { spacing } from "@workspace/ui/tokens/spacing"

const styles = {
  empty: css({
    height: spacing["72"],
  }),
  inputGroup: css({
    width: "calc(3 / 4 * 100%)",
  }),
}

export function NotFound() {
  return (
    <Card>
      <CardContent>
        <Empty sx={styles.empty}>
          <EmptyHeader>
            <EmptyTitle>404 - Not Found</EmptyTitle>
            <EmptyDescription>
              The page you&apos;re looking for doesn&apos;t exist. Try searching
              for what you need below.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <InputGroup sx={styles.inputGroup}>
              <InputGroupInput placeholder="Try searching for pages..." />
              <InputGroupAddon>
                <Icon icon={Search01Icon} />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Kbd>/</Kbd>
              </InputGroupAddon>
            </InputGroup>
            <Button variant="link">Go to homepage</Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  )
}
