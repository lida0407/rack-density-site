// /homelab/try/ ("See it") copy in en, de, zh. No public demo: clips, stills and a walkthrough. The clips are English.
import { PRODUCT_NAME as P, PRICES } from '../../config/brand';
import { tryFaq } from '../../data/faq';
import { VIDEOS } from '../../data/videos';
import type { Deep } from '../config';
const A = PRICES.account;

export const en = {
  title: `See ${P}: Clips, Stills and a Walkthrough`,
  description: `Watch ${P} in action: the demo lab in 3D, the power and network diagrams, a Fail what-if and lights-off mode. Request a walkthrough.`,
  crumb: 'See it',
  eyebrow: 'See it · demo lab · simulated data', h1: `See ${P}`,
  lead: "The app isn't open to the public yet. Watch it here, or book a short walkthrough and we show it to you on a call.",
  join: 'Join the waitlist', notify: 'E-mail me when Try opens', langNote: '',
  /** html */
  banner: `When Try opens: nothing is saved, close the tab and it's gone. <b>$${A.month}/month keeps it.</b>`,
  tour: {
    label: 'Tour', meta: '· Overview → Power → Network → Fail · 28 s',
    aria: 'Screen recording of the demo lab: Overview, the View menu, Power in 3D and as a diagram, Network in 3D and as a diagram, then a Fail what-if on the aggregation switch',
    caption: 'Search a device, open it, press Fail: the network diagram shows everything that loses connectivity.', transcript: VIDEOS.tour.transcript,
  },
  lights: {
    label: 'Lights off', meta: '· animated share · 8 s loop',
    aria: 'The demo lab with the room lights off: device LEDs blink and power and network flows run between the racks',
    caption: 'Lights off saves an estimated 145 W, about €34 a month, in the demo lab. Every lab can export this as a GIF or a video.', transcript: VIDEOS.lightsOff.transcript,
  },
  stills: {
    eyebrow: 'Stills',
    shots: [
      { label: 'Overview', alt: 'The demo lab in 3D with the lights off: two racks, device labels, the readout at the top' },
      { label: 'Flaw Finder', alt: 'Flaw Finder: the UPS is a single point of failure; 14 devices would go dark, with the fix' },
      { label: 'View menu', alt: 'The View menu: Overview, Power, Heat, Network, Cables, Compute, AI' },
      { label: 'Cables · Pro', alt: 'Cables at the rear of both racks, coloured by type, with a cable count per device' },
    ],
    phone: { label: 'Phone', alt: 'The demo lab on a phone-sized screen with the lights off (emulated)', caption: 'Phone layout, browser emulation; not yet tested on real devices.' },
  },
  steps: {
    eyebrow: 'Get your sheet ready', h2: 'Your lab in three steps',
    items: [
      { b: 'Download the template.', p: 'One sheet per topic: Devices, Cables, Racks, Power, Networks, Readings.' },
      { b: 'Fill in Devices.', p: 'One row per device, with rack, U (the lowest unit it sits in) and model. Leave U empty for gear outside the rack, such as access points, cameras or the ISP box.' },
      { b: 'Import it.', p: '.xlsx, or one CSV per sheet. You get an import report (rows imported, rows skipped with the reason, checks pinned on the rack), then your electricity price.' },
    ],
    template: 'Download the template (.xlsx)', example: 'Download the Basement Lab example', templateNote: '',
  },
  privacy: {
    eyebrow: "Close the tab and it's gone",
    p: 'Try keeps your lab in the browser tab only: no cookies, no browser storage, nothing sent to a server. Download your lab as a file to come back to it.',
    soon: ' Accounts that keep your lab are launching soon.',
    chips: ['No cookies', 'No storage', 'No upload'],
    checksEyebrow: 'What the import checks',
    checks: 'Two devices in one U · a port used twice · 10G on a 1G port or fiber into RJ45 · both power supplies on one feed · a power strip over 80 % · UPS runtime under 5 minutes · a cable shorter than its run · missing labels · undefined VLANs · port errors · cable ends that name an unknown device.',
  },
  faq: tryFaq,
  open: 'Try is open.',
};

