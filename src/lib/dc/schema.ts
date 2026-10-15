import { PRODUCT_NAME, BRAND, PRICES, ENTITY_DC } from "../../config/dc/product";
import { abs } from "./url";

export const faqLd = (items: { q: string; a: string }[]) =>
  items.length
    ? [{
        "@type": "FAQPage",
        mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
      }]
    : [];

export const softwareLd = () => ({
  "@type": "SoftwareApplication",
  "@id": abs("#app"),
  name: PRODUCT_NAME,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web browser",
  description: ENTITY_DC,
  publisher: { "@id": abs("#org") },
  offers: [
    { "@type": "Offer", name: "Monitor", price: PRICES.monitorMin, priceCurrency: "USD", description: `From $${PRICES.monitorPerRack} per rack per month, minimum $${PRICES.monitorMin}` },
    { "@type": "Offer", name: "Design", price: PRICES.design[0].price, priceCurrency: "USD", description: "One-time per project, from $490 for up to 20 racks" },
  ],
});

export const articleLd = (headline: string, description: string, path: string) => ({
  "@type": "Article",
  headline,
  description,
  mainEntityOfPage: abs(path),
  author: { "@id": abs("#org") },
  publisher: { "@id": abs("#org") },
});

/** Calculators (SEO-GEO-PLAN §3: WebApplication for tools). */
export const webAppLd = (name: string, description: string, path: string) => ({
  "@type": "WebApplication",
  name,
  description,
  url: abs(path),
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web browser",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  publisher: { "@id": abs("#org") },
});

/** Guides and setup pages with numbered steps. */
export const howToLd = (name: string, description: string, steps: { name: string; text: string }[], totalTime?: string) =>
  steps.length
    ? [{
        "@type": "HowTo",
        name,
        description,
        ...(totalTime ? { totalTime } : {}),
        step: steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.name, text: s.text })),
      }]
    : [];

/** Pricing page: the product with every published offer. */
export const productLd = () => ({
  "@type": "Product",
  name: PRODUCT_NAME,
  brand: { "@type": "Brand", name: BRAND },
  description: "Browser-based data center simulator: Design licenses per project, Monitor per rack per month.",
  offers: [
    ...PRICES.design.map((d) => ({ "@type": "Offer", name: `Design, ${d.label}`, price: d.price, priceCurrency: "USD", description: "One-time per project, three months of use", url: abs("pricing/") })),
    { "@type": "Offer", name: "Monitor", priceCurrency: "USD", url: abs("pricing/"),
      priceSpecification: { "@type": "UnitPriceSpecification", price: PRICES.monitorPerRack, priceCurrency: "USD", unitText: "rack per month", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitText: "rack" } },
      description: `$${PRICES.monitorPerRack} per rack per month, minimum $${PRICES.monitorMin} per month` },
  ],
});

/** A recorded clip: poster, file, duration and the on-screen transcript. */
export const videoLd = (v: { name: string; description: string; contentUrl: string; thumbnailUrl: string; uploadDate: string; duration: string; transcript: string }) => ({
  "@type": "VideoObject",
  ...v,
  publisher: { "@id": abs("#org") },
});

/** Data pages (price ranges, benchmarks). */
export const datasetLd = (name: string, description: string, path: string, variables: string[]) => ({
  "@type": "Dataset",
  name,
  description,
  url: abs(path),
  creator: { "@id": abs("#org") },
  license: "https://creativecommons.org/licenses/by/4.0/",
  isAccessibleForFree: true,
  variableMeasured: variables,
  dateModified: "2026-10-15",
});
