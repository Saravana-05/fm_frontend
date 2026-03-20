import { useState } from 'react'
import { useNav } from '../components/Context/NavigationContext'
import { authApi, tokenStorage } from '../admin/services/authService'

/* ── Icons ── */
const LogoMark = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="10" fill="url(#lm-grad)" />
    <defs>
      <linearGradient id="lm-grad" x1="0" y1="0" x2="32" y2="32">
        <stop offset="0%" stopColor="#0f0826" />
        <stop offset="100%" stopColor="#3b1d78" />
      </linearGradient>
    </defs>
    <path d="M8 16 Q12 10 16 14 Q20 18 24 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <circle cx="16" cy="22" r="2.5" fill="white" opacity="0.6" />
  </svg>
)

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0077B5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

  .lp-root * { font-family:'Cabinet Grotesk',sans-serif; box-sizing:border-box; }

  @keyframes lp-shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes lp-gradShift{ 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
  @keyframes lp-float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes lp-spin     { to{transform:rotate(360deg)} }
  @keyframes lp-fadeIn   { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
  @keyframes lp-grain {
    0%,100%{transform:translate(0,0)} 20%{transform:translate(-2%,-2%)}
    40%{transform:translate(2%,1%)}   60%{transform:translate(-1%,3%)}
    80%{transform:translate(3%,-1%)}
  }

  /* Left panel */
  .lp-left {
    background:linear-gradient(160deg,#0f0826 0%,#1e0e3c 50%,#2d1b69 100%);
    position:relative; overflow:hidden;
  }
  .lp-left::before {
    content:''; position:absolute; top:0; left:0; right:0; height:2px;
    background:linear-gradient(90deg,transparent,#3b1d78 30%,#7c6fa0 70%,transparent);
    background-size:200% 100%; animation:lp-shimmer 3s linear infinite;
  }

  .lp-grain {
    position:absolute; inset:-50%; width:200%; height:200%; pointer-events:none; z-index:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    opacity:.025; animation:lp-grain 9s steps(10) infinite;
  }

  /* Testimonial card */
  .lp-testimonial {
    background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1);
    border-radius:20px; padding:24px; backdrop-filter:blur(8px);
    transition:transform .3s, box-shadow .3s;
  }
  .lp-testimonial:hover { transform:translateY(-4px); box-shadow:0 12px 32px rgba(0,0,0,.25); }

  /* Right panel */
  .lp-right { background:#faf8ff; }

  /* Tab switcher */
  .lp-tabs {
    display:flex; background:#f0edf8; border-radius:14px; padding:4px; margin-bottom:28px;
    border:1px solid #e8e4f0;
  }
  .lp-tab {
    flex:1; padding:10px; border-radius:10px; border:none; cursor:pointer;
    font-family:'Cabinet Grotesk',sans-serif; font-size:13px; font-weight:700;
    transition:all .2s;
  }
  .lp-tab-active {
    background:#fff; color:#0f0826;
    box-shadow:0 2px 8px rgba(30,14,60,.1), 0 1px 0 rgba(255,255,255,.8);
  }
  .lp-tab-inactive { background:transparent; color:#7c6fa0; }

  /* Form card */
  .lp-form-card {
    background:#fff; border-radius:24px; padding:40px;
    border:1px solid #d4cce8;
    box-shadow:0 2px 0 #f0edf8, 0 20px 56px rgba(30,14,60,.09), 0 4px 16px rgba(0,0,0,.04);
    width:100%; max-width:440px;
    animation:lp-fadeIn .5s cubic-bezier(.22,1,.36,1) both;
  }

  /* Social buttons */
  .lp-social-btn {
    flex:1; display:flex; align-items:center; justify-content:center; gap:8px;
    padding:11px; border-radius:12px; border:1.5px solid #d4cce8; background:#fff;
    font-family:'Cabinet Grotesk',sans-serif; font-size:13px; font-weight:700; color:#0f0826;
    cursor:pointer; transition:all .2s;
  }
  .lp-social-btn:hover { background:#f8f6ff; border-color:#3b1d78; }

  /* Input */
  .lp-input {
    width:100%; padding:12px 16px; border-radius:12px;
    font-family:'Cabinet Grotesk',sans-serif; font-size:14px; color:#0f0826;
    border:1.5px solid #d4cce8; background:#fff; outline:none;
    transition:border-color .2s, box-shadow .2s;
  }
  .lp-input::placeholder { color:#c4b8e8; }
  .lp-input:focus { border-color:#1e0e3c; box-shadow:0 0 0 3px rgba(30,14,60,.07); }
  .lp-input-error { border-color:#f87171!important; }

  /* Submit button */
  .lp-submit-btn {
    width:100%; padding:13px; border-radius:12px; border:none; cursor:pointer;
    font-family:'Cabinet Grotesk',sans-serif; font-size:14px; font-weight:800; color:#e2d9f3;
    background:linear-gradient(135deg,#0f0826,#1e0e3c 55%,#2d1b69);
    box-shadow:0 4px 18px rgba(15,8,38,.28), inset 0 1px 0 rgba(255,255,255,.08);
    transition:transform .2s, box-shadow .2s, opacity .2s;
    display:flex; align-items:center; justify-content:center; gap:8px;
    position:relative; overflow:hidden;
  }
  .lp-submit-btn::before {
    content:''; position:absolute; top:0; left:-90%; width:55%; height:100%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);
    transform:skewX(-15deg); transition:left .42s ease;
  }
  .lp-submit-btn:hover:not(:disabled)::before { left:140%; }
  .lp-submit-btn:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 10px 28px rgba(15,8,38,.38)!important; }
  .lp-submit-btn:disabled { opacity:.7; cursor:not-allowed; }

  /* Forgot / switch links */
  .lp-accent-link {
    color:#1e0e3c; font-weight:700; font-size:12px; text-decoration:none;
    transition:color .18s;
  }
  .lp-accent-link:hover { color:#3b1d78; }
  .lp-switch-btn {
    color:#1e0e3c; font-weight:800; font-size:14px; background:none; border:none; cursor:pointer;
    transition:color .18s; padding:0;
  }
  .lp-switch-btn:hover { color:#3b1d78; }

  /* Terms notice */
  .lp-terms {
    border-radius:12px; padding:12px 14px; font-size:12px; line-height:1.6;
    background:#f8f6ff; border:1px solid #e8e4f0; color:#5a4f7a;
  }

  /* Divider */
  .lp-divider {
    display:flex; align-items:center; gap:12px; margin:18px 0;
  }
  .lp-divider-line { flex:1; height:1px; background:#e8e4f0; }
  .lp-divider-text { font-size:12px; color:#7c6fa0; font-weight:500; white-space:nowrap; }
`

export default function LoginPage() {
  const { setView } = useNav()

  const [tab, setTab]           = useState('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [name, setName]         = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [errors, setErrors]     = useState({})

  const validate = () => {
    const e = {}
    if (!email)                            e.email    = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email    = 'Enter a valid email'
    if (!password)                         e.password = 'Password is required'
    else if (password.length < 6)          e.password = 'Minimum 6 characters'
    if (tab === 'signup' && !name.trim())  e.name     = 'Full name is required'
    return e
  }

  const applyServerErrors = (err) => {
    const next = {}
    if (err.errors) {
      if (err.errors.email)    next.email    = err.errors.email[0]
      if (err.errors.password) next.password = err.errors.password[0]
      if (err.errors.name)     next.name     = err.errors.name[0]
    }
    if (!Object.keys(next).length) next.global = err.message
    setErrors(next)
  }

  const handleSubmit = async () => {
    const clientErrors = validate()
    if (Object.keys(clientErrors).length) { setErrors(clientErrors); return }
    setErrors({})
    setLoading(true)
    try {
      const res = tab === 'login'
        ? await authApi.login({ email, password })
        : await authApi.register({ name, email, password })
      tokenStorage.set(res.token)
      if (tab === 'login') {
        setView('admin')
      } else {
        setTab('login'); setName(''); setEmail(''); setPassword('')
        setErrors({ global: '✅ Account created! Please log in.' })
      }
    } catch (err) {
      applyServerErrors(err)
    } finally {
      setLoading(false)
    }
  }

  const switchTab = (t) => { setTab(t); setErrors({}) }

  return (
    <div className="lp-root" style={{ minHeight:'100vh', display:'flex' }}>
      <style>{css}</style>

      {/* ── Left branding panel ── */}
      <div className="lp-left" style={{ flex:1, display:'none', flexDirection:'column', justifyContent:'center', padding:'64px', position:'relative' }}
        /* show on lg */ >
        <style>{`.lp-left{display:none} @media(min-width:1024px){.lp-left{display:flex!important}}`}</style>
        <div className="lp-grain" />

        {/* Decorative rings */}
        {[[-60,-60,260],[260,200,180],[-40,350,120]].map(([x,y,r],i) => (
          <div key={i} style={{
            position:'absolute', left:x, top:y, width:r, height:r, borderRadius:'50%',
            border:'1px solid rgba(255,255,255,.06)', pointerEvents:'none',
          }} />
        ))}

        <div style={{ position:'relative', zIndex:1 }}>
          {/* Logo */}
          <div onClick={() => setView('landing')} style={{ display:'flex', alignItems:'center', gap:12, cursor:'pointer', marginBottom:64 }}>
            <LogoMark size={38} />
            <span style={{ fontFamily:'Cabinet Grotesk,sans-serif', fontWeight:900, fontSize:22, color:'#fff', letterSpacing:'-.02em' }}>
              Founder<span style={{ color:'#7c6fa0' }}>Match</span>
            </span>
          </div>

          {/* Headline */}
          <div style={{ maxWidth:360, marginBottom:48 }}>
            <h2 style={{ fontFamily:'Cabinet Grotesk,sans-serif', fontWeight:900, fontSize:'clamp(2.2rem,3.5vw,3rem)', lineHeight:1.05, color:'#fff', marginBottom:20, letterSpacing:'-.03em' }}>
              Your next<br />
              <span style={{ fontFamily:'Instrument Serif,serif', fontStyle:'italic', fontWeight:400, color:'#c4b8e8' }}>co-founder</span><br />
              is waiting.
            </h2>
            <p style={{ fontSize:15, lineHeight:1.75, color:'rgba(226,217,243,.5)' }}>
              Join 2,400+ entrepreneurs who found their perfect co-founder through structured compatibility testing.
            </p>
          </div>

          {/* Testimonial card */}
          <div className="lp-testimonial">
            <p style={{ fontSize:14, lineHeight:1.75, marginBottom:18, color:'rgba(226,217,243,.8)', fontStyle:'italic' }}>
              "FounderMatch didn't just connect us — it validated our compatibility before we signed anything. 18 months in, still going strong."
            </p>
            <div style={{ display:'flex', alignItems:'center', gap:12 }}>
              <div style={{
                width:38, height:38, borderRadius:11, flexShrink:0,
                background:'linear-gradient(135deg,#1e0e3c,#3b1d78)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontWeight:800, fontSize:14, color:'#e2d9f3',
                border:'1px solid rgba(255,255,255,.1)',
              }}>P</div>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:'#fff' }}>Priya Sharma</div>
                <div style={{ fontSize:11, color:'rgba(226,217,243,.4)', marginTop:2 }}>CEO, NovaTech · Bangalore</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="lp-right" style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:32 }}>

        {/* Mobile logo */}
        <div onClick={() => setView('landing')} style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', marginBottom:28 }}
          className="lp-mobile-logo">
          <style>{`@media(min-width:1024px){.lp-mobile-logo{display:none!important}}`}</style>
          <LogoMark size={30} />
          <span style={{ fontFamily:'Cabinet Grotesk,sans-serif', fontWeight:900, fontSize:18, color:'#0f0826', letterSpacing:'-.02em' }}>
            Founder<span style={{ color:'#3b1d78' }}>Match</span>
          </span>
        </div>

        <div className="lp-form-card">

          {/* Tab switcher */}
          <div className="lp-tabs">
            {['login','signup'].map(t => (
              <button key={t} className={`lp-tab ${tab === t ? 'lp-tab-active' : 'lp-tab-inactive'}`}
                onClick={() => switchTab(t)}>
                {t === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <h2 style={{ fontFamily:'Cabinet Grotesk,sans-serif', fontWeight:900, fontSize:'1.5rem', marginBottom:4, color:'#0f0826', letterSpacing:'-.02em' }}>
            {tab === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p style={{ fontSize:13, color:'#7c6fa0', marginBottom:22 }}>
            {tab === 'login' ? 'Sign in to continue finding your co-founder' : 'Start your co-founder journey for free'}
          </p>

          {/* Global error/success banner */}
          {errors.global && (
            <div style={{
              display:'flex', alignItems:'flex-start', gap:8,
              borderRadius:12, padding:'11px 14px', marginBottom:18, fontSize:13,
              background: errors.global.startsWith('✅') ? '#f0fdf4' : '#fef8f8',
              border: `1px solid ${errors.global.startsWith('✅') ? '#bbf7d0' : '#fecaca'}`,
              color: errors.global.startsWith('✅') ? '#16a34a' : '#dc2626',
            }}>
              {errors.global}
            </div>
          )}

          {/* Social buttons */}
          <div style={{ display:'flex', gap:10, marginBottom:18 }}>
            <button className="lp-social-btn"><GoogleIcon /> Google</button>
            <button className="lp-social-btn"><LinkedInIcon /> LinkedIn</button>
          </div>

          {/* Divider */}
          <div className="lp-divider">
            <div className="lp-divider-line" />
            <span className="lp-divider-text">or continue with email</span>
            <div className="lp-divider-line" />
          </div>

          {/* Form fields */}
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

            {tab === 'signup' && (
              <div>
                <label style={{ display:'block', fontSize:13, fontWeight:700, color:'#0f0826', marginBottom:7 }}>Full Name</label>
                <input className={`lp-input ${errors.name ? 'lp-input-error' : ''}`}
                  placeholder="e.g. Rahul Mehta" value={name}
                  onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })) }}
                />
                {errors.name && <p style={{ color:'#dc2626', fontSize:11, marginTop:5, fontWeight:600 }}>⚠ {errors.name}</p>}
              </div>
            )}

            <div>
              <label style={{ display:'block', fontSize:13, fontWeight:700, color:'#0f0826', marginBottom:7 }}>Email Address</label>
              <input className={`lp-input ${errors.email ? 'lp-input-error' : ''}`}
                type="email" placeholder="you@startup.com" value={email}
                onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined, global: undefined })) }}
              />
              {errors.email && <p style={{ color:'#dc2626', fontSize:11, marginTop:5, fontWeight:600 }}>⚠ {errors.email}</p>}
            </div>

            <div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:7 }}>
                <label style={{ fontSize:13, fontWeight:700, color:'#0f0826' }}>Password</label>
                {tab === 'login' && <a href="#" className="lp-accent-link">Forgot password?</a>}
              </div>
              <div style={{ position:'relative' }}>
                <input className={`lp-input ${errors.password ? 'lp-input-error' : ''}`}
                  style={{ paddingRight:64 }}
                  type={showPw ? 'text' : 'password'}
                  placeholder={tab === 'login' ? 'Enter your password' : 'Min. 6 characters'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined, global: undefined })) }}
                  onKeyDown={e => { if (e.key === 'Enter' && !loading) handleSubmit() }}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{
                  position:'absolute', right:14, top:'50%', transform:'translateY(-50%)',
                  fontSize:11, fontWeight:700, color:'#7c6fa0', background:'none', border:'none', cursor:'pointer',
                }}>
                  {showPw ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p style={{ color:'#dc2626', fontSize:11, marginTop:5, fontWeight:600 }}>⚠ {errors.password}</p>}
            </div>

            {tab === 'signup' && (
              <div className="lp-terms">
                🔒 By signing up, you agree to our{' '}
                <a href="#" className="lp-accent-link">Terms</a> and{' '}
                <a href="#" className="lp-accent-link">Privacy Policy</a>
              </div>
            )}

            <button className="lp-submit-btn" onClick={handleSubmit} disabled={loading} style={{ marginTop:4 }}>
              {loading ? (
                <>
                  <span style={{ width:16, height:16, border:'2px solid rgba(226,217,243,.3)', borderTopColor:'#e2d9f3', borderRadius:'50%', animation:'lp-spin .7s linear infinite', flexShrink:0 }} />
                  {tab === 'login' ? 'Signing in…' : 'Creating account…'}
                </>
              ) : (
                tab === 'login' ? 'Sign In →' : 'Create Account →'
              )}
            </button>
          </div>

          {/* Switch tab */}
          <p style={{ textAlign:'center', marginTop:22, fontSize:14, color:'#7c6fa0' }}>
            {tab === 'login'
              ? <>Don't have an account?{' '}<button className="lp-switch-btn" onClick={() => switchTab('signup')}>Sign up free</button></>
              : <>Already have an account?{' '}<button className="lp-switch-btn" onClick={() => switchTab('login')}>Log in</button></>
            }
          </p>
        </div>
      </div>
    </div>
  )
}