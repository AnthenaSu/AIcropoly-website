import { Link } from 'react-router-dom'
import logoOnly from '../assets/logoonly.png'
import newlogo from '../assets/newlogo.png'

export default function Footer() {
  return (
    <footer className="bg-parchment text-fg-muted py-14 px-12 md:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <img src={newlogo} alt="VeinPulse" className="h-30 w-auto object-contain" />
          </div>
          <p className="font-mono text-xs text-fg-muted tracking-widest uppercase">
            Pipeline Integrity Technology
          </p>
        </div>

        <div className="flex gap-16 text-xs tracking-widest uppercase">
          <div className="flex flex-col gap-4">
            {[
              { to: '/',        label: 'Home' },
              { to: '/about',   label: 'About Us' },
              { to: '/market',  label: 'Market' },
              { to: '/product', label: 'Our Product' },
            ].map(({ to, label }) => (
              <Link key={to} to={to} className="hover:text-fg transition-colors duration-300">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 flex flex-col md:flex-row justify-between gap-2">
        <p className="font-mono text-xs">© 2026 VEINPULSE. All rights reserved.</p>
        <p className="font-mono text-xs">Peter Farrell Cup · UNSW</p>
      </div>
    </footer>
  )
}
