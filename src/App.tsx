import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import WhoItsFor from './components/WhoItsFor'
import Pricing from './components/Pricing'
import Marketplace from './components/Marketplace'
import CompatibilityQuiz from './components/CompatibilityQuiz'
import CTA from './components/CTA'
import Footer from './components/Footer'
import AdminApp from './admin/AdminApp'

function LandingPage({ onAdmin }: { onAdmin: () => void }) {
  return (
    <div className="min-h-screen font-sans">
      {/* Admin demo banner */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={onAdmin}
          className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-all hover:shadow-xl"
          style={{ background: 'linear-gradient(135deg, #15173D, #982598)' }}
        >
          🔐 Admin Dashboard →
        </button>
      </div>
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <WhoItsFor />
      <Pricing />
      <Marketplace />
      <CompatibilityQuiz />
      <CTA />
      <Footer />
    </div>
  )
}

export default function App() {
  const [view, setView] = useState<'landing' | 'admin'>('landing')

  if (view === 'admin') {
    return (
      <div>
        {/* Back to landing button */}
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setView('landing')}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-lg hover:opacity-90 transition-all"
            style={{ background: '#15173D' }}
          >
            ← Back to Site
          </button>
        </div>
        <AdminApp />
      </div>
    )
  }

  return <LandingPage onAdmin={() => setView('admin')} />
}
