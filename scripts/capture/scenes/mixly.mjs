import { checkoutPage } from '../lib/checkout.mjs'
import { html, img, json, money, storePage } from '../lib/site.mjs'

export const ACCENT = '#1a7f37'

export const PRODUCT_TEXT = {
  title: 'Frequently bought together',
  titleMix: 'Mix & match and save',
  titleBogo: 'Buy more, get more',
  button: 'Add bundle to cart',
  adding: 'Adding…',
  save: 'You save',
  saveTotal: 'in total',
  total: 'Total',
  this: 'This item',
  error: "Sorry, this bundle isn't available right now.",
  buyAny: 'Buy any',
  off: 'off',
  for: 'for',
  buy: 'Buy',
  get: 'Get',
  free: 'free',
  add: 'Add',
  more: 'more to unlock this offer',
  unlocked: 'Offer unlocked',
  moreItems: 'more products included',
}

const CART_TEXT = {
  title: 'Complete your bundle',
  button: 'Add',
  adding: 'Adding…',
  error: "Sorry, that item couldn't be added.",
  add: 'Add',
  more: 'more to unlock this offer',
  save: 'You save',
  saveTotal: 'in total',
  off: 'off',
  for: 'for',
  free: 'free',
  bogoQualify: 'You qualify — add your free item',
  unavailable: 'Sold out',
}

export const catalogue = [
  { id: 11, handle: 'classic-tee', title: 'Classic Tee', art: 'tee-blue', price: 2400 },
  { id: 12, handle: 'canvas-tote', title: 'Canvas Tote', art: 'tote-natural', price: 3200 },
  { id: 13, handle: 'sticker-pack', title: 'Sticker Pack', art: 'stickers', price: 800 },
]

const shopAll = [...catalogue, { id: 14, handle: 'everyday-hoodie', title: 'Everyday Hoodie', art: 'hoodie-sage', price: 5800 }]

export const products = catalogue.map(({ id, handle, title, art, price }) => ({
  id,
  handle,
  title,
  url: `/products/${handle}`,
  image: `/art/${art}.svg`,
  priceMax: price,
  variants: [{ id: id * 10 + 1, price, available: true, image: `/art/${art}.svg`, title: 'Default Title' }],
}))

export const bundle = {
  id: 'weekend-set',
  type: 'FBT',
  mode: 'PERCENTAGE',
  value: 15,
  label: 'Weekend set',
  items: catalogue.map(({ id, handle }) => ({ productId: id, handle, quantity: 1 })),
}

export const basePayload = (surface, blockId, settings, extra) => ({
  surface,
  blockId,
  designMode: false,
  currency: 'USD',
  cartCurrency: 'USD',
  country: null,
  moneyFormat: '${{amount}}',
  routes: { cartAdd: '/cart/add', cart: '/cart' },
  hasLiveBundles: true,
  bundles: [bundle],
  products,
  cart: [],
  product: null,
  settings: { bundleType: 'any', accentColor: ACCENT, radius: 12, showImages: true, showProgress: true, ...settings },
  ...extra,
})

export const widgetStyle = (blockId) =>
  `#mixly-${blockId}{--mx-accent:${ACCENT};--mx-accent-ink:${ACCENT};--mx-on-accent:#ffffff;--mx-radius:12px}`

const head = (blockId) => `<link rel="stylesheet" href="/assets/mixly-blocks.css"><style>${widgetStyle(blockId)}</style>`

export const mount = (blockId, payload) =>
  `<div id="mixly-${blockId}" class="mixly-mount" data-mixly-mount="${blockId}"></div><script type="application/json" data-mixly-payload="${blockId}">${json(payload)}</script>`

export const runtime = '<script src="/assets/mixly-storefront.js"></script>'

const cartCount = (cart) => cart.reduce((sum, line) => sum + line.quantity, 0)

