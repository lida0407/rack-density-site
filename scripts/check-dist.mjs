#!/usr/bin/env node
// Post-build checks: every internal link/asset resolves, every page has one H1, a title, description, canonical, and valid JSON-LD.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { BASE } from '../site.config.mjs';
const ROOT = BASE.replace(/\/$/, '');   // '' on rack-density.com, '/rack-density-site' on github.io
const DIST = 'dist';
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const html = walk(DIST).filter((f) => f.endsWith('.html'));
let bad = 0;
const fail = (m) => { console.log('✖', m); bad++; };
const warn = (m) => console.log('⚠', m);
// Paths served by Cloudflare redirects (public/_redirects → dist/_redirects) count as valid link targets if their target exists.
const redirects = new Map((existsSync(join(DIST, '_redirects')) ? readFileSync(join(DIST, '_redirects'), 'utf8') : '').split('\n')
  .map((l) => l.trim().split(/\s+/)).filter((r) => r.length >= 2 && r[0].startsWith('/')).map(([from, to]) => [from, to]));
for (const f of html) {
  const s = readFileSync(f, 'utf8');
  if (/http-equiv="refresh"/.test(s)) continue;   // redirect stubs
  const h1 = (s.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fail(`${f}: ${h1} <h1>`);
  if (!/<title>[^<]+<\/title>/.test(s)) fail(`${f}: no title`);
  const tl = ((s.match(/<title>([^<]+)<\/title>/) || [])[1] || '').replace(/&amp;/g, '&').length;
  if (tl > 60 && !/[\\/]dc[\\/]/.test(f)) warn(`${f}: title ${tl} chars (> 60)`); // SEO-GEO-PLAN §3; DC titles are DC marketing's
  if (!/<meta name="description" content="[^"]+"/.test(s)) fail(`${f}: no description`);
  if (!/<link rel="canonical" href="https:\/\/[^"]+"/.test(s)) fail(`${f}: no canonical`);
  for (const m of s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(m[1]); } catch { fail(`${f}: bad JSON-LD`); } }
  for (const m of s.matchAll(/(?:href|src|srcset)="([^"]+)"/g)) {
    for (const ref of m[1].split(',').map((x) => x.trim().split(' ')[0])) {
      if (!ref.startsWith(ROOT + '/') || ref.startsWith('//')) continue;
      const p = decodeURI(ref.slice(ROOT.length).split('#')[0].split('?')[0]);
      const exists = (q) => { const x = join(DIST, q); return (existsSync(x) && statSync(x).isFile()) || existsSync(join(x, 'index.html')); };
      const via = redirects.get(p);
      if (!exists(p) && !(via && exists(via.split('?')[0]))) fail(`${f}: broken ${ref}`);
    }
  }
}
console.log(`${html.length} pages checked, ${bad} problem(s)`);
process.exit(bad ? 1 : 0);
