import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js'

export { THREE }

export const BRAND = ['#F9832A', '#F35F39', '#EC377E']

export const LOOK = {
  fov: 22,
  elevation: 27,
  azimuth: 22,
  key: { dir: [-0.62, 1, 0.78], soft: 0.16, intensity: 2.1, color: '#fff3ea', shadow: 0.2 },
  sky: { intensity: 1.55, color: '#ffffff', shadow: 0.42, minY: 0.45 },
  hemi: { sky: '#ffffff', ground: '#ffd2c2', intensity: 0.42 },
  env: 0.28,
  exposure: 1.02,
  shadowTint: '#5b3348',
}

const halton = (index, base) => {
  let f = 1
  let r = 0
  for (let i = index; i > 0; i = Math.floor(i / base)) {
    f /= base
    r += f * (i % base)
  }
  return r
}

const quad = (material) => {
  const scene = new THREE.Scene()
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material))
  return scene
}

const OUT_FRAG = /* glsl */ `
uniform sampler2D sum;
uniform float inv;
uniform float exposure;
uniform float dither;
uniform float backdrop;
uniform vec2 aspect;
varying vec2 vUv;
vec3 card(vec2 uv) {
  vec2 p = (uv - vec2(0.5, 0.56)) * aspect;
  float r = length(p);
  vec3 c = mix(vec3(1.0, 0.953, 0.925), vec3(1.0), smoothstep(0.05, 0.62, r));
  vec2 q = (uv - vec2(0.88, 0.12)) * aspect;
  c = mix(c, vec3(0.992, 0.925, 0.949), 0.55 * (1.0 - smoothstep(0.0, 0.42, length(q))));
  vec2 o = (uv - vec2(0.1, 0.9)) * aspect;
  c = mix(c, vec3(1.0, 0.95, 0.91), 0.5 * (1.0 - smoothstep(0.0, 0.38, length(o))));
  return c;
}
vec3 neutral(vec3 color) {
  const float start = 0.76;
  const float desat = 0.15;
  float x = min(color.r, min(color.g, color.b));
  float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
  color -= offset;
  float peak = max(color.r, max(color.g, color.b));
  if (peak < start) return color;
  float d = 1.0 - start;
  float next = 1.0 - d * d / (peak + d - start);
  color *= next / peak;
  float g = 1.0 - 1.0 / (desat * (peak - next) + 1.0);
  return mix(color, vec3(next), g);
}
float oetf(float c) { return c <= 0.0031308 ? 12.92 * c : 1.055 * pow(c, 1.0 / 2.4) - 0.055; }
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  vec4 s = texture2D(sum, vUv) * inv;
  float a = clamp(s.a, 0.0, 1.0);
  vec3 c = a > 1e-5 ? s.rgb / a : vec3(0.0);
  c = neutral(max(c * exposure, 0.0));
  c = vec3(oetf(c.r), oetf(c.g), oetf(c.b));
  float n = dither * (hash(gl_FragCoord.xy) + hash(gl_FragCoord.yx + 17.0) - 1.0) / 255.0;
  c = clamp(c + n, 0.0, 1.0);
  if (a > 0.004 && a < 0.996) a = clamp(a + n, 0.0, 1.0);
  if (backdrop > 0.5) {
    gl_FragColor = vec4(mix(card(vUv), c, a), 1.0);
    return;
  }
  gl_FragColor = vec4(c * a, a);
}`

const QUAD_VERT = 'varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }'

