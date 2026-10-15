import { getCollection } from "astro:content";
import { PRODUCT_NAME, COMPANY, CONTACT_EMAIL, PRICES, TEMPLATE_FILE, TEMPLATE_VERSION } from "../../config/dc/product";
import { abs } from "../../lib/dc/url";
import { ENTITY_DC, LEGAL_NAME } from "../../config/dc/product";

// The DC Sim section of the site-wide /llms.txt (https://llmstxt.org). Underscore file: not a route.
// Owned by DC marketing; the root src/pages/llms.txt.ts embeds it under the hub summary.
export const dcLlms = async (): Promise<string> => {
  const pages = (await getCollection("pages")).sort((a, b) => a.data.section.localeCompare(b.data.section) || a.data.order - b.data.order);
  const guides = (await getCollection("guides")).sort((a, b) => a.data.order - b.data.order);
  const compare = (await getCollection("compare")).sort((a, b) => a.data.order - b.data.order);
  const { SITES, ESTATES, IMAGINED, IMAGINED_LABEL } = await import("../../lib/dc/world");
  const line = (title: string, path: string, desc: string) => `- [${title}](${abs(path)}): ${desc}`;
  const section = (name: string) =>
    pages.filter((p) => p.data.section === name).map((p) => line(p.data.h1, `${p.id}/`, p.data.description)).join("\n");

  const body = `# ${PRODUCT_NAME}

> ${ENTITY_DC}

DC Sim is a Sensaka product; Sensaka is a brand of ${LEGAL_NAME} (Malta).

Status: the product runs today on demo data and on imported files, shown in walkthroughs. Zabbix and NetBox connect directly with a read-only token (tested against live demo instances); other live connectors, self-serve accounts, checkout and the AI design assistant are on the roadmap. Pricing: Design from $${PRICES.design[0].price} one-time per project; Monitor $${PRICES.monitorPerRack} per rack per month, minimum $${PRICES.monitorMin}; partners earn a ${PRICES.partnerMargin} % margin. Contact: ${CONTACT_EMAIL}.

## Main pages
${line("Home", "", "What DC Sim is, the three advantages, how it works.")}
${line("Pricing", "pricing/", "Design per project, Monitor per rack, Partner margin, comparison with typical DCIM pricing.")}
${line("Excel template v" + TEMPLATE_VERSION, TEMPLATE_FILE, "The import workbook: Devices required; Cables, Racks, Power, Networks, Cooling, Readings optional.")}

## Product
${section("product")}

## Integrations
${line("Integrations overview", "integrations/", "Status tool by tool; every tool works today through the template sheets.")}
${section("integrations")}

## Resources
${section("resources")}
${guides.map((g) => line(g.data.h1, `resources/guides/${g.id}/`, g.data.description)).join("\n")}
${line("Rack power calculator", "resources/calculators/rack-power/", "Load per PDU in normal and failover against the 80 % rule.")}
${line("Tokens per kWh calculator", "resources/calculators/tokens-per-kwh/", "Tokens per second and watts to tokens per kWh and cost per 1M tokens.")}

## Famous data centers of the world (open data, CC BY 4.0)
${line("The earth", "world/", `${SITES.length} famous data centers and ${ESTATES.length} estates on an interactive globe: cut a link, compare two sites, find yours.`)}
${line("Open dataset", "world/data/", "GeoJSON, CSV and DC Sim workbooks with sources for every record.")}
${line("Estates", "world/estates/", "Submarine cables, cloud backbones, national compute networks, exchanges and financial routes.")}
${ESTATES.map((e) => line(e.name, `world/estates/${e.id}/`, e.famous_for ?? "")).join("\n")}
${line("Imagined giants", "world/imagined/", `${IMAGINED_LABEL}: gigawatt campuses designed in DC Sim from catalog devices and public numbers.`)}
${IMAGINED.map((g) => line(`${g.name} (imagined)`, `world/imagined/${g.id}/`, `${IMAGINED_LABEL}. ${g.famous_for ?? ""}`)).join("\n")}

## Comparisons (public prices with dates and sources)
${line("All comparisons", "compare/", "DC Sim next to the DCIM and monitoring tools people compare it with.")}
${compare.map((c) => line(c.data.h1, `compare/${c.id}/`, `${c.data.description} Last checked ${c.data.lastChecked}.`)).join("\n")}

## Company
${section("company")}
`;
  return body;
};
