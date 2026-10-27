---
title: "Crusoe Paraguay Data Center: 106 MW on Itaipu Hydro"
description: "Crusoe Paraguay data center: a path to 106 MW of IT next to the Itaipu substation, options to about 280 MW. What the hydro buys and what is still undisclosed."
h1: "Crusoe Paraguay data center: 106 MW of AI compute next to the Itaipu substation"
directAnswer: "The Crusoe Paraguay data center is an AI cloud site announced on 22 October 2026 by Crusoe and Paraguayan developer Araico, next to the Itaipu substation and powered by the Itaipu dam. Crusoe says the first deployment comes online in mid-2027, with a path to 106 MW of IT and options to about 280 MW. The first-phase size, investment and power price are unpublished."
calculator: "rack-power"
section: "guides"
order: 9
updated: "2026-10-27"
related:
  - { href: "resources/guides/rack-power-capacity-planning/", label: "Rack power capacity planning with the 80 % rule", kind: "Guide" }
  - { href: "resources/guides/tokens-per-kwh/", label: "Tokens per kWh: the one metric for an AI room", kind: "Guide" }
  - { href: "resources/guides/data-center-waste-heat-recovery/", label: "Data center waste heat recovery after the Endeavour and Trevi deal", kind: "Guide" }
faq: [{"q": "Where is the Crusoe data center in Paraguay?", "a": "Next to the Itaipu substation, according to Crusoe's announcement of 22 October 2026. Araico builds the site infrastructure there and Crusoe operates the compute for its cloud. The announcement does not give a street address or a town."}, {"q": "How big is the Crusoe Paraguay data center?", "a": "Crusoe describes a path to 106 MW of IT capacity and long-term options to about 280 MW in total. Baxtel notes that 106 MW is a scaling target: the size of the first deployment and the date for reaching 106 MW have not been disclosed."}, {"q": "When will the Itaipu data center open?", "a": "Crusoe says the initial deployment comes online in mid-2027. Baxtel reports that BNamericas gave the first quarter of 2027 for capacity on Crusoe Cloud, so the two dates differ. Araico's own separate 6 MW first phase is scheduled for energization in December 2026, according to Baxtel."}, {"q": "Is the Crusoe Paraguay deal worth $12 billion?", "a": "No figure has been given for the deal. The $12 billion belongs to Araico's wider Iguazu AI City campus, which DCD describes as a 1.3 GW project. Baxtel cites UPI saying the $12 billion has not been confirmed as the value of the Crusoe partnership."}, {"q": "How much does Itaipu power cost a data center?", "a": "No tariff for this site has been published. Baxtel reports that Araico co-founder Alejandro Zuccolillo told ABC Color in September 2026 that Araico proposed paying the state utility ANDE $45 per MWh with annual price adjustments. Cenário Energia reports that the energy contract details were not part of the announcement."}]
---

![A hydro dam feeding a substation, which feeds a row of racks, with 106 MW of IT and about 280 MW of options marked](/media/crusoe-paraguay-data-center-cover.webp)

## 1. What was announced

