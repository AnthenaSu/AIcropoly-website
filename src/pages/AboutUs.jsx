import { motion } from 'framer-motion'
import unswBg from '../assets/unsw.jpeg'
import anthenaImg from '../assets/anthena.jpg'
import ianImg from '../assets/ian.jpg'
import chrisImg from '../assets/chris.jpg'

const rise = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
})

function Tag({ children, color = 'buckram' }) {
  const styles = {
    buckram: 'bg-buckram/15 text-buckram',
    fg:      'bg-fg/10 text-fg/60',
    muted:   'bg-fg/5 text-fg-muted',
  }
  return (
    <span className={`inline-block font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full ${styles[color]}`}>
      {children}
    </span>
  )
}

function ImgCard({ label, img, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-card/60 backdrop-blur-sm border border-border/60 ${className}`}>
      {img && <img src={img} alt={label} className="absolute inset-0 w-full h-full object-cover object-bottom" />}
      {!img && (
        <div className="absolute bottom-6 left-6">
          <p className="font-mono text-xs text-fg-muted/40 tracking-widest uppercase">{label}</p>
        </div>
      )}
    </div>
  )
}

const TEAM = [
  { name: 'Chris', img: chrisImg, dept: 'Mechanical Engineering' },
  { name: '[Name]', dept: 'Electrical Engineering' },
  { name: '[Name]', dept: 'Computer Science' },
  { name: 'Ian',     img: ianImg },
  { name: 'Anthena', img: anthenaImg },
]

const WRAP = 'max-w-7xl mx-auto px-12 md:px-24'
const sy = { paddingTop: '8rem', paddingBottom: '8rem' }
const sb = { paddingBottom: '10rem' }

export default function AboutUs() {
  return (
    <main className="bg-parchment">

      {/* ── Hero ── */}
      <section className="h-screen w-full relative overflow-hidden">
        <img src={unswBg} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-ink/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <motion.h1
            variants={rise(0.2)} initial="hidden" animate="visible"
            className="font-display font-semibold text-[#F2E8D8] text-[clamp(3rem,9vw,9rem)] leading-[1] tracking-tight"
          >
            About Us
          </motion.h1>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className={WRAP} style={sy}>
        <div className="text-center">
          <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
          </motion.div>
          <motion.p
            variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-display font-bold text-fg text-5xl md:text-7xl leading-tight tracking-normal"
          >
            Make critical infrastructure invisible to failure.
          </motion.p>
        </div>
      </section>

      {/* ── Team grid ── */}
      <section className={WRAP} style={sb}>
        <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16 text-center">
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {TEAM.slice(0, 3).map((member, i) => (
            <motion.div
              key={i}
              variants={rise(i * 0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="group cursor-default text-center hover:-translate-y-1 transition-transform duration-500"
            >
              <ImgCard
                label={`${member.name} portrait`}
                img={member.img}
                className="aspect-[3/4] mb-7 transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <p className="font-display font-semibold text-fg text-xl tracking-tight">{member.name}</p>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:w-2/3 mx-auto">
          {TEAM.slice(3).map((member, i) => (
            <motion.div
              key={i}
              variants={rise(i * 0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="group cursor-default text-center hover:-translate-y-1 transition-transform duration-500"
            >
              <ImgCard
                label={`${member.name} portrait`}
                img={member.img}
                className="aspect-[3/4] mb-7 transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <p className="font-display font-semibold text-fg text-xl tracking-tight">{member.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </main>
  )
}
