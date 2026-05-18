import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import sensorPatch from '../assets/sensor-patch.png'
import productCover from '../assets/productcoverpage.png'
import howitworks1 from '../assets/howitworks1.png'
import howitworks2 from '../assets/howitworks2.png'
import howitworks3 from '../assets/howitworks3.png'
import howitworks4 from '../assets/howitworks4.png'
import howitworks5 from '../assets/howitworks5.png'
import howitworks6 from '../assets/howitworks6.png'
import spectrogramDiagram from '../assets/Spectrogramdiagram.jpg'
import aiDiagram from '../assets/ai.jpg'

function SectionLoader({ number, light = false }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [displayed, setDisplayed] = useState('0.0')

  useEffect(() => {
    if (!isInView) return
    const duration = 900
    const steps = 45
    const interval = duration / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      const eased = 1 - Math.pow(1 - step / steps, 3)
      setDisplayed((number * eased).toFixed(1))
      if (step >= steps) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [isInView, number])

  const textColor = light ? 'text-ink-muted/60' : 'text-[#F2E8D8]/35'
  const trackColor = light ? 'bg-ink/12' : 'bg-[#F2E8D8]/10'
  const fillColor  = light ? 'bg-ink/40' : 'bg-[#F2E8D8]/35'

  return (
    <div ref={ref} className="mb-8">
      <p className={`font-mono text-xs tracking-widest mb-3 ${textColor}`}>{displayed} /</p>
      <div className={`h-px w-16 ${trackColor} overflow-hidden`}>
        <motion.div
          className={`h-full ${fillColor}`}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: 'left' }}
        />
      </div>
    </div>
  )
}

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

function SpectrumViz() {
  const canvasRef = useRef(null)
  const [mode, setMode] = useState('no_defect')
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const render = () => {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width) return
      const W = rect.width, H = rect.height
      canvas.width = W * dpr; canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = '#131110'; ctx.fillRect(0, 0, W, H)
      ctx.strokeStyle = 'rgba(242,232,216,0.05)'; ctx.lineWidth = 1
      for (let i = 0; i < 5; i++) {
        const y = H * 0.08 + i * (H * 0.76 / 4)
        ctx.beginPath(); ctx.moveTo(W * 0.06, y); ctx.lineTo(W * 0.97, y); ctx.stroke()
      }
      ctx.beginPath()
      for (let x = 0; x < W; x++) {
        const y = H * 0.82 + (Math.random() - 0.5) * 10
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.strokeStyle = 'rgba(90,128,152,0.22)'; ctx.lineWidth = 1; ctx.stroke()
      const pk = W * 0.5
      const pFn = x => Math.exp((x - pk) * (x - pk) * -1 / (W * W * 0.0025)) * H * 0.68
      ctx.beginPath()
      for (let x = 0; x < W; x++) { const y = H * 0.84 - pFn(x); x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y) }
      ctx.lineTo(W, H * 0.84); ctx.lineTo(0, H * 0.84); ctx.closePath()
      const gr = ctx.createLinearGradient(pk, 0, pk, H * 0.84)
      gr.addColorStop(0, 'rgba(200,120,40,0.2)'); gr.addColorStop(1, 'rgba(200,120,40,0)')
      ctx.fillStyle = gr; ctx.fill()
      ctx.beginPath()
      for (let x = 0; x < W; x++) { const y = H * 0.84 - pFn(x); x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y) }
      ctx.strokeStyle = '#C87828'; ctx.lineWidth = 2; ctx.stroke()
      if (mode === 'defect') {
        ;[-W * 0.15, W * 0.15].forEach(off => {
          const sx = pk + off
          ctx.beginPath()
          for (let x = 0; x < W; x++) {
            const y = H * 0.84 - Math.exp((x - sx) * (x - sx) * -1 / (W * W * 0.0008)) * H * 0.28
            x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
          }
          ctx.strokeStyle = '#B86030'; ctx.lineWidth = 1.5; ctx.stroke()
        })
        ctx.fillStyle = 'rgba(184,96,48,0.75)'; ctx.font = `${Math.round(W * 0.025)}px monospace`
        ctx.fillText('f ± f_mod', pk - W * 0.32, H * 0.48)
      }
      ctx.fillStyle = 'rgba(242,232,216,0.22)'; ctx.font = `${Math.round(W * 0.025)}px monospace`
      ctx.fillText('915 MHz', pk - 22, H * 0.97)
    }
    const ro = new ResizeObserver(render); ro.observe(canvas); render()
    return () => ro.disconnect()
  }, [mode])
  return (
    <div className="mt-5 flex flex-col gap-3">
      <div className="flex gap-2">
        {[['no_defect', 'No Defect'], ['defect', 'Defect']].map(([v, l]) => (
          <button key={v} onClick={() => setMode(v)} className={`font-mono font-semibold text-[12px] tracking-widest uppercase px-3 py-1.5 rounded-full border transition-all duration-200 ${mode === v ? 'bg-buckram/10 border-buckram/40 text-buckram' : 'bg-ink/5 border-ink/25 text-ink-muted hover:border-ink/40 hover:text-ink'}`}>{l}</button>
        ))}
      </div>
      <canvas ref={canvasRef} className="w-full rounded-xl" style={{ height: '175px' }} />
      <p className="font-mono text-[13px] text-ink-muted tracking-widest">
        {mode === 'no_defect' ? '915 MHz carrier stable — MOSFET ON, no sidelobes' : 'Sidelobes at f_carrier ± f_mod — defect toggling detected'}
      </p>
    </div>
  )
}

