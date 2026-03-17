import { useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import { statusBadge } from '../../components/ui/Badge'

interface ContentItem {
  id: string; title: string; category: string
  status: 'published' | 'draft' | 'pending'; publishedDate: string
}

const mockContent: ContentItem[] = [
  { id: 'CMS001', title: 'How FounderMatch Works',             category: 'Landing Page', status: 'published', publishedDate: '2024-11-01' },
  { id: 'CMS002', title: 'What is a Compatibility Score?',     category: 'FAQ',          status: 'published', publishedDate: '2024-11-05' },
  { id: 'CMS003', title: 'Guide to the 90-Day Sprint',        category: 'Help Article',  status: 'published', publishedDate: '2024-11-10' },
  { id: 'CMS004', title: '5 Signs You Need a Co-Founder',     category: 'Blog',          status: 'published', publishedDate: '2024-11-15' },
  { id: 'CMS005', title: 'Legal Basics for Co-Founders',      category: 'Blog',          status: 'draft',     publishedDate: '—' },
  { id: 'CMS006', title: 'How Equity Splits Work',            category: 'FAQ',           status: 'draft',     publishedDate: '—' },
  { id: 'CMS007', title: 'Pricing Plan Overview',             category: 'Landing Page',  status: 'pending',   publishedDate: '—' },
]

const catColor: Record<string, { bg: string; color: string }> = {
  'Landing Page':  { bg: '#eff6ff', color: '#2563eb' },
  'FAQ':           { bg: 'rgba(152,37,152,0.07)', color: '#982598' },
  'Help Article':  { bg: '#f0fdf4', color: '#16a34a' },
  'Blog':          { bg: '#fffbeb', color: '#d97706' },
}

export default function CMSModule() {
  const [items] = useState<ContentItem[]>(mockContent)

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold" style={{ color: '#15173D' }}>Content Management</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage landing page, blog, FAQs, and help articles</p>
        </div>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white hover:opacity-90" style={{ background: '#982598' }}>
          <AddCircleOutlineIcon sx={{ fontSize: 16 }} /> New Content
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Published', value: items.filter(i => i.status === 'published').length, color: '#16a34a' },
          { label: 'Drafts',    value: items.filter(i => i.status === 'draft').length,     color: '#6b7280' },
          { label: 'Pending',   value: items.filter(i => i.status === 'pending').length,   color: '#d97706' },
          { label: 'Total',     value: items.length,                                        color: '#15173D' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-2xl p-5">
            <div className="text-2xl font-extrabold mb-0.5" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold" style={{ color: '#15173D' }}>All Content</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                {['Title', 'Category', 'Status', 'Published Date', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map(item => {
                const c = catColor[item.category] || { bg: '#f9fafb', color: '#6b7280' }
                return (
                  <tr key={item.id} className="hover:bg-gray-50/50 group transition-colors">
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-medium" style={{ color: '#15173D' }}>{item.title}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: c.bg, color: c.color }}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">{statusBadge(item.status)}</td>
                    <td className="px-5 py-3.5 text-xs text-gray-400">{item.publishedDate}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {[
                          [<VisibilityOutlinedIcon sx={{ fontSize: 14 }} />, '#6b7280'],
                          [<EditOutlinedIcon sx={{ fontSize: 14 }} />,       '#982598'],
                          [<DeleteOutlineIcon sx={{ fontSize: 14 }} />,      '#dc2626'],
                        ].map(([icon, color], i) => (
                          <button key={i} className="w-7 h-7 rounded-lg flex items-center justify-center border border-gray-100 hover:bg-white" style={{ color: color as string }}>
                            {icon as React.ReactNode}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
