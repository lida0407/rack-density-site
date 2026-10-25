---
title: "Data Center Waste Heat Recovery: Endeavour, Trevi and the EU Rules"
description: "Data center waste heat recovery after the Endeavour and Trevi desalination deal and the EU rating scheme: what a 1 to 50 rack operator should measure and model now."
h1: "Data center waste heat recovery: what a small room should measure after the Endeavour and Trevi deal"
directAnswer: "Data center waste heat recovery means capturing the heat that IT equipment rejects and putting it to use: in a heating network, a greenhouse or, as Endeavour and Trevi Systems announced on 22 October 2026, a desalination plant. Almost every kilowatt a rack draws leaves the room as heat, so the rack power sheet you already keep is also your heat budget. A small or mid-size operator should model it when the site approaches 500 kW of IT load, where EU reporting starts, or 1 MW, where Poland's draft law would make heat reuse an obligation."
calculator: "rack-power"
section: "guides"
order: 8
updated: "2026-10-25"
related:
  - { href: "resources/guides/rack-power-capacity-planning/", label: "Rack power capacity planning with the 80 % rule", kind: "Guide" }
  - { href: "product/facility/", label: "Floor, air, water, fire and power layers", kind: "Product" }
  - { href: "resources/guides/tokens-per-kwh/", label: "Tokens per kWh: the one metric for an AI room", kind: "Guide" }
faq: [{"q": "How much heat does a rack produce?", "a": "About as many kilowatts as it draws. The electrical power that goes into servers, switches and storage leaves them as heat, so a rack measured at 10 kW rejects roughly 10 kW of heat into the room or the liquid loop. Nameplate overstates it; measured watts or a per-model catalog estimate labelled as an estimate are the numbers to use."}, {"q": "What temperature does data center waste heat recovery need?", "a": "It depends on the buyer. Endeavour says Trevi's forward osmosis process regenerates its draw solution with heat at 60 to 80 °C. Liquid cooling loops run cooler: the ASHRAE classes W17 to W45 presume facility water supplied at 17 to 45 °C. Air-cooled rooms hand over heat at lower temperatures still, so a reuse system usually adds a heat pump to lift it, and the lift costs electricity."}, {"q": "Does the EU data center rating scheme apply to a 20-rack room?", "a": "Only if the installed IT power demand reaches 500 kW, which is 25 kW per rack across 20 racks. The scheme the Commission adopted on 21 September 2026 covers data centers above 500 kW and builds on the Article 12 reporting that already applies from that size. Below it, nothing is due, although Poland's draft UC77 would use the same 500 kW line for publishing energy performance."}, {"q": "Does DC Sim simulate heat recovery?", "a": "No. DC Sim estimates heat from power per rack and per cooling zone from your Excel sheet, compares it with the cooling capacity that serves each zone and flags the gap. The heat exchangers, heat pumps or desalination plant that would use the heat are outside the model; the twin gives the engineer who designs them a current heat budget per zone."}, {"q": "When would Poland's UC121 waste heat obligation apply?", "a": "UC121 is a draft amendment to the Energy Law. As recorded in the European data centre regulation tracker on 18 October 2026, it would oblige data centres above 1 MW to use waste heat unless that is not technically or economically feasible, with Council of Ministers adoption planned for the fourth quarter of 2026. As of 25 October 2026 it is not law and the text can still change."}]
---

![A row of racks rejecting heat into a closed loop that feeds a water and heat reuse block, with the 500 kW and 1 MW thresholds marked](/media/data-center-waste-heat-recovery-cover.webp)

## 1. The deal: heat becomes a product

