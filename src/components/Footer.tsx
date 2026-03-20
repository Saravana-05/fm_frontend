import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import { useScrollReveal } from '../hooks/useScrollReveal'

const links = {
  Product: ['How It Works', 'Features', 'Pricing', 'Marketplace'],
  Company: ['About', 'Blog', 'Contact', 'Careers'],
  Legal:   ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&display=swap');

  .ft-root * { font-family:'Cabinet Grotesk',sans-serif; box-sizing:border-box; }

  @keyframes ft-fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ft-shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }

  .ft-reveal { opacity:0; }
  .ft-reveal.vis { animation:ft-fadeUp .7s cubic-bezier(.22,1,.36,1) both; }

  /* Logo mark */
  .ft-logo-mark {
    width:34px; height:34px; border-radius:10px; flex-shrink:0;
    background:linear-gradient(135deg,#0f0826,#1e0e3c,#3b1d78);
    display:flex; align-items:center; justify-content:center;
    border:1px solid rgba(59,29,120,.25);
    box-shadow:0 3px 12px rgba(15,8,38,.2);
    transition:transform .22s cubic-bezier(.22,1,.36,1), box-shadow .22s;
  }
  .ft-logo-mark:hover { transform:scale(1.08) rotate(-3deg); box-shadow:0 6px 18px rgba(15,8,38,.3); }

  /* Social icons */
  .ft-social {
    width:34px; height:34px; border-radius:9px;
    display:flex; align-items:center; justify-content:center;
    background:#fff; border:1px solid #e8e4f0;
    transition:all .22s cubic-bezier(.22,1,.36,1);
    text-decoration:none;
  }
  .ft-social:hover {
    background:#f0edf8; border-color:#c4b8e8;
    transform:translateY(-3px);
    box-shadow:0 6px 16px rgba(30,14,60,.12);
  }

  /* Nav links */
  .ft-link {
    font-size:13px; font-weight:500; color:#7c6fa0;
    text-decoration:none; display:block;
    transition:color .18s, transform .18s;
    padding:2px 0;
  }
  .ft-link:hover { color:#0f0826; transform:translateX(3px); }

  /* Top divider shimmer */
  .ft-divider {
    height:1px; width:100%; margin-bottom:48px;
    background:linear-gradient(90deg,transparent,#d4cce8 30%,#c4b8e8 50%,#d4cce8 70%,transparent);
    background-size:200% 100%;
    animation:ft-shimmer 4s linear infinite;
  }

  /* Bottom divider */
  .ft-bottom-divider {
    height:1px;
    background:linear-gradient(90deg,transparent,#e8e4f0,transparent);
    margin-bottom:24px;
  }

  /* Newsletter strip */
  .ft-newsletter {
    background:linear-gradient(135deg,#0f0826 0%,#1e0e3c 55%,#2d1b69 100%);
    border-radius:20px; padding:32px 36px;
    display:flex; align-items:center; justify-content:space-between; gap:24px; flex-wrap:wrap;
    margin-bottom:48px;
    border:1px solid #3b1d78;
    box-shadow:0 8px 32px rgba(15,8,38,.22);
    position:relative; overflow:hidden;
  }
  .ft-newsletter::before {
    content:''; position:absolute; top:0; left:0; right:0; height:2px;
    background:linear-gradient(90deg,transparent,#3b1d78 30%,#7c6fa0 70%,transparent);
    background-size:200% 100%; animation:ft-shimmer 3s linear infinite;
  }

  .ft-nl-input {
    flex:1; min-width:180px; padding:11px 16px; border-radius:10px;
    border:1px solid rgba(255,255,255,.1); background:rgba(255,255,255,.07);
    font-family:'Cabinet Grotesk',sans-serif; font-size:13px; font-weight:500;
    color:#e2d9f3; outline:none;
    transition:border-color .2s, background .2s;
  }
  .ft-nl-input::placeholder { color:rgba(226,217,243,.3); }
  .ft-nl-input:focus { border-color:rgba(196,184,232,.4); background:rgba(255,255,255,.1); }

  .ft-nl-btn {
    padding:11px 22px; border-radius:10px; border:none; cursor:pointer;
    font-family:'Cabinet Grotesk',sans-serif; font-size:13px; font-weight:800; color:#0f0826;
    background:linear-gradient(135deg,#e2d9f3,#f0edf8);
    box-shadow:0 3px 12px rgba(15,8,38,.2);
    transition:transform .2s, box-shadow .2s; white-space:nowrap;
  }
  .ft-nl-btn:hover { transform:translateY(-2px); box-shadow:0 6px 18px rgba(15,8,38,.3); }
`

export default function Footer() {
  const section = useScrollReveal()

  return (
    <footer className="ft-root" style={{ background:'#fff', borderTop:'1px solid #e8e4f0' }}>
      <style>{css}</style>

      <div ref={section.ref} className={`ft-reveal ${section.visible ? 'vis' : ''}`}
        style={{ maxWidth:1280, margin:'0 auto', padding:'56px 28px 32px' }}>

        {/* Newsletter strip */}
        <div className="ft-newsletter">
          <div>
            <div style={{ fontWeight:800, fontSize:16, color:'#fff', marginBottom:4 }}>
              Stay in the loop
            </div>
            <div style={{ fontSize:13, color:'rgba(226,217,243,.5)', fontWeight:500 }}>
              Founder tips, match insights, and platform updates.
            </div>
          </div>
          <div style={{ display:'flex', gap:8, flex:1, maxWidth:380 }}>
            <input className="ft-nl-input" type="email" placeholder="your@email.com" />
            <button className="ft-nl-btn">Subscribe →</button>
          </div>
        </div>

        {/* Top shimmer divider */}
        <div className="ft-divider" />

        {/* Main grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr', gap:40, marginBottom:48 }}>

          {/* Brand col */}
          <div>
            <a href="#" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none', marginBottom:16 }}>
              <div className="ft-logo-mark">
                <AutoAwesomeIcon sx={{ fontSize:15, color:'#e2d9f3' }} />
              </div>
              <span style={{ fontWeight:800, fontSize:17, letterSpacing:'-.02em', color:'#0f0826' }}>
                Founder<span style={{ color:'#3b1d78' }}>Match</span>
              </span>
            </a>
            <p style={{ fontSize:13, color:'#7c6fa0', lineHeight:1.75, marginBottom:20, maxWidth:240 }}>
              Helping founders build compatible partnerships through structure, trust, and legal clarity.
            </p>
            <div style={{ display:'flex', gap:8 }}>
              {[LinkedInIcon, TwitterIcon].map((Icon, i) => (
                <a key={i} href="#" className="ft-social">
                  <Icon sx={{ fontSize:15, color:'#1e0e3c' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div style={{ fontSize:11, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase', color:'#0f0826', marginBottom:18 }}>
                {category}
              </div>
              <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:10 }}>
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="ft-link">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="ft-bottom-divider" />
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
          <p style={{ fontSize:12, color:'#c4b8e8', fontWeight:500 }}>
            © {new Date().getFullYear()} FounderMatch. All rights reserved.
          </p>
          <p style={{ fontSize:12, color:'#c4b8e8', fontWeight:500 }}>
            Built for founders, by founders. 🚀
          </p>
        </div>

      </div>
    </footer>
  )
}