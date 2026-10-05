import { adminPage, badge, button, card, checkbox, field, icons, pageHead, radio, select } from '../lib/kit.mjs'
import { html } from '../lib/site.mjs'

const APP = 'tierly'

const trash = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3.4v-.7a.7.7 0 0 1 .7-.7h2.6a.7.7 0 0 1 .7.7v.7M2.8 3.7h10.4M4.2 3.7l.5 8.8a1 1 0 0 0 1 .9h4.6a1 1 0 0 0 1-.9l.5-8.8M6.7 6.6v4M9.3 6.6v4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>'

const presets = [
  { key: 'gentle', name: 'Gentle', tiers: [[2, 5], [5, 10, true], [10, 15]] },
  { key: 'bold', name: 'Bold', tiers: [[3, 10], [6, 20, true], [12, 30]] },
  { key: 'bundle', name: 'Bundle', tiers: [[2, 10], [3, 15, true], [5, 20]] },
]

const tierBadge = ([qty, value, highlight]) => badge(`${qty}+ · ${value}%`, highlight ? 'success is-plain' : 'plain')

const presetBox = ({ key, name, tiers }) => `<div class="ty-preset" data-preset="${key}">
  <div class="ty-preset-name"><span class="ty-tick">${icons.success}</span>${name}</div>
  <div class="ty-badges">${tiers.map(tierBadge).join('')}</div>
  ${button('Use these tiers', { attrs: `data-use="${key}"` })}
</div>`

const tierBox = ([qty, value, highlight], index, solo) => `<div class="ty-tier${highlight ? ' is-hl' : ''}" data-tier>
  <div class="ty-tier-head"><span class="ty-tier-no">Tier ${index + 1}</span><span class="k-grow"></span>${checkbox({ checked: highlight, label: 'Highlight as best value', attrs: 'data-hl' })}<span class="ty-trash${solo ? ' is-off' : ''}">${trash}</span></div>
  <div class="ty-fields">${field({ label: 'Buy quantity', value: qty, attrs: 'data-f="qty"' })}${select({ label: 'Discount type', value: '% off' })}${field({ label: 'Value', value, suffix: '%', attrs: 'data-f="value"' })}</div>
</div>`

const tiersHtml = (tiers) => tiers.map((tier, index) => tierBox(tier, index, tiers.length === 1)).join('')

const detailsCard = card(
  field({ label: 'Offer name', placeholder: 'e.g. Bulk savings', suffix: '<span data-count>0/60</span>', attrs: 'data-name maxlength="60"' }),
  { title: 'Offer details' },
)

const appliesCard = card(
  `<div class="ty-choices" data-choices>${[
    ['all', 'All products'],
    ['products', 'Specific products'],
    ['collections', 'Specific collections'],
    ['variants', 'Specific variants'],
  ]
    .map(([value, label]) => radio({ checked: value === 'all', label, attrs: `data-applies="${value}"` }))
    .join('')}</div>`,
  { title: 'Applies to', attrs: 'data-applies-card' },
)

const tiersCard = card(
  `<div class="ty-presets" data-presets>${presets.map(presetBox).join('')}</div>
<div class="ty-tiers" data-tiers>${tiersHtml([[10, 10, false]])}</div>
<div class="ty-add">${button('Add tier', { variant: 'plain', icon: 'plus' })}</div>`,
  { title: 'Quantity tiers' },
)

const previewCard = card(
  `<div class="ty-device">
  <b class="ty-p-title">Classic Cotton T-Shirt</b>
  <span class="ty-p-price">$100.00</span>
  <b class="ty-w-title">Buy more, save more</b>
  <div class="ty-w" data-rows></div>
</div>`,
  { title: 'Live preview <span class="ty-live"><i></i>Live</span>' },
)

const savebar = `<div class="ty-sb" data-savebar>
  <span class="ty-sb-title">Unsaved changes</span>
  <span class="k-grow"></span>
  ${button('Discard')}
  ${button('Save', { attrs: 'data-save disabled', variant: 'save' })}
</div>`

