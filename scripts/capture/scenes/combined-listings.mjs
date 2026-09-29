import { colors } from '../lib/art.mjs'
import { html, img, json, money, ORIGIN, storePage } from '../lib/site.mjs'

const APPEARANCE = { swatchShape: 'circle', swatchSize: 30, swatchRadius: 4, outOfStock: 'dim' }
const MODULES = ['pdpSwatches', 'cardSwatches', 'variantImages']

const families = {
  'classic-tee': { title: 'Classic Tee', art: 'tee', price: 2400, values: ['red', 'blue', 'black', 'sand'] },
  'everyday-hoodie': { title: 'Everyday Hoodie', art: 'hoodie', price: 5800, values: ['sage', 'navy', 'charcoal'] },
  'canvas-tote': { title: 'Canvas Tote', art: 'tote', price: 3200, values: ['natural', 'olive', 'black'] },
  'dad-cap': { title: 'Dad Cap', art: 'cap', price: 2200, values: ['navy', 'sand', 'red'] },
}

const label = (value) => value[0].toUpperCase() + value.slice(1)

const parse = (handle) => {
  const family = Object.keys(families).find((key) => handle.startsWith(`${key}-`))
  return family ? { family, value: handle.slice(family.length + 1), ...families[family] } : null
}

const group = (family, current) => ({
  o: 'Color',
  v: label(current),
  m: families[family].values.map((value) => ({ h: `${family}-${value}`, v: label(value), t: 'color', s: colors[value] })),
})

const settings = { a: APPEARANCE, m: MODULES, t: null, c: null }

const runtime = (payload) =>
  `<script type="application/json" data-solora-cl>${json(payload)}</script><script src="/assets/solora-cl.js"></script>`

const head = '<link rel="stylesheet" href="/assets/solora-cl.css"><style>.pdp-info .solora-cl{margin:8px 0 0}</style>'

const sizes = '<div class="pdp-label">Size</div><div class="pills"><span class="pill">S</span><span class="pill is-on">M</span><span class="pill">L</span><span class="pill">XL</span></div>'

const buyForm = (variantId) =>
  `<form class="buy" action="/cart/add" onsubmit="return false"><input type="hidden" name="id" value="${variantId}"><span class="qty"><button type="button">&minus;</button><input name="quantity" value="1"><button type="button">+</button></span><button class="atc" type="button">Add to cart</button></form>`

export const productPage = (handle, { withRuntime = true, appearance = APPEARANCE, soldOut, chip } = {}) => {
  const product = parse(handle)
  if (!product) return null
  const payload = {
    surface: 'product',
    blockId: 'main',
    designMode: false,
    settings: { ...settings, a: appearance },
    product: { handle, group: group(product.family, product.value), variantImages: null },
    cards: [],
    anchor: null,
    explode: [],
  }
  const name = `${product.title} - ${label(product.value)}`
  return storePage({
    title: name,
    path: `/products/${handle}`,
    head: chip ? `${head}<style>.pdp-media{position:relative}.chip{position:absolute;left:10px;bottom:10px;padding:5px 10px;border-radius:999px;background:rgba(27,27,31,.88);color:#fff;font-size:11px;font-weight:600;letter-spacing:.01em;box-shadow:0 4px 14px -4px rgba(0,0,0,.35)}.chip span{opacity:.7;font-weight:500}</style>` : head,
    main: `<div class="pdp">
  <div class="pdp-media">${img(`${product.art}-${product.value}`, name)}${chip ? `<span class="chip">${chip}</span>` : ''}</div>
  <div class="pdp-info">
    <div class="pdp-vendor">Demo Store</div>
    <h1 class="pdp-title">${name}</h1>
    <div class="pdp-price">${money(product.price)}</div>
    <div class="pdp-label">Color <b>${label(product.value)}</b></div>
    <div data-solora-cl-mount="main"></div>
    ${sizes}
    ${buyForm(1)}
  </div>
</div>`,
    scripts: `${withRuntime ? runtime(payload) : ''}${soldOut ? `<script>document.addEventListener('DOMContentLoaded', function () { document.querySelector('.solora-cl a[data-handle="${soldOut}"]').classList.add('solora-cl__swatch--oos') })</script>` : ''}`,
  })
}

