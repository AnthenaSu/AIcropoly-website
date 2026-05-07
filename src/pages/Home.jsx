import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import desertBg from '../assets/desert.jpg'
import CountUp from '../components/CountUp'

const rise = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
})

function WordReveal({ text, delay = 0 }) {
  return text.split(' ').map((word, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ delay: delay + i * 0.09, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="inline-block mr-[0.28em] last:mr-0"
    >
      {word}
    </motion.span>
  ))
}

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
    <div className={`card-glow relative overflow-hidden rounded-3xl group bg-card/60 backdrop-blur-sm border border-border/60 ${className}`}>
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

const METRICS = [
  { to: 4.2,  decimals: 1, prefix: '$', suffix: 'B',    label: 'Global market',    color: 'text-buckram' },
  { to: 87,   decimals: 0, prefix: '',  suffix: '%',    label: 'Cost reduction',   color: 'text-ruskin' },
  { to: 2.7,  decimals: 1, prefix: '',  suffix: 'M km', label: 'At-risk pipeline', color: 'text-bunglehouse' },
]

export default function Home() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const imgY = useTransform(scrollY, [0, 700], [0, 120])

  return (
    <main className="bg-parchment">

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <motion.img
          src={desertBg}
          alt=""
          style={{ y: imgY }}
          className="absolute inset-0 w-full h-[115%] -top-[8%] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/10 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-5"
          >
            <Tag color="fg">Pipeline Integrity Technology</Tag>
          </motion.div>
          <h1 className="font-hero font-semibold text-[#F2E8D8] text-[clamp(3rem,8vw,8rem)] leading-[1.05] tracking-tight max-w-4xl">
            <span className="block"><WordReveal text="Listening to" delay={0.25} /></span>
            <span className="block"><WordReveal text="What Lies Beneath" delay={0.5} /></span>
          </h1>
        </div>
      </section>

      {/* ── Metrics ── */}
      <section className={WRAP} style={sy}>
        <div className="grid grid-cols-3 gap-8 md:gap-16 text-center">
          {METRICS.map(({ to, decimals, prefix, suffix, label, color }, i) => (
            <motion.div key={i} variants={rise(i * 0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className={`font-display font-bold text-5xl md:text-7xl leading-none mb-3 ${color}`}>
                <CountUp to={to} decimals={decimals} prefix={prefix} suffix={suffix} />
              </p>
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
          <div className="card-glow bg-card/60 backdrop-blur-sm border border-border/60 rounded-3xl flex flex-col justify-between p-10 sm:p-12 md:p-16 min-h-[400px]">
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
