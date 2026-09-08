---
name: project_mixly_marketing_pages
description: Mixly marketing pages on the Solora site — beta/early-access status and where plan pricing copy lives
metadata:
  type: project
---

Mixly has no Shopify App Store listing yet — `src/app/page.tsx` marks it `status: 'beta'` and its CTA is a `mailto:` "Request early access" link, not an "Install on Shopify" button (unlike Tierly, which links to `https://apps.shopify.com/solora-tierly`).

**Why:** Mixly's App Store listing is in progress; a marketing page that assumes an app-store install link would be wrong today.

**How to apply:** Any new Mixly page (pricing, docs, landing) should offer email early-access + docs links as its primary CTA, not an install link, until the app is confirmed live on the App Store — check `src/app/page.tsx`'s Mixly `status` field first.

The canonical Free/Pro plan numbers (price, cadence, features) live in the `plans` array inside `src/app/mixly/docs/page.tsx`'s `id="plans"` Section (~line 274), sourced from Mixly's own `src/lib/plans.ts`. `src/app/mixly/pricing/page.tsx` duplicates this array — if the plan numbers ever change, update both files, not just one.
