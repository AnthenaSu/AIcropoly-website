import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const rise = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
})

function Tag({ children, color = 'buckram' }) {
  const styles = {
    buckram:    'bg-buckram/10 text-buckram',
    ruskin:     'bg-ruskin/10 text-ruskin-dark',
    bunglehouse:'bg-bunglehouse/10 text-bunglehouse-dark',
    parchment:  'bg-parchment/20 text-parchment/70',
    muted:      'bg-ink/5 text-ink-muted',
  }
  return (
    <span className={`inline-block font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full ${styles[color]}`}>
      {children}
    </span>
  )
}

function ImgCard({ label, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl ${className}`}>
      <div className="absolute inset-0 bg-card" />
      <div className="absolute bottom-6 left-6">
        <p className="font-mono text-xs text-ink-muted/40 tracking-widest uppercase">{label}</p>
      </div>
    </div>
  )
}

function Tick({ yes }) {
  return yes
    ? <span className="text-ruskin font-semibold text-base">✓</span>
    : <span className="text-ink-muted/20">—</span>
}

const COMPETITORS = [
  { method: 'Manual Inspection', noShutdown: false, h2crack: false, ai: false, continuous: false, cost: 'Very High' },
  { method: 'ILI Smart PIG',     noShutdown: false, h2crack: false, ai: false, continuous: false, cost: 'High'      },
  { method: 'Ground Sensors',    noShutdown: true,  h2crack: false, ai: false, continuous: false, cost: 'Medium'    },
  { method: 'PipeGuard AI',      noShutdown: true,  h2crack: true,  ai: true,  continuous: true,  cost: 'Low'       },
]

const WRAP = 'max-w-7xl mx-auto px-12 md:px-24'
const sy = { paddingTop: '9rem', paddingBottom: '9rem' }
const syDark = { paddingTop: '10rem', paddingBottom: '10rem' }
const sb = { paddingBottom: '9rem' }

export default function Market() {
  return (
    <main className="bg-parchment">

      {/* ── Hero ── */}
      <section className="h-screen w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-ink" />
        <div className="absolute -left-60 top-20 w-[700px] h-[700px] rounded-full bg-buckram/6 blur-3xl" />
        <div className="absolute inset-x-0 bottom-24 flex flex-col items-center text-center px-8">
          <motion.div variants={rise(0.15)} initial="hidden" animate="visible" className="mb-8">
            <Tag color="parchment">Market Research</Tag>
          </motion.div>
          <motion.h1
            variants={rise(0.3)} initial="hidden" animate="visible"
            className="font-display font-semibold text-parchment text-[clamp(2.4rem,6vw,6.5rem)] leading-[1.02] tracking-tight max-w-4xl"
          >
            37,000 km of hydrogen pipelines. Zero inspection solutions.
          </motion.h1>
        </div>
      </section>

      {/* ── Problem ── */}
      <section className={WRAP} style={sy}>
        <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mb-20 text-center">
          <Tag>The Problem</Tag>
        </motion.div>
        <motion.div
          variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-16 text-center"
        >
          {[
            { stat: '10–100×', color: 'text-buckram',         desc: 'faster crack growth in H₂ vs. methane' },
            { stat: '<1%',     color: 'text-ruskin-dark',     desc: 'wall loss at failure — ILI only detects >5%' },
            { stat: 'Zero',    color: 'text-bunglehouse-dark', desc: 'commercial solutions globally (ASME IPC 2024)' },
          ].map(({ stat, color, desc }, i) => (
            <div key={i} className="flex flex-col items-center gap-6">
              <p className={`font-display font-bold text-[clamp(4rem,8vw,8rem)] leading-none tracking-tight ${color}`}>{stat}</p>
              <p className="font-mono text-xs tracking-widest text-ink-muted/60 uppercase">{desc}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Full-bleed image ── */}
      <section className={WRAP} style={sb}>
        <ImgCard label="Hydrogen embrittlement micro-crack cross-section" className="w-full aspect-[21/9]" />
      </section>

      {/* ── Why Now ── */}
      <section className="bg-ink overflow-hidden relative" style={syDark}>
        <div className="absolute -left-32 -top-32 w-[500px] h-[500px] rounded-full bg-buckram/8 blur-3xl" />
        <div className={`relative ${WRAP}`}>
          <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-20 text-center">
            <Tag color="parchment">Why Now</Tag>
          </motion.div>
          <motion.p
            variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-display font-semibold text-parchment text-[clamp(2rem,4vw,4rem)] leading-tight tracking-tight text-center mb-24 max-w-3xl mx-auto"
          >
            The infrastructure is being built. The safety standard is blank.
          </motion.p>
          <div className="grid md:grid-cols-3 gap-16">
            {[
              { tag: 'Regulation',        title: 'AS4564 Updated July 2025',      note: 'H₂ in compliance scope. Inspection standard undefined.' },
              { tag: 'Market Timing',     title: '60% CAGR  2025–2035',           note: '$154M → $27.2B. Build phase begins now.' },
              { tag: 'Infrastructure Gap',title: '37,000 km planned, <6% funded', note: 'Design-stage window: 2025–2028.' },
            ].map((item, i) => (
              <motion.div key={i} variants={rise(i * 0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Tag color="parchment">{item.tag}</Tag>
                <p className="font-display font-semibold text-parchment text-2xl mt-8 mb-4 leading-snug tracking-tight">{item.title}</p>
                <p className="font-mono text-xs text-parchment/35 tracking-wide">{item.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Market Size ── */}
      <section className="overflow-hidden relative" style={sy}>
        <div className="absolute -right-32 -bottom-32 w-[500px] h-[500px] rounded-full bg-buckram/8 blur-3xl" />
        <div className={`relative ${WRAP}`}>
          <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mb-24 text-center">
            <Tag>Market Size</Tag>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            {[
              { label: 'TAM', sub: 'Total Addressable', val: '$27.2B', note: 'Global H₂ pipeline market by 2035 · CAGR 60%' },
              { label: 'SAM', sub: 'Serviceable',       val: '$4.5B',  note: '15,000–20,000 km suited for drone deployment' },
              { label: 'SOM', sub: 'Obtainable (3 yr)', val: 'A$9M',   note: 'Australia: AGIG · Jemena · ATCO' },
            ].map((m, i) => (
              <motion.div key={i} variants={rise(i * 0.12)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Tag>{m.label} · {m.sub}</Tag>
                <p className="font-display font-bold text-ink text-[clamp(4rem,8vw,8rem)] mt-10 mb-6 leading-none tracking-tight">{m.val}</p>
                <p className="font-mono text-xs text-ink-muted/50 tracking-wide">{m.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Competitive table ── */}
      <section className="bg-card/40" style={sy}>
        <div className={WRAP}>
        <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mb-20 text-center">
          <Tag>Competitive Landscape</Tag>
        </motion.div>
        <motion.p
          variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="font-display font-semibold text-ink text-[clamp(2rem,4vw,4.5rem)] leading-tight tracking-tight text-center mb-24 max-w-3xl mx-auto"
        >
          No one else detects what kills hydrogen pipelines.
        </motion.p>
        <motion.div
          variants={rise(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left pb-6 font-mono text-xs tracking-widest uppercase font-normal text-ink-muted">Method</th>
                <th className="pb-6 px-6 font-mono text-xs tracking-widest uppercase font-normal text-ink-muted">No Shutdown</th>
                <th className="pb-6 px-6 font-mono text-xs tracking-widest uppercase font-normal text-ink-muted">H₂ Micro-crack Detection</th>
                <th className="pb-6 px-6 font-mono text-xs tracking-widest uppercase font-normal text-ink-muted">AI-Powered</th>
                <th className="pb-6 px-6 font-mono text-xs tracking-widest uppercase font-normal text-ink-muted">Continuous</th>
                <th className="pb-6 px-6 font-mono text-xs tracking-widest uppercase font-normal text-ink-muted">Cost</th>
              </tr>
            </thead>
            <tbody>
              {COMPETITORS.map((c, i) => (
                <tr key={i} className={`border-b border-border last:border-0 transition-colors ${c.method === 'PipeGuard AI' ? 'bg-ruskin/5' : 'hover:bg-card/60'}`}>
                  <td className="py-8 font-display font-semibold text-2xl text-ink pr-12 tracking-tight">{c.method}</td>
                  <td className="py-8 px-6 text-center"><Tick yes={c.noShutdown} /></td>
                  <td className="py-8 px-6 text-center"><Tick yes={c.h2crack} /></td>
                  <td className="py-8 px-6 text-center"><Tick yes={c.ai} /></td>
                  <td className="py-8 px-6 text-center"><Tick yes={c.continuous} /></td>
                  <td className="py-8 px-6 text-center">
                    {c.method === 'PipeGuard AI'
                      ? <Tag color="ruskin">{c.cost}</Tag>
                      : <span className="font-mono text-sm text-ink-muted">{c.cost}</span>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
        </div>
      </section>

      {/* ── Value proposition ── */}
      <section className="bg-buckram overflow-hidden relative" style={syDark}>
        <div className="absolute -left-40 -top-40 w-[500px] h-[500px] rounded-full bg-parchment/10 blur-3xl" />
        <div className={`text-center relative ${WRAP}`}>
          <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
            <Tag color="parchment">Value Proposition</Tag>
          </motion.div>
          <motion.p
            variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-display font-bold text-parchment text-[clamp(3rem,7vw,7rem)] leading-[1.0] tracking-tight"
          >
            Detects &lt;1mm cracks.<br />Zero downtime.<br />No contact required.
          </motion.p>
        </div>
      </section>

      {/* ── Business model ── */}
      <section className={WRAP} style={sy}>
        <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mb-24 text-center">
          <Tag>Business Model</Tag>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
          {[
            { img: 'Drone inspection flight', tag: 'Primary Revenue',   tagColor: 'buckram',     title: 'Inspection-as-a-Service', note: 'A$3,000–6,000 / km / yr' },
            { img: 'Dashboard / interface',   tag: 'Recurring Revenue', tagColor: 'ruskin',      title: 'SaaS Platform Licence',   note: 'Annual monitoring subscription' },
            { img: 'Compliance report',        tag: 'Value-Add',         tagColor: 'bunglehouse', title: 'Compliance Reporting',    note: 'AS 2885 · AS 4564 · API 1163' },
          ].map((b, i) => (
            <motion.div key={i} variants={rise(i * 0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="group cursor-default text-center">
              <ImgCard label={b.img} className="aspect-[3/2] mb-8 transition-transform duration-500 group-hover:scale-[1.02]" />
              <Tag color={b.tagColor}>{b.tag}</Tag>
              <p className="font-display font-semibold text-ink text-2xl mt-5 mb-3 tracking-tight">{b.title}</p>
              <p className="font-mono text-xs text-ink-muted/60 tracking-wide">{b.note}</p>
            </motion.div>
          ))}
        </div>

        {/* Unit economics */}
        <motion.div
          variants={rise(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-28 grid md:grid-cols-2 gap-0 bg-ink rounded-3xl overflow-hidden"
        >
          <div className="p-14 md:p-20 flex flex-col justify-center">
            <Tag color="parchment">Customer pays</Tag>
            <p className="font-display font-bold text-parchment text-[clamp(3rem,5vw,5rem)] mt-8 leading-none tracking-tight">A$1.5–3M<span className="text-parchment/30 text-3xl ml-2">/yr</span></p>
            <p className="font-mono text-xs text-parchment/30 mt-4 tracking-wide">Fixed annual subscription</p>
          </div>
          <div className="p-14 md:p-20 flex flex-col justify-center border-t md:border-t-0 md:border-l border-parchment/10">
            <Tag color="parchment">Without us</Tag>
            <p className="font-display font-bold text-ruskin text-[clamp(3rem,5vw,5rem)] mt-8 leading-none tracking-tight">A$5–50M<span className="text-ruskin/30 text-3xl ml-2">/event</span></p>
            <p className="font-mono text-xs text-parchment/30 mt-4 tracking-wide">Undetected failure cost</p>
          </div>
        </motion.div>

        {/* GTM row */}
        <motion.div
          variants={rise(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-28 grid md:grid-cols-3 gap-16 text-center"
        >
          {[
            { label: 'Target Customer', body: 'AGIG · Jemena · ATCO — active H₂ blending corridors in Australia.' },
            { label: 'Go-to-Market',   body: 'UNSW network + APGA membership. Channel via Applus+ RTD.' },
            { label: 'Traction',       body: 'UNSW lab validation complete. Pilot talks with AGIG & Jemena.' },
          ].map(({ label, body }) => (
            <div key={label}>
              <Tag color="muted">{label}</Tag>
              <p className="text-sm text-ink-muted leading-relaxed mt-6">{body}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className={WRAP} style={{ paddingTop: '7rem', paddingBottom: '7rem' }}>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 text-center">
          <p className="font-display font-semibold text-ink text-2xl md:text-3xl tracking-tight">See the technology behind the numbers.</p>
          <Link
            to="/product"
            className="font-mono text-xs tracking-widest uppercase text-ink hover:text-buckram transition-colors border-b border-ink hover:border-buckram pb-0.5 shrink-0"
          >
            Our Product →
          </Link>
        </div>
      </section>

    </main>
  )
}
