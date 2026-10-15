// /privacy/ copy in en, de, zh (the same text in every language; no ICP claim on the Chinese page, I18N.md §3).
// Items are html: {mail} = the contact mailto link, {site} = the company site link.
import { PRODUCT_NAME as P, BRAND } from '../../config/brand';
import type { Deep } from '../config';

export const en = {
  title: `Privacy | ${BRAND}`,
  description: `No account = we store nothing. How ${P} and this site handle your files: read in your browser, never uploaded.`,
  crumb: 'Privacy', h1: 'Privacy',
  lead: '<strong>Short version:</strong> No account = we store nothing. Your spreadsheet is read in your browser and never sent to us.',
  try: { h2: `${P} without an account (Try)`, items: [
    'The file you import is read in your browser. It is not uploaded.',
    "Your lab lives only in that browser tab. Close the tab and it's gone; we never had a copy.",
    'Try sets no cookies, uses no browser storage and makes no requests to third-party servers. You can download your lab as a file and import it again later.',
  ] },
  site: {
    h2: 'This website',
    analyticsOn: "We count visits with Cloudflare Web Analytics: no cookies, no browser storage, no fingerprinting. It records the page, the referring site, the country and the device type, and we only see totals. No other analytics, no ads, and no other third-party scripts except Cloudflare's bot check on the waitlist form.",
    analyticsOff: "No analytics, no cookies, no ads and no third-party scripts (one exception: Cloudflare's bot check on the waitlist form, below).",
    hosting: " The site is hosted on Cloudflare Pages; Cloudflare receives your IP address to deliver and protect the pages, as described in Cloudflare's privacy policy.",
    items: [
      'The calculators run in your browser. If you pick a currency, an electricity price, calculator inputs or the theme (Auto, Dark, Bright), your browser remembers it on your device. We don\'t receive it.',
      'The site comes in English, German and Chinese. On your first visit we may send you to the German or Chinese pages based on the country Cloudflare reports for your connection. A cookie named <code>lang</code> then remembers the language (or the one you pick with the language switcher) for one year. It holds only the language code, and the server reads it only to choose the language.',
      'If you e-mail us to hear when Account and Pro open, we use your address for that one reply and then delete it.',
    ],
  },
  waitlist: { h2: 'The waitlist', items: [
    "If you join the waitlist we store your e-mail address, the product you picked, the optional note about your rack, where you came from (the <code>?src</code> in the link, for example <code>yt</code>, with <code>-de</code> or <code>-zh</code> added when you sign up on a German or Chinese page) and your browser's user-agent string, plus a one-way hash of your IP address that only serves to limit spam (five tries per hour).",
    "A Cloudflare Turnstile check on the form tells people from bots. It runs Cloudflare's script on that page only.",
    "We use the address for one e-mail when the self-serve Try opens. We don't share it and we don't add it to any other list. Ask us at {mail} and we delete it.",
  ] },
  account: { h2: 'With an Account (when available)', items: [
    'We store your lab, its history and your account details so you can come back to them. Ask us at {mail} and we delete your lab or your account.',
    'Payments will be handled by our payment provider. We never see your card number.',
  ] },
  who: {
    h2: 'Who we are',
    p: `rack-density.com, ${P} and DC Sim are run by Mustard Seed Solutions (Malta, {site}), which is responsible for the data described here. ${BRAND} is its brand. Questions: {mail}.`,
  },
  updated: 'Last updated: 15 October 2026 (language versions and the language cookie added)',
};

