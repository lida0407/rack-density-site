---
title: "AI data center water use per day: what drives the number"
description: "AI data center water use per day runs from almost none to 10 million gallons for a 1 GW campus. Why it varies, where the water goes, and what to ask a site."
h1: "AI data center water use per day: cooling design, climate and the numbers to ask for"
directAnswer: "AI data center water use per day can reach 10 million gallons for a 1 GW campus, researcher Shaolei Ren of the University of California, Riverside told CNBC on 5 November 2026, while a site on dry cooling may use almost none for most of the year. The internal liquid loop barely loses water. The external heat rejection method and the weather decide the daily figure."
section: "guides"
order: 25
updated: "2026-11-10"
related:
  - { href: "resources/guides/liquid-cooling-leak-what-if/", label: "Liquid cooling leak what-if: isolation loops and containment", kind: "Guide" }
  - { href: "resources/guides/rack-power-capacity-planning/", label: "Rack power capacity planning with the 80 % rule", kind: "Guide" }
  - { href: "resources/guides/data-center-ballot-measures-ohio-2026/", label: "Data center ballot measures in Ohio: what voters restricted", kind: "Guide" }
faq: [{"q": "How much water does an AI data center use per day?", "a": "Anywhere from almost none on a dry cooled site in cool weather to up to 10 million gallons a day for a 1 GW campus, according to Shaolei Ren of UC Riverside. The Lincoln Institute of Land Policy puts larger data centers at up to 5 million gallons a day."}, {"q": "Does closed-loop liquid cooling mean a data center uses no water?", "a": "No. The loop that cools the chips loses very little water, but its heat still has to leave the building. If that happens through evaporative cooling, water evaporates, mostly on the hottest days."}, {"q": "Why do data centers use more water in summer?", "a": "Dry coolers lose effect when outside air is hot, so sites either switch on refrigeration, which uses a lot of power, or spray water to cool the air. Peak water use therefore lands on the hottest days."}, {"q": "Where does data center cooling water come from?", "a": "One analysis cited by the University of Georgia Extension estimated that about 57% of data centers use potable water. Some operators now build plants to recycle treated wastewater for cooling."}, {"q": "What should a planning board ask about data center water use?", "a": "Peak daily allocation and the average, the heat rejection method by season, the water source, what is discharged and where, and how much extra power the site needs if water use is cut in a drought."}]
---

![Cross section of a data center hall with racks, a closed liquid cooling loop and an evaporative cooling tower](/media/ai-data-center-water-use-per-day-cover.webp)

AI data center water use per day can reach 10 million gallons for a 1 GW campus, researcher Shaolei Ren of the University of California, Riverside told CNBC on 5 November 2026, while a site on dry cooling may use almost none for most of the year. The internal liquid loop barely loses water. The external heat rejection method and the weather decide the daily figure.

## 1. The daily range, and why it is so wide

