// Hub home copy (/, /de/, /zh/). English is the source; de/zh may leave keys out (English fallback + note).
import { PRODUCT_NAME as P, DC_PRODUCT_NAME as D, BRAND } from '../../config/brand';
import type { Deep } from '../config';

export const en = {
  title: `3D Rack Twins for Homelab & Data Center | ${BRAND}`,
  description: `3D twins of your racks from the spreadsheet you already keep: ${P} for the homelab, ${D} for the data center. Plus a free rack density calculator.`,
  status: 'Free · runs in your browser · no data leaves it',
  h1: "See your racks: what they draw, what's plugged where, what fails.",
  lead: 'Free tools and 3D twins built from the spreadsheet you already keep. One for the rack in your basement, one for the data hall.',
  homelab: {
    eyebrow: 'For the homelab',
    body: "Your homelab rack, in 3D. Watts and cost per device, what's plugged where, and what goes dark when one thing fails. Try it free when we open the doors: no account, nothing stored.",
    go: `Explore ${P} →`, badge: 'See it · walkthrough',
  },
  dc: {
    eyebrow: 'For the data center', h2: D,
    body: 'Turn one Excel file into a 3D twin of your data center. Fail any UPS, feed, switch or cooler and see what goes dark. Built to sit on top of the monitoring you run.',
    go: `Explore ${D} →`,
  },
  teaser: {
    eyebrow: 'Free tool · Rack Density Calculator', h2: 'How many devices fit before space, power or cooling runs out?',
    body: 'Pick a rack, set the watts and the circuit, and watch the rack fill up: devices per rack, kW, cost per month and the bottleneck.',
    open: 'Open the calculator →',
  },
};

export const de: Deep<typeof en> = {
  title: `Racks in 3D planen: Homelab und Rechenzentrum | ${BRAND}`,
  description: `Digitale Zwillinge Ihrer Racks in 3D aus Ihrer Excel-Liste: ${P} für das Homelab, ${D} für das Rechenzentrum. Dazu ein kostenloser Rack-Rechner.`,
  status: 'Kostenlos · läuft im Browser · keine Daten verlassen den Browser',
  h1: 'Sehen Sie Ihre Racks: was sie verbrauchen, was wo steckt, was ausfällt.',
  lead: 'Kostenlose Werkzeuge und 3D-Zwillinge aus der Tabelle, die Sie ohnehin führen. Einer für das Rack im Keller, einer für den Rechenzentrumssaal.',
  homelab: {
    eyebrow: 'Für das Homelab',
    body: 'Ihr Homelab-Rack in 3D. Watt und Kosten pro Gerät, was wo eingesteckt ist und was dunkel wird, wenn ein Teil ausfällt. Kostenlos testen, sobald wir öffnen: kein Konto, nichts wird gespeichert.',
    go: `${P} entdecken →`, badge: 'Ansehen · Vorführung',
  },
  dc: {
    eyebrow: 'Für das Rechenzentrum', h2: D,
    body: 'Aus einer Excel-Datei wird ein 3D-Zwilling Ihres Rechenzentrums. Lassen Sie eine USV, eine Einspeisung, einen Switch oder ein Kühlgerät ausfallen und sehen Sie, was dunkel wird. Setzt auf dem Monitoring auf, das Sie bereits betreiben.',
    go: `${D} entdecken →`,
  },
  teaser: {
    eyebrow: 'Kostenloses Werkzeug · Rack-Rechner', h2: 'Wie viele Geräte passen ins Rack, bevor Platz, Strom oder Kühlung ausgehen?',
    body: 'Wählen Sie ein Rack, geben Sie Leistung und Stromkreis ein und sehen Sie zu, wie es sich füllt: Geräte pro Rack, kW, Kosten pro Monat und der Engpass.',
    open: 'Zum Rechner →',
  },
};

export const zh: Deep<typeof en> = {
  title: `机柜 3D 规划与数字孪生：Homelab 与数据中心 | ${BRAND}`,
  description: `基于现有的 Excel/CSV 设备清单生成机柜 3D 视图与数字孪生：${P} 面向 Homelab（家庭机房），${D} 面向数据中心。另提供免费的机架功率密度计算器。`,
  status: '免费 · 在浏览器本地运行 · 数据不上传、不存储',
  h1: '看清您的机柜：功耗、连接与故障影响。',
  lead: '基于您现有的设备清单，提供免费工具与 3D 数字孪生：一款面向家庭机房，一款面向数据中心机房。',
  homelab: {
    eyebrow: '面向 Homelab',
    body: '以 3D 呈现您的 Homelab 机柜：每台设备的功耗与电费、线缆连接关系，以及单台设备故障时的影响范围。免费试用开放后无需注册账户，不存储任何数据。',
    go: `了解 ${P} →`, badge: '观看演示 · 预约演示',
  },
  dc: {
    eyebrow: '面向数据中心', h2: `${D} 数据中心仿真`,
    body: '由一份 Excel 清单生成数据中心 3D 数字孪生。可对任意 UPS、供电回路、交换机或空调进行故障推演，查看受影响的设备。可与现有监控系统对接使用。',
    go: `了解 ${D} →`,
  },
  teaser: {
    eyebrow: '免费工具 · 机架功率密度计算器', h2: '在空间、供电或制冷达到上限之前，一个机柜可容纳多少台设备？',
    body: '选择机柜规格，输入设备功耗与供电回路，即可查看机柜装配情况：单机柜设备数、负载功率（kW）、每月电费及瓶颈所在。',
    open: '打开计算器 →',
  },
};
