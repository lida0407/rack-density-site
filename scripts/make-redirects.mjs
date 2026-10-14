#!/usr/bin/env node
// After the cutover the github.io copy only redirects: one page per built route → https://rack-density.com/<same path>,
// plus a 404 page that forwards any other path and a robots.txt pointing at the real sitemap.
// Usage (deploy.yml): npm run build && node scripts/make-redirects.mjs dist redirect
import { readdirSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
const [, , DIST = 'dist', OUT = 'redirect'] = process.argv;
const TARGET = 'https://rack-density.com';
const OLD_BASE = '/rack-density-site';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const page = (url) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Moved: RACKDENSITY</title><link rel="canonical" href="${esc(url)}"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=${esc(url)}"><script>location.replace(${JSON.stringify(url)} + location.search + location.hash);</script></head><body><p>This page moved to <a href="${esc(url)}">${esc(url)}</a>.</p></body></html>\n`;
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
let n = 0;
for (const f of walk(DIST).filter((f) => f.endsWith('index.html'))) {
  const rel = relative(DIST, dirname(f)).split('\\').join('/');
  const url = `${TARGET}/${rel ? rel + '/' : ''}`;
  mkdirSync(join(OUT, rel), { recursive: true });
  writeFileSync(join(OUT, rel, 'index.html'), page(url)); n++;
}
writeFileSync(join(OUT, '404.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Moved: RACKDENSITY</title><meta name="robots" content="noindex"><script>location.replace(${JSON.stringify(TARGET)} + location.pathname.replace(/^${OLD_BASE.replace(/\//g, '\\/')}/, '') + location.search + location.hash);</script></head><body><p>This site moved to <a href="${TARGET}/">${TARGET}/</a>.</p></body></html>\n`);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${TARGET}/sitemap-index.xml\n`);
console.log(`${n} redirect pages + 404 + robots.txt → ${TARGET}`);
