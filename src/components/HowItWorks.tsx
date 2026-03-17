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
    accent: '#982598',
  },
  {
    step: '02', Icon: PeopleOutlineIcon, title: 'Founder Match',
    desc: 'Our algorithm surfaces the most compatible founders from our growing network.',
    items: ['Browse curated profiles', 'See compatibility scores', 'Start conversations', 'Schedule intro calls'],
    accent: '#15173D',
  },
  {
    step: '03', Icon: RocketLaunchOutlinedIcon, title: '90-Day Sprint',
    desc: 'Build together before committing. Validate the working relationship with real milestones.',
    items: ['Validate startup idea', 'Work on milestones', 'Track tasks together', 'Test working compatibility'],
    accent: '#7d1e7d',
  },
  {
    step: '04', Icon: GavelIcon, title: 'Legal Partnership',
    desc: 'Formalize your partnership with ready-to-use legal templates from startup lawyers.',
    items: ['Founder agreement', 'Equity split framework', 'NDA templates', 'Legal documentation'],
    accent: '#4a1580',
  },
]

export default function HowItWorks() {
  const header = useScrollReveal()
  const grid   = useScrollReveal()

  return (
    <section id="how-it-works" className="py-24 section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={header.ref} className={`text-center mb-14 reveal ${header.visible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold border"
            style={{ background: 'rgba(152,37,152,0.06)', borderColor: 'rgba(152,37,152,0.2)', color: '#982598' }}>
            The Process
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: '#15173D' }}>
            A Structured Way to Find<br />a Co-Founder
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Four proven phases from first contact to legal partnership.
          </p>
        </div>

        <div ref={grid.ref} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children ${grid.visible ? 'visible' : ''}`}>
          {steps.map(({ step, Icon, title, desc, items, accent }, i) => (
            <div key={step} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-11 -right-2.5 z-10">
                  <EastIcon sx={{ fontSize: 18, color: '#d1d5db' }} />
                </div>
              )}
              <div className="bg-white rounded-2xl p-6 h-full border border-gray-100 card-lift">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${accent}12` }}>
                    <Icon sx={{ fontSize: 20, color: accent }} />
                  </div>
                  <span className="text-2xl font-black" style={{ color: '#f3f4f6' }}>{step}</span>
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: '#15173D' }}>{title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">{desc}</p>
                <ul className="space-y-1.5">
                  {items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accent }} />
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
