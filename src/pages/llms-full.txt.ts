// /llms-full.txt: the full text of the site's product pages and guides in one file (llmstxt.org). Hub, calculator and
// Homelab Twin from src/lib/llmsFull.ts; DC Sim from DC marketing's dcLlmsFull() in src/pages/dc/_llms.ts (its summary
// from dcLlms() until that export exists).
import { BRAND, CONTACT_EMAIL, SITE_URL } from '../config/brand';
import { ENTITY } from '../config/entity';
import { siteFull, guidesFull } from '../lib/llmsFull';
import { dcLlms } from './dc/_llms';
const dc = Object.values(import.meta.glob<{ dcLlmsFull?: () => Promise<string> }>('./dc/_llms.ts', { eager: true }))[0];
const demote = (md: string) => md.replace(/^(#+) /gm, '#$1 ');
export async function GET() {
  const root = SITE_URL.replace(/\/$/, '');
  const body = `# ${BRAND} — full text

> ${ENTITY.rackdensity} Contact: ${CONTACT_EMAIL}.

${ENTITY.company} This file holds the full text of the product pages and guides; the short index is ${root}/llms.txt. German: ${root}/de/llms-full.txt · Chinese: ${root}/zh/llms-full.txt · Sitemap: ${root}/sitemap.xml · RSS: ${root}/rss.xml

${siteFull('en')}

${await guidesFull()}

${dc?.dcLlmsFull ? await dc.dcLlmsFull() : demote(await dcLlms())}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
