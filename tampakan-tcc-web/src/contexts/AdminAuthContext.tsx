import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { adminLogin, type AdminLoginPayload, type AdminLoginResponse } from '../services/auth'

interface AdminAuthState {
  user: AdminLoginResponse['user'] | null
  accessToken: string | null
  isAuthenticated: boolean
}

interface AdminAuthContextType extends AdminAuthState {
  login: (payload: AdminLoginPayload) => Promise<void>
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AdminAuthState>(() => {
    const accessToken = sessionStorage.getItem('admin_access_token')
    const userStr = sessionStorage.getItem('admin_user')
    const user = userStr ? JSON.parse(userStr) : null
    return { user, accessToken, isAuthenticated: !!accessToken }
  })

  const login = useCallback(async (payload: AdminLoginPayload) => {
    const res = await adminLogin(payload)
    sessionStorage.setItem('admin_access_token', res.access_token)
    sessionStorage.setItem('admin_refresh_token', res.refresh_token)
    sessionStorage.setItem('admin_user', JSON.stringify(res.user))
    setState({ user: res.user, accessToken: res.access_token, isAuthenticated: true })
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem('admin_access_token')
    sessionStorage.removeItem('admin_refresh_token')
    sessionStorage.removeItem('admin_user')
    setState({ user: null, accessToken: null, isAuthenticated: false })
  }, [])

  return (
    <AdminAuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
