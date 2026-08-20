---
name: solora-docs-are-in-app-help
description: solora-site's /tierly/docs and /mixly/docs are live in-app help targets for the Shopify apps; the #stacking anchors are hardcoded cross-repo, so section ids must not be renamed
metadata:
  type: project
---

The docs pages on solora-site are not marketing-only — the Shopify apps link into them from
inside the merchant admin. Tierly's admin nav ("Help & docs") points at `/tierly/docs`, and
Mixly's Settings screen hardcodes `https://solora.dungpv.id.vn/tierly/docs#stacking` in a banner
that merchants see today. `/mixly/docs#stacking` is the intended counterpart.

**Why:** these are the destination of a help link that already ships in a live app, so a renamed
anchor or a deleted section becomes a broken link inside a merchant's admin, not just a dead
in-page jump. The site is also a **static export** — a `next/link` to a route that does not exist
yet 404s for real on production, so cross-links must land after the target route merges.

**How to apply:** never rename `id="stacking"` (or any existing section id) on either docs page
without grepping both app repos (`C:\Users\ACER\Documents\cowork\Mixly`,
`C:\Users\ACER\Documents\cowork\Tierly`) for the URL first. Accuracy standards on these pages are
higher than normal marketing copy — verify merchant-facing wording against the app's
`src/messages/en.json` and the theme extension schemas rather than from a survey or from memory.
