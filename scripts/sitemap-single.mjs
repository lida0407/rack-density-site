// Post-build: one plain /sitemap.xml (Dali 2026-10-27), only the pages open for search (SEO-ROOT-CAUSE.md, 2026-11-16). @astrojs/sitemap writes sitemap-index.xml + sitemap-N.xml; this merges
// every child's <url> entries (with their xhtml:link hreflang alternates and lastmod) into dist/sitemap.xml and removes the
// index and the children. public/_redirects 301s the old names to /sitemap.xml. 50,000-URL / 50 MB limit is checked.
import { readFileSync, writeFileSync, rmSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { inSitemap, localeIndexed } from '../src/config/indexing.mjs';

const dist = 'dist';
const index = join(dist, 'sitemap-index.xml');
if (!existsSync(index)) throw new Error('sitemap-single: dist/sitemap-index.xml missing (did @astrojs/sitemap run?)');
const children = [...readFileSync(index, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.split('/').pop());
const all = children.flatMap((f) => readFileSync(join(dist, f), 'utf8').match(/<url>[\s\S]*?<\/url>/g) ?? []);
const wrap = (list) => '<?xml version="1.0" encoding="UTF-8"?>\n'
  + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
  + list.join('\n') + '\n</urlset>\n';
// Every built page, for llms.txt (scripts/llms-index.mjs): AI crawlers still get the whole catalog. Outside dist, not deployed.
mkdirSync('.astro', { recursive: true });
writeFileSync('.astro/sitemap-all.xml', wrap(all));
// sitemap.xml lists only pages open for search (src/config/indexing.mjs); alternates only to open locales, none if just English is left.
const lang = (h) => (h === 'zh-CN' ? 'zh' : h);
const urls = all.filter((x) => inSitemap(new URL(x.match(/<loc>([^<]+)<\/loc>/)[1]).pathname)).map((x) => {
  const links = [...x.matchAll(/<xhtml:link rel="alternate" hreflang="([^"]+)" href="[^"]+"\/>/g)];
  const keep = links.filter((l) => localeIndexed(lang(l[1])));
  return keep.length > 1 ? x.replace(/<xhtml:link [^>]*\/>/g, (l) => (keep.some((k) => k[0] === l) ? l : '')) : x.replace(/<xhtml:link [^>]*\/>/g, '');
});
const xml = wrap(urls);
if (urls.length > 50000 || Buffer.byteLength(xml) > 50 * 1024 * 1024) throw new Error(`sitemap-single: ${urls.length} URLs is over the single-file limit; go back to an index`);
writeFileSync(join(dist, 'sitemap.xml'), xml);
for (const f of ['sitemap-index.xml', ...children]) rmSync(join(dist, f));
console.log(`sitemap.xml: ${urls.length} of ${all.length} pages open for search (src/config/indexing.mjs) from ${children.length} file(s); sitemap-index.xml and ${children.join(', ')} removed`);
