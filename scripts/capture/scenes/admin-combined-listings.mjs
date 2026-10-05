import { colors } from '../lib/art.mjs'
import { adminPage, button, card, checkbox, dot, field, icons, modal, pageHead, select, thumb } from '../lib/kit.mjs'
import { html } from '../lib/site.mjs'

const APP = 'combined-listings'

const tees = ['red', 'blue', 'black', 'sand']
const label = (value) => value[0].toUpperCase() + value.slice(1)
const hex = (value) => colors[value].toUpperCase()

const pickerRows = [
  ...tees.map((value) => ({ art: `tee-${value}`, title: `Classic Tee - ${label(value)}`, meta: '4 variants', value })),
  { art: 'hoodie-sage', title: 'Everyday Hoodie - Sage', meta: '4 variants' },
]

const emptyState = `<div class="k-empty" data-empty>
  <div class="cl-stack">${thumb('tee-red', { size: 44 })}${thumb('tee-blue', { size: 44 })}${thumb('tee-black', { size: 44 })}</div>
  <h2>Group products into one listing</h2>
  <p>Shoppers switch between colors and styles that are separate products, right on the product page.</p>
  ${button('Create group', { variant: 'primary', attrs: 'data-create' })}
</div>`

const groupsTable = `<table class="k-table" data-table hidden>
  <thead><tr><th>Group</th><th>Swatches</th><th class="k-num">Products</th><th>Status</th></tr></thead>
  <tbody><tr class="is-new"><td><span class="k-row">${thumb('tee-red', { size: 28 })}<b>Classic Tee</b></span></td><td><span class="k-dots">${tees.map((value) => dot(colors[value])).join('')}</span></td><td class="k-num">4</td><td><span class="k-badge is-success is-pop">Synced</span></td></tr></tbody>
</table>`

const groupModal = modal({
  id: 'group-modal',
  title: 'Create group',
  width: 452,
  body: `<div class="k-stack cl-form">
  <div class="cl-two">${field({ label: 'Title', placeholder: 'e.g. Classic Tee', attrs: 'data-title' })}${field({ label: 'Option name', value: 'Color' })}</div>
  <div class="k-row"><b class="k-grow">Members</b>${button('Add products', { icon: 'plus', attrs: 'data-add-products' })}</div>
  <div class="cl-members" data-members><div class="cl-none">No products yet</div></div>
</div>`,
  footer: `<span class="k-grow"></span>${button('Cancel')}${button('Save', { variant: 'primary', attrs: 'data-save' })}`,
})

const picker = modal({
  id: 'picker',
  title: 'Add products',
  width: 400,
  flush: true,
  body: `<div class="cl-search">${field({ placeholder: 'Search products', icon: 'search' })}</div>
${pickerRows.map((row, index) => `<div class="k-list-item cl-pick" data-pick="${row.value ?? ''}" data-index="${index}">${checkbox()}${thumb(row.art, { size: 30 })}<span class="k-grow">${row.title}<small class="k-muted k-small cl-meta">${row.meta}</small></span></div>`).join('')}`,
  footer: `<span class="k-grow" data-count>0/250 products selected</span>${button('Cancel')}${button('Add', { variant: 'primary', attrs: 'data-picker-add', disabled: true })}`,
})

const member = (value) => `<div class="cl-member">
  ${thumb(`tee-${value}`, { size: 30 })}
  <span class="k-grow cl-name">Classic Tee - ${label(value)}</span>
  <span class="k-input cl-value">${label(value)}</span>
  <span class="k-input cl-hex">${dot('transparent', `data-dot="${value}"`)}<input placeholder="#" data-hex="${value}"></span>
</div>`

