// /calculator/ copy (Rack Density Calculator) in en, de, zh. The FAQ renders the visible list and the FAQPage JSON-LD.
import { PRODUCT_NAME as P, BRAND } from '../../config/brand';
import { calculatorFaq } from '../../data/faq';
import type { Deep } from '../config';

export const en = {
  title: `Rack Density Calculator | ${BRAND}`,
  description: 'Free rack density calculator: how many devices fit in your rack by space, power and cooling, the kW per rack and the cost per month, with a live rack diagram.',
  crumb: 'Calculator',
  schemaName: 'Rack Density Calculator',
  schemaDescription: 'Calculate how many servers or homelab devices fit in one rack by space, power and cooling, the kW per rack, and the monthly electricity cost. Presets for 10-inch mini racks, 12U wall racks, 22U and 42U racks.',
  eyebrow: 'Free tool · runs in your browser, no data leaves it',
  h1: 'Rack Density Calculator',
  lead: 'How many devices fit in your rack before space, power or cooling runs out, and which one runs out first? Works for a 10-inch mini rack in a closet or a 42U rack in a data hall.',
  see: {
    h2: 'See a rack like this in 3D, with real cables and what fails',
    body: `What each device draws, what's plugged where, and what goes dark if the UPS fails: watch it in ${P}.`, button: 'See it',
  },
  how: {
    h2: 'How rack density is calculated', single: '(single-phase)', three: '(three-phase)',
    p: 'Real rack density is the floor of three independent ceilings. Whichever is lowest is the bottleneck: usually power or heat in a homelab, cooling in a modern data center, space only in very small racks.',
  },
  /** Links in src/views/Calculator.astro (MORE), in this order. */
  more: {
    h2: 'More calculators',
    items: [
      { a: 'UPS runtime calculator', rest: ': minutes on battery, load against the watt rating, the smallest UPS for your load' },
      { a: 'Homelab power cost', rest: ': what your whole lab costs per month, device by device' },
      { a: 'Tokens per watt', rest: ': the efficiency of your home AI box' },
      { a: '10-inch rack planner', rest: ': will it fit, and how many U' },
      { a: 'Idle savings and payback', rest: '' },
      { a: 'Rack power calculator', rest: ': load per PDU in normal and failover against the 80 % rule' },
    ],
  },
  faq: calculatorFaq,
};

