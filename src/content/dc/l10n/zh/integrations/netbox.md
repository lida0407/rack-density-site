---
title: "NetBox 3D 视图：机柜与设备数字孪生 — DC Sim"
description: "通过 URL 与只读令牌对接 NetBox，选择站点后，即可将其机柜、设备、线缆、供电回路与 VLAN 生成可开展场景推演的 3D 数字孪生。"
h1: "NetBox 的 3D 呈现"
navLabel: "NetBox"
directAnswer: "DC Sim 使用只读令牌，通过 NetBox API 读取指定站点，并将其转换为导入模板的各工作表：机柜、设备、线缆、供电回路与 VLAN。导入报告与检查项与 Excel 导入一致；完成后，站点以 3D 数字孪生呈现，可逐个节点开展故障推演。NetBox 仍是唯一可信数据源，DC Sim 不回写任何数据。"
section: "integrations"
order: 2
badge: "available"
badgeNote: "NetBox 导入：已在运行中的 NetBox 4.7 演示实例（24 个站点）上完成端到端测试。双向同步与 NetBox 插件已列入路线图。"
shots:
  - { name: "replay", alt: "DC Sim 菜单在一台精密空调的 3D 视图上方展开，其中的菜单项为 Connect NetBox or Zabbix: inventory, readings and alarms（对接 NetBox 或 Zabbix：资产、监测数据与告警）。", caption: "通过 ⋯ 菜单对接 NetBox 或 Zabbix。" }
faq: [{"q": "支持哪些 NetBox 版本？", "a": "通过 REST API 支持 NetBox 3.x 与 4.x。已在 NetBox 4.7 上完成测试，新旧两种令牌格式均已验证。"}, {"q": "需要哪些访问凭据？", "a": "具备只读权限用户的 NetBox API 令牌。令牌仅发送至 NetBox，不会在浏览器中显示，也不会写入任何报告。"}, {"q": "是否会修改 NetBox 中的数据？", "a": "不会，DC Sim 仅执行读取。将设计以规划（planned）状态对象推送回 NetBox 已列入路线图，届时需由用户主动启用。"}, {"q": "NetBox 中有多个站点时如何处理？", "a": "测试连接后，系统按规模从大到小列出各站点及其机柜与设备数量。每次导入一个站点，因为全部站点合在一起并不构成一个机房。"}, {"q": "能否改用 CSV 导出？", "a": "可以。NetBox 自带的 CSV 导出同样可映射到导入模板各工作表，表头名称支持同义词匹配。"}]
---

## 主要能力

- **平面图层（Floor）：** 站点内每个机柜按所在列排布，显示已用 U 位，以及功率（kW）与机柜功率预算的对比。导入检查清单补充 NetBox 未建模的内容：机柜超重、PDU 或断路器负载超过 80 %、单电源或同路供电设备、三相平衡。
- **供配电图层（Power）：** 配电柜、供电回路与 PDU 生成配电单线图，A 路与 B 路以不同颜色区分。选中一路供电，点击 **Fail**（模拟故障），即可查看哪些机柜失电、哪些业务中断。
- **布线图层（Cabling）与网络图层（Network）：** NetBox 中的线缆在 3D 中经机柜后部理线器、走线架或地板下敷设，任一线缆均可进行链路追踪。网络拓扑由同一套线缆数据生成；将一台交换机设为故障，即可查看哪些设备失去全部通路。

## 对接步骤

1. 在 NetBox 中，为具备**只读**权限的用户创建 API 令牌。
2. 在 DC Sim 中打开 **⋯ → Connect NetBox or Zabbix**（对接 NetBox 或 Zabbix），选择 NetBox，填入 URL 与令牌，点击 **Test**（测试连接）。测试结果显示 NetBox 版本，并按规模从大到小列出全部站点及其机柜与设备。
3. 选择**站点**。**Preview**（预览）以导入模板工作表（Racks、Devices、Cables、Power、Networks）的形式展示该站点数据，导入报告与检查项与 Excel 导入一致。
4. **Import**（导入）。后续重新同步时，任何变更生效前均先列出变更清单。

NetBox 部署在内网时，同一对接功能运行于 DC Sim 采集代理（Agent）中，该代理仅发起出站连接。

## 读取的数据

| NetBox | DC Sim 导入模板 | 说明 |
|---|---|---|
| 机柜：名称、位置、高度、宽度 | Racks: rack, row, height_u, width_in | 位置（location）映射为列（row）；宽度为 10 时绘制为 10 英寸迷你机柜 |
| 设备：名称、机柜、U 位、设备类型、角色、序列号、租户 | Devices: name, rack, u, model, role, serial, owner | 设备类型与设备库匹配；未分配机柜的设备作为未上架设备保留在其所在位置；刀片随所属机箱一并导入 |
| 自定义字段 `warranty_end`、`runs` | Devices: warranty_end, runs | 如您维护了这些字段 |
| 配电柜与供电回路（主用、冗余） | Power：配电柜，每路供电配断路器，分 A 路与 B 路 | 未设置额定值的供电回路在报告中标出 |
| PDU 及插座供电相（feed leg） | Power 行，由已连线的供电回路供电；Cables: phase | 分相负载与三相平衡 |
| 线缆：两端、类型、长度及单位、颜色、标签 | Cables：起止设备与端口、type、media、length_m、color、label | 长度统一换算为米；运营商线路（circuit）不导入，单独列出 |
| VLAN 与 IP 前缀 | Networks: vlan, name, purpose, subnet | |

NetBox 社区设备类型库（device-type library）采用 CC0 协议发布，正逐步并入 DC Sim 设备库，可解析出真实 U 高、重量与功耗的设备类型将持续增加；未匹配的设备显示为普通方块，并标记为“identify later”（待识别）。

## 后续规划

| 事项 | 状态 |
|---|---|
| 从 NetBox 读取接口速率（当前：根据端口名称与设备库推断） | <span class="badge badge-roadmap">路线图</span> |
| 双向同步：将 DC Sim 设计以规划状态对象推送回 NetBox | <span class="badge badge-roadmap">路线图</span> |
| NetBox 插件：在机柜或设备页面提供“Open in DC Sim”（在 DC Sim 中打开） | <span class="badge badge-roadmap">路线图</span> |

## 无需入站连接

对于部署在内网的 NetBox，对接功能运行于轻量级采集代理中。采集代理通过一条 WebSocket 连接主动出站，不监听任何端口；链路中断时，数据批次缓存至本地磁盘，恢复后按顺序补传。令牌仅保存在采集代理配置中。DC Sim 不向 NetBox 写入任何数据。
