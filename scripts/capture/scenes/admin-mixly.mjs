import { adminPage, badge, button, card, checkbox, field, icons, modal, pageHead, segmented, select, thumb } from '../lib/kit.mjs'
import { html } from '../lib/site.mjs'
import { basePayload, markDone, mount, PRODUCT_TEXT, products, reloaded, runtime, widgetStyle } from './mixly.mjs'

const APP = 'mixly'

const svg = (body) => `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`

const typeIcons = {
  FBT: svg('<path d="M2.5 3.5h2l1.6 8.2a1 1 0 0 0 1 .8h6.4a1 1 0 0 0 1-.8l1-5.2H5.2"/><circle cx="8" cy="16" r="1" fill="currentColor"/><circle cx="14" cy="16" r="1" fill="currentColor"/><path d="m9 9.8 3-3.3"/>'),
  MIX: svg('<rect x="3" y="3.5" width="5.5" height="5.5" rx="1.2"/><rect x="11.5" y="3.5" width="5.5" height="5.5" rx="1.2"/><rect x="3" y="11" width="5.5" height="5.5" rx="1.2"/><rect x="11.5" y="11" width="5.5" height="5.5" rx="1.2"/>'),
  BOGO: svg('<rect x="3" y="8" width="14" height="9" rx="1.5"/><path d="M10 8v9M2.5 8h15"/><path d="M10 8C8.5 4.5 5 5.5 6 7.2 6.6 8 8.5 8 10 8Zm0 0c1.5-3.5 5-2.5 4-.8-.6.8-2.5.8-4 .8Z"/>'),
}

const types = [
  { key: 'FBT', label: 'Frequently Bought Together' },
  { key: 'MIX', label: 'Build Your Own' },
  { key: 'BOGO', label: 'BOGO' },
]

const choices = [
  { key: 'tee', art: 'tee-blue', title: 'Classic Tee' },
  { key: 'tote', art: 'tote-natural', title: 'Canvas Tote' },
  { key: 'hoodie', art: 'hoodie-sage', title: 'Everyday Hoodie' },
  { key: 'stickers', art: 'stickers', title: 'Sticker Pack' },
]

const order = ['tee', 'tote', 'stickers']

const section = (title, body, { badge: tag = '', action = '', attrs } = {}) =>
  card(`<div class="mx-head"><h2>${title}</h2>${tag}<span class="k-grow"></span>${action}</div><div class="mx-rule"></div>${body}`, { attrs })

