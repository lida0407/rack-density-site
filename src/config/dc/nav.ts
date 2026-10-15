// DC Sim section navigation (SITE-NAV.md). Paths are site-root paths so the shared header/footer
// (src/components/Header.astro, Footer.astro) can import them with section="dc".
import { TEMPLATE_FILE } from "./product";

export const DC_NAV = [
  { href: "/dc/product/", label: "Product" },
  { href: "/dc/integrations/", label: "Integrations" },
  { href: "/dc/partners/", label: "Partners" },
  { href: "/dc/pricing/", label: "Pricing" },
  { href: "/dc/resources/", label: "Resources" },
];
export const DC_CTA = { href: `/dc/${TEMPLATE_FILE}`, label: "Excel template", download: true };
export const DC_FOOTER = [
  { href: "/dc/", label: "Overview" },
  { href: "/dc/product/", label: "Product" },
  { href: "/dc/integrations/", label: "Integrations" },
  { href: "/dc/partners/", label: "Partners" },
  { href: "/dc/pricing/", label: "Pricing" },
  { href: "/dc/resources/excel-template/", label: "Excel template" },
  { href: "/dc/resources/guides/", label: "Guides" },
  { href: "/dc/compare/", label: "Comparisons" },
  { href: "/dc/resources/changelog/", label: "Changelog" },
  { href: "/dc/security/", label: "Security & data" },
];
