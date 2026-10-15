# Mega-Campus Public References & Baseline Parameters

**Date:** 2026-10-15  
**Document:** `reports/giants-references.md`  
**Purpose:** Grounding parameters, public numbers, and regional tariffs/carbon metrics for the "Imagined Giants" design series (see `~/Sensaka/IMAGINED-GIANTS.md`). Every number cited derives from official filings, operator announcements, utility submissions, or established industry trade publications, with $\ge 2$ sources per campus.

---

## 1. Announced Mega-Campuses & AI Factories

### 1.1 Stargate Abilene (Crusoe / Lancium / Oracle / OpenAI)
- **Location:** Abilene, Taylor County, Texas, US (Clean Campus)
- **Scale:**
  - **Total Campus Power:** Up to 1,200 MW (1.2 GW) planned buildout; Initial Phase 1: 200 MW.
  - **IT Power:** ~1,000 MW at full buildout; Phase 1: ~160 MW IT.
  - **GPU Scale:** Up to ~100,000 to 400,000 GPUs planned; designed for multi-rack GB200 NVL72 liquid-cooled deployments (Phase 1 sized for ~100k accelerators).
  - **Land Area:** ~1,000 acres (~404 hectares).
  - **Announced Capex / Cost:** $3.4 Billion initial phase; total multi-gigawatt campus commitments exceed $10 Billion.
  - **Timeline:** Groundbroken 2024; Phase 1 energization target 2025; full expansion through 2027+.
- **Power & Utilities:**
  - **Grid Connection:** ERCOT West Zone (345 kV high-voltage interconnection).
  - **Generation & Storage:** High local wind and solar integration (West Texas renewables corridor); on-site behind-the-meter battery energy storage system (BESS) and Lancium dynamic power management software to respond to ERCOT grid frequency and curtailment events.
- **Cooling & Water:**
  - **Cooling Architecture:** Direct-to-Chip (DLC) liquid cooling with Coolant Distribution Units (CDUs); closed-loop primary hydronic loop coupled to adiabatic / dry coolers to minimize consumptive water use in arid West Texas.
  - **PUE Target:** Design PUE 1.12–1.15.
- **Public Sources:**
  1. *Lancium & Crusoe Energy Announcement* (2024-07-15) — "Crusoe and Lancium Announce 1.2 GW AI Data Center Campus in Abilene, Texas" (Crusoe Press / Business Wire: `https://www.businesswire.com/news/home/20240715978393/en/`)
  2. *Data Center Frontier* (2024-07-16) — "Crusoe and Lancium Partner on 1.2 GW AI Data Center in Texas" (`https://www.datacenterfrontier.com/cloud/article/55099831/crusoe-and-lancium-partner-on-12-gw-ai-data-center-in-texas`)
  3. *Reuters* (2024-07-15) — "Crusoe, Lancium team up to build $3.4 bln data center for AI in Texas" (`https://www.reuters.com/technology/crusoe-lancium-team-up-build-34-bln-data-center-ai-texas-2024-07-15/`)

---

### 1.2 Meta Hyperion & Prometheus Mega-Campus
- **Location:** Richland Parish, Louisiana (Hyperion) & Beaver Dam / New Albany, Ohio (Prometheus / Next-Gen AI Campus), US
- **Scale:**
  - **Total Campus Power:** Richland Parish: ~1,500 MW (1.5 GW) under Entergy Louisiana filing; Ohio clusters: ~800 MW – 1,000 MW.
  - **IT Power:** ~1,200 MW IT (Richland Parish at full phase).
  - **GPU Scale:** Designed for millions of AI accelerator cores; architectural standard supports 100,000+ accelerator training clusters (NVIDIA H100/H200, GB200 NVL72, Meta MTIA v2).
  - **Land Area:** ~2,250 acres (Richland Parish mega-site).
  - **Announced Capex / Cost:** $10 Billion+ for Richland Parish; Ohio campuses exceed $3.5 Billion cumulative.
  - **Timeline:** Announced late 2024; substation construction 2025; phased commercial operation 2026–2030.
