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
  title: `机柜功率密度计算器：一个机柜能放多少台服务器 | ${BRAND}`,
  description: '免费的机柜功率密度计算器：按 U 位、供电和制冷算出一个机柜能放多少台服务器、单机柜功率（kW）和每月电费，并配有可交互的机柜示意图。',
  crumb: '计算器',
  schemaName: '机柜功率密度计算器',
  schemaDescription: '按空间、供电和制冷计算一个机柜能放多少台服务器或 homelab 设备、每柜 kW 以及每月电费。内置 10 英寸迷你机柜、12U 壁挂机柜、22U 和 42U 机柜预设。',
  eyebrow: '免费工具 · 在浏览器中运行，数据不离开浏览器',
  h1: '机柜功率密度计算器',
  lead: '在空间、供电或制冷耗尽之前，您的机柜能放多少台设备？哪一项会先耗尽？无论是储物间里的 10 英寸迷你机柜，还是数据中心机房里的 42U 机柜，都可以算。',
  see: {
    h2: '用 3D 查看这样的机柜：真实线缆，以及故障影响',
    body: `每台设备的功耗、每根线插在哪里，以及 UPS 故障时哪些设备会断电：在 ${P} 中一目了然。`, button: '观看演示',
  },
  how: {
    h2: '机柜功率密度如何计算', single: '（单相）', three: '（三相）',
    p: '实际机柜密度取三个独立上限中的最小值（各自向下取整）。最低的那一项就是瓶颈：homelab 中通常是供电或散热，现代数据中心通常是制冷，只有很小的机柜才会受限于空间。',
  },
  more: {
    h2: '更多计算器',
    items: [
      { a: 'UPS 续航计算器', rest: '：电池能撑多少分钟、负载占额定功率的比例、适合您负载的最小 UPS' },
      { a: 'homelab 电费', rest: '：整个实验室每月的电费，逐台设备计算' },
      { a: '每瓦 token 数', rest: '：家用 AI 主机的能效' },
      { a: '10 英寸机柜规划', rest: '：放不放得下，需要多少 U' },
      { a: '待机节电与回本', rest: '' },
      { a: '机柜功率计算器', rest: '：正常运行和故障切换时每台 PDU 的负载，对照 80% 规则' },
    ],
  },
  faq: [
    { q: '什么是机柜功率密度？', a: '机柜功率密度指一个机柜里容纳多少算力、功率或热量，通常用每柜 kW 或每柜服务器台数表示。密度越高，单位面积的算力越多，但制冷和供电的约束也越紧。' },
    { q: '一个 42U 机柜能放多少台服务器？', a: '如果是 1U 服务器，42U 机柜物理上能放 42 台，但实际上几乎达不到。供电和制冷通常把实际密度限制在 20–35 台，具体取决于单台功耗和供电回路容量。' },
    { q: '每个机柜多少 kW 比较安全？', a: '大多数企业机柜的运行功率在 5–15 kW 之间。超过 15 kW 即属于高密度，通常需要列间空调、背板换热器或液冷。' },
    { q: '三相电功率怎么换算成 kW？', a: '三相有功功率 = √3 × 线电压 × 线电流 × 功率因数 ÷ 1000。如果给出的是视在功率 kVA：kW = kVA × 功率因数。' },
    { q: '为什么制冷比空间先耗尽？', a: '现代 1U 服务器每台功耗可达 400–800 W。一个装满 1U 服务器的 42U 机柜需要 17–34 kW 制冷量，超过大多数机房能为单个机柜提供的冷量。' },
    { q: '机柜用单相电还是三相电？', a: '每柜 5 kW 左右以内，单相电就够用。超过这个数，三相电能用同样的导线输送更多功率，并平衡负载；大多数 7 kW 以上的机柜使用三相 PDU。' },
    { q: '应该留多少余量？', a: '供电和制冷建议预留 20–30% 的余量，这样一台 PDU 或一台空调故障时仍能运行（N+1）。本计算器只有在供电和制冷都至少有 20% 余量时才显示"正常"。' },
    { q: '家里的机柜能放多少台服务器？', a: '通常供电或散热比空间先到上限。没有额外制冷的储物间只能承受几百瓦。国内常见的 220 V / 16 A 回路，按 80% 规则持续负载约 2.8 kW；10 A 回路约 1.76 kW。输入机柜高度、设备尺寸和功耗，就能看出瓶颈在哪里。' },
    { q: '一个 homelab 机柜每月电费多少？', a: '每月电费 = 平均功耗（kW）× 730 小时 × 每度电价。按 200 W、每度电 0.6 元计算，一个月约 146 度电，约 88 元。' },
    { q: 'homelab 需要多大的机柜？', a: '先算设备占多少 U，再加约 30% 留给配线架、理线器、UPS 和以后扩容。10 英寸迷你机柜（6–12U）适合迷你主机和小交换机；12U 壁挂机柜可放一台交换机、配线架和几台服务器；22U 及以上适合机架式服务器。' },
    { q: 'homelab 机柜需要制冷吗？', a: '设备消耗的每一瓦电最终都会变成房间里的热量：1 W ≈ 3.4 BTU/h。几百瓦以内，通风的储物间或开放房间通常就够；再高就要考虑排风扇或空调，并留意进风温度。' },
  ],
};
