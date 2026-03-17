import SearchIcon from '@mui/icons-material/Search'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'

const MODULE_LABELS: Record<string, string> = {
  dashboard: 'Dashboard', users: 'User Management', founders: 'Founder Profiles',
  tests: 'Compatibility Tests', matches: 'Founder Matches', sprints: 'Founder Sprints',
  legal: 'Legal Agreements', marketplace: 'Marketplace', payments: 'Payments',
  reports: 'Reports', cms: 'Content Management', settings: 'Settings',
}

export default function TopBar({ module }: { module: string }) {
  return (
    <header className="h-16 border-b border-gray-100 bg-white flex items-center px-6 gap-4 flex-shrink-0">
      {/* Breadcrumb */}
      <div className="flex-1">
        <h1 className="text-base font-bold" style={{ color: '#15173D' }}>
          {MODULE_LABELS[module] || 'Admin'}
        </h1>
        <p className="text-xs text-gray-400">FounderMatch Admin Panel</p>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-100 bg-gray-50 w-60">
        <SearchIcon sx={{ fontSize: 16, color: '#9ca3af' }} />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-sm text-gray-600 placeholder-gray-300 outline-none flex-1 w-full"
        />
      </div>

      {/* Icons */}
      <button className="relative w-9 h-9 rounded-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
        <NotificationsNoneOutlinedIcon sx={{ fontSize: 18, color: '#6b7280' }} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#982598' }} />
      </button>
      <button className="w-9 h-9 rounded-lg border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition-colors">
        <HelpOutlineOutlinedIcon sx={{ fontSize: 18, color: '#6b7280' }} />
      </button>

      {/* Avatar */}
      <div className="flex items-center gap-2.5 pl-2 border-l border-gray-100">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold"
          style={{ background: 'linear-gradient(135deg, #982598, #15173D)' }}>
          A
        </div>
        <div className="hidden sm:block">
          <div className="text-xs font-semibold" style={{ color: '#15173D' }}>Super Admin</div>
          <div className="text-xs text-gray-400">admin@foundermatch.io</div>
        </div>
      </div>
    </header>
  )
}
