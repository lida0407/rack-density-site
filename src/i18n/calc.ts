// Calculator defaults per locale, kept import-free so client scripts can use it (I18N.md §1: one constant per locale).
// `after`: the currency symbol follows the amount (German "165 €").
export const LOCALE_CALC: Record<string, { currency: string | null; tariff: number | null; circuit: string; intl: string; after?: boolean }> = {
  en: { currency: null, tariff: null, circuit: 'single-230-16', intl: 'en-US' },    // null = the browser-language default
  de: { currency: '€', tariff: 0.35, circuit: 'single-230-16', intl: 'de-DE', after: true }, // typical German household tariff, editable
  'zh-CN': { currency: '¥', tariff: 0.6, circuit: 'single-220-16', intl: 'zh-CN' }, // typical mainland tariff in CNY, editable
};
/** The calculator defaults for the page's <html lang>. */
export const pageCalc = () => LOCALE_CALC[(typeof document !== 'undefined' && document.documentElement.lang) || 'en'] ?? LOCALE_CALC.en;
