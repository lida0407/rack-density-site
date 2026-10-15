// DC pages with a translation (README "How DC marketing adds its locale content"; marketing/I18N.md phase 1). Only listed
// paths get /de/… and /zh/… routes, hreflang, switcher targets and lp() links; everything else links to English.
// Launch rule (I18N.md §3): German after the humanizer + back-translation review; Chinese after Dali reads the DC pages.
const PHASE1 = [
  "/dc", "/dc/pricing", "/dc/legal/privacy",
  "/dc/product", "/dc/product/it", "/dc/product/facility", "/dc/product/connectivity", "/dc/product/simulate", "/dc/product/design",
  "/dc/integrations", "/dc/integrations/zabbix", "/dc/integrations/netbox", "/dc/integrations/librenms",
  "/dc/partners", "/dc/contact", "/dc/security", "/dc/resources/excel-template",
];
/** Chinese DC pages wait for Dali's read; flip to true when he says "zh ok" for /dc/. */
export const DC_ZH_READY = false;
export const DC_TRANSLATED = { de: PHASE1, zh: DC_ZH_READY ? PHASE1 : [] };
