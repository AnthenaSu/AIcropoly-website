import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

export default function CountUp({ to, decimals = 0, prefix = '', suffix = '', duration = 2 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(parseFloat(v.toFixed(decimals))),
    })
    return controls.stop
  }, [isInView, to, decimals, duration])

  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? display.toFixed(decimals) : display}{suffix}
    </span>
  )
}
