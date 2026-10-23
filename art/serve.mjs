import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const ART_DIR = path.dirname(fileURLToPath(import.meta.url))

export const REPOS = { tierly: 'Tierly', mixly: 'Mixly', swatchbox: 'Swatchbox' }

export const GPU_ARGS = [...(process.platform === 'win32' ? ['--use-angle=d3d11'] : []), '--enable-gpu', '--ignore-gpu-blocklist']

const types = { '.js': 'text/javascript', '.html': 'text/html' }

export const clayRoute = async (pathname) =>
  pathname.startsWith('/clay/')
    ? { contentType: types[path.extname(pathname)] ?? 'application/octet-stream', body: await readFile(path.join(ART_DIR, pathname.slice(6))) }
    : null

export const clayStart = (scene, app, options = {}) => `/clay/index.html?${new URLSearchParams({ scene, app, ...options })}`

export const ready = async (page) => {
  await page.waitForFunction(() => window.READY)
  await page.evaluate(() => window.READY)
}
