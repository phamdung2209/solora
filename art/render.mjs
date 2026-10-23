import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

import { chromium } from 'playwright'
import sharp from 'sharp'

import { APPS_DIR } from '../scripts/capture/lib/site.mjs'
import { openScene } from '../scripts/capture/lib/stage.mjs'
import { clayRoute, clayStart, GPU_ARGS, ready, REPOS } from './serve.mjs'

export const STILLS = [
  { name: 'settings-hero', size: [560, 420] },
  { name: 'health-hero', size: [560, 420] },
  { name: 'partners-hero', size: [560, 420] },
  { name: 'feature-step-post', size: [160, 160] },
  { name: 'feature-step-vote', size: [160, 160] },
  { name: 'feature-step-ship', size: [160, 160] },
  { name: 'feature-empty', size: [400, 300] },
]

const SUPERSAMPLE = 4

const args = process.argv.slice(2)
const option = (key) => args.find((a) => a.startsWith(`--${key}=`))?.split('=')[1]
const filters = args.filter((a) => !a.startsWith('--'))
const probe = option('probe')
const passes = option('passes')

const jobs = option('scene')
  ? [{ app: option('app') ?? 'tierly', name: option('scene'), size: option('size')?.split('x').map(Number) ?? [560, 420] }]
  : Object.keys(REPOS).flatMap((app) => STILLS.map((still) => ({ app, ...still }))).filter(({ app, name }) => !filters.length || filters.some((f) => `${app}/${name}`.includes(f)))

const browser = await chromium.launch({ args: GPU_ARGS })
try {
  for (const { app, name, size } of jobs) {
    const [w, h] = size
    const started = Date.now()
    const { context, page } = await openScene(browser, {
      app,
      name,
      viewport: { width: w, height: h },
      scale: SUPERSAMPLE,
      start: clayStart(name, app, passes ? { passes } : {}),
      route: clayRoute,
    })
    page.on('console', (msg) => msg.type() === 'error' && console.error(`[${app}/${name}]`, msg.text()))
    await ready(page)
    await page.evaluate(() => window.render(window.REST))
    const png = await page.screenshot({ type: 'png', omitBackground: true })
    const image = sharp(png).resize(w * 2, h * 2, { kernel: 'lanczos3' })
    const out = probe ? path.join(probe, `${app}-${name}.png`) : path.join(APPS_DIR, REPOS[app], 'public', 'art', `${name}.webp`)
    await mkdir(path.dirname(out), { recursive: true })
    const body = probe ? await image.png().toBuffer() : await image.webp({ lossless: true, effort: 6 }).toBuffer()
    await writeFile(out, body)
    console.log(`${app}/${name}`, `${w * 2}x${h * 2}`, body.length, `${((Date.now() - started) / 1000).toFixed(1)}s`)
    await context.close()
  }
} finally {
  await browser.close()
}