const style = `<style>
.k-page { padding-top: 10px; }
.k-page-head { margin-bottom: 10px; }
.k-page-head h1 { font-size: 16px; }
.k-card + .k-card, .k-cols + .k-card, .k-card + .mx-grid { margin-top: 10px; }
.mx-head { display: flex; align-items: center; gap: 8px; min-height: 24px; }
.mx-head h2 { margin: 0; font-size: 13px; line-height: 20px; font-weight: 650; }
.mx-wrap { display: grid; justify-items: start; gap: 3px; }
.mx-rule { height: 1px; margin: 8px 0 10px; background: var(--k-border); }
.mx-sub { margin: 0; color: var(--k-muted); font-size: 12px; line-height: 16px; }
.mx-title { display: grid; gap: 1px; }
.mx-types { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.mx-type { position: relative; display: grid; align-content: center; min-height: 52px; padding: 8px 22px 8px 10px; border-radius: 9px; background: #fff; box-shadow: inset 0 0 0 1px var(--k-border-input); cursor: pointer; }
.mx-type.is-on { background: #f1f1f1; box-shadow: inset 0 0 0 1px #005bd3, 0 0 0 1px #005bd3; }
.mx-type b { display: flex; align-items: center; gap: 6px; font-size: 12px; line-height: 15px; font-weight: 650; }
.mx-type b svg { flex: none; width: 16px; height: 16px; color: var(--k-muted); }
.mx-type i { position: absolute; top: 5px; right: 5px; width: 14px; height: 14px; color: var(--k-success); opacity: 0; }
.mx-type.is-on i { opacity: 1; }
.mx-type i svg { width: 14px; height: 14px; }
.mx-none { display: grid; place-items: center; height: 44px; border-radius: 9px; border: 1px dashed #c9c9c9; color: var(--k-faint); font-size: 12px; }
.mx-items { display: grid; gap: 6px; }
.mx-item { display: flex; align-items: center; gap: 10px; padding: 4px 8px 4px 5px; border-radius: 9px; box-shadow: inset 0 0 0 1px var(--k-border); }
.mx-item-name { flex: 1; min-width: 0; font-size: 12px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mx-qty { display: inline-flex; align-items: stretch; height: 26px; border-radius: 8px; overflow: hidden; box-shadow: inset 0 0 0 1px var(--k-border-input); font-size: 12px; }
.mx-qty i, .mx-qty b { display: grid; place-items: center; width: 24px; font-style: normal; color: var(--k-muted); }
.mx-qty b { width: 30px; color: var(--k-text); font-weight: 500; }
.mx-qty i:first-child { color: #c9c9c9; }
.mx-qty svg { width: 12px; height: 12px; }
.mx-x { display: grid; place-items: center; width: 24px; height: 24px; color: var(--k-muted); }
.mx-x svg { width: 12px; height: 12px; }
.mx-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; align-items: stretch; margin-top: 10px; }
.mx-grid .k-card-body { display: grid; align-content: start; }
.mx-fields { display: grid; gap: 10px; }
.mx-pick { cursor: pointer; padding-top: 6px; padding-bottom: 6px; }
.mx-savebar { position: absolute; top: 0; left: 0; right: 0; z-index: 45; display: flex; align-items: center; gap: 8px; height: 34px; padding: 0 10px 0 14px; background: #1a1a1a; color: #e3e3e3; font-size: 12px; font-weight: 550; }
.mx-savebar .k-btn { height: 24px; padding: 0 10px; background: #4a4a4a; color: #fff; box-shadow: none; }
.mx-savebar .k-btn.is-save { margin-left: 24px; background: #fff; color: #303030; }
.mx-savebar .k-btn.is-save[disabled] { background: #4a4a4a; color: #8a8a8a; }
.mx-savebar .k-btn.is-busy { color: transparent; }
.mx-delete { color: var(--k-critical); }
.mx-frame { overflow: hidden; border-radius: 14px; border: 1px solid var(--k-border); background: #fff; box-shadow: 0 18px 36px -24px rgba(20, 23, 40, .4); }
.mx-bar { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-bottom: 1px solid var(--k-border); background: var(--k-surface-2); }
.mx-dots { display: flex; gap: 5px; }
.mx-dots i { width: 8px; height: 8px; border-radius: 50%; }
.mx-dots i:nth-child(1) { background: #ff5f57; }
.mx-dots i:nth-child(2) { background: #febc2e; }
.mx-dots i:nth-child(3) { background: #28c840; }
.mx-url { display: flex; align-items: center; justify-content: center; gap: 5px; flex: 1; height: 20px; border-radius: 999px; border: 1px solid var(--k-border); background: #fff; color: var(--k-muted); font-size: 11px; }
.mx-url svg { width: 10px; height: 10px; }
.mx-view { padding: 14px 16px 16px; font: 14px/1.45 "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, sans-serif; color: #1a1a1a; }
.mx-view .mx-pt { font-size: 17px; font-weight: 700; line-height: 1.25; letter-spacing: -.02em; }
.mx-view .mx-pp { margin-top: 3px; font-size: 15px; color: #6b7280; }
.mx-view .mx-atc { display: inline-block; margin-top: 10px; padding: 6px 14px; border: 1px solid #c9cccf; border-radius: 999px; font-size: 12px; font-weight: 600; }
.mx-view .mixly-btn, .mx-view .mixly-card { pointer-events: none; }
.mx-seg { display: flex; margin-bottom: 10px; }
.mx-seg .k-seg button { height: 24px; padding: 0 11px; }
.mx-guide { container-type: inline-size; }
.mx-ghead { display: flex; align-items: center; gap: 10px; padding: 12px 12px 10px; }
.mx-ring { position: relative; flex: none; width: 38px; height: 38px; }
.mx-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.mx-ring circle { fill: none; stroke-width: 4; }
.mx-ring .t { stroke: #ebebeb; }
.mx-ring .v { stroke: #29845a; stroke-linecap: round; }
.mx-ring span { position: absolute; inset: 0; display: grid; place-items: center; font-size: 11px; font-weight: 650; font-variant-numeric: tabular-nums; }
.mx-gtext { flex: 1; min-width: 0; display: grid; gap: 1px; }
.mx-gtext b { font-size: 13px; line-height: 18px; font-weight: 650; }
.mx-gtext span { font-size: 11px; line-height: 14px; color: var(--k-muted); }
.mx-gtools { display: flex; gap: 2px; color: var(--k-muted); }
.mx-gtools span { display: grid; place-items: center; width: 24px; height: 24px; }
.mx-gtools svg { width: 14px; height: 14px; }
.mx-segs { display: flex; gap: 4px; padding: 0 12px; }
.mx-segs i { flex: 1; height: 4px; border-radius: 999px; background: #ebebeb; }
.mx-segs i.is-done { background: #29845a; }
.mx-steps { display: grid; gap: 2px; margin: 0; padding: 10px 8px 12px; list-style: none; }
.mx-step { border-radius: 11px; border: 1px solid transparent; }
.mx-step.is-open { background: var(--k-surface-2); border-color: #ebebeb; }
.mx-step-head { display: flex; align-items: center; gap: 10px; padding: 7px 8px; }
.mx-mark { display: grid; place-items: center; flex: none; width: 18px; height: 18px; border-radius: 50%; color: #8a8a8a; }
.mx-mark svg { width: 18px; height: 18px; fill: none; stroke: currentColor; stroke-width: 1.5; }
.mx-step.is-open .mx-mark { color: #4a4a4a; }
.mx-mark.is-done { background: linear-gradient(135deg, #3fca94, #0a8a63); box-shadow: 0 0 0 3px rgba(10, 138, 99, .14); color: #fff; animation: k-pop .4s cubic-bezier(.34, 1.56, .64, 1) both; }
.mx-mark.is-done svg { width: 11px; height: 11px; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 16; animation: mx-draw .4s .1s cubic-bezier(.22, 1, .36, 1) both; }
.mx-step-title { flex: 1; min-width: 0; font-size: 12px; line-height: 16px; font-weight: 550; }
.mx-step.is-open .mx-step-title { font-weight: 650; }
.mx-step.is-done:not(.is-open) .mx-step-title { color: var(--k-muted); }
.mx-pill { flex: none; padding: 0 7px; border-radius: 999px; background: #ebebeb; color: var(--k-muted); font-size: 11px; line-height: 18px; white-space: nowrap; }
.mx-step.is-open .mx-pill { background: #fff; }
.mx-pill.is-done { background: var(--k-success-bg); color: var(--k-success-text); }
.mx-step-body { display: grid; gap: 9px; padding: 0 10px 11px 36px; }
.mx-step-body p { margin: 0; font-size: 12px; line-height: 16px; color: var(--k-muted); }
.mx-step-body .k-row { gap: 12px; }
[data-status-card] .k-card-body { display: grid; gap: 10px; }
.mx-alert { display: grid; gap: 8px; padding: 10px; border-radius: 9px; background: var(--k-critical-bg); }
.mx-alert .k-row { align-items: flex-start; gap: 7px; }
.mx-alert svg { width: 16px; height: 16px; color: var(--k-critical-strong); }
.mx-alert b { display: block; font-size: 12px; line-height: 16px; font-weight: 650; }
.mx-alert span { display: block; margin-top: 2px; font-size: 11px; line-height: 14px; color: var(--k-muted); }
.mx-checks { display: grid; gap: 8px; }
.mx-check { display: flex; align-items: flex-start; gap: 6px; }
.mx-check svg { width: 14px; height: 14px; margin-top: 1px; }
.mx-check.is-success svg { color: var(--k-success); }
.mx-check.is-muted svg { color: var(--k-faint); }
.mx-check b { display: block; font-size: 11.5px; line-height: 16px; font-weight: 550; }
.mx-check span { display: block; font-size: 10.5px; line-height: 13px; color: var(--k-muted); }
@keyframes mx-draw { from { stroke-dashoffset: 16; } }
</style>`

