import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined'
import DataTable from '../../components/tables/DataTable'
import { statusBadge } from '../../components/ui/Badge'
import { mockMatches } from '../../data/mockData'
import type { Match } from '../../types'

const columns = [
  { key: 'id', label: 'Match ID',
    render: (r: Match) => <span className="text-xs font-mono text-gray-400">{r.id}</span> },
  { key: 'founderA', label: 'Founder A',
    render: (r: Match) => <span className="text-xs font-semibold" style={{ color: '#15173D' }}>{r.founderA}</span> },
  { key: 'founderB', label: 'Founder B',
    render: (r: Match) => <span className="text-xs font-semibold" style={{ color: '#15173D' }}>{r.founderB}</span> },
  { key: 'compatibilityScore', label: 'Score',
    render: (r: Match) => (
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 rounded-full bg-gray-100">
          <div className="h-full rounded-full" style={{ width: `${r.compatibilityScore}%`, background: r.compatibilityScore >= 85 ? '#16a34a' : r.compatibilityScore >= 70 ? '#d97706' : '#dc2626' }} />
        </div>
        <span className="text-xs font-bold" style={{ color: '#15173D' }}>{r.compatibilityScore}%</span>
      </div>
    )},
  { key: 'matchDate', label: 'Match Date',
    render: (r: Match) => <span className="text-xs text-gray-500">{r.matchDate}</span> },
  { key: 'status', label: 'Status',
    render: (r: Match) => statusBadge(r.status) },
]

export default function MatchesModule() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-extrabold" style={{ color: '#15173D' }}>Founder Matches</h2>
          <p className="text-xs text-gray-400 mt-0.5">All AI-generated founder compatibility matches</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: 'Active Matches',  value: mockMatches.filter(m => m.status === 'active').length,  color: '#16a34a', bg: '#f0fdf4' },
          { label: 'Flagged',         value: mockMatches.filter(m => m.status === 'flagged').length, color: '#dc2626', bg: '#fef2f2' },
          { label: 'Ended',           value: mockMatches.filter(m => m.status === 'ended').length,   color: '#6b7280', bg: '#f9fafb' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4 text-center">
            <div className="text-2xl font-extrabold mb-0.5" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      <DataTable<Record<string, unknown>>
        columns={columns as never}
        data={mockMatches as never}
        searchKeys={['founderA', 'founderB', 'id'] as never}
        title="All Matches"
        actions={() => (
          <>
            <button title="View" className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50" style={{ color: '#6b7280' }}>
              <VisibilityOutlinedIcon sx={{ fontSize: 14 }} />
            </button>
            <button title="Flag" className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50" style={{ color: '#d97706' }}>
              <FlagOutlinedIcon sx={{ fontSize: 14 }} />
            </button>
            <button title="End Match" className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50" style={{ color: '#dc2626' }}>
              <StopCircleOutlinedIcon sx={{ fontSize: 14 }} />
            </button>
          </>
        )}
      />
    </div>
  )
}
