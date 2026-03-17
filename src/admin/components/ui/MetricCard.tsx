import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'

interface Props {
  label: string
  value: string | number
  change?: number
  icon: React.ElementType
  iconColor?: string
}

export default function MetricCard({ label, value, change, icon: Icon, iconColor = '#982598' }: Props) {
  const up = (change ?? 0) >= 0
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 card-lift">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${iconColor}12` }}>
          <Icon sx={{ fontSize: 20, color: iconColor }} />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-0.5 text-xs font-semibold ${up ? 'text-green-600' : 'text-red-500'}`}>
            {up ? <TrendingUpIcon sx={{ fontSize: 14 }} /> : <TrendingDownIcon sx={{ fontSize: 14 }} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-extrabold mb-0.5" style={{ color: '#15173D' }}>{value}</div>
      <div className="text-xs text-gray-400 font-medium">{label}</div>
    </div>
  )
}
