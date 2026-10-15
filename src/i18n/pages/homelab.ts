// Homelab Twin home copy (/homelab/, /de/homelab/, /zh/homelab/). Numbers only from the dev logs (share/updatehl.md).
// Strings marked "html" are rendered with set:html (our own markup only: <strong>, <a href="{x}">).
import { PRODUCT_NAME as P, PRICES, FLAGS } from '../../config/brand';
const A = PRICES.account, R = PRICES.pro, soon = !FLAGS.billingLive;
import { homeFaq } from '../../data/faq';
import { VIDEOS } from '../../data/videos';
import type { Deep } from '../config';

export const en = {
  title: `3D Homelab Rack Planner: Power, Cost & Cables | ${P}`,
  description: 'Turn a spreadsheet of your gear into a 3D model of your homelab rack: watts, cost per month, network, and what goes dark when one thing fails.',
  hero: {
    eyebrow: `${P} · 3D rack planner`, h1: 'Your homelab rack, in 3D.',
    lead: "Drop in a spreadsheet of your gear. See what every device draws and costs, what's plugged where, and what goes dark when one thing fails.",
    run: 'Runs in your browser · no data leaves it',
    /** html: {link} = the waitlist link */
    note: 'Try it free — coming when we open the doors; {link}. Your file is read in your browser and never uploaded.',
    join: 'join the waitlist', notify: 'get notified', langNote: '',
    stage: 'Basement Lab',
    alt: 'The demo lab in 3D with the room lights off: device LEDs and screens glow, the readout shows 1.02 kW and €165 a month',
    altLight: 'The demo lab in 3D with the room lights on, in a bright office',
    pin: 'Disk 7 · SMART', issues: '16 issues found', demo: 'demo · simulated data', tx: 'What the hero clips show',
    transcript: VIDEOS.hero.transcript,
  },
  proof: {
    eyebrow: 'Lights-out closet', saving: '−€34', perMonth: '/ month',
    body: `Room light off, rack still running. ${P} counts the light as a load like any other and shows the saving next to the watts.`,
    estimated: 'estimated', watch: 'Watch the lights go off',
  },
  shows: {
    eyebrow: 'What it shows', h2: `What ${P} shows you`,
    power: { tag: 'POWER', h3: 'What it costs', p: 'Watts per device and money per month at your electricity price, estimated from each model and any readings you add. Follow the power from the wall through the UPS and power strip to every device, with the load on each step.', code: 'wall → UPS → power strip → device · load %' },
    network: { tag: 'NETWORK', h3: "What's plugged where", p: 'Router to switch to device, port by port, in 3D or as a clean diagram. On Pro, trace every cable at the back of the rack from end to end, through the patch panel.', code: 'ISP → router → switch → device · speed · PoE' },
    /** p is html */
    fail: { tag: 'FAIL', h3: 'What goes dark', p: `Click the UPS, a power strip or a switch and press <strong>Fail</strong>. ${P} shows what loses power or network, and what keeps running. In every plan.`, chip: 'Fail → what goes dark' },
  },
  how: {
    eyebrow: 'How it works', h2: 'From spreadsheet to 3D rack, in your browser.',
    steps: [
      { h3: 'Get the template', p: 'Or start from the Basement Lab example.' },
      { h3: 'Fill in Devices', p: 'Rack, U and model are the only required columns. Add cables, power and readings when you want more.' },
      { h3: 'Drop the file in', p: 'You get an import report and your rack in 3D. Unknown models still show up, as plain boxes of the right height.' },
    ],
    template: 'Download the template (.xlsx)', example: 'Download the Basement Lab example',
    note: '.xlsx, or one CSV per sheet. The file never leaves your machine.', templateNote: '',
  },
  views: {
    eyebrow: 'Views', h2: 'One rack, seen several ways.',
    items: [
      { label: 'Overview', alt: 'The demo lab in 3D: two racks with labelled devices, a power and cost readout at the top and the timeline at the bottom', text: 'The whole lab at a glance: racks, devices, and the gear outside the rack. One readout on top: watts, cost per month, UPS runtime.' },
      { label: 'Views', alt: 'The View menu open over the demo lab, listing Overview, Power, Heat, Network, Cables, Compute and AI', text: 'Overview, Power, Heat, Network, Cables, Compute and AI sit in one View menu (keys 1–7). Power and Network switch between 3D and a diagram.' },
      { label: 'Flaw Finder', alt: 'Flaw Finder panel over the demo lab: the UPS is a single point of failure, with the devices that go dark and the fix', text: 'Single points of failure, overloaded strips, UPS runtime at peak and more, ranked with the fix. Try runs it once and opens the first issue.' },
      { label: 'Cables · Pro', alt: 'Cables view: power and network cables drawn at the back of both racks, with a cable count per device', text: 'Every cable at the rear of the rack, coloured by type and traced end to end through patch panels.' },
      { label: 'AI · Pro', alt: 'AI view: tokens per second per AI box, with tokens per kWh blurred as a Pro preview', text: 'Tokens per second for the AI box in your rack; tokens per kWh and cost per million tokens on Pro.' },
    ],
  },
  checks: {
    eyebrow: 'Checks', h2: 'It reads your sheet like a second pair of eyes.',
    p: 'Every import ends with a report: rows imported, rows skipped (with the reason), and checks pinned on the rack.',
    items: ['Two devices in the same U', 'A port used twice', '10G on a 1G port, or fiber into RJ45', 'Both power supplies on the same feed', 'A power strip over 80 % of its rating', 'UPS runtime under 5 minutes', 'A cable shorter than its run', 'Missing labels, undefined VLANs, port errors'],
    report: 'Import report', reportAlt: 'Import report of the template file: sheets imported, checks with errors, warnings and notes',
  },
  share: {
    bar: 'Share · video', videoAria: 'Animated share of the demo lab with the lights off: LEDs blink and power and network flows run between the racks',
    eyebrow: 'Share', h2: 'Post your rack.',
    p: 'Every lab gets a ready-made share card (1200×630), a clean rack-elevation PNG, and an animated share: a short GIF for forums and a video of your rack with the LEDs blinking and the power and network flowing.',
  },
  ai: {
    eyebrow: 'AI', h2: 'Tokens per kWh, for the AI box in your rack.',
    p: `Tokens per second tells you how fast it is. Tokens per kWh tells you what it costs. ${P} puts both on the rack, next to the watts.`,
    link: 'Work out your tokens per watt with the free calculator →', note: "The AI view's tokens per kWh is part of Pro. The calculator is free.",
    today: 'Tokens today', perKwh: 'Tokens / kWh', demo: 'Basement Lab · demo',
  },
  pricing: {
    eyebrow: 'Pricing', h2: 'Free to try. Pay to keep it.', compare: 'Compare plans →', soon: 'Launching soon', perMonth: ' / month',
    try: { k: 'Try', p: 'Free', body: 'No account, nothing stored. Not public yet: see it or book a walkthrough.' },
    account: { k: 'Account', body: '{year}/year. Keep your lab.' }, pro: { k: 'Pro', body: '{year}/year. Cables, AI and the full toolkit.' },
    or: 'or ',
  },
  learn: {
    eyebrow: 'Learn', h2: 'Guides and free calculators', all: 'All guides →',
    cards: [
      { k: 'Guide · calculator', t: 'Homelab power calculator: what your lab really costs', p: 'Monthly cost = average watts × 730 ÷ 1,000 × your price per kWh.' },
      { k: 'Guide · planner', t: '10-inch mini rack planner: what fits and how to lay it out', p: 'A 254 mm panel, about 222 mm between the rails, 44.45 mm per U.' },
      { k: 'Guide · calculator', t: 'Proxmox power usage: measure it, then cut it', p: 'Measure at the wall or the UPS, then cut idle watts.' },
      { k: 'Guide · calculator', t: 'Tokens per watt: how efficient is your local AI box?', p: 'Tokens per second ÷ watts = tokens per joule.' },
    ],
  },
  /** html */
  built: `<strong>Built by data-center people.</strong> ${P} comes from a team that builds 3D models of full data centers, scaled down to the rack in your basement. Made by Mustard Seed Solutions.`,
  faq: homeFaq,
  final: { h2: 'See your rack in 3D.', note: `No account = we store nothing. $${A.month}/month keeps it.` },
};

