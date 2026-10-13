import * as stylex from "@stylexjs/stylex"
import * as React from "react"

import { Card, CardContent } from "@workspace/ui/components/card"
import {
  Item,
  ItemActions,
  ItemGroup,
  ItemHeader,
  ItemSeparator,
  ItemTitle,
} from "@workspace/ui/components/item"
import { Kbd } from "@workspace/ui/components/kbd"
import { theme } from "@workspace/ui/theme/semantic.stylex"
import { spacing } from "@workspace/ui/tokens/spacing.stylex"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/ui/tokens/typography.stylex"

const styles = stylex.create({
  stack: {
    display: "flex",
    flexDirection: "column",
    gap: spacing["3"],
  },
  text: {
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  },
  itemGroup: {
    rowGap: spacing["2"],
    columnGap: spacing["2"],
    color: theme.mutedForeground,
  },
  item: {
    borderTopStyle: "solid",
    borderBottomStyle: "solid",
    borderInlineStartStyle: "solid",
    borderInlineEndStyle: "solid",
    borderTopWidth: "0px",
    borderBottomWidth: "0px",
    borderInlineStartWidth: "0px",
    borderInlineEndWidth: "0px",
    paddingInlineStart: "0px",
    paddingInlineEnd: "0px",
    paddingTop: "0px",
    paddingBottom: "0px",
    borderTopColor: theme.border,
    borderBottomColor: theme.border,
    borderInlineStartColor: theme.border,
    borderInlineEndColor: theme.border,
  },
  itemTitle: {
    fontWeight: fontWeight.normal,
  },
  row: {
    display: "flex",
    gap: spacing["1"],
  },
})

const shortcuts = [
  { label: "Search", keys: ["⌘", "K"] },
  { label: "Quick Actions", keys: ["⌘", "J"] },
  { label: "New File", keys: ["⌘", "N"] },
  { label: "Save", keys: ["⌘", "S"] },
  { label: "Toggle Sidebar", keys: ["⌘", "B"] },
] as const

export function Shortcuts() {
  return (
    <Card>
      <CardContent>
        <div sx={styles.stack}>
          <div sx={styles.text}>Shortcuts</div>
          <ItemGroup sx={styles.itemGroup} data-size="xs">
            {shortcuts.map(({ label, keys }, i) => (
              <React.Fragment key={label}>
                {i > 0 && <ItemSeparator />}
                <Item variant="default" size="xs" sx={styles.item}>
                  <ItemHeader>
                    <ItemTitle sx={styles.itemTitle}>{label}</ItemTitle>
                    <ItemActions>
                      <div sx={styles.row}>
                        {keys.map((key) => (
                          <Kbd key={key}>{key}</Kbd>
                        ))}
                      </div>
                    </ItemActions>
                  </ItemHeader>
                </Item>
              </React.Fragment>
            ))}
          </ItemGroup>
        </div>
      </CardContent>
    </Card>
  )
}
