import { mkdir } from 'node:fs/promises'
import path from 'node:path'

import { chromium } from 'playwright'

import { renderIcon } from './lib/icon.mjs'
import { Recorder } from './lib/recorder.mjs'
import { SITE_DIR } from './lib/site.mjs'
import { openScene } from './lib/stage.mjs'
import { combinedListingsAdminScenes } from './scenes/admin-combined-listings.mjs'
import { mixlyAdminScenes } from './scenes/admin-mixly.mjs'
import { tierlyAdminScenes } from './scenes/admin-tierly.mjs'
import { combinedListingsScenes } from './scenes/combined-listings.mjs'
import { editorScenes } from './scenes/editor.mjs'
import { mixlyScenes } from './scenes/mixly.mjs'
import { tierlyScenes } from './scenes/tierly.mjs'

const scenes = [
  ...combinedListingsAdminScenes,
  ...combinedListingsScenes,
  ...mixlyAdminScenes,
  ...mixlyScenes,
  ...tierlyAdminScenes,
  ...tierlyScenes,
  ...editorScenes,
]

const filters = process.argv.slice(2)
const selected = scenes.filter(({ app, name }) => !filters.length || filters.some((filter) => `${app}/${name}`.includes(filter)))

if (!filters.length) await renderIcon()

const browser = await chromium.launch()
try {
  for (const scene of selected) {
    const { context, page, state } = await openScene(browser, scene)
    const rec = new Recorder(page)
    await scene.play(rec, page, state)
    if (!rec.posterPng && scene.poster === undefined) await rec.still()
    const dir = path.join(SITE_DIR, 'public', 'guides', scene.app)
    await mkdir(dir, { recursive: true })
    const result = await rec.encode(path.join(dir, `${scene.name}.webp`), {
      stillOut: path.join(dir, `${scene.name}-still.webp`),
      poster: scene.poster ?? 0,
    })
    console.log(`${scene.app}/${scene.name}`, result)
    await context.close()
  }
} finally {
  await browser.close()
}