const head = `<style>
.k-page { max-width: 500px; padding: 8px 0 20px; }
.k-page-head { min-height: 28px; margin-bottom: 8px; }
.k-page-head h1 { font-size: 16px; }
.k-badge { gap: 3px; }
.k-badge svg { width: 11px; height: 11px; }
.k-badge.is-plain::before { display: none; }
.k-card-body { padding: 8px 12px; }
.k-card-title { display: flex; align-items: center; gap: 8px; margin: -8px -12px 8px; padding: 5px 12px; border-bottom: 1px solid var(--k-border); font-size: 12.5px; line-height: 18px; }
.k-input { height: 30px; }
.k-field { gap: 3px; }
.k-label { font-size: 11px; line-height: 14px; }
.k-cols { grid-template-columns: minmax(0, 1fr) 190px; gap: 10px; }
.ty-main, .ty-basics { display: grid; gap: 8px; }
.ty-choices { display: grid; grid-template-columns: 1fr 1fr; gap: 7px 8px; font-size: 11.5px; white-space: nowrap; }
.ty-choices .k-choice { gap: 6px; }
.ty-presets { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; padding-bottom: 8px; border-bottom: 1px solid var(--k-border); }
.ty-preset { display: grid; align-content: start; gap: 5px; padding: 7px; border-radius: 8px; box-shadow: inset 0 0 0 1px var(--k-border); }
.ty-preset.is-active { background: var(--k-surface-3); box-shadow: inset 0 0 0 2px #303030; }
.ty-preset-name { display: flex; align-items: center; gap: 4px; font-size: 11.5px; font-weight: 650; }
.ty-tick { display: none; color: var(--k-success); }
.ty-preset.is-active .ty-tick { display: block; }
.ty-tick svg { width: 12px; height: 12px; }
.ty-badges { display: flex; flex-wrap: wrap; gap: 3px; }
.ty-badges .k-badge { height: 16px; padding: 0 4px; border-radius: 5px; font-size: 9.5px; }
.ty-preset .k-btn { width: 100%; height: 24px; padding: 0 4px; font-size: 10px; }
.ty-tiers { display: grid; gap: 6px; padding: 8px 0 2px; }
.ty-tier { display: grid; gap: 4px; padding: 7px 9px 8px; border-radius: 8px; box-shadow: inset 0 0 0 1px var(--k-border); }
.ty-tier.is-hl { background: var(--k-surface-3); box-shadow: inset 0 0 0 2px #303030; }
.ty-tier-head { display: flex; align-items: center; gap: 8px; min-height: 20px; }
.ty-tier-no { color: var(--k-muted); font-size: 11px; font-weight: 650; }
.ty-tier-head .k-choice { gap: 5px; font-size: 11px; }
.ty-trash { display: grid; place-items: center; width: 20px; height: 20px; color: var(--k-critical); }
.ty-trash.is-off { color: #b5b5b5; }
.ty-trash svg { width: 14px; height: 14px; }
.ty-fields { display: grid; grid-template-columns: 70px minmax(0, 1fr) 70px; gap: 8px; }
.ty-fields .k-field, .ty-fields input { min-width: 0; width: 100%; }
.ty-fields .k-input { height: 28px; padding: 0 8px; font-size: 12px; white-space: nowrap; }
.ty-fields .k-label { white-space: nowrap; }
.ty-add { padding-top: 6px; font-size: 12px; }
.ty-side { position: sticky; top: 8px; }
.ty-side .k-card-body { padding: 8px 10px; }
.ty-side .k-card-title { margin: -8px -10px 8px; padding: 5px 10px; }
.ty-live { display: inline-flex; align-items: center; gap: 4px; margin-left: auto; padding: 0 7px 0 6px; border-radius: 999px; background: rgba(41, 132, 90, .12); color: #1f7a4d; font-size: 10px; font-weight: 650; }
.ty-live i { width: 6px; height: 6px; border-radius: 50%; background: #2f9d68; }
.ty-device { display: grid; gap: 1px; }
.ty-p-title { font-size: 11.5px; line-height: 15px; }
.ty-p-price { margin-bottom: 7px; color: #6b7280; font-size: 11px; line-height: 14px; }
.ty-w-title { margin-bottom: 4px; font-size: 11.5px; line-height: 15px; }
.ty-w { overflow: hidden; border-radius: 9px; box-shadow: inset 0 0 0 1px #e3e3e3; }
.ty-row { padding: 5px 7px; font-size: 11px; line-height: 14px; }
.ty-row + .ty-row { border-top: 1px solid #e3e3e3; }
.ty-row.is-best { background: #f3f9f5; }
.ty-r1 { display: flex; align-items: center; gap: 3px; white-space: nowrap; }
.ty-r1 b { margin-left: auto; color: #1a7f37; }
.ty-r1 i { padding: 0 4px; border-radius: 6px; background: #1a7f37; color: #fff; font-size: 8.5px; font-style: normal; font-weight: 650; line-height: 13px; }
.ty-r2 { text-align: right; color: #1a7f37; font-size: 10px; line-height: 13px; white-space: nowrap; }
.ty-r2 s { margin-right: 4px; color: #8a8a8a; }
.ty-sb { position: absolute; z-index: 30; top: 0; left: 0; right: 0; display: flex; align-items: center; gap: 8px; height: 34px; padding: 0 10px 0 14px; background: #1a1a1a; color: #fff; font-size: 12.5px; font-weight: 650; }
.ty-sb .k-btn { height: 24px; padding: 0 11px; background: #4a4a4a; color: #fff; box-shadow: none; }
.ty-sb .k-btn.is-save { background: #fff; color: #1a1a1a; }
.ty-sb .k-btn[disabled] { opacity: .45; }
</style>`

