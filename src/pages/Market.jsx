import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import CountUp from '../components/CountUp'
import marketBg from '../assets/marketbg.jpg'

const rise = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
})

function Tag({ children, color = 'buckram' }) {
  const styles = {
    buckram:    'bg-buckram/15 text-buckram',
    ruskin:     'bg-ruskin/15 text-ruskin',
    bunglehouse:'bg-bunglehouse/15 text-bunglehouse',
    fg:         'bg-fg/10 text-fg/70',
    muted:      'bg-fg/8 text-fg-muted',
    sand:       'bg-[#F2E8D8]/10 text-[#F2E8D8]/80',
  }
  return (
    <span className={`inline-block font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full ${styles[color]}`}>
      {children}
    </span>
  )
}

function Tick({ yes, warn }) {
  if (warn) return <span className="text-ruskin font-semibold text-base">⚠</span>
  if (yes)  return <span className="text-buckram font-semibold text-lg">✓</span>
  return <span className="text-fg-muted/40 text-lg">—</span>
}

/* ── Data ── */

const TECH_CARDS = [
  {
    tag: 'Layer 1', tagColor: 'buckram',
    title: 'Ultra-Thin Sensing Film',
    body: 'Bonded to pipe exterior. Passive, always-on piezoelectric array captures guided ultrasonic waves continuously — no shutdown, no contact with hydrogen.',
  },
  {
    tag: 'Layer 2', tagColor: 'ruskin',
    title: 'Drone RF Activation',
    body: 'Autonomous drone flies the corridor and remotely excites the film via RF pulse. Covers remote, inaccessible terrain without field personnel.',
  },
  {
    tag: 'Layer 3', tagColor: 'bunglehouse',
    title: 'AI 3D Crack Location',
    body: 'On-board model processes guided-wave signatures to reconstruct crack geometry in 3D. Target detection threshold: <1 mm — before propagation to failure.',
  },
]

const FULL_COMPARE = [
  { method: 'ILI Smart PIG',   h2crack: false, warn: false, noShutdown: false, ai: false, continuous: false, cost: 'High'   },
  { method: 'Ground EMAT',     h2crack: false, warn: true,  noShutdown: true,  ai: false, continuous: false, cost: 'High'   },
  { method: 'Visual Drone',    h2crack: false, warn: false, noShutdown: true,  ai: false, continuous: false, cost: 'Low'    },
  { method: 'Fiber Optic DAS', h2crack: false, warn: false, noShutdown: true,  ai: false, continuous: true,  cost: 'High'   },
  { method: 'PipeGuard AI',    h2crack: true,  warn: false, noShutdown: true,  ai: true,  continuous: true,  cost: 'Low'    },
]

const REGIONS = [
  {
    name: 'Europe',        tag: 'Largest & Fastest',    tagColor: 'buckram',
    stat: '27,000 km',     statLabel: 'EHB target by 2030',
    details: '28 countries · 60% converted from gas · Germany €20B commitment',
    targets: 'Gasunie · OGE · National Gas · Snam',
  },
  {
    name: 'North America', tag: 'Most Mature',           tagColor: 'ruskin',
    stat: '2,600 km',      statLabel: 'existing industrial H₂ pipelines',
    details: '$7B DOE H2Hubs · PHMSA regulations due 2026–27 · Gulf Coast focus',
    targets: 'Air Liquide · Air Products · Enbridge',
  },
  {
    name: 'Middle East',   tag: 'Highest Spend',         tagColor: 'bunglehouse',
    stat: '$150B+',        statLabel: 'committed 2025–2030',
    details: 'NEOM $5B facility · Oman–Amsterdam liquid H₂ corridor · 63% pipeline share',
    targets: 'NEOM · Masdar · Aramco',
  },
  {
    name: 'China',         tag: 'Fastest Growth',        tagColor: 'buckram',
    stat: '4,000+ km',     statLabel: 'planned (Inner Mongolia network)',
    details: 'Wulanqiabu–Beijing 400 km · 9 green H₂ projects approved 2025',
    targets: 'Sinopec · State Power Investment Corp',
  },
  {
    name: 'Asia Pacific',  tag: 'Strictest Regulations', tagColor: 'ruskin',
    stat: '2024',          statLabel: 'Japan Hydrogen Society Act enacted',
    details: 'Japan NEDO · Korea KOGAS · 12 H₂ city programmes',
    targets: 'NEDO · KOGAS · JERA',
  },
]