const minus = '<svg viewBox="0 0 16 16"><path d="M3.5 8h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'

const itemRow = ({ art, title }) => `<div class="mx-item">${thumb(art, { size: 28 })}<span class="mx-item-name">${title}</span><span class="mx-qty"><i>${minus}</i><b>1</b><i>${icons.plus}</i></span><span class="mx-x">${icons.x}</span></div>`

const tickMark = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5.5 10.5l3 3 6-7"/></svg>'
const pendingMark = '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8.25"/></svg>'

const savebar = `<div class="mx-savebar">Unsaved changes<span class="k-grow"></span>${button('Discard')}<button type="button" class="k-btn is-save" data-save disabled>Save</button></div>`

const createPage = () =>
  adminPage({
    app: APP,
    title: 'Create bundle',
    head: style,
    body: `${pageHead({ back: true, title: 'Create bundle', badges: badge('Active', 'success') })}
${section('Bundle type', `<div class="mx-types" data-types>${types
      .map(({ key, label }) => `<div class="mx-type${key === 'FBT' ? ' is-on' : ''}" data-type="${key}"><i>${icons.success}</i><b>${typeIcons[key]}${label}</b></div>`)
      .join('')}</div>`)}
${section('Required items', `<div class="mx-items" data-items><div class="mx-none" data-none>No products added yet.</div></div>`, { action: button('Add products', { attrs: 'data-add-products' }) })}
<div class="mx-grid">
  ${card(`<div class="mx-head"><h2>Discount</h2></div><div class="mx-rule"></div><div class="mx-fields" data-discount>${select({ label: 'Discount mode', value: 'Percentage off', attrs: 'data-mode' })}${field({ label: 'Percentage off', value: '10', suffix: '%', attrs: 'data-value inputmode="numeric"' })}</div>`)}
  ${card(`<div class="mx-head"><h2>Bundle details</h2></div><div class="mx-rule"></div><div class="mx-fields">${field({ label: 'Name', suffix: '<span data-count>0/60</span>', help: 'Shoppers see this name next to their discount at checkout.', attrs: 'data-name maxlength="60"' })}${select({ label: 'Status', value: 'Active' })}</div>`, { attrs: 'data-details' })}
</div>`,
    overlays: `${savebar}
${modal({
  id: 'picker',
  title: 'Select products',
  width: 420,
  flush: true,
  body: `<div style="padding:10px 14px;border-bottom:1px solid var(--k-border)">${field({ placeholder: 'Search products', icon: 'search' })}</div>${choices
    .map(({ key, art, title }) => `<div class="k-list-item mx-pick" data-pick="${key}">${checkbox()}${thumb(art, { size: 30 })}<span class="k-grow">${title}</span></div>`)
    .join('')}`,
  footer: `<span class="k-grow" data-selected>0 selected</span>${button('Cancel')}${button('Select', { variant: 'primary', attrs: 'data-select', disabled: true })}`,
})}
<div class="k-menu" id="mode-menu" data-menu><button type="button" data-option="Percentage off">Percentage off</button><button type="button" data-option="Fixed amount off">Fixed amount off</button><button type="button" data-option="Fixed bundle price">Fixed bundle price</button></div>`,
    scripts: `<script>
var rows = ${JSON.stringify(Object.fromEntries(choices.map((choice) => [choice.key, itemRow(choice)])))}
var picked = new Set()
var save = document.querySelector('[data-save]')
var nameInput = document.querySelector('[data-name]')
var items = document.querySelector('[data-items]')
var menu = document.getElementById('mode-menu')
var sync = function () { save.disabled = !(nameInput.value.trim() && items.querySelector('.mx-item')) }
document.querySelectorAll('[data-type]').forEach(function (tile) {
  tile.addEventListener('click', function () {
    document.querySelectorAll('[data-type]').forEach(function (other) { other.classList.toggle('is-on', other === tile) })
  })
})
document.querySelector('[data-add-products]').addEventListener('click', function () { stage.open('#picker') })
document.querySelectorAll('[data-pick]').forEach(function (row) {
  row.addEventListener('click', function () {
    row.querySelector('.k-choice').classList.toggle('is-checked')
    if (picked.has(row.dataset.pick)) picked.delete(row.dataset.pick)
    else picked.add(row.dataset.pick)
    document.querySelector('[data-selected]').textContent = picked.size + ' selected'
    document.querySelector('[data-select]').disabled = !picked.size
  })
})
document.querySelector('[data-select]').addEventListener('click', function () {
  stage.close('#picker')
  items.innerHTML = ${JSON.stringify(order)}.filter(function (key) { return picked.has(key) }).map(function (key) { return rows[key] }).join('')
  sync()
})
document.querySelector('[data-mode]').addEventListener('click', function (event) {
  var box = stage.local(event.currentTarget)
  menu.style.left = box.x + 'px'
  menu.style.top = box.y + box.h + 4 + 'px'
  menu.style.minWidth = box.w + 'px'
  menu.classList.toggle('is-open')
})
menu.querySelectorAll('[data-option]').forEach(function (option) {
  option.addEventListener('click', function () {
    document.querySelector('[data-mode]').firstChild.textContent = option.dataset.option
    menu.classList.remove('is-open')
  })
})
nameInput.addEventListener('input', function () {
  document.querySelector('[data-count]').textContent = nameInput.value.length + '/60'
  sync()
})
save.addEventListener('click', function () {
  save.classList.add('is-busy')
  setTimeout(function () { location.href = '/admin/bundles/weekend-set' }, 650)
})
</script>`,
  })

