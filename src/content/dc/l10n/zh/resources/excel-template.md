---
title: "免费数据中心 Excel 导入模板：机柜、供配电、布线"
description: "一个文件、十一个工作表，仅 Devices 为必填。导入后生成 3D 数字孪生，并执行供配电、相位、制冷、布线与网络检查。版本 1.4。"
h1: "可直接生成 3D 数字孪生的 Excel 导入模板"
navLabel: "Excel 导入模板"
directAnswer: "DC Sim 导入模板为一个 Excel 工作簿，包含十一个工作表：Devices（设备）、Cables（线缆）、Sites（站点）、Rooms（机房）、Racks（机柜）、Power（供配电）、Networks（网络）、Links（链路）、Cooling（制冷）、CustomDevices（自定义设备）与 Readings（监测数据）。仅 Devices 为必填，每行填写机柜、U 位与型号。每增加一个工作表，即可启用数字孪生的一个新图层。导入后即可得到机房 3D 视图，以及列出重叠、过载与单点故障的检查清单。"
section: "resources"
order: 1
ctaTop: true
faq: [{"q": "能否改用 CSV？", "a": "可以。每个工作表对应一个 CSV 文件，列与模板一致；导入程序支持逗号、分号与制表符分隔。"}, {"q": "表格列名与模板不一致时如何处理？", "a": "常见同义列名可自动识别；其他列名可在表头行中修改。列的顺序不影响导入。"}, {"q": "是否需要填写全部十一个工作表？", "a": "不需要。仅填写 Devices 即可生成 3D 机房与机柜功率；其他工作表可随数据完备逐步补充。"}, {"q": "我的文件是否会被保存？", "a": "导入在服务器端执行，仅读取数值并构建您的模型。如需删除模型与文件，请通知我们，我们将在 30 天内确认。详见“安全与数据”。"}, {"q": "模板是否会变更？", "a": "工作表名称与列名为固定约定，与 Homelab 版共用。后续可能新增可选列（如 1.1 版）；现有列名不会更改。"}]
clips:
  - { name: "excel-to-3d", title: "从 Excel 文件到 3D 数字孪生", caption: "Devices 与 Cables 工作表、导入、检查项在 3D 中定位标注，随后再次导入并查看变更清单（50 秒）。" }
---

## 各工作表对应的功能

| 工作表 | 必填列 | 可选列 | 启用功能 |
|---|---|---|---|
| **Devices**（设备，必填） | rack, u, model | name, role, height_u, power_cords (A/B/AB), serial, owner, warranty_end, runs | 3D 机柜，单机柜重量、功率与发热量，气流，可查看任意设备详情，保修到期提示 |
| Cables（线缆） | from_device, to_device, type | from_port, to_port, phase, media, speed, length_m, color, label, vlan, route | 支持链路追踪的布线视图，供配电图与网络图，端口检查 |
| Sites（站点） | site, lat, lon | city, country, timezone, role, provider, it_kw, pue | 全局视图（地球视图）：所有站点呈现在地球上（模板 v1.4） |
| Rooms（机房） | room | site, length_m, width_m, height_m, raised_floor_mm, lighting_w, timezone | 每个机房生成独立的数据大厅，机房尺寸与照明负荷（模板 v1.3；`site` 列于 v1.4 加入） |
| Racks（机柜） | rack, row, position | room, height_u, width_in, front_faces (A/B), max_kw | 真实机房布局，冷热通道，机柜功率预算 |
| Power（供配电） | name, type, rating | fed_from, feed, rack, voltage, phases, phase, runtime_min, battery_kwh, model | “A 路供电、某台 UPS 或某个断路器故障时会怎样”，过载检查 |
| Networks（网络） | vlan, name | purpose, subnet | 网络视图中的 VLAN 着色 |
| Links（链路） | site_a, site_b, type | bandwidth_gbps, latency_ms, utilization_pct, protected, carrier | 站点之间的广域网与线缆链路；可推演链路中断或站点失效（模板 v1.4） |
| Cooling（制冷） | name, type | capacity_kw, serves, model | 制冷量与发热量对比，“AC-1 停机时会怎样” |
| CustomDevices（自定义设备） | name, category | brand, model, height_u, width_in, depth_mm, weight_kg, psu_count, psu_w, idle_w, typical_w, max_w, airflow, inlet_max_c, ports | 设备库中没有的设备，可按名称复用（模板 v1.2） |
| Readings（监测数据） | time, item, metric, value | | 按真实机房数据校准模型；任何监控工具导出的 CSV 均可填入此表 |

