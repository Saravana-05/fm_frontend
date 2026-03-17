import { useState } from 'react'
import Sidebar  from './components/layout/Sidebar'
import TopBar   from './components/layout/TopBar'

import DashboardModule  from './modules/dashboard/DashboardModule'
import UsersModule      from './modules/users/UsersModule'
import FoundersModule   from './modules/founders/FoundersModule'
import TestsModule      from './modules/tests/TestsModule'
import MatchesModule    from './modules/matches/MatchesModule'
import SprintsModule    from './modules/sprints/SprintsModule'
import LegalModule      from './modules/legal/LegalModule'
import MarketplaceModule from './modules/marketplace/MarketplaceModule'
import PaymentsModule   from './modules/payments/PaymentsModule'
import ReportsModule    from './modules/reports/ReportsModule'
import CMSModule        from './modules/cms/CMSModule'
import SettingsModule   from './modules/settings/SettingsModule'

const MODULES: Record<string, React.FC> = {
  dashboard:   DashboardModule,
  users:       UsersModule,
  founders:    FoundersModule,
  tests:       TestsModule,
  matches:     MatchesModule,
  sprints:     SprintsModule,
  legal:       LegalModule,
  marketplace: MarketplaceModule,
  payments:    PaymentsModule,
  reports:     ReportsModule,
  cms:         CMSModule,
  settings:    SettingsModule,
}

export default function AdminApp() {
  const [activeModule, setActiveModule] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen]   = useState(true)

  const ActiveModule = MODULES[activeModule] || DashboardModule

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 font-sans">
      <Sidebar
        active={activeModule}
        onNav={setActiveModule}
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(o => !o)}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopBar module={activeModule} />

        <main className="flex-1 overflow-y-auto p-5 lg:p-6">
          <div className="max-w-screen-xl mx-auto">
            <ActiveModule />
          </div>
        </main>
      </div>
    </div>
  )
}