export const de: Deep<typeof en> = {
  title: `Datenschutz | ${BRAND}`,
  description: `Try ohne Konto speichert nichts. Wie ${P} und diese Website mit Ihren Dateien umgehen: im Browser gelesen, nie hochgeladen.`,
  crumb: 'Datenschutz', h1: 'Datenschutz',
  lead: '<strong>Kurz gesagt:</strong> Try ohne Konto speichert nichts. Ihre Tabelle wird im Browser gelesen und nie an uns gesendet.',
  try: { h2: `${P} ohne Konto (Try)`, items: [
    'Die Datei, die Sie importieren, wird in Ihrem Browser gelesen. Sie wird nicht hochgeladen.',
    'Ihr Lab existiert nur in diesem Browser-Tab. Schließen Sie den Tab, ist es weg; wir hatten nie eine Kopie.',
    'Try setzt keine Cookies, nutzt keinen Browserspeicher und sendet keine Anfragen an Server Dritter. Sie können Ihr Lab als Datei herunterladen und später wieder importieren.',
  ] },
  site: {
    h2: 'Diese Website',
    analyticsOn: 'Wir zählen Besuche mit Cloudflare Web Analytics: keine Cookies, kein Browserspeicher, kein Fingerprinting. Erfasst werden die Seite, die verweisende Website, das Land und der Gerätetyp, und wir sehen nur Summen. Keine andere Analyse, keine Werbung und keine anderen Skripte Dritter außer der Bot-Prüfung von Cloudflare im Formular der Warteliste.',
    analyticsOff: 'Keine Analyse, keine Cookies, keine Werbung und keine Skripte Dritter (eine Ausnahme: die Bot-Prüfung von Cloudflare im Formular der Warteliste, siehe unten).',
    hosting: ' Die Website wird bei Cloudflare Pages gehostet; Cloudflare erhält Ihre IP-Adresse, um die Seiten auszuliefern und zu schützen, wie in der Datenschutzerklärung von Cloudflare beschrieben.',
    items: [
      'Die Rechner laufen in Ihrem Browser. Wenn Sie eine Währung, einen Strompreis, Rechnerwerte oder die Darstellung (Auto, Dunkel, Hell) wählen, merkt sich Ihr Browser das auf Ihrem Gerät. Wir erhalten davon nichts.',
      'Die Website gibt es auf Englisch, Deutsch und Chinesisch. Beim ersten Besuch leiten wir Sie unter Umständen anhand des Landes, das Cloudflare für Ihre Verbindung meldet, auf die deutschen oder chinesischen Seiten. Ein Cookie namens <code>lang</code> merkt sich dann die Sprache (oder die, die Sie im Sprachumschalter wählen) für ein Jahr. Es enthält nur das Sprachkürzel, und der Server liest es nur, um die Sprache zu wählen.',
      'Wenn Sie uns schreiben, um zu erfahren, wann Account und Pro öffnen, nutzen wir Ihre Adresse für diese eine Antwort und löschen sie danach.',
    ],
  },
  waitlist: { h2: 'Die Warteliste', items: [
    'Wenn Sie sich auf die Warteliste setzen, speichern wir Ihre E-Mail-Adresse, das gewählte Produkt, die optionale Notiz zu Ihrem Rack, woher Sie kamen (das <code>?src</code> im Link, zum Beispiel <code>yt</code>, ergänzt um <code>-de</code> oder <code>-zh</code>, wenn Sie sich auf einer deutschen oder chinesischen Seite anmelden) und die User-Agent-Kennung Ihres Browsers, dazu einen Einweg-Hash Ihrer IP-Adresse, der nur dazu dient, Spam zu begrenzen (fünf Versuche pro Stunde).',
    'Eine Cloudflare-Turnstile-Prüfung im Formular unterscheidet Menschen von Bots. Sie führt das Skript von Cloudflare nur auf dieser Seite aus.',
    'Wir nutzen die Adresse für eine E-Mail, wenn Try zum Selbsttesten öffnet. Wir geben sie nicht weiter und setzen sie auf keine andere Liste. Schreiben Sie uns an {mail}, und wir löschen sie.',
  ] },
  account: { h2: 'Mit einem Account (sobald verfügbar)', items: [
    'Wir speichern Ihr Lab, seinen Verlauf und Ihre Kontodaten, damit Sie darauf zurückgreifen können. Schreiben Sie uns an {mail}, und wir löschen Ihr Lab oder Ihr Konto.',
    'Zahlungen wickelt künftig unser Zahlungsdienstleister ab. Ihre Kartennummer sehen wir nie.',
  ] },
  who: {
    h2: 'Wer wir sind',
    p: `rack-density.com, ${P} und DC Sim werden von Mustard Seed Solutions (Malta, {site}) betrieben. Das Unternehmen ist für die hier beschriebenen Daten verantwortlich. ${BRAND} ist ein Angebot des Unternehmens. Fragen: {mail}.`,
  },
  updated: 'Zuletzt aktualisiert: 15. Oktober 2026 (Sprachversionen und Sprach-Cookie ergänzt)',
};

