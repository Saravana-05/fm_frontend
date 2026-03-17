import EastIcon from '@mui/icons-material/East'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function CTA() {
  const section = useScrollReveal()

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={section.ref} className={`reveal-scale ${section.visible ? 'visible' : ''}`}>
          <div className="relative rounded-3xl p-12 lg:p-16 text-center overflow-hidden"
            style={{ background: 'linear-gradient(145deg, #15173D 0%, #2b1245 100%)' }}>

            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'rgba(152,37,152,0.25)', filter: 'blur(60px)', transform: 'translate(20%,-20%)' }} />
            <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: 'rgba(152,37,152,0.15)', filter: 'blur(50px)', transform: 'translate(-20%,20%)' }} />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-semibold border"
                style={{ background: 'rgba(152,37,152,0.2)', borderColor: 'rgba(152,37,152,0.4)', color: 'rgba(255,255,255,0.8)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Founders joining every day
              </div>

              <h2 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight text-white">
                Start Your Founder Journey Today
              </h2>
              <p className="text-lg mb-10 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Find a compatible co-founder and build your startup with confidence.
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <a href="#pricing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-95 hover:shadow-xl"
                  style={{ background: '#982598', color: '#fff' }}>
                  Create Free Profile <EastIcon sx={{ fontSize: 16 }} />
                </a>
                <a href="#quiz"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border transition-all hover:bg-white/10"
                  style={{ color: 'rgba(255,255,255,0.85)', borderColor: 'rgba(255,255,255,0.2)' }}>
                  <AssignmentOutlinedIcon sx={{ fontSize: 16 }} />
                  Take Compatibility Test
                </a>
              </div>

              <div className="flex flex-wrap justify-center gap-6 mt-9 text-xs"
                style={{ color: 'rgba(255,255,255,0.35)' }}>
                <span>✓ No credit card required</span>
                <span>✓ Free forever plan</span>
                <span>✓ 2,400+ founders</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
