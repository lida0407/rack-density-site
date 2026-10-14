---
title: "Data center digital twin: what it is and what it isn't"
description: "A data center digital twin knows where everything is, what depends on what, and what happens if something fails. What it is not, and how to judge one."
h1: "Data center digital twin: what it is, and what it isn't"
directAnswer: "A data center digital twin is a model of a room's physical infrastructure that knows where every device sits, what each one depends on (power chain, cooling, network) and how the room behaves when something changes or fails. A 3D picture is not a twin, DCIM is not a twin, and a twin is not CFD: the test is whether it can answer \"what happens if this fails?\" before you touch the room."
section: "guides"
order: 0
updated: "2026-10-15"
steps:
  - { name: "Fill the Devices sheet", text: "One row per device: rack, U position and model. Model names the way the vendor prints them; an empty U means the device sits outside a rack." }
  - { name: "Add the power chain", text: "In the Power sheet, list each UPS, panel, breaker and PDU with its rating and what feeds it, and note A, B or AB power cords on each device." }
  - { name: "Import and read the checks", text: "Import the workbook. The room appears in 3D with a check list of overlaps, breakers above 80 %, same-feed power supplies and single-corded devices, each pinned to its place." }
  - { name: "Fail the first node", text: "Pick a UPS or a feed, press Fail, and read what goes dark, what runs on one feed and what overloads. That answer is what makes it a twin." }
clips:
  - { name: "excel-to-3d", title: "From an Excel file to a 3D twin", caption: "One workbook in, the room in 3D, checks pinned in place, a change list on re-upload (50 s)." }
  - { name: "feed-a-fails-lightsoff", title: "Lose feed A at peak", caption: "Fail UPS-A: 2 devices lose power, 90 run on one feed, PDU-R05-B at 113.9 % (31 s)." }
related:
  - { href: "product/", label: "DC Sim: a data center digital twin from an Excel file", kind: "Product" }
  - { href: "resources/sample-twin/", label: "The sample twin: 13 racks built from one workbook", kind: "Example" }
  - { href: "resources/guides/document-data-center-in-excel/", label: "How to document your data center in Excel", kind: "Guide" }
faq: [{"q": "What is a data center digital twin?", "a": "A model of the room's physical infrastructure that knows where every device is, what it depends on for power, cooling and network, and how the room behaves when something changes or fails. It answers what-if questions before anything is touched in the room."}, {"q": "Is a digital twin the same as DCIM?", "a": "No. DCIM manages assets, capacity and change workflows. A twin models behaviour: what fails with what, how hot it gets, what a change would do. They work together; a twin can be fed from DCIM data."}, {"q": "Does a digital twin need live sensor data?", "a": "Not to be useful. The layout, the power chain and the cords come from a spreadsheet and already answer most failure questions. Measured readings from monitoring tools make loads and temperatures closer to the real room; projections stay labelled as estimates."}, {"q": "Does a digital twin replace airflow simulation?", "a": "No, and DC Sim is not CFD. Computational fluid dynamics solves airflow in detail for engineers and takes hours per run. A zonal model gives estimated minutes to 27, 32 and 35 °C in seconds, which is enough for most operational what-ifs."}, {"q": "How long does it take to build one?", "a": "For a small room, the time it takes to fill one sheet: rack, U and model per device. The power chain and cords add the failure answers. Monitoring readings and cables can come later."}]
---

## 1. A definition that survives a real room

Vendors use "digital twin" for anything from a rendered floor plan to a physics simulation. A useful definition has three tests. A data center twin:

- **Knows where everything is:** every device in its rack and U, every rack in its row, every cooling unit and PDU in its place.
- **Knows what depends on what:** which UPS feeds which panel, breaker and PDU; which power supply plugs into which feed; which switch carries which server; which cooling unit serves which racks.
- **Answers "what if" before you touch the room:** fail a UPS, a feed, a switch or a cooling unit, and it tells you what goes dark, what runs on one feed, what overloads and how fast the room heats up.

A model that passes the first test is an inventory. One that passes the first two is good documentation. Only the third makes it a twin.

## 2. What it is not

| | Answers | Needs | Typical user |
|---|---|---|---|
| **3D visualisation** | What does the room look like? | Positions | Sales, visitors |
| **DCIM** | What do we own, where, and who changes it? | Asset records, workflows | Facilities and IT asset teams |
| **Monitoring** | What is happening right now? | Sensors, agents, polling | Operations, on-call |
| **Computational fluid dynamics** | Exactly how does air move in this room? | Geometry, an engineer, hours per run | Mechanical engineers |
| **Digital twin** | What happens if this fails, or if we add that? | Positions, dependencies, ratings; readings optional | Operations, design, integrators |

Three common confusions:

- **A 3D view is not a twin.** A beautiful room with no power chain cannot tell you what a UPS failure does.
- **"Live" is a data source, not a definition.** A twin can read measured values from monitoring, and it gets more accurate when it does, but a model built from a spreadsheet already answers most failure questions. Ask what the numbers are based on, not whether they move.
- **A twin does not run the room.** It should not switch equipment. It is where you try the failure first.

## 3. The layers that matter in a small or mid-size room

DC Sim models nine layers on one model: **Floor** (space, U, weight), **Air** (inlet temperatures, airflow), **Water** (liquid loops, manifolds, leaks), **Fire** (zones, detection, suppression), **Power** (the chain from utility to PDU, per-phase load), **Cabling** (every cord, traceable), **Network** (topology, utilisation), **Device** (health, parts, warranty) and **Token** (tokens per second and per kWh for AI rooms). Not every room needs all nine. Most rooms start with Floor and Power, because a power failure is the question people ask first.

## 4. Where the data comes from

- **A spreadsheet first.** Rack, U and model per device is enough to draw the room; power cords and a Power sheet add the failure answers. The [Excel template](../../excel-template/) has one sheet per layer, and only Devices is required.
- **The tools you already run.** Zabbix and NetBox connect directly with a read-only token; any other tool's export goes into the Readings sheet.
- **Defaults, marked as such.** What the file does not say (aisle direction, a cooling zone, typical device power) is filled with defaults labelled **assumed**, so you know what to replace.

Every projected number (temperatures, runtimes, minutes to a threshold) is labelled **estimated**. The air model is zonal, not CFD.

## 5. Design, run, fail it first

The same model works before and after the room exists. In **Design** mode you place racks and devices, with U, weight, breaker and cooling checks as you go. When the room is built, you import the as-built and keep the same model as the running twin. In **Simulate** you fail anything: a feed at peak, a UPS, a cooling unit, a manifold leak, more load on a row. Each run sits next to an untouched baseline.

## 6. How to judge one in 30 minutes

1. **Import your own file**, not the vendor's demo. How long until you see your room?
2. **Fail a UPS at peak.** Does it list dark devices, devices on one feed, stopped services and overloads? Or does it just turn things red?
3. **Ask where each number comes from.** Measured, from a sheet, from a vendor table, or estimated? It should say.
4. **Re-upload a changed file.** Do you see exactly what changed before it applies?
5. **Check the thermal claim.** A result in seconds is not CFD and should not be sold as one; an honest, labelled zonal estimate is fine for operational questions.
6. **Look at the price unit.** Per asset, per rack or per project? Compare it with [what DCIM costs](../dcim-pricing/) for your room size.

## 7. Build a first twin in an afternoon

The four steps below are the whole method: Devices, the power chain, import and read the checks, fail the first node. The clip shows the same steps on the 13-rack demo hall.