export const de: Deep<typeof en> = {
  title: `Homelab-Rack in 3D planen: Strom, Kosten, USV | ${P}`,
  description: 'Aus der Excel-Liste Ihres Homelabs wird ein 3D-Rack: Stromverbrauch, Kosten pro Monat, USV-Laufzeit, Netzwerk und was bei einem Ausfall dunkel wird.',
  hero: {
    eyebrow: `${P} · 3D-Rackplaner`, h1: 'Ihr Homelab-Rack in 3D.',
    lead: 'Ziehen Sie eine Tabelle Ihrer Geräte hinein. Sie sehen, was jedes Gerät verbraucht und kostet, was wo eingesteckt ist und was dunkel wird, wenn ein Teil ausfällt.',
    run: 'Läuft im Browser · keine Daten verlassen den Browser',
    note: 'Kostenlos testen, sobald wir öffnen. Jetzt {link}. Ihre Datei wird im Browser gelesen und nie hochgeladen.',
    join: 'auf die Warteliste setzen', notify: 'benachrichtigen lassen', langNote: ' Die App selbst ist derzeit auf Englisch.',
    stage: 'Basement Lab',
    alt: 'Das Demo-Lab in 3D bei ausgeschaltetem Raumlicht: LEDs und Displays der Geräte leuchten, die Anzeige zeigt 1,02 kW und 165 € im Monat',
    altLight: 'Das Demo-Lab in 3D bei eingeschaltetem Licht, in einem hellen Büro',
    pin: 'Disk 7 · SMART', issues: '16 Probleme gefunden', demo: 'Demo · simulierte Daten', tx: 'Was die Clips oben zeigen',
    transcript: [
      'Überblick – „Your homelab, in 3D“: das Basement Lab, ein 24-HE-Rack und ein 10-Zoll-Rack auf einem Schrank, jedes Gerät beschriftet.',
      'Das Menü „View“ öffnet sich: Overview, Power, Heat, Network, Cables, Compute, AI.',
      'Strom – „Watts, €/month and UPS runtime“: Der Strom fließt von der Wand über die USV und die Steckdosenleisten zu jedem Gerät; das Panel zeigt 1,02 kW, etwa 162 € im Monat und die USV-Laufzeit.',
      'Was wäre, wenn – „Fail the UPS and see what goes dark“: Die USV wird ausfallen gelassen, die Geräte dahinter werden als ausgefallen markiert.',
      'Netzwerk – „Diagram, PoE and link speeds“: das Netzwerk als Diagramm, nach Auslastung eingefärbt, mit PoE und Verbindungsgeschwindigkeiten.',
      'Kabel – „Trace a run through the patch panel“: die Kabel an der Rückseite des Racks, eine Strecke von Ende zu Ende verfolgt.',
      'KI – „Tokens per second and per kWh“: die zwei KI-Server mit Tokens pro Sekunde, Tokens pro kWh und den Stromkosten pro Million Tokens.',
      'Licht aus – „LEDs blink, the light bill drops“: Der Raum wird dunkel, die LEDs der Geräte blinken weiter.',
    ],
  },
  proof: {
    eyebrow: 'Abstellraum ohne Licht', saving: '−34 €', perMonth: '/ Monat',
    body: `Raumlicht aus, das Rack läuft weiter. ${P} zählt das Licht als Verbraucher wie jeden anderen und zeigt die Ersparnis neben den Watt.`,
    estimated: 'geschätzt', watch: 'Zusehen, wie das Licht ausgeht',
  },
  shows: {
    eyebrow: 'Was es zeigt', h2: `Was ${P} Ihnen zeigt`,
    power: { tag: 'STROM', h3: 'Was es kostet', p: 'Watt pro Gerät und Kosten pro Monat zu Ihrem Strompreis, geschätzt aus jedem Modell und den Messwerten, die Sie ergänzen. Verfolgen Sie den Strom von der Wand über USV und Steckdosenleiste bis zu jedem Gerät, mit der Last auf jeder Stufe.', code: 'Wand → USV → Steckdosenleiste → Gerät · Last %' },
    network: { tag: 'NETZWERK', h3: 'Was wo steckt', p: 'Vom Router über den Switch zum Gerät, Port für Port, in 3D oder als übersichtliches Diagramm. Mit Pro verfolgen Sie jedes Kabel an der Rackrückseite von Ende zu Ende, auch durch das Patchpanel.', code: 'Provider → Router → Switch → Gerät · Geschwindigkeit · PoE' },
    fail: { tag: 'AUSFALL', h3: 'Was dunkel wird', p: `Klicken Sie auf die USV, eine Steckdosenleiste oder einen Switch und drücken Sie <strong>Fail</strong>. ${P} zeigt, was Strom oder Netzwerk verliert und was weiterläuft. In jedem Tarif.`, chip: 'Fail → was dunkel wird' },
  },
  how: {
    eyebrow: 'So funktioniert es', h2: 'Von der Tabelle zum 3D-Rack, im Browser.',
    steps: [
      { h3: 'Vorlage holen', p: 'Oder mit dem Beispiel Basement Lab beginnen.' },
      { h3: 'Blatt „Devices“ ausfüllen', p: 'Rack, U (HE) und Modell sind die einzigen Pflichtspalten. Kabel, Strom und Messwerte ergänzen Sie, wenn Sie mehr sehen möchten.' },
      { h3: 'Datei hineinziehen', p: 'Sie erhalten einen Importbericht und Ihr Rack in 3D. Unbekannte Modelle erscheinen trotzdem, als schlichte Kästen in der richtigen Höhe.' },
    ],
    template: 'Vorlage herunterladen (.xlsx)', example: 'Beispiel Basement Lab herunterladen',
    note: '.xlsx oder eine CSV-Datei pro Blatt. Die Datei verlässt Ihren Rechner nie.', templateNote: ' Vorlage und Beispiel sind auf Englisch; die Spaltennamen bleiben englisch.',
  },
  views: {
    eyebrow: 'Ansichten', h2: 'Ein Rack, aus mehreren Blickwinkeln.',
    items: [
      { label: 'Überblick', alt: 'Das Demo-Lab in 3D: zwei Racks mit beschrifteten Geräten, oben eine Anzeige für Strom und Kosten, unten die Zeitleiste', text: 'Das ganze Lab auf einen Blick: Racks, Geräte und alles außerhalb des Racks. Oben eine Anzeige: Watt, Kosten pro Monat, USV-Laufzeit.' },
      { label: 'Ansichten', alt: 'Das Menü „View“ über dem Demo-Lab mit Overview, Power, Heat, Network, Cables, Compute und AI', text: 'Overview, Power, Heat, Network, Cables, Compute und AI liegen in einem Menü (Tasten 1–7). Power und Network wechseln zwischen 3D und Diagramm.' },
      { label: 'Flaw Finder', alt: 'Der Flaw Finder über dem Demo-Lab: Die USV ist ein Single Point of Failure, mit den Geräten, die dunkel werden, und der Lösung', text: 'Single Points of Failure, überlastete Steckdosenleisten, USV-Laufzeit unter Spitzenlast und mehr, nach Schweregrad sortiert und mit Lösung. Try führt ihn einmal aus und öffnet das erste Problem.' },
      { label: 'Kabel · Pro', alt: 'Kabelansicht: Strom- und Netzwerkkabel an der Rückseite beider Racks, mit der Zahl der Kabel pro Gerät', text: 'Jedes Kabel an der Rackrückseite, nach Typ eingefärbt und von Ende zu Ende durch die Patchpanels verfolgt.' },
      { label: 'KI · Pro', alt: 'KI-Ansicht: Tokens pro Sekunde pro KI-Server, Tokens pro kWh als Pro-Vorschau unscharf', text: 'Tokens pro Sekunde für den KI-Server in Ihrem Rack; Tokens pro kWh und Kosten pro Million Tokens mit Pro.' },
    ],
  },
  checks: {
    eyebrow: 'Prüfungen', h2: 'Es liest Ihre Tabelle wie ein zweites Paar Augen.',
    p: 'Jeder Import endet mit einem Bericht: importierte Zeilen, übersprungene Zeilen (mit Grund) und Prüfungen, die direkt am Rack angeheftet sind.',
    items: ['Zwei Geräte in derselben HE', 'Ein Port doppelt belegt', '10G an einem 1G-Port oder Glasfaser in RJ45', 'Beide Netzteile an derselben Einspeisung', 'Eine Steckdosenleiste über 80 % ihrer Nennlast', 'USV-Laufzeit unter 5 Minuten', 'Ein Kabel kürzer als seine Strecke', 'Fehlende Beschriftungen, undefinierte VLANs, Portfehler'],
    report: 'Importbericht', reportAlt: 'Importbericht der Vorlagendatei: importierte Blätter, Prüfungen mit Fehlern, Warnungen und Hinweisen',
  },
  share: {
    bar: 'Teilen · Video', videoAria: 'Animierte Grafik zum Teilen: das Demo-Lab bei ausgeschaltetem Licht, LEDs blinken, Strom- und Netzwerkflüsse laufen zwischen den Racks',
    eyebrow: 'Teilen', h2: 'Zeigen Sie Ihr Rack.',
    p: 'Jedes Lab erhält eine fertige Karte zum Teilen (1200×630), ein sauberes PNG der Rack-Frontansicht und eine animierte Version zum Teilen: ein kurzes GIF für Foren und ein Video Ihres Racks mit blinkenden LEDs und laufenden Strom- und Netzwerkflüssen.',
  },
  ai: {
    eyebrow: 'KI', h2: 'Tokens pro kWh für den KI-Server in Ihrem Rack.',
    p: `Tokens pro Sekunde zeigen, wie schnell er ist. Tokens pro kWh zeigen, was er kostet. ${P} zeigt beides am Rack, neben den Watt.`,
    link: 'Tokens pro Watt mit dem kostenlosen Rechner ermitteln →', note: 'Tokens pro kWh in der KI-Ansicht gehören zu Pro. Der Rechner ist kostenlos.',
    today: 'Tokens heute', perKwh: 'Tokens / kWh', demo: 'Basement Lab · Demo',
  },
  pricing: {
    eyebrow: 'Preise', h2: 'Kostenlos testen. Zahlen, um es zu behalten.', compare: 'Tarife vergleichen →', soon: 'Bald verfügbar', perMonth: ' / Monat',
    try: { k: 'Try', p: 'Kostenlos', body: 'Kein Konto, nichts gespeichert. Noch nicht öffentlich: ansehen oder eine Vorführung buchen.' },
    account: { k: 'Account', body: '{year}/Jahr. Ihr Lab bleibt gespeichert.' }, pro: { k: 'Pro', body: '{year}/Jahr. Kabel, KI und alle Werkzeuge.' },
    or: 'oder ',
  },
  learn: {
    eyebrow: 'Ratgeber', h2: 'Leitfäden und kostenlose Rechner', all: 'Alle Leitfäden →',
    cards: [
      { k: 'Leitfaden · Rechner', t: 'Homelab-Stromrechner: was Ihr Lab wirklich kostet', p: 'Monatliche Kosten = durchschnittliche Watt × 730 ÷ 1.000 × Ihr Preis pro kWh.' },
      { k: 'Leitfaden · Planer', t: '10-Zoll-Minirack planen: was passt und wie Sie es anordnen', p: 'Eine 254-mm-Front, etwa 222 mm zwischen den Schienen, 44,45 mm pro HE.' },
      { k: 'Leitfaden · Rechner', t: 'Proxmox-Stromverbrauch: erst messen, dann senken', p: 'An der Steckdose oder der USV messen, dann die Leerlauf-Watt senken.' },
      { k: 'Leitfaden · Rechner', t: 'Tokens pro Watt: wie effizient ist Ihr lokaler KI-Server?', p: 'Tokens pro Sekunde ÷ Watt = Tokens pro Joule.' },
    ],
  },
  built: `<strong>Von Rechenzentrumsleuten gebaut.</strong> ${P} kommt von einem Team, das 3D-Modelle ganzer Rechenzentren baut, hier verkleinert auf das Rack in Ihrem Keller. Entwickelt von Mustard Seed Solutions.`,
  faq: [
    { q: `Ist ${P} kostenlos?`, a: `Try wird kostenlos sein, ohne Konto und ohne gespeicherte Daten. Noch ist es nicht öffentlich: Bis dahin zeigen wir die App in Clips, Standbildern und Vorführungen. Account (${A.month}\u00a0$/Monat oder ${A.year}\u00a0$/Jahr) speichert Ihr Lab; Pro (${R.month}\u00a0$/Monat oder ${R.year}\u00a0$/Jahr) bringt Kabelverfolgung, Tokens pro kWh, den vollständigen Flaw Finder und Berichte.${soon ? ' Account und Pro starten bald.' : ''}` },
    { q: 'Kann ich es jetzt ausprobieren?', a: 'Noch nicht selbst. Sehen Sie sich die Clips auf der Seite „Ansehen“ an oder fragen Sie eine Vorführung an, dann zeigen wir Ihnen die App in einem kurzen Gespräch. Die Importvorlage können Sie schon jetzt kostenlos herunterladen und ausfüllen.' },
    { q: 'Muss ich etwas installieren?', a: 'Nein. Es läuft im Browser und importiert eine Tabelle: die Vorlage oder eine CSV-Datei pro Blatt. Nur das Blatt „Devices“ ist Pflicht (Spalten rack, u und model; u = HE).' },
    { q: 'Wird meine Datei hochgeladen?', a: 'Nein. Die Tabelle wird im Browser gelesen und verlässt Ihren Rechner nie. In Try ohne Konto wird nichts gespeichert: Die App setzt keine Cookies, nutzt keinen Browserspeicher und sendet keine Anfragen an Dritte.' },
    { q: 'Wie genau sind die Strom- und Kostenwerte?', a: 'Es sind Schätzungen: die typische Leistungsaufnahme jedes Geräts nach Modell, angepasst durch Messwerte, die Sie im Blatt „Readings“ ergänzen, mal Ihr Strompreis. Für genaue Werte tragen Sie Messwerte einer smarten Steckdose oder Ihrer USV ein.' },
    { q: 'Welche Racks kann es darstellen?', a: 'Ein oder zwei Racks, auch 10-Zoll-Miniracks. Geräte außerhalb des Racks, etwa Access Points, Kameras oder der Router des Providers, lassen sich ebenfalls platzieren: Lassen Sie die Spalte U leer.' },
    { q: 'Was sind Tokens pro kWh?', a: 'Wie viele KI-Tokens Ihre Hardware pro Kilowattstunde Strom erzeugt. Das ist die Effizienzzahl für einen KI-Server zu Hause, so wie der Verbrauch pro 100 km beim Auto.' },
  ],
  final: { h2: 'Sehen Sie Ihr Rack in 3D.', note: `Try ohne Konto speichert nichts. Für ${A.month}\u00a0$/Monat bleibt Ihr Lab gespeichert.` },
};

