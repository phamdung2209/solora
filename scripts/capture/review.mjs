import { mkdir, readFile, rm } from 'node:fs/promises'
import path from 'node:path'

import { chromium } from 'playwright'

import { CAPTURE_DIR, SITE_DIR } from './lib/site.mjs'

const ORIGIN = 'https://solora.test'
const OUT_DIR = path.join(SITE_DIR, 'out')
const REVIEW_DIR = path.join(CAPTURE_DIR, '.review')
const pages = ['/combined-listings/', '/combined-listings/docs/', '/mixly/', '/mixly/docs/', '/tierly/', '/tierly/docs/', '/']

const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.txt': 'text/plain' }

const serve = async (route) => {
  const { pathname } = new URL(route.request().url())
  const file = path.join(OUT_DIR, decodeURIComponent(pathname.endsWith('/') ? `${pathname}index.html` : pathname))
  try {
    await route.fulfill({ contentType: types[path.extname(file)] ?? 'application/octet-stream', body: await readFile(file) })
  } catch {
    await route.fulfill({ status: 404, body: '' })
  }
}

const slug = (page) => page.replace(/\//g, '-').replace(/^-|-$/g, '') || 'home'

await rm(REVIEW_DIR, { recursive: true, force: true })
await mkdir(REVIEW_DIR, { recursive: true })
const browser = await chromium.launch()
const report = []
try {
  for (const [scheme, reducedMotion] of [['light', 'no-preference'], ['dark', 'no-preference'], ['light', 'reduce']]) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: scheme, reducedMotion })
    await context.route(`${ORIGIN}/**`, serve)
    const page = await context.newPage()
    for (const url of pages) {
      await page.goto(`${ORIGIN}${url}`)
      const figures = page.locator('figure')
      const count = await figures.count()
      for (let index = 0; index < count; index++) {
        const figure = figures.nth(index)
        await figure.scrollIntoViewIfNeeded()
        await figure.locator('img').evaluate((img) => (img.complete ? null : new Promise((resolve) => img.addEventListener('load', resolve, { once: true }))))
        const current = await figure.locator('img').evaluate((img) => ({ src: img.currentSrc, width: img.naturalWidth, loading: img.loading }))
        report.push({ url, index, scheme, reducedMotion, ...current })
        const tag = reducedMotion === 'reduce' ? 'still' : scheme
        await figure.screenshot({ path: path.join(REVIEW_DIR, `${slug(url)}-${index}-${tag}.png`) })
      }
      if (reducedMotion === 'no-preference') await page.screenshot({ path: path.join(REVIEW_DIR, `${slug(url)}-top-${scheme}.png`) })
    }
    await context.close()
  }
} finally {
  await browser.close()
}
for (const row of report) console.log(`${row.scheme}/${row.reducedMotion} ${row.url}#${row.index} ${row.loading} ${row.width}px ${row.src.replace(ORIGIN, '')}`)
