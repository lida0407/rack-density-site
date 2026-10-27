// Post-build: one plain /sitemap.xml (Dali 2026-10-27). @astrojs/sitemap writes sitemap-index.xml + sitemap-N.xml; this merges
// every child's <url> entries (with their xhtml:link hreflang alternates and lastmod) into dist/sitemap.xml and removes the
// index and the children. public/_redirects 301s the old names to /sitemap.xml. 50,000-URL / 50 MB limit is checked.
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const index = join(dist, 'sitemap-index.xml');
if (!existsSync(index)) throw new Error('sitemap-single: dist/sitemap-index.xml missing (did @astrojs/sitemap run?)');
const children = [...readFileSync(index, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.split('/').pop());
const urls = children.flatMap((f) => readFileSync(join(dist, f), 'utf8').match(/<url>[\s\S]*?<\/url>/g) ?? []);
const xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
  + urls.join('\n') + '\n</urlset>\n';
if (urls.length > 50000 || Buffer.byteLength(xml) > 50 * 1024 * 1024) throw new Error(`sitemap-single: ${urls.length} URLs is over the single-file limit; go back to an index`);
writeFileSync(join(dist, 'sitemap.xml'), xml);
for (const f of ['sitemap-index.xml', ...children]) rmSync(join(dist, f));
console.log(`sitemap.xml: ${urls.length} URLs from ${children.length} file(s); sitemap-index.xml and ${children.join(', ')} removed`);
