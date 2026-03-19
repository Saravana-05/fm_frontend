import { NavProvider, useNav } from './components/Context/NavigationContext'
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
import LoginPage from './components/login'
import SynapseAssessment from './components/SynapseAssement'

function LandingPage() {
  const { setView } = useNav()
  return (
    <div className="min-h-screen font-sans">
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setView('admin')}
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

function AdminView() {
  const { setView } = useNav()
  return (
    <div>
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

function AssessmentView() {
  const { setView } = useNav()
  return (
    <SynapseAssessment
      onComplete={() => setView('landing')}
      onClose={() => setView('landing')}
    />
  )
}

function AppRoutes() {
  const { view } = useNav()
  if (view === 'admin') return <AdminView />
  if (view === 'login') return <LoginPage />
  if (view === 'assessment') return <AssessmentView />
  return <LandingPage />
}

export default function App() {
  return (
    <NavProvider>
      <AppRoutes />
    </NavProvider>
  )
}