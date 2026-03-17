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
  },
  {
    Icon: ManageAccountsOutlinedIcon, title: 'Founder Profiles', subtitle: 'Startup-Focused', tag: 'Profiles',
    desc: "Show your startup stage, what you're building, your skills, and exactly what you need in a partner.",
    items: ['Startup & role context', 'Skills & expertise', 'Partner preferences'],
  },
  {
    Icon: TaskAltIcon, title: 'Collaboration Sprint', subtitle: '90-Day Trial', tag: 'Sprint',
    desc: 'Milestone tracking, shared task boards, and a conflict resolution guide for working partners.',
    items: ['Milestone tracker', 'Shared task board', 'Conflict resolution guide'],
  },
  {
    Icon: ArticleOutlinedIcon, title: 'Legal Infrastructure', subtitle: 'Ready-to-Use Docs', tag: 'Legal',
    desc: 'Founder agreements, equity calculators, and NDA templates prepared by startup lawyers.',
    items: ['Founder agreement', 'Equity split calculator', 'NDA & partnership docs'],
  },
  {
    Icon: Diversity3OutlinedIcon, title: 'Startup Community', subtitle: 'Network & Talent', tag: 'Community',
    desc: 'Mentors, startup lawyers, and technical freelancers to plug gaps and accelerate your company.',
    items: ['Mentor network', 'Legal advisor access', 'Startup freelancers'],
  },
]

export default function Features() {
  const header = useScrollReveal()
  const grid   = useScrollReveal()

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={header.ref} className={`text-center mb-14 reveal ${header.visible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold border"
            style={{ background: 'rgba(152,37,152,0.06)', borderColor: 'rgba(152,37,152,0.2)', color: '#982598' }}>
            Platform Features
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: '#15173D' }}>
            Everything You Need to Build a{' '}
            <span className="grad-text">Founder Partnership</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            From compatibility testing to legal paperwork — all in one platform.
          </p>
        </div>

        <div ref={grid.ref} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children ${grid.visible ? 'visible' : ''}`}>
          {features.map(({ Icon, title, subtitle, desc, tag, items }) => (
            <div key={title}
              className="bg-white border border-gray-100 rounded-2xl p-6 card-lift hover:border-purple-100 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(152,37,152,0.08)' }}>
                  <Icon sx={{ fontSize: 20, color: '#982598' }} />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(152,37,152,0.06)', color: '#982598' }}>
                  {tag}
                </span>
              </div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{subtitle}</p>
              <h3 className="text-base font-bold mb-2" style={{ color: '#15173D' }}>{title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">{desc}</p>
              <ul className="space-y-1.5">
                {items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircleOutlinedIcon sx={{ fontSize: 14, color: '#982598', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
