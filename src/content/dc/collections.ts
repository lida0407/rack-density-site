import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const faq = z.array(z.object({ q: z.string(), a: z.string() })).default([]);
const still = { name: z.string(), alt: z.string(), caption: z.string().optional() };
// light: the lit-room variant shown in the bright theme instead of a lights-off still (SITE-THEME-VIDEO.md §1)
const shot = z.object({ ...still, light: z.object(still).optional() });
const clip = z.object({ name: z.string(), title: z.string(), caption: z.string().optional() });

const pageSchema = z.object({
  title: z.string().max(70),
  description: z.string().max(170),
  h1: z.string(),
  directAnswer: z.string(),
  section: z.enum(["product", "integrations", "company", "resources"]),
  order: z.number().default(0),
  faq,
  badge: z.enum(["available", "partial", "roadmap", "planned", "early", "partner"]).optional(),
  badgeNote: z.string().optional(),
  shots: z.array(shot).default([]),
  clips: z.array(clip).default([]),
  ctaTop: z.boolean().default(false),
  navLabel: z.string().optional(),
});
const pages = defineCollection({ loader: glob({ pattern: "**/*.md", base: "./src/content/dc/pages" }), schema: pageSchema });
// Translated pages (marketing/I18N.md), ids "de/product/it", "zh/contact"…, same schema; written by scripts/dc/i18n-import.mjs.
const pagesL10n = defineCollection({ loader: glob({ pattern: "**/*.md", base: "./src/content/dc/l10n" }), schema: pageSchema });

const guides = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/dc/guides" }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(170),
    h1: z.string(),
    directAnswer: z.string(),
    section: z.literal("guides").default("guides"),
    order: z.number().default(0),
    faq,
    calculator: z.enum(["rack-power", "tokens-per-kwh", "dcim-cost"]).optional(),
    shots: z.array(shot).default([]),
    // SEO-GEO-PLAN §3/§5: steps → HowTo, a "see it in the twin" clip, a Dataset for data pages, 3 related links.
    steps: z.array(z.object({ name: z.string(), text: z.string() })).default([]),
    totalTime: z.string().optional(),
    clips: z.array(clip).default([]),
    dataset: z.object({ name: z.string(), description: z.string(), variables: z.array(z.string()) }).optional(),
    related: z.array(z.object({ href: z.string(), label: z.string(), kind: z.string() })).max(3).default([]),
    updated: z.string().optional(),
  }),
});

// Comparison pages (Dali's SEO decision 2026-10-15): factual, sourced public prices with dates, feature tables,
// no disparagement, a "last checked" date. The only DC pages where vendor names may appear (check-copy-dc.mjs).
const compare = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/dc/compare" }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(170),
    h1: z.string(),
    directAnswer: z.string(),
    kind: z.enum(["pricing", "alternative"]),
    vendor: z.string().optional(),
    order: z.number().default(0),
    lastChecked: z.string(),
    sources: z.array(z.object({ label: z.string(), url: z.string() })).min(1),
    faq,
    related: z.array(z.object({ href: z.string(), label: z.string(), kind: z.string() })).max(3).default([]),
  }),
});

// Imported by src/content.config.ts (the merged site).
export const dcCollections = { pages, pagesL10n, guides, compare };
