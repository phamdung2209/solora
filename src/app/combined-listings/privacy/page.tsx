import type { Metadata } from 'next'

import { LegalShell } from '@/components/legal-shell'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Combined Listings — Privacy Policy',
  description: 'Privacy policy for the Solora: Combined Listings Shopify app.',
  alternates: { canonical: '/combined-listings/privacy' },
  openGraph: {
    title: 'Combined Listings — Privacy Policy | Solora',
    description: 'Privacy policy for the Solora: Combined Listings Shopify app.',
    url: '/combined-listings/privacy',
    images: [siteConfig.ogImage],
  },
}

const CombinedListingsPrivacyPage = () => {
  return (
    <LegalShell
      title="Combined Listings — Privacy Policy"
      updated={siteConfig.lastUpdated.combinedListingsPrivacy}
      back={{ href: '/privacy', label: 'All privacy policies' }}
    >
      <p>
        This Privacy Policy explains what information the <strong>Solora: Combined Listings</strong>{' '}
        app (&ldquo;Combined Listings&rdquo;, by {siteConfig.legalEntity}) processes when you install
        it on your Shopify store, and how we protect it. By installing Combined Listings you agree to
        this policy.
      </p>

      <div className="my-6 rounded-xl border bg-muted px-5 py-4 not-italic">
        <strong>In short:</strong> Combined Listings stores the groups, rules and swatch settings you
        create, and writes the swatch data your storefront needs into product and shop metafields. It
        has no access to orders or customers and stores <strong>no</strong> customer information. It
        never edits your products, variants, images, inventory, prices, or theme files.
      </div>

      <h2>1. Information we process</h2>
      <ul>
        <li>
          <strong>Store information</strong> — your <code>.myshopify.com</code> domain, store name,
          contact email, currency, timezone, country, primary storefront domain, and Shopify plan,
          all provided by Shopify.
        </li>
        <li>
          <strong>App configuration</strong> — the groups you create (title, option name, and for each
          member product its ID, handle, option value and swatch colour or image), your auto-group
          rules, your variant-to-image mappings, your swatch appearance, and your card-per-variant
          settings.
        </li>
        <li>
          <strong>CSV imports</strong> — when you import a CSV file, its contents are processed to
          create groups and are not stored. We keep only a summary of each import: how many rows
          succeeded and the line numbers and messages of the rows that failed.
        </li>
        <li>
          <strong>Authentication tokens</strong> — a Shopify access token used to call the Shopify API
          on your behalf. It is <strong>encrypted at rest</strong>. Combined Listings uses store-level
          (offline) tokens only, so a session identifies your store, not a person.
        </li>
        <li>
          <strong>A storefront token</strong> — to show stock and prices on swatches, the app creates a
          Shopify Storefront API token named <code>solora-cl</code>. It can read only what your
          storefront already shows to every visitor (product availability and prices). We store it
          in our database and in your store&rsquo;s <code>solora_cl.settings</code> metafield, which
          your storefront can read.
        </li>
        <li>
          <strong>Feature requests</strong> — if you post to the Roadmap board inside the app, we
          store the title and description you write and which stores voted. Requests we approve are
          shown to other Combined Listings merchants{' '}
          <strong>with your store name attached</strong>, so please do not post anything
          confidential.
        </li>
      </ul>

      <h2>2. What we do NOT collect</h2>
      <p>
        Combined Listings requests access to products only. It cannot read orders, customers, or
        checkouts, and stores no customer names, emails, phone numbers, or addresses.
      </p>
      <p>
        What the app writes into your store is limited to three metafields in the{' '}
        <code>solora_cl</code> namespace — <code>group</code> and <code>variant_images</code> on the
        products you group or map, and <code>settings</code> on your shop — plus the storefront token
        above and whichever Combined Listings blocks you turn on in your theme. These metafields are
        readable by your storefront, which is how swatches render. They are ordinary metafields: you
        can see, edit, or delete them under Settings → Custom data.
      </p>

      <h2>3. How we use information</h2>
      <ul>
        <li>
          To provide the app&rsquo;s functionality — showing swatches, combined listings and
          variant images on your storefront.
        </li>
        <li>To run the in-app Roadmap board and decide what to build next.</li>
        <li>To operate, maintain, secure, and support the service.</li>
      </ul>
      <p>We do not sell your data or use it for advertising.</p>

      <h2>4. Sharing &amp; sub-processors</h2>
      <p>
        We share data only with providers strictly necessary to run the service, and never for
        their own purposes:
      </p>
      <ul>
        <li>
          <strong>Shopify</strong> — the platform the app runs on.
        </li>
        <li>
          <strong>Hugging Face</strong> — application and database hosting.
        </li>
        <li>
          <strong>Object storage (S3-compatible)</strong> — holds our automated database backups,
          uploaded over HTTPS to a private bucket. Access tokens remain encrypted inside those
          backups.
        </li>
        <li>
          <strong>Upstash</strong> — runs background jobs such as CSV imports, when enabled. An
          import&rsquo;s CSV contents pass through it while the job is queued.
        </li>
        <li>
          <strong>Sentry</strong> — error monitoring, when configured. Reports carry technical
          context and, for some errors, your store domain — never customer data.
        </li>
      </ul>

      <h2>5. Protected customer data &amp; GDPR</h2>
      <p>We honor Shopify&rsquo;s mandatory compliance webhooks:</p>
      <ul>
        <li>
          <code>customers/data_request</code> — acknowledged; we hold no customer data to return.
        </li>
        <li>
          <code>customers/redact</code> — acknowledged; no customer data is stored, so there is
          nothing to erase.
        </li>
        <li>
          <code>shop/redact</code> — your store&rsquo;s data is deleted (see below).
        </li>
      </ul>

      <h2>6. Data retention &amp; deletion</h2>
      <p>
        We keep your configuration for as long as the app is installed. When you uninstall, we
        immediately delete your Shopify sessions and access token and mark the store inactive; your
        groups and settings are held a little longer so that reinstalling restores your setup.
      </p>
      <p>
        When Shopify sends the <code>shop/redact</code> request that follows an uninstall — or when
        you ask us to delete sooner — we erase your store&rsquo;s record together with your groups,
        rules, variant-image mappings, appearance and card-per-variant settings, import summaries,
        storefront token record, feature requests and votes, Shopify sessions, our webhook
        de-duplication records, and our internal support-action log.
      </p>
      <p>
        The metafields the app wrote stay in your store after an uninstall, because an uninstalled
        app can no longer reach it. To remove them first, use <strong>Settings → Remove app data</strong>{' '}
        in the app before uninstalling: it deletes the three metafield definitions and every value
        they hold, and revokes the storefront token.
      </p>
      <p>
        Database backup snapshots are retained for up to 30 days, so deleted data may remain in a
        backup until that snapshot ages out.
      </p>

      <h2>7. Security</h2>
      <p>
        All traffic is served over HTTPS. Shopify access tokens are encrypted at rest with
        AES-256-GCM. Internal access to store data is restricted to authorized operators, and the
        actions they take are recorded in an audit log.
      </p>

      <h2>8. Cookies &amp; local storage</h2>
      <p>
        The embedded admin app sets a first-party <code>locale</code> cookie — and a companion{' '}
        <code>localeManual</code> flag recording whether you chose the language yourself — that
        remembers your admin language for a year. Because the app runs inside Shopify Admin&rsquo;s
        iframe, these are set as <code>SameSite=None; Secure; Partitioned</code>. Your browser&rsquo;s
        local storage remembers whether you dismissed the setup checklist.
      </p>
      <p>
        On your storefront, the Combined Listings script sets no cookies and does no tracking. It
        reads stock and prices from your own store&rsquo;s Storefront API and keeps the answer in the
        shopper&rsquo;s session storage for one minute.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. Material changes will be reflected by the
        &ldquo;Last updated&rdquo; date above.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about privacy or a data request? Email us at{' '}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </p>
    </LegalShell>
  )
}

export default CombinedListingsPrivacyPage
