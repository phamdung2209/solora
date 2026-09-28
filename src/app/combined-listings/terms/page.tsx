import type { Metadata } from 'next'

import { LegalShell } from '@/components/legal-shell'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Combined Listings — Terms of Service',
  description: 'Terms of service for the Solora: Combined Listings Shopify app.',
  alternates: { canonical: '/combined-listings/terms' },
  openGraph: {
    title: 'Combined Listings — Terms of Service | Solora',
    description: 'Terms of service for the Solora: Combined Listings Shopify app.',
    url: '/combined-listings/terms',
    images: [siteConfig.ogImage],
  },
}

const CombinedListingsTermsPage = () => {
  return (
    <LegalShell
      title="Combined Listings — Terms of Service"
      updated={siteConfig.lastUpdated.combinedListingsTerms}
      back={{ href: '/terms', label: 'All terms' }}
    >
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the{' '}
        <strong>Solora: Combined Listings</strong> app by {siteConfig.legalEntity} (&ldquo;Combined
        Listings&rdquo;, &ldquo;the Service&rdquo;). By installing or using Combined Listings you
        agree to these Terms.
      </p>

      <h2>1. The Service</h2>
      <p>
        Combined Listings lets Shopify merchants link separate products into one combined listing,
        show colour and image swatches on product, collection and search pages, filter the product
        gallery by the selected variant, and show one collection card per variant.
      </p>

      <h2>2. Service changes</h2>
      <p>
        Combined Listings is under active development. Features may change, or be withdrawn, and we
        may discontinue the Service with notice.
      </p>

      <h2>3. Eligibility &amp; account</h2>
      <p>
        You must have an active Shopify store and comply with Shopify&rsquo;s terms. You are
        responsible for the configuration you create and for the accuracy of the groups and
        settings you set up.
      </p>

      <h2>4. Plans &amp; billing</h2>
      <p>
        Combined Listings offers a Free plan and three paid monthly plans — Starter, Growth and Pro
        — that differ only in how many groups you can create. Paid subscriptions are billed through
        Shopify&rsquo;s billing system and are subject to Shopify&rsquo;s terms. Current prices are
        $9.99, $19.99 and $39.99 per month; a shop&rsquo;s first paid subscription includes a 7-day
        free trial. Prices are shown in the app and may change with notice.
      </p>
      <p>
        You can cancel at any time. Cancelling moves your store to the Free plan immediately and
        Shopify credits the unused part of the billing period. Moving to a lower paid plan takes
        effect at your next billing cycle. On any plan, groups you already have are{' '}
        <strong>never deleted or switched off</strong>; a plan&rsquo;s limit only stops new groups
        from being created.
      </p>

      <h2>5. Roadmap</h2>
      <p>
        Content you submit to the Roadmap board inside the app may be published to
        other Combined Listings merchants alongside your store name, so do not submit anything
        confidential. We review submissions and may edit, decline, or remove them. Posting a
        request does not obligate us to build it, and you grant us the right to implement it
        without compensation.
      </p>

      <h2>6. Acceptable use</h2>
      <p>
        You agree not to misuse the Service, including by attempting to disrupt it,
        reverse-engineer it, or use it in violation of any law or Shopify policy.
      </p>

      <h2>7. Availability</h2>
      <p>
        We work to keep the Service available and reliable but do not guarantee uninterrupted
        access. The Service is provided &ldquo;as is&rdquo; without warranties of any kind.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, {siteConfig.legalEntity} shall not be liable for any indirect,
        incidental, or consequential damages, or for lost profits or revenue, arising from
        your use of the Service.
      </p>

      <h2>9. Termination</h2>
      <p>
        You may stop using the Service and uninstall it at any time. We may suspend or
        terminate access for violation of these Terms.
      </p>

      <h2>10. Changes</h2>
      <p>
        We may update these Terms from time to time; the &ldquo;Last updated&rdquo; date
        reflects the latest version.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about these Terms? Email{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </LegalShell>
  )
}

export default CombinedListingsTermsPage
