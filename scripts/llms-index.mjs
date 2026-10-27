// Post-build: append to dist/llms.txt an index of every page in the sitemap with its title and meta description,
// so llms.txt can never fall out of sync with the site (SEO-GEO-PLAN §3: "generated, not hand-written").
// /de/llms.txt and /zh/llms.txt get the pages of their own locale; the root file lists the English pages.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { SITE_URL, BASE } from '../site.config.mjs';

const dist = 'dist';
const root = SITE_URL.replace(/\/$/, '') + (BASE.endsWith('/') ? BASE : `${BASE}/`);
const sm = readFileSync(join(dist, 'sitemap.xml'), 'utf8'); // one file since 2026-10-27 (scripts/sitemap-single.mjs runs first)
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const unesc = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
import { LOCALE_LIVE } from '../src/i18n/live.mjs';
const LOCALES = { de: 'Alle Seiten auf Deutsch (beim Build aus der Sitemap erzeugt)', zh: '全部中文页面（构建时从站点地图生成）' };
const meta = (rel) => {
  const file = join(dist, rel, 'index.html');
  if (!existsSync(file)) return null;
  const html = readFileSync(file, 'utf8');
  return { title: unesc((html.match(/<title>([^<]*)<\/title>/) || [])[1] || rel).replace(/ [|—–] [^|—–]+$/, ''), desc: unesc((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '') };
};
for (const [l, heading] of Object.entries(LOCALES)) {
  const file = join(dist, l, 'llms.txt');
  if (!existsSync(file)) continue;
  const lines = urls.filter((u) => u.slice(root.length).startsWith(`${l}/`)).map((u) => [u, meta(u.slice(root.length))]).filter(([, m]) => m)
    .map(([u, m]) => `- [${m.title}](${u})${m.desc ? `: ${m.desc}` : ''}`);
  writeFileSync(file, `${readFileSync(file, 'utf8').trimEnd()}\n\nFull text: ${root}${l}/llms-full.txt · Sitemap: ${root}sitemap.xml\n\n## ${heading}\n\n${lines.join('\n')}\n`);
  console.log(`${l}/llms.txt: ${lines.length} pages indexed`);
}
let deviceModels = 0;
const groups = new Map([['Hub and free tools', []], ['Device database', []], ['Homelab Twin', []], ['Homelab guides', []], ['DC Sim', []], ['DC Sim resources', []], ['Other', []]]);
for (const url of urls) {
  const rel = url.slice(root.length);
  if (/^(de|zh)\//.test(rel)) continue; // listed in /de/llms.txt and /zh/llms.txt
  if (/^devices\/[^/]+\/[^/]+\/[^/]+\/$/.test(rel)) { deviceModels++; continue; } // one line per category is enough
  const file = join(dist, rel, 'index.html');
  if (!existsSync(file)) continue;
  const html = readFileSync(file, 'utf8');
  const title = unesc((html.match(/<title>([^<]*)<\/title>/) || [])[1] || rel).replace(/ [|—–] [^|—–]+$/, '');
  const desc = unesc((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  const g = rel.startsWith('homelab/learn/') && rel !== 'homelab/learn/' ? 'Homelab guides' : rel.startsWith('homelab') ? 'Homelab Twin'
    : rel.startsWith('devices') ? 'Device database' : rel.startsWith('dc/resources') ? 'DC Sim resources' : rel.startsWith('dc') ? 'DC Sim' : rel === '' || rel.startsWith('calculator') ? 'Hub and free tools' : 'Other';
  groups.get(g).push(`- [${title}](${url})${desc ? `: ${desc}` : ''}`);
}
if (deviceModels) groups.get('Device database').push(`- ${deviceModels} model pages under ${root}devices/<category>/<vendor>/<model>/ (data: ${root}devices/rack-density-devices.csv, CC BY 4.0)`);
const index = [...groups].filter(([, l]) => l.length).map(([h, l]) => `### ${h}\n${l.join('\n')}`).join('\n\n');
const file = join(dist, 'llms.txt');
const other = Object.keys(LOCALES).filter((l) => LOCALE_LIVE[l] && existsSync(join(dist, l, 'llms.txt'))).map((l) => `${{ de: 'In German', zh: 'In Chinese' }[l]}: ${root}${l}/llms.txt`).join(' · ');
writeFileSync(file, `${readFileSync(file, 'utf8').trimEnd()}\n\n${other ? `${other}\n\n` : ''}Full text: ${root}llms-full.txt · Sitemap: ${root}sitemap.xml · RSS: ${root}rss.xml\n\n## Every page (generated from the sitemap at build time)\n\n${index}\n`);
console.log(`llms.txt: ${urls.length} sitemap pages indexed`);
