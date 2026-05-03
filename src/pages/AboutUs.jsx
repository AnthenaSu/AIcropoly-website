import { motion } from 'framer-motion'

const rise = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
})

function Tag({ children, color = 'buckram' }) {
  const styles = {
    buckram:   'bg-buckram/10 text-buckram',
    muted:     'bg-ink/5 text-ink-muted',
    parchment: 'bg-parchment/20 text-parchment/70',
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

const TEAM = [
  { name: '[Name]', role: 'CEO & Co-Founder',  dept: 'Mechanical Engineering' },
  { name: '[Name]', role: 'CTO & Co-Founder',  dept: 'Electrical Engineering' },
  { name: '[Name]', role: 'Head of AI',         dept: 'Computer Science' },
]

const WRAP = 'max-w-7xl mx-auto px-12 md:px-24'
const sy = { paddingTop: '8rem', paddingBottom: '8rem' }
const sb = { paddingBottom: '10rem' }

export default function AboutUs() {
  return (
    <main className="bg-parchment">

      {/* ── Hero ── */}
      <section className="h-screen w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-ink" />
        <div className="absolute -right-60 -bottom-20 w-[700px] h-[700px] rounded-full bg-ruskin/8 blur-3xl" />
        <div className="absolute inset-0 bg-ink/20" />
        <div className="absolute inset-x-0 bottom-20 flex flex-col items-center text-center px-8">
          <motion.h1
            variants={rise(0.2)} initial="hidden" animate="visible"
            className="font-display font-semibold text-parchment text-[clamp(3rem,9vw,9rem)] leading-[1] tracking-tight"
          >
            About Us
          </motion.h1>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className={WRAP} style={sy}>
        <div className="text-center">
          <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <Tag>Our Mission</Tag>
          </motion.div>
          <motion.p
            variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-display font-bold text-ink text-5xl md:text-7xl leading-tight tracking-tight"
          >
            Make critical infrastructure invisible to failure.
          </motion.p>
        </div>
      </section>

      {/* ── Team grid ── */}
      <section className={WRAP} style={sb}>
        <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16 text-center">
          <Tag>The Team</Tag>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {TEAM.map((member, i) => (
            <motion.div
              key={i}
              variants={rise(i * 0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="group cursor-default text-center"
            >
              <ImgCard
                label={`${member.name} portrait`}
                className="aspect-[3/4] mb-7 transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <p className="font-display font-semibold text-ink text-xl mb-2 tracking-tight">{member.name}</p>
              <p className="font-mono text-xs tracking-widest uppercase text-buckram mb-1">{member.role}</p>
              <p className="font-mono text-xs text-ink-muted">{member.dept}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Core values ── */}
      <section
        className="bg-ink overflow-hidden relative"
        style={{ paddingTop: '10rem', paddingBottom: '10rem' }}
      >
        <div className="absolute -left-40 top-10 w-[500px] h-[500px] rounded-full bg-ruskin/10 blur-3xl" />
        <div className={`relative ${WRAP}`}>
          <div className="grid md:grid-cols-3 gap-16 md:gap-20 text-center">
            {[
              { label: 'Precision',      body: 'Every output held to engineering-grade standards.' },
              { label: 'Non-Disruption', body: 'Built to work around operational pipelines — no shutdown.' },
              { label: 'Transparency',   body: 'Operators receive evidence, not just a verdict.' },
            ].map((v, i) => (
              <motion.div
                key={i}
                variants={rise(i * 0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
              >
                <p className="font-display font-bold text-parchment text-4xl md:text-5xl mb-6 tracking-tight leading-tight">{v.label}</p>
                <p className="text-base text-parchment/50 leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founding story ── */}
      <section className={WRAP} style={sy}>
        <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16 text-center">
          <Tag>Founding Story</Tag>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-20 items-start">
          <ImgCard label="Lab / prototype photo" className="aspect-[4/3] sticky top-24" />
          <motion.div
            variants={rise(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col gap-12"
          >
            <p className="font-display font-semibold text-ink text-3xl md:text-4xl leading-tight tracking-tight">
              It started with a question in a UNSW acoustics lab.
            </p>
            <p className="text-base text-ink-muted leading-relaxed">
              [Your founding story in 2–3 sentences.]
            </p>
            <div className="flex flex-col gap-10 border-l-2 border-border pl-10">
              {[
                { date: 'Q1 2025', event: 'Material science research begins at UNSW' },
                { date: 'Q2 2025', event: 'First SDR + drone prototype tested in field' },
                { date: 'Q3 2025', event: 'AI model trained on defect classifications' },
                { date: 'Q1 2026', event: 'Pilot conversation with energy operator' },
              ].map(({ date, event }) => (
                <div key={date}>
                  <p className="font-mono text-xs text-buckram mb-2">{date}</p>
                  <p className="text-base text-ink-muted">{event}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
