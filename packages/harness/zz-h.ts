import { chromium } from "playwright"
const browser = await chromium.launch({ channel: "chrome" })
const page = await browser.newPage({ viewport: { width: 646, height: 300 } })
for (const item of process.argv.slice(2)) {
  for (const base of ["base", "aria"]) {
    await page.goto(`http://127.0.0.1:8787/preview/react/${base}/${item}?preset=k0${item.endsWith("rtl") ? "&lang=ar" : ""}`, { waitUntil: "networkidle" })
    await page.waitForTimeout(400)
    const h = await page.evaluate(() => {
      const ex = [...document.querySelectorAll("div")].find((d) => getComputedStyle(d).justifyContent === "center" && getComputedStyle(d).paddingTop === "40px")
      return ex ? Math.round((ex.firstElementChild as HTMLElement).getBoundingClientRect().height + 80) : -1
    })
    console.log(item, base, h)
  }
}
await browser.close()
