import { html, img, json, money, storePage } from '../lib/site.mjs'

const ACCENT = '#1a7f37'

const PRODUCT_TEXT = {
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

const catalogue = [
  { id: 11, handle: 'classic-tee', title: 'Classic Tee', art: 'tee-blue', price: 2400 },
  { id: 12, handle: 'canvas-tote', title: 'Canvas Tote', art: 'tote-natural', price: 3200 },
  { id: 13, handle: 'sticker-pack', title: 'Sticker Pack', art: 'stickers', price: 800 },
]

const products = catalogue.map(({ id, handle, title, art, price }) => ({
  id,
  handle,
  title,
  url: `/products/${handle}`,
  image: `/art/${art}.svg`,
  priceMax: price,
  variants: [{ id: id * 10 + 1, price, available: true, image: `/art/${art}.svg`, title: 'Default Title' }],
}))

const bundle = {
  id: 'weekend-set',
  type: 'FBT',
  mode: 'PERCENTAGE',
  value: 15,
  label: 'Weekend set',
  items: catalogue.map(({ id, handle }) => ({ productId: id, handle, quantity: 1 })),
}

const basePayload = (surface, blockId, settings, extra) => ({
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

const head = (blockId) =>
  `<link rel="stylesheet" href="/assets/mixly-blocks.css"><style>#mixly-${blockId}{--mx-accent:${ACCENT};--mx-accent-ink:${ACCENT};--mx-on-accent:#ffffff;--mx-radius:12px}</style>`

const mount = (blockId, payload) =>
  `<div id="mixly-${blockId}" class="mixly-mount" data-mixly-mount="${blockId}"></div><script type="application/json" data-mixly-payload="${blockId}">${json(payload)}</script>`

const runtime = '<script src="/assets/mixly-storefront.js"></script>'

const cartCount = (cart) => cart.reduce((sum, line) => sum + line.quantity, 0)

export const productPage = (cart, { withBlock = true } = {}) => {
  const [tee] = products
  const payload = basePayload('product', 'main', { text: PRODUCT_TEXT }, {
    product: { ...tee, selectedVariantId: tee.variants[0].id },
  })
  return storePage({
    title: tee.title,
    path: '/products/classic-tee',
    cartCount: cartCount(cart),
    head: `${head('main')}<style>.pdp{grid-template-columns:132px 1fr;gap:22px;align-items:center}.pdp-title{font-size:20px}.pdp-info .buy{margin-top:10px}.mixly-mount .mixly{margin:18px 0 0;padding-top:16px;border-top:1px solid var(--line)}</style>`,
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

const cartLine = (line) => {
  const product = products.find((entry) => entry.id === line.productId)
  return `<div class="cart-line"><span class="cart-thumb"><img src="${product.image}" alt=""></span><span class="cart-name">${product.title}<small>${money(line.price)}</small></span><span class="qty"><button type="button">&minus;</button><input value="${line.quantity}" aria-label="Quantity"><button type="button">+</button></span><span class="cart-amount">${money(line.price * line.quantity)}</span></div>`
}

const cartPage = (cart) => {
  const payload = basePayload('cart', 'cart', { text: CART_TEXT, maxOffers: 2 }, { cart })
  const subtotal = cart.reduce((sum, line) => sum + line.price * line.quantity, 0)
  return storePage({
    title: 'Your cart',
    path: '/cart',
    cartCount: cartCount(cart),
    head: `${head('cart')}<style>.mixly-mount .mixly{margin:12px 0 0}</style>`,
    main: `<div class="cart">
  <div>
    <h1>Your cart</h1>
    ${cart.map(cartLine).join('')}
    ${mount('cart', payload)}
  </div>
  <aside class="summary">
    <div class="summary-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
    <div class="summary-row total"><span>Estimated total</span><span>${money(subtotal)}</span></div>
    <p class="summary-note">Taxes, discounts and shipping calculated at checkout.</p>
    <button class="atc" type="button">Check out</button>
  </aside>
</div>`,
    scripts: runtime,
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

const route = (pathname, { state, request }) => {
  if (pathname === '/products/classic-tee') return html(productPage(state.cart))
  if (pathname === '/cart') return html(cartPage(state.cart))
  if (pathname === '/cart/add.js' && request.method() === 'POST') return addToCart(state, request.postData())
  return null
}

const teeLine = () => ({
  key: '111:line',
  productId: 11,
  variantId: 111,
  handle: 'classic-tee',
  price: 2400,
  quantity: 1,
  sellingPlanId: null,
})

export const mixlyScenes = [
  {
    app: 'mixly',
    name: 'bundle-offer',
    viewport: { width: 600, height: 400 },
    start: '/products/classic-tee',
    state: () => ({ cart: [] }),
    route,
    async play(rec, page) {
      await rec.hold(1300)
      await rec.scroll(206)
      await rec.still()
      await rec.hold(500)
      await rec.show({ x: 560, y: 150 })
      await rec.move('.mixly-btn', 760)
      await rec.hold(300)
      const loaded = page.waitForEvent('load')
      await rec.click(null)
      await rec.settle(320)
      await loaded
      await rec.settle(240)
      await rec.hold(2400)
    },
  },
  {
    app: 'mixly',
    name: 'cart-nudge',
    viewport: { width: 600, height: 560 },
    start: '/cart',
    state: () => ({ cart: [teeLine()] }),
    route,
    async play(rec, page) {
      await rec.hold(1300)
      await rec.show({ x: 560, y: 520 })
      await rec.move('.mixly-card-btn', 760)
      await rec.hold(300)
      const loaded = page.waitForEvent('load')
      await rec.click(null)
      await rec.settle(320)
      await loaded
      await rec.settle(240)
      await rec.hold(2400)
    },
    poster: 0,
  },
]
