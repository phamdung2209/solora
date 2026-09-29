import { Liquid } from 'liquidjs'

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
document.querySelectorAll('[data-step]').forEach(function (button) {
  button.addEventListener('click', function () {
    var input = button.parentNode.querySelector('input')
    var next = Math.max(1, (parseInt(input.value, 10) || 1) + Number(button.dataset.step))
    var setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set
    setter.call(input, String(next))
    input.dispatchEvent(new Event('input', { bubbles: true }))
    input.dispatchEvent(new Event('change', { bubbles: true }))
    if (button.dataset.line) fetch('/cart/change.js', { method: 'POST', body: JSON.stringify({ quantity: next }) }).then(function () { location.reload() })
  })
})
</script>`

const qty = (value, line = '') =>
  `<span class="qty"><button type="button" data-step="-1"${line && ' data-line="1"'}>&minus;</button><input name="${line ? 'updates[]' : 'quantity'}" value="${value}" aria-label="Quantity"><button type="button" data-step="1"${line && ' data-line="1"'}>+</button></span>`

export const productPage = async ({ withBlock = true, settings = { layout: 'cards' } } = {}) =>
  storePage({
    title: product.title,
    path: '/products/classic-tee-black',
    head: '<style>.pdp{grid-template-columns:210px 1fr;gap:24px}.pdp-info .buy{margin-top:12px}.pdp-info [id^="tierly-"]{margin:14px 0 0 !important}</style>',
    main: `<div class="pdp">
  <div class="pdp-media">${img('tee-black', product.title)}</div>
  <div class="pdp-info">
    <div class="pdp-vendor">Demo Store</div>
    <h1 class="pdp-title">${product.title}</h1>
    <div class="pdp-price">${money(PRICE)}</div>
    <form class="buy" action="/cart/add" onsubmit="return false"><input type="hidden" name="id" value="${VARIANT}">${qty(1)}<button class="atc" type="button">Add to cart</button></form>
    ${withBlock ? await tierlyBlock(settings) : '<div data-block-slot></div>'}
  </div>
</div>`,
    scripts: qtyScript,
  })

const reached = (quantity) => tiers.filter((tier) => quantity >= tier.qty).at(-1)

const cartPage = async ({ quantity }) => {
  const tier = reached(quantity)
  const discount = tier ? Math.round((PRICE * quantity * tier.value) / 100) : 0
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
    head: '<style>.cart-upsell > div{margin:14px 0 0 !important}</style>',
    main: `<div class="cart">
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

const route = async (pathname, { state, request }) => {
  if (pathname === '/products/classic-tee-black') return html(await productPage())
  if (pathname === '/cart') return html(await cartPage(state))
  if (pathname === '/cart/change.js' && request.method() === 'POST') {
    state.quantity = JSON.parse(request.postData()).quantity
    return { contentType: 'application/json', body: '{}', delay: 350 }
  }
  return null
}

export const tierlyScenes = [
  {
    app: 'tierly',
    name: 'tier-ladder',
    viewport: { width: 600, height: 400 },
    start: '/products/classic-tee-black',
    route,
    async play(rec) {
      await rec.hold(1400)
      await rec.show({ x: 560, y: 380 })
      await rec.click('.buy [data-step="1"]', { move: 720 })
      await rec.settle(240)
      await rec.hold(900)
      await rec.click(null)
      await rec.settle(240)
      await rec.hold(1300)
      await rec.click('[data-tier][data-qty="6"]', { move: 560 })
      await rec.settle(240)
      await rec.hold(2200)
    },
  },
  {
    app: 'tierly',
    name: 'cart-upsell',
    viewport: { width: 600, height: 400 },
    start: '/cart',
    state: () => ({ quantity: 2 }),
    route,
    async play(rec, page) {
      await rec.hold(1600)
      await rec.show({ x: 560, y: 380 })
      await rec.move('.cart-line [data-step="1"]', 720)
      await rec.hold(260)
      const loaded = page.waitForEvent('load')
      await rec.click(null)
      await loaded
      await rec.settle(160)
      await rec.hold(2600)
    },
  },
]