const featured = [
  ['classic-tee', 'red'],
  ['everyday-hoodie', 'sage'],
  ['canvas-tote', 'natural'],
  ['dad-cap', 'navy'],
]

const collectionPage = () => {
  const cards = featured.map(([family, value]) => ({
    handle: `${family}-${value}`,
    url: `/products/${family}-${value}`,
    group: group(family, value),
  }))
  const payload = { surface: 'collection', blockId: 'grid', designMode: false, settings: { ...settings, a: { ...APPEARANCE, swatchSize: 24 } }, product: null, cards, anchor: null, explode: [] }
  return storePage({
    title: 'New in',
    path: '/collections/new-in',
    head,
    main: `<div class="grid-head"><h1>New in</h1><span>4 products</span></div>
<ul class="grid" style="list-style:none;margin:0;padding:0">
${featured
  .map(([family, value]) => {
    const { title, art, price } = families[family]
    return `<li class="grid__item"><div class="card-wrapper"><a href="/products/${family}-${value}"><span class="card-media">${img(`${art}-${value}`, title)}</span><span class="card-title">${title}</span></a><span class="card-price">${money(price)}</span></div></li>`
  })
  .join('\n')}
</ul>`,
    scripts: runtime(payload),
  })
}

const boards = ['aurora', 'midnight', 'ember']
const views = ['front', 'back', 'detail', 'scene']
const mediaId = (board, view) => 1000 + boards.indexOf(board) * 10 + views.indexOf(view)

const variantPage = () => {
  const variantImages = Object.fromEntries(
    boards.map((board, index) => [
      `gid://shopify/ProductVariant/${201 + index}`,
      views.map((view) => `gid://shopify/MediaImage/${mediaId(board, view)}`),
    ]),
  )
  const payload = {
    surface: 'product',
    blockId: 'main',
    designMode: false,
    settings,
    product: { handle: 'all-mountain-snowboard', group: null, variantImages },
    cards: [],
    anchor: null,
    explode: [],
  }
  const media = boards
    .flatMap((board) =>
      views.map(
        (view) =>
          `<li class="product__media-item media-item" data-media-id="main-${mediaId(board, view)}">${img(`board-${board}-${view}`, `${label(board)} snowboard, ${view}`)}</li>`,
      ),
    )
    .join('')
  return storePage({
    title: 'All-Mountain Snowboard',
    path: '/products/all-mountain-snowboard',
    head: `${head}<style>
.pdp{grid-template-columns:244px 1fr}
.product__media-list{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:0;padding:0;list-style:none}
.media-item{aspect-ratio:1;border-radius:10px;overflow:hidden;background:var(--soft);animation:fade .28s ease}
@keyframes fade{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
</style>`,
    main: `<div class="pdp">
  <ul class="product__media-list">${media}</ul>
  <div class="pdp-info">
    <div class="pdp-vendor">Demo Store</div>
    <h1 class="pdp-title">All-Mountain Snowboard</h1>
    <div class="pdp-price">${money(42900)}</div>
    <div class="pdp-label">Design <b data-design>Aurora</b></div>
    <div class="pills" data-picker>${boards.map((board, index) => `<button type="button" class="pill${index ? '' : ' is-on'}" data-variant="${201 + index}">${label(board)}</button>`).join('')}</div>
    <div class="pdp-label">Size</div>
    <div class="pills"><span class="pill">150</span><span class="pill is-on">155</span><span class="pill">159</span></div>
    <form class="buy" action="/cart/add" onsubmit="return false"><select name="id" hidden>${boards.map((board, index) => `<option value="${201 + index}">${label(board)}</option>`).join('')}</select><span class="qty"><button type="button">&minus;</button><input name="quantity" value="1"><button type="button">+</button></span><button class="atc" type="button">Add to cart</button></form>
  </div>
</div>`,
    scripts: `${runtime(payload)}<script>
document.querySelector('[data-picker]').addEventListener('click', function (event) {
  var pill = event.target.closest('[data-variant]')
  if (!pill) return
  document.querySelectorAll('[data-picker] .pill').forEach(function (node) { node.classList.toggle('is-on', node === pill) })
  document.querySelector('[data-design]').textContent = pill.textContent
  var select = document.querySelector('[name="id"]')
  select.value = pill.dataset.variant
  select.dispatchEvent(new Event('change', { bubbles: true }))
})
</script>`,
  })
}

