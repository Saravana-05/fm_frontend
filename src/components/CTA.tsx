import EastIcon from '@mui/icons-material/East'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import { useScrollReveal } from '../hooks/useScrollReveal'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

  .cta-root * { font-family:'Cabinet Grotesk',sans-serif; box-sizing:border-box; }

  @keyframes cta-scaleIn  { from{opacity:0;transform:scale(.96) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
  @keyframes cta-shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes cta-gradShift{ 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  @keyframes cta-borderRun{ 0%{background-position:0%} 100%{background-position:300%} }
  @keyframes cta-pulse    { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(2.4);opacity:0} }
  @keyframes cta-glowPulse{
    0%,100%{box-shadow:0 8px 40px rgba(15,8,38,.35)} 50%{box-shadow:0 20px 70px rgba(15,8,38,.55)}
  }
  @keyframes cta-float {
    0%,100%{transform:translate(20%,-20%) scale(1)} 50%{transform:translate(20%,-20%) scale(1.08)}
  }
  @keyframes cta-floatB {
    0%,100%{transform:translate(-20%,20%) scale(1)} 50%{transform:translate(-20%,20%) scale(1.06)}
  }
  @keyframes cta-grain {
    0%,100%{transform:translate(0,0)} 20%{transform:translate(-2%,-2%)}
    40%{transform:translate(2%,1%)}   60%{transform:translate(-1%,3%)}
    80%{transform:translate(3%,-1%)}
  }

  .cta-reveal { opacity:0; }
  .cta-reveal.vis { animation:cta-scaleIn .75s cubic-bezier(.22,1,.36,1) both; }

  /* Live badge */
  .cta-live-badge {
    display:inline-flex; align-items:center; gap:8px;
    padding:6px 16px; border-radius:999px; margin-bottom:28px;
    background:rgba(255,255,255,.08); color:rgba(255,255,255,.75);
    font-size:12px; font-weight:700; letter-spacing:.04em;
    border:1px solid rgba(255,255,255,.15);
    position:relative; overflow:hidden;
  }
  .cta-live-badge::before {
    content:''; position:absolute; inset:-1px; border-radius:999px; padding:1px;
    background:linear-gradient(90deg,rgba(255,255,255,.08),rgba(196,184,232,.4),rgba(255,255,255,.08));
    background-size:300% 100%;
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude;
    animation:cta-borderRun 3s linear infinite; pointer-events:none;
  }

  /* Pulse dot */
  .cta-pdot { position:relative; display:inline-flex; }
  .cta-pdot::before {
    content:''; position:absolute; inset:0; border-radius:50%;
    background:#22c55e; animation:cta-pulse 2s cubic-bezier(.2,0,.8,1) infinite;
  }

  /* Primary CTA */
  .cta-btn-primary {
    display:inline-flex; align-items:center; gap:8px;
    padding:14px 30px; border-radius:12px;
    font-size:14px; font-weight:800; color:#0f0826; text-decoration:none;
    background:linear-gradient(135deg,#e2d9f3,#f0edf8);
    box-shadow:0 4px 20px rgba(15,8,38,.3), inset 0 1px 0 rgba(255,255,255,.5);
    transition:transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s;
    position:relative; overflow:hidden; border:none; cursor:pointer;
    letter-spacing:.01em;
  }
  .cta-btn-primary::before {
    content:''; position:absolute; top:0; left:-90%; width:55%; height:100%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent);
    transform:skewX(-15deg); transition:left .42s ease;
  }
  .cta-btn-primary:hover::before { left:140%; }
  .cta-btn-primary:hover {
    transform:translateY(-3px) scale(1.02);
    box-shadow:0 14px 36px rgba(15,8,38,.4), inset 0 1px 0 rgba(255,255,255,.5)!important;
  }

  /* Secondary CTA */
  .cta-btn-secondary {
    display:inline-flex; align-items:center; gap:8px;
    padding:14px 30px; border-radius:12px;
    font-size:14px; font-weight:700; color:rgba(226,217,243,.8); text-decoration:none;
    background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.14);
    transition:all .22s cubic-bezier(.22,1,.36,1);
    cursor:pointer;
  }
  .cta-btn-secondary:hover {
    color:#e2d9f3; background:rgba(255,255,255,.12);
    border-color:rgba(255,255,255,.25);
    transform:translateY(-3px);
    box-shadow:0 8px 24px rgba(0,0,0,.2);
  }

  /* Trust bar items */
  .cta-trust-item {
    font-size:12px; font-weight:600; color:rgba(226,217,243,.35);
    display:flex; align-items:center; gap:6px;
  }
  .cta-trust-check {
    width:16px; height:16px; border-radius:50%;
    background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.12);
    display:flex; align-items:center; justify-content:center;
    font-size:9px; color:rgba(226,217,243,.5); flex-shrink:0;
  }

  /* Grain inside card */
  .cta-grain {
    position:absolute; inset:-50%; width:200%; height:200%; pointer-events:none; z-index:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity:.025; animation:cta-grain 9s steps(10) infinite;
  }
