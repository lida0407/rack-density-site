// Site-wide llms.txt: the hub summary, then each product line. The DC section comes from src/pages/dc/_llms.ts (DC marketing).
import { getCollection } from 'astro:content';
import { abs } from '../lib/url';
import { PRODUCT_NAME, BRAND, PRICES, CONTACT_EMAIL, DC_PRODUCT_NAME } from '../config/brand';
import { dcLlms } from './dc/_llms';
import { ENTITY } from '../config/entity';
const demote = (md: string) => md.replace(/^(#+) /gm, '#$1 ');
export async function GET() {
  const learn = await getCollection('learn');
  const body = `# ${BRAND}

> ${ENTITY.rackdensity} Contact: ${CONTACT_EMAIL}.

${ENTITY.company}

## Free calculators
- [Rack Density Calculator](${abs('/calculator')}): devices per rack by space, power and cooling; kW per rack; monthly cost

## ${PRODUCT_NAME} (homelab)

> ${ENTITY.homelabTwin} Account ($${PRICES.account.month}/month or $${PRICES.account.year}/year) and Pro ($${PRICES.pro.month}/month or $${PRICES.pro.year}/year) are launching soon; walkthroughs on request.

- [${PRODUCT_NAME}](${abs('/homelab')}): overview
- [See ${PRODUCT_NAME}](${abs('/homelab/try')}): clips and stills of the demo lab, walkthrough requests, the import template
- [Pricing](${abs('/homelab/pricing')}): what each plan includes; roadmap items are marked
- [Changelog](${abs('/homelab/changelog')}): what has shipped
${learn.map((e) => `- [${e.data.title}](${abs(`/homelab/learn/${e.data.slug}`)}): ${e.data.answer}`).join('\n')}

Facts: the template's Devices sheet is required (rack, U, model); Cables, Racks, Power, Networks and Readings are optional. Power, heat and cost figures are estimates from each model's typical draw, adjusted by any readings the user adds. Tokens per kWh = tokens per second ÷ watts × 3,600,000.

${demote(await dcLlms())}`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
