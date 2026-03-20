import { useEffect, useRef, useState } from 'react'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { useScrollReveal } from '../hooks/useScrollReveal'

const problems = [
  { emoji: '🎯', title: 'Misaligned Vision',    desc: 'Founders disagree on direction and long-term goals within months of starting.' },
  { emoji: '⚡', title: 'Work Style Conflicts', desc: 'Different work rhythms and communication styles create daily friction.' },
  { emoji: '🔥', title: 'Commitment Gaps',      desc: 'Unequal effort and dedication breeds resentment and eventual collapse.' },
  { emoji: '🎲', title: 'Risk Mismatch',        desc: 'One founder plays it safe while the other wants to bet the company.' },
  { emoji: '👑', title: 'Leadership Clashes',   desc: 'Power struggles over decisions stall execution at the worst moments.' },
]

const stats = [
  { value: 65, suffix: '%', label: 'of startups fail due to co-founder conflict' },
  { value: 23, suffix: '%', label: 'chose partners without any structured vetting' },
  { value: 3,  suffix: '×', label: 'more likely to succeed with a compatible match' },
]

function useCountUp(target, duration = 1400, trigger = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start = null
    const step = ts => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(ease * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [trigger, target, duration])
  return val
}

function StatCard({ value, suffix, label, triggered, delay }) {
  const n = useCountUp(value, 1300, triggered)
  return (
    <div className="prob-stat-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="prob-stat-glow" />
      <div className="prob-stat-value">{n}{suffix}</div>
      <div className="prob-stat-label">{label}</div>
    </div>
  )
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

  .prob-root * { font-family: 'Cabinet Grotesk', sans-serif; box-sizing: border-box; }

  @keyframes prob-fadeUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes prob-shimmer   { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes prob-gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  @keyframes prob-borderRun { 0%{background-position:0%} 100%{background-position:300%} }
  @keyframes prob-cardIn    { from{opacity:0;transform:translateY(22px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes prob-statIn    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes prob-glowBreath{ 0%,100%{opacity:.2} 50%{opacity:.45} }
  @keyframes prob-badgePop  { 0%,100%{transform:scale(1)} 50%{transform:scale(1.03)} }
  @keyframes prob-scanLine  { 0%{top:-10%} 100%{top:110%} }
  @keyframes prob-grain {
    0%,100%{transform:translate(0,0)} 20%{transform:translate(-2%,-2%)}
    40%{transform:translate(2%,1%)}   60%{transform:translate(-1%,3%)}
    80%{transform:translate(3%,-1%)}
  }

  .prob-reveal { opacity:0; }
  .prob-reveal.vis { animation:prob-fadeUp .7s cubic-bezier(.22,1,.36,1) both; }
  .prob-stagger .prob-stat-card { opacity:0; }
  .prob-stagger.vis .prob-stat-card { animation:prob-statIn .65s cubic-bezier(.22,1,.36,1) both; }
  .prob-cards-grid .prob-pcard { opacity:0; }
  .prob-cards-grid.vis .prob-pcard { animation:prob-cardIn .6s cubic-bezier(.22,1,.36,1) both; }
  .prob-cards-grid.vis .prob-pcard:nth-child(1){animation-delay:.05s}
  .prob-cards-grid.vis .prob-pcard:nth-child(2){animation-delay:.13s}
  .prob-cards-grid.vis .prob-pcard:nth-child(3){animation-delay:.21s}
  .prob-cards-grid.vis .prob-pcard:nth-child(4){animation-delay:.29s}
  .prob-cards-grid.vis .prob-pcard:nth-child(5){animation-delay:.37s}

  /* Badge */
  .prob-badge {
    display:inline-flex; align-items:center; gap:6px;
    padding:5px 14px; border-radius:999px; margin-bottom:20px;
    background:#f0edf8; color:#1e0e3c;
    font-size:12px; font-weight:700; letter-spacing:.04em;
    position:relative; overflow:hidden;
    animation:prob-badgePop 3s ease-in-out infinite;
    border:1px solid #c4b8e8;
  }
  .prob-badge::before {
    content:''; position:absolute; inset:-1px; border-radius:999px; padding:1px;
    background:linear-gradient(90deg,rgba(30,14,60,.3),rgba(76,29,149,.7),rgba(30,14,60,.3));
    background-size:300% 100%;
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude;
    animation:prob-borderRun 3s linear infinite; pointer-events:none;
  }

  /* Stat cards */
  .prob-stat-card {
    position:relative; text-align:center; padding:36px 24px; border-radius:22px;
    background:#fff;
    border:1px solid #d4cce8;
    overflow:hidden;
    box-shadow:0 2px 0 #f0edf8, 0 8px 28px rgba(30,14,60,.07);
    transition:transform .25s cubic-bezier(.22,1,.36,1), box-shadow .25s, border-color .25s;
  }
  .prob-stat-card:hover {
    transform:translateY(-4px) scale(1.02);
    box-shadow:0 2px 0 #e8e4f0, 0 20px 48px rgba(30,14,60,.12), 0 4px 16px rgba(0,0,0,.05);
    border-color:#3b1d78;
  }
  .prob-stat-glow {
    position:absolute; inset:-20px;
    background:radial-gradient(circle at 50% 80%,rgba(30,14,60,.08) 0%,transparent 65%);
    pointer-events:none; animation:prob-glowBreath 4s ease-in-out infinite;
  }
  .prob-stat-value {
    font-family:'Cabinet Grotesk',sans-serif; font-size:3rem; font-weight:900; line-height:1;
    margin-bottom:10px; position:relative;
    background:linear-gradient(135deg,#0f0826,#1e0e3c,#3b1d78,#1e0e3c,#0f0826);
    background-size:300% 300%; -webkit-background-clip:text;
    -webkit-text-fill-color:transparent; background-clip:text;
    animation:prob-gradShift 5s ease infinite;
  }
  .prob-stat-label { font-size:13px; color:#5a4f7a; line-height:1.55; position:relative; font-weight:500; }
  .prob-stat-card::after {
    content:''; position:absolute; top:0; left:0; right:0; height:3px; border-radius:3px 3px 0 0;
    background:linear-gradient(90deg,transparent,#1e0e3c 30%,#3b1d78 70%,transparent);
    background-size:200% 100%; animation:prob-shimmer 2.5s linear infinite;
  }

  /* Problem cards */
  .prob-pcard {
    position:relative; background:#fff; border:1px solid #e8e4f0;
    border-radius:20px; padding:22px; overflow:hidden;
    transition:transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s, border-color .28s;
    cursor:default;
    box-shadow:0 2px 8px rgba(30,14,60,.04);
  }
  .prob-pcard::before {
    content:''; position:absolute; inset:-1px; border-radius:inherit; padding:1px;
    background:linear-gradient(135deg,rgba(30,14,60,0),rgba(30,14,60,0));
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude;
    transition:background .3s; pointer-events:none;
  }
  .prob-pcard:hover::before {
    background:linear-gradient(135deg,rgba(30,14,60,.3),rgba(59,29,120,.5),rgba(30,14,60,.12));
  }
  .prob-pcard:hover {
    transform:translateY(-5px) scale(1.02);
    box-shadow:0 18px 44px rgba(30,14,60,.12), 0 4px 14px rgba(0,0,0,.05);
    border-color:transparent;
  }
  .prob-pcard-glow {
    position:absolute; inset:0; pointer-events:none; opacity:0;
    background:radial-gradient(circle at 50% 100%,rgba(30,14,60,.05) 0%,transparent 70%);
    transition:opacity .3s;
  }
  .prob-pcard:hover .prob-pcard-glow { opacity:1; }

  .prob-emoji-wrap {
    width:42px; height:42px; border-radius:12px; display:flex; align-items:center; justify-content:center;
    font-size:20px; margin-bottom:14px;
    background:#f0edf8; border:1px solid #c4b8e8;
    transition:transform .28s cubic-bezier(.34,1.56,.64,1), background .2s;
  }
  .prob-pcard:hover .prob-emoji-wrap { transform:rotate(-8deg) scale(1.18); background:#e8e2f5; }

  .prob-cancel-icon {
    position:absolute; top:14px; right:14px;
    opacity:0; transform:scale(.6) rotate(-20deg);
    transition:opacity .25s, transform .25s cubic-bezier(.34,1.56,.64,1);
  }
  .prob-pcard:hover .prob-cancel-icon { opacity:1; transform:scale(1) rotate(0deg); }

  .prob-scanline {
    position:absolute; left:0; right:0; height:2px; pointer-events:none; z-index:0;
    background:linear-gradient(90deg,transparent,rgba(30,14,60,.05),transparent);
    animation:prob-scanLine 8s linear infinite;
  }
  .prob-grain {
    position:absolute; inset:-50%; width:200%; height:200%; pointer-events:none; z-index:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity:.018; animation:prob-grain 9s steps(10) infinite;
  }

  .prob-footer-link {
    color:#1e0e3c; font-weight:700; text-decoration:none; position:relative; transition:color .2s;
  }
  .prob-footer-link::after {
    content:''; position:absolute; bottom:-2px; left:0; right:0; height:1.5px;
    background:linear-gradient(90deg,#1e0e3c,#3b1d78);
    transform:scaleX(0); transform-origin:left;
    transition:transform .25s cubic-bezier(.22,1,.36,1);
  }
  .prob-footer-link:hover { color:#3b1d78; }
  .prob-footer-link:hover::after { transform:scaleX(1); }
`

export default function Problem() {
  const header   = useScrollReveal()
  const statsRow = useScrollReveal()
  const cards    = useScrollReveal()

  return (
    <section className="prob-root" style={{ position:'relative', padding:'96px 0', background:'#fff', overflow:'hidden' }}>
      <style>{css}</style>
      <div className="prob-grain" />
      <div className="prob-scanline" />

      {/* Aurora blobs — dark tones */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
        <div style={{
          position:'absolute', top:'-10%', right:'-5%', width:500, height:440,
          borderRadius:'62% 38% 55% 45%/48% 60% 40% 52%',
          background:'radial-gradient(ellipse,rgba(30,14,60,.06) 0%,transparent 65%)',
          filter:'blur(50px)',
        }} />
        <div style={{
          position:'absolute', bottom:'-15%', left:'-8%', width:420, height:380,
          borderRadius:'42% 58% 68% 32%/55% 45% 55% 45%',
          background:'radial-gradient(ellipse,rgba(15,8,38,.05) 0%,transparent 65%)',
          filter:'blur(56px)',
        }} />
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.02 }}>
          <defs>
            <pattern id="diag-p" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="20" stroke="#1e0e3c" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diag-p)" />
        </svg>
      </div>

      <div style={{ position:'relative', maxWidth:1280, margin:'0 auto', padding:'0 28px', zIndex:1 }}>

        {/* Header */}
        <div ref={header.ref} className={`prob-reveal ${header.visible ? 'vis' : ''}`}
          style={{ textAlign:'center', marginBottom:56 }}>
          <div className="prob-badge">
            <ReportProblemOutlinedIcon sx={{ fontSize:13 }} />
            The Hard Truth
          </div>
          <h2 style={{ fontFamily:'Cabinet Grotesk,sans-serif', fontSize:'clamp(2rem,4.5vw,3.2rem)', fontWeight:900, lineHeight:1.1, marginBottom:16, color:'#0f0826', letterSpacing:'-.02em' }}>
            Why Most Founder Partnerships Fail
          </h2>
          <p style={{ fontSize:'1.05rem', color:'#5a4f7a', maxWidth:560, margin:'0 auto', lineHeight:1.75 }}>
            Founders often choose partners based on convenience, not compatibility — leading to conflict, collapse, and wasted years.
          </p>
        </div>

        {/* Stats */}
        <div ref={statsRow.ref}
          className={`prob-stagger ${statsRow.visible ? 'vis' : ''}`}
          style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18, marginBottom:48 }}>
          {stats.map(({ value, suffix, label }, i) => (
            <StatCard key={label} value={value} suffix={suffix} label={label}
              triggered={statsRow.visible} delay={i * 120} />
          ))}
        </div>

        {/* Problem cards */}
        <div ref={cards.ref}
          className={`prob-cards-grid ${cards.visible ? 'vis' : ''}`}
          style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:14 }}>
          {problems.map(({ emoji, title, desc }) => (
            <div key={title} className="prob-pcard">
              <div className="prob-pcard-glow" />
              <div className="prob-cancel-icon">
                <CancelOutlinedIcon sx={{ fontSize:15, color:'#3b1d78' }} />
              </div>
              <div className="prob-emoji-wrap">{emoji}</div>
              <div style={{ fontFamily:'Cabinet Grotesk,sans-serif', fontWeight:800, fontSize:13, marginBottom:8, color:'#0f0826' }}>{title}</div>
              <div style={{ fontSize:12, color:'#7c6fa0', lineHeight:1.65 }}>{desc}</div>
            </div>
          ))}
        </div>

        <p style={{ textAlign:'center', marginTop:40, color:'#7c6fa0', fontSize:13 }}>
          FounderMatch was built to fix this —{' '}
          <a href="#how-it-works" className="prob-footer-link">see how →</a>
        </p>
      </div>
    </section>
  )
}