const savedPage = () => {
  const [tee] = products
  const payload = basePayload('product', 'preview', { text: PRODUCT_TEXT }, {
    designMode: true,
    product: { ...tee, selectedVariantId: tee.variants[0].id },
  })
  return adminPage({
    app: APP,
    title: 'Weekend set',
    head: `${style}<link rel="stylesheet" href="/assets/mixly-blocks.css"><style>${widgetStyle('preview')}</style>`,
    body: `${pageHead({ back: true, title: 'Weekend set', badges: badge('Active', 'success'), actions: '<button type="button" class="k-btn mx-delete">Delete</button>' })}
${section('Live preview', `<div class="mx-seg">${segmented(['Product', 'Cart', 'Checkout'], 'Product')}</div>
<div class="mx-frame">
  <div class="mx-bar"><span class="mx-dots"><i></i><i></i><i></i></span><span class="mx-url"><svg viewBox="0 0 12 12"><path d="M6 1a2.5 2.5 0 0 0-2.5 2.5V5H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-.5V3.5A2.5 2.5 0 0 0 6 1Zm1.5 4h-3V3.5a1.5 1.5 0 0 1 3 0V5Z" fill="currentColor"/></svg>demo-store.example/products/classic-tee</span></div>
  <div class="mx-view">
    <div class="mx-pt">Classic Tee</div><div class="mx-pp">$24.00</div><span class="mx-atc">Add to cart</span>
    ${mount('preview', payload)}
  </div>
</div>`, { badge: badge('Live', 'success') })}`,
    scripts: `${runtime}<script>stage.toast('Bundle saved')</script>`,
  })
}

