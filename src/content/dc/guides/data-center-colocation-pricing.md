---
title: "Data Center Colocation Pricing: Late 2026 Benchmarks"
description: "Data center colocation pricing explained: per rack vs per kW, retail vs wholesale, and what late 2026 CBRE and Digital Realty figures show about rents."
h1: "Data center colocation pricing: how it works and what late 2026 benchmarks show"
directAnswer: "Data center colocation pricing is set in two ways. Retail colocation is sold by the cabinet or part cabinet. Wholesale colocation is priced per kilowatt of contracted IT power per month. CBRE put Silicon Valley asking rates at $200 to $275 per kW per month in September 2026, and rents rose fastest where power and vacant capacity were scarcest."
section: "guides"
order: 21
updated: "2026-11-02"
related:
  - { href: "resources/guides/rack-power-capacity-planning/", label: "Rack power capacity planning with the 80 % rule", kind: "Guide" }
  - { href: "resources/guides/telehouse-docklands-65mw-london-data-center-power/", label: "Telehouse Docklands 65 MW: London power limits", kind: "Guide" }
  - { href: "resources/guides/australia-suburban-data-center-ban/", label: "Australia suburban data center ban: what developers know", kind: "Guide" }
faq: [{"q": "What does colocation mean in a data center?", "a": "Colocation means renting space, power, cooling and network access in a data center someone else owns and runs, then installing your own servers and storage there. The operator looks after the building and its power and cooling. You own and manage the IT equipment."}, {"q": "How much does data center colocation cost per kW?", "a": "For North American deployments of 250 kW and up, CBRE reported Silicon Valley asking rates of $200 to $275 per kW per month on 1 September 2026. Digital Realty's third quarter 2026 results, released 29 October 2026, show new leases signed at an average of $272 per kW across all regions at its share."}, {"q": "Is colocation priced per rack or per kW?", "a": "Both, depending on size. Retail colocation is usually quoted per cabinet: quarter rack, half rack or full rack, which is how the Oceania pricing database announced on 28 October 2026 groups it. Wholesale colocation is quoted per kW of IT power, because power is the scarce resource at that scale."}, {"q": "Why are colocation prices going up in 2026?", "a": "Supply is short and new capacity costs more to build. CBRE reported a record low 1.4% vacancy across North American primary markets in the first half of 2026 and expected European capacity pricing to rise about 12% on average in 2026. CBRE points to power availability and higher build costs for dense, liquid-cooled halls."}, {"q": "Do colocation prices rise at renewal?", "a": "At large operators they have been rising. Digital Realty reported that renewal leases signed in the third quarter of 2026 renewed 11.8% higher on a cash basis and 17.0% higher on a GAAP basis. Budget for an increase at renewal and check the escalator in your contract."}]
---

![Three racks filled to quarter, half and full, a price tag with a power bolt and a kW gauge near its upper range](/media/data-center-colocation-pricing-cover.webp)

## 1. Define colocation

Colocation means renting space, power, cooling and network access in a data center owned and run by someone else, and installing your own servers there. The operator runs the building, the electrical plant and the cooling. You own the IT equipment and pay for the room it sits in and the power it draws.

"Data center colocation pricing" and "define colocation" both show as breakout searches in Google Trends' data center category this week.

## 2. How colocation is priced

There are two common pricing models, and which one you get depends mostly on how much capacity you need.