`

export default function CTA() {
  const section = useScrollReveal()

  return (
    <section className="cta-root" style={{ padding:'96px 0', background:'#fff' }}>
      <style>{css}</style>
      <div style={{ maxWidth:900, margin:'0 auto', padding:'0 28px' }}>
        <div ref={section.ref} className={`cta-reveal ${section.visible ? 'vis' : ''}`}>

          {/* Main card */}
          <div style={{
            position:'relative', borderRadius:28, padding:'72px 56px', textAlign:'center', overflow:'hidden',
            background:'linear-gradient(160deg,#0f0826 0%,#1e0e3c 45%,#2d1b69 100%)',
            border:'1px solid #3b1d78',
            boxShadow:'0 8px 40px rgba(15,8,38,.3), 0 2px 0 rgba(59,29,120,.25)',
            animation:'cta-glowPulse 5s ease-in-out infinite',
          }}>

            {/* Grain */}
            <div className="cta-grain" />

            {/* Top shimmer accent */}
            <div style={{
              position:'absolute', top:0, left:56, right:56, height:2,
              background:'linear-gradient(90deg,transparent,#3b1d78 30%,#7c6fa0 70%,transparent)',
              backgroundSize:'200% 100%', animation:'cta-shimmer 3s linear infinite',
            }} />

            {/* Glow orbs */}
            <div style={{
              position:'absolute', top:0, right:0,
              width:320, height:320, borderRadius:'50%', pointerEvents:'none',
              background:'radial-gradient(circle,rgba(59,29,120,.3) 0%,transparent 65%)',
              filter:'blur(55px)', animation:'cta-float 8s ease-in-out infinite',
            }} />
            <div style={{
              position:'absolute', bottom:0, left:0,
              width:260, height:260, borderRadius:'50%', pointerEvents:'none',
              background:'radial-gradient(circle,rgba(30,14,60,.4) 0%,transparent 65%)',
              filter:'blur(48px)', animation:'cta-floatB 10s ease-in-out infinite',
            }} />

            {/* Dot grid */}
            <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:.025, zIndex:0 }}>
              <defs>
                <pattern id="dotg-cta" width="32" height="32" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r=".9" fill="#e2d9f3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dotg-cta)" />
            </svg>

            {/* Content */}
            <div style={{ position:'relative', zIndex:1 }}>

              {/* Live badge */}
              <div style={{ display:'flex', justifyContent:'center', marginBottom:28 }}>
                <div className="cta-live-badge">
                  <span className="cta-pdot">
                    <span style={{ width:7, height:7, borderRadius:'50%', background:'#22c55e', display:'block', position:'relative', zIndex:1 }} />
                  </span>
                  Founders joining every day
                </div>
              </div>

              {/* Headline */}
              <h2 style={{
                fontFamily:'Cabinet Grotesk,sans-serif',
                fontSize:'clamp(2.2rem,5vw,3.4rem)', fontWeight:900,
                lineHeight:1.06, letterSpacing:'-.03em',
                color:'#fff', marginBottom:18,
              }}>
                Start Your Founder Journey Today
              </h2>

              <p style={{
                fontSize:'1.1rem', lineHeight:1.75, marginBottom:40,
                color:'rgba(226,217,243,.5)', maxWidth:480, margin:'0 auto 40px',
              }}>
                Find a compatible co-founder and build your startup with confidence.
              </p>

              {/* Buttons */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center', marginBottom:36 }}>
                <a href="#pricing" className="cta-btn-primary">
                  Create Free Profile <EastIcon sx={{ fontSize:16 }} />
                </a>
                <a href="#quiz" className="cta-btn-secondary">
                  <AssignmentOutlinedIcon sx={{ fontSize:16 }} />
                  Take Compatibility Test
                </a>
              </div>

              {/* Trust bar */}
              <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:24 }}>
                {['No credit card required', 'Free forever plan', '2,400+ founders'].map(item => (
                  <div key={item} className="cta-trust-item">
                    <div className="cta-trust-check">✓</div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}