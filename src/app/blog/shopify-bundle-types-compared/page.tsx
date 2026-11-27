import type { Metadata } from 'next'
import Link from 'next/link'

import { LegalShell } from '@/components/legal-shell'
import { getPost } from '@/lib/posts'
import { siteConfig } from '@/lib/site'

const post = getPost('shopify-bundle-types-compared')

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
      Short answer: use <strong>frequently bought together</strong> when products naturally go with one another, <strong>mix and match</strong> when
      customers can pick any few items from a group, and <strong>buy X get Y (BOGO)</strong> when you want to move a specific product or clear
      stock. All three can run on the same store. Here is what each one is, who it suits and how to set it up well.
    </p>

    <h2>Frequently bought together</h2>
    <p>
      A fixed set of products offered as one package, usually shown on a product page: &ldquo;this item plus these two.&rdquo; The shopper
      adds the whole set with one click and sees the saving next to the total.
    </p>
    <p>
      It suits catalogs where products are complements rather than alternatives: a camera and a memory card, a shampoo and a conditioner, a
      jacket and a scarf. The goal is a higher order value, and the tactic is convenience: you do the thinking so the customer does not have
      to hunt for the matching item.
    </p>
    <ul>
      <li>Keep the set small. Two or three products read as a natural pairing; a long list reads as a sales pitch.</li>
      <li>Pair items that really belong together, and put the bundle on the product page of the main item.</li>
      <li>Allow quantities where it makes sense, for example a device with two refills.</li>
    </ul>

    <h2>Mix and match</h2>
    <p>
      The customer chooses their own items from a group and gets a deal once they reach a number: &ldquo;pick any 3 and save 15%.&rdquo; You
      define the pool of eligible products and the minimum count, and the shopper builds the combination.
    </p>
    <p>
      It suits catalogs with many similar, interchangeable items: candles, teas, socks, skincare minis, snack flavours. It works well when
      shoppers like variety and hesitate over which single item to buy, because the deal pushes them to take several.
    </p>
    <ul>
      <li>Make sure the pool has enough products to feel like a real choice, not just the minimum.</li>
      <li>Set the minimum at a level your average customer can reach without feeling pushed.</li>
      <li>Keep the eligible products in a similar price range so the discount stays predictable for you.</li>
    </ul>

    <h2>Buy X get Y (BOGO)</h2>
    <p>
      The customer buys one set of products and gets another at a discount, or free. &ldquo;Buy one shirt, get a second 50% off&rdquo; and
      &ldquo;buy a printer, get ink free&rdquo; are both BOGO. The Buy side and the Get side can be different products or the same product.
    </p>
    <p>
      It suits stores that want to clear slow stock, introduce a new product next to a bestseller, or reward a larger first purchase. The goal
      is usually volume or product discovery rather than pure average order value.
    </p>
    <ul>
      <li>Do the margin math first. A free item is a 100% discount on that product, so check you are still profitable.</li>
      <li>Use the Get side for the products you most want to move.</li>
      <li>A percentage off the Get item is gentler than free and often enough to trigger the purchase.</li>
    </ul>

    <h2>How to choose between them</h2>
    <p>
      Start from the problem. If customers buy one item and leave, and you have natural add-ons, use frequently bought together. If you sell
      lots of similar items and want bigger baskets, use mix and match. If you have stock to move or a product to launch, use BOGO.
    </p>
    <p>
      You do not have to pick only one. A common setup is frequently bought together on your top product pages, mix and match for a category
      of small items, and a BOGO for a seasonal push. Just avoid stacking so many offers on one product that the shopper cannot tell which
      deal applies.
    </p>

    <h2>Do you need a bundle SKU or inventory sync?</h2>
    <p>
      Not necessarily. There are two ways to build a bundle. One is to create a new product that stands for the bundle, with its own SKU and
      stock count. The catch is that you then have to keep that count in step with the stock of the items inside it, or you risk selling
      bundles you cannot fulfil.
    </p>
    <p>
      The other is to treat the bundle as a discount rule. The customer adds the real products to the cart, and a discount reduces the price
      when the right combination is present. The products keep their own SKUs and their own stock, so orders reduce inventory exactly as
      normal and there is no extra product to maintain or reconcile. You also avoid a second catalog entry that can drift out of date. The
      trade-off is that the bundle appears as a discount line on the order rather than as a single product.
    </p>

    <h2>Tips for any bundle</h2>
    <ul>
      <li>Check the discount at checkout in a test cart, not just on the product page.</li>
      <li>Name the bundle clearly, since the name is often what shoppers and your reports will see.</li>
      <li>Decide up front how the bundle should combine with your other discounts, so you are not surprised by the final price.</li>
      <li>Review which bundles actually get used, and retire the ones that do not.</li>
    </ul>

    <h2>Trying this with Mixly</h2>
    <p>
      Mixly is a Shopify app we build that offers all three types: Frequently Bought Together, Build Your Own (shown as &ldquo;Mix &amp;
      match&rdquo; in the theme editor) and BOGO (&ldquo;Buy X get Y&rdquo;). It follows the discount-rule approach above: a bundle is a rule
      that Shopify applies as an automatic discount at checkout, so nothing is added to your catalogue, no bundle products or inventory are
      created, and product prices never change on the product page. Offers appear on product pages and the cart page. It has a free plan that
      covers one active bundle of the Frequently Bought Together or Buy X Get Y type.
    </p>
    <p>
      You can find it on the{' '}
      <a href="https://apps.shopify.com/solora-mixly-bundles" target="_blank" rel="noopener noreferrer">
        Shopify App Store
      </a>
      , and the <Link href="/mixly/docs">Mixly docs</Link> walk through setup step by step.
    </p>
  </LegalShell>
)

export default PostPage
