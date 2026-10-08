---
name: project_mixly_marketing_pages
description: Mixly marketing pages on the Solora site — live App Store status and where plan pricing copy lives
metadata:
  type: project
---

Mixly is live on the Shopify App Store as of 2026-10-08 (https://apps.shopify.com/solora-mixly-bundles, "Solora Mixly: Bundles & BOGO") — `src/app/page.tsx` marks it `status: 'live'` with an "Install on Shopify" CTA, same as Tierly.

**Why:** The site was pre-launch (beta, mailto "Request early access") until the listing went live; the install CTA now replaces it.

**How to apply:** Any Mixly page (pricing, docs, landing) should use the "Install on Shopify" link to the listing as its primary CTA, mirroring Tierly. Swatchbox is still not live — don't copy this to it.

The canonical Free/Pro plan numbers (price, cadence, features) live in the `plans` array inside `src/app/mixly/docs/page.tsx`'s `id="plans"` Section (~line 274), sourced from Mixly's own `src/lib/plans.ts`. `src/app/mixly/pricing/page.tsx` duplicates this array — if the plan numbers ever change, update both files, not just one.