const TIER1 = [
  { company: 'AGIG',                       country: 'Australia',    asset: 'HyP SA + HyP Gladstone + Western Sydney',               budget: 'A$10–50M / yr',  priority: 'Fastest Entry' },
  { company: 'Jemena',                     country: 'Australia',    asset: 'Western Sydney Green Gas — first direct H₂ steel pipe', budget: 'A$5–20M / yr',   priority: 'Most Urgent'  },
  { company: 'Gasunie',                    country: 'Netherlands',  asset: 'HyDelta pilot · EHB co-lead',                           budget: '€50M+ / yr',     priority: 'EU Beachhead' },
  { company: 'OGE',                        country: 'Germany',      asset: "World's first 400 km conversion (2025)",                budget: '€100M+ / yr',    priority: 'First Case'   },
  { company: 'National Gas',               country: 'UK',           asset: 'Precision thermal imaging H₂ pipeline trial (2024)',    budget: '£30M+ / yr',     priority: 'Open Market'  },
  { company: 'Air Liquide / Air Products', country: 'USA',          asset: '2,600 km Gulf Coast industrial H₂ network',            budget: 'USD 100M+ / yr', priority: 'Scale Play'   },
  { company: 'NEOM Green Hydrogen',        country: 'Saudi Arabia', asset: '$5B facility · 650 t/day · large-scale transmission',   budget: 'USD 50M+ / yr',  priority: 'Middle East'  },
]

const REVENUE = [
  { year: '2027', km: '200–500 km',       avg: '$3,500', rev: '$0.7M – $1.75M', driver: 'AGIG / Jemena pilot · CSIRO research contract' },
  { year: '2028', km: '500–1,500 km',     avg: '$4,000', rev: '$2M – $6M',      driver: 'Australia scale-up + first European pilot' },
  { year: '2029', km: '2,000–5,000 km',   avg: '$4,500', rev: '$9M – $22.5M',   driver: 'EHB clients + Air Liquide North America pilot' },
  { year: '2030', km: '5,000–12,000 km',  avg: '$5,000', rev: '$25M – $60M',    driver: 'NEOM / Masdar Middle East · Japan & Korea licensing' },
  { year: '2031', km: '12,000–25,000 km', avg: '$5,000', rev: '$60M – $125M',   driver: 'Global scale · SaaS platform licensing' },
]

const WRAP = 'max-w-7xl mx-auto px-12 md:px-24'
const sy  = { paddingTop: '9rem',  paddingBottom: '9rem'  }
const syD = { paddingTop: '10rem', paddingBottom: '10rem' }

