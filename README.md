# rack-density-site

The RACKDENSITY site: one Astro site for both product lines.
Production: **https://rack-density.com** on Cloudflare Pages (project `rack-density`, preview https://rack-density.pages.dev). Until the domain is attached, the same site also builds to https://lida0407.github.io/rack-density-site/.

| Route | What | Owner |
|---|---|---|
| `/` | Hub: both products + the Rack Density Calculator (the domain's original page) | homelab marketing |
| `/homelab/…` | Homelab Twin: home, try, pricing, learn (+ calculators), changelog (+ RSS) | homelab marketing |
| `/dc/…` | DC Sim: home, product, integrations, pricing, resources, guides, partners, legal | **DC marketing** |
| `/privacy/`, `/404` and the standard files below | site-wide | homelab marketing (llms files embed `src/pages/dc/_llms.ts`, `/rss.xml` merges `src/pages/dc/_feed.ts`) |
| `/de/…`, `/zh/…` | German and Chinese versions of translated pages (see Languages) | each section for its own pages; plumbing homelab marketing |

## Ownership and how to commit
- **DC marketing** edits only `src/**/dc/**`, `public/dc/**` and `scripts/check-copy-dc.mjs`, `scripts/dc/**`: pages `src/pages/dc/`, content `src/content/dc/` (incl. `collections.ts`), components `src/components/dc/`, layout `src/layouts/dc/`, helpers `src/lib/dc/`, constants `src/config/dc/product.ts`, styles `src/styles/dc/`, images `src/assets/dc/`.
- **Homelab marketing** owns everything else (shared layout, hub, homelab, build, workflow, site config).
- Always `git pull --rebase` before you push. Never edit the other section's files; ask through `share/updateplan.md`.
- Links: DC code uses `u()` from `src/lib/dc/url.ts` (prefixes `<base>/dc/`; `root()` for site-wide files). Homelab and hub code use `u()` from `src/lib/url.ts` with full paths (`u('/homelab/try')`). Root-relative links in DC Markdown (`/pricing/`) are prefixed with `<base>/dc/` by the rehype plugin in `astro.config.mjs`.

## Languages (en · de · zh)
`marketing/I18N.md` in the plan repo. English is unprefixed; German lives under `/de/…`, Chinese (simplified, mainland) under `/zh/…`, mirroring the English path. Product and brand names stay Latin.
- **Plumbing (homelab marketing):** `src/i18n/config.ts` (locales, which English paths exist in each locale, `lp()` locale links, `switchHref()` for the switcher, `alternates()` for hreflang, `nf()` numbers, `withFallback()`); `src/i18n/index.ts` (`ui(locale)`, `label()`, `fill()`, `pageCopy()`, `localePaths()`); `src/i18n/calc.ts` (per-locale currency, tariff, circuit: DE € 0.35 / 230 V 16 A, CN ¥ 0.6 / 220 V 16 A). UI strings: `src/i18n/ui/{en,de,zh}.ts` (de/zh may leave keys out → English).
- **Pages:** each translated page is a view in `src/views/` with its copy in `src/i18n/pages/<page>.ts` (`en`, `de`, `zh` objects, same keys). `src/pages/<path>.astro` renders the view with `locale="en"`; `src/pages/[locale]/<path>.astro` renders it for the locales from `localePaths('<path>')`. A key missing in de/zh falls back to English and the page shows a small "not translated yet" note (`Base` `fallback`). Links to English-only pages get "(English)".
- **Layout:** `Base.astro` sets `<html lang>`, canonical, hreflang (en, de, zh-CN, x-default = English) and `og:locale`; the header has the EN · DE · 中文 switcher (sets the `lang` cookie for a year); the German footer links `/de/impressum/` (details in `src/config/impressum.ts`; noindex until Dali fills them).
- **Language by country:** `functions/_middleware.ts` 302s a first visit to an unprefixed page from DE/AT/CH/LI to `/de/…` and from CN to `/zh/…` when that page exists (Accept-Language only when the country is unknown), sets `lang`, and never touches crawlers, `lang` cookies, `/api/`, assets or prefixed URLs. `public/_routes.json` keeps assets off the function. Cloudflare Pages only (GitHub Pages has no functions).
- **SEO files:** the sitemap carries hreflang alternates (`astro.config.mjs` `i18n`); `/de/llms.txt` and `/zh/llms.txt` come from `src/pages/[locale]/llms.txt.ts` plus the post-build index in `scripts/llms-index.mjs`; `scripts/check-dist.mjs` fails the build on a broken or one-way hreflang.

**How DC marketing adds its locale content**
1. List each English DC path you translate in `src/config/dc/i18n.ts`: `export const DC_TRANSLATED = { de: ['/dc', '/dc/pricing', …], zh: […] }`. Only listed paths get hreflang, switcher targets and `lp()` links; unlisted paths keep linking to English.
2. Add the routes under `src/pages/[locale]/dc/…` (`getStaticPaths = () => localePaths('/dc/pricing')`) and render your page with the locale; keep the copy in your own files under `src/**/dc/**` (for example `src/i18n/dc/`, or Markdown under `src/content/dc/de/` and `zh/`).
3. In `src/layouts/dc/Base.astro`: `<html lang={LOCALE_META[locale].html}>`, canonical via `lp(path, locale)`, and the hreflang links from `alternates(path)` (copy the block from `src/layouts/Base.astro`); pass `locale` to the shared `Header`/`Footer`. Shared nav labels translate through `label(locale, …)`; add missing ones to `labels` in `src/i18n/ui/de.ts`/`zh.ts` (ask homelab marketing, it owns those files).
4. Optional: export `dcLlmsLocale(locale)` from `src/pages/dc/_llms.ts` to add the DC part to `/de/llms.txt` and `/zh/llms.txt`.
5. `npm run build` checks the hreflang pairs; the middleware starts sending German/Chinese visitors to your pages as soon as they exist.

## Standard files (site root, plain names; Dali 2026-10-27)
| Path | Source | Notes |
|---|---|---|
| `/robots.txt` | `src/pages/robots.txt.ts` | points at `/sitemap.xml`; AI crawlers allowed |
| `/sitemap.xml` | `@astrojs/sitemap` + `scripts/sitemap-single.mjs` | one file with hreflang alternates; `/sitemap-index.xml`, `/sitemap-0.xml` 301 here (`public/_redirects`) |
| `/llms.txt`, `/de/llms.txt`, `/zh/llms.txt` | `src/pages/llms.txt.ts`, `src/pages/[locale]/llms.txt.ts` + `scripts/llms-index.mjs` | summary + generated page index |
| `/llms-full.txt`, `/de/llms-full.txt`, `/zh/llms-full.txt` | `src/pages/llms-full.txt.ts`, `src/pages/[locale]/llms-full.txt.ts`, `src/lib/llmsFull.ts` | full text of product pages and guides |
| `/rss.xml`, `/homelab/rss.xml`, `/dc/rss.xml` | `src/pages/rss.xml.ts`, `src/pages/homelab/rss.xml.ts`, `src/lib/feed.ts`; DC: `src/pages/dc/rss.xml.ts` | `/homelab/changelog.xml` 301s to `/homelab/rss.xml` |
| `/favicon.ico`, `/apple-touch-icon.png`, `/icon-192.png`, `/icon-512.png` | `scripts/icons.mjs` (`npm run icons`) from `public/brand/favicon-rackdensity.svg` | committed files |
| `/site.webmanifest` | `src/pages/site.webmanifest.ts` | colours = `--bg-000` from `src/styles/tokens.css` |
| `/.well-known/security.txt` | `public/.well-known/security.txt` | renew `Expires` before 2027-10-27 |
| `/humans.txt` | `src/pages/humans.txt.ts` | build date as "Last update" |
No `/ads.txt` (no ads). `public/_routes.json` keeps all of these off the language function.

## Feeds and llms-full (how DC marketing plugs in)
- **Feeds:** export `dcFeedItems(): Promise<FeedItem[]>` from `src/pages/dc/_feed.ts` (`FeedItem` = `{ title, link (absolute), guid (unique site-wide), pubDate, description (plain text), category }`, same shape as `src/lib/feed.ts`). `/rss.xml` merges it with the Homelab Twin changelog and Learn guides; `/dc/rss.xml` is your own route.
- **llms-full:** export `dcLlmsFull(): Promise<string>` from `src/pages/dc/_llms.ts` (English, headings from `##`) for `/llms-full.txt`; optionally `dcLlmsFullLocale(locale)` for `/de/llms-full.txt` and `/zh/llms-full.txt`. Until they exist, `/llms-full.txt` carries the `dcLlms()` summary. Both hooks are found with `import.meta.glob`, so a build without them still passes.

## Commands
```
npm ci
npm test          # homelab calculator math (node --test)
npm run dev       # http://localhost:4321/rack-density-site/
npm run build     # astro build + scripts/check-dist.mjs (links, one H1, meta, JSON-LD) + scripts/check-copy-dc.mjs (DC copy rules)
npm run sync      # homelab Learn articles from ~/Sensaka/marketing/homelab-site/learn → src/content/homelab/learn (local only)
npm run og        # homelab OG images + hub OG (local only)
npm run icons     # favicon.ico, apple-touch-icon.png, icon-192/512.png from the RACKDENSITY mark
```
Push to `main` → `.github/workflows/deploy.yml` → GitHub Pages.

## One place for each fact
- **Where the site lives:** `site.config.mjs` (`SITE_URL`, `BASE`).
- **Homelab Twin:** `src/config/brand.ts` (name, contact, prices, `TRY`, flags). **DC Sim:** `src/config/dc/product.ts`. The hub reads both.

## Theme hooks (brand tokens pending)
`<html data-edition="homelab|dc">` follows the token contract in `~/Sensaka/brand/tokens.css` (the hub has no edition: neutral base); `<body>` also carries `theme-hub`, `theme-homelab` or `theme-dc`, and the hub's product cards carry the same classes. Today each section keeps its pre-merge look (homelab/hub: `src/styles/global.css`; DC: `src/styles/dc/global.css`). Applied 2026-10-15: `src/styles/tokens.css` is a copy of `~/Sensaka/brand/tokens.css` (refresh with `npm run tokens`), imported by `src/styles/global.css` (hub + homelab) and `src/styles/dc/global.css` (DC). Each stylesheet keeps its own variable names as aliases of the tokens; the accent follows `data-edition` (homelab orange, DC green; the hub uses the base and sets `data-edition` per product card). Brand marks and favicons are in `public/brand/` (from `~/Sensaka/brand/logos/`). Page-level layouts from the brand canvas are not implemented yet (they wait for `brand/HANDOFF-sites.md`).

## Deploys
| Workflow | Target | Address |
|---|---|---|
| `deploy-cloudflare.yml` | Cloudflare Pages project `rack-density` (wrangler, branch main) | `site.config.mjs` defaults: `https://rack-density.com`, base `/` |
| `deploy.yml` | GitHub Pages (kept until the cutover) | env `SITE_URL=https://lida0407.github.io`, `SITE_BASE=/rack-density-site` |

Secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are set by the planner; without them the Cloudflare job builds and tests but skips the upload. DNS and the custom domain are attached by the planner in Cloudflare; the Lovable project is retired at cutover (`rank-sparkle-dash` stays as the calculator's archive). `public/_headers` sets long caching for `/_astro/*` on Cloudflare.

Build locally for either target: `npm run build` (rack-density.com) or `SITE_URL=https://lida0407.github.io SITE_BASE=/rack-density-site npm run build`. `--force` in the build script clears Astro's content cache, so Markdown links are re-prefixed when the base changes.

## History
Merged on 2026-10-14 from `lida0407/homelab-sim-site` (history kept) and `lida0407/dcsim-site` at commit `9fd8025` (copied with `scripts/import-dc.py`).
