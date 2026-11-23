import type { Metadata } from 'next'

import { HubItem, LegalShell } from '@/components/legal-shell'
import { posts } from '@/lib/posts'
import { siteConfig } from '@/lib/site'

const description =
  'Practical guides for Shopify merchants on volume discounts, product bundles and combined listings.'

export const metadata: Metadata = {
  title: 'Blog',
  description,
  alternates: { canonical: '/blog' },
  openGraph: { title: 'Blog — Solora', description, url: '/blog', images: [siteConfig.ogImage] },
}

const BlogPage = () => (
  <LegalShell title="Blog" back={{ href: '/', label: 'Back to home' }} prose={false}>
    <p className="text-muted-foreground">{description}</p>
    <div className="mt-6 grid gap-3">
      {posts.map(({ slug, title, description }) => (
        <HubItem key={slug} href={`/blog/${slug}`} title={title} description={description} />
      ))}
    </div>
  </LegalShell>
)

export default BlogPage
