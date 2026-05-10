import { useState, useEffect, useLayoutEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { to: '/about',   label: 'About Us' },
  { to: '/market',  label: 'Market' },
  { to: '/product', label: 'Our Product' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Detect dark sections under navbar — useLayoutEffect prevents flash on navigation
  useLayoutEffect(() => {
    const NAVBAR_H = 64
    const checkDark = () => {
      const sections = document.querySelectorAll('[data-nav-dark]')
      let dark = false
      for (const s of sections) {
        const { top, bottom } = s.getBoundingClientRect()
        if (top <= NAVBAR_H && bottom > 0) { dark = true; break }
      }
      setIsDark(dark)
    }
    checkDark()
    window.addEventListener('scroll', checkDark, { passive: true })
    return () => window.removeEventListener('scroll', checkDark)
  }, [location.pathname])

  useEffect(() => setMenuOpen(false), [location])

  const dark = isDark

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? dark
          ? 'bg-[#080503]/85 backdrop-blur-xl border-b border-[#F2E8D8]/8'
          : 'bg-parchment/80 backdrop-blur-xl border-b border-border'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-12 md:px-24 h-16 flex items-center justify-between">
        <Link
          to="/"
          className={`font-hero font-semibold text-xl tracking-widest uppercase transition-colors duration-300 hover:text-buckram ${
            dark ? 'text-[#F2E8D8]' : 'text-fg'
          }`}
        >
          AIcropoly
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`relative font-nav font-medium text-sm tracking-widest uppercase px-4 py-2 transition-colors duration-300 ${
                  active
                    ? 'text-buckram'
                    : dark
                      ? 'text-[#F2E8D8]/50 hover:text-[#F2E8D8]'
                      : 'text-fg-muted hover:text-fg'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="navPill"
                    className="absolute inset-0 rounded-full bg-buckram/10 border border-buckram/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </Link>
            )
          })}
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden flex flex-col gap-1.5 w-5 cursor-pointer"
          onClick={() => setMenuOpen((m) => !m)}
        >
          <span className={`block h-px transition-all duration-300 origin-center ${dark ? 'bg-[#F2E8D8]' : 'bg-fg'} ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block h-px transition-all duration-300 ${dark ? 'bg-[#F2E8D8]' : 'bg-fg'} ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px transition-all duration-300 origin-center ${dark ? 'bg-[#F2E8D8]' : 'bg-fg'} ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-48 border-b border-border' : 'max-h-0'} ${dark ? 'bg-[#080503]/95' : 'bg-parchment/95'} backdrop-blur-xl`}>
        <div className="px-8 py-6 flex flex-col gap-6">
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} className={`font-nav font-medium text-sm tracking-widest uppercase transition-colors ${
              location.pathname === to ? 'text-buckram' : dark ? 'text-[#F2E8D8]/50 hover:text-[#F2E8D8]' : 'text-fg-muted hover:text-fg'
            }`}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
