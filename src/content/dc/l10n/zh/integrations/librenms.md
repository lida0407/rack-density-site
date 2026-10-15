---
title: "LibreNMS 3D 呈现：链路、传感器和端口 — DC Sim"
description: "计划中的 DC Sim LibreNMS 连接器：在 3D 数据中心数字孪生上，LLDP 链路变为线缆，PDU 和 UPS 传感器变为读数，端口计数器变为链路利用率。"
h1: "LibreNMS，以 3D 呈现"
navLabel: "LibreNMS"
directAnswer: "DC Sim 的 LibreNMS 连接器已在计划中。它将使用只读令牌通过 API 读取 LibreNMS，并把 LibreNMS 已经发现的内容放到 3D 数字孪生上：链路、电力传感器和端口流量。目前，LibreNMS 数据以导出文件的形式，通过模板工作表进入 DC Sim。"
section: "integrations"
order: 7.5
badge: "planned"
badgeNote: "下一个开发哪个连接器，由需求决定。"
faq: [{"q": "DC Sim 目前能连接 LibreNMS 吗？", "a": "不能直接连接。LibreNMS 连接器已在计划中。目前，您可以从 LibreNMS 导出设备和传感器数值，再通过模板工作表（Devices、Cables、Readings）导入。"}, {"q": "LibreNMS 连接器会映射哪些内容？", "a": "LLDP 邻居映射为线缆和网络层；PDU 和 UPS 上的 SNMP 传感器（负载、电流、续航时间、电池、电池供电状态）映射为电力层上的读数；端口计数器映射为网络视图中的链路利用率。"}, {"q": "它会修改 LibreNMS 中的任何内容吗？", "a": "不会。它将使用只读 API 令牌，不回写任何内容。LibreNMS 继续负责监控；DC Sim 补充机房视图、供电链路和假设推演。"}, {"q": "怎样才能更早用上？", "a": "在本页点击“我想要这个”并留下您的邮箱。连接器按需求的先后顺序开发，可以试用时我们会写信通知您。"}]
---

## 将会映射的内容

LibreNMS 已经发现了数字孪生所需的大部分信息，因此连接器主要负责把它们放到正确的位置：**LLDP 邻居**变为正确端口之间的线缆以及网络层的链路，这样拓扑和线缆追踪就来自交换机上报的数据，而不是手工整理的表格；**PDU 和 UPS 上的 SNMP 传感器**（负载、每个插座或每相的电流、续航时间、电池电量、电池供电状态）变为电力层中对应节点上的读数，您可以在那里让一台 UPS 故障，看看哪些设备会断电；**端口计数器**则变为网络视图中的链路利用率。设备将按主机名、sysName 或序列号与数字孪生匹配，任何未匹配的设备都会列出，供您一次性绑定。

## 目前

从 LibreNMS 导出，再通过[模板工作表](../../resources/excel-template/)导入：设备放入 Devices，链路放入 Cables，传感器数值放入 Readings。您会得到与任何 Excel 上传相同的导入报告和检查项，以及机房的 3D 视图。
