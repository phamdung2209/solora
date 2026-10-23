import { BRAND, THREE, circlePath, clay, fitGradient, gradient, label, lathe, mesh, pillow, rbox, roundRect, shape, smoothPoints, sphere, textTexture, tube } from './studio.js'

export const WHITE = '#fbf8f6'
export const PEACH = '#ffe2d0'
export const BLUSH = '#ffd7e4'
export const LILAC = '#e4dde8'
export const INK = '#d9cfd9'
export const SUN = '#ffc04d'
export const SWATCHES = { coral: '#ff7a63', teal: '#2ebf9f', violet: '#7d6bf2', sun: '#ffbe3d', navy: '#34406b' }
export const SOFT = ['#ffd4b8', '#ffc0b8', '#ffc2d8']

export const group = (...children) => {
  const g = new THREE.Group()
  if (children.length) g.add(...children)
  return g
}

export const place = (object, { x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, s = 1 } = {}) => {
  object.position.set(x, y, z)
  object.rotation.set(rx, ry, rz)
  object.scale.setScalar(s)
  return object
}

const parts = (geometries, material) => {
  if (material.userData.gradient) {
    const box = new THREE.Box3()
    for (const g of geometries) {
      g.computeBoundingBox()
      box.union(g.boundingBox)
    }
    fitGradient(material, box)
    material.userData.fixed = true
  }
  return group(...geometries.map((g) => mesh(g, material)))
}

export const spindle = (length, width) => {
  const pts = []
  for (let i = 0; i <= 64; i++) {
    const y = -1 + (2 * i) / 64
    pts.push([Math.max(width * Math.pow(1 - Math.abs(y), 1.7), 0.0001), y * length])
  }
  pts[0][0] = 0
  pts[pts.length - 1][0] = 0
  return lathe(pts, 64)
}

export const sparkle = (size = 0.3, color = BRAND[0]) => {
  const material = clay(color, { roughness: 0.36 })
  const a = mesh(spindle(size, size * 0.27), material)
  const b = mesh(spindle(size, size * 0.27), material)
  b.rotation.z = Math.PI / 2
  return group(a, b, mesh(sphere(size * 0.18), material))
}

export const card = (w, h, { depth = 0.12, radius = 0.2, bevel = 0.06, material = clay(WHITE) } = {}) =>
  mesh(pillow(roundRect(w, h, radius), { depth, bevel, segments: 10 }), material)

export const pill = (w, h, o = {}) => card(w, h, { radius: Math.min(w, h) * 0.49, ...o })

export const lying = (object, y = 0) => {
  const g = group(object)
  object.rotation.x = -Math.PI / 2
  g.position.y = y
  return g
}

export const gear = ({ teeth = 8, radius = 1, tooth = 0.26, hole = 0.36, depth = 0.26, bevel = 0.075, material = gradient() } = {}) => {
  const pts = []
  for (let i = 0; i < 720; i++) {
    const a = (i / 720) * Math.PI * 2
    const p = THREE.MathUtils.smootherstep(Math.cos(teeth * a), -0.8, 0.8)
    const r = radius - tooth + tooth * p
    pts.push([Math.cos(a) * r, Math.sin(a) * r])
  }
  const s = shape(pts)
  s.holes.push(circlePath(hole))
  return mesh(pillow(s, { depth, bevel, segments: 12, curve: 96 }), material)
}

const roundCorners = (corners, r, steps = 14) => {
  const out = []
  for (let i = 0; i < corners.length; i++) {
    const p = new THREE.Vector2(...corners[i])
    const prev = new THREE.Vector2(...corners[(i + corners.length - 1) % corners.length])
    const next = new THREE.Vector2(...corners[(i + 1) % corners.length])
    const k = Math.min(Array.isArray(r) ? r[i] : r, p.distanceTo(prev) / 2, p.distanceTo(next) / 2)
    const a = p.clone().add(prev.clone().sub(p).setLength(k))
    const b = p.clone().add(next.clone().sub(p).setLength(k))
    for (let j = 0; j <= steps; j++) {
      const t = j / steps
      out.push([
        a.x * (1 - t) ** 2 + p.x * 2 * (1 - t) * t + b.x * t * t,
        a.y * (1 - t) ** 2 + p.y * 2 * (1 - t) * t + b.y * t * t,
      ])
    }
  }
  return out
}

