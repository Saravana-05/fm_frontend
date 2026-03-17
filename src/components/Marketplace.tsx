import WorkOutlineIcon from '@mui/icons-material/WorkOutline'
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import EastIcon from '@mui/icons-material/East'
import { useScrollReveal } from '../hooks/useScrollReveal'

const categories = [
  {
    Icon: WorkOutlineIcon, title: 'Startup Freelancers', count: '340+ professionals',
    desc: 'Vetted developers, designers, and growth marketers who know the startup world.',
  },
  {
    Icon: GavelOutlinedIcon, title: 'Startup Lawyers', count: '80+ lawyers',
    desc: 'Legal advisors specializing in equity, IP, and founder agreements.',
  },
  {
    Icon: LightbulbOutlinedIcon, title: 'Startup Mentors', count: '200+ mentors',
    desc: "Experienced operators and founders who've been through the journey.",
  },
]

export default function Marketplace() {
  const left  = useScrollReveal()
  const right = useScrollReveal()

  return (
    <section id="marketplace" className="py-24 section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div ref={left.ref} className={`reveal-left ${left.visible ? 'visible' : ''}`}>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold border"
              style={{ background: 'rgba(152,37,152,0.06)', borderColor: 'rgba(152,37,152,0.2)', color: '#982598' }}>
              Marketplace
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: '#15173D' }}>
              Startup Talent <span className="grad-text">Marketplace</span>
            </h2>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              Beyond co-founder matching — access vetted startup professionals to fill every skill gap in your team.
            </p>
            <div className="flex flex-wrap gap-8 mb-8">
              <div>
                <span className="text-3xl font-extrabold" style={{ color: '#15173D' }}>620+</span>
                <p className="text-xs text-gray-400 mt-0.5">professionals listed</p>
              </div>
              <div>
                <span className="text-3xl font-extrabold" style={{ color: '#15173D' }}>48hr</span>
                <p className="text-xs text-gray-400 mt-0.5">average response time</p>
              </div>
            </div>
            <a href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-md"
              style={{ background: '#982598' }}>
              Browse Marketplace <EastIcon sx={{ fontSize: 16 }} />
            </a>
          </div>

          <div ref={right.ref} className={`flex flex-col gap-4 stagger-children ${right.visible ? 'visible' : ''}`}>
            {categories.map(({ Icon, title, desc, count }) => (
              <div key={title}
                className="bg-white rounded-2xl p-5 border border-gray-100 flex gap-4 items-start card-lift hover:border-purple-100 transition-all">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(152,37,152,0.08)' }}>
                  <Icon sx={{ fontSize: 20, color: '#982598' }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm" style={{ color: '#15173D' }}>{title}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(152,37,152,0.07)', color: '#982598' }}>
                      {count}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
