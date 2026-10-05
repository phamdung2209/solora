import { colors } from '../lib/art.mjs'
import { html, img, json, money, storePage } from '../lib/site.mjs'

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

const compactCss = '<style>.pdp{grid-template-columns:150px 1fr;gap:22px;width:402px;margin:0 auto}.store-main{padding-top:12px}.pdp-title{font-size:19px}.pdp-label{margin-top:10px}.buy{margin-top:12px}</style>'

const chipCss = '<style>.pdp-label{display:flex;align-items:center;gap:4px;min-height:22px}.chip{margin-left:auto;padding:4px 10px;border-radius:999px;background:rgba(27,27,31,.9);color:#fff;font-size:10.5px;font-weight:600;letter-spacing:.01em;white-space:nowrap}.chip span{opacity:.62;font-weight:500}</style>'

const swapCss = '<style>.pdp-media img.is-swap{animation:swap .34s ease both}@keyframes swap{from{opacity:.2;transform:scale(1.04)}to{opacity:1;transform:none}}</style>'

const swapScript = (family) => {
  const { title, art, values } = families[family]
  const items = Object.fromEntries(values.map((value) => [`${family}-${value}`, { art: `${art}-${value}`, name: `${title} - ${label(value)}`, color: label(value) }]))
  return `<script>
const items = ${json(items)}
Object.values(items).forEach((item) => { new Image().src = '/art/' + item.art + '.svg' })
document.addEventListener('click', (event) => {
  const link = event.target.closest('.solora-cl a[data-handle]')
  if (!link) return
  event.preventDefault()
  const item = items[link.dataset.handle]
  document.querySelectorAll('.solora-cl a').forEach((node) => {
    node.classList.toggle('solora-cl__swatch--current', node === link)
    node.toggleAttribute('aria-current', node === link)
  })
  const image = document.querySelector('.pdp-media img')
  image.src = '/art/' + item.art + '.svg'
  image.classList.remove('is-swap')
  void image.offsetWidth
  image.classList.add('is-swap')
  document.querySelector('.pdp-title').textContent = item.name
  document.querySelector('.pdp-label b').textContent = item.color
  document.querySelector('.browser-url').lastChild.textContent = 'demo-store.example/products/' + link.dataset.handle
})
</script>`
}