export const zh: Deep<typeof en> = {
  title: `隐私政策 | ${BRAND}`,
  description: `未注册账户时不存储任何数据。${P} 与本网站如何处理您的文件：在浏览器本地读取，不上传。`,
  crumb: '隐私政策', h1: '隐私政策',
  lead: '<strong>概要：</strong>免费试用版在未注册账户时不存储任何数据。您的清单在浏览器本地读取，不会发送给我们。',
  try: { h2: `未注册账户使用 ${P}（免费试用）`, items: [
    '您导入的文件在浏览器本地读取，不上传。',
    'Homelab 数据仅存在于当前浏览器标签页。关闭标签页即清除，我们不保留任何副本。',
    '免费试用版不设置 Cookie，不使用浏览器存储，也不向第三方服务器发送请求。您可将 Homelab 下载为文件，日后重新导入。',
  ] },
  site: {
    h2: '本网站',
    analyticsOn: '我们使用 Cloudflare Web Analytics 统计访问量：不使用 Cookie，不使用浏览器存储，不进行设备指纹识别。该服务记录访问页面、来源网站、国家或地区及设备类型，我们仅可查看汇总数据。除候补名单表单上的 Cloudflare 人机验证外，本网站不使用其他统计工具、广告或第三方脚本。',
    analyticsOff: '本网站不使用统计工具、Cookie、广告或第三方脚本（唯一例外为候补名单表单上的 Cloudflare 人机验证，详见下文）。',
    hosting: '本网站托管于 Cloudflare Pages；Cloudflare 会接收您的 IP 地址，用于传输和保护网页，详见 Cloudflare 隐私政策。',
    items: [
      '计算器在您的浏览器本地运行。您选择的币种、电价、计算器参数或显示模式（自动、深色、浅色）仅保存在您的设备上，我们不会接收这些信息。',
      '本网站提供英文、德文和中文版本。首次访问时，我们可能根据 Cloudflare 识别的国家或地区，将您引导至德文或中文页面。随后，名为 <code>lang</code> 的 Cookie 将记录该语言（或您通过语言切换选择的语言），有效期一年。该 Cookie 仅包含语言代码，服务器仅用其选择页面语言。',
      '如您发送邮件询问基础账户和专业版的开放时间，我们仅使用您的邮箱回复一次，随后删除。',
    ],
  },
  waitlist: { h2: '候补名单', items: [
    '加入候补名单时，我们保存您的邮箱地址、所选产品、关于机柜的选填备注、来源（链接中的 <code>?src</code>，例如 <code>yt</code>；在德文或中文页面登记时附加 <code>-de</code> 或 <code>-zh</code>）及浏览器 User-Agent 字符串，另保存 IP 地址的单向哈希值，仅用于限制垃圾提交（每小时五次）。',
    '表单使用 Cloudflare Turnstile 人机验证，用于区分真人与自动程序。Cloudflare 脚本仅在该页面运行。',
    '我们仅在自助免费试用开放时使用该邮箱发送一封邮件，不会共享，也不会加入任何其他名单。如需删除，请发送邮件至 {mail}。',
  ] },
  account: { h2: '使用账户时（推出后）', items: [
    '我们保存您的 Homelab、历史记录及账户信息，以便您随时访问。如需删除 Homelab 或账户，请发送邮件至 {mail}。',
    '付款将由我们的支付服务商处理，我们不会获取您的银行卡号。',
  ] },
  who: {
    h2: '关于我们',
    p: `rack-density.com、${P} 和 DC Sim 由 Mustard Seed Solutions（马耳他，{site}）运营，并对本页所述数据负责。${BRAND} 是其旗下品牌。如有疑问，请联系 {mail}。`,
  },
  updated: '最后更新：2026 年 10 月 15 日（新增多语言版本及语言 Cookie）',
};