const bundleRow = (active) => `<tr data-row><td><b>Weekend set</b></td><td><span class="k-row" style="gap:6px"><span class="mx-ticon">${typeIcons.FBT}</span><span class="k-muted">Frequently Bought Together</span></span></td><td class="k-num">−15%</td><td class="k-muted">3 products</td><td><span class="k-badge${active ? ' is-success' : ''}" data-status>${active ? 'Active' : 'Paused'}</span></td><td class="k-num">${button('', { variant: 'tertiary', icon: 'dots', attrs: 'data-more' })}</td></tr>`

const bundlesPage = () =>
  adminPage({
    app: APP,
    title: 'Bundles',
    head: `${style}<style>.mx-ticon svg { width: 14px; height: 14px; color: var(--k-muted); }.k-page { max-width: 468px; }.k-table td, .k-table th { padding: 0 5px; font-size: 12px; white-space: nowrap; }.k-table td { height: 48px; }.k-table th:first-child, .k-table td:first-child { padding-left: 12px; }.k-table th:last-child, .k-table td:last-child { padding-right: 8px; }.k-table td .k-row { white-space: normal; line-height: 15px; min-width: 124px; }.k-table td .k-btn.is-icon { width: 26px; height: 26px; }.mx-cov p { margin: 0 0 8px; color: var(--k-muted); font-size: 12px; line-height: 16px; }</style>`,
    body: `<div class="k-page-head"><div class="mx-title"><h1>Bundles</h1><p class="mx-sub" data-sub>1 bundle · 0 active</p></div><span class="k-grow"></span>${button('Create bundle', { variant: 'primary' })}</div>
${card(`<table class="k-table"><thead><tr><th>Name</th><th>Type</th><th class="k-num">Discount</th><th>Items</th><th>Status</th><th></th></tr></thead><tbody>${bundleRow(false)}</tbody></table>`, { flush: true })}
${card(`<div class="mx-head"><h2>Check a product</h2></div><div class="mx-rule"></div><div class="mx-cov"><p>See which live bundles include a product, and which one takes its units first.</p>${button('Choose product')}</div>`)}`,
    overlays: `<div class="k-menu" id="row-menu" data-menu><button type="button">Duplicate bundle</button><button type="button" data-toggle>Activate bundle</button><hr><button type="button" style="color:var(--k-critical)">Delete bundle</button></div>`,
    scripts: `<script>
var menu = document.getElementById('row-menu')
document.querySelector('[data-more]').addEventListener('click', function (event) {
  var box = stage.local(event.currentTarget)
  menu.style.left = box.x + box.w - 168 + 'px'
  menu.style.top = box.y + box.h + 4 + 'px'
  menu.classList.toggle('is-open')
})
document.querySelector('[data-toggle]').addEventListener('click', function () {
  menu.classList.remove('is-open')
  var status = document.querySelector('[data-status]')
  status.className = 'k-badge is-success is-pop'
  status.textContent = 'Active'
  document.querySelector('[data-sub]').textContent = '1 bundle · 1 active'
  document.querySelector('[data-toggle]').textContent = 'Pause bundle'
})
</script>`,
  })

