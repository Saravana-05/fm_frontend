import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import GroupsIcon from '@mui/icons-material/Groups'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import StarRateIcon from '@mui/icons-material/StarRate'
import VerifiedIcon from '@mui/icons-material/Verified'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-white pt-16 overflow-hidden">
      {/* Subtle decorative blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-0 w-[480px] h-[480px] rounded-full opacity-[0.06]"
          style={{ background: '#982598', filter: 'blur(80px)' }} />
        <div className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full opacity-[0.05]"
          style={{ background: '#15173D', filter: 'blur(80px)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left ── */}
          <div>
            <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 border text-xs font-semibold"
              style={{ borderColor: 'rgba(152,37,152,0.25)', background: 'rgba(152,37,152,0.05)', color: '#982598' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Now in Beta · Free to Join
            </div>

            <h1 className="hero-title text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight mb-5"
              style={{ color: '#15173D' }}>
              Find the{' '}
              <span className="grad-text">Right Co-Founder</span>,{' '}
              Not Just Any Co-Founder
            </h1>

            <p className="hero-sub text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
              FounderMatch helps entrepreneurs discover compatible co-founders using a structured compatibility test, a 90-day collaboration sprint, and a legal partnership framework.
            </p>

            <div className="hero-cta flex flex-wrap gap-3 mb-12">
              <a href="#pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg"
                style={{ background: '#982598', boxShadow: '0 2px 12px rgba(152,37,152,0.28)' }}>
                Start Free <ArrowForwardIcon sx={{ fontSize: 17 }} />
              </a>
              <a href="#quiz"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border transition-all hover:bg-gray-50"
                style={{ color: '#15173D', borderColor: '#e5e7eb' }}>
                <PlayCircleOutlineIcon sx={{ fontSize: 17, color: '#982598' }} />
                Take Compatibility Test
              </a>
            </div>

            <div className="hero-stats flex flex-wrap gap-7">
              {[
                { Icon: GroupsIcon,   value: '2,400+', label: 'Founders Matched' },
                { Icon: TrendingUpIcon, value: '78%',   label: 'Partnership Success' },
                { Icon: StarRateIcon,  value: '4.9/5',  label: 'Founder Rating' },
              ].map(({ Icon, value, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'rgba(152,37,152,0.08)' }}>
                    <Icon sx={{ fontSize: 16, color: '#982598' }} />
                  </div>
                  <div>
                    <div className="text-base font-bold" style={{ color: '#15173D' }}>{value}</div>
                    <div className="text-xs text-gray-400">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right card ── */}
          <div className="hero-card hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md">

              {/* Main card */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-7 float">
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-base"
                    style={{ background: 'linear-gradient(135deg, #982598, #15173D)' }}>A</div>
                  <div className="flex-1">
                    <div className="font-bold text-sm" style={{ color: '#15173D' }}>Alex Chen</div>
                    <div className="text-xs text-gray-400">CTO · Fintech · Mumbai</div>
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{ background: 'rgba(152,37,152,0.08)', color: '#982598' }}>
                    <VerifiedIcon sx={{ fontSize: 12 }} /> 94%
                  </div>
                </div>

                {/* Bars */}
                {[
                  { label: 'Vision Alignment', pct: 96 },
                  { label: 'Work Style',        pct: 88 },
                  { label: 'Risk Tolerance',    pct: 92 },
                ].map(({ label, pct }) => (
                  <div key={label} className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">{label}</span>
                      <span className="font-semibold" style={{ color: '#982598' }}>{pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full progress-fill"
                        style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #982598, #c040c0)' }} />
                    </div>
                  </div>
                ))}

                <button className="w-full mt-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ background: '#982598' }}>
                  Connect with Alex →
                </button>
              </div>

              {/* Floating pill — top left */}
              <div className="absolute -top-5 -left-5 bg-white rounded-xl shadow-lg px-3.5 py-2.5 border border-gray-100 float-delay">
                <div className="flex items-center gap-2">
                  <span className="text-base">🎯</span>
                  <div>
                    <div className="text-xs font-bold" style={{ color: '#15173D' }}>Compatible Match</div>
                    <div className="text-xs text-gray-400">Sprint started</div>
                  </div>
                </div>
              </div>

              {/* Floating pill — bottom right */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-xl shadow-lg px-3.5 py-2.5 border border-gray-100 float">
                <div className="flex items-center gap-2">
                  <span className="text-base">⚖️</span>
                  <div>
                    <div className="text-xs font-bold" style={{ color: '#15173D' }}>Partnership Formed</div>
                    <div className="text-xs text-gray-400">Docs signed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
