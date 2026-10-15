---
title: "免费数据中心 Excel 模板：机柜、配电、布线"
description: "一个文件、十一个工作表，仅 Devices 必填。导入即得 3D 数字孪生，含配电、相位、制冷、布线和网络检查。版本 1.4。"
h1: "一份能变成 3D 数字孪生的 Excel 模板"
navLabel: "Excel 模板"
directAnswer: "DC Sim 模板是一个包含十一个工作表的 Excel 工作簿：Devices（设备）、Cables（线缆）、Sites（站点）、Rooms（机房）、Racks（机柜）、Power（配电）、Networks（网络）、Links（链路）、Cooling（制冷）、CustomDevices（自定义设备）和 Readings（读数）。只有 Devices 是必填的：每行填写机柜、U 位和型号。每多一个工作表，就解锁数字孪生的另一个图层。导入后，您会得到机房的 3D 视图，以及一份列出重叠、过载和单点故障的检查清单。"
section: "resources"
order: 1
ctaTop: true
faq: [{"q": "可以改用 CSV 吗？", "a": "可以：每个工作表一个 CSV，列与模板相同；导入器支持逗号、分号和制表符分隔。"}, {"q": "如果我的表格用的是不同的列名怎么办？", "a": "常见同义词都能识别；其他列名可以在表头行中改名。列的顺序无关紧要。"}, {"q": "九个工作表都需要吗？", "a": "不需要。仅 Devices 就能生成 3D 机房和机柜功率；有了数据再逐步添加其他工作表。"}, {"q": "我的文件会被保存吗？", "a": "导入在服务器上运行，只读取数值并构建您的模型。如需删除模型和文件，请告诉我们，我们会在 30 天内确认。详见“安全与数据”。"}, {"q": "模板会变吗？", "a": "工作表名称和列名是固定约定，与家庭实验室版共用。可能会新增可选列，如 1.1 版那样；现有列永远不会改名。"}]
clips:
  - { name: "excel-to-3d", title: "从 Excel 文件到 3D 数字孪生", caption: "Devices 和 Cables 工作表、导入、在 3D 中标注的检查项，然后重新上传并查看变更清单（48 秒）。" }
---

## 每个工作表解锁什么

| 工作表 | 必填列 | 可选列 | 解锁功能 |
|---|---|---|---|
| **Devices**（设备，必填） | rack, u, model | name, role, height_u, power_cords (A/B/AB), serial, owner, warranty_end, runs | 3D 机柜，每个机柜的重量、功率和发热，气流，可打开任意设备，保修到期标记 |
| Cables（线缆） | from_device, to_device, type | from_port, to_port, phase, media, speed, length_m, color, label, vlan, route | 带追踪功能的布线视图，电力图和网络图，端口检查 |
| Sites（站点） | site, lat, lon | city, country, timezone, role, provider, it_kw, pue | 全局视图：地球上的每个站点（模板 v1.4） |
| Rooms（机房） | room | site, length_m, width_m, height_m, raised_floor_mm, lighting_w, timezone | 每个机房生成一个独立大厅，机房尺寸和照明负荷（模板 v1.3；`site` 于 v1.4 加入） |
| Racks（机柜） | rack, row, position | room, height_u, width_in, front_faces (A/B), max_kw | 真实的机房布局，冷热通道，机柜功率预算 |
| Power（配电） | name, type, rating | fed_from, feed, rack, voltage, phases, phase, runtime_min, battery_kwh, model | “如果 A 路供电、某台 UPS 或某个断路器故障会怎样”，过载检查 |
| Networks（网络） | vlan, name | purpose, subnet | 网络视图中的 VLAN 颜色 |
| Links（链路） | site_a, site_b, type | bandwidth_gbps, latency_ms, utilization_pct, protected, carrier | 站点之间的广域网和线缆链路；切断一条链路或失去一个站点（模板 v1.4） |
| Cooling（制冷） | name, type | capacity_kw, serves, model | 制冷能力与发热量对比，“如果 AC-1 停机会怎样” |
| CustomDevices（自定义设备） | name, category | brand, model, height_u, width_in, depth_mm, weight_kg, psu_count, psu_w, idle_w, typical_w, max_w, airflow, inlet_max_c, ports | 设备目录中没有的设备，可按名称复用（模板 v1.2） |
| Readings（读数） | time, item, metric, value | | 模型按您的真实机房校准；任何监控工具导出的 CSV 都可以放在这里 |

