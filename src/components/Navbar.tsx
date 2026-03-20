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

  useEffect(() => {
    const id = 'synapse-blink-style'
    if (document.getElementById(id)) return
    const style = document.createElement('style')
    style.id = id
    style.textContent = `
      @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
      @keyframes nb-shine {
        0%{background-position:-200% center}
        100%{background-position:200% center}
      }
      .nb-logo-mark {
        background: linear-gradient(135deg,#0f0826,#1e0e3c,#3b1d78);
        transition: box-shadow .22s, transform .22s;
      }
      .nb-logo-mark:hover {
        box-shadow: 0 4px 16px rgba(30,14,60,.3);
        transform: scale(1.06);
      }
      .nb-link {
        font-size:14px; font-weight:600; color:#3b1d78;
        text-decoration:none; position:relative; transition:color .18s;
      }
      .nb-link::after {
        content:''; position:absolute; bottom:-3px; left:0; right:0; height:1.5px;
        background:linear-gradient(90deg,#1e0e3c,#3b1d78);
        transform:scaleX(0); transform-origin:left;
        transition:transform .24s cubic-bezier(.22,1,.36,1);
        border-radius:2px;
      }
      .nb-link:hover { color:#0f0826; }
      .nb-link:hover::after { transform:scaleX(1); }

      .nb-synapse-btn {
        display:flex; align-items:center; gap:6px;
        padding:8px 16px; border-radius:10px;
        font-size:13px; font-weight:800; letter-spacing:.03em;
        background:linear-gradient(135deg,#0f0826,#1e0e3c 55%,#2d1b69);
        color:#e2d9f3; border:none; cursor:pointer;
        box-shadow:0 3px 14px rgba(15,8,38,.3), inset 0 1px 0 rgba(255,255,255,.08);
        transition:transform .2s cubic-bezier(.22,1,.36,1), box-shadow .2s;
        position:relative; overflow:hidden;
      }
      .nb-synapse-btn::before {
        content:''; position:absolute; top:0; left:-90%; width:55%; height:100%;
        background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);
        transform:skewX(-15deg); transition:left .4s ease;
      }
      .nb-synapse-btn:hover::before { left:140%; }
      .nb-synapse-btn:hover {
        transform:translateY(-2px) scale(1.02);
        box-shadow:0 8px 22px rgba(15,8,38,.38), inset 0 1px 0 rgba(255,255,255,.1);
      }

      .nb-login-btn {
        font-size:13px; font-weight:700; color:#3b1d78;
        background:transparent; border:none; cursor:pointer;
        padding:8px 12px; border-radius:8px;
        transition:color .18s, background .18s;
      }
      .nb-login-btn:hover { color:#0f0826; background:#f0edf8; }

      .nb-start-btn {
        padding:8px 18px; border-radius:10px;
        font-size:13px; font-weight:800; color:#fff; border:none; cursor:pointer;
        background:linear-gradient(135deg,#1e0e3c,#3b1d78);
        box-shadow:0 3px 14px rgba(30,14,60,.28), inset 0 1px 0 rgba(255,255,255,.1);
        transition:transform .2s, box-shadow .2s;
        position:relative; overflow:hidden;
      }
      .nb-start-btn::before {
        content:''; position:absolute; top:0; left:-90%; width:55%; height:100%;
        background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);
        transform:skewX(-15deg); transition:left .4s ease;
      }
      .nb-start-btn:hover::before { left:140%; }
      .nb-start-btn:hover {
        transform:translateY(-2px);
        box-shadow:0 8px 22px rgba(30,14,60,.38);
      }

      .nb-mobile-link {
        display:block; padding:12px 24px; font-size:14px; font-weight:600;
        color:#3b1d78; text-decoration:none;
        transition:background .18s, color .18s;
        border-left:3px solid transparent;
      }
      .nb-mobile-link:hover {
        background:#f8f6ff; color:#0f0826;
        border-left-color:#3b1d78;
      }
    `
    document.head.appendChild(style)
  }, [])

  const links = [
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Features',     href: '#features' },
    { label: 'Pricing',      href: '#pricing' },
    { label: 'Marketplace',  href: '#marketplace' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      transition: 'all .3s',
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.82)',
      backdropFilter: 'blur(16px)',
      borderBottom: scrolled ? '1px solid #e8e4f0' : '1px solid transparent',
      boxShadow: scrolled ? '0 2px 20px rgba(30,14,60,.07)' : 'none',
    }}>
      <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between', height:64 }}>

        {/* Logo */}
        <a href="#" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
          <div className="nb-logo-mark" style={{
            width:34, height:34, borderRadius:10,
            display:'flex', alignItems:'center', justifyContent:'center',
            border:'1px solid rgba(59,29,120,.2)',
          }}>
            <AutoAwesomeIcon sx={{ fontSize:16, color:'#e2d9f3' }} />
          </div>
          <span style={{ fontWeight:800, fontSize:18, letterSpacing:'-.02em', color:'#0f0826' }}>
            Founder<span style={{ color:'#3b1d78' }}>Match</span>
          </span>
        </a>

        {/* Desktop links */}
        <div style={{ display:'flex', alignItems:'center', gap:32 }} className="hidden md:flex">
          {links.map(l => (
            <a key={l.label} href={l.href} className="nb-link">{l.label}</a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div style={{ display:'flex', alignItems:'center', gap:10 }} className="hidden md:flex">
          <button className="nb-synapse-btn" onClick={() => setView('assessment')}>
            <span style={{ width:7, height:7, borderRadius:'50%', background:'#c4b8e8', flexShrink:0, animation:'blink 1s infinite' }} />
            SYNAPSE™ Test
          </button>
          <button className="nb-login-btn" onClick={() => setView('login')}>Log In</button>
          <button className="nb-start-btn" onClick={() => setView('login')}>Start Free</button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            display:'flex', alignItems:'center', justifyContent:'center',
            width:38, height:38, borderRadius:9, border:'1px solid #e8e4f0',
            background:'#fff', cursor:'pointer', transition:'background .18s',
          }}
          className="md:hidden"
        >
          {open
            ? <CloseIcon sx={{ fontSize:20, color:'#0f0826' }} />
            : <MenuIcon  sx={{ fontSize:20, color:'#0f0826' }} />
          }
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background:'#fff', borderTop:'1px solid #f0edf8', paddingBottom:16 }} className="md:hidden">
          {links.map(l => (
            <a key={l.label} href={l.href} className="nb-mobile-link" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <div style={{ padding:'12px 24px', display:'flex', flexDirection:'column', gap:8 }}>
            <button
              className="nb-synapse-btn"
              style={{ justifyContent:'center' }}
              onClick={() => { setOpen(false); setView('assessment') }}
            >
              <span style={{ width:7, height:7, borderRadius:'50%', background:'#c4b8e8', flexShrink:0, animation:'blink 1s infinite' }} />
              SYNAPSE™ Test
            </button>
            <button
              className="nb-start-btn"
              style={{ width:'100%', padding:'10px 18px' }}
              onClick={() => { setOpen(false); setView('login') }}
            >
              Start Free
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}