export const productPage = (handle, { withRuntime = true, appearance = APPEARANCE, soldOut, chip, compact, swap, scripts = '' } = {}) => {
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
    head: `${head}${compact ? compactCss : ''}${chip ? chipCss : ''}${swap ? swapCss : ''}`,
    main: `<div class="pdp">
  <div class="pdp-media">${img(`${product.art}-${product.value}`, name)}</div>
  <div class="pdp-info">
    <div class="pdp-vendor">Demo Store</div>
    <h1 class="pdp-title">${name}</h1>
    <div class="pdp-price">${money(product.price)}</div>
    <div class="pdp-label">Color <b>${label(product.value)}</b>${chip ? `<span class="chip" data-chip>${chip}</span>` : ''}</div>
    <div data-solora-cl-mount="main"></div>
    ${sizes}
    ${buyForm(1)}
  </div>
</div>`,
    scripts: `${withRuntime ? runtime(payload) : ''}${soldOut ? `<script>document.addEventListener('DOMContentLoaded', function () { document.querySelector('.solora-cl a[data-handle="${soldOut}"]').classList.add('solora-cl__swatch--oos') })</script>` : ''}${swap ? swapScript(product.family) : ''}${scripts}`,
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
.store-main{padding-top:12px}.pdp{grid-template-columns:208px 1fr;gap:18px;width:446px;margin:0 auto}.pdp-title{font-size:18px}
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

const lookScript = `<style>.solora-cl__swatch{transition:width .3s ease,height .3s ease,border-radius .3s ease,opacity .3s ease}</style><script>
const radii = { circle: '50%', square: '0px', rounded: '8px' }
window.look = ({ shape, size, stock, label, value }) => {
  document.querySelectorAll('.solora-cl__swatch').forEach((node) => {
    node.style.width = node.style.height = size + 'px'
    node.style.borderRadius = radii[shape]
  })
  document.querySelector('.solora-cl').className = 'solora-cl solora-cl--oos-' + stock
  document.querySelector('[data-chip]').innerHTML = '<span>' + label + ' &middot;</span> ' + value
}
</script>`

const appearancePage = () =>
  productPage('classic-tee-red', {
    compact: true,
    appearance: { ...APPEARANCE, outOfStock: 'none' },
    soldOut: 'classic-tee-sand',
    chip: '<span>Swatch shape &middot;</span> Circle',
    scripts: lookScript,
  })

const routeWith = (options) => (pathname) => {
  if (pathname === '/appearance') return html(appearancePage())
  if (pathname === '/collections/new-in') return html(collectionPage())
  if (pathname === '/products/all-mountain-snowboard') return html(variantPage())
  const match = pathname.match(/^\/products\/([\w-]+)$/)
  const page = match && productPage(match[1], options)
  return page ? html(page) : null
}

const swatch = (handle) => `.solora-cl a[data-handle="${handle}"]`

const appearanceSteps = [
  ['Swatch shape', 'Square', { shape: 'square' }],
  ['Swatch shape', 'Rounded', { shape: 'rounded' }],
  ['Swatch size', '40px', { size: 40 }],
  ['Out of stock', 'Strike through', { stock: 'strike' }],
  ['Out of stock', 'Hide', { stock: 'hide' }],
  ['Out of stock', 'Dim', { stock: 'dim' }],
]

export const combinedListingsScenes = [
  {
    app: 'combined-listings',
    name: 'swatch-appearance',
    start: '/appearance',
    route: routeWith(),
    async play(rec, page) {
      await rec.hold(1400)
      await rec.zoom('.pdp', 1.35, { focus: { y: 0.54 } })
      await rec.hold(1000)
      let look = { shape: 'circle', size: 30, stock: 'none' }
      for (const [label, value, change] of appearanceSteps) {
        look = { ...look, ...change }
        await page.evaluate((state) => window.look(state), { ...look, label, value })
        await rec.settle(400)
        await rec.hold(1000)
      }
      await rec.unzoom()
      await rec.hold(2200)
    },
  },
  {
    app: 'combined-listings',
    name: 'pdp-swatches',
    start: '/products/classic-tee-red',
    route: routeWith({ compact: true, swap: true }),
    async play(rec) {
      await rec.hold(1500)
      await rec.show({ x: 520, y: 340 })
      await rec.zoom('.pdp', 1.35)
      await rec.hold(400)
      await rec.move(swatch('classic-tee-blue'), 680)
      await rec.hold(400)
      await rec.click(null)
      await rec.settle(400)
      await rec.hold(1500)
      await rec.move(swatch('classic-tee-black'), 520)
      await rec.hold(350)
      await rec.click(null)
      await rec.settle(400)
      await rec.hold(1700)
      await rec.unzoom()
      await rec.hold(2200)
    },
  },
  {
    app: 'combined-listings',
    name: 'collection-swatches',
    start: '/collections/new-in',
    route: routeWith({ compact: true }),
    async play(rec, page) {
      await rec.hold(2000)
      await rec.show({ x: 540, y: 350 })
      await rec.zoom('.grid__item:nth-child(2)', 1.4, { focus: { x: 0.42, y: 0.45 } })
      await rec.hold(300)
      await rec.move(swatch('everyday-hoodie-navy'), 640)
      await rec.hold(450)
      await rec.move(swatch('everyday-hoodie-charcoal'), 340)
      await rec.hold(450)
      await rec.move(swatch('everyday-hoodie-navy'), 340)
      await rec.hold(450)
      await rec.click(null, {
        after: async () => {
          await page.waitForURL('**/everyday-hoodie-navy')
          await page.evaluate(() => window.stage.set(window.stage.plan('.pdp', 1.35)))
        },
      })
      await rec.settle(500)
      await rec.hold(900)
      await rec.unzoom()
      await rec.hold(3000)
    },
    poster: 0,
  },
  {
    app: 'combined-listings',
    name: 'variant-images',
    start: '/products/all-mountain-snowboard',
    route: routeWith(),
    async play(rec) {
      await rec.hold(1500)
      await rec.show({ x: 540, y: 350 })
      await rec.zoom('.pdp', 1.3)
      await rec.hold(500)
      await rec.move('[data-variant="202"]', 700)
      await rec.hold(400)
      await rec.click(null)
      await rec.settle(400)
      await rec.hold(1700)
      await rec.move('[data-variant="203"]', 500)
      await rec.hold(350)
      await rec.click(null)
      await rec.settle(400)
      await rec.hold(1800)
      await rec.unzoom()
      await rec.hold(2200)
    },
  },
]
