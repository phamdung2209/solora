export const posts = [
  {
    slug: 'quantity-breaks-volume-discounts-tiered-pricing',
    title: 'Quantity breaks, volume discounts and tiered pricing: what’s the difference?',
    description:
      'Three names for buying more and paying less per item. What each one means on Shopify, when to use it, and how the discount reaches checkout.',
    date: 'November 23, 2026',
  },
  {
    slug: 'shopify-bundle-types-compared',
    title: 'Frequently bought together, mix and match or BOGO: which bundle fits your store?',
    description:
      'Three common bundle types for Shopify stores, what each is good at, and why a bundle does not need its own SKU.',
    date: 'November 23, 2026',
  },
  {
    slug: 'shopify-combined-listings-vs-variants',
    title: 'Shopify combined listings: should each color be its own product?',
    description:
      'Variants or separate products for each color? The trade-offs, and how swatches link separate products into one listing.',
    date: 'November 23, 2026',
  },
] as const

export type PostSlug = (typeof posts)[number]['slug']

export const getPost = (slug: PostSlug) => posts.find((post) => post.slug === slug)!