function SpectrogramViz() {
  const canvasRef = useRef(null)
  const [mode, setMode] = useState('no_defect')
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const render = () => {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width) return
      const W = rect.width, H = rect.height
      canvas.width = W * dpr; canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = '#0a0d0c'; ctx.fillRect(0, 0, W, H)
      const bins = 100, bands = 48
      const sx = W * 0.08, sy = H * 0.06, gW = W * 0.86, gH = H * 0.82
      const cW = gW / bins, cH = gH / bands
      for (let t = 0; t < bins; t++) {
        for (let f = 0; f < bands; f++) {
          let e = f >= 20 && f <= 27 ? 0.8 + Math.random() * 0.15 : Math.random() * 0.07
          if (mode === 'defect' && t >= 63 && t <= 73 && f >= 16 && f <= 31)
            e = Math.max(e, 0.7 * Math.exp(-((t - 68) ** 2 / 16 + (f - 24) ** 2 / 18)))
          let r, g, b
          if (e < 0.08) { r = 10; g = 13; b = 12 }
          else if (e < 0.4) { const v = e / 0.4; r = Math.round(10 + v * 80); g = Math.round(13 + v * 115); b = Math.round(12 + v * 140) }
          else if (e < 0.7) { const v = (e - 0.4) / 0.3; r = Math.round(90 + v * 110); g = Math.round(128 - v * 28); b = Math.round(152 - v * 122) }
          else { r = 200; g = Math.round(120 - (e - 0.7) * 200); b = 40 }
          if (mode === 'defect' && t >= 63 && t <= 73 && f >= 16 && f <= 31 && e > 0.42) { r = 184; g = 96; b = 48 }
          ctx.fillStyle = `rgb(${r},${g},${b})`
          ctx.fillRect(sx + t * cW, sy + (bands - f - 1) * cH, cW + 0.5, cH + 0.5)
        }
      }
      if (mode === 'defect') {
        const ax = sx + 68 * cW
        ctx.strokeStyle = 'rgba(184,96,48,0.85)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 3])
        ctx.beginPath(); ctx.moveTo(ax, sy); ctx.lineTo(ax, sy + gH); ctx.stroke()
        ctx.setLineDash([])
        ctx.fillStyle = 'rgba(184,96,48,0.9)'; ctx.font = `${Math.round(W * 0.026)}px monospace`
        ctx.fillText('Δt', ax + 4, sy + gH * 0.22)
      }
      ctx.fillStyle = 'rgba(242,232,216,0.2)'; ctx.font = `${Math.round(W * 0.025)}px monospace`
      ctx.fillText('Time →', W * 0.44, H * 0.97)
      ctx.save(); ctx.translate(W * 0.02, H * 0.5); ctx.rotate(-Math.PI / 2)
      ctx.fillText('Freq', -16, 0); ctx.restore()
    }
    const ro = new ResizeObserver(render); ro.observe(canvas); render()
    return () => ro.disconnect()
  }, [mode])
  return (
    <div className="mt-5 flex flex-col gap-3">
      <div className="flex gap-2">
        {[['no_defect', 'No Defect'], ['defect', 'Defect'], ['diagram', 'Diagram']].map(([v, l]) => (
          <button key={v} onClick={() => setMode(v)} className={`font-mono font-semibold text-[12px] tracking-widest uppercase px-3 py-1.5 rounded-full border transition-all duration-200 ${mode === v ? 'bg-buckram/10 border-buckram/40 text-buckram' : 'bg-ink/5 border-ink/25 text-ink-muted hover:border-ink/40 hover:text-ink'}`}>{l}</button>
        ))}
      </div>
      {mode === 'diagram'
        ? <div className="w-full rounded-xl overflow-hidden bg-white flex items-center justify-center" style={{ height: '320px' }}><img src={spectrogramDiagram} alt="Spectrogram diagram" className="w-full h-full object-contain" /></div>
        : <canvas ref={canvasRef} className="w-full rounded-xl" style={{ height: '175px' }} />
      }
      <p className="font-mono text-[13px] text-ink-muted tracking-widest">
        {mode === 'no_defect' ? '915 MHz band stable — no reflection arrival' : mode === 'defect' ? 'Reflection burst at Δt — d_crack = v_group × Δt / 2' : 'A spectrogram maps acoustic wave frequencies over time to provide spatial localisation and diagnostics for guided wave events.'}
      </p>
    </div>
  )
}

