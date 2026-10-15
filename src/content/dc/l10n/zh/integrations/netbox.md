---
title: "NetBox 3D 视图：机柜和设备变成数字孪生 — DC Sim"
description: "用 URL 和只读令牌连接 NetBox，选择一个站点，即可把它的机柜、设备、线缆、供电回路和 VLAN 变成可做假设推演的 3D 数字孪生。"
h1: "NetBox，以 3D 呈现"
navLabel: "NetBox"
directAnswer: "DC Sim 使用只读令牌通过 NetBox API 读取一个 NetBox 站点，并将其转换为模板工作表：机柜、设备、线缆、供电回路和 VLAN。您会看到与 Excel 上传相同的导入报告和检查项，然后看到该站点的 3D 数字孪生，并可逐个节点模拟故障。NetBox 仍是您的唯一可信数据源；不会回写任何内容。"
section: "integrations"
order: 2
badge: "available"
badgeNote: "从 NetBox 导入：已在一套在线运行的 NetBox 4.7 演示实例（24 个站点）上完成端到端测试。双向同步和 NetBox 插件已列入路线图。"
shots:
  - { name: "replay", alt: "DC Sim 菜单在一台制冷单元的 3D 视图上方展开，其中的菜单项为“Connect NetBox or Zabbix: inventory, readings and alarms”（连接 NetBox 或 Zabbix：资产、读数和告警）。", caption: "从 ⋯ 菜单连接 NetBox 或 Zabbix。" }
faq: [{"q": "支持哪些 NetBox 版本？", "a": "通过 REST API 支持 NetBox 3.x 和 4.x。已在 NetBox 4.7 上测试，新旧两种令牌格式均已验证。"}, {"q": "需要什么凭据？", "a": "一个具有只读权限用户的 NetBox API 令牌。令牌只发送给 NetBox，绝不会在浏览器中显示，也不会保存在报告中。"}, {"q": "它会修改 NetBox 中的任何内容吗？", "a": "不会，它只读取。把设计作为规划对象推送回 NetBox 已列入路线图，并且需要您主动开启。"}, {"q": "我的 NetBox 里有很多站点，会怎样？", "a": "测试会按规模从大到小列出各站点及其机柜和设备数量。您一次导入一个站点，因为整个站点群并不是一个机房。"}, {"q": "还能改用 CSV 导出吗？", "a": "可以。NetBox 自带的 CSV 导出同样可以映射到模板工作表；表头名称会按同义词匹配。"}]
---

## 您将获得

- **平面层：** 站点的每个机柜都位于其所在的列中，显示已用 U 位，以及功率（kW）与机柜功率预算的对比。导入检查清单还会补充 NetBox 没有建模的内容：机柜超重、PDU 或断路器负载超过 80%、单电源或双电源接在同一路供电的设备、三相平衡。
- **电力层：** 配电柜、供电回路和 PDU 组成单线图，A、B 两路以不同颜色区分。点击一条供电回路，按 **Fail**（模拟故障），即可看到哪些机柜断电、哪些服务停止。
- **布线层和网络层：** NetBox 中的线缆在 3D 中经由机柜后部理线器、走线桥架或地板下布放；可追踪任意一条线缆。网络拓扑由同一批线缆生成；让一台交换机故障，就能看到谁失去了所有路径。

## 如何连接

1. 在 NetBox 中，为一个具有**只读**权限的用户创建 API 令牌。
2. 在 DC Sim 中打开 **⋯ → Connect NetBox or Zabbix**（连接 NetBox 或 Zabbix），选择 NetBox，粘贴 URL 和令牌，按 **Test**（测试）。测试会显示 NetBox 版本，并按规模从大到小列出每个站点及其机柜和设备。
3. 选择**站点**。**Preview**（预览）会以模板工作表（Racks、Devices、Cables、Power、Networks）的形式展示该站点，并附上与 Excel 上传相同的导入报告和检查项。
4. **Import**（导入）。之后重新同步时，在应用任何更改之前，您会先看到一份变更清单。

在您自己的网络内，同一个连接器运行在 DC Sim 代理程序中，该代理程序只主动向外连接。

## 我们读取的内容

| NetBox | DC Sim 模板 | 说明 |
|---|---|---|
| 机柜：名称、位置、高度、宽度 | Racks: rack, row, height_u, width_in | 位置变为列（row）；宽度为 10 时绘制迷你机柜 |
| 设备：名称、机柜、位置、设备类型、角色、序列号、租户 | Devices: name, rack, u, model, role, serial, owner | 设备类型与设备目录匹配；没有机柜的设备作为未上架设备保留在其所在位置；刀片随所属机箱一起导入 |
| 自定义字段 `warranty_end`、`runs` | Devices: warranty_end, runs | 如果您保留了这些字段 |
| 配电柜和供电回路（主用、冗余） | Power：配电柜，每路供电对应断路器，分 A、B 两路 | 未设额定值的供电回路会在报告中标出 |
| PDU 及插座的供电相（feed leg） | Power 行，由线缆连接的供电回路供电；Cables: phase | 分相负载与三相平衡 |
| 线缆：两端、类型、长度及单位、颜色、标签 | Cables：起止设备与端口、type、media、length_m、color、label | 长度换算为米；运营商线路不导入，单独列出 |
| VLAN 和前缀 | Networks: vlan, name, purpose, subnet | |

社区维护的 NetBox 设备类型库采用 CC0 许可，正在被加入 DC Sim 设备目录，因此越来越多的设备类型能对应到真实的 U 高、重量和功耗；未匹配的设备会显示为一个普通方块，并标记为“identify later”（待识别）。

## 后续计划

| 事项 | 状态 |
|---|---|
| 从 NetBox 读取接口速率（目前：根据端口名称和设备目录推断） | <span class="badge badge-roadmap">路线图</span> |
| 双向同步：把 DC Sim 设计作为规划对象推送回 NetBox | <span class="badge badge-roadmap">路线图</span> |
| NetBox 插件：在机柜或设备上提供“Open in DC Sim”（在 DC Sim 中打开） | <span class="badge badge-roadmap">路线图</span> |

## 无需入站连接

对于部署在您网络内的 NetBox，连接器运行在一个小型代理程序中，它只通过一条 WebSocket 主动向外连接，从不监听任何端口；如果连接中断，数据批次会缓存到磁盘并按顺序重放。令牌保存在代理程序的配置中。DC Sim 从不向 NetBox 写入任何内容。