export const priceTag = (text, { width = 1.15, height = 0.56, material = clay(WHITE), ink = BRAND, textColor, eyelet = gradient(SOFT) } = {}) => {
  const nose = height * 0.5
  const s = shape(roundCorners([[-width / 2, 0], [-width / 2 + nose, height / 2], [width / 2, height / 2], [width / 2, -height / 2], [-width / 2 + nose, -height / 2]], 0.13))
  const depth = 0.07
  const bevel = 0.045
  const face = depth / 2 + bevel
  const body = mesh(pillow(s, { depth, bevel, segments: 10 }), material)
  const ring = mesh(new THREE.TorusGeometry(0.062, 0.022, 24, 64), eyelet)
  ring.position.set(-width / 2 + height * 0.45, 0, face)
  const dot = mesh(new THREE.CircleGeometry(0.045, 48), clay('#c9b8c4'))
  dot.position.set(-width / 2 + height * 0.45, 0, face + 0.002)
  const words = label(text, height * 0.5, textColor ? { color: textColor, weight: 800 } : { fill: ink, weight: 800 })
  words.position.set(height * 0.2, 0, face + 0.003)
  return group(body, ring, dot, words)
}

export const tierSteps = ({ heights = [0.5, 0.88, 1.3], width = 0.86, depth = 0.86, gap = 0.1, materials } = {}) => {
  const g = group()
  const total = heights.length * width + (heights.length - 1) * gap
  const mats = materials ?? [clay(WHITE), gradient(SOFT), gradient()]
  heights.forEach((h, i) => {
    const box = mesh(rbox(width, h, depth, 0.19), mats[i % mats.length])
    box.position.set(-total / 2 + width / 2 + i * (width + gap), h / 2, 0)
    g.add(box)
  })
  g.userData.top = (i) => new THREE.Vector3(-total / 2 + width / 2 + i * (width + gap), heights[i], 0)
  return g
}

export const risingArrow = ({ material = gradient(), radius = 0.075 } = {}) => {
  const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0.1, 0.15, 0), new THREE.Vector3(0.82, 0.78, 0))
  const body = mesh(new THREE.TubeGeometry(curve, 160, radius, 32), material)
  const tail = mesh(sphere(radius, 32, 24), material)
  tail.position.copy(curve.getPoint(0))
  const head = mesh(lathe([[0, 0.34], [0.05, 0.3], [0.2, 0.05], [0.21, 0.0], [0.17, -0.03], [0, -0.03]], 96), material)
  const end = curve.getPoint(1)
  const dir = curve.getTangent(1)
  head.position.copy(end)
  head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
  return group(body, tail, head)
}

export const toggle = ({ on = true, material = gradient() } = {}) => {
  const track = pill(1.12, 0.6, { depth: 0.16, bevel: 0.08, material: on ? material : clay(LILAC) })
  const knob = mesh(sphere(0.24), clay('#ffffff', { roughness: 0.32 }))
  knob.scale.set(1, 1, 0.82)
  knob.position.set(on ? 0.26 : -0.26, 0, 0.17)
  return group(track, knob)
}

export const sliders = ({ values = [0.72, 0.38, 0.56], width = 1.7, height = 1.18 } = {}) => {
  const base = card(width, height, { depth: 0.12, radius: 0.24, bevel: 0.06 })
  const g = group(base)
  const face = 0.06 + 0.06
  const len = width - 0.52
  values.forEach((v, i) => {
    const y = height / 2 - 0.3 - i * ((height - 0.6) / (values.length - 1))
    const x0 = -len / 2
    const track = parts(tube([[x0, y, face], [x0 + len, y, face]], 0.035, { corner: 0 }), clay(LILAC))
    const fill = parts(tube([[x0, y, face + 0.006], [x0 + len * v, y, face + 0.006]], 0.042, { corner: 0 }), gradient())
    const knob = mesh(sphere(0.105), clay('#ffffff', { roughness: 0.3 }))
    knob.scale.set(1, 1, 0.8)
    knob.position.set(x0 + len * v, y, face + 0.05)
    g.add(track, fill, knob)
  })
  return g
}

