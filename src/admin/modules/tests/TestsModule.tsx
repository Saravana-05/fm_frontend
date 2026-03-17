import { useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'

interface Question {
  id: number; text: string
  type: 'multiple_choice' | 'rating' | 'yes_no'
  weight: number; options?: string[]
}

const defaultQuestions: Question[] = [
  { id: 1, text: 'What is your primary motivation for starting a company?', type: 'multiple_choice', weight: 15, options: ['Impact', 'Wealth', 'Innovation', 'Independence'] },
  { id: 2, text: 'How many hours per week can you commit to the startup?', type: 'rating', weight: 20 },
  { id: 3, text: 'Are you willing to relocate for the startup?', type: 'yes_no', weight: 10 },
  { id: 4, text: 'What is your risk tolerance level?', type: 'rating', weight: 18 },
  { id: 5, text: 'How do you prefer to make major decisions?', type: 'multiple_choice', weight: 17, options: ['Data-driven', 'Intuition', 'Consensus', 'Hierarchy'] },
]

const typePill = (type: Question['type']) => {
  const map = {
    multiple_choice: { label: 'Multiple Choice', bg: '#eff6ff',                      color: '#2563eb' },
    rating:          { label: 'Rating Scale',    bg: 'rgba(152,37,152,0.07)',         color: '#982598' },
    yes_no:          { label: 'Yes / No',        bg: '#f0fdf4',                       color: '#16a34a' },
  }
  const m = map[type]
  return <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: m.bg, color: m.color }}>{m.label}</span>
}

export default function TestsModule() {
  const [questions, setQuestions] = useState<Question[]>(defaultQuestions)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold" style={{ color: '#15173D' }}>Compatibility Tests</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage questions, weights, and scoring logic</p>
        </div>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90" style={{ background: '#982598' }}>
          <AddCircleOutlineIcon sx={{ fontSize: 16 }} /> Add Question
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Avg Compatibility Score', value: '74%', color: '#982598' },
          { label: 'Test Completion Rate',    value: '88%', color: '#16a34a' },
          { label: 'Active Questions',        value: questions.length, color: '#15173D' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-5">
            <div className="text-2xl font-extrabold mb-0.5" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold" style={{ color: '#15173D' }}>Test Questions</h3>
          <span className="text-xs text-gray-400">Drag to reorder</span>
        </div>
        <div className="divide-y divide-gray-50">
          {questions.map((q, i) => (
            <div key={q.id} className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50/50 group transition-colors">
              <div className="flex items-center gap-2 mt-0.5 flex-shrink-0">
                <DragIndicatorIcon sx={{ fontSize: 16, color: '#d1d5db' }} />
                <span className="text-xs font-bold" style={{ color: '#15173D' }}>Q{i + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium mb-2" style={{ color: '#15173D' }}>{q.text}</p>
                <div className="flex flex-wrap items-center gap-2">
                  {typePill(q.type)}
                  <span className="text-xs text-gray-400">Weight: <span className="font-semibold" style={{ color: '#982598' }}>{q.weight}%</span></span>
                  {q.options?.map(opt => (
                    <span key={opt} className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{opt}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <button className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-100 hover:bg-white" style={{ color: '#982598' }}>
                  <EditOutlinedIcon sx={{ fontSize: 14 }} />
                </button>
                <button onClick={() => setQuestions(prev => prev.filter(x => x.id !== q.id))}
                  className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-100 hover:bg-white" style={{ color: '#dc2626' }}>
                  <DeleteOutlineIcon sx={{ fontSize: 14 }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
