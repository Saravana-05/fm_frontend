interface LineChartProps {
  data: { label: string; value: number }[]
  color?: string
  height?: number
}

export default function LineChart({ data, color = '#982598', height = 140 }: LineChartProps) {
  const max = Math.max(...data.map(d => d.value))
  const min = Math.min(...data.map(d => d.value))
  const range = max - min || 1
  const w = 500
  const h = height
  const pad = { top: 10, bottom: 30, left: 0, right: 0 }
  const innerH = h - pad.top - pad.bottom

  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * w,
    y: pad.top + innerH - ((d.value - min) / range) * innerH,
    label: d.label,
    value: d.value,
  }))

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaD = `${pathD} L ${points[points.length - 1].x} ${h - pad.bottom} L 0 ${h - pad.bottom} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#grad-${color.replace('#', '')})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3.5" fill={color} stroke="white" strokeWidth="2" />
          <text x={p.x} y={h - 5} textAnchor="middle" fontSize="11" fill="#9ca3af">{p.label}</text>
        </g>
      ))}
    </svg>
  )
}