[CNBC's report of 5 November 2026](https://www.cnbc.com/2026/11/05/meta-spacex-ai-data-centers-use-millions-of-gallons-of-water-a-day.html) quotes Ren's figure of up to 10 million gallons a day for the largest AI campuses. Smaller sites are lower. The [Lincoln Institute of Land Policy](https://www.lincolninst.edu/publications/land-lines-magazine/articles/land-water-impacts-data-centers/) writes that a mid-sized data center uses as much water as a small town, and larger ones up to 5 million gallons a day, about what a city of 50,000 people uses.

Allocations show how far the peak sits above the average. For a 1 GW campus in Lebanon, Indiana, CNBC reports that the water allocation could rise to 8 million gallons a day by 2031, a figure the operator describes as peak use on the hottest days, while saying the site will use no water for most of the year. A computing complex outside Memphis has an allocation of up to 1.28 million gallons a day, according to the local utility, Memphis Light, Gas and Water, though CNBC says it has not reached that level.

Regional totals add up fast. A study by the Houston Advanced Research Center and the University of Houston, cited by the Lincoln Institute, found Texas data centers will use 49 billion gallons of water in 2025 and as much as 399 billion gallons in 2030.

## 2. The closed loop is not where the water goes

AI racks are liquid cooled because air cannot keep up. A colocation provider's sustainability head told CNBC that water is about 3,000 times more efficient than air for cooling GPUs. Inside the hall, coolant runs through cold plates on the chips in a sealed loop and loses very little. Leak planning for that loop is its own subject, covered in our [liquid cooling leak what-if](resources/guides/liquid-cooling-leak-what-if/) guide.

The water use happens at the next step, when the heat from that loop has to go outside. "That's where the water usage comes in," Ren told CNBC. A cooling tower or wet pad evaporates part of the water to carry the heat away, and evaporated water leaves the local supply. The [University of Georgia Extension](https://fieldreport.caes.uga.edu/publications/TP121/how-data-centers-impact-surface-and-ground-waters/) says closed-loop systems can cut water consumption by up to 70% compared with open evaporative cooling, at a higher cost.

## 3. Water against power

There are two main ways to reject the heat, and each costs something different. Dry cooling uses far less water but can need far more power, especially in the hot climates where many AI campuses are going up, CNBC reports. Dry coolers work by blowing outside air across coils; when that air is hot, sites turn on refrigeration first. "That's a very power-intensive process, and that's exactly why we have power shortages in the summer," Ren said. Evaporative cooling uses very little power and a lot of water.

Many sites mix the two by season, with dry cooling in cold months and evaporative cooling when it is hot. The Indiana campus above keeps power use down in summer by spraying mist into the air rather than relying only on refrigeration. For a planner, every gallon saved in summer shows up as extra electrical load, which has to fit inside the site's power envelope; see [rack power capacity planning](resources/guides/rack-power-capacity-planning/).

Disclosed totals keep rising. CNBC reports that one global colocation operator used 1.2 billion gallons of water across its operations in 2025, up 10% on the year before. The Lincoln Institute notes that one large search company reported more than 5 billion gallons across its data centers in 2023, with 31% of its freshwater withdrawals from watersheds at medium or high risk of scarcity.

## 4. Where the water comes from

Source matters as much as volume. The University of Georgia Extension cites an analysis estimating that about 57% of data centers use potable water, and that 80% to 90% of that water comes from lakes, rivers or aquifers that also feed public supplies. It also cites estimates that 75% to 90% of data centers worldwide mainly use water-based cooling. As of 10 November 2026 it counted 5,108 data centers in the United States, with Virginia (716), Texas (604) and Georgia (303) leading.

Evaporation has a second cost. Julie Bolthouse, director of land policy at the Piedmont Environmental Council, told the Lincoln Institute that evaporated water does not make it back to the river, and that evaporative cooling leaves behind high concentrations of salts and other contaminants.

Some operators now build their own treatment. CNBC reports one hyperscale operator spent $100 million on a water and wastewater system near its campus in Kuna, Idaho, and another pledged $80 million outside Memphis for a plant to turn treated municipal wastewater into cooling water.

## 5. What boards ask, and what to have ready

Water is now part of the local vote. CNBC reports that in the 3 November 2026 elections, voters passed 40 of 41 ballot measures that would put limits on new data centers; our [data center ballot measures in Ohio](resources/guides/data-center-ballot-measures-ohio-2026/) guide covers one state's results. Water often travels with the power question in these fights, as in [data center power line disputes](resources/guides/data-center-power-line-disputes/).

An operator that wants a smooth review should have these answers ready, and a board or buyer should ask for them:

- Peak daily allocation and expected average, with the number of days a year the site expects to evaporate water at all.
- Heat rejection method by season: dry, evaporative or hybrid, and at what outdoor temperature it switches.
- Water source: potable, groundwater, reclaimed or treated wastewater, and the share of each.
- Discharge: blowdown volume and what is in it.
- The power trade: how much extra load the site draws if water use is cut during a drought.

The CNBC report says one operator runs a water risk analysis for every new site before choosing its external cooling method. That analysis, shared early, answers most of the list above.

## Frequently asked questions

### How much water does an AI data center use per day?
Anywhere from almost none on a dry cooled site in cool weather to up to 10 million gallons a day for a 1 GW campus, according to Shaolei Ren of UC Riverside. The Lincoln Institute of Land Policy puts larger data centers at up to 5 million gallons a day.

### Does closed-loop liquid cooling mean a data center uses no water?
No. The loop that cools the chips loses very little water, but its heat still has to leave the building. If that happens through evaporative cooling, water evaporates, mostly on the hottest days.

### Why do data centers use more water in summer?
Dry coolers lose effect when outside air is hot, so sites either switch on refrigeration, which uses a lot of power, or spray water to cool the air. Peak water use therefore lands on the hottest days.

### Where does data center cooling water come from?
One analysis cited by the University of Georgia Extension estimated that about 57% of data centers use potable water. Some operators now build plants to recycle treated wastewater for cooling.

### What should a planning board ask about data center water use?
Peak daily allocation and the average, the heat rejection method by season, the water source, what is discharged and where, and how much extra power the site needs if water use is cut in a drought.