const scripts = `<script>
var q = function (selector) { return document.querySelector(selector) }
var qa = function (selector) { return Array.prototype.slice.call(document.querySelectorAll(selector)) }
var title = q('[data-name]')
var save = q('[data-save]')
title.addEventListener('input', function () {
  q('[data-count]').textContent = title.value.length + '/60'
  save.disabled = !title.value.trim()
})
var usd = function (value) { return '$' + value.toFixed(2) }
var draw = function () {
  var rows = qa('[data-tier]').map(function (box) {
    return { qty: Number(box.querySelector('[data-f="qty"]').value), value: Number(box.querySelector('[data-f="value"]').value), best: box.classList.contains('is-hl') }
  }).filter(function (tier) { return tier.qty > 0 && tier.value > 0 }).sort(function (a, b) { return a.qty - b.qty })
  q('[data-rows]').innerHTML = rows.map(function (tier) {
    return '<div class="ty-row' + (tier.best ? ' is-best' : '') + '"><div class="ty-r1"><strong>Buy ' + tier.qty + '+</strong>' + (tier.best ? '<i>Best value</i>' : '') + '<b>' + usd(100 - tier.value) + '/ea</b></div><div class="ty-r2"><s>$100.00</s>Save ' + usd(tier.value) + '/item</div></div>'
  }).join('')
}
document.addEventListener('input', function (event) {
  if (!event.target.closest('[data-tier]')) return
  qa('[data-preset]').forEach(function (box) { box.classList.remove('is-active') })
  draw()
})
var presetTiers = ${JSON.stringify(Object.fromEntries(presets.map(({ key, tiers }) => [key, tiersHtml(tiers)])))}
qa('[data-use]').forEach(function (button) {
  button.addEventListener('click', function () {
    q('[data-tiers]').innerHTML = presetTiers[button.dataset.use]
    qa('[data-preset]').forEach(function (box) { box.classList.toggle('is-active', box.dataset.preset === button.dataset.use) })
    draw()
  })
})
draw()
save.addEventListener('click', function () {
  save.classList.add('is-busy')
  setTimeout(function () {
    q('[data-savebar]').hidden = true
    stage.toast('Saved — activating shortly')
  }, 650)
})
</script>`

const createPage = () =>
  adminPage({
    app: APP,
    title: 'Create offer',
    head,
    body: `${pageHead({ title: 'Create offer', back: true, badges: badge(`${icons.success}Active`, 'success is-plain'), actions: button('Pause') })}
<div class="k-cols">
  <div class="ty-main"><div class="ty-basics" data-basics>${detailsCard}${appliesCard}</div>${tiersCard}</div>
  <div class="ty-side">${previewCard}</div>
</div>`,
    overlays: savebar,
    scripts,
  })

