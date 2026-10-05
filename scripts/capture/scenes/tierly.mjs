import { Liquid } from 'liquidjs'

import { checkoutPage } from '../lib/checkout.mjs'
import { appFile, html, img, money, storePage } from '../lib/site.mjs'

const BLOCKS = 'extensions/theme-app-extension/blocks'

const engine = new Liquid()

engine.registerTag('schema', {
  parse(_, remainTokens) {
    for (let token = remainTokens.shift(); token; token = remainTokens.shift())
      if (token.name === 'endschema') return
  },
  render() {
    return ''
  },
})
engine.registerFilter('money', (cents) => money(Math.round(Number(cents))))
engine.registerFilter('t', (key) => key)
engine.registerFilter('asset_url', (name) => `/assets/tierly/${name}`)
engine.registerFilter('stylesheet_tag', (url) => `<link rel="stylesheet" href="${url}">`)

const block = (file) => {
  const source = appFile('Tierly', `${BLOCKS}/${file}`)
  const schema = JSON.parse(source.match(/\{%\s*schema\s*%\}([\s\S]*?)\{%\s*endschema\s*%\}/)[1])
  const defaults = Object.fromEntries(schema.settings.filter((setting) => setting.id).map((setting) => [setting.id, setting.default]))
  return { name: schema.name, template: engine.parse(source), defaults }
}

const tiers = [
  { qty: 2, type: 'percent', value: 5 },
  { qty: 3, type: 'percent', value: 10, highlight: true },
  { qty: 6, type: 'percent', value: 18 },
]

const rules = { all: { tiers } }

const PRICE = 2400
const VARIANT = 301

const product = {
  id: 30,
  title: 'Classic Tee - Black',
  price: PRICE,
  selected_or_first_available_variant: { id: VARIANT, price: PRICE },
  variants: [{ id: VARIANT, price: PRICE }],
}

const shop = { metafields: { tierly: { rules: { value: rules } } } }

const render = (file, scope, settings = {}) => {
  const { template, defaults } = block(file)
  return engine.render(template, {
    shop,
    request: { design_mode: false },
    block: { id: 'AbC123', settings: { ...defaults, ...settings } },
    ...scope,
  })
}

export const tierlyBlock = (settings) => render('price-table.liquid', { product, cart: { currency: { iso_code: 'USD' } } }, settings)

const qtyScript = `<script>
var setQuantity = function (input, value) {
  var setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set
  setter.call(input, String(value))
  input.dispatchEvent(new Event('input', { bubbles: true }))
  input.dispatchEvent(new Event('change', { bubbles: true }))
}
var swapCart = function () {
  return fetch('/cart').then(function (response) { return response.text() }).then(function (text) {
    var next = new DOMParser().parseFromString(text, 'text/html')
    document.querySelector('[data-cart]').replaceWith(next.querySelector('[data-cart]'))
    document.querySelector('.store-cart').replaceWith(next.querySelector('.store-cart'))
    document.querySelectorAll('.cart-upsell > div > div').forEach(function (row) { row.classList.add('ty-glow') })
  })
}
document.addEventListener('click', function (event) {
  var button = event.target.closest('[data-step]')
  if (!button) return
  var input = button.parentNode.querySelector('input')
  var next = Math.max(1, (parseInt(input.value, 10) || 1) + Number(button.dataset.step))
  setQuantity(input, next)
  if (button.dataset.line)
    fetch('/cart/change.js', { method: 'POST', body: JSON.stringify({ quantity: next }) }).then(swapCart)
})
</script>`

const noticeScript = `<script>
document.querySelector('.atc').addEventListener('click', function () {
  var quantity = parseInt(document.querySelector('[name="quantity"]').value, 10)
  fetch('/cart/add.js', { method: 'POST', body: JSON.stringify({ quantity: quantity }) }).then(function () {
    var cart = document.querySelector('.store-cart')
    cart.querySelector('b')?.remove()
    cart.insertAdjacentHTML('beforeend', '<b class="ty-pop">' + quantity + '</b>')
    document.querySelectorAll('[data-count]').forEach(function (node) { node.textContent = quantity })
    document.querySelector('[data-notice]').hidden = false
  })
})
</script>`

const noticeTick = '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="currentColor"/><path d="m4.8 8.3 2.2 2.2 4.2-4.6" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'

