import { escape, fill, sceneFile } from './site.mjs'

export const APPS = {
  'combined-listings': { name: 'Solora: Combined Listings', icon: '/public/solora-combined-listings.png' },
  mixly: { name: 'Mixly', icon: '/public/solora-mixly.png' },
  tierly: { name: 'Solora Tierly: Quantity Breaks', icon: '/public/solora-tierly.png' },
}

const svg = (body, box = 16) => `<svg viewBox="0 0 ${box} ${box}" aria-hidden="true">${body}</svg>`

export const icons = {
  plus: svg('<path d="M8 3.5v9M3.5 8h9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'),
  search: svg('<circle cx="7" cy="7" r="4.6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m10.5 10.5 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'),
  check: svg('<path d="m3.5 8.4 2.9 2.9 6.1-6.6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'),
  x: svg('<path d="m4.5 4.5 7 7m0-7-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>'),
  back: svg('<path d="M9.8 3.5 5.3 8l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'),
  dots: svg('<circle cx="3.5" cy="8" r="1.3" fill="currentColor"/><circle cx="8" cy="8" r="1.3" fill="currentColor"/><circle cx="12.5" cy="8" r="1.3" fill="currentColor"/>'),
  drag: svg('<g fill="currentColor"><circle cx="6" cy="4" r="1.1"/><circle cx="10" cy="4" r="1.1"/><circle cx="6" cy="8" r="1.1"/><circle cx="10" cy="8" r="1.1"/><circle cx="6" cy="12" r="1.1"/><circle cx="10" cy="12" r="1.1"/></g>'),
  play: svg('<path d="M5.5 3.8v8.4L12 8Z" fill="currentColor"/>'),
  pause: svg('<path d="M5.5 4v8M10.5 4v8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>'),
  alert: svg('<path d="M8 2.2 14.3 13H1.7Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M8 6.2v3.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="11.2" r=".9" fill="currentColor"/>'),
  success: svg('<circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="m5.2 8.2 1.9 1.9 3.7-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'),
  info: svg('<circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 7.3v3.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="5" r=".9" fill="currentColor"/>'),
  refresh: svg('<path d="M12.8 6.2A5 5 0 1 0 13 9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13.2 3.2v3.2H10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'),
  chevron: svg('<path d="m4.5 6.3 3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'),
  external: svg('<path d="M9.5 2.8h3.7v3.7M13 3 8 8M11.5 9.5v3a.8.8 0 0 1-.8.8H3.5a.8.8 0 0 1-.8-.8V5.3a.8.8 0 0 1 .8-.8h3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>'),
  discount: svg('<path d="M8.6 2.5H13a.5.5 0 0 1 .5.5v4.4L7.6 13.3a1 1 0 0 1-1.4 0L2.7 9.8a1 1 0 0 1 0-1.4Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="10.6" cy="5.4" r="1.1" fill="currentColor"/>'),
}

const attrsOf = (attrs) => (attrs ? ` ${attrs}` : '')

export const button = (label, { variant, icon, attrs, disabled } = {}) =>
  `<button type="button" class="k-btn${variant ? ` is-${variant}` : ''}${label ? '' : ' is-icon'}"${attrsOf(attrs)}${disabled ? ' disabled' : ''}>${icon ? icons[icon] : ''}${label ?? ''}</button>`

export const badge = (label, tone, attrs) => `<span class="k-badge${tone ? ` is-${tone}` : ''}"${attrsOf(attrs)}>${label}</span>`

export const card = (body, { title, attrs, flush } = {}) =>
  `<div class="k-card"${attrsOf(attrs)}>${flush ? body : `<div class="k-card-body">${title ? `<h2 class="k-card-title">${title}</h2>` : ''}${body}</div>`}</div>`

export const field = ({ label, value = '', placeholder = '', attrs, prefix, suffix, help, icon }) =>
  `<label class="k-field">${label ? `<span class="k-label">${label}</span>` : ''}<span class="k-input">${icon ? icons[icon] : ''}${prefix ? `<span class="k-affix">${prefix}</span>` : ''}<input value="${escape(value)}" placeholder="${escape(placeholder)}"${attrsOf(attrs)}>${suffix ? `<span class="k-affix">${suffix}</span>` : ''}</span>${help ? `<span class="k-help">${help}</span>` : ''}</label>`

export const select = ({ label, value, attrs }) =>
  `<div class="k-field">${label ? `<span class="k-label">${label}</span>` : ''}<span class="k-input k-select"${attrsOf(attrs)}>${value}</span></div>`

export const checkbox = ({ checked, attrs, label = '' } = {}) =>
  `<span class="k-choice${checked ? ' is-checked' : ''}"${attrsOf(attrs)}><span class="k-check">${icons.check}</span>${label}</span>`

export const radio = ({ checked, attrs, label = '' } = {}) =>
  `<span class="k-choice${checked ? ' is-checked' : ''}"${attrsOf(attrs)}><span class="k-radio"></span>${label}</span>`

export const segmented = (options, active, attrs) =>
  `<div class="k-seg"${attrsOf(attrs)}>${options.map((option) => `<button type="button" data-value="${option}"${option === active ? ' class="is-on"' : ''}>${option}</button>`).join('')}</div>`

export const toggle = ({ on, attrs } = {}) => `<button type="button" class="k-toggle" role="switch" aria-checked="${Boolean(on)}"${attrsOf(attrs)}></button>`

export const thumb = (art, { size } = {}) =>
  `<span class="k-thumb"${size ? ` style="width:${size}px;height:${size}px"` : ''}><img src="/art/${art}.svg" alt=""></span>`

export const dot = (color, attrs) => `<span class="k-dot" style="--c:${color}"${attrsOf(attrs)}></span>`

export const banner = ({ tone, title, body, actions = '', attrs }) =>
  `<div class="k-banner is-${tone}"${attrsOf(attrs)}><div class="k-banner-head">${icons[{ critical: 'alert', warning: 'alert', success: 'success', info: 'info' }[tone]]}${title}</div><div class="k-banner-body"><p>${body}</p>${actions ? `<div class="k-row">${actions}</div>` : ''}</div></div>`

export const modal = ({ id, title, body, footer = '', flush, width }) =>
  `<div class="k-overlay" id="${id}"><div class="k-modal"${width ? ` style="max-width:${width}px"` : ''}><div class="k-modal-head">${title}<span class="k-grow"></span><span class="k-modal-x">${icons.x}</span></div><div class="k-modal-body${flush ? ' is-flush' : ''}">${body}</div>${footer ? `<div class="k-modal-foot">${footer}</div>` : ''}</div></div>`

export const pageHead = ({ title, back, badges = '', actions = '' }) =>
  `<div class="k-page-head">${back ? `<span class="k-back">${icons.back}</span>` : ''}<h1>${title}</h1>${badges}<span class="k-grow"></span>${actions}</div>`

export const adminPage = ({ app, title, body, head = '', scripts = '', overlays = '' }) =>
  fill(sceneFile('kit/admin.html'), {
    title: escape(title),
    icon: APPS[app].icon,
    appName: APPS[app].name,
    body,
    head,
    scripts,
    overlays,
  })