## 1.0 版以来的变更

仅有新增内容，旧版文件仍可正常导入。

**版本 1.4：** 新增可选的 **Sites**（坐标、角色、服务商、IT kW、PUE）与 **Links**（站点间链路：类型、带宽、时延、利用率、是否有保护、运营商）工作表，以及 `Rooms.site` 列。二者用于绘制全局视图：所有站点呈现在同一地球上，链路以弧线表示，并支持跨站点场景推演（链路中断、站点失效）。导入报告将标出：缺少坐标的站点、指向未知站点的链路、低于物理下限的时延、承载复制流量但无保护的链路，以及超过 80 % 的利用率。

**版本 1.3：** 新增可选的 **Rooms** 工作表（尺寸、架空地板、照明负荷、时区），以及用于将机柜归入所属机房的 `Racks.room` 列；每个机房生成独立的数据大厅。

**版本 1.2：** 新增可选的 **CustomDevices** 工作表，用于录入设备库中没有的设备（品牌、型号、尺寸、功率、端口）。导入程序读取该表，模型也可导出回相同的工作表。

**版本 1.1：**

- **Cables：** 电源线新增 `phase` 列（L1、L2、L3）。
- **Power：** 新增 `phase`，UPS 行新增 `runtime_min` 与 `battery_kwh`；`type` 列可填写 `wall outlet`（墙面插座）。
- **Racks：** 新增 `width_in`（默认 19，迷你机柜填 10）。

作用：相位信息用于计算每个三相节点的分相负载并进行三相平衡检查（每相 80 %，不平衡度超过 15 % 时标出）；`runtime_min` 或 `battery_kwh` 设定的 UPS 后备时间优先于设备库默认值；`width_in` = 10 时绘制为 10 英寸迷你机柜（也可根据“Mini rack 2”之类的名称自动识别）。

**无 U 位的设备：** `u` 为空的行保留为机柜外设备，其 `rack` 值作为摆放位置，显示为开放式层架（例如 NOC 值班台上的一台交换机）。此类行不会被跳过。

## 导入处理流程

1. 表头匹配不区分大小写，并支持同义词（“U position”“Rack name”“Hostname”“Model number”）。
2. 型号文本与设备库依次进行精确匹配、别名匹配、型号代码匹配与模糊匹配。未知型号按您填写的高度显示为普通方块，并标记为“identify later”（待识别）。设备库的规格参数与目录价格公开可查，可在[设备数据](../../../devices/)中浏览。
3. 缺失的图层使用标记为 **assumed**（假定）的默认值（2N A/B 双路供电、按列交替的冷热通道、单一制冷区），并在报告中逐项列出，便于您确定需要替换的内容。
4. 带 3D 定位的检查清单：U 位重叠、机柜超重、PDU 或断路器负载超过 80 %、单电源或同路供电设备、发热量超过制冷能力、12 个月内保修到期、未知型号、线缆与端口问题。
5. 再次导入即执行更新。设备依次按序列号、名称、机柜与 U 位匹配；任何变更生效前均先列出变更清单。

**限制与安全：** 支持 XLSX 或 CSV/TSV（逗号、分号、制表符分隔；UTF-8、UTF-16、GBK 编码）。仅读取数值：不执行任何公式；拒绝启用宏的文件、加密文件与 ZIP 炸弹文件。单个文件上限 10 MB，每个工作表上限 50,000 行。错误行不会阻断导入，每条错误行均列出所在工作表、行号与原因。

## 首批导入经验

- 型号按厂商标注的写法填写即可；“R740xd”与“PowerEdge R740XD”均可匹配。
- 经过配线架的一条线缆记为两行；线缆的 `route` 可填写“in rack”（机柜内）、“overhead tray T2”（上走线架 T2）或“under floor”（地板下）。
- 如暂不逐条列出电源线，可在 Devices 中使用 `power_cords` 列（A、B 或 AB）。
- 将监控系统上周的传感器数据导出至 Readings，气流图层与供配电图层即按您的机房数据校准。
- 如不确定从何入手，可将[填写示例](/downloads/demo-hall.xlsx)与空白模板对照使用。