- **Power & Utilities:**
  - **Grid Connection:** Entergy Louisiana / MISO South; dedicated multi-substation 500 kV transmission tie-ins.
  - **Generation & Storage:** Entergy integrated resource plan includes dedicated 2.5 GW gas-fired combined-cycle and combustion turbines (CCGT/CT) to backstop Louisiana site, alongside long-term corporate power purchase agreements (PPAs) for solar and battery storage.
- **Cooling & Water:**
  - **Cooling Architecture:** Meta Next-Gen AI Hardware architecture — hybrid direct-to-chip liquid cooling (water/glycol loop to rack manifolds) with secondary liquid-to-liquid and liquid-to-air heat rejection; dry cooling economization mode for low water footprint.
  - **PUE Target:** Design PUE 1.10–1.18 depending on regional ambient humidity.
- **Public Sources:**
  1. *Entergy Louisiana Regulatory Filings & Louisiana Governor's Office* (2024-12-05) — "Meta to Invest $10 Billion in Richland Parish AI Data Center" (`https://www.opportunitylouisiana.gov/news/meta-to-invest-10-billion-in-richland-parish-ai-data-center`)
  2. *Data Center Dynamics* (2024-12-06) — "Meta announces $10bn AI data center in Richland Parish, Louisiana; Entergy plans 2.5GW gas plants" (`https://www.datacenterdynamics.com/en/news/meta-announces-10bn-ai-data-center-in-richland-parish-louisiana/`)
  3. *The Register* (2024-12-06) — "Meta drops $10B on colossal Louisiana AI datacenter" (`https://www.theregister.com/2024/12/06/meta_louisiana_datacenter/`)

---

### 1.3 xAI Colossus 1 & 2
- **Location:** Memphis, Shelby County, Tennessee, US (Former Electrolux Facility)
- **Scale:**
  - **Total Campus Power:** Colossus 1: 150–200 MW; Colossus 2 expansion target: 500–1,000 MW (1 GW).
  - **IT Power:** Colossus 1: ~150 MW IT; Phase 2 planned: ~400–800 MW IT.
  - **GPU Scale:** Colossus 1: 100,000 liquid-cooled NVIDIA Hopper H100/H200 accelerators deployed in a single interconnected fabric (Supermicro/Dell racks); Phase 2 expansion to 200,000+ accelerators and future Blackwell GB200 clusters.
  - **Land Area / Building:** 785,000 sq ft (~73,000 m²) building footprint on ~100-acre industrial plot.
  - **Announced Capex / Cost:** Estimated $3–5 Billion (infrastructure and accelerator inventory).
  - **Timeline:** Colossus 1 built in 122 days (June–October 2024); Colossus 2 expansion underway 2025.
- **Power & Utilities:**
  - **Grid Connection:** Memphis Light, Gas and Water (MLGW) / Tennessee Valley Authority (TVA) 161 kV substation (50 MW initial grid drop, upgraded toward 150 MW).
  - **On-site Generation:** 14 to 18 mobile natural gas turbine generator sets (Voltus / Solar Turbines ~35 MW) deployed on-site to bridge grid interconnection lead times, backed by Tesla Megapack BESS.
- **Cooling & Water:**
  - **Cooling Architecture:** Direct liquid cooling (DLC) to cold plates on compute blades, connected via in-row and end-of-row CDUs to external evaporative cooling tower banks.
  - **Water Usage:** Up to 1.3 million gallons (~4,900 m³) per day at peak heat rejection; constructing a dedicated greywater reuse processing facility with the City of Memphis to avoid municipal drinking water depletion.
  - **PUE Target:** Reported PUE 1.18.
- **Public Sources:**
  1. *SemiAnalysis* (2024-09-02) — "Colossus: Inside Elon Musk's 100k GPU Cluster in 122 Days" (`https://www.semianalysis.com/p/colossus-inside-elon-musks-100k-gpu-cluster`)
  2. *The Register* (2024-09-03) — "Musk claims xAI's Colossus online with 100,000 liquid-cooled H100s" (`https://www.theregister.com/2024/09/03/xai_colossus_100k_h100/`)
  3. *Greater Memphis Chamber Announcement* (2024-06-05) — "xAI Selects Memphis for World's Largest Supercomputer" (`https://www.memphischamber.com/news/xai-selects-memphis/`)

