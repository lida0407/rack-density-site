# rack-density-site

The RACKDENSITY site: one Astro site for both product lines.
Live (until rack-density.com moves here): https://lida0407.github.io/rack-density-site/

| Route | What | Owner |
|---|---|---|
| `/` | Hub: both products + the Rack Density Calculator (the domain's original page) | homelab marketing |
| `/homelab/…` | Homelab Sim: home, try, pricing, learn (+ calculators), changelog (+ RSS) | homelab marketing |
| `/dc/…` | DC Sim: home, product, integrations, pricing, resources, guides, partners, legal | **DC marketing** |
| `/privacy/`, `/404`, `robots.txt`, `sitemap-index.xml`, `llms.txt` | site-wide | homelab marketing (llms.txt embeds `src/pages/dc/_llms.ts`) |

## Ownership and how to commit
- **DC marketing** edits only `src/**/dc/**`, `public/dc/**` and `scripts/check-copy-dc.mjs`, `scripts/dc/**`: pages `src/pages/dc/`, content `src/content/dc/` (incl. `collections.ts`), components `src/components/dc/`, layout `src/layouts/dc/`, helpers `src/lib/dc/`, constants `src/config/dc/product.ts`, styles `src/styles/dc/`, images `src/assets/dc/`.
- **Homelab marketing** owns everything else (shared layout, hub, homelab, build, workflow, site config).
- Always `git pull --rebase` before you push. Never edit the other section's files; ask through `share/updateplan.md`.
- Links: DC code uses `u()` from `src/lib/dc/url.ts` (prefixes `<base>/dc/`; `root()` for site-wide files). Homelab and hub code use `u()` from `src/lib/url.ts` with full paths (`u('/homelab/try')`). Root-relative links in DC Markdown (`/pricing/`) are prefixed with `<base>/dc/` by the rehype plugin in `astro.config.mjs`.

## Commands
```
npm ci
npm test          # homelab calculator math (node --test)
npm run dev       # http://localhost:4321/rack-density-site/
npm run build     # astro build + scripts/check-dist.mjs (links, one H1, meta, JSON-LD) + scripts/check-copy-dc.mjs (DC copy rules)
npm run sync      # homelab Learn articles from ~/Sensaka/marketing/homelab-site/learn → src/content/homelab/learn (local only)
npm run og        # homelab OG images + hub OG + icon (local only)
```
Push to `main` → `.github/workflows/deploy.yml` → GitHub Pages.

## One place for each fact
- **Where the site lives:** `site.config.mjs` (`SITE_URL`, `BASE`).
- **Homelab Sim:** `src/config/brand.ts` (name, contact, prices, `TRY`, flags). **DC Sim:** `src/config/dc/product.ts`. The hub reads both.

## Theme hooks (brand tokens pending)
`<html data-edition="homelab|dc">` follows the token contract in `~/Sensaka/brand/tokens.css` (the hub has no edition: neutral base); `<body>` also carries `theme-hub`, `theme-homelab` or `theme-dc`, and the hub's product cards carry the same classes. Today each section keeps its pre-merge look (homelab/hub: `src/styles/global.css`; DC: `src/styles/dc/global.css`). `brand/tokens.css` is delivered (updatebrand.md 18:00, design system approved); the site handoff (`brand/HANDOFF-sites.md`) and page designs are still in progress. Applying it: the file becomes `src/styles/tokens.css`, imported by both layouts, with the accent set per theme class (Homelab orange, DC green), and the two global stylesheets merge into one. No restyle before the tokens exist.

## Moving to rack-density.com
- **Cloudflare Pages** (planned; waits for Dali's go): connect this repo; build `npm run build`, output `dist`, `NODE_VERSION=24`; custom domain rack-density.com (DNS already on Cloudflare). Then set `SITE_URL = 'https://rack-density.com'`, `BASE = '/'`.
- **Or GitHub Pages:** same constants, plus `public/CNAME` containing `rack-density.com`.
- The old sites (`homelab-sim-site`, `dcsim-site` on GitHub Pages) redirect here once this site is verified.

## History
Merged on 2026-10-14 from `lida0407/homelab-sim-site` (history kept) and `lida0407/dcsim-site` at commit `9fd8025` (copied with `scripts/import-dc.py`).
