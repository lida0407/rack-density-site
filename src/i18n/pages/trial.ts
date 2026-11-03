// /try/ (sign-up for the one-session trial, ~/Sensaka/TRY-SIGNUP.md §1, §6) in en, de, zh. The DC Sim lines (form.dc,
// prep.dc) are DC marketing's to word; send changes and they go in here.
import { PRODUCT_NAME as P, DC_PRODUCT_NAME as D, BRAND } from '../../config/brand';
import { TEMPLATE_VERSION as V } from '../../config/dc/product';
import { TRIAL } from '../../config/trial.mjs';
import type { Deep } from '../config';
const M = TRIAL.minutes;

export const en = {
  title: `Try ${P} or ${D} Once, Free | ${BRAND}`,
  description: `Sign up with your e-mail and try ${P} or ${D} once with your own spreadsheet: one ${M}-minute session, the full Try feature set, nothing stored.`,
  crumb: 'Try it once',
  eyebrow: 'Free trial · one session · your own spreadsheet',
  h1: 'Try it once with your own spreadsheet',
  lines: [
    `Pick ${P} or ${D}, sign up with your e-mail, and open the app with your own spreadsheet.`,
    `One session of ${M} minutes from the moment the app opens. Import the same or a corrected file as often as you like inside it.`,
    `Nothing is kept: ${P} reads your file in your browser; ${D} deletes your trial hall within 24 hours after the session.`,
  ],
  form: {
    product: 'Product',
    homelab: 'Your homelab rack in 3D: watts and cost per device, cables, and what goes dark when one thing fails.',
    dc: 'Your data hall in 3D: the power chain, cooling and cabling, and what-if failures with estimated impact.',
    email: 'E-mail', note: "What's in your rack or hall?", optional: 'optional, 120 characters',
    placeholder: 'e.g. 3 mini PCs, a NAS, a 10-inch rack · or: 2 rooms, 40 racks, A/B feeds',
    updates: 'E-mail me when accounts open', updatesHint: 'Optional. Without it we send you nothing.',
    submit: 'Start my trial',
    /** {privacy} = link to the privacy page */
    fine: 'One trial per e-mail address. We keep your e-mail, the product, your note, whether you ticked the box and a hashed IP address in Cloudflare D1. Details: {privacy}.',
    privacy: 'Privacy',
  },
  prep: {
    h2: 'No spreadsheet yet?',
    p: `Fill in the template first, or look at a finished example: the ${M} minutes start only when the app opens. Templates and column names are in English.`,
    homelab: { template: 'Homelab template (.xlsx)', sample: 'Basement Lab example (.xlsx)', seeIt: 'See it: clips and stills' },
    dc: { template: `Import template v${V} (.xlsx)`, sample: 'Demo hall (.xlsx)' },
  },
  js: {
    sending: 'Starting your trial…',
    email: 'That e-mail address does not look right.', mx: 'We could not find a mail server for that domain. Check the address.',
    turnstile: 'The anti-bot check did not pass. Try again.', rate: 'Too many tries from this connection. Try again in an hour.',
    closed: 'The trial is not open yet.', down: 'The trial is not reachable right now. Try again in a minute, or write to da@mustardseedmt.com.',
    dry: 'Test mode: the pass was issued but not set as a cookie.',
  },
  used: { h2: 'This e-mail address has already used its trial', p: 'Accounts are coming. Join the waitlist to hear when they open, or write to {mail}.', waitlist: 'Join the waitlist' },
};

