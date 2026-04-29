import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/about', label: 'About Us' },
  { to: '/market', label: 'Market' },
  { to: '/product', label: 'Our Product' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-parchment/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-12 md:px-24 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="font-display font-light text-xl tracking-widest uppercase text-ink hover:text-buckram transition-colors duration-300"
        >
          AIcropoly
        </Link>

        <div className="hidden md:flex items-center gap-12">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`font-body text-xs tracking-widest uppercase transition-colors duration-300 ${
                location.pathname === to ? 'text-ink' : 'text-ink-muted hover:text-ink'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden flex flex-col gap-1.5 w-5 cursor-pointer"
          onClick={() => setMenuOpen((m) => !m)}
        >
          <span className={`block h-px bg-ink transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block h-px bg-ink transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px bg-ink transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-48 border-b border-border' : 'max-h-0'} bg-parchment/98`}>
        <div className="px-8 py-6 flex flex-col gap-6">
          {NAV_LINKS.map(({ to, label }) => (
            <Link key={to} to={to} className="font-body text-xs tracking-widest uppercase text-ink-muted hover:text-ink transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
