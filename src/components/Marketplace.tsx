import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined'
import GavelIcon from '@mui/icons-material/Gavel'
import EastIcon from '@mui/icons-material/East'
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

  @keyframes hiw-fadeUp    { from{opacity:0;transform:translateY(26px)} to{opacity:1;transform:translateY(0)} }
  @keyframes hiw-cardIn    { from{opacity:0;transform:translateY(22px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes hiw-gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  @keyframes hiw-borderRun { 0%{background-position:0%} 100%{background-position:300%} }
  @keyframes hiw-shimmer   { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes hiw-stepPop   { from{opacity:0;transform:scale(.4) rotate(-15deg)} to{opacity:1;transform:scale(1) rotate(0deg)} }
  @keyframes hiw-dotBounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.5)} }
  @keyframes hiw-badgePop  { 0%,100%{transform:scale(1)} 50%{transform:scale(1.03)} }
  @keyframes hiw-grain {
    0%,100%{transform:translate(0,0)} 20%{transform:translate(-2%,-2%)}
    40%{transform:translate(2%,1%)}   60%{transform:translate(-1%,3%)}
    80%{transform:translate(3%,-1%)}
  }

  .hiw-reveal { opacity:0; }
  .hiw-reveal.vis { animation:hiw-fadeUp .7s cubic-bezier(.22,1,.36,1) both; }
  .hiw-grid .hiw-card { opacity:0; }
  .hiw-grid.vis .hiw-card { animation:hiw-cardIn .65s cubic-bezier(.22,1,.36,1) both; }
  .hiw-grid.vis .hiw-card:nth-child(1){animation-delay:.05s}
  .hiw-grid.vis .hiw-card:nth-child(2){animation-delay:.16s}
  .hiw-grid.vis .hiw-card:nth-child(3){animation-delay:.27s}
  .hiw-grid.vis .hiw-card:nth-child(4){animation-delay:.38s}

  .hiw-grid.vis .hiw-card .hiw-step-num { animation:hiw-stepPop .5s cubic-bezier(.34,1.56,.64,1) both; }
  .hiw-grid.vis .hiw-card:nth-child(1) .hiw-step-num{animation-delay:.3s}
  .hiw-grid.vis .hiw-card:nth-child(2) .hiw-step-num{animation-delay:.45s}
  .hiw-grid.vis .hiw-card:nth-child(3) .hiw-step-num{animation-delay:.6s}
  .hiw-grid.vis .hiw-card:nth-child(4) .hiw-step-num{animation-delay:.75s}

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

  /* Card */
  .hiw-card {
    position:relative; background:#fff; border-radius:22px; padding:26px;
    border:1px solid #e8e4f0; overflow:hidden;
    box-shadow:0 2px 8px rgba(30,14,60,.04);
    transition:transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s, border-color .28s;
  }
  .hiw-card::before {
    content:''; position:absolute; inset:-1px; border-radius:inherit; padding:1px;
    background:linear-gradient(135deg,rgba(30,14,60,0),rgba(30,14,60,0));
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude;
    transition:background .35s; pointer-events:none;
  }
  .hiw-card:hover::before {
    background:linear-gradient(135deg,rgba(30,14,60,.28),rgba(59,29,120,.5),rgba(30,14,60,.08));
  }
  .hiw-card:hover {
    transform:translateY(-6px);
    box-shadow:0 22px 52px rgba(30,14,60,.12), 0 6px 16px rgba(0,0,0,.05);
    border-color:transparent;
  }

  .hiw-card-topline {
    position:absolute; top:0; left:24px; right:24px; height:3px; border-radius:0 0 4px 4px;
    background:linear-gradient(90deg,transparent,var(--accent-color,#1e0e3c) 40%,transparent);
    opacity:0; transition:opacity .3s;
  }
  .hiw-card:hover .hiw-card-topline { opacity:1; }

  .hiw-icon-wrap {
    width:44px; height:44px; border-radius:14px; display:flex; align-items:center; justify-content:center;
    transition:transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s;
    border:1px solid #c4b8e8;
  }
  .hiw-card:hover .hiw-icon-wrap { transform:rotate(-8deg) scale(1.15); box-shadow:0 6px 18px rgba(30,14,60,.18); }

  .hiw-step-num {
    font-family:'Cabinet Grotesk',sans-serif; font-size:2.2rem; font-weight:900;
    line-height:1; letter-spacing:-.03em;
  }

  .hiw-dot {
    width:7px; height:7px; border-radius:50%; flex-shrink:0;
    transition:transform .22s cubic-bezier(.34,1.56,.64,1);
  }
  .hiw-card:hover .hiw-dot { animation:hiw-dotBounce .4s ease both; }

  .hiw-connector {
    position:absolute; top:44px; right:-14px; z-index:10;
    opacity:.2; transition:opacity .3s;
  }

  .hiw-card-glow {
    position:absolute; inset:0; pointer-events:none; opacity:0;
    background:radial-gradient(ellipse at 50% 110%,rgba(30,14,60,.05) 0%,transparent 65%);
    transition:opacity .3s;
  }
  .hiw-card:hover .hiw-card-glow { opacity:1; }

  .hiw-card::after {
    content:''; position:absolute; top:0; left:0; right:0; height:2px; border-radius:2px 2px 0 0;
    background:linear-gradient(90deg,transparent,rgba(30,14,60,0),transparent);
    background-size:200% 100%; transition:background .3s;
  }
  .hiw-card:hover::after {
    background:linear-gradient(90deg,transparent,rgba(30,14,60,.4),transparent);
    animation:hiw-shimmer 1.8s linear infinite;
  }

  .hiw-grain {
    position:absolute; inset:-50%; width:200%; height:200%; pointer-events:none; z-index:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity:.018; animation:hiw-grain 9s steps(10) infinite;
  }
`

export default function HowItWorks() {
  const header = useScrollReveal()
  const grid   = useScrollReveal()

  return (
    <section id="how-it-works" className="hiw-root" style={{
      position:'relative', padding:'96px 0', overflow:'hidden',
      background:'linear-gradient(180deg,#faf8ff 0%,#f4f0fb 50%,#faf8ff 100%)',
    }}>
      <style>{css}</style>
      <div className="hiw-grain" />

      <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
        <div style={{
          position:'absolute', top:'-12%', right:'-6%', width:520, height:480,
          borderRadius:'60% 40% 55% 45%',
          background:'radial-gradient(ellipse,rgba(30,14,60,.06) 0%,transparent 65%)',
          filter:'blur(52px)',
        }} />
        <div style={{
          position:'absolute', bottom:'-18%', left:'-10%', width:440, height:400,
          borderRadius:'45% 55% 40% 60%',
          background:'radial-gradient(ellipse,rgba(15,8,38,.05) 0%,transparent 65%)',
          filter:'blur(56px)',
        }} />
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.018 }}>
          <defs>
            <pattern id="hlines" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M0 24 H48" stroke="#1e0e3c" strokeWidth="1" strokeDasharray="4 8"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hlines)" />
        </svg>
      </div>

      <div style={{ position:'relative', maxWidth:1280, margin:'0 auto', padding:'0 28px', zIndex:1 }}>

        {/* Header */}
        <div ref={header.ref} className={`hiw-reveal ${header.visible ? 'vis' : ''}`}
          style={{ textAlign:'center', marginBottom:56 }}>
          <div className="hiw-badge">The Process</div>
          <h2 style={{ fontFamily:'Cabinet Grotesk,sans-serif', fontSize:'clamp(2rem,4.5vw,3.2rem)', fontWeight:900, lineHeight:1.1, marginBottom:16, color:'#0f0826', letterSpacing:'-.02em' }}>
            A Structured Way to Find<br />a Co-Founder
          </h2>
          <p style={{ fontSize:'1.05rem', color:'#5a4f7a', maxWidth:440, margin:'0 auto', lineHeight:1.75 }}>
            Four proven phases from first contact to legal partnership.
          </p>
        </div>

        {/* Grid */}
        <div ref={grid.ref} className={`hiw-grid ${grid.visible ? 'vis' : ''}`}
          style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18 }}>
          {steps.map(({ step, Icon, title, desc, items, accent }, i) => (
            <div key={step} style={{ position:'relative' }}>
              {i < steps.length - 1 && (
                <div className="hiw-connector">
                  <EastIcon sx={{ fontSize:18, color:'#c4b8e8' }} />
                </div>
              )}
              <div className="hiw-card">
                <div className="hiw-card-glow" />
                <div className="hiw-card-topline" style={{ '--accent-color': accent }} />

                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:22 }}>
                  <div className="hiw-icon-wrap" style={{ background:'#f0edf8' }}>
                    <Icon sx={{ fontSize:20, color:accent }} />
                  </div>
                  <span className="hiw-step-num" style={{ color:`${accent}22` }}>{step}</span>
                </div>

                <h3 style={{ fontFamily:'Cabinet Grotesk,sans-serif', fontSize:14, fontWeight:800, marginBottom:8, color:'#0f0826' }}>{title}</h3>
                <p style={{ fontSize:12, color:'#7c6fa0', lineHeight:1.7, marginBottom:18 }}>{desc}</p>

                <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:9 }}>
                  {items.map(item => (
                    <li key={item} style={{ display:'flex', alignItems:'center', gap:9, fontSize:12, color:'#5a4f7a' }}>
                      <span className="hiw-dot" style={{ background:accent }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}