const notice = `<div class="ty-notice" data-notice hidden>
  <span class="ty-notice-text">${noticeTick}<span><b data-count>3</b> items added to your cart</span></span>
  <span class="ty-actions"><a class="ty-pill" href="/cart">View cart</a><a class="ty-pill is-dark" href="/checkout" data-checkout>Check out</a></span>
</div>`

const compactHead = `<style>
.store-main{padding:10px 24px}
.pdp{grid-template-columns:176px 1fr;gap:22px}
.pdp-title{font-size:20px}
.pdp-info .buy{margin-top:8px}
.pdp-info [id^="tierly-"]{margin:8px 0 0 !important}
.ty-pop{animation:k-pop .42s cubic-bezier(.3,1.6,.5,1) both}
.ty-notice{position:absolute;z-index:20;top:80px;left:222px;right:14px;display:grid;gap:8px;padding:10px 12px;border-radius:14px;background:#fff;box-shadow:0 0 0 1px rgba(0,0,0,.07),0 12px 28px -8px rgba(0,0,0,.32);animation:k-in .3s ease both}
.ty-actions{display:grid;grid-template-columns:1fr 1fr;gap:6px}
.ty-notice-text{display:flex;align-items:center;gap:7px;font-size:12px;font-weight:600;white-space:nowrap}
.ty-notice-text svg{width:16px;height:16px;flex:none;color:#1a7f37}
.ty-pill{display:grid;place-items:center;height:28px;padding:0 12px;border:1px solid #d6d3cd;border-radius:999px;background:#fff;font-size:11.5px;font-weight:600;white-space:nowrap}
.ty-pill.is-dark{border-color:var(--ink);background:var(--ink);color:#fff}
</style>`

const qty = (value, line = '') =>
  `<span class="qty"><button type="button" data-step="-1"${line && ' data-line="1"'}>&minus;</button><input name="${line ? 'updates[]' : 'quantity'}" value="${value}" aria-label="Quantity"><button type="button" data-step="1"${line && ' data-line="1"'}>+</button></span>`

export const productPage = async ({ withBlock = true, settings = { layout: 'cards' }, compact = false } = {}) =>
  storePage({
    title: product.title,
    path: '/products/classic-tee-black',
    head: `<style>.pdp{grid-template-columns:210px 1fr;gap:24px}.pdp-info .buy{margin-top:12px}.pdp-info [id^="tierly-"]{margin:14px 0 0 !important}</style>${compact ? compactHead : ''}`,
    main: `<div class="pdp">
  <div class="pdp-media">${img('tee-black', product.title)}</div>
  <div class="pdp-info">
    <div class="pdp-vendor">Demo Store</div>
    <h1 class="pdp-title">${product.title}</h1>
    <div class="pdp-price">${money(PRICE)}</div>
    <form class="buy" action="/cart/add" onsubmit="return false"><input type="hidden" name="id" value="${VARIANT}">${qty(1)}<button class="atc" type="button">Add to cart</button></form>
    ${withBlock ? await tierlyBlock(settings) : '<div data-block-slot></div>'}
  </div>
</div>${compact ? notice : ''}`,
    scripts: qtyScript + (compact ? noticeScript : ''),
  })

const reached = (quantity) => tiers.filter((tier) => quantity >= tier.qty).at(-1)

const discountOf = (quantity) => Math.round((PRICE * quantity * (reached(quantity)?.value ?? 0)) / 100)

const cartPage = async ({ quantity }) => {
  const discount = discountOf(quantity)
  const subtotal = PRICE * quantity
  const cart = {
    currency: { iso_code: 'USD' },
    item_count: quantity,
    total_discount: discount,
    items: [{ product_id: 30, variant_id: VARIANT, quantity, original_price: PRICE, product: { title: 'Classic Tee' } }],
  }
  const upsell = await render('cart-upsell.liquid', { cart })
  return storePage({
    title: 'Your cart',
    path: '/cart',
    cartCount: quantity,
    head: `<style>
.store-main{padding:14px 24px}
.cart-upsell > div{margin:14px 0 0 !important}
.ty-glow{animation:ty-glow .9s ease-out both}
@keyframes ty-glow{from{box-shadow:inset 0 0 0 40px rgba(26,127,55,.14)}to{box-shadow:inset 0 0 0 40px rgba(26,127,55,0)}}
.ty-pop{animation:k-pop .42s cubic-bezier(.3,1.6,.5,1) both}
</style>`,
    main: `<div class="cart" data-cart>
  <div>
    <h1>Your cart</h1>
    <div class="cart-line"><span class="cart-thumb">${img('tee-black', '')}</span><span class="cart-name">Classic Tee<small>Black / M</small></span>${qty(quantity, 'line')}<span class="cart-amount">${discount ? `<s>${money(subtotal)}</s>` : ''}${money(subtotal - discount)}</span></div>
    <div class="cart-upsell">${upsell}</div>
  </div>
  <aside class="summary">
    <div class="summary-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
    ${discount ? `<div class="summary-row"><span>Volume discount</span><span>&minus;${money(discount)}</span></div>` : ''}
    <div class="summary-row total"><span>Estimated total</span><span>${money(subtotal - discount)}</span></div>
    <p class="summary-note">Taxes and shipping calculated at checkout.</p>
    <button class="atc" type="button">Check out</button>
  </aside>
</div>`,
    scripts: qtyScript,
  })
}

