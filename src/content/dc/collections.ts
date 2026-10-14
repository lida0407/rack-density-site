import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const faq = z.array(z.object({ q: z.string(), a: z.string() })).default([]);
const still = { name: z.string(), alt: z.string(), caption: z.string().optional() };
// light: the lit-room variant shown in the bright theme instead of a lights-off still (SITE-THEME-VIDEO.md §1)
const shot = z.object({ ...still, light: z.object(still).optional() });
const clip = z.object({ name: z.string(), title: z.string(), caption: z.string().optional() });

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/dc/pages" }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(170),
    h1: z.string(),
    directAnswer: z.string(),
    section: z.enum(["product", "integrations", "company", "resources"]),
    order: z.number().default(0),
    faq,
    badge: z.enum(["available", "partial", "roadmap", "early", "partner"]).optional(),
    badgeNote: z.string().optional(),
    shots: z.array(shot).default([]),
    clips: z.array(clip).default([]),
    ctaTop: z.boolean().default(false),
    navLabel: z.string().optional(),
  }),
});

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
    calculator: z.enum(["rack-power", "tokens-per-kwh"]).optional(),
    shots: z.array(shot).default([]),
  }),
});

// Imported by src/content.config.ts (the merged site). Collection names stay "pages" and "guides".
export const dcCollections = { pages, guides };
