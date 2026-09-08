import type { Metadata } from 'next'

import { LegalShell } from '@/components/legal-shell'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Mixly — Privacy Policy',
  description: 'Privacy policy for the Mixly Shopify app.',
  alternates: { canonical: '/mixly/privacy' },
  openGraph: {
    title: 'Mixly — Privacy Policy | Solora',
    description: 'Privacy policy for the Mixly Shopify app.',
    url: '/mixly/privacy',
    images: [siteConfig.ogImage],
  },
}

const MixlyPrivacyPage = () => {
  return (
    <LegalShell
      title="Mixly — Privacy Policy"
      updated={siteConfig.lastUpdated.mixlyPrivacy}
      back={{ href: '/privacy', label: 'All privacy policies' }}
    >
      <p>
        This Privacy Policy explains what information the <strong>Mixly</strong> app (by{' '}
        {siteConfig.legalEntity}) processes when you install it on your Shopify store, and
        how we protect it. By installing Mixly you agree to this policy.
      </p>

      <div className="my-6 rounded-xl border bg-muted px-5 py-4 not-italic">
        <strong>In short:</strong> Mixly stores your bundle configuration and{' '}
        <em>aggregated</em> order statistics to power bundle discounts and analytics. We do{' '}
        <strong>not</strong> store your customers&rsquo; personal information (names, emails,
        addresses), and Mixly creates no products, variants, or SKUs in your store.
      </div>

      <h2>1. Information we process</h2>
      <ul>
        <li>
          <strong>Store information</strong> — your <code>.myshopify.com</code> domain, store
          name, Shopify plan, currency, timezone, primary locale, country, primary storefront
          domain, and the store&rsquo;s contact email, all provided by Shopify.
        </li>
        <li>
          <strong>App configuration</strong> — the bundles you create (name, type, discount
          mode and value, minimum items, priority order), the product and variant IDs and
          quantities they contain, and your discount-stacking settings.
        </li>
        <li>
          <strong>Order statistics</strong> — when an order is placed, Shopify sends us an
          order-created event. We record only{' '}
          <strong>aggregated daily totals per bundle</strong> (orders, units, revenue, and
          discount amount). No individual order or customer record is kept.
        </li>
        <li>
          <strong>Authentication tokens</strong> — a Shopify access token used to call the
          Shopify API on your behalf. It is <strong>encrypted at rest</strong>. Mixly
          requests store-level (offline) tokens, so a session identifies your store rather
          than a person; where Shopify supplies a staff user&rsquo;s name or email alongside
          a session, that person is a member of your team — never one of your customers.
        </li>
        <li>
          <strong>Feature requests</strong> — if you post to the Feature Requests board
          inside the app, we store the title and description you write and a record of which
          stores voted. Requests we approve are shown to other Mixly merchants{' '}
          <strong>with your store name attached</strong>, so please do not post anything
          confidential.
        </li>
      </ul>

      <h2>2. What we do NOT collect</h2>
      <p>
        We do not store your customers&rsquo; personal data — no names, emails, phone
        numbers, or shipping addresses. Order events are used only to compute the aggregate
        numbers above and are not retained as individual customer records. Mixly does not
        read or evaluate customer tags, segments, or accounts anywhere in the app.
      </p>
      <p>
        Mixly also writes very little into your store. It creates a single automatic discount
        and one app-owned shop metafield (<code>mixly.bundles</code>) that your theme blocks
        read in order to display bundles — plus whichever Mixly blocks you choose to add to
        your theme. That metafield is readable by your storefront, which is how the blocks
        render, and holds bundle configuration only. Mixly never creates products, variants,
        or SKUs, and never writes to your product catalog.
      </p>

      <h2>3. How we use information</h2>
      <ul>
        <li>
          To provide the app&rsquo;s functionality — applying bundle discounts at checkout
          and displaying bundles on your storefront.
        </li>
        <li>To show you analytics about how your bundles perform.</li>
        <li>To run the in-app Feature Requests board and decide what to build next.</li>
        <li>To operate, maintain, secure, and support the service.</li>
      </ul>
      <p>We do not sell your data or use it for advertising.</p>

      <h2>4. Sharing &amp; sub-processors</h2>
      <p>
        We share data only with providers strictly necessary to run the service, and never
        for their own purposes:
      </p>
      <ul>
        <li>
          <strong>Shopify</strong> — the platform the app runs on; discounts execute inside
          Shopify&rsquo;s checkout.
        </li>
        <li>
          <strong>Our cloud hosting provider</strong> — application and database hosting.
        </li>
        <li>
          <strong>Object storage (S3-compatible)</strong> — holds our automated database
          backups, uploaded over HTTPS to a private bucket. Access tokens remain encrypted
          inside those backups.
        </li>
        <li>
          <strong>Crisp</strong> — our in-app support chat, loaded only when it is enabled.
          It receives your store domain, store name, contact email, Mixly plan, Shopify plan,
          storefront domain, and timezone so we can support you in context.
        </li>
        <li>
          <strong>Sentry</strong> — error monitoring, when configured; reports carry
          technical context, never customer data.
        </li>
        <li>
          <strong>Solora Tierly</strong> — if you also use our Tierly app, Mixly may ask the
          Tierly service whether Tierly is installed on your store, so it can show you the
          right discount-stacking advice. Only your store domain is sent, and both services
          are operated by {siteConfig.legalEntity}.
        </li>
      </ul>

      <h2>5. Protected customer data &amp; GDPR</h2>
      <p>
        Mixly complies with Shopify&rsquo;s Protected Customer Data requirements and
        processes only the minimum data needed for its function. We honor Shopify&rsquo;s
        mandatory compliance webhooks:
      </p>
      <ul>
        <li>
          <code>customers/data_request</code> — acknowledged; we hold no individual customer
          data to return.
        </li>
        <li>
          <code>customers/redact</code> — acknowledged; no customer data is stored, so there
          is nothing to erase.
        </li>
        <li>
          <code>shop/redact</code> — your store&rsquo;s data is deleted (see below).
        </li>
      </ul>

      <h2>6. Data retention &amp; deletion</h2>
      <p>
        We keep your bundles and aggregated statistics for as long as the app is installed.
        When you uninstall Mixly, we immediately delete your Shopify sessions and access
        token and mark the store inactive; your configuration is held a little longer so that
        reinstalling restores your setup.
      </p>
      <p>
        When Shopify sends the <code>shop/redact</code> request that follows an uninstall —
        or when you ask us to delete sooner — we erase your store&rsquo;s record in a single
        transaction, together with your bundles, your bundle configuration and stacking
        settings, your bundle statistics, your feature requests and votes, your Shopify
        sessions, our webhook de-duplication records, and our internal support-action log.
      </p>
      <p>
        Database backup snapshots are retained for up to 30 days, so deleted data may remain
        in a backup until that snapshot ages out.
      </p>

      <h2>7. Security</h2>
      <p>
        All traffic is served over HTTPS. Shopify access tokens are encrypted at rest with
        AES-256-GCM. Internal access to store data is restricted to authorized operators, and
        the actions they take are recorded in an audit log.
      </p>

      <h2>8. Cookies &amp; local storage</h2>
      <p>
        The embedded admin app uses a session cookie required for authentication with
        Shopify, plus a first-party <code>locale</code> cookie — and a companion{' '}
        <code>localeManual</code> flag recording whether you chose the language yourself —
        that remembers your admin language for a year. Because the app runs inside Shopify
        Admin&rsquo;s iframe, these are set as{' '}
        <code>SameSite=None; Secure; Partitioned</code>.
      </p>
      <p>
        Your browser&rsquo;s local storage holds a few dismissal flags, such as whether you
        closed the setup checklist, the what&rsquo;s-new note, the review prompt, or a
        product-change banner. When support chat is enabled, Crisp sets its own cookies. The
        Mixly storefront blocks set no cookies and no tracking of any kind.
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

export default MixlyPrivacyPage