export const de: Deep<typeof en> = {
  title: 'Rack-Rechner: Wie viele Server passen ins Rack?',
  description: 'Kostenloser Rack-Rechner: Wie viele Geräte passen nach Platz (HE), Strom und Kühlung ins Rack? Mit kW pro Rack, Stromkosten pro Monat und interaktivem Schema.',
  crumb: 'Rechner',
  schemaName: 'Rack-Rechner',
  schemaDescription: 'Berechnet, wie viele Server oder Homelab-Geräte nach Platz, Strom und Kühlung in ein Rack passen, die kW pro Rack und die monatlichen Stromkosten. Voreinstellungen für 10-Zoll-Miniracks, 12-HE-Wandschränke, 22- und 42-HE-Racks.',
  eyebrow: 'Kostenloses Werkzeug · läuft im Browser, keine Daten verlassen den Browser',
  h1: 'Rack-Rechner für Server, Strom und Kühlung',
  lead: 'Wie viele Geräte passen in Ihr Rack, bevor Platz, Strom oder Kühlung ausgehen, und was geht zuerst aus? Für das 10-Zoll-Minirack im Abstellraum ebenso wie für das 42-HE-Rack im Rechenzentrum (HE = Höheneinheit, englisch U).',
  see: {
    h2: 'So ein Rack in 3D ansehen, mit echten Kabeln und Ausfällen',
    body: `Was jedes Gerät verbraucht, was wo steckt und was dunkel wird, wenn die USV ausfällt: in ${P} zu sehen.`, button: 'Ansehen',
  },
  how: {
    h2: 'So wird die Rack-Dichte (Leistungsdichte) berechnet', single: '(einphasig)', three: '(Drehstrom)',
    p: 'Die tatsächliche Rack-Dichte ist die kleinste von drei unabhängigen Obergrenzen, jeweils abgerundet. Die niedrigste ist der Engpass: im Homelab meist Strom oder Wärme, im modernen Rechenzentrum die Kühlung, der Platz nur bei sehr kleinen Racks.',
  },
  more: {
    h2: 'Weitere Rechner',
    items: [
      { a: 'USV-Laufzeitrechner', rest: ': Minuten im Akkubetrieb, Last im Verhältnis zur Watt-Angabe, die kleinste passende USV' },
      { a: 'Homelab-Stromkosten', rest: ': was Ihr ganzes Lab im Monat kostet, Gerät für Gerät' },
      { a: 'Tokens pro Watt', rest: ': wie effizient Ihr KI-Server zu Hause arbeitet' },
      { a: '10-Zoll-Rackplaner', rest: ': passt es, und wie viele HE' },
      { a: 'Leerlauf-Einsparung und Amortisation', rest: '' },
      { a: 'Rack-Leistungsrechner', rest: ': Last pro PDU im Normalbetrieb und bei Ausfall, gemessen an der 80-%-Regel' },
    ],
  },
  faq: [
    { q: 'Was ist Rack-Dichte?', a: 'Die Rack-Dichte gibt an, wie viel Rechenleistung, Strom oder Wärme in einem Rack steckt, meist als kW pro Rack oder Server pro Rack. Höhere Dichte heißt mehr Rechenleistung pro Quadratmeter, aber engere Grenzen bei Kühlung und Stromversorgung.' },
    { q: 'Wie viele Server passen in ein 42-HE-Rack?', a: 'Mit 1-HE-Servern passen physisch 42 Server hinein, doch diese Grenze erreichen Sie fast nie. Strom und Kühlung begrenzen die tatsächliche Dichte meist auf 20–35 Server, je nach Leistungsaufnahme pro Server und Absicherung des Stromkreises.' },
    { q: 'Wie viel kW pro Rack sind sicher?', a: 'Die meisten Racks in Unternehmen laufen mit 5 bis 15 kW. Alles über 15 kW gilt als High Density und braucht meist Reihenkühlung (In-Row), Rücktür-Wärmetauscher oder Flüssigkeitskühlung.' },
    { q: 'Wie berechne ich Drehstromleistung in kW?', a: 'Wirkleistung bei Drehstrom = √3 × Außenleiterspannung × Leiterstrom × Leistungsfaktor ÷ 1000. Bei einer Angabe als Scheinleistung in kVA gilt: kW = kVA × Leistungsfaktor.' },
    { q: 'Warum geht die Kühlung vor dem Platz aus?', a: 'Moderne 1-HE-Server ziehen jeweils 400–800 W. Ein 42-HE-Rack voller 1-HE-Server bräuchte 17–34 kW Kühlleistung, mehr als die meisten Kühlkreisläufe pro Rack liefern.' },
    { q: 'Einphasig oder Drehstrom fürs Rack?', a: 'Einphasig reicht bis etwa 5 kW pro Rack. Darüber liefert Drehstrom über dieselben Leiter mehr Leistung und verteilt die Last; die meisten Racks über 7 kW nutzen Drehstrom-PDUs.' },
    { q: 'Wie viel Reserve sollte ich einplanen?', a: 'Planen Sie 20–30 % Reserve bei Strom und Kühlung ein, damit der Ausfall einer PDU oder eines Kühlgeräts verkraftet wird (N+1). Dieser Rechner zeigt OK nur bei mindestens 20 % Reserve bei Strom und Kühlung.' },
    { q: 'Wie viele Server passen in ein Rack zu Hause?', a: 'Meist gehen Strom oder Wärme aus, bevor der Platz knapp wird. Ein Abstellraum ohne zusätzliche Kühlung verkraftet einige hundert Watt. Ein europäischer 16-A-Stromkreis reicht für etwa 2,9 kW Dauerlast (80-%-Regel), ein US-Stromkreis mit 15 A für etwa 1,4 kW. Geben Sie Rackhöhe, Gerätegröße und Leistung ein, um zu sehen, was Sie begrenzt.' },
    { q: 'Was kostet der Betrieb eines Homelab-Racks im Monat?', a: 'Monatliche Kosten = durchschnittliche Leistung in kW × 730 Stunden × Ihr Preis pro kWh. Bei 200 W und 0,35 €/kWh sind das etwa 51 € im Monat, bei 0,30 €/kWh etwa 44 €.' },
    { q: 'Welche Rackgröße brauche ich fürs Homelab?', a: 'Zählen Sie die HE, die Ihre Geräte brauchen, und rechnen Sie etwa 30 % für Patchpanels, Kabelführung, eine USV und Zuwachs hinzu. Ein 10-Zoll-Minirack (6–12 HE) fasst Mini-PCs und einen kleinen Switch, ein 12-HE-Wandschrank einen Switch, ein Patchpanel und ein paar Server; ab 22 HE passen Rackserver.' },
    { q: 'Braucht ein Homelab-Rack Kühlung?', a: 'Jedes Watt, das Ihre Geräte aufnehmen, landet als Wärme im Raum: 1 W ≈ 3,4 BTU/h. Bis zu einigen hundert Watt reicht meist ein belüfteter Abstellraum oder ein offener Raum; darüber planen Sie einen Abluftventilator oder eine Klimaanlage ein und behalten die Zulufttemperatur im Blick.' },
  ],
};

