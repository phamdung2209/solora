import { adminPage, APPS, button, icons, toggle } from '../lib/kit.mjs'
import { fill, html, sceneFile } from '../lib/site.mjs'
import { productPage as clProduct } from './combined-listings.mjs'
import { productPage as mixlyProduct } from './mixly.mjs'
import { productPage as tierlyProduct } from './tierly.mjs'

const FRAME_WIDTH = 500

const previewStyle =
  '<style>.store-scroll{height:100vh}.store-header{padding:0 18px}.store-main{padding:16px 18px}.ed-selected{outline:2px solid #005bd3;outline-offset:3px;border-radius:4px}</style>'

const svg = (body) => `<svg viewBox="0 0 14 14" aria-hidden="true">${body}</svg>`
const stroke = 'fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"'

const glyphs = {
  Title: svg(`<path d="M3 3.5h8M7 3.5v7.5" ${stroke}/>`),
  Price: svg(`<path d="M7.6 2.5H11a.5.5 0 0 1 .5.5v3.4L6.6 11.3a1 1 0 0 1-1.4 0L2.7 8.8a1 1 0 0 1 0-1.4Z" ${stroke}/>`),
  'Quantity selector': svg(`<rect x="2" y="4" width="10" height="6" rx="1.6" ${stroke}/><path d="M5 7h4" ${stroke}/>`),
  'Buy buttons': svg(`<rect x="2" y="4" width="10" height="6" rx="3" ${stroke}/>`),
}

const anchors = { Title: '.pdp-title', Price: '.pdp-price', 'Quantity selector': '.buy', 'Buy buttons': '.buy' }

const chevronRight = svg(`<path d="m5.5 4 3 3-3 3" ${stroke}/>`)
const chevronDown = svg(`<path d="m4 5.5 3 3 3-3" ${stroke}/>`)

const dimEmbeds = [
  ['Store chat', 'Chat widget', '#cfe3ff'],
  ['Cookie banner', 'Consent app', '#ffe1c7'],
]

const embedPanel = ({ app, item }) => `<div class="panel-head">App embeds</div>
<div class="search">${icons.search}Search</div>
<div class="embeds">
  <div class="embed" data-embed><img class="app-icon" src="${APPS[app].icon}" alt=""><span class="embed-name"><b>${item}</b><small>${APPS[app].name}</small></span>${toggle({ attrs: 'data-toggle' })}</div>
  ${dimEmbeds.map(([name, owner, color]) => `<div class="embed is-dim"><i class="embed-chip" style="--c:${color}"></i><span class="embed-name"><b>${name}</b><small>${owner}</small></span>${toggle()}</div>`).join('')}
</div>`

const blockNode = ({ app, item }) =>
  `<div class="node is-block is-selected" data-block><span class="grip">${icons.drag}</span><img class="app-icon" src="${APPS[app].icon}" alt="">${item}</div>`

const picker = ({ app, item }) => `<div class="picker" data-picker>
    <div class="search">${icons.search}Search blocks</div>
    <div class="picker-group">Apps</div>
    <div class="picker-item" data-pick><img class="app-icon" src="${APPS[app].icon}" alt=""><span><b>${item}</b><small>${APPS[app].name}</small></span></div>
    <div class="picker-item is-dim"><i></i><span><b>Product reviews</b><small>Another app</small></span></div>
  </div>
  <template data-node>${blockNode({ app, item })}</template>`

const blockPanel = (scene) => `<div class="tree" data-tree>
  <div class="tree-group">Template</div>
  <div class="node is-section">${chevronDown}Product information</div>
  <div data-rows>
    ${Object.keys(anchors).map((name) => `<div class="node is-child" data-anchor="${anchors[name]}">${glyphs[name]}${name}</div>`).join('')}
    ${scene.flow === 'drag' ? blockNode(scene) : '<div data-slot></div>'}
  </div>
  <div class="add-block" data-add>${icons.plus}Add block</div>
  <div class="node is-section">${chevronRight}Related products</div>
  <div class="tree-group">Footer</div>
  <div class="node is-section">${chevronRight}Footer</div>
  ${scene.flow === 'add' ? picker(scene) : ''}
</div>`