## 自 1.0 版以来的变化

只有新增，因此旧文件仍可导入。

**版本 1.4：** 新增可选的 **Sites**（坐标、角色、服务商、IT kW、PUE）和 **Links**（站点之间的链路：类型、带宽、时延、利用率、是否有保护、运营商）工作表，以及 `Rooms.site`。它们用于绘制全局视图：所有站点在同一个地球上，链路显示为弧线，并可跨站点进行假设推演（切断一条链路、失去一个站点）。导入报告会标出：缺少坐标的站点、指向未知站点的链路、低于物理下限的时延、承载复制流量却没有保护的链路，以及利用率超过 80% 的情况。

**版本 1.3：** 可选的 **Rooms** 工作表（尺寸、架空地板、照明负荷、时区），以及用于把每个机柜放进所属机房的 `Racks.room`；每个机房成为一个独立大厅。

**版本 1.2：** 可选的 **CustomDevices** 工作表，用于设备目录中没有的设备（品牌、型号、尺寸、功率、端口）。导入器会读取它，模型也会导出回同样的工作表。

**版本 1.1：**

- **Cables：** 电源线新增 `phase`（L1、L2、L3）。
- **Power：** 新增 `phase`，UPS 行新增 `runtime_min` 和 `battery_kwh`；`type` 列可填 `wall outlet`（墙面插座）。
- **Racks：** 新增 `width_in`（默认 19，迷你机柜为 10）。

作用：相位信息为每个三相节点提供分相负载和三相平衡检查（每相 80%，不平衡度超过 15% 时标出）；`runtime_min` 或 `battery_kwh` 设定的 UPS 续航时间优先于设备目录中的值；`width_in` = 10 时绘制迷你机柜（也可从“Mini rack 2”这类名称推断）。

**没有 U 位的设备：** `u` 为空的行会作为机柜外的设备保留；其 `rack` 值成为位置，显示为开放式层架（例如放在 NOC 值班台上的一台交换机）。这类行绝不会被跳过。

## 导入时会发生什么

1. 表头匹配不区分大小写，并支持同义词（“U position”“Rack name”“Hostname”“Model number”）。
2. 型号文本与设备目录匹配（依次为精确匹配、别名、型号代码，最后是模糊匹配）。未知型号会按您填写的高度显示为普通方块，并标记为“identify later”（待识别）。设备目录的规格和标价是公开的：可在[设备数据](../../../devices/)中浏览。
3. 缺失的图层会使用标记为 **assumed**（假定）的默认值（2N A/B 双路供电、按列交替的冷热通道、单一制冷区），并在报告中列出，方便您知道哪些需要替换。
4. 一份带 3D 位置的检查清单：U 位重叠、机柜超重、PDU 或断路器负载超过 80%、单电源或同路供电的设备、发热量超过制冷能力、12 个月内保修到期、未知型号、线缆和端口问题。
5. 重新上传即更新。设备依次按序列号、名称、机柜和 U 位匹配；在应用任何更改之前，您会先看到一份变更清单。

**限制与安全：** 支持 XLSX 或 CSV/TSV（逗号、分号、制表符分隔；UTF-8、UTF-16、GBK 编码）。只读取数值：从不计算公式；拒绝启用宏的文件、加密文件和 ZIP 炸弹文件。单个文件上限 10 MB，每个工作表上限 50,000 行。错误行绝不会阻断导入；每一个错误行都会列出其所在工作表、行号和原因。

## 首批导入总结的经验

- 型号按厂商标注的写法填写即可；“R740xd”和“PowerEdge R740XD”都能匹配。
- 一条经过配线架的线缆写成两行；线缆的 `route` 可以填“in rack”（机柜内）、“overhead tray T2”（上走线桥架 T2）或“under floor”（地板下）。
- 如果暂时不想逐条列出电源线，可在 Devices 中使用 `power_cords`（A、B 或 AB）。
- 把监控系统中上周的传感器数据导出到 Readings，气流层和电力层就会按您的机房校准。
- 不知从何入手？把[填好的示例](/downloads/demo-hall.xlsx)和空白模板并排打开对照。
