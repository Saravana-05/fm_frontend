import { useState, useEffect, useRef, useCallback } from 'react'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

// ─── Types ────────────────────────────────────────────────────────────────────

type QuestionType = 'choice' | 'likert'
type Phase = 'psyche' | 'grapho' | 'processing' | 'results'

interface Question {
  id: number
  phase: 'psyche'
  dim: string
  text: string
  type: QuestionType
  opts?: string[]
}

interface GraphoQuestion {
  id: string
  text: string
  opts: string[]
}

type Answers = Record<string | number, number>

// ─── Data ─────────────────────────────────────────────────────────────────────

const questions: Question[] = [
  { id: 1,  phase: 'psyche', dim: 'Risk DNA',              type: 'choice', text: 'Your startup is 8 months in, burning runway, and you get a bridge offer at unfavorable terms. You:', opts: ['Take it immediately — survival first', 'Decline and run a revenue sprint instead', 'Take 2 weeks to explore all alternatives', 'Take it as a forcing function to pivot'] },
  { id: 2,  phase: 'psyche', dim: 'Vision Horizon',        type: 'choice', text: 'When you think about your startup, which timeframe feels most real to you?', opts: ['Next 30 days — I think in sprints', 'Next 12 months — annual planning', '3 to 5 years — I can see the arc', '10+ years — building a generational company'] },
  { id: 3,  phase: 'psyche', dim: 'Conflict Style',        type: 'choice', text: 'You and your co-founder disagree on a major hire. What do you do?', opts: ['Data-driven structured meeting — best argument wins', 'Defer to whoever has domain context', 'Try both approaches in parallel', 'Bring in a third-party advisor'] },
  { id: 4,  phase: 'psyche', dim: 'Execution Drive',       type: 'choice', text: 'Your ideal work week as a founder looks like:', opts: ['60–70 hours: fully consumed, love it', '50–60 hours: intense with recovery', '40–50 hours: sustainable with boundaries', 'Varies 30–80+ hours based on phase'] },
  { id: 5,  phase: 'psyche', dim: 'Risk DNA',              type: 'likert', text: "Rate how much personal savings you'd invest at the start:" },
  { id: 6,  phase: 'psyche', dim: 'Authority Style',       type: 'choice', text: 'Your leadership philosophy is closest to:', opts: ['Servant: remove obstacles for my team', 'Visionary: set direction, inspire others', 'Coaching: develop people through questions', 'Operational: systems and accountability'] },
  { id: 7,  phase: 'psyche', dim: 'Resilience Index',      type: 'choice', text: 'After a major failure, how long does it take you to feel re-energized?', opts: ['Hours to a day — I bounce back fast', 'A few days — short reset then back', '1–2 weeks — I come back stronger', 'A month+ — setbacks forge me deeply'] },
  { id: 8,  phase: 'psyche', dim: 'Integrity Signal',      type: 'choice', text: 'Your co-founder asks you to slightly misrepresent traction to an investor. You:', opts: ['Refuse absolutely — dealbreaker for me', 'Push back strongly and suggest reframing', 'Ask a clarifying question to buy time', 'Present only verified facts and let truth speak'] },
  { id: 9,  phase: 'psyche', dim: 'Adaptability',          type: 'choice', text: 'After 12 months, data shows your core hypothesis is wrong. You feel:', opts: ['Excited — this is how great companies are born', 'Painful but expected — the nature of the journey', 'A crisis requiring all hands on deck immediately', 'Devastating temporarily — but I find the path'] },
  { id: 10, phase: 'psyche', dim: 'Vision Horizon',        type: 'likert', text: 'Rate how strongly you identify: "I am building something that will still matter in 20 years."' },
  { id: 11, phase: 'psyche', dim: 'Conflict Style',        type: 'choice', text: 'When frustrated with a colleague, you typically:', opts: ['Address directly — I say what I mean', 'Process internally, then speak calmly', 'Write / journal it first, then decide', 'Seek input from a trusted third party'] },
  { id: 12, phase: 'psyche', dim: 'Execution Drive',       type: 'likert', text: 'When you set a personal deadline, how often do you hit it?' },
  { id: 13, phase: 'psyche', dim: 'Authority Style',       type: 'choice', text: 'A key team member underperforms after one conversation. You:', opts: ['Set a 30-day PIP with weekly check-ins', 'Have a deeper conversation — find the root cause', 'Reassign their work and observe self-correction', 'Begin off-boarding — one warning is enough'] },
  { id: 14, phase: 'psyche', dim: 'Resilience Index',      type: 'likert', text: 'Rate: "Every significant failure has ultimately made me a better founder."' },
  { id: 15, phase: 'psyche', dim: 'Integrity Signal',      type: 'likert', text: 'Rate: "I would rather fail ethically than succeed by cutting corners."' },
  { id: 16, phase: 'psyche', dim: 'Adaptability',          type: 'choice', text: 'Your co-founder wants to change the technical architecture 6 months before launch. You:', opts: ['Only agree with overwhelming evidence — time is real', 'Explore it seriously — tech debt now is worse', 'Propose a hybrid: ship now, rebuild in parallel', 'Defer to them — this is their domain'] },
  { id: 17, phase: 'psyche', dim: 'Decision Style',        type: 'choice', text: "It's Friday evening. A strategic decision must be made by Monday. Your co-founder is unreachable. You:", opts: ['Make the call — waiting is also a decision', 'Keep trying — this must be joint', 'Prepare both options, call Sunday night', 'Escalate to a board member or advisor'] },
  { id: 18, phase: 'psyche', dim: 'Equity Mindset',        type: 'choice', text: 'On equity split, you believe:', opts: ['50-50 always — equal partnership, no hierarchy', 'Split by contribution and role — not all equal', 'Start equal, adjust after one year of contribution', 'Whatever a neutral advisor recommends'] },
  { id: 19, phase: 'psyche', dim: 'Ambition Index',        type: 'likert', text: 'Rate your personal ambition level for this venture:' },
  { id: 20, phase: 'psyche', dim: 'Partnership Readiness', type: 'likert', text: 'Rate: "I am emotionally and professionally ready to commit to a co-founder right now."' },
]