const frameTag = (scene, state) => {
  const attrs = [`data-state="${state}"`, `src="/preview/${scene.app}/${scene.name}/${state}"`]
  if (state === Object.keys(scene.previews)[0]) attrs.push('class="is-active"')
  if (scene.focus && state === 'on') attrs.push(`data-focus="${scene.focus}"`)
  if (scene.start) attrs.push(`data-start="${scene.start}"`)
  if (scene.reveal && state === 'on') attrs.push(`data-reveal="${scene.reveal}"`)
  return `<iframe title="Store preview" ${attrs.join(' ')}></iframe>`
}

const editorPage = (scene) => {
  const embed = scene.flow === 'toggle'
  return fill(sceneFile('editor.html'), {
    exit: icons.back,
    chevron: icons.chevron,
    theme: scene.theme,
    template: 'Default product',
    save: button('Save', { variant: 'primary', attrs: 'data-save', disabled: true }),
    sectionsOn: embed ? '' : ' is-on',
    embedsOn: embed ? ' is-on' : '',
    panel: embed ? embedPanel(scene) : blockPanel(scene),
    frameWidth: FRAME_WIDTH,
    frames: Object.keys(scene.previews)
      .map((state) => frameTag(scene, state))
      .join(''),
  })
}

const ring = (done, total) => {
  const length = 2 * Math.PI * 15
  return `<span class="sg-ring"><svg viewBox="0 0 36 36"><circle class="track" cx="18" cy="18" r="15"/><circle class="value" cx="18" cy="18" r="15" stroke-dasharray="${length}" stroke-dashoffset="${length * (1 - done / total)}"/></svg><span>${done}/${total}</span></span>`
}

const stepRow = (step) => `<li class="sg-step${step.done ? ' is-done' : ''}${step.help ? ' is-open' : ''}">
  <div class="sg-step-head"><span class="sg-mark">${step.done ? icons.check : ''}</span><span class="sg-step-title">${step.label}</span><span class="sg-meta">${step.meta}</span></div>
  ${step.help ? `<div class="sg-body"><p>${step.help}</p><div class="sg-actions">${button(step.action, { variant: 'primary', attrs: 'data-open' })}${button('Watch how', { variant: 'plain', icon: 'play' })}</div></div>` : ''}
</li>`

const introPage = (scene) => {
  const done = scene.steps.filter((step) => step.done).length
  return adminPage({
    app: scene.app,
    title: 'Home',
    head: '<link rel="stylesheet" href="/scene/editor.css">',
    body: `<div class="k-card sg">
  <div class="sg-head">${ring(done, scene.steps.length)}<div class="sg-title"><h2>${scene.heading}</h2><p>${scene.subtitle}</p></div><span class="sg-time">${scene.left}</span></div>
  <div class="sg-seg">${scene.steps.map((step) => `<span${step.done ? ' class="is-on"' : ''}></span>`).join('')}</div>
  <ol class="sg-steps">${scene.steps.map(stepRow).join('')}</ol>
</div>`,
    scripts: `<script>document.querySelector('[data-open]').addEventListener('click', function () { location.href = '/editor/${scene.app}/${scene.name}' })</script>`,
  })
}

