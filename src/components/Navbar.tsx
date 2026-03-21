import { useState, useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { useNav } from '../components/Context/NavigationContext'

interface NavLink {
  label: string
  href: string
}

const links: NavLink[] = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features',     href: '#features' },
  { label: 'Pricing',      href: '#pricing' },
  { label: 'Marketplace',  href: '#marketplace' },
]

export default function Navbar(): JSX.Element {
  const { setView } = useNav()
  const [open, setOpen]         = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    const fn = (): void => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .nav-glass {
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
        }
        .nav-link::after {
          content: '';
          display: block;
          height: 1.5px;
          width: 0;
          background: #982598;
          transition: width 0.25s ease;
          margin-top: 2px;
          border-radius: 2px;
        }
        .nav-link:hover::after { width: 100%; }
        .synapse-btn {
          position: relative;
          overflow: hidden;
        }
        .synapse-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1e2050 0%, #2d1e4a 100%);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .synapse-btn:hover::before { opacity: 1; }
        .synapse-btn > * { position: relative; z-index: 1; }
      `}</style>

      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 nav-glass ${
          scrolled
            ? 'bg-white/96 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] border-b border-black/[0.04]'
            : 'bg-white/70'
        }`}
      >
        {/* Full-width inner — edge padding only, no max-width cap */}
        <div className="w-full px-6 sm:px-10 lg:px-16 flex items-center justify-between h-[60px]">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
            <div
              className="w-8 h-8 rounded-[10px] flex items-center justify-center shadow-sm"
              style={{ background: 'linear-gradient(135deg, #982598 0%, #6b1c7e 100%)' }}
            >
              <AutoAwesomeIcon sx={{ fontSize: 15, color: '#fff' }} />
            </div>
            <span className="font-extrabold text-[18px] tracking-[-0.02em]" style={{ color: '#15173D' }}>
              Founder<span style={{ color: '#982598' }}>Match</span>
            </span>
          </a>

          {/* Desktop links — truly centered via absolute positioning */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="nav-link text-[13.5px] font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
            <button
              onClick={() => setView('assessment')}
              className="synapse-btn flex items-center gap-2 px-4 py-2 rounded-[9px] text-[13px] font-semibold transition-all"
              style={{ background: '#15173D', color: '#fff' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: '#982598', animation: 'blink 1.2s infinite' }}
              />
              SYNAPSE™ Test
            </button>

            <button
              onClick={() => setView('login')}
              className="text-[13px] font-medium text-gray-500 hover:text-gray-900 transition-colors bg-transparent border-none cursor-pointer px-3 py-2"
            >
              Log In
            </button>

            <button
              onClick={() => setView('login')}
              className="px-4 py-2 rounded-[9px] text-[13px] font-semibold text-white transition-all hover:shadow-[0_4px_16px_rgba(152,37,152,0.35)] active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #982598 0%, #b535b5 100%)' }}
            >
              Start Free →
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open
              ? <CloseIcon sx={{ fontSize: 21, color: '#15173D' }} />
              : <MenuIcon  sx={{ fontSize: 21, color: '#15173D' }} />
            }
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-white/98 border-t border-gray-100 pb-5 shadow-lg">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-7 py-3 text-[14px] font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="px-7 pt-4 flex flex-col gap-2.5">
              <button
                onClick={() => { setOpen(false); setView('assessment') }}
                className="w-full py-3 rounded-[10px] text-center text-[13.5px] font-semibold flex items-center justify-center gap-2"
                style={{ background: '#15173D', color: '#fff' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#982598', animation: 'blink 1.2s infinite' }}
                />
                SYNAPSE™ Test
              </button>
              <button
                onClick={() => { setOpen(false); setView('login') }}
                className="w-full py-3 rounded-[10px] text-center text-[13.5px] font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #982598, #b535b5)' }}
              >
                Start Free →
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
