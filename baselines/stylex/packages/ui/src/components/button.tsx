import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import { Button as ButtonPrimitive } from "@base-ui/react/button"

import type { Sx } from "../lib/sx"
import type { VariantProps } from "../recipes/recipe"
import { button, buttonLabel, buttonRing } from "../recipes/button"
import { groupedItem } from "../recipes/button-group"

type ButtonProps = Omit<ButtonPrimitive.Props, "className"> &
  VariantProps<typeof button> & { sx?: Sx }

/**
 * Wraps each run of text in a label element so it can be trimmed to cap height.
 * Icons and other elements pass through untouched and stay flex items.
 * Adjacent strings are one run (`Default{" "}`), and white space alone stays bare
 * text, which the flex container drops: a label of its own would add a gap.
 */
function withLabels(children: React.ReactNode) {
  const items: React.ReactNode[] = []
  let text = ""
  const flush = () => {
    if (text.trim())
      items.push(
        <span key={`label-${items.length}`} data-slot="button-label" sx={buttonLabel}>
          {text}
        </span>
      )
    else if (text) items.push(text)
    text = ""
  }
  for (const child of React.Children.toArray(children)) {
    if (typeof child === "string" || typeof child === "number") text += child
    else {
      flush()
      items.push(child)
    }
  }
  flush()
  return items
}

function Button({ sx, variant, size, children, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      {...props}
      {...stylex.props(
        // The marker is what lets descendants and `:has()` queries observe this
        // button — it replaces the `group/button` class.
        buttonRing,
        ...button({ variant, size }),
        // Joins up when this button sits inside a ButtonGroup.
        groupedItem,
        sx
      )}
    >
      {typeof children === "function" ? children : withLabels(children)}
    </ButtonPrimitive>
  )
}

export { Button, button as buttonVariants }
export type { ButtonProps }
