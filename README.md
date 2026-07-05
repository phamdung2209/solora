# Solora — company & legal site

The marketing + legal site for **Solora** and its Shopify apps (starting with
**Tierly**). Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and
**Tailwind CSS v4**, and **statically exported** so it can be hosted for free on GitHub
Pages at the custom domain **[solora.dungpv.id.vn](https://solora.dungpv.id.vn)**.

## Stack

- Next.js 16 App Router with `output: 'export'` (fully static — no server runtime)
- React 19 + TypeScript
- Tailwind CSS v4 (CSS-first `@theme` tokens, light/dark aware)
- A few hand-written shadcn-style UI primitives (`Button`, `Card`) using
  `class-variance-authority` + `clsx` + `tailwind-merge` and a `cn()` helper

## Routes (clean URLs via `trailingSlash`)

| Path              | Page                          |
| ----------------- | ----------------------------- |
| `/`               | Landing page                  |
| `/privacy`        | Company privacy hub           |
| `/terms`          | Company terms hub             |
| `/tierly/privacy` | Tierly app privacy policy     |
| `/tierly/terms`   | Tierly app terms of service   |

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build (static export)

```bash
npm run build      # runs `next build` → produces ./out
```

`out/` is a fully static site containing `index.html`, `privacy/index.html`,
`terms/index.html`, `tierly/privacy/index.html`, `tierly/terms/index.html`, plus
`CNAME` and `.nojekyll`.

Other checks:

```bash
npm run typecheck  # tsc --noEmit
npm run lint       # eslint .
```

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds and publishes
`out/` to GitHub Pages.

**One-time setup:** in the repo, go to **Settings → Pages → Source = "GitHub Actions"**.
The custom domain is configured via `public/CNAME` (`solora.dungpv.id.vn`); DNS already
points to GitHub Pages.

## Add a new app later

1. Create routes under `src/app/‹app›/privacy/page.tsx` and `.../terms/page.tsx`
   (copy Tierly's pages, edit the content).
2. Add a `<HubItem>` to `src/app/privacy/page.tsx` and `src/app/terms/page.tsx`, and a
   card to the `apps` array in `src/app/page.tsx`.
3. Push → the Action redeploys.
