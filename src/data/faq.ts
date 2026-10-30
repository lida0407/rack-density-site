// FAQ text from ~/Sensaka/marketing/homelab-site/copy/*.md, adjusted to Dali's decisions (2026-10-14 16:00 no accounts yet;
// 2026-10-15 no public demo: Try is shown in clips and walkthroughs until he opens it).
// The same arrays render the visible FAQ and the FAQPage JSON-LD.
import { PRODUCT_NAME, PRICES, FLAGS } from '../config/brand';
const P = PRODUCT_NAME;
const plans = FLAGS.billingLive ? '' : ' Account and Pro are launching soon.';

export const homeFaq = [
  { q: `Is ${P} free?`, a: `Try will be free, with no account and nothing stored. It isn't public yet: for now we show the app in clips, stills and walkthroughs. Account ($${PRICES.account.month}/month or $${PRICES.account.year}/year) keeps your lab; Pro ($${PRICES.pro.month}/month or $${PRICES.pro.year}/year) adds cable tracing, tokens per kWh, the full Flaw Finder and reports.${plans}` },
  { q: 'Can I try it now?', a: 'Not on your own yet. Watch the clips on the See it page, or request a walkthrough and we show you the app on a short call. Meanwhile the import template is free to download and fill in.' },
  { q: 'Do I need to install anything?', a: 'No. It runs in your browser and imports a spreadsheet: the template, or one CSV per sheet. Only the Devices sheet is required (rack, U and model).' },
  { q: 'Is my file uploaded?', a: 'No. The spreadsheet is read in your browser and never leaves your machine. Without an account nothing is stored: no cookies, no browser storage, and no requests to third parties.' },
  { q: 'How accurate are the power and cost numbers?', a: "They are estimates: each device's typical draw from its model, adjusted by any readings you add to the Readings sheet, times your electricity price. For exact numbers, add readings from a smart plug or your UPS." },
  { q: 'What racks does it handle?', a: 'One or two racks, including 10-inch mini racks. Gear outside the rack, such as access points, cameras or the ISP box, can be placed too: leave the U column empty.' },
  { q: "What's tokens per kWh?", a: 'How many AI tokens your hardware produces per kilowatt-hour of electricity. It is the efficiency number for a home AI box, the way miles per gallon is for a car.' },
];

export const tryFaq = [
  { q: 'Why is there no public demo?', a: `We are not opening ${P} to everyone yet. Until we do, you can see it here in clips and stills, or in a walkthrough with us.` },
  { q: 'What happens in a walkthrough?', a: 'A short video call: we open the demo lab and show the views you care about, from the power chain and the Fail what-if to the Flaw Finder and lights-off mode, and answer your questions.' },
  { q: 'Which file formats will work?', a: 'An .xlsx workbook in the template layout, or one CSV per sheet with the same column names.' },
  { q: "My device isn't in the catalog. What happens?", a: 'Pick it from the device catalog by category and brand, or describe your own device and reuse it. In a spreadsheet, an unknown model still appears as a plain box of the right height, in the right U.' },
  { q: 'Is anything uploaded or saved?', a: 'No. The file is read in your browser, and without an account nothing is stored: no cookies, no browser storage, nothing sent to a server.' },
];

export const pricingFaq = [
  { q: 'What does "nothing stored" mean?', a: "In Try, your spreadsheet is read in your browser and your lab exists only in that tab. We have no copy: no cookies, no browser storage, no server writes. When you close the tab it's gone, unless you download your lab as a file." },
  { q: 'Do I need to install an agent?', a: 'No. Today everything comes from your spreadsheet. An agent that finds your devices and keeps the numbers current is on the roadmap; when it ships, it will be optional.' },
  { q: 'Does it work offline?', a: `You need a connection to open ${P}, but your file never leaves your machine: it's read in the browser.` },
  { q: 'Can I cancel any time?', a: 'Yes, once Account and Pro open: monthly plans stop at the end of the month you paid for, yearly plans at the end of the year, and your lab stays available until then.' },
  { q: 'Who is Pro for?', a: 'For labs that want the full explanation: cable tracing, tokens per kWh, the Flaw Finder with fixes, a PDF report and Excel export. It also fits a small office or MSP with up to four racks.' },
  { q: 'Why are prices in US dollars?', a: 'Billing will run in USD. Electricity costs in the app and the calculators use your own currency and price per kWh.' },
];

export const calculatorFaq = [
  { q: 'What is rack density?', a: 'Rack density is how much compute, power, or heat you pack into one rack, usually expressed as kW per rack or servers per rack. Higher density means more compute per square foot but tighter cooling and power constraints.' },
  { q: 'How many servers fit in a 42U rack?', a: 'With 1U servers, a 42U rack physically fits 42 servers, but you almost never reach that limit. Power and cooling usually cap real-world rack density at 20–35 servers depending on per-server wattage and circuit size.' },
  { q: 'What is a safe kW per rack?', a: 'Most enterprise racks operate between 5 and 15 kW. Anything above 15 kW is considered high-density and typically needs in-row cooling, rear-door heat exchangers, or liquid cooling.' },
  { q: 'How many servers fit in a 15 kW rack?', a: 'About 24 1U servers at 500 W each, or 16 2U servers at 750 W, if you keep the 80 % rule (12 kW of planned load, so one feed can fail). At 250 W per 1U server the 42U of space runs out first, at 42 servers (10.5 kW).' },
  { q: 'How do I calculate three-phase power in kW?', a: 'Three-phase real power = √3 × line voltage × line current × power factor ÷ 1000. For an apparent-power rating in kVA: kW = kVA × power factor.' },
  { q: 'Why does cooling run out before space?', a: 'Modern 1U servers can draw 400–800 W each. A 42U rack of 1U servers would need 17–34 kW of cooling, more than most facility loops deliver per rack.' },
  { q: 'Single-phase vs three-phase for racks?', a: 'Single-phase is fine up to about 5 kW per rack. Above that, three-phase delivers more power through the same conductors and balances load; most racks above 7 kW use three-phase PDUs.' },
  { q: 'How much headroom should I leave?', a: 'Plan for 20–30 % headroom on power and cooling to survive a single PDU or cooling-unit failure (N+1). This calculator shows OK only with at least 20 % headroom on power and cooling.' },
  { q: 'How many servers can I put in a home rack?', a: 'Usually power or heat runs out before space does. A closet with no extra cooling copes with a few hundred watts. A US 15 A circuit is good for about 1.4 kW continuous (the 80 % rule); a European 16 A circuit, about 2.9 kW. Enter your rack height, device size and wattage to see which one limits you.' },
  { q: 'How much does a homelab rack cost to run per month?', a: 'Monthly cost = average draw in kW × 730 hours × your price per kWh. At 200 W and €0.30/kWh that is about €44 a month; at 200 W and $0.17/kWh, about $25.' },
  { q: 'What size rack do I need for a homelab?', a: 'Count the U your gear needs, then add about 30 % for patch panels, cable management, a UPS and growth. A 10-inch mini rack (6–12U) fits mini PCs and a small switch; a 12U wall rack fits a switch, patch panel and a couple of servers; 22U and up suits rack-mount servers.' },
  { q: 'Does a homelab rack need cooling?', a: 'Every watt your gear draws ends up as heat in the room: 1 W ≈ 3.4 BTU/h. Up to a few hundred watts, a ventilated closet or an open room is usually enough; above that, plan an exhaust fan or air conditioning, and watch the inlet temperature.' },
];
