---
title: "How to document a data center in Excel (free template)"
description: "Document a server room or data center in one Excel workbook: the four sheets, the columns, naming rules, checks, and how to keep it current. Free template."
h1: "How to document your data center in Excel"
directAnswer: "Document a data center in Excel with one workbook and one row per thing: a Devices sheet (rack, U, model, name, power cords, what runs on it), a Power sheet (each UPS, panel, breaker and PDU with its rating and what feeds it), a Cables sheet (from, to, type, port, label) and a Racks sheet (row and position). Fill Devices first: it alone answers what is where, and each other sheet answers one more question."
section: "guides"
order: 6
updated: "2026-10-15"
steps:
  - { name: "List every device in the Devices sheet", text: "Walk the room rack by rack, top to bottom. One row per device with rack, U position and model, plus name, role and serial if you have them. Devices outside a rack get an empty U and a location in the rack column." }
  - { name: "Record the power cords", text: "For each device, write A, B or AB in power_cords: which feed each power supply plugs into. This one column finds most single points of failure." }
  - { name: "Map the power chain in the Power sheet", text: "One row per UPS, panel, breaker and PDU with its type, rating, the node that feeds it (fed_from) and its feed (A or B). Add runtime_min or battery_kwh for each UPS." }
  - { name: "Add the racks and their layout", text: "In the Racks sheet give each rack its row and position, and optionally room, height, width and maximum kW." }
  - { name: "Add the cables you care about", text: "In the Cables sheet, one row per cable: from device and port, to device and port, type, label. Start with power and uplinks; a patch-panel connection is two rows." }
  - { name: "Run the checks and keep it current", text: "Check for duplicate names, overlapping U positions and single-corded devices, then re-check after every change. Re-importing the workbook into DC Sim lists exactly what changed." }
clips:
  - { name: "excel-to-3d", title: "From an Excel file to a 3D twin", caption: "The Devices and Cables sheets, import, checks pinned in 3D, then a re-upload with its change list (50 s)." }
related:
  - { href: "resources/excel-template/", label: "The free Excel template (v1.3): every sheet and column", kind: "Template" }
  - { href: "resources/calculators/rack-power/", label: "Rack power calculator: A/B feeds and the 80 % rule", kind: "Calculator" }
  - { href: "resources/guides/ups-failure-impact-analysis/", label: "UPS failure impact analysis in 20 minutes", kind: "Guide" }
faq: [{"q": "What should a data center inventory spreadsheet include?", "a": "At minimum, one row per device with rack, U position and model. Add name, role, serial, owner, warranty end, which feed each power supply uses (A, B or AB) and what runs on the device. A second sheet for the power chain and a third for cables answer the failure and patching questions."}, {"q": "Is Excel good enough, or do I need DCIM?", "a": "For a server room or a small data center, a well-kept workbook covers inventory, the power chain and patching. What it cannot do on its own is show the room, check it, or answer what fails with what; importing it into a tool such as DC Sim adds that without retyping."}, {"q": "How long does it take to document a server room?", "a": "The Devices sheet takes roughly as long as walking the racks once; most of the time goes on racks nobody is sure about. Power cords and the power chain take a second pass. Exporting from an existing inventory or NetBox cuts it to minutes."}, {"q": "Can I use Google Sheets instead of Excel?", "a": "Yes. Export as XLSX or CSV. DC Sim imports XLSX and CSV or TSV files, reads values only, and refuses formulas, macros and encrypted files."}, {"q": "How do I keep the spreadsheet up to date?", "a": "Change the sheet with every move, add or change, and re-check it. If you import it into DC Sim, a re-upload is an update: devices are matched by serial, then name, then rack and U, and you see a change list before anything is applied."}]
---

## Why a spreadsheet is the right start

Most documentation projects stall on data, not on tools. Everyone can open a workbook, a technician can fill it in the room, and an export from any inventory or monitoring tool lands in one. The trick is to structure it so it answers questions: where is it, what powers it, what is it connected to, what breaks if this fails.

## 1. Rules that save you later

- **One workbook, one sheet per kind of thing**, one header row, one row per thing. No merged cells, no colour-only meaning, no totals inside the data.
- **Values only.** Formulas are fine for your own checks in extra columns, but importers read values; DC Sim never evaluates formulas.
- **Names are keys.** A device, rack or PDU has one name used everywhere (Devices, Cables, Power). "PDU-R05-B" in one sheet and "R5 PDU B" in another are two different things to every tool.
- **Models the way the vendor prints them.** "PowerEdge R650" beats "Dell 1U". Catalogs match on the printed model.

## 2. Devices: the only sheet you must have

| Column | Example | Why |
|---|---|---|
| rack | R05 | Where it is. Devices outside a rack: put the location here and leave `u` empty |
| u | 12 | The lowest U it occupies |
| model | PowerEdge R650 | Size, weight, power and airflow come from the model |
| name | k8s-0105 | The key other sheets refer to |
| power_cords | AB | A, B or AB: which feed each power supply uses |
| runs | Kubernetes prod; backups | Services on the device, separated by semicolons, so a failure can name what stops |
| serial, owner, warranty_end | | Matching on re-import, and warranty alerts |

Fill it top to bottom, rack by rack. When a rack is unclear, write what you see and mark it; an unknown model still places a box of the right height.

## 3. Power: the chain from utility to PDU

One row per node: utility, generator, ATS, UPS, panel, breaker, PDU. The columns that matter are `type`, `rating` (11 kVA, 16 A, 22 kW), `fed_from` (the node above) and `feed` (A or B). For each UPS add `runtime_min` from the vendor's runtime table, or `battery_kwh`. With `power_cords` on Devices, this sheet is enough to answer "what goes dark if UPS-A fails" — see the [UPS failure impact analysis](../ups-failure-impact-analysis/).

## 4. Racks and rooms

`rack`, `row` and `position` give the real layout; `height_u`, `width_in` (10 for mini racks) and `max_kw` give the budgets. Template v1.3 adds an optional Rooms sheet and a `room` column for halls with more than one room.

## 5. Cables: start with what fails

You do not need every patch cord on day one. Start with power cables (they make the power answer exact) and uplinks (they make the network answer exact). One row per cable: `from_device`, `from_port`, `to_device`, `to_port`, `type`, `label`. A connection through a patch panel is two rows.

## 6. Readings: what your monitoring already knows

If a monitoring tool measures watts or temperatures, export them as time, item, metric, value into a Readings sheet. Loads and temperatures then come from your room instead of the model's typical values.

## 7. Checks to run before anyone trusts it

- **Duplicates:** the same name twice, the same serial twice.
- **Overlaps:** two devices claiming the same U in one rack (a device's height counts).
- **Single points of failure:** filter `power_cords` for A or B only; then look for AB devices whose PDUs are both on one feed.
- **Budgets:** devices per rack against the rack's `max_kw`; each PDU against 80 % of its rating, in normal operation and when the other feed is lost (the [rack power calculator](../../calculators/rack-power/) does the second one).

Importing the workbook into DC Sim runs these checks and more (port speeds, heat against cooling, phase balance, warranty ending within 12 months) and pins each one to its place in 3D.

## 8. Keep it current

Documentation is only worth its last update. Change the workbook with every move, add or change; keep it in one shared place; and re-check it after each change. In DC Sim a re-upload is an update: devices are matched by serial, then name, then rack and U, and you see exactly what changed before it is applied.
