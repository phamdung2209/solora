import { BRAND, THREE, clay, gradient, label, mesh, rbox, sphere } from './studio.js'
import * as O from './objects.js'
import { featureHero, healthClear } from './animations.js'

const { group, place } = O

const still = (build) => (studio, app) => {
  build(studio, app)
  return { rest: 0 }
}

const add = (root, ...items) => {
  root.add(...items)
  return items[0]
}

const sparkles = (root, list) => {
  for (const [x, y, z, size, color, rz = 0] of list) add(root, place(O.sparkle(size, color), { x, y, z, rz }))
}

const stand = (object, y = 0) => {
  object.updateMatrixWorld(true)
  const box = new THREE.Box3().setFromObject(object, true)
  object.position.y += y - box.min.y
  return object
}

const white = () => clay(O.WHITE)

const glyph = (app, { material = clay('#ffffff', { roughness: 0.34 }), scale = 1 } = {}) => {
  const g = group()
  if (app === 'tierly') {
    ;[0.24, 0.38, 0.54].forEach((h, i) => {
      const bar = mesh(rbox(0.15, h, 0.1, 0.07), material)
      bar.position.set((i - 1) * 0.21, -0.27 + h / 2, 0)
      g.add(bar)
    })
  }
  if (app === 'mixly') {
    const back = O.card(0.4, 0.4, { depth: 0.04, radius: 0.1, bevel: 0.03, material })
    back.position.set(-0.08, 0.08, 0)
    const front = O.card(0.4, 0.4, { depth: 0.04, radius: 0.1, bevel: 0.03, material })
    front.position.set(0.08, -0.08, 0.07)
    g.add(back, front)
  }
  if (app === 'swatchbox') {
    ;[-0.24, 0, 0.24].forEach((x, i) => {
      const dot = mesh(sphere(0.085), material)
      dot.scale.set(1, 1, 0.6)
      dot.position.set(x, 0, 0)
      g.add(dot)
      if (i === 0) {
        const ring = mesh(new THREE.TorusGeometry(0.125, 0.018, 16, 64), material)
        ring.position.set(x, 0, 0)
        g.add(ring)
      }
    })
  }
  g.scale.setScalar(scale)
  return g
}

const accent = (app, size = 1) => {
  if (app === 'tierly') return O.priceTag('-10%', { width: 1.1 * size, height: 0.54 * size })
  if (app === 'mixly') return O.giftBox({ size: 0.72 * size })
  return O.swatchFan({ w: 0.42 * size, h: 1.18 * size })
}

const tiny = (app, size = 1) => {
  if (app === 'tierly') return O.priceTag('%', { width: 0.62 * size, height: 0.4 * size })
  if (app === 'mixly') return O.giftBox({ size: 0.42 * size })
  return O.swatch(O.SWATCHES.teal, { r: 0.18 * size, selected: true })
}

const toggle = () => stand(place(O.toggle(), { x: -1.45, z: 1.05, rx: -Math.PI / 2 + 0.9, ry: 0.35 }))

