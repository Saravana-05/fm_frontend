import { useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useScrollReveal } from '../hooks/useScrollReveal'

const questions = [
  { id: 1,  text: 'What inspired you to start this venture?',               key: 'inspiration' },
  { id: 2,  text: 'How did you overcome your earliest challenges?',          key: 'resilience' },
  { id: 3,  text: 'What is your ultimate company vision?',                   key: 'vision' },
  { id: 4,  text: 'What makes your product uniquely valuable?',              key: 'differentiation' },
  { id: 5,  text: 'What is your growth strategy for the first 12 months?',   key: 'growth' },
  { id: 6,  text: 'What was your most impactful pivot or adaptation?',       key: 'adaptability' },
  { id: 7,  text: 'How do you evaluate and take high-stakes risks?',         key: 'risk' },
  { id: 8,  text: 'What is your strategy for retaining early customers?',    key: 'retention' },
  { id: 9,  text: 'How do you build a culture of disruptive thinking?',      key: 'culture' },
  { id: 10, text: 'How do you approach R&D and product innovation?',         key: 'innovation' },
  { id: 11, text: 'How do you stay ahead of market changes?',                key: 'market' },
  { id: 12, text: 'What unique expertise do you bring to a startup?',        key: 'expertise' },
  { id: 13, text: 'How do you recover and learn from failures?',             key: 'recovery' },
  { id: 14, text: 'What does your company look like in 5 years?',            key: 'longterm' },
  { id: 15, text: 'What do you seek most in a co-founder?',                  key: 'seeking' },
]

type Answers = Record<string, string>

export default function CompatibilityQuiz() {
  const [current,   setCurrent]   = useState(0)
  const [answers,   setAnswers]   = useState<Answers>({})
  const [input,     setInput]     = useState('')
  const [completed, setCompleted] = useState(false)
  const section = useScrollReveal()

  const q        = questions[current]
  const progress = (current / questions.length) * 100

  const handleNext = () => {
    if (!input.trim()) return
    const next = { ...answers, [q.key]: input }
    setAnswers(next)
    setInput('')
    if (current === questions.length - 1) setCompleted(true)
    else setCurrent(c => c + 1)
  }

  const handleBack = () => {
    if (current === 0) return
    setCurrent(c => c - 1)
    setInput(answers[questions[current - 1].key] || '')
  }

  return (
    <section id="quiz" className="py-24 section-alt">
      <div ref={section.ref} className={`max-w-xl mx-auto px-4 reveal ${section.visible ? 'visible' : ''}`}>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mb-4 text-xs font-semibold border"
            style={{ background: 'rgba(152,37,152,0.06)', borderColor: 'rgba(152,37,152,0.2)', color: '#982598' }}>
            Compatibility Test
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-2" style={{ color: '#15173D' }}>
            Find Your Co-Founder Match
          </h2>
          <p className="text-gray-400">15 questions · Takes about 5 minutes</p>
        </div>

        {completed ? (
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100 text-center">
            <CheckCircleIcon sx={{ fontSize: 52, color: '#982598', display: 'block', margin: '0 auto 16px' }} />
            <h3 className="text-2xl font-extrabold mb-3" style={{ color: '#15173D' }}>Profile Created! 🎉</h3>
            <p className="text-gray-400 text-sm mb-7">
              Your compatibility profile is ready. We'll match you with compatible co-founders shortly.
            </p>
            <div className="grid grid-cols-3 gap-3 mb-7">
              {['Vision', 'Work Style', 'Risk Profile'].map(dim => (
                <div key={dim} className="rounded-xl p-4 text-center border border-gray-100"
                  style={{ background: 'rgba(152,37,152,0.04)' }}>
                  <div className="text-xl font-bold mb-1" style={{ color: '#982598' }}>
                    {Math.floor(Math.random() * 15) + 82}%
                  </div>
                  <div className="text-xs text-gray-400">{dim}</div>
                </div>
              ))}
            </div>
            <a href="#pricing"
              className="inline-block px-7 py-3 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
              style={{ background: '#982598' }}>
              View My Matches →
            </a>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Progress */}
            <div className="h-1 bg-gray-100">
              <div className="h-full progress-fill"
                style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #982598, #c040c0)' }} />
            </div>

            <div className="p-8">
              <div className="flex items-center justify-between mb-7">
                <span className="text-xs text-gray-400 font-medium">
                  {current + 1} of {questions.length}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(152,37,152,0.07)', color: '#982598' }}>
                  {Math.round(progress)}% done
                </span>
              </div>

              <h3 className="text-xl font-bold mb-5" style={{ color: '#15173D' }}>{q.text}</h3>

              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your answer here..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl resize-none text-sm text-gray-700 placeholder-gray-300 outline-none border transition-all"
                style={{ borderColor: 'rgba(152,37,152,0.2)' }}
                onFocus={e => {
                  e.currentTarget.style.borderColor = '#982598'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(152,37,152,0.08)'
                }}
                onBlur={e => {
                  e.currentTarget.style.borderColor = 'rgba(152,37,152,0.2)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleNext() }}
              />
              <p className="text-xs text-gray-300 mt-1.5">Ctrl / ⌘ + Enter to continue</p>

              <div className="flex gap-3 mt-5">
                {current > 0 && (
                  <button onClick={handleBack}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all">
                    <ArrowBackIosNewIcon sx={{ fontSize: 13 }} /> Back
                  </button>
                )}
                <button onClick={handleNext} disabled={!input.trim()}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-35 disabled:cursor-not-allowed hover:opacity-90"
                  style={{ background: '#982598' }}>
                  {current === questions.length - 1 ? 'See My Matches' : 'Next'}
                  <ArrowForwardIosIcon sx={{ fontSize: 13 }} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
