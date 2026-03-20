import CheckIcon from '@mui/icons-material/Check'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import { useScrollReveal } from '../hooks/useScrollReveal'

const plans = [
  {
    num: '01', name: 'Free', price: '$0', period: 'forever',
    desc: 'Explore the platform at no cost.',
    cta: 'Get Started', highlight: false, badge: null,
    features: ['Create founder profile', 'Browse founders', '5 matches / month', 'Basic messaging', 'Basic compatibility score'],
  },
  {
    num: '02', name: 'Gold Match', price: '$15', period: '/month', altPrice: 'or $99 / year',
    desc: 'For founders actively searching for a co-founder.',
    cta: 'Start Gold Match', highlight: true, badge: 'Most Popular',
    features: ['Unlimited founder discovery', 'Advanced compatibility test', 'Unlimited matches', 'See who liked you', 'Priority visibility', 'Full messaging & calls'],
  },
  {
    num: '03', name: 'Founder Sprint', price: '$49', period: '/month', altPrice: 'or $120 / 90-day',
    desc: 'For matched founders ready to collaborate.',
    cta: 'Start Sprint', highlight: false, badge: null,
    features: ['90-day collaboration sprint', 'Milestone tracker', 'Founder collab tools', 'Conflict resolution', 'Mentor recommendations'],
  },
  {
    num: '04', name: 'Legal Partnership', price: '$199', period: 'one-time',
    desc: 'Formalize your co-founder agreement.',
    cta: 'Formalize Partnership', highlight: false, badge: 'One-Time',
    features: ['Founder agreement template', 'Equity split agreement', 'NDA templates', 'Legal partnership docs'],
  },
]

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

  .px * { font-family:'Cabinet Grotesk',sans-serif; box-sizing:border-box; margin:0; padding:0; }

  @keyframes px-up   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes px-glow { 0%,100%{box-shadow:0 24px 80px rgba(15,8,38,.38)} 50%{box-shadow:0 36px 100px rgba(15,8,38,.52)} }
  @keyframes px-line { from{transform:scaleX(0)} to{transform:scaleX(1)} }
  @keyframes px-feat {
    from { opacity:0; transform:translateY(10px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .px { padding:100px 0; background:#fff; position:relative; overflow:hidden; }
  .px::before, .px::after { content:''; position:absolute; border-radius:50%; pointer-events:none; }
  .px::before {
    width:560px; height:500px; top:-12%; right:-8%;
    background:radial-gradient(ellipse,rgba(30,14,60,.05) 0%,transparent 65%);
    filter:blur(72px);
  }
  .px::after {
    width:440px; height:400px; bottom:-14%; left:-8%;
    background:radial-gradient(ellipse,rgba(15,8,38,.04) 0%,transparent 65%);
    filter:blur(64px);
  }

  .px__wrap { max-width:1280px; margin:0 auto; padding:0 32px; position:relative; z-index:1; }

  /* ── Header ── */
  .px__head { display:flex; align-items:flex-end; justify-content:space-between; margin-bottom:64px; gap:24px; }
  .px__head-left { animation:px-up .65s ease both; }
  .px__badge {
    display:inline-flex; align-items:center;
    padding:5px 16px; border-radius:999px; margin-bottom:18px;
    background:#f0edf8; color:#1e0e3c;
    font-size:11px; font-weight:800; letter-spacing:.07em; text-transform:uppercase;
    border:1px solid #c4b8e8;
  }
  .px__title { font-size:clamp(2.2rem,4vw,3.2rem); font-weight:900; color:#0f0826; letter-spacing:-.03em; line-height:1.05; }
  .px__title em { font-family:'Instrument Serif',serif; font-style:italic; font-weight:400; color:#2d1b69; }
  .px__sub { font-size:.95rem; color:#7c6fa0; line-height:1.7; max-width:280px; text-align:right; animation:px-up .65s .1s ease both; }

  /* ── Grid ── */
  .px__grid { display:grid; grid-template-columns:1fr 1.08fr 1fr 1fr; gap:16px; align-items:end; }

  /* ── Card shell ── */
  .px__card {
    position:relative; border-radius:20px;
    border:1px solid #ece9f4; background:#fff;
    overflow:hidden; cursor:pointer;
    height:440px;
    transition:transform .38s cubic-bezier(.22,1,.36,1), box-shadow .38s, border-color .38s;
  }
  .px__card--hi { height:480px; }
  .px__card:nth-child(1) { animation:px-up .6s .08s ease both; }
  .px__card:nth-child(2) { animation:px-up .6s .16s ease both; }
  .px__card:nth-child(3) { animation:px-up .6s .24s ease both; }
  .px__card:nth-child(4) { animation:px-up .6s .32s ease both; }

  /* ── Front face (always visible) ── */
  .px__front {
    padding:30px 26px 28px;
    position:relative; z-index:1;
    transition:transform .42s cubic-bezier(.22,1,.36,1);
  }
  .px__card--hi .px__front { padding:34px 28px 28px; }

  /* ── Reveal panel — fixed pixel height so it never clips ── */
  .px__reveal {
    position:absolute; left:0; right:0; bottom:0;
    height:220px;
    padding:18px 26px 22px;
    display:flex; flex-direction:column; justify-content:space-between;
    background:linear-gradient(170deg,#0f0826 0%,#1e0e3c 60%,#2d1b69 100%);
    transform:translateY(100%);
    transition:transform .44s cubic-bezier(.22,1,.36,1);
    border-top:1px solid rgba(255,255,255,.07);
    z-index:2;
  }
  /* Gold Match has more features so needs more room */
  .px__card--hi .px__reveal {
    height:250px;
    background:linear-gradient(170deg,rgba(10,5,30,.97) 0%,rgba(20,10,50,.99) 100%);
    border-top:1px solid rgba(255,255,255,.12);
  }

  /* On hover: slide panel up, nudge front */
  .px__card:not(.px__card--hi):hover .px__reveal { transform:translateY(0); }
  .px__card:not(.px__card--hi):hover .px__front  { transform:translateY(-10px); }
  .px__card:not(.px__card--hi):hover {
    transform:translateY(-5px);
    box-shadow:0 24px 64px rgba(30,14,60,.13), 0 6px 16px rgba(0,0,0,.06);
    border-color:#c4b8e8;
  }

  /* Gold Match hover */
  .px__card--hi:hover .px__reveal { transform:translateY(0); }
  .px__card--hi:hover .px__front  { transform:translateY(-10px); }
  .px__card--hi:hover {
    transform:translateY(-7px) !important;
    box-shadow:0 40px 100px rgba(15,8,38,.55) !important;
    border-color:rgba(124,111,160,.5) !important;
  }

  /* Staggered feature entrance inside reveal */
  .px__reveal .px__feature {
    opacity:0; transform:translateY(8px);
  }
  .px__card:hover .px__reveal .px__feature:nth-child(1) { animation:px-feat .3s .08s ease forwards; }
  .px__card:hover .px__reveal .px__feature:nth-child(2) { animation:px-feat .3s .14s ease forwards; }
  .px__card:hover .px__reveal .px__feature:nth-child(3) { animation:px-feat .3s .20s ease forwards; }
  .px__card:hover .px__reveal .px__feature:nth-child(4) { animation:px-feat .3s .26s ease forwards; }
  .px__card:hover .px__reveal .px__feature:nth-child(5) { animation:px-feat .3s .32s ease forwards; }
  .px__card:hover .px__reveal .px__feature:nth-child(6) { animation:px-feat .3s .38s ease forwards; }

  /* Staggered CTA entrance */
  .px__reveal .px__cta {
    opacity:0; transform:translateY(6px);
  }
  .px__card:hover .px__reveal .px__cta { animation:px-feat .3s .42s ease forwards; }

  /* ── Watermark number ── */
  .px__num {
    position:absolute; bottom:-14px; right:-4px;
    font-size:120px; font-weight:900; letter-spacing:-.06em; line-height:1;
    pointer-events:none; user-select:none;
    transition:opacity .35s, transform .4s cubic-bezier(.22,1,.36,1);
  }
  .px__card:not(.px__card--hi) .px__num { color:#0f0826; opacity:.04; }
  .px__card--hi .px__num { color:#fff; opacity:.05; bottom:-12px; }
  .px__card:hover .px__num { opacity:.09; transform:scale(1.05) translateY(-4px); }

  /* ── Badges ── */
  .px__plan-badge {
    position:absolute; top:18px; right:18px;
    padding:4px 12px; border-radius:999px;
    font-size:10px; font-weight:800; letter-spacing:.05em; text-transform:uppercase;
    display:flex; align-items:center; gap:4px; z-index:3;
  }
  .px__plan-badge--pop { background:rgba(255,255,255,.1); color:rgba(226,217,243,.8); border:1px solid rgba(255,255,255,.13); }
  .px__plan-badge--once { background:#f0edf8; color:#1e0e3c; border:1px solid #c4b8e8; }

  /* ── Front content ── */
  .px__plan-num { font-size:10px; font-weight:800; letter-spacing:.1em; text-transform:uppercase; margin-bottom:16px; }
  .px__card:not(.px__card--hi) .px__plan-num { color:#d4cce8; }
  .px__card--hi .px__plan-num { color:rgba(226,217,243,.25); }

  .px__plan-name { font-size:12px; font-weight:800; letter-spacing:.06em; text-transform:uppercase; margin-bottom:12px; }
  .px__card:not(.px__card--hi) .px__plan-name { color:#7c6fa0; }
  .px__card--hi .px__plan-name { color:rgba(226,217,243,.45); }

  .px__price-row { display:flex; align-items:baseline; gap:5px; margin-bottom:3px; }
  .px__price { font-size:2.6rem; font-weight:900; line-height:1; letter-spacing:-.03em; }
  .px__card:not(.px__card--hi) .px__price { color:#0f0826; }
  .px__card--hi .px__price { color:#fff; }

  .px__period { font-size:12px; font-weight:600; }
  .px__card:not(.px__card--hi) .px__period { color:#b0a8c4; }
  .px__card--hi .px__period { color:rgba(226,217,243,.35); }

  .px__alt { font-size:11px; margin-bottom:10px; }
  .px__card:not(.px__card--hi) .px__alt { color:#c0b8d4; }
  .px__card--hi .px__alt { color:rgba(226,217,243,.2); }

  .px__desc { font-size:12px; line-height:1.65; }
  .px__card:not(.px__card--hi) .px__desc { color:#7c6fa0; }
  .px__card--hi .px__desc { font-family:'Instrument Serif',serif; font-style:italic; font-size:.875rem; color:rgba(226,217,243,.48); }

  /* ── Reveal internals ── */
  .px__reveal-label {
    font-size:9px; font-weight:800; letter-spacing:.1em; text-transform:uppercase;
    color:rgba(226,217,243,.25); margin-bottom:14px;
  }
  .px__card--hi .px__reveal-label { color:rgba(226,217,243,.3); }

  .px__features { list-style:none; display:flex; flex-direction:column; gap:7px; margin-bottom:14px; }
  .px__feature { display:flex; align-items:flex-start; gap:9px; font-size:11.5px; line-height:1.4; color:rgba(226,217,243,.65); }
  .px__card--hi .px__reveal .px__feature { color:rgba(226,217,243,.7); }

  /* ── CTA ── */
  .px__cta {
    display:block; width:100%; padding:11px 16px;
    border-radius:11px; font-size:13px; font-weight:800;
    text-align:center; text-decoration:none; cursor:pointer;
    transition:all .2s; letter-spacing:.01em;
    position:relative; overflow:hidden;
  }
  .px__cta--light {
    background:rgba(255,255,255,.12); color:rgba(226,217,243,.9);
    border:1px solid rgba(255,255,255,.16);
  }
  .px__cta--light:hover { background:rgba(255,255,255,.2); border-color:rgba(255,255,255,.28); transform:translateY(-2px); }

  .px__cta--white {
    background:#fff; color:#0f0826; border:none;
    box-shadow:0 4px 14px rgba(0,0,0,.18);
  }
  .px__cta--white:hover { transform:translateY(-2px); box-shadow:0 8px 22px rgba(0,0,0,.22); }

  /* ── Dark card glow ── */
  .px__card--hi {
    background:linear-gradient(160deg,#0f0826 0%,#1e0e3c 52%,#2d1b69 100%);
    border-color:rgba(59,29,120,.6);
    margin-bottom:-20px;
    animation:px-up .6s .16s ease both, px-glow 5s 1s ease-in-out infinite;
  }
  .px__card--hi::after {
    content:''; position:absolute; top:0; left:12%; right:12%; height:1px;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);
    transition:left .35s, right .35s;
  }
  .px__card--hi:hover::after { left:0; right:0; }
`

export default function Pricing() {
  const header = useScrollReveal()
  const grid   = useScrollReveal()

  return (
    <section id="pricing" className="px">
      <style>{css}</style>

      <div className="px__wrap">

        {/* Header */}
        <div ref={header.ref} className="px__head">
          <div className="px__head-left">
            <div className="px__badge">Pricing</div>
            <h2 className="px__title">
              Simple Pricing<br />for <em>Founders</em>
            </h2>
          </div>
          <p className="px__sub">
            Start free and upgrade when you find the right co-founder.
          </p>
        </div>

        {/* Cards */}
        <div ref={grid.ref} className="px__grid">
          {plans.map(({ num, name, price, period, altPrice, desc, cta, highlight, badge, features }) => (
            <div key={name} className={`px__card${highlight ? ' px__card--hi' : ''}`}>

              {/* Watermark */}
              <div className="px__num">{num}</div>

              {/* Badge */}
              {badge && (
                <div className={`px__plan-badge ${highlight ? 'px__plan-badge--pop' : 'px__plan-badge--once'}`}>
                  {highlight && <WorkspacePremiumOutlinedIcon sx={{ fontSize:9 }} />}
                  {badge}
                </div>
              )}

              {/* Front face */}
              <div className="px__front">
                <div className="px__plan-num">{num}</div>
                <div className="px__plan-name">{name}</div>
                <div className="px__price-row">
                  <span className="px__price">{price}</span>
                  <span className="px__period">{period}</span>
                </div>
                {altPrice && <p className="px__alt">{altPrice}</p>}
                <p className="px__desc">{desc}</p>
              </div>

              {/* Reveal panel */}
              <div className="px__reveal">
                <div className="px__reveal-label">What's included</div>
                <ul className="px__features">
                  {features.map(f => (
                    <li key={f} className="px__feature">
                      <CheckIcon sx={{ fontSize:12, mt:'1px', flexShrink:0, color:'rgba(196,184,232,.6)' }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#" className={`px__cta ${highlight ? 'px__cta--white' : 'px__cta--light'}`}>
                  {cta}
                </a>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}