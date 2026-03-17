import { useScrollReveal } from '../hooks/useScrollReveal'

const segments = [
  { emoji: '🚀', title: 'Validation-Stage Founders', tag: 'Most Common', highlight: true,
    desc: 'Building an MVP but need a technical or business co-founder to move fast and fill critical skill gaps.' },
  { emoji: '🎓', title: 'Student Innovators', tag: 'Universities',
    desc: 'University students with bold startup ideas looking for complementary co-founders from other disciplines.' },
  { emoji: '💼', title: 'Career Switchers', tag: 'Corporate → Startup',
    desc: 'Experienced professionals moving into startups who need a co-founder with domain expertise.' },
  { emoji: '🧩', title: 'Solo Founders', tag: 'Ready to Scale',
    desc: "Founders who've been building alone and are ready to bring on a complementary partner." },
]

export default function WhoItsFor() {
  const header = useScrollReveal()
  const cards  = useScrollReveal()

  return (
    <section className="py-24 section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div ref={header.ref} className={`text-center mb-14 reveal ${header.visible ? 'visible' : ''}`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold border"
            style={{ background: 'rgba(152,37,152,0.06)', borderColor: 'rgba(152,37,152,0.2)', color: '#982598' }}>
            Who It's For
          </div>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: '#15173D' }}>
            Built for <span className="grad-text">Startup Builders</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Whether you're pre-idea or post-MVP, FounderMatch connects you with the right person to build with.
          </p>
        </div>

        <div ref={cards.ref} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children ${cards.visible ? 'visible' : ''}`}>
          {segments.map(({ emoji, title, desc, tag, highlight }) => (
            <div key={title}
              className={`relative rounded-2xl p-6 border card-lift transition-all ${
                highlight ? '' : 'bg-white border-gray-100 hover:border-purple-100'
              }`}
              style={highlight ? {
                background: 'linear-gradient(145deg, #15173D 0%, #2b1245 100%)',
                borderColor: 'rgba(152,37,152,0.5)',
              } : {}}>

              {highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 text-xs font-bold rounded-full"
                    style={{ background: '#982598', color: '#fff' }}>
                    ⭐ {tag}
                  </span>
                </div>
              )}

              {!highlight && (
                <span className="inline-block px-2.5 py-1 mb-4 text-xs font-semibold rounded-full"
                  style={{ background: 'rgba(152,37,152,0.07)', color: '#982598' }}>
                  {tag}
                </span>
              )}

              {highlight && <div className="h-5" />}

              <div className="text-3xl mb-3">{emoji}</div>
              <h3 className="text-base font-bold mb-2"
                style={{ color: highlight ? '#fff' : '#15173D' }}>{title}</h3>
              <p className="text-sm leading-relaxed"
                style={{ color: highlight ? 'rgba(255,255,255,0.6)' : '#9ca3af' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