const graphoQs: GraphoQuestion[] = [
  { id: 'g1', text: 'How would you describe your typical handwriting style?',  opts: ['Large & expansive — takes lots of space', 'Small & compact — neat within lines', 'Medium & fluid — varies with mood', 'Mixed / inconsistent — quite different each time'] },
  { id: 'g2', text: 'When writing quickly, your letters tend to:',              opts: ['Slant forward (right) — lean toward next word', 'Stay upright / vertical — straight regardless', 'Slant backward (left) — pull from margin', 'Vary direction — mix of forward and back'] },
  { id: 'g3', text: 'Your signature compared to regular handwriting is:',       opts: ['Larger & more elaborate — with flourishes', 'Smaller & simpler — more compressed', 'Similar in size — consistent with normal writing', 'Completely different style — unrecognizable'] },
]

const TOTAL = questions.length

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ current, total, isGrapho }: { current: number; total: number; isGrapho: boolean }) {
  const pct = isGrapho ? 100 : Math.round(((current + 1) / total) * 100)
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#982598' }}>
          {isGrapho ? 'GraphoSoul™ — Handwriting Analysis' : 'PsycheMap™ — Founder Psyche'}
        </span>
        {!isGrapho && (
          <span className="text-xs font-bold" style={{ color: '#15173D' }}>
            {current + 1} / {total}
          </span>
        )}
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(21,23,61,0.08)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: isGrapho
              ? 'linear-gradient(90deg,#982598,#c44cc4)'
              : 'linear-gradient(90deg,#15173D,#982598)',
          }}
        />
      </div>
      {!isGrapho && (
        <div className="flex gap-1 mt-2">
          {questions.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-0.5 rounded-full transition-all duration-300"
              style={{
                background:
                  i < current ? '#982598' : i === current ? '#15173D' : 'rgba(21,23,61,0.10)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Choice Card ──────────────────────────────────────────────────────────────

function ChoiceCard({ q, answers, onPick }: { q: Question; answers: Answers; onPick: (id: number, val: number) => void }) {
  return (
    <div
      className="rounded-2xl p-8 mb-6 border"
      style={{
        background: '#fff',
        borderColor: 'rgba(21,23,61,0.08)',
        boxShadow: '0 4px 32px rgba(21,23,61,0.08)',
        animation: 'fm-slideUp 0.3s ease both',
      }}
    >
      {/* badge */}
      <div className="flex items-center gap-2 mb-5">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
          style={{ background: 'rgba(152,37,152,0.10)', color: '#982598' }}
        >
          🧠 PsycheMap™
        </span>
        <span className="text-xs font-semibold" style={{ color: 'rgba(21,23,61,0.40)' }}>
          {q.dim}
        </span>
      </div>

      <p className="text-lg font-bold leading-snug mb-6" style={{ color: '#15173D' }}>
        {q.text}
      </p>

      <div className="flex flex-col gap-3">
        {(q.opts ?? []).map((opt, i) => {
          const selected = answers[q.id] === i
          return (
            <button
              key={i}
              onClick={() => onPick(q.id, i)}
              className="flex items-center gap-4 px-5 py-4 rounded-xl border text-left w-full transition-all duration-200"
              style={{
                background: selected ? 'rgba(152,37,152,0.06)' : '#FAFAFA',
                borderColor: selected ? '#982598' : 'rgba(21,23,61,0.10)',
                boxShadow: selected ? '0 0 0 2px rgba(152,37,152,0.15)' : 'none',
              }}
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-200"
                style={{
                  background: selected ? '#982598' : '#fff',
                  border: `1.5px solid ${selected ? '#982598' : 'rgba(21,23,61,0.15)'}`,
                  color: selected ? '#fff' : 'rgba(21,23,61,0.40)',
                }}
              >
                {'ABCD'[i]}
              </span>
              <span
                className="text-sm leading-snug"
                style={{ color: selected ? '#15173D' : 'rgba(21,23,61,0.65)', fontWeight: selected ? 600 : 400 }}
              >
                {opt}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Likert Card ──────────────────────────────────────────────────────────────

function LikertCard({ q, answers, onPick }: { q: Question; answers: Answers; onPick: (id: number, val: number) => void }) {
  return (
    <div
      className="rounded-2xl p-8 mb-6 border"
      style={{
        background: '#fff',
        borderColor: 'rgba(21,23,61,0.08)',
        boxShadow: '0 4px 32px rgba(21,23,61,0.08)',
        animation: 'fm-slideUp 0.3s ease both',
      }}
    >
      <div className="flex items-center gap-2 mb-5">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
          style={{ background: 'rgba(152,37,152,0.10)', color: '#982598' }}
        >
          🧠 PsycheMap™
        </span>
        <span className="text-xs font-semibold" style={{ color: 'rgba(21,23,61,0.40)' }}>
          {q.dim}
        </span>
      </div>

      <p className="text-lg font-bold leading-snug mb-8" style={{ color: '#15173D' }}>
        {q.text}
      </p>

      <div className="flex gap-2 mb-3">
        {[1, 2, 3, 4, 5, 6, 7].map((n) => {
          const selected = answers[q.id] === n
          return (
            <button
              key={n}
              onClick={() => onPick(q.id, n)}
              className="flex-1 h-12 rounded-xl text-sm font-bold border transition-all duration-200"
              style={{
                background: selected ? '#982598' : '#FAFAFA',
                borderColor: selected ? '#982598' : 'rgba(21,23,61,0.10)',
                color: selected ? '#fff' : 'rgba(21,23,61,0.40)',
                boxShadow: selected ? '0 4px 12px rgba(152,37,152,0.30)' : 'none',
              }}
            >
              {n}
            </button>
          )
        })}
      </div>
      <div className="flex justify-between text-xs font-medium" style={{ color: 'rgba(21,23,61,0.35)' }}>
        <span>Strongly Disagree</span>
        <span>Strongly Agree</span>
      </div>
    </div>
  )
}

// ─── Grapho Section ───────────────────────────────────────────────────────────

function GraphoSection({
  answers, onPick, onBack, onSubmit,
}: {
  answers: Answers
  onPick: (id: string, val: number) => void
  onBack: () => void
  onSubmit: () => void
}) {
  const writingRef = useRef<HTMLCanvasElement>(null)
  const sigRef     = useRef<HTMLCanvasElement>(null)
  const ctxRef     = useRef<Record<string, CanvasRenderingContext2D>>({})
  const penSizeRef = useRef<Record<string, number>>({ writing: 3, sig: 3 })
  const drawingRef = useRef(false)
  const activeRef  = useRef<string | null>(null)
  const [activeTool, setActiveTool] = useState<Record<string, number>>({ writing: 3, sig: 3 })

  const getPoint = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const r = canvas.getBoundingClientRect()
    const sx = canvas.width / r.width
    const sy = canvas.height / r.height
    if ('touches' in e) return { x: (e.touches[0].clientX - r.left) * sx, y: (e.touches[0].clientY - r.top) * sy }
    return { x: (e.clientX - r.left) * sx, y: (e.clientY - r.top) * sy }
  }

  const initCanvas = useCallback((canvas: HTMLCanvasElement, key: string) => {
    canvas.width = canvas.offsetWidth || 640
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = '#15173D'; ctx.lineWidth = penSizeRef.current[key]
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    ctxRef.current[key] = ctx

    const down = (e: MouseEvent | TouchEvent) => { e.preventDefault(); drawingRef.current = true; activeRef.current = key; const p = getPoint(e, canvas); ctx.beginPath(); ctx.moveTo(p.x, p.y) }
    const move = (e: MouseEvent | TouchEvent) => { e.preventDefault(); if (!drawingRef.current || activeRef.current !== key) return; const p = getPoint(e, canvas); ctx.lineTo(p.x, p.y); ctx.stroke() }
    const up   = () => { drawingRef.current = false }

    canvas.addEventListener('mousedown', down)
    canvas.addEventListener('mousemove', move)
    canvas.addEventListener('mouseup', up)
    canvas.addEventListener('mouseleave', up)
    canvas.addEventListener('touchstart', down, { passive: false })
    canvas.addEventListener('touchmove',  move, { passive: false })
    canvas.addEventListener('touchend',   up)
  }, [])

  useEffect(() => {
    if (writingRef.current) initCanvas(writingRef.current, 'writing')
    if (sigRef.current)     initCanvas(sigRef.current, 'sig')
  }, [initCanvas])

  const clearCanvas = (key: string) => {
    const ref = key === 'writing' ? writingRef.current : sigRef.current
    const ctx = ctxRef.current[key]
    if (ref && ctx) { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, ref.width, ref.height) }
  }

  const setPenSize = (key: string, size: number) => {
    penSizeRef.current[key] = size
    if (ctxRef.current[key]) ctxRef.current[key].lineWidth = size
    setActiveTool(prev => ({ ...prev, [key]: size }))
  }

  const traits = [
    { icon: '↗️', name: 'Slant',        desc: 'Social orientation' },
    { icon: '📏', name: 'Baseline',     desc: 'Emotional stability' },
    { icon: '⬛', name: 'Pressure',     desc: 'Drive & commitment' },
    { icon: '🔲', name: 'Letter Size',  desc: 'Self-confidence' },
    { icon: '↔️', name: 'Spacing',      desc: 'Need for autonomy' },
    { icon: '🔗', name: 'Connectivity', desc: 'Logic vs. intuition' },
    { icon: '✒️', name: 'Signature',    desc: 'Public self-image' },
    { icon: '🔡', name: 'Loop Forms',   desc: 'Creative thinking' },
  ]

  return (
    <div>
      {/* Intro card */}
      <div
        className="rounded-2xl p-7 mb-6 border"
        style={{ background: 'linear-gradient(135deg,rgba(152,37,152,0.04),rgba(21,23,61,0.03))', borderColor: 'rgba(152,37,152,0.15)' }}
      >
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
          style={{ background: 'rgba(152,37,152,0.10)', color: '#982598' }}
        >
          ✍️ GraphoSoul™
        </span>
        <h3 className="text-xl font-bold mb-2" style={{ color: '#15173D' }}>
          Handwriting Analysis
        </h3>
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(21,23,61,0.60)' }}>
          Graphology reveals subconscious personality traits that psychometrics can't capture — your emotional depth, drive, leadership energy, and authenticity.
        </p>
        <div className="grid grid-cols-4 gap-2">
          {traits.map(t => (
            <div
              key={t.name}
              className="rounded-xl p-3 text-center border"
              style={{ background: '#fff', borderColor: 'rgba(21,23,61,0.08)' }}
            >
              <div className="text-lg mb-1">{t.icon}</div>
              <div className="text-xs font-bold mb-0.5" style={{ color: '#15173D' }}>{t.name}</div>
              <div className="text-xs leading-tight" style={{ color: 'rgba(21,23,61,0.45)' }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Writing canvas */}
      <div
        className="rounded-2xl p-6 mb-4 border"
        style={{ background: '#fff', borderColor: 'rgba(21,23,61,0.08)', boxShadow: '0 4px 32px rgba(21,23,61,0.06)' }}
      >
        <p className="text-sm font-bold mb-1" style={{ color: '#15173D' }}>✏️ Step 1 — Write this sentence in your natural handwriting:</p>
        <p className="text-xs mb-3" style={{ color: 'rgba(21,23,61,0.45)' }}>Draw directly below or write on paper and photograph it.</p>
        <div
          className="rounded-xl px-4 py-3 mb-4 text-sm italic leading-relaxed"
          style={{ background: 'rgba(152,37,152,0.04)', border: '1px solid rgba(152,37,152,0.12)', color: '#15173D', fontFamily: 'Georgia,serif' }}
        >
          "I build with conviction, lead with clarity, and partner with purpose."
        </div>
        <div className="rounded-xl overflow-hidden mb-3" style={{ border: '1.5px dashed rgba(152,37,152,0.25)' }}>
          <canvas ref={writingRef} height={160} style={{ display: 'block', width: '100%', cursor: 'crosshair', touchAction: 'none' }} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {[
            { label: '✕ Clear', action: () => clearCanvas('writing'), size: 0 },
            { label: 'Fine',    action: () => setPenSize('writing', 2), size: 2 },
            { label: 'Normal',  action: () => setPenSize('writing', 3), size: 3 },
            { label: 'Bold',    action: () => setPenSize('writing', 5), size: 5 },
          ].map(({ label, action, size }) => (
            <button
              key={label}
              onClick={action}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200"
              style={{
                background: activeTool.writing === size && size !== 0 ? 'rgba(152,37,152,0.08)' : '#fff',
                borderColor: activeTool.writing === size && size !== 0 ? '#982598' : 'rgba(21,23,61,0.12)',
                color:       activeTool.writing === size && size !== 0 ? '#982598' : 'rgba(21,23,61,0.55)',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Signature canvas */}
      <div
        className="rounded-2xl p-6 mb-6 border"
        style={{ background: '#fff', borderColor: 'rgba(21,23,61,0.08)', boxShadow: '0 4px 32px rgba(21,23,61,0.06)' }}
      >
        <p className="text-sm font-bold mb-1" style={{ color: '#15173D' }}>✍️ Step 2 — Draw your signature below:</p>
        <p className="text-xs mb-3" style={{ color: 'rgba(21,23,61,0.45)' }}>Sign as you would on an important legal document.</p>
        <div className="rounded-xl overflow-hidden mb-3" style={{ border: '1.5px dashed rgba(152,37,152,0.25)' }}>
          <canvas ref={sigRef} height={120} style={{ display: 'block', width: '100%', cursor: 'crosshair', touchAction: 'none' }} />
        </div>
        <button
          onClick={() => clearCanvas('sig')}
          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200"
          style={{ background: '#fff', borderColor: 'rgba(21,23,61,0.12)', color: 'rgba(21,23,61,0.55)' }}
        >
          ✕ Clear
        </button>
      </div>

      {/* Grapho self-report Qs */}
      {graphoQs.map((gq) => (
        <div
          key={gq.id}
          className="rounded-2xl p-8 mb-4 border"
          style={{ background: '#fff', borderColor: 'rgba(21,23,61,0.08)', boxShadow: '0 4px 32px rgba(21,23,61,0.06)' }}
        >
          <div className="flex items-center gap-2 mb-5">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: 'rgba(152,37,152,0.10)', color: '#982598' }}
            >
              ✍️ GraphoSoul™
            </span>
            <span className="text-xs font-semibold" style={{ color: 'rgba(21,23,61,0.40)' }}>
              Self-Report · {gq.id.toUpperCase()}
            </span>
          </div>
          <p className="text-lg font-bold leading-snug mb-6" style={{ color: '#15173D' }}>{gq.text}</p>
          <div className="flex flex-col gap-3">
            {gq.opts.map((opt, i) => {
              const selected = answers[gq.id] === i
              return (
                <button
                  key={i}
                  onClick={() => onPick(gq.id, i)}
                  className="flex items-center gap-4 px-5 py-4 rounded-xl border text-left w-full transition-all duration-200"
                  style={{
                    background: selected ? 'rgba(152,37,152,0.06)' : '#FAFAFA',
                    borderColor: selected ? '#982598' : 'rgba(21,23,61,0.10)',
                    boxShadow: selected ? '0 0 0 2px rgba(152,37,152,0.15)' : 'none',
                  }}
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: selected ? '#982598' : '#fff',
                      border: `1.5px solid ${selected ? '#982598' : 'rgba(21,23,61,0.15)'}`,
                      color: selected ? '#fff' : 'rgba(21,23,61,0.40)',
                    }}
                  >
                    {'ABCD'[i]}
                  </span>
                  <span
                    className="text-sm leading-snug"
                    style={{ color: selected ? '#15173D' : 'rgba(21,23,61,0.65)', fontWeight: selected ? 600 : 400 }}
                  >
                    {opt}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {/* Nav */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl text-sm font-semibold border transition-all duration-200"
          style={{ background: '#fff', borderColor: 'rgba(21,23,61,0.12)', color: 'rgba(21,23,61,0.50)' }}
        >
          ← Back
        </button>
        <button
          onClick={onSubmit}
          className="px-8 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90"
          style={{ background: 'linear-gradient(135deg,#15173D,#982598)', boxShadow: '0 4px 16px rgba(152,37,152,0.35)' }}
        >
          Generate My SYNAPSE™ Report →
        </button>
      </div>
    </div>
  )
}

// ─── Processing Screen ────────────────────────────────────────────────────────

function ProcessingScreen() {
  const steps = [
    { icon: '🧠', label: 'Mapping PsycheMap™ dimensions...' },
    { icon: '✍️', label: 'Decoding GraphoSoul™ handwriting traits...' },
    { icon: '🔮', label: 'Identifying your Founder Archetype...' },
    { icon: '⚡', label: 'Computing SYNAPSE™ composite score...' },
    { icon: '🎯', label: 'Generating ideal partner profile...' },
  ]
  const [doneIdx,   setDoneIdx]   = useState(-1)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    let i = 0
    const tick = () => {
      setActiveIdx(i)
      setTimeout(() => {
        setDoneIdx(i)
        i++
        if (i < steps.length) setTimeout(tick, 300)
      }, 1100)
    }
    tick()
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-8 text-center"
      style={{ background: 'linear-gradient(135deg,#15173D 0%,#2a1040 100%)' }}
    >
      {/* Logo mark */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8"
        style={{ background: 'rgba(152,37,152,0.20)', border: '1px solid rgba(152,37,152,0.30)', animation: 'fm-spin 4s linear infinite' }}
      >
        <AutoAwesomeIcon sx={{ fontSize: 28, color: '#c44cc4' }} />
      </div>

      <div className="text-3xl font-bold mb-2 text-white">
        SYNAPSE™ is Calibrating
      </div>
      <div className="text-sm mb-10" style={{ color: 'rgba(255,255,255,0.45)' }}>
        Analysing your Founder DNA across 47 dimensions...
      </div>

      <div className="flex flex-col gap-2.5 w-full max-w-md text-left">
        {steps.map((s, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm border transition-all duration-500"
            style={{
              background:   doneIdx >= i ? 'rgba(152,37,152,0.15)' : activeIdx === i ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
              borderColor:  doneIdx >= i ? 'rgba(152,37,152,0.35)' : activeIdx === i ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
              color:        doneIdx >= i ? '#c44cc4'                : activeIdx === i ? '#fff'                   : 'rgba(255,255,255,0.35)',
            }}
          >
            <span>{doneIdx >= i ? '✅' : s.icon}</span>
            {s.label}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Results Screen ───────────────────────────────────────────────────────────

function ResultsScreen({ onClose }: { onClose?: () => void }) {
  const dims = [
    { name: '🎯 Risk DNA',         val: 82, color: '#982598' },
    { name: '🔭 Vision Horizon',   val: 94, color: '#15173D' },
    { name: '🤝 Conflict Style',   val: 71, color: '#982598' },
    { name: '⚡ Execution Drive',  val: 88, color: '#15173D' },
    { name: '👑 Authority Style',  val: 76, color: '#982598' },
    { name: '🛡️ Resilience Index', val: 91, color: '#15173D' },
    { name: '💎 Integrity Signal', val: 95, color: '#982598' },
    { name: '🌊 Adaptability',     val: 78, color: '#15173D' },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#F8F8FC' }}>
      <div className="max-w-3xl mx-auto px-6 py-12 pb-20">

        {/* Hero result card */}
        <div
          className="rounded-2xl p-8 mb-6 flex gap-8 items-center flex-wrap"
          style={{ background: 'linear-gradient(135deg,#15173D 0%,#2a1040 100%)', boxShadow: '0 8px 40px rgba(21,23,61,0.20)' }}
        >
          <div className="flex-1 min-w-60">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
              style={{ background: 'rgba(152,37,152,0.25)', color: '#c44cc4', border: '1px solid rgba(152,37,152,0.35)' }}
            >
              ✦ SYNAPSE™ REPORT COMPLETE
            </span>
            <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: 'rgba(255,255,255,0.40)' }}>
              Your Founder Archetype
            </p>
            <h2 className="text-3xl font-bold text-white mb-3">
              The <em className="not-italic" style={{ color: '#c44cc4' }}>Visionary Architect</em>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)' }}>
              You lead with bold vision and systems thinking. Your natural authority and strategic clarity make you a powerful co-founder — you need a partner who matches your execution urgency.
            </p>
          </div>

          {/* Score ring */}
          <div className="text-center flex-shrink-0">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
              SYNAPSE™ Score
            </p>
            <div className="relative w-32 h-32 mx-auto mb-3">
              <svg width="128" height="128" viewBox="0 0 128 128" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="64" cy="64" r="54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                <circle cx="64" cy="64" r="54" fill="none" stroke="url(#scoreGrad)" strokeWidth="8"
                  strokeDasharray="339" strokeDashoffset="61" strokeLinecap="round" />
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#982598" />
                    <stop offset="100%" stopColor="#c44cc4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">84</span>
                <span className="text-xs" style={{ color: 'rgba(255,255,255,0.40)' }}>/100</span>
              </div>
            </div>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Top 12% of all founders</p>
            <div className="flex gap-4 justify-center mt-3">
              <div className="text-center">
                <div className="text-lg font-bold" style={{ color: '#c44cc4' }}>87</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>PsycheMap™</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold" style={{ color: '#c44cc4' }}>79</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>GraphoSoul™</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dimensions */}
        <div className="rounded-2xl p-7 mb-6 border" style={{ background: '#fff', borderColor: 'rgba(21,23,61,0.08)', boxShadow: '0 4px 24px rgba(21,23,61,0.06)' }}>
          <h3 className="text-base font-bold mb-5" style={{ color: '#15173D' }}>PsycheMap™ — 8 Founder Dimensions</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {dims.map(d => (
              <div key={d.name}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-semibold" style={{ color: '#15173D' }}>{d.name}</span>
                  <span className="text-sm font-bold" style={{ color: d.color }}>{d.val}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(21,23,61,0.07)' }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${d.val}%`, background: `linear-gradient(90deg,${d.color},${d.color}99)` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: 'linear-gradient(135deg,rgba(152,37,152,0.06),rgba(21,23,61,0.04))', border: '1px solid rgba(152,37,152,0.15)' }}
        >
          <h3 className="text-xl font-bold mb-2" style={{ color: '#15173D' }}>Your DNA Profile is Ready 🎉</h3>
          <p className="text-sm mb-6" style={{ color: 'rgba(21,23,61,0.55)' }}>
            Now let's find your matches. Browse founders whose SYNAPSE™ scores are optimally complementary to yours.
          </p>
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#15173D,#982598)', boxShadow: '0 4px 16px rgba(152,37,152,0.35)' }}
          >
            View My Matches →
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Export ──────────────────────────────────────────────────────────────

interface SynapseAssessmentProps {
  onComplete?: (answers: Answers) => void
  onClose?: () => void
}

export default function SynapseAssessment({ onComplete, onClose }: SynapseAssessmentProps) {
  const [phase,   setPhase]   = useState<Phase>('psyche')
  const [currQ,   setCurrQ]   = useState(0)
  const [answers, setAnswers] = useState<Answers>({})

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currQ, phase])

  useEffect(() => {
    if (phase !== 'processing') return
    const t = setTimeout(() => {
      setPhase('results')
      onComplete?.(answers)
    }, 6500)
    return () => clearTimeout(t)
  }, [phase, answers, onComplete])

  const pickAnswer = (qId: number | string, val: number) =>
    setAnswers(prev => ({ ...prev, [qId]: val }))

  const goNext = () => currQ < TOTAL - 1 ? setCurrQ(c => c + 1) : setPhase('grapho')
  const goPrev = () => currQ > 0 && setCurrQ(c => c - 1)

  if (phase === 'processing') return <ProcessingScreen />
  if (phase === 'results')    return <ResultsScreen onClose={onClose} />

  const q = questions[currQ]

  return (
    <>
      <style>{`
        @keyframes fm-slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fm-spin { to { transform: rotate(360deg); } }
        @keyframes fm-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>

      <div className="min-h-screen" style={{ background: '#F8F8FC' }}>

        {/* Top bar */}
        <div
          className="sticky top-0 z-40 border-b"
          style={{ background: 'rgba(248,248,252,0.95)', backdropFilter: 'blur(12px)', borderColor: 'rgba(21,23,61,0.08)' }}
        >
          <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: '#982598' }}
              >
                <AutoAwesomeIcon sx={{ fontSize: 14, color: '#fff' }} />
              </div>
              <span className="font-bold text-base" style={{ color: '#15173D' }}>
                Founder<span style={{ color: '#982598' }}>Match</span>
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all"
              style={{ borderColor: 'rgba(21,23,61,0.12)', color: 'rgba(21,23,61,0.45)' }}
            >
              ✕ Close
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-10 pb-20">

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: '#982598', animation: 'fm-blink 1s infinite' }}
              />
              <h1 className="text-2xl font-bold" style={{ color: '#15173D' }}>
                SYNAPSE™ Assessment
              </h1>
            </div>
            <p className="text-sm" style={{ color: 'rgba(21,23,61,0.45)' }}>
              Psychometric science + Graphology analysis · ~20 minutes · No right or wrong answers
            </p>
          </div>

          {/* Progress */}
          <ProgressBar current={currQ} total={TOTAL} isGrapho={phase === 'grapho'} />

          {/* Question */}
          {phase === 'psyche' && (
            <>
              {q.type === 'choice'
                ? <ChoiceCard q={q} answers={answers} onPick={pickAnswer} />
                : <LikertCard q={q} answers={answers} onPick={pickAnswer} />
              }
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={currQ === 0 ? onClose : goPrev}
                  className="px-6 py-3 rounded-xl text-sm font-semibold border transition-all"
                  style={{
                    background: '#fff',
                    borderColor: 'rgba(21,23,61,0.12)',
                    color: 'rgba(21,23,61,0.50)',
                    opacity: currQ === 0 && !onClose ? 0.4 : 1,
                  }}
                  disabled={currQ === 0 && !onClose}
                >
                  {currQ === 0 ? '✕ Close' : '← Previous'}
                </button>
                <button
                  onClick={goNext}
                  className="px-8 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                  style={{
                    background: 'linear-gradient(135deg,#15173D,#982598)',
                    boxShadow: '0 4px 16px rgba(152,37,152,0.30)',
                  }}
                >
                  {currQ === TOTAL - 1 ? 'Continue to Graphology →' : 'Next →'}
                </button>
              </div>
            </>
          )}

          {phase === 'grapho' && (
            <GraphoSection
              answers={answers}
              onPick={pickAnswer}
              onBack={() => { setCurrQ(TOTAL - 1); setPhase('psyche') }}
              onSubmit={() => setPhase('processing')}
            />
          )}
        </div>
      </div>
    </>
  )
}