import { BRAND, THREE, clay, gradient, label, mesh, rbox, sphere } from './studio.js'
import * as O from './objects.js'

const { group, place } = O

const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const span = (t, a, b) => clamp((t - a) / (b - a))
const outCubic = (x) => 1 - (1 - x) ** 3
const inCubic = (x) => x ** 3
const inOut = (x) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2)
const outBack = (x, k = 1.9) => 1 + (k + 1) * (x - 1) ** 3 + k * (x - 1) ** 2
const bump = (t, at, len = 220, amount = 0.1) => {
  const x = span(t, at, at + len)
  return x <= 0 || x >= 1 ? 0 : Math.sin(Math.PI * x) * amount * (1 - x * 0.3)
}

const random = (seed) => () => {
  seed |= 0
  seed = (seed + 0x6d2b79f5) | 0
  let r = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r
  return ((r ^ (r >>> 14)) >>> 0) / 4294967296
}

const frames = (end, step, holds = {}) => {
  const out = []
  for (let t = 0; t < end; t += step) out.push({ t, d: holds[t] ?? step })
  return out
}

const keep = (object) => {
  object.userData.base = { p: object.position.clone(), r: object.rotation.clone(), s: object.scale.clone() }
  return object
}

const pose = (object, { dx = 0, dy = 0, dz = 0, rx = 0, ry = 0, rz = 0, s = 1, sx = 1, sy = 1, sz = 1 } = {}) => {
  const b = object.userData.base
  object.position.set(b.p.x + dx, b.p.y + dy, b.p.z + dz)
  object.rotation.set(b.r.x + rx, b.r.y + ry, b.r.z + rz)
  object.scale.set(b.s.x * s * sx, b.s.y * s * sy, b.s.z * s * sz)
  object.visible = s * sx * sy * sz > 0.001
}

const ring = (radius, tube, material = gradient()) => {
  const m = mesh(new THREE.TorusGeometry(radius, tube, 24, 160), material, { cast: false })
  m.rotation.x = -Math.PI / 2
  return m
}

const confettiKinds = {
  tierly: [
    () => O.priceTag('', { width: 0.34, height: 0.2, material: gradient(O.SOFT) }),
    () => O.coin('%', { r: 0.15 }),
    () => mesh(rbox(0.2, 0.28, 0.2, 0.06), gradient()),
    () => mesh(rbox(0.18, 0.18, 0.18, 0.06), gradient(O.SOFT)),
  ],
  mixly: [
    () => O.giftBox({ size: 0.26 }),
    () => O.plus({ size: 0.24, arm: 0.1, depth: 0.05, bevel: 0.035 }),
    () => O.giftBox({ size: 0.22, paint: () => gradient(O.SOFT) }),
    () => O.tee({ size: 0.3, color: O.SWATCHES.coral }),
  ],
  swatchbox: [
    () => O.swatch(O.SWATCHES.coral, { r: 0.11 }),
    () => O.swatch(O.SWATCHES.teal, { r: 0.11 }),
    () => O.swatch(O.SWATCHES.violet, { r: 0.11 }),
    () => O.swatch(O.SWATCHES.sun, { r: 0.11 }),
    () => O.tee({ size: 0.3, color: O.SWATCHES.teal }),
  ],
}

const generic = [
  () => O.pill(0.1, 0.26, { depth: 0.04, bevel: 0.03, material: clay(BRAND[0]) }),
  () => O.pill(0.1, 0.26, { depth: 0.04, bevel: 0.03, material: clay(BRAND[2]) }),
  () => mesh(sphere(0.07, 32, 24), clay(BRAND[1])),
  () => O.sparkle(0.13, BRAND[0]),
  () => O.sparkle(0.11, BRAND[2]),
]

const burst = (root, app, { count = 22, seed = 7, origin = new THREE.Vector3(), speed = [3.2, 5.2], spread = [0.15, 0.85], scale = 1 } = {}) => {
  const rnd = random(seed)
  const kinds = [...confettiKinds[app], ...generic]
  return Array.from({ length: count }, (_, i) => {
    const piece = kinds[i % kinds.length]()
    const holder = group(piece)
    root.add(holder)
    const angle = Math.PI * (spread[0] + (spread[1] - spread[0]) * ((i + rnd() * 0.8) / count))
    const v = speed[0] + rnd() * (speed[1] - speed[0])
    return {
      holder,
      v: new THREE.Vector3(Math.cos(angle) * v * 1.15, Math.sin(angle) * v, -0.4 - rnd() * 1.2),
      spin: new THREE.Vector3((rnd() - 0.5) * 9, (rnd() - 0.5) * 9, (rnd() - 0.5) * 9),
      size: (0.85 + rnd() * 0.4) * scale,
      delay: rnd() * 90,
      life: 1150 + rnd() * 300,
      origin,
    }
  })
}

