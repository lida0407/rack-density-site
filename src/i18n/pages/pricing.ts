// /homelab/pricing/ copy in en, de, zh. Prices stay USD in every locale (one constant, PRICES); the locale note says so.
import { PRODUCT_NAME as P, PRICES } from '../../config/brand';
import { pricingFaq } from '../../data/faq';
import type { Deep } from '../config';
const A = PRICES.account, R = PRICES.pro;

export const en = {
  title: `${P} Pricing: Free, $${A.month} or $${R.month} a Month`,
  description: `Try will be free when it opens: no account, nothing stored. Account keeps your lab for $${A.month}/month or $${A.year}/year. Pro adds cable tracing, the AI view and more.`,
  crumb: 'Pricing',
  h1: `${P} pricing`, lead: `Start free. Pay only when you want ${P} to keep your lab.`,
  short: `No account = we store nothing. $${A.month}/month keeps it.`, currencyNote: '',
  soon: 'Launching soon', roadmap: 'Roadmap', perMonth: '/ month', perYear: '{price} / year, two months free',
  try: {
    h2: 'Try', price: 'Free', tag: 'No account · nothing stored', note: 'Not public yet: see it in clips or book a walkthrough.',
    /** html items (<strong>) */
    items: ['1–2 racks in 3D from your spreadsheet', 'Power, Heat, Network, Compute views', 'Power and network diagrams with <strong>Fail</strong> what-if', 'Import report and checks', 'Share image and rack-elevation PNG', 'One Flaw Finder run', 'Closes with the tab, or download your lab as a file'],
    button: 'See it',
  },
  account: {
    h2: 'Account', or: 'or ', plus: 'Everything in Try, plus:',
    items: ['Your lab saved (up to 2 racks)', '30-day history', 'A read-only share link to your rack', 'Device catalog updates'],
    mailSubject: `${P}: tell me when Account opens`, mailBody: 'One e-mail when Account and Pro open, please.', mail: 'E-mail me when it opens', get: 'Get Account',
  },
  pro: {
    h2: 'Pro', or: 'or ', tag: 'Explains your lab', plus: 'Everything in Account, plus:',
    items: ['Up to 4 racks, 1-year history', 'Cabling view: every cable traced end to end', 'AI view: tokens per kWh, cost per million tokens', 'Flaw Finder: every single point of failure, ranked, with the fix', 'PDF report and Excel export', 'Upgrade Planner'],
    mailSubject: `${P}: tell me when Pro opens`, mailBody: 'One e-mail when Pro opens, please.', mail: 'E-mail me when it opens', get: 'Get Pro',
    msp: 'For the small office or MSP with up to four racks, too.',
  },
  mailNote: 'The e-mail link opens your mail app; we answer once, when Account and Pro open. No list.',
  compare: {
    h2: 'Compare plans', feature: 'Feature',
    rows: ['Racks', '3D rack from Excel / CSV', 'Power, Heat, Network, Compute views', 'Power and network diagrams', 'Fail what-if', 'Import report and checks', 'Share image + rack-elevation PNG', 'Download your lab as a file', 'Saved lab', 'History (simulated until the agent ships)', 'Read-only share link', 'Cabling view, traced through patch panels', 'AI view: tokens per second', 'AI view: tokens per kWh, cost per 1M tokens, idle-GPU finder', 'Flaw Finder', 'PDF report, Excel export', 'Upgrade Planner (what-if with cost)', 'Alerts', 'Agent: finds your devices'],
    cells: { '24 hours': '24 hours', '30 days': '30 days', '1 year': '1 year', preview: 'preview', 'one run': 'one run', 'one run per lab': 'one run per lab', 'full, with fixes': 'full, with fixes', 'this session': 'this session', unattended: 'unattended' } as Record<string, string>,
    note: '"Preview" = the feature opens with its numbers blurred and an upgrade card. Roadmap items are planned, not shipped.',
  },
  faq: pricingFaq,
};

