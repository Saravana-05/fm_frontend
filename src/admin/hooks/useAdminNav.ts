import { useState } from 'react'

export function useAdminNav() {
  const [activeModule, setActiveModule] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return { activeModule, setActiveModule, sidebarOpen, setSidebarOpen }
}
