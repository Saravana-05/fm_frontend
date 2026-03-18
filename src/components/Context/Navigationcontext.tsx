import { createContext, useContext, useState } from 'react'

type View = 'landing' | 'admin' | 'login'

interface NavContextType {
  view: View
  setView: (v: View) => void
}

const NavContext = createContext<NavContextType | null>(null)

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<View>('landing')
  return (
    <NavContext.Provider value={{ view, setView }}>
      {children}
    </NavContext.Provider>
  )
}

// Use this hook in ANY component to navigate
export function useNav() {
  const ctx = useContext(NavContext)
  if (!ctx) throw new Error('useNav must be used inside <NavProvider>')
  return ctx
}