export class Studio {
  constructor({ passes = 128, shutter = 0, dither = 1, backdrop = 0 } = {}) {
    const dpr = window.devicePixelRatio
    this.width = Math.round(innerWidth * dpr)
    this.height = Math.round(innerHeight * dpr)
    this.passes = passes
    this.shutter = shutter
    this.update = null

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, premultipliedAlpha: true, preserveDrawingBuffer: true })
    renderer.setPixelRatio(1)
    renderer.setSize(this.width, this.height, false)
    renderer.autoClear = false
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setClearColor(0x000000, 0)
    document.body.append(renderer.domElement)
    this.renderer = renderer

    const scene = new THREE.Scene()
    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environmentIntensity = LOOK.env
    this.scene = scene

    this.camera = new THREE.PerspectiveCamera(LOOK.fov, this.width / this.height, 0.1, 400)
    scene.add(new THREE.HemisphereLight(LOOK.hemi.sky, LOOK.hemi.ground, LOOK.hemi.intensity))

    const sun = new THREE.DirectionalLight('#ffffff', 1)
    sun.castShadow = true
    sun.shadow.mapSize.set(4096, 4096)
    sun.shadow.bias = -0.0003
    sun.shadow.normalBias = 0.01
    scene.add(sun, sun.target)
    this.sun = sun

    const shadowMat = new THREE.ShadowMaterial({ color: LOOK.shadowTint, transparent: true, depthWrite: false })
    this.fade = { center: new THREE.Vector3(), range: new THREE.Vector2(2, 4) }
    shadowMat.onBeforeCompile = (shader) => {
      shader.uniforms.fadeCenter = { value: this.fade.center }
      shader.uniforms.fadeRange = { value: this.fade.range }
      shader.vertexShader = `varying vec3 vGround;\n${shader.vertexShader.replace('#include <worldpos_vertex>', '#include <worldpos_vertex>\nvGround = (modelMatrix * vec4(transformed, 1.0)).xyz;')}`
      shader.fragmentShader = `uniform vec3 fadeCenter; uniform vec2 fadeRange; varying vec3 vGround;\n${shader.fragmentShader.replace(
        'opacity * ( 1.0 - getShadowMask() )',
        'opacity * ( 1.0 - getShadowMask() ) * (1.0 - smoothstep(fadeRange.x, fadeRange.y, distance(vGround.xz, fadeCenter.xz)))',
      )}`
    }
    this.ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), shadowMat)
    this.ground.rotation.x = -Math.PI / 2
    this.ground.receiveShadow = true
    scene.add(this.ground)

    this.root = new THREE.Group()
    scene.add(this.root)

    const target = (type, samples) => new THREE.WebGLRenderTarget(this.width, this.height, { type, samples, depthBuffer: samples > 0 })
    this.passRT = target(THREE.HalfFloatType, 4)
    this.sumRT = target(THREE.FloatType, 0)
    this.quadCam = new THREE.Camera()
    this.addScene = quad(
      new THREE.ShaderMaterial({
        uniforms: { map: { value: this.passRT.texture } },
        vertexShader: QUAD_VERT,
        fragmentShader: 'uniform sampler2D map; varying vec2 vUv; void main() { gl_FragColor = texture2D(map, vUv); }',
        blending: THREE.CustomBlending,
        blendEquation: THREE.AddEquation,
        blendSrc: THREE.OneFactor,
        blendDst: THREE.OneFactor,
        blendSrcAlpha: THREE.OneFactor,
        blendDstAlpha: THREE.OneFactor,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
      }),
    )
    this.outMat = new THREE.ShaderMaterial({
      uniforms: { sum: { value: this.sumRT.texture }, inv: { value: 1 }, exposure: { value: LOOK.exposure }, dither: { value: dither }, backdrop: { value: backdrop }, aspect: { value: new THREE.Vector2(this.width / this.height, 1) } },
      vertexShader: QUAD_VERT,
      fragmentShader: OUT_FRAG,
      blending: THREE.NoBlending,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    })
    this.outScene = quad(this.outMat)

    const [kx, ky, kz] = LOOK.key.dir
    this.keyDir = new THREE.Vector3(kx, ky, kz).normalize()
    this.keyU = new THREE.Vector3(0, 1, 0).cross(this.keyDir).normalize()
    this.keyV = this.keyDir.clone().cross(this.keyU).normalize()
    this.bounds = new THREE.Sphere(new THREE.Vector3(), 3)
    this.view({})
  }

  view({ target = [0, 0, 0], distance = 12, elevation = LOOK.elevation, azimuth = LOOK.azimuth, shift = [0, 0] }) {
    const e = THREE.MathUtils.degToRad(elevation)
    const a = THREE.MathUtils.degToRad(azimuth)
    const t = new THREE.Vector3(...target)
    this.camera.position.set(Math.sin(a) * Math.cos(e), Math.sin(e), Math.cos(a) * Math.cos(e)).multiplyScalar(distance).add(t)
    this.camera.lookAt(t)
    this.camera.updateMatrixWorld()
    const right = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 0)
    const up = new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld, 1)
    this.camera.position.addScaledVector(right, shift[0]).addScaledVector(up, shift[1])
    this.camera.updateMatrixWorld()
    this.target = t
  }

  fit({ margin = 0.1, object = this.root, box, elevation, azimuth } = {}) {
    const bb = box ?? new THREE.Box3().setFromObject(object, true)
    const corners = []
    for (const x of [bb.min.x, bb.max.x]) for (const y of [bb.min.y, bb.max.y]) for (const z of [bb.min.z, bb.max.z]) corners.push(new THREE.Vector3(x, y, z))
    const center = bb.getCenter(new THREE.Vector3())
    let distance = bb.getSize(new THREE.Vector3()).length() * 2.2
    let shift = [0, 0]
    const limit = 1 - margin
    for (let i = 0; i < 40; i++) {
      this.view({ target: center.toArray(), distance, elevation, azimuth, shift })
      let [x0, x1, y0, y1] = [Infinity, -Infinity, Infinity, -Infinity]
      for (const c of corners) {
        const p = c.clone().project(this.camera)
        x0 = Math.min(x0, p.x)
        x1 = Math.max(x1, p.x)
        y0 = Math.min(y0, p.y)
        y1 = Math.max(y1, p.y)
      }
      const scale = Math.max((x1 - x0) / (2 * limit), (y1 - y0) / (2 * limit))
      const half = Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2)) * distance
      shift = [shift[0] + ((x0 + x1) / 2) * half * this.camera.aspect, shift[1] + ((y0 + y1) / 2) * half]
      distance *= 0.5 + 0.5 * scale
    }
    this.view({ target: center.toArray(), distance, elevation, azimuth, shift })
    this.bounds = bb.getBoundingSphere(new THREE.Sphere())
    this.bounds.radius *= 1.15
    this.groundFade()
    return this
  }

  groundFade(center = this.bounds.center, inner = 0.5, outer = 1.2) {
    const r = this.bounds.radius
    this.fade.center.set(center.x, 0, center.z)
    this.fade.range.set(r * inner, r * outer)
  }

  light(i) {
    const key = i % 2 === 0
    const k = Math.floor(i / 2)
    const n = Math.ceil(this.passes / 2)
    const dir = new THREE.Vector3()
    if (key) {
      const r = Math.sqrt(halton(k + 1, 5)) * LOOK.key.soft
      const a = 2 * Math.PI * halton(k + 1, 7)
      dir.copy(this.keyDir).addScaledVector(this.keyU, r * Math.cos(a)).addScaledVector(this.keyV, r * Math.sin(a)).normalize()
    } else {
      const u = ((k + 0.5) / n) * (1 - LOOK.sky.minY ** 2)
      const r = Math.sqrt(u)
      const phi = k * 2.399963
      dir.set(r * Math.cos(phi), Math.sqrt(1 - u), r * Math.sin(phi))
    }
    const { sun, bounds } = this
    sun.intensity = (key ? LOOK.key.intensity : LOOK.sky.intensity) * 2
    sun.color.set(key ? LOOK.key.color : LOOK.sky.color)
    this.ground.material.opacity = key ? LOOK.key.shadow * 2 : LOOK.sky.shadow * 2 * dir.y
    const r = bounds.radius
    sun.position.copy(bounds.center).addScaledVector(dir, r * 4)
    sun.target.position.copy(bounds.center)
    sun.target.updateMatrixWorld()
    const cam = sun.shadow.camera
    cam.left = -r
    cam.right = r
    cam.top = r
    cam.bottom = -r
    cam.near = 0.05
    cam.far = r * 24
    cam.updateProjectionMatrix()
  }

  async draw(t = 0) {
    const { renderer, scene, camera, passes, width, height } = this
    renderer.setRenderTarget(this.sumRT)
    renderer.clear()
    for (let i = 0; i < passes; i++) {
      this.update?.(t + this.shutter * ((i + 0.5) / passes - 0.5), t)
      this.light(i)
      camera.setViewOffset(width, height, halton(i + 1, 2) - 0.5, halton(i + 1, 3) - 0.5, width, height)
      renderer.setRenderTarget(this.passRT)
      renderer.clear()
      renderer.render(scene, camera)
      renderer.setRenderTarget(this.sumRT)
      renderer.render(this.addScene, this.quadCam)
      if (i % 6 === 5) {
        renderer.getContext().flush()
        await new Promise((resolve) => setTimeout(resolve, 0))
      }
    }
    camera.clearViewOffset()
    this.outMat.uniforms.inv.value = 1 / passes
    renderer.setRenderTarget(null)
    renderer.clear()
    renderer.render(this.outScene, this.quadCam)
    const gl = renderer.getContext()
    gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4))
  }
}

