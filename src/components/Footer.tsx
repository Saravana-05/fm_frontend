import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import { useScrollReveal } from '../hooks/useScrollReveal'

const links = {
  Product: ['How It Works', 'Features', 'Pricing', 'Marketplace'],
  Company: ['About', 'Blog', 'Contact', 'Careers'],
  Legal:   ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
}

export default function Footer() {
  const section = useScrollReveal()

  return (
    <footer className="bg-white border-t border-gray-100">
      <div ref={section.ref}
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8 reveal ${section.visible ? 'visible' : ''}`}>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#982598' }}>
                <AutoAwesomeIcon sx={{ fontSize: 15, color: '#fff' }} />
              </div>
              <span className="font-bold text-lg" style={{ color: '#15173D' }}>
                Founder<span style={{ color: '#982598' }}>Match</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Helping founders build compatible partnerships through structure, trust, and legal clarity.
            </p>
            <div className="flex gap-2">
              {[LinkedInIcon, TwitterIcon].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center transition-all hover:border-purple-200 hover:bg-purple-50">
                  <Icon sx={{ fontSize: 15, color: '#982598' }} />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div className="text-xs font-bold uppercase tracking-wider mb-4" style={{ color: '#15173D' }}>
                {category}
              </div>
              <ul className="space-y-2.5">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-300">
            © {new Date().getFullYear()} FounderMatch. All rights reserved.
          </p>
          <p className="text-xs text-gray-300">Built for founders, by founders. 🚀</p>
        </div>
      </div>
    </footer>
  )
}