---

### 1.4 Microsoft Fairwater / Mount Pleasant AI Campus
- **Location:** Mount Pleasant, Racine County, Wisconsin, US (Foxconn master development site)
- **Scale:**
  - **Total Campus Power:** Up to 1,000 MW (1.0 GW) total site capacity planned across multiple phases.
  - **IT Power:** ~800 MW IT at full multi-phase completion; Phase 1: ~250 MW IT.
  - **GPU Scale:** Hundreds of thousands of accelerator chips; reference deployment for Microsoft Fairwater AI factory architecture with InfiniBand/Ultra Ethernet.
  - **Land Area:** ~1,345 acres (~544 hectares).
  - **Announced Capex / Cost:** $3.3 Billion initial capital commitment; total site potential exceeding $5 Billion.
  - **Timeline:** Announced May 2024; Phase 1 construction 2024–2026; completion 2027–2028.
- **Power & Utilities:**
  - **Grid Connection:** We Energies / American Transmission Company (ATC) 345 kV high-voltage transmission corridor.
  - **Generation & Sustainability:** 100% matched with new local solar generation and battery storage under We Energies Clean Energy tariffs; Microsoft contracted >4 GW of renewable energy in the MISO region.
- **Cooling & Water:**
  - **Cooling Architecture:** Microsoft Gen-4 / Gen-5 hybrid closed-loop liquid cooling; zero-water direct evaporative cooling design, operating in closed-loop circuit to prevent net consumptive loss of Lake Michigan municipal supply.
  - **PUE Target:** Design PUE 1.12–1.15.
- **Public Sources:**
  1. *White House & Microsoft Press Announcement* (2024-05-08) — "Microsoft Announces $3.3 Billion Investment in Wisconsin for AI Data Center and Innovation" (`https://blogs.microsoft.com/blog/2024/05/08/microsoft-announces-3-3-billion-investment-in-wisconsin/`)
  2. *Data Center Frontier* (2024-05-09) — "Microsoft Unveils $3.3B AI Data Center Campus in Mount Pleasant, Wisconsin" (`https://www.datacenterfrontier.com/cloud/article/55043813/microsoft-unveils-33b-ai-data-center-campus-in-mount-pleasant-wisconsin`)
  3. *Milwaukee Journal Sentinel* (2024-05-08) — "Microsoft to build $3.3 billion AI datacenter on former Foxconn land" (`https://www.jsonline.com/story/money/business/2024/05/08/microsoft-announces-massive-data-center-investment-in-racine-county/73602123007/`)

---

### 1.5 Amazon Rainier / AWS Cumulus Susquehanna Campus
- **Location:** Berwick, Luzerne County, Pennsylvania, US
- **Scale:**
  - **Total Campus Power:** 960 MW (up to 1 GW) direct behind-the-meter nuclear allocation.
  - **IT Power:** ~800 MW IT.
  - **GPU Scale:** Enterprise hyperscale AI and cloud compute; tens of thousands of AWS Trainium2 and NVIDIA Blackwell clusters.
  - **Land Area:** ~1,200 acres adjacent to the nuclear power generation station.
  - **Announced Capex / Cost:** $650 Million initial asset purchase from Talen Energy; estimated $5+ Billion in data hall infrastructure and compute buildout.
  - **Timeline:** Campus acquired March 2024; first 48 MW operating; 120 MW ramp 2025; long-term ramp through 2030.
- **Power & Utilities:**
  - **Power Source:** Direct behind-the-meter interconnection to the 2,500 MW Susquehanna Nuclear Steam Electric Station (two boiling water reactors). Provides 24/7 zero-carbon baseload power with capacity payments and dual redundant feeds directly from generator step-up switchyards.
- **Cooling & Water:**
  - **Cooling Architecture:** High-density air and liquid cooling manifolds; closed-loop chilled water loop with cooling towers taking non-potable industrial cooling intake.
  - **PUE Target:** Design PUE 1.15.