export const zh: Deep<typeof en> = {
  title: `机架功率密度计算器：一个机柜能放多少台服务器 | ${BRAND}`,
  description: '免费的机架功率密度计算器：按 U 位空间、供电和制冷计算单机柜可容纳的服务器数量、单机柜功率（kW）与每月电费，并提供交互式机柜示意图。',
  crumb: '计算器',
  schemaName: '机架功率密度计算器',
  schemaDescription: '按空间、供电和制冷计算单个机柜可容纳的服务器或 Homelab 设备数量、单机柜功率（kW）及每月电费。内置 10 英寸迷你机柜、12U 壁挂机柜、22U 及 42U 机柜预设。',
  eyebrow: '免费工具 · 在浏览器本地运行，数据不上传',
  h1: '机架功率密度计算器',
  lead: '在空间、供电或制冷达到上限之前，机柜可容纳多少台设备？哪项资源最先耗尽？既适用于储物间内的 10 英寸迷你机柜，也适用于数据中心的 42U 机柜。',
  see: {
    h2: '以 3D 查看同类机柜：真实布线与故障影响',
    body: `每台设备的功耗、线缆连接关系，以及 UPS 故障时的断电范围，均可在 ${P} 中查看。`, button: '观看演示',
  },
  how: {
    h2: '机架功率密度的计算方法', single: '（单相）', three: '（三相）',
    p: '实际可部署数量取三项独立上限中的最小值（均向下取整）。最小的一项即为瓶颈：Homelab 中通常为供电或散热，现代数据中心中通常为制冷，仅在很小的机柜中才会受限于空间。',
  },
  more: {
    h2: '更多计算器',
    items: [
      { a: 'UPS 后备时间计算器', rest: '：电池后备时间、负载占额定功率的比例、满足负载的最小 UPS 容量' },
      { a: 'Homelab 电费计算', rest: '：逐台设备计算整个 Homelab 的每月电费' },
      { a: '每瓦 token 数', rest: '：本地 AI 主机的能效' },
      { a: '10 英寸机柜规划', rest: '：能否装下、需要多少 U' },
      { a: '待机节能与投资回收期', rest: '' },
      { a: '机柜功率计算器', rest: '：正常运行与故障切换时各 PDU 的负载，对照 80% 规则' },
    ],
  },
  faq: [
    { q: '什么是机架功率密度？', a: '机架功率密度是指单个机柜内的算力、功率或热负荷，通常以每机柜 kW 数或每机柜服务器台数表示。密度越高，单位面积算力越高，供电与制冷约束也越严格。' },
    { q: '一个 42U 机柜能放多少台服务器？', a: '若使用 1U 服务器，42U 机柜在物理空间上可容纳 42 台，但实际很少达到。受供电和制冷限制，实际部署数量通常为 20–35 台，具体取决于单台功耗和供电回路容量。' },
    { q: '单机柜功率多少 kW 较为稳妥？', a: '多数企业机柜的运行功率为 5–15 kW。超过 15 kW 即属于高密度部署，通常需要列间空调、背板热交换器或液冷。' },
    { q: '三相电功率如何换算为 kW？', a: '三相有功功率 = √3 × 线电压 × 线电流 × 功率因数 ÷ 1000。若额定值为视在功率（kVA）：kW = kVA × 功率因数。' },
    { q: '为什么制冷会先于空间达到上限？', a: '现代 1U 服务器单台功耗可达 400–800 W。一个满配 1U 服务器的 42U 机柜需要 17–34 kW 制冷量，超过多数机房可为单机柜提供的冷量。' },
    { q: '机柜应采用单相还是三相供电？', a: '单机柜 5 kW 左右以内，单相供电即可满足。超过该功率时，三相供电可在相同导线截面下输送更大功率并平衡负载；7 kW 以上的机柜大多采用三相 PDU。' },
    { q: '应预留多少余量？', a: '供电和制冷建议预留 20–30% 的余量，以便在单台 PDU 或单台空调故障时维持运行（N+1）。本计算器仅在供电和制冷余量均不低于 20% 时显示“正常”。' },
    { q: '家用机柜能放多少台服务器？', a: '通常供电或散热会先于空间达到上限。无额外制冷的储物间仅能承受数百瓦。国内常见的 220 V / 16 A 回路按 80% 规则计算，持续负载约 2.8 kW；10 A 回路约 1.76 kW。输入机柜高度、设备尺寸和功耗，即可确定瓶颈所在。' },
    { q: 'Homelab 机柜每月电费是多少？', a: '每月电费 = 平均负载功率（kW）× 730 小时 × 电价（元/kWh）。以 200 W、0.6 元/kWh 计算，每月用电约 146 kWh，电费约 88 元。' },
    { q: 'Homelab 需要多大的机柜？', a: '先统计设备所需的 U 数，再预留约 30% 用于配线架、理线器、UPS 及后续扩容。10 英寸迷你机柜（6–12U）适合迷你主机和小型交换机；12U 壁挂机柜可容纳交换机、配线架和数台服务器；22U 及以上适合机架式服务器。' },
    { q: 'Homelab 机柜是否需要制冷？', a: '设备消耗的电能最终全部转化为热量：1 W ≈ 3.4 BTU/h。数百瓦以内，通风良好的储物间或开放空间通常即可满足；功耗更高时，应配置排风扇或空调，并关注进风温度。' },
  ],
};
