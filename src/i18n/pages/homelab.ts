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
  title: `homelab 机柜 3D 规划：功耗、电费、UPS 续航 | ${P}`,
  description: '把家用服务器机柜的设备清单（Excel）变成 3D 模型：每台设备的功耗和每月电费、UPS 续航、网络连接，以及 UPS 断电后哪些设备会掉线。',
  hero: {
    eyebrow: `${P} · 3D 机柜规划`, h1: '您的 homelab 机柜，3D 呈现。',
    lead: '导入一份设备清单表格，就能看到每台设备的功耗和电费、每根线插在哪里，以及一处故障会让哪些设备断电断网。',
    run: '在浏览器中运行 · 数据不离开浏览器',
    note: '开放后可免费试用；{link}。您的文件只在浏览器中读取，绝不上传。',
    join: '加入候补名单', notify: '开放时通知我', langNote: '应用界面目前为英文。',
    stage: 'Basement Lab',
    alt: '关灯状态下的 3D 演示实验室：设备指示灯和屏幕发光，读数显示 1.02 kW、每月 €165',
    altLight: '开灯状态下的 3D 演示实验室，位于明亮的办公室中',
    pin: 'Disk 7 · SMART', issues: '发现 16 个问题', demo: '演示 · 模拟数据', tx: '上方视频的内容',
    transcript: [
      '总览——"Your homelab, in 3D"：Basement Lab，一个 24U 机柜和一个放在柜子上的 10 英寸机柜，每台设备都有标签。',
      '打开 View 菜单：Overview、Power、Heat、Network、Cables、Compute、AI。',
      '电力——"Watts, €/month and UPS runtime"：电从墙插经 UPS 和插线板流向每台设备；面板显示 1.02 kW、每月约 €162 和 UPS 续航时间。',
      '假设故障——"Fail the UPS and see what goes dark"：UPS 被设为故障，其后的设备标记为断电。',
      '网络——"Diagram, PoE and link speeds"：网络以拓扑图显示，按利用率着色，标出 PoE 和链路速率。',
      '线缆——"Trace a run through the patch panel"：机柜背面的线缆，一条线路从头到尾被追踪。',
      'AI——"Tokens per second and per kWh"：两台 AI 主机的每秒 token 数、每千瓦时 token 数和每百万 token 的电费。',
      '关灯——"LEDs blink, the light bill drops"：房间变暗，设备指示灯继续闪烁。',
    ],
  },
  proof: {
    eyebrow: '关灯的储物间', saving: '−€34', perMonth: '/ 月',
    body: `关掉房间的灯，机柜照常运行。${P} 把灯也当作一个负载来计算，并把节省的电费显示在功耗旁边。`,
    estimated: '估算', watch: '看看关灯效果',
  },
  shows: {
    eyebrow: '能看到什么', h2: `${P} 能让您看到什么`,
    power: { tag: '电力', h3: '花了多少钱', p: '按您的电价估算每台设备的功耗和每月电费，依据设备型号和您补充的实测读数。从墙插经 UPS、插线板一直追到每台设备，每一级的负载都清清楚楚。', code: '墙插 → UPS → 插线板 → 设备 · 负载 %' },
    network: { tag: '网络', h3: '线插在哪里', p: '从路由器到交换机再到设备，逐个端口查看，可用 3D 或清晰的拓扑图。Pro 版可从头到尾追踪机柜背面的每一根线，包括经过配线架的线路。', code: '运营商 → 路由器 → 交换机 → 设备 · 速率 · PoE' },
    fail: { tag: '故障', h3: '哪些会断', p: `点击 UPS、插线板或交换机，按下 <strong>Fail</strong>。${P} 会显示哪些设备断电或断网，哪些继续运行。所有版本都有此功能。`, chip: 'Fail → 哪些会断' },
  },
  how: {
    eyebrow: '使用方法', h2: '从表格到 3D 机柜，全在浏览器里完成。',
    steps: [
      { h3: '获取模板', p: '或者从 Basement Lab 示例开始。' },
      { h3: '填写 Devices 表', p: '只有机柜、U 位和型号三列是必填的。想看更多时，再补充线缆、供电和读数。' },
      { h3: '拖入文件', p: '您会得到一份导入报告和 3D 机柜。未知型号也会显示，以正确高度的普通方块呈现。' },
    ],
    template: '下载模板（.xlsx）', example: '下载 Basement Lab 示例',
    note: '.xlsx，或每个工作表一个 CSV。文件不会离开您的电脑。', templateNote: '模板和示例为英文，列名保持英文不变。',
  },
  views: {
    eyebrow: '视图', h2: '一个机柜，多种看法。',
    items: [
      { label: '总览', alt: '3D 演示实验室：两个机柜，设备带标签，顶部是功耗和电费读数，底部是时间轴', text: '整个实验室一目了然：机柜、设备，以及机柜外的设备。顶部一个读数：功耗、每月电费、UPS 续航。' },
      { label: '视图', alt: '演示实验室上方打开的 View 菜单，列出 Overview、Power、Heat、Network、Cables、Compute 和 AI', text: 'Overview、Power、Heat、Network、Cables、Compute 和 AI 都在同一个 View 菜单里（快捷键 1–7）。Power 和 Network 可在 3D 与拓扑图之间切换。' },
      { label: 'Flaw Finder', alt: '演示实验室上方的 Flaw Finder 面板：UPS 是单点故障，列出会断电的设备和解决办法', text: '单点故障、过载的插线板、峰值负载下的 UPS 续航等问题，按严重程度排序并给出解决办法。Try 版运行一次并打开第一个问题。' },
      { label: '线缆 · Pro', alt: '线缆视图：两个机柜背面的电源线和网线，标出每台设备的线缆数量', text: '机柜背面的每一根线，按类型着色，经配线架从头到尾追踪。' },
      { label: 'AI · Pro', alt: 'AI 视图：每台 AI 主机的每秒 token 数，每千瓦时 token 数作为 Pro 预览被模糊处理', text: '机柜中 AI 主机的每秒 token 数；Pro 版还显示每千瓦时 token 数和每百万 token 的成本。' },
    ],
  },
  checks: {
    eyebrow: '检查', h2: '像第二双眼睛一样审阅您的表格。',
    p: '每次导入后都会生成报告：导入了哪些行、跳过了哪些行（附原因），以及标注在机柜上的检查结果。',
    items: ['两台设备占用同一个 U', '一个端口被重复使用', '10G 设备接在 1G 端口，或光纤接入 RJ45', '两个电源接在同一路供电', '插线板负载超过额定值的 80%', 'UPS 续航不足 5 分钟', '线缆长度短于走线距离', '缺少标签、未定义的 VLAN、端口错误'],
    report: '导入报告', reportAlt: '模板文件的导入报告：已导入的工作表，以及错误、警告和提示',
  },
  share: {
    bar: '分享 · 视频', videoAria: '关灯状态下演示实验室的动画分享：指示灯闪烁，电力和网络流在机柜之间流动',
    eyebrow: '分享', h2: '晒出您的机柜。',
    p: '每个实验室都有现成的分享卡片（1200×630）、一张干净的机柜立面 PNG，以及动画分享：适合论坛的短 GIF，和一段指示灯闪烁、电力和网络流动的机柜视频。',
  },
  ai: {
    eyebrow: 'AI', h2: '机柜里的 AI 主机，每千瓦时能产出多少 token。',
    p: `每秒 token 数告诉您它有多快，每千瓦时 token 数告诉您它花多少钱。${P} 把两者都显示在机柜上，紧挨着功耗。`,
    link: '用免费计算器算出每瓦 token 数 →', note: 'AI 视图中的每千瓦时 token 数属于 Pro 版。计算器免费。',
    today: '今日 token 数', perKwh: 'token / kWh', demo: 'Basement Lab · 演示',
  },
  pricing: {
    eyebrow: '价格', h2: '免费试用，付费保存。', compare: '比较各版本 →', soon: '即将推出', perMonth: ' / 月',
    try: { k: 'Try', p: '免费', body: '无需账号，不存储任何数据。尚未公开：可观看演示或预约讲解。' },
    account: { k: 'Account', body: '{year}/年。保存您的实验室。' }, pro: { k: 'Pro', body: '{year}/年。线缆、AI 和全部工具。' },
    or: '或 ',
  },
  learn: {
    eyebrow: '学习', h2: '指南和免费计算器', all: '全部指南 →',
    cards: [
      { k: '指南 · 计算器', t: 'homelab 电费计算器：您的实验室到底花多少钱', p: '每月电费 = 平均瓦数 × 730 ÷ 1000 × 每千瓦时电价。' },
      { k: '指南 · 规划', t: '10 英寸迷你机柜规划：能放什么，怎么布局', p: '面板宽 254 mm，导轨间约 222 mm，每 U 44.45 mm。' },
      { k: '指南 · 计算器', t: 'Proxmox (PVE) 功耗：先测量，再降低', p: '在墙插或 UPS 处测量，然后降低待机功耗。' },
      { k: '指南 · 计算器', t: '每瓦 token 数：您的本地 AI 主机效率如何？', p: '每秒 token 数 ÷ 瓦数 = 每焦耳 token 数。' },
    ],
  },
  built: `<strong>由数据中心团队打造。</strong>${P} 出自一支为整座数据中心建 3D 模型的团队，这次把它缩小到您家里的机柜。由 Mustard Seed Solutions 开发。`,
  faq: [
    { q: `${P} 免费吗？`, a: `Try 将免费提供，无需账号，不存储任何数据。目前尚未公开：现阶段我们通过视频、截图和演示讲解来展示应用。Account（每月 ${A.month} 美元或每年 ${A.year} 美元）可保存您的实验室；Pro（每月 ${R.month} 美元或每年 ${R.year} 美元）增加线缆追踪、每千瓦时 token 数、完整的 Flaw Finder 和报告。${soon ? 'Account 和 Pro 即将推出。' : ''}` },
    { q: '现在能试用吗？', a: '暂时还不能自行试用。您可以在"观看演示"页面看视频，或预约一次讲解，我们会在简短的通话中为您演示。导入模板现在就可以免费下载并填写。' },
    { q: '需要安装什么吗？', a: '不需要。它在浏览器中运行，导入一份表格：模板，或每个工作表一个 CSV。只有 Devices 表是必填的（机柜、U 位和型号）。' },
    { q: '我的文件会被上传吗？', a: '不会。表格只在浏览器中读取，不会离开您的电脑。没有账号时不存储任何数据：不使用 Cookie，不使用浏览器存储，也不向第三方发送请求。' },
    { q: '功耗和电费的数字有多准？', a: '都是估算值：按型号取每台设备的典型功耗，再结合您在 Readings 表中补充的读数，乘以您的电价。想要精确数字，请填入智能插座或 UPS 的实测读数。' },
    { q: '支持哪些机柜？', a: '一到两个机柜，包括 10 英寸迷你机柜。机柜外的设备（如无线 AP、摄像头、光猫）也可以放置：U 列留空即可。' },
    { q: '什么是每千瓦时 token 数？', a: '您的硬件每消耗一千瓦时电能产出多少 AI token。这是家用 AI 主机的能效指标，就像汽车的百公里油耗。' },
  ],
  final: { h2: '用 3D 查看您的机柜。', note: `没有账号，我们就不存储任何数据。每月 ${A.month} 美元即可保存。` },
};