export default function Market() {
  return (
    <main className="bg-parchment">

      {/* ════════════════════════════
          PART 1 — PAIN POINTS
      ════════════════════════════ */}

      {/* Hero */}
      <section data-nav-dark className="h-screen w-full relative overflow-hidden">
        <img src={marketBg} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <motion.div variants={rise(0.1)} initial="hidden" animate="visible" className="mb-8">
          </motion.div>
          <motion.h1
            variants={rise(0.25)} initial="hidden" animate="visible"
            className="font-display font-semibold text-[#F2E8D8] text-[clamp(2.4rem,6vw,6.5rem)] leading-[1.02] tracking-tight max-w-5xl"
          >
            37,000 km of hydrogen pipelines.<br />Zero inspection solutions.
          </motion.h1>
          <motion.p
            variants={rise(0.4)} initial="hidden" animate="visible"
            className="font-mono text-sm tracking-widest text-[#F2E8D8]/50 mt-10 uppercase"
          >
            ASME IPC 2024 · IEA Global Hydrogen Review 2025
          </motion.p>
        </div>
      </section>

      {/* Pain points body */}
      <section data-nav-dark className="bg-ink" style={syD}>
        <div className={WRAP}>
          <motion.h2 variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-display font-semibold text-[#F2E8D8] text-[clamp(2.5rem,5vw,5rem)] leading-tight tracking-tight mb-20 text-center w-full">
            The Problem We Face
          </motion.h2>

          <div className="max-w-3xl mx-auto mb-28 flex flex-col gap-8 text-center">
            <motion.p variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-[#F2E8D8]/80 text-2xl leading-relaxed">
              Hydrogen embrittlement is invisible, fast, and fatal. When hydrogen molecules penetrate steel pipe walls, they accelerate crack growth by up to 100× compared to natural gas — and by the time conventional tools detect a fracture, it has already propagated beyond the point of safe operation.
            </motion.p>
            <motion.p variants={rise(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="text-[#F2E8D8]/80 text-2xl leading-relaxed">
              The global pipeline industry is about to deploy 37,000 km of hydrogen infrastructure. Not a single commercial monitoring solution exists that can reliably detect these cracks before failure. Regulators have noticed. Standards are being rewritten. The window to define what "safe" looks like is open right now.
            </motion.p>
          </div>

          <motion.p variants={rise(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-display font-semibold text-[#F2E8D8] text-[clamp(1.8rem,3.5vw,3.5rem)] leading-tight tracking-tight text-center max-w-3xl mx-auto border-t border-[#F2E8D8]/10 pt-20">
            The infrastructure is being built.<br />The safety standard is blank.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════
          PART 2 — OUR SOLUTION
      ════════════════════════════ */}

      {/* 3 tech layers */}
      <section className={WRAP} style={sy}>
        <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mb-16 text-center">
        </motion.div>
        <motion.p variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-display font-semibold text-fg text-[clamp(2rem,4.5vw,5rem)] leading-tight tracking-tight text-center max-w-4xl mx-auto mb-24">
          Three layers. One system.<br />The only solution that works.
        </motion.p>
        <div className="grid md:grid-cols-3 gap-8">
          {TECH_CARDS.map((t, i) => (
            <motion.div key={i} variants={rise(i * 0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-2xl p-10 hover:-translate-y-1 transition-all duration-500">
              <Tag color={t.tagColor}>{t.tag}</Tag>
              <p className="font-display font-semibold text-fg text-2xl mt-8 mb-4 leading-snug tracking-tight">{t.title}</p>
              <p className="text-base text-fg leading-relaxed">{t.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Big callout */}
      <section className="bg-buckram overflow-hidden relative" style={syD}>
        <div className="absolute -left-40 -top-40 w-[600px] h-[600px] rounded-full bg-fg/10 blur-3xl" />
        <div className={`text-center relative ${WRAP}`}>
          <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
            <Tag color="sand">What We Deliver</Tag>
          </motion.div>
          <motion.p variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-display font-bold text-[#F2E8D8] text-[clamp(3rem,7vw,7rem)] leading-[1.0] tracking-tight">
            Detects &lt;1 mm cracks.<br />Zero downtime.<br />No contact required.
          </motion.p>
        </div>
      </section>


      {/* ════════════════════════════
          PART 3 — MARKET SIZE
      ════════════════════════════ */}

      <section className="overflow-hidden relative" style={sy}>
        <div className="absolute -right-32 -bottom-32 w-[500px] h-[500px] rounded-full bg-buckram/15 blur-3xl" />
        <div className={`relative ${WRAP}`}>
          <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-16 text-center">
          </motion.div>
          <motion.p variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-display font-semibold text-fg text-[clamp(2rem,4vw,4rem)] leading-tight tracking-tight text-center mb-24 max-w-3xl mx-auto">
            A gap this large only opens once.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            {[
              { label: 'TAM', sub: 'Total Addressable', to: 27.2, decimals: 1, prefix: '$',  suffix: 'B', note: 'Global H₂ pipeline market by 2035 · CAGR 60%' },
              { label: 'SAM', sub: 'Serviceable',       to: 4.5,  decimals: 1, prefix: '$',  suffix: 'B', note: '15,000–20,000 km suited for external drone deployment' },
              { label: 'SOM', sub: 'Obtainable (3 yr)', to: 9,    decimals: 0, prefix: 'A$', suffix: 'M', note: 'Australia first: AGIG · Jemena · ATCO' },
            ].map((m, i) => (
              <motion.div key={i} variants={rise(i * 0.12)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Tag>{m.label} · {m.sub}</Tag>
                <p className="font-display font-bold text-fg text-[clamp(2rem,4vw,4rem)] mt-10 mb-6 leading-none tracking-tight">
                  <CountUp to={m.to} decimals={m.decimals} prefix={m.prefix} suffix={m.suffix} />
                </p>
                <p className="font-mono text-sm text-fg-muted tracking-wide">{m.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional cards */}
      {/* <section className="bg-card/40" style={sy}>
        <div className={WRAP}>
          <motion.p variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-mono text-sm tracking-widest uppercase text-fg font-medium text-center mb-16">
            Five Regions · One Unified Gap
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGIONS.map((r, i) => (
              <motion.div key={i} variants={rise(i * 0.08)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="bg-parchment border border-border/60 rounded-2xl p-8 hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-center justify-between mb-6 gap-4">
                  <p className="font-display font-semibold text-fg text-2xl tracking-tight">{r.name}</p>
                  <Tag color={r.tagColor}>{r.tag}</Tag>
                </div>
                <p className="font-display font-bold text-fg text-4xl tracking-tight mb-2">{r.stat}</p>
                <p className="font-mono text-sm text-fg-muted tracking-wide mb-5">{r.statLabel}</p>
                <p className="text-base text-fg leading-relaxed mb-5">{r.details}</p>
                <div className="border-t border-border/40 pt-4">
                  <p className="font-mono text-xs text-fg-muted/70 tracking-widest uppercase mb-2">Key Targets</p>
                  <p className="font-mono text-sm text-buckram">{r.targets}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className={WRAP} style={sy}>
        <motion.p variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-mono text-sm tracking-widest uppercase text-fg font-medium text-center mb-16">
          Tier 1 Priority Customers — Live H₂ Pipelines, Active Procurement
        </motion.p>
        <motion.div variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left pb-6 font-mono text-sm tracking-wide uppercase font-semibold text-fg">Company</th>
                <th className="text-left pb-6 px-6 font-mono text-sm tracking-wide uppercase font-semibold text-fg">Country</th>
                <th className="text-left pb-6 px-6 font-mono text-sm tracking-wide uppercase font-semibold text-fg">H₂ Asset</th>
                <th className="text-left pb-6 px-6 font-mono text-sm tracking-wide uppercase font-semibold text-fg">Est. Budget</th>
                <th className="text-left pb-6 px-6 font-mono text-sm tracking-wide uppercase font-semibold text-fg">Priority</th>
              </tr>
            </thead>
            <tbody>
              {TIER1.map((c, i) => (
                <tr key={i} className={`border-b border-border last:border-0 transition-colors hover:bg-card/60 ${i === 0 ? 'bg-buckram/5' : ''}`}>
                  <td className="py-7 font-display font-semibold text-2xl text-fg pr-8 tracking-tight whitespace-nowrap">{c.company}</td>
                  <td className="py-7 px-6 font-mono text-sm text-fg-muted tracking-wide whitespace-nowrap">{c.country}</td>
                  <td className="py-7 px-6 text-base text-fg leading-relaxed">{c.asset}</td>
                  <td className="py-7 px-6 font-mono text-base text-buckram tracking-wide whitespace-nowrap">{c.budget}</td>
                  <td className="py-7 px-6 whitespace-nowrap"><Tag color="muted">{c.priority}</Tag></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </section> */}

      {/* ════════════════════════════
          PART 4 — PRICING MODEL
      ════════════════════════════ */}

      <section data-nav-dark className="bg-ink overflow-hidden relative" style={syD}>
        <div className="absolute -right-32 top-0 w-[500px] h-[500px] rounded-full bg-ruskin/10 blur-3xl" />
        <div className={`relative ${WRAP}`}>
          <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-16 text-center">
          </motion.div>
          <motion.p variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-display font-semibold text-[#F2E8D8] text-[clamp(2rem,4vw,4.5rem)] leading-tight tracking-tight text-center mb-24 max-w-3xl mx-auto">
            Three revenue streams.<br />One integrated platform.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6 mb-24">
            {[
              {
                tag: 'Primary Revenue', tagColor: 'buckram',
                title: 'Inspection-as-a-Service',
                price: 'A$3,000–6,000', unit: '/ km / yr',
                note: 'Drone deployment · film activation · AI crack report delivered quarterly',
              },
              {
                tag: 'Recurring Revenue', tagColor: 'ruskin',
                title: 'SaaS Platform Licence',
                price: 'Annual', unit: 'subscription',
                note: 'Continuous monitoring dashboard · real-time alerts · compliance data export',
              },
              {
                tag: 'Value-Add', tagColor: 'bunglehouse',
                title: 'Compliance Reporting',
                price: 'Per report', unit: 'AS 2885 · AS 4564 · API 1163',
                note: 'Regulator-ready documentation · supports insurance premium reduction',
              },
            ].map((p, i) => (
              <motion.div key={i} variants={rise(i * 0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="bg-[#F2E8D8]/5 backdrop-blur-sm border border-[#F2E8D8]/15 rounded-2xl p-10 hover:-translate-y-1 transition-all duration-500">
                <Tag color={p.tagColor}>{p.tag}</Tag>
                <p className="font-display font-semibold text-[#F2E8D8] text-2xl mt-8 mb-3 leading-snug tracking-tight">{p.title}</p>
                <p className="font-display font-bold text-[#F2E8D8] text-3xl tracking-tight">
                  {p.price}<span className="text-[#F2E8D8]/60 text-base ml-2">{p.unit}</span>
                </p>
                <p className="text-sm text-[#F2E8D8]/70 tracking-wide mt-5 leading-relaxed">{p.note}</p>
              </motion.div>
            ))}
          </div>

          <motion.p variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-mono text-sm tracking-widest uppercase text-[#F2E8D8]/70 font-medium text-center mb-10">
            Not buying is more expensive than buying
          </motion.p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tag: 'Regulatory', title: 'Compliance Surge',
                body: 'H₂ pipelines require 60% shorter inspection cycles (HyDelta confirmed). Using current methods, annual NDT spend increases 1.5–3× — up to USD 2M / yr per pipeline.',
              },
              {
                tag: 'Insurance', title: 'Premium Surcharge',
                body: "Global re-insurers charge 15–35% surcharge on H₂ pipeline assets vs. methane. Lloyd's and AXA XL are building H₂ risk models — continuous monitoring data directly lowers this.",
              },
              {
                tag: 'Liability', title: 'Director Exposure',
                body: 'Australia, UK, EU, and US impose personal criminal liability on executives if "reasonably practicable" best-practice monitoring was not adopted before a failure event.',
              },
            ].map((c, i) => (
              <motion.div key={i} variants={rise(i * 0.08)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="bg-[#F2E8D8]/5 border border-[#F2E8D8]/15 rounded-2xl p-8">
                <Tag color="ruskin">{c.tag}</Tag>
                <p className="font-display font-semibold text-[#F2E8D8] text-xl mt-6 mb-3 tracking-tight">{c.title}</p>
                <p className="text-base text-[#F2E8D8]/80 leading-relaxed">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          PART 5 — EXPECTED RETURNS
      ════════════════════════════ */}
{/* 
      <section className={WRAP} style={sy}>
        <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mb-16 text-center">
          <Tag>Part 5 · Expected Returns</Tag>
        </motion.div>
        <motion.p variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-display font-semibold text-fg text-[clamp(2rem,4vw,4rem)] leading-tight tracking-tight text-center mb-24 max-w-3xl mx-auto">
          Fixed cost. Eliminated catastrophe.
        </motion.p>

        <motion.div variants={rise(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-0 bg-card/80 backdrop-blur-sm border border-border/60 rounded-3xl overflow-hidden mb-28">
          <div className="p-14 md:p-20 flex flex-col justify-center">
            <Tag color="fg">Customer pays us</Tag>
            <p className="font-display font-bold text-fg text-[clamp(3rem,5vw,5rem)] mt-8 leading-none tracking-tight">
              A$1.5–3M<span className="text-fg/40 text-3xl ml-2">/yr</span>
            </p>
            <p className="font-mono text-sm text-fg/70 mt-4 tracking-wide">Fixed annual subscription · per 500 km pipeline · predictable opex</p>
          </div>
          <div className="p-14 md:p-20 flex flex-col justify-center border-t md:border-t-0 md:border-l border-fg/10">
            <Tag color="fg">Without us</Tag>
            <p className="font-display font-bold text-ruskin text-[clamp(3rem,5vw,5rem)] mt-8 leading-none tracking-tight">
              A$5–50M<span className="text-ruskin/40 text-3xl ml-2">/event</span>
            </p>
            <p className="font-mono text-sm text-fg/70 mt-4 tracking-wide">Undetected failure · emergency shutdown + excavation + legal exposure</p>
          </div>
        </motion.div>

        <motion.p variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-mono text-sm tracking-widest uppercase text-fg font-medium text-center mb-16">
          Investor View · Five-Year Revenue Roadmap
        </motion.p>
        <motion.div variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left pb-6 font-mono text-sm tracking-wide uppercase font-semibold text-fg">Year</th>
                <th className="text-left pb-6 px-6 font-mono text-sm tracking-wide uppercase font-semibold text-fg">Coverage</th>
                <th className="text-left pb-6 px-6 font-mono text-sm tracking-wide uppercase font-semibold text-fg">Avg $/km/yr</th>
                <th className="text-left pb-6 px-6 font-mono text-sm tracking-wide uppercase font-semibold text-fg">Revenue (USD)</th>
                <th className="text-left pb-6 px-6 font-mono text-sm tracking-wide uppercase font-semibold text-fg">Primary Driver</th>
              </tr>
            </thead>
            <tbody>
              {REVENUE.map((r, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-card/60 transition-colors">
                  <td className="py-7 font-display font-semibold text-2xl text-fg pr-8 tracking-tight">{r.year}</td>
                  <td className="py-7 px-6 font-mono text-base text-fg-muted whitespace-nowrap">{r.km}</td>
                  <td className="py-7 px-6 font-mono text-base text-buckram whitespace-nowrap">{r.avg}</td>
                  <td className="py-7 px-6 font-display font-semibold text-xl text-fg tracking-tight whitespace-nowrap">{r.rev}</td>
                  <td className="py-7 px-6 text-base text-fg-muted leading-relaxed">{r.driver}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </section> */}

      {/* CTA */}
      <section className={WRAP} style={{ paddingTop: '2rem', paddingBottom: '9rem' }}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 text-center">
          <p className="font-display font-semibold text-fg text-2xl md:text-3xl tracking-tight">See the technology behind the numbers.</p>
          <Link
            to="/product"
            className="font-mono text-sm tracking-widest uppercase text-fg/70 hover:text-buckram transition-all duration-300 px-5 py-2.5 rounded-full bg-fg/5 backdrop-blur-sm border border-fg/20 hover:bg-buckram/10 hover:border-buckram/30 shrink-0"
          >
            Our Product →
          </Link>
        </div>
      </section>

    </main>
  )
}
