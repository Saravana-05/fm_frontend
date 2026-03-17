import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined'
import DataTable from '../../components/tables/DataTable'
import { statusBadge } from '../../components/ui/Badge'
import { mockLegal } from '../../data/mockData'
import type { LegalAgreement } from '../../types'

const columns = [
  { key: 'id', label: 'Agreement ID', render: (r: LegalAgreement) => <span className="text-xs font-mono text-gray-400">{r.id}</span> },
  { key: 'founderA', label: 'Parties',
    render: (r: LegalAgreement) => (
      <div>
        <div className="text-xs font-semibold" style={{ color: '#15173D' }}>{r.founderA}</div>
        <div className="text-xs text-gray-400">× {r.founderB}</div>
      </div>
    )},
  { key: 'agreementType', label: 'Type',
    render: (r: LegalAgreement) => (
      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
        style={{ background: 'rgba(37,99,235,0.07)', color: '#2563eb' }}>
        {r.agreementType}
      </span>
    )},
  { key: 'equitySplit', label: 'Equity Split',
    render: (r: LegalAgreement) => <span className="text-xs font-bold" style={{ color: '#15173D' }}>{r.equitySplit}</span> },
  { key: 'agreementDate', label: 'Date',
    render: (r: LegalAgreement) => <span className="text-xs text-gray-500">{r.agreementDate}</span> },
  { key: 'status', label: 'Status', render: (r: LegalAgreement) => statusBadge(r.status) },
]

export default function LegalModule() {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-extrabold" style={{ color: '#15173D' }}>Legal Agreements</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage co-founder legal documents and agreements</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        {[
          { label: 'Active',    value: mockLegal.filter(l => l.status === 'active').length,    color: '#16a34a' },
          { label: 'Pending',   value: mockLegal.filter(l => l.status === 'pending').length,   color: '#d97706' },
          { label: 'Flagged',   value: mockLegal.filter(l => l.status === 'flagged').length,   color: '#dc2626' },
          { label: 'Completed', value: mockLegal.filter(l => l.status === 'completed').length, color: '#2563eb' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-4 text-center">
            <div className="text-2xl font-extrabold mb-0.5" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      <DataTable<Record<string, unknown>>
        columns={columns as never}
        data={mockLegal as never}
        searchKeys={['founderA', 'founderB', 'agreementType'] as never}
        title="All Legal Agreements"
        actions={() => (
          <>
            <button className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50" style={{ color: '#6b7280' }}>
              <VisibilityOutlinedIcon sx={{ fontSize: 14 }} />
            </button>
            <button className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50" style={{ color: '#2563eb' }}>
              <DownloadOutlinedIcon sx={{ fontSize: 14 }} />
            </button>
            <button className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-100 hover:bg-gray-50" style={{ color: '#dc2626' }}>
              <FlagOutlinedIcon sx={{ fontSize: 14 }} />
            </button>
          </>
        )}
      />
    </div>
  )
}