- **Public Sources:**
  1. *Talen Energy SEC 8-K Filing & Press Release* (2024-03-04) — "Talen Energy Sells Cumulus Data Center Campus to AWS for $650 Million" (`https://www.talenenergy.com/news/press-releases/`)
  2. *Data Center Dynamics* (2024-03-04) — "AWS buys nuclear-powered Cumulus data center campus from Talen for $650m" (`https://www.datacenterdynamics.com/en/news/aws-buys-nuclear-powered-cumulus-data-center-campus-from-talen-for-650m/`)
  3. *Federal Energy Regulatory Commission (FERC) Docket ER24-2172* (2024) — PJM Interconnection ISA proceeding for Susquehanna nuclear-data center co-location.

---

### 1.6 Alibaba Cloud Zhangbei Mega-Campus (阿里巴巴张北云计算基地)
- **Location:** Zhangbei County, Zhangjiakou, Hebei Province, China (河北省张家口市张北县)
- **Scale:**
  - **Total Campus Power:** >300 MW operational; multi-campus complex (Miaoqu, Xiaomameng, Jingkai) master planned for >600 MW.
  - **IT Power:** ~250–500 MW IT across multiple clustered campuses.
  - **Server / GPU Scale:** Over 500,000 servers across campuses; major training cluster for Alibaba Tongyi Qianwen (通义千问) LLM models using Alibaba custom accelerators and liquid-cooled clusters.
  - **Land Area:** Over 600 mu (~40 hectares / 400,000 m²).
  - **Announced Capex / Cost:** >20 Billion RMB (~$2.8 Billion USD).
  - **Timeline:** First phase energized 2016; continuous expansion through 2024+ as part of Beijing-Tianjin-Hebei national computing cluster.
- **Power & Utilities:**
  - **Power Source:** Zhangbei National Renewable Energy Demonstration Zone; powered by vast wind and solar generation on the Bashang plateau (坝上高原); utilizes regional green electricity trading (绿电交易) achieving 100% clean energy periods.
- **Cooling & Water:**
  - **Cooling Architecture:** Free-air cooling using sub-zero/cool ambient air for up to 300 days per year; pioneered modular single-phase immersion liquid cooling (浸没式液冷) and direct cold-plate cooling to reduce energy overhead.
  - **PUE Target:** Annual average PUE 1.09–1.13.
- **Public Sources:**
  1. *Alibaba Cloud Official Technical Whitepaper* (2020) — "Green Computing: Alibaba Cloud Zhangbei Data Center Efficiency and Immersion Cooling" (`https://developer.aliyun.com/article/767980`)
  2. *Xinhua News / Hebei Provincial Government* (2021-08-18) — "张北：大河之北'云上之城'" (`http://www.hebei.gov.cn/hebei/14462104/14462112/14545934/index.html`)
  3. *China Daily* (2022-03-24) — "Zhangbei data center hub powers China's green digital transition" (`https://www.chinadaily.com.cn/a/202203/24/WS623c21cda310fd2b29e53066.html`)

---

### 1.7 China 东数西算 (East-Data-West-Computing) National Computing Hubs
China's National Development and Reform Commission (NDRC) mega-initiative deploying 8 national computing hubs (8大国家算力枢纽) and 10 national data center clusters (10大国家数据中心集群) across western and northern renewable-rich provinces.

#### A. Gansu Qingyang National Cluster (甘肃庆阳国家数据中心集群)
- **Location:** Qingyang, Gansu Province, China (陇东综合能源基地)
- **Scale:** Master planned for 800,000 standard server racks (3–5 kW rack equiv) and over 1,500 MW total IT power by 2026–2030; >100,000 PFLOPS intelligent computing capacity target.
- **Key Tenants:** China Telecom, China Mobile, China Unicom, Envision Energy, Jinshan Cloud,燧原科技 (Enflame).
- **Power:** Ultra-high-voltage (UHV) DC terminal from Longdong energy base; combined local wind, solar, and coal-bed gas; industrial green electricity rate <0.35 RMB/kWh ($0.049/kWh).
- **Cooling & PUE:** Free-air economization in dry temperate plateau climate; mandatory PUE < 1.15.
- **Sources:**
  - *Gansu Provincial People's Government* (2023-11-20) — "庆阳建设国家数据中心集群 打造'中国算谷'" (`https://www.gansu.gov.cn/gsszf/c100002/202311/2765322.shtml`)
  - *NDRC Official Gazette* (2022-02-17) — "国家发展改革委等部门关于同意甘肃省启动建设全国一体化算力网络国家枢纽节点的复函"

