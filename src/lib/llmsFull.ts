// Full-text sections for /llms-full.txt, /de/llms-full.txt and /zh/llms-full.txt (llmstxt.org "llms-full"): the hub,
// the calculator and the Homelab Twin pages in the page's language from the same copy the pages render, plus the full
// English Learn guides. DC Sim's part comes from DC marketing (dcLlmsFull / dcLlmsFullLocale in src/pages/dc/_llms.ts).
import { getCollection } from 'astro:content';
import { SITE_URL, PRODUCT_NAME, PRICES, CONTACT_EMAIL, MAILTO } from '../config/brand';
import { pageCopy, ui, fill, lp, type Locale } from '../i18n';
import * as hub from '../i18n/pages/hub';
import * as calculator from '../i18n/pages/calculator';
import * as homelab from '../i18n/pages/homelab';
import * as pricing from '../i18n/pages/pricing';
import * as tryPage from '../i18n/pages/try';

const ROOT = SITE_URL.replace(/\/$/, '');
const url = (path: string, l: Locale) => ROOT + lp(path, l);
const plain = (s: string) => s.replace(/<[^>]+>/g, '').replace(/\{link\}/g, '').replace(/\s+/g, ' ').replace(/ ([;,.。；，])/g, '$1').trim();
const list = (items: string[]) => items.map((i) => `- ${plain(i)}`).join('\n');
const faq = (items: { q: string; a: string }[], label: string) => (items.length ? `\n\n**${label}**\n\n${items.map((f) => `- **${plain(f.q)}** ${plain(f.a)}`).join('\n')}` : '');
const page = (h: string, title: string, path: string, l: Locale, parts: string[]) =>
  `${h} ${plain(title)}\n\nURL: ${url(path, l)}\n\n${parts.filter(Boolean).join('\n\n')}`;