const scenes = [
  {
    app: 'combined-listings',
    name: 'theme-editor',
    flow: 'toggle',
    theme: 'Dawn',
    item: 'Combined Listings',
    heading: 'Setup guide',
    subtitle: 'A few steps to get swatches live on your storefront.',
    left: 'About 4 min left',
    steps: [
      { label: 'Create your first group', meta: '1 group created', done: true },
      {
        label: 'Turn on the app embed',
        meta: '1 min',
        help: 'Switch the app on in your theme so swatches actually appear on the storefront.',
        action: 'Open theme editor',
      },
      { label: 'Place the swatch block', meta: 'Optional' },
      { label: 'Set your swatch appearance', meta: '2 min' },
    ],
    previews: {
      off: () => clProduct('classic-tee-red', { withRuntime: false }),
      on: () => clProduct('classic-tee-red'),
    },
  },
  {
    app: 'combined-listings',
    name: 'theme-block',
    flow: 'drag',
    theme: 'Dawn',
    item: 'Combined Listings',
    focus: '.solora-cl',
    start: '.buy',
    heading: 'Setup guide',
    subtitle: 'A few steps to get swatches live on your storefront.',
    left: 'About 3 min left',
    steps: [
      { label: 'Create your first group', meta: '1 group created', done: true },
      { label: 'Turn on the app embed', meta: 'On in your live theme', done: true },
      {
        label: 'Place the swatch block',
        meta: 'Optional',
        help: 'Optional — add the swatch block to your product template for more control over where it appears.',
        action: 'Open theme editor',
      },
      { label: 'Set your swatch appearance', meta: '2 min' },
    ],
    previews: { on: () => clProduct('classic-tee-red') },
  },
  {
    app: 'mixly',
    name: 'theme-editor',
    flow: 'add',
    theme: 'Dawn',
    item: 'Mixly bundle offer',
    focus: '#mixly-main',
    reveal: '#mixly-main',
    heading: 'Set up Mixly',
    subtitle: 'Four quick steps to get your first bundle discounting at checkout.',
    left: 'About 2 min left',
    steps: [
      { label: 'Create your first bundle', meta: '1 bundle created', done: true },
      { label: 'Activate it', meta: '1 bundle live', done: true },
      {
        label: 'Add Mixly to your product page',
        meta: '1 min',
        help: 'Bundles only show to shoppers after you add the Mixly block to your product template.',
        action: 'Open theme editor',
      },
      { label: 'See it work in a cart', meta: '1 min' },
    ],
    previews: {
      off: () => mixlyProduct([], { withBlock: false }),
      on: () => mixlyProduct([]),
    },
  },
  {
    app: 'mixly',
    name: 'theme-embed',
    flow: 'toggle',
    theme: 'Debut',
    item: 'Mixly (vintage themes)',
    reveal: '#mixly-main',
    heading: 'Set up Mixly',
    subtitle: 'Four quick steps to get your first bundle discounting at checkout.',
    left: 'About 2 min left',
    steps: [
      { label: 'Create your first bundle', meta: '1 bundle created', done: true },
      { label: 'Activate it', meta: '1 bundle live', done: true },
      {
        label: 'Turn on the Mixly embed',
        meta: '1 min',
        help: 'Bundles only show to shoppers after you turn on the Mixly (vintage themes) app embed.',
        action: 'Open theme editor',
      },
      { label: 'See it work in a cart', meta: '1 min' },
    ],
    previews: {
      off: () => mixlyProduct([], { withBlock: false }),
      on: () => mixlyProduct([]),
    },
  },
  {
    app: 'tierly',
    name: 'theme-editor',
    flow: 'drag',
    theme: 'Dawn',
    item: 'Tierly price table',
    focus: '[id^=tierly-]',
    previewCss: '.pdp{grid-template-columns:104px 1fr;gap:16px}',
    heading: 'Setup guide',
    subtitle: 'A few steps to start selling with volume pricing.',
    left: 'About 3 min left',
    steps: [
      { label: 'Create a volume pricing offer', meta: '1 offer created', done: true },
      { label: 'Activate an offer', meta: '1 offer active', done: true },
      {
        label: 'Add the price table to your product page',
        meta: '1 min',
        help: 'Shoppers only see your quantity breaks once the price table block is on your product template.',
        action: 'Add it for me',
      },
      { label: 'See it work in a cart', meta: '2 min' },
    ],
    previews: { on: () => tierlyProduct() },
  },
  {
    app: 'tierly',
    name: 'theme-embed',
    flow: 'toggle',
    theme: 'Debut',
    item: 'Tierly (vintage themes)',
    previewCss: '.pdp{grid-template-columns:104px 1fr;gap:16px}',
    heading: 'Setup guide',
    subtitle: 'A few steps to start selling with volume pricing.',
    left: 'About 3 min left',
    steps: [
      { label: 'Create a volume pricing offer', meta: '1 offer created', done: true },
      { label: 'Activate an offer', meta: '1 offer active', done: true },
      {
        label: 'Turn on the Tierly app embed',
        meta: '1 min',
        help: "Your theme can't host app blocks, so shoppers only see your quantity breaks once the Tierly embed is turned on under App embeds.",
        action: 'Turn on the embed',
      },
      { label: 'See it work in a cart', meta: '2 min' },
    ],
    previews: {
      off: () => tierlyProduct({ withBlock: false }),
      on: () => tierlyProduct(),
    },
  },
]

