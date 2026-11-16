// Which pages search engines may index, and which go into sitemap.xml (~/Sensaka/marketing/SEO-ROOT-CAUSE.md, step 1).
// 2026-11-16: Google crawls rack-density.com with 200s but indexes nothing. To an unknown site, three of four sitemap URLs
// looked like template pages (device specs, famous data centers, translated copies). Until the core pages are indexed, those
// sections are `noindex, follow`: they stay live, linked and crawlable, and come back in batches.
//
// Each flag: false = the whole section is held · true = the whole section is open · an array opens one batch:
//   INDEX_DEVICES / INDEX_WORLD: path prefixes, e.g. ['/devices/ups/', '/dc/world/de/']
//   INDEX_LOCALES: locale codes, e.g. ['de']
// An open page is indexable and listed in sitemap.xml (unless SITEMAP_SKIP); a held one is neither. Section index pages
// (/devices/, /dc/world/) are always open. Used by both layouts, src/i18n (hreflang), scripts/sitemap-single.mjs and
// scripts/check-dist.mjs.
export const INDEX_DEVICES = false; // /devices/<category>/ (27) and /devices/<category>/<brand>/<device>/ (247)
export const INDEX_WORLD = false;   // /dc/world/<country>/<site>/ (129) and /dc/world/{data,estates,imagined}/
export const INDEX_LOCALES = false; // every /de/ and /zh/ page; while held there is no hreflang to them either

// The tag a held page gets: 'robots' holds it for every search engine, 'googlebot' for Google only (Bing keeps it).
export const HOLD_META = 'robots';

// Indexable, but not in sitemap.xml: utility pages with nothing to rank for. English paths, exact; a trailing * = the prefix.
export const SITEMAP_SKIP = [
  '/privacy/', '/dc/legal/*', '/dc/contact/', '/homelab/waitlist/', '/homelab/changelog/', '/dc/resources/changelog/',
  '/dc/resources/calculators/',
];

const LOCALE_PREFIX = /^\/(de|zh)(?=\/|$)/;
const open = (flag, key) => flag === true || (Array.isArray(flag) && flag.some((p) => key.startsWith(p)));
const norm = (p) => { const s = `/${p}`.replace(/\/{2,}/g, '/').replace(/[?#].*$/, ''); return /\.[a-z0-9]+$/i.test(s) || s.endsWith('/') ? s : `${s}/`; };

/** Is search indexing open for this locale (hreflang, robots)? English always is. */
export const localeIndexed = (locale) => locale === 'en' || open(INDEX_LOCALES, locale);

/** Site path with its locale prefix ('/de/dc/world/' or '/devices/ups/apc/smt1500/') → true when the page is held. */
export function held(sitePath) {
  const p = norm(sitePath);
  const m = p.match(LOCALE_PREFIX);
  if (m && !localeIndexed(m[1])) return true;
  const en = m ? norm(p.slice(m[0].length)) : p;
  if (/^\/devices\/.+/.test(en) && !open(INDEX_DEVICES, en)) return true;
  if (/^\/dc\/world\/.+/.test(en) && !open(INDEX_WORLD, en)) return true;
  return false;
}

/** For the layouts: the English path of the page plus its locale. */
export const heldPage = (enPath, locale) => held(locale === 'en' ? enPath : `/${locale}${norm(enPath)}`);

/** Listed in sitemap.xml: open and not a utility page. */
export function inSitemap(sitePath) {
  const p = norm(sitePath);
  const en = norm(p.replace(LOCALE_PREFIX, ''));
  return !held(p) && !SITEMAP_SKIP.some((s) => (s.endsWith('*') ? en.startsWith(s.slice(0, -1)) : en === s));
}
