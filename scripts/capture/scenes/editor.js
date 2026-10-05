const $ = (selector, root = document) => root.querySelector(selector)
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)]

const viewport = $('.viewport')
const frames = $$('iframe', viewport)
const save = $('[data-save]')
const width = Number(viewport.dataset.width)
const scale = viewport.clientWidth / width

const place = (doc, selector, after) => doc.querySelector(after).after(doc.querySelector(selector))

const prepare = (frame) => {
  const { focus, start } = frame.dataset
  if (!focus) return
  const doc = frame.contentDocument
  if (start) place(doc, focus, start)
  doc.querySelector(focus).classList.add('ed-selected')
}

for (const frame of frames) {
  frame.style.width = `${width}px`
  frame.style.height = `${viewport.clientHeight / scale}px`
  frame.style.transform = `scale(${scale})`
  frame.addEventListener('load', () => prepare(frame))
}

const show = (name) => {
  for (const frame of frames) frame.classList.toggle('is-active', frame.dataset.state === name)
  const { contentDocument: doc, dataset } = $('iframe.is-active', viewport)
  if (!dataset.reveal) return
  const scroller = $('[data-scroll]', doc)
  scroller.scrollTop += $(dataset.reveal, doc).getBoundingClientRect().top - 70
}

const dirty = () => {
  save.disabled = false
  save.className = 'k-btn is-primary'
  save.textContent = 'Save'
}

save.addEventListener('click', () => {
  save.classList.add('is-busy')
  setTimeout(() => {
    save.className = 'k-btn is-saved'
    save.textContent = 'Saved'
  }, 600)
})

$('[data-toggle]')?.addEventListener('click', ({ currentTarget }) => {
  currentTarget.setAttribute('aria-checked', 'true')
  currentTarget.closest('.embed').classList.add('is-on')
  show('on')
  dirty()
})

const picker = $('[data-picker]')

$('[data-add]')?.addEventListener('click', ({ currentTarget }) => {
  picker.style.top = `${currentTarget.offsetTop + currentTarget.offsetHeight + 4}px`
  picker.classList.add('is-open')
})

$('[data-pick]')?.addEventListener('click', () => {
  picker.classList.remove('is-open')
  $('[data-slot]').replaceWith($('[data-node]').content.cloneNode(true))
  show('on')
  dirty()
})

const rows = $('[data-rows]')
const block = $('[data-block]')

block?.addEventListener('pointerdown', (event) => {
  event.preventDefault()
  stage.clear()
  const tree = rows.parentNode
  const toLocal = ({ clientX, clientY }) => {
    const { x, y, s } = stage.camera()
    return { x: (clientX - x) / s, y: (clientY - y) / s }
  }
  const origin = stage.local(block)
  const grab = toLocal(event)
  const ghost = block.cloneNode(true)
  ghost.classList.add('ed-ghost')
  ghost.removeAttribute('data-block')
  Object.assign(ghost.style, { width: `${origin.w}px`, height: `${origin.h}px`, left: `${origin.x}px`, top: `${origin.y}px` })
  $('#stage').append(ghost)
  const line = document.createElement('div')
  line.className = 'drop-line'
  tree.append(line)
  block.classList.add('is-lifted')
  let before = null

  const move = (moveEvent) => {
    const point = toLocal(moveEvent)
    ghost.style.left = `${origin.x + point.x - grab.x}px`
    ghost.style.top = `${origin.y + point.y - grab.y}px`
    const others = [...rows.children].filter((node) => node !== block)
    before = others.find((node) => point.y < stage.local(node).y + stage.local(node).h / 2) ?? null
    const edge = before ? stage.local(before).y : stage.local(others.at(-1)).y + stage.local(others.at(-1)).h
    line.style.top = `${edge - stage.local(tree).y - 1}px`
  }

  const end = () => {
    document.removeEventListener('pointermove', move)
    document.removeEventListener('pointerup', end)
    ghost.remove()
    line.remove()
    block.classList.remove('is-lifted')
    rows.insertBefore(block, before)
    const frame = $('iframe.is-active', viewport)
    place(frame.contentDocument, frame.dataset.focus, block.previousElementSibling.dataset.anchor)
    dirty()
  }

  move(event)
  document.addEventListener('pointermove', move)
  document.addEventListener('pointerup', end)
})
