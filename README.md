# rack-density-site

The RACKDENSITY site: one Astro site for both product lines.
Production: **https://rack-density.com** on Cloudflare Pages (project `rack-density`, preview https://rack-density.pages.dev). Until the domain is attached, the same site also builds to https://lida0407.github.io/rack-density-site/.

| Route | What | Owner |
|---|---|---|
| `/` | Hub: both products + the Rack Density Calculator (the domain's original page) | homelab marketing |
| `/homelab/…` | Homelab Twin: home, try, pricing, learn (+ calculators), changelog (+ RSS) | homelab marketing |
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