In [Crusoe's announcement](https://www.crusoe.ai/resources/newsroom/crusoe-araico-hydroelectric-ai-infrastructure-partnership), the company plans an initial deployment in mid-2027, a path to 106 MW of IT capacity and long-term options to expand to about 280 MW in total. The facility is adjacent to the Itaipu substation. It will serve US cloud customers and demand in Latin America through Crusoe Cloud, and it is Crusoe's first dedicated cloud deployment in the region.

Araico leads local development and builds the site infrastructure next to the substation. Crusoe manages and operates the site and delivers the physical compute. [DCD reported on 23 October 2026](https://www.datacenterdynamics.com/en/news/crusoe-to-develop-106mw-data-center-site-in-paraguay/) that Crusoe's cloud today runs seven regions, mostly from leased facilities, including two in Iceland and one in Norway. Paraguay follows the same pattern of cloud capacity placed where hydro or other firm power is plentiful.

## 2. The numbers that are easy to mix up

Three figures circulate, and they describe different things.

- 106 MW of IT is the target for this site. [Baxtel](https://baxtel.com/news/crusoe-signs-106mw-paraguay-ai-cloud-partnership-with-araico) points out that it is a scaling target. The partners have not given the size of the first deployment or a timetable to 106 MW.
- About 280 MW is the long-term option for this site, per Crusoe's announcement.
- 1.3 GW and $12 billion belong to Araico's separate Iguazu AI City campus. DCD describes it as a 1.3 GW campus for hyperscalers, labs and enterprises, and reports Araico's claim that the $12 billion project will be the largest private investment in Paraguay's history. Baxtel cites UPI saying the $12 billion is Araico's projection for its broader development and has not been confirmed as the value of the Crusoe deal.

One report goes further than the announcement. [Cenário Energia wrote on 23 October 2026](https://cenarioenergia.com.br/2026/10/23/paraguai-atrai-projeto-de-ia-abastecido-por-itaipu-e-amplia-disputa-por-data-centers/) that the initial phase will have 106 MW of IT capacity. Crusoe's own text says "a path to scale to 106 MW", so treat 106 MW as a target until the partners say otherwise.

The dates also differ. Baxtel reports that BNamericas expected capacity on Crusoe Cloud from the first quarter of 2027, while the announcement says mid-2027. Araico's own first phase, which local media put at 6 MW according to Baxtel, is scheduled for energization in December 2026 under its contract with the state utility ANDE.

## 3. What firm hydro at a substation buys

For a high-density AI room, power sets the limits: whether you can get a connection, how long it takes and what each kilowatt-hour costs. A site next to a large hydro plant's substation addresses the first two. Cenário Energia notes that energy availability, supply cost and the time to connect to the grid drive where large AI facilities go. The same article adds a caution. Announced capacity does not by itself mean contracted consumption or a fully connected load, and growth will depend on supply and connection conditions.

On price, only one figure is public. Baxtel reports that Araico co-founder Alejandro Zuccolillo told ABC Color in September 2026 that Araico had proposed paying ANDE $45 per MWh, with annual price adjustments. Baxtel also reports, citing BNamericas, that ANDE will supply the first phase and that Araico has signed a power purchase agreement with ANDE. Cenário Energia reports that the Paraguayan press found no contract details in the official announcement. So $45 per MWh is Araico's proposal for its own campus, not a confirmed tariff for Crusoe's racks.

To see what that rate would mean, here is plain arithmetic on Baxtel's reported figure. $45 per MWh is $0.045 per kWh. If 106 MW of IT ran at full load for a whole year, it would use 928,560 MWh, which at $45 per MWh comes to about $41.8 million a year for the IT load alone, before cooling and other facility overhead. These are example inputs, not a forecast: real load is lower than nameplate and the tariff can change.

Cenário Energia also points to a political side. Itaipu is shared with Brazil, and Paraguay is entitled to half of its output. More domestic consumption from large loads raises questions about where Paraguay's share goes, although the outlet says the effect on Brazil depends on contracted energy and the rules for selling Itaipu power.

## 4. What 106 MW means in racks

Neither company has published a rack density, a cooling design or a PUE target for the site. To give the 106 MW a physical scale, take two example densities. At 50 kW per rack, 106 MW of IT is about 2,120 racks. At 130 kW per rack it is about 815 racks. The real number will depend on the hardware Crusoe deploys, which has not been disclosed.

Climate and cooling are open questions too. None of the four reports we read describe the cooling method, water use or the site's design temperatures, so any claim about free cooling in Paraguay would be a guess.

## 5. What is still undisclosed

As of 27 October 2026, these are the gaps a power or capacity planner should watch:

- The size and date of the first deployment, and the timetable to 106 MW.
- The power contract for Crusoe's capacity: tariff, term and whether it is firm. Only Araico's proposed $45 per MWh for its campus has been reported.
- The investment amount. Baxtel notes that neither company disclosed it.
- Rack density, cooling method, PUE and water use.
- How the long-term option to about 280 MW would be triggered and connected.

## 6. What it means for where high-density capacity gets built

The announcement fits a pattern DCD describes in Crusoe's history: the company started by placing compute at stranded gas, then moved to cloud regions in Iceland and Norway on renewable power. Paraguay adds a Latin American site on the same logic: a large, existing hydro plant with a substation next door. Cenário Energia frames the deal as part of a regional contest for data center investment, quoting Scala Data Centers CEO Marcos Peigo saying that Paraguay could reach 1 GW of data center capacity before Brazil if Brazil does not move on state tax incentives.

For a smaller operator the lesson is in the order of questions. The large builders start with where firm power is available and what it costs per MWh, then design density and cooling around it. A 20-rack room cannot move to Itaipu, but it can run the same check in miniature: how many kilowatts the feed and the cooling really deliver per rack, what each kWh costs, and how much headroom is left before the next row of GPU servers. The [rack power capacity planning guide](/resources/guides/rack-power-capacity-planning/) walks through that check, and the [tokens per kWh guide](/resources/guides/tokens-per-kwh/) turns a tariff like $0.045 per kWh into a cost per million tokens.
