// IndexNow ping (Bing, Yandex, Seznam, Naver share submissions via api.indexnow.org).
// Usage after a deploy: node scripts/indexnow.mjs [--previous old-sitemap.xml] [--all] [--dry-run]
//   --previous  the live sitemap saved BEFORE the deploy; only URLs that are new or whose lastmod changed are sent.
//   --all       send every URL in dist/sitemap.xml (first run, or after a big change).
// The key file public/<key>.txt must be live on the site before this runs (it ships with the same deploy).
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { SITE_URL } from '../site.config.mjs';

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };

const keyFile = readdirSync('public').find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('indexnow: no public/<32-hex>.txt key file');
const key = keyFile.slice(0, -4);

const entries = (xml) => new Map([...xml.matchAll(/<url><loc>([^<]+)<\/loc>(?:<lastmod>([^<]+)<\/lastmod>)?/g)].map((m) => [m[1], m[2] ?? '']));
const current = entries(readFileSync('dist/sitemap.xml', 'utf8'));
const prevPath = opt('--previous');
const previous = prevPath && existsSync(prevPath) ? entries(readFileSync(prevPath, 'utf8')) : null;

let urls = [...current.keys()];
if (!flag('--all')) {
  if (!previous || previous.size === 0) { console.log('indexnow: no previous sitemap to compare; pass --all to send everything'); process.exit(0); }
  urls = urls.filter((u) => previous.get(u) !== current.get(u));
}
if (urls.length === 0) { console.log('indexnow: nothing changed'); process.exit(0); }

const host = new URL(SITE_URL).host;
const body = { host, key, keyLocation: `${SITE_URL}/${keyFile}`, urlList: urls.slice(0, 10000) };
console.log(`indexnow: ${body.urlList.length} URL(s)${flag('--dry-run') ? ' (dry run)' : ''}`);
for (const u of body.urlList.slice(0, 20)) console.log('  ' + u);
if (flag('--dry-run')) process.exit(0);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});
console.log(`indexnow: HTTP ${res.status} ${await res.text()}`);
// 200 = accepted, 202 = accepted, key pending validation. Anything else should not fail the deploy.
if (res.status >= 400) console.log(`::warning::IndexNow returned ${res.status}`);
