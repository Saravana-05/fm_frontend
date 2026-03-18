import { useState } from 'react'
import { useNav } from '../components/Context/NavigationContext'
import { authApi, tokenStorage, type ApiError } from '../admin/services/authService'

/* ── Icons ── */
const LogoMark = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="10" fill="#982598" />
    <path d="M8 16 Q12 10 16 14 Q20 18 24 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <circle cx="16" cy="22" r="2.5" fill="white" opacity="0.7" />
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

// ─── Types ───────────────────────────────────────────────────
interface FormErrors {
  name?: string
  email?: string
  password?: string
  global?: string
}

// ─── Main component ───────────────────────────────────────────
export default function LoginPage() {
  const { setView } = useNav()

  const [tab, setTab]           = useState<'login' | 'signup'>('login')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [name, setName]         = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [errors, setErrors]     = useState<FormErrors>({})

  // ── Client-side validation ──
  const validate = (): FormErrors => {
    const e: FormErrors = {}
    if (!email)                            e.email    = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(email)) e.email    = 'Enter a valid email'
    if (!password)                         e.password = 'Password is required'
    else if (password.length < 6)          e.password = 'Minimum 6 characters'
    if (tab === 'signup' && !name.trim())  e.name     = 'Full name is required'
    return e
  }

  // ── Map backend field errors → FormErrors ──
  const applyServerErrors = (err: ApiError) => {
    const next: FormErrors = {}
    if (err.errors) {
      if (err.errors.email)    next.email    = err.errors.email[0]
      if (err.errors.password) next.password = err.errors.password[0]
      if (err.errors.name)     next.name     = err.errors.name[0]
    }
    if (!Object.keys(next).length) next.global = err.message
    setErrors(next)
  }

  // ── Submit ──
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
        setView('admin')                         // ← go to dashboard
      } else {
        setTab('login')                          // ← switch to login tab
        setName('')
        setEmail('')
        setPassword('')
        setErrors({ global: '✅ Account created! Please log in.' })
      }

    } catch (err) {
      applyServerErrors(err as ApiError)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) handleSubmit()
  }

  const switchTab = (t: 'login' | 'signup') => { setTab(t); setErrors({}) }

  return (
    <div className="min-h-screen flex">

      {/* ── Left branding panel ── */}
      <div className="hidden lg:flex flex-col justify-center flex-1 px-16 py-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #15173D 0%, #2a2d5e 60%, #6e1a6e 100%)' }}>

        {([[-60, -60, 260], [260, 200, 180], [-40, 350, 120]] as number[][]).map(([x, y, r], i) => (
          <div key={i} className="absolute rounded-full pointer-events-none"
            style={{ left: x, top: y, width: r, height: r, border: '1px solid rgba(255,255,255,0.08)' }} />
        ))}

        <div className="flex items-center gap-3 cursor-pointer mb-16" onClick={() => setView('landing')}>
          <LogoMark size={36} />
          <span className="font-bold text-2xl" style={{ color: 'white', fontFamily: "'Syne', sans-serif" }}>
            Founder<span style={{ color: '#c44ec4' }}>Match</span>
          </span>
        </div>

        <div className="max-w-sm">
          <h2 className="font-extrabold text-5xl leading-tight text-white mb-5"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Your next<br />
            <span style={{ color: '#c44ec4' }}>co-founder</span><br />
            is waiting.
          </h2>
          <p className="text-base leading-relaxed mb-12" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Join 2,400+ entrepreneurs who found their perfect co-founder through
            structured compatibility testing.
          </p>
          <div className="rounded-2xl p-6"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.85)' }}>
              "FounderMatch didn't just connect us — it validated our compatibility
              before we signed anything. 18 months in, still going strong."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #982598, #c44ec4)' }}>P</div>
              <div>
                <div className="text-white text-sm font-semibold">Priya Sharma</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>CEO, NovaTech · Bangalore</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50">

        {/* Mobile logo */}
        <div className="flex lg:hidden items-center gap-2 mb-8 cursor-pointer" onClick={() => setView('landing')}>
          <LogoMark size={28} />
          <span className="font-bold text-lg" style={{ color: '#15173D' }}>
            Founder<span style={{ color: '#982598' }}>Match</span>
          </span>
        </div>

        <div className="bg-white rounded-3xl w-full max-w-md p-10"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>

          {/* Tab switcher */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
            {(['login', 'signup'] as const).map(t => (
              <button key={t} onClick={() => switchTab(t)}
                className="flex-1 py-2.5 rounded-[10px] text-sm font-semibold transition-all"
                style={{
                  background: tab === t ? 'white' : 'transparent',
                  color: tab === t ? '#15173D' : '#6b7280',
                  boxShadow: tab === t ? '0 1px 6px rgba(0,0,0,0.1)' : 'none',
                  border: 'none', cursor: 'pointer',
                }}>
                {t === 'login' ? 'Log In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <h2 className="font-extrabold text-2xl mb-1" style={{ color: '#15173D', fontFamily: "'Syne',sans-serif" }}>
            {tab === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-sm text-gray-500 mb-7">
            {tab === 'login'
              ? 'Sign in to continue finding your co-founder'
              : 'Start your co-founder journey for free'}
          </p>

          {/* ── Global server error / success banner ── */}
          {errors.global && (
            <div className="flex items-start gap-2 rounded-xl px-4 py-3 mb-5 text-sm"
              style={{
                background: errors.global.startsWith('✅') ? '#f0fdf4' : '#fef2f2',
                border: `1px solid ${errors.global.startsWith('✅') ? '#bbf7d0' : '#fecaca'}`,
                color: errors.global.startsWith('✅') ? '#16a34a' : '#dc2626'
              }}>
              <span>{errors.global}</span>
            </div>
          )}

          {/* Social buttons */}
          <div className="flex gap-3 mb-5">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 transition-all">
              <GoogleIcon /> Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 transition-all">
              <LinkedInIcon /> LinkedIn
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or continue with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* ── Form fields ── */}
          <div className="flex flex-col gap-4" onKeyDown={handleKeyDown}>

            {tab === 'signup' && (
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: '#15173D' }}>Full Name</label>
                <input
                  className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-purple-100"
                  style={{ borderColor: errors.name ? '#f87171' : '#e5e7eb' }}
                  placeholder="e.g. Rahul Mehta"
                  value={name}
                  onChange={e => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })) }}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">⚠ {errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: '#15173D' }}>Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-purple-100"
                style={{ borderColor: errors.email ? '#f87171' : '#e5e7eb' }}
                placeholder="you@startup.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined, global: undefined })) }}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">⚠ {errors.email}</p>}
            </div>

            <div>
              <div className="flex justify-between mb-1.5">
                <label className="text-sm font-medium" style={{ color: '#15173D' }}>Password</label>
                {tab === 'login' && (
                  <a href="#" className="text-xs font-medium" style={{ color: '#982598' }}>Forgot password?</a>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  className="w-full px-4 py-3 pr-16 rounded-xl border text-sm outline-none transition-all focus:ring-2 focus:ring-purple-100"
                  style={{ borderColor: errors.password ? '#f87171' : '#e5e7eb' }}
                  placeholder={tab === 'login' ? 'Enter your password' : 'Min. 6 characters'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined, global: undefined })) }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer"
                >
                  {showPw ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">⚠ {errors.password}</p>}
            </div>

            {tab === 'signup' && (
              <div className="rounded-xl p-3 text-xs leading-relaxed"
                style={{ background: '#fdf4ff', border: '1px solid #f0d0f0', color: '#6e1a6e' }}>
                🔒 By signing up, you agree to our{' '}
                <a href="#" style={{ color: '#982598', fontWeight: 600 }}>Terms</a> and{' '}
                <a href="#" style={{ color: '#982598', fontWeight: 600 }}>Privacy Policy</a>
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all mt-1 flex items-center justify-center gap-2"
              style={{ background: '#982598', opacity: loading ? 0.8 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading
                ? <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    {tab === 'login' ? 'Signing in…' : 'Creating account…'}
                  </>
                : tab === 'login' ? 'Sign In →' : 'Create Account →'
              }
            </button>
          </div>

          {/* Switch tab */}
          <p className="text-center mt-6 text-sm text-gray-500">
            {tab === 'login'
              ? <>Don't have an account?{' '}
                  <button onClick={() => switchTab('signup')}
                    className="font-semibold bg-transparent border-none cursor-pointer text-sm"
                    style={{ color: '#982598' }}>Sign up free</button>
                </>
              : <>Already have an account?{' '}
                  <button onClick={() => switchTab('login')}
                    className="font-semibold bg-transparent border-none cursor-pointer text-sm"
                    style={{ color: '#982598' }}>Log in</button>
                </>
            }
          </p>
        </div>
      </div>
    </div>
  )
}