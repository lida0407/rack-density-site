---
title: "LibreNMS 3D 呈现：链路、传感器与端口 — DC Sim"
description: "DC Sim 计划中的 LibreNMS 对接：在 3D 数据中心数字孪生上，LLDP 链路映射为线缆，PDU 与 UPS 传感器映射为监测数据，端口计数器映射为链路利用率。"
h1: "LibreNMS 的 3D 呈现"
navLabel: "LibreNMS"
directAnswer: "DC Sim 的 LibreNMS 对接处于计划中。该对接将使用只读令牌，通过 LibreNMS API 读取数据，并将 LibreNMS 已自动发现的链路、电力传感器与端口流量呈现在 3D 数字孪生上。目前，LibreNMS 数据需先导出并填入导入模板工作表，再导入 DC Sim。"
section: "integrations"
order: 7.5
badge: "planned"
badgeNote: "下一项对接的开发顺序由用户需求决定。"
faq: [{"q": "DC Sim 目前能否对接 LibreNMS？", "a": "目前不支持直接对接，LibreNMS 对接处于计划中。现阶段可从 LibreNMS 导出设备与传感器数值，通过导入模板工作表（Devices、Cables、Readings）导入。"}, {"q": "LibreNMS 对接将映射哪些数据？", "a": "LLDP 邻居映射为线缆及网络图层；PDU 与 UPS 上的 SNMP 传感器（负载、电流、后备时间、电池、电池供电状态）映射为供配电图层上的监测数据；端口计数器映射为网络视图中的链路利用率。"}, {"q": "是否会修改 LibreNMS 中的数据？", "a": "不会。该对接将使用只读 API 令牌，不回写任何数据。LibreNMS 继续承担监控职能；DC Sim 在此之上提供机房视图、供配电链路与场景推演。"}, {"q": "如何尽早使用？", "a": "请点击本页的“申请优先体验”按钮并留下电子邮箱。各项对接按用户提出需求的先后顺序开发，可供试用时我们将邮件通知您。"}]
---

## 计划映射的数据

LibreNMS 已自动发现数字孪生所需的大部分数据，对接的主要工作是将这些数据放到正确位置。**LLDP 邻居**映射为对应端口之间的线缆及网络图层中的链路，拓扑与链路追踪因此基于交换机上报的数据，而非人工整理的表格。**PDU 与 UPS 上的 SNMP 传感器**（负载、单个插座或单相电流、后备时间、电池电量、电池供电状态）映射为供配电图层中对应节点的监测数据，可在此将 UPS 设为故障，查看哪些设备失电。**端口计数器**映射为网络视图中的链路利用率。设备将按主机名、sysName 或序列号与数字孪生匹配，未匹配的设备将单独列出，由您一次性完成绑定。

## 现阶段方案

从 LibreNMS 导出数据，通过[导入模板工作表](../../resources/excel-template/)导入：设备填入 Devices，链路填入 Cables，传感器数值填入 Readings。导入报告与检查项与常规 Excel 导入一致，并生成机房 3D 视图。