const byKey = Object.fromEntries(scenes.map((scene) => [`${scene.app}/${scene.name}`, scene]))

const route = async (pathname) => {
  const match = pathname.match(/^\/(admin|editor|preview)\/([\w-]+\/[\w-]+)(?:\/(\w+))?$/)
  const scene = match && byKey[match[2]]
  if (!scene) return pathname.startsWith('/assets/tierly/') ? { contentType: 'text/css', body: '' } : null
  if (match[1] === 'admin') return html(introPage(scene))
  if (match[1] === 'editor') return html(editorPage(scene))
  const page = await scene.previews[match[3]]()
  return html(page.replace('<body class="', '<body class="is-editor ').replace('</head>', `${previewStyle}${scene.previewCss ? `<style>${scene.previewCss}</style>` : ''}</head>`))
}

const intro = async (rec, page, { app, name }) => {
  await rec.hold(700)
  await rec.show({ x: 440, y: 290 })
  await rec.mark(1, '[data-open]', { side: 'tl' })
  await rec.click('[data-open]', { move: 560, after: () => page.waitForURL(`**/editor/${app}/${name}`) })
  await rec.hold(1100)
}

const outro = async (rec, marks) => {
  await rec.zoom('.canvas', 1.3, { focus: { x: 0.5, y: 0 } })
  await rec.hold(800)
  await rec.annotate(marks)
  await rec.mark(3, '[data-save]', { side: 'l' })
  await rec.click('[data-save]', { move: 600 })
  await rec.settle(900, 100)
  await rec.hold(2000)
}

const plays = {
  async toggle(rec, page, scene) {
    await intro(rec, page, scene)
    await rec.mark(2, '[data-toggle]', { side: 'tl', pad: 3, radius: 12 })
    await rec.click('[data-toggle]', { move: 640 })
    await rec.settle(300)
    await rec.hold(400)
    await outro(rec, [
      [1, '.panel-head'],
      [2, '[data-toggle]', { pad: 3, radius: 12 }],
      [3, '[data-save]', { side: 'l' }],
    ])
  },
  async add(rec, page, scene) {
    await intro(rec, page, scene)
    await rec.mark(2, '[data-add]', { side: 'tl', radius: 8 })
    await rec.click('[data-add]', { move: 640 })
    await rec.settle(240)
    await rec.mark(2, '[data-pick]', { side: 'tl' })
    await rec.click('[data-pick]', { move: 480 })
    await rec.settle(300)
    await rec.hold(500)
    await outro(rec, [
      [1, '[data-template]', { radius: 9, side: 'r' }],
      [2, '[data-block]', { radius: 9 }],
      [3, '[data-save]', { side: 'l' }],
    ])
  },
  async drag(rec, page, scene) {
    await intro(rec, page, scene)
    await rec.move('[data-block]', 640)
    await rec.mark(2, '[data-block]', { side: 'tl', radius: 9 })
    const price = await page.locator('[data-rows] .node').nth(1).boundingBox()
    await rec.drag('[data-block]', { x: price.x + price.width / 2, y: price.y + price.height + 2 }, { move: 160, ms: 900 })
    await rec.settle(300)
    await rec.hold(500)
    await outro(rec, [
      [1, '[data-template]', { radius: 9, side: 'r' }],
      [2, '[data-block]', { radius: 9 }],
      [3, '[data-save]', { side: 'l' }],
    ])
  },
}

export const editorScenes = scenes.map((scene) => ({
  app: scene.app,
  name: scene.name,
  start: `/admin/${scene.app}/${scene.name}`,
  route,
  play: (rec, page) => plays[scene.flow](rec, page, scene),
}))