export const productPage = (cart, { withBlock = true, narrow = false } = {}) => {
  const [tee] = products
  const payload = basePayload('product', 'main', { text: PRODUCT_TEXT }, {
    product: { ...tee, selectedVariantId: tee.variants[0].id },
  })
  return storePage({
    title: tee.title,
    path: '/products/classic-tee',
    cartCount: cartCount(cart),
    head: `${head('main')}<style>.pdp{grid-template-columns:132px 1fr;gap:22px;align-items:center}.pdp-title{font-size:20px}.pdp-info .buy{margin-top:10px}.mixly-mount .mixly{margin:18px 0 0;padding-top:16px;border-top:1px solid var(--line)}${narrow ? '.store-main{max-width:548px;margin:0 auto}' : ''}</style>`,
    main: `<div class="pdp">
  <div class="pdp-media">${img('tee-blue', 'Classic Tee')}</div>
  <div class="pdp-info">
    <div class="pdp-vendor">Demo Store</div>
    <h1 class="pdp-title">Classic Tee</h1>
    <div class="pdp-price">${money(2400)}</div>
    <form class="buy" action="/cart/add" onsubmit="return false"><input type="hidden" name="id" value="111"><span class="qty"><button type="button">&minus;</button><input name="quantity" value="1"><button type="button">+</button></span><button class="atc" type="button">Add to cart</button></form>
  </div>
</div>
${withBlock ? mount('main', payload) : ''}`,
    scripts: withBlock ? runtime : '',
  })
}

const collectionPage = (cart) =>
  storePage({
    title: 'Shop all',
    path: '/collections/all',
    cartCount: cartCount(cart),
    main: `<div class="grid-head"><h1>Shop all</h1><span>${shopAll.length} products</span></div>
<div class="grid">${shopAll
      .map(({ handle, title, art, price }) => `<a class="grid__item" href="/products/${handle}" data-card="${handle}"><span class="card-media">${img(art, title)}</span><span class="card-title">${title}</span><span class="card-price">${money(price)}</span></a>`)
      .join('')}</div>`,
  })

const cartLine = (line) => {
  const product = products.find((entry) => entry.id === line.productId)
  return `<div class="cart-line"><span class="cart-thumb"><img src="${product.image}" alt=""></span><span class="cart-name">${product.title}<small>${money(line.price)}</small></span><span class="qty"><button type="button">&minus;</button><input value="${line.quantity}" aria-label="Quantity"><button type="button">+</button></span><span class="cart-amount">${money(line.price * line.quantity)}</span></div>`
}

const cartPage = (cart, { nudge = true, style = '' } = {}) => {
  const payload = basePayload('cart', 'cart', { text: CART_TEXT, maxOffers: 2 }, { cart })
  const subtotal = cart.reduce((sum, line) => sum + line.price * line.quantity, 0)
  return storePage({
    title: 'Your cart',
    path: '/cart',
    cartCount: cartCount(cart),
    head: `${head('cart')}<style>.mixly-mount .mixly{margin:12px 0 0}${style}</style>`,
    main: `<div class="cart">
  <div>
    <h1>Your cart</h1>
    <div data-lines>${cart.map(cartLine).join('')}</div>
    ${nudge ? mount('cart', payload) : ''}
  </div>
  <aside class="summary">
    <div class="summary-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
    <div class="summary-row total"><span>Estimated total</span><span>${money(subtotal)}</span></div>
    <p class="summary-note">Taxes, discounts and shipping calculated at checkout.</p>
    <button class="atc" type="button" data-checkout onclick="location.href='/checkout'">Check out</button>
  </aside>
</div>`,
    scripts: nudge ? runtime : '',
  })
}

const addToCart = (state, body) => {
  for (const { id, quantity } of JSON.parse(body).items) {
    const product = products.find((entry) => entry.variants[0].id === id)
    const line = state.cart.find((entry) => entry.variantId === id)
    if (line) line.quantity += quantity
    else
      state.cart.push({
        key: `${id}:line`,
        productId: product.id,
        variantId: id,
        handle: product.handle,
        price: product.priceMax,
        quantity,
        sellingPlanId: null,
      })
  }
  return { contentType: 'application/json', body: '{}', delay: 1000 }
}

const checkout = (cart) => {
  const lines = cart.map(({ productId, quantity, price }) => {
    const { title, art } = catalogue.find((entry) => entry.id === productId)
    return { art, title, quantity, price }
  })
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0)
  return checkoutPage({ lines, discount: { label: bundle.label, amount: Math.round((subtotal * bundle.value) / 100) } })
}

