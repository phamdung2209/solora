import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { art } from './art.mjs'
import { APPS_DIR, CAPTURE_DIR, ORIGIN, SITE_DIR } from './site.mjs'

const assets = {
  '/assets/solora-cl.js': ['Swatchbox', 'extensions/theme-app-extension/assets/solora-cl.js'],
  '/assets/solora-cl.css': ['Swatchbox', 'extensions/theme-app-extension/assets/solora-cl.css'],
  '/assets/mixly-storefront.js': ['Mixly', 'extensions/theme-app-extension/assets/mixly-storefront.js'],
  '/assets/mixly-blocks.css': ['Mixly', 'extensions/theme-app-extension/assets/mixly-blocks.css'],
}

const types = { '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.html': 'text/html' }

const typeOf = (file) => types[path.extname(file)] ?? 'application/octet-stream'

const serveCommon = async (pathname) => {
  if (assets[pathname]) {
    const [repo, file] = assets[pathname]
    return { contentType: typeOf(file), body: await readFile(path.join(APPS_DIR, repo, file)) }
  }
  if (pathname.startsWith('/scene/'))
    return { contentType: typeOf(pathname), body: await readFile(path.join(CAPTURE_DIR, 'scenes', pathname.slice(7))) }
  if (pathname.startsWith('/public/'))
    return { contentType: typeOf(pathname), body: await readFile(path.join(SITE_DIR, pathname)) }
  const artMatch = pathname.match(/^\/art\/([\w-]+)\.svg$/)
  const svg = artMatch && art(artMatch[1])
  return svg ? { contentType: 'image/svg+xml', body: svg } : null
}

export const openScene = async (browser, scene) => {
  const context = await browser.newContext({
    viewport: scene.viewport ?? { width: 600, height: 375 },
    deviceScaleFactor: scene.scale ?? 2,
    reducedMotion: 'no-preference',
    colorScheme: 'light',
    locale: 'en-US',
    timezoneId: 'UTC',
  })
  const state = scene.state?.() ?? {}
  await context.route(`${ORIGIN}/**`, async (route) => {
    const request = route.request()
    const { pathname, search } = new URL(request.url())
    const response = (await serveCommon(pathname)) ?? (await scene.route(pathname, { state, request, search }))
    if (!response) return route.fulfill({ status: 404, body: 'Not found' })
    if (response.delay) await new Promise((resolve) => setTimeout(resolve, response.delay))
    await route.fulfill({ status: response.status ?? 200, contentType: response.contentType, body: response.body })
  })
  const page = await context.newPage()
  page.on('pageerror', (error) => console.error(`[${scene.app}/${scene.name}]`, error.message))
  await page.goto(`${ORIGIN}${scene.start}`)
  await page.waitForLoadState('load')
  await page.waitForTimeout(250)
  return { context, page, state }
}
