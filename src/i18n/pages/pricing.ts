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
    h2: 'Compare plans', feature: 'Feature', plans: ['Try', 'Account', 'Pro'],
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
    h2: 'Tarife vergleichen', feature: 'Funktion', plans: ['Try', 'Account', 'Pro'],
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
  title: `${P} 价格：免费试用、每月 ${A.month} 美元或 ${R.month} 美元`,
  description: `免费试用开放后无需注册账户，不存储任何数据。基础账户每月 ${A.month} 美元或每年 ${A.year} 美元，可保存您的 Homelab。专业版增加链路追踪、AI 视图等功能。`,
  crumb: '价格',
  h1: `${P} 价格`, lead: `免费开始使用。仅在需要 ${P} 保存您的 Homelab 时付费。`,
  short: `未注册账户时不存储任何数据。基础账户每月 ${A.month} 美元，可保存您的 Homelab。`,
  currencyNote: '价格以美元计价并以美元结算，折合人民币金额以银行汇率为准。',
  soon: '即将推出', roadmap: '规划中', perMonth: '/ 月', perYear: '{price} / 年，相当于免两个月费用',
  try: {
    h2: '免费试用', price: '免费', tag: '无需账户 · 不存储数据', note: '尚未公开：可观看演示视频或预约演示。',
    items: ['由 Excel/CSV 清单生成 1–2 个 3D 机柜', '供配电、散热、网络、计算视图', '供配电与网络拓扑图，支持 <strong>Fail</strong> 故障推演', '导入报告与检查', '分享图片与机柜立面 PNG 图', '运行一次 Flaw Finder', '关闭标签页即清除，也可将 Homelab 下载为文件'],
    button: '观看演示',
  },
  account: {
    h2: '基础账户', or: '或 ', plus: '包含免费试用的全部功能，另加：',
    items: ['保存 Homelab（最多 2 个机柜）', '30 天历史记录', '机柜只读分享链接', '设备库更新'],
    mailSubject: `${P}：基础账户开放时请通知我`, mailBody: '基础账户和专业版开放时，请发送一封邮件通知我。', mail: '开放时邮件通知我', get: '开通基础账户',
  },
  pro: {
    h2: '专业版', or: '或 ', tag: '全面解析您的 Homelab', plus: '包含基础账户的全部功能，另加：',
    items: ['最多 4 个机柜，1 年历史记录', '布线视图：每根线缆端到端走线追踪', 'AI 视图：每千瓦时 token 数、每百万 token 成本', 'Flaw Finder：识别全部单点故障，按严重程度排序并给出处理建议', 'PDF 报告与 Excel 导出', 'Upgrade Planner'],
    mailSubject: `${P}：专业版开放时请通知我`, mailBody: '专业版开放时，请发送一封邮件通知我。', mail: '开放时邮件通知我', get: '开通专业版',
    msp: '同样适用于最多四个机柜的小型办公室或托管服务商（MSP）。',
  },
  mailNote: '邮件链接将打开您的邮件客户端；基础账户和专业版开放时我们仅回复一次，不会将您加入任何邮件列表。',
  compare: {
    h2: '版本对比', feature: '功能', plans: ['免费试用', '基础账户', '专业版'],
    rows: ['机柜数量', '由 Excel/CSV 生成 3D 机柜', '供配电、散热、网络、计算视图', '供配电与网络拓扑图', 'Fail 故障推演', '导入报告与检查', '分享图片 + 机柜立面 PNG 图', '将 Homelab 下载为文件', '保存 Homelab', '历史记录（采集代理发布前为模拟数据）', '只读分享链接', '布线视图，经配线架走线追踪', 'AI 视图：每秒 token 数', 'AI 视图：每千瓦时 token 数、每百万 token 成本、闲置 GPU 识别', 'Flaw Finder', 'PDF 报告、Excel 导出', 'Upgrade Planner（含成本的场景推演）', '告警', '采集代理：自动发现设备'],
    cells: { '24 hours': '24 小时', '30 days': '30 天', '1 year': '1 年', preview: '预览', 'one run': '一次', 'one run per lab': '每个 Homelab 一次', 'full, with fixes': '完整版，含处理建议', 'this session': '仅当前会话', unattended: '无人值守' },
    note: '“预览”指功能可打开，但数据模糊显示并附升级提示。规划中的功能尚未发布。',
  },
  faq: [
    { q: '“不存储数据”是什么意思？', a: '在免费试用版中，您的清单仅在浏览器本地读取，Homelab 仅存在于当前标签页。我们不保留任何副本：不使用 Cookie，不使用浏览器存储，不向服务器写入数据。关闭标签页即清除，除非您将 Homelab 下载为文件。' },
    { q: '是否需要安装采集代理？', a: '无需安装。目前所有数据均来自您的 Excel/CSV 清单。可自动发现设备并保持数据更新的采集代理已列入规划；发布后为可选组件。' },
    { q: '能否离线使用？', a: `打开 ${P} 需要联网，但文件不会离开您的电脑：清单仅在浏览器本地读取。` },
    { q: '可以随时取消吗？', a: '可以（基础账户和专业版开放后）：月付方案在已付费月份结束时终止，年付方案在已付费年度结束时终止，在此之前您的 Homelab 仍可使用。' },
    { q: '专业版适合哪些用户？', a: '适合需要全面分析的 Homelab：链路追踪、每千瓦时 token 数、含处理建议的 Flaw Finder、PDF 报告与 Excel 导出。同样适用于最多四个机柜的小型办公室或托管服务商（MSP）。' },
    { q: '为什么以美元计价？', a: '结算将以美元进行。应用和计算器中的电费按您设置的币种和电价计算。' },
  ],
};