const route = (pathname, { state, request }) => {
  if (pathname === '/collections/all') return html(collectionPage(state.cart))
  if (pathname === '/products/classic-tee') return html(productPage(state.cart, { narrow: state.narrow }))
  if (pathname === '/cart') return html(cartPage(state.cart, { style: state.style }))
  if (pathname === '/checkout') return html(checkout(state.cart))
  if (pathname === '/cart/add.js' && request.method() === 'POST') return addToCart(state, request.postData())
  return null
}

const lineOf = ({ id, handle, price }) => ({
  key: `${id * 10 + 1}:line`,
  productId: id,
  variantId: id * 10 + 1,
  handle,
  price,
  quantity: 1,
  sellingPlanId: null,
})

const [teeItem] = catalogue

export const reloaded = async (rec, page, action) => {
  const loaded = page.waitForEvent('load')
  await action()
  await rec.settle(320)
  await loaded
  await rec.settle(240)
}

export const markDone = async (rec, n, target, options) => {
  await rec.page.evaluate(
    ([value, selector, opts]) => {
      window.stage.mark(value, selector, opts)
      document.querySelectorAll('.k-ring').forEach((ring) => ring.classList.add('is-done'))
    },
    [n, target, options],
  )
  await rec.settle(480)
}

export const mixlyScenes = [
  {
    app: 'mixly',
    name: 'bundle-checkout',
    start: '/collections/all',
    state: () => ({ cart: [] }),
    route,
    async play(rec, page) {
      await rec.hold(1000)
      await rec.show({ x: 540, y: 320 })
      await rec.mark(1, '[data-card="classic-tee"]', { side: 'tl', pad: 6, radius: 14 })
      await reloaded(rec, page, () => rec.click('[data-card="classic-tee"]', { move: 700 }))
      await rec.hold(500)
      await rec.scroll(214, 480)
      await rec.mark(2, '.mixly-btn', { side: 'tl', radius: 12 })
      await rec.hold(300)
      await reloaded(rec, page, () => rec.click('.mixly-btn', { move: 560 }))
      await rec.hold(600)
      await rec.annotate([
        [1, '.cart-line:first-child .cart-thumb', { pad: 3, radius: 11 }],
        [2, '[data-lines]', { side: 'tr', pad: 4, radius: 10 }],
        [3, '[data-checkout]'],
      ])
      await rec.mark(3, '[data-checkout]', { side: 'tl' })
      await rec.hold(300)
      await reloaded(rec, page, () => rec.click('[data-checkout]', { move: 640 }))
      await rec.move({ x: 470, y: 350 }, 480)
      await rec.hold(300)
      await rec.zoom('[data-discount]', 2, { ms: 400 })
      await markDone(rec, null, '[data-discount]', { pad: 5, radius: 8 })
      await rec.hold(2600)
    },
  },
  {
    app: 'mixly',
    name: 'bundle-offer',
    start: '/products/classic-tee',
    state: () => ({ cart: [], narrow: true }),
    route,
    async play(rec, page) {
      await rec.hold(1500)
      await rec.scroll(214, 480)
      await rec.hold(600)
      await rec.still()
      await rec.show({ x: 560, y: 120 })
      await rec.zoom('.mixly', 1.2, { focus: { y: 0.8 } })
      await rec.move('.mixly-card:nth-of-type(2)', 560)
      await rec.hold(800)
      await rec.move('.mixly-card:nth-of-type(3)', 460)
      await rec.hold(800)
      await rec.move('.mixly-btn', 560)
      await rec.hold(400)
      await reloaded(rec, page, () => rec.click(null))
      await rec.hold(2900)
    },
  },
  {
    app: 'mixly',
    name: 'cart-nudge',
    start: '/cart',
    state: () => ({ cart: [lineOf(teeItem)], style: '.store-main{padding-top:10px}.cart h1{display:none}.cart-line:first-of-type{border-top:0}.cart-line{padding:6px 0}.cart-thumb{width:42px;height:42px}' }),
    route,
    async play(rec, page) {
      await rec.hold(1600)
      await rec.still()
      await rec.show({ x: 540, y: 330 })
      await rec.move('.mixly-card-btn', 700)
      await rec.hold(500)
      await reloaded(rec, page, () => rec.click(null))
      await rec.hold(1600)
      await rec.scroll(120, 420)
      await rec.move('.mixly-card-btn', 480)
      await rec.hold(500)
      await reloaded(rec, page, () => rec.click(null))
      await rec.hold(2600)
    },
  },
]