const settings = {
  tierly(root) {
    add(root, place(O.tierSteps(), { x: 0.4, z: 0.15 }))
    add(root, place(O.gear({ radius: 1.0 }), { x: -0.85, y: 1.15, z: -0.75, ry: 0.32, rz: 0.12 }))
    add(root, place(O.priceTag('-18%', { width: 1.2, height: 0.58 }), { x: 1.5, y: 1.85, z: 0.75, rx: -0.12, ry: -0.3, rz: 0.22 }))
    add(root, toggle())
  },
  mixly(root) {
    add(root, place(O.gear({ radius: 1.0 }), { x: -1.05, y: 1.18, z: -1.0, ry: 0.32, rz: 0.12 }))
    add(root, stand(place(O.bundleCard(place(O.cap({ size: 0.74 }), { y: -0.12, ry: -Math.PI / 2 + 0.35 }), { w: 1.2, h: 1.2 }), { x: -0.1, z: 0.0, ry: 0.26, rz: 0.04 }), 0.02))
    add(root, stand(place(O.bundleCard(O.tee({ size: 0.84 }), { w: 1.2, h: 1.2 }), { x: 1.4, z: 0.1, ry: -0.26, rz: -0.04 }), 0.02))
    add(root, place(O.plus({ size: 0.46, arm: 0.2 }), { x: 0.66, y: 0.62, z: 0.72, ry: -0.05, rz: 0.12 }))
    add(root, place(O.giftBox({ size: 0.62 }), { x: 2.1, y: 0, z: 1.3, ry: -0.55 }))
    add(root, toggle())
  },
  swatchbox(root) {
    add(root, place(O.gear({ radius: 1.0 }), { x: -0.95, y: 1.15, z: -0.9, ry: 0.32, rz: 0.12 }))
    add(root, stand(place(O.productCard({ garment: O.SWATCHES.coral }), { x: 0.35, z: 0.0, ry: -0.22, rz: -0.03 }), 0.02))
    add(root, stand(place(O.swatchFan({ spread: 0.42 }), { x: 2.05, z: 0.45, ry: -0.35, s: 0.95 }), 0.02))
    add(root, toggle())
  },
}

const health = {
  tierly(root) {
    add(root, place(O.tierSteps({ heights: [0.32, 0.56, 0.84], width: 0.55, depth: 0.55, gap: 0.07 }), { x: -1.35, z: 0.75, ry: 0.3 }))
    add(root, stand(place(O.priceTag('-10%', { width: 1.0, height: 0.5 }), { x: 1.45, z: 0.85, rx: -0.4, ry: -0.35, rz: 0.08 })))
  },
  mixly(root) {
    add(root, place(O.giftBox({ size: 0.66 }), { x: -1.4, z: 0.75, ry: 0.4 }))
    add(root, stand(place(O.bundleCard(O.tee({ size: 0.62, color: O.SWATCHES.coral }), { w: 0.9, h: 0.9 }), { x: 1.5, z: 0.6, ry: -0.42, rz: -0.06 })))
  },
  swatchbox(root) {
    ;[O.SWATCHES.coral, O.SWATCHES.teal, O.SWATCHES.violet].forEach((c, i) => add(root, stand(place(O.swatch(c, { r: 0.22, selected: i === 0 }), { x: -1.75 + i * 0.5, z: 0.95 - i * 0.12, ry: 0.35 }))))
    add(root, stand(place(O.tee({ color: O.SWATCHES.teal, size: 0.95 }), { x: 1.5, z: 0.7, rx: -0.25, ry: -0.4, rz: 0.06 })))
  },
}

const partner = {
  tierly: (root) => add(root, stand(place(O.priceTag('-10%', { width: 1.0, height: 0.5 }), { x: 1.35, z: 1.05, rx: -0.5, ry: -0.35, rz: 0.06 }))),
  mixly: (root) => add(root, place(O.giftBox({ size: 0.6 }), { x: 1.45, z: 0.95, ry: -0.5 })),
  swatchbox: (root) => {
    ;[O.SWATCHES.teal, O.SWATCHES.violet, O.SWATCHES.sun].forEach((c, i) => add(root, stand(place(O.swatch(c, { r: 0.2 }), { x: 1.05 + i * 0.48, z: 1.05 - i * 0.12, ry: -0.3 }))))
  },
}

const ideaCard = (app, { w = 1.7, h = 1.2 } = {}) => {
  const base = O.card(w, h, { depth: 0.12, radius: 0.22, bevel: 0.07 })
  const face = 0.13
  const chip = O.card(0.56, 0.56, { depth: 0.05, radius: 0.16, bevel: 0.04, material: gradient() })
  chip.position.set(-w / 2 + 0.44, h / 2 - 0.44, face)
  const mark = glyph(app, { scale: 0.62 })
  mark.position.set(chip.position.x, chip.position.y, face + 0.1)
  const lines = O.bars([0.62, 0.42], { x0: -w / 2 + 0.86, y0: h / 2 - 0.34, gap: 0.2, radius: 0.05, z: face })
  const body = O.bars([w - 0.5, w - 0.8], { x0: -w / 2 + 0.24, y0: -h / 2 + 0.42, gap: 0.2, radius: 0.04, z: face, material: clay(O.LILAC) })
  return group(base, chip, mark, lines, body)
}

