import { fill, html, sceneFile } from '../lib/site.mjs'
import { productPage as clProduct } from './combined-listings.mjs'
import { productPage as mixlyProduct } from './mixly.mjs'
import { productPage as tierlyProduct } from './tierly.mjs'

const ICONS = {
  'combined-listings': '/public/solora-combined-listings.png',
  mixly: '/public/solora-mixly.png',
  tierly: '/public/solora-tierly.png',
}

const search = '<div class="search"><svg viewBox="0 0 14 14"><circle cx="6" cy="6" r="4.2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="m9.2 9.2 3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>Search app embeds</div>'

const embedPanel = ({ icon, embed, listing, setting }) => `<div class="panel-head">App embeds</div>
${search}
<div class="embed">
  <div class="embed-row"><img class="app-icon" src="${icon}" alt=""><span class="embed-name"><b>${embed}</b><small>${listing}</small></span><button class="toggle" type="button" role="switch" aria-checked="false" data-toggle></button></div>
  <div class="embed-settings"><div class="field-label">${setting}</div><div class="field"></div></div>
</div>
<div class="muted-row"><i></i><span></span></div>
<div class="muted-row"><i></i><span></span></div>`

const glyph = '<svg viewBox="0 0 14 14"><rect x="2" y="3" width="10" height="8" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>'
const chevron = '<svg viewBox="0 0 14 14"><path d="m4 5.5 3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>'
const plus = '<svg viewBox="0 0 14 14"><circle cx="7" cy="7" r="5.6" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.6v4.8M4.6 7h4.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>'

const blockPanel = ({ icon, block, listing }) => `<div class="panel-head">Default product</div>
<div class="tree">
  <div class="tree-group">Template</div>
  <div class="node is-section">${chevron}Product information</div>
  ${['Title', 'Price', 'Quantity selector', 'Buy buttons'].map((name) => `<div class="node is-child">${glyph}${name}</div>`).join('')}
  <div data-slot></div>
  <div class="add-block" data-add>${plus}Add block</div>
  <div class="node is-section">${chevron}Related products</div>
  <div class="tree-group">Footer</div>
  <div class="node is-section">${chevron}Footer</div>
</div>
<div class="picker" data-picker>
  <div class="picker-tabs"><span>Theme</span><span class="is-on">Apps</span></div>
  <div class="picker-item" data-pick data-node="${`<img class=&quot;app-icon&quot; src=&quot;${icon}&quot; alt=&quot;&quot;>${block}`}"><img class="app-icon" src="${icon}" alt=""><span><b>${block}</b><small>${listing}</small></span></div>
  <div class="picker-item is-dim"><span class="app-icon" style="background:#f1f2f3"></span><span><b>Product reviews</b><small>Another app</small></span></div>
</div>`

const apps = {
  'combined-listings': {
    mode: 'embed',
    embed: 'Combined Listings',
    listing: 'Solora: Combined Listings',
    setting: 'Custom mount selector',
    preview: (on) => clProduct('classic-tee-red', { withRuntime: on }),
  },
  mixly: {
    mode: 'block',
    block: 'Mixly bundle offer',
    listing: 'Mixly',
    focus: '#mixly-main',
    preview: (on) => mixlyProduct([], { withBlock: on }),
  },
  tierly: {
    mode: 'block',
    block: 'Tierly price table',
    listing: 'Solora Tierly: Quantity Breaks',
    preview: (on) => tierlyProduct({ withBlock: on, settings: {} }),
  },
}

const editorPage = (app) => {
  const config = apps[app]
  const icon = ICONS[app]
  const embed = config.mode === 'embed'
  return fill(sceneFile('editor.html'), {
    mode: config.mode,
    template: 'Default product',
    sectionsOn: embed ? '' : ' is-on',
    embedsOn: embed ? ' is-on' : '',
    panel: embed ? embedPanel({ icon, ...config }) : blockPanel({ icon, ...config }),
    previewOff: `/preview/${app}/off`,
    previewOn: `/preview/${app}/on`,
    focus: config.focus ?? '',
  })
}

const route = async (pathname) => {
  const editor = pathname.match(/^\/editor\/([\w-]+)$/)
  if (editor && apps[editor[1]]) return html(editorPage(editor[1]))
  const preview = pathname.match(/^\/preview\/([\w-]+)\/(on|off)$/)
  if (preview && apps[preview[1]]) return html((await apps[preview[1]].preview(preview[2] === 'on')).replace('<body class="', '<body class="is-editor '))
  if (pathname.startsWith('/assets/tierly/')) return { contentType: 'text/css', body: '' }
  return null
}

const embedPlay = async (rec) => {
  await rec.hold(1300)
  await rec.show({ x: 520, y: 380 })
  await rec.click('[data-toggle]', { move: 820 })
  await rec.settle(240)
  await rec.hold(500)
  await rec.click('[data-save]', { move: 720 })
  await rec.settle(1300, 100)
  await rec.hold(2400)
}

const blockPlay = async (rec) => {
  await rec.hold(1300)
  await rec.show({ x: 520, y: 380 })
  await rec.click('[data-add]', { move: 760 })
  await rec.settle(240)
  await rec.hold(500)
  await rec.click('[data-pick]', { move: 480 })
  await rec.settle(1100, 100)
  await rec.hold(600)
  await rec.click('[data-save]', { move: 720 })
  await rec.settle(600, 100)
  await rec.hold(2400)
}

export const editorScenes = Object.entries(apps).map(([app, config]) => ({
  app,
  name: 'theme-editor',
  viewport: { width: 720, height: 450 },
  scale: 5 / 3,
  start: `/editor/${app}`,
  route,
  play: config.mode === 'embed' ? embedPlay : blockPlay,
}))