function ConstellationViz() {
  const canvasRef = useRef(null)
  const [mode, setMode] = useState('no_defect')
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const render = () => {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width) return
      const W = rect.width, H = rect.height
      canvas.width = W * dpr; canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = '#131110'; ctx.fillRect(0, 0, W, H)
      const cx = W / 2, cy = H / 2, sc = Math.min(W, H) * 0.36
      ;[0.33, 0.66, 1.0].forEach(r => {
        ctx.beginPath(); ctx.arc(cx, cy, r * sc, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(242,232,216,0.07)'; ctx.lineWidth = 1; ctx.stroke()
      })
      ctx.strokeStyle = 'rgba(242,232,216,0.1)'; ctx.lineWidth = 1
      ctx.beginPath(); ctx.moveTo(cx - sc * 1.1, cy); ctx.lineTo(cx + sc * 1.1, cy); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx, cy - sc * 1.1); ctx.lineTo(cx, cy + sc * 1.1); ctx.stroke()
      ctx.fillStyle = 'rgba(242,232,216,0.25)'; ctx.font = `${Math.round(W * 0.028)}px monospace`
      ctx.fillText('I', cx + sc * 1.07, cy + 4); ctx.fillText('Q', cx + 4, cy - sc * 1.02)
      if (mode === 'no_defect') {
        const a0 = Math.PI / 4
        for (let i = 0; i < 280; i++) {
          const r = 0.75 * sc + (Math.random() - 0.5) * 0.04 * sc
          const a = a0 + (Math.random() - 0.5) * 0.07
          ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy - Math.sin(a) * r, 2, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(90,128,152,0.75)'; ctx.fill()
        }
      } else {
        const angs = [Math.PI / 4, Math.PI / 4 + Math.PI * 0.55]
        const cols = ['rgba(90,128,152,0.65)', 'rgba(184,96,48,0.75)']
        angs.forEach((a0, idx) => {
          for (let i = 0; i < 140; i++) {
            const r = 0.75 * sc + (Math.random() - 0.5) * (idx === 0 ? 0.04 : 0.09) * sc
            const a = a0 + (Math.random() - 0.5) * 0.1
            ctx.beginPath(); ctx.arc(cx + Math.cos(a) * r, cy - Math.sin(a) * r, 2, 0, Math.PI * 2)
            ctx.fillStyle = cols[idx]; ctx.fill()
          }
        })
        ctx.beginPath()
        ctx.arc(cx, cy, sc * 0.75, -(Math.PI / 4), -(Math.PI / 4 + Math.PI * 0.55), true)
        ctx.strokeStyle = 'rgba(200,120,40,0.45)'; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4])
        ctx.stroke(); ctx.setLineDash([])
        ctx.fillStyle = 'rgba(200,120,40,0.8)'; ctx.font = `${Math.round(W * 0.028)}px monospace`
        ctx.fillText('Δφ', cx - sc * 0.08, cy + sc * 0.38)
      }
    }
    const ro = new ResizeObserver(render); ro.observe(canvas); render()
    return () => ro.disconnect()
  }, [mode])
  return (
    <div className="mt-5 flex flex-col gap-3">
      <div className="flex gap-2">
        {[['no_defect', 'No Defect'], ['defect', 'Defect']].map(([v, l]) => (
          <button key={v} onClick={() => setMode(v)} className={`font-mono font-semibold text-[12px] tracking-widest uppercase px-3 py-1.5 rounded-full border transition-all duration-200 ${mode === v ? 'bg-buckram/10 border-buckram/40 text-buckram' : 'bg-ink/5 border-ink/25 text-ink-muted hover:border-ink/40 hover:text-ink'}`}>{l}</button>
        ))}
      </div>
      <canvas ref={canvasRef} className="w-full rounded-xl" style={{ height: '175px' }} />
      <p className="font-mono text-[13px] text-ink-muted tracking-widest font-medium">
        {mode === 'no_defect' ? 'IQ cluster at fixed phase — MOSFET ON, impedance stable' : 'Phase shift Δφ — second cluster indicates MOSFET toggling'}
      </p>
    </div>
  )
}