export const shield = ({ width = 1.36, height = 1.62, material = gradient(), depth = 0.3, bevel = 0.15 } = {}) => {
  const w = width / 2
  const top = height * 0.42
  const pts = roundCorners(
    [[-w, top], [0, top + height * 0.08], [w, top], [w * 0.98, -height * 0.05], [w * 0.5, -height * 0.42], [0, -height * 0.58], [-w * 0.5, -height * 0.42], [-w * 0.98, -height * 0.05]],
    [0.2, 0.5, 0.2, 0.42, 0.3, 0.16, 0.3, 0.42],
    20,
  )
  const m = mesh(pillow(shape(smoothPoints(pts, 2)), { depth, bevel, segments: 14 }), material)
  m.userData.face = depth / 2 + bevel
  return m
}

export const check = ({ size = 1, radius = 0.085, material = clay('#ffffff', { roughness: 0.3 }) } = {}) =>
  parts(tube([[-0.36 * size, 0.02 * size], [-0.1 * size, -0.24 * size], [0.38 * size, 0.27 * size]], radius, { corner: 0.06 * size }), material)

export const pulse = ({ width = 1.1, radius = 0.06, material = clay('#ffffff', { roughness: 0.3 }) } = {}) => {
  const w = width / 2
  return parts(
    tube([[-w, 0], [-w * 0.42, 0], [-w * 0.24, 0.2], [-w * 0.04, -0.32], [w * 0.18, 0.4], [w * 0.36, -0.1], [w * 0.5, 0], [w, 0]], radius, { corner: 0.05 }),
    material,
  )
}

export const disc = (r, h, { material = gradient(), round = 0.04 } = {}) => {
  const pts = [[0, -h / 2]]
  for (let i = 0; i <= 16; i++) {
    const a = -Math.PI / 2 + (i / 16) * Math.PI
    pts.push([r - round + Math.cos(a) * round, Math.sin(a) * (h / 2)])
  }
  pts.push([0, h / 2])
  return mesh(lathe(pts, 128), material)
}

export const badge = ({ r = 0.42, material = gradient(), icon = 'check' } = {}) => {
  const body = disc(r, 0.16, { material, round: 0.07 })
  body.rotation.x = Math.PI / 2
  const mark = icon === 'check' ? check({ size: r * 1.25, radius: r * 0.1 }) : icon
  mark.position.z = 0.09
  return group(body, mark)
}

export const coin = (text, { r = 0.36, material = gradient() } = {}) => {
  const body = disc(r, 0.13, { material, round: 0.06 })
  body.rotation.x = Math.PI / 2
  const words = label(text, r * 0.95, { color: '#ffffff', weight: 800 })
  words.position.z = 0.068
  return group(body, words)
}

export const plus = ({ size = 0.6, arm = 0.3, depth = 0.12, bevel = 0.06, material = gradient() } = {}) => {
  const a = size / 2
  const b = arm / 2
  const inner = arm * 0.32
  const pts = roundCorners([[-b, a], [b, a], [b, b], [a, b], [a, -b], [b, -b], [b, -a], [-b, -a], [-b, -b], [-a, -b], [-a, b], [-b, b]], [b * 0.98, b * 0.98, inner, b * 0.98, b * 0.98, inner, b * 0.98, b * 0.98, inner, b * 0.98, b * 0.98, inner])
  return mesh(pillow(shape(pts), { depth, bevel, segments: 10 }), material)
}

