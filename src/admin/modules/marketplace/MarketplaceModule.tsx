import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import StarIcon from '@mui/icons-material/Star'
import DataTable from '../../components/tables/DataTable'
import { statusBadge } from '../../components/ui/Badge'
import { mockProviders } from '../../data/mockData'
import type { Provider } from '../../types'

const typeColors: Record<string, { bg: string; color: string }> = {
  lawyer:     { bg: '#eff6ff', color: '#2563eb' },
  mentor:     { bg: 'rgba(152,37,152,0.07)', color: '#982598' },
  freelancer: { bg: '#f0fdf4', color: '#16a34a' },
}

const columns = [
  { key: 'name', label: 'Provider',
    render: (r: Provider) => (
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-xl text-white text-xs font-bold flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #982598, #15173D)' }}>{r.name[0]}</div>
        <span className="text-xs font-semibold" style={{ color: '#15173D' }}>{r.name}</span>
      </div>
    )},
  { key: 'serviceType', label: 'Service Type',
    render: (r: Provider) => {
      const c = typeColors[r.serviceType]
      return <span className="text-xs px-2 py-0.5 rounded-full font-semibold capitalize"
        style={{ background: c.bg, color: c.color }}>{r.serviceType}</span>
    }},
  { key: 'rating', label: 'Rating',
    render: (r: Provider) => (
      <div className="flex items-center gap-1">
        <StarIcon sx={{ fontSize: 13, color: '#f59e0b' }} />
        <span className="text-xs font-bold" style={{ color: '#15173D' }}>{r.rating}</span>
      </div>
    )},
  { key: 'projectsCompleted', label: 'Projects',
    render: (r: Provider) => <span className="text-xs text-gray-600">{r.projectsCompleted}</span> },
  { key: 'status', label: 'Status', render: (r: Provider) => statusBadge(r.status) },
]

export default function MarketplaceModule() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-extrabold" style={{ color: '#15173D' }}>Marketplace</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage service providers — freelancers, mentors, lawyers</p>
        </div>
        <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90"
          style={{ background: '#982598' }}>
          + Add Provider
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: 'Lawyers',     value: mockProviders.filter(p => p.serviceType === 'lawyer').length,     color: '#2563eb' },
          { label: 'Mentors',     value: mockProviders.filter(p => p.serviceType === 'mentor').length,     color: '#982598' },
          { label: 'Freelancers', value: mockProviders.filter(p => p.serviceType === 'freelancer').length, color: '#16a34a' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4 text-center">
            <div className="text-2xl font-extrabold mb-0.5" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      <DataTable<Record<string, unknown>>
        columns={columns as never}
        data={mockProviders as never}
        searchKeys={['name', 'serviceType'] as never}
        title="All Providers"
        actions={() => (
          <>
            <button className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50" style={{ color: '#16a34a' }}>
              <CheckCircleOutlineIcon sx={{ fontSize: 14 }} />
            </button>
            <button className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50" style={{ color: '#dc2626' }}>
              <CancelOutlinedIcon sx={{ fontSize: 14 }} />
            </button>
            <button className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50" style={{ color: '#982598' }}>
              <EditOutlinedIcon sx={{ fontSize: 14 }} />
            </button>
          </>
        )}
      />
    </div>
  )
}
