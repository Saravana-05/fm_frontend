import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined'
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined'
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined'
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import MetricCard from '../../components/ui/MetricCard'
import BarChart from '../../components/charts/BarChart'
import LineChart from '../../components/charts/LineChart'
import { statusBadge } from '../../components/ui/Badge'
import { mockUsers, mockMatches, mockTransactions, revenueData, userGrowthData } from '../../data/mockData'

const metrics = [
  { label: 'Total Users',            value: '740',   change: 12,  Icon: PeopleOutlinedIcon,                    color: '#15173D' },
  { label: 'Active Founders',        value: '486',   change: 8,   Icon: PersonSearchOutlinedIcon,              color: '#982598' },
  { label: 'Matches Created',        value: '1,248', change: 22,  Icon: ConnectWithoutContactOutlinedIcon,     color: '#7d1e7d' },
  { label: 'Active Sprints',         value: '38',    change: 5,   Icon: RocketLaunchOutlinedIcon,              color: '#059669' },
  { label: 'Legal Agreements',       value: '124',   change: 18,  Icon: GavelOutlinedIcon,                     color: '#2563eb' },
  { label: 'Marketplace Txns',       value: '892',   change: 14,  Icon: StorefrontOutlinedIcon,                color: '#d97706' },
  { label: 'Monthly Revenue',        value: '$11.4K',change: 24,  Icon: AttachMoneyOutlinedIcon,               color: '#982598' },
]

const chartRevenue = revenueData.map(d => ({ label: d.month, value: d.revenue, value2: d.matches * 100 }))
const chartGrowth  = userGrowthData.map(d => ({ label: d.month, value: d.users }))

export default function DashboardModule() {
  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">
        {metrics.map(m => (
          <MetricCard key={m.label} label={m.label} value={m.value} change={m.change}
            icon={m.Icon} iconColor={m.color} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <h3 className="text-sm font-bold mb-1" style={{ color: '#15173D' }}>Revenue Analytics</h3>
          <p className="text-xs text-gray-400 mb-4">Monthly revenue vs projected (last 6 months)</p>
          <BarChart data={chartRevenue} color="#982598" color2="#e8d4e8"
            label="Revenue ($)" label2="Projected" />
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <h3 className="text-sm font-bold mb-1" style={{ color: '#15173D' }}>User Growth</h3>
          <p className="text-xs text-gray-400 mb-4">Cumulative registered users (last 6 months)</p>
          <LineChart data={chartGrowth} color="#15173D" />
        </div>
      </div>

      {/* Recent tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Users */}
        <div className="lg:col-span-1 bg-white border border-gray-100 rounded-2xl p-5">
          <h3 className="text-sm font-bold mb-3" style={{ color: '#15173D' }}>Recent Users</h3>
          <div className="space-y-3">
            {mockUsers.slice(0, 5).map(u => (
              <div key={u.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl text-white text-xs font-bold flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #982598, #15173D)' }}>
                  {u.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate" style={{ color: '#15173D' }}>{u.name}</div>
                  <div className="text-xs text-gray-400 truncate">{u.email}</div>
                </div>
                {statusBadge(u.status)}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Matches */}
        <div className="lg:col-span-1 bg-white border border-gray-100 rounded-2xl p-5">
          <h3 className="text-sm font-bold mb-3" style={{ color: '#15173D' }}>Recent Matches</h3>
          <div className="space-y-3">
            {mockMatches.slice(0, 5).map(m => (
              <div key={m.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold"
                  style={{ background: 'rgba(152,37,152,0.08)', color: '#982598' }}>
                  {m.compatibilityScore}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate" style={{ color: '#15173D' }}>{m.founderA} × {m.founderB}</div>
                  <div className="text-xs text-gray-400">{m.matchDate}</div>
                </div>
                {statusBadge(m.status)}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-1 bg-white border border-gray-100 rounded-2xl p-5">
          <h3 className="text-sm font-bold mb-3" style={{ color: '#15173D' }}>Recent Transactions</h3>
          <div className="space-y-3">
            {mockTransactions.slice(0, 5).map(t => (
              <div key={t.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold"
                  style={{ background: '#f0fdf4', color: '#16a34a' }}>
                  ${t.amount}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate" style={{ color: '#15173D' }}>{t.user}</div>
                  <div className="text-xs text-gray-400 truncate">{t.type}</div>
                </div>
                {statusBadge(t.status)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
