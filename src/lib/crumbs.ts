// Breadcrumb trail for the shared layout: RACKDENSITY › <section> › … › page, plus the matching BreadcrumbList JSON-LD.
import { SITE_URL } from '../../site.config.mjs';
import { lp, type Locale } from '../i18n/config';
import { BRAND, PRODUCT_NAME, DC_PRODUCT_NAME } from '../config/brand';
import type { Section } from '../config/nav';

export interface Crumb { name: string; path?: string }

/** Full trail: the hub and the section root first, then the page's own crumbs (the last one is the page). */
export const trail = (section: Section, page: Crumb[]): Crumb[] => {
  const head: Crumb[] = [{ name: BRAND, path: '/' }];
  if (section === 'homelab') head.push({ name: PRODUCT_NAME, path: '/homelab' });
  if (section === 'dc') head.push({ name: DC_PRODUCT_NAME, path: '/dc' });
  return [...head, ...page];
};

export const crumbsSchema = (items: Crumb[], pagePath: string, locale: Locale = 'en') => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: SITE_URL.replace(/\/$/, '') + lp(c.path ?? pagePath, locale) })),
});
