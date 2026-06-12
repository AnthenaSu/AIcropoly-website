import { motion } from 'framer-motion'
import sensorPatch from '../assets/sensor-patch.png'
import productCover from '../assets/productcoverpage.png'

const rise = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
})

const WRAP = 'max-w-7xl mx-auto px-12 md:px-24'
const syLg = { paddingTop: '10rem', paddingBottom: '10rem' }

export default function Product() {
  return (
    <main className="bg-parchment" style={{ scrollSnapType: 'y mandatory' }}>

      {/* ── Hero ── */}
      <section data-nav-dark className="h-screen w-full relative overflow-hidden" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
        <img src={productCover} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.55) 0%, transparent 100%)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <motion.p
            variants={rise(0.15)} initial="hidden" animate="visible"
            className="font-mono text-xs tracking-widest uppercase text-[#F2E8D8]/60 mb-6"
          >          </motion.p>
          <motion.h1
            variants={rise(0.3)} initial="hidden" animate="visible"
            className="font-display font-semibold text-[#F2E8D8] text-[clamp(2.8rem,7vw,7.5rem)] leading-[1.1] tracking-tight max-w-4xl [text-shadow:0_2px_4px_rgba(0,0,0,0.9),0_8px_40px_rgba(0,0,0,0.8)]"
          >
            Stop losing<br />$349k an hour.
          </motion.h1>
          <motion.p
            variants={rise(0.45)} initial="hidden" animate="visible"
            className="mt-8 font-mono text-lg text-[#F2E8D8]/80 tracking-widest max-w-xl [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]"
          >
            Detect pipe defects before they cascade into shutdowns.<br />One drone pass. Zero contact.
          </motion.p>
          <motion.div
            variants={rise(0.6)} initial="hidden" animate="visible"
            className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <a
              href="mailto:info@bernardinemountain.com"
              className="px-8 py-4 bg-buckram text-[#0E0C0A] font-mono text-sm tracking-widest uppercase font-semibold rounded-full hover:bg-buckram/85 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.55)]"
            >
              Book a Consultation
            </a>
            <a
              href="mailto:info@bernardinemountain.com"
              className="px-8 py-4 border border-[#F2E8D8]/60 text-[#F2E8D8] font-mono text-sm tracking-widest uppercase rounded-full hover:border-[#F2E8D8] transition-all duration-300 backdrop-blur-md bg-black/30 shadow-[0_8px_32px_rgba(0,0,0,0.55)]"
            >
              Inquire for Investment
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Financial Impact ── */}
      <section data-nav-dark className="h-screen w-full bg-[#0E0C0A] flex flex-col justify-center overflow-hidden" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
        <div className={WRAP}>
          <motion.p
            variants={rise(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-mono text-xs tracking-widest uppercase text-[#F2E8D8]/40 mb-16"
          >
            Business Impact
          </motion.p>
          <div className="grid grid-cols-3 gap-12 md:gap-20">
            {[
              {
                stat: '$130k – $349k',
                unit: 'per hour',
                label: 'Downtime cost',
                body: 'Every unplanned pipeline shutdown carries this price tag. Our system catches defects before they cascade — so you never pay it.',
                delay: 0.1,
              },
              {
                stat: '71%',
                unit: 'reduction',
                label: 'Inspection cost',
                body: 'Traditional methods need scaffolding, shutdowns, and weeks of scheduling. One drone pass replaces all of that.',
                delay: 0.2,
              },
              {
                stat: '100%',
                unit: 'compliant',
                label: 'Green & ESG ready',
                body: 'No batteries. No chemicals. No emissions. Meets green-bond requirements and environmental standards out of the box.',
                delay: 0.3,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={rise(item.delay)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex flex-col"
              >
                <div className="border-l-2 border-buckram/50 pl-6 mb-8 min-h-[8rem] flex flex-col justify-center">
                  <p className="font-display font-semibold text-[#F2E8D8] text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-tight">
                    {item.stat}
                  </p>
                  <p className="font-mono text-xs text-buckram tracking-widest uppercase mt-2">{item.unit}</p>
                </div>
                <p className="font-mono text-xs text-[#F2E8D8]/50 tracking-widest uppercase mb-3">{item.label}</p>
                <p className="text-sm text-[#F2E8D8]/65 leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three Steps ── */}
      <section className="bg-card/60 overflow-hidden relative" style={{ ...syLg, scrollSnapAlign: 'start' }}>
        <div className={`relative ${WRAP}`}>
          <motion.p
            variants={rise(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-mono text-xs tracking-widest uppercase text-ink-muted/50 mb-6"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ clipPath: 'inset(0 0 100% 0)', skewY: 3 }}
            whileInView={{ clipPath: 'inset(0 0 -30% 0)', skewY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-semibold text-ink text-[clamp(3rem,8vw,7rem)] leading-[0.92] tracking-tight mb-24"
          >
            Wrap.<br />Fly.<br />Know.
          </motion.h2>
          <div className="grid grid-cols-3 gap-12 md:gap-20">
            {[
              {
                num: '01',
                title: 'Wrap',
                body: 'Attach our passive sensor to any pipe segment. No wiring. No battery. No maintenance schedule. It stays in place for the life of the asset.',
                detail: 'Passive UHF Telemetry · Proprietary Lead-Free Bio-Polymer',
                delay: 0.1,
              },
              {
                num: '02',
                title: 'Fly',
                body: 'A drone passes overhead once per inspection cycle — no scaffolding, no shutdown, no confined-space entry. Our Wavelet Denoising Pipeline reads structural integrity in real time.',
                detail: 'No shutdown · No contact · No scheduling lead time',
                delay: 0.2,
              },
              {
                num: '03',
                title: 'Know',
                body: 'Your team receives a ranked defect report within minutes — location, severity, estimated remaining life. Prioritise repairs before a hairline crack becomes a $300k shutdown.',
                detail: 'AI-ranked · Actionable · Delivered instantly',
                delay: 0.3,
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={rise(step.delay)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex flex-col"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: step.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: 'left' }}
                  className="h-px bg-ink/15 mb-8"
                />
                <p className="font-mono text-xs text-ink-muted/40 tracking-widest mb-4">{step.num}</p>
                <p className="font-display font-bold text-ink text-4xl md:text-5xl tracking-tight mb-6">{step.title}</p>
                <p className="text-base text-ink-muted leading-relaxed mb-6">{step.body}</p>
                <p className="font-mono text-xs text-ink-muted/70 tracking-widest">{step.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Visual ── */}
      <section data-nav-dark className="bg-[#131110] overflow-hidden relative" style={{ ...syLg, scrollSnapAlign: 'start' }}>
        <div className={`relative ${WRAP}`}>
          <div className="grid grid-cols-[1fr_1fr] gap-20 items-center">
            <motion.div
              variants={rise(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex flex-col gap-8"
            >
              <h2 className="font-display font-semibold text-[#F2E8D8] text-5xl md:text-6xl leading-[0.92] tracking-tight">
                Thinner<br />than a<br />credit card.
              </h2>
              <p className="text-base text-[#F2E8D8]/65 leading-relaxed max-w-sm">
                Our passive sensor attaches to any pipe surface. No power source. No wireless pairing. No scheduled maintenance — ever.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  'Proprietary Lead-Free Bio-Polymer core',
                  'Passive UHF Telemetry — no battery required',
                  'Wavelet Denoising Pipeline · AI-fused diagnostics',
                ].map((line, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-buckram mt-0.5 text-lg leading-none">—</span>
                    <p className="text-sm text-[#F2E8D8]/60 leading-relaxed">{line}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              variants={rise(0.25)} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="relative"
            >
              <img
                src={sensorPatch}
                alt="Sensor patch"
                className="w-full object-contain rounded-3xl"
              />
              <p className="font-mono text-[10px] text-[#F2E8D8]/25 tracking-widest text-center mt-4">
                Concept illustration only. Final form factor may vary.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section data-nav-dark className="bg-[#0E0C0A] overflow-hidden relative" style={{ ...syLg, scrollSnapAlign: 'start' }}>
        <div className={`relative ${WRAP} flex flex-col items-center text-center`}>
          <motion.p
            variants={rise(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-mono text-xs tracking-widest uppercase text-[#F2E8D8]/40 mb-8"
          >
            Get Started
          </motion.p>
          <motion.h2
            initial={{ clipPath: 'inset(0 0 100% 0)', skewY: 2 }}
            whileInView={{ clipPath: 'inset(0 0 -30% 0)', skewY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-semibold text-[#F2E8D8] text-[clamp(2.5rem,6vw,6rem)] leading-[1.05] tracking-tight max-w-3xl mb-8"
          >
            Ready to eliminate unplanned shutdowns?
          </motion.h2>
          <motion.p
            variants={rise(0.25)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="font-mono text-sm text-[#F2E8D8]/50 tracking-widest max-w-lg mb-14"
          >
            Talk to our team about a pilot programme, or connect with us about investment opportunities.
          </motion.p>
          <motion.div
            variants={rise(0.35)} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <a
              href="mailto:info@bernardinemountain.com"
              className="px-10 py-4 bg-buckram text-[#0E0C0A] font-mono text-sm tracking-widest uppercase font-semibold rounded-full hover:bg-buckram/85 transition-all duration-300"
            >
              Book a Consultation
            </a>
            <a
              href="mailto:info@bernardinemountain.com"
              className="px-10 py-4 border border-[#F2E8D8]/30 text-[#F2E8D8]/70 font-mono text-sm tracking-widest uppercase rounded-full hover:border-[#F2E8D8]/70 hover:text-[#F2E8D8] transition-all duration-300"
            >
              Inquire for Investment
            </a>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
