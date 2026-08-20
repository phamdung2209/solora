import type { Metadata } from 'next'

import { LegalShell } from '@/components/legal-shell'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Mixly — Terms of Service',
  description: 'Terms of service for the Mixly Shopify app.',
  alternates: { canonical: '/mixly/terms' },
  openGraph: {
    title: 'Mixly — Terms of Service | Solora',
    description: 'Terms of service for the Mixly Shopify app.',
    url: '/mixly/terms',
  },
}

const MixlyTermsPage = () => {
  return (
    <LegalShell
      title="Mixly — Terms of Service"
      updated={siteConfig.lastUpdated}
      back={{ href: '/terms', label: 'All terms' }}
    >
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the{' '}
        <strong>Mixly</strong> app by Solora (&ldquo;Mixly&rdquo;, &ldquo;the Service&rdquo;).
        By installing or using Mixly you agree to these Terms.
      </p>

      <h2>1. The Service</h2>
      <p>
        Mixly lets Shopify merchants create product bundles — Frequently Bought Together,
        Build Your Own, and BOGO — that discount automatically at checkout, display those
        bundles on the storefront, and view related analytics.
      </p>

      <h2>2. Early access</h2>
      <p>
        Mixly is not currently listed on the Shopify App Store and is offered on an
        invitation basis while it is in beta. Features may change, or be withdrawn, during
        this period, and we may end early access with notice.
      </p>

      <h2>3. Eligibility &amp; account</h2>
      <p>
        You must have an active Shopify store and comply with Shopify&rsquo;s terms. You are
        responsible for the configuration you create and for the accuracy of the discounts
        you set up.
      </p>

      <h2>4. Plans &amp; billing</h2>
      <p>
        Mixly offers a Free plan and a paid Pro plan, billed monthly or annually. Paid
        subscriptions are billed through Shopify&rsquo;s billing system and are subject to
        Shopify&rsquo;s terms. Pro is currently $12.99 per month or $129 per year and
        includes a 7-day free trial; the Free plan allows one active bundle, of the
        Frequently Bought Together type. Prices are shown in the app and may change with
        notice. You can cancel at any time and will retain Pro features until the end of the
        current billing period.
      </p>
      <p>
        If your plan drops to Free, bundles beyond what the Free plan allows are{' '}
        <strong>paused, not deleted</strong>. Your configuration and your statistics are
        retained, so upgrading again re-activates what you had.
      </p>

      <h2>5. Feature requests</h2>
      <p>
        Content you submit to the Feature Requests board inside the app may be published to
        other Mixly merchants alongside your store name, so do not submit anything
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
        To the maximum extent permitted by law, Solora shall not be liable for any indirect,
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

export default MixlyTermsPage