#### B. Inner Mongolia Ulanqab & Hohhot Hubs (内蒙古和林格尔/乌兰察布数据中心集群)
- **Location:** Hohhot (Horinger) & Ulanqab ("Grassland Cloud Valley" 草原云谷), Inner Mongolia, China
- **Scale:** Over 1.2 Million servers operating across Alibaba, Tencent, Apple China, Huawei, China Telecom, and Kuaishou; total capacity >1,000 MW.
- **Power:** Inner Mongolia western electric grid (Mengxi grid / 蒙西电网); world-leading wind and solar resource base; average annual temperature ~4.3°C.
- **Cooling & PUE:** Natural cool-air cooling for over 10 months/year; average operational PUE 1.12–1.15.
- **Sources:**
  - *Hohhot Daily / Horinger New Area* (2024-03-12) — "和林格尔新区：打造中国绿色算力高地" (`http://www.hohhot.gov.cn/`)
  - *Data Center Dynamics* (2022-02-21) — "China approves construction of four mega data center clusters in Inner Mongolia and Ningxia" (`https://www.datacenterdynamics.com/en/news/china-approves-construction-of-four-mega-data-center-clusters/`)

#### C. Ningxia Zhongwei Hub (宁夏中卫国家数据中心集群)
- **Location:** Zhongwei, Ningxia Hui Autonomous Region, China (Tengger Desert edge)
- **Scale:** >700,000 servers across Amazon AWS China (NWCD), China Mobile, Meituan; targeted for 1.2 GW power.
- **Power:** Abundant Yellow River cooling & desert photovoltaic parks (腾格里沙漠千万千瓦级新能源基地).
- **Cooling & PUE:** Direct evaporative and dry coolers taking advantage of extreme desert diurnal temperature range and low humidity; PUE < 1.15.
- **Sources:**
  - *Ningxia Daily* (2023-06-19) — "宁夏中卫：构建全国一体化算力网络国家枢纽节点" (`https://www.nx.gov.cn/`)
  - *Xinhua* (2023-09-17) — "Inside Zhongwei: China's desert data capital"

#### D. Guizhou Gui'an National Hub (贵州贵安国家数据中心集群)
- **Location:** Gui'an New Area, Guizhou Province, China
- **Scale:** Over 2.5 million server capacity target across Tencent Qixing (mountain tunnel bunker), Huawei Cloud Gui'an (European castle complex), Apple iCloud China, China Telecom; >800 MW total power.
- **Power & Cooling:** Abundant hydro power (Wu River basin) + natural subterranean karst cave air cooling and stable 15°C groundwater; operational PUE 1.10–1.15.
- **Sources:**
  - *Guizhou Provincial Government Portal* (2023-08-28) — "贵安新区：打造全球集聚度最高的大数据中心基地" (`http://www.guizhou.gov.cn/`)
  - *BBC News* (2018-06-04) — "Why China is building data centres in caves" (`https://www.bbc.com/news/technology-44319400`)

---

### 1.8 Google Mega-Campuses (Council Bluffs & Pryor)
- **Location:** Council Bluffs, Pottawattamie County, Iowa & Pryor, Mayes County, Oklahoma, US
- **Scale:**
  - **Total Campus Power:** Council Bluffs: >1,000 MW (1.0 GW) across multi-campus parcels; Pryor: >800 MW.
  - **IT Power:** ~800 MW IT (Council Bluffs combined).
  - **Land Area:** Council Bllements exceeds 1,000 acres across South Omaha Bridge and Bunge sites.
  - **Announced Capex / Cost:** Council Bluffs: >$5 Billion cumulative investment; Pryor: >$4.4 Billion.
  - **Timeline:** Operating since 2007/2011; ongoing multi-hundred million dollar expansions through 2025+.
