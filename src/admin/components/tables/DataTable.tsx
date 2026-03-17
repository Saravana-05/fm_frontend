import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'

interface Column<T> {
  key: keyof T | string
  label: string
  render?: (row: T) => React.ReactNode
  width?: string
}

interface Props<T> {
  columns: Column<T>[]
  data: T[]
  searchKeys?: (keyof T)[]
  actions?: (row: T) => React.ReactNode
  title?: string
  subtitle?: string
  toolbar?: React.ReactNode
}

export default function DataTable<T extends Record<string, unknown>>({
  columns, data, searchKeys, actions, title, subtitle, toolbar
}: Props<T>) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 8

  const filtered = search && searchKeys
    ? data.filter(row =>
        searchKeys.some(k => String(row[k]).toLowerCase().includes(search.toLowerCase()))
      )
    : data

  const pages = Math.ceil(filtered.length / perPage)
  const sliced = filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
      {/* Header */}
      {(title || toolbar) && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            {title && <h3 className="text-sm font-bold" style={{ color: '#15173D' }}>{title}</h3>}
            {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            {toolbar}
          </div>
        </div>
      )}

      {/* Search bar */}
      {searchKeys && (
        <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-50">
          <div className="flex items-center gap-2 flex-1 max-w-xs px-3 py-2 rounded-lg bg-gray-50 border border-gray-100">
            <SearchIcon sx={{ fontSize: 15, color: '#9ca3af' }} />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1) }}
              className="text-xs text-gray-600 placeholder-gray-300 bg-transparent outline-none flex-1"
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-100 text-xs font-medium text-gray-500 hover:bg-gray-50 transition-colors">
            <FilterListIcon sx={{ fontSize: 14 }} /> Filter
          </button>
          <span className="text-xs text-gray-400">{filtered.length} records</span>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50">
              {columns.map(col => (
                <th key={String(col.key)}
                  className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap"
                  style={{ width: col.width }}>
                  {col.label}
                </th>
              ))}
              {actions && <th className="text-right px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sliced.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                {columns.map(col => (
                  <td key={String(col.key)} className="px-5 py-3.5 text-sm whitespace-nowrap">
                    {col.render ? col.render(row) : (
                      <span className="text-gray-600">{String(row[col.key as keyof T] ?? '')}</span>
                    )}
                  </td>
                ))}
                {actions && (
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {actions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {sliced.length === 0 && (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-5 py-10 text-center text-sm text-gray-300">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-50">
          <span className="text-xs text-gray-400">
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                className="w-7 h-7 rounded-lg text-xs font-semibold transition-all"
                style={p === page
                  ? { background: '#982598', color: '#fff' }
                  : { color: '#6b7280', background: 'transparent' }
                }>
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
