import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:3000";
const out = process.argv[3] || "/tmp/anim-check.png";
const wait = parseInt(process.argv[4] || "2000", 10);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(wait);

// Try to capture just the phone element; fall back to hero section
const el = await page.$(".hero-anim .phone") || await page.$(".hero-anim") || await page.$("section");
if (el) {
  await el.screenshot({ path: out });
} else {
  await page.screenshot({ path: out, fullPage: false });
}

await browser.close();
console.log("Saved", out);