const flyConfetti = (pieces, t, start, gravity = 4.2) => {
  for (const p of pieces) {
    const local = t - start - p.delay
    if (local < 0 || local > p.life) {
      p.holder.visible = false
      continue
    }
    const s = local / 1000
    const drag = (1 - Math.exp(-1.6 * s)) / 1.6
    p.holder.visible = true
    p.holder.position.set(p.origin.x + p.v.x * drag, p.origin.y + p.v.y * drag - 0.5 * gravity * s * s * 0.55, p.origin.z + p.v.z * drag)
    p.holder.rotation.set(p.spin.x * s, p.spin.y * s, p.spin.z * s)
    const grow = outBack(span(local, 0, 160), 1.6)
    const shrink = 1 - inCubic(span(local, p.life - 380, p.life))
    p.holder.scale.setScalar(Math.max(0, grow * shrink * p.size))
  }
}

export const healthClear = (studio, app) => {
  const { root } = studio
  const T = 3600
  const hero = keep(group())
  const sh = O.shield({ width: 1.62, height: 1.94 })
  const tick = O.check({ size: 1.25, radius: 0.1 })
  tick.position.set(0.02, 0.0, sh.userData.face + 0.04)
  const tickHolder = keep(group(tick))
  tickHolder.position.z = 0
  sh.add(tickHolder)
  const shBox = new THREE.Box3().setFromObject(sh, true)
  sh.position.y = -shBox.min.y
  hero.add(sh)
  root.add(hero)

  const wave = ring(0.95, 0.05)
  wave.position.y = 0.02
  root.add(wave)

  const rest = [
    keep(place(O.sparkle(0.24, BRAND[0]), { x: -1.45, y: 2.05, z: 0.2, rz: 0.2 })),
    keep(place(O.sparkle(0.18, BRAND[2]), { x: 1.5, y: 2.25, z: -0.1, rz: -0.1 })),
    keep(place(O.sparkle(0.15, BRAND[1]), { x: 1.75, y: 0.8, z: 0.5, rz: 0.3 })),
    keep(place(O.sparkle(0.13, BRAND[0]), { x: -1.8, y: 0.75, z: 0.6, rz: 0.1 })),
  ]
  root.add(...rest)

  const pieces = burst(root, app, { count: 16, seed: app.length * 31 + 5, origin: new THREE.Vector3(0, 1.35, -0.35), speed: [2.3, 3.5], spread: [0.12, 0.88], scale: 1.6 })

  studio.fit({ margin: 0.05, box: new THREE.Box3(new THREE.Vector3(-2.3, 0, -0.4), new THREE.Vector3(2.3, 2.5, 1.25)) })
  studio.groundFade(new THREE.Vector3(0, 0, 0), 0.4, 0.9)

  studio.update = (t) => {
    const squash = inOut(span(t, 80, 380))
    const jump = span(t, 380, 980)
    const land = span(t, 980, 1260)
    const lift = Math.sin(Math.PI * outCubic(jump)) * 0.42 * (1 - jump * 0.15)
    let sx = 1 + 0.07 * squash
    let sy = 1 - 0.09 * squash
    if (jump > 0) {
      const k = 1 - outCubic(span(t, 380, 620))
      sx = 1 + 0.07 * k - 0.05 * Math.sin(Math.PI * span(t, 380, 760))
      sy = 1 - 0.09 * k + 0.08 * Math.sin(Math.PI * span(t, 380, 760))
    }
    if (land > 0 && land < 1) {
      const k = Math.sin(Math.PI * land)
      sx += 0.05 * k
      sy -= 0.06 * k
    }
    pose(hero, { dy: lift, sx, sy, sz: sx, ry: 0.35 * Math.sin(Math.PI * 2 * outCubic(span(t, 380, 1260))) * 0.18 })
    const pop = span(t, 430, 900)
    const tickScale = pop > 0 && pop < 1 ? 1 + 0.28 * Math.sin(Math.PI * pop) * (1 - pop * 0.4) : 1
    pose(tickHolder, { s: tickScale })

    for (const [ring, from, to, grow] of [[wave, 920, 1600, 0.62]]) {
      const w = span(t, from, to)
      const s = 1 + outCubic(w) * grow
      ring.visible = w > 0 && w < 1
      ring.scale.set(s, s, Math.max(1 - w, 0.001) * s)
    }

    rest.forEach((sp, i) => {
      const at = 520 + i * 170
      const tw = span(t, at, at + 900)
      const k = tw > 0 && tw < 1 ? Math.sin(Math.PI * tw) : 0
      pose(sp, { s: 1 + 0.55 * k, rz: 1.6 * outCubic(tw) })
    })
    flyConfetti(pieces, t, 470)
  }

  return {
    rest: 1150,
    plan: () => [...frames(2900, 50, { 0: 300 }), { t: 2900, d: 500 }],
  }
}