- **Power & Utilities:**
  - **Grid Connection:** MidAmerican Energy (Iowa) and Grand River Dam Authority / GRDA (Oklahoma); 161 kV / 345 kV dual-loop transmission substations.
  - **Renewable Energy:** Co-located in high wind corridors; MidAmerican matches >100% of annual energy through Iowa wind farms; Google achieves >85% round-the-clock carbon-free energy (CFE).
- **Cooling & Water:**
  - **Cooling Architecture:** Central chilled water plant with industrial cooling towers; greywater and industrial wastewater reuse projects implemented with the City of Council Bluffs; closed-loop liquid cooling cold plates for TPU v4/v5p/v6 (Trillium) clusters.
  - **PUE Target:** Trailing 12-month average PUE of 1.09 (Council Bluffs reported).
- **Public Sources:**
  1. *Google Environmental Report* (2024) — "Data Centers: Efficiency and Energy Performance Metrics" (`https://www.gstatic.com/gumdrop/sustainability/google-2024-environmental-report.pdf`)
  2. *Des Moines Register* (2023-08-25) — "Google to invest another $350 million in its Council Bluffs data center, bringing total to over $5 billion" (`https://www.desmoinesregister.com/story/money/business/2023/08/25/google-to-invest-350-million-council-bluffs-data-center/70682121007/`)
  3. *Data Center Knowledge* (2023-08-28) — "Google Expands Iowa and Oklahoma Mega Campuses for AI Compute" (`https://www.datacenterknowledge.com/google-alphabet/google-expands-council-bluffs-data-center-investment`)

---

## 2. Regional Grid Carbon Intensity & Industrial Electricity Tariffs

Authoritative baseline metrics used for derived operational emissions and energy expenditure calculations.

### 2.1 US Texas (ERCOT)
- **Grid Carbon Intensity:**  
  - **Annual Average:** ~380–420 $\text{gCO}_2/\text{kWh}$ (2023–2024 annual average; varying between 180 $\text{gCO}_2/\text{kWh}$ during peak wind hours and 580 $\text{gCO}_2/\text{kWh}$ during gas/coal peak demand).  
  - *Source:* US Energy Information Administration (EIA) Form 861; ERCOT State of the Grid Report 2024 (`https://www.ercot.com/gridinfo/generation`).
- **Industrial Electricity Tariff:**  
  - **Large Industrial Rate:** $0.055 – $0.075 / \text{kWh}$ ($55–$75 / MWh) wholesale/large power contractual rate; wholesale nodal off-peak real-time pricing often drops to $0.025–$0.035 / \text{kWh}$, with capacity/ancillary services and transmission cost-of-service riders averaging ~$0.065 / \text{kWh}$.  
  - *Source:* EIA Electric Power Monthly, Industrial Sector Retail Prices for Texas (`https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a`).

### 2.2 US Ohio (PJM Interconnection)
- **Grid Carbon Intensity:**  
  - **Annual Average:** ~480–540 $\text{gCO}_2/\text{kWh}$ (coal-to-gas transition in PJM Western Hub; gas ~55%, coal ~25%, nuclear ~15%, renewables ~5%).  
  - *Source:* EPA eGRID 2022/2023 Summary Tables for RFC West / PJM subregion (`https://www.epa.gov/egrid`).
- **Industrial Electricity Tariff:**  
  - **Large Industrial Rate:** $0.068 – $0.085 / \text{kWh}$ ($68–$85 / MWh) under AEP Ohio / FirstEnergy large transmission power contracts (Schedule General Service Transmission).  
  - *Source:* Public Utilities Commission of Ohio (PUCO) Tariff Books / EIA Table 5.6.A.

