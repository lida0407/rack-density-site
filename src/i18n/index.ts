// i18n entry point: ui(locale) = the UI dictionary with English fallback; fill() replaces {placeholders}.
import { en, type UI } from './ui/en';
import { de } from './ui/de';
import { zh } from './ui/zh';
import { withFallback, lp, hasPage, OTHER_LOCALES, type Locale, type Deep } from './config';
import { mailto } from '../lib/url';
import { WAITLIST, NOTIFY, WALKTHROUGH, PRODUCT_NAME } from '../config/brand';
import { TRIAL_PAGES } from '../config/trial.mjs';
export * from './config';

const DICTS = { en, de, zh } as const;
export const ui = (locale: Locale): UI => withFallback(en, DICTS[locale] as Partial<UI>).c;
export const fill = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
/** Translate a nav/footer label (English label as key); unknown labels stay as they are. */
export const label = (locale: Locale, s: string) => ui(locale).labels[s] ?? s;

/** Page copy: { en, de?, zh? } from src/i18n/pages/<page>.ts → the locale's copy with English fallback (+ whether it fell back). */
export const pageCopy = <T extends object>(m: { en: T; de?: Deep<T>; zh?: Deep<T>; trial?: Partial<Record<Locale, Deep<T>>> }, locale: Locale) => {
  const r = withFallback(m.en, (locale === 'en' ? m.en : m[locale]) as Partial<T> | undefined);
  const t = TRIAL_PAGES ? m.trial?.[locale] : undefined;
  return t ? { c: overlay(r.c, t) as T, fellBack: r.fellBack } : r;
};
/** Trial builds (src/config/trial.mjs): a page's `trial` export replaces single strings (play-only wording, TRY-SIGNUP.md §10).
 *  Objects merge by key, arrays by index (a missing index keeps the page's own item). */
const overlay = (a: any, b: any): any => (b === undefined ? a : Array.isArray(a) ? a.map((x, i) => overlay(x, b[i]))
  : a && typeof a === 'object' ? Object.fromEntries(Object.keys(a).map((k) => [k, overlay(a[k], b?.[k])])) : b);
/** The waitlist link for a locale (mailto while the waitlist is off). */
export const notifyLp = (src: string, locale: Locale) => (WAITLIST.live ? `${lp('/homelab/waitlist', locale)}?src=${src}` : mailto(notifyMail(locale).subject, notifyMail(locale).body));
/** getStaticPaths for src/pages/[locale]/**: the locales that have this English path. */
export const localePaths = (path: string) => OTHER_LOCALES.filter((l) => hasPage(path, l)).map((locale) => ({ params: { locale } }));
/** Prefilled mails per locale (English = the brand.ts constants, unchanged). */
export const walkMail = (locale: Locale) => (locale === 'en' ? WALKTHROUGH : { subject: fill(ui(locale).mail.walkSubject, { p: PRODUCT_NAME }), body: fill(ui(locale).mail.walkBody, { p: PRODUCT_NAME }) });
export const notifyMail = (locale: Locale) => (locale === 'en' ? NOTIFY : { subject: fill(ui(locale).mail.notifySubject, { p: PRODUCT_NAME }), body: ui(locale).mail.notifyBody });