const looks = [
  { chip: '<span>Swatch shape &middot;</span> Circle', appearance: { ...APPEARANCE, outOfStock: 'none' } },
  { chip: '<span>Swatch shape &middot;</span> Square', appearance: { ...APPEARANCE, swatchShape: 'square', outOfStock: 'none' } },
  { chip: '<span>Swatch shape &middot;</span> Rounded', appearance: { ...APPEARANCE, swatchShape: 'rounded', swatchRadius: 8, outOfStock: 'none' } },
  { chip: '<span>Sold out &middot;</span> Strike through', appearance: { ...APPEARANCE, swatchShape: 'rounded', swatchRadius: 8, outOfStock: 'strike' } },
  { chip: '<span>Sold out &middot;</span> Dim', appearance: { ...APPEARANCE, outOfStock: 'dim' } },
]

const route = (pathname) => {
  const look = pathname.match(/^\/appearance\/(\d)$/)
  if (look) return html(productPage('classic-tee-red', { ...looks[look[1]], soldOut: 'classic-tee-sand' }))
  if (pathname === '/collections/new-in') return html(collectionPage())
  if (pathname === '/products/all-mountain-snowboard') return html(variantPage())
  const match = pathname.match(/^\/products\/([\w-]+)$/)
  const page = match && productPage(match[1])
  return page ? html(page) : null
}

const swatch = (handle) => `.solora-cl a[data-handle="${handle}"]`

export const combinedListingsScenes = [
  {
    app: 'combined-listings',
    name: 'swatch-appearance',
    start: '/appearance/0',
    route,
    async play(rec, page) {
      await rec.hold(1500)
      for (const index of [1, 2, 3, 4]) {
        await page.goto(`${ORIGIN}/appearance/${index}`)
        await rec.hold(1500)
      }
    },
  },
  {
    app: 'combined-listings',
    name: 'pdp-swatches',
    start: '/products/classic-tee-red',
    route,
    async play(rec, page) {
      await rec.hold(1400)
      await rec.show({ x: 560, y: 350 })
      await rec.move(swatch('classic-tee-blue'), 720)
      await rec.hold(360)
      await rec.click(null, { after: () => page.waitForURL('**/classic-tee-blue') })
      await rec.hold(1500)
      await rec.move(swatch('classic-tee-black'), 480)
      await rec.hold(300)
      await rec.click(null, { after: () => page.waitForURL('**/classic-tee-black') })
      await rec.hold(2000)
    },
  },
  {
    app: 'combined-listings',
    name: 'collection-swatches',
    start: '/collections/new-in',
    route,
    async play(rec, page) {
      await rec.hold(1500)
      await rec.show({ x: 520, y: 360 })
      await rec.move(swatch('everyday-hoodie-navy'), 760)
      await rec.hold(260)
      await rec.move(swatch('everyday-hoodie-charcoal'), 320)
      await rec.hold(260)
      await rec.move(swatch('everyday-hoodie-navy'), 320)
      await rec.hold(300)
      await rec.click(null, { after: () => page.waitForURL('**/everyday-hoodie-navy') })
      await rec.hold(2000)
    },
    poster: 0,
  },
  {
    app: 'combined-listings',
    name: 'variant-images',
    start: '/products/all-mountain-snowboard',
    route,
    async play(rec) {
      await rec.hold(1500)
      await rec.show({ x: 560, y: 360 })
      await rec.click('[data-variant="202"]', { move: 720 })
      await rec.settle(320)
      await rec.hold(1500)
      await rec.click('[data-variant="203"]', { move: 420 })
      await rec.settle(320)
      await rec.hold(2000)
    },
  },
]