const head = `<style>
.cl-stack { display: flex; margin-bottom: 4px; }
.cl-stack .k-thumb { border-radius: 12px; box-shadow: 0 0 0 3px #fff, 0 4px 10px -4px rgba(0,0,0,.3); }
.cl-stack .k-thumb + .k-thumb { margin-left: -12px; }
.cl-stack .k-thumb:nth-child(2) { transform: translateY(-6px); z-index: 1; }
.cl-two { display: grid; grid-template-columns: 1.4fr 1fr; gap: 10px; }
.cl-form { gap: 10px; }
.cl-members { display: grid; gap: 6px; min-height: 40px; }
.cl-none { display: grid; place-items: center; height: 40px; border-radius: 10px; border: 1px dashed #d4d4d4; color: var(--k-faint); font-size: 12px; }
.cl-member { display: flex; align-items: center; gap: 8px; }
.cl-name { font-size: 12px; font-weight: 550; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cl-value { width: 64px; height: 30px; font-size: 12px; }
.cl-hex { width: 104px; height: 30px; gap: 7px; padding-left: 7px; font-size: 12px; font-variant-numeric: tabular-nums; }
.cl-hex .k-dot { width: 18px; height: 18px; transition: background .25s ease, transform .3s cubic-bezier(.3,1.6,.5,1); background: repeating-conic-gradient(#e3e3e3 0 25%, #fff 0 50%) 0 0 / 8px 8px; }
.cl-hex .k-dot.is-set { background: var(--c); transform: scale(1.12); }
.k-modal-body { padding: 12px 16px; }
.k-overlay { padding: 12px; }
.cl-search { padding: 10px 14px; border-bottom: 1px solid var(--k-border); }
.cl-pick { cursor: pointer; padding-top: 7px; padding-bottom: 7px; }
.cl-meta { display: block; line-height: 14px; }
</style>`

const scripts = `<script>
var checked = new Set()
var addBtn = document.querySelector('[data-picker-add]')
document.querySelectorAll('[data-create]').forEach(function (node) {
  node.addEventListener('click', function () { stage.open('#group-modal') })
})
document.querySelector('[data-add-products]').addEventListener('click', function () { stage.open('#picker') })
document.querySelectorAll('[data-pick]').forEach(function (row) {
  row.addEventListener('click', function () {
    if (!row.dataset.pick) return
    row.classList.toggle('is-checked')
    row.querySelector('.k-choice').classList.toggle('is-checked')
    if (checked.has(row.dataset.pick)) checked.delete(row.dataset.pick)
    else checked.add(row.dataset.pick)
    document.querySelector('[data-count]').textContent = checked.size + '/250 products selected'
    addBtn.disabled = !checked.size
  })
})
addBtn.addEventListener('click', function () {
  stage.close('#picker')
  document.querySelector('[data-members]').innerHTML = ${JSON.stringify(tees.map(member).join(''))}
  document.querySelectorAll('[data-hex]').forEach(function (input) {
    input.addEventListener('input', function () {
      var ok = /^#[0-9a-f]{6}$/i.test(input.value)
      var swatch = document.querySelector('[data-dot="' + input.dataset.hex + '"]')
      swatch.classList.toggle('is-set', ok)
      if (ok) swatch.style.setProperty('--c', input.value)
    })
  })
})
document.querySelector('[data-save]').addEventListener('click', function (event) {
  var save = event.currentTarget
  save.classList.add('is-busy')
  setTimeout(function () {
    stage.close('#group-modal')
    document.querySelector('[data-empty]').hidden = true
    document.querySelector('[data-table]').hidden = false
    document.querySelector('[data-head-create]').hidden = false
    stage.toast('Group saved')
  }, 650)
})
</script>`

const groupsPage = () =>
  adminPage({
    app: APP,
    title: 'Groups',
    head,
    body: `${pageHead({ title: 'Groups', actions: `${button('Import CSV')}${button('Create group', { variant: 'primary', attrs: 'data-create data-head-create hidden' })}` })}
${card(`${emptyState}${groupsTable}`, { flush: true })}`,
    overlays: `${groupModal}${picker}`,
    scripts,
  })

const route = (pathname) => (pathname === '/admin/groups' ? html(groupsPage()) : null)

const shapes = [['circle', 'Circle'], ['square', 'Square'], ['rounded', 'Rounded']]
const stockStyles = [['none', 'No change'], ['dim', 'Dim'], ['strike', 'Strike through'], ['hide', 'Hide']]

const sectionIcons = {
  brush: '<svg viewBox="0 0 16 16"><path d="M10.9 2.3a1.6 1.6 0 0 1 2.3 2.3L8.7 9.1 7.1 7.5Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M6.4 8.3c-1.6 0-2.8 1-2.8 2.5 0 .9-.4 1.4-1 1.7 2.7.8 6.2-.4 6.2-3Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>',
  eye: '<svg viewBox="0 0 16 16"><path d="M1.6 8S3.8 3.6 8 3.6 14.4 8 14.4 8 12.2 12.4 8 12.4 1.6 8 1.6 8Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>',
}

