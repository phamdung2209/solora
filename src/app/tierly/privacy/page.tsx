import type { Metadata } from 'next'

import { LegalShell } from '@/components/legal-shell'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Tierly — Privacy Policy',
  description: 'Privacy policy for the Tierly Shopify app.',
  alternates: { canonical: '/tierly/privacy' },
  openGraph: {
    title: 'Tierly — Privacy Policy | Solora',
    description: 'Privacy policy for the Tierly Shopify app.',
    url: '/tierly/privacy',
  },
}

const TierlyPrivacyPage = () => {
  return (
    <LegalShell
      title="Tierly — Privacy Policy"
      updated={siteConfig.lastUpdated}
      back={{ href: '/privacy', label: 'All privacy policies' }}
    >
      <p>
        This Privacy Policy explains what information the <strong>Tierly</strong> app (by
        Solora Commerce) processes when you install it on your Shopify store, and how we
        protect it. By installing Tierly you agree to this policy.
      </p>

      <div className="my-6 rounded-xl border bg-muted px-5 py-4 not-italic">
        <strong>In short:</strong> Tierly stores your store&rsquo;s configuration and{' '}
        <em>aggregated</em> order statistics to power volume pricing and analytics. We do{' '}
        <strong>not</strong> store your customers&rsquo; personal information (names, emails,
        addresses).
      </div>

      <h2>1. Information we process</h2>
      <ul>
        <li>
          <strong>Store information</strong> — your <code>.myshopify.com</code> domain, store
          name, plan, currency, and the store owner&rsquo;s email, provided by Shopify at
          install.
        </li>
        <li>
          <strong>App configuration</strong> — the pricing offers, tiers, targeting, and
          settings you create in the app.
        </li>
        <li>
          <strong>Order statistics</strong> — when an order is placed, Shopify sends us an
          order-created event. We record only <strong>aggregated</strong> figures (order
          count, units sold, discount amounts, order totals) for your analytics dashboard.
        </li>
        <li>
          <strong>Authentication tokens</strong> — a Shopify access token used to call the
          Shopify API on your behalf. It is <strong>encrypted at rest</strong>.
        </li>
      </ul>

      <h2>2. What we do NOT collect</h2>
      <p>
        We do not store your customers&rsquo; personal data — no names, emails, phone
        numbers, or shipping addresses. Order events are used only to compute the aggregate
        numbers above and are not retained as individual customer records.
      </p>

      <h2>3. How we use information</h2>
      <ul>
        <li>
          To provide the app&rsquo;s functionality — applying volume discounts at checkout
          and displaying pricing on your storefront.
        </li>
        <li>To show you analytics about how your volume pricing performs.</li>
        <li>To operate, maintain, secure, and support the service.</li>
      </ul>
      <p>We do not sell your data or use it for advertising.</p>

      <h2>4. Sharing &amp; sub-processors</h2>
      <p>
        We share data only with infrastructure providers strictly necessary to run the
        service (our cloud hosting provider and Shopify). We do not share your data with any
        third party for their own purposes.
      </p>

      <h2>5. Protected customer data &amp; GDPR</h2>
      <p>
        Tierly complies with Shopify&rsquo;s Protected Customer Data requirements and
        processes only the minimum data needed for its function. We honor Shopify&rsquo;s
        mandatory compliance webhooks:
      </p>
      <ul>
        <li>
          <code>customers/data_request</code> — we hold no individual customer data to
          return.
        </li>
        <li>
          <code>customers/redact</code> — no customer data is stored, so there is nothing to
          erase.
        </li>
        <li>
          <code>shop/redact</code> — when you uninstall, your store&rsquo;s data is deleted
          (see below).
        </li>
      </ul>

      <h2>6. Data retention &amp; deletion</h2>
      <p>
        We keep your store&rsquo;s configuration and aggregated statistics for as long as the
        app is installed. When you uninstall Tierly, your data is scheduled for deletion. To
        request deletion sooner, contact us at the address below.
      </p>

      <h2>7. Security</h2>
      <p>
        All traffic is served over HTTPS. Access tokens are encrypted at rest (AES-256-GCM).
        We restrict internal access to store data to authorized operators only.
      </p>

      <h2>8. Cookies</h2>
      <p>
        The embedded admin app uses a session cookie required for authentication with
        Shopify. The storefront components set no tracking cookies.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be reflected by
        the &ldquo;Last updated&rdquo; date above.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about privacy or a data request? Email us at{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </LegalShell>
  )
}

export default TierlyPrivacyPage
