import { motion } from 'framer-motion'
import SensorPatchDiagram from '../components/SensorPatchDiagram'

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

// Image placeholder card — dark section
function ImgCard({ label, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-card/60 backdrop-blur-sm border border-border/60 ${className}`}>
      <div className="absolute bottom-6 left-6">
        <p className="font-mono text-xs text-fg-muted/40 tracking-widest uppercase">{label}</p>
      </div>
    </div>
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
const sy    = { paddingTop: '8rem',  paddingBottom: '8rem'  }
const syLg  = { paddingTop: '10rem', paddingBottom: '10rem' }

export default function Product() {
  return (
    <main className="bg-parchment">

      {/* ── Hero ── */}
      <section className="h-screen w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-ink" />
        <div className="absolute -right-60 top-10 w-[600px] h-[600px] rounded-full bg-bunglehouse/15 blur-3xl" />
        <div className="absolute -left-40 bottom-0 w-[500px] h-[500px] rounded-full bg-buckram/20 blur-3xl" />
        <div className="absolute inset-0 bg-ink/25" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-parchment" />
        <div className="absolute inset-x-0 bottom-20 flex flex-col items-center text-center px-8">
          <motion.div variants={rise(0.15)} initial="hidden" animate="visible" className="mb-5">
            <Tag color="fg">Our Product</Tag>
          </motion.div>
          <motion.h1
            variants={rise(0.3)} initial="hidden" animate="visible"
            className="font-display font-semibold text-fg text-[clamp(2.8rem,7vw,7.5rem)] leading-[1] tracking-tight max-w-3xl"
          >
            Physics-grounded.<br />AI-accelerated.
          </motion.h1>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={sy}>
        <div className={WRAP}>
          <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-5">
            <Tag>System Overview</Tag>
          </motion.div>
          <div className="grid grid-cols-[2fr_3fr] gap-16 md:gap-24 items-start mt-10">
            <motion.h2
              variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="font-display font-semibold text-fg text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight"
            >
              How It<br />Works
            </motion.h2>
            <motion.div variants={rise(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="grid grid-cols-2 gap-x-10 gap-y-10">
                {[
                  { num: '01', label: 'Fly',      color: 'buckram',     desc: 'Drone follows pipeline corridor at optimal altitude, autonomously.' },
                  { num: '02', label: 'Excite',   color: 'ruskin',      desc: 'RF signal activates the passive sensor film bonded to the pipe wall.' },
                  { num: '03', label: 'Classify', color: 'bunglehouse', desc: 'AI classifies defect type and severity from acoustic response data.' },
                  { num: '04', label: 'Report',   color: 'buckram',     desc: 'Geo-tagged crack map delivered within 24 hours.' },
                ].map((s, i) => (
                  <div key={i}>
                    <Tag color={s.color}>{s.num} — {s.label}</Tag>
                    <p className="text-sm text-fg-muted leading-relaxed mt-4">{s.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <motion.div
            variants={rise(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mt-16 ml-[38%] -mr-12 md:-mr-24"
          >
            <ImgCard label="End-to-end system diagram" className="aspect-video rounded-3xl" />
          </motion.div>
        </div>
      </section>

      {/* ── Layer 01: Material Science ── */}
      <section className="bg-fg overflow-hidden relative" style={syLg}>
        <div className="absolute -right-40 -top-40 w-[500px] h-[500px] rounded-full bg-buckram/20 blur-3xl" />
        <div className={`relative ${WRAP}`}>
          <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <StepIndicator active="0.1" light />
          </motion.div>
          <div className="grid grid-cols-[2fr_3fr] gap-16 md:gap-24 items-start">
            <motion.h2
              variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="font-display font-semibold text-ink text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight"
            >
              Material<br />Science
            </motion.h2>
            <motion.div variants={rise(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-base text-ink-muted leading-relaxed mb-6">
                Pipeline defects alter how a pipe wall responds to acoustic excitation. We characterised these
                responses across material samples to give our AI a physics-grounded training foundation.
              </p>
              <p className="text-base text-ink-muted leading-relaxed mb-10">
                Every defect type — corrosion, stress cracking, hydrogen embrittlement — has a distinct acoustic
                signature. Our sensor film captures it passively, at any time.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-12">
                {[
                  { val: '[X]',     label: 'Defect types characterised' },
                  { val: '[X]',     label: 'Samples tested' },
                  { val: '[X] kHz', label: 'Frequency range' },
                  { val: '[X]%',    label: 'Signal repeatability' },
                ].map((s, i) => (
                  <div key={i} className="bg-ink/5 backdrop-blur-sm border border-ink/10 rounded-2xl p-6">
                    <p className="font-display font-bold text-buckram text-4xl mb-2 leading-none tracking-tight">{s.val}</p>
                    <p className="font-mono text-xs text-ink-muted/70">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <PillButton light>Details</PillButton>
                <PillButton light>Research</PillButton>
              </div>
            </motion.div>
          </div>
          {/* Sensor patch diagram */}
          <motion.div
            variants={rise(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="mt-16 ml-[38%] -mr-12 md:-mr-24"
          >
            <div className="aspect-video rounded-3xl bg-ink/4 backdrop-blur-sm border border-ink/10 overflow-hidden flex items-center justify-center p-4">
              <SensorPatchDiagram />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Layer 02: Drone + SDR ── */}
      <section className="bg-fg overflow-hidden relative" style={syLg}>
        <div className="absolute -left-40 top-20 w-[500px] h-[500px] rounded-full bg-bunglehouse/18 blur-3xl" />
        <div className={`relative ${WRAP}`}>
          <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <StepIndicator active="0.2" light />
          </motion.div>
          <div className="grid grid-cols-[2fr_3fr] gap-16 md:gap-24 items-start">
            <motion.h2
              variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="font-display font-semibold text-ink text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight"
            >
              Drone<br />+ SDR
            </motion.h2>
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
      <section className="bg-fg overflow-hidden relative" style={syLg}>
        <div className="absolute -right-40 -bottom-40 w-[500px] h-[500px] rounded-full bg-ruskin/18 blur-3xl" />
        <div className="absolute left-0 top-0 w-[400px] h-[400px] rounded-full bg-buckram/12 blur-3xl" />
        <div className={`relative ${WRAP}`}>
          <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <StepIndicator active="0.3" light />
          </motion.div>
          <div className="grid grid-cols-[2fr_3fr] gap-16 md:gap-24 items-start">
            <motion.h2
              variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="font-display font-semibold text-ink text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight"
            >
              AI<br />Analysis
            </motion.h2>
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
