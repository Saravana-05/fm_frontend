import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import DataTable from '../../components/tables/DataTable'
import { statusBadge } from '../../components/ui/Badge'
import { mockUsers } from '../../data/mockData'
import type { User } from '../../types'

const columns = [
  { key: 'id',                 label: 'User ID',     width: '90px',
    render: (r: User) => <span className="text-xs font-mono text-gray-400">{r.id}</span> },
  { key: 'name',               label: 'Name',
    render: (r: User) => (
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-xl text-white text-xs font-bold flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #982598, #15173D)' }}>{r.name[0]}</div>
        <div>
          <div className="text-xs font-semibold" style={{ color: '#15173D' }}>{r.name}</div>
          <div className="text-xs text-gray-400">{r.email}</div>
        </div>
      </div>
    )},
  { key: 'signupDate',         label: 'Signup',
    render: (r: User) => <span className="text-xs text-gray-500">{r.signupDate}</span> },
  { key: 'accountType',        label: 'Type',
    render: (r: User) => <span className="text-xs capitalize text-gray-600">{r.accountType}</span> },
  { key: 'verificationStatus', label: 'Verification',
    render: (r: User) => statusBadge(r.verificationStatus) },
  { key: 'status',             label: 'Status',
    render: (r: User) => statusBadge(r.status) },
]

const actionBtn = (icon: React.ReactNode, title: string, color = '#6b7280') => (
  <button title={title}
    className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-colors"
    style={{ color }}>
    {icon}
  </button>
)

export default function UsersModule() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-extrabold" style={{ color: '#15173D' }}>User Management</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage all registered users on the platform</p>
        </div>
        <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ background: '#982598' }}>
          + Invite User
        </button>
      </div>

      <DataTable<Record<string, unknown>>
        columns={columns as never}
        data={mockUsers as never}
        searchKeys={['name', 'email', 'id'] as never}
        title="All Users"
        subtitle={`${mockUsers.length} total registered users`}
        actions={(row: Record<string, unknown>) => (
          <>
            {actionBtn(<VisibilityOutlinedIcon sx={{ fontSize: 14 }} />, 'View')}
            {actionBtn(<BlockOutlinedIcon sx={{ fontSize: 14 }} />, 'Suspend', '#d97706')}
            {actionBtn(<DeleteOutlineIcon sx={{ fontSize: 14 }} />, 'Delete', '#dc2626')}
          </>
        )}
      />
    </div>
  )
}
