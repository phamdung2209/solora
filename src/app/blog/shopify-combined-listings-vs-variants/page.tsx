import type { Metadata } from 'next'
import Link from 'next/link'

import { LegalShell } from '@/components/legal-shell'
import { getPost } from '@/lib/posts'
import { siteConfig } from '@/lib/site'

const post = getPost('shopify-combined-listings-vs-variants')

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
      Short answer: use variants when the options are really the same product (a size or a color of one item that
      shares photos, description and stock logic), and use separate products when each option needs to stand on its own
      with its own page, photos, copy or inventory. Many stores end up wanting both: separate products for each color,
      shown to shoppers as one family. That is what &ldquo;combined listings&rdquo; means.
    </p>

    <h2>What variants are good at</h2>
    <p>
      A variant is one purchasable version of a single product, defined by options such as size or color. Everything
      lives on one product page: one title, one description, one URL, one set of reviews if you use a review app.
      Shoppers switch options without leaving the page.
    </p>
    <p>
      That is simple to manage. You edit the description once, set up the product once, and the theme already knows how
      to render a variant picker. For options like size, where the product is genuinely identical apart from one
      attribute, variants are usually the right tool.
    </p>

    <h2>Where variants start to hurt</h2>
    <p>Color and style are where variants get awkward, because those options often change a lot more than a label:</p>
    <ul>
      <li>
        <strong>One page for everything.</strong> A red tee and a black tee share one title, one description and one
        URL. If you want to write copy or choose a page address for a single color, you can&rsquo;t.
      </li>
      <li>
        <strong>One shared gallery.</strong> All photos for all colors sit on the same product, so you have to keep them
        organized and make sure the right images appear when a variant is selected.
      </li>
      <li>
        <strong>Collection cards show one product.</strong> A collection grid lists the product once, so a shopper
        browsing for blue sees whichever image the card uses, not necessarily the blue one.
      </li>
      <li>
        <strong>Shared product-level settings.</strong> Things you set on the product itself, like its tags, its
        collections or its template, apply to every variant together.
      </li>
    </ul>

    <h2>What separate products give you</h2>
    <p>Making each color its own product flips those trade-offs:</p>
    <ul>
      <li>
        <strong>Its own page.</strong> Each color has its own title, description and URL, so you can share a link to
        exactly the blue one.
      </li>
      <li>
        <strong>Its own photos.</strong> The gallery only contains that color, with no filtering needed.
      </li>
      <li>
        <strong>Its own stock picture.</strong> Whether the blue tee is available is a property of the blue tee
        product, easy to see in your product list.
      </li>
      <li>
        <strong>Its own place in collections.</strong> Each color can be a card of its own in a grid.
      </li>
    </ul>

    <h2>The cost of separate products</h2>
    <p>
      The downside is that shoppers lose the single place where they compare options. Without something to connect the
      products, someone on the red tee has no obvious way to see that a blue one exists. You also have more products to
      maintain: if you change a shared description or a size guide, you change it in several places. And your product
      list grows, which can make it harder to scan.
    </p>
    <p>
      Neither approach is wrong. Variants favor easy maintenance; separate products favor flexibility per option. The
      choice depends on how different your colors or styles really are from each other.
    </p>

    <h2>What &ldquo;combined listings&rdquo; means</h2>
    <p>
      A combined listing is a group of separate products presented to the shopper as one family. You keep a product per
      color, and a row of swatches on each product page lets the shopper jump between them. The shopper gets the
      browsing feel of variants; you keep the freedom of separate products.
    </p>
    <p>
      Shopify has its own Combined Listings app, aimed at Shopify Plus merchants. Other approaches exist for stores that
      want the same idea on any plan, including swatch apps that link ordinary products together.
    </p>

    <h2>How swatches link separate products</h2>
    <p>
      The mechanism is simple. A group has a name for the thing that differs, such as &ldquo;Color&rdquo;, and a list
      of member products, each with its own value (Red, Blue, Black) and a swatch to represent it: a color, a picture
      or a text label. Every member product shows the same row of swatches, with the current product highlighted.
      Clicking a swatch is a normal link to the other product&rsquo;s own page.
    </p>
    <p>
      Because each click loads a different product page, each page can have its own photos and description, and the
      product you land on is exactly the one you picked. The trade-off is that switching colors is a page load rather
      than an in-page change.
    </p>

    <h2>How to decide</h2>
    <ul>
      <li>
        Options that only differ in size or fit, with the same photos and copy: <strong>variants</strong>.
      </li>
      <li>
        Options that need different photos, descriptions or page addresses, or that you want as separate cards in a
        collection: <strong>separate products</strong>.
      </li>
      <li>
        A family of products where you want shoppers to move between them easily:{' '}
        <strong>separate products plus a swatch row</strong>.
      </li>
    </ul>
    <p>
      You can also mix: separate products per color, each with size as a normal variant. A group links the colors, and
      sizes stay inside each product.
    </p>

    <h2>Trying it with Solora: Combined Listings</h2>
    <p>
      Solora: Combined Listings is one option for the swatch approach. You create a group, add your products, give each
      an option value and a swatch (color, image or text), and the app shows the swatch row on the product pages of
      those products. It can also show swatches on collection and search cards. The app stores swatch data on the member
      products and does not edit your products, variants, prices, images, inventory or theme files.
    </p>
    <p>
      It also has a few optional extras, such as live stock and price on hover and showing a separate card for each
      option value on collection pages. You can find it on the{' '}
      <a href="https://apps.shopify.com/solora-combined-listings" target="_blank" rel="noopener noreferrer">
        Shopify App Store
      </a>
      , and the setup steps are on the <Link href="/combined-listings/docs">Combined Listings docs page</Link>.
    </p>
  </LegalShell>
)

export default PostPage
