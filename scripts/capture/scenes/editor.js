var frame = document.querySelector('[data-preview]')
var viewport = frame.parentNode
var scale = viewport.clientWidth / 600
frame.style.transform = 'scale(' + scale + ')'
frame.style.height = viewport.clientHeight / scale + 'px'

var save = document.querySelector('[data-save]')
var dirty = function () {
  save.disabled = false
  save.classList.remove('is-saved')
  save.textContent = 'Save'
}

var reveal = function () {
  frame.addEventListener('load', function () {
    var target = frame.dataset.focus && frame.contentDocument.querySelector(frame.dataset.focus)
    if (target) frame.contentWindow.scrollTo({ top: target.getBoundingClientRect().top - 110, behavior: 'smooth' })
  }, { once: true })
  frame.src = frame.dataset.on
}

var toggle = document.querySelector('[data-toggle]')
if (toggle) toggle.addEventListener('click', function () {
  toggle.setAttribute('aria-checked', 'true')
  toggle.closest('.embed').classList.add('is-on')
  dirty()
})

var picker = document.querySelector('[data-picker]')
var add = document.querySelector('[data-add]')
if (add) add.addEventListener('click', function () { picker.classList.add('is-open') })

var pick = document.querySelector('[data-pick]')
if (pick) pick.addEventListener('click', function () {
  picker.classList.remove('is-open')
  var node = document.createElement('div')
  node.className = 'node is-child is-new'
  node.innerHTML = pick.dataset.node
  document.querySelector('[data-slot]').replaceWith(node)
  reveal()
  dirty()
})

save.addEventListener('click', function () {
  save.disabled = true
  save.textContent = 'Saving'
  setTimeout(function () {
    save.textContent = 'Saved'
    save.classList.add('is-saved')
    if (document.body.dataset.mode === 'embed') reveal()
  }, 450)
})