const circleIcon = (inner) => `<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.4"/>${inner}</svg>`
const playCircle = circleIcon('<path d="M6.6 5.4v5.2L10.8 8Z" fill="currentColor"/>')
const pauseCircle = circleIcon('<path d="M6.5 5.6v4.8M9.5 5.6v4.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>')

const offers = [
  { name: 'Bulk savings', applies: 'All products', tiers: [[2, 5], [3, 10, true], [6, 18]] },
  { name: 'Hoodie duo', applies: '3 products', tiers: [[2, 10], [4, 20, true]] },
]

const listBadges = ({ tiers }) => tiers.map(([qty, value, highlight]) => badge(`${qty}+ · −${value}%`, highlight ? 'success is-plain' : 'plain')).join('')

const offerRow = (offer, index) => `<tr${index ? '' : ' data-row'}>
  <td><b>${offer.name}</b></td>
  <td>${offer.applies}</td>
  <td><span class="ty-tierbadges">${listBadges(offer)}</span></td>
  <td>${badge('Paused', 'plain', index ? '' : 'data-status')}</td>
  <td class="k-num"><span class="ty-act"><button type="button" class="k-btn is-tertiary is-icon" ${index ? '' : 'data-act '}aria-label="Activate offer">${playCircle}</button><span class="ty-tip">Activate offer</span></span></td>
</tr>`

const listView = `<div data-view="list">
  <div class="k-page-head ty-head">
    <span class="k-back" data-back>${icons.back}</span>
    <div><h1>Volume offers</h1><div class="k-muted k-small" data-sub>2 offers · 0 active</div></div>
    <span class="k-grow"></span>${button('Export CSV')}${button('Import CSV')}${button('Create offer', { variant: 'primary' })}
  </div>
  ${card(`<table class="k-table"><thead><tr><th>Offer</th><th>Applies to</th><th>Tiers</th><th>Status</th><th></th></tr></thead><tbody>${offers.map(offerRow).join('')}</tbody></table>`, { flush: true })}
  <div class="ty-coverage">${card(`<div class="k-row"><div class="k-grow"><b>Which offer applies?</b><div class="k-muted k-small">Pick a product to see the offer shoppers get, and any that are overridden.</div></div>${button('Check a product')}</div>`)}</div>
</div>`

const spinner = '<span class="k-spinner"></span>'

const homeOffer = (offer, index) => `<div class="ty-recent">
  <div class="k-grow"><b>${offer.name}</b><div class="ty-tierbadges">${listBadges(offer)}</div></div>
  ${index ? badge('Paused', 'plain') : badge('Live', 'success is-plain')}
</div>`

const healthRow = (attrs, icon, text) => `<div class="ty-hrow"${attrs}><span class="ty-hicon">${icon}</span><span>${text}</span></div>`

const homeView = `<div data-view="home" hidden>
  <div class="k-page-head ty-head">
    <div><h1>Good afternoon, Demo Store</h1><div class="k-muted k-small">Here's how your volume pricing is doing.</div></div>
    <span class="k-grow"></span>${button('Create offer', { variant: 'primary' })}
  </div>
  <div class="k-cols">
    ${card(`<div class="ty-recents">${offers.map(homeOffer).join('')}</div>`, { title: 'Your offers<span class="ty-link">View all</span>' })}
    ${card(
      `<div class="ty-health">
  ${healthRow(' data-discount-row', `<span data-hicon>${spinner}</span>`, '<span data-htext>Checkout discount connects automatically when you activate an offer</span>')}
  ${healthRow('', `<span class="is-ok">${icons.success}</span>`, 'Price table added')}
  ${healthRow(' data-sync-row', `<span data-sicon>${icons.info}</span>`, '<span data-stext>Not synced yet</span>')}
</div>`,
      { title: `Store health${badge('All good', 'success is-plain')}`, attrs: 'data-health' },
    )}
  </div>
</div>`

