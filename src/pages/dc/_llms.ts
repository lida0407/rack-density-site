import { getCollection } from "astro:content";
import { PRODUCT_NAME, CONTACT_EMAIL, PRICES, TEMPLATE_FILE, TEMPLATE_VERSION } from "../../config/dc/product";
import { abs } from "../../lib/dc/url";
import { ENTITY_DC, LEGAL_NAME } from "../../config/dc/product";
import { SITE_URL } from "../../../site.config.mjs";
import { lp, hasPage, type Locale } from "../../i18n";

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

DC Sim is a product of ${LEGAL_NAME} (Malta), part of RACKDENSITY (rack-density.com).

Status: the product runs today on demo data and on imported files, shown in walkthroughs. Zabbix and NetBox connect directly with a read-only token (tested against live demo instances); other live connectors, self-serve accounts, checkout and the AI design assistant are on the roadmap. Pricing: Design from $${PRICES.design[0].price} one-time per project; Monitor $${PRICES.monitorPerRack} per rack per month, minimum $${PRICES.monitorMin}; partners earn a ${PRICES.partnerMargin} % margin. Contact: ${CONTACT_EMAIL}.

## Main pages
${line("Home", "", "What DC Sim is, the three advantages, how it works.")}
${line("Pricing", "pricing/", "Design per project, Monitor per rack, Partner margin, comparison with typical DCIM pricing.")}
${line("Excel template v" + TEMPLATE_VERSION, TEMPLATE_FILE, "The import workbook: Devices required; Cables, Sites, Rooms, Racks, Power, Networks, Links, Cooling, Liquid, CustomDevices and Readings optional.")}

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

/** The DC Sim part of /de/llms.txt and /zh/llms.txt (src/pages/[locale]/llms.txt.ts picks it up): the translated DC pages
 *  only, with their titles and descriptions in that language; empty while a locale has no DC pages (src/config/dc/i18n.ts). */
export const dcLlmsLocale = async (locale: Locale): Promise<string> => {
  if (!hasPage("/dc", locale)) return "";
  const { dcCopy } = await import("../../i18n/dc");
  const home = dcCopy("home", locale).t, pricing = dcCopy("pricing", locale).t, integ = dcCopy("integrations", locale).t, priv = dcCopy("privacy", locale).t;
  const url = (p: string) => SITE_URL.replace(/\/$/, "") + lp(p, locale);
  const pages = (await getCollection("pagesL10n", (p) => p.id.startsWith(`${locale}/`)))
    .map((p) => ({ slug: p.id.slice(locale.length + 1), d: p.data }))
    .filter((p) => hasPage(`/dc/${p.slug}`, locale))
    .sort((a, b) => a.d.section.localeCompare(b.d.section) || a.d.order - b.d.order);
  const lines = [
    `- [${home("meta.title")}](${url("/dc")}): ${home("meta.description")}`,
    `- [${pricing("meta.title")}](${url("/dc/pricing")}): ${pricing("meta.description")}`,
    `- [${integ("metaTitle")}](${url("/dc/integrations")}): ${integ("metaDescription")}`,
    ...pages.map((p) => `- [${p.d.h1}](${url(`/dc/${p.slug}`)}): ${p.d.description}`),
    `- [${priv("meta.title")}](${url("/dc/legal/privacy")}): ${priv("meta.description")}`,
  ];
  if (hasPage("/dc/world", locale)) {
    const { SITES, ESTATES } = await import("../../lib/dc/world");
    const w = dcCopy("world", locale).t, n = { "SITES.length": SITES.length, "ESTATES.length": ESTATES.length };
    lines.push(
      `- [${w("index.meta.title", n)}](${url("/dc/world")}): ${w("index.meta.description", n)}`,
      `- [${w("estates.meta.title", n)}](${url("/dc/world/estates")}): ${w("estates.meta.description", n)}`,
      `- [${w("data.meta.title", n)}](${url("/dc/world/data")}): ${w("data.meta.description", n)}`,
    );
  }
  return `## ${PRODUCT_NAME}\n\n> ${home("what.body")}\n\n${lines.join("\n")}\n`;
};

/** The DC Sim part of the site-wide /llms-full.txt (README "Feeds and llms-full"): the full English text of the DC pages,
 *  guides and comparisons with absolute links, plus pricing and the changelog. Headings start at "##" so the root file
 *  can put it under its own "#" title. */