export const zh: Deep<typeof en> = {
  title: `Homelab 机柜 3D 规划：功耗、电费与 UPS 后备时间 | ${P}`,
  description: '将家用服务器机柜的设备清单（Excel/CSV）生成为 3D 模型：每台设备的功耗与每月电费、UPS 后备时间、网络连接，以及 UPS 故障时受影响的设备。',
  hero: {
    eyebrow: `${P} · 3D 机柜规划`, h1: '您的 Homelab 机柜，3D 呈现。',
    lead: '导入设备清单，即可查看每台设备的功耗与电费、线缆连接关系，以及单台设备故障时的影响范围。',
    run: '在浏览器本地运行 · 数据不上传、不存储',
    note: '免费试用将在正式开放后提供；{link}。文件仅在浏览器本地读取，不上传、不存储。',
    join: '加入候补名单', notify: '开放时通知我', langNote: '应用界面目前为英文。',
    stage: 'Basement Lab',
    alt: '关灯状态下的 3D 演示环境：设备指示灯与屏幕亮起，读数显示 1.02 kW、每月 €165',
    altLight: '开灯状态下的 3D 演示环境，位于明亮的办公室中',
    pin: 'Disk 7 · SMART', issues: '发现 16 个问题', demo: '演示 · 模拟数据', tx: '上方视频内容说明',
    transcript: [
      '总览——“Your homelab, in 3D”：Basement Lab 演示环境，包括一个 24U 机柜和一个置于柜上的 10 英寸机柜，所有设备均有标签。',
      '打开 View 菜单：Overview、Power、Heat、Network、Cables、Compute、AI。',
      '供配电——“Watts, €/month and UPS runtime”：电力自市电插座经 UPS 和插线板送至各台设备；面板显示 1.02 kW、每月约 €162 及 UPS 后备时间。',
      '故障推演——“Fail the UPS and see what goes dark”：将 UPS 设为故障，其下游设备标记为断电。',
      '网络——“Diagram, PoE and link speeds”：以拓扑图展示网络，按利用率着色，并标注 PoE 与链路速率。',
      '布线——“Trace a run through the patch panel”：机柜背面的线缆，其中一条链路经配线架实现端到端追踪。',
      'AI——“Tokens per second and per kWh”：两台 AI 主机的每秒 token 数、每千瓦时 token 数及每百万 token 电费。',
      '关灯模式——“LEDs blink, the light bill drops”：机房熄灯，设备指示灯持续闪烁。',
    ],
  },
  proof: {
    eyebrow: '关灯模式', saving: '−€34', perMonth: '/ 月',
    body: `关闭机房照明后，机柜照常运行。${P} 将照明计为一项负载，并在功耗旁显示节省的电费。`,
    estimated: '估算', watch: '查看关灯模式',
  },
  shows: {
    eyebrow: '核心功能', h2: `${P} 提供的视图`,
    power: { tag: '供配电', h3: '电费成本', p: '按您的电价估算每台设备的功耗与每月电费，依据为设备型号及您补充的监测数据。供配电链路自市电插座经 UPS、插线板直至每台设备，逐级显示负载。', code: '市电 → UPS → 插线板 → 设备 · 负载 %' },
    network: { tag: '网络', h3: '连接关系', p: '从路由器、交换机到终端设备，逐端口呈现，可选 3D 或拓扑图。专业版支持机柜背面每根线缆的端到端走线追踪，包括经过配线架的链路。', code: '运营商 → 路由器 → 交换机 → 设备 · 速率 · PoE' },
    fail: { tag: '故障推演', h3: '故障影响', p: `选中 UPS、插线板或交换机并点击 <strong>Fail</strong>，${P} 即显示断电或断网的设备，以及仍在运行的设备。所有版本均提供该功能。`, chip: 'Fail → 故障影响范围' },
  },
  how: {
    eyebrow: '使用方法', h2: '从 Excel 清单到 3D 机柜，全部在浏览器中完成。',
    steps: [
      { h3: '获取导入模板', p: '也可从 Basement Lab 示例开始。' },
      { h3: '填写 Devices 表', p: '必填列仅有机柜、U 位和型号。如需更多信息，可补充线缆、供电和监测数据。' },
      { h3: '导入文件', p: '系统生成导入报告和 3D 机柜。未收录的型号同样会显示，以对应高度的通用设备呈现。' },
    ],
    template: '下载导入模板（.xlsx）', example: '下载 Basement Lab 示例',
    note: '支持 .xlsx，或每个工作表一个 CSV 文件。文件不会离开您的电脑。', templateNote: '导入模板与示例为英文，工作表名和列名保持英文。',
  },
  views: {
    eyebrow: '视图', h2: '同一机柜，多种视图。',
    items: [
      { label: '总览', alt: '3D 演示环境：两个机柜及带标签的设备，顶部为功耗与电费读数，底部为时间轴', text: '整个 Homelab 一览无余：机柜、设备以及机柜外的设备。顶部读数汇总功耗、每月电费与 UPS 后备时间。' },
      { label: '视图菜单', alt: '演示环境上方展开的 View 菜单，包括 Overview、Power、Heat、Network、Cables、Compute 和 AI', text: 'Overview、Power、Heat、Network、Cables、Compute 与 AI 集中在同一 View 菜单中（快捷键 1–7）。Power 与 Network 可在 3D 与拓扑图之间切换。' },
      { label: 'Flaw Finder', alt: '演示环境上方的 Flaw Finder 面板：UPS 为单点故障，列出受影响设备及处理建议', text: '识别单点故障、过载插线板、峰值负载下的 UPS 后备时间等问题，按严重程度排序并给出处理建议。免费试用版运行一次，并打开首个问题。' },
      { label: '线缆 · 专业版', alt: '线缆视图：两个机柜背面的电源线与网线，并标注每台设备的线缆数量', text: '机柜背面的每根线缆按类型着色，经配线架实现端到端走线追踪。' },
      { label: 'AI · 专业版', alt: 'AI 视图：每台 AI 主机的每秒 token 数，每千瓦时 token 数在专业版预览中模糊显示', text: '显示机柜中 AI 主机的每秒 token 数；专业版另提供每千瓦时 token 数及每百万 token 成本。' },
    ],
  },
  checks: {
    eyebrow: '导入检查', h2: '导入即审核，问题自动标注。',
    p: '每次导入均生成报告：已导入的行、已跳过的行（附原因），以及标注在机柜上的检查结果。',
    items: ['两台设备占用同一 U 位', '同一端口重复使用', '10G 设备接入 1G 端口，或光纤接入 RJ45 端口', '双电源接入同一路供电', '插线板负载超过额定值的 80%', 'UPS 后备时间不足 5 分钟', '线缆长度短于走线距离', '标签缺失、VLAN 未定义、端口错误'],
    report: '导入报告', reportAlt: '导入模板文件的导入报告：已导入的工作表，以及错误、警告和提示',
  },
  share: {
    bar: '分享 · 视频', videoAria: '关灯状态下演示环境的动画分享：设备指示灯闪烁，电力与网络流在机柜之间流动',
    eyebrow: '分享', h2: '分享您的机柜。',
    p: '每个 Homelab 均可生成分享卡片（1200×630）、机柜立面 PNG 图及动画分享：适合论坛发布的短 GIF，以及展示指示灯闪烁、电力与网络流动的机柜视频。',
  },
  ai: {
    eyebrow: 'AI', h2: '机柜中 AI 主机的每千瓦时 token 数。',
    p: `每秒 token 数反映运行速度，每千瓦时 token 数反映运行成本。${P} 将二者与功耗一并显示在机柜上。`,
    link: '使用免费计算器计算每瓦 token 数 →', note: 'AI 视图中的每千瓦时 token 数属于专业版功能。计算器免费使用。',
    today: '今日 token 数', perKwh: 'token / kWh', demo: 'Basement Lab · 演示',
  },
  pricing: {
    eyebrow: '价格', h2: '免费试用，付费保存。', compare: '比较各版本 →', soon: '即将推出', perMonth: ' / 月',
    try: { k: '免费试用', p: '免费', body: '无需注册账户，不存储任何数据。尚未公开：可观看演示或预约演示。' },
    account: { k: '基础账户', body: '{year}/年。保存您的 Homelab。' }, pro: { k: '专业版', body: '{year}/年。线缆、AI 及全部功能。' },
    or: '或 ',
  },
  learn: {
    eyebrow: '技术指南', h2: '技术指南与免费计算器', all: '全部指南 →',
    cards: [
      { k: '指南 · 计算器', t: 'Homelab 电费计算：Homelab 的实际运行成本', p: '每月电费 = 平均功耗（W）× 730 ÷ 1,000 × 电价（元/kWh）。' },
      { k: '指南 · 规划', t: '10 英寸迷你机柜规划：可容纳的设备与布局方法', p: '面板宽 254 mm，导轨间距约 222 mm，每 U 高 44.45 mm。' },
      { k: '指南 · 计算器', t: 'Proxmox（PVE）功耗：先测量，再优化', p: '在市电插座或 UPS 处测量，再降低待机功耗。' },
      { k: '指南 · 计算器', t: '每瓦 token 数：本地 AI 主机的能效评估', p: '每秒 token 数 ÷ 功耗（W）= 每焦耳 token 数。' },
    ],
  },
  built: `<strong>由数据中心团队打造。</strong>${P} 来自长期为整座数据中心构建 3D 模型的团队，现将同样的能力用于您的家用机柜。由 Mustard Seed Solutions 开发。`,
  faq: [
    { q: `${P} 是否免费？`, a: `免费试用版将免费提供，无需注册账户，不存储任何数据。目前尚未公开，现阶段通过视频、截图和演示进行展示。基础账户（每月 ${A.month} 美元或每年 ${A.year} 美元）可保存您的 Homelab；专业版（每月 ${R.month} 美元或每年 ${R.year} 美元）增加链路追踪、每千瓦时 token 数、完整版 Flaw Finder 及报告功能。${soon ? '基础账户和专业版即将推出。' : ''}` },
    { q: '现在可以试用吗？', a: '目前暂不支持自助试用。您可以在“观看演示”页面观看视频，或预约演示，我们将通过简短的视频会议进行演示。导入模板现已开放下载，可提前填写。' },
    { q: '是否需要安装软件？', a: '无需安装。应用在浏览器中运行，导入一份 Excel/CSV 清单：使用导入模板，或每个工作表一个 CSV 文件。仅 Devices 表为必填（机柜、U 位和型号）。' },
    { q: '文件会被上传吗？', a: '不会。清单仅在浏览器本地读取，不会离开您的电脑。未注册账户时不存储任何数据：应用不使用 Cookie 和浏览器存储，也不向第三方发送请求。' },
    { q: '功耗与电费数据的准确度如何？', a: '均为估算值：按设备型号的典型功耗计算，结合您在 Readings 表中补充的监测数据，再乘以电价。如需精确数据，请填入智能插座或 UPS 的实测数据。' },
    { q: '支持哪些机柜？', a: '支持一至两个机柜，包括 10 英寸迷你机柜。机柜外的设备（如无线 AP、摄像头、光猫）同样可以放置：U 列留空即可。' },
    { q: '什么是每千瓦时 token 数？', a: '指硬件每消耗 1 kWh 电能所产出的 AI token 数量，是衡量家用 AI 主机能效的指标，类似汽车的百公里油耗。' },
  ],
  final: { h2: '以 3D 查看您的机柜。', note: `未注册账户时不存储任何数据。基础账户每月 ${A.month} 美元，可保存您的 Homelab。` },
};