const checkout = ({ quantity }) =>
  checkoutPage({
    lines: [{ art: 'tee-black', title: product.title, variant: 'M', quantity, price: PRICE }],
    discount: { kind: 'Discount', label: `Volume discount — ${reached(quantity).qty}+`, amount: discountOf(quantity) },
  }).replace('</head>', '<style>.co-row > span:last-child{white-space:nowrap}</style></head>')

const route = async (pathname, { state, request }) => {
  if (pathname === '/products/classic-tee-black') return html(await productPage({ compact: true }))
  if (pathname === '/cart') return html(await cartPage(state))
  if (pathname === '/checkout') return html(checkout(state))
  if (request.method() === 'POST' && ['/cart/change.js', '/cart/add.js'].includes(pathname)) {
    state.quantity = JSON.parse(request.postData()).quantity
    return { contentType: 'application/json', body: '{}', delay: pathname === '/cart/add.js' ? 180 : 350 }
  }
  return null
}

export const tierlyScenes = [
  {
    app: 'tierly',
    name: 'tier-ladder',
    start: '/products/classic-tee-black',
    route,
    async play(rec) {
      await rec.hold(1900)
      await rec.show({ x: 110, y: 322 })
      await rec.click('.buy [data-step="1"]', { move: 700 })
      await rec.settle(320)
      await rec.hold(1300)
      await rec.click(null)
      await rec.settle(320)
      await rec.hold(1600)
      await rec.click('[data-tier][data-qty="6"]', { move: 640 })
      await rec.settle(320)
      await rec.move({ x: 110, y: 322 }, 560)
      await rec.hold(2700)
    },
  },
  {
    app: 'tierly',
    name: 'cart-checkout',
    start: '/products/classic-tee-black',
    route,
    async play(rec, page) {
      await rec.hold(1100)
      await rec.show({ x: 110, y: 322 })
      await rec.mark(1, '.buy', { side: 'tl', pad: 3, radius: 22 })
      await rec.click('.buy [data-step="1"]', { move: 620, keepMarks: true })
      await rec.settle(240)
      await rec.click(null, { keepMarks: true })
      await rec.settle(320)
      await rec.click('.atc', { move: 520 })
      await rec.settle(560)
      await rec.mark(2, '[id^="tierly-"]', { side: 'tl', pad: 3, radius: 14 })
      await rec.hold(1100)
      await rec.unmark()
      await rec.mark(3, '[data-checkout]', { side: 't', radius: 16 })
      await rec.annotate([
        [1, '.buy', { pad: 3, radius: 22 }],
        [2, '[id^="tierly-"]', { pad: 3, radius: 14 }],
        [3, '[data-checkout]', { side: 't', radius: 16 }],
      ])
      const loaded = page.waitForEvent('load')
      await rec.click('[data-checkout]', { move: 600 })
      await loaded
      await rec.settle(320)
      await rec.move({ x: 560, y: 340 }, 420)
      await rec.hold(500)
      await rec.zoom('[data-discount]', 1.5)
      await rec.mark(3, '[data-discount]', { side: 'tl', pad: 5, radius: 8 })
      await rec.hold(2300)
    },
  },
  {
    app: 'tierly',
    name: 'cart-upsell',
    start: '/cart',
    state: () => ({ quantity: 2 }),
    route,
    async play(rec) {
      await rec.hold(1400)
      await rec.show({ x: 556, y: 340 })
      await rec.zoom('[data-cart] > div:first-child', 1.62, { focus: { y: 0.6 } })
      await rec.hold(2200)
      await rec.click('.cart-line [data-step="1"]', { move: 640 })
      await rec.settle(1000)
      await rec.hold(2000)
      await rec.unzoom()
      await rec.hold(2000)
    },
  },
]
