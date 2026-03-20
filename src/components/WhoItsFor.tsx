import { useScrollReveal } from '../hooks/useScrollReveal'

const segments = [
  { emoji: '🚀', title: 'Validation-Stage Founders', tag: 'Most Common', highlight: true,
    desc: 'Building an MVP but need a technical or business co-founder to move fast and fill critical skill gaps.' },
  { emoji: '🎓', title: 'Student Innovators', tag: 'Universities',
    desc: 'University students with bold startup ideas looking for complementary co-founders from other disciplines.' },
  { emoji: '💼', title: 'Career Switchers', tag: 'Corporate → Startup',
    desc: 'Experienced professionals moving into startups who need a co-founder with domain expertise.' },
  { emoji: '🧩', title: 'Solo Founders', tag: 'Ready to Scale',
    desc: "Founders who've been building alone and are ready to bring on a complementary partner." },
]

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

  .wif-root * { font-family:'Cabinet Grotesk',sans-serif; box-sizing:border-box; }

  @keyframes wif-fadeUp    { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
  @keyframes wif-rowIn     { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
  @keyframes wif-gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  @keyframes wif-borderRun { 0%{background-position:0%} 100%{background-position:300%} }
  @keyframes wif-badgePop  { 0%,100%{transform:scale(1)} 50%{transform:scale(1.03)} }
  @keyframes wif-grain {
    0%,100%{transform:translate(0,0)} 20%{transform:translate(-2%,-2%)}
    40%{transform:translate(2%,1%)}   60%{transform:translate(-1%,3%)}
    80%{transform:translate(3%,-1%)}
  }

  .wif-reveal { opacity:0; }
  .wif-reveal.vis { animation:wif-fadeUp .8s cubic-bezier(.22,1,.36,1) both; }

  /* Badge */
  .wif-section-badge {
    display:inline-flex; align-items:center;
    padding:5px 16px; border-radius:999px; margin-bottom:20px;
    background:#f0edf8; color:#1e0e3c;
    font-size:12px; font-weight:700; letter-spacing:.05em; text-transform:uppercase;
    border:1px solid #c4b8e8; position:relative; overflow:hidden;
    animation:wif-badgePop 3s ease-in-out infinite;
  }
  .wif-section-badge::before {
    content:''; position:absolute; inset:-1px; border-radius:999px; padding:1px;
    background:linear-gradient(90deg,rgba(30,14,60,.25),rgba(59,29,120,.65),rgba(30,14,60,.25));
    background-size:300% 100%;
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude;
    animation:wif-borderRun 3s linear infinite; pointer-events:none;
  }

  /* Gradient headline */
  .wif-grad {
    background:linear-gradient(125deg,#0f0826 0%,#1e0e3c 28%,#3b1d78 55%,#1e0e3c 80%,#0f0826 100%);
    background-size:300% 300%;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    animation:wif-gradShift 5s ease infinite;
  }

  /* Rows */
  .wif-rows .wif-row { opacity:0; }
  .wif-rows.vis .wif-row { animation:wif-rowIn .65s cubic-bezier(.22,1,.36,1) both; }
  .wif-rows.vis .wif-row:nth-child(1){animation-delay:.06s}
  .wif-rows.vis .wif-row:nth-child(2){animation-delay:.16s}
  .wif-rows.vis .wif-row:nth-child(3){animation-delay:.26s}
  .wif-rows.vis .wif-row:nth-child(4){animation-delay:.36s}

  .wif-row {
    display:grid;
    grid-template-columns:56px 1fr auto;
    align-items:center;
    gap:0;
    padding:28px 0;
    border-bottom:1px solid #f0edf8;
    position:relative;
    cursor:default;
  }
  .wif-row:first-child { border-top:1px solid #f0edf8; }

  /* Hover fill sweep */
  .wif-row::before {
    content:''; position:absolute; inset:0;
    background:linear-gradient(90deg,#f4f0fb 0%,rgba(244,240,251,.3) 50%,transparent 100%);
    opacity:0; transition:opacity .3s; pointer-events:none;
  }
  .wif-row:hover::before { opacity:1; }

  /* Left accent bar */
  .wif-row::after {
    content:''; position:absolute; left:0; top:20%; bottom:20%; width:3px;
    border-radius:0 2px 2px 0;
    background:linear-gradient(180deg,transparent,#3b1d78,transparent);
    transform:scaleY(0); transform-origin:center;
    transition:transform .35s cubic-bezier(.22,1,.36,1);
  }
  .wif-row:hover::after { transform:scaleY(1); }

  /* Highlight row */
  .wif-row-highlight {
    background:linear-gradient(95deg,rgba(244,240,251,.6),transparent);
  }
  .wif-row-highlight::after {
    background:linear-gradient(180deg,transparent,#1e0e3c,transparent) !important;
  }

  /* Emoji */
  .wif-emoji-wrap {
    width:48px; height:48px; border-radius:14px;
    display:flex; align-items:center; justify-content:center;
    background:#f0edf8; border:1px solid #e8e4f0;
    font-size:1.5rem; flex-shrink:0;
    transition:transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s;
    position:relative; z-index:1;
  }
  .wif-row:hover .wif-emoji-wrap {
    transform:scale(1.15) rotate(-8deg);
    box-shadow:0 8px 24px rgba(30,14,60,.14);
  }
  .wif-row-highlight .wif-emoji-wrap { background:#ede8f8; border-color:#c4b8e8; }

  /* Body */
  .wif-row-body { padding-left:28px; position:relative; z-index:1; }
  .wif-row-title {
    font-size:1.15rem; font-weight:800; color:#0f0826;
    margin:0 0 5px; line-height:1.2; transition:color .25s;
  }
  .wif-row:hover .wif-row-title { color:#1e0e3c; }
  .wif-row-desc { font-size:13px; color:#7c6fa0; line-height:1.7; margin:0; max-width:540px; }

  /* Tag */
  .wif-tag-wrap { position:relative; z-index:1; padding-left:32px; }
  .wif-tag {
    display:inline-block; padding:5px 14px; border-radius:999px;
    font-size:11px; font-weight:800; letter-spacing:.05em; white-space:nowrap;
    background:#f0edf8; color:#1e0e3c; border:1px solid #c4b8e8;
    transition:background .25s, transform .25s;
  }
  .wif-row:hover .wif-tag { background:#e8e2f5; transform:scale(1.04); }
  .wif-tag-hot {
    background:linear-gradient(135deg,#1e0e3c,#3b1d78);
    color:#e2d9f3; border:1px solid rgba(59,29,120,.3);
  }
  .wif-row:hover .wif-tag-hot { transform:scale(1.04); }

  /* Grain */
  .wif-grain {
    position:absolute; inset:-50%; width:200%; height:200%; pointer-events:none; z-index:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity:.016; animation:wif-grain 9s steps(10) infinite;
  }
`

export default function WhoItsFor() {
  const header = useScrollReveal()
  const rows   = useScrollReveal()

  return (
    <section className="wif-root" style={{
      padding:'112px 0', background:'#fff',
      position:'relative', overflow:'hidden',
    }}>
      <style>{css}</style>
      <div className="wif-grain" />

      <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
        <div style={{
          position:'absolute', top:'-12%', right:'-6%', width:520, height:480,
          borderRadius:'55% 45% 60% 40%',
          background:'radial-gradient(ellipse,rgba(30,14,60,.05) 0%,transparent 65%)',
          filter:'blur(56px)',
        }} />
        <div style={{
          position:'absolute', bottom:'-12%', left:'-8%', width:460, height:420,
          borderRadius:'42% 58% 48% 52%',
          background:'radial-gradient(ellipse,rgba(15,8,38,.04) 0%,transparent 65%)',
          filter:'blur(60px)',
        }} />
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.018 }}>
          <defs>
            <pattern id="dotg-wif" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r=".9" fill="#1e0e3c"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotg-wif)" />
        </svg>
      </div>

      <div style={{ maxWidth:960, margin:'0 auto', padding:'0 32px', position:'relative', zIndex:1 }}>

        {/* Header */}
        <div ref={header.ref} className={`wif-reveal ${header.visible ? 'vis' : ''}`}
          style={{ textAlign:'center', marginBottom:64 }}>
          <div className="wif-section-badge">Who It's For</div>

          <h2 style={{
            fontSize:'clamp(2.2rem,5vw,3.6rem)', fontWeight:900, lineHeight:1.07,
            marginBottom:18, color:'#0f0826', letterSpacing:'-.03em',
          }}>
            Built for{' '}
            <span className="wif-grad">Startup Builders</span>
          </h2>

          <p style={{ fontSize:'1.05rem', color:'#5a4f7a', maxWidth:480, margin:'0 auto 28px', lineHeight:1.75 }}>
            Whether you're pre-idea or post-MVP, FounderMatch connects you with the right person to build with.
          </p>

          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            <div style={{ width:48, height:1, background:'linear-gradient(90deg,transparent,#c4b8e8)' }} />
            <div style={{ width:5, height:5, borderRadius:'50%', background:'#c4b8e8' }} />
            <div style={{ width:7, height:7, borderRadius:'50%', background:'#3b1d78' }} />
            <div style={{ width:5, height:5, borderRadius:'50%', background:'#c4b8e8' }} />
            <div style={{ width:48, height:1, background:'linear-gradient(90deg,#c4b8e8,transparent)' }} />
          </div>
        </div>

        {/* Rows */}
        <div ref={rows.ref} className={`wif-rows ${rows.visible ? 'vis' : ''}`}
          style={{ display:'flex', flexDirection:'column' }}>
          {segments.map(({ emoji, title, desc, tag, highlight }) => (
            <div key={title} className={`wif-row ${highlight ? 'wif-row-highlight' : ''}`}>
              <div className="wif-emoji-wrap">{emoji}</div>

              <div className="wif-row-body">
                <h3 className="wif-row-title">{title}</h3>
                <p className="wif-row-desc">{desc}</p>
              </div>

              <div className="wif-tag-wrap">
                <span className={`wif-tag ${highlight ? 'wif-tag-hot' : ''}`}>
                  {highlight ? '⭐ ' : ''}{tag}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}