export const dcLlmsFull = async (): Promise<string> => {
  const { dcCopy } = await import("../../i18n/dc");
  const { CHANGELOG, IN_PROGRESS } = await import("../../data/dc/changelog");
  const pricing = dcCopy("pricing", "en").t;
  const order = ["product", "integrations", "resources", "company"];
  const pages = (await getCollection("pages")).sort((a, b) => order.indexOf(a.data.section) - order.indexOf(b.data.section) || a.data.order - b.data.order);
  const guides = (await getCollection("guides")).sort((a, b) => a.data.order - b.data.order);
  const compare = (await getCollection("compare")).sort((a, b) => a.data.order - b.data.order);
  // Markdown bodies use links relative to the page: make them absolute; demote headings below the page's "###".
  const body = (md: string, path: string) =>
    md.replace(/\]\((?!https?:|mailto:|#)([^)\s]+)\)/g, (_, href: string) => `](${new URL(href, abs(path)).href})`)
      .replace(/^(#{1,4}) /gm, "###$1 ").trim();
  const faq = (items: { q: string; a: string }[]) => (items.length ? `\n\n**FAQ**\n\n${items.map((f) => `- **${f.q}** ${f.a}`).join("\n")}` : "");
  const doc = (h1: string, path: string, answer: string, md: string, items: { q: string; a: string }[]) =>
    `### ${h1}\n\nURL: ${abs(path)}\n\n${answer}\n\n${body(md, path)}${faq(items)}`;
  const priceFaq = ["monitorCounted", "buyOnline", "threeMonths", "switch", "stop", "aiExtra", "partnerDiscount", "compare"].map((k) => ({ q: pricing(`faq.${k}.q`), a: pricing(`faq.${k}.a`) }));
  return [
    `## ${PRODUCT_NAME}\n\n> ${ENTITY_DC}\n\n${PRODUCT_NAME} is a product of ${LEGAL_NAME} (Malta), part of RACKDENSITY (rack-density.com). Contact: ${CONTACT_EMAIL}. German and Chinese versions of the main pages: ${SITE_URL.replace(/\/$/, "") + lp("/dc", "de")}, ${SITE_URL.replace(/\/$/, "") + lp("/dc", "zh")}.`,
    `### Pricing\n\nURL: ${abs("pricing/")}\n\n${pricing("hero.intro")}${faq(priceFaq)}`,
    ...pages.map((p) => doc(p.data.h1, `${p.id}/`, p.data.directAnswer, p.body ?? "", p.data.faq)),
    ...guides.map((g) => doc(g.data.h1, `resources/guides/${g.id}/`, g.data.directAnswer, g.body ?? "", g.data.faq)),
    ...compare.map((c) => doc(c.data.h1, `compare/${c.id}/`, `${c.data.directAnswer} (Last checked ${c.data.lastChecked}.)`, c.body ?? "", c.data.faq)),
    `### Changelog\n\nURL: ${abs("resources/changelog/")} (RSS: ${abs("rss.xml")})\n\n${CHANGELOG.map((e) => `- ${e.date}, ${e.title}: ${e.items.join(" ")}`).join("\n")}\n\nIn progress (roadmap): ${IN_PROGRESS.join("; ")}.`,
  ].join("\n\n");
};

/** The translated DC pages for /de/llms-full.txt and /zh/llms-full.txt: overview, pricing and every page listed for that
 *  locale in src/config/dc/i18n.ts, links pointing to the page in that language when it exists (else English). */
export const dcLlmsFullLocale = async (locale: Locale): Promise<string> => {
  if (!hasPage("/dc", locale)) return "";
  const { dcCopy, dcHref } = await import("../../i18n/dc");
  const home = dcCopy("home", locale).t, pricing = dcCopy("pricing", locale).t;
  const site = SITE_URL.replace(/\/$/, "");
  const url = (p: string) => site + dcHref(p, locale);
  const body = (md: string, englishPath: string) =>
    md.replace(/\]\((?!https?:|mailto:|#)([^)\s]+)\)/g, (_, href: string) => {
      const t = new URL(href, `https://x${englishPath}`);
      return `](${url(t.pathname)}${t.hash})`;
    }).replace(/^(#{1,4}) /gm, "###$1 ").trim();
  const faq = (items: { q: string; a: string }[]) => (items.length ? `\n\n${items.map((f) => `- **${f.q}** ${f.a}`).join("\n")}` : "");
  const order = ["product", "integrations", "resources", "company"];
  const pages = (await getCollection("pagesL10n", (p) => p.id.startsWith(`${locale}/`)))
    .map((p) => ({ slug: p.id.slice(locale.length + 1), p }))
    .filter(({ slug }) => hasPage(`/dc/${slug}`, locale))
    .sort((a, b) => order.indexOf(a.p.data.section) - order.indexOf(b.p.data.section) || a.p.data.order - b.p.data.order);
  const priceFaq = ["monitorCounted", "buyOnline", "threeMonths", "switch", "stop", "aiExtra", "partnerDiscount", "compare"].map((k) => ({ q: pricing(`faq.${k}.q`), a: pricing(`faq.${k}.a`) }));
  return [
    `## ${PRODUCT_NAME}\n\nURL: ${url("/dc")}\n\n${home("what.body")}`,
    `### ${pricing("hero.h1")}\n\nURL: ${url("/dc/pricing")}\n\n${pricing("hero.intro")}${faq(priceFaq)}`,
    ...pages.map(({ slug, p }) => `### ${p.data.h1}\n\nURL: ${url(`/dc/${slug}`)}\n\n${p.data.directAnswer}\n\n${body(p.body ?? "", `/dc/${slug}/`)}${faq(p.data.faq)}`),
  ].join("\n\n");
};
