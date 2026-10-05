(function () {
  var stage = document.getElementById('stage')
  var camera = { x: 0, y: 0, s: 1 }
  var find = function (target) { return typeof target === 'string' ? document.querySelector(target) : target }
  var clamp = function (value, min, max) { return Math.min(max, Math.max(min, value)) }

  var local = function (el) {
    var r = el.getBoundingClientRect()
    return { x: (r.left - camera.x) / camera.s, y: (r.top - camera.y) / camera.s, w: r.width / camera.s, h: r.height / camera.s }
  }

  var apply = function (next) {
    camera = next
    stage.style.transform = next.s === 1 && !next.x && !next.y ? '' : 'translate(' + next.x + 'px,' + next.y + 'px) scale(' + next.s + ')'
  }

  var plan = function (target, s, focus) {
    var W = stage.clientWidth
    var H = stage.clientHeight
    if (!target || s === 1) return { x: 0, y: 0, s: 1 }
    var box = local(find(target))
    var fx = focus && focus.x != null ? focus.x : 0.5
    var fy = focus && focus.y != null ? focus.y : 0.5
    var cx = box.x + box.w * fx
    var cy = box.y + box.h * fy
    return { x: clamp(W / 2 - cx * s, W - W * s, 0), y: clamp(H / 2 - cy * s, H - H * s, 0), s: s }
  }

  var layer = function () {
    var node = document.getElementById('k-marks')
    if (!node) {
      node = document.createElement('div')
      node.id = 'k-marks'
      node.style.cssText = 'position:absolute;left:0;top:0;width:0;height:0;z-index:2147482000'
      stage.append(node)
    }
    return node
  }

  var corners = {
    tl: function (b) { return [b.x, b.y] },
    tr: function (b) { return [b.x + b.w, b.y] },
    bl: function (b) { return [b.x, b.y + b.h] },
    br: function (b) { return [b.x + b.w, b.y + b.h] },
    l: function (b) { return [b.x - 16, b.y + b.h / 2] },
    r: function (b) { return [b.x + b.w + 16, b.y + b.h / 2] },
    t: function (b) { return [b.x + b.w / 2, b.y - 15] },
  }

  var mark = function (n, target, options) {
    var o = options || {}
    var el = find(target)
    if (!el) throw new Error('No mark target ' + target)
    var pad = o.pad == null ? 4 : o.pad
    var b = local(el)
    var box = { x: b.x - pad, y: b.y - pad, w: b.w + pad * 2, h: b.h + pad * 2 }
    var root = layer()
    if (o.ring !== false) {
      var ring = document.createElement('div')
      ring.className = 'k-ring'
      ring.style.cssText = 'left:' + box.x + 'px;top:' + box.y + 'px;width:' + box.w + 'px;height:' + box.h + 'px;--r:' + (o.radius == null ? 10 : o.radius) + 'px'
      root.append(ring)
    }
    if (n != null) {
      var at = corners[o.side || 'tl'](box)
      var badge = document.createElement('div')
      badge.className = 'k-mark'
      badge.textContent = n
      badge.style.left = at[0] + 'px'
      badge.style.top = at[1] + 'px'
      root.append(badge)
    }
  }

  var unmark = function () {
    var root = document.getElementById('k-marks')
    if (!root) return
    root.querySelectorAll('.k-ring,.k-mark').forEach(function (node) {
      node.classList.add('is-out')
      setTimeout(function () { node.remove() }, 240)
    })
  }

  var clear = function () {
    var root = document.getElementById('k-marks')
    if (root) root.replaceChildren()
  }

  var toast = function (text, ms) {
    document.querySelectorAll('.k-toast').forEach(function (node) { node.remove() })
    var node = document.createElement('div')
    node.className = 'k-toast'
    node.innerHTML = '<span>' + text + '</span><svg viewBox="0 0 12 12"><path d="m3 3 6 6M9 3 3 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
    document.body.append(node)
    if (ms) setTimeout(function () {
      node.classList.add('is-out')
      setTimeout(function () { node.remove() }, 300)
    }, ms)
  }

  var open = function (target) { find(target).classList.add('is-open') }
  var close = function (target) { find(target).classList.remove('is-open') }

  window.stage = {
    local: local,
    plan: plan,
    camera: function () { return camera },
    set: apply,
    mark: mark,
    unmark: unmark,
    clear: clear,
    toast: toast,
    open: open,
    close: close,
  }
})()