const ring = (done) => `<span class="mx-ring"><svg viewBox="0 0 44 44"><circle class="t" cx="22" cy="22" r="18"/><circle class="v" cx="22" cy="22" r="18" stroke-dasharray="113.1" stroke-dashoffset="${(113.1 * (1 - done / 4)).toFixed(1)}"/></svg><span>${done}/4</span></span>`

const step = ({ id, label, meta, done, body }) => `<li class="mx-step${body ? ' is-open' : ''}${done ? ' is-done' : ''}" data-step="${id}"><div class="mx-step-head"><span class="mx-mark${done ? ' is-done' : ''}">${done ? tickMark : pendingMark}</span><span class="mx-step-title">${label}</span><span class="mx-pill${done ? ' is-done' : ''}">${meta}</span></div>${body ? `<div class="mx-step-body">${body}</div>` : ''}</li>`

const check = (tone, label, detail) => `<div class="mx-check is-${tone}"${label === 'Checkout discount is live' ? ' data-live' : ''}>${icons[tone === 'success' ? 'success' : 'info']}<span><b>${label}</b>${detail ? `<span>${detail}</span>` : ''}</span></div>`

const homePage = ({ mode, fixed = false }) => {
  const broken = mode === 'broken' && !fixed
  const done = fixed ? 3 : 2
  const secondStep = broken
    ? step({
        id: 'fix',
        label: 'Reconnect your checkout discount',
        meta: '1 min',
        body: `<p>Your bundle is active, but its checkout discount isn't applying in Shopify — shoppers aren't getting the deal. Reconnect it to recreate the discount in Shopify.</p><div class="k-row">${button('Fix it now', { variant: 'primary', attrs: 'data-fix' })}${button('Watch how', { variant: 'plain' })}</div>`,
      })
    : fixed
      ? step({ id: 'activate', label: 'Activate it', meta: '1 bundle live', done: true })
      : step({
          id: 'activate',
          label: 'Activate it',
          meta: '1 min',
          body: `<p>Activating publishes the bundle to your storefront and connects its checkout discount automatically.</p><div class="k-row">${button('Go to bundles', { variant: 'primary', attrs: 'data-go' })}${button('Watch how', { variant: 'plain' })}</div>`,
        })
  const rollup = broken ? badge('Action needed', 'critical') : badge('All good', 'success')
  const discountRow = fixed ? check('success', 'Checkout discount is live') : mode === 'activate' ? check('muted', 'Checkout discount pending', "It's created automatically when you activate your first bundle") : ''
  const alert = broken
    ? `<div class="mx-alert" data-alert><div class="k-row">${icons.alert}<div><b>Nothing is discounting</b><span>The checkout discount was deleted in Shopify</span></div></div>${button('Reconnect discount', { variant: 'critical' })}</div>`
    : ''
  return adminPage({
    app: APP,
    title: 'Home',
    head: style,
    body: `<div class="k-cols">
  ${card(`<div class="mx-guide"><div class="mx-ghead">${ring(done)}<div class="mx-gtext"><b>Set up Mixly</b><span>Four quick steps to get your first bundle discounting at checkout.</span></div><div class="mx-gtools"><span>${icons.chevron.replace('<svg', '<svg style="transform:rotate(180deg)"')}</span><span>${icons.x}</span></div></div>
<div class="mx-segs">${[0, 1, 2, 3].map((index) => `<i${index < done ? ' class="is-done"' : ''}></i>`).join('')}</div>
<ol class="mx-steps">${step({ id: 'create', label: 'Create your first bundle', meta: '1 bundle created', done: true })}${secondStep}${step({ id: 'theme', label: 'Add Mixly to your product page', meta: 'Block added', done: true })}${step({ id: 'cart', label: 'See it work in a cart', meta: '1 min' })}</ol></div>`, { flush: true, attrs: 'data-guide' })}
  ${card(`<div class="mx-head mx-wrap"><h2>Bundle status</h2>${rollup}</div><div class="mx-rule" style="margin:0"></div>${alert}<div class="mx-checks">${discountRow}${check('success', 'Block is live on your product page')}${check('success', 'Synced just now')}</div>`, { attrs: 'data-status-card' })}
</div>`,
    scripts: `<script>
var go = document.querySelector('[data-go]')
if (go) go.addEventListener('click', function () { location.href = '/admin/bundles' })
var fix = document.querySelector('[data-fix]')
if (fix) fix.addEventListener('click', function () {
  fix.classList.add('is-busy')
  setTimeout(function () { location.href = '/admin?fixed=1' }, 1100)
})
</script>`,
  })
}