export const de: Deep<typeof en> = {
  title: `${P} oder ${D} kostenlos testen | ${BRAND}`,
  description: `Mit Ihrer E-Mail-Adresse anmelden und ${P} oder ${D} einmal mit Ihrer eigenen Tabelle testen: eine Sitzung von ${M} Minuten, alle Try-Funktionen, nichts wird gespeichert.`,
  crumb: 'Einmal testen',
  eyebrow: 'Kostenloser Test · eine Sitzung · Ihre eigene Tabelle',
  h1: 'Einmal testen, mit Ihrer eigenen Tabelle',
  lines: [
    `Wählen Sie ${P} oder ${D}, melden Sie sich mit Ihrer E-Mail-Adresse an und öffnen Sie die App mit Ihrer eigenen Tabelle.`,
    `Eine Sitzung von ${M} Minuten ab dem Öffnen der App. Innerhalb der Sitzung importieren Sie dieselbe oder eine korrigierte Datei beliebig oft.`,
    `Nichts wird aufbewahrt: ${P} liest Ihre Datei im Browser; ${D} löscht Ihre Testhalle innerhalb von 24 Stunden nach der Sitzung.`,
  ],
  form: {
    product: 'Produkt',
    homelab: 'Ihr Homelab-Rack in 3D: Watt und Kosten pro Gerät, Kabel und was bei einem Ausfall dunkel wird.',
    dc: 'Ihr Rechenzentrumssaal in 3D: Stromversorgungskette, Kühlung und Verkabelung, simulierte Ausfälle mit geschätzten Auswirkungen.',
    email: 'E-Mail', note: 'Was steckt in Ihrem Rack oder Saal?', optional: 'optional, 120 Zeichen',
    placeholder: 'z. B. 3 Mini-PCs, ein NAS, ein 10-Zoll-Rack · oder: 2 Räume, 40 Racks, A/B-Einspeisung',
    updates: 'Per E-Mail benachrichtigen, wenn Konten verfügbar sind', updatesHint: 'Optional. Ohne Häkchen senden wir Ihnen nichts.',
    submit: 'Test starten',
    fine: 'Ein Test pro E-Mail-Adresse. Wir speichern Ihre E-Mail-Adresse, das Produkt, Ihre Notiz, ob Sie das Häkchen gesetzt haben, und einen Hash Ihrer IP-Adresse in Cloudflare D1. Details: {privacy}.',
    privacy: 'Datenschutz',
  },
  prep: {
    h2: 'Noch keine Tabelle?',
    p: `Füllen Sie zuerst die Vorlage aus oder sehen Sie sich ein fertiges Beispiel an: Die ${M} Minuten beginnen erst, wenn die App öffnet. Vorlagen und Spaltennamen sind auf Englisch.`,
    homelab: { template: 'Homelab-Vorlage (.xlsx)', sample: 'Beispiel Basement Lab (.xlsx)', seeIt: 'Ansehen: Clips und Standbilder' },
    dc: { template: `Importvorlage v${V} (.xlsx)`, sample: 'Demo-Halle (.xlsx)' },
  },
  js: {
    sending: 'Test wird gestartet …',
    email: 'Diese E-Mail-Adresse sieht nicht richtig aus.', mx: 'Für diese Domain wurde kein Mailserver gefunden. Bitte prüfen Sie die Adresse.',
    turnstile: 'Die Bot-Prüfung ist fehlgeschlagen. Bitte versuchen Sie es erneut.', rate: 'Zu viele Versuche von dieser Verbindung. Bitte in einer Stunde erneut versuchen.',
    closed: 'Der Testzugang ist noch nicht geöffnet.', down: 'Der Testzugang ist gerade nicht erreichbar. Bitte in einer Minute erneut versuchen oder an da@mustardseedmt.com schreiben.',
    dry: 'Testmodus: Der Pass wurde ausgestellt, aber nicht als Cookie gesetzt.',
  },
  used: { h2: 'Mit dieser E-Mail-Adresse wurde der Test bereits genutzt', p: 'Konten kommen bald. Tragen Sie sich in die Warteliste ein oder schreiben Sie an {mail}.', waitlist: 'Auf die Warteliste' },
};

export const zh: Deep<typeof en> = {
  title: `免费试用一次 ${P} 或 ${D} | ${BRAND}`,
  description: `使用邮箱注册，即可用您自己的 Excel/CSV 清单免费试用一次 ${P} 或 ${D}：单次会话 ${M} 分钟，包含免费试用版全部功能，不存储任何数据。`,
  crumb: '免费试用',
  eyebrow: '免费试用 · 单次会话 · 使用您自己的清单',
  h1: '使用您自己的清单，免费试用一次',
  lines: [
    `选择 ${P} 或 ${D}，使用邮箱注册后，即可在应用中导入您自己的清单。`,
    `单次会话 ${M} 分钟，自应用打开时开始计时。会话期间可多次导入同一文件或修正后的文件。`,
    `不保留任何数据：${P} 仅在浏览器本地读取文件；${D} 在会话结束后 24 小时内删除试用机房数据。`,
  ],
  form: {
    product: '产品',
    homelab: '以 3D 呈现您的 Homelab 机柜：每台设备的功耗与电费、线缆连接，以及单台设备故障时的影响范围。',
    dc: '以 3D 呈现您的数据中心机房：供配电链路、制冷与布线，以及含估算影响的故障推演。',
    email: '邮箱', note: '您的机柜或机房中有哪些设备？', optional: '选填，不超过 120 字',
    placeholder: '例如：3 台迷你主机、1 台 NAS、10 英寸机柜 · 或：2 个机房、40 个机柜、A/B 路供电',
    updates: '账户功能开放时邮件通知我', updatesHint: '选填。不勾选则我们不会向您发送任何邮件。',
    submit: '开始试用',
    fine: '每个邮箱限试用一次。我们在 Cloudflare D1 中保存您的邮箱、所选产品、备注、是否勾选通知，以及 IP 地址的哈希值。详见{privacy}。',
    privacy: '隐私政策',
  },
  prep: {
    h2: '还没有清单？',
    p: `请先填写导入模板，或参考已填好的示例：${M} 分钟自应用打开时才开始计时。导入模板及列名为英文。`,
    homelab: { template: 'Homelab 导入模板（.xlsx）', sample: 'Basement Lab 示例（.xlsx）', seeIt: '观看演示：视频与截图' },
    dc: { template: `导入模板 v${V}（.xlsx）`, sample: '演示机房（.xlsx）' },
  },
  js: {
    sending: '正在开通试用…',
    email: '邮箱地址格式不正确。', mx: '未找到该域名的邮件服务器，请检查邮箱地址。',
    turnstile: '人机验证未通过，请重试。', rate: '当前网络提交次数过多，请一小时后重试。',
    closed: '免费试用尚未开放。', down: '试用服务暂时无法访问，请稍后重试，或发送邮件至 da@mustardseedmt.com。',
    dry: '测试模式：已签发试用凭证，未写入 Cookie。',
  },
  used: { h2: '该邮箱已使用过免费试用', p: '账户功能即将推出。您可以加入候补名单以获知开放时间，或发送邮件至 {mail}。', waitlist: '加入候补名单' },
};