Retail colocation is sold by the cabinet. A [Research and Markets release on GlobeNewswire dated 28 October 2026](https://www.globenewswire.com/news-release/2026/10/28/3390398/28124/en/oceania-data-center-market-existing-and-upcoming-facilities-capacity-and-colocation-pricing-2026-2031-pipeline-tops-10-gw-as-australia-drives-investment.html), announcing an Oceania data center database, shows the usual split: retail prices for quarter racks, half racks and full racks (42U, 45U, 47U), and wholesale prices per kW. Deployments of a few cabinets usually land in retail.

Wholesale colocation is sold per kilowatt of contracted IT power, usually per month. At that scale, floor space is cheap and power is the scarce part, so the quote follows the power. If you contract 500 kW, you pay for 500 kW whether your servers draw all of it or not, so get your load estimate right before you sign. The [rack power capacity planning guide](/resources/guides/rack-power-capacity-planning/) covers how to size it.

Brokers also group deals by deployment size. [CBRE's North America Data Center Trends H1 2026](https://www.cbre.com/insights/books/north-america-data-center-trends-h1-2026), published 27 August 2026, tracks four bands: 250 to 500 kW, 500 kW to 3 MW, 3 to 10 MW, and 10 MW and up. Its rates assume N+1 or Tier III requirements.

Density is a third factor. A hall built for air-cooled racks costs less per kW to build than one built for liquid-cooled racks. In a [press release on 14 May 2026](https://www.cbre.co.uk/press-releases/data-centre-capacity-pricing-in-europe-set-for-double-digit-growth-amid-supply-constraints), CBRE said the gap between air-cooled capacity and facilities designed for AI workloads is widening. Its research director said providers are passing the higher cost of advanced cooling on to customers.

## 3. Late 2026 benchmarks

Each figure below comes from the source named, on the date given.

| Source and date | Market | Figure |
|---|---|---|
| CBRE, 1 September 2026 | Silicon Valley | Asking rates $200 to $275 per kW per month; vacancy 4.2% |
| CBRE, 27 August 2026 | North America primary markets | Average asking rates up 4.3% (250 to 500 kW), 7.9% (500 kW to 3 MW), 8.3% (3 to 10 MW), 6.7% (10 MW+) in H1 2026 |
| CBRE, 27 August 2026 | North America primary markets | Vacancy at a record low 1.4%; Northern Virginia 0.2% |
| Digital Realty, 29 October 2026 | All regions, Q3 2026 new leases | $272 per kW at its share; $262 (0 to 1 MW), $275 (over 1 MW) |
| Digital Realty, 29 October 2026 | By region, Q3 2026 new leases | Americas $267, EMEA $220, Asia Pacific $296 per kW |
| CBRE, 14 May 2026 | Frankfurt, London, Amsterdam, Dublin, Paris | Capacity pricing expected to rise 12% on average in 2026; 20 MW+ future capacity up to £145 per kW in London, €145 per kW in the other four |
| Cushman & Wakefield, 25 September 2026 | EMEA | 12.1 GW operational in H1 2026; vacancy below 10% in most facilities |
| Research and Markets, 28 October 2026 | Australia and New Zealand | Nearly 2.3 GW operational; pipeline above 10 GW |

North America. CBRE's [Silicon Valley release of 1 September 2026](https://www.cbre.com/press-releases/silicon-valley-data-center-demand-continues-outpace-supply-causing-vacancy-fall-further-rents-rise) puts asking rates there at $200 to $275 per kW per month. Its H1 2026 report shows rate growth was uneven by market for 10 MW and larger deals: 19% in the New York Tri-State area, 14.5% in Atlanta and 9.7% in Chicago, against 1.5% in Northern Virginia and no change in Silicon Valley or Hillsboro. Preleasing covered 80.4% of capacity under construction.

Operator results. [Digital Realty's third quarter 2026 results](https://www.sec.gov/Archives/edgar/data/0001297996/000110465926120212/dlr-ex99d1.htm), released 29 October 2026, show 184.8 MW of new leases at its share at $272 per kW of GAAP base rent. The release does not label the period, but the table's annualized rent divided by megawatts and by twelve gives that figure, so it reads as a monthly rate. Small deals of up to 1 MW came in at $262 per kW, larger ones at $275. Renewals signed in the quarter went up 11.8% on a cash basis.

Europe. CBRE expected the cost of capacity in the five largest European markets to rise by an average of 12% in 2026. Cushman & Wakefield's [Dutch release on its H1 2026 EMEA update, dated 25 September 2026](https://www.cushmanwakefield.com/en/netherlands/news/2026/09/europese-datacenter-capaciteit-passeert-de-12gw), counts 12.1 GW of operational capacity across EMEA, with the five largest hubs holding about 43%. It says vacancy is below 10% in most operational facilities. The [report page](https://www.cushmanwakefield.com/en/insights/emea-data-centre-update) says power, land and delivery timelines decide which markets win new capacity. Neither page publishes per kW prices.

Oceania. The Research and Markets release counts nearly 2.3 GW of operational capacity and a pipeline above 10 GW across Australia and New Zealand. Its per kW and per rack prices sit inside the paid database, so we do not quote them here. Australian siting rules may also change, as our guide to the [Australia suburban data center ban](/resources/guides/australia-suburban-data-center-ban/) explains.

## 4. What drives the price

Power availability comes first. CBRE's H1 2026 report names power availability and delivery timelines as the most decisive factors in site selection, leasing and pricing, and says US capacity demand is outpacing utility transmission buildout. Campuses that already hold a grid allocation can add capacity while others wait in connection queues, as in [London Docklands](/resources/guides/telehouse-docklands-65mw-london-data-center-power/).

Vacancy follows from that. With 1.4% vacancy across North American primary markets and 0.2% in Northern Virginia, per CBRE, buyers have little room to negotiate. CBRE also found 80.4% of capacity under construction already committed.

Density adds build cost. CBRE says advanced cooling and higher specification infrastructure raise the cost of building larger, more complex facilities, and that providers pass it on.

Deal size changes the rate too. In CBRE's H1 2026 data, rates for 3 to 10 MW deals rose faster than rates for 250 to 500 kW deals. In Digital Realty's quarter, deals over 1 MW were priced slightly above smaller ones per kW.

## 5. Checking a colocation quote

1. Convert every quote to a monthly price per kW of contracted IT power, including per rack quotes. Divide the cabinet price by the power allowance it includes.
2. Ask whether you pay for contracted power, metered power or both, and what happens if you exceed the allowance.
3. Confirm the density the hall supports per rack and whether liquid cooling is available or priced separately.
4. Ask for the renewal escalator in writing. Digital Realty's Q3 2026 renewals came in 11.8% higher on a cash basis.
5. List cross-connects, remote hands and setup fees separately. They are not in the per kW rate.
6. Compare against the dated benchmarks above, and note the deployment size each one covers. CBRE's ranges are for 250 kW and larger, so a single-cabinet retail quote will not match them.
