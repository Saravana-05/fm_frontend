import CheckIcon from '@mui/icons-material/Check'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import { useScrollReveal } from '../hooks/useScrollReveal'

const plans = [
  {
    name: 'Free', price: '$0', period: 'forever',
    desc: 'Explore the platform at no cost.',
    cta: 'Get Started', highlight: false, badge: null,
    features: ['Create founder profile', 'Browse founders', '5 matches / month', 'Basic messaging', 'Basic compatibility score'],
  },
  {
    name: 'Gold Match', price: '$15', period: '/month', altPrice: 'or $99 / year',
    desc: 'For founders actively searching for a partner.',
    cta: 'Start Gold Match', highlight: true, badge: 'Most Popular',
    features: ['Unlimited founder discovery', 'Advanced compatibility test', 'Unlimited matches', 'See who liked you', 'Priority visibility', 'Full messaging & calls'],
  },
  {
    name: 'Founder Sprint', price: '$49', period: '/month', altPrice: 'or $120 for 90-day sprint',
    desc: 'For matched founders ready to collaborate.',
    cta: 'Start Sprint', highlight: false, badge: null,
    features: ['90-day collaboration sprint', 'Milestone tracker', 'Founder collab tools', 'Conflict resolution', 'Mentor recommendations'],
  },
  {
    name: 'Legal Partnership', price: '$199', period: 'one-time',
    desc: 'Formalize your co-founder agreement.',
    cta: 'Formalize Partnership', highlight: false, badge: 'One-Time',
    features: ['Founder agreement template', 'Equity split agreement', 'NDA templates', 'Legal partnership docs'],
  },
]

export default function Pricing() {
  const header = useScrollReveal()
  const cards  = useScrollReveal()

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={header.ref} className={`text-center mb-14 reveal ${header.visible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold border"
            style={{ background: 'rgba(152,37,152,0.06)', borderColor: 'rgba(152,37,152,0.2)', color: '#982598' }}>
            Pricing
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-3" style={{ color: '#15173D' }}>
            Simple Pricing for Founders
          </h2>
          <p className="text-lg text-gray-400">Start free and upgrade when you find the right co-founder.</p>
        </div>

        <div ref={cards.ref} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start stagger-children ${cards.visible ? 'visible' : ''}`}>
          {plans.map(({ name, price, period, altPrice, desc, cta, highlight, badge, features }) => (
            <div key={name}
              className={`relative rounded-2xl p-6 border transition-all ${
                highlight ? '' : 'bg-white border-gray-100 hover:shadow-md hover:border-gray-200'
              }`}
              style={highlight ? {
                background: 'linear-gradient(160deg, #15173D 0%, #2b1245 100%)',
                borderColor: '#982598',
                boxShadow: '0 8px 40px rgba(152,37,152,0.22)',
                transform: 'scale(1.025)',
              } : {}}>

              {badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-full"
                    style={{ background: '#982598', color: '#fff' }}>
                    {highlight && <WorkspacePremiumOutlinedIcon sx={{ fontSize: 11 }} />}
                    {badge}
                  </span>
                </div>
              )}

              <div className={badge ? 'pt-2' : ''}>
                <div className="text-xs font-semibold mb-1" style={{ color: highlight ? 'rgba(255,255,255,0.5)' : '#9ca3af' }}>
                  {name}
                </div>
                <div className="flex items-baseline gap-1 mb-0.5">
                  <span className="text-4xl font-extrabold" style={{ color: highlight ? '#fff' : '#15173D' }}>
                    {price}
                  </span>
                  <span className="text-sm" style={{ color: highlight ? 'rgba(255,255,255,0.4)' : '#9ca3af' }}>
                    {period}
                  </span>
                </div>
                {altPrice && (
                  <p className="text-xs mb-3" style={{ color: highlight ? 'rgba(255,255,255,0.35)' : '#c4b5c4' }}>
                    {altPrice}
                  </p>
                )}
                <p className="text-xs mb-5" style={{ color: highlight ? 'rgba(255,255,255,0.55)' : '#9ca3af' }}>
                  {desc}
                </p>

                <a href="#"
                  className="block w-full py-2.5 rounded-xl text-sm font-semibold text-center transition-all mb-5 hover:opacity-90"
                  style={highlight
                    ? { background: '#982598', color: '#fff' }
                    : { background: 'transparent', color: '#15173D', border: '1.5px solid #e5e7eb' }
                  }>
                  {cta}
                </a>

                <ul className="space-y-2">
                  {features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs"
                      style={{ color: highlight ? 'rgba(255,255,255,0.65)' : '#6b7280' }}>
                      <CheckIcon sx={{ fontSize: 14, mt: '1px', flexShrink: 0,
                        color: highlight ? '#c56ec5' : '#982598' }} />
                      {f}
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
