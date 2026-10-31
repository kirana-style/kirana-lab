import { chromium } from "playwright"
const [S, ...names] = process.argv.slice(2)
const browser = await chromium.launch({ channel: "chrome" })
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } })
const errors: string[] = []
page.on("pageerror", (e) => errors.push(e.message))
for (const n of names) for (const [side, url] of [["ours", `http://127.0.0.1:8787/preview/react/base/${n}?preset=b0`], ["up", `http://127.0.0.1:4000/preview/base/${n}?preset=b0`]]) {
  await page.goto(url, { waitUntil: "networkidle" })
  await page.waitForTimeout(800)
  await page.screenshot({ path: `${S}/ex/${n}-${side}.png`, fullPage: false })
}
console.log("errors", errors)
await browser.close()