On 22 October 2026 Endeavour, owner of the data center developer Edged and the cooling company ThermalWorks, and Trevi Systems of Rohnert Park, California, [announced a strategic partnership](https://www.prnewswire.com/news-releases/every-megawatt-of-ai-capacity-can-make-up-to-200-000-gallons-of-clean-water-per-day-302916375.html) to run Trevi's heat-driven desalination and brine concentration on waste heat from ThermalWorks' closed-loop cooling. The companies' own figures: up to 200,000 gallons (about 750,000 litres) of clean water a day from brackish groundwater for every megawatt of computing capacity, about 50,000 gallons a day per megawatt from oilfield produced water, and a 100 MW campus that could make up to 20 million gallons a day. First deployments will be at Endeavour's own US data centers.

Two details matter for anyone who runs a smaller room. [Endeavour's own write-up](https://endeavourii.com/news-and-stories/every-megawatt-of-ai-capacity) says Trevi's forward osmosis process regenerates its draw solution with heat at 60 to 80 °C, which tells you what grade of heat the plant wants. And [DCD reported on 23 October 2026](https://www.datacenterdynamics.com/en/news/endeavour-partners-with-us-desalination-firm-trevi-to-turn-data-center-waste-heat-into-clean-water/) that Trevi claims up to 98 percent water recovery and has yet to deploy its system at a data center site, so the figures are projections until the first site runs.

## 2. The rules: heat becomes a reporting line

In Europe the push comes from regulators. Under Article 12 of the Energy Efficiency Directive 2023/1791, a data center with an installed IT power demand of at least 500 kW already reports its energy performance to a European database, with the indicators set by Delegated Regulation 2024/1364 ([White & Case, 20 October 2025](https://www.whitecase.com/insight-alert/data-centres-and-energy-consumption-evolving-eu-regulatory-landscape-and-outlook-2026)). On 21 September 2026 the Commission adopted a delegated act for a common rating scheme on top of that reporting. As [DCD reported on 22 September 2026](https://www.datacenterdynamics.com/en/news/european-commission-proposes-energy-and-water-efficiency-disclosure-rules-for-data-centers/), the scheme covers data centers above 500 kW and also rates their contribution to waste heat recovery, their support for grid balancing and their use of renewable generation; Parliament and Council can object during scrutiny but cannot amend, and the first ratings are expected in 2027. The same day the Commission opened a [public consultation on minimum performance standards](https://energy.ec.europa.eu/news/minimum-performance-standards-data-centres-europe-public-consultation-launched-2026-09-21_en), open until 14 December 2026, with a legislative proposal planned for the second quarter of 2027.

Germany already has numbers in law. According to the [European data centre regulation tracker](https://dccomply.com/insights/european-data-centre-regulation-tracker) (updated 18 October 2026), sites that started operating before 1 July 2026 must reach a PUE of 1.5 or lower from 1 July 2027 and 1.3 or lower from 1 July 2030, and sites starting from 1 July 2026 must reach 1.2 and reuse at least 10 percent of their energy. A bill to loosen the PUE limits to 1.6 and 1.4 had its first reading in the Bundestag on 24 September 2026 and is in committee.

## 3. Poland: the 1 MW line

For a Warsaw operator the draft to watch is UC121, an amendment to the Energy Law. The same tracker records that it would oblige data centres above 1 MW to use waste heat unless that is not technically or economically feasible, with Council of Ministers adoption planned for the fourth quarter of 2026. A second draft, UC77, would require owners and operators above 500 kW to publish energy performance information; its adoption was planned for the third quarter of 2026 and had not happened as of 15 October 2026. Neither is law today, 25 October 2026, and both texts can change. The thresholds are the useful part, because they tell a small operator which number to watch.

What 1 MW means in racks: at 20 kW per rack it is 50 racks, the top of the range DC Sim is built for. At 8 kW per rack it is 125 racks. A 50-rack room at 10 kW per rack sits at 500 kW, exactly where EU reporting begins. A room that size will rarely build its own heat plant. The questions it can answer now are whether the next row crosses a reporting line and what its heat would be worth if a neighbour wanted it.

## 4. The physics you need, and no more

Almost all the electrical power that goes into IT equipment leaves it as heat. A rack drawing 10 kW is a 10 kW heater, so the power sheet you keep for breakers and PDUs is also your heat budget, rack by rack. That is why the [rack power capacity planning guide](/resources/guides/rack-power-capacity-planning/) and this one share a calculator.

Quantity is the easy half. Temperature decides whether the heat is usable. Air-cooled rooms hand their heat to the cooling plant as warm air, and the water on the other side of the coil is lukewarm. Direct liquid cooling moves the heat in water at higher temperatures: the ASHRAE liquid cooling classes W17 to W45 presume facility water supplied at 17 to 45 °C, with W+ above 45 °C ([The Green Grid glossary](https://www.thegreengrid.org/resources/glossary/W)). Trevi wants 60 to 80 °C. A heating network or a desalination plant will either take your loop's return temperature as it is or add a heat pump to lift it, and the lift costs electricity, so the warmer your return water, the more of your heat counts.

## 5. What to model in the twin

Before anyone talks to a heat buyer or a regulator, a small operator can have four things in a model:

1. **Heat per rack and per cooling zone.** Estimated from power per device, summed per rack, summed per zone, and labelled as an estimate until measured readings replace it.
2. **Supply and return temperatures per loop.** Air supply and return for air-cooled zones, water supply and return for liquid loops. These decide which share of the heat a reuse system can take.
3. **Usable heat.** The kilowatts in zones whose return temperature meets the buyer's minimum, and the hours a year they run at that load. A GPU row that idles at a quarter of nameplate between jobs delivers a quarter of the heat.
4. **The thresholds.** Total IT load against 500 kW and 1 MW, today and after the next row, so you know when reporting or reuse obligations begin.

DC Sim covers the first, the fourth and the capacity side of the second. It estimates heat from power per rack and per cooling zone from your Excel sheet, compares it with the cooling capacity that serves each zone, flags the gap and shows it on the 3D floor. It does not simulate the heat-reuse plant, the heat pump or the desalination process. Those belong to a mechanical engineer with your numbers in hand; the twin's job is to keep the numbers right and current.

## 6. What to do this quarter

- Put a `max_kw` per rack and a cooling capacity per zone in your sheet, re-import, and read the heat versus capacity check.
- Record supply and return temperatures per loop in the Readings sheet. Without them no heat buyer can price your heat.
- Add your planned racks and check the total against 500 kW and 1 MW.
- If you are in Poland and above 1 MW, or will be in 2027, keep a short note on the technical and economic feasibility of heat reuse at your site. UC121, if adopted as drafted, asks exactly that question.