const route = (pathname, { search }) => {
  if (pathname === '/admin/bundles/new') return html(createPage())
  if (pathname === '/admin/bundles/weekend-set') return html(savedPage())
  if (pathname === '/admin/bundles') return html(bundlesPage())
  if (pathname === '/admin/activate') return html(homePage({ mode: 'activate' }))
  if (pathname === '/admin/activated') return html(homePage({ mode: 'activate', fixed: true }))
  if (pathname === '/admin') return html(homePage({ mode: 'broken', fixed: search.includes('fixed') }))
  return null
}

export const mixlyAdminScenes = [
  {
    app: APP,
    name: 'create-bundle',
    start: '/admin/bundles/new',
    route,
    async play(rec, page) {
      await rec.hold(500)
      await rec.annotate([
        [1, '[data-types]', { pad: 4, radius: 12 }],
        [2, '[data-add-products]'],
        [3, '[data-save]', { side: 'l' }],
      ])
      await rec.show({ x: 470, y: 330 })
      await rec.mark(1, '[data-types]', { side: 'tl', pad: 4, radius: 12 })
      await rec.click('[data-type="FBT"]', { move: 600 })
      await rec.hold(150)
      await rec.mark(2, '[data-add-products]', { side: 'tl' })
      await rec.click('[data-add-products]', { move: 520 })
      await rec.settle(360)
      for (const key of ['tee', 'tote', 'stickers']) await rec.click(`[data-pick="${key}"] .k-check`, { move: 260 })
      await rec.hold(200)
      await rec.click('[data-select]', { move: 480 })
      await rec.settle(240)
      await rec.scroll(330, 320)
      await rec.mark(2, '[data-discount]', { side: 'tl', pad: 6, radius: 10 })
      await rec.click('[data-mode]', { move: 560 })
      await rec.settle(240)
      await rec.move('[data-option="Fixed amount off"]', 260)
      await rec.move('[data-option="Fixed bundle price"]', 240)
      await rec.move('[data-option="Percentage off"]', 240)
      await rec.click(null)
      await rec.settle(160)
      await rec.click('[data-value]', { move: 420 })
      await rec.type('[data-value]', '15', { cps: 6 })
      await rec.hold(250)
      await rec.mark(3, '[data-name]', { side: 'l', pad: 4, radius: 10 })
      await rec.click('[data-name]', { move: 480 })
      await rec.type('[data-name]', 'Weekend set', { cps: 20 })
      await rec.hold(250)
      await rec.mark(3, '[data-save]', { side: 'l' })
      await reloaded(rec, page, () => rec.click('[data-save]', { move: 600 }))
      await rec.move({ x: 540, y: 272 }, 420)
      await rec.hold(300)
      await page.evaluate(() => document.querySelector('.k-toast').classList.add('is-out'))
      await rec.scroll(320, 320)
      await rec.hold(2000)
    },
  },
  {
    app: APP,
    name: 'activate-bundle',
    start: '/admin/activate',
    route,
    async play(rec, page) {
      await rec.hold(900)
      await rec.show({ x: 470, y: 340 })
      await rec.mark(1, '[data-go]', { side: 'tl' })
      await reloaded(rec, page, () => rec.click('[data-go]', { move: 700 }))
      await rec.hold(500)
      await rec.annotate([
        [1, '[data-row]', { pad: 2, radius: 6 }],
        [2, '[data-status]', { pad: 3, radius: 9 }],
        [3, '[data-more]'],
      ])
      await rec.zoom('.k-table', 1.22)
      await rec.mark(1, '[data-row]', { side: 'tl', pad: 2, radius: 6 })
      await rec.hold(700)
      await rec.unmark()
      await rec.mark(2, '[data-status]', { side: 'tl', pad: 3, radius: 9 })
      await rec.move('[data-status]', 520)
      await rec.hold(900)
      await rec.unmark()
      await rec.mark(3, '[data-more]', { side: 'tl' })
      await rec.click('[data-more]', { move: 520 })
      await rec.settle(300)
      await rec.move('[data-toggle]', 420)
      await rec.hold(500)
      await rec.click('[data-toggle]')
      await rec.settle(700)
      await rec.hold(900)
      await reloaded(rec, page, async () => {
        await page.evaluate(() => setTimeout(() => location.assign('/admin/activated')))
      })
      await markDone(rec, null, '[data-live]', { pad: 4, radius: 8 })
      await rec.hold(2400)
    },
  },
  {
    app: APP,
    name: 'reconnect-discount',
    start: '/admin',
    route,
    async play(rec, page) {
      await rec.hold(1400)
      await rec.annotate([
        [1, '[data-alert]', { pad: 3, radius: 11 }],
        [2, '[data-fix]'],
        [3, '[data-step="fix"] .mx-step-head', { pad: 1, radius: 10 }],
      ])
      await rec.show({ x: 470, y: 340 })
      await rec.mark(1, '[data-alert]', { side: 'tl', pad: 3, radius: 11 })
      await rec.hold(1800)
      await rec.unmark()
      await rec.zoom('[data-step="fix"]', 1.35)
      await rec.mark(2, '[data-fix]', { side: 'tl' })
      await reloaded(rec, page, async () => {
        await rec.click('[data-fix]', { move: 700 })
        await rec.settle(1000)
      })
      await markDone(rec, 3, '[data-step="activate"] .mx-step-head', { side: 'tl', pad: 1, radius: 10 })
      await rec.hold(2400)
    },
  },
]
