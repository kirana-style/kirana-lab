/**
 * Stands in for the shadcn site's design-system switcher. These apps render one
 * fixed configuration — the nova style, Inter body, Oxanium headings, Hugeicons
 * — which is the one this repo's components implement.
 */
export const FONTS = [
  { value: "inter", name: "Inter" },
  { value: "oxanium", name: "Oxanium" },
]

export const STYLES = [{ name: "nova", title: "Nova" }]

const PARAMS = {
  style: "nova",
  font: "inter",
  fontHeading: "oxanium",
  iconLibrary: "hugeicons",
}

export function useDesignSystemSearchParams() {
  return [PARAMS] as const
}
