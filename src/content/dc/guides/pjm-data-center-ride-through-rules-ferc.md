---
title: "PJM data center ride-through: what the FERC filing means"
description: "PJM data center ride-through rules filed with FERC on 16 November 2026 would require 50 MW+ sites to stay on grid power during faults. See the timeline."
h1: "PJM data center ride-through: what the FERC filing means for facility power"
directAnswer: "PJM data center ride-through rules proposed to FERC on 16 November 2026 would require facilities of 50 MW or more to stay connected to the grid during voltage and frequency disturbances instead of transferring to on-site backup, PJM Inside Lines reported. FERC has not ruled on the filing, which carries a proposed effective date of 16 January 2027 and a one-year compliance window for existing sites."
section: "guides"
order: 29
updated: "2026-11-17"
related:
  - { href: "resources/guides/data-center-power-line-disputes/", label: "Data Center Power Line Disputes: Who Waits and Who Pays", kind: "Guide" }
  - { href: "resources/guides/rack-power-capacity-planning/", label: "Rack power capacity planning with the 80 % rule", kind: "Guide" }
  - { href: "resources/guides/ups-failure-impact-analysis/", label: "UPS failure impact analysis in 20 minutes", kind: "Guide" }
faq: [{"q": "What is the PJM Large Computational Load definition?", "a": "CASRAI reported on 16 November 2026, citing the PJM filing, that a Large Computational Load is a facility with at least 50 MW of aggregate demand where 25 MW or more is served through power electronic conversion equipment."}, {"q": "Has FERC approved the PJM data center ride-through rule?", "a": "No. PJM filed the proposed tariff and Manual 14B revisions with FERC on 16 November 2026, and FERC has not yet ruled on the proposal."}, {"q": "When would existing data centers have to comply with the PJM rule?", "a": "PJM Inside Lines reported on 16 November 2026 that existing Large Computational Loads would have to comply within one year of the proposed 16 January 2027 effective date or within one year of commercial operation, whichever is later."}, {"q": "What happened on 22 July 2026 in the Dominion Energy zone?", "a": "PJM Inside Lines reported on 16 November 2026 that nearly 3.9 GW of data centers in the Dominion Energy transmission zone transferred from utility power to on-site generators after a routine transmission disturbance."}, {"q": "How does the PJM proposal affect UPS and static transfer switch settings?", "a": "CASRAI reported on 16 November 2026, citing the PJM filing, that compliance will require testing and firmware updates across modular UPS systems, static transfer switches, and battery energy storage systems to prevent early tripping during voltage sags."}]
---

![High-voltage transmission lines feeding a data center substation connected to an indoor UPS room](/media/pjm-data-center-ride-through-rules-ferc-cover.webp)

