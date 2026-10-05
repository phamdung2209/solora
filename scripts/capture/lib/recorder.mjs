import { writeFile } from 'node:fs/promises'

import sharp from 'sharp'

const FRAME_MS = 80

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

const CURSOR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="26" viewBox="0 0 22 26"><path d="M2 1.5 L2 20.5 L7 15.8 L10.4 23.6 L14 22 L10.7 14.4 L17.6 14.4 Z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>`

const installCursor = ({ svg, x, y, down }) => {
  let cursor = document.getElementById('__cursor')
  if (!cursor) {
    const style = document.createElement('style')
    style.textContent = `#__cursor{position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;width:22px;height:26px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.28));transition:none}
#__cursor svg{display:block;transform-origin:2px 2px;transition:transform .12s ease}
#__cursor.down svg{transform:scale(.86)}
#__cursor i{position:absolute;left:-16px;top:-16px;width:36px;height:36px;border-radius:50%;background:rgba(17,17,17,.16);transform:scale(.2);opacity:0}
#__cursor.down i{transform:scale(1);opacity:1;transition:transform .22s ease-out,opacity .22s ease-out}`
    document.documentElement.append(style)
    cursor = document.createElement('div')
    cursor.id = '__cursor'
    cursor.innerHTML = `<i></i>${svg}`
    document.documentElement.append(cursor)
  }
  cursor.style.transform = `translate(${x}px, ${y}px)`
  cursor.classList.toggle('down', down)
}

export class Recorder {
  constructor(page) {
    this.page = page
    this.frames = []
    this.pos = { x: -40, y: -40 }
    this.down = false
    this.cursor = false
  }

  async point(target) {
    if (typeof target !== 'string') return target
    const box = await this.page.locator(target).first().boundingBox()
    if (!box) throw new Error(`No box for ${target}`)
    return { x: box.x + box.width / 2, y: box.y + box.height / 2 }
  }

  async drawCursor() {
    if (!this.cursor) return
    await this.page.evaluate(installCursor, { svg: CURSOR_SVG, ...this.pos, down: this.down }).catch(() => this.page.waitForLoadState('load'))
  }

  async snap(delay = FRAME_MS) {
    await this.drawCursor()
    const png = await this.page.screenshot({ type: 'png', animations: 'allow', caret: 'hide' })
    const last = this.frames.at(-1)
    if (last && last.png.equals(png)) last.delay += delay
    else this.frames.push({ png, delay })
  }

  async still() {
    this.posterPng = await this.page.screenshot({ type: 'png', animations: 'disabled', caret: 'hide', style: '#__cursor{display:none}' })
  }

  async hold(ms) {
    await this.snap(ms)
  }

  async show(at) {
    this.cursor = true
    this.pos = await this.point(at)
  }

  async move(target, ms = 640) {
    this.cursor = true
    const from = { ...this.pos }
    const to = await this.point(target)
    const steps = Math.max(2, Math.round(ms / FRAME_MS))
    for (let i = 1; i <= steps; i++) {
      const t = easeInOut(i / steps)
      this.pos = { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t }
      await this.page.mouse.move(this.pos.x, this.pos.y)
      await this.snap()
    }
  }

  async click(target, { move = 640, after, keepMarks } = {}) {
    if (target) await this.move(target, move)
    this.down = true
    await this.snap(FRAME_MS)
    await this.page.mouse.down()
    await this.page.mouse.up()
    this.down = false
    if (!keepMarks) await this.page.evaluate(() => window.stage?.clear()).catch(() => {})
    if (after) await after()
    await this.snap(FRAME_MS)
  }

  async drag(from, to, { move = 480, ms = 760 } = {}) {
    await this.move(from, move)
    this.down = true
    await this.page.mouse.down()
    await this.snap()
    await this.move(to, ms)
    await this.page.mouse.up()
    this.down = false
    await this.snap()
  }

