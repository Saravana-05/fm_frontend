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

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Serif:ital@0;1&display=swap');

  .quiz-root * { font-family:'Cabinet Grotesk',sans-serif; box-sizing:border-box; }

  @keyframes quiz-fadeUp   { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  @keyframes quiz-shimmer  { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes quiz-borderRun{ 0%{background-position:0%} 100%{background-position:300%} }
  @keyframes quiz-badgePop { 0%,100%{transform:scale(1)} 50%{transform:scale(1.025)} }
  @keyframes quiz-barFill  { from{width:0} }
  @keyframes quiz-checkPop { from{opacity:0;transform:scale(.4) rotate(-15deg)} to{opacity:1;transform:scale(1) rotate(0deg)} }
  @keyframes quiz-dimIn    { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

  .quiz-reveal { opacity:0; }
  .quiz-reveal.vis { animation:quiz-fadeUp .7s cubic-bezier(.22,1,.36,1) both; }

  /* Section badge */
  .quiz-section-badge {
    display:inline-flex; align-items:center;
    padding:5px 16px; border-radius:999px; margin-bottom:20px;
    background:#f0edf8; color:#1e0e3c;
    font-size:12px; font-weight:700; letter-spacing:.05em; text-transform:uppercase;
    border:1px solid #c4b8e8;
    position:relative; overflow:hidden;
    animation:quiz-badgePop 3s ease-in-out infinite;
  }
  .quiz-section-badge::before {
    content:''; position:absolute; inset:-1px; border-radius:999px; padding:1px;
    background:linear-gradient(90deg,rgba(30,14,60,.25),rgba(59,29,120,.65),rgba(30,14,60,.25));
    background-size:300% 100%;
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor; mask-composite:exclude;
    animation:quiz-borderRun 3s linear infinite; pointer-events:none;
  }

  /* Card wrapper */
  .quiz-card {
    background:#fff; border-radius:22px;
    border:1px solid #d4cce8;
    box-shadow:0 2px 0 #f0edf8, 0 16px 48px rgba(30,14,60,.09), 0 4px 16px rgba(0,0,0,.04);
    overflow:hidden;
  }

  /* Progress bar track */
  .quiz-progress-track {
    height:3px; background:#f0edf8;
  }
  .quiz-progress-fill {
    height:100%;
    background:linear-gradient(90deg,#0f0826,#1e0e3c,#3b1d78);
    transition:width .4s cubic-bezier(.22,1,.36,1);
    animation:quiz-shimmer 2.5s linear infinite;
    background-size:200% 100%;
  }

  /* Percent chip */
  .quiz-pct-chip {
    font-size:11px; font-weight:800; padding:3px 10px; border-radius:999px; letter-spacing:.04em;
    background:#f0edf8; color:#1e0e3c; border:1px solid #c4b8e8;
  }

  /* Textarea */
  .quiz-textarea {
    width:100%; padding:14px 16px; border-radius:14px; resize:none;
    font-family:'Cabinet Grotesk',sans-serif; font-size:14px; color:#0f0826;
    border:1.5px solid #d4cce8; background:#fff; outline:none;
    transition:border-color .2s, box-shadow .2s;
    line-height:1.7;
  }
  .quiz-textarea::placeholder { color:#c4b8e8; }
  .quiz-textarea:focus {
    border-color:#1e0e3c;
    box-shadow:0 0 0 3px rgba(30,14,60,.07);
  }

  /* Nav buttons */
  .quiz-btn-back {
    display:inline-flex; align-items:center; gap:6px;
    padding:11px 20px; border-radius:11px; cursor:pointer;
    font-family:'Cabinet Grotesk',sans-serif; font-size:13px; font-weight:700;
    background:#fff; border:1.5px solid #d4cce8; color:#5a4f7a;
    transition:all .2s;
  }
  .quiz-btn-back:hover { background:#f8f6ff; border-color:#3b1d78; color:#1e0e3c; }

  .quiz-btn-next {
    flex:1; display:inline-flex; align-items:center; justify-content:center; gap:6px;
    padding:11px 20px; border-radius:11px; cursor:pointer;
    font-family:'Cabinet Grotesk',sans-serif; font-size:13px; font-weight:800; color:#e2d9f3;
    background:linear-gradient(135deg,#0f0826,#1e0e3c 55%,#2d1b69);
    border:none;
    box-shadow:0 4px 18px rgba(15,8,38,.28), inset 0 1px 0 rgba(255,255,255,.08);
    transition:transform .2s, box-shadow .2s, opacity .2s;
    position:relative; overflow:hidden;
  }
  .quiz-btn-next::before {
    content:''; position:absolute; top:0; left:-90%; width:55%; height:100%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);
    transform:skewX(-15deg); transition:left .4s ease;
  }
  .quiz-btn-next:hover:not(:disabled)::before { left:140%; }
  .quiz-btn-next:hover:not(:disabled) { transform:translateY(-2px); box-shadow:0 10px 28px rgba(15,8,38,.38)!important; }
  .quiz-btn-next:disabled { opacity:.35; cursor:not-allowed; }

  /* Completed state */
  .quiz-check-icon { animation:quiz-checkPop .6s cubic-bezier(.34,1.56,.64,1) both; }

  .quiz-dim-card {
    border-radius:14px; padding:16px; text-align:center;
    background:#f8f6ff; border:1px solid #e8e4f0;
    transition:transform .22s, box-shadow .22s;
    animation:quiz-dimIn .5s cubic-bezier(.22,1,.36,1) both;
  }
  .quiz-dim-card:hover { transform:translateY(-3px); box-shadow:0 8px 20px rgba(30,14,60,.08); }

  .quiz-matches-btn {
    display:inline-block; padding:13px 32px; border-radius:12px;
    font-family:'Cabinet Grotesk',sans-serif; font-size:14px; font-weight:800; color:#e2d9f3;
    background:linear-gradient(135deg,#0f0826,#1e0e3c 55%,#2d1b69);
    border:none; cursor:pointer; text-decoration:none;
    box-shadow:0 4px 18px rgba(15,8,38,.28), inset 0 1px 0 rgba(255,255,255,.08);
    transition:transform .2s, box-shadow .2s;
    position:relative; overflow:hidden;
  }
  .quiz-matches-btn::before {
    content:''; position:absolute; top:0; left:-90%; width:55%; height:100%;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.1),transparent);
    transform:skewX(-15deg); transition:left .4s ease;
  }
  .quiz-matches-btn:hover::before { left:140%; }
  .quiz-matches-btn:hover { transform:translateY(-2px); box-shadow:0 12px 32px rgba(15,8,38,.38)!important; }
`

export default function CompatibilityQuiz() {
  const [current,   setCurrent]   = useState(0)
  const [answers,   setAnswers]   = useState({})
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
    <section id="quiz" className="quiz-root" style={{ padding:'96px 0', background:'#faf8ff' }}>
      <style>{css}</style>
      <div ref={section.ref} className={`quiz-reveal ${section.visible ? 'vis' : ''}`}
        style={{ maxWidth:560, margin:'0 auto', padding:'0 24px' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <div className="quiz-section-badge">Compatibility Test</div>
          <h2 style={{ fontFamily:'Cabinet Grotesk,sans-serif', fontSize:'clamp(1.8rem,4vw,2.6rem)', fontWeight:900, lineHeight:1.08, marginBottom:8, color:'#0f0826', letterSpacing:'-.02em' }}>
            Find Your Co-Founder Match
          </h2>
          <p style={{ fontSize:14, color:'#7c6fa0', fontWeight:500 }}>15 questions · Takes about 5 minutes</p>
        </div>

        {completed ? (
          /* ── Completed state ── */
          <div className="quiz-card" style={{ padding:40, textAlign:'center' }}>
            <div className="quiz-check-icon" style={{ marginBottom:18 }}>
              <CheckCircleIcon sx={{ fontSize:56, color:'#1e0e3c', display:'block', margin:'0 auto' }} />
            </div>
            <h3 style={{ fontFamily:'Cabinet Grotesk,sans-serif', fontSize:'1.5rem', fontWeight:900, marginBottom:10, color:'#0f0826' }}>
              Profile Created! 🎉
            </h3>
            <p style={{ color:'#7c6fa0', fontSize:13, lineHeight:1.7, marginBottom:28, maxWidth:340, margin:'0 auto 28px' }}>
              Your compatibility profile is ready. We'll match you with compatible co-founders shortly.
            </p>

            {/* Dimension scores */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:28 }}>
              {['Vision', 'Work Style', 'Risk Profile'].map((dim, i) => (
                <div key={dim} className="quiz-dim-card" style={{ animationDelay:`${i * .1}s` }}>
                  <div style={{ fontSize:'1.3rem', fontWeight:900, marginBottom:4, color:'#0f0826' }}>
                    {Math.floor(Math.random() * 15) + 82}%
                  </div>
                  <div style={{ fontSize:11, color:'#7c6fa0', fontWeight:600 }}>{dim}</div>
                </div>
              ))}
            </div>

            <a href="#pricing" className="quiz-matches-btn">View My Matches →</a>
          </div>
        ) : (
          /* ── Quiz card ── */
          <div className="quiz-card">

            {/* Progress bar */}
            <div className="quiz-progress-track">
              <div className="quiz-progress-fill" style={{ width:`${progress}%` }} />
            </div>

            <div style={{ padding:32 }}>
              {/* Counter row */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
                <div style={{ display:'flex', gap:4 }}>
                  {questions.map((_, i) => (
                    <div key={i} style={{
                      flex:1, height:3, borderRadius:2,
                      background: i < current ? '#1e0e3c' : i === current ? '#3b1d78' : '#f0edf8',
                      minWidth:6, maxWidth:18,
                      transition:'background .3s',
                    }} />
                  ))}
                </div>
                <div style={{ marginLeft:12, flexShrink:0 }}>
                  <span className="quiz-pct-chip">{Math.round(progress)}%</span>
                </div>
              </div>

              {/* Question counter */}
              <div style={{ fontSize:11, color:'#7c6fa0', fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase', marginBottom:14 }}>
                Question {current + 1} of {questions.length}
              </div>

              {/* Question text */}
              <h3 style={{ fontFamily:'Cabinet Grotesk,sans-serif', fontSize:'1.15rem', fontWeight:800, marginBottom:20, color:'#0f0826', lineHeight:1.45 }}>
                {q.text}
              </h3>

              {/* Textarea */}
              <textarea
                className="quiz-textarea"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your answer here..."
                rows={4}
                onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleNext() }}
              />
              <p style={{ fontSize:11, color:'#c4b8e8', marginTop:6, fontWeight:500 }}>Ctrl / ⌘ + Enter to continue</p>

              {/* Nav buttons */}
              <div style={{ display:'flex', gap:10, marginTop:20 }}>
                {current > 0 && (
                  <button className="quiz-btn-back" onClick={handleBack}>
                    <ArrowBackIosNewIcon sx={{ fontSize:12 }} /> Back
                  </button>
                )}
                <button className="quiz-btn-next" onClick={handleNext} disabled={!input.trim()}>
                  {current === questions.length - 1 ? 'See My Matches' : 'Next'}
                  <ArrowForwardIosIcon sx={{ fontSize:12 }} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}