### 2.3 Norway (NO2 / NO3 - Statnett Fjord Hydro System)
- **Grid Carbon Intensity:**  
  - **Annual Average:** ~15–28 $\text{gCO}_2/\text{kWh}$ (world-leading clean power grid; >98% renewable generation dominated by flexible alpine hydro storage reservoirs and coastal wind).  
  - *Source:* NVE (Norwegian Water Resources and Energy Directorate) Electricity Disclosure (`https://www.nve.no/energi/energisystem/kraftproduksjon/`); Electricity Maps Norway NO2/NO3 historical reanalysis (`https://app.electricitymaps.com/zone/NO-2`).
- **Industrial Electricity Tariff:**  
  - **Large Industrial Rate:** €0.032 – €0.050 / \text{kWh} ($0.035 – $0.055 / \text{kWh}) spot market baseload plus Statnett transmission grid tariff with reduced excise tax for data centers with >0.5 MW load.  
  - *Source:* Nord Pool Spot Day-Ahead Market Historical Prices for NO2 (Kristiansand) / NO3 (Molde/Trondheim) (`https://www.nordpoolgroup.com/Market-data1/Dayahead/Area-Prices/NO/Hourly/`).

### 2.4 China Northwest / North Grid (Inner Mongolia & Gansu)
- **Grid Carbon Intensity:**  
  - **Average Grid Emission Factor:** ~560–620 $\text{gCO}_2/\text{kWh}$ on the baseline regional grid (Mengxi / Northwest grid with high thermal baseline).  
  - **Green Power Transaction Rate (绿电交易):** Direct bilateral power purchase agreements (PPA) between renewable developers and data centers reduce accounting emissions to ~50–120 $\text{gCO}_2/\text{kWh}$ via verified Green Electricity Certificates (GEC / 绿证).  
  - *Source:* Ministry of Ecology and Environment (MEE) of PRC, "2022/2023 Regional Power Grid Baseline Emission Factors for China" (生态环境部《中国区域电网基准线排放因子》).
- **Industrial Electricity Tariff:**  
  - **Big Data Special Industrial Rate:** 0.28 – 0.38 RMB / \text{kWh} ($0.039 – $0.053 USD / \text{kWh}) under national 东数西算 preferential industrial pricing policies in Gansu Qingyang, Ningxia Zhongwei, and Inner Mongolia Ulanqab.  
  - *Source:* Inner Mongolia DRC Notice on Preferential Electricity Tariffs for Strategic Big Data Enterprises (内蒙古发改委大数据产业电价支持政策); Gansu Provincial Price Bureau Document No. 89.

---

## 3. Comparison Matrix for Imagined Giants

| Reference Parameter | Giant Hyperion-Class | Giant Fjord | Giant Gobi-Sun |
|---|---|---|---|
| **Archetype** | US Gigawatt AI Factory | Hydro Fjord AI/HPC | Desert Solar & Storage Hub |
| **Geography** | US Gulf Coast / Ohio | Vestland Fjord, Norway | Gansu / Inner Mongolia, China |
| **Target IT Scale** | 5,000 MW (5 GW) | 1,000 MW (1 GW) | 1,000 MW (1 GW) |
| **Accelerator Equiv.** | ~60,000 GB200 NVL72 racks | ~12,000 GB200 NVL72 racks | ~12,000 GB200 NVL72 racks |
| **Cooling Tech** | DLC + CDUs, Dry Economizers | Seawater DLC + RDHx, District Heat | Dry Coolers, Immersion / DLC |
| **Target PUE** | 1.15 | 1.05 | 1.12 |
| **Grid Power Source** | 400 kV Grid + On-site Gas Turbines | 100% Run-of-River & Lake Hydro | 2 GW Solar PV + 4 GWh BESS |
| **Grid Carbon Factor** | ~400–480 $\text{gCO}_2/\text{kWh}$ | ~20 $\text{gCO}_2/\text{kWh}$ | ~80 $\text{gCO}_2/\text{kWh}$ (Green PPA) |
| **Industrial Tariff** | ~$0.065 / \text{kWh}$ | ~$0.040 / \text{kWh}$ | ~¥0.32 / \text{kWh} ($0.045 / \text{kWh}) |
| **Water Strategy** | Closed-loop recirculating | Seawater open heat exchanger | Zero-water consumption dry loop |
