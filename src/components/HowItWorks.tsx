import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined'
import GavelIcon from '@mui/icons-material/Gavel'
import { useScrollReveal } from '../hooks/useScrollReveal'

const steps = [
  {
    step: '01', Icon: AssignmentOutlinedIcon, title: 'Compatibility Test',
    desc: 'Answer 15 structured questions that reveal how you think, work, and lead as a founder.',
    items: ['Values & ethics', 'Work style & hours', 'Startup goals', 'Risk tolerance', 'Leadership style'],
    accent: '#1e0e3c',
  },
  {
    step: '02', Icon: PeopleOutlineIcon, title: 'Founder Match',
    desc: 'Our algorithm surfaces the most compatible founders from our growing network.',
    items: ['Browse curated profiles', 'See compatibility scores', 'Start conversations', 'Schedule intro calls'],
    accent: '#2d1b69',
  },
  {
    step: '03', Icon: RocketLaunchOutlinedIcon, title: '90-Day Sprint',
    desc: 'Build together before committing. Validate the working relationship with real milestones.',
    items: ['Validate startup idea', 'Work on milestones', 'Track tasks together', 'Test working compatibility'],
    accent: '#3b1d78',
  },
  {
    step: '04', Icon: GavelIcon, title: 'Legal Partnership',
    desc: 'Formalize your partnership with ready-to-use legal templates from startup lawyers.',
    items: ['Founder agreement', 'Equity split framework', 'NDA templates', 'Legal documentation'],
    accent: '#0f0826',
  },
]

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

  .hiw-root * { font-family:'Cabinet Grotesk',sans-serif; box-sizing:border-box; }

  @keyframes hiw-fadeUp    { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes hiw-cardIn    { from{opacity:0;transform:translateY(28px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes hiw-badgePop  { 0%,100%{transform:scale(1)} 50%{transform:scale(1.03)} }
  @keyframes hiw-borderRun { 0%{background-position:0%} 100%{background-position:300%} }
  @keyframes hiw-stepFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
  @keyframes hiw-dotPulse  { 0%,100%{box-shadow:0 0 0 0 rgba(30,14,60,.4)} 50%{box-shadow:0 0 0 5px rgba(30,14,60,0)} }
  @keyframes hiw-lineDraw  { from{stroke-dashoffset:300} to{stroke-dashoffset:0} }
  @keyframes hiw-grain {
    0%,100%{transform:translate(0,0)} 20%{transform:translate(-2%,-2%)}
    40%{transform:translate(2%,1%)}   60%{transform:translate(-1%,3%)}
    80%{transform:translate(3%,-1%)}
  }
  @keyframes hiw-iconSpin  { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes hiw-glowPulse { 0%,100%{opacity:.5} 50%{opacity:1} }

  .hiw-reveal { opacity:0; }
  .hiw-reveal.vis { animation:hiw-fadeUp .8s cubic-bezier(.22,1,.36,1) both; }
  .hiw-grid .hiw-card-wrap { opacity:0; }
  .hiw-grid.vis .hiw-card-wrap { animation:hiw-cardIn .7s cubic-bezier(.22,1,.36,1) both; }
  .hiw-grid.vis .hiw-card-wrap:nth-child(1){animation-delay:.05s}
  .hiw-grid.vis .hiw-card-wrap:nth-child(2){animation-delay:.18s}
  .hiw-grid.vis .hiw-card-wrap:nth-child(3){animation-delay:.31s}
  .hiw-grid.vis .hiw-card-wrap:nth-child(4){animation-delay:.44s}

  /* Badge */
  .hiw-badge {
    display:inline-flex; align-items:center; gap:6px;
    padding:5px 16px; border-radius:999px; margin-bottom:20px;
    background:#f0edf8; color:#1e0e3c;
    font-size:12px; font-weight:700; letter-spacing:.04em;
    position:relative; overflow:hidden;
    animation:hiw-badgePop 3s ease-in-out infinite;
    border:1px solid #c4b8e8;
  }
  .hiw-badge::before {
    content:''; position:absolute; inset:-1px; border-radius:999px; padding:1px;
    background:linear-gradient(90deg,rgba(30,14,60,.25),rgba(59,29,120,.65),rgba(30,14,60,.25));
    background-size:300% 100%;
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude;
    animation:hiw-borderRun 3s linear infinite; pointer-events:none;
  }

  /* Card Wrapper: contains the step number outside */
  .hiw-card-wrap { position:relative; }



  /* Card */
  .hiw-card {
    position:relative;
    background:#fff;
    border-radius:28px;
    padding:32px 26px 28px;
    border:1px solid #e8e4f0;
    overflow:hidden;
    box-shadow:
      0 2px 4px rgba(30,14,60,.03),
      0 8px 32px rgba(30,14,60,.05),
      inset 0 1px 0 rgba(255,255,255,.9);
    transition:transform .32s cubic-bezier(.22,1,.36,1), box-shadow .32s, border-color .32s;
    z-index:1;
  }

  /* Noise texture inside card */
  .hiw-card-noise {
    position:absolute; inset:-50%; width:200%; height:200%; pointer-events:none; z-index:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity:.022; animation:hiw-grain 12s steps(10) infinite;
  }

  /* Soft tinted top-left blob inside each card */
  .hiw-card-blob {
    position:absolute; top:-40px; right:-30px; width:130px; height:130px;
    border-radius:50%; pointer-events:none; z-index:0;
    background:radial-gradient(ellipse, rgba(30,14,60,.06) 0%, transparent 70%);
    transition:transform .4s cubic-bezier(.22,1,.36,1), opacity .4s;
  }
  .hiw-card:hover .hiw-card-blob { transform:scale(1.5); opacity:1.4; }

  /* Gradient top border line */
  .hiw-card-ruler {
    position:absolute; top:0; left:0; right:0; height:3px;
    background:linear-gradient(90deg, transparent 0%, var(--accent-color) 40%, transparent 100%);
    opacity:0; transform:scaleX(.6); transform-origin:left;
    transition:opacity .35s, transform .45s cubic-bezier(.22,1,.36,1);
  }
  .hiw-card:hover .hiw-card-ruler { opacity:1; transform:scaleX(1); }

  .hiw-card:hover {
    transform:translateY(-8px) scale(1.012);
    box-shadow:
      0 30px 60px rgba(30,14,60,.12),
      0 8px 20px rgba(0,0,0,.05),
      inset 0 1px 0 rgba(255,255,255,.9);
    border-color:rgba(196,184,232,.5);
  }

  /* Icon ring */
  .hiw-icon-ring {
    position:relative;
    width:52px; height:52px; flex-shrink:0;
  }
  .hiw-icon-ring svg.hiw-ring-svg {
    position:absolute; inset:0; width:100%; height:100%;
    transition:opacity .3s;
  }
  .hiw-card:hover .hiw-ring-svg { opacity:1 !important; }
  .hiw-icon-inner {
    position:absolute; inset:6px;
    border-radius:12px;
    display:flex; align-items:center; justify-content:center;
    background:#f0edf8;
    border:1px solid #c4b8e8;
    transition:transform .32s cubic-bezier(.34,1.56,.64,1), box-shadow .3s;
  }
  .hiw-card:hover .hiw-icon-inner {
    transform:rotate(-10deg) scale(1.12);
    box-shadow:0 8px 20px rgba(30,14,60,.18);
  }

  /* Title with decorative slash */
  .hiw-title-row {
    display:flex; align-items:center; gap:8px; margin-bottom:8px;
  }
  .hiw-title-slash {
    width:3px; height:16px; border-radius:2px; flex-shrink:0;
    background:var(--accent-color,#1e0e3c);
    opacity:.5;
    transition:height .3s, opacity .3s;
  }
  .hiw-card:hover .hiw-title-slash { height:20px; opacity:1; }

  /* Items list */
  .hiw-item {
    display:flex; align-items:center; gap:10px;
    font-size:12px; color:#5a4f7a;
    padding:6px 10px; border-radius:8px;
    transition:background .22s, transform .22s;
  }
  .hiw-item:hover { background:#f4f0fb; transform:translateX(3px); }

  .hiw-dot {
    width:6px; height:6px; border-radius:50%; flex-shrink:0;
    transition:transform .2s;
  }
  .hiw-item:hover .hiw-dot {
    transform:scale(1.6);
    animation:hiw-dotPulse .6s ease both;
  }

  /* Connector between cards */
  .hiw-connector {
    position:absolute;
    top:50px; right:-19px;
    z-index:10;
    display:flex; align-items:center;
  }
  .hiw-connector-line {
    width:38px; height:1px;
    background:linear-gradient(90deg, #c4b8e8, transparent);
  }
  .hiw-connector-arrow {
    width:0; height:0;
    border-top:4px solid transparent;
    border-bottom:4px solid transparent;
    border-left:6px solid #c4b8e8;
  }

  /* Global grain overlay */
  .hiw-grain {
    position:absolute; inset:-50%; width:200%; height:200%; pointer-events:none; z-index:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity:.015; animation:hiw-grain 9s steps(10) infinite;
  }

  /* Decorative step count bar at bottom of card */
  .hiw-progress-bar {
    margin-top:22px;
    height:3px; border-radius:99px;
    background:#f0edf8;
    position:relative; overflow:hidden;
  }
  .hiw-progress-fill {
    position:absolute; top:0; left:0; height:100%; border-radius:99px;
    background:linear-gradient(90deg, var(--accent-color), rgba(30,14,60,.3));
    transition:width .5s cubic-bezier(.22,1,.36,1);
  }
`

const ringPath = "M26,3 A23,23 0 1,1 25.9,3"

export default function HowItWorks() {
  const header = useScrollReveal()
  const grid   = useScrollReveal()

  return (
    <section id="how-it-works" className="hiw-root" style={{
      position:'relative', padding:'104px 0', overflow:'hidden',
      background:'linear-gradient(180deg,#faf8ff 0%,#f4f0fb 50%,#faf8ff 100%)',
    }}>
      <style>{css}</style>
      <div className="hiw-grain" />

      {/* Ambient background shapes */}
      <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
        <div style={{
          position:'absolute', top:'-15%', right:'-8%', width:600, height:560,
          borderRadius:'63% 37% 54% 46% / 55% 48% 52% 45%',
          background:'radial-gradient(ellipse,rgba(30,14,60,.07) 0%,transparent 65%)',
          filter:'blur(60px)',
        }} />
        <div style={{
          position:'absolute', bottom:'-20%', left:'-12%', width:500, height:460,
          borderRadius:'40% 60% 45% 55%',
          background:'radial-gradient(ellipse,rgba(15,8,38,.06) 0%,transparent 65%)',
          filter:'blur(64px)',
        }} />
        {/* Subtle grid dots pattern */}
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.025 }}>
          <defs>
            <pattern id="hiw-dots" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#1e0e3c"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hiw-dots)" />
        </svg>
        {/* Large decorative serif numeral background watermark */}
        <div style={{
          position:'absolute', bottom:'-2%', right:'2%',
          fontFamily:'Instrument Serif,serif', fontStyle:'italic',
          fontSize:'28vw', fontWeight:400, lineHeight:1,
          color:'#1e0e3c', opacity:.018, userSelect:'none', pointerEvents:'none',
          letterSpacing:'-.05em',
        }}>04</div>
      </div>

      <div style={{ position:'relative', maxWidth:1280, margin:'0 auto', padding:'0 32px', zIndex:1 }}>

        {/* Header */}
        <div ref={header.ref} className={`hiw-reveal ${header.visible ? 'vis' : ''}`}
          style={{ textAlign:'center', marginBottom:72 }}>
          <div className="hiw-badge">The Process</div>

          {/* Editorial headline with italic serif mixed in */}
          <h2 style={{
            fontSize:'clamp(2rem,4.5vw,3.2rem)', fontWeight:900, lineHeight:1.1,
            marginBottom:16, color:'#0f0826', letterSpacing:'-.02em',
          }}>
            A Structured Way to Find<br />
            <span style={{ fontFamily:'Instrument Serif,serif', fontStyle:'italic', fontWeight:400, letterSpacing:'-.01em' }}>
              a Co-Founder
            </span>
          </h2>

          <p style={{ fontSize:'1.05rem', color:'#5a4f7a', maxWidth:440, margin:'0 auto 32px', lineHeight:1.75 }}>
            Four proven phases from first contact to legal partnership.
          </p>

          {/* Decorative step indicator pills */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            {steps.map(({ step, accent }, i) => (
              <div key={step} style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{
                  display:'flex', alignItems:'center', gap:6,
                  padding:'3px 12px', borderRadius:999,
                  background:'#f0edf8', border:'1px solid #c4b8e8',
                  fontSize:11, fontWeight:700, color:'#5a4f7a',
                }}>
                  <span style={{ width:6, height:6, borderRadius:'50%', background:accent, display:'inline-block' }}/>
                  {step}
                </div>
                {i < 3 && <div style={{ width:18, height:1, background:'#c4b8e8' }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div ref={grid.ref} className={`hiw-grid ${grid.visible ? 'vis' : ''}`}
          style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20, alignItems:'start', overflow:'visible', paddingTop:80 }}>
          {steps.map(({ step, Icon, title, desc, items, accent }, i) => {
            const progress = ((i + 1) / steps.length) * 100
            return (
              <div key={step} className="hiw-card-wrap">
                {/* Connector arrow */}
                {i < steps.length - 1 && (
                  <div className="hiw-connector">
                    <div className="hiw-connector-line" />
                    <div className="hiw-connector-arrow" />
                  </div>
                )}

                <div className="hiw-card">
                  {/* Noise */}
                  <div className="hiw-card-noise" />
                  {/* Blob glow */}
                  <div className="hiw-card-blob" />
                  {/* Top ruler */}
                  <div className="hiw-card-ruler" style={{ '--accent-color': accent }} />

                  {/* Top row: icon + step tag */}
                  <div style={{ position:'relative', zIndex:1, display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:24 }}>
                    {/* SVG ring icon */}
                    <div className="hiw-icon-ring">
                      <svg className="hiw-ring-svg" viewBox="0 0 52 52" fill="none"
                        style={{ opacity:.3, transition:'opacity .3s' }}>
                        <circle cx="26" cy="26" r="23" stroke={accent} strokeWidth="1"
                          strokeDasharray="4 4" />
                      </svg>
                      <div className="hiw-icon-inner">
                        <Icon sx={{ fontSize:18, color:accent }} />
                      </div>
                    </div>

                    {/* Step tag — small pill */}
                    <div style={{
                      padding:'3px 10px', borderRadius:999,
                      background:'#f4f0fb', border:'1px solid #e0d8f0',
                      fontSize:10, fontWeight:800, color:'#9b8ec4', letterSpacing:'.06em',
                    }}>
                      STEP {step}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="hiw-title-row" style={{ position:'relative', zIndex:1 }}>
                    <div className="hiw-title-slash" style={{ '--accent-color': accent }} />
                    <h3 style={{ fontSize:14, fontWeight:800, color:'#0f0826', margin:0 }}>{title}</h3>
                  </div>

                  <p style={{ position:'relative', zIndex:1, fontSize:12, color:'#7c6fa0', lineHeight:1.75, marginBottom:18, marginTop:8 }}>{desc}</p>

                  {/* Items */}
                  <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:2, position:'relative', zIndex:1 }}>
                    {items.map(item => (
                      <li key={item} className="hiw-item">
                        <span className="hiw-dot" style={{ background:accent }} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Progress bar */}
                  <div className="hiw-progress-bar" style={{ '--accent-color': accent, position:'relative', zIndex:1 }}>
                    <div className="hiw-progress-fill" style={{ width:`${progress}%` }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}