export const arrowUp = ({ size = 1, material = gradient() } = {}) => {
  const s = size
  const pts = roundCorners(
    [[0, 0.56 * s], [0.52 * s, 0.02 * s], [0.21 * s, 0.02 * s], [0.21 * s, -0.5 * s], [-0.21 * s, -0.5 * s], [-0.21 * s, 0.02 * s], [-0.52 * s, 0.02 * s]],
    [0.24 * s, 0.14 * s, 0.16 * s, 0.14 * s, 0.14 * s, 0.16 * s, 0.14 * s],
  )
  return mesh(pillow(shape(pts), { depth: 0.16 * s, bevel: 0.085 * s, segments: 12 }), material)
}

export const teeShape = () =>
  smoothPoints(
    [[-0.16, 0.5], [-0.43, 0.43], [-0.66, 0.2], [-0.5, 0.0], [-0.35, 0.12], [-0.35, -0.5], [0.35, -0.5], [0.35, 0.12], [0.5, 0.0], [0.66, 0.2], [0.43, 0.43], [0.16, 0.5], [0.09, 0.41], [0, 0.385], [-0.09, 0.41]],
    4,
  )

const shade = (hex, k) => new THREE.Color(hex).lerp(new THREE.Color(k > 0 ? '#ffffff' : '#3a1030'), Math.abs(k))

export const tee = ({ color = SWATCHES.coral, size = 1, material } = {}) => {
  const mat = material ?? clay(color, { roughness: 0.55, sheen: 0.6 })
  const body = mesh(pillow(shape(teeShape().map(([x, y]) => [x * size, y * size])), { depth: 0.07 * size, bevel: 0.075 * size, segments: 12 }), mat)
  const face = 0.035 * size + 0.075 * size
  const collar = parts(
    tube([[-0.16 * size, 0.47 * size, face * 0.55], [-0.08 * size, 0.405 * size, face * 0.62], [0, 0.39 * size, face * 0.64], [0.08 * size, 0.405 * size, face * 0.62], [0.16 * size, 0.47 * size, face * 0.55]], 0.026 * size, { corner: 0.05 * size }),
    clay(shade(material ? '#f2b9a6' : color, -0.12), { roughness: 0.5 }),
  )
  return group(body, collar)
}

export const cap = ({ color = SWATCHES.violet, size = 1 } = {}) => {
  const s = size
  const mat = clay(color, { roughness: 0.5, sheen: 0.5 })
  const pts = []
  for (let i = 0; i <= 48; i++) {
    const a = (i / 48) * (Math.PI / 2)
    pts.push([Math.sin(a) * 0.42 * s, Math.cos(a) ** 0.85 * 0.4 * s])
  }
  pts.push([0.42 * s, 0], [0, 0])
  const crown = mesh(lathe(pts, 128), mat)
  crown.scale.set(1, 1, 1.05)
  const brimShape = new THREE.Shape()
  brimShape.moveTo(-0.4 * s, 0)
  brimShape.absellipse(0, 0, 0.4 * s, 0.36 * s, Math.PI, 2 * Math.PI, false)
  brimShape.quadraticCurveTo(0, 0.08 * s, -0.4 * s, 0)
  const brim = mesh(pillow(brimShape, { depth: 0.01 * s, bevel: 0.028 * s, segments: 6 }), clay(shade(color, -0.12), { roughness: 0.5 }))
  brim.rotation.x = -Math.PI / 2 + 0.3
  brim.position.set(0, 0.05 * s, 0.3 * s)
  const button = mesh(sphere(0.05 * s), mat)
  button.position.y = 0.4 * s
  const seam = parts(tube([[0, 0.4 * s, 0.02 * s], [0, 0.3 * s, 0.29 * s], [0, 0.12 * s, 0.42 * s]], 0.012 * s, { corner: 0.08 * s, caps: false }), clay(shade(color, -0.1)))
  return group(crown, brim, button, seam)
}

