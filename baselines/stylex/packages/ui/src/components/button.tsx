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
 */
function withLabels(children: React.ReactNode) {
  return React.Children.map(children, (child) =>
    typeof child === "string" || typeof child === "number" ? (
      <span data-slot="button-label" sx={buttonLabel}>
        {child}
      </span>
    ) : (
      child
    )
  )
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
