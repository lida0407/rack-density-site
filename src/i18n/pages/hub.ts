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
  title: `机柜 3D 规划与数字孪生：homelab 和数据中心 | ${BRAND}`,
  description: `用现有的 Excel 机柜清单生成 3D 机柜和数字孪生：${P} 面向 homelab（家庭实验室），${D} 面向数据中心。另有免费的机柜功率密度计算器。`,
  status: '免费 · 在浏览器中运行 · 数据不离开浏览器',
  h1: '看清您的机柜：耗电多少、线插在哪里、什么会出故障。',
  lead: '免费工具和 3D 孪生，直接用您手头的表格生成。一个面向家里的机柜，一个面向数据中心机房。',
  homelab: {
    eyebrow: '面向 homelab',
    body: '您的 homelab 机柜，3D 呈现。每台设备的功耗和电费、每根线插在哪里，以及一处故障会让哪些设备断电断网。开放后可免费试用：无需账号，不存储任何数据。',
    go: `了解 ${P} →`, badge: '观看演示 · 预约讲解',
  },
  dc: {
    eyebrow: '面向数据中心', h2: `${D} 数据中心仿真`,
    body: '一个 Excel 文件，生成数据中心的 3D 孪生。让任意 UPS、供电回路、交换机或空调故障，看哪些设备受影响。可叠加在您现有的监控系统之上。',
    go: `了解 ${D} →`,
  },
  teaser: {
    eyebrow: '免费工具 · 机柜功率密度计算器', h2: '在空间、供电或制冷耗尽之前，一个机柜能放多少台设备？',
    body: '选择机柜，填入功耗和供电回路，看着机柜逐步装满：每柜设备数、kW、每月电费，以及瓶颈所在。',
    open: '打开计算器 →',
  },
};
