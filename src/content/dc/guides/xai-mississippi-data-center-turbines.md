---
title: "xAI Mississippi Data Center: Jet Engine Turbines for Power"
description: "The xAI Mississippi data center runs on eight converted jet engine turbines. What on-site gas power gives a campus, the permit terms, and what to check first."
h1: "xAI Mississippi data center turbines: on-site gas power as a bridge around the grid queue"
directAnswer: "The xAI Mississippi data center has eight refurbished jet engine turbines supplying power to its Colossus 2 complex, TechRadar reported on 7 November 2026. Each unit can reportedly produce up to 50 MW. The state permits reportedly allow a 25% higher limit for some volatile organic compounds, and the Southern Environmental Law Center has challenged the approval."
section: "guides"
order: 24
updated: "2026-11-07"
related:
  - { href: "resources/guides/data-center-ballot-measures-ohio-2026/", label: "Data center ballot measures in Ohio: what voters restricted", kind: "Guide" }
  - { href: "resources/guides/data-center-power-line-disputes/", label: "Data center power line disputes: who waits and who pays", kind: "Guide" }
  - { href: "resources/guides/rack-power-capacity-planning/", label: "Rack power capacity planning with the 80 % rule", kind: "Guide" }
faq: [{"q": "How is the xAI Mississippi data center powered?", "a": "Part of its power comes from eight refurbished jet engine turbines installed at the Mississippi facility for the Colossus 2 complex, according to TechRadar on 7 November 2026 and Tom's Hardware on 3 November 2026. DCD reported on 2 November 2026 that the company uses turbines to power both Colossus 1 and Colossus 2."}, {"q": "Who makes the turbines at the xAI Mississippi site?", "a": "Tom's Hardware reports that ProEnergy, a Missouri company, converted them from unused General Electric aircraft turbines. Each unit can produce up to 50 megawatts, which Tom's Hardware puts at roughly the needs of 15,000 homes."}, {"q": "Why are the xAI turbines in Mississippi controversial?", "a": "The permits reportedly allow a 25% higher limit for certain volatile organic compounds, and there are concerns about carbon monoxide. Tom's Hardware, citing The New York Times, reports that the Southern Environmental Law Center challenged the state's approval, arguing that xAI has not shown the turbines meet standards for pollutants including formaldehyde and has undercounted projected emissions."}, {"q": "How many data centers does xAI have in Mississippi?", "a": "DCD reported on 2 November 2026 that the company, now called SpaceXAI, is adding two sites in Southaven, called Gun Range and Spam, to the Colossus 2 locations Macrohard, Macroharder and Minihard. Musk said Gun Range is tracking to be operational by the end of November and Spam in December."}, {"q": "Is on-site gas power faster than a grid connection?", "a": "Often, yes. TechRadar cites the International Energy Agency saying a 100 MW facility can take about seven years to connect to Northern Virginia's grid, and quotes Rystad Energy analyst Audun Martinsen saying that with on-site turbines a data center can be running in 24 months. Permits, fuel supply and turbine lead times still apply."}]
---

![Eight turbine units feeding a power bus into four data center racks, below a dashed line marked grid queue](/media/xai-mississippi-data-center-turbines-cover.webp)

## 1. What was installed in Mississippi

