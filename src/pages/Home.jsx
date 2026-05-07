import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const rise = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
})

function Tag({ children, color = 'buckram' }) {
  const styles = {
    buckram:    'bg-buckram/15 text-buckram',
    ruskin:     'bg-ruskin/15 text-ruskin',
    bunglehouse:'bg-bunglehouse/15 text-bunglehouse',
    fg:         'bg-fg/10 text-fg/60',
  }
  return (
    <span className={`inline-block font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full ${styles[color]}`}>
      {children}
    </span>
  )
}

function ImgCard({ label, className = '', children }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl group bg-card/60 backdrop-blur-sm border border-border/60 ${className}`}>
      <div className="absolute bottom-5 left-5">
        <p className="font-mono text-xs text-fg-muted/40 tracking-widest uppercase">{label}</p>
      </div>
      {children}
    </div>
  )
}

const WRAP = 'max-w-7xl mx-auto px-12 md:px-24'
const sy = { paddingTop: '8rem', paddingBottom: '8rem' }
const sb = { paddingBottom: '8rem' }

export default function Home() {
  return (
    <main className="bg-parchment">

      {/* ── Hero ── */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-ink" />
        <div className="absolute -right-40 -top-40 w-[700px] h-[700px] rounded-full bg-buckram/20 blur-3xl" />
        <div className="absolute -left-60 bottom-0 w-[500px] h-[500px] rounded-full bg-ruskin/15 blur-3xl" />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-parchment" />
        <div className="absolute inset-x-0 bottom-20 flex flex-col items-center text-center px-8 sm:px-12">
          <motion.div variants={rise(0.15)} initial="hidden" animate="visible" className="mb-5">
            <Tag color="fg">Pipeline Integrity Technology</Tag>
          </motion.div>
          <motion.h1
            variants={rise(0.3)} initial="hidden" animate="visible"
            className="font-display font-semibold text-fg text-[clamp(3rem,8vw,8rem)] leading-[1] tracking-tight max-w-4xl"
          >
            Listening to<br />What Lies Beneath
          </motion.h1>
        </div>
      </section>

      {/* ── Metrics ── */}
      <section className={WRAP} style={sy}>
        <div className="grid grid-cols-3 gap-8 md:gap-16 text-center">
          {[
            { val: '$4.2B',   label: 'Global market',    color: 'text-buckram' },
            { val: '87%',     label: 'Cost reduction',   color: 'text-ruskin' },
            { val: '2.7M km', label: 'At-risk pipeline', color: 'text-bunglehouse' },
          ].map(({ val, label, color }, i) => (
            <motion.div key={i} variants={rise(i * 0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className={`font-display font-bold text-5xl md:text-7xl leading-none mb-3 ${color}`}>{val}</p>
              <p className="font-mono text-xs tracking-widest uppercase text-fg-muted">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Problem image + quote ── */}
      <section className={WRAP} style={sb}>
        <motion.div
          variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 items-stretch"
        >
          <ImgCard label="Pipeline failure / corrosion visual" className="aspect-[4/5] md:aspect-auto min-h-[400px]" />
          <div className="bg-card/60 backdrop-blur-sm border border-border/60 rounded-3xl flex flex-col justify-between p-10 sm:p-12 md:p-16 min-h-[400px]">
            <Tag color="fg">The Problem</Tag>
            <div>
              <p className="font-display font-semibold text-fg text-3xl md:text-4xl leading-tight mb-10 tracking-tight">
                Energy pipelines are ageing.<br />Inspection hasn't kept up.
              </p>
              <Link
                to="/market"
                className="font-mono text-xs tracking-widest uppercase text-fg/60 hover:text-fg transition-all duration-300 px-5 py-2.5 rounded-full bg-fg/5 backdrop-blur-sm border border-fg/15 hover:bg-fg/10 hover:border-fg/25"
              >
                View Market Research →
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Technology grid ── */}
      <section className={WRAP} style={sy}>
        <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-14 text-center">
          <Tag>Our Approach</Tag>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { tag: 'Material Science', label: 'Acoustic signature research',    color: 'buckram' },
            { tag: 'Drone + SDR',      label: 'Non-contact sensing system',     color: 'ruskin' },
            { tag: 'AI Analysis',      label: 'Real-time defect classification', color: 'bunglehouse' },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={rise(i * 0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="group cursor-default text-center hover:-translate-y-1 transition-transform duration-500"
            >
              <ImgCard label={item.label} className="aspect-[3/4] mb-5 transition-transform duration-500 group-hover:scale-[1.02]" />
              <Tag color={item.color}>{item.tag}</Tag>
              <p className="text-base text-fg-muted mt-3">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Wide image + statement ── */}
      <section className={WRAP} style={sb}>
        <ImgCard label="Drone in field — aerial inspection shot" className="w-full aspect-[16/7] mb-14" />
        <motion.div
          variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="flex flex-col items-center text-center gap-8"
        >
          <p className="font-display font-semibold text-fg text-3xl md:text-5xl max-w-xl leading-tight tracking-tight">
            Three layers of technology.<br />One complete answer.
          </p>
          <Link
            to="/product"
            className="font-mono text-xs tracking-widest uppercase text-fg/60 hover:text-buckram transition-all duration-300 px-5 py-2.5 rounded-full bg-fg/5 backdrop-blur-sm border border-fg/15 hover:bg-buckram/10 hover:border-buckram/30"
          >
            Explore the Product →
          </Link>
        </motion.div>
      </section>

      {/* ── Team teaser ── */}
      <section className={WRAP} style={sy}>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center md:text-left">
            <div className="mb-8"><Tag>About Us</Tag></div>
            <p className="font-display font-semibold text-fg text-3xl md:text-4xl leading-tight tracking-tight mb-10">
              UNSW engineers who refused to accept "that's how it's always been done."
            </p>
            <Link
              to="/about"
              className="font-mono text-xs tracking-widest uppercase text-fg/60 hover:text-buckram transition-all duration-300 px-5 py-2.5 rounded-full bg-fg/5 backdrop-blur-sm border border-fg/15 hover:bg-buckram/10 hover:border-buckram/30"
            >
              Meet the Team →
            </Link>
          </motion.div>
          <motion.div variants={rise(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <ImgCard label="Team photo" className="aspect-[4/3]" />
          </motion.div>
        </div>
      </section>

    </main>
  )
}