export const scenes = {
  'health-clear': healthClear,
  'feature-hero': featureHero,

  'settings-hero': still((studio, app) => {
    settings[app](studio.root)
    sparkles(studio.root, [
      [-1.9, 2.25, -0.3, 0.24, BRAND[0], 0.2],
      [2.2, 2.45, -0.4, 0.18, BRAND[2], -0.1],
      [2.45, 0.75, 1.3, 0.13, BRAND[1], 0.3],
    ])
    studio.fit({ margin: 0.08 })
  }),

  'health-hero': still((studio, app) => {
    const { root } = studio
    const sh = add(root, stand(place(O.shield({ width: 1.5, height: 1.8 }), { x: 0, z: 0, ry: -0.12 }), 0.02))
    const line = O.pulse({ width: 1.12, radius: 0.065 })
    line.position.set(0, 0.06, sh.userData.face + 0.03)
    sh.add(line)
    const tick = add(root, place(O.badge({ r: 0.36, material: white(), icon: O.check({ size: 0.45, radius: 0.045, material: gradient() }) }), { x: 0.95, y: 1.95, z: 0.55, ry: -0.35, rz: -0.1 }))
    void tick
    health[app](root)
    sparkles(root, [
      [-1.15, 2.2, -0.2, 0.24, BRAND[0], 0.2],
      [1.85, 1.1, 0.2, 0.16, BRAND[2], -0.2],
      [-2.05, 1.3, 0.6, 0.12, BRAND[1], 0.3],
    ])
    studio.fit({ margin: 0.08 })
  }),

  'partners-hero': still((studio, app) => {
    const { root } = studio
    const size = 1.1
    const h = size / 2
    const wall = group()
    const piece = (edges, material, x, y) => {
      const p = O.puzzle(edges, { size, material })
      p.position.set(x, y, 0)
      wall.add(p)
      return p
    }
    const home = piece([0, 1, 1, 0], gradient(), -h, h + 0.005)
    piece([0, 0, 1, -1], white(), h, h + 0.005)
    piece([-1, 1, 0, 0], white(), -h, 3 * h + 0.005)
    const mark = glyph(app, { scale: 1.0 })
    mark.position.set(0, 0, 0.15)
    home.add(mark)
    place(wall, { x: -0.35, z: 0, ry: 0.14 })
    root.add(wall)
    add(root, place(O.puzzle([-1, 0, 0, -1], { size, material: gradient(O.SOFT) }), { x: 1.35, y: 2.15, z: 0.75, rx: -0.12, ry: -0.32, rz: -0.22 }))
    partner[app](root)
    sparkles(root, [
      [-1.75, 2.35, -0.2, 0.22, BRAND[0], 0.2],
      [2.15, 1.05, 0.2, 0.15, BRAND[2], -0.1],
      [0.55, 2.95, 0.1, 0.13, BRAND[1], 0.3],
    ])
    studio.fit({ margin: 0.08 })
  }),

  'feature-step-post': still((studio, app) => {
    const { root } = studio
    add(root, stand(place(ideaCard(app), { ry: 0.22, rz: 0.04 })))
    add(root, place(O.badge({ r: 0.34, icon: O.plus({ size: 0.36, arm: 0.12, depth: 0.04, bevel: 0.03, material: clay('#ffffff', { roughness: 0.3 }) }) }), { x: 0.85, y: 1.38, z: 0.45, ry: -0.2 }))
    sparkles(root, [[-0.95, 1.55, 0.2, 0.15, BRAND[0], 0.2]])
    studio.fit({ margin: 0.1 })
  }),

  'feature-step-vote': still((studio) => {
    const { root } = studio
    const button = O.card(1.15, 1.35, { depth: 0.14, radius: 0.3, bevel: 0.08 })
    const arrow = O.arrowUp({ size: 0.62 })
    arrow.position.set(0, 0.2, 0.17)
    const count = label('128', 0.3, { fill: BRAND, weight: 800 })
    count.position.set(0, -0.38, 0.156)
    add(root, stand(place(group(button, arrow, count), { ry: -0.18, rz: -0.03 })))
    const bubble = O.pill(0.66, 0.42, { depth: 0.08, bevel: 0.06, material: gradient() })
    const plusOne = label('+1', 0.27, { color: '#ffffff', weight: 800 })
    plusOne.position.z = 0.1
    add(root, place(group(bubble, plusOne), { x: 0.72, y: 1.42, z: 0.35, ry: -0.3, rz: 0.14 }))
    sparkles(root, [[-0.85, 1.35, 0.2, 0.14, BRAND[0], 0.2]])
    studio.fit({ margin: 0.1 })
  }),

  'feature-step-ship': still((studio, app) => {
    const { root } = studio
    const port = O.disc(0.105, 0.05, { material: gradient(), round: 0.02 })
    port.rotation.x = Math.PI / 2
    const mark = glyph(app, { scale: 0.27 })
    mark.position.z = 0.03
    add(root, place(O.rocket({ size: 1, inset: group(port, mark) }), { y: 1.0, rz: -0.55, ry: 0.2 }))
    for (const [x, y, z, r] of [[-0.62, 0.22, 0.1, 0.22], [-0.3, 0.14, 0.25, 0.17], [-0.9, 0.12, -0.05, 0.15], [-0.45, 0.4, -0.15, 0.13]]) add(root, place(O.puff(r), { x, y, z }))
    sparkles(root, [
      [0.7, 1.75, 0, 0.15, BRAND[2], 0.2],
      [0.55, 0.45, 0.45, 0.1, BRAND[0], 0.1],
    ])
    studio.fit({ margin: 0.1 })
  }),

  'feature-empty': still((studio, app) => {
    const { root } = studio
    const board = O.card(3.0, 2.0, { depth: 0.14, radius: 0.28, bevel: 0.07 })
    const face = 0.07 + 0.07
    const heads = ['#f7a76c', '#f27aa3', O.INK]
    ;[-1, 0, 1].forEach((i) => {
      const lane = O.card(0.84, 1.42, { depth: 0.012, radius: 0.16, bevel: 0.012, material: clay('#f3eef3', { roughness: 0.75, clearcoat: 0 }) })
      lane.position.set(i * 0.94, -0.16, face)
      board.add(lane)
      const head = O.bars([0.34], { x0: i * 0.94 - 0.36 + 0.06, y0: 0.74, radius: 0.045, z: face, material: clay(heads[i + 1]) })
      board.add(head)
      const dot = mesh(sphere(0.055), clay(heads[i + 1]))
      dot.position.set(i * 0.94 - 0.36 + 0.04 - 0.08, 0.74, face)
      board.add(dot)
    })
    const ghost = O.plus({ size: 0.26, arm: 0.075, depth: 0.012, bevel: 0.012, material: clay('#e2d7e2', { roughness: 0.7 }) })
    ghost.position.set(-0.94, -0.16, face + 0.03)
    board.add(ghost)
    add(root, stand(place(board, { x: 0.15, z: -0.35, ry: -0.12 })))
    add(root, stand(place(O.bulb({ lit: false, size: 1.08 }), { x: -1.3, z: 0.75, ry: 0.2 })))
    add(root, place(O.badge({ r: 0.24, icon: O.plus({ size: 0.26, arm: 0.095, depth: 0.03, bevel: 0.022, material: clay('#ffffff', { roughness: 0.3 }) }) }), { x: -0.58, y: 1.55, z: 1.0, ry: -0.25 }))
    add(root, stand(place(tiny(app, 0.95), { x: 1.45, z: 0.85, ry: -0.4 })))
    sparkles(root, [
      [-1.95, 1.6, 0.3, 0.15, BRAND[0], 0.2],
      [1.85, 2.15, -0.5, 0.12, BRAND[2], -0.1],
    ])
    studio.fit({ margin: 0.08 })
  }),
}
