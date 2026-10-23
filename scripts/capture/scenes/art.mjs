import path from 'node:path'

import { clayRoute, clayStart, GPU_ARGS, ready, REPOS } from '../../../art/serve.mjs'
import { APPS_DIR } from '../lib/site.mjs'

const animation = (app, name, maxBytes) => ({
  app: 'art',
  name: `${app}-${name}`,
  file: name,
  dir: path.join(APPS_DIR, REPOS[app], 'public', 'art'),
  launch: { args: GPU_ARGS },
  viewport: { width: 960, height: 600 },
  scale: 2,
  start: clayStart(name, app, { passes: 112, shutter: 25, dither: 0, backdrop: 1 }),
  route: clayRoute,
  encode: { maxBytes, quality: 92, stillWidth: 960, stillLossless: true },
  async play(rec, page) {
    await ready(page)
    for (const { t, d } of await page.evaluate(() => window.plan())) {
      await page.evaluate((value) => window.render(value), t)
      await rec.snap(d)
    }
    await page.evaluate(() => window.renderStill(window.REST))
    await rec.still()
  },
})

export const artScenes = Object.keys(REPOS).flatMap((app) => [animation(app, 'health-clear', 1_500_000), animation(app, 'feature-hero', 2_000_000)])