export const bottle = ({ color = SWATCHES.teal, size = 1 } = {}) => {
  const s = size
  const body = mesh(
    lathe([[0, -0.5 * s], [0.17 * s, -0.5 * s], [0.21 * s, -0.47 * s], [0.22 * s, -0.42 * s], [0.22 * s, 0.14 * s], [0.2 * s, 0.24 * s], [0.14 * s, 0.32 * s], [0.1 * s, 0.36 * s], [0.1 * s, 0.4 * s], [0, 0.4 * s]]),
    clay(color, { roughness: 0.34, clearcoat: 0.6 }),
  )
  const lid = mesh(lathe([[0, 0.38 * s], [0.115 * s, 0.38 * s], [0.125 * s, 0.4 * s], [0.125 * s, 0.5 * s], [0.11 * s, 0.53 * s], [0, 0.53 * s]]), clay(WHITE))
  const band = mesh(lathe([[0.222 * s, -0.12 * s], [0.228 * s, -0.1 * s], [0.228 * s, 0.04 * s], [0.222 * s, 0.06 * s]]), clay(shade(color, 0.55)))
  return group(body, lid, band)
}

export const giftBox = ({ size = 1, paint = () => gradient(), ribbon = clay('#ffffff', { roughness: 0.34 }) } = {}) => {
  const s = size
  const g = group()
  const body = mesh(rbox(0.9 * s, 0.7 * s, 0.9 * s, 0.1 * s), paint())
  body.position.y = 0.35 * s
  const lid = mesh(rbox(0.98 * s, 0.22 * s, 0.98 * s, 0.08 * s), paint())
  lid.position.y = 0.76 * s
  const bandA = mesh(rbox(0.17 * s, 0.7 * s, 0.92 * s, 0.03 * s), ribbon)
  bandA.position.y = 0.35 * s
  const bandB = mesh(rbox(0.92 * s, 0.7 * s, 0.17 * s, 0.03 * s), ribbon)
  bandB.position.y = 0.35 * s
  const lidA = mesh(rbox(0.17 * s, 0.235 * s, 1.0 * s, 0.04 * s), ribbon)
  lidA.position.y = 0.76 * s
  const lidB = mesh(rbox(1.0 * s, 0.235 * s, 0.17 * s, 0.04 * s), ribbon)
  lidB.position.y = 0.76 * s
  g.add(body, lid, bandA, bandB, lidA, lidB)
  for (const side of [-1, 1]) {
    const loop = mesh(new THREE.TorusGeometry(0.15 * s, 0.05 * s, 24, 64), ribbon)
    loop.scale.set(1, 0.62, 0.7)
    loop.rotation.set(0, side * 0.5, side * 0.62)
    loop.position.set(side * 0.13 * s, 0.94 * s, 0)
    g.add(loop)
  }
  const knot = mesh(sphere(0.07 * s), ribbon)
  knot.scale.set(1, 0.8, 1)
  knot.position.y = 0.9 * s
  g.add(knot)
  return g
}

export const bundleCard = (product, { w = 1.05, h = 1.05, material = clay(WHITE) } = {}) => {
  const base = card(w, h, { depth: 0.12, radius: 0.24, bevel: 0.07, material })
  product.position.z = 0.16
  return group(base, product)
}

export const swatch = (color, { r = 0.2, selected = false, ring = gradient() } = {}) => {
  const dot = mesh(sphere(r), clay(color, { roughness: 0.34, clearcoat: 0.5 }))
  dot.scale.set(1, 1, 0.55)
  const g = group(dot)
  if (selected) {
    const halo = mesh(new THREE.TorusGeometry(r * 1.38, r * 0.15, 24, 96), ring)
    g.add(halo)
  }
  return g
}

