import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined'
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined'
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined'
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined'
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const NAV = [
  { id: 'dashboard',   label: 'Dashboard',           Icon: DashboardOutlinedIcon },
  { id: 'users',       label: 'Users',                Icon: PeopleOutlinedIcon,                badge: 3 },
  { id: 'founders',    label: 'Founders',             Icon: PersonSearchOutlinedIcon },
  { id: 'tests',       label: 'Compatibility Tests',  Icon: PsychologyOutlinedIcon },
  { id: 'matches',     label: 'Founder Matches',      Icon: ConnectWithoutContactOutlinedIcon },
  { id: 'sprints',     label: 'Founder Sprints',      Icon: RocketLaunchOutlinedIcon },
  { id: 'legal',       label: 'Legal Agreements',     Icon: GavelOutlinedIcon },
  { id: 'marketplace', label: 'Marketplace',          Icon: StorefrontOutlinedIcon,            badge: 2 },
  { id: 'payments',    label: 'Payments',             Icon: PaymentsOutlinedIcon },
  { id: 'reports',     label: 'Reports',              Icon: BarChartOutlinedIcon },
  { id: 'cms',         label: 'Content',              Icon: ArticleOutlinedIcon },
  { id: 'settings',    label: 'Settings',             Icon: SettingsOutlinedIcon },
]

interface Props {
  active: string
  onNav: (id: string) => void
  open: boolean
  onToggle: () => void
}

export default function Sidebar({ active, onNav, open, onToggle }: Props) {
  return (
    <aside
      className="flex flex-col border-r border-gray-100 transition-all duration-300 flex-shrink-0"
      style={{
        width: open ? 228 : 64,
        background: '#fff',
        minHeight: '100vh',
      }}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-gray-100 flex-shrink-0">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#982598' }}>
          <AutoAwesomeIcon sx={{ fontSize: 15, color: '#fff' }} />
        </div>
        {open && (
          <span className="ml-2.5 font-bold text-base whitespace-nowrap overflow-hidden" style={{ color: '#15173D' }}>
            Founder<span style={{ color: '#982598' }}>Match</span>
            <span className="ml-1.5 text-xs font-semibold px-1.5 py-0.5 rounded" style={{ background: 'rgba(152,37,152,0.1)', color: '#982598' }}>
              Admin
            </span>
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden">
        {NAV.map(({ id, label, Icon, badge }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => onNav(id)}
              title={!open ? label : undefined}
              className={`w-full flex items-center gap-3 px-4 py-2.5 mb-0.5 rounded-lg mx-1 text-left transition-all group
                ${open ? 'mx-2 w-[calc(100%-16px)]' : 'mx-2 w-10 justify-center'}
              `}
              style={{
                background: isActive ? 'rgba(152,37,152,0.09)' : 'transparent',
                color: isActive ? '#982598' : '#6b7280',
              }}
            >
              <Icon sx={{ fontSize: 19, flexShrink: 0, color: isActive ? '#982598' : '#9ca3af' }} />
              {open && (
                <>
                  <span className={`text-sm font-medium flex-1 whitespace-nowrap ${isActive ? 'text-purple-700' : 'text-gray-600'}`}
                    style={{ color: isActive ? '#982598' : '#6b7280' }}>
                    {label}
                  </span>
                  {badge && (
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded-full text-white"
                      style={{ background: '#982598', minWidth: 18, textAlign: 'center' }}>
                      {badge}
                    </span>
                  )}
                </>
              )}
            </button>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-3 border-t border-gray-100">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center h-9 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
        >
          {open
            ? <ChevronLeftIcon sx={{ fontSize: 18, color: '#9ca3af' }} />
            : <ChevronRightIcon sx={{ fontSize: 18, color: '#9ca3af' }} />
          }
        </button>
      </div>
    </aside>
  )
}
