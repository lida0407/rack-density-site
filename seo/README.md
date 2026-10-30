# rack-density.com prune plan and "rack 15 kw" refresh, 2026-10-29

## Applied on this branch (content only; `npm run build` passes, 545 pages, 0 problems)
Refresh of `/calculator/` for "rack 15 kw" (53 impressions, position 12.9) and the wider kW-per-rack cluster ("rack density kw per rack" 49 impressions at 74, "kw servers" 23 at 14.7):
- Title now leads with the term: `Rack Density Calculator: kW per Rack | RACKDENSITY`; description names the 15 kW case.
- New English section "What fits in a 15 kW rack?" (table by device class, feed and cooling notes, reproducible in the calculator): `src/i18n/pages/calculator.ts` (`en.kw15`), rendered in `src/views/Calculator.astro` for `en` only.
- New FAQ "How many servers fit in a 15 kW rack?" in `src/data/faq.ts` (also feeds the FAQPage JSON-LD).
- Numbers: usable load is 12 kW under the 80 % rule; 15 kW needs about 23 A per phase at 400 V three-phase; 15 kW is about 51,000 BTU/h or 2,400 CFM at a 20 °F rise. Check them before publishing.

Not touched, because DC marketing owns `src/**/dc/**`: link from `/dc/resources/guides/rack-power-capacity-planning/`, `/dc/resources/guides/hot-aisle-cold-aisle-layout/` (its table already lists 15 kW) and `/dc/resources/calculators/rack-power/` to `/calculator/` with the anchor "kW per rack calculator". GSC has no query-to-page map, so confirm in the Search Console performance view (filter query "rack 15 kw") which URL ranks; the home page (728 impressions) and `/calculator/` (5 impressions, position 44) are the candidates. `/calculator/` is the owner page for the term.

## Proposed, not applied: `prune-2026-10-29.json`
79 of 535 URLs (15%) get impressions.

| Tier | URLs | What happens |
|---|---|---|
| keep | 139 | 79 earners plus hubs, tools, guides, product, legal |
| hold | 100 | device spec pages in categories where 10%+ of pages earn (mini-pc 10/22, storage 5/10, drive, server, ups, sbc); re-check 2027-01 |
| noindex | 249 | 132 `/dc/world/*` facility pages (one template, about 470 words, 0 impressions) and device spec pages in categories with no earners (gpu 0/21, switch 0/29, rack 0/11, nas 0/9, psu, cpu, cdu) |
| drop-translation | 47 | de/zh pages with no impressions; remove from `DC_TRANSLATED` / `localePaths` so hreflang stays two-way (`check-dist.mjs` fails on one-way pairs) |

Devices feed servertoohot.com via `rack-density-devices.json`, so noindex (not delete) the pages.
Stop adding device and world pages until the effective index rate passes 30%.
