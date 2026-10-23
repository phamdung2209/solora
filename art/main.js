import { loadFont, Studio } from './studio.js'
import { scenes } from './scenes.js'

const q = new URLSearchParams(location.search)

window.READY = (async () => {
  await loadFont()
  const studio = new Studio({ passes: Number(q.get('passes') ?? 128), shutter: Number(q.get('shutter') ?? 0), dither: Number(q.get('dither') ?? 1), backdrop: Number(q.get('backdrop') ?? 0) })
  const scene = scenes[q.get('scene')](studio, q.get('app'))
  window.plan = scene.plan
  window.REST = scene.rest ?? 0
  window.render = (t) => studio.draw(t)
  window.renderStill = async (t) => {
    const { passes, shutter } = studio
    const { dither } = studio.outMat.uniforms
    const motion = dither.value
    Object.assign(studio, { passes: 384, shutter: 0 })
    dither.value = 1
    await studio.draw(t)
    Object.assign(studio, { passes, shutter })
    dither.value = motion
  }
})()