const sectionTitle = (icon, title) => `<h2 class="k-section-title ds-title">${sectionIcons[icon]}${title}</h2>`

const designTabs = ['Swatches', 'Variant images', 'Card per variant']

const previewSwatches = [
  { color: colors.red, handle: 'classic-tee-red', current: true },
  { color: colors.blue, handle: 'classic-tee-blue' },
  { color: colors.sand, handle: 'classic-tee-sand', oos: true },
]

const previewSwatch = ({ color, handle, current, oos }) =>
  `<a class="solora-cl__swatch${current ? ' solora-cl__swatch--current' : ''}${oos ? ' solora-cl__swatch--oos' : ''}" data-handle="${handle}" style="width:32px;height:32px;border-radius:50%;background-color:${color}"></a>`

const designBody = `${pageHead({ title: 'Design' })}
<div class="ds-tabs">${designTabs.map((name, index) => `<span${index ? '' : ' class="is-on"'}>${name}</span>`).join('')}</div>
<div class="k-cols ds-cols" data-cols>
  ${card(
    `${sectionTitle('brush', 'Swatch style')}
<div class="k-stack ds-form">
  <div class="k-stack ds-group" data-group>
    ${select({ label: 'Swatch shape', value: 'Circle', attrs: 'data-select="shape"' })}
    <div class="k-field">
      <span class="k-label" data-size-label>Swatch size (32px)</span>
      <div class="k-range ds-range" data-range style="--v:20%"><i></i><b></b><u data-thumb></u></div>
    </div>
  </div>
  <div class="k-field" data-stock-field>${select({ label: 'Out of stock', value: 'Dim', attrs: 'data-select="stock"' })}</div>
</div>`,
    { attrs: 'data-form' },
  )}
  ${card(
    `${sectionTitle('eye', 'Live preview')}
<div class="ds-frame">
  <div class="ds-bar"><i></i><i></i><i></i><span>demo-store.example</span></div>
  <div class="ds-store">
    <div class="ds-name">Classic Tee - Red</div>
    <div class="ds-price">$24.00</div>
    <div class="solora-cl solora-cl--oos-dim" data-swatches>${previewSwatches.map(previewSwatch).join('')}</div>
    <span class="ds-cart">Add to cart</span>
  </div>
</div>`,
    { attrs: 'data-preview' },
  )}
</div>`

const designOverlays = `<div class="ds-savebar" data-savebar hidden><span class="k-grow">Unsaved changes</span>${button('Discard', { variant: 'dark' })}${button('Save', { variant: 'light', attrs: 'data-save' })}</div>
<div class="k-menu ds-menu" data-menu></div>`

const designHead = `<link rel="stylesheet" href="/assets/solora-cl.css">
<style>
.k-page { max-width: 444px; padding-top: 8px; }
.k-page-head { min-height: 24px; margin-bottom: 4px; }
.ds-tabs { display: flex; gap: 2px; margin-bottom: 8px; border-bottom: 1px solid var(--k-border); }
.ds-tabs span { padding: 0 10px; height: 28px; line-height: 27px; border-bottom: 2px solid transparent; color: var(--k-muted); font-size: 12px; font-weight: 550; }
.ds-tabs span.is-on { border-bottom-color: #303030; color: var(--k-text); }
.ds-cols { grid-template-columns: 236px 196px; }
.ds-cols .k-card-body { padding: 12px; }
.ds-title { margin-bottom: 8px; font-size: 13px; line-height: 20px; }
.ds-title svg { width: 14px; height: 14px; color: var(--k-muted); }
.ds-form { gap: 12px; }
.ds-group { gap: 8px; }
.ds-form .k-input { height: 30px; }
.ds-form .k-select { cursor: pointer; }
.ds-range { margin-top: 3px; cursor: pointer; }
.ds-range.is-drag u { box-shadow: 0 0 0 1px rgba(0, 0, 0, .2), 0 1px 3px rgba(0, 0, 0, .25), 0 0 0 5px rgba(0, 91, 211, .2); }
.ds-frame { border-radius: 10px; overflow: hidden; box-shadow: 0 0 0 1px var(--k-border); }
.ds-bar { display: flex; align-items: center; gap: 4px; height: 22px; padding: 0 8px; background: var(--k-surface-2); border-bottom: 1px solid var(--k-border); }
.ds-bar i { width: 6px; height: 6px; border-radius: 50%; background: #ff5f57; }
.ds-bar i:nth-child(2) { background: #febc2e; }
.ds-bar i:nth-child(3) { background: #28c840; }
.ds-bar span { flex: 1; margin-left: 4px; height: 14px; border-radius: 999px; background: #fff; box-shadow: inset 0 0 0 1px var(--k-border); color: var(--k-muted); font-size: 8.5px; line-height: 14px; text-align: center; }
.ds-store { padding: 10px; background: #fff; color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
.ds-name { font-size: 13px; line-height: 18px; font-weight: 700; letter-spacing: -.01em; }
.ds-price { font-size: 11px; line-height: 16px; color: #6b7280; }
.ds-store .solora-cl { margin: 8px 0; }
.ds-store .solora-cl__swatch { transition: border-radius .28s ease, opacity .28s ease; }
.ds-cart { display: inline-block; padding: 4px 12px; border: 1px solid #c9cccf; border-radius: 999px; font-size: 10px; font-weight: 600; }
.ds-savebar { position: absolute; inset: 0 0 auto; z-index: 60; display: flex; align-items: center; gap: 8px; height: 34px; padding: 0 10px 0 14px; background: #1a1a1a; color: #fff; font-size: 12.5px; font-weight: 600; }
.ds-savebar .k-btn { height: 24px; padding: 0 11px; }
.k-btn.is-dark { background: #303030; color: #fff; box-shadow: inset 0 0 0 1px #4a4a4a; }
.k-btn.is-light { background: #fff; color: #1a1a1a; box-shadow: none; }
.ds-menu { z-index: 2147482500; min-width: 0; transition: none; }
.ds-menu button { justify-content: space-between; }
.ds-menu button svg { color: var(--k-text); }
</style>`