export const swatchFan = ({ colors = [SWATCHES.sun, SWATCHES.teal, SWATCHES.violet, SWATCHES.coral], spread = 0.34, w = 0.46, h = 1.3 } = {}) => {
  const g = group()
  const lift = 0.2
  colors.forEach((c, i) => {
    const chip = card(w, h, { depth: 0.035, radius: 0.17, bevel: 0.035, material: clay(c, { roughness: 0.4, clearcoat: 0.45 }) })
    chip.position.y = h / 2 - lift
    const strip = card(w - 0.14, 0.24, { depth: 0.01, radius: 0.07, bevel: 0.012, material: clay('#ffffff', { roughness: 0.5 }) })
    strip.position.set(0, h - lift - 0.25, 0.045)
    const pivot = group(chip, strip)
    pivot.rotation.z = (i - (colors.length - 1) / 2) * -spread
    pivot.position.z = i * 0.075
    g.add(pivot)
  })
  const rivet = disc(0.075, 0.12 + colors.length * 0.075, { material: gradient(), round: 0.03 })
  rivet.rotation.x = Math.PI / 2
  rivet.position.z = ((colors.length - 1) * 0.075) / 2
  g.add(rivet)
  return g
}

export const productCard = ({ garment = SWATCHES.coral, colors = [SWATCHES.coral, SWATCHES.teal, SWATCHES.violet, SWATCHES.sun], selected = 0, w = 1.5, h = 2.0 } = {}) => {
  const base = card(w, h, { depth: 0.12, radius: 0.24, bevel: 0.07 })
  const face = 0.06 + 0.07
  const panel = card(w - 0.24, w - 0.24, { depth: 0.02, radius: 0.16, bevel: 0.025, material: gradient(['#ffe9dd', '#ffdcdc', '#ffd9e8'], { roughness: 0.6, clearcoat: 0.1 }) })
  panel.position.set(0, h / 2 - 0.12 - (w - 0.24) / 2, face)
  const shirt = tee({ color: garment, size: 0.92 })
  shirt.position.set(0, panel.position.y + 0.02, face + 0.1)
  const g = group(base, panel, shirt)
  const row = group()
  const gap = 0.3
  colors.forEach((c, i) => {
    const d = swatch(c, { r: 0.1, selected: i === selected })
    d.position.set((i - (colors.length - 1) / 2) * gap, 0, 0)
    row.add(d)
  })
  row.position.set(0, -h / 2 + 0.24, face + 0.04)
  const title = parts(tube([[-w / 2 + 0.22, -h / 2 + 0.54, face], [-w / 2 + 0.9, -h / 2 + 0.54, face]], 0.045, { corner: 0 }), clay(INK))
  g.add(row, title)
  g.userData.row = row
  return g
}

export const puzzle = (edges = [1, -1, 1, -1], { size = 1, depth = 0.17, bevel = 0.055, material = gradient() } = {}) => {
  const h = 0.5
  const corner = 0.13
  const corners = [[-h, -h], [h, -h], [h, h], [-h, h]]
  const pts = []
  const knob = (sign) => {
    const out = [[0.34, 0], [0.4, 0.012 * sign], [0.43, 0.045 * sign]]
    for (let i = 0; i <= 40; i++) {
      const a = (-0.22 + (1.44 * i) / 40) * Math.PI
      out.push([0.5 - Math.cos(a) * 0.125, (0.165 + Math.sin(a) * 0.125) * sign])
    }
    out.push([0.57, 0.045 * sign], [0.6, 0.012 * sign], [0.66, 0])
    return out
  }
  for (let e = 0; e < 4; e++) {
    const [ax, ay] = corners[e]
    const [bx, by] = corners[(e + 1) % 4]
    const [dx, dy] = [bx - ax, by - ay]
    const [nx, ny] = [dy, -dx]
    const edge = [[corner, 0], ...(edges[e] ? knob(edges[e]) : []), [1 - corner, 0]]
    for (const [u, v] of edge) pts.push([ax + dx * u + nx * v, ay + dy * u + ny * v])
    const [cx, cy] = [bx - dx * corner - ((bx - ax) === 0 ? 0 : 0), by - dy * corner]
    const next = corners[(e + 2) % 4]
    const [ex, ey] = [next[0] - bx, next[1] - by]
    for (let i = 1; i < 10; i++) {
      const t = i / 10
      const p0 = [bx - dx * corner, by - dy * corner]
      const p2 = [bx + ex * corner, by + ey * corner]
      pts.push([p0[0] * (1 - t) ** 2 + bx * 2 * (1 - t) * t + p2[0] * t * t, p0[1] * (1 - t) ** 2 + by * 2 * (1 - t) * t + p2[1] * t * t])
    }
  }
  const smooth = smoothPoints(pts, 3).map(([x, y]) => [x * size, y * size])
  return mesh(pillow(shape(smooth), { depth: depth * size, bevel: bevel * size, segments: 12 }), material)
}