function GradCAMViz() {
  const canvasRef = useRef(null)
  const [mode, setMode] = useState('healthy')
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const render = () => {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width) return
      const W = rect.width, H = rect.height
      canvas.width = W * dpr; canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = '#0d0f0e'; ctx.fillRect(0, 0, W, H)
      const N = 100
      const padL = W * 0.07, padR = W * 0.03, padT = H * 0.1, padB = H * 0.22
      const gW = W - padL - padR, gH = H - padT - padB
      const saliency = Array.from({ length: N }, (_, i) => {
        if (mode === 'healthy') return 0.04 + Math.random() * 0.07
        const p1 = Math.exp(-((i - 28) ** 2) / 16) * 0.92
        const p2 = Math.exp(-((i - 63) ** 2) / 10) * 0.78
        return Math.min(1, p1 + p2 + Math.random() * 0.07)
      })
      const barW = gW / N * 0.78
      for (let i = 0; i < N; i++) {
        const x = padL + (i / N) * gW
        const bH = saliency[i] * gH
        const y = padT + gH - bH
        let r, g, b
        if (saliency[i] < 0.25) { r = 70; g = 100; b = 130 }
        else if (saliency[i] < 0.55) { const v = (saliency[i] - 0.25) / 0.3; r = Math.round(70 + v * 130); g = Math.round(100 - v * 10); b = Math.round(130 - v * 90) }
        else { const v = Math.min(1, (saliency[i] - 0.55) / 0.45); r = Math.round(200 + v * 15); g = Math.round(90 - v * 50); b = 40 }
        ctx.fillStyle = `rgba(${r},${g},${b},0.88)`
        ctx.fillRect(x, y, barW, bH)
      }
      ctx.fillStyle = 'rgba(242,232,216,0.28)'; ctx.font = `${Math.round(W * 0.023)}px monospace`
      ctx.fillText('50 kHz', padL, H - padB * 0.18)
      ctx.fillText('100 kHz', padL + gW * 0.44, H - padB * 0.18)
      ctx.fillText('150 kHz', padL + gW * 0.87, H - padB * 0.18)
      ctx.save(); ctx.translate(W * 0.015, padT + gH / 2); ctx.rotate(-Math.PI / 2)
      ctx.fillText('saliency', -18, 0); ctx.restore()
      if (mode === 'crack') {
        ctx.fillStyle = 'rgba(200,120,40,0.9)'; ctx.font = `${Math.round(W * 0.026)}px monospace`
        ctx.fillText('f₁', padL + gW * 0.24, padT + gH * 0.06)
        ctx.fillText('f₂', padL + gW * 0.6, padT + gH * 0.2)
      }
    }
    const ro = new ResizeObserver(render); ro.observe(canvas); render()
    return () => ro.disconnect()
  }, [mode])
  return (
    <div className="mt-4 flex flex-col gap-3">
      <div className="flex gap-2">
        {[['healthy', 'Healthy Pipe'], ['crack', 'Crack Detected']].map(([v, l]) => (
          <button key={v} onClick={() => setMode(v)} className={`font-mono font-semibold text-[12px] tracking-widest uppercase px-3 py-1.5 rounded-full border transition-all duration-200 ${mode === v ? 'bg-buckram/10 border-buckram/40 text-buckram' : 'bg-ink/5 border-ink/25 text-ink-muted hover:border-ink/40 hover:text-ink'}`}>{l}</button>
        ))}
      </div>
      <canvas ref={canvasRef} className="w-full rounded-xl" style={{ height: '175px' }} />
      <p className="font-mono text-[13px] text-ink-muted tracking-widest">
        {mode === 'healthy' ? 'Uniform low saliency — no frequency band dominates classification' : 'f₁ ~78 kHz, f₂ ~113 kHz highlighted — cross-checked against pipe resonance modes'}
      </p>
    </div>
  )
}

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
  const [activeTabSDR, setActiveTabSDR] = useState(0)
  const [activeTabAI,  setActiveTabAI]  = useState(0)

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
            className="font-display font-semibold text-[#F2E8D8] text-[clamp(2.8rem,7vw,7.5rem)] leading-[1.25] tracking-tight max-w-3xl [text-shadow:0_4px_40px_rgba(0,0,0,0.7),0_2px_12px_rgba(0,0,0,0.5)]"
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
          <div className="grid grid-cols-[2fr_3fr] gap-24 md:gap-40 min-h-[70vh] -ml-12 md:-ml-24 -mr-12 md:-mr-24">

            {/* ── Left: step + heading + nav list ── */}
            <div className="flex flex-col pl-6 md:pl-8">
              <SectionLoader number={1.0} />
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
                    className="flex flex-col gap-20">
                    <div>
                      <p className="text-lg text-[#F2E8D8]/90 leading-relaxed mb-5">
                        Pipeline defects alter how a pipe wall responds to acoustic excitation. We characterised these
                        responses across material samples to give our AI a physics-grounded training foundation.
                      </p>
                      <p className="text-lg text-[#F2E8D8]/90 leading-relaxed">
                        Every defect type — corrosion, stress cracking, hydrogen embrittlement — has a distinct acoustic
                        signature. Our sensor film captures it passively, at any time.
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[#F2E8D8]/70 font-medium uppercase tracking-widest mb-4">
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
                      <p className="text-xl text-[#F2E8D8]/90 leading-relaxed">
                        Poly-L-Lactic Acid (PLLA) generates electricity through shear piezoelectricity (d14 constant).
                        Controlled uniaxial stretching (3–5×) aligns C=O dipoles into the electro-active{' '}
                        <span className="text-[#F2E8D8] font-semibold">Beta-Phase</span>.
                      </p>
                      <div className="flex flex-col gap-1">
                        <p className="font-mono text-base text-[#F2E8D8]/75 tracking-wider">V = g₁₄ · σ · t</p>
                        <p className="font-mono text-[12px] text-[#F2E8D8]/50 tracking-wide">V: Voltage · g: piezo-constant · σ: shear stress · t: film thickness</p>
                      </div>
                    </div>
                    <div className="mt-16">
                      <p className="font-display font-semibold text-[#F2E8D8] text-xl tracking-tight mb-5">Structural Anatomy of the Stack</p>
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[#F2E8D8]/10">
                            <th className="text-left pb-3 font-mono text-[10px] text-[#F2E8D8]/60 tracking-widest uppercase font-normal">Layer</th>
                            <th className="text-left pb-3 font-mono text-[10px] text-[#F2E8D8]/60 tracking-widest uppercase font-normal">Material</th>
                            <th className="text-right pb-3 font-mono text-[10px] text-[#F2E8D8]/60 tracking-widest uppercase font-normal">μm</th>
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
                          <p className="font-display font-bold text-[#F2E8D8] text-[28px] tracking-tight leading-tight">{card.label}</p>
                          <p className="text-[14px] text-[#F2E8D8]/80 leading-relaxed">{card.body}</p>
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
        <div className={`relative ${WRAP}`}>
          <div className="grid grid-cols-[2fr_3fr] gap-24 md:gap-40 min-h-[70vh] -ml-12 md:-ml-24 -mr-12 md:-mr-24">

            {/* ── Left: step + heading + nav list ── */}
            <div className="flex flex-col pl-6 md:pl-8">
              <SectionLoader number={2.0} light />
              <motion.h2
                className="font-display font-semibold text-ink text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight mb-14 whitespace-nowrap"
                initial={{ clipPath: 'inset(0 0 100% 0)', skewY: 3 }}
                whileInView={{ clipPath: 'inset(0 0 -30% 0)', skewY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              >
                Drone <br></br>+ SDR
              </motion.h2>

              <motion.div variants={rise(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex flex-col self-start">
                {[
                  'IQ Data\nAcquisition',
                  'Power Spectrum\nFrequency Domain',
                  'Spectrogram\nTime-Frequency',
                ].map((label, i) => (
                  <button key={i} onClick={() => setActiveTabSDR(i)}
                    className={`flex items-start gap-3 py-5 border-b border-ink/10 text-left transition-colors duration-300
                      ${activeTabSDR === i ? 'text-ink' : 'text-ink-muted/40 hover:text-ink-muted/70'}`}>
                    <span className="font-display text-base leading-snug tracking-tight">
                      {label.split('\n').map((line, j) => <span key={j} className="block">{line}</span>)}
                      <sup className="font-mono text-[10px] tracking-widest opacity-50 ml-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </sup>
                    </span>
                    <span className={`mt-1 text-buckram text-lg leading-none transition-opacity duration-300 ${activeTabSDR === i ? 'opacity-100' : 'opacity-0'}`}>•</span>
                  </button>
                ))}
              </motion.div>
            </div>

            {/* ── Right: content panel ── */}
            <div className="flex flex-col justify-center pr-4 md:pr-8">
              <AnimatePresence mode="wait">

                {activeTabSDR === 0 && (
                  <motion.div key="iq"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-8">
                    <p className="text-lg text-ink-muted leading-relaxed">
                    A Software Defined Radio (SDR) digitises incoming radio signals and outputs IQ data — two continuous streams that together capture the complete state of the signal: both its strength and its phase. Everything our system detects is derived from this single raw stream.
                    </p>
                    <p className="text-lg text-ink-muted leading-relaxed">
                    The drone transmits a 915 MHz carrier. The patch antenna receives it, powers the circuit, and re-radiates a modified backscatter signal. That backscatter carries encoded information about the pipe's structural state. The SDR captures it as IQ samples.
                    </p>
                    <div className="border-l-2 border-buckram/60 pl-5 py-1">
                      <p className="font-mono text-xl text-ink font-semibold tracking-wide">s(t) = I(t) + jQ(t)</p>
                    </div>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="font-mono text-sm font-medium text-ink tracking-widest uppercase mt-6">From IQ alone we recover</motion.p>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: 'Instantaneous amplitude', formula: 'A(t) = √(I² + Q²)' },
                        { label: 'Instantaneous phase',     formula: 'φ(t) = arctan(Q/I)' },
                        { label: 'Instantaneous frequency', formula: 'f(t) = (1/2π) · dφ/dt' },
                      ].map((item, i) => (
                        <div key={i} className="border-l-2 border-ink/30 pl-4 py-1">
                          <p className="font-mono text-sm text-ink font-medium tracking-wide">{item.formula}</p>
                          <p className="font-mono text-xs text-ink-muted font-medium tracking-widest uppercase mt-1.5">{item.label}</p>
                        </div>
                      ))}
                    </div>
                    <ConstellationViz />
                  </motion.div>
                )}

                {activeTabSDR === 1 && (
                  <motion.div key="spectrum"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-7">
                    <div>
                      <p className="text-lg text-ink-muted leading-relaxed">FFT with Hann or Blackman-Harris window to suppress spectral leakage. Output: power spectral density (PSD) in dB.</p>
                    </div>
                    <p className="font-mono text-sm font-medium text-ink tracking-widest uppercase">What it reveals</p>
                    <div className="flex flex-col gap-5">
                      {[
                        { label: 'Carrier confirmation',   body: '915 MHz peak confirms the patch antenna is receiving RF energy and the MOSFET is in its default ON state.', formula: null },
                        { label: 'Sideband detection',     body: 'MOSFET toggling at rate f_mod amplitude-modulates the backscatter, creating sidebands at:', formula: 'f_carrier ± f_mod' },
                        { label: 'Modulation depth',       body: 'Proxy for defect severity — deeper crack → stronger piezo response → higher M:', formula: 'M = (A_max − A_min) / (A_max + A_min)' },
                        { label: 'Frequency deviation Δf', body: 'Crack alters acoustic propagation, shifting sidebands from expected position:', formula: 'f_sideband = f_carrier ± (f_mod + Δf)' },
                      ].map((item, i) => (
                        <motion.div key={i}
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="border-l-2 border-ink/20 pl-5 py-1">
                          <p className="text-base font-semibold text-ink mb-1">{item.label}</p>
                          <p className="text-base text-ink-muted leading-relaxed">{item.body}</p>
                          {item.formula && <p className="font-mono text-sm text-ink/80 tracking-wide mt-2">{item.formula}</p>}
                        </motion.div>
                      ))}
                    </div>
                    <SpectrumViz />
                  </motion.div>
                )}

                {activeTabSDR === 2 && (
                  <motion.div key="spectrogram"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-7">
                    <div>
                      <p className="text-lg text-ink-muted leading-relaxed">Short-Time Fourier Transform (STFT) — overlapping windowed frames, each FFT'd independently. Output: 2D frequency-vs-time map with amplitude encoded as colour.</p>
                    </div>
                    <p className="font-mono text-sm font-medium text-ink tracking-widest uppercase">What it reveals</p>
                    <div className="flex flex-col gap-5">
                      {[
                        { label: 'Excitation event',       body: 'Initial guided wave launch appears as a broadband burst at t = 0, localised to the excitation frequency band.', formula: null },
                        { label: 'Mode arrivals — S0 & A0', body: 'S0 (symmetric) arrives faster, non-dispersive. A0 (asymmetric) arrives slower, highly dispersive. Healthy pipe: S0 dominant, minimal A0.', formula: null },
                        { label: 'Crack localisation',     body: 'Reflected packet arrival time Δt gives axial crack position:', formula: 'd_crack = v_group × Δt / 2' },
                        { label: 'Mode conversion S0 → A0', body: 'Structural discontinuities convert energy from S0 to A0 — secondary lower-frequency arrival with higher dispersion. Greater converted energy = larger defect.', formula: null },
                        { label: 'Dispersion behaviour',   body: 'A0 dispersion varies with crack state (partially vs. fully open), enabling defect classification beyond binary presence/absence.', formula: null },
                      ].map((item, i) => (
                        <motion.div key={i}
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="border-l-2 border-ink/20 pl-5 py-1">
                          <p className="text-base font-semibold text-ink mb-1">{item.label}</p>
                          <p className="text-base text-ink-muted leading-relaxed">{item.body}</p>
                          {item.formula && <p className="font-mono text-sm text-ink/80 tracking-wide mt-2">{item.formula}</p>}
                        </motion.div>
                      ))}
                    </div>
                    <SpectrogramViz />
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* ── Layer 03: AI Analysis ── */}
      <section className="bg-card/60 overflow-hidden relative" style={syLg}>
        <div className="absolute -right-40 -bottom-40 w-[500px] h-[500px] rounded-full bg-ruskin/18 blur-3xl" />
        <div className="absolute left-0 top-0 w-[400px] h-[400px] rounded-full bg-buckram/12 blur-3xl" />
        <div className={`relative ${WRAP}`}>
          <div className="grid grid-cols-[2fr_3fr] gap-24 md:gap-40 min-h-[70vh] -ml-12 md:-ml-24 -mr-12 md:-mr-24">

            {/* ── Left: step + heading + nav list ── */}
            <div className="flex flex-col pl-6 md:pl-8">
              <SectionLoader number={3.0} light />
              <motion.h2
                className="font-display font-semibold text-ink text-5xl md:text-6xl lg:text-7xl leading-[0.92] tracking-tight mb-14"
                initial={{ clipPath: 'inset(0 0 100% 0)', skewY: 3 }}
                whileInView={{ clipPath: 'inset(0 0 -30% 0)', skewY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              >
                AI<br />Analysis
              </motion.h2>

              <motion.div variants={rise(0.2)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="flex flex-col self-start">
                {[
                  'Layer 1\n1D-CNN Classifier',
                  'Layer 2\nAutoencoder',
                  'Layer 3\nGrad-CAM',
                ].map((label, i) => (
                  <button key={i} onClick={() => setActiveTabAI(i)}
                    className={`flex items-start gap-3 py-5 border-b border-ink/10 text-left transition-colors duration-300
                      ${activeTabAI === i ? 'text-ink' : 'text-ink-muted/40 hover:text-ink-muted/70'}`}>
                    <span className="font-display text-base leading-snug tracking-tight">
                      {label.split('\n').map((line, j) => <span key={j} className="block">{line}</span>)}
                      <sup className="font-mono text-[10px] tracking-widest opacity-50 ml-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </sup>
                    </span>
                    <span className={`mt-1 text-buckram text-lg leading-none transition-opacity duration-300 ${activeTabAI === i ? 'opacity-100' : 'opacity-0'}`}>•</span>
                  </button>
                ))}
              </motion.div>
            </div>

            {/* ── Right: content panel ── */}
            <div className="flex flex-col justify-center pr-4 md:pr-8">
              <AnimatePresence mode="wait">

                {/* Layer 1: 1D-CNN */}
                {activeTabAI === 0 && (
                  <motion.div key="cnn"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-8">
                    <p className="text-lg text-ink-muted leading-relaxed">
                      A 1D-CNN that operates on the frequency axis. Rather than treating IQ values as raw numbers, it learns the <em>shape</em> of frequency-domain responses — the systematic differences between a healthy pipe and one affected by hydrogen embrittlement.
                    </p>
                    <div className="flex flex-col gap-2">
                      <p className="font-mono text-xs text-ink-muted/60 tracking-widest uppercase mb-2">Architecture</p>
                      {[
                        { label: 'Input',          desc: '(batch, 2, 100)  ·  I(f) + Q(f)',             border: 'border-ink/20' },
                        { label: 'Conv Block 1',    desc: '32 filters, k=7, padding=3  ·  BN + ReLU',    border: 'border-buckram/35' },
                        { label: 'Conv Block 2',    desc: '64 filters, k=5, padding=2  ·  BN + ReLU',    border: 'border-buckram/45' },
                        { label: 'Conv Block 3',    desc: '128 filters, k=5, padding=2  ·  BN + ReLU',   border: 'border-buckram/60' },
                        { label: 'Conv Block 4',    desc: '64 filters, k=3, padding=1  ·  BN + ReLU',    border: 'border-buckram/45' },
                        { label: 'Global Avg Pool', desc: '→ (batch, 64)',                                border: 'border-ink/20' },
                        { label: 'Linear(64→32)',   desc: 'ReLU  ·  Dropout 0.3',                         border: 'border-ink/20' },
                        { label: 'Linear(32→1)',    desc: 'Sigmoid  ·  threshold > 0.3 = crack detected', border: 'border-ruskin/50' },
                      ].map((row, i) => (
                        <div key={i} className={`border-l-2 ${row.border} pl-4 py-1.5`}>
                          <p className="font-mono text-sm text-ink font-medium tracking-wide">{row.label}</p>
                          <p className="font-mono text-xs text-ink-muted tracking-wide">{row.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-ink/5 border border-ink/10 rounded-2xl px-6 py-5">
                      <p className="font-mono text-xs text-ink-muted/60 tracking-widest uppercase mb-3">Loss Function</p>
                      <p className="font-mono text-base text-ink font-semibold tracking-wide">Asymmetric BCE</p>
                      <p className="text-sm text-ink-muted mt-2 leading-relaxed">Miss penalty ×10. A missed crack costs far more than a false alarm — threshold set conservatively at 0.3 to maximise recall.</p>
                    </div>
                  </motion.div>
                )}

                {/* Layer 2: Autoencoder */}
                {activeTabAI === 1 && (
                  <motion.div key="autoencoder"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-8">
                    <p className="text-lg text-ink-muted leading-relaxed">
                      Trained exclusively on healthy pipe data. The autoencoder learns to reconstruct normal IQ signatures accurately. When it encounters a cracked pipe, reconstruction error spikes — no labelled defect data required.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { title: 'Encoder',    color: 'border-buckram/40', lines: ['Conv(2→16, k=5) + ReLU', 'Conv(16→8, k=5) + ReLU', 'AdaptiveAvgPool', 'Flatten → Linear(8→16)'] },
                        { title: 'Bottleneck', color: 'border-ruskin/50',  lines: ['z = 16 dims', 'compressed healthy', 'pipe signature'] },
                        { title: 'Decoder',    color: 'border-buckram/40', lines: ['Linear(16→8) → Unflatten', 'Upsample(100)', 'Conv(8→16, k=5) + ReLU', 'Conv(16→2, k=5)'] },
                      ].map((col, i) => (
                        <div key={i} className={`border-l-2 ${col.color} pl-4 py-2`}>
                          <p className="font-mono text-xs text-ink-muted/60 tracking-widest uppercase mb-3">{col.title}</p>
                          {col.lines.map((line, j) => (
                            <p key={j} className="font-mono text-xs text-ink tracking-wide leading-relaxed">{line}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="bg-ink/5 border border-ink/10 rounded-2xl px-6 py-5 flex flex-col gap-4">
                      <div>
                        <p className="font-mono text-xs text-ink-muted/60 tracking-widest uppercase mb-3">Anomaly Scoring</p>
                        <p className="font-mono text-base text-ink font-semibold tracking-wide">score = MSE(input, reconstruction)</p>
                      </div>
                      <div className="border-t border-ink/10 pt-4">
                        <p className="font-mono text-sm text-buckram font-semibold tracking-wide">threshold = 99th percentile</p>
                        <p className="text-sm text-ink-muted mt-1 leading-relaxed">Calibrated on the healthy training set. Patches above threshold are flagged as anomalous — even if the CNN score is borderline.</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Layer 3: Grad-CAM */}
                {activeTabAI === 2 && (
                  <motion.div key="gradcam"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-8">
                    <p className="text-lg text-ink-muted leading-relaxed">
                      Gradient-weighted Class Activation Mapping on the final conv layer of the 1D-CNN. It answers: <em>which frequencies drove this classification?</em> Output is a 100-point frequency saliency map that engineers can cross-check against known pipe resonance modes.
                    </p>
                    <div className="flex flex-col gap-5">
                      {[
                        {
                          label: 'How it works',
                          body: 'Gradients of the crack-probability output are backpropagated to the last conv layer. Channel weights are multiplied by activations and spatially pooled — yielding a (100,) saliency vector, one value per frequency point.',
                          formula: 'output shape: (100,)  ·  range 0–1 per frequency point',
                        },
                        {
                          label: 'Physical consistency check',
                          checks: [
                            { yes: true,  text: 'Highlighted frequencies align with pipe resonance modes → decision has physical basis' },
                            { yes: false, text: "Frequencies don't align → model may be learning noise, flagged for retraining" },
                          ],
                        },
                      ].map((item, i) => (
                        <div key={i} className="border-l-2 border-ink/20 pl-5 py-1">
                          <p className="text-base font-semibold text-ink mb-2">{item.label}</p>
                          {item.body && <p className="text-base text-ink-muted leading-relaxed">{item.body}</p>}
                          {item.formula && <p className="font-mono text-sm text-ink/70 tracking-wide mt-2">{item.formula}</p>}
                          {item.checks && (
                            <div className="flex flex-col gap-3 mt-2">
                              {item.checks.map((c, j) => (
                                <div key={j} className="flex items-start gap-3">
                                  <span className={`font-semibold text-lg leading-none mt-0.5 ${c.yes ? 'text-buckram' : 'text-ruskin'}`}>{c.yes ? '✓' : '✗'}</span>
                                  <p className="text-base text-ink-muted leading-relaxed">{c.text}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <GradCAMViz />
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}