export const de: Deep<typeof en> = {
  title: `${P} Preise: kostenlos, ${A.month}\u00a0$ oder ${R.month}\u00a0$ im Monat`,
  description: `Try wird kostenlos: kein Konto, nichts gespeichert. Account speichert Ihr Lab für ${A.month}\u00a0$/Monat oder ${A.year}\u00a0$/Jahr. Pro bringt Kabelverfolgung, KI-Ansicht und mehr.`,
  crumb: 'Preise',
  h1: `${P}: Preise`, lead: `Kostenlos starten. Zahlen nur, wenn ${P} Ihr Lab speichern soll.`,
  short: `Try ohne Konto speichert nichts. Für ${A.month}\u00a0$/Monat bleibt Ihr Lab gespeichert.`,
  currencyNote: 'Die Preise gelten in US-Dollar; der Betrag in Euro hängt vom Wechselkurs Ihrer Bank ab.',
  soon: 'Bald verfügbar', roadmap: 'Geplant', perMonth: '/ Monat', perYear: '{price} / Jahr, zwei Monate gratis',
  try: {
    h2: 'Try', price: 'Kostenlos', tag: 'Kein Konto · nichts gespeichert', note: 'Noch nicht öffentlich: in Clips ansehen oder eine Vorführung buchen.',
    items: ['1–2 Racks in 3D aus Ihrer Tabelle', 'Ansichten für Strom, Wärme, Netzwerk und Compute', 'Strom- und Netzwerkdiagramme mit <strong>Fail</strong>-Simulation', 'Importbericht und Prüfungen', 'Bild zum Teilen und PNG der Rack-Frontansicht', 'Ein Durchlauf des Flaw Finder', 'Endet beim Schließen des Tabs, oder Sie laden Ihr Lab als Datei herunter'],
    button: 'Ansehen',
  },
  account: {
    h2: 'Account', or: 'oder ', plus: 'Alles aus Try, dazu:',
    items: ['Ihr Lab gespeichert (bis zu 2 Racks)', 'Verlauf über 30 Tage', 'Ein Nur-Lese-Link zu Ihrem Rack', 'Aktualisierungen des Gerätekatalogs'],
    mailSubject: `${P}: Bitte benachrichtigen, wenn Account öffnet`, mailBody: 'Bitte eine E-Mail, sobald Account und Pro öffnen.', mail: 'Per E-Mail benachrichtigen, sobald es öffnet', get: 'Account holen',
  },
  pro: {
    h2: 'Pro', or: 'oder ', tag: 'Erklärt Ihr Lab', plus: 'Alles aus Account, dazu:',
    items: ['Bis zu 4 Racks, Verlauf über 1 Jahr', 'Verkabelungsansicht: jedes Kabel von Ende zu Ende verfolgt', 'KI-Ansicht: Tokens pro kWh, Kosten pro Million Tokens', 'Flaw Finder: jeder Single Point of Failure, nach Schweregrad sortiert, mit Lösung', 'PDF-Bericht und Excel-Export', 'Upgrade Planner'],
    mailSubject: `${P}: Bitte benachrichtigen, wenn Pro öffnet`, mailBody: 'Bitte eine E-Mail, sobald Pro öffnet.', mail: 'Per E-Mail benachrichtigen, sobald es öffnet', get: 'Pro holen',
    msp: 'Auch für kleine Büros und Systemhäuser (MSP) mit bis zu vier Racks.',
  },
  mailNote: 'Der E-Mail-Link öffnet Ihr Mailprogramm; wir antworten einmal, wenn Account und Pro öffnen. Keine Liste.',
  compare: {
    h2: 'Tarife vergleichen', feature: 'Funktion',
    rows: ['Racks', '3D-Rack aus Excel / CSV', 'Ansichten für Strom, Wärme, Netzwerk und Compute', 'Strom- und Netzwerkdiagramme', 'Fail-Simulation', 'Importbericht und Prüfungen', 'Bild zum Teilen + PNG der Rack-Frontansicht', 'Lab als Datei herunterladen', 'Gespeichertes Lab', 'Verlauf (simuliert, bis der Agent erscheint)', 'Nur-Lese-Link zum Teilen', 'Verkabelungsansicht, durch Patchpanels verfolgt', 'KI-Ansicht: Tokens pro Sekunde', 'KI-Ansicht: Tokens pro kWh, Kosten pro 1 Mio. Tokens, Finder für ungenutzte GPUs', 'Flaw Finder', 'PDF-Bericht, Excel-Export', 'Upgrade Planner (Simulation mit Kosten)', 'Warnmeldungen', 'Agent: findet Ihre Geräte'],
    cells: { '24 hours': '24 Stunden', '30 days': '30 Tage', '1 year': '1 Jahr', preview: 'Vorschau', 'one run': 'ein Durchlauf', 'one run per lab': 'ein Durchlauf pro Lab', 'full, with fixes': 'vollständig, mit Lösungen', 'this session': 'diese Sitzung', unattended: 'unbeaufsichtigt' },
    note: '„Vorschau“ = die Funktion öffnet sich mit unscharfen Zahlen und einem Upgrade-Hinweis. Geplante Funktionen sind noch nicht verfügbar.',
  },
  faq: [
    { q: 'Was heißt „nichts gespeichert“?', a: 'In Try wird Ihre Tabelle im Browser gelesen, und Ihr Lab existiert nur in diesem Tab. Wir haben keine Kopie: keine Cookies, kein Browserspeicher, nichts auf einem Server. Wenn Sie den Tab schließen, ist es weg, es sei denn, Sie laden Ihr Lab als Datei herunter.' },
    { q: 'Muss ich einen Agenten installieren?', a: 'Nein. Heute kommt alles aus Ihrer Tabelle. Ein Agent, der Ihre Geräte findet und die Werte aktuell hält, ist geplant; wenn er erscheint, ist er optional.' },
    { q: 'Funktioniert es offline?', a: `Zum Öffnen von ${P} brauchen Sie eine Verbindung, aber Ihre Datei verlässt Ihren Rechner nie: Sie wird im Browser gelesen.` },
    { q: 'Kann ich jederzeit kündigen?', a: 'Ja, sobald Account und Pro öffnen: Monatstarife enden mit dem bezahlten Monat, Jahrestarife mit dem bezahlten Jahr, und Ihr Lab bleibt bis dahin verfügbar.' },
    { q: 'Für wen ist Pro?', a: 'Für Labs, die die volle Erklärung wollen: Kabelverfolgung, Tokens pro kWh, den Flaw Finder mit Lösungen, einen PDF-Bericht und Excel-Export. Es passt auch für ein kleines Büro oder ein Systemhaus (MSP) mit bis zu vier Racks.' },
    { q: 'Warum sind die Preise in US-Dollar?', a: 'Abgerechnet wird künftig in USD. Stromkosten in der App und in den Rechnern verwenden Ihre eigene Währung und Ihren Preis pro kWh.' },
  ],
};

