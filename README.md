# Solora — company & legal site

One shared static site for **all Solora apps**: a company landing page plus a
**per-app** Privacy Policy and Terms. Reuse the same site for every future app — just add
a folder and a hub link.

## Structure
```
index.html            landing (brand + "Our apps")
privacy.html          privacy hub (lists every app)
terms.html            terms hub
tierly/privacy.html   Tierly privacy policy   ← give this URL to Shopify
tierly/terms.html     Tierly terms
styles.css            shared styles (elegant black)
.github/workflows/pages.yml   auto-deploy to GitHub Pages
```

## ➕ Add a new app later
1. Create a folder `‹app›/` with `privacy.html` + `terms.html` (copy Tierly's, edit content, keep `../` paths).
2. Add a card in `index.html` (#apps) and a line in `privacy.html` / `terms.html` hubs.
3. Push → the Action redeploys.

## ✏️ Before publishing — fill these in
1. **`July 5, 2026`** in each app's `privacy.html` + `terms.html`.
2. **`hank@dungpv.id.vn`** → your real support email (find/replace across all files).

## 🚀 Publish (free, auto-deploy)
1. Create a **PUBLIC** repo (e.g. `solora-site`) and push these files.
   > ⚠️ Free GitHub Pages needs a **public** repo. (Private-repo Pages needs GitHub Pro.)
2. Repo → **Settings → Pages → Source = "GitHub Actions"** (one time).
3. Push → the included Action deploys it.

**Privacy URL to give Shopify** (Partner Dashboard → App listing → Privacy policy URL):
```
https://<user>.github.io/solora-site/tierly/privacy.html
```
Point a custom domain (e.g. `solora.dungpv.id.vn`) at the repo for a branded URL if you like.

### Prefer Netlify (works with private repos, free)
Drag this folder into app.netlify.com, or connect the repo → framework **None**. URL:
`https://<name>.netlify.app/tierly/privacy.html`.