const designScripts = `<script>
const options = { shape: ${JSON.stringify(shapes)}, stock: ${JSON.stringify(stockStyles)} }
const radius = { circle: '50%', square: '0px', rounded: '4px' }
const form = { shape: 'circle', size: 32, stock: 'dim' }
const baseline = JSON.stringify(form)
const swatches = document.querySelectorAll('[data-swatches] .solora-cl__swatch')
const strip = document.querySelector('[data-swatches]')
const menu = document.querySelector('[data-menu]')
const range = document.querySelector('[data-range]')
const bar = document.querySelector('[data-savebar]')
const canvas = document.getElementById('stage')
const check = ${JSON.stringify(icons.check)}
const labelOf = (key, value) => options[key].find((option) => option[0] === value)[1]

const render = () => {
  swatches.forEach((node) => {
    node.style.width = node.style.height = form.size + 'px'
    node.style.borderRadius = radius[form.shape]
  })
  strip.className = 'solora-cl solora-cl--oos-' + form.stock
  range.style.setProperty('--v', ((form.size - 16) / 80) * 100 + '%')
  document.querySelector('[data-size-label]').textContent = 'Swatch size (' + form.size + 'px)'
  for (const key of ['shape', 'stock']) document.querySelector('[data-select="' + key + '"]').firstChild.textContent = labelOf(key, form[key])
  bar.hidden = JSON.stringify(form) === baseline
}

const openMenu = (field) => {
  const key = field.dataset.select
  const box = stage.local(field)
  const height = options[key].length * 30 + 12
  const up = box.y + box.h + height + 8 > canvas.clientHeight
  menu.innerHTML = options[key].map(([value, label]) => '<button type="button" data-key="' + key + '" data-value="' + value + '">' + label + (form[key] === value ? check : '') + '</button>').join('')
  menu.style.left = box.x + 'px'
  menu.style.width = box.w + 'px'
  menu.style.top = (up ? box.y - height - 4 : box.y + box.h + 4) + 'px'
  menu.style.transformOrigin = up ? 'bottom' : 'top'
  field.classList.add('is-focus')
  menu.classList.add('is-open')
}

document.querySelectorAll('[data-select]').forEach((field) => field.addEventListener('click', () => openMenu(field)))

menu.addEventListener('click', (event) => {
  const option = event.target.closest('button')
  if (!option) return
  form[option.dataset.key] = option.dataset.value
  menu.classList.remove('is-open')
  document.querySelectorAll('[data-select]').forEach((field) => field.classList.remove('is-focus'))
  render()
})

range.addEventListener('mousedown', (event) => {
  range.classList.add('is-drag')
  const move = (point) => {
    const box = range.getBoundingClientRect()
    form.size = Math.round(16 + Math.min(1, Math.max(0, (point.clientX - box.left) / box.width)) * 80)
    render()
  }
  move(event)
  const up = () => {
    range.classList.remove('is-drag')
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
})

document.querySelector('[data-save]').addEventListener('click', (event) => {
  const save = event.currentTarget
  save.classList.add('is-busy')
  setTimeout(() => {
    bar.hidden = true
    save.classList.remove('is-busy')
    stage.toast('Appearance saved')
  }, 650)
})
</script>`