const voteArrow = () => {
  const a = O.arrowUp({ size: 0.32 })
  return keep(group(a))
}

export const featureHero = (studio, app) => {
  const { root } = studio
  const T = 6000
  const card = O.card(2.3, 1.6, { depth: 0.14, radius: 0.26, bevel: 0.07 })
  const face = 0.14
  const chip = O.card(0.66, 0.66, { depth: 0.05, radius: 0.18, bevel: 0.04, material: gradient() })
  chip.position.set(-2.3 / 2 + 0.52, 1.6 / 2 - 0.52, face)
  const bulbMark = O.bulb({ lit: false, size: 0.42, material: clay('#ffffff', { roughness: 0.3 }) })
  bulbMark.position.set(chip.position.x, chip.position.y - 0.24, face + 0.1)
  const title = O.bars([0.9, 0.62], { x0: -2.3 / 2 + 1.0, y0: 1.6 / 2 - 0.4, gap: 0.24, radius: 0.06, z: face })
  const body = O.bars([1.75, 1.45, 1.1], { x0: -2.3 / 2 + 0.28, y0: -0.05, gap: 0.22, radius: 0.045, z: face, material: clay(O.LILAC) })
  const thumb = glyphBadge(app)
  thumb.position.set(2.3 / 2 - 0.5, -1.6 / 2 + 0.42, face + 0.02)
  const cardGroup = keep(place(group(card, chip, bulbMark, title, body, thumb), { x: -0.55, y: 0.8 + 0.01, z: 0, ry: 0.16 }))
  root.add(cardGroup)

  const pillBody = O.pill(0.82, 1.5, { depth: 0.16, bevel: 0.08 })
  const pillArrow = O.arrowUp({ size: 0.4 })
  pillArrow.position.set(0, 0.32, 0.17)
  const count = O.counter(0.36, { fill: BRAND })
  count.position.set(0, -0.3, 0.165)
  const pill = keep(place(group(pillBody, pillArrow, count), { x: 1.55, y: 0.75 + 0.01, z: 0.35, ry: -0.22 }))
  root.add(pill)

  const badge = keep(place(O.badge({ r: 0.42 }), { x: 0.42, y: 1.72, z: 0.55, ry: 0.05 }))
  root.add(badge)
  const waveHolder = keep(place(group(), { x: 0.42, y: 1.72, z: 0.5 }))
  const halo = mesh(new THREE.TorusGeometry(0.5, 0.04, 24, 128), gradient(O.SOFT), { cast: false })
  waveHolder.add(halo)
  root.add(waveHolder)

  const arrows = Array.from({ length: 6 }, (_, i) => {
    const a = voteArrow()
    a.userData.lane = i
    root.add(a)
    return a
  })
  const sparks = [
    keep(place(O.sparkle(0.2, BRAND[0]), { x: -0.25, y: 2.1, z: 0.6, rz: 0.2 })),
    keep(place(O.sparkle(0.16, BRAND[2]), { x: 1.05, y: 2.25, z: 0.4, rz: -0.1 })),
    keep(place(O.sparkle(0.13, BRAND[1]), { x: 0.95, y: 1.15, z: 0.9, rz: 0.3 })),
  ]
  root.add(...sparks)
  const ambient = [
    keep(place(O.sparkle(0.22, BRAND[0]), { x: -1.95, y: 2.0, z: 0.1, rz: 0.2 })),
    keep(place(O.sparkle(0.15, BRAND[2]), { x: 2.25, y: 1.95, z: -0.2, rz: -0.2 })),
  ]
  root.add(...ambient)


  const voteStart = 1150
  const voteEnd = 3050
  const arrivals = arrows.map((_, i) => voteStart + 180 + i * 300)

  studio.update = (t, frame = t) => {
    const out = span(t, 5000, 5520)
    const exit = inCubic(out)

    const drop = span(t, 40, 660)
    const settle = span(t, 660, 940)
    const cardY = (1 - outCubic(drop)) * 3.2
    const squash = settle > 0 && settle < 1 ? Math.sin(Math.PI * settle) : 0
    const shipBump = bump(t, 3260, 260, 0.06)
    pose(cardGroup, { dy: cardY + exit * 0.2, sy: 1 - 0.06 * squash + shipBump * 0.5, sx: 1 + 0.04 * squash + shipBump * 0.3, s: drop > 0 ? 1 - exit : 0 })

    const rise = outBack(span(t, 520, 900), 2.2)
    const hit = arrivals.reduce((acc, at) => acc + bump(t, at, 200, 0.09), 0)
    pose(pill, { s: Math.max(rise * (1 - inCubic(span(t, 4950, 5400))), 0), sx: 1 + hit * 0.6, sy: 1 + hit })
    const progress = span(frame, voteStart + 150, voteEnd)
    count.userData.set(Math.round(outCubic(progress) * 128))

    arrows.forEach((a, i) => {
      const at = arrivals[i]
      const k = span(t, at - 520, at)
      const x = 1.55 + (i % 2 ? 0.55 : -0.5) * (1 - k) + (i % 3) * 0.06 * (1 - k)
      const y = 0.15 + outCubic(k) * 0.95
      const s = k <= 0 || k >= 1 ? 0 : outBack(span(t, at - 520, at - 360), 1.6) * (1 - inCubic(span(t, at - 120, at)))
      a.position.set(x, y, 0.75 + (i % 2) * 0.08)
      a.rotation.set(0, -0.22, (i % 2 ? 0.2 : -0.2) * (1 - k))
      a.scale.setScalar(s)
      a.visible = s > 0.001
    })

    const stamp = span(t, 3120, 3460)
    const bs = stamp <= 0 ? 0 : outBack(stamp, 2.4)
    pose(badge, { s: bs * (1 - inCubic(span(t, 4900, 5300))), rz: (1 - outCubic(stamp)) * -0.9, dy: (1 - outCubic(stamp)) * 0.5 })
    const hw = span(t, 3300, 3950)
    pose(waveHolder, { s: hw > 0 && hw < 1 ? 1 + outCubic(hw) * 1.2 : 0, sz: 1 })
    halo.scale.set(1, 1, Math.max(1 - hw, 0.001))

    sparks.forEach((sp, i) => {
      const tw = span(t, 3280 + i * 120, 3280 + i * 120 + 760)
      const k = tw > 0 && tw < 1 ? Math.sin(Math.PI * tw) : 0
      pose(sp, { s: k * 1.2, rz: 1.8 * outCubic(tw) })
    })
    ambient.forEach((sp, i) => {
      const k = outBack(span(t, 700 + i * 160, 1100 + i * 160), 1.6) * (1 - inCubic(span(t, 5000, 5400)))
      pose(sp, { s: k, rz: 0.6 * Math.sin((t / T) * Math.PI * 2 + i) })
    })
  }

  studio.update(4300)
  studio.fit({ margin: 0.07 })
  studio.groundFade(studio.bounds.center, 0.45, 1.0)

  return {
    rest: 4300,
    plan: () => {
      const list = []
      for (let t = 0; t < 3700; t += 50) list.push({ t, d: 50 })
      list.push({ t: 3700, d: 1300 })
      for (let t = 5000; t < 5600; t += 50) list.push({ t, d: 50 })
      list.push({ t: 5600, d: 350 })
      return list
    },
  }
}

const glyphBadge = (app) => {
  if (app === 'tierly') {
    const g = group()
    ;[0.18, 0.3, 0.44].forEach((h, i) => {
      const bar = mesh(rbox(0.13, h, 0.12, 0.06), i === 2 ? gradient() : i === 1 ? gradient(O.SOFT) : clay(O.WHITE))
      bar.position.set((i - 1) * 0.18, -0.22 + h / 2, 0.06)
      g.add(bar)
    })
    return g
  }
  if (app === 'mixly') return place(O.giftBox({ size: 0.4 }), { y: -0.28, z: 0.12, rx: 0.5, ry: 0.4 })
  const g = group()
  ;[O.SWATCHES.coral, O.SWATCHES.teal, O.SWATCHES.violet].forEach((c, i) => {
    const d = O.swatch(c, { r: 0.085, selected: i === 0 })
    d.position.set((i - 1) * 0.24, 0, 0.05)
    g.add(d)
  })
  return g
}
