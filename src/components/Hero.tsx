import type { FC, ElementType } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import GroupsIcon from '@mui/icons-material/Groups'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import StarRateIcon from '@mui/icons-material/StarRate'
import VerifiedIcon from '@mui/icons-material/Verified'
import type { SvgIconProps } from '@mui/material'

interface StatItem {
  Icon: ElementType<SvgIconProps>
  value: string
  label: string
}

interface BarItem {
  label: string
  pct: number
  delay: string
}

const stats: StatItem[] = [
  { Icon: GroupsIcon,     value: '2,400+', label: 'Founders Matched' },
  { Icon: TrendingUpIcon, value: '78%',    label: 'Partnership Success' },
  { Icon: StarRateIcon,   value: '4.9/5',  label: 'Founder Rating' },
]

const bars: BarItem[] = [
  { label: 'Vision Alignment', pct: 96, delay: '0.8s' },
  { label: 'Work Style',        pct: 88, delay: '1.0s' },
  { label: 'Risk Tolerance',    pct: 92, delay: '1.2s' },
]

const Hero: FC = () => {
import { useEffect, useRef, useState } from 'react'

/* ─────────────────────────────────────────
   Count-up hook
───────────────────────────────────────── */
function useCountUp(target, duration = 1600, delay = 800) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let start = null
    const t = setTimeout(() => {
      const step = ts => {
        if (!start) start = ts
        const progress = Math.min((ts - start) / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        setVal(Math.floor(ease * target))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, delay)
    return () => clearTimeout(t)
  }, [target, duration, delay])
  return val
}

/* ─────────────────────────────────────────
   Magnetic cursor blob
───────────────────────────────────────── */
function MagneticBlob() {
  const blobRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)
  useEffect(() => {
    const onMove = e => { targetRef.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)
    const lerp = (a, b, t) => a + (b - a) * t
    const animate = () => {
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.06)
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.06)
      if (blobRef.current)
        blobRef.current.style.transform = `translate(${posRef.current.x}px,${posRef.current.y}px) translate(-50%,-50%)`
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(rafRef.current) }
  }, [])
  return (
    <div ref={blobRef} style={{
      position: 'fixed', top: 0, left: 0,
      width: 480, height: 480, borderRadius: '50%',
      background: 'radial-gradient(circle,rgba(30,14,60,.06) 0%,transparent 70%)',
      pointerEvents: 'none', zIndex: 0, willChange: 'transform',
    }} />
  )
}

