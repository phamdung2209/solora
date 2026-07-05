import type { Metadata } from 'next'

import { LegalShell } from '@/components/legal-shell'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Tierly — Terms of Service',
  description: 'Terms of service for the Tierly Shopify app.',
  alternates: { canonical: '/tierly/terms' },
  openGraph: {
    title: 'Tierly — Terms of Service | Solora',
    description: 'Terms of service for the Tierly Shopify app.',
    url: '/tierly/terms',
  },
}

const TierlyTermsPage = () => {
  return (
    <LegalShell
      title="Tierly — Terms of Service"
      updated={siteConfig.lastUpdated}
      back={{ href: '/terms', label: 'All terms' }}
    >
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the{' '}
        <strong>Tierly</strong> app by Solora (&ldquo;Tierly&rdquo;, &ldquo;the
        Service&rdquo;). By installing or using Tierly you agree to these Terms.
      </p>

      <h2>1. The Service</h2>
      <p>
        Tierly lets Shopify merchants create volume and tiered pricing offers that apply
        automatically at checkout, display pricing on the storefront, and view related
        analytics.
      </p>

      <h2>2. Eligibility &amp; account</h2>
      <p>
        You must have an active Shopify store and comply with Shopify&rsquo;s terms. You are
        responsible for the configuration you create and for the accuracy of the discounts
        you set up.
      </p>

      <h2>3. Plans &amp; billing</h2>
      <p>
        Tierly offers a Free plan and a paid Pro plan. Paid subscriptions are billed through
        Shopify&rsquo;s billing system and are subject to Shopify&rsquo;s terms. Prices are
        shown in the app and may change with notice. The Pro plan may include a free trial;
        you can cancel at any time and will retain Pro features until the end of the current
        billing period.
      </p>

      <h2>4. Acceptable use</h2>
      <p>
        You agree not to misuse the Service, including by attempting to disrupt it,
        reverse-engineer it, or use it in violation of any law or Shopify policy.
      </p>

      <h2>5. Availability</h2>
      <p>
        We work to keep the Service available and reliable but do not guarantee uninterrupted
        access. The Service is provided &ldquo;as is&rdquo; without warranties of any kind.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Solora shall not be liable for any indirect,
        incidental, or consequential damages, or for lost profits or revenue, arising from
        your use of the Service.
      </p>

      <h2>7. Termination</h2>
      <p>
        You may stop using the Service and uninstall it at any time. We may suspend or
        terminate access for violation of these Terms.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may update these Terms from time to time; the &ldquo;Last updated&rdquo; date
        reflects the latest version.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about these Terms? Email{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </LegalShell>
  )
}

export default TierlyTermsPage