/** Hub, calculator and Homelab Twin pages for one locale; headings start at "##". */
export function siteFull(l: Locale): string {
  const t = ui(l), usd = (n: number) => fill(t.usd, { n });
  const h = pageCopy(hub, l).c, c = pageCopy(calculator, l).c, m = pageCopy(homelab, l).c, p = pageCopy(pricing, l).c, s = pageCopy(tryPage, l).c;
  const A = PRICES.account, R = PRICES.pro;
  return [
    page('##', h.h1, '/', l, [plain(h.lead), `**${PRODUCT_NAME}** — ${plain(h.homelab.body)}`, `**${plain(h.dc.h2)}** — ${plain(h.dc.body)}`, `**${plain(h.teaser.h2)}** ${plain(h.teaser.body)}`]),
    page('##', c.h1, '/calculator', l, [plain(c.lead), `### ${plain(c.how.h2)}\n\n${plain(c.how.p)}\n\nby_space = floor(rack_U / device_U); by_power = floor(circuit_kW × 1000 / W_per_device); by_cooling = floor(cooling_kW × 1000 / W_per_device); devices = min(by_space, by_power, by_cooling); circuit_kW = V × A × PF / 1000 ${plain(c.how.single)}; √3 × V × A × PF / 1000 ${plain(c.how.three)}.`, faq(c.faq, t.faq).trim()]),
    `## ${PRODUCT_NAME}`,
    page('###', m.hero.h1, '/homelab', l, [
      plain(m.hero.lead), plain(fill(m.hero.note, { link: m.hero.join })) + (m.hero.langNote ? ` ${plain(m.hero.langNote)}` : ''),
      [m.shows.power, m.shows.network, m.shows.fail].map((x) => `**${plain(x.h3)}** ${plain(x.p)}`).join('\n\n'),
      `**${plain(m.how.h2)}**\n\n${m.how.steps.map((x, i) => `${i + 1}. ${plain(x.h3)}: ${plain(x.p)}`).join('\n')}\n\n${plain(m.how.note)}${m.how.templateNote ? ` ${plain(m.how.templateNote)}` : ''}`,
      `**${plain(m.views.h2)}**\n\n${m.views.items.map((x) => `- ${plain(x.label)}: ${plain(x.text)}`).join('\n')}`,
      `**${plain(m.checks.h2)}** ${plain(m.checks.p)}\n\n${list(m.checks.items)}`,
      `**${plain(m.share.h2)}** ${plain(m.share.p)}`, `**${plain(m.ai.h2)}** ${plain(m.ai.p)} ${plain(m.ai.note)}`,
      plain(m.built), faq(m.faq, t.faq).trim(),
    ]),
    page('###', p.h1, '/homelab/pricing', l, [
      `${plain(p.lead)} ${plain(p.short)}${p.currencyNote ? ` ${plain(p.currencyNote)}` : ''}`,
      `**${plain(p.try.h2)}** — ${plain(p.try.price)} (${plain(p.try.tag)}). ${plain(p.try.note)}\n\n${list(p.try.items)}`,
      `**${plain(p.account.h2)}** — ${usd(A.month)} ${plain(p.perMonth)}, ${plain(fill(p.perYear, { price: usd(A.year) }))}. ${plain(p.account.plus)}\n\n${list(p.account.items)}`,
      `**${plain(p.pro.h2)}** — ${usd(R.month)} ${plain(p.perMonth)}, ${plain(fill(p.perYear, { price: usd(R.year) }))}. ${plain(p.pro.plus)}\n\n${list(p.pro.items)}\n\n${plain(p.pro.msp)}`,
      `${plain(p.compare.note)}`, faq(p.faq, t.faq).trim(),
    ]),
    page('###', s.h1, '/homelab/try', l, [
      plain(s.lead) + (s.langNote ? ` ${plain(s.langNote)}` : ''), plain(s.tour.caption), plain(s.lights.caption),
      `**${plain(s.steps.h2)}**\n\n${s.steps.items.map((x, i) => `${i + 1}. ${plain(x.b)} ${plain(x.p)}`).join('\n')}${s.steps.templateNote ? `\n\n${plain(s.steps.templateNote)}` : ''}`,
      `**${plain(s.privacy.eyebrow)}** ${plain(s.privacy.p)}\n\n**${plain(s.privacy.checksEyebrow)}** ${plain(s.privacy.checks)}`, faq(s.faq, t.faq).trim(),
    ]),
  ].join('\n\n');
}

/** The English Learn guides in full (MDX bodies without imports and calculator components); headings start at "###". */
export async function guidesFull(): Promise<string> {
  const guides = (await getCollection('learn')).sort((a, b) => +a.data.date - +b.data.date);
  const body = (md: string, path: string) => md
    .replace(/^import .*$/gm, '').replace(/^\s*<[A-Z][A-Za-z]* *\/>\s*$/gm, '')
    .replace(/<a href=\{MAILTO\}>\{CONTACT_EMAIL\}<\/a>/g, CONTACT_EMAIL).replace(/\{MAILTO\}/g, MAILTO)
    .replace(/\{PRODUCT_NAME\}/g, PRODUCT_NAME).replace(/\{CONTACT_EMAIL\}/g, CONTACT_EMAIL)
    .replace(/\]\((\/[^)\s]*)\)/g, (_, href: string) => `](${ROOT}${href})`).replace(/\]\((?!https?:|mailto:|#)([^)\s]+)\)/g, (_, href: string) => `](${new URL(href, ROOT + path).href})`)
    .replace(/^(#{1,4}) /gm, '##$1 ').replace(/\n{3,}/g, '\n\n').trim();
  return `## ${PRODUCT_NAME} guides\n\n` + guides.map((g) => {
    const path = `/homelab/learn/${g.data.slug}/`;
    return `### ${g.data.title}\n\nURL: ${ROOT}${path}\n\n${g.data.answer}\n\n${body(g.body ?? '', path)}${faq(g.data.faq, 'FAQ')}`;
  }).join('\n\n');
}