The xAI Mississippi data center now has eight refurbished jet engine turbines supplying power to its Colossus 2 computing complex, [TechRadar reported on 7 November 2026](https://www.techradar.com/pro/data-center-providers-are-turning-to-old-jet-engines-to-power-their-output-elon-musks-xai-installs-eight-converted-engines-for-a-major-boost). Each unit can reportedly produce up to 50 MW. The state permits reportedly allow a 25% higher limit for some volatile organic compounds, and an environmental group has challenged the approval.

[Tom's Hardware reported the installation on 3 November 2026](https://www.tomshardware.com/tech-industry/data-centers/elon-musks-xai-installs-eight-converted-jet-engines-to-power-mississippi-data-center-permits-allow-25-percent-higher-limit-for-pollutants-concerns-raised-over-carbon-monoxide). It says ProEnergy, a Missouri company, converts unused General Electric turbines of the kind fitted to Boeing aircraft into stationary generators. Tom's Hardware puts the 50 MW per unit at roughly the electricity needs of 15,000 homes. Turbines built from aircraft engines are usually called aeroderivative turbines.

The Colossus 2 sites are in Southaven, DeSoto County, just across the state line from Memphis. [DCD reported on 2 November 2026](https://www.datacenterdynamics.com/en/news/spacexai-launching-two-additional-data-center-campuses-in-mississippi-to-further-expand-colossus-2/) that the company, which it now calls SpaceXAI, uses turbines to power both Colossus 1 and Colossus 2.

## 2. Why a campus builds its own power plant

Grid connections are slow. TechRadar cites the International Energy Agency saying that connecting a 100 MW facility to Northern Virginia's grid can take about seven years. It quotes Audun Martinsen of Rystad Energy: "It's all about getting power as fast as possible...they can have a data center running in 24 months."

TechRadar also reports that an executive at Mitsubishi Power warned that much new generation capacity may not be available until 2031 because of equipment shortages. Both articles cite a July 2026 forecast that US data centers could use 20% of the country's electricity by 2035, 83% higher than the same forecast seven months earlier. They also report that by April 2026 about half of planned data center builds had been delayed or cancelled, partly for lack of power.

xAI is not the only buyer. TechRadar reports that the developer Crusoe ordered 13 ProEnergy generators in April 2026. xAI also has a tight schedule: Musk said in August that the company would grow its data center capacity sevenfold before the end of 2027, both articles report.

## 3. What eight turbines give a campus

The reports give one number per unit: up to 50 MW. On paper, eight units at that maximum add up to 400 MW. The articles do not say how many units run at once, at what output, or how many are held as spares, so 400 MW is an upper bound on nameplate. Firm IT capacity will be lower.

A worked example shows why the difference matters. These are our assumptions, not figures from the reports:

| Step | Value |
|---|---|
| Nameplate, eight units at 50 MW | 400 MW |
| Keep one unit as a spare (N+1) | 350 MW available |
| Facility overhead at a PUE of 1.3 | about 269 MW left for IT |
| Racks at 130 kW each | about 2,070 racks |
| Racks at 40 kW each | about 6,730 racks |

Real output will be lower on hot days, since gas turbines lose output as the air warms, and during maintenance. The [rack power capacity planning guide](/resources/guides/rack-power-capacity-planning/) covers the method for turning a power limit into a rack count.

For scale, DCD reports that Musk said the two new Southaven sites, Gun Range and Spam, will host about 420,000 Nvidia GB300 GPUs between them. Musk also said Colossus 2 will have around 1.2 million Blackwell GPUs by the end of 2026. In January 2026, [DCD reported](https://www.datacenterdynamics.com/en/news/xai-confirms-new-data-center-in-mississippi-elon-musk-pledges-20bn-investment-in-state/) that the company's Mississippi and Memphis sites would together give it about 2 GW of compute power once built out.

## 4. The permit and emissions terms

The turbines have state permits, Tom's Hardware reports. The terms that drew objections:

- The permits reportedly allow a 25% higher limit for certain volatile organic compounds.
- There are concerns about carbon monoxide emissions from the units.
- Tom's Hardware, citing The New York Times, reports that the Southern Environmental Law Center has challenged Mississippi's approval. The group argues that xAI has not shown the turbines meet emissions standards for specific pollutants, including formaldehyde, and that projected emissions were undercounted.

This is not the first dispute over the company's on-site power. DCD reports that the company ran as many as 35 turbines without a permit for a year at its Memphis site using a Clean Air Act loophole, and that local regulators granted a permit in 2025 to run 15 turbines until 2027. The NAACP has sued, alleging that the company built and operated a gas-fired power plant in Southaven without the required permits and that it has installed and operates 57 gas turbines at its Southaven facility. DCD reports that a judge rejected a Department of Justice attempt to block that lawsuit.

The Mississippi Department of Environmental Quality has also issued a notice to MZX Tech LLC, a subsidiary, over construction that started before coverage under the state's stormwater permit for large construction sites. DCD quotes the notice: MDEQ "is seeking civil penalties of up to $25,000 per day, with preliminary claimed exposure of approximately $6.1 million across three sites." The company said it was cooperating and was in talks to resolve the matters through a single agreed order.

## 5. What is next in Southaven

DCD reported on 2 November 2026 that the two new sites take their names from their former uses. Gun Range, once a police and fire training center, will host an AI training cluster in two single-story buildings on a 55.9-acre parcel. Spam, a former warehouse for Hormel Foods products, will be a 53-acre single-story building set up for inference. They join the Colossus 2 sites Macrohard, Macroharder and Minihard, which DCD says are set to host 330,000, 220,000 and 220,000 GPUs.

Musk wrote that Gun Range is tracking to be operational by the end of November 2026 and Spam in December. DCD notes that Musk claimed 1 GW of capacity when Colossus 2 launched, while satellite imagery in January reportedly showed cooling equipment for about 350 MW.

The state supports the build. DCD reported in January 2026 that the Mississippi Development Authority approved the company for its Data Center Incentive, a sales and use tax exemption on computing equipment and software, and that Southaven and DeSoto County support the projects through fee-in-lieu agreements.

## 6. What to check before you copy the model

On-site turbines can bring a campus online years before a grid connection. The risk moves from the utility queue to the air permit and the gas supply, and neighbours still get a say. Before you plan around them:

1. Read the air permit limits line by line. Check the limits for nitrogen oxides, carbon monoxide, volatile organic compounds and formaldehyde, and how emissions are counted. The challenge in Mississippi is about exactly these numbers.
2. Get the permit before the turbines run. The Memphis and Southaven history shows that running first and permitting later leads to lawsuits, notices and penalties.
3. Count units, not nameplate. Decide how many units run, how many are spares, and what each delivers on the hottest day of the year. Size IT load from that number.
4. Secure the fuel. Confirm pipeline capacity, interruptible or firm gas terms, and whether you need on-site fuel storage as a backup.
5. Check turbine lead times. TechRadar reports a Mitsubishi Power warning of equipment shortages that may hold back new generation capacity until 2031.
6. Plan the exit. Decide whether the turbines are a bridge until the grid connection arrives or a permanent plant, and how long the permit allows them to run. Memphis's 15-turbine permit, for example, runs until 2027 according to DCD.
7. Expect local opposition. Our guide to [data center ballot measures in Ohio](/resources/guides/data-center-ballot-measures-ohio-2026/) shows that some towns now vote on load caps, and on-site generation can fall under the same rules. Our guide to [data center power line disputes](/resources/guides/data-center-power-line-disputes/) covers the grid side.
8. Follow construction permits too. The MDEQ stormwater notice covered site work, not the turbines, and still carried a claimed exposure of about $6.1 million.

## 7. Dates to watch

- End of November 2026: Gun Range is due to be operational, according to Musk as reported by DCD.
- December 2026: Spam is due to be operational, Musk said.
- End of 2026: Musk's target of about 1.2 million Blackwell GPUs at Colossus 2.
- 2027: the end date of the 15-turbine permit at the Memphis site, according to DCD.
- End of 2027: Musk's target for a sevenfold increase in the company's data center capacity.

The outcome of the Southern Environmental Law Center challenge and the NAACP lawsuit has no reported date yet.