const activateHead = `<style>
.k-page { max-width: 500px; padding: 8px 0 20px; }
.k-page-head { min-height: 30px; margin-bottom: 8px; }
.k-page-head h1 { font-size: 16px; line-height: 20px; }
.ty-head { align-items: flex-start; }
.ty-head .k-back { margin-top: -1px; }
.k-badge { gap: 3px; }
.k-badge svg { width: 11px; height: 11px; }
.k-badge.is-plain::before { display: none; }
.k-card-body { padding: 8px 12px; }
.k-card-title { display: flex; align-items: center; gap: 8px; margin: -8px -12px 8px; padding: 5px 12px; border-bottom: 1px solid var(--k-border); font-size: 12.5px; line-height: 18px; }
.k-card-title .k-badge, .ty-link { margin-left: auto; }
.ty-link { color: var(--k-focus); font-size: 11.5px; font-weight: 550; }
.k-cols { grid-template-columns: minmax(0, 1fr) 190px; gap: 10px; }
.k-table th, .k-table td { padding: 0 8px; }
.k-table td { height: 46px; font-size: 12.5px; }
.k-table th { font-size: 11.5px; }
.k-table .k-badge { font-size: 11.5px; }
.ty-coverage { margin-top: 8px; font-size: 12.5px; }
.ty-tierbadges { display: flex; flex-wrap: wrap; gap: 3px; }
.ty-tierbadges .k-badge { height: 19px; padding: 0 5px; border-radius: 6px; font-size: 10.5px; }
.ty-act { position: relative; display: inline-block; }
.ty-tip { position: absolute; z-index: 5; right: -4px; bottom: calc(100% + 3px); display: none; padding: 3px 8px; border-radius: 6px; background: #1a1a1a; color: #fff; font-size: 11px; font-weight: 550; line-height: 16px; white-space: nowrap; }
.ty-act:hover .ty-tip { display: block; }
.ty-act.is-quiet .ty-tip { display: none; }
.ty-act .k-btn svg { width: 17px; height: 17px; }
.ty-recents { display: grid; gap: 8px; }
.ty-recent { display: flex; align-items: center; gap: 8px; }
.ty-recent + .ty-recent { padding-top: 8px; border-top: 1px solid var(--k-border); }
.ty-recent b { display: block; font-size: 12.5px; line-height: 18px; }
.ty-health { display: grid; gap: 9px; font-size: 12px; line-height: 16px; }
.ty-hrow { display: flex; gap: 6px; }
.ty-hicon { display: grid; place-items: center; width: 16px; height: 16px; flex: none; color: var(--k-muted); }
.ty-hicon svg { width: 16px; height: 16px; }
.ty-hicon .is-ok, .ty-hicon .is-done { color: var(--k-success); }
.ty-hicon .is-done { animation: k-pop .42s cubic-bezier(.3, 1.6, .5, 1) both; }
</style>`

const activateScripts = `<script>
var q = function (selector) { return document.querySelector(selector) }
var act = q('[data-act]')
var tick = ${JSON.stringify(icons.success)}
var pause = ${JSON.stringify(pauseCircle)}
act.addEventListener('click', function () {
  act.classList.add('is-busy')
  act.parentNode.classList.add('is-quiet')
})
window.finishActivate = function () {
  act.classList.remove('is-busy')
  act.innerHTML = pause
  act.parentNode.querySelector('.ty-tip').textContent = 'Pause offer'
  var status = q('[data-status]')
  status.className = 'k-badge is-success is-plain is-pop'
  status.textContent = 'Live'
  q('[data-sub]').textContent = '2 offers · 1 active'
  stage.toast('Saved — activating shortly')
}
q('[data-back]').addEventListener('click', function () {
  document.querySelectorAll('.k-toast').forEach(function (node) { node.remove() })
  q('[data-view="list"]').hidden = true
  q('[data-view="home"]').hidden = false
})
window.connect = function () {
  q('[data-hicon]').outerHTML = '<span class="is-done">' + tick + '</span>'
  q('[data-htext]').textContent = 'Checkout discount is live and applying'
  q('[data-sicon]').outerHTML = '<span class="is-done">' + tick + '</span>'
  q('[data-stext]').textContent = 'Synced just now'
}
</script>`