export const de: Deep<typeof en> = {
  title: `${P} ansehen: Clips, Standbilder, Vorführung`,
  description: `${P} in Aktion: das Demo-Lab in 3D, Strom- und Netzwerkdiagramme, ein simulierter USV-Ausfall und der Modus „Licht aus“. Fragen Sie eine Vorführung an.`,
  crumb: 'Ansehen',
  eyebrow: 'Ansehen · Demo-Lab · simulierte Daten', h1: `${P} ansehen`,
  lead: 'Die App ist noch nicht öffentlich. Schauen Sie sich hier die Clips an oder buchen Sie eine kurze Vorführung, dann zeigen wir Ihnen die App in einem Gespräch.',
  join: 'Auf die Warteliste', notify: 'Benachrichtigen, wenn Try öffnet', langNote: 'Die App und die Clips sind derzeit auf Englisch.',
  banner: `Wenn Try öffnet: Nichts wird gespeichert, schließen Sie den Tab und alles ist weg. <b>Für ${A.month} $/Monat bleibt es gespeichert.</b>`,
  tour: {
    label: 'Rundgang', meta: '· Überblick → Strom → Netzwerk → Fail · 28 s',
    aria: 'Bildschirmaufnahme des Demo-Labs: Überblick, das Menü „View“, Strom in 3D und als Diagramm, Netzwerk in 3D und als Diagramm, dann eine Fail-Simulation am Aggregations-Switch',
    caption: 'Ein Gerät suchen, öffnen, Fail drücken: Das Netzwerkdiagramm zeigt alles, was die Verbindung verliert.',
    transcript: ['Das Demo-Lab im Überblick.', 'Das Menü „View“ öffnet sich, Power wird gewählt: Strom in 3D, dann als Diagramm von der Wand bis zu jedem Gerät.', 'Netzwerk in 3D, dann als Diagramm.', 'Der Aggregations-Switch wird gesucht, geöffnet und ausgefallen gesetzt: Das Diagramm zeigt alles, was die Verbindung verliert.'],
  },
  lights: {
    label: 'Licht aus', meta: '· animierte Grafik zum Teilen · 8-s-Schleife',
    aria: 'Das Demo-Lab bei ausgeschaltetem Raumlicht: Die LEDs der Geräte blinken, Strom- und Netzwerkflüsse laufen zwischen den Racks',
    caption: 'Licht aus spart im Demo-Lab geschätzt 145 W, etwa 34 € im Monat. Jedes Lab kann das als GIF oder Video exportieren.',
    transcript: ['Das Demo-Lab bei ausgeschaltetem Raumlicht.', 'Die LEDs der Geräte blinken; Strom- und Netzwerkflüsse laufen zwischen den beiden Racks.'],
  },
  stills: {
    eyebrow: 'Standbilder',
    shots: [
      { label: 'Überblick', alt: 'Das Demo-Lab in 3D bei ausgeschaltetem Licht: zwei Racks, Gerätebeschriftungen, oben die Anzeige' },
      { label: 'Flaw Finder', alt: 'Flaw Finder: Die USV ist ein Single Point of Failure; 14 Geräte würden dunkel, mit Lösung' },
      { label: 'Menü „View“', alt: 'Das Menü „View“: Overview, Power, Heat, Network, Cables, Compute, AI' },
      { label: 'Kabel · Pro', alt: 'Kabel an der Rückseite beider Racks, nach Typ eingefärbt, mit der Zahl der Kabel pro Gerät' },
    ],
    phone: { label: 'Smartphone', alt: 'Das Demo-Lab auf einem Bildschirm in Smartphone-Größe bei ausgeschaltetem Licht (emuliert)', caption: 'Smartphone-Layout, im Browser emuliert; auf echten Geräten noch nicht getestet.' },
  },
  steps: {
    eyebrow: 'Tabelle vorbereiten', h2: 'Ihr Lab in drei Schritten',
    items: [
      { b: 'Vorlage herunterladen.', p: 'Ein Blatt pro Thema: Devices, Cables, Racks, Power, Networks, Readings.' },
      { b: 'Geräte eintragen.', p: 'Eine Zeile pro Gerät, mit Rack, U (HE; die unterste Einheit, in der es sitzt) und Modell. Lassen Sie die Spalte U leer für Geräte außerhalb des Racks, etwa Access Points, Kameras oder den Router des Providers.' },
      { b: 'Importieren.', p: '.xlsx oder eine CSV-Datei pro Blatt. Sie erhalten einen Importbericht (importierte Zeilen, übersprungene Zeilen mit Grund, Prüfungen am Rack), danach geben Sie Ihren Strompreis ein.' },
    ],
    template: 'Vorlage herunterladen (.xlsx)', example: 'Beispiel Basement Lab herunterladen', templateNote: 'Vorlage und Beispiel sind auf Englisch; die Blatt- und Spaltennamen bleiben englisch.',
  },
  privacy: {
    eyebrow: 'Tab zu, alles weg',
    p: 'Try hält Ihr Lab nur im Browser-Tab: keine Cookies, kein Browserspeicher, nichts wird an einen Server gesendet. Laden Sie Ihr Lab als Datei herunter, um später daran weiterzuarbeiten.',
    soon: ' Konten, die Ihr Lab speichern, starten bald.',
    chips: ['Keine Cookies', 'Kein Speicher', 'Kein Upload'],
    checksEyebrow: 'Was der Import prüft',
    checks: 'Zwei Geräte in einer HE · ein Port doppelt belegt · 10G an einem 1G-Port oder Glasfaser in RJ45 · beide Netzteile an einer Einspeisung · eine Steckdosenleiste über 80 % · USV-Laufzeit unter 5 Minuten · ein Kabel kürzer als seine Strecke · fehlende Beschriftungen · undefinierte VLANs · Portfehler · Kabelenden, die ein unbekanntes Gerät nennen.',
  },
  faq: [
    { q: 'Warum gibt es keine öffentliche Demo?', a: `Wir öffnen ${P} noch nicht für alle. Bis dahin sehen Sie es hier in Clips und Standbildern oder in einer Vorführung mit uns.` },
    { q: 'Was passiert in einer Vorführung?', a: 'Ein kurzer Videoanruf: Wir öffnen das Demo-Lab und zeigen die Ansichten, die Sie interessieren, von der Stromversorgungskette und der Fail-Simulation bis zum Flaw Finder und dem Modus „Licht aus“, und beantworten Ihre Fragen.' },
    { q: 'Welche Dateiformate werden unterstützt?', a: 'Eine .xlsx-Arbeitsmappe im Aufbau der Vorlage oder eine CSV-Datei pro Blatt mit denselben Spaltennamen.' },
    { q: 'Mein Gerät ist nicht im Katalog. Was passiert?', a: 'Wählen Sie es im Gerätekatalog nach Kategorie und Hersteller oder beschreiben Sie Ihr eigenes Gerät und verwenden Sie es wieder. In einer Tabelle erscheint ein unbekanntes Modell trotzdem als schlichter Kasten in der richtigen Höhe und in der richtigen HE.' },
    { q: 'Wird etwas hochgeladen oder gespeichert?', a: 'Nein. Die Datei wird im Browser gelesen, und in Try ohne Konto wird nichts gespeichert: Die App setzt keine Cookies, nutzt keinen Browserspeicher und sendet nichts an einen Server.' },
  ],
  open: 'Try ist geöffnet.',
};

