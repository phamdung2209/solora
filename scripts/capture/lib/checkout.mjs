import { escape, money } from './site.mjs'

const tag = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8.6 2.5H13a.5.5 0 0 1 .5.5v4.4L7.6 13.3a1 1 0 0 1-1.4 0L2.7 9.8a1 1 0 0 1 0-1.4Z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="10.6" cy="5.4" r="1.1" fill="currentColor"/></svg>'

const line = ({ art, title, variant, quantity, price }) => `<div class="co-line">
  <span class="co-thumb"><img src="/art/${art}.svg" alt=""><b>${quantity}</b></span>
  <span class="co-name">${escape(title)}${variant ? `<small>${escape(variant)}</small>` : ''}</span>
  <span class="co-amount">${money(price * quantity)}</span>
</div>`

const field = (label, value = '') => `<span class="co-field${value ? ' has-value' : ''}"><small>${label}</small>${value}</span>`

export const checkoutPage = ({ lines, discount }) => {
  const subtotal = lines.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const off = discount?.amount ?? 0
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Checkout</title>
<link rel="stylesheet" href="/scene/kit/kit.css">
<link rel="stylesheet" href="/scene/kit/checkout.css">
</head>
<body>
<div id="stage">
  <div class="co-browser"><span class="co-dots"><i></i><i></i><i></i></span><span class="co-url"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1a2.5 2.5 0 0 0-2.5 2.5V5H3a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-.5V3.5A2.5 2.5 0 0 0 6 1Zm1.5 4h-3V3.5a1.5 1.5 0 0 1 3 0V5Z" fill="currentColor"/></svg>demo-store.example/checkouts/cn/a1b2c3</span></div>
  <div class="co">
    <section class="co-form">
      <div class="co-brand"><span class="co-logo"></span>Demo Store</div>
      <h2>Contact</h2>
      ${field('Email', 'alex@example.com')}
      <h2>Delivery</h2>
      ${field('Country/Region', 'United States')}
      <div class="co-two">${field('First name', 'Alex')}${field('Last name', 'Rivera')}</div>
      ${field('Address', '120 Market Street')}
      <button class="co-pay" type="button">Pay now</button>
    </section>
    <aside class="co-summary" data-summary>
      ${lines.map(line).join('')}
      <div class="co-code">${field('Discount code or gift card')}<button type="button">Apply</button></div>
      <div class="co-row"><span>Subtotal</span><span>${money(subtotal)}</span></div>
      ${discount ? `<div class="co-row co-discount" data-discount><span>${discount.kind ?? 'Order discount'}<em>${tag}${escape(discount.label)}</em></span><span>&minus;${money(off)}</span></div>` : ''}
      <div class="co-row"><span>Shipping</span><span class="co-muted">Free</span></div>
      <div class="co-row co-total"><span>Total</span><span><small>USD</small>${money(subtotal - off)}</span></div>
      ${discount ? `<div class="co-savings" data-savings>${tag}Total savings <b>${money(off)}</b></div>` : ''}
    </aside>
  </div>
</div>
<script src="/scene/kit/kit.js"></script>
</body>
</html>`
}
