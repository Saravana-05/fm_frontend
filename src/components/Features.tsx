import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import { useScrollReveal } from '../hooks/useScrollReveal'

const features = [
  {
    Icon: PsychologyOutlinedIcon, title: 'Compatibility Framework', subtitle: 'AI-Powered Matching', tag: 'Core',
    desc: 'Our algorithm scores founders on 12 dimensions — vision, work style, risk profile, and leadership.',
    items: ['15-question structured test', 'AI compatibility scoring', 'Behavioral analysis'],
    index: '01',
  },
  {
    Icon: ManageAccountsOutlinedIcon, title: 'Founder Profiles', subtitle: 'Startup-Focused', tag: 'Profiles',
    desc: "Show your startup stage, what you're building, your skills, and exactly what you need in a partner.",
    items: ['Startup & role context', 'Skills & expertise', 'Partner preferences'],
    index: '02',
  },
  {
    Icon: TaskAltIcon, title: 'Collaboration Sprint', subtitle: '90-Day Trial', tag: 'Sprint',
    desc: 'Milestone tracking, shared task boards, and a conflict resolution guide for working partners.',
    items: ['Milestone tracker', 'Shared task board', 'Conflict resolution guide'],
    index: '03',
  },
  {
    Icon: ArticleOutlinedIcon, title: 'Legal Infrastructure', subtitle: 'Ready-to-Use Docs', tag: 'Legal',
    desc: 'Founder agreements, equity calculators, and NDA templates prepared by startup lawyers.',
    items: ['Founder agreement', 'Equity split calculator', 'NDA & partnership docs'],
    index: '04',
  },
  {
    Icon: Diversity3OutlinedIcon, title: 'Startup Community', subtitle: 'Network & Talent', tag: 'Community',
    desc: 'Mentors, startup lawyers, and technical freelancers to plug gaps and accelerate your company.',
    items: ['Mentor network', 'Legal advisor access', 'Startup freelancers'],
    index: '05',
  },
]

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

  .feat-root * { font-family:'Cabinet Grotesk',sans-serif; box-sizing:border-box; }

  @keyframes feat-fadeUp    { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
  @keyframes feat-cardIn    { from{opacity:0;transform:translateY(24px) scale(.97)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes feat-gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  @keyframes feat-borderRun { 0%{background-position:0%} 100%{background-position:300%} }
  @keyframes feat-badgePop  { 0%,100%{transform:scale(1)} 50%{transform:scale(1.03)} }
  @keyframes feat-grain {
    0%,100%{transform:translate(0,0)} 20%{transform:translate(-2%,-2%)}
    40%{transform:translate(2%,1%)}   60%{transform:translate(-1%,3%)}
    80%{transform:translate(3%,-1%)}
  }
  @keyframes feat-lineGrow  { from{width:0} to{width:100%} }
  @keyframes feat-shimmer   { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes feat-float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }

  .feat-reveal { opacity:0; }
  .feat-reveal.vis { animation:feat-fadeUp .75s cubic-bezier(.22,1,.36,1) both; }

  /* ── Main layout: left sticky header + right scrolling cards ── */
  .feat-layout {
    display:grid;
    grid-template-columns:340px 1fr;
    gap:64px;
    align-items:start;
  }

  /* Sticky sidebar */
  .feat-sidebar {
    position:sticky;
    top:96px;
  }

  /* Cards column */
  .feat-cards-col { display:flex; flex-direction:column; gap:16px; }

  /* Badge */
  .feat-badge {
    display:inline-flex; align-items:center; gap:6px;
    padding:5px 16px; border-radius:999px; margin-bottom:24px;
    background:#f0edf8; color:#1e0e3c;
    font-size:12px; font-weight:700; letter-spacing:.04em;
    position:relative; overflow:hidden;
    animation:feat-badgePop 3s ease-in-out infinite;
    border:1px solid #c4b8e8;
  }
  .feat-badge::before {
    content:''; position:absolute; inset:-1px; border-radius:999px; padding:1px;
    background:linear-gradient(90deg,rgba(30,14,60,.25),rgba(59,29,120,.65),rgba(30,14,60,.25));
    background-size:300% 100%;
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude;
    animation:feat-borderRun 3s linear infinite; pointer-events:none;
  }

  /* Gradient headline */
  .feat-grad {
    background:linear-gradient(125deg,#0f0826 0%,#1e0e3c 25%,#3b1d78 55%,#1e0e3c 80%,#0f0826 100%);
    background-size:300% 300%;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    animation:feat-gradShift 5s ease infinite;
  }

  /* Feature index list in sidebar */
  .feat-index-list { display:flex; flex-direction:column; gap:0; margin-top:40px; }
  .feat-index-item {
    display:flex; align-items:center; gap:12px;
    padding:10px 0; cursor:default;
    border-bottom:1px solid #f0edf8;
    transition:padding-left .25s;
  }
  .feat-index-item:hover { padding-left:6px; }
  .feat-index-num {
    font-family:'Instrument Serif',serif; font-style:italic;
    font-size:1rem; color:#c4b8e8; font-weight:400; min-width:24px;
    transition:color .25s;
  }
  .feat-index-item:hover .feat-index-num { color:#3b1d78; }
  .feat-index-label { font-size:12px; font-weight:700; color:#7c6fa0; transition:color .25s; }
  .feat-index-item:hover .feat-index-label { color:#1e0e3c; }
  .feat-index-dot {
    width:5px; height:5px; border-radius:50%; background:#c4b8e8; flex-shrink:0; margin-left:auto;
    transition:background .25s, transform .25s;
  }
  .feat-index-item:hover .feat-index-dot { background:#3b1d78; transform:scale(1.5); }

  /* ── CARD: horizontal layout ── */
  .feat-card {
    position:relative; background:#fff; border-radius:22px;
    border:1px solid #e8e4f0; overflow:hidden;
    box-shadow:0 2px 8px rgba(30,14,60,.04);
    transition:transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s, border-color .3s;
    opacity:0;
    display:grid;
    grid-template-columns:220px 1px 1fr;
    align-items:stretch;
    min-height:150px;
  }
  .feat-cards-col.vis .feat-card { animation:feat-cardIn .65s cubic-bezier(.22,1,.36,1) both; }
  .feat-cards-col.vis .feat-card:nth-child(1){animation-delay:.06s}
  .feat-cards-col.vis .feat-card:nth-child(2){animation-delay:.15s}
  .feat-cards-col.vis .feat-card:nth-child(3){animation-delay:.24s}
  .feat-cards-col.vis .feat-card:nth-child(4){animation-delay:.33s}
  .feat-cards-col.vis .feat-card:nth-child(5){animation-delay:.42s}

  .feat-card::after {
    content:''; position:absolute; inset:-1px; border-radius:inherit; padding:1px;
    background:linear-gradient(135deg,rgba(30,14,60,0),rgba(30,14,60,0));
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude;
    transition:background .35s; pointer-events:none;
  }
  .feat-card:hover::after {
    background:linear-gradient(135deg,rgba(30,14,60,.28),rgba(59,29,120,.5),rgba(30,14,60,.08));
  }
  .feat-card:hover {
    transform:translateY(-4px) scale(1.008);
    box-shadow:0 20px 48px rgba(30,14,60,.11), 0 5px 14px rgba(0,0,0,.04);
    border-color:transparent;
  }

  /* Left panel of card */
  .feat-card-left {
    padding:24px 22px;
    display:flex; flex-direction:column; justify-content:space-between;
    position:relative; background:#faf8ff;
  }
  .feat-card-left-top { display:flex; flex-direction:column; gap:14px; }

  /* Vertical divider */
  .feat-card-divider {
    width:1px;
    background:linear-gradient(180deg, transparent, #e8e4f0 20%, #e8e4f0 80%, transparent);
    flex-shrink:0;
  }

  /* Right panel of card */
  .feat-card-right {
    padding:24px 26px;
    display:flex; flex-direction:column; justify-content:center;
  }

  /* Ghost index number top-right of left panel */
  .feat-ghost-num {
    font-family:'Instrument Serif',serif; font-style:italic;
    font-size:4rem; font-weight:400; line-height:1;
    color:#1e0e3c; opacity:.06;
    position:absolute; bottom:12px; right:14px;
    pointer-events:none; user-select:none;
    transition:opacity .3s;
  }
  .feat-card:hover .feat-ghost-num { opacity:.12; }

  /* Icon */
  .feat-icon-wrap {
    width:42px; height:42px; border-radius:12px;
    display:flex; align-items:center; justify-content:center;
    background:#f0edf8; border:1px solid #c4b8e8;
    transition:transform .3s cubic-bezier(.34,1.56,.64,1), box-shadow .3s;
    flex-shrink:0;
  }
  .feat-card:hover .feat-icon-wrap {
    transform:rotate(-8deg) scale(1.18);
    box-shadow:0 6px 20px rgba(30,14,60,.2);
  }

  /* Tag */
  .feat-tag {
    font-size:10px; font-weight:800; padding:3px 9px; border-radius:999px;
    background:#f0edf8; color:#1e0e3c; letter-spacing:.06em;
    border:1px solid #c4b8e8; align-self:flex-start;
    transition:background .2s;
  }
  .feat-card:hover .feat-tag { background:#e8e2f5; }

  /* Subtitle bar */
  .feat-subtitle-bar {
    display:flex; align-items:center; gap:7px; margin-bottom:5px;
  }
  .feat-subtitle-line {
    width:18px; height:2px; border-radius:2px; background:#3b1d78; opacity:.4;
    transition:width .3s, opacity .3s;
  }
  .feat-card:hover .feat-subtitle-line { width:28px; opacity:.8; }

  /* Check items */
  .feat-check-item {
    display:flex; align-items:center; gap:8px;
    font-size:12px; color:#5a4f7a;
    padding:5px 8px; border-radius:7px;
    transition:background .2s, transform .2s;
  }
  .feat-check-item:hover { background:#f4f0fb; transform:translateX(3px); }
  .feat-check-icon { transition:transform .22s cubic-bezier(.34,1.56,.64,1); }
  .feat-check-item:hover .feat-check-icon { transform:scale(1.25); }

  /* Top accent line on hover */
  .feat-card-ruler {
    position:absolute; top:0; left:0; right:0; height:3px;
    background:linear-gradient(90deg,transparent,#1e0e3c 35%,#3b1d78 65%,transparent);
    opacity:0; transform:scaleX(.5); transform-origin:left;
    transition:opacity .35s, transform .45s cubic-bezier(.22,1,.36,1);
  }
  .feat-card:hover .feat-card-ruler { opacity:1; transform:scaleX(1); }

  /* Noise */
  .feat-grain {
    position:absolute; inset:-50%; width:200%; height:200%; pointer-events:none; z-index:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity:.015; animation:feat-grain 9s steps(10) infinite;
  }
`

export default function Features() {
  const header = useScrollReveal()
  const cards  = useScrollReveal()

  return (
    <section id="features" className="feat-root" style={{ position:'relative', padding:'104px 0', background:'#fff', overflow:'hidden' }}>
      <style>{css}</style>
      <div className="feat-grain" />

      {/* Ambient blobs */}
      <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
        <div style={{
          position:'absolute', top:'-10%', left:'-5%', width:500, height:460,
          borderRadius:'55% 45% 62% 38%',
          background:'radial-gradient(ellipse,rgba(30,14,60,.06) 0%,transparent 65%)',
          filter:'blur(52px)',
        }} />
        <div style={{
          position:'absolute', bottom:'-15%', right:'-8%', width:440, height:400,
          borderRadius:'42% 58% 48% 52%',
          background:'radial-gradient(ellipse,rgba(15,8,38,.05) 0%,transparent 65%)',
          filter:'blur(56px)',
        }} />
        <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.02 }}>
          <defs>
            <pattern id="dotgf" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r=".9" fill="#1e0e3c"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotgf)" />
        </svg>
      </div>

      <div style={{ position:'relative', maxWidth:1280, margin:'0 auto', padding:'0 32px', zIndex:1 }}>
        <div className="feat-layout">

          {/* ── Sticky Sidebar ── */}
          <div ref={header.ref} className={`feat-sidebar feat-reveal ${header.visible ? 'vis' : ''}`}>
            <div className="feat-badge">Platform Features</div>

            <h2 style={{ fontSize:'clamp(1.7rem,3vw,2.6rem)', fontWeight:900, lineHeight:1.12, marginBottom:14, color:'#0f0826', letterSpacing:'-.02em' }}>
              Everything You Need to Build a{' '}
              <span className="feat-grad">Founder Partnership</span>
            </h2>

            <p style={{ fontSize:'1rem', color:'#5a4f7a', lineHeight:1.75, marginBottom:0 }}>
              From compatibility testing to legal paperwork — all in one platform.
            </p>

            {/* Feature index navigation */}
            <div className="feat-index-list">
              {features.map(({ title, index }) => (
                <div key={title} className="feat-index-item">
                  <span className="feat-index-num">{index}</span>
                  <span className="feat-index-label">{title}</span>
                  <span className="feat-index-dot" />
                </div>
              ))}
            </div>

            {/* Decorative large watermark */}
            <div style={{
              marginTop:48,
              fontFamily:'Instrument Serif,serif', fontStyle:'italic',
              fontSize:'7rem', fontWeight:400, lineHeight:1,
              color:'#1e0e3c', opacity:.04, userSelect:'none',
              letterSpacing:'-.05em',
            }}>05</div>
          </div>

          {/* ── Cards Column ── */}
          <div ref={cards.ref} className={`feat-cards-col ${cards.visible ? 'vis' : ''}`}>
            {features.map(({ Icon, title, subtitle, desc, tag, items, index }) => (
              <div key={title} className="feat-card">
                <div className="feat-card-ruler" />

                {/* Left panel */}
                <div className="feat-card-left">
                  <div className="feat-card-left-top">
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <div className="feat-icon-wrap">
                        <Icon sx={{ fontSize:20, color:'#1e0e3c' }} />
                      </div>
                      <span className="feat-tag">{tag}</span>
                    </div>
                    <div>
                      <div className="feat-subtitle-bar">
                        <div className="feat-subtitle-line" />
                        <p style={{ fontSize:10, fontWeight:700, color:'#7c6fa0', letterSpacing:'.08em', textTransform:'uppercase', margin:0 }}>{subtitle}</p>
                      </div>
                      <h3 style={{ fontSize:14, fontWeight:800, color:'#0f0826', margin:0 }}>{title}</h3>
                    </div>
                  </div>
                  {/* Ghost number */}
                  <div className="feat-ghost-num">{index}</div>
                </div>

                {/* Vertical divider */}
                <div className="feat-card-divider" />

                {/* Right panel */}
                <div className="feat-card-right">
                  <p style={{ fontSize:13, color:'#7c6fa0', lineHeight:1.75, marginBottom:16, marginTop:0 }}>{desc}</p>
                  <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:2, margin:0, padding:0 }}>
                    {items.map(item => (
                      <li key={item} className="feat-check-item">
                        <CheckCircleOutlinedIcon className="feat-check-icon" sx={{ fontSize:14, color:'#1e0e3c', flexShrink:0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}