  async scroll(y, ms = 720) {
    const from = await this.page.evaluate(() => (document.querySelector('[data-scroll]') ?? document.scrollingElement).scrollTop)
    const steps = Math.max(2, Math.round(ms / FRAME_MS))
    for (let i = 1; i <= steps; i++) {
      const top = from + (y - from) * easeInOut(i / steps)
      await this.page.evaluate((value) => {
        ;(document.querySelector('[data-scroll]') ?? document.scrollingElement).scrollTop = value
      }, top)
      await this.snap()
    }
  }

  async zoom(target, scale = 1.6, { ms = 320, focus } = {}) {
    const [from, to] = await this.page.evaluate(([t, s, f]) => [window.stage.camera(), window.stage.plan(t, s, f)], [target, scale, focus])
    const anchor = { x: (this.pos.x - from.x) / from.s, y: (this.pos.y - from.y) / from.s }
    const steps = Math.max(2, Math.round(ms / FRAME_MS))
    for (let i = 1; i <= steps; i++) {
      const k = easeInOut(i / steps)
      const camera = { x: from.x + (to.x - from.x) * k, y: from.y + (to.y - from.y) * k, s: from.s + (to.s - from.s) * k }
      await this.page.evaluate((value) => window.stage.set(value), camera)
      if (this.cursor) this.pos = { x: anchor.x * camera.s + camera.x, y: anchor.y * camera.s + camera.y }
      await this.snap()
    }
  }

  async unzoom(options) {
    await this.zoom(null, 1, options)
  }

  async mark(n, target, options = {}) {
    await this.page.evaluate(([value, t, o]) => window.stage.mark(value, t, o), [n, target, options])
    await this.settle(480)
  }

  async unmark() {
    await this.page.evaluate(() => window.stage.unmark())
    await this.settle(240)
  }

  async type(target, text, { cps = 16 } = {}) {
    await this.page.locator(target).first().focus()
    for (let i = 1; i <= text.length; i++) {
      await this.page.locator(target).first().evaluate((el, value) => {
        el.value = value
        el.dispatchEvent(new Event('input', { bubbles: true }))
      }, text.slice(0, i))
      await this.snap(1000 / cps)
    }
  }

  async annotate(marks) {
    const camera = await this.page.evaluate(() => window.stage.camera())
    await this.page.evaluate((list) => {
      document.activeElement?.blur()
      window.stage.set({ x: 0, y: 0, s: 1 })
      window.stage.clear()
      for (const [n, target, options] of list) window.stage.mark(n, target, options)
    }, marks)
    await this.still()
    await this.page.evaluate((value) => {
      window.stage.clear()
      window.stage.set(value)
    }, camera)
  }

  async settle(ms, step = FRAME_MS) {
    for (let elapsed = 0; elapsed < ms; elapsed += step) {
      await this.page.waitForTimeout(step)
      await this.snap(step)
    }
  }

  async encode(out, { maxBytes = 450_000, width = 960, poster = this.frames.length - 1, stillOut, maxStill = 120_000 }) {
    const delay = this.frames.map((frame) => Math.round(frame.delay))
    const frames = await Promise.all(this.frames.map((frame) => sharp(frame.png).resize(width).png().toBuffer()))
    let bytes
    let quality = 88
    for (; quality >= 72; quality -= 4) {
      const buffer = await sharp(frames, { join: { animated: true } })
        .webp({ quality, effort: 4, loop: 0, delay })
        .toBuffer()
      bytes = buffer
      if (buffer.length <= maxBytes) break
    }
    if (bytes.length > maxBytes) throw new Error(`${out} is ${bytes.length} bytes, over the ${maxBytes} budget even at quality 72; cut full-frame transitions`)
    let still
    let stillQuality = 86
    for (; stillQuality >= 40; stillQuality -= 6) {
      still = await sharp(this.posterPng ?? this.frames[poster].png).webp({ quality: stillQuality, effort: 6, smartSubsample: true }).toBuffer()
      if (still.length <= maxStill) break
    }
    await writeFile(out, bytes)
    await writeFile(stillOut, still)
    return { frames: this.frames.length, bytes: bytes.length, quality, stillBytes: still.length, stillQuality }
  }
}