/* ─────────────────────────────────────────
   Particle canvas — dark dots on white
───────────────────────────────────────── */
function ParticleCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    const DOTS = Array.from({ length: 52 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - .5) * .00016,
      vy: (Math.random() - .5) * .00016,
      r: Math.random() * 1.8 + .4,
      o: Math.random() * .22 + .06,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      DOTS.forEach(d => {
        d.x = (d.x + d.vx + 1) % 1
        d.y = (d.y + d.vy + 1) % 1
        const px = d.x * canvas.width, py = d.y * canvas.height
        ctx.beginPath()
        ctx.arc(px, py, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(30,14,60,${d.o})`
        ctx.fill()
      })
      for (let i = 0; i < DOTS.length; i++) {
        for (let j = i + 1; j < DOTS.length; j++) {
          const ax = DOTS[i].x * canvas.width, ay = DOTS[i].y * canvas.height
          const bx = DOTS[j].x * canvas.width, by = DOTS[j].y * canvas.height
          const dist = Math.hypot(ax - bx, ay - by)
          if (dist < 88) {
            ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by)
            ctx.strokeStyle = `rgba(30,14,60,${.06 * (1 - dist / 88)})`
            ctx.lineWidth = .5; ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

/* ─────────────────────────────────────────
   Chip
───────────────────────────────────────── */
function Chip({ children, accent }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '4px 12px', borderRadius: 6,
      background: accent ? '#1e0e3c' : '#f0edf8',
      border: `1px solid ${accent ? '#3b1d78' : '#d9d0ee'}`,
      fontSize: 11, fontWeight: 700, letterSpacing: '.04em',
      color: accent ? '#e2d9f3' : '#2d1b69',
      whiteSpace: 'nowrap',
    }}>{children}</span>
  )
}

/* ─────────────────────────────────────────
   Feed Item
───────────────────────────────────────── */
const GRADIENTS = [
  'linear-gradient(135deg,#1e0e3c,#3b1d78)',
  'linear-gradient(135deg,#0f0826,#2d1b69)',
]
function FeedItem({ avatar, name, role, loc, delay, gi = 0 }) {
  return (
    <div className="feed-item" style={{ animationDelay: `${delay}s` }}>
      <div style={{
        width: 32, height: 32, borderRadius: 9, flexShrink: 0,
        background: GRADIENTS[gi % GRADIENTS.length],
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 800, color: '#e2d9f3',
        border: '1px solid rgba(255,255,255,.08)',
      }}>{avatar}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#0f0826', marginBottom: 2 }}>{name}</div>
        <div style={{ fontSize: 11, color: '#7c6fa0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{role} · {loc}</div>
      </div>
      <div style={{
        fontSize: 10, fontWeight: 800, color: '#e2d9f3',
        background: '#1e0e3c', border: '1px solid #3b1d78',
        padding: '2px 7px', borderRadius: 99,
        letterSpacing: '.04em',
      }}>NEW</div>
    </div>
  )
}

/* ─────────────────────────────────────────
   CSS
───────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

  .hr * { font-family:'Cabinet Grotesk',sans-serif; box-sizing:border-box; margin:0; padding:0; }

  @keyframes fadeUp    { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
  @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  @keyframes shimmerSlide { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes floatMain  { 0%,100%{transform:translateY(0) rotate(-.3deg)} 50%{transform:translateY(-14px) rotate(.3deg)} }
  @keyframes floatPillA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px) translateX(3px)} }
  @keyframes floatPillB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(9px)} }
  @keyframes barFill    { from{width:0} }
  @keyframes pulseRing  { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(2.6);opacity:0} }
  @keyframes borderRun  { 0%{background-position:0% 0%} 100%{background-position:300% 0%} }
  @keyframes badgePop   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.022)} }
  @keyframes sparkSpin  { 0%,100%{opacity:0;transform:scale(0) rotate(0deg)} 40%,60%{opacity:1;transform:scale(1) rotate(180deg)} }
  @keyframes ringExpand { 0%{transform:translate(-50%,-50%) scale(.5);opacity:.2} 100%{transform:translate(-50%,-50%) scale(2.1);opacity:0} }
  @keyframes feedSlide  { from{opacity:0;transform:translateX(14px)} to{opacity:1;transform:translateX(0)} }
  @keyframes auroraA    { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(50px,-40px) scale(1.1)} 66%{transform:translate(-30px,40px) scale(.92)} }
  @keyframes auroraB    { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-60px,50px) scale(1.08)} }
  @keyframes scoreIn    { from{opacity:0;transform:scale(.5) rotate(-10deg)} to{opacity:1;transform:scale(1) rotate(0deg)} }
  @keyframes cardShine  { 0%{opacity:0;left:-80%} 8%{opacity:1} 20%,100%{opacity:0;left:130%} }
  @keyframes progressPulse { 0%,100%{box-shadow:0 0 5px rgba(30,14,60,.18)} 50%{box-shadow:0 0 14px rgba(59,29,120,.42)} }

  .fu { animation:fadeUp .65s cubic-bezier(.22,1,.36,1) both; }
  .fi { animation:fadeIn .5s ease both; }
  .d1{animation-delay:.06s}.d2{animation-delay:.16s}.d3{animation-delay:.3s}
  .d4{animation-delay:.46s}.d5{animation-delay:.62s}.d6{animation-delay:.8s}

  /* Dark gradient headline */
  .grad-text {
    background: linear-gradient(125deg,#0f0826 0%,#2d1b69 28%,#4c1d95 55%,#1e0e3c 80%,#0f0826 100%);
    background-size:300% 300%;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    animation: gradShift 6s ease infinite;
  }
  .italic-serif { font-family:'Instrument Serif',serif; font-style:italic; font-weight:400; }

  /* Badge */
  .hero-badge {
    display:inline-flex; align-items:center; gap:8px;
    padding:6px 16px 6px 10px; border-radius:99px; margin-bottom:30px;
    background:#f0edf8;
    font-size:11.5px; font-weight:700; letter-spacing:.05em; text-transform:uppercase;
    color:#1e0e3c; position:relative; overflow:hidden;
    animation:badgePop 3s ease-in-out infinite, fadeUp .65s cubic-bezier(.22,1,.36,1) .06s both;
    border:1px solid #c4b8e8;
  }
  .hero-badge::before {
    content:''; position:absolute; inset:-1px; border-radius:99px; padding:1px;
    background:linear-gradient(90deg,rgba(30,14,60,.3),rgba(76,29,149,.7),rgba(30,14,60,.3));
    background-size:300% 100%;
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude;
    animation:borderRun 3s linear infinite; pointer-events:none;
  }

  .pdot { position:relative; display:inline-flex; }
  .pdot::before {
    content:''; position:absolute; inset:0; border-radius:50%;
    background:#16a34a; animation:pulseRing 2s cubic-bezier(.2,0,.8,1) infinite;
  }

  /* Primary button */
  .btn-p {
    position:relative; overflow:hidden;
    display:inline-flex; align-items:center; gap:8px;
    padding:14px 30px; border-radius:12px;
    font-size:14px; font-weight:800; letter-spacing:.02em;
    color:#fff; text-decoration:none; cursor:pointer; border:none;
    background:linear-gradient(135deg,#0f0826 0%,#1e0e3c 40%,#2d1b69 100%);
    box-shadow:0 4px 24px rgba(15,8,38,.35), 0 1px 0 rgba(255,255,255,.08) inset;
    transition:transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s;
  }
  .btn-p::before {
    content:''; position:absolute; top:0; left:-90%; width:55%; height:100%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent);
    transform:skewX(-15deg); transition:left .42s ease;
  }
  .btn-p:hover::before{left:140%}
  .btn-p:hover { transform:translateY(-3px) scale(1.02); box-shadow:0 16px 40px rgba(15,8,38,.45), 0 1px 0 rgba(255,255,255,.1) inset!important; }
  .btn-p:active { transform:translateY(-1px) scale(.99); }

  /* Secondary button */
  .btn-s {
    display:inline-flex; align-items:center; gap:8px;
    padding:14px 30px; border-radius:12px;
    font-size:14px; font-weight:800;
    color:#1e0e3c; text-decoration:none; cursor:pointer;
    background:#fff; border:1.5px solid #c4b8e8;
    transition:all .22s cubic-bezier(.22,1,.36,1);
    position:relative; overflow:hidden;
  }
  .btn-s::after {
    content:''; position:absolute; inset:0; border-radius:inherit;
    background:radial-gradient(circle at 50% 120%,rgba(30,14,60,.06) 0%,transparent 60%);
    opacity:0; transition:opacity .3s;
  }
  .btn-s:hover::after { opacity:1; }
  .btn-s:hover { transform:translateY(-3px); background:#f8f6ff; border-color:#3b1d78; box-shadow:0 8px 24px rgba(30,14,60,.12); }

  /* Stats */
  .stat-item { cursor:default; }
  .stat-icon {
    width:40px; height:40px; border-radius:11px;
    display:flex; align-items:center; justify-content:center;
    background:#f0edf8; border:1px solid #c4b8e8;
    transition:transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s, background .2s; flex-shrink:0;
  }
  .stat-item:hover .stat-icon { transform:rotate(-10deg) scale(1.18); box-shadow:0 6px 18px rgba(30,14,60,.18); background:#e8e2f5; }
  .stat-val { font-size:.95rem; font-weight:900; color:#0f0826; transition:color .2s; }
  .stat-item:hover .stat-val { color:#2d1b69; }

  .divider { height:1px; width:100%; background:linear-gradient(90deg,transparent,rgba(30,14,60,.15),rgba(30,14,60,.06),transparent); margin:2rem 0; }

  /* Card */
  .card-wrap { animation:floatMain 7s ease-in-out infinite; }
  .card-inner {
    position:relative; overflow:hidden; border-radius:24px; padding:28px;
    background:#fff;
    border:1px solid #d4cce8;
    box-shadow:0 2px 0 #f0edf8, 0 24px 60px rgba(30,14,60,.1), 0 8px 20px rgba(0,0,0,.05);
    transition:box-shadow .4s;
  }
  .card-inner:hover {
    box-shadow:0 2px 0 #e8e2f5, 0 40px 80px rgba(30,14,60,.15), 0 12px 28px rgba(0,0,0,.07)!important;
  }
  .card-shine {
    position:absolute; top:0; height:100%; width:40%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.65),transparent);
    transform:skewX(-12deg); pointer-events:none; z-index:10;
    animation:cardShine 7s ease-in-out 1.5s infinite;
  }

  /* Avatar */
  .avatar-box {
    width:50px; height:50px; border-radius:14px; overflow:hidden; flex-shrink:0;
    background:linear-gradient(135deg,#0f0826,#1e0e3c,#3b1d78);
    display:flex; align-items:center; justify-content:center;
    font-weight:900; color:#e2d9f3; font-size:20px;
    position:relative; border:1px solid rgba(255,255,255,.08);
    box-shadow:0 4px 14px rgba(15,8,38,.3);
  }
  .avatar-shimmer {
    position:absolute; inset:0;
    background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.18) 50%,transparent 70%);
    background-size:200% 100%; animation:shimmerSlide 3s linear infinite;
  }

  /* Score badge */
  .score-badge {
    display:flex; align-items:center; gap:4px;
    padding:4px 10px; border-radius:99px;
    background:#1e0e3c; color:#e2d9f3;
    font-size:12px; font-weight:800; letter-spacing:.02em;
    border:1px solid #3b1d78;
    animation:scoreIn .6s cubic-bezier(.34,1.56,.64,1) 1.2s both;
  }

  /* Bars */
  .bar-track { height:7px; border-radius:99px; overflow:hidden; background:#f0edf8; position:relative; }
  .bar-fill { animation:barFill 1s cubic-bezier(.22,1,.36,1) both; }
  .bf1{animation-delay:1.1s}.bf2{animation-delay:1.35s}.bf3{animation-delay:1.6s}

  /* Pills */
  .pill-a { position:absolute; top:-26px; left:-28px; z-index:20; animation:floatPillA 5.5s ease-in-out 1s infinite; }
  .pill-b { position:absolute; bottom:-26px; right:-28px; z-index:20; animation:floatPillB 6s ease-in-out .5s infinite; }
  .pill-box {
    background:#fff; border:1px solid #d4cce8; border-radius:16px; padding:10px 14px;
    box-shadow:0 10px 32px rgba(30,14,60,.1), 0 2px 8px rgba(0,0,0,.05);
    display:flex; align-items:center; gap:10px;
    transition:transform .22s, box-shadow .22s;
  }
  .pill-a:hover .pill-box,.pill-b:hover .pill-box { transform:scale(1.05); box-shadow:0 16px 38px rgba(30,14,60,.16), 0 4px 12px rgba(0,0,0,.06); }
  .pill-icon { width:32px; height:32px; border-radius:10px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:16px; background:#f0edf8; border:1px solid #c4b8e8; }

  /* Connect btn */
  .conn-btn {
    width:100%; padding:13px; border-radius:12px; border:none; cursor:pointer;
    font-family:'Cabinet Grotesk',sans-serif; font-size:14px; font-weight:800; color:#e2d9f3;
    background:linear-gradient(135deg,#0f0826,#1e0e3c 50%,#2d1b69);
    box-shadow:0 4px 18px rgba(15,8,38,.3), inset 0 1px 0 rgba(255,255,255,.08);
    position:relative; overflow:hidden;
    transition:transform .2s, box-shadow .2s, letter-spacing .2s;
    letter-spacing:.01em;
  }
  .conn-btn::before {
    content:''; position:absolute; top:0; left:-90%; width:55%; height:100%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);
    transform:skewX(-15deg); transition:left .4s ease;
  }
  .conn-btn:hover::before{left:140%}
  .conn-btn:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(15,8,38,.4), inset 0 1px 0 rgba(255,255,255,.1)!important; letter-spacing:.03em; }

  /* Sparkles */
  .spk { position:absolute; clip-path:polygon(50% 0%,100% 50%,50% 100%,0% 50%); animation:sparkSpin 4s ease-in-out infinite; pointer-events:none; }
  .sk1{top:9%;right:18%;width:8px;height:8px;animation-delay:0s;background:#1e0e3c}
  .sk2{top:50%;right:7%;width:5px;height:5px;animation-delay:1.2s;background:#2d1b69}
  .sk3{top:24%;right:32%;width:9px;height:9px;animation-delay:.7s;background:#0f0826}
  .sk4{bottom:18%;right:22%;width:6px;height:6px;animation-delay:2s;background:#3b1d78}
  .sk5{top:70%;right:44%;width:5px;height:5px;animation-delay:1.7s;background:#1e0e3c}

  /* Rings */
  .ring-exp { position:absolute; border-radius:50%; border:1px solid rgba(30,14,60,.08); top:50%; left:50%; width:360px; height:360px; animation:ringExpand 4.5s ease-out infinite; pointer-events:none; }
  .re2{animation-delay:1.5s}.re3{animation-delay:3s}

  .au1{animation:auroraA 18s ease-in-out infinite}
  .au2{animation:auroraB 24s ease-in-out infinite}

  .feed-item { display:flex; align-items:center; gap:10px; padding:8px 0; border-bottom:1px solid #f0edf8; animation:feedSlide .5s cubic-bezier(.22,1,.36,1) both; }
  .feed-item:last-child{border-bottom:none}
`

/* ─────────────────────────────────────────
   Component
───────────────────────────────────────── */
export default function Hero() {
  const founders = useCountUp(2400, 1800, 950)
  const success  = useCountUp(78,   1200, 1050)
  const ratingN  = useCountUp(49,   1400, 1000)

  const DARK = '#1e0e3c'

  const stats = [
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={DARK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      value: `${founders.toLocaleString()}+`,
      label: 'Founders Matched',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={DARK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
        </svg>
      ),
      value: `${success}%`,
      label: 'Partnership Success',
    },
    {
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={DARK} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
      value: `${(ratingN / 10).toFixed(1)}/5`,
      label: 'Founder Rating',
    },
  ]

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes floatDelay {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-7px); }
        }
        @keyframes progressIn {
          from { width: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes grain {
          0%,100% { transform: translate(0,0); }
          10%  { transform: translate(-2%, -3%); }
          20%  { transform: translate(3%, 1%); }
          30%  { transform: translate(-1%, 4%); }
          40%  { transform: translate(4%, -2%); }
          50%  { transform: translate(-3%, 3%); }
          60%  { transform: translate(2%, -4%); }
          70%  { transform: translate(-4%, 1%); }
          80%  { transform: translate(1%, 3%); }
          90%  { transform: translate(3%, -1%); }
        }
        .hero-float       { animation: float 6s ease-in-out infinite; }
        .hero-float-delay { animation: floatDelay 6s ease-in-out infinite 1.5s; }
        .hero-fade-1 { animation: fadeUp 0.7s ease both 0.1s; }
        .hero-fade-2 { animation: fadeUp 0.7s ease both 0.2s; }
        .hero-fade-3 { animation: fadeUp 0.7s ease both 0.35s; }
        .hero-fade-4 { animation: fadeUp 0.7s ease both 0.5s; }
        .hero-fade-5 { animation: fadeUp 0.7s ease both 0.65s; }
        .hero-card-anim { animation: fadeUp 0.8s ease both 0.3s; }
        .progress-bar { animation: progressIn 1.4s cubic-bezier(.4,0,.2,1) both; }
        .grad-text {
          background: linear-gradient(135deg, #982598 0%, #c040c0 50%, #e060e0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .noise-overlay::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.4;
          animation: grain 8s steps(1) infinite;
        }
        .badge-ping::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #22c55e;
          animation: pulseRing 1.5s ease-out infinite;
        }
        .stat-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(152,37,152,0.12);
        }
        .primary-btn {
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .primary-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: white;
          opacity: 0;
          transition: opacity 0.15s;
        }
        .primary-btn:hover::after { opacity: 0.08; }
        .primary-btn:active { transform: scale(0.98); }
        .secondary-btn { transition: all 0.2s ease; }
        .secondary-btn:hover {
          background: rgba(152,37,152,0.04);
          border-color: rgba(152,37,152,0.3) !important;
        }
        .mesh-blob-1 {
          background: radial-gradient(ellipse at 70% 50%, rgba(152,37,152,0.12) 0%, transparent 65%);
        }
        .mesh-blob-2 {
          background: radial-gradient(ellipse at 20% 80%, rgba(21,23,61,0.07) 0%, transparent 55%);
        }
        .mesh-blob-3 {
          background: radial-gradient(ellipse at 90% 10%, rgba(192,64,192,0.08) 0%, transparent 50%);
        }
        .connect-btn { transition: all 0.2s; }
        .connect-btn:hover {
          background: #7d1e7d !important;
          box-shadow: 0 4px 20px rgba(152,37,152,0.4);
        }
      `}</style>

      <section className="noise-overlay relative w-full min-h-screen flex items-center bg-white pt-[60px] overflow-hidden">

        {/* Full-bleed decorative mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 mesh-blob-1" />
          <div className="absolute inset-0 mesh-blob-2" />
          <div className="absolute inset-0 mesh-blob-3" />
          <div
            className="absolute top-1/3 left-0 w-full h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(152,37,152,0.06), transparent)' }}
          />
          <div
            className="absolute bottom-1/4 left-0 w-full h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(21,23,61,0.04), transparent)' }}
          />
          <div
            className="absolute top-20 right-0 w-[700px] h-[700px] rounded-full opacity-[0.07]"
            style={{ background: '#982598', filter: 'blur(100px)', transform: 'translateX(40%)' }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full opacity-[0.05]"
            style={{ background: '#15173D', filter: 'blur(80px)' }}
          />
        </div>
    <section className="hr" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      background: '#fff',
      paddingTop: 64, overflow: 'hidden',
    }}>
      <style>{css}</style>

      <MagneticBlob />

      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Subtle top tint */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 50% at 50% -5%,rgba(30,14,60,.04) 0%,transparent 65%)',
        }} />
        <div className="au1" style={{
          position: 'absolute', top: '-18%', right: '-8%', width: 750, height: 680,
          borderRadius: '62% 38% 72% 28% / 52% 62% 38% 48%',
          background: 'radial-gradient(ellipse,rgba(30,14,60,.05) 0%,rgba(45,27,105,.03) 40%,transparent 68%)',
          filter: 'blur(55px)',
        }} />
        <div className="au2" style={{
          position: 'absolute', bottom: '-20%', left: '-12%', width: 680, height: 620,
          borderRadius: '42% 58% 32% 68% / 62% 38% 62% 38%',
          background: 'radial-gradient(ellipse,rgba(15,8,38,.04) 0%,rgba(30,14,60,.02) 48%,transparent 68%)',
          filter: 'blur(60px)',
        }} />
        {/* Dot grid */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: .025 }}>
          <defs><pattern id="dotg" width="36" height="36" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#1e0e3c"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#dotg)" />
        </svg>
        {['sk1','sk2','sk3','sk4','sk5'].map(c => <div key={c} className={`spk ${c}`} />)}
      </div>

        {/* Content — full width, generous edge padding, NO max-width cap */}
        <div className="relative w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-20 lg:py-28">
          <div className="grid lg:grid-cols-[1fr_auto] xl:grid-cols-[1fr_520px] gap-12 xl:gap-20 items-center">
      {/* Content */}
      <div style={{ position: 'relative', maxWidth: 1300, margin: '0 auto', padding: '96px 32px', width: '100%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>

            {/* ── Left ── */}
            <div className="max-w-[680px]">

              {/* Beta badge */}
              <div
                className="hero-fade-1 inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8 border text-xs font-bold tracking-wide uppercase"
                style={{
                  borderColor: 'rgba(152,37,152,0.2)',
                  background: 'rgba(152,37,152,0.05)',
                  color: '#982598',
                }}
              >
                <span className="relative w-2 h-2 flex-shrink-0">
                  <span className="badge-ping absolute inset-0 rounded-full bg-green-500" />
                  <span className="relative block w-2 h-2 rounded-full bg-green-500" />
                </span>
                Now in Beta · Free to Join
              </div>
          {/* ══ LEFT ══ */}
          <div>
            {/* Badge */}
            <div className="hero-badge">
              <span className="pdot">
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16a34a', display: 'block', position: 'relative', zIndex: 1 }} />
              </span>
              Now in Beta · Free to Join
            </div>

              <h1
                className="hero-fade-2 font-extrabold leading-[1.06] tracking-[-0.03em] mb-6"
                style={{
                  color: '#15173D',
                  fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
                }}
              >
                Find the{' '}
                <span className="grad-text">Right Co-Founder</span>,{' '}
                <br className="hidden sm:block" />
                Not Just Any Co-Founder
              </h1>
            {/* Headline */}
            <h1 className="fu d2" style={{
              fontSize: 'clamp(2.8rem,5vw,4rem)', fontWeight: 900,
              lineHeight: 1.06, letterSpacing: '-.03em', marginBottom: 22, color: '#0f0826',
            }}>
              Find the{' '}
              <span className="grad-text italic-serif">Right Co&#8209;Founder</span>,{' '}
              <br />
              <span style={{ color: '#7c6fa0', fontWeight: 400, fontSize: '0.87em' }}>not just any co&#8209;founder</span>
            </h1>

              <p
                className="hero-fade-3 text-gray-500 leading-relaxed mb-10"
                style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', maxWidth: '540px' }}
              >
                FounderMatch helps entrepreneurs discover compatible co-founders using a structured
                compatibility test, a 90-day collaboration sprint, and a legal partnership framework.
              </p>
            {/* Eyebrow */}
            <div className="fu d3" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
              <div style={{ height: 2, width: 28, borderRadius: 2, flexShrink: 0, background: 'linear-gradient(90deg,#1e0e3c,transparent)' }} />
              <span style={{ fontSize: 11, letterSpacing: '.14em', color: '#3b1d78', fontWeight: 700, textTransform: 'uppercase' }}>
                Startup co-founding platform
              </span>
            </div>

            {/* Subtitle */}
            <p className="fu d3" style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 30, maxWidth: 460, color: '#5a4f7a' }}>
              FounderMatch helps entrepreneurs discover compatible co-founders using a structured compatibility test, a 90-day collaboration sprint, and a legal partnership framework.
            </p>

              {/* CTAs */}
              <div className="hero-fade-4 flex flex-wrap gap-3 mb-14">
                <a
                  href="#pricing"
                  className="primary-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[14px] font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #982598 0%, #b535b5 100%)',
                    boxShadow: '0 4px 20px rgba(152,37,152,0.32), inset 0 1px 0 rgba(255,255,255,0.15)',
                  }}
                >
                  Start Free <ArrowForwardIcon sx={{ fontSize: 16 }} />
                </a>
                <a
                  href="#quiz"
                  className="secondary-btn inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[14px] font-semibold border bg-white"
                  style={{ color: '#15173D', borderColor: '#e5e7eb' }}
                >
                  <PlayCircleOutlineIcon sx={{ fontSize: 17, color: '#982598' }} />
                  Take Compatibility Test
                </a>
              </div>
            {/* Chips */}
            <div className="fu d4" style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 32 }}>
              <Chip accent>AI Matching</Chip>
              <Chip>90-Day Sprint</Chip>
              <Chip>Legal Framework</Chip>
              <Chip>Vetted Founders</Chip>
            </div>

            {/* CTAs */}
            <div className="fu d4" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 36 }}>
              <a href="#pricing" className="btn-p">
                Start Free
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </a>
              <a href="#quiz" className="btn-s">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1e0e3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
                </svg>
                Take Compatibility Test
              </a>
            </div>

            <div className="fu d5 divider" />

            {/* Stats */}
            <div className="fu d6" style={{ display: 'flex', flexWrap: 'wrap', gap: 28 }}>
              {stats.map(({ icon, value, label }) => (
                <div key={label} className="stat-item" style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <div className="stat-icon">{icon}</div>
                  <div>
                    <div className="stat-val">{value}</div>
                    <div style={{ fontSize: 11, color: '#7c6fa0', fontWeight: 500, marginTop: 2 }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

            {/* ── Right card ── */}
            <div className="hero-card-anim hidden lg:flex items-center justify-center">
              <div className="relative w-[380px] xl:w-[440px]">

                {/* Glow behind card */}
                <div
                  className="absolute inset-[-20px] rounded-3xl"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(152,37,152,0.13) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                />

                {/* Main card */}
                <div
                  className="hero-float relative bg-white rounded-2xl border border-gray-100 p-7"
                  style={{ boxShadow: '0 20px 60px rgba(21,23,61,0.12), 0 4px 16px rgba(152,37,152,0.08)' }}
                >
                  {/* Top label */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="text-[11px] font-bold tracking-widest uppercase text-gray-400">Top Match</div>
                    <div
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold"
                      style={{ background: 'rgba(152,37,152,0.08)', color: '#982598' }}
                    >
                      <VerifiedIcon sx={{ fontSize: 11 }} /> 94% Compatible
                    </div>
                  </div>
          {/* ══ RIGHT ══ */}
          <div className="fi d3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: 420 }}>

              <div className="ring-exp" /><div className="ring-exp re2" /><div className="ring-exp re3" />

              <div style={{ position: 'absolute', inset: '-52px', borderRadius: 40, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
                <ParticleCanvas />
              </div>

              {/* Soft shadow pool under card */}
              <div style={{
                position: 'absolute', inset: '-20px', zIndex: 0,
                background: 'radial-gradient(ellipse at 50% 60%,rgba(30,14,60,.08) 0%,transparent 65%)',
                filter: 'blur(32px)', borderRadius: 50, pointerEvents: 'none',
              }} />

              {/* ── Main Card ── */}
              <div className="card-wrap" style={{ position: 'relative', zIndex: 5 }}>
                <div className="card-inner">
                  <div className="card-shine" />

                  {/* Accent bar — dark gradient */}
                  <div style={{
                    position: 'absolute', top: 0, left: 28, right: 28, height: 3,
                    borderRadius: '0 0 4px 4px',
                    background: 'linear-gradient(90deg,transparent,#1e0e3c 20%,#3b1d78 70%,transparent)',
                  }} />

                  {/* Profile */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <div className="avatar-box">A<div className="avatar-shimmer" /></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 14, color: '#0f0826', marginBottom: 4 }}>Alex Chen</div>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#e2d9f3', background: '#1e0e3c', border: '1px solid #3b1d78', padding: '2px 8px', borderRadius: 5 }}>CTO</span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#5a4f7a', background: '#f8f6ff', border: '1px solid #d4cce8', padding: '2px 8px', borderRadius: 5 }}>Fintech · Mumbai</span>
                      </div>
                    </div>
                    <div className="score-badge">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="#e2d9f3" stroke="none">
                        <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                      </svg>
                      94%
                    </div>
                  </div>

                  <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#e8e4f0,transparent)', marginBottom: 16 }} />

                  {/* Skill tags */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>
                    {['React', 'Node.js', 'AWS', 'Product Strategy'].map(s => (
                      <span key={s} style={{ fontSize: 10.5, fontWeight: 600, color: '#5a4f7a', background: '#f8f6ff', border: '1px solid #d4cce8', padding: '3px 8px', borderRadius: 5 }}>{s}</span>
                    ))}
                  </div>

                  {/* Profile */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #982598, #15173D)' }}
                    >
                      A
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-[15px] truncate" style={{ color: '#15173D' }}>Alex Chen</div>
                      <div className="text-[12px] text-gray-400 font-medium">CTO · Fintech · Mumbai</div>
                    </div>
                  </div>

                  {/* Compatibility bars */}
                  <div className="space-y-3.5 mb-6">
                    {bars.map(({ label, pct, delay }) => (
                      <div key={label}>
                        <div className="flex justify-between text-[12px] mb-1.5">
                          <span className="text-gray-500 font-medium">{label}</span>
                          <span className="font-bold" style={{ color: '#982598' }}>{pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(152,37,152,0.08)' }}>
                          <div
                            className="progress-bar h-full rounded-full"
                            style={{
                              width: `${pct}%`,
                              background: 'linear-gradient(90deg, #982598, #c040c0)',
                              animationDelay: delay,
                              animationDuration: '1.2s',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="connect-btn w-full py-3 rounded-xl text-[13.5px] font-bold text-white"
                    style={{ background: '#982598', boxShadow: '0 2px 12px rgba(152,37,152,0.25)' }}
                  >
                    Connect with Alex →
                  </button>
                </div>
                  {/* Progress bars */}
                  {[
                    { label: 'Vision Alignment', pct: 96, cls: 'bf1', d: '1.1s, 2s' },
                    { label: 'Work Style',        pct: 88, cls: 'bf2', d: '1.35s, 2.25s' },
                    { label: 'Risk Tolerance',    pct: 92, cls: 'bf3', d: '1.6s, 2.5s' },
                  ].map(({ label, pct, cls, d }) => (
                    <div key={label} style={{ marginBottom: 14 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 7 }}>
                        <span style={{ color: '#5a4f7a', fontWeight: 500 }}>{label}</span>
                        <span style={{ color: '#1e0e3c', fontWeight: 800 }}>{pct}%</span>
                      </div>
                      <div className="bar-track">
                        <div className={`bar-fill ${cls}`} style={{
                          height: '100%', borderRadius: 99, width: `${pct}%`,
                          background: 'linear-gradient(90deg,#0f0826,#1e0e3c,#2d1b69,#4c1d95)',
                          boxShadow: '0 0 7px rgba(30,14,60,.25)',
                          animationName: 'barFill, progressPulse',
                          animationDuration: '1s, 2.5s',
                          animationTimingFunction: 'cubic-bezier(.22,1,.36,1), ease-in-out',
                          animationFillMode: 'both, none',
                          animationDelay: d,
                          animationIterationCount: '1, infinite',
                        }} />
                      </div>
                    </div>
                  ))}

                  <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#e8e4f0,transparent)', margin: '16px 0' }} />

                  {/* Activity feed */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#c4b8e8', marginBottom: 10 }}>Recent Activity</div>
                    {[
                      { avatar: 'P', name: 'Priya Sharma', role: 'CEO · SaaS', loc: 'Bangalore', delay: 1.3, gi: 0 },
                      { avatar: 'M', name: 'Marcus Wei',   role: 'CPO · HealthTech', loc: 'Singapore', delay: 1.5, gi: 1 },
                    ].map(item => <FeedItem key={item.name} {...item} />)}
                  </div>

                  <button className="conn-btn">Connect with Alex →</button>
                </div>
              </div>

                {/* Floating pill — top left */}
                <div
                  className="hero-float-delay absolute -top-5 -left-8 bg-white rounded-xl border border-gray-100 px-3.5 py-2.5"
                  style={{ boxShadow: '0 8px 32px rgba(21,23,61,0.10)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[18px]">🎯</span>
                    <div>
                      <div className="text-[12px] font-bold" style={{ color: '#15173D' }}>Compatible Match</div>
                      <div className="text-[11px] text-gray-400">Sprint started</div>
                    </div>
                  </div>
                </div>
              {/* Pill A */}
              <div className="pill-a">
                <div className="pill-box">
                  <div className="pill-icon">🎯</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#0f0826' }}>Compatible Match</div>
                    <div style={{ fontSize: 11, color: '#7c6fa0', marginTop: 1 }}>Sprint started</div>
                  </div>
                </div>
              </div>

                {/* Floating pill — bottom right */}
                <div
                  className="hero-float absolute -bottom-5 -right-8 bg-white rounded-xl border border-gray-100 px-3.5 py-2.5"
                  style={{ boxShadow: '0 8px 32px rgba(21,23,61,0.10)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[18px]">⚖️</span>
                    <div>
                      <div className="text-[12px] font-bold" style={{ color: '#15173D' }}>Partnership Formed</div>
                      <div className="text-[11px] text-gray-400">Docs signed</div>
                    </div>
                  </div>
                </div>

                {/* Small badge — mid right */}
                <div
                  className="hero-float absolute top-1/2 -right-10 -translate-y-1/2 bg-white rounded-xl border border-gray-100 px-3 py-2"
                  style={{ boxShadow: '0 4px 16px rgba(21,23,61,0.08)', animationDelay: '2s' }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-[14px]">✨</span>
                    <div className="text-[11px] font-bold" style={{ color: '#982598' }}>94% match</div>
              {/* Pill B */}
              <div className="pill-b">
                <div className="pill-box">
                  <div className="pill-icon">⚖️</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#0f0826' }}>Partnership Formed</div>
                    <div style={{ fontSize: 11, color: '#7c6fa0', marginTop: 1 }}>Docs signed</div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Full-width bottom decorative band */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(152,37,152,0.12) 30%, rgba(152,37,152,0.12) 70%, transparent 100%)' }}
        />
      </section>
    </>
  )
}

export default Hero
