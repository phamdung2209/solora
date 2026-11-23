import type { Metadata } from 'next'

import { LegalShell } from '@/components/legal-shell'
import { getPost } from '@/lib/posts'
import { siteConfig } from '@/lib/site'

const post = getPost('quantity-breaks-volume-discounts-tiered-pricing')

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    type: 'article',
    title: post.title,
    description: post.description,
    url: `/blog/${post.slug}`,
    images: [siteConfig.ogImage],
  },
}

const PostPage = () => (
  <LegalShell title={post.title} updated={post.date} back={{ href: '/blog', label: 'All articles' }}>
    <p>
      Quantity breaks, volume discounts and tiered pricing all describe the same basic idea: the more a customer
      buys, the less they pay per item. In everyday use the three terms are interchangeable, and most merchants
      searching for one are happy with any of them. There are small differences, though, and they matter when you set
      up a real offer on Shopify.
    </p>

    <h2>What the three terms usually mean</h2>
    <ul>
      <li>
        <strong>Quantity break:</strong> a threshold on a single product. &ldquo;Buy 3, get 10% off.&rdquo; The
        phrase is most common on product pages, where a small table shows the thresholds.
      </li>
      <li>
        <strong>Volume discount:</strong> the broader, older term. It often implies larger quantities and can apply
        to a whole order (&ldquo;spend over a set amount&rdquo;) rather than to one product.
      </li>
      <li>
        <strong>Tiered pricing:</strong> a ladder of several steps, each with its own price or discount. Buy 2, 5 or
        10 and you land on a different tier each time.
      </li>
    </ul>
    <p>
      So a quantity break is one step, tiered pricing is several steps, and a volume discount is the umbrella term.
      Nobody enforces these definitions, so check what an offer actually does rather than what it is called.
    </p>

    <h2>Per-item tiers versus order-level discounts</h2>
    <p>
      The distinction that really changes behaviour is what the quantity is counted against. With a per-item tier,
      the discount depends on how many of that product the customer buys. With an order-level discount, it depends
      on the whole cart, for example the total spend or the total number of items.
    </p>
    <p>
      Per-item tiers are easy for shoppers to understand because the offer sits next to the product. Order-level
      discounts suit stores that want to raise the basket size across the catalogue. Neither is better in general.
      Pick the one that matches what you want customers to do.
    </p>
    <p>
      There is a second detail worth deciding up front: whether quantity is counted per cart line or across
      variants. If a shopper buys one small and one large of the same product, are those two items of one product, or
      two separate lines of one each? Different tools answer this differently, so confirm it before you promise
      anything on your product page.
    </p>

    <h2>When a store should use them</h2>
    <ul>
      <li>
        <strong>Consumables and refills.</strong> Customers who like a product often buy it again, and a bigger
        bundle suits them.
      </li>
      <li>
        <strong>Products people buy in sets.</strong> Cups, socks, stickers and similar items where a pair or a
        dozen feels natural.
      </li>
      <li>
        <strong>Low-cost items with healthy margins.</strong> A small per-item discount on a larger quantity can
        still leave a good order.
      </li>
      <li>
        <strong>Wholesale-style buyers.</strong> Small businesses and gift buyers often expect a better price for
        larger quantities.
      </li>
    </ul>
    <p>
      They are a weaker fit for one-off, high-ticket items that nobody buys two of. Run the numbers on your margin
      first: a discount that looks generous on the page should still leave you profit at the top tier.
    </p>

    <h2>How the discount reaches Shopify checkout</h2>
    <p>
      Shopify offers two ways to apply a discount, and this choice shapes the shopper&rsquo;s experience.
    </p>
    <ul>
      <li>
        <strong>Discount codes.</strong> The shopper types a code at checkout. It works, but it adds friction, and
        shoppers who do not have the code never see the saving.
      </li>
      <li>
        <strong>Automatic discounts.</strong> No code needed. The discount is applied as soon as the cart meets the
        conditions, and the saving shows in the cart and at checkout.
      </li>
    </ul>
    <p>
      For quantity breaks, automatic discounts are the natural fit: the whole point is that buying more is rewarded
      without asking the shopper to do anything extra. Whichever route you use, the price shown on the product page
      may stay at the normal price, with the saving appearing once the cart qualifies. That is why it helps to show
      the tiers on the product page itself, so shoppers know the saving exists before they add to cart.
    </p>
    <p>
      Also check how the discount combines with others. Shopify lets a discount be set to combine, or not, with other
      product, order or shipping discounts. If a customer expects two offers to stack and they do not, the combine
      settings are the first place to look.
    </p>

    <h2>How to design sensible tiers</h2>
    <ul>
      <li>
        <strong>Keep it to three or four tiers.</strong> More steps make the table harder to read and the decision
        harder to make.
      </li>
      <li>
        <strong>Make each step worth it.</strong> A higher quantity should always earn a bigger saving. If it does
        not, the table will confuse people.
      </li>
      <li>
        <strong>Start from a quantity people already buy.</strong> If most customers buy one or two, a first tier at
        2 or 3 feels reachable. A first tier at 50 will be ignored.
      </li>
      <li>
        <strong>Highlight one tier.</strong> Marking a single step as the best value gives shoppers an obvious
        target.
      </li>
      <li>
        <strong>Check the margin at the top tier.</strong> Work out the profit per order, not only the discount
        percentage.
      </li>
      <li>
        <strong>Choose the discount type deliberately.</strong> A percentage off is easy to read, while a fixed
        price per item is clearer when you want to show an exact unit price.
      </li>
    </ul>

    <h2>Common mistakes to avoid</h2>
    <p>
      The most frequent problem is a mismatch between what the product page promises and what checkout does. Test
      your offer with a real cart before you publish it, including a cart with several variants and a cart in a
      different currency if you sell internationally. Another is running several overlapping offers on the same
      product without knowing which one wins. Keep offers simple, and write down which products each one covers.
    </p>

    <h2>Doing it with Tierly</h2>
    <p>
      If you want a ready-made way to run these offers, Tierly is one option. You build a quantity ladder in the app
      (for example, buy 10, save 10%) and Tierly turns it into an automatic discount at checkout, so shoppers need no
      code. It supports percentage off, an amount off per item, and a fixed price per item.
    </p>
    <p>
      A few specifics, so you know what to expect. Tierly leaves the price on the product page alone, and the saving
      appears in the cart and at checkout once a line reaches a tier. It picks the tier from the quantity of each
      cart line, so two variants or two different products do not add up to a tier. The highest tier reached applies
      and tiers do not stack. The storefront shows a price table on product pages and an upsell on the cart page,
      and the app has a free plan that runs one active offer.
    </p>
    <p>
      You can find Tierly on the{' '}
      <a href="https://apps.shopify.com/solora-tierly" target="_blank" rel="noopener noreferrer">
        Shopify App Store
      </a>
      , and the setup steps are in the <a href="/tierly/docs">Tierly docs</a>.
    </p>
  </LegalShell>
)

export default PostPage