export const bulb = ({ lit = true, size = 1, material } = {}) => {
  const s = size
  const glass = []
  const cy = 0.74
  const R = 0.48
  for (let i = 0; i <= 48; i++) {
    const a = Math.PI / 2 - (i / 48) * (Math.PI / 2 + 0.72)
    glass.push([Math.max(Math.cos(a) * R, 0.0001), cy + Math.sin(a) * R])
  }
  const end = glass.at(-1)
  for (let i = 1; i <= 14; i++) {
    const t = i / 14
    glass.push([end[0] + (0.24 - end[0]) * t, end[1] + (0.3 - end[1]) * Math.sin((t * Math.PI) / 2)])
  }
  glass.push([0.24, 0.24], [0, 0.24])
  glass[0][0] = 0
  const glassMat = material ?? (lit ? gradient(['#ffb347', '#ff8a3d', '#f8517a'], { emissive: '#ff7a3a', emissiveIntensity: 0.18 }) : clay('#fdfbfa', { roughness: 0.3, clearcoat: 0.6 }))
  const top = mesh(lathe(glass.map(([x, y]) => [x * s, y * s])), glassMat)
  const base = []
  for (let i = 0; i <= 80; i++) {
    const y = 0.25 - (i / 80) * 0.3
    base.push([0.245 + 0.018 * Math.cos((i / 80) * Math.PI * 6), y])
  }
  base.push([0.2, -0.08], [0.12, -0.13], [0, -0.135])
  base.unshift([0, 0.25])
  const screw = mesh(lathe(base.map(([x, y]) => [x * s, y * s])), clay('#d8d0db', { roughness: 0.4, clearcoat: 0.4 }))
  const g = group(top, screw)
  if (lit) {
    const filament = parts(tube([[-0.1 * s, 0.32 * s, 0], [-0.1 * s, 0.62 * s, 0], [0, 0.72 * s, 0], [0.1 * s, 0.62 * s, 0], [0.1 * s, 0.32 * s, 0]], 0.028 * s, { corner: 0.08 * s }), clay('#ffffff'))
    filament.position.z = 0
    g.userData.filament = filament
  }
  return g
}

export const rays = ({ count = 7, inner = 0.68, outer = 0.92, from = -Math.PI * 0.08, to = Math.PI * 1.08, radius = 0.045, center = [0, 0.74], material = gradient() } = {}) => {
  const g = group()
  for (let i = 0; i < count; i++) {
    const a = from + ((to - from) * i) / (count - 1)
    const p = (r) => [center[0] + Math.cos(a) * r, center[1] + Math.sin(a) * r, 0]
    g.add(parts(tube([p(inner), p(outer)], radius, { corner: 0 }), material))
  }
  return g
}

