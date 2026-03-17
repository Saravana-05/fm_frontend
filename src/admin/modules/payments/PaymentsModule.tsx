import BarChart from '../../components/charts/BarChart'
import DataTable from '../../components/tables/DataTable'
import { statusBadge } from '../../components/ui/Badge'
import { mockTransactions, revenueData } from '../../data/mockData'
import type { Transaction } from '../../types'

const columns = [
  { key: 'id', label: 'Transaction ID',
    render: (r: Transaction) => <span className="text-xs font-mono text-gray-400">{r.id}</span> },
  { key: 'user', label: 'User',
    render: (r: Transaction) => (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg text-white text-xs font-bold flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg,#982598,#15173D)' }}>{r.user[0]}</div>
        <span className="text-xs font-medium" style={{ color: '#15173D' }}>{r.user}</span>
      </div>
    )},
  { key: 'amount', label: 'Amount',
    render: (r: Transaction) => <span className="text-xs font-bold" style={{ color: '#15173D' }}>${r.amount}</span> },
  { key: 'type', label: 'Plan',
    render: (r: Transaction) => (
      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
        style={{ background: 'rgba(152,37,152,0.07)', color: '#982598' }}>{r.type}</span>
    )},
  { key: 'paymentMethod', label: 'Method',
    render: (r: Transaction) => <span className="text-xs text-gray-500">{r.paymentMethod}</span> },
  { key: 'status', label: 'Status', render: (r: Transaction) => statusBadge(r.status) },
  { key: 'date', label: 'Date',
    render: (r: Transaction) => <span className="text-xs text-gray-400">{r.date}</span> },
]

const revenueByType = [
  { label: 'Gold', value: 2640 },
  { label: 'Sprint', value: 3920 },
  { label: 'Legal', value: 1990 },
  { label: 'Market', value: 2850 },
]

export default function PaymentsModule() {
  const totalRevenue = mockTransactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0)

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-extrabold" style={{ color: '#15173D' }}>Payments</h2>
        <p className="text-xs text-gray-400 mt-0.5">Revenue overview and transaction history</p>
      </div>

      {/* Revenue summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue',       value: `$${totalRevenue}`,  color: '#982598' },
          { label: 'Gold Match Subs',      value: '$2,640',            color: '#d97706' },
          { label: 'Sprint Plans',         value: '$3,920',            color: '#2563eb' },
          { label: 'Legal Packages',       value: '$1,990',            color: '#059669' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-5">
            <div className="text-2xl font-extrabold mb-0.5" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <h3 className="text-sm font-bold mb-1" style={{ color: '#15173D' }}>Monthly Revenue</h3>
          <p className="text-xs text-gray-400 mb-4">Last 6 months revenue trend</p>
          <BarChart data={revenueData.map(d => ({ label: d.month, value: d.revenue }))} color="#982598" />
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <h3 className="text-sm font-bold mb-1" style={{ color: '#15173D' }}>Revenue by Plan</h3>
          <p className="text-xs text-gray-400 mb-4">Breakdown by subscription type</p>
          <BarChart data={revenueByType} color="#15173D" />
        </div>
      </div>

      <DataTable<Record<string, unknown>>
        columns={columns as never}
        data={mockTransactions as never}
        searchKeys={['user', 'type', 'id'] as never}
        title="Transaction History"
        subtitle={`${mockTransactions.length} transactions`}
      />
    </div>
  )
}
