import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-ink text-fg/50 py-14 px-12 md:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div>
          <p className="font-display font-light text-2xl tracking-widest uppercase text-fg mb-1">AIcropoly</p>
          <p className="font-mono text-xs text-fg/40 tracking-widest uppercase">
            Pipeline Integrity Technology
          </p>
        </div>

        <div className="flex gap-16 text-xs tracking-widest uppercase">
          <div className="flex flex-col gap-4">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About Us' },
              { to: '/market', label: 'Market' },
              { to: '/product', label: 'Our Product' },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="hover:text-fg transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-fg/10 flex flex-col md:flex-row justify-between gap-2">
        <p className="font-mono text-xs">© 2026 AIcropoly. All rights reserved.</p>
        <p className="font-mono text-xs">Peter Farrell Cup · UNSW</p>
      </div>
    </footer>
  )
}