const designPage = () =>
  adminPage({ app: APP, title: 'Design', head: designHead, body: designBody, overlays: designOverlays, scripts: designScripts })

const designRoute = (pathname) => (pathname === '/admin/design' ? html(designPage()) : null)

export const combinedListingsAdminScenes = [
  {
    app: APP,
    name: 'create-group',
    start: '/admin/groups',
    route,
    async play(rec) {
      await rec.hold(900)
      await rec.show({ x: 470, y: 330 })
      await rec.click('.k-empty [data-create]', { move: 600 })
      await rec.settle(400)
      await rec.click('[data-title]', { move: 480 })
      await rec.type('[data-title]', 'Classic Tee', { cps: 20 })
      await rec.hold(200)
      await rec.mark(1, '[data-add-products]', { side: 'tl' })
      await rec.click('[data-add-products]', { move: 560 })
      await rec.settle(420)
      for (const value of tees) await rec.click(`[data-pick="${value}"] .k-check`, { move: 260 })
      await rec.hold(250)
      await rec.click('[data-picker-add]', { move: 520 })
      await rec.settle(480)
      await rec.zoom('[data-members]', 1.32)
      await rec.mark(2, '.cl-hex:has([data-hex="red"])', { side: 'tl', pad: 3, radius: 11 })
      for (const value of tees) {
        await rec.click(`[data-hex="${value}"]`, { move: 260 })
        await rec.type(`[data-hex="${value}"]`, hex(value), { cps: 36 })
      }
      await rec.hold(300)
      await rec.annotate([
        [1, '[data-add-products]'],
        [2, '.cl-hex:has([data-hex="red"])', { pad: 3, radius: 11 }],
        [3, '[data-save]'],
      ])
      await rec.mark(3, '[data-save]', { side: 'tl' })
      await rec.click('[data-save]', { move: 420 })
      await rec.settle(560)
      await rec.unzoom()
      await rec.settle(640)
      await rec.hold(2200)
    },
  },
  {
    app: APP,
    name: 'design-settings',
    start: '/admin/design',
    route: designRoute,
    async play(rec, page) {
      await rec.hold(1100)
      await rec.show({ x: 520, y: 340 })
      await rec.zoom('[data-cols]', 1.3, { focus: { y: 0.34 } })
      await rec.mark(1, '[data-group]', { side: 'tr', pad: 4, radius: 11 })
      await rec.click('[data-select="shape"]', { move: 520, keepMarks: true })
      await rec.settle(300)
      await rec.click('[data-value="rounded"]', { move: 380, keepMarks: true })
      await rec.settle(420)
      const track = await page.locator('[data-range]').boundingBox()
      await rec.drag('[data-thumb]', { x: track.x + track.width * 0.35, y: track.y + track.height / 2 }, { move: 420, ms: 720 })
      await rec.hold(500)
      await rec.unmark()
      await rec.mark(2, '[data-stock-field]', { side: 'tr', pad: 4, radius: 11 })
      await rec.click('[data-select="stock"]', { move: 560, keepMarks: true })
      await rec.settle(300)
      await rec.click('[data-value="strike"]', { move: 380 })
      await rec.settle(420)
      await rec.hold(600)
      await rec.unzoom()
      await rec.settle(300)
      await rec.annotate([
        [1, '[data-group]', { side: 'tr', pad: 4, radius: 11 }],
        [2, '[data-stock-field]', { side: 'tr', pad: 4, radius: 11 }],
        [3, '[data-preview]', { pad: 4, radius: 15 }],
      ])
      await rec.mark(3, '[data-preview]', { side: 'tl', pad: 4, radius: 15 })
      await rec.move('[data-swatches]', 520)
      await rec.hold(800)
      await rec.click('[data-save]', { move: 640 })
      await rec.settle(900)
      await rec.hold(2200)
    },
  },
]
