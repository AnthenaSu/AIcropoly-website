import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import sensorPatch from '../assets/sensor-patch.png'
import productCover from '../assets/productcoverpage.png'
import howitworks1 from '../assets/howitworks1.png'
import howitworks2 from '../assets/howitworks2.png'
import howitworks3 from '../assets/howitworks3.png'
import howitworks4 from '../assets/howitworks4.png'
import howitworks5 from '../assets/howitworks5.png'
import howitworks6 from '../assets/howitworks6.png'

const rise = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
})

// Tags for dark sections (page bg)
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

// Tags for light sections
function LightTag({ children, color = 'buckram' }) {
  const styles = {
    buckram:    'bg-buckram/15 text-buckram',
    ruskin:     'bg-ruskin/15 text-ruskin',
    bunglehouse:'bg-bunglehouse/15 text-bunglehouse',
    muted:      'bg-ink/8 text-ink-muted',
  }
  return (
    <span className={`inline-block font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full ${styles[color]}`}>
      {children}
    </span>
  )
}

// Image placeholder card — light section
function LightImgCard({ label, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-ink/5 backdrop-blur-sm border border-ink/10 ${className}`}>
      <div className="absolute bottom-6 left-6">
        <p className="font-mono text-xs text-ink-muted/50 tracking-widest uppercase">{label}</p>
      </div>
    </div>
  )
}

function StepIndicator({ active, light = false }) {
  const steps = ['0.1', '0.2', '0.3']
  const base        = light ? 'text-ink/25'  : 'text-fg-muted/30'
  const activeColor = light ? 'text-ink'     : 'text-fg'
  const lineColor   = light ? 'bg-ink/15'    : 'bg-border'
  return (
    <div className="flex items-center mb-16">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          {i > 0 && <div className={`h-px w-12 md:w-20 mx-3 ${lineColor}`} />}
          <span className={`font-mono text-xs tracking-widest ${s === active ? activeColor : base}`}>
            {s === active ? `[${s}]` : s}
          </span>
        </div>
      ))}
    </div>
  )
}

function PillButton({ children, light = false }) {
  const style = light
    ? 'bg-ink/6 border-ink/15 text-ink/60 hover:bg-buckram/10 hover:border-buckram/25 hover:text-buckram backdrop-blur-sm'
    : 'bg-fg/5  border-fg/15  text-fg/60  hover:bg-buckram/10 hover:border-buckram/30 hover:text-fg  backdrop-blur-sm'
  return (
    <button className={`border rounded-full px-6 py-2.5 font-mono text-xs tracking-widest uppercase transition-all duration-300 ${style}`}>
      {children}
    </button>
  )
}

const WRAP  = 'max-w-7xl mx-auto px-12 md:px-24'
const syLg  = { paddingTop: '10rem', paddingBottom: '10rem' }

const HOW_STEPS = [
  { img: howitworks1, title: 'Drone pings the patch',           body: 'A passing drone emits a 915 MHz RF signal toward the sensor patch wrapped around the pipe.' },
  { img: howitworks2, title: 'Antenna harvests power',           body: 'The integrated thin-film antenna captures that signal and converts it into a small operating voltage — no battery needed.' },
  { img: howitworks3, title: 'Piezo film launches guided waves', body: 'That voltage drives a PLLA piezoelectric film, which generates ultrasonic guided waves that travel along the pipe wall.' },
  { img: howitworks4, title: 'Defects reflect the waves',        body: 'Cracks, corrosion, or embrittlement scatter the waves back toward the patch with a distinct acoustic signature.' },
  { img: howitworks5, title: 'The patch "hears" the reflection', body: 'The same piezo film receives the returning waves and converts them back into a voltage shift — toggling the onboard MOSFET.' },
  { img: howitworks6, title: 'Drone reads the backscatter',      body: 'The MOSFET state change alters how the antenna re-radiates the signal. The drone reads that backscatter difference and pinpoints the defect — wirelessly, passively, instantly.' },
]

function HowItWorksSection() {
  const sectionRef = useRef(null)
  const totalSlides = HOW_STEPS.length + 1
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(totalSlides - 1) * 100}vw`])
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section data-nav-dark ref={sectionRef} style={{ height: `${totalSlides * 100}vh`, scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ x, width: `${totalSlides * 100}vw` }}
          className="flex h-full"
        >
          {/* ── Slide 0: Title card ── */}
          <div className="relative w-screen h-full flex-shrink-0 bg-[#0E0C0A] flex flex-col justify-between px-12 md:px-24 py-24">
            <p className="font-mono text-xs text-[#F2E8D8] tracking-widest uppercase">System Overview</p>
            <div>
              <h2 className="font-display font-semibold text-[#F2E8D8] text-[clamp(4rem,10vw,10rem)] leading-[0.9] tracking-tight mb-12">
                {['How It', 'Works'].map((word, i) => (
                  <motion.div
                    key={word}
                    initial={{ clipPath: 'inset(0 0 100% 0)', skewY: 3 }}
                    whileInView={{ clipPath: 'inset(0 0 -30% 0)', skewY: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.2, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    {word}
                  </motion.div>
                ))}
              </h2>
              <div className="flex items-center gap-6">
                <p className="font-mono text-xs text-[#F2E8D8] tracking-widest">IN 6 STEPS</p>
                <div className="relative w-40 h-px bg-[#F2E8D8]/50">
                  <motion.div style={{ width: progressWidth }} className="absolute inset-y-0 left-0 bg-[#F2E8D8]/50" />
                </div>
                <p className="font-mono text-xs text-[#F2E8D8] tracking-widest">SCROLL →</p>
              </div>
            </div>
          </div>

          {/* ── Slides 1–6: Photo cards ── */}
          {HOW_STEPS.map((step, i) => (
            <div key={i} className="relative w-screen h-full flex-shrink-0">
              <img src={step.img} alt={step.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 px-12 md:px-24 pb-20">
                <div className="inline-flex flex-col backdrop-blur-md bg-black/30 rounded-2xl px-7 py-6 max-w-lg">
                  <p className="font-mono text-xs text-white/50 tracking-widest mb-3">
                    {String(i + 1).padStart(2, '0')} / {HOW_STEPS.length}
                  </p>
                  <h3 className="font-display font-bold text-white text-2xl md:text-3xl tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default function Product() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <main className="bg-parchment" style={{ scrollSnapType: 'y mandatory' }}>

      {/* ── Hero ── */}
      <section data-nav-dark className="h-screen w-full relative overflow-hidden" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
        <img src={productCover} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <motion.div variants={rise(0.15)} initial="hidden" animate="visible" className="mb-5">
            {/* <Tag color="fg">Our Product</Tag> */}
          </motion.div>
          <motion.h1
            variants={rise(0.3)} initial="hidden" animate="visible"
            className="font-display font-semibold text-[#F2E8D8] text-[clamp(2.8rem,7vw,7.5rem)] leading-[1.25] tracking-tight max-w-3xl"
          >
            <span style={{ whiteSpace: 'nowrap' }}>Physics-grounded.</span><br />
            <span style={{ whiteSpace: 'nowrap' }}>AI-accelerated.</span>
          </motion.h1>
        </div>
      </section>

      {/* ── How It Works ── */}
      <HowItWorksSection />

      {/* ── Layer 01: Material Science ── */}
      <section data-nav-dark className="bg-[#131110] overflow-hidden relative" style={syLg}>
        <div className={`relative ${WRAP}`}>
          <div className="grid grid-cols-[2fr_3fr] gap-16 md:gap-24 min-h-[70vh] -ml-12 md:-ml-24 -mr-12 md:-mr-24">

            {/* ── Left: step + heading + nav list ── */}
            <div className="flex flex-col pl-6 md:pl-8">
              <motion.p variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="font-mono text-xs text-[#F2E8D8]/35 tracking-widest mb-8">
                1.0 /
              </motion.p>
              <h2 className="font-display font-semibold text-[#F2E8D8] text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight mb-14">
                {['Material', 'Science'].map((word, i) => (
                  <motion.div
                    key={word}
                    initial={{ clipPath: 'inset(0 0 100% 0)', skewY: 3 }}
                    whileInView={{ clipPath: 'inset(0 0 -30% 0)', skewY: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.18, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    {word}
                  </motion.div>
                ))}
              </h2>

              {/* Nav list */}
              <motion.div variants={rise(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex flex-col self-start">
                {[
                  'PLLA-Based Self-Powered\nSensor Patch: Overview',
                  'Chiral Beta-Phase\nInduction',
                  'MOSFET Pulse Gating',
                ].map((label, i) => (
                  <button key={i} onClick={() => setActiveTab(i)}
                    className={`flex items-start gap-3 py-5 border-b border-[#F2E8D8]/12 text-left transition-colors duration-300
                      ${activeTab === i ? 'text-[#F2E8D8]' : 'text-[#F2E8D8]/28 hover:text-[#F2E8D8]/55'}`}>
                    <span className="font-display text-base leading-snug tracking-tight">
                      {label.split('\n').map((line, j) => <span key={j} className="block">{line}</span>)}
                      <sup className="font-mono text-[10px] tracking-widest opacity-60 ml-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </sup>
                    </span>
                    <span className={`mt-1 text-buckram text-lg leading-none transition-opacity duration-300 ${activeTab === i ? 'opacity-100' : 'opacity-0'}`}>•</span>
                  </button>
                ))}
              </motion.div>
            </div>

            {/* ── Right: content panel ── */}
            <div className="flex flex-col justify-center pr-4 md:pr-8">
              <AnimatePresence mode="wait">
                {activeTab === 0 && (
                  <motion.div key="overview"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-10">
                    <div>
                      <p className="text-lg text-[#F2E8D8]/65 leading-relaxed mb-5">
                        Pipeline defects alter how a pipe wall responds to acoustic excitation. We characterised these
                        responses across material samples to give our AI a physics-grounded training foundation.
                      </p>
                      <p className="text-lg text-[#F2E8D8]/65 leading-relaxed">
                        Every defect type — corrosion, stress cracking, hydrogen embrittlement — has a distinct acoustic
                        signature. Our sensor film captures it passively, at any time.
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-[#F2E8D8]/35 tracking-widest uppercase mb-4">
                        PLLA-based Self-Powered Sensor Patch: Overview
                      </p>
                      <img src={sensorPatch} alt="PLLA-based Self-Powered Sensor Patch overview"
                        className="w-full object-contain rounded-3xl" />
                    </div>
                  </motion.div>
                )}

                {activeTab === 1 && (
                  <motion.div key="plla"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-10">
                    <div className="flex flex-col gap-6">
                      <p className="text-xl text-[#F2E8D8]/75 leading-relaxed">
                        Poly-L-Lactic Acid (PLLA) generates electricity through shear piezoelectricity (d14 constant).
                        Controlled uniaxial stretching (3–5×) aligns C=O dipoles into the electro-active{' '}
                        <span className="text-[#F2E8D8] font-semibold">Beta-Phase</span>.
                      </p>
                      <div className="flex flex-col gap-1">
                        <p className="font-mono text-base text-[#F2E8D8]/60 tracking-wider">V = g₁₄ · σ · t</p>
                        <p className="font-mono text-xs text-[#F2E8D8]/30 tracking-wide">V: Voltage · g: piezo-constant · σ: shear stress · t: film thickness</p>
                      </div>
                    </div>
                    <div className="mt-16">
                      <p className="font-display font-semibold text-[#F2E8D8] text-xl tracking-tight mb-5">Structural Anatomy of the Stack</p>
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[#F2E8D8]/10">
                            <th className="text-left pb-3 font-mono text-[10px] text-[#F2E8D8]/35 tracking-widest uppercase font-normal">Layer</th>
                            <th className="text-left pb-3 font-mono text-[10px] text-[#F2E8D8]/35 tracking-widest uppercase font-normal">Material</th>
                            <th className="text-right pb-3 font-mono text-[10px] text-[#F2E8D8]/35 tracking-widest uppercase font-normal">μm</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { layer: 'Environmental Seal', material: 'Parylene-C',      t: '10', bold: false },
                            { layer: 'Harvesting Plane',   material: 'Printed Silver',   t: '35', bold: false },
                            { layer: 'Control Logic',      material: 'FPC Components',   t: '80', bold: false },
                            { layer: 'Active Core',        material: 'PLLA / BaTiO₃',   t: '60', bold: true  },
                            { layer: 'Adhesive Interface', material: 'Structural Epoxy', t: '15', bold: false },
                          ].map((row, i) => (
                            <tr key={i} className="border-b border-[#F2E8D8]/8 last:border-0">
                              <td className={`py-3 text-sm ${row.bold ? 'font-semibold text-[#F2E8D8]' : 'text-[#F2E8D8]/60'}`}>{row.layer}</td>
                              <td className={`py-3 text-sm ${row.bold ? 'font-semibold text-[#F2E8D8]' : 'text-[#F2E8D8]/60'}`}>{row.material}</td>
                              <td className={`py-3 text-sm text-right font-mono ${row.bold ? 'font-semibold text-buckram' : 'text-[#F2E8D8]/40'}`}>{row.t}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="font-display font-semibold text-[#F2E8D8]/80 text-sm mt-6">Total ~200 μm — thinner than a standard hair follicle</p>
                    </div>
                  </motion.div>
                )}

                {activeTab === 2 && (
                  <motion.div key="mosfet"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-24">
                    <div className="grid grid-cols-3 gap-10">
                      {[
                        {
                          icon: <svg width="32" height="32" viewBox="0 0 26 26" fill="none"><rect x="1" y="7" width="21" height="12" rx="2" stroke="currentColor" strokeWidth="1.4"/><rect x="22" y="10" width="3" height="6" rx="1" fill="currentColor" opacity="0.45"/><rect x="3" y="9" width="13" height="8" rx="1" fill="currentColor" opacity="0.18"/></svg>,
                          label: 'Accumulation',
                          body: 'MOSFET in high-impedance mode (Vgs < 0.8V). RF energy stored in PLLA/BT dielectric lattice.',
                        },
                        {
                          icon: <svg width="32" height="32" viewBox="0 0 26 26" fill="none"><path d="M15 2L7 14h7l-3 10L22 12h-7L15 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>,
                          label: 'Triggering',
                          body: 'Structural potential reaches MOSFET threshold — device snaps to saturation in sub-microseconds.',
                        },
                        {
                          icon: <svg width="32" height="32" viewBox="0 0 26 26" fill="none"><path d="M1 13h5V7h6v12h6V9h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                          label: 'Excitation',
                          body: 'Discharge triggers inverse-piezoelectric effect, launching high-intensity guided waves.',
                        },
                      ].map((card, i) => (
                        <motion.div key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.18 + i * 0.13, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="flex flex-col gap-6">
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.1 + i * 0.13, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            style={{ transformOrigin: 'left' }}
                            className="h-px bg-[#F2E8D8]/15"
                          />
                          <span className="text-buckram pt-5">{card.icon}</span>
                          <p className="font-display font-bold text-[#F2E8D8] text-2xl tracking-tight leading-tight">{card.label}</p>
                          <p className="text-xs text-[#F2E8D8]/40 leading-relaxed">{card.body}</p>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.58, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col gap-10">
                      <div className="flex justify-between pr-8">
                        <div className="border-l-2 border-[#F2E8D8]/30 pl-5 py-2">
                          <p className="font-display font-bold text-5xl text-[#F2E8D8] leading-none">&lt;$1 <span className="text-xl text-[#F2E8D8]/50">AUD</span></p>
                          <p className="font-mono text-xs text-[#F2E8D8]/35 tracking-widest uppercase mt-3">Unit cost · roll-to-roll print</p>
                        </div>
                        <div className="border-l-2 border-[#F2E8D8]/30 pl-5 py-2">
                          <p className="font-display font-bold text-5xl text-[#F2E8D8] leading-none">0 <span className="text-xl text-[#F2E8D8]/50">batteries</span></p>
                          <p className="font-mono text-xs text-[#F2E8D8]/35 tracking-widest uppercase mt-3">RF-harvested · self-powered</p>
                        </div>
                      </div>
                      {/* <p className="text-sm text-[#F2E8D8]/40 leading-relaxed">
                        Microstrip patch antenna on Polyimide (PI) substrate. A multi-stage Dickson Multiplier converts micro-watt RF to stable DC bias — no wiring, no maintenance.
                      </p> */}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* ── Layer 02: Drone + SDR ── */}
      <section className="bg-card/60 overflow-hidden relative" style={syLg}>
        <div className="absolute -left-40 top-20 w-[500px] h-[500px] rounded-full bg-bunglehouse/18 blur-3xl" />
        <div className={`relative ${WRAP}`}>
          <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <StepIndicator active="0.2" light />
          </motion.div>
          <div className="grid grid-cols-[2fr_3fr] gap-16 md:gap-24 items-start">
            <h2 className="font-display font-semibold text-ink text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight">
              {['Drone', '+ SDR'].map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <motion.span
                    initial={{ y: '110%', skewY: 4 }}
                    whileInView={{ y: '0%', skewY: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.18, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </h2>
            <motion.div variants={rise(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-base text-ink-muted leading-relaxed mb-6">
                The drone emits a controlled RF signal that remotely activates the passive sensor film attached
                to the pipe wall. No physical contact. No pipeline shutdown.
              </p>
              <p className="text-base text-ink-muted leading-relaxed mb-10">
                The on-board SDR captures the acoustic response at full fidelity — preserving amplitude, phase,
                and frequency data for downstream AI processing.
              </p>
              <div className="flex flex-col gap-8 mb-12">
                {[
                  { label: 'Acoustic Excitation', body: 'Wall anomalies produce measurable distortions in the reflected wavefield — detectable at <1mm crack depth.', color: 'buckram' },
                  { label: 'IQ Data Capture',     body: 'SDR captures raw IQ data at [X] MSPS — preserving full signal information for AI inference.', color: 'bunglehouse' },
                  { label: 'Autonomous Flight',   body: 'Onboard LiDAR + GPS maintains optimal standoff geometry. No pilot required.', color: 'ruskin' },
                ].map((item, i) => (
                  <div key={i}>
                    <LightTag color={item.color}>{item.label}</LightTag>
                    <p className="text-sm text-ink-muted leading-relaxed mt-3">{item.body}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <PillButton light>Details</PillButton>
                <PillButton light>Video</PillButton>
              </div>
            </motion.div>
          </div>
          <motion.div
            variants={rise(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mt-16 ml-[38%] -mr-12 md:-mr-24"
          >
            <LightImgCard label="Drone + SDR hardware in field" className="aspect-video rounded-3xl" />
          </motion.div>
        </div>
      </section>

      {/* ── Layer 03: AI Analysis ── */}
      <section className="bg-card/60 overflow-hidden relative" style={syLg}>
        <div className="absolute -right-40 -bottom-40 w-[500px] h-[500px] rounded-full bg-ruskin/18 blur-3xl" />
        <div className="absolute left-0 top-0 w-[400px] h-[400px] rounded-full bg-buckram/12 blur-3xl" />
        <div className={`relative ${WRAP}`}>
          <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <StepIndicator active="0.3" light />
          </motion.div>
          <div className="grid grid-cols-[2fr_3fr] gap-16 md:gap-24 items-start">
            <h2 className="font-display font-semibold text-ink text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight">
              {['AI', 'Analysis'].map((word, i) => (
                <div key={word} className="overflow-hidden">
                  <motion.span
                    initial={{ y: '110%', skewY: 4 }}
                    whileInView={{ y: '0%', skewY: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.18, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    {word}
                  </motion.span>
                </div>
              ))}
            </h2>
            <motion.div variants={rise(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-base text-ink-muted leading-relaxed mb-10">
                Raw IQ data is transformed into time-frequency spectrograms, then classified by our trained
                model. Output is a colour-coded pipeline health map with GPS-tagged defect locations.
              </p>
              <div className="flex flex-col gap-8 mb-12">
                {[
                  { step: '01 — Preprocessing', body: 'IQ data → time-frequency spectrograms via Short-Time Fourier Transform.',     color: 'muted' },
                  { step: '02 — Inference',      body: '[Model]. Trained on [X] labelled spectrograms across [X] defect classes.',    color: 'muted' },
                  { step: '03 — Output',         body: 'Defect type, severity, and GPS location delivered as a pipeline health map.', color: 'muted' },
                ].map((item, i) => (
                  <div key={i}>
                    <LightTag color={item.color}>{item.step}</LightTag>
                    <p className="text-sm text-ink-muted leading-relaxed mt-3">{item.body}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 mb-12">
                {[
                  { val: '[X]%',   label: 'Accuracy',      color: 'text-buckram' },
                  { val: '[X] ms', label: 'Latency',        color: 'text-bunglehouse' },
                  { val: '[X]',    label: 'Defect classes', color: 'text-ruskin' },
                ].map((s, i) => (
                  <div key={i} className="text-center py-7 bg-ink/5 backdrop-blur-sm border border-ink/10 rounded-2xl">
                    <p className={`font-display font-bold text-3xl mb-2 leading-none tracking-tight ${s.color}`}>{s.val}</p>
                    <p className="font-mono text-xs text-ink-muted/70">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <PillButton light>Details</PillButton>
                <PillButton light>Live Demo</PillButton>
              </div>
            </motion.div>
          </div>
          <motion.div
            variants={rise(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mt-16 ml-[38%] -mr-12 md:-mr-24"
          >
            <LightImgCard label="AI spectrogram output / pipeline health map" className="aspect-video rounded-3xl" />
          </motion.div>
        </div>
      </section>

    </main>
  )
}
