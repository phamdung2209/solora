import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const ORIGIN = 'https://demo-store.example'
export const CAPTURE_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
export const SITE_DIR = path.resolve(CAPTURE_DIR, '..', '..')
export const APPS_DIR = path.resolve(SITE_DIR, '..')

const read = (file) => readFileSync(file, 'utf8')

export const sceneFile = (name) => read(path.join(CAPTURE_DIR, 'scenes', name))

export const appFile = (repo, relative) => read(path.join(APPS_DIR, repo, relative))

export const fill = (template, vars) => template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? '')

export const money = (cents) => `$${(cents / 100).toFixed(2)}`

export const json = (value) => JSON.stringify(value).replace(/</g, '\\u003c')

export const escape = (value) =>
  String(value).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch])

export const storePage = ({ title, path: pagePath, main, head = '', scripts = '', cartCount = 0, bodyClass = '' }) =>
  fill(sceneFile('store.html'), {
    title: escape(title),
    path: pagePath,
    main,
    head,
    scripts,
    bodyClass,
    cartBadge: cartCount ? `<b>${cartCount}</b>` : '',
  })

export const html = (body) => ({ contentType: 'text/html; charset=utf-8', body })

export const img = (key, alt = '') => `<img src="/art/${key}.svg" alt="${escape(alt)}">`