export const zh: Deep<typeof en> = {
  title: `${P} 价格：免费、每月 ${A.month} 美元或 ${R.month} 美元`,
  description: `Try 开放后免费：无需账号，不存储任何数据。Account 每月 ${A.month} 美元或每年 ${A.year} 美元，保存您的实验室。Pro 增加线缆追踪、AI 视图等功能。`,
  crumb: '价格',
  h1: `${P} 价格`, lead: `免费开始。只有当您希望 ${P} 保存您的实验室时才需付费。`,
  short: `没有账号，我们就不存储任何数据。每月 ${A.month} 美元即可保存。`,
  currencyNote: '价格以美元计，按美元结算。折合人民币的金额取决于您的银行汇率。',
  soon: '即将推出', roadmap: '规划中', perMonth: '/ 月', perYear: '{price} / 年，相当于免两个月',
  try: {
    h2: 'Try', price: '免费', tag: '无需账号 · 不存储数据', note: '尚未公开：可观看演示视频或预约讲解。',
    items: ['用您的表格生成 1–2 个 3D 机柜', '电力、散热、网络、计算视图', '电力和网络拓扑图，支持 <strong>Fail</strong> 故障假设', '导入报告和检查', '分享图片和机柜立面 PNG', '运行一次 Flaw Finder', '关闭标签页即清除，或将实验室下载为文件'],
    button: '观看演示',
  },
  account: {
    h2: 'Account', or: '或 ', plus: '包含 Try 的全部功能，另加：',
    items: ['保存您的实验室（最多 2 个机柜）', '30 天历史记录', '机柜的只读分享链接', '设备库更新'],
    mailSubject: `${P}：Account 开放时请通知我`, mailBody: 'Account 和 Pro 开放时，请发一封邮件通知我。', mail: '开放时邮件通知我', get: '获取 Account',
  },
  pro: {
    h2: 'Pro', or: '或 ', tag: '讲清楚您的实验室', plus: '包含 Account 的全部功能，另加：',
    items: ['最多 4 个机柜，1 年历史记录', '布线视图：每根线从头到尾追踪', 'AI 视图：每千瓦时 token 数、每百万 token 成本', 'Flaw Finder：所有单点故障，按严重程度排序并给出解决办法', 'PDF 报告和 Excel 导出', 'Upgrade Planner'],
    mailSubject: `${P}：Pro 开放时请通知我`, mailBody: 'Pro 开放时，请发一封邮件通知我。', mail: '开放时邮件通知我', get: '获取 Pro',
    msp: '也适合最多四个机柜的小型办公室或 MSP。',
  },
  mailNote: '邮件链接会打开您的邮件应用；Account 和 Pro 开放时我们只回复一次。不会加入任何邮件列表。',
  compare: {
    h2: '版本对比', feature: '功能',
    rows: ['机柜数量', '从 Excel / CSV 生成 3D 机柜', '电力、散热、网络、计算视图', '电力和网络拓扑图', 'Fail 故障假设', '导入报告和检查', '分享图片 + 机柜立面 PNG', '将实验室下载为文件', '保存实验室', '历史记录（采集代理推出前为模拟数据）', '只读分享链接', '布线视图，经配线架追踪', 'AI 视图：每秒 token 数', 'AI 视图：每千瓦时 token 数、每百万 token 成本、闲置 GPU 查找', 'Flaw Finder', 'PDF 报告、Excel 导出', 'Upgrade Planner（含成本的假设分析）', '告警', '采集代理：自动发现设备'],
    cells: { '24 hours': '24 小时', '30 days': '30 天', '1 year': '1 年', preview: '预览', 'one run': '运行一次', 'one run per lab': '每个实验室一次', 'full, with fixes': '完整版，含解决办法', 'this session': '仅本次会话', unattended: '无人值守' },
    note: '"预览" = 功能可以打开，但数字被模糊处理并显示升级提示。规划中的功能尚未发布。',
  },
  faq: [
    { q: '"不存储数据"是什么意思？', a: '在 Try 中，您的表格只在浏览器中读取，实验室只存在于该标签页中。我们没有任何副本：不使用 Cookie，不使用浏览器存储，不向服务器写入。关闭标签页即清除，除非您把实验室下载为文件。' },
    { q: '需要安装采集代理吗？', a: '不需要。目前所有数据都来自您的表格。一个能自动发现设备并保持数据更新的代理已在规划中；推出后也是可选的。' },
    { q: '能离线使用吗？', a: `打开 ${P} 需要联网，但您的文件不会离开电脑：它只在浏览器中读取。` },
    { q: '可以随时取消吗？', a: '可以，在 Account 和 Pro 开放后：月付在已付月份结束时停止，年付在已付年度结束时停止，在此之前您的实验室仍可使用。' },
    { q: 'Pro 适合谁？', a: '适合想要完整分析的实验室：线缆追踪、每千瓦时 token 数、带解决办法的 Flaw Finder、PDF 报告和 Excel 导出。也适合最多四个机柜的小型办公室或 MSP。' },
    { q: '为什么价格用美元？', a: '结算将以美元进行。应用和计算器中的电费使用您自己的货币和每千瓦时电价。' },
  ],
};
