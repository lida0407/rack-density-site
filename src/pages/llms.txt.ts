// Site-wide llms.txt: the hub summary, then each product line. The DC section comes from src/pages/dc/_llms.ts (DC marketing).
import { getCollection } from 'astro:content';
import { abs } from '../lib/url';
import { PRODUCT_NAME, BRAND, PRICES, CONTACT_EMAIL, DC_PRODUCT_NAME } from '../config/brand';
import { dcLlms } from './dc/_llms';
const demote = (md: string) => md.replace(/^(#+) /gm, '#$1 ');
export async function GET() {
  const learn = await getCollection('learn');
  const body = `# ${BRAND}

> ${BRAND} makes 3D twins of racks built from a spreadsheet: ${PRODUCT_NAME} for the homelab and ${DC_PRODUCT_NAME} for data centers, plus free calculators. Contact: ${CONTACT_EMAIL}.

## Free calculators
- [Rack Density Calculator](${abs('/calculator')}): devices per rack by space, power and cooling; kW per rack; monthly cost

## ${PRODUCT_NAME} (homelab)

> ${PRODUCT_NAME} turns a spreadsheet of your homelab gear (Excel or CSV) into a 3D model of your rack: power and monthly cost per device (estimated), heat, network and cable views, power and network diagrams, and a "Fail" what-if that shows what goes dark. The file is read in the browser and never uploaded. There is no public demo yet: the app is shown in clips, stills and walkthroughs on request. Try will be free with no account and nothing stored; Account ($${PRICES.account.month}/month or $${PRICES.account.year}/year) and Pro ($${PRICES.pro.month}/month or $${PRICES.pro.year}/year) are launching soon.

- [${PRODUCT_NAME}](${abs('/homelab')}): overview
- [See ${PRODUCT_NAME}](${abs('/homelab/try')}): clips and stills of the demo lab, walkthrough requests, the import template
- [Pricing](${abs('/homelab/pricing')}): what each plan includes; roadmap items are marked
- [Changelog](${abs('/homelab/changelog')}): what has shipped
${learn.map((e) => `- [${e.data.title}](${abs(`/homelab/learn/${e.data.slug}`)}): ${e.data.answer}`).join('\n')}

Facts: the template's Devices sheet is required (rack, U, model); Cables, Racks, Power, Networks and Readings are optional. Power, heat and cost figures are estimates from each model's typical draw, adjusted by any readings the user adds. Tokens per kWh = tokens per second ÷ watts × 3,600,000.

${demote(await dcLlms())}`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
