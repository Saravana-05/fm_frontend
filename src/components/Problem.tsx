import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import { useScrollReveal } from '../hooks/useScrollReveal'

const problems = [
  { emoji: '🎯', title: 'Misaligned Vision',    desc: 'Founders disagree on direction and long-term goals within months of starting.' },
  { emoji: '⚡', title: 'Work Style Conflicts', desc: 'Different work rhythms and communication styles create daily friction.' },
  { emoji: '🔥', title: 'Commitment Gaps',      desc: 'Unequal effort and dedication breeds resentment and eventual collapse.' },
  { emoji: '🎲', title: 'Risk Mismatch',        desc: 'One founder plays it safe while the other wants to bet the company.' },
  { emoji: '👑', title: 'Leadership Clashes',   desc: 'Power struggles over decisions stall execution at the worst moments.' },
]

const stats = [
  { value: '65%', label: 'of startups fail due to co-founder conflict' },
  { value: '23%', label: 'chose partners without any structured vetting' },
  { value: '3×',  label: 'more likely to succeed with a compatible match' },
]

export default function Problem() {
  const header   = useScrollReveal()
  const statsRow = useScrollReveal()
  const cards    = useScrollReveal()

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={header.ref} className={`text-center mb-14 reveal ${header.visible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold border"
            style={{ background: 'rgba(239,68,68,0.05)', borderColor: 'rgba(239,68,68,0.15)', color: '#dc2626' }}>
            <ReportProblemOutlinedIcon sx={{ fontSize: 13 }} />
            The Hard Truth
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: '#15173D' }}>
            Why Most Founder Partnerships Fail
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Founders often choose partners based on convenience, not compatibility — leading to conflict, collapse, and wasted years.
          </p>
        </div>

        {/* Stats */}
        <div ref={statsRow.ref} className={`grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 stagger-children ${statsRow.visible ? 'visible' : ''}`}>
          {stats.map(({ value, label }) => (
            <div key={label} className="text-center py-8 px-6 rounded-2xl border"
              style={{ background: '#fef2f2', borderColor: '#fee2e2' }}>
              <div className="text-4xl font-extrabold mb-1.5" style={{ color: '#dc2626' }}>{value}</div>
              <div className="text-sm text-gray-600">{label}</div>
            </div>
          ))}
        </div>

        {/* Problem cards */}
        <div ref={cards.ref} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 stagger-children ${cards.visible ? 'visible' : ''}`}>
          {problems.map(({ emoji, title, desc }) => (
            <div key={title}
              className="relative bg-white border border-gray-100 rounded-2xl p-5 group card-lift hover:border-red-100 transition-all">
              <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <CancelOutlinedIcon sx={{ fontSize: 15, color: '#f87171' }} />
              </div>
              <div className="text-2xl mb-3">{emoji}</div>
              <div className="font-semibold text-sm mb-1.5" style={{ color: '#15173D' }}>{title}</div>
              <div className="text-xs text-gray-400 leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-gray-400 text-sm">
          FounderMatch was built to fix this —{' '}
          <a href="#how-it-works" className="font-semibold hover:underline" style={{ color: '#982598' }}>
            see how →
          </a>
        </p>
      </div>
    </section>
  )
}
