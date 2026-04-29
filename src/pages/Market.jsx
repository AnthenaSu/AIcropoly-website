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
  { method: 'Manual Inspection', shutdown: true,  internal: false, ai: false, continuous: false, cost: 'Very High' },
  { method: 'Inline (PIG)',      shutdown: true,  internal: true,  ai: false, continuous: false, cost: 'High'      },
  { method: 'Ground Sensors',    shutdown: false, internal: false, ai: false, continuous: false, cost: 'Medium'    },
  { method: 'AIcropoly',         shutdown: false, internal: true,  ai: true,  continuous: true,  cost: 'Low'       },
]

export default function Market() {
  return (
    <main className="bg-parchment">

      {/* ── Hero ── */}
      <section className="h-screen w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-ink" />
        <div className="absolute -left-60 top-20 w-[700px] h-[700px] rounded-full bg-buckram/6 blur-3xl" />
        <div className="absolute inset-0 bg-ink/20" />
        <div className="absolute inset-x-0 bottom-20 flex flex-col items-center text-center px-8">
          <motion.div variants={rise(0.15)} initial="hidden" animate="visible" className="mb-5">
            <Tag color="parchment">Market Research</Tag>
          </motion.div>
          <motion.h1
            variants={rise(0.3)} initial="hidden" animate="visible"
            className="font-display font-semibold text-parchment text-[clamp(2.8rem,7vw,7.5rem)] leading-[1] tracking-tight max-w-3xl"
          >
            A $4.2B problem hiding underground.
          </motion.h1>
        </div>
      </section>

      {/* ── Problem statement ── */}
      <section className="py-20 md:py-32 px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 2xl:px-48">
        <div className="text-center">
          <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
            <Tag>Why This Is Urgent</Tag>
          </motion.div>
          <motion.p
            variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-display font-semibold text-ink text-3xl md:text-4xl leading-tight tracking-tight mb-16"
          >
            Traditional inspection is costly, dangerous, and too infrequent to prevent failure.
          </motion.p>
          <motion.div
            variants={rise(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-10"
          >
            {[
              { stat: '$1–5M',   color: 'text-buckram',         desc: 'daily cost of operational downtime for manual inspection' },
              { stat: '5–10 yr', color: 'text-ruskin-dark',     desc: 'typical inspection cycle — defects accumulate undetected' },
              { stat: '#1',      color: 'text-bunglehouse-dark', desc: 'cause of failure is internal corrosion, missed by surface sensors' },
            ].map(({ stat, color, desc }, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <p className={`font-display font-bold text-5xl md:text-6xl leading-none ${color}`}>{stat}</p>
                <p className="text-base text-ink-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Full-bleed image ── */}
      <section className="pb-20 md:pb-32 px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 2xl:px-48">
        <div>
          <ImgCard label="Corroded pipeline cross-section or inspection scene" className="w-full aspect-[21/9]" />
        </div>
      </section>

      {/* ── Market Size ── */}
      <section className="bg-ink py-20 md:py-32 px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 2xl:px-48 overflow-hidden relative">
        <div className="absolute -right-32 -bottom-32 w-[500px] h-[500px] rounded-full bg-buckram/10 blur-3xl" />
        <div className="relative">
          <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16 text-center">
            <Tag color="parchment">Market Size</Tag>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { label: 'TAM', sub: 'Total Addressable', val: '$4.2B', desc: 'Global pipeline inspection market, 6.4% CAGR.' },
              { label: 'SAM', sub: 'Serviceable',       val: '$890M', desc: 'AU, NZ & SE Asia energy and water operators.' },
              { label: 'SOM', sub: 'Obtainable (3 yr)', val: '$42M',  desc: '5% of SAM — 12 prospects identified.' },
            ].map((m, i) => (
              <motion.div key={i} variants={rise(i * 0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Tag color="parchment">{m.label} · {m.sub}</Tag>
                <p className="font-display font-bold text-parchment text-7xl md:text-8xl mt-8 mb-5 leading-none tracking-tight">{m.val}</p>
                <p className="text-sm text-parchment/40 leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Competitive table ── */}
      <section className="py-20 md:py-32 px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 2xl:px-48">
        <div>
          <div className="text-center mb-12">
            <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-5">
              <Tag>Competitive Landscape</Tag>
            </motion.div>
            <motion.p
              variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="font-display font-semibold text-ink text-3xl md:text-5xl leading-tight tracking-tight"
            >
              Why nothing else does what we do.
            </motion.p>
          </div>

          <motion.div
            variants={rise(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left pb-6 font-mono text-xs tracking-widest uppercase font-normal text-ink-muted">Method</th>
                  <th className="pb-6 px-4 font-mono text-xs tracking-widest uppercase font-normal text-ink-muted">No Shutdown</th>
                  <th className="pb-6 px-4 font-mono text-xs tracking-widest uppercase font-normal text-ink-muted">Internal Detection</th>
                  <th className="pb-6 px-4 font-mono text-xs tracking-widest uppercase font-normal text-ink-muted">AI-Powered</th>
                  <th className="pb-6 px-4 font-mono text-xs tracking-widest uppercase font-normal text-ink-muted">Continuous</th>
                  <th className="pb-6 px-4 font-mono text-xs tracking-widest uppercase font-normal text-ink-muted">Cost</th>
                </tr>
              </thead>
              <tbody>
                {COMPETITORS.map((c, i) => (
                  <tr key={i} className={`border-b border-border last:border-0 transition-colors ${c.method === 'AIcropoly' ? 'bg-ruskin/5' : 'hover:bg-card/60'}`}>
                    <td className="py-7 font-display font-semibold text-2xl text-ink pr-12 tracking-tight">{c.method}</td>
                    <td className="py-7 px-4 text-center"><Tick yes={!c.shutdown} /></td>
                    <td className="py-7 px-4 text-center"><Tick yes={c.internal} /></td>
                    <td className="py-7 px-4 text-center"><Tick yes={c.ai} /></td>
                    <td className="py-7 px-4 text-center"><Tick yes={c.continuous} /></td>
                    <td className="py-7 px-4 text-center">
                      {c.method === 'AIcropoly'
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
      <section className="bg-buckram py-20 md:py-32 px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 2xl:px-48 overflow-hidden relative">
        <div className="absolute -left-40 -top-40 w-[500px] h-[500px] rounded-full bg-parchment/10 blur-3xl" />
        <div className="text-center relative">
          <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12">
            <Tag color="parchment">Value Proposition</Tag>
          </motion.div>
          <motion.p
            variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-display font-bold text-parchment text-5xl md:text-7xl leading-tight tracking-tight"
          >
            87% cheaper.<br />Zero downtime.<br />AI-grade accuracy.
          </motion.p>
        </div>
      </section>

      {/* ── Business model ── */}
      <section className="py-20 md:py-32 px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 2xl:px-48">
        <div>
          <div className="text-center mb-16">
            <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Tag>Business Model</Tag>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { img: 'Drone inspection flight', tag: 'Primary Revenue',   tagColor: 'buckram',     title: 'Inspection-as-a-Service', body: 'Per-km pricing. Full defect report within 24 hours.' },
              { img: 'Dashboard / interface',   tag: 'Recurring Revenue', tagColor: 'ruskin',      title: 'SaaS Platform Licence',   body: 'Annual licence for continuous monitoring. Integrates with operator SCADA.' },
              { img: 'Compliance report',        tag: 'Value-Add',         tagColor: 'bunglehouse', title: 'Compliance Reporting',    body: 'Automated reports meeting AS 2885 and API 1163.' },
            ].map((b, i) => (
              <motion.div key={i} variants={rise(i * 0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group cursor-default text-center">
                <ImgCard label={b.img} className="aspect-[3/2] mb-7 transition-transform duration-500 group-hover:scale-[1.02]" />
                <Tag color={b.tagColor}>{b.tag}</Tag>
                <p className="font-display font-semibold text-ink text-2xl mt-5 mb-4 tracking-tight">{b.title}</p>
                <p className="text-base text-ink-muted leading-relaxed">{b.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={rise(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mt-20 grid md:grid-cols-3 gap-16 text-center"
          >
            {[
              { label: 'Target Customer', body: 'Mid-to-large energy pipeline operators in Australia with >100 km of infrastructure.' },
              { label: 'Go-to-Market',   body: 'Direct sales via engineering consultancy relationships and UNSW industry network.' },
              { label: 'Traction',       body: '[X] pilot conversations active. LOI from [Operator]. UNSW lab validation complete.' },
            ].map(({ label, body }) => (
              <div key={label}>
                <Tag color="muted">{label}</Tag>
                <p className="text-base text-ink-muted leading-relaxed mt-6">{body}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24 px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 2xl:px-48">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
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
