// Hub home copy (/, /de/, /zh/). English is the source; de/zh may leave keys out (English fallback + note).
import { PRODUCT_NAME as P, DC_PRODUCT_NAME as D, BRAND } from '../../config/brand';
import { TRIAL } from '../../config/trial.mjs';
import type { Deep } from '../config';

export const en = {
  title: `3D Rack Twins for Homelab & Data Center | ${BRAND}`,
  description: `3D twins of your racks from the spreadsheet you already keep: ${P} for the homelab, ${D} for the data center. Plus a free rack density calculator.`,
  status: 'Free · runs in your browser · no data leaves it',
  /** Hero badge + CTA to /try/ (TRY-SIGNUP.md §10), shown once the trial is built (preview, then go-live) */
  freePlay: { badge: 'FREE PLAY', cta: 'Your own spreadsheet, 60 minutes', ctaShort: 'Your sheet, 60 min' },
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
  /** Split-flap opening (src/components/hub/FlapHome.astro). Board numbers come from the calculator and the device data;
   *  {u} {w} {rack} {a} {v} {space} {cool}: the 42U preset and the circuit; {n} {priced}: devices; {learn}: guides. */
  flap: {
    city: 'Warsaw', board: 'Board {i} of {n}',
    b1: { status: 'Now boarding · free tools, no sign-up', statusTrial: `Now boarding · free play, ${TRIAL.minutes} minutes` },
    b2: {
      caption: '{u}U servers at {w} W fit in a {rack}U rack on one {a} A, {v} V circuit. Power runs out first: space alone would take {space}, cooling {cool}.',
      link: 'Run the Rack Density Calculator →', status: 'Delayed · power is the bottleneck',
    },
    b3: {
      caption: 'devices in the open device database, from mini PCs to UPSes and CDUs: watts, size and ports, dated list prices for {priced}, and the sources for every record. CSV, CC BY 4.0.',
      link: 'Browse the device database →', status: 'On time · CC BY 4.0',
    },
    reveal: ['WHAT GOES', 'DARK WHEN', 'IT FAILS?'], revealText: 'What goes dark when it fails?', button: 'See all departures',
    departures: {
      h2: 'Departures', small: 'free tools and two 3D twins', cols: ['No.', 'Destination', 'Remarks', 'Gate'],
      tryLabel: 'Try it once', gates: { board: 'Board →', run: 'Run →', open: 'Open →' },
      remarks: {
        '/try': `Free play: your own spreadsheet, ${TRIAL.minutes} minutes, nothing saved`,
        '/homelab': 'Your homelab rack in 3D: watts and cost per device, cables, what fails',
        '/dc': 'One Excel file becomes a 3D twin of your data hall; fail a UPS, feed or cooler',
        '/calculator': 'Devices per rack by space, power and cooling; kW and cost per month',
        '/calculator/ups-runtime': 'Minutes on battery for your load, and the smallest UPS that carries it',
        '/devices': '{n} devices: watts, size, ports, prices and sources. CSV, CC BY 4.0',
        '/homelab/learn': '{learn} guides: homelab power, UPS sizing, rack layout, tokens per watt',
      },
    },
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
  freePlay: { badge: 'KOSTENLOS TESTEN', cta: 'Ihre eigene Tabelle, 60 Minuten', ctaShort: 'Eigene Tabelle, 60 Min.' },
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
  flap: {
    city: 'Warschau', board: 'Tafel {i} von {n}',
    b1: { status: 'Jetzt einsteigen · kostenlose Werkzeuge, ohne Anmeldung', statusTrial: `Jetzt einsteigen · kostenlos testen, ${TRIAL.minutes} Minuten` },
    b2: {
      caption: '{u}-HE-Server mit je {w} W passen in ein {rack}-HE-Rack an einem Stromkreis mit {a} A und {v} V. Zuerst geht der Strom aus: Nach Platz wären es {space}, nach Kühlung {cool}.',
      link: 'Zum Rack-Rechner →', status: 'Verspätet · Strom ist der Engpass',
    },
    b3: {
      caption: 'Geräte in der offenen Gerätedatenbank, vom Mini-PC bis zu USV und CDU: Watt, Maße und Ports, datierte Listenpreise für {priced} und die Quellen zu jedem Eintrag. CSV, CC BY 4.0.',
      link: 'Zur Gerätedatenbank →', status: 'Pünktlich · CC BY 4.0',
    },
    reveal: ['WAS WIRD', 'BEI AUSFALL', 'DUNKEL?'], revealText: 'Was wird bei einem Ausfall dunkel?', button: 'Alle Abfahrten',
    departures: {
      h2: 'Abfahrten', small: 'kostenlose Werkzeuge und zwei 3D-Zwillinge', cols: ['Nr.', 'Ziel', 'Hinweise', 'Gleis'],
      tryLabel: 'Einmal testen', gates: { board: 'Einsteigen →', run: 'Starten →', open: 'Öffnen →' },
      remarks: {
        '/try': `Kostenlos testen: Ihre eigene Tabelle, ${TRIAL.minutes} Minuten, nichts wird gespeichert`,
        '/homelab': 'Ihr Homelab-Rack in 3D: Watt und Kosten pro Gerät, Kabel, was ausfällt',
        '/dc': 'Aus einer Excel-Datei wird ein 3D-Zwilling Ihres Saals; USV, Einspeisung oder Kühlung ausfallen lassen',
        '/calculator': 'Geräte pro Rack nach Platz, Strom und Kühlung; kW und Kosten pro Monat',
        '/calculator/ups-runtime': 'Minuten auf Batterie für Ihre Last und die kleinste USV, die sie trägt',
        '/devices': '{n} Geräte: Watt, Maße, Ports, Preise und Quellen. CSV, CC BY 4.0',
        '/homelab/learn': '{learn} Leitfäden (auf Englisch): Homelab-Strom, USV-Größe, Rack-Aufbau, Tokens pro Watt',
      },
    },
  },
  teaser: {
    eyebrow: 'Kostenloses Werkzeug · Rack-Rechner', h2: 'Wie viele Geräte passen ins Rack, bevor Platz, Strom oder Kühlung ausgehen?',
    body: 'Wählen Sie ein Rack, geben Sie Leistung und Stromkreis ein und sehen Sie zu, wie es sich füllt: Geräte pro Rack, kW, Kosten pro Monat und der Engpass.',
    open: 'Zum Rechner →',
  },
};

export const zh: Deep<typeof en> = {
  title: `机柜 3D 规划与数字孪生：Homelab 与数据中心 | ${BRAND}`,
  description: `基于现有的 Excel/CSV 设备清单生成机柜 3D 视图与数字孪生：${P} 面向 Homelab（家庭机房），${D} 面向数据中心。另提供免费的单机柜功率密度计算器。`,
  status: '免费 · 在浏览器本地运行 · 数据不上传、不存储',
  freePlay: { badge: '免费试玩', cta: '使用您自己的清单，60 分钟', ctaShort: '自有清单，60 分钟' },
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
  flap: {
    city: '华沙', board: '看板 {i}/{n}',
    b1: { status: '正在登机 · 免费工具，无需注册', statusTrial: `正在登机 · 免费试玩 ${TRIAL.minutes} 分钟` },
    b2: {
      caption: '台 {u}U、每台 {w} W 的服务器可装入一个 {rack}U 机柜，使用一路 {a} A / {v} V 供电回路。最先达到上限的是供电：仅按空间可装 {space} 台，按制冷可装 {cool} 台。',
      link: '打开单机柜功率密度计算器 →', status: '延误 · 瓶颈在供电',
    },
    b3: {
      caption: '台设备收录于开放设备库，从迷你主机到 UPS 和 CDU：功耗、尺寸与端口，其中 {priced} 台附带注明日期的标价，每条记录均注明来源。CSV 格式，CC BY 4.0 许可。',
      link: '浏览设备库 →', status: '准点 · CC BY 4.0',
    },
    reveal: ['一处故障', '哪些设备', '受影响？'], revealText: '一处故障，哪些设备受影响？', button: '查看全部班次',
    departures: {
      h2: '出发班次', small: '免费工具与两款 3D 数字孪生', cols: ['编号', '目的地', '说明', '登机口'],
      tryLabel: '免费试玩', gates: { board: '登机 →', run: '运行 →', open: '打开 →' },
      remarks: {
        '/try': `免费试玩：使用您自己的清单，${TRIAL.minutes} 分钟，不保存任何数据`,
        '/homelab': '以 3D 呈现您的 Homelab 机柜：每台设备的功耗与电费、线缆、故障影响',
        '/dc': '由一份 Excel 清单生成数据中心机房 3D 数字孪生；推演 UPS、供电回路或空调故障',
        '/calculator': '按空间、供电和制冷计算单机柜设备数；负载功率（kW）与每月电费',
        '/calculator/ups-runtime': '按负载计算电池后备分钟数，以及可承载该负载的最小 UPS',
        '/devices': '{n} 台设备：功耗、尺寸、端口、标价与来源。CSV 格式，CC BY 4.0',
        '/homelab/learn': '{learn} 篇指南（英文）：Homelab 功耗、UPS 选型、机柜布局、每瓦 token 数',
      },
    },
  },
  teaser: {
    eyebrow: '免费工具 · 单机柜功率密度计算器', h2: '在空间、供电或制冷达到上限之前，一个机柜可容纳多少台设备？',
    body: '选择机柜规格，输入设备功耗与供电回路，即可查看机柜装配情况：单机柜设备数、负载功率（kW）、每月电费及瓶颈所在。',
    open: '打开计算器 →',
  },
};

/** Trial builds (TRY-SIGNUP.md §10): play-only wording instead of "when we open the doors". */
export const trial: Partial<Record<'en' | 'de' | 'zh', Deep<typeof en>>> = {
  en: { homelab: { body: `Your homelab rack, in 3D. Watts and cost per device, what's plugged where, and what goes dark when one thing fails. Free play now: your own spreadsheet, ${TRIAL.minutes} minutes, nothing saved.`, badge: `Free play · ${TRIAL.minutes} minutes` } },
  de: { homelab: { body: `Ihr Homelab-Rack in 3D. Watt und Kosten pro Gerät, was wo eingesteckt ist und was dunkel wird, wenn ein Teil ausfällt. Jetzt kostenlos testen: Ihre eigene Tabelle, ${TRIAL.minutes} Minuten, nichts wird gespeichert.`, badge: `Kostenlos testen · ${TRIAL.minutes} Minuten` } },
  zh: { homelab: { body: `以 3D 呈现您的 Homelab 机柜：每台设备的功耗与电费、线缆连接关系，以及单台设备故障时的影响范围。现已开放免费试玩：使用您自己的清单，${TRIAL.minutes} 分钟，不保存任何数据。`, badge: `免费试玩 · ${TRIAL.minutes} 分钟` } },
};