export const zh: Deep<typeof en> = {
  title: `${P} 演示：3D 视频、截图和讲解`,
  description: `观看 ${P} 的实际效果：3D 演示实验室、电力和网络拓扑图、模拟 UPS 故障以及关灯模式。可预约演示讲解。`,
  crumb: '观看演示',
  eyebrow: '观看演示 · 演示实验室 · 模拟数据', h1: `${P} 演示`,
  lead: '应用尚未对公众开放。您可以在这里观看，或预约一次简短的讲解，我们在通话中为您演示。',
  join: '加入候补名单', notify: 'Try 开放时邮件通知我', langNote: '应用和视频目前为英文。',
  banner: `Try 开放后：不保存任何数据，关闭标签页即清除。<b>每月 ${A.month} 美元即可保存。</b>`,
  tour: {
    label: '导览', meta: '· 总览 → 电力 → 网络 → Fail · 28 秒',
    aria: '演示实验室的屏幕录像：总览、View 菜单、3D 和拓扑图形式的电力视图、3D 和拓扑图形式的网络视图，然后对汇聚交换机做 Fail 故障假设',
    caption: '搜索一台设备，打开，按下 Fail：网络拓扑图会显示所有失去连接的设备。',
    transcript: ['总览中的演示实验室。', '打开 View 菜单，选择 Power：先看 3D 电力视图，再看从墙插到每台设备的拓扑图。', '先看 3D 网络视图，再看拓扑图。', '搜索并打开汇聚交换机，设为故障：拓扑图显示所有失去连接的设备。'],
  },
  lights: {
    label: '关灯', meta: '· 动画分享 · 8 秒循环',
    aria: '关灯状态下的演示实验室：设备指示灯闪烁，电力和网络流在机柜之间流动',
    caption: '在演示实验室中，关灯估计可省 145 W，每月约 €34。每个实验室都可以导出为 GIF 或视频。',
    transcript: ['关灯状态下的演示实验室。', '设备指示灯闪烁；电力和网络流在两个机柜之间流动。'],
  },
  stills: {
    eyebrow: '截图',
    shots: [
      { label: '总览', alt: '关灯状态下的 3D 演示实验室：两个机柜、设备标签，顶部是读数' },
      { label: 'Flaw Finder', alt: 'Flaw Finder：UPS 是单点故障，14 台设备会断电，并给出解决办法' },
      { label: 'View 菜单', alt: 'View 菜单：Overview、Power、Heat、Network、Cables、Compute、AI' },
      { label: '线缆 · Pro', alt: '两个机柜背面的线缆，按类型着色，标出每台设备的线缆数量' },
    ],
    phone: { label: '手机', alt: '关灯状态下手机尺寸屏幕上的演示实验室（模拟）', caption: '手机布局，浏览器模拟；尚未在真机上测试。' },
  },
  steps: {
    eyebrow: '准备表格', h2: '三步建好您的实验室',
    items: [
      { b: '下载模板。', p: '每个主题一个工作表：Devices、Cables、Racks、Power、Networks、Readings。' },
      { b: '填写 Devices。', p: '每台设备一行，填写机柜、U 位（设备所在的最低 U）和型号。机柜外的设备（如无线 AP、摄像头、光猫）U 位留空。' },
      { b: '导入。', p: '.xlsx，或每个工作表一个 CSV。您会得到一份导入报告（导入的行、跳过的行及原因、标注在机柜上的检查结果），然后填写您的电价。' },
    ],
    template: '下载模板（.xlsx）', example: '下载 Basement Lab 示例', templateNote: '模板和示例为英文，工作表名和列名保持英文不变。',
  },
  privacy: {
    eyebrow: '关闭标签页即清除',
    p: 'Try 只把您的实验室保存在浏览器标签页里：不使用 Cookie，不使用浏览器存储，不向服务器发送任何数据。把实验室下载为文件，下次可以接着用。',
    soon: '可保存实验室的账号即将推出。',
    chips: ['无 Cookie', '不存储', '不上传'],
    checksEyebrow: '导入时检查什么',
    checks: '两台设备占用一个 U · 一个端口被重复使用 · 10G 接在 1G 端口或光纤接入 RJ45 · 两个电源接在同一路供电 · 插线板负载超过 80% · UPS 续航不足 5 分钟 · 线缆长度短于走线距离 · 缺少标签 · 未定义的 VLAN · 端口错误 · 线缆端点指向未知设备。',
  },
  faq: [
    { q: '为什么没有公开演示？', a: `我们暂时还没有向所有人开放 ${P}。在此之前，您可以在这里看视频和截图，或预约我们为您讲解。` },
    { q: '演示讲解是什么形式？', a: '一次简短的视频通话：我们打开演示实验室，展示您关心的视图，从供电链路和 Fail 故障假设，到 Flaw Finder 和关灯模式，并回答您的问题。' },
    { q: '将支持哪些文件格式？', a: '按模板结构填写的 .xlsx 工作簿，或每个工作表一个 CSV，列名相同。' },
    { q: '我的设备不在设备库里怎么办？', a: '可以在设备库中按类别和品牌选择，或自己描述一台设备并重复使用。在表格中，未知型号也会以正确高度的普通方块出现在正确的 U 位。' },
    { q: '会上传或保存任何东西吗？', a: '不会。文件只在浏览器中读取，没有账号时不存储任何数据：不使用 Cookie，不使用浏览器存储，不向服务器发送任何数据。' },
  ],
  open: 'Try 已开放。',
};