const linear = (hex) => new THREE.Color(hex)

const groundOcclusion = (shader) => {
  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', '#include <common>\nvarying float vLift;')
    .replace('#include <project_vertex>', '#include <project_vertex>\nvLift = (modelMatrix * vec4(transformed, 1.0)).y;')
  shader.fragmentShader = shader.fragmentShader
    .replace('#include <common>', '#include <common>\nvarying float vLift;')
    .replace(
      '#include <aomap_fragment>',
      `#include <aomap_fragment>
float liftAO = mix(0.3, 1.0, smoothstep(0.0, 0.3, vLift));
reflectedLight.indirectDiffuse *= liftAO;
reflectedLight.indirectSpecular *= liftAO;`,
    )
}

export const clay = (color, o = {}) => {
  const material = new THREE.MeshPhysicalMaterial({
    color,
    roughness: 0.46,
    metalness: 0,
    clearcoat: 0.3,
    clearcoatRoughness: 0.32,
    sheen: 0.35,
    sheenRoughness: 0.7,
    sheenColor: new THREE.Color('#ffffff'),
    ...o,
  })
  material.onBeforeCompile = groundOcclusion
  material.customProgramCacheKey = () => 'solora-clay'
  return material
}

export const gradient = (stops = BRAND, { axis = [-0.75, 1, 0.3], range = [-1, 1], ...o } = {}) => {
  const material = clay('#ffffff', o)
  const colors = stops.map(linear)
  while (colors.length < 3) colors.splice(1, 0, colors[0].clone().lerp(colors.at(-1), 0.5))
  material.userData.gradient = { dir: new THREE.Vector3(...axis).normalize(), range, colors }
  material.onBeforeCompile = function (shader) {
    groundOcclusion(shader)
    const g = this.userData.gradient
    shader.uniforms.gA = { value: g.colors[0] }
    shader.uniforms.gM = { value: g.colors[1] }
    shader.uniforms.gB = { value: g.colors[2] }
    shader.uniforms.gDir = { value: g.dir }
    shader.uniforms.gRange = { value: new THREE.Vector2(...g.range) }
    shader.vertexShader = `uniform vec3 gDir; uniform vec2 gRange; varying float vGrad;
${shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
vGrad = clamp((dot(position, gDir) - gRange.x) / (gRange.y - gRange.x), 0.0, 1.0);`,
    )}`
    shader.fragmentShader = `uniform vec3 gA; uniform vec3 gM; uniform vec3 gB; varying float vGrad;