PJM data center ride-through rules proposed to FERC on 16 November 2026 would require facilities of 50 MW or more to stay connected to the grid during voltage and frequency disturbances instead of transferring to on-site backup, [PJM Inside Lines](https://insidelines.pjm.com/pjm-proposes-new-rules-to-protect-grid-reliability-as-data-center-demand-grows/) reported. FERC has not ruled on the filing, which carries a proposed effective date of 16 January 2027 and a one-year compliance window for existing sites.

## 1. What triggered the PJM ride-through filing

On 22 July 2026, nearly 3.9 GW of data centers in the Dominion Energy transmission zone unexpectedly transferred from utility power to on-site generators after a routine transmission disturbance, according to PJM Inside Lines. It was the largest load transfer event of its kind in PJM history.

According to [CASRAI](https://casrai.org/news/pjm-ferc-data-center-voltage-frequency-ride-through-2026) on 16 November 2026, citing the PJM filing, the event began at 7:56 a.m. when a mechanical failure removed a 230-kilovolt transmission line from service in Northern Virginia. Utility protection equipment cleared the electrical fault within normal clearance cycles, yet the localized voltage dip triggered simultaneous automated disconnections across neighboring facilities.

Citing Dominion Energy and PJM operational data, CASRAI wrote that demand dropped by 2,970 MW initially and by another 1,099 MW moments later. Across the PJM system, load fell from 99,984 MW to 96,205 MW, system frequency jumped to 60.092 Hz, and local voltages spiked to 1.138 per unit (p.u.). PJM dispatchers stabilized grid parameters within nine minutes using reactive power reserves and generation curtailment.

PJM already serves roughly 10 GW of existing Large Computational Load (LCL) and forecasts additions of up to 30 GW by 2030. PJM says the scale and speed of the July load transfers posed serious threats to the reliability and safety of the grid.

## 2. PJM ride-through proposal at a glance (Source: PJM)

The table below summarizes the tariff and Manual 14B (Attachment D-2) changes filed with FERC on 16 November 2026. Because the filing is a proposal, FERC must still issue an order before any requirement takes effect.

| Rule element | Proposed requirement (Source: PJM, 16 November 2026) |
| --- | --- |
| Covered facilities (LCL) | Aggregate demand of 50 MW or more, with at least 25 MW served through power electronic conversion equipment |
| Core obligation | Remain electrically connected and operate through defined voltage and frequency boundaries instead of transferring to on-site backup |
| Filing date | 16 November 2026 |
| Proposed effective date | 16 January 2027 |
| New LCL compliance | Must demonstrate compliance as a condition of interconnection and commercial operation |
| Existing LCL compliance | Within one year of the 16 January 2027 effective date or one year of commercial operation, whichever is later |

## 3. How the proposed rules change facility power systems

For developers and facility managers, the proposal shifts how internal power protection interacts with the transmission grid. Citing the filing, CASRAI describes an LCL as any facility with 50 MW or more of aggregate demand that serves at least 25 MW of its maximum load through power electronic conversion equipment.

Unlike industrial plants built around heavy induction motors with mechanical inertia, modern data centers rely on solid-state rectifiers and switch-mode power supplies, CASRAI notes. When transmission voltage sags, power supply controls can trip within milliseconds, transferring server halls onto on-site diesel generators and battery banks through static transfer switches and uninterruptible power supply (UPS) modules.

Under the proposed framework, facilities would have to remain connected across defined voltage and frequency boundaries rather than disconnecting during routine faults. During voltage sags between 0.50 p.u. and 0.90 p.u., facilities may reduce active power consumption in proportion to the voltage drop to limit electrical stress. Once system voltage recovers, the facility must restore at least 90% of its pre-disturbance active power demand.

Meeting those electrical boundaries inside the building will require coordination across several layers of site infrastructure:

- Modular UPS systems, static transfer switches, and battery energy storage systems will need testing and firmware updates so they ride through momentary dips without tripping early while still protecting server power supplies from transient surges, according to CASRAI. Facility teams evaluating backup topology can review our [UPS failure impact analysis](/dc/resources/guides/ups-failure-impact-analysis/) guide when mapping transfer behavior.
- In our view, generator transfer logic will also need to distinguish between a brief transmission fault that clears within normal cycles and a sustained outage that requires islanding onto on-site generation.
- Power distribution and rack-level headroom should be checked alongside active power recovery behavior, a topic covered in our [rack power capacity planning](/dc/resources/guides/rack-power-capacity-planning/) guide.
- Protection coordination with the local transmission owner will be part of commissioning and transition reviews. CASRAI reports that Manual 14B sets regional baseline rules while allowing individual transmission owners, including Dominion Energy, to enforce stricter local standards where needed.

## 4. Wider federal and interconnection context in PJM

PJM's filing sits inside a broader regulatory push across the Bulk-Power System. On 16 July 2026, according to CASRAI, FERC issued an order in Docket No. RD26-7-000 directing the North American Electric Reliability Corporation (NERC) to develop mandatory reliability standards for computational loads by 31 December 2026.

At the same time, PJM is trying to speed up how large loads connect to its 13-state grid. [OilPrice](https://oilprice.com/Latest-Energy-News/World-News/Americas-Biggest-Grid-Operator-Races-to-Keep-Up-With-Data-Center-Boom.html) reported in November 2026, citing Reuters, that PJM proposed to FERC cutting the study period for connecting large new demand sources from two years to 12 months. The same report says PJM's June 2028/2029 electricity procurement auction revealed a 6.8 GW generation capacity shortfall across its 13 states. Faster studies and stricter ride-through rules are moving in parallel as grid operators try to manage both supply adequacy and load stability, themes we also examine in our [data center power line disputes](/dc/resources/guides/data-center-power-line-disputes/) guide.

PJM says it will continue working with stakeholders to expand ride-through standards and develop ramp-rate requirements. CASRAI adds that work through 2027 will also cover active power recovery controls.

## 5. Practical next steps for 50 MW and larger sites in PJM

Because FERC has not yet ruled on the 16 November 2026 filing, requirements could still be modified during regulatory review. Even so, site planners and facility managers with campuses in PJM's 13-state footprint can start preparing now:

- Check campus capacity against the proposed threshold of 50 MW aggregate demand and 25 MW on power electronic conversion equipment.
- Ask engineering teams and equipment suppliers whether installed or specified modular UPS systems, static transfer switches, and battery energy storage systems support firmware updates and ride-through testing for sags between 0.50 p.u. and 0.90 p.u..
- Budget time for protection coordination studies and compliance documentation with the local transmission owner ahead of the proposed 16 January 2027 effective date and the one-year transition window for existing facilities.
- Monitor both FERC's docket on the PJM tariff filing and NERC's standards due by 31 December 2026 under Docket No. RD26-7-000.

