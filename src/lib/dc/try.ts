// Self-serve trial switch for the DC pages (TRY-SIGNUP.md §6, planner 2026-11-03). Everything that changes when the trial
// opens is prepared now and gated by DC_TRY_LIVE in src/config/dc/product.ts, so "Try live" is a one-line commit:
//  - strings: src/i18n/dc/strings/try.json (en/de/zh), picked by the views when the flag is on;
//  - Markdown pages: an optional `tryLive: [{ from, to }]` list in the frontmatter (pages, l10n pages, guides, compare),
//    applied to the short answer, the FAQ and the body when the flag is on. Every `from` is checked against the page on
//    every build, flag on or off, so an edit that breaks a replacement fails the build instead of silently doing nothing.
import { DC_TRY_LIVE } from "../../config/dc/product";
import { lp, type Locale } from "../../i18n";

export type TryPair = { from: string; to: string };
type Faq = { q: string; a: string }[];

/** The sign-up page with the DC edition preselected. */
export const tryHref = (locale: Locale) => `${lp("/try", locale)}?edition=dc`;

const swap = (s: string, pairs: TryPair[]) => pairs.reduce((t, p) => t.split(p.from).join(p.to), s);
// Rendered Markdown turns ' and " into typographic quotes; compare on a neutral form.
const plain = (s: string) => s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");

/** Check every replacement against the page, then apply them when the trial is live. `html` is the rendered body. */
export function withTry(id: string, d: { directAnswer: string; faq: Faq; tryLive?: TryPair[] }, html: string) {
  const pairs = d.tryLive ?? [];
  const haystack = plain([d.directAnswer, ...d.faq.flatMap((f) => [f.q, f.a]), html].join("\n"));
  const missing = pairs.filter((p) => !haystack.includes(plain(p.from)));
  if (missing.length) throw new Error(`DC tryLive (${id}): "from" text not found on the page: ${missing.map((p) => JSON.stringify(p.from.slice(0, 60))).join(", ")}`);
  if (!DC_TRY_LIVE || !pairs.length) return { live: false, directAnswer: d.directAnswer, faq: d.faq, html: null as string | null };
  // The body HTML has typographic quotes: apply each pair to it in both spellings.
  const htmlPairs = pairs.flatMap((p) => [p, { from: p.from.replace(/'/g, "’"), to: p.to.replace(/'/g, "’") }]);
  return {
    live: true,
    directAnswer: swap(d.directAnswer, pairs),
    faq: d.faq.map((f) => ({ q: swap(f.q, pairs), a: swap(f.a, pairs) })),
    html: swap(html, htmlPairs),
  };
}
