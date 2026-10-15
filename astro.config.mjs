import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { SITE_URL, BASE } from './site.config.mjs';
import { LOCALE_LIVE } from './src/i18n/live.mjs';

const siteBase = BASE.endsWith('/') ? BASE : `${BASE}/`;

/** Prefix the base path to root-relative links written in Markdown. Files under src/content/dc/ are DC Sim pages,
 *  so their "/pricing/" means "<base>/dc/pricing/"; everything else is site-relative ("<base>/…"). */
function rehypeBaseLinks() {
  return (tree, file) => {
    const inDc = /[\\/]src[\\/]content[\\/]dc[\\/]/.test(file?.path ?? '');
    const prefix = inDc ? `${siteBase}dc/` : siteBase;
    const walk = (node) => {
      if (node.type === 'element') {
        for (const attr of ['href', 'src']) {
          const v = node.properties?.[attr];
          if (typeof v === 'string' && v.startsWith('/') && !v.startsWith('//') && !v.startsWith(prefix)) node.properties[attr] = prefix + v.slice(1);
        }
      }
      (node.children || []).forEach(walk);
    };
    walk(tree);
  };
}

/** Sitemap lastmod = the last git commit that touched the page's source (SEO-GEO-PLAN §3: real lastmod, not build time).
 *  CI checks out the full history (fetch-depth 0); a page with no known source gets no lastmod rather than a fake one. */
// Pages shared by en/de/zh render from src/views/ with copy in src/i18n/pages/ (I18N.md); a locale page's lastmod is its view + copy.
const VIEWS = { '': ['Hub', 'hub'], calculator: ['Calculator', 'calculator'], homelab: ['Homelab', 'homelab'], 'homelab/pricing': ['Pricing', 'pricing'],
  'homelab/try': ['Try', 'try'], 'homelab/waitlist': ['Waitlist', 'waitlist'], 'homelab/changelog': ['Changelog', 'changelog'], privacy: ['Privacy', 'privacy'] };
const sourcesFor = (path) => {
  const loc = path.match(/^(de|zh)(?:\/(.*))?$/), p = loc ? loc[2] ?? '' : path;
  if (VIEWS[p]) return [`src/views/${VIEWS[p][0]}.astro`, `src/i18n/pages/${VIEWS[p][1]}.ts`, ...(p === 'homelab/changelog' ? ['src/content/changelog'] : [])];
  if (p === '') return ['src/pages/index.astro'];
  const learn = p.match(/^homelab\/learn\/([^/]+)$/);
  if (learn) return [`src/content/homelab/learn/${learn[1]}.mdx`];
  const guide = p.match(/^dc\/resources\/guides\/([^/]+)$/);
  if (guide) return [`src/content/dc/guides/${guide[1]}.md`];
  return [`src/pages/${p}.astro`, `src/pages/${p}/index.astro`, ...(p.startsWith('dc/') ? [`src/content/dc/pages/${p.slice(3)}.md`] : [])];
};
// /devices/ pages: the record's own `updated` date from the public catalog.
const DEVICE_UPDATED = new Map((existsSync('src/data/devices/public.json') ? JSON.parse(readFileSync('src/data/devices/public.json', 'utf8')).devices : [])
  .map((d) => { const [c, v, m] = d.id.split('/'); return [`devices/${c.replace(/_/g, '-')}/${v}/${m}`, d.updated]; }));
const lastmod = (url) => {
  const p = decodeURIComponent(new URL(url).pathname).slice(siteBase.length).replace(/\/$/, '');
  if (DEVICE_UPDATED.has(p)) return new Date(DEVICE_UPDATED.get(p)).toISOString();
  if (p.startsWith('devices')) return lastmodFiles(['src/data/devices/public.json']);
  return lastmodFiles(sourcesFor(p));
};
function lastmodFiles(list) {
  const files = list.filter((f) => existsSync(f));
  if (!files.length) return undefined;
  try { return execFileSync('git', ['log', '-1', '--format=%cI', '--', ...files]).toString().trim() || undefined; } catch { return undefined; }
}

export default defineConfig({
  site: SITE_URL,
  base: BASE,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  markdown: { rehypePlugins: [rehypeBaseLinks], shikiConfig: { themes: { dark: 'github-dark-default', light: 'github-light-default' }, defaultColor: 'dark' } },
  // Sitemap: hreflang alternates for pages that exist in several locales; the Impressum (German only, noindex until complete) stays out.
  integrations: [mdx(), sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', de: 'de', zh: 'zh-CN' } }, filter: (page) => !/\/(404|impressum)\/?$/.test(page) && !Object.entries(LOCALE_LIVE).some(([l, live]) => !live && page.includes(`/${l}/`)) && !page.includes('/dc/preview/'), serialize: (item) => { const d = lastmod(item.url); return d ? { ...item, lastmod: d } : item; } })],
  devToolbar: { enabled: false },
});