${shader.fragmentShader.replace(
      '#include <color_fragment>',
      `#include <color_fragment>
float gt = pow(1.0 - vGrad, 0.9);
diffuseColor.rgb = gt < 0.5 ? mix(gA, gM, gt * 2.0) : mix(gM, gB, gt * 2.0 - 1.0);`,
    )}`
  }
  material.customProgramCacheKey = () => 'solora-gradient'
  return material
}

export const fitGradient = (material, source) => {
  const g = material.userData.gradient
  if (!g) return material
  if (source.isBufferGeometry) source.computeBoundingBox()
  const { min, max } = source.isBufferGeometry ? source.boundingBox : source
  let lo = Infinity
  let hi = -Infinity
  for (const x of [min.x, max.x]) for (const y of [min.y, max.y]) for (const z of [min.z, max.z]) {
    const d = g.dir.x * x + g.dir.y * y + g.dir.z * z
    lo = Math.min(lo, d)
    hi = Math.max(hi, d)
  }
  g.range = [lo, hi]
  return material
}

export const mesh = (geometry, material, { cast = true, receive = true } = {}) => {
  if (material.userData.gradient && !material.userData.fixed) fitGradient(material, geometry)
  const m = new THREE.Mesh(geometry, material)
  m.castShadow = cast
  m.receiveShadow = receive
  return m
}

export const smoothPoints = (points, iterations = 4, closed = true) => {
  let pts = points.map(([x, y]) => [x, y])
  for (let it = 0; it < iterations; it++) {
    const next = []
    const n = pts.length
    for (let i = 0; i < (closed ? n : n - 1); i++) {
      const [ax, ay] = pts[i]
      const [bx, by] = pts[(i + 1) % n]
      next.push([0.75 * ax + 0.25 * bx, 0.75 * ay + 0.25 * by], [0.25 * ax + 0.75 * bx, 0.25 * ay + 0.75 * by])
    }
    pts = closed ? next : [pts[0], ...next, pts.at(-1)]
  }
  return pts
}

export const clean = (points, min = 0.004) => {
  const out = []
  for (const p of points) {
    const last = out.at(-1)
    if (!last || Math.hypot(p[0] - last[0], p[1] - last[1]) >= min) out.push(p)
  }
  while (out.length > 2 && Math.hypot(out[0][0] - out.at(-1)[0], out[0][1] - out.at(-1)[1]) < min) out.pop()
  return out
}

export const shape = (points) => new THREE.Shape(clean(points).map(([x, y]) => new THREE.Vector2(x, y)))

export const roundRect = (w, h, r) => {
  const k = Math.min(r, w / 2, h / 2)
  const pts = []
  const corners = [[w / 2 - k, -h / 2 + k, -Math.PI / 2], [w / 2 - k, h / 2 - k, 0], [-w / 2 + k, h / 2 - k, Math.PI / 2], [-w / 2 + k, -h / 2 + k, Math.PI]]
  for (const [cx, cy, start] of corners) for (let i = 0; i <= 24; i++) {
    const t = start + (i / 24) * (Math.PI / 2)
    pts.push([cx + Math.cos(t) * k, cy + Math.sin(t) * k])
  }
  return shape(pts)
}

export const circlePath = (r, x = 0, y = 0, clockwise = true) => {
  const p = new THREE.Path()
  p.absarc(x, y, r, 0, Math.PI * 2, clockwise)
  return p
}

const smoothGeometry = (g) => {
  for (const name of Object.keys(g.attributes)) if (name !== 'position') g.deleteAttribute(name)
  const m = mergeVertices(g, 1e-5)
  m.computeVertexNormals()
  return m
}

export const pillow = (s, { depth = 0.2, bevel = 0.1, segments = 10, curve = 72 } = {}) => {
  const g = new THREE.ExtrudeGeometry(s, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelOffset: -bevel,
    bevelSegments: segments,
    curveSegments: curve,
    steps: 1,
  })
  const m = smoothGeometry(g)
  m.translate(0, 0, -depth / 2)
  return m
}

export const flat = (geometry) => {
  geometry.rotateX(-Math.PI / 2)
  return geometry
}

export const rbox = (w, h, d, r = 0.1, segments = 8) => new RoundedBoxGeometry(w, h, d, segments, Math.min(r, w / 2, h / 2, d / 2) - 1e-4)

export const lathe = (profile, segments = 128) => {
  const pts = profile[0][1] > profile.at(-1)[1] ? [...profile].reverse() : profile
  const g = new THREE.LatheGeometry(pts.map(([x, y]) => new THREE.Vector2(x, y)), segments)
  return smoothGeometry(g)
}

export const tube = (points, radius, { corner = 0.15, closed = false, radial = 32, caps = true } = {}) => {
  const v = points.map(([x, y, z = 0]) => new THREE.Vector3(x, y, z))
  const path = new THREE.CurvePath()
  let prev = v[0]
  for (let i = 1; i < v.length; i++) {
    const cur = v[i]
    if (i < v.length - 1 && corner > 0) {
      const next = v[i + 1]
      const a = cur.clone().sub(prev)
      const b = next.clone().sub(cur)
      const ra = Math.min(corner, a.length() / 2)
      const rb = Math.min(corner, b.length() / 2)
      const p1 = cur.clone().addScaledVector(a.normalize(), -ra)
      const p2 = cur.clone().addScaledVector(b.normalize(), rb)
      path.add(new THREE.LineCurve3(prev, p1))
      path.add(new THREE.QuadraticBezierCurve3(p1, cur, p2))
      prev = p2
    } else {
      path.add(new THREE.LineCurve3(prev, cur))
      prev = cur
    }
  }
  const length = path.getLength()
  const geo = new THREE.TubeGeometry(path, Math.max(64, Math.round(length * 90)), radius, radial, closed)
  const parts = [geo]
  if (caps && !closed) {
    for (const end of [v[0], v.at(-1)]) {
      const s = new THREE.SphereGeometry(radius, radial, Math.round(radial / 2))
      s.translate(end.x, end.y, end.z)
      parts.push(s)
    }
  }
  return parts
}

export const sphere = (r, w = 64, h = 48) => new THREE.SphereGeometry(r, w, h)

let fontReady
export const loadFont = () => {
  fontReady ??= (async () => {
    const face = new FontFace('Inter', 'url(/scene/kit/inter.woff2)', { weight: '100 900' })
    await face.load()
    document.fonts.add(face)
  })()
  return fontReady
}

export const textTexture = (text, { weight = 700, size = 160, color = '#ffffff', fill, pad = 0.18, track = -0.02 } = {}) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const font = `${weight} ${size}px Inter`
  ctx.font = font
  ctx.letterSpacing = `${track * size}px`
  const w = Math.ceil(ctx.measureText(text).width + size * pad * 2)
  const h = Math.ceil(size * 1.3)
  canvas.width = w
  canvas.height = h
  ctx.font = font
  ctx.letterSpacing = `${track * size}px`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  if (fill) {
    const g = ctx.createLinearGradient(0, 0, w, h)
    fill.forEach((c, i) => g.addColorStop(i / (fill.length - 1), c))
    ctx.fillStyle = g
  } else ctx.fillStyle = color
  ctx.fillText(text, w / 2, h / 2 + size * 0.04)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  tex.generateMipmaps = true
  tex.minFilter = THREE.LinearMipmapLinearFilter
  return { tex, aspect: w / h }
}

export const label = (text, height, o = {}) => {
  const { tex, aspect } = textTexture(text, o)
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(height * aspect, height),
    new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: 0.6, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4 }),
  )
  m.receiveShadow = true
  return m
}
