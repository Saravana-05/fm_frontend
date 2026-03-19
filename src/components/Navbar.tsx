import { useState, useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { useNav } from '../components/Context/NavigationContext'

export default function Navbar() {
  const { setView } = useNav()
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features',     href: '#features' },
    { label: 'Pricing',      href: '#pricing' },
    { label: 'Marketplace',  href: '#marketplace' },
  ]

  return (
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 nav-blur ${
      scrolled ? 'bg-white/95 shadow-sm border-b border-gray-100' : 'bg-white/80'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#982598' }}>
            <AutoAwesomeIcon sx={{ fontSize: 16, color: '#fff' }} />
          </div>
          <span className="font-bold text-xl tracking-tight" style={{ color: '#15173D' }}>
            Founder<span style={{ color: '#982598' }}>Match</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.label} href={l.href}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {/* SYNAPSE™ pill button */}
          <button
            onClick={() => setView('assessment')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90 hover:shadow-md"
            style={{ background: '#15173D', color: '#fff' }}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{
                background: '#982598',
                animation: 'blink 1s infinite',
              }}
            />
            SYNAPSE™ Test
          </button>

          <button
            onClick={() => setView('login')}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors bg-transparent border-none cursor-pointer"
          >
            Log In
          </button>
          <button
            onClick={() => setView('login')}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md"
            style={{ background: '#982598' }}
          >
            Start Free
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(!open)}>
          {open
            ? <CloseIcon sx={{ fontSize: 22, color: '#15173D' }} />
            : <MenuIcon  sx={{ fontSize: 22, color: '#15173D' }} />
          }
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4">
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              {l.label}
            </a>
          ))}
          <div className="px-6 pt-3 flex flex-col gap-2">
            {/* SYNAPSE™ in mobile menu */}
            <button
              onClick={() => { setOpen(false); setView('assessment') }}
              className="w-full py-2.5 rounded-lg text-center text-sm font-semibold flex items-center justify-center gap-2"
              style={{ background: '#15173D', color: '#fff' }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: '#982598', animation: 'blink 1s infinite' }}
              />
              SYNAPSE™ Test
            </button>
            <button
              onClick={() => { setOpen(false); setView('login') }}
              className="w-full py-2.5 rounded-lg text-center text-sm font-semibold text-white hover:opacity-90"
              style={{ background: '#982598' }}
            >
              Start Free
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}