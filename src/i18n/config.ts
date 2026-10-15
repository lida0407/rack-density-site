// i18n (marketing/I18N.md): English unprefixed, German under /de/, Chinese (simplified, mainland) under /zh/.
// Product and brand names stay Latin in every locale (Homelab Twin, DC Sim, RACKDENSITY, Sensaka).
import { u, abs } from '../lib/url';

export const LOCALES = ['en', 'de', 'zh'] as const;
export type Locale = (typeof LOCALES)[number];
export const OTHER_LOCALES = ['de', 'zh'] as const;

export const LOCALE_META: Record<Locale, { label: string; name: string; html: string; hreflang: string; og: string; intl: string }> = {
  en: { label: 'EN', name: 'English', html: 'en', hreflang: 'en', og: 'en_US', intl: 'en-US' },
  de: { label: 'DE', name: 'Deutsch', html: 'de', hreflang: 'de', og: 'de_DE', intl: 'de-DE' },
  zh: { label: '中文', name: '简体中文', html: 'zh-CN', hreflang: 'zh-CN', og: 'zh_CN', intl: 'zh-CN' },
};

export { LOCALE_CALC } from './calc';
import { LOCALE_LIVE } from './live.mjs';
export { LOCALE_LIVE };
/** Launched locales (src/i18n/live.mjs); English always. */
export const isLive = (l: Locale) => l === 'en' || LOCALE_LIVE[l];

/** English paths (site-root, no trailing slash) that have a page in each locale. Phase 1 (homelab marketing). DC marketing
 *  registers its translated paths in src/config/dc/i18n.ts (DC_TRANSLATED); they are merged here. */
const HUB_HOMELAB: Record<'de' | 'zh', string[]> = {
  de: ['/', '/calculator', '/homelab', '/homelab/pricing', '/homelab/try', '/homelab/waitlist', '/homelab/changelog', '/privacy', '/impressum'],
  zh: ['/', '/calculator', '/homelab', '/homelab/pricing', '/homelab/try', '/homelab/waitlist', '/homelab/changelog', '/privacy'],
};
const dcMod = Object.values(import.meta.glob<{ DC_TRANSLATED?: Partial<Record<'de' | 'zh', string[]>> }>('../config/dc/i18n.ts', { eager: true }))[0];
const norm = (p: string) => (p.replace(/[?#].*$/, '').replace(/\/+$/, '') || '/');
export const TRANSLATED: Record<'de' | 'zh', Set<string>> = {
  de: new Set([...HUB_HOMELAB.de, ...(dcMod?.DC_TRANSLATED?.de ?? [])].map(norm)),
  zh: new Set([...HUB_HOMELAB.zh, ...(dcMod?.DC_TRANSLATED?.zh ?? [])].map(norm)),
};
export const hasPage = (path: string, locale: Locale) => locale === 'en' ? !/^\/(impressum|404)$/.test(norm(path)) : TRANSLATED[locale].has(norm(path));

/** Locale of the current URL (base path stripped). */
export const localeOf = (pathname: string): Locale => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const p = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  const m = p.match(/^\/(de|zh)(\/|$)/);
  return (m?.[1] as Locale) ?? 'en';
};
/** English path of a localized URL path: /de/homelab/pricing/ → /homelab/pricing */
export const basePath = (pathname: string): string => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const p = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  return norm(p.replace(/^\/(de|zh)(?=\/|$)/, '') || '/');
};
/** Link to an English path in a locale: the localized page when it exists, else the English page. Keeps #hash and ?query. */
export const lp = (path: string, locale: Locale): string => {
  if (/^(https?:|mailto:)/.test(path)) return path;
  const i = path.search(/[#?]/), p = i < 0 ? path : path.slice(0, i), rest = i < 0 ? '' : path.slice(i);
  const target = locale === 'en' || !hasPage(p, locale) ? norm(p) : `/${locale}${norm(p) === '/' ? '' : norm(p)}`;
  return u(target) + rest;
};
/** Where the language switcher sends you: the same page in that locale, else that locale's section home, else its hub. */
export const switchHref = (path: string, to: Locale): string => {
  if (hasPage(path, to)) return to === 'en' ? u(norm(path)) : lp(path, to);
  const section = norm(path).startsWith('/dc') ? '/dc' : norm(path).startsWith('/homelab') ? '/homelab' : '/';
  return to === 'en' ? u(section) : lp(hasPage(section, to) ? section : '/', to);
};
/** hreflang alternates for an English path: every launched locale that has it, plus x-default = English. */
export const alternates = (path: string) => {
  const out = LOCALES.filter((l) => isLive(l) && hasPage(path, l)).map((l) => ({ hreflang: LOCALE_META[l].hreflang, href: l === 'en' ? abs(norm(path)) : abs(`/${l}${norm(path) === '/' ? '' : norm(path)}`) }));
  if (hasPage(path, 'en')) out.push({ hreflang: 'x-default', href: abs(norm(path)) });
  return out;
};
/** Number formatting per locale (German 1.234,5 · Chinese 1,234.5). */
export const nf = (locale: Locale, v: number, d = 0) => v.toLocaleString(LOCALE_META[locale].intl, { minimumFractionDigits: d, maximumFractionDigits: d });

/** A translation of T: any subset of its keys, nested. Arrays must match the English length or the English array is used. */
export type Deep<T> = { [K in keyof T]?: T[K] extends object ? Deep<T[K]> : T[K] };

/** Deep merge: English base, locale overrides. Returns the merged copy and whether anything fell back to English. */
export function withFallback<T extends object>(en: T, loc: Partial<T> | undefined): { c: T; fellBack: boolean } {
  let fellBack = false;
  const merge = (a: any, b: any): any => {
    if (b === undefined) { fellBack = true; return a; }
    if (Array.isArray(a)) return Array.isArray(b) && b.length === a.length ? a.map((x, i) => merge(x, b[i])) : (fellBack = true, a);
    if (a && typeof a === 'object') return Object.fromEntries(Object.keys(a).map((k) => [k, merge(a[k], b?.[k])]));
    return b;
  };
  return { c: loc ? merge(en, loc) : (fellBack = true, en), fellBack: loc ? fellBack : true };
}
