import { motion } from 'framer-motion'

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

function SectionLabel({ children, dark = false }) {
  return (
    <p className={`font-display font-bold text-2xl md:text-3xl tracking-tight mb-12 uppercase ${dark ? 'text-parchment' : 'text-ink'}`}>
      {children}
    </p>
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

function DarkImgCard({ label, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl ${className}`}>
      <div className="absolute inset-0 bg-parchment/5" />
      <div className="absolute bottom-6 left-6">
        <p className="font-mono text-xs text-parchment/25 tracking-widest uppercase">{label}</p>
      </div>
    </div>
  )
}

export default function Product() {
  return (
    <main className="bg-parchment">

      {/* ── Hero ── */}
      <section className="h-screen w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-ink" />
        <div className="absolute -right-60 top-10 w-[600px] h-[600px] rounded-full bg-bunglehouse/8 blur-3xl" />
        <div className="absolute inset-0 bg-ink/25" />
        <div className="absolute inset-x-0 bottom-20 flex flex-col items-center text-center px-8">
          <motion.div variants={rise(0.15)} initial="hidden" animate="visible" className="mb-5">
            <Tag color="parchment">Our Product</Tag>
          </motion.div>
          <motion.h1
            variants={rise(0.3)} initial="hidden" animate="visible"
            className="font-display font-semibold text-parchment text-[clamp(2.8rem,7vw,7.5rem)] leading-[1] tracking-tight max-w-3xl"
          >
            Physics-grounded.<br />AI-accelerated.
          </motion.h1>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 md:py-32 px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 2xl:px-48">
        <div>
          <div className="mb-16">
            <SectionLabel>How It Works</SectionLabel>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '01', label: 'Fly',      color: 'buckram',     img: 'Drone traversing pipeline route',  desc: 'Drone follows pipeline at optimal altitude.' },
              { num: '02', label: 'Listen',   color: 'ruskin',      img: 'SDR capturing acoustic data',       desc: 'SDR captures full-spectrum IQ data from pipe wall.' },
              { num: '03', label: 'Classify', color: 'bunglehouse', img: 'AI spectrogram analysis',           desc: 'AI classifies defect type from time-frequency data.' },
              { num: '04', label: 'Report',   color: 'buckram',     img: 'Geo-tagged defect map',             desc: 'Geo-tagged defect map delivered in 24 h.' },
            ].map((s, i) => (
              <motion.div
                key={i}
                variants={rise(i * 0.08)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="group cursor-default text-center"
              >
                <ImgCard label={s.img} className="aspect-[3/4] mb-7 transition-transform duration-500 group-hover:scale-[1.02]" />
                <Tag color={s.color}>{s.num} — {s.label}</Tag>
                <p className="text-sm text-ink-muted leading-relaxed mt-4">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Demo ── */}
      <section className="pb-20 md:pb-32 px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 2xl:px-48">
        <div>
          <div className="relative rounded-3xl overflow-hidden">
            <ImgCard label="3D system demo — replace with Spline or video embed" className="w-full aspect-video" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-parchment/90 flex items-center justify-center shadow-lg">
                <div className="w-0 h-0 border-t-[10px] border-b-[10px] border-l-[18px] border-t-transparent border-b-transparent border-l-ink ml-1" />
              </div>
            </div>
          </div>
          <p className="font-mono text-xs text-ink-muted mt-6 tracking-widest uppercase text-center">End-to-end system demo</p>
        </div>
      </section>

      {/* ── Material Science ── */}
      <section className="bg-ink py-20 md:py-32 px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 2xl:px-48 overflow-hidden relative">
        <div className="absolute -right-40 -top-40 w-[500px] h-[500px] rounded-full bg-buckram/12 blur-3xl" />
        <div className="relative">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="mb-6"><Tag color="parchment">Layer 01</Tag></div>
              <SectionLabel dark>Material Science</SectionLabel>
              <p className="font-display font-semibold text-parchment text-3xl md:text-4xl leading-tight tracking-tight mb-10">
                Every defect has a sound.
              </p>
              <p className="text-base text-parchment/50 leading-relaxed mb-16">
                Pipeline defects alter how a pipe wall responds to acoustic excitation. We characterised these responses across material samples to give our AI a physics-grounded training foundation.
              </p>
              <div className="grid grid-cols-2 gap-10">
                {[
                  { val: '[X]',     label: 'Defect types' },
                  { val: '[X]',     label: 'Samples tested' },
                  { val: '[X] kHz', label: 'Frequency range' },
                  { val: '[X]%',    label: 'Repeatability' },
                ].map((s, i) => (
                  <div key={i}>
                    <p className="font-display font-bold text-buckram text-5xl mb-3 leading-none tracking-tight">{s.val}</p>
                    <p className="font-mono text-xs text-parchment/30">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={rise(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex flex-col gap-6 sticky top-24"
            >
              <DarkImgCard label="Acoustic signature diagram" className="aspect-square" />
              <DarkImgCard label="Lab sample / material cross-section" className="aspect-[4/3]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Drone + SDR ── */}
      <section className="py-20 md:py-32 px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 2xl:px-48">
        <div>
          <div className="mb-6"><Tag>Layer 02</Tag></div>
          <SectionLabel>Drone + SDR</SectionLabel>

          <ImgCard label="Drone + SDR hardware — full-bleed" className="w-full aspect-[16/7] mb-20" />

          <div className="grid md:grid-cols-3 gap-16">
            {[
              { title: 'Acoustic Principle', body: 'Drone emits a controlled signal. Wall anomalies produce measurable distortions in the reflected wavefield.', color: 'buckram' },
              { title: 'IQ Data Capture',   body: 'SDR captures raw IQ data at [X] MSPS — preserving full amplitude, phase, and frequency information.', color: 'bunglehouse' },
              { title: 'Autonomous Flight', body: 'Maintains optimal standoff geometry via onboard LiDAR and GPS — no manual control required.', color: 'ruskin' },
            ].map((item, i) => (
              <motion.div key={i} variants={rise(i * 0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Tag color={item.color}>{item.title}</Tag>
                <p className="text-base text-ink-muted leading-relaxed mt-6">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Analysis ── */}
      <section className="bg-ink py-20 md:py-32 px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 2xl:px-48 overflow-hidden relative">
        <div className="absolute -left-40 -bottom-40 w-[500px] h-[500px] rounded-full bg-bunglehouse/10 blur-3xl" />
        <div className="relative">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <motion.div variants={rise()} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <div className="mb-6"><Tag color="parchment">Layer 03</Tag></div>
              <SectionLabel dark>AI Analysis</SectionLabel>
              <p className="font-display font-semibold text-parchment text-3xl md:text-4xl leading-tight tracking-tight mb-12">
                From raw signal to actionable intelligence.
              </p>
              <div className="flex flex-col gap-12">
                {[
                  { step: '01 — Preprocessing', body: 'IQ data converted to time-frequency spectrograms via Short-Time Fourier Transform.', color: 'parchment' },
                  { step: '02 — Inference',      body: '[Model]. Trained on [X] labelled spectrograms across [X] defect classes.', color: 'parchment' },
                  { step: '03 — Output',         body: 'Defect type, severity, and GPS location as a colour-coded pipeline health map.', color: 'parchment' },
                ].map((item, i) => (
                  <div key={i}>
                    <Tag color={item.color}>{item.step}</Tag>
                    <p className="text-base text-parchment/50 leading-relaxed mt-5">{item.body}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={rise(0.15)} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex flex-col gap-6 sticky top-24"
            >
              <DarkImgCard label="Time-frequency spectrogram — AI output" className="w-full aspect-video" />
              <div className="grid grid-cols-3 gap-4">
                {[
                  { val: '[X]%',   label: 'Accuracy',      color: 'text-buckram' },
                  { val: '[X] ms', label: 'Latency',        color: 'text-bunglehouse' },
                  { val: '[X]',    label: 'Defect classes', color: 'text-ruskin' },
                ].map((s, i) => (
                  <div key={i} className="text-center py-8 bg-parchment/10 rounded-2xl">
                    <p className={`font-display font-bold text-3xl mb-2 leading-none tracking-tight ${s.color}`}>{s.val}</p>
                    <p className="font-mono text-xs text-parchment/40">{s.label}</p>
                  </div>
                ))}
              </div>
              <DarkImgCard label="Pipeline health map / dashboard output" className="w-full aspect-[4/3]" />
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  )
}
