const shade = (hex, amount) => {
  const n = Number.parseInt(hex.slice(1), 16)
  const mix = (c) => Math.round(amount < 0 ? c * (1 + amount) : c + (255 - c) * amount)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(mix)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

const frame = (backdrop, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="${backdrop}"/><ellipse cx="200" cy="352" rx="120" ry="12" fill="#000" opacity=".06"/>${body}</svg>`

const tee = (color) =>
  frame(
    shade(color, 0.86),
    `<path d="M150 70 L110 84 L58 128 L88 176 L118 158 L118 330 Q200 344 282 330 L282 158 L312 176 L342 128 L290 84 L250 70 Q200 104 150 70 Z" fill="${color}"/>
    <path d="M150 70 Q200 104 250 70 L240 66 Q200 92 160 66 Z" fill="${shade(color, -0.28)}"/>
    <path d="M118 158 L118 330 Q140 334 160 336 L150 170 Z" fill="${shade(color, -0.12)}" opacity=".7"/>
    <path d="M58 128 L88 176 L96 171 L68 124 Z" fill="${shade(color, -0.22)}"/>
    <path d="M342 128 L312 176 L304 171 L332 124 Z" fill="${shade(color, -0.22)}"/>`,
  )

const hoodie = (color) =>
  frame(
    shade(color, 0.84),
    `<path d="M160 78 Q200 40 240 78 L296 96 L338 180 L310 196 L290 164 L290 334 Q200 348 110 334 L110 164 L90 196 L62 180 L104 96 Z" fill="${color}"/>
    <path d="M160 78 Q200 40 240 78 Q232 132 200 138 Q168 132 160 78 Z" fill="${shade(color, -0.25)}"/>
    <path d="M150 250 H250 V296 Q200 304 150 296 Z" fill="${shade(color, -0.14)}"/>
    <path d="M192 138 L188 196 M208 138 L212 196" stroke="${shade(color, 0.55)}" stroke-width="4" stroke-linecap="round"/>`,
  )

const tote = (color) =>
  frame(
    shade(color, 0.8),
    `<path d="M150 150 Q150 70 200 70 Q250 70 250 150" fill="none" stroke="${shade(color, -0.3)}" stroke-width="14"/>
    <path d="M100 140 H300 L318 336 H82 Z" fill="${color}"/>
    <path d="M100 140 H300 L302 162 H98 Z" fill="${shade(color, -0.12)}"/>
    <circle cx="200" cy="240" r="34" fill="none" stroke="${shade(color, -0.3)}" stroke-width="8"/>`,
  )

const cap = (color) =>
  frame(
    shade(color, 0.84),
    `<path d="M90 250 Q96 130 200 124 Q304 130 310 250 Z" fill="${color}"/>
    <path d="M60 252 H340 Q344 276 300 278 H100 Q56 276 60 252 Z" fill="${shade(color, -0.25)}"/>
    <path d="M200 124 V250" stroke="${shade(color, -0.18)}" stroke-width="5"/>
    <circle cx="200" cy="124" r="10" fill="${shade(color, -0.3)}"/>`,
  )

const boardPalettes = {
  aurora: ['#1F8A70', '#9BE3C8', '#F4F1DE'],
  midnight: ['#1C2340', '#5B6CFF', '#E8E9F3'],
  ember: ['#C2410C', '#FDBA74', '#FFF7ED'],
}

const boardShape = (base, stripe, light, view) => {
  const graphic =
    view === 'back'
      ? `<rect x="-26" y="-130" width="52" height="260" rx="26" fill="${light}" opacity=".9"/>`
      : `<path d="M-40 -150 L40 -60 L-40 30 L40 120" fill="none" stroke="${stripe}" stroke-width="22" stroke-linejoin="round"/><circle cx="0" cy="-90" r="10" fill="${light}"/>`
  return `<rect x="-52" y="-170" width="104" height="340" rx="52" fill="${base}"/>${graphic}<rect x="-52" y="-170" width="104" height="340" rx="52" fill="none" stroke="${shade(base, -0.3)}" stroke-width="5"/>`
}

const board = (name, view = 'front') => {
  const [base, stripe, light] = boardPalettes[name]
  if (view === 'detail')
    return frame(
      shade(base, 0.82),
      `<g transform="translate(200 230) scale(1.8) rotate(-30)"><rect x="-52" y="-170" width="104" height="340" rx="52" fill="${base}"/><path d="M-40 -150 L40 -60 L-40 30 L40 120" fill="none" stroke="${stripe}" stroke-width="22" stroke-linejoin="round"/><rect x="-36" y="-20" width="72" height="40" rx="10" fill="#111" opacity=".85"/></g>`,
    )
  if (view === 'scene')
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><rect width="400" height="400" fill="${shade(stripe, 0.7)}"/><path d="M0 260 L110 130 L180 210 L260 100 L400 250 V400 H0 Z" fill="${shade(base, 0.55)}"/><path d="M0 300 Q200 240 400 300 V400 H0 Z" fill="#fff"/><path d="M260 100 L290 132 L270 128 L250 142 L236 128 Z" fill="#fff"/><g transform="translate(200 318) rotate(-78) scale(.62)">${boardShape(base, stripe, light, 'front')}</g></svg>`
  const tilt = view === 'back' ? 16 : -16
  return frame(shade(base, 0.84), `<g transform="translate(200 196) rotate(${tilt})">${boardShape(base, stripe, light, view)}</g>`)
}

const stickers = () =>
  frame(
    '#F4EEF8',
    `<rect x="96" y="96" width="150" height="150" rx="30" fill="#7C3AED" transform="rotate(-10 171 171)"/>
    <circle cx="258" cy="196" r="70" fill="#F59E0B"/>
    <rect x="150" y="214" width="130" height="100" rx="50" fill="#10B981" transform="rotate(8 215 264)"/>
    <path d="M150 150 l18 36 40 6 -29 28 7 40 -36 -19 -36 19 7 -40 -29 -28 40 -6 Z" fill="#fff" opacity=".9"/>`,
  )

const wax = () =>
  frame(
    '#EEF6F5',
    `<rect x="120" y="120" width="160" height="200" rx="26" fill="#0E7490"/>
    <rect x="120" y="120" width="160" height="56" rx="26" fill="#155E75"/>
    <rect x="146" y="206" width="108" height="16" rx="8" fill="#A5F3FC"/>
    <rect x="146" y="236" width="70" height="12" rx="6" fill="#67E8F9" opacity=".7"/>`,
  )

export const colors = {
  red: '#C8372D',
  blue: '#2F5DA8',
  black: '#23232A',
  sand: '#D8C3A0',
  sage: '#7E9C82',
  navy: '#27365C',
  olive: '#6B6B3A',
  natural: '#E9DFC8',
  charcoal: '#3F4147',
}

export const art = (key) => {
  const [kind, name, view] = key.split('-')
  if (kind === 'tee') return tee(colors[name])
  if (kind === 'hoodie') return hoodie(colors[name])
  if (kind === 'tote') return tote(colors[name])
  if (kind === 'cap') return cap(colors[name])
  if (kind === 'board') return board(name, view)
  if (kind === 'stickers') return stickers()
  if (kind === 'wax') return wax()
  return null
}
