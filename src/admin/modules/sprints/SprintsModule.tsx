import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined'
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined'
import DataTable from '../../components/tables/DataTable'
import { statusBadge } from '../../components/ui/Badge'
import { mockSprints } from '../../data/mockData'
import type { Sprint } from '../../types'

const columns = [
  { key: 'id', label: 'Sprint ID', render: (r: Sprint) => <span className="text-xs font-mono text-gray-400">{r.id}</span> },
  { key: 'founderA', label: 'Founders',
    render: (r: Sprint) => (
      <div>
        <div className="text-xs font-semibold" style={{ color: '#15173D' }}>{r.founderA}</div>
        <div className="text-xs text-gray-400">× {r.founderB}</div>
      </div>
    )},
  { key: 'startupIdea', label: 'Startup Idea',
    render: (r: Sprint) => <span className="text-xs text-gray-600">{r.startupIdea}</span> },
  { key: 'startDate', label: 'Start Date',
    render: (r: Sprint) => <span className="text-xs text-gray-500">{r.startDate}</span> },
  { key: 'milestonesCompleted', label: 'Milestones',
    render: (r: Sprint) => (
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 rounded-full bg-gray-100">
          <div className="h-full rounded-full" style={{ width: `${(r.milestonesCompleted / r.totalMilestones) * 100}%`, background: '#982598' }} />
        </div>
        <span className="text-xs text-gray-500">{r.milestonesCompleted}/{r.totalMilestones}</span>
      </div>
    )},
  { key: 'status', label: 'Status', render: (r: Sprint) => statusBadge(r.status) },
]

export default function SprintsModule() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-extrabold" style={{ color: '#15173D' }}>Founder Sprints</h2>
          <p className="text-xs text-gray-400 mt-0.5">Monitor 90-day collaboration sprints</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Active',    value: mockSprints.filter(s => s.status === 'active').length,    color: '#16a34a' },
          { label: 'Completed', value: mockSprints.filter(s => s.status === 'completed').length, color: '#2563eb' },
          { label: 'Disputed',  value: mockSprints.filter(s => s.status === 'disputed').length,  color: '#dc2626' },
          { label: 'Ended',     value: mockSprints.filter(s => s.status === 'ended').length,     color: '#6b7280' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4 text-center">
            <div className="text-2xl font-extrabold mb-0.5" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      <DataTable<Record<string, unknown>>
        columns={columns as never}
        data={mockSprints as never}
        searchKeys={['founderA', 'founderB', 'startupIdea'] as never}
        title="All Sprints"
        actions={() => (
          <>
            <button title="View" className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50" style={{ color: '#6b7280' }}>
              <VisibilityOutlinedIcon sx={{ fontSize: 14 }} />
            </button>
            <button title="Resolve Dispute" className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50" style={{ color: '#d97706' }}>
              <WarningAmberOutlinedIcon sx={{ fontSize: 14 }} />
            </button>
            <button title="End Sprint" className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50" style={{ color: '#dc2626' }}>
              <StopCircleOutlinedIcon sx={{ fontSize: 14 }} />
            </button>
          </>
        )}
      />
    </div>
  )
}
