import { createContext, useContext, useState, ReactNode } from 'react'

interface AdminContextType {
  isAuthenticated: boolean
  login: (u: string, p: string) => boolean
  logout: () => void
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (u: string, p: string) => {
    if (u === 'admin' && p === 'vault2024') {
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const logout = () => setIsAuthenticated(false)

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}