const activatePage = () =>
  adminPage({
    app: APP,
    title: 'Volume offers',
    head: activateHead,
    body: `${listView}${homeView}`,
    scripts: activateScripts,
  })

const route = (pathname) => {
  if (pathname === '/admin/offers/new') return html(createPage())
  if (pathname === '/admin/offers') return html(activatePage())
  return null
}

export const tierlyAdminScenes = [
  {
    app: APP,
    name: 'create-offer',
    start: '/admin/offers/new',
    route,
    async play(rec) {
      await rec.hold(900)
      await rec.show({ x: 470, y: 330 })
      await rec.mark(1, '[data-basics]', { side: 'tl', pad: 5, radius: 14 })
      await rec.click('[data-name]', { move: 560, keepMarks: true })
      await rec.type('[data-name]', 'Bulk savings', { cps: 18 })
      await rec.hold(200)
      await rec.click('[data-applies="all"]', { move: 440 })
      await rec.hold(250)
      await rec.scroll(130, 360)
      await rec.mark(2, '[data-use="gentle"]', { side: 'tl', pad: 3, radius: 9 })
      await rec.click('[data-use="gentle"]', { move: 560 })
      await rec.settle(300)
      await rec.annotate([
        [1, '[data-applies-card]', { pad: 3, radius: 12 }],
        [2, '[data-presets]', { pad: 4, radius: 12 }],
        [3, '[data-save]', { side: 'bl', pad: 3, radius: 9 }],
      ])
      await rec.scroll(420, 460)
      await rec.click('.ty-tiers > :nth-child(2) [data-f="qty"]', { move: 520 })
      await rec.type('.ty-tiers > :nth-child(2) [data-f="qty"]', '3', { cps: 10 })
      await rec.click('.ty-tiers > :nth-child(3) [data-f="qty"]', { move: 420 })
      await rec.type('.ty-tiers > :nth-child(3) [data-f="qty"]', '6', { cps: 10 })
      await rec.click('.ty-tiers > :nth-child(3) [data-f="value"]', { move: 380 })
      await rec.type('.ty-tiers > :nth-child(3) [data-f="value"]', '18', { cps: 10 })
      await rec.hold(500)
      await rec.mark(3, '[data-save]', { side: 'bl', pad: 3, radius: 9 })
      await rec.click('[data-save]', { move: 620 })
      await rec.settle(900)
      await rec.hold(2200)
    },
  },
  {
    app: APP,
    name: 'activate-offer',
    start: '/admin/offers',
    route,
    async play(rec, page) {
      await rec.hold(1000)
      await rec.show({ x: 440, y: 330 })
      await rec.mark(1, '[data-row]', { side: 'tl', pad: 0, radius: 8 })
      await rec.hold(500)
      await rec.unmark()
      await rec.move('[data-act]', 620)
      await rec.mark(2, '[data-act]', { side: 'bl', pad: 4, radius: 10 })
      await rec.click('[data-act]', { move: 120 })
      await rec.settle(640)
      await page.evaluate(() => window.finishActivate())
      await rec.settle(560)
      await rec.mark(3, '.k-toast', { side: 'tl', pad: 4, radius: 14 })
      await rec.annotate([
        [1, '[data-row]', { pad: 0, radius: 8 }],
        [2, '[data-act]', { side: 'bl', pad: 4, radius: 10 }],
        [3, '.k-toast', { side: 'tl', pad: 4, radius: 14 }],
      ])
      await rec.hold(900)
      await rec.click('[data-back]', { move: 640 })
      await rec.settle(240)
      await rec.move({ x: 300, y: 330 }, 420)
      await rec.zoom('[data-health]', 1.6)
      await rec.settle(800)
      await page.evaluate(() => window.connect())
      await rec.settle(480)
      await rec.mark(3, '[data-discount-row]', { side: 'tl', pad: 5, radius: 9 })
      await rec.hold(2200)
    },
  },
]
