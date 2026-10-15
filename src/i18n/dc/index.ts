// DC Sim copy per locale (marketing/I18N.md). The string files in ./strings are written by scripts/dc/i18n-import.mjs from
// the plan repo's staged translations: {key: {en, de?, zh?}}; English is the source and the fallback. Placeholders are
// {expr} with the expression text as it stood in the English page; a "$" in front of a price is a literal dollar sign.
import { lp, ui, hasPage, OTHER_LOCALES, type Locale } from "../index";
import { u } from "../../lib/url";
import { DC_PREVIEW } from "../../config/dc/i18n";
import { PRODUCT_NAME, LEGAL_NAME, LEGAL_URL, CONTACT_EMAIL, TEMPLATE_VERSION, TEMPLATE_SHEETS, PRICES } from "../../config/dc/product";
import home from "./strings/home.json";
import pricing from "./strings/pricing.json";
import privacy from "./strings/privacy.json";
import components from "./strings/components.json";
import clips from "./strings/clips.json";
import integrations from "./strings/integrations-index.json";
import page from "./strings/page.json";

export type Entry = { en: string; de?: string; zh?: string };
const DICTS = { home, pricing, privacy, components, clips, integrations, page } as Record<string, Record<string, Entry>>;
export type DictName = keyof typeof DICTS;

const normPath = (p: string) => p.replace(/[?#].*$/, "").replace(/\/+$/, "") || "/";
/** A DC page held for review in a locale (src/config/dc/i18n.ts DC_PREVIEW): built at /<locale>/dc/preview/…. */
export const dcPreview = (sitePath: string, locale: Locale) =>
  locale !== "en" && !hasPage(sitePath, locale) && (DC_PREVIEW[locale] ?? []).includes(normPath(sitePath));
/** The page exists in this locale, launched or held for review. */
export const dcHas = (sitePath: string, locale: Locale) => locale === "en" || hasPage(sitePath, locale) || dcPreview(sitePath, locale);
/** Link to a site path in a locale: the translated page, the held preview of it, else the English page. Keeps ?query and #hash. */
export const dcHref = (sitePath: string, locale: Locale) => {
  const i = sitePath.search(/[?#]/), p = i < 0 ? sitePath : sitePath.slice(0, i), rest = i < 0 ? "" : sitePath.slice(i);
  return dcPreview(p, locale) ? u(`/${locale}/dc/preview${normPath(p).slice(3)}`) + rest : lp(sitePath, locale);
};
/** getStaticPaths for the held previews of one English DC path. */
export const dcPreviewPaths = (sitePath: string) => OTHER_LOCALES.filter((l) => dcPreview(sitePath, l)).map((locale) => ({ params: { locale } }));
/** Link to an English DC path (relative to /dc/, e.g. "pricing/") in a locale: the translated page if there is one. */
export const dcLp = (p: string, locale: Locale) => dcHref(`/dc/${p.replace(/^\//, "")}`, locale);
/** Link to a site-wide path (e.g. "privacy/", "devices/") in a locale. */
export const rootLp = (p: string, locale: Locale) => lp(`/${p.replace(/^\//, "")}`, locale);

const constants = (locale: Locale): Record<string, string | number> => ({
  PRODUCT_NAME, LEGAL_NAME, COMPANY: LEGAL_NAME, LEGAL_URL, CONTACT_EMAIL, TEMPLATE_VERSION,
  TEMPLATE_SHEETS: locale === "en" ? TEMPLATE_SHEETS : str("home", "const.templateSheets", locale),
  "PRICES.monitorPerRack": PRICES.monitorPerRack, "PRICES.monitorMin": PRICES.monitorMin, "PRICES.partnerMargin": PRICES.partnerMargin,
  "PRICES.design[0].price": PRICES.design[0].price,
});

const str = (dict: DictName, key: string, locale: Locale): string => {
  const e = DICTS[dict][key];
  if (!e) throw new Error(`DC i18n: no key "${key}" in ${dict}`);
  return (locale !== "en" && e[locale]) || e.en;
};

// The sheet count is part of the copy in every language: a new template version must update the translations too.
if (str("home", "const.templateSheets", "en") !== TEMPLATE_SHEETS)
  throw new Error(`DC i18n: TEMPLATE_SHEETS is "${TEMPLATE_SHEETS}" but home.json const.templateSheets says "${str("home", "const.templateSheets", "en")}"`);

/** {expr} → value: page vars first, then the product constants, then u("…")/root("…") links in the page's locale (a link to a
 *  page without a translation gets "(English)" after it). */
export const fillDc = (s: string, locale: Locale, vars: Record<string, string | number> = {}) => {
  const all = { ...constants(locale), ...vars };
  const english = new Set<string>();
  const out = s.replace(/\{([^{}]+)\}/g, (m, k: string) => {
    if (k in all) return String(all[k]);
    const link = k.match(/^(u|root)\("([^"]*)"\)$/);
    if (!link) return m;
    const path = link[1] === "u" ? `/dc/${link[2]}` : `/${link[2]}`;
    const href = dcHref(path, locale);
    if (!dcHas(path, locale)) english.add(href);
    return href;
  });
  return english.size ? out.replace(/<a href="([^"]+)"([^>]*)>([\s\S]*?)<\/a>/g, (a, href: string) => (english.has(href) ? a + englishOnly(locale) : a)) : out;
};

/** Copy for one dictionary in one locale. t() for text, keys with markup go through set:html. `fellBack()` is true once any
 *  key was missing in the locale (the layout then shows the shared "not translated yet" note). */
export function dcCopy(dict: DictName, locale: Locale) {
  let fell = false;
  const t = (key: string, vars?: Record<string, string | number>) => {
    const e = DICTS[dict][key];
    if (!e) throw new Error(`DC i18n: no key "${key}" in ${dict}`);
    if (locale !== "en" && !e[locale]) fell = true;
    return fillDc((locale !== "en" && e[locale]) || e.en, locale, vars);
  };
  return { t, fellBack: () => fell };
}

/** "(English)" after a link to a page that has no translation. */
export const englishOnly = (locale: Locale) => (locale === "en" ? "" : locale === "zh" ? `（${ui(locale).englishOnly}）` : ` (${ui(locale).englishOnly})`);

/** Rewrite the links in a translated Markdown page's HTML: relative links resolve against the English URL of the page and
 *  then go to the translated page if there is one, else to the English page marked "(English)". */
export const localizeLinks = (html: string, englishPath: string, locale: Locale) =>
  html.replace(/<a href="([^"]+)"([^>]*)>([\s\S]*?)<\/a>/g, (m, href: string, rest: string, text: string) => {
    if (/^(https?:|mailto:|#)/.test(href)) return m;
    const target = new URL(href, `https://x${englishPath}`);
    const p = target.pathname;
    const out = dcHref(p, locale) + target.search + target.hash;
    const translated = dcHas(p, locale);
    return `<a href="${out}"${rest}>${text}</a>${translated || locale === "en" ? "" : englishOnly(locale)}`;
  });
