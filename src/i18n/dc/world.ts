// Locale helpers for the /dc/world/ pages translated in phase A (the earth, estates index, imagined index, open dataset).
// Copy: the "world" dictionary (src/i18n/dc/strings/world-ui.json + world-extra.json). Record content (site, estate and
// operator names, stories, facts) stays English; region, type and kind values stay English in the data because the code
// filters on them, only their labels are translated. The site, estate and imagined record pages are English-only.
import { dcCopy, dcHref, dcHas, dcHasKey, dcMissing, dcPreview, englishOnly } from "./index";
import { LOCALE_META, type Locale } from "../index";
import { TYPE_LABEL, KIND_LABEL, REGION_KEY, IMAGINED_LABEL, countryName, fmt as fmtEn } from "../../lib/dc/world";

/** Copy and formatters for one world page. `englishPath` is the page's English path (e.g. "/dc/world/estates"): when the
 *  page is a held preview in this locale, its links go to the other held previews. */
export function worldCopy(locale: Locale, englishPath: string) {
  const held = dcPreview(englishPath, locale);
  const { t, fellBack } = dcCopy("world", locale, held);
  const en = locale === "en";
  const intl = LOCALE_META[locale].intl;
  const label = (key: string, fallback: string) => (dcHasKey("world", key) ? t(key) : fallback);
  const typeLabel = (k?: string | null) => (k ? label(`labels.type.${k}`, TYPE_LABEL[k] ?? k) : "");
  const kindLabel = (k?: string | null) => (k ? label(`labels.kind.${k}`, KIND_LABEL[k] ?? k) : "");
  const regionLabel = (r: string) => (REGION_KEY[r] ? label(`labels.region.${REGION_KEY[r]}`, r) : r);
  const pueLabel = (k?: string | null) => (k ? label(`labels.pue.${k}`, k) : "");
  const imaginedLabel = en ? IMAGINED_LABEL : t("labels.imaginedLabel");
  /** Link to a DC path (relative to /dc/, e.g. "world/estates/") in this locale; enOnly() is the "(English)" marker. */
  const href = (p: string) => dcHref(`/dc/${p.replace(/^\//, "")}`, locale, held);
  const enOnly = (p: string) => (dcHas(`/dc/${p.replace(/^\//, "")}`, locale, held) ? "" : englishOnly(locale));
  /** A plain number as the English page prints it (String(n)), else in the locale's format (German 1.234,5). */
  const num = (v: number) => (en ? String(v) : v.toLocaleString(intl, { maximumFractionDigits: 3 }));
  const fmt = (v?: number | null, unit = "") => fmtEn(v, unit, en ? "en-US" : intl);
  const country = (cc?: string) => countryName(cc, en ? "en" : intl);
  const place = (city?: string, cc?: string) => [city, country(cc)].filter(Boolean).join(", ");
  /** An ISO date (record sync) as the English page prints it, else long form in the locale (24. Oktober 2026, 2026年10月24日). */
  const date = (iso: string) => {
    if (en || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
    return new Date(`${iso}T12:00:00Z`).toLocaleDateString(intl, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
  };
  /** For Base's `fallback`: a string read so far fell back to English, or one under these key prefixes would. */
  const missing = (prefixes: string[]) => fellBack() || dcMissing("world", locale, prefixes);
  return { t, fellBack, missing, held, en, intl, typeLabel, kindLabel, regionLabel, pueLabel, imaginedLabel, href, enOnly, num, fmt, country, place, date };
}
