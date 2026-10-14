import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { SITE_URL, BASE } from './site.config.mjs';

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

export default defineConfig({
  site: SITE_URL,
  base: BASE,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  markdown: { rehypePlugins: [rehypeBaseLinks], shikiConfig: { themes: { dark: 'github-dark-default', light: 'github-light-default' }, defaultColor: 'dark' } },
  integrations: [mdx(), sitemap({ filter: (page) => !/\/404\/?$/.test(page) && !/\/calculator\/$/.test(page) })],
  devToolbar: { enabled: false },
});
