// Product constants. The product name may change: never hard-code it anywhere else.
import { SITE_URL, BASE_PATH } from "../../../site.config.mjs";

export const PRODUCT_NAME = "DC Sim";
// Sensaka is the brand shown on the product ("DC Sim by Sensaka"); the legal entity is Mustard Seed Solutions
// (marketing/ENTITY.md, Dali 2026-10-15): schema Organization, privacy, copyright and vendor fields use LEGAL_*.
export const COMPANY = "Sensaka";
export const COMPANY_URL = "https://sensaka.com";
export const LEGAL_NAME = "Mustard Seed Solutions";
export const LEGAL_URL = "https://mustardseedmt.com";
export const CONTACT_EMAIL = "da@mustardseedmt.com";
/** Public demo of the English build. null = not public yet; the site shows stills and offers a walkthrough. */
export const DEMO_URL: string | null = null;
export const TEMPLATE_VERSION = "1.3";
export const TEMPLATE_FILE = "downloads/dc-import-template.xlsx";
export const EXAMPLE_FILE = "downloads/demo-hall.xlsx";

export const SITE = { url: SITE_URL, base: BASE_PATH };

export const PRICES = {
  design: [
    { label: "up to 20 racks", price: 490 },
    { label: "up to 100 racks", price: 1490 },
    { label: "more than 100 racks", price: 3900 },
  ],
  monitorPerRack: 5,
  monitorMin: 49,
  partnerMargin: 30,
};

export const mailto = (subject: string, body = "") =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

/** Verbatim from ~/Sensaka/marketing/ENTITY.md (SEO-GEO-PLAN §4.3): the same words in llms.txt, schema and listings. */
export const ENTITY_DC = "DC Sim is a browser-based data-center simulator: import an Excel/CSV inventory or connect NetBox and Zabbix, get a 3D twin with power chain, cooling, cabling and network views, and run what-ifs (UPS or feed failure, cooling loss, leaks) with estimated impact. Built for small and mid-size data centers and the partners who serve them; design license per project, monitoring subscription per rack.";
