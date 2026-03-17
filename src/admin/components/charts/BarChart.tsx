interface BarChartProps {
  data: { label: string; value: number; value2?: number }[]
  color?: string
  color2?: string
  height?: number
  label?: string
  label2?: string
}

export default function BarChart({ data, color = '#982598', color2, height = 160, label, label2 }: BarChartProps) {
  const max = Math.max(...data.map(d => Math.max(d.value, d.value2 ?? 0)))

  return (
    <div>
      {(label || label2) && (
        <div className="flex items-center gap-4 mb-4">
          {label && <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="w-3 h-2 rounded-sm inline-block" style={{ background: color }} />{label}
          </div>}
          {label2 && color2 && <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="w-3 h-2 rounded-sm inline-block" style={{ background: color2 }} />{label2}
          </div>}
        </div>
      )}
      <div className="flex items-end gap-1.5" style={{ height }}>
        {data.map(({ label: l, value, value2 }) => (
          <div key={l} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex items-end gap-0.5" style={{ height: height - 24 }}>
              <div
                className="flex-1 rounded-t-md transition-all duration-500"
                style={{
                  height: `${(value / max) * 100}%`,
                  background: color,
                  minHeight: 4,
                  opacity: 0.9,
                }}
              />
              {value2 !== undefined && color2 && (
                <div
                  className="flex-1 rounded-t-md transition-all duration-500"
                  style={{
                    height: `${(value2 / max) * 100}%`,
                    background: color2,
                    minHeight: 4,
                    opacity: 0.75,
                  }}
                />
              )}
            </div>
            <span className="text-xs text-gray-400">{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
