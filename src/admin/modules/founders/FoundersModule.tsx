import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import DataTable from '../../components/tables/DataTable'
import { statusBadge } from '../../components/ui/Badge'
import { mockFounders } from '../../data/mockData'
import type { Founder } from '../../types'

const columns = [
  { key: 'name', label: 'Founder',
    render: (r: Founder) => (
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-xl text-white text-xs font-bold flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #982598, #15173D)' }}>{r.name[0]}</div>
        <div>
          <div className="text-xs font-semibold" style={{ color: '#15173D' }}>{r.name}</div>
          <div className="text-xs text-gray-400">{r.email}</div>
        </div>
      </div>
    )},
  { key: 'startupInterest', label: 'Startup Interest',
    render: (r: Founder) => (
      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
        style={{ background: 'rgba(152,37,152,0.07)', color: '#982598' }}>{r.startupInterest}</span>
    )},
  { key: 'experience', label: 'Experience',
    render: (r: Founder) => <span className="text-xs text-gray-600">{r.experience}</span> },
  { key: 'compatibilityScore', label: 'Score',
    render: (r: Founder) => (
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-gray-100 w-16">
          <div className="h-full rounded-full" style={{ width: `${r.compatibilityScore}%`, background: '#982598' }} />
        </div>
        <span className="text-xs font-bold" style={{ color: '#982598' }}>{r.compatibilityScore}</span>
      </div>
    )},
  { key: 'verificationStatus', label: 'Verification',
    render: (r: Founder) => statusBadge(r.verificationStatus) },
  { key: 'profileStatus', label: 'Profile',
    render: (r: Founder) => statusBadge(r.profileStatus) },
]

const actionBtn = (icon: React.ReactNode, title: string, color = '#6b7280') => (
  <button title={title}
    className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-colors"
    style={{ color }}>
    {icon}
  </button>
)

export default function FoundersModule() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-extrabold" style={{ color: '#15173D' }}>Founder Profiles</h2>
          <p className="text-xs text-gray-400 mt-0.5">Review, approve and manage founder profiles</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 rounded-xl text-sm font-semibold border border-gray-100 text-gray-600 hover:bg-gray-50 transition-colors">
            Export CSV
          </button>
        </div>
      </div>

      {/* Stat pills */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: 'Approved', value: mockFounders.filter(f => f.profileStatus === 'approved').length, color: '#16a34a', bg: '#f0fdf4' },
          { label: 'Pending Review', value: mockFounders.filter(f => f.profileStatus === 'pending').length, color: '#d97706', bg: '#fffbeb' },
          { label: 'Rejected', value: mockFounders.filter(f => f.profileStatus === 'rejected').length, color: '#dc2626', bg: '#fef2f2' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4 text-center">
            <div className="text-2xl font-extrabold mb-0.5" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      <DataTable<Record<string, unknown>>
        columns={columns as never}
        data={mockFounders as never}
        searchKeys={['name', 'email', 'startupInterest'] as never}
        title="All Founder Profiles"
        actions={() => (
          <>
            {actionBtn(<VisibilityOutlinedIcon sx={{ fontSize: 14 }} />, 'View')}
            {actionBtn(<CheckCircleOutlineIcon sx={{ fontSize: 14 }} />, 'Approve', '#16a34a')}
            {actionBtn(<CancelOutlinedIcon sx={{ fontSize: 14 }} />, 'Reject', '#dc2626')}
            {actionBtn(<EditOutlinedIcon sx={{ fontSize: 14 }} />, 'Edit', '#982598')}
          </>
        )}
      />
    </div>
  )
}
