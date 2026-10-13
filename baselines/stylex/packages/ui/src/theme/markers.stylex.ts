/**
 * Layer 3: contextual markers.
 *
 * Each is the StyleX equivalent of one Tailwind named group — the
 * `group/button` class you put on a parent so descendants can react to its
 * state. Spread a marker onto the ancestor:
 *
 *   <div data-state="open" {...stylex.props(cardMarker, styles.root)}>
 *
 * and read it from any descendant, sibling or container:
 *
 *   opacity: {
 *     default: 0.5,
 *     [stylex.when.ancestor('[data-state="open"]', cardMarker)]: 1,
 *   }
 *
 * The mapping from Tailwind: `when.ancestor` covers `group-*` and `in-*`,
 * `when.siblingBefore` covers `peer-*`, and `group-has-*` is
 * `when.ancestor(":has(…)", marker)`. Plain `has-*` needs no marker: write a
 * `":has(…)"` key on the element itself. The marker scopes the relationship, so
 * unrelated components never collide — the job the `/name` suffix did.
 *
 * A marker always sits on the element its selector describes. For
 * `when.descendant` and the sibling queries that is the descendant or sibling,
 * never the element being styled. `bun run check:stylex` enforces it.
 *
 * Import these by name. StyleX resolves cross-file constants through named
 * import specifiers, so a namespace import (`import * as markers`) fails to
 * compile with "Referenced constant is not defined".
 *
 * Markers must live in a `.stylex.ts` file, like any variable definition, and
 * such a file may export nothing else.
 */

import * as stylex from "@stylexjs/stylex"

export const accordionItemMarker = stylex.defineMarker()
export const alertDialogContentMarker = stylex.defineMarker()
export const alertMarker = stylex.defineMarker()
export const avatarGroupMarker = stylex.defineMarker()
export const avatarMarker = stylex.defineMarker()
export const bubbleMarker = stylex.defineMarker()
export const buttonGroupMarker = stylex.defineMarker()
export const calendarDayMarker = stylex.defineMarker()
export const cardMarker = stylex.defineMarker()
export const comboboxContentMarker = stylex.defineMarker()
export const commandItemMarker = stylex.defineMarker()
export const commandShortcutMarker = stylex.defineMarker()
export const dialogContentMarker = stylex.defineMarker()
export const drawerPopupMarker = stylex.defineMarker()
export const dropdownMenuContentMarker = stylex.defineMarker()
export const fieldLabelMarker = stylex.defineMarker()
export const fieldMarker = stylex.defineMarker()
export const inputGroupMarker = stylex.defineMarker()
export const itemMarker = stylex.defineMarker()
export const markerRowMarker = stylex.defineMarker()
export const menuActionMarker = stylex.defineMarker()
export const menuButtonMarker = stylex.defineMarker()
export const menuItemMarker = stylex.defineMarker()
export const messageMarker = stylex.defineMarker()
export const navigationMenuItemMarker = stylex.defineMarker()
export const popoverContentMarker = stylex.defineMarker()
export const questionnaireOptionMarker = stylex.defineMarker()
export const sidebarMarker = stylex.defineMarker()
export const switchMarker = stylex.defineMarker()
export const tabsListMarker = stylex.defineMarker()
export const tabsMarker = stylex.defineMarker()
export const tooltipContentMarker = stylex.defineMarker()