export const rocket = ({ size = 1, flame = true, inset } = {}) => {
  const s = size
  const white = clay(WHITE, { roughness: 0.38 })
  const prof = []
  for (let i = 0; i <= 60; i++) {
    const y = -0.6 + (i / 60) * 1.05
    const t = (y + 0.6) / 1.55
    prof.push([0.34 * Math.sin(Math.PI * (0.18 + t * 0.82)) ** 0.7 + 0.02, y])
  }
  prof.unshift([0, -0.6])
  const body = mesh(lathe(prof.map(([x, y]) => [x * s, y * s])), white)
  const nose = []
  const y0 = 0.45
  const r0 = prof.at(-1)[0]
  for (let i = 0; i <= 40; i++) {
    const t = i / 40
    nose.push([Math.max(r0 * Math.cos((t * Math.PI) / 2) ** 0.85, 0.0001), y0 + t * 0.52])
  }
  nose[nose.length - 1][0] = 0
  const cone = mesh(lathe(nose.map(([x, y]) => [x * s, y * s])), gradient(BRAND, { axis: [-0.3, 1, 0.2] }))
  const window = mesh(new THREE.TorusGeometry(0.13 * s, 0.035 * s, 24, 96), gradient())
  window.position.set(0, 0.16 * s, 0.33 * s)
  window.rotation.y = 0
  const glass = mesh(sphere(0.12 * s), clay('#ffe9f0', { roughness: 0.18, clearcoat: 1 }))
  glass.scale.set(1, 1, 0.45)
  glass.position.set(0, 0.16 * s, 0.32 * s)
  if (inset) {
    inset.position.set(0, 0.16 * s, 0.33 * s)
    glass.visible = false
  }
  const g = group(body, cone, window, glass, ...(inset ? [inset] : []))
  for (let i = 0; i < 3; i++) {
    const fin = mesh(
      pillow(shape(roundCorners([[0, 0.2], [0.36, -0.22], [0.34, -0.42], [0, -0.3]], [0.04, 0.1, 0.06, 0.04]).map(([x, y]) => [x * s, y * s])), { depth: 0.03 * s, bevel: 0.035 * s, segments: 8 }),
      gradient(BRAND, { axis: [0.3, 1, 0] }),
    )
    const holder = group(fin)
    fin.position.x = 0.24 * s
    fin.position.y = -0.28 * s
    holder.rotation.y = (i * Math.PI * 2) / 3 + Math.PI / 2
    g.add(holder)
  }
  const nozzle = mesh(lathe([[0, -0.58], [0.2, -0.58], [0.22, -0.66], [0.17, -0.7], [0, -0.7]].map(([x, y]) => [x * s, y * s])), clay('#d8d0db'))
  g.add(nozzle)
  if (flame) {
    const f = []
    for (let i = 0; i <= 48; i++) {
      const t = i / 48
      f.push([Math.max(0.17 * Math.sin(Math.PI * t) ** 0.8 * (1 - 0.35 * t), 0.0001), -0.68 - t * 0.55])
    }
    f[0][0] = 0
    f[f.length - 1][0] = 0
    const fl = mesh(lathe(f.map(([x, y]) => [x * s, y * s])), gradient(['#ffd36b', '#ff9a3c', '#f56f0b'], { axis: [0, 1, 0], emissive: '#ff8a2a', emissiveIntensity: 0.35 }))
    g.add(fl)
    g.userData.flame = fl
  }
  return g
}

export const puff = (r = 0.2) => mesh(sphere(r), clay('#ffffff', { roughness: 0.6, sheen: 0.8 }))

export const bars = (lengths, { y0 = 0, gap = 0.16, radius = 0.045, x0 = 0, z = 0, material = clay(INK) } = {}) =>
  group(...lengths.map((l, i) => parts(tube([[x0, y0 - i * gap, z], [x0 + l, y0 - i * gap, z]], radius, { corner: 0 }), Array.isArray(material) ? material[i] : material)))

export const counter = (height, { weight = 800, color = '#3a2a35', fill } = {}) => {
  const canvas = document.createElement('canvas')
  const size = 220
  const ctx = canvas.getContext('2d')
  canvas.width = 640
  canvas.height = 300
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry((height * canvas.width) / canvas.height, height),
    new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: 0.6, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4 }),
  )
  plane.receiveShadow = true
  let last
  plane.userData.set = (value) => {
    const text = String(value)
    if (text === last) return
    last = text
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = `${weight} ${size}px Inter`
    ctx.letterSpacing = `${-0.03 * size}px`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    if (fill) {
      const g = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      fill.forEach((c, i) => g.addColorStop(i / (fill.length - 1), c))
      ctx.fillStyle = g
    } else ctx.fillStyle = color
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 + size * 0.04)
    tex.needsUpdate = true
  }
  return plane
}

